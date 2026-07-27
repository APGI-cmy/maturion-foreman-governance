# PR #1375 — CANON Inventory Provenance Repair — Current Tasks

**Wave**: PR-1375-CANON-INVENTORY-PROVENANCE  
**Issue**: #1374  
**PR**: #1375  
**Foreman**: foreman-v2 under direct CS2 authorization  
**IAA Pre-Brief**: `.agent-admin/assurance/iaa-prebrief-pr-1375-canon-inventory-provenance.md` — ACTIVE
**Governance Administrator Appointment**: `.agent-admin/appointments/pr-1375-governance-repo-administrator-v2.md` — ACTIVE
**Status**: PLANNED — IMPLEMENTATION NOT STARTED  
**Authority**: CS2 Johan Ras, 2026-07-27; `IAA_PRE_BRIEF_PROTOCOL.md` v1.2.2

---

- [ ] TASK-1375-001 — Confirm frozen issue, PR, base/head lineage, 203-entry defect, and inherited Admin-Ceremony gate blocker
      builder: foreman-v2
      qp_verdict: PENDING
      notes: Governance-only preflight. The inherited historical-placeholder failure is evidence, not repair scope.

- [ ] TASK-1375-002 — Obtain an independent IAA pre-brief covering every qualifying task before appointment
      builder: independent-assurance-agent
      qp_verdict: PENDING
      notes: PRE-BRIEF action only; no final verdict, implementation, appointment, or token authority.

- [ ] TASK-1375-003 — Record a bounded governance-repo-administrator-v2 appointment after the pre-brief commit
      builder: foreman-v2
      qp_verdict: PENDING
      notes: Appointment must prohibit tests or implementation before its own commit and prohibit direct main pushes, semantic canon edits, agent-contract edits, and live/consumer mutations.

- [ ] TASK-1375-004 — Execute governance-administrator wake-up and frozen-contract preflight
      builder: governance-repo-administrator-v2
      qp_verdict: PENDING
      notes: Read-only repository verification first; degraded provenance is the authorized repair target, not a waiver.

- [ ] TASK-1375-005 — Add QA-to-Red regression fixtures for reconstruction, preservation, and every fail-closed boundary
      builder: governance-repo-administrator-v2
      qp_verdict: PENDING
      notes: Tests must precede implementation in a distinct commit and cover missing, malformed, unknown, path-mismatched, content-stale, and synthetic-HEAD reuse cases.

- [ ] TASK-1375-006 — Implement deterministic provenance-aware inventory generation and preservation
      builder: governance-repo-administrator-v2
      qp_verdict: PENDING
      notes: Resolve canonical Git history per path/content; preserve only independently verifiable existing values.

- [ ] TASK-1375-007 — Implement fail-closed provenance validation without weakening degraded-mode enforcement
      builder: governance-repo-administrator-v2
      qp_verdict: PENDING
      notes: Reject missing, malformed, non-resolving, path-mismatched, and content-stale provenance.

- [ ] TASK-1375-008 — Regenerate the existing 203-entry CANON inventory with verifiable 40-hex commit provenance
      builder: governance-repo-administrator-v2
      qp_verdict: PENDING
      notes: No semantic canon or policy content bytes may change.

- [ ] TASK-1375-009 — Prove deterministic Green results, complete scope parity, and zero unauthorized paths
      builder: governance-repo-administrator-v2
      qp_verdict: PENDING
      notes: Include repeat generation, per-entry commit/path/hash validation, negative fixtures, and repository gate evidence.

- [ ] TASK-1375-010 — Perform Foreman Quality Professor review on one exact implementation head
      builder: foreman-v2
      qp_verdict: PENDING
      notes: QP must independently challenge evidence and return PASS before checklist ticks or administrative closure.

- [ ] TASK-1375-011 — Perform ECAP administrative reconciliation for protected governance paths
      builder: execution-ceremony-admin-agent
      qp_verdict: PENDING
      notes: Administrative validation only; no implementation, QP, or assurance authority.

- [ ] TASK-1375-012 — Freeze PREHANDOVER proof and producer session memory on the exact reviewed head
      builder: foreman-v2
      qp_verdict: PENDING
      notes: Must reference this checklist, the active IAA pre-brief, QP, ECAP, exact scope, gates, and inherited blocker disposition.

- [ ] TASK-1375-013 — Obtain independent final IAA binary verdict on the frozen fully evidenced head
      builder: independent-assurance-agent
      qp_verdict: PENDING
      notes: Final assurance is distinct from PRE-BRIEF; only IAA may issue an ASSURANCE-TOKEN or REJECTION-PACKAGE.

- [ ] TASK-1375-014 — Obtain CS2 merge disposition, merge via PR only, and verify canonical main
      builder: foreman-v2
      qp_verdict: PENDING
      notes: No merge before final IAA PASS and required hosted checks; no direct push to main.

- [ ] TASK-1375-015 — Layer the assured canonical inventory down to maturion-isms and re-run schema-builder wake-up
      builder: governance-repo-administrator-v2
      qp_verdict: PENDING
      notes: Successor work only after canonical merge and post-merge verification; preserve consumer evidence and provenance.

- [ ] TASK-1375-016 — Resume ISMS PR #1973 only after successful governed layer-down
      builder: foreman-v2
      qp_verdict: PENDING
      notes: Resume with Supabase CLI preflight, then migration/tests under the existing bounded schema-builder authority; no live deployment.

---

## Task-Set Integrity Rules

- No task may be silently removed.
- `[x]` requires a recorded Foreman QP PASS; one tick per discrete commit.
- `[~]` requires `DESCOPED` or `DEFERRED` plus an explicit reason and any required IAA pre-brief amendment.
- A material task change after the IAA pre-brief requires an IAA-authored amendment.
- Tests and implementation remain prohibited until TASK-1375-002 and TASK-1375-003 are committed in that order.
- ISMS PR #1973 remains blocked until TASK-1375-014 and TASK-1375-015 are complete.
