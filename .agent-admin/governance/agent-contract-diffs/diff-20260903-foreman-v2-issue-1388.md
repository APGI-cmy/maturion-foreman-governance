# Agent Contract Diff Record - Issue #1388

## Authority

CS2 authorized Issue #1388, "Codify Foreman stop-and-fix handling for IAA
rejections."

## Changed Contract and Integrity Paths

- `.github/agents/foreman-v2.agent.md`
- `governance/quality/agent-integrity/foreman-v2.agent.md`
- `governance/quality/agent-integrity/INTEGRITY_INDEX.md`

## Authorized Semantic Delta

The Phase 4 final-IAA `REJECTION-PACKAGE` branch now halts handover,
merge-release, PR advancement, readiness/activation progression, and activation.
Each finding must be classified as inside or demonstrably outside Foreman's
authorized sandbox. Inside findings require Foreman-owned stop-and-fix,
replacement evidence, required gate reruns, and IAA re-invocation. Outside
findings may be escalated only with the exact boundary, owner, and blocked
requirement. Final IAA PASS remains the sole release condition.

## Preserved Boundaries

Foreman does not write implementation code, fix tests, or self-modify. IAA
remains independent. CS2 remains the sole merge authority. No excluded
bootstrap, controller, workflow, ISMS, trigger, MMM, or PR #1387 evidence path
was changed.

## Integrity

- Contract version: `3.0.2`
- SHA-256: `232a5d39dd9a7f01e35a3ba71b3dbea4de42fa58808c8e2e44201f2bd6339126`
- Reference copy: byte-identical to the live contract
- Character count: `29,998 / 30,000`
