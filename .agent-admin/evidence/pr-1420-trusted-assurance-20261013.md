# PR1420 trusted independent-assurance source correction

Date: 2026-10-13
Publisher: Codex acting as Johan's authorized original implementation proxy
Baseline: 66beb4d60a33f21d1940aac6d68dd4bf84ec6de0
Work item: APGI-cmy/maturion-foreman-governance PR1420
Parent context: job-CS2-AUTOMATION-W1-W2-20261008; alias CS2-AUTOMATION-W1-W2-20261008
Posture: STOP_AND_FIX pending actual independent assurance and installation

## Concrete repair

The PR checkout can no longer supply decision code to the proposed trusted lane.
The pull_request_target/issue_comment workflow reads the protected default-base
script at the event's github.sha, refuses a stale base, and never checks out or
executes PR-head code. It paginates and validates the complete PR diff, including
removed/renamed enforcement paths and all original path/label trigger categories.
The original all-base trigger lane remains and its 25 regression cases still pass.

A protected writer emits iaa/trusted-assurance-check for the exact PR head after
rechecking head, base, labels and scope metadata. Failed/partial API results,
missing configuration, source changes, self-assurance, unrelated/dismissed/rejected
reviews and forged canonical record content fail closed. A canonical record's
filename or PASS text cannot supply its own authentication: an explicitly trusted,
noncontributing IAA principal must issue an authenticated APPROVED GitHub review
binding the current head, canonical record path and SHA256 bytes. The canonical
record must contain the existing IAA PASS fields, required phase PASS states and
matching session identity. This publisher creates no IAA verdict or token.

The credential follows GOVERNANCE_TOKEN_USAGE_REQUIREMENTS: only the protected
MATURION_BOT_TOKEN publishes status, with its identity verified on the initial
pending response. The ordinary Actions token reads metadata. The status identity
must be a dedicated GitHub App constrained by main's expected status producer;
using the same generic GitHub Actions app for every workflow is insufficient.

## Real validation

- Existing real-Git checker suite: 25/25 PASS, zero failures/skips.
- New trusted metadata/identity/status/workflow adversarial tests: 35/35 PASS,
  zero failures/skips. These are controlled API fixtures, not live provider proof.
- Both changed/new workflow files passed duplicate-key-rejecting YAML parsing.
- Manifest and actual PR scope are validated before publication.
- The canonical bash token-usage linter was stopped after stalling on this Windows
  host; it is not reported PASS locally. A batch scan of all 24 workflow files
  passed the same three prohibited-token patterns. Actual canonical CI remains
  required and is reported from GitHub after publication.
- No trusted workflow execution or installation on main is claimed. Existing
  independent IAA remains unresolved until its authorized reviewer issues a real
  source-bound result. Local or CI test success does not supply that result.

## Exact administrator installation packet

The connector returned GitHub 403 Resource not accessible by integration from
GET /repos/APGI-cmy/maturion-foreman-governance/branches/main/protection.
The only visible repository ruleset (10891479) is disabled; that does not prove
classic branch protection is absent. The proxy cannot verify or install required
checks through this connector and does not use another credential to evade it.

After independent review and Johan's merge decision, the repository administrator
must install/verify these concrete settings:

1. Environment iaa-trusted-assurance with deployment branch restriction to main.
2. Environment-scoped secret MATURION_BOT_TOKEN for a dedicated status-publishing
   GitHub App with repository metadata/contents/pull-request reads and commit
   statuses write. Its credential must be unavailable to PR workflows; no
   repository/organization-scoped fallback credential may supply this identity.
3. Environment variable IAA_STATUS_PRODUCER_LOGIN containing that App's exact bot
   login. Environment variable IAA_ISSUER_LOGINS containing comma-separated,
   explicitly authorized independent IAA account/App logins. Do not default to
   Copilot or trust a self-declared role; the submitted PR author is Copilot.
4. Existing independently appointed IAA publishes its canonical PASS record and
   an authenticated APPROVED review from an allowed noncontributing identity.
   Its review includes existing PASS/PR/session/independence/verdict fields plus:
   Reviewed HEAD: <actual current head>
   Canonical record: <existing .agent-admin/assurance/ record path>
   Canonical record SHA256: <actual bytes hash>
   This is transport binding for the existing record, not a replacement verdict.
5. Require iaa/trusted-assurance-check on main with the expected source restricted
   to the dedicated App, preserving all existing required checks and no bypass.
   Require the PR to be up to date so an older base-policy result cannot carry to
   a changed base. Verify real runtime refusals for missing/forged assurance,
   checker deletion and a changing head before declaring the gate operational.
6. On authentic review issuance/revocation, publish the normal result/withdrawal
   conversation update to trigger the protected issue_comment reevaluation. The
   webhook used for reevaluation must stay on the protected default-branch source;
   no privileged pull_request_review execution is introduced.

If no supported distinct authenticated IAA identity exists, the provider/admin
must supply that provenance adapter before this gate can accept assurance.
The source deliberately fails closed instead of treating the shared Copilot
identity or a record's text as proof of independent issuance.

## Chronology and ownership

Prior rejection and review6059310592 remain historical evidence. The October13
human direction was recorded in PR comment6143369590 before this implementation.
This is a substantive trust-boundary correction, not a head refresh to hide an
unchanged finding. No correction/runtime ledger is present here; missing spend
is not zero and no shared history, allowance, breaker or counter is reset.
No main merge, live generic dispatch, deployment, activation, W1/W2 acceptance or
independent assurance is claimed. A rejection retains source ownership.

## Submitted source file hashes

| File | SHA256 of actual bytes |
|---|---|
| `.github/scripts/check-iaa-required.sh` | `22c5956f7af60f05930f45600832abceaf30a0ca68437be54638421ca793bfba` |
| `.github/scripts/trusted-iaa-assurance.js` | `377558bf8a9afc6cd6f5cb0195d7a20a1c34e740d21fb821e2760d6da0e73fda` |
| `.github/scripts/tests/test-trusted-iaa-assurance.js` | `064201592096c4e43ce84cc9ff20b5628c7648fe49d3ffabcb1f70990533a03a` |
| `.github/workflows/merge-gate-interface.yml` | `86c4ad63f503a7e50cc31944020062f12daad5c4e062af768afce23357f5b167` |
| `.github/workflows/trusted-iaa-assurance.yml` | `0607ce56491006c60ae48b165d94293d0189f28838652c3416414de382770e15` |
