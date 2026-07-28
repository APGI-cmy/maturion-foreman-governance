# IAA Pre-Brief — PR #1377 — Admin-Ceremony Historical Token Resolution

**IAA Session**: IAA-20260728-PREBRIEF-PR1377  
**Wave**: PR-1377-ADMIN-CEREMONY-TOKEN-RESOLUTION  
**Date**: 2026-07-28  
**Repository**: `APGI-cmy/maturion-foreman-governance`  
**PR**: #1377  
**Issue**: #1376  
**Wave Task List**: `.agent-admin/waves/wave-pr-1377-admin-ceremony-token-resolution-current-tasks.md`  
**Authority**: `IAA_PRE_BRIEF_PROTOCOL.md` v1.2.2; direct CS2 authorization dated 2026-07-28  
**Status**: ACTIVE  
**Independent Classification**: CLEAR — all 14 tasks qualify

---

## Independent preflight

The IAA independently reproduced the active hosted failure: the placeholder-final-state job
applies the current pull request number to every historical COMPLETE proof, producing five
false violations across PRs #1356, #1360, and #1368 even though genuine proof-specific
dedicated IAA tokens exist.

The known wake-up filename-resolution mismatch remains disclosed. PR #1375's CANON
provenance work is a separate baseline and is not repaired, assured, or merged by this lane.

## Task classification

| Task | Qualifies | Trigger | Required evidence phase |
|---|---|---|---|
| TASK-1377-001 | YES | AGENT_ADMIN_ARTIFACT + MERGE_GATE_WORKFLOW | Preflight |
| TASK-1377-002 | YES | AGENT_ADMIN_ARTIFACT | Phase 0 pre-brief |
| TASK-1377-003 | YES | AGENT_ADMIN_ARTIFACT | Appointment |
| TASK-1377-004 | YES | MERGE_GATE_WORKFLOW | Contract/wake-up preflight |
| TASK-1377-005 | YES | MERGE_GATE_WORKFLOW | QA-to-Red |
| TASK-1377-006 | YES | MERGE_GATE_WORKFLOW | Implementation |
| TASK-1377-007 | YES | MERGE_GATE_WORKFLOW | Green verification |
| TASK-1377-008 | YES | AGENT_ADMIN_ARTIFACT + MERGE_GATE_WORKFLOW | Evidence |
| TASK-1377-009 | YES | AGENT_ADMIN_ARTIFACT | Foreman QP |
| TASK-1377-010 | YES | AGENT_ADMIN_ARTIFACT | ECAP/PREHANDOVER |
| TASK-1377-011 | YES | AGENT_ADMIN_ARTIFACT + MERGE_GATE_WORKFLOW | Final IAA |
| TASK-1377-012 | YES | MERGE_GATE_WORKFLOW | Merge/main verification |
| TASK-1377-013 | YES | AGENT_ADMIN_ARTIFACT | PR #1375 ECAP re-entry |
| TASK-1377-014 | YES | AGENT_ADMIN_ARTIFACT | PR #1375 final IAA re-entry |

## Mandatory acceptance criteria

1. Preserve task-set → IAA pre-brief → bounded administrator appointment commit order.
2. Complete contract-first administrator wake-up and frozen-scope preflight.
3. Commit executable QA-to-Red before any workflow implementation.
4. Cover positive proof/token cases for PRs #1356, #1360, and #1368.
5. Fail closed for absent, malformed, or ambiguous proof identity; missing or malformed
   token; ambiguous token; and cross-PR token evidence.
6. Derive each proof's PR identity deterministically and require exactly one genuine
   proof-specific dedicated token.
7. Prohibit active-PR fallback, first-added-token shortcuts, allowlists, waivers, and
   gate weakening.
8. Build every committed fixture and the complete Admin-Ceremony workflow to Green with
   zero skipped tests.
9. Keep all affected historical PREHANDOVER proofs and IAA token files byte-identical.
10. Maintain exact manifest/scope/diff parity at every governed checkpoint.
11. Require Foreman QP PASS, ECAP ACCEPTED, coherent frozen PREHANDOVER evidence, and all
    hosted gates Green.
12. Obtain a fresh independent final IAA verdict before merge.
13. Merge only under recorded CS2 authority and verify canonical `main`.
14. Re-enter PR #1375 only after verified repair merge: ECAP first, then independent final
    IAA, without altering its implementation.

## Prohibitions

- No active-PR-number fallback for historical proofs.
- No acceptance of the first newly added token regardless of proof identity.
- No historical proof or historical token mutation.
- No broad token bridge accepted as a substitute for one proof-specific dedicated token.
- No workflow suppression, unconditional success, allowlist, waiver, or reduced scan scope.
- No final IAA token issued by Foreman, administrator, builder, or ECAP roles.

## Declaration

The requirements above are the acceptance criteria the IAA will verify at handover. Meeting
them is necessary but not sufficient for an ASSURANCE-TOKEN. Intelligence-led findings remain
permitted at final review.

**IAA signature**: IAA-20260728-PREBRIEF-PR1377
