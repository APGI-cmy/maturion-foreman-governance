# Issue #1390 IAA Tier 2 Recovery Evidence

**Date**: 2026-09-03
**Issue**: [#1390](https://github.com/APGI-cmy/maturion-foreman-governance/issues/1390)
**PR**: [#1391](https://github.com/APGI-cmy/maturion-foreman-governance/pull/1391)
**Branch**: `apgi-cmy-iaa-tier-2-recovery`
**Base**: `apgi-cmy-foreman-iaa-remediation`
**Authorization**: CS2 authorization in Issue #1390.

## Recovery Boundary

This recovery restores IAA Phase 1 operational knowledge. It does not modify
`.github/agents/independent-assurance-agent.md`, a Foreman contract, inventory,
bootstrap/runtime configuration, ECAP capability, activation surface, or any
ISMS/MMS artifact.

## Verified Source Provenance

The following source blobs were verified through the GitHub API in the
`APGI-cmy/maturion-isms` current `main` tree at commit
`13c41f2545ceb0a0cd5507ebf4224f26e6d0ff43`:

| Restored path | Source blob | Canonical recovery commit |
|---|---|---|
| `.agent-workspace/independent-assurance-agent/knowledge/FUNCTIONAL-BEHAVIOUR-REGISTRY.md` | `7e1ad946f848d47e958174bc7dc626128c6f1894` | `aa014e269ad901ebbcf22245ee0dd52d128acb93` |
| `.agent-workspace/independent-assurance-agent/knowledge/IAA_AGENT_CONTRACT_AUDIT_STANDARD.md` | `ec5ad88fc3ba4dbd13d6236390d8d27318be92be` | `aa014e269ad901ebbcf22245ee0dd52d128acb93` |
| `.agent-workspace/independent-assurance-agent/knowledge/iaa-high-frequency-checks.md` | `52d9566e9d956f5cf1c044971640603e3fdb182a` | `27b81620a55e6776c5783fa578711036e47a32e6` |

The local restored blobs equal the verified source blobs. The IAA knowledge
index is restored from blob `3b1eb587278bd484669bacc6e5bf61425677dcd7`
at canonical recovery commit `27b81620a55e6776c5783fa578711036e47a32e6`.

## IAA Phase 1 Load Result

The IAA knowledge index now declares eight operational prerequisites and all
eight files exist in the IAA knowledge directory. The restored references are:

- `IAA_AGENT_CONTRACT_AUDIT_STANDARD.md` for AGENT_CONTRACT invocations.
- `FUNCTIONAL-BEHAVIOUR-REGISTRY.md` for BUILD/AAWP_MAT anti-regression review.
- `iaa-high-frequency-checks.md` for CI enforcement specification loading.

## Remaining Blockers

- Draft PR #1391 requires independent bootstrap-path review before it can
  advance.
- No IAA verdict or token is issued by this recovery.
- Foreman must invoke IAA afresh for PR #1389 after this prerequisite recovery
  has been independently accepted.
- PR #1389 remains subject to its existing ECAP and final IAA requirements.
