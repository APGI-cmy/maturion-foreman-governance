'use strict';

const { createHash } = require('node:crypto');
const STATUS_CONTEXT = 'iaa/trusted-assurance-check';
const SHA = /^[0-9a-f]{40}$/;
const TOKEN_PATH = /^\.agent-admin\/assurance\/(?:iaa-wave-record-|assurance-token-|iaa-token-session-|iaa-assurance-token-)[A-Za-z0-9._-]+\.md$/;
const IAA_RECORD = /^(?:\.agent-admin\/assurance\/(?:iaa-wave-record-|assurance-token-|iaa-token-session-|iaa-assurance-token-|rejection-package-)[A-Za-z0-9._-]+\.md|\.agent-workspace\/independent-assurance-agent\/memory\/(?:\.archive\/)?session-[A-Za-z0-9._-]+\.md)$/;
const TRIGGERS = /^(?:\.github\/agents\/|governance\/agents\/|governance\/contracts\/|governance\/canon\/|governance\/quality\/agent-integrity\/|\.github\/workflows\/(?:merge-gate-interface|trusted-iaa-assurance)\.yml$|\.github\/scripts\/(?:check-iaa-required\.sh|trusted-iaa-assurance\.js)$)|-agent-contract\.md$/;

function demand(condition, message) {
  if (!condition) throw new Error(message);
}

async function allPages(method, args, limit = 3000) {
  const items = [];
  for (let page = 1; page <= Math.ceil(limit / 100) + 1; page++) {
    const response = await method({ ...args, per_page: 100, page });
    demand(Array.isArray(response.data), 'Invalid paginated API response');
    items.push(...response.data);
    demand(items.length <= limit, 'API collection exceeds verified limit');
    if (response.data.length < 100) return items;
  }
  throw new Error('Incomplete API pagination');
}

function identity(pr) {
  return JSON.stringify([pr.number, pr.state, pr.head?.sha, pr.base?.sha,
    pr.base?.ref, pr.head?.repo?.full_name, pr.base?.repo?.full_name,
    (pr.labels || []).map(x => x.name).sort(), pr.changed_files, pr.commits]);
}

// Normal push activity binds an authenticated pusher to the entire introduced
// commit range, including commits before the tip of a batched push. Contents:read
// is sufficient; API denial or incomplete provenance never selects a fallback
// identity. Cursor links come from GitHub and must stay on this exact query.
async function pushActivities(github, repo, branch) {
  const ref = 'refs/heads/' + branch;
  const items = [], seen = new Set(), cursors = new Set();
  let cursor = {};
  for (let page = 0; page < 3; page++) {
    const response = await github.request('GET /repos/{owner}/{repo}/activity', {
      ...repo, ref, activity_type: 'push', direction: 'desc', per_page: 100,
      ...cursor, headers: { 'X-GitHub-Api-Version': '2026-03-10' }
    });
    demand(Array.isArray(response.data), 'Invalid source push activity response');
    for (const item of response.data) {
      demand(Number.isSafeInteger(item.id) && item.id > 0 && !seen.has(item.id) &&
        item.ref === ref && item.push_type === 'normal' && SHA.test(item.before) &&
        SHA.test(item.after) && item.before !== '0'.repeat(40) && item.before !== item.after &&
        Number.isSafeInteger(item.pusher?.id) && item.pusher.id > 0 &&
        typeof item.pusher.login === 'string' && /^[A-Za-z0-9-]+(?:\[bot\])?$/.test(item.pusher.login),
        'Invalid authenticated source push activity: ' + JSON.stringify({ id: item.id,
          ref: item.ref, push_type: item.push_type, before: item.before, after: item.after,
          pusher: { id: item.pusher?.id, login: item.pusher?.login } }));
      seen.add(item.id); items.push(item);
    }
    demand(items.length <= 250, 'Source push activity exceeds verified limit');
    const links = (response.headers?.link || '').split(',');
    const next = links.filter(link => /;\s*rel="next"\s*$/.test(link.trim()));
    demand(next.length <= 1, 'Ambiguous source push cursor');
    if (!next.length) {
      demand(response.data.length < 100, 'Incomplete source push activity pagination');
      return items;
    }
    const match = next[0].trim().match(/^<([^>]+)>;\s*rel="next"$/);
    demand(match, 'Invalid source push cursor');
    const url = new URL(match[1]);
    demand(url.origin === 'https://api.github.com' && !url.username && !url.password && !url.hash &&
      decodeURIComponent(url.pathname) === `/repos/${repo.owner}/${repo.repo}/activity` &&
      url.searchParams.get('ref') === ref && url.searchParams.get('activity_type') === 'push' &&
      url.searchParams.get('direction') === 'desc' && url.searchParams.get('per_page') === '100',
      'Source push cursor changed trusted query');
    const keys = [...url.searchParams.keys()];
    demand(new Set(keys).size === keys.length && keys.every(k =>
      ['ref','activity_type','direction','per_page','before','after'].includes(k)), 'Invalid source push cursor parameters');
    const names = ['before','after'].filter(k => url.searchParams.has(k));
    demand(names.length === 1 && url.searchParams.get(names[0]) && !cursors.has(url.href),
      'Missing or repeated source push cursor');
    cursors.add(url.href); cursor = { [names[0]]: url.searchParams.get(names[0]) };
  }
  throw new Error('Incomplete source push activity pagination');
}

async function pushedRange(github, repo, activity) {
  const commits = [];
  let total;
  for (let page = 1; page <= 3; page++) {
    const { data } = await github.rest.repos.compareCommitsWithBasehead({ ...repo,
      basehead: activity.before + '...' + activity.after, per_page: 100, page });
    demand(data.base_commit?.sha === activity.before && data.merge_base_commit?.sha === activity.before &&
      data.status === 'ahead' && data.behind_by === 0 && Number.isSafeInteger(data.total_commits) &&
      data.total_commits > 0 && data.total_commits <= 250 && data.ahead_by === data.total_commits &&
      Array.isArray(data.commits), 'Unverified source push commit range');
    if (total === undefined) total = data.total_commits;
    demand(total === data.total_commits, 'Source push comparison changed during pagination');
    commits.push(...data.commits.map(c => c.sha));
    demand(commits.every(c => SHA.test(c)) && new Set(commits).size === commits.length && commits.length <= total,
      'Invalid source push range commits');
    if (commits.length === total) {
      demand(commits.at(-1) === activity.after, 'Source push range tip mismatch');
      return new Set(commits);
    }
    demand(data.commits.length === 100, 'Incomplete source push range pagination');
  }
  throw new Error('Incomplete source push range pagination');
}

async function sourcePushActors({ github, repo, branch, sha, cache = {} }) {
  demand(SHA.test(sha) && typeof branch === 'string' && branch &&
    typeof repo.owner === 'string' && typeof repo.repo === 'string', 'Invalid source push query identity');
  const runs = await allPages(async opts => {
    const response = await github.rest.actions.listWorkflowRunsForRepo({ ...opts, head_sha: sha, event: 'push' });
    return { data: response.data.workflow_runs };
  }, repo, 100);
  const receipts = runs.filter(r => r.event === 'push' && r.head_sha === sha &&
    r.head_branch === branch && r.repository?.full_name === repo.owner + '/' + repo.repo);
  if (receipts.length) {
    demand(receipts.every(r => typeof r.actor?.login === 'string' && r.actor.login),
      'Authenticated source push provenance unavailable');
    return [...new Set(receipts.map(r => r.actor.login.toLowerCase()))];
  }
  const { data: commit } = await github.rest.repos.getCommit({ ...repo, ref: sha });
  demand(commit.sha === sha, 'Authenticated source push provenance unavailable');
  if (commit.stats?.total === 0 && commit.stats.additions === 0 && commit.stats.deletions === 0 &&
    Array.isArray(commit.files) && commit.files.length === 0 && Array.isArray(commit.parents) &&
    commit.parents.length === 1 && SHA.test(commit.parents[0].sha) && SHA.test(commit.commit?.tree?.sha)) {
    const { data: parent } = await github.rest.repos.getCommit({ ...repo, ref: commit.parents[0].sha });
    demand(parent.sha === commit.parents[0].sha && parent.commit?.tree?.sha === commit.commit.tree.sha,
      'Authenticated source push provenance unavailable');
    return []; // Verified empty commit contributes no source bytes.
  }
  if (!cache.activities) cache.activities = await pushActivities(github, repo, branch);
  if (!cache.ranges) cache.ranges = new Map();
  const logins = new Set();
  for (const activity of cache.activities) {
    if (!cache.ranges.has(activity.id)) cache.ranges.set(activity.id, await pushedRange(github, repo, activity));
    if (cache.ranges.get(activity.id).has(sha)) logins.add(activity.pusher.login.toLowerCase());
  }
  demand(logins.size > 0, 'Authenticated source push provenance unavailable');
  return [...logins];
}

function field(text, name) {
  // Exact fields in an authenticated IAA review, not text/filenames anywhere in a PR.
  const lines = text.replace(/\r/g, '').replace(/\*\*/g, '').replace(/`/g, '').split('\n');
  const values = lines.filter(line => line.startsWith(name + ':'))
    .map(line => line.slice(name.length + 1).trim());
  demand(values.length === 1 && values[0], 'Missing/ambiguous IAA field: ' + name);
  return values[0];
}

function attestation(review, pr, issuers, contributors) {
  const issuer = review.user?.login?.toLowerCase();
  demand(issuer && issuers.includes(issuer), 'IAA review issuer is not configured');
  demand(!contributors.has(issuer), 'IAA reviewer contributed to this submission');
  demand(review.state === 'APPROVED', 'IAA review is not approved');
  demand(review.commit_id === pr.head.sha, 'IAA review does not bind current head');
  demand(!review.body.includes('REJECTION-PACKAGE'), 'IAA review contains rejection');
  const body = review.body || '';
  demand(/^ASSURANCE-TOKEN\s*$/m.test(body), 'IAA review lacks canonical PASS marker');
  demand(field(body, 'PR') === '#' + pr.number, 'IAA review binds another PR');
  demand(field(body, 'Reviewed HEAD') === pr.head.sha, 'IAA source mismatch');
  demand(field(body, 'Independence') === 'CONFIRMED', 'Independence not confirmed');
  demand(field(body, 'Verdict') === 'MERGE PERMITTED', 'IAA verdict is not PASS');
  const path = field(body, 'Canonical record');
  const digest = field(body, 'Canonical record SHA256');
  demand(TOKEN_PATH.test(path), 'Noncanonical assurance record path');
  demand(/^[0-9a-f]{64}$/.test(digest), 'Invalid canonical record hash');
  return { path, digest };
}

async function evaluate({ github, context, issuers = [] }) {
  const args = { ...context.repo, pull_number: context.payload.pull_request.number };
  const { data: pr } = await github.rest.pulls.get(args);
  demand(pr.state === 'open' && Number.isSafeInteger(pr.number), 'PR is not open');
  demand(SHA.test(pr.head?.sha) && SHA.test(pr.base?.sha), 'Invalid source identity');
  const fullName = context.repo.owner + '/' + context.repo.repo;
  demand(pr.base?.repo?.full_name === fullName, 'Wrong repository identity');
  demand(pr.base.ref === context.payload.repository.default_branch, 'Trusted gate supports protected default base');
  demand(context.sha === pr.base.sha, 'Protected decision source is stale');
  const snapshot = identity(pr);
  const files = await allPages(github.rest.pulls.listFiles, args);
  demand(files.length === pr.changed_files, 'Incomplete PR diff');
  demand(new Set(files.map(f => f.filename)).size === files.length, 'Duplicate diff entries');
  for (const file of files) {
    demand(typeof file.filename === 'string' && file.filename.length > 0, 'Invalid diff path');
    demand(['added', 'modified', 'removed', 'renamed', 'copied', 'changed', 'unchanged'].includes(file.status), 'Invalid diff status');
    if (file.status === 'renamed') demand(typeof file.previous_filename === 'string', 'Rename lacks original path');
  }
  const required = pr.labels.some(x => ['aawp-deliverable', 'mat-deliverable'].includes(x.name)) ||
    files.some(f => TRIGGERS.test(f.filename) || TRIGGERS.test(f.previous_filename || ''));
  let assurance = null;
  if (required) {
    demand(Array.isArray(issuers) && issuers.length > 0, 'No authenticated independent IAA issuer configured');
    const commits = await allPages(github.rest.pulls.listCommits, args, 250);
    demand(commits.length === pr.commits, 'Incomplete contributor history');
    const contributors = new Set([pr.user?.login?.toLowerCase()]);
    demand(typeof pr.head.ref === 'string' && pr.head.ref, 'Missing source branch identity');
    const [headOwner, headRepo] = pr.head.repo.full_name.split('/');
    const pushCache = {};
    for (const commit of commits) {
      demand(SHA.test(commit.sha), 'Invalid submission commit identity');
      // Git author/committer fields are self-asserted. Only GitHub's authenticated
      // original actor of a push-triggered run or a verified repository push
      // activity/range is contributor provenance here.
      // Rerun triggering_actor is deliberately not treated as the original pusher.
      const logins = await sourcePushActors({ github, repo: { owner: headOwner, repo: headRepo },
        branch: pr.head.ref, sha: commit.sha, cache: pushCache });
      if (!logins.length) continue;
      let assuranceOnly = false;
      if (logins.some(login => issuers.includes(login))) {
        demand(SHA.test(commit.sha), 'Invalid assurance commit identity');
        const changes = await allPages(async opts => {
          const response = await github.rest.repos.getCommit({ ...opts, ref: commit.sha });
          demand(response.data.sha === commit.sha, 'Assurance commit identity mismatch');
          return { data: response.data.files };
        }, context.repo);
        assuranceOnly = changes.length > 0 && changes.every(f => IAA_RECORD.test(f.filename) &&
          (!f.previous_filename || IAA_RECORD.test(f.previous_filename)));
      }
      // IAA may publish its own canonical evidence. It must not author implementation.
      if (!assuranceOnly) for (const login of logins) contributors.add(login);
    }
    const reviews = await allPages(github.rest.pulls.listReviews, args, 1000);
    const latest = new Map();
    for (const review of reviews) {
      if (!review.user?.login || !['APPROVED', 'CHANGES_REQUESTED', 'DISMISSED'].includes(review.state)) continue;
      const login = review.user.login.toLowerCase();
      if (!latest.has(login) || review.id > latest.get(login).id) latest.set(login, review);
    }
    const candidates = [...latest.values()].filter(r => issuers.includes(r.user.login.toLowerCase()));
    demand(!candidates.some(r => r.state === 'CHANGES_REQUESTED'), 'Trusted IAA rejection remains unresolved');
    for (const review of candidates) {
      // Invalid trusted approval must fail, rather than silently falling back to an older token.
      if (review.state !== 'APPROVED') continue;
      const record = attestation(review, pr, issuers, contributors);
      const { data: content } = await github.rest.repos.getContent({ ...context.repo,
        path: record.path, ref: pr.head.sha });
      demand(content.type === 'file' && content.encoding === 'base64' && typeof content.content === 'string', 'Assurance record unavailable');
      demand(content.size <= 1024 * 1024, 'Assurance record is oversized');
      const bytes = Buffer.from(content.content.replace(/\s/g, ''), 'base64');
      demand(bytes.length === content.size, 'Incomplete assurance record');
      demand(createHash('sha256').update(bytes).digest('hex') === record.digest, 'Assurance record hash mismatch');
      const text = bytes.toString('utf8').replace(/\*\*/g, '').replace(/`/g, '');
      demand(/^ASSURANCE-TOKEN\s*$/m.test(text) && /^Independence:\s*CONFIRMED\s*$/m.test(text), 'Record lacks independent assurance');
      demand(new RegExp('^PR:\\s*#' + pr.number + '\\s*$', 'm').test(text), 'Record binds another PR');
      demand(/^Verdict:\s*MERGE PERMITTED\s*$/m.test(text), 'Record lacks unconditional PASS');
      demand(field(text, 'IAA Session') === field(review.body, 'IAA Session'), 'Record/review session mismatch');
      demand(/^\d{4}-\d{2}-\d{2}$/.test(field(text, 'Date')), 'Invalid assurance date');
      const tier = field(text, 'PR Tier');
      demand(/^T[1-4]$/.test(tier), 'Invalid assurance tier');
      const phases = field(text, 'Phases Verified').split(',').map(p => p.trim());
      const requiredPhases = ['T1', 'T2'].includes(tier) ? ['1-PASS','2-PASS','3-PASS','4-PASS'] : ['1-PASS','4-PASS'];
      demand(requiredPhases.every(p => phases.includes(p)) && phases.every(p => /^[1-4]-PASS$/.test(p)), 'Required assurance phases are not PASS');
      demand(['PASS','NOT-REQUIRED'].includes(field(text, 'FFA Assessment')), 'Invalid FFA assessment');
      demand(['PASS','NOT-REQUIRED'].includes(field(text, 'Agent Integrity')), 'Invalid agent integrity assessment');
      // The authenticated exact-head review binds the carried-forward canonical record.
      // No PR-controlled artifact is allowed to attest its own issuer or source.
      assurance = { review: review.id, issuer: review.user.login, record: record.path };
      break;
    }
    demand(assurance, 'No independent exact-head IAA approval and bound canonical record');
  }
  const { data: current } = await github.rest.pulls.get(args);
  demand(identity(current) === snapshot, 'PR source/labels changed during assurance evaluation');
  return { sha: pr.head.sha, fingerprint: snapshot, state: 'success', required, assurance,
    description: required ? 'Independent IAA identity, review and record verified' : 'Complete trusted diff: independent IAA not applicable' };
}

async function run({ github, writer, context, core, issuers, producer }) {
  // Initial event identity is used for failures only, never as success evidence.
  const sha = context.payload.pull_request.head.sha;
  demand(SHA.test(sha), 'Invalid event head');
  demand(producer && writer, 'Protected status producer is not configured');
  const args = { ...context.repo, sha, context: STATUS_CONTEXT,
    target_url: `${context.serverUrl || 'https://github.com'}/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.runId}` };
  const publish = async (state, description) => {
    const { data } = await writer.rest.repos.createCommitStatus({ ...args, state, description: description.slice(0,140) });
    demand(data.creator?.login === producer, 'Status was emitted by an unexpected identity');
  };
  await publish('pending', 'Trusted independent assurance is being evaluated');
  try {
    const decision = await evaluate({ github, context, issuers });
    demand(decision.sha === sha, 'Event head is stale');
    // Last head read immediately before success publication; concurrent old-head status
    // cannot satisfy protection for a newer head.
    const { data: final } = await github.rest.pulls.get({ ...context.repo, pull_number: context.payload.pull_request.number });
    demand(final.head.sha === sha && identity(final) === decision.fingerprint, 'Source/labels changed before status publication');
    await publish('success', decision.description);
    core.info(JSON.stringify(decision));
    return decision;
  } catch (error) {
    await publish('failure', 'Independent assurance blocked: ' + error.message);
    core.setFailed(error.message);
    return { sha, state: 'failure', description: error.message };
  }
}

module.exports = { STATUS_CONTEXT, TRIGGERS, evaluate, run, attestation, allPages, sourcePushActors };
