# IAA Pre-Brief Amendment 01 — PR #1377 Admin-Ceremony Token Resolution

**IAA Session**: IAA-20260728-PREBRIEF-AMEND-PR1377-01
**PR**: #1377
**Issue**: #1376
**Date**: 2026-07-28
**Original Pre-Brief**: `.agent-admin/assurance/iaa-prebrief-pr-1377-admin-ceremony-token-resolution.md`
**Task List**: `.agent-admin/waves/wave-pr-1377-admin-ceremony-token-resolution-current-tasks.md`
**Authority**: `IAA_PRE_BRIEF_PROTOCOL.md` v1.2.2
**Status**: ACTIVE
**Action**: PRE-BRIEF AMENDMENT ONLY — NO FINAL ASSURANCE VERDICT

## Amendment Reason

TASK-1377-011 through TASK-1377-014 are causally post-handover actions. They cannot truthfully be
completed before final IAA invocation:

- TASK-1377-011 is the external independent final-assurance action itself.
- TASK-1377-012 requires an issued final IAA PASS token before merge.
- TASK-1377-013 requires PR #1377 to be merged and verified on canonical `main`.
- TASK-1377-014 requires PR #1375 ECAP to return `ACCEPTED`.

Leaving these tasks as `[ ]` creates `CHECKLIST-GATE-002` during the assurance action required to
complete TASK-1377-011. This amendment resolves that causal contradiction without removing,
descoping, waiving, pre-passing, or weakening any task.

## Authorized Checklist State

The following exact task-state changes are authorized:

- `[~]` TASK-1377-011 with `qp_verdict: DEFERRED`: external independent-assurance action. Re-entry
  requires this amendment and all four deferments committed, TASK-1377-001 through -010 remaining
  PASS, exact scope parity, and final IAA re-invocation.
- `[~]` TASK-1377-012 with `qp_verdict: DEFERRED`: merge and main verification. Re-entry requires
  a genuine independent assurance token, committed token evidence, and every required hosted gate
  Green.
- `[~]` TASK-1377-013 with `qp_verdict: DEFERRED`: PR #1375 ECAP successor. Re-entry requires
  verified PR #1377 merge and canonical-main confirmation.
- `[~]` TASK-1377-014 with `qp_verdict: DEFERRED`: PR #1375 final IAA successor. Re-entry requires
  PR #1375 ECAP `ACCEPTED` on a refreshed frozen head.

None of these tasks is descoped, waived, complete, or pre-approved.

## Assurance-Gate Effect

- TASK-1377-001 through TASK-1377-010 must remain `[x]` with `qp_verdict: PASS`.
- TASK-1377-011 through TASK-1377-014 may be `[~]` with `qp_verdict: DEFERRED` only for the exact
  causal reasons above.
- No `[ ]` task may remain before final IAA re-invocation.
- The deferments satisfy the checklist invocation gate only; they do not complete the tasks.
- Merge remains prohibited until TASK-1377-011 produces a valid PASS token and all hosted gates
  are Green.
- PR #1375 work remains prohibited until TASK-1377-012 is complete.

## Commit Discipline

1. Commit this amendment separately.
2. Commit TASK-1377-011 deferment separately.
3. Commit TASK-1377-012 deferment separately.
4. Commit TASK-1377-013 deferment separately.
5. Commit TASK-1377-014 deferment separately.
6. Restore exact manifest, scope-declaration, and diff parity before re-invoking final IAA.

When each causal trigger is satisfied, reactivate and complete that task through its own discrete
task-state commit.

## Declaration

This amendment changes checklist sequencing only. It grants no implementation, merge, waiver,
assurance, PR #1375 mutation, or self-approval authority. All original substantive acceptance
criteria remain in force.

**IAA signature**: IAA-20260728-PREBRIEF-AMEND-PR1377-01
