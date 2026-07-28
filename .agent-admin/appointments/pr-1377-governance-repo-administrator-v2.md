# Bounded Appointment — governance-repo-administrator-v2 — PR #1377

**Appointment ID**: PR1377-GRA-V2-20260728  
**Issued**: 2026-07-28  
**Issued By**: foreman-v2 under direct CS2 authority — Johan Ras  
**Appointee**: governance-repo-administrator-v2  
**Agent Class**: administrator  
**Agent Version**: 6.2.0  
**Contract Version**: 2.0.0  
**Contract**: `.github/agents/governance-repo-administrator-v2.agent.md`  
**Contract SHA-256 at Appointment**: `55b87adf5794ceba832051caa3113fb01de0ea6ad8e21f8e4d12368ee585b961`  
**Repository**: `APGI-cmy/maturion-foreman-governance`  
**Issue**: #1376  
**PR**: #1377  
**Branch**: `repair/admin-ceremony-token-resolution-1376`  
**Task-Set Commit**: `c7bab9bd1e46fd9e49dacb331f8bdf894ad27ccd`  
**Independent IAA Pre-Brief Commit**: `e0c2fd455ec8eb136f76732244b43356d33fa55a`  
**Appointment Status**: ACTIVE ON PUBLICATION  
**Implementation Status at Appointment**: NOT STARTED

## Mission

Repair the Admin-Ceremony placeholder-final-state job so every immutable COMPLETE
PREHANDOVER proof is resolved against its own deterministic PR identity and exactly one
genuine dedicated IAA token. Build executable QA-to-Red before implementation, preserve all
historical proof/token bytes, and return a Green evidence package for Foreman QP.

## Authorized tasks

- TASK-1377-004 — contract-first wake-up and frozen preflight;
- TASK-1377-005 — executable QA-to-Red;
- TASK-1377-006 — proof-specific identity and dedicated-token implementation;
- TASK-1377-007 — build fixtures and full workflow to Green;
- TASK-1377-008 — immutable Green evidence and exact scope return.

## Exact implementation and test write boundary

- `.github/workflows/admin-ceremony-defect-gate.yml`
- `.github/scripts/validate-admin-ceremony-final-state.sh`
- `.github/scripts/tests/test-admin-ceremony-token-resolution.sh`

## PR-scoped evidence write boundary

- `.admin/pr.json`
- `.agent-admin/evidence/pr-1377-*`
- `.agent-admin/scope-declarations/pr-1377.md`
- `.agent-admin/waves/wave-pr-1377-admin-ceremony-token-resolution-current-tasks.md`
- `.agent-workspace/governance-repo-administrator/memory/session-GA-1377-*`

No other implementation, test, workflow, proof, token, canon, contract, consumer, application,
deployment, or live-environment path is authorized.

## Mandatory order

1. Read the full administrator contract as the first repository file of the execution session.
2. Complete Tier 1/Tier 2 induction, FAIL-ONLY-ONCE attestation, and canonical wake-up.
3. Verify this appointment, task/pre-brief ancestry, exact scope, and historical artifact hashes.
4. Commit executable QA-to-Red and evidence before changing the workflow or adding its producer.
5. Implement only within the exact three-path producer/test boundary.
6. Run the committed fixture suite and complete Admin-Ceremony scan to Green with zero skips.
7. Prove the historical PR #1356, #1360, and #1368 proofs/tokens remain byte-identical.
8. Return `COMPLETE` with exact evidence or `BLOCKED`; do not self-approve.

## Required behavior

- Extract exactly one numeric `pr:` identity from each COMPLETE proof after markdown normalization.
- Require exactly one dedicated `iaa-token-session-*.md` whose complete PR-reference set is
  exactly the proof PR and whose verdict is merge-permitted assurance.
- Reject absent, malformed, or ambiguous proof identity.
- Reject absent, malformed, ambiguous, bridge/multi-PR, or cross-PR token evidence.
- Scan all historical COMPLETE proofs; do not reduce scope to the active PR or active bundle.

## Prohibitions

- No active pull-request number fallback for historical proof identity.
- No added-token-file shortcut and no first-match acceptance.
- No PR allowlist, waiver, unconditional success, suppression, or weakened pattern.
- No historical PREHANDOVER proof or historical IAA token mutation.
- No CANON, policy, agent-contract, PR #1375 implementation, consumer, ISMS/MMM/Supabase,
  deployment, or live-environment change.
- No direct push to `main`, PR promotion, merge, QP, ECAP, or IAA verdict.

## Handover boundary

The administrator returns implementation and evidence to Foreman. Foreman independently
performs QP; ECAP reconciles administration; only independent IAA may issue the final token;
CS2 remains merge authority.
