# CS2 Awareness Note — INV-409 Sandbox Tooling Constraint (OVF-003 Flag)

**Date**: 2026-03-02
**IAA Session**: IAA-20260302-PR1273-R3 (session-008-20260302)
**Authority**: CS2 (Johan Ras / @APGI-cmy)
**Type**: Awareness note (NOT a governance violation — external tooling constraint)

---

## Pattern Observed

INV-409 (PR in draft state) recurred across three sessions on PR #1273:
- R1 (session-006): INV-409 FAIL — PR in draft state; files also uncommitted
- R2 (session-007): INV-409 FAIL — PR still in draft state despite REM-002 claimed resolved
- R3 (session-008): INV-409 RESOLVED — CS2 manually executed `gh pr ready 1273`

**Root cause**: The copilot-swe-agent sandbox environment does not have the `markPullRequestReadyForReview` GraphQL permission required to execute `gh pr ready`. This is an external tooling constraint, not a governance process failure by governance-repo-administrator.

## OVF-003 Threshold Reached

Three occurrences of the same pattern (INV-409 draft state failure) meet the OVF-003 threshold for CS2 escalation. However, since the root cause is external (sandbox permission limitation), this is flagged as an awareness note rather than a governance breach.

## Recommendation

CS2 to consider one of:
1. Add a note to `governance-repo-administrator-v2.agent.md` FAIL-ONLY-ONCE.md: "If PR is in draft state, escalate to CS2 for `gh pr ready` execution before invoking IAA (sandbox cannot execute this command)"
2. Add a pre-IAA-invocation step to the governance-repo-administrator contract: "Verify PR is not in draft state before invoking IAA; if in draft state in sandbox, request CS2 action"
3. Accept this as a known constraint with no documentation change (if CS2 prefers to handle case-by-case)

## Status
- OPEN — awaiting CS2 decision on recommendation
- No blocking action required; PR #1273 has received ASSURANCE-TOKEN

---

*IAA session-008-20260302 | OVF-003 flag per iaa-category-overlays.md v1.3.0*
