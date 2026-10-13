'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const { evaluate, run, TRIGGERS, sourcePushActors } = require('../trusted-iaa-assurance');
const head = 'a'.repeat(40), base = 'b'.repeat(40);
const path = '.agent-admin/assurance/iaa-wave-record-fixture.md';
const token = `ASSURANCE-TOKEN\nPR: #1420\nDate: 2026-10-13\nIAA Session: fixture-independent-session\nPR Tier: T4\nPhases Verified: 1-PASS, 4-PASS\nFFA Assessment: NOT-REQUIRED\nAgent Integrity: PASS\nIndependence: CONFIRMED\nVerdict: MERGE PERMITTED\n`;
const digest = createHash('sha256').update(token).digest('hex');

function fixture({ files, labels, reviewChange, fileChange, readChange, commits, assuranceFiles, pushActor, noPushReceipt, commitRead, tokenText = token } = {}) {
  const fileList = files || [{ filename: '.github/scripts/check-iaa-required.sh', status: 'removed' }];
  const pr = { number: 1420, state: 'open', head: { sha: head, ref: 'feature', repo: { full_name: 'owner/repo' } },
    base: { sha: base, ref: 'main', repo: { full_name: 'owner/repo' } },
    user: { login: 'builder' }, labels: labels || [], changed_files: fileList.length, commits: commits?.length || 1 };
  const review = { id: 7, state: 'APPROVED', commit_id: head, user: { login: 'independent-iaa' },
    body: `ASSURANCE-TOKEN\nPR: #1420\nReviewed HEAD: ${head}\nIAA Session: fixture-independent-session\nIndependence: CONFIRMED\nVerdict: MERGE PERMITTED\nCanonical record: ${path}\nCanonical record SHA256: ${digest}` };
  if (reviewChange) reviewChange(review);
  const statuses = [], calls = [];
  let reads = 0;
  const github = { request: async () => ({ data: [], headers: {} }), rest: { actions: {
    listWorkflowRunsForRepo: async ({ head_sha }) => ({ data: { workflow_runs: (typeof noPushReceipt === 'function' ? noPushReceipt(head_sha) : noPushReceipt) ? [] : [{
      event: 'push', head_sha, head_branch: 'feature', repository: { full_name: 'owner/repo' },
      actor: { login: pushActor || (head_sha === 'e'.repeat(40) ? 'independent-iaa' : 'builder') }
    }] } })
  }, pulls: {
    get: async () => { reads++; const p = structuredClone(pr); if (readChange) readChange(p, reads); return { data: p }; },
    listFiles: async ({ page }) => { calls.push('files:' + page); if (fileChange) return fileChange(fileList, page);
      return { data: fileList.slice((page - 1) * 100, page * 100) }; },
    listCommits: async () => ({ data: commits || [{ sha: 'd'.repeat(40), author: { login: 'builder' }, committer: { login: 'builder' } }] }),
    listReviews: async () => ({ data: [review] })
  }, repos: {
    getCommit: async ({ ref }) => commitRead ? commitRead(ref) : ({ data: { sha: ref, files: assuranceFiles || [{ filename: path, status: 'added' }] } }),
    getContent: async ({ path: requested, ref }) => { calls.push('content:' + requested + ':' + ref);
      assert.equal(ref, head); assert.equal(requested, path);
      return { data: { type: 'file', encoding: 'base64', content: Buffer.from(tokenText).toString('base64'), size: Buffer.byteLength(tokenText) } }; }
  } } };
  const writer = { rest: { repos: { createCommitStatus: async args => {
    statuses.push(args); return { data: { creator: { login: 'trusted-status-app[bot]' } } }; }
  } } };
  const core = { info() {}, setFailed(message) { calls.push('failed:' + message); } };
  const context = { repo: { owner: 'owner', repo: 'repo' }, runId: 1, sha: base,
    payload: { pull_request: structuredClone(pr), repository: { default_branch: 'main' } } };
  return { github, writer, context, core, issuers: ['independent-iaa'], producer: 'trusted-status-app[bot]', statuses, calls };
}

test('valid independent review binds canonical record bytes and current head', async () => {
  const f = fixture(); const result = await run(f);
  assert.equal(result.state, 'success'); assert.equal(result.required, true);
  assert.deepEqual(f.statuses.map(s => s.state), ['pending', 'success']);
  assert(f.statuses.every(s => s.sha === head && s.context === 'iaa/trusted-assurance-check'));
});

function batchFixture({ actor = 'builder', activities, activityRead, compareRead } = {}) {
  const f = fixture({ noPushReceipt: sha => sha === 'd'.repeat(40) });
  const before = 'c'.repeat(40), tip = 'e'.repeat(40);
  const activity = { id: 1, before, after: tip, ref: 'refs/heads/feature',
    push_type: 'normal', pusher: { id: 10, login: actor } };
  const comparison = { base_commit: { sha: before }, merge_base_commit: { sha: before },
    status: 'ahead', behind_by: 0, ahead_by: 2, total_commits: 2,
    commits: [{ sha: 'd'.repeat(40) }, { sha: tip }] };
  const reads = { activity: 0, compare: 0 };
  f.github.request = async (route, args) => {
    reads.activity++; assert.equal(route, 'GET /repos/{owner}/{repo}/activity');
    assert.equal(args.owner, 'owner'); assert.equal(args.repo, 'repo');
    assert.equal(args.ref, 'refs/heads/feature'); assert.equal(args.activity_type, 'push');
    assert(!args.actor); assert(!args.time_period);
    return activityRead ? activityRead(args) : { data: activities || [activity], headers: {} };
  };
  f.github.rest.repos.compareCommitsWithBasehead = async args => {
    reads.compare++; assert.equal(args.basehead, before + '...' + tip);
    return compareRead ? compareRead(args, structuredClone(comparison)) : { data: comparison };
  };
  return { f, activity, comparison, reads };
}

test('batched source commit before the push tip uses GitHub pusher and verified range', async () => {
  const { f, reads } = batchFixture();
  assert.equal((await evaluate(f)).state, 'success');
  assert.equal(reads.activity, 1); assert.equal(reads.compare, 1);
});

test('an IAA batched implementation push cannot hide behind commit author metadata', async () => {
  const { f } = batchFixture({ actor: 'independent-iaa' });
  f.github.rest.repos.getCommit = async ({ ref }) => ({ data: { sha: ref,
    author: { login: 'builder' }, files: [{ filename: '.github/scripts/trusted-iaa-assurance.js' }] } });
  await assert.rejects(evaluate(f), /contributed/);
});

test('a matching activity must introduce the commit, not merely surround an unrelated SHA', async () => {
  const { f } = batchFixture({ compareRead: (args, data) => {
    data.commits[0].sha = 'f'.repeat(40); return { data };
  } });
  await assert.rejects(evaluate(f), /push provenance unavailable/);
});

test('malformed, foreign-branch, force and unauthenticated push activities are refused', async () => {
  for (const mutate of [a => { a.ref = 'refs/heads/other'; }, a => { a.push_type = 'force'; },
    a => { a.before = '0'.repeat(40); }, a => { a.after = a.before; }, a => { a.id = 0; },
    a => { a.pusher.id = 0; }, a => { a.pusher.login = ''; }, a => { a.pusher.login = 'forged/name'; }]) {
    const b = batchFixture(); mutate(b.activity);
    await assert.rejects(evaluate(b.f), /Invalid authenticated source push activity/);
  }
});

test('incomplete, divergent and substituted push ranges never authenticate a contributor', async () => {
  for (const mutate of [d => { d.base_commit.sha = 'f'.repeat(40); },
    d => { d.merge_base_commit.sha = 'f'.repeat(40); }, d => { d.status = 'diverged'; },
    d => { d.behind_by = 1; }, d => { d.total_commits = 3; d.ahead_by = 3; },
    d => { d.commits[1].sha = 'f'.repeat(40); }, d => { d.commits[0].sha = d.commits[1].sha; },
    d => { d.total_commits = 251; d.ahead_by = 251; }, d => { d.commits[0].sha = 'bad'; }]) {
    const b = batchFixture({ compareRead: (args, data) => { mutate(data); return { data }; } });
    await assert.rejects(evaluate(b.f), /source push|Source push/);
  }
});

test('API permission denial does not fall back to author fields or emit success', async () => {
  const { f } = batchFixture({ activityRead: () => { throw new Error('403 access denied'); } });
  assert.equal((await run(f)).state, 'failure'); assert(!f.statuses.some(s => s.state === 'success'));
});

test('a second compare page proves all introduced commits and caches one activity query', async () => {
  const b = batchFixture({ compareRead: ({ page }, data) => {
    data.total_commits = 101; data.ahead_by = 101;
    data.commits = page === 1 ? Array.from({ length: 100 }, (_, i) => ({ sha: (i + 1).toString(16).padStart(40, '0') })) : [{ sha: b.activity.after }];
    return { data };
  } });
  const cache = {}, args = { github: b.f.github, repo: { owner: 'owner', repo: 'repo' }, branch: 'feature', cache };
  b.f.github.rest.actions.listWorkflowRunsForRepo = async () => ({ data: { workflow_runs: [] } });
  assert.deepEqual(await sourcePushActors({ ...args, sha: '1'.padStart(40, '0') }), ['builder']);
  assert.deepEqual(await sourcePushActors({ ...args, sha: '2'.padStart(40, '0') }), ['builder']);
  assert.equal(b.reads.activity, 1); assert.equal(b.reads.compare, 2);
});

test('trusted activity cursor can continue but cannot change origin, branch or filters', async () => {
  const query = new URLSearchParams({ ref: 'refs/heads/feature', activity_type: 'push', direction: 'desc', per_page: '100', before: 'cursor-from-github' });
  const next = 'https://api.github.com/repos/owner/repo/activity?' + query;
  const b = batchFixture();
  const first = { ...b.activity, id: 2 };
  b.f.github.request = async (route, args) => args.before ? { data: [b.activity], headers: {} } :
    { data: [first], headers: { link: '<' + next + '>; rel="next"' } };
  assert.equal((await evaluate(b.f)).state, 'success');
  for (const bad of [next.replace('api.github.com', 'attacker.example'), next.replace('owner/repo', 'other/repo'),
    next.replace('feature', 'other'), next + '&actor=attacker', next + '&before=duplicate']) {
    const c = batchFixture({ activityRead: () => ({ data: [], headers: { link: '<' + bad + '>; rel="next"' } }) });
    await assert.rejects(evaluate(c.f), /cursor|Cursor/);
  }
});

test('duplicated activities, unpaged full responses and exhausted limits fail closed', async () => {
  const b = batchFixture();
  b.f.github.request = async () => ({ data: [b.activity, b.activity], headers: {} });
  await assert.rejects(evaluate(b.f), /Invalid authenticated/);
  const c = batchFixture({ activityRead: () => ({ data: Array.from({ length: 100 }, (_, i) => ({ ...b.activity, id: i + 1 })), headers: {} }) });
  await assert.rejects(evaluate(c.f), /Incomplete source push activity/);
  let page = 0;
  const d = batchFixture({ activityRead: () => {
    const n = page++;
    const query = new URLSearchParams({ ref: 'refs/heads/feature', activity_type: 'push', direction: 'desc', per_page: '100', before: 'page-' + n });
    return { data: Array.from({ length: 100 }, (_, i) => ({ ...b.activity, id: n * 100 + i + 1 })),
      headers: { link: '<https://api.github.com/repos/owner/repo/activity?' + query + '>; rel="next"' } };
  } });
  await assert.rejects(evaluate(d.f), /exceeds verified limit/);
});

for (const name of ['.github/scripts/check-iaa-required.sh', '.github/scripts/trusted-iaa-assurance.js',
  '.github/workflows/merge-gate-interface.yml', '.github/workflows/trusted-iaa-assurance.yml']) {
  test('deleted or weakened enforcement path stays qualifying: ' + name, async () => {
    for (const status of ['removed', 'modified']) {
      const f = fixture({ files: [{ filename: name, status }] }); f.issuers = [];
      await assert.rejects(evaluate(f), /No authenticated independent IAA issuer/);
      assert.equal(f.calls.filter(c => c.startsWith('content:')).length, 0);
    }
  });
}
test('renaming the PR workflow still requires IAA from its old path', async () => {
  const f = fixture({ files: [{ filename: '.github/workflows/disabled.yml', previous_filename: '.github/workflows/merge-gate-interface.yml', status: 'renamed' }] });
  f.issuers = []; await assert.rejects(evaluate(f), /No authenticated/);
});
test('trigger categories and label-only routes remain present', async () => {
  for (const filename of ['.github/agents/a.md', 'governance/agents/a.md', 'governance/contracts/a.md',
    'a-agent-contract.md', 'governance/canon/a.md', 'governance/quality/agent-integrity/a.md']) assert(TRIGGERS.test(filename));
  for (const name of ['mat-deliverable', 'aawp-deliverable']) {
    const f = fixture({ files: [{ filename: 'docs/a.md', status: 'modified' }], labels: [{ name }] });
    assert.equal((await evaluate(f)).required, true);
  }
});
test('complete nonqualifying diff succeeds without a token', async () => {
  const f = fixture({ files: [{ filename: 'docs/a.md', status: 'modified' }] }); f.issuers = [];
  assert.equal((await evaluate(f)).required, false);
});
test('a qualifying file on the second page cannot be hidden', async () => {
  const files = Array.from({ length: 100 }, (_, i) => ({ filename: 'docs/' + i + '.md', status: 'modified' }));
  files.push({ filename: '.github/scripts/check-iaa-required.sh', status: 'removed' });
  const f = fixture({ files }); assert.equal((await evaluate(f)).required, true);
  assert(f.calls.includes('files:2'));
});
test('truncated diff blocks', async () => {
  const f = fixture({ fileChange: () => ({ data: [] }) }); await assert.rejects(evaluate(f), /Incomplete PR diff/);
});
test('diff API failure blocks with no success status', async () => {
  const f = fixture({ fileChange: () => { throw new Error('API unavailable'); } });
  assert.equal((await run(f)).state, 'failure'); assert.deepEqual(f.statuses.map(s => s.state), ['pending', 'failure']);
});
test('duplicate diff entries block', async () => {
  const f = fixture({ files: [{ filename: 'docs/a.md', status: 'modified' }, { filename: 'docs/a.md', status: 'modified' }] });
  await assert.rejects(evaluate(f), /Duplicate diff/);
});
for (const [name, change, pattern] of [
  ['forged issuer', r => { r.user.login = 'attacker'; }, /No independent/],
  ['producer self-assurance', r => { r.user.login = 'builder'; }, /contributed/],
  ['wrong review head', r => { r.commit_id = base; }, /current head/],
  ['wrong attested head', r => { r.body = r.body.replace('Reviewed HEAD: ' + head, 'Reviewed HEAD: ' + base); }, /source mismatch/],
  ['wrong PR', r => { r.body = r.body.replace('PR: #1420', 'PR: #1421'); }, /another PR/],
  ['hash substitution', r => { r.body = r.body.replace(digest, 'c'.repeat(64)); }, /hash mismatch/],
  ['noncanonical path', r => { r.body = r.body.replace(path, 'docs/token.md'); }, /Noncanonical/],
  ['duplicate fields', r => { r.body += '\nReviewed HEAD: ' + head; }, /ambiguous/],
  ['conditional permission', r => { r.body = r.body.replace('Verdict: MERGE PERMITTED', 'Verdict: MERGE PERMITTED subject to blockers'); }, /not PASS/],
  ['rejection', r => { r.state = 'CHANGES_REQUESTED'; }, /rejection/],
  ['dismissed review', r => { r.state = 'DISMISSED'; }, /No independent/]
]) test('rejects ' + name, async () => {
  const f = fixture({ reviewChange: change }); if (name === 'producer self-assurance') f.issuers = ['builder'];
  await assert.rejects(evaluate(f), pattern);
});
test('PR-head token edits cannot preserve approval hash', async () => {
  const f = fixture({ tokenText: token + 'forged extra data' }); await assert.rejects(evaluate(f), /hash mismatch/);
});
test('a trusted hash cannot make incomplete phase evidence valid', async () => {
  const text = token.replace('1-PASS, 4-PASS', '1-PASS');
  const hash = createHash('sha256').update(text).digest('hex');
  const f = fixture({ tokenText: text, reviewChange: r => { r.body = r.body.replace(digest, hash); } });
  await assert.rejects(evaluate(f), /phases are not PASS/);
});
test('commit-author metadata does not supply contributor authentication', async () => {
  const f = fixture({ commits: [{ sha: 'd'.repeat(40), author: null, committer: null }] });
  assert.equal((await evaluate(f)).state, 'success');
});
test('forged commit-author attribution cannot hide an issuer push', async () => {
  const f = fixture({ pushActor: 'independent-iaa',
    assuranceFiles: [{ filename: '.github/scripts/trusted-iaa-assurance.js', status: 'modified' }] });
  await assert.rejects(evaluate(f), /contributed/);
});
test('missing authenticated push provenance fails closed', async () => {
  await assert.rejects(evaluate(fixture({ noPushReceipt: true })), /push provenance unavailable/);
});
test('head changes during metadata reads block', async () => {
  const f = fixture({ readChange: (pr, n) => { if (n >= 2) pr.head.sha = 'c'.repeat(40); } });
  await assert.rejects(evaluate(f), /changed during/);
});
test('labels change immediately before publication blocks success', async () => {
  const f = fixture({ readChange: (pr, n) => { if (n === 3) pr.labels = [{ name: 'mat-deliverable' }]; } });
  assert.equal((await run(f)).state, 'failure'); assert(!f.statuses.some(s => s.state === 'success'));
});
test('different base repository or stacked base is refused', async () => {
  for (const mutate of [pr => { pr.base.repo.full_name = 'other/repo'; }, pr => { pr.base.ref = 'stacked'; }]) {
    const f = fixture({ readChange: mutate }); await assert.rejects(evaluate(f), /repository identity|protected default base/);
  }
});
test('missing protected status producer cannot emit a success', async () => {
  const f = fixture(); f.producer = ''; await assert.rejects(run(f), /not configured/);
  assert.equal(f.statuses.length, 0);
});
test('unexpected status writer is refused before success', async () => {
  const f = fixture(); f.producer = 'unexpected'; await assert.rejects(run(f), /unexpected identity/);
  assert(!f.statuses.some(s => s.state === 'success'));
});
test('outdated protected-base evaluator cannot publish success', async () => {
  const f = fixture(); f.context.sha = 'c'.repeat(40);
  await assert.rejects(evaluate(f), /decision source is stale/);
});
test('IAA can publish its canonical record without becoming an implementation author', async () => {
  const f = fixture({ commits: [
    { sha: 'd'.repeat(40), author: { login: 'builder' }, committer: { login: 'builder' } },
    { sha: 'e'.repeat(40), author: { login: 'independent-iaa' }, committer: { login: 'independent-iaa' } }
  ] });
  assert.equal((await evaluate(f)).state, 'success');
});
test('IAA authoring implementation along with its record violates independence', async () => {
  const f = fixture({ commits: [ { sha: 'e'.repeat(40), author: { login: 'independent-iaa' }, committer: { login: 'independent-iaa' } } ],
    assuranceFiles: [{ filename: path, status: 'added' }, { filename: '.github/scripts/trusted-iaa-assurance.js', status: 'modified' }] });
  await assert.rejects(evaluate(f), /contributed/);
});
test('executable code inside the assurance directory is not an IAA record exception', async () => {
  const f = fixture({ commits: [ { sha: 'e'.repeat(40) } ],
    assuranceFiles: [{ filename: '.agent-admin/assurance/implementation.js', status: 'added' }] });
  await assert.rejects(evaluate(f), /contributed/);
});
test('privileged workflow is wired solely to protected-base code and events', () => {
  const fs = require('node:fs');
  const workflow = fs.readFileSync(require('node:path').resolve(__dirname, '../../workflows/trusted-iaa-assurance.yml'), 'utf8');
  assert.match(workflow, /pull_request_target:/);
  assert.match(workflow, /issue_comment:/);
  assert.doesNotMatch(workflow, /^\s+pull_request:|pull_request_review:|workflow_run:/m);
  assert.match(workflow, /ref: \$\{\{ github\.sha \}\}/);
  assert.doesNotMatch(workflow, /ref:.*(?:head|pull_request)/);
  assert.match(workflow, /persist-credentials: false/);
  assert.match(workflow, /environment: iaa-trusted-assurance/);
  assert.match(workflow, /secrets\.MATURION_BOT_TOKEN/);
  assert.doesNotMatch(workflow, /\|\|.*(?:github\.token|GITHUB_TOKEN)/);
});

test('an empty planning commit without a push receipt requires identical verified trees', async () => {
  const emptySha = 'e'.repeat(40), parentSha = 'f'.repeat(40), tree = '1'.repeat(40);
  const f = fixture({
    commits: [{ sha: emptySha }, { sha: 'd'.repeat(40) }],
    noPushReceipt: sha => sha === emptySha,
    commitRead: ref => ({ data: ref === emptySha ? {
      sha: emptySha, stats: { total: 0, additions: 0, deletions: 0 }, files: [],
      parents: [{ sha: parentSha }], commit: { tree: { sha: tree } }
    } : { sha: parentSha, commit: { tree: { sha: tree } } } })
  });
  assert.equal((await evaluate(f)).state, 'success');
});

test('a missing receipt cannot be bypassed by a false or incomplete empty-commit claim', async () => {
  const emptySha = 'e'.repeat(40), parentSha = 'f'.repeat(40), tree = '1'.repeat(40);
  for (const mutate of [
    (c, p) => { c.stats.total = 1; },
    (c, p) => { c.stats.additions = 1; },
    (c, p) => { c.files = [{ filename: '.github/scripts/trusted-iaa-assurance.js' }]; },
    (c, p) => { c.parents = []; },
    (c, p) => { c.parents.push({ sha: '2'.repeat(40) }); },
    (c, p) => { c.sha = '3'.repeat(40); },
    (c, p) => { p.sha = '3'.repeat(40); },
    (c, p) => { p.commit.tree.sha = '4'.repeat(40); },
    (c, p) => { delete c.commit.tree.sha; }
  ]) {
    const empty = { sha: emptySha, stats: { total: 0, additions: 0, deletions: 0 },
      files: [], parents: [{ sha: parentSha }], commit: { tree: { sha: tree } } };
    const parent = { sha: parentSha, commit: { tree: { sha: tree } } };
    mutate(empty, parent);
    const f = fixture({ commits: [{ sha: emptySha }], noPushReceipt: true,
      commitRead: ref => ({ data: ref === emptySha ? empty : parent }) });
    await assert.rejects(evaluate(f), /push provenance unavailable/);
  }
});
