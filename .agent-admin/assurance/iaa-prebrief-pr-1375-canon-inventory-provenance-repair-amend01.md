# IAA Pre-Brief Amendment 01 — PR #1375 CANON Inventory Provenance Repair

**IAA Session**: IAA-20260728-PREBRIEF-AMEND-PR1375-01
**Repository**: `APGI-cmy/maturion-foreman-governance`
**PR**: #1375
**Issue**: #1374
**Date**: 2026-07-28
**Task List**: `.agent-admin/waves/wave-pr-1375-canon-inventory-provenance-current-tasks.md`
**Authority**: `IAA_PRE_BRIEF_PROTOCOL.md` v1.2.2
**Status**: ACTIVE
**Action**: PRE-BRIEF AMENDMENT ONLY — NO FINAL ASSURANCE VERDICT

## Amendment Reason

TASK-1375-013 through TASK-1375-016 are causally post-handover actions:

- TASK-1375-013 is the external independent final-assurance action itself.
- TASK-1375-014 requires a genuine final IAA PASS token before merge.
- TASK-1375-015 requires PR #1375 to be merged and verified on canonical `main`.
- TASK-1375-016 requires successful ISMS layer-down and a cleared schema-builder wake-up.

Leaving these tasks `[ ]` creates `CHECKLIST-GATE-002` during the assurance action needed to
complete TASK-1375-013. This amendment resolves that causal contradiction without removing,
descoping, waiving, pre-passing, weakening, or completing any task.

## Authorized Checklist State

- `[~]` TASK-1375-013 with `qp_verdict: DEFERRED`: external final IAA action. Re-entry requires
  this amendment and all four deferments committed, TASK-1375-001 through -012 remaining PASS,
  exact parity, and final IAA re-invocation.
- `[~]` TASK-1375-014 with `qp_verdict: DEFERRED`: merge/main verification. Re-entry requires a
  genuine final IAA token, committed post-assurance task state, and every required hosted gate
  Green.
- `[~]` TASK-1375-015 with `qp_verdict: DEFERRED`: ISMS layer-down and schema wake-up. Re-entry
  requires verified PR #1375 merge and canonical-main confirmation. No live Supabase deployment
  or database mutation is authorized.
- `[~]` TASK-1375-016 with `qp_verdict: DEFERRED`: ISMS PR #1973 resumption. Re-entry requires
  successful layer-down, consumer validation, and a CLEAR schema-builder wake-up under the
  existing appointment and frozen contract.

None is descoped, waived, complete, or pre-approved.

## Assurance-Gate Effect

- TASK-1375-001 through TASK-1375-012 must remain `[x]` with `qp_verdict: PASS`.
- TASK-1375-013 through TASK-1375-016 may be `[~]` with `qp_verdict: DEFERRED` only for the exact
  causal reasons above.
- No `[ ]` task may remain.
- These deferments clear only the invocation checklist; they do not complete the tasks.
- Merge remains prohibited before TASK-1375-013 PASS and all hosted gates Green.
- Layer-down remains prohibited before TASK-1375-014 completes.
- PR #1973 implementation remains prohibited before TASK-1375-015 completes.

## Commit Discipline

1. Commit this amendment separately.
2. Commit TASK-1375-013 deferment separately.
3. Commit TASK-1375-014 deferment separately.
4. Commit TASK-1375-015 deferment separately.
5. Commit TASK-1375-016 deferment separately.
6. Restore exact manifest, scope-declaration, and diff parity before final IAA.

When each trigger is satisfied, reactivate and complete the task through its own discrete
task-state commit.

## Declaration

This amendment changes checklist sequencing only. It grants no implementation, merge, waiver,
self-assurance, consumer mutation, Supabase deployment, database mutation, or PR #1973 scope
expansion authority. All original substantive acceptance criteria remain in force.

**IAA signature**: IAA-20260728-PREBRIEF-AMEND-PR1375-01
