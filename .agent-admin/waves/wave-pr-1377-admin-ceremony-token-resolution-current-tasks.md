# PR #1377 — Admin-Ceremony Historical Token Resolution — Current Tasks

**Wave**: PR-1377-ADMIN-CEREMONY-TOKEN-RESOLUTION  
**Issue**: #1376  
**PR**: #1377  
**Foreman**: foreman-v2 under direct CS2 authorization  
**IAA Pre-Brief**: PENDING  
**Governance Administrator Appointment**: PENDING  
**Status**: TASK SET FROZEN — IMPLEMENTATION NOT STARTED  
**Authority**: CS2 Johan Ras, 2026-07-28; `IAA_PRE_BRIEF_PROTOCOL.md` v1.2.2

---

- [ ] TASK-1377-001 — Confirm issue, PR, base/head lineage, three affected historical proofs, and existing genuine dedicated tokens
      builder: foreman-v2
      qp_verdict: PENDING
      notes: Reproduce the defect without mutating any historical evidence.

- [ ] TASK-1377-002 — Obtain an independent IAA pre-brief covering every qualifying task before appointment
      builder: independent-assurance-agent
      qp_verdict: PENDING
      notes: PRE-BRIEF only; no appointment, implementation, final verdict, or token authority.

- [ ] TASK-1377-003 — Record a bounded governance-repo-administrator-v2 appointment after the pre-brief commit
      builder: foreman-v2
      qp_verdict: PENDING
      notes: Appointment must freeze exact workflow, test, and PR-scoped evidence paths.

- [ ] TASK-1377-004 — Execute administrator contract-first wake-up and frozen-contract preflight
      builder: governance-repo-administrator-v2
      qp_verdict: PENDING
      notes: Verify authority, scope, historical proof/token hashes, and workflow baseline before QA.

- [ ] TASK-1377-005 — Commit executable QA-to-Red fixtures before workflow implementation
      builder: governance-repo-administrator-v2
      qp_verdict: PENDING
      notes: Cover PR #1356, #1360, #1368, absent identity, malformed identity, ambiguity, missing token, and cross-PR token cases.

- [ ] TASK-1377-006 — Implement deterministic proof-specific PR identity and dedicated-token resolution
      builder: governance-repo-administrator-v2
      qp_verdict: PENDING
      notes: No allowlist or current-PR fallback may substitute for proof identity.

- [ ] TASK-1377-007 — Build all committed fixtures and the complete Admin-Ceremony workflow to Green
      builder: governance-repo-administrator-v2
      qp_verdict: PENDING
      notes: Preserve all historical proofs and token files byte-for-byte; zero skipped tests.

- [ ] TASK-1377-008 — Record exact Green evidence, scope parity, and unchanged historical evidence hashes
      builder: governance-repo-administrator-v2
      qp_verdict: PENDING
      notes: Evidence must come from current-session execution.

- [ ] TASK-1377-009 — Perform Foreman Quality Professor review on the frozen implementation head
      builder: foreman-v2
      qp_verdict: PENDING
      notes: QP must challenge fail-closed behavior and verify no workflow weakening.

- [ ] TASK-1377-010 — Perform ECAP reconciliation and freeze PREHANDOVER evidence
      builder: execution-ceremony-admin-agent
      qp_verdict: PENDING
      notes: Administrative reconciliation only; every hosted gate must be Green.

- [ ] TASK-1377-011 — Obtain independent final IAA verdict on the frozen fully evidenced head
      builder: independent-assurance-agent
      qp_verdict: PENDING
      notes: Final assurance is separate from the pre-brief and may not be self-issued.

- [ ] TASK-1377-012 — Merge under recorded CS2 authority and verify canonical main
      builder: foreman-v2
      qp_verdict: PENDING
      notes: Merge only after final IAA PASS and all required hosted checks are Green.

- [ ] TASK-1377-013 — Re-run ECAP for PR #1375 after verified canonical repair merge
      builder: execution-ceremony-admin-agent
      qp_verdict: PENDING
      notes: Successor action; do not alter PR #1375 implementation.

- [ ] TASK-1377-014 — Obtain independent final IAA for PR #1375 on its refreshed frozen head
      builder: independent-assurance-agent
      qp_verdict: PENDING
      notes: Successor action only after PR #1375 ECAP returns ACCEPTED.

---

## Task-Set Integrity Rules

- No task may be silently removed.
- `[x]` requires a recorded Foreman QP PASS and a discrete task-state commit.
- `[~]` requires an explicit `DESCOPED` or `DEFERRED` reason and any required IAA amendment.
- QA and implementation remain prohibited until TASK-1377-002 and TASK-1377-003 are committed in order.
- Historical PREHANDOVER proofs and IAA token files are immutable and outside the write boundary.
- PR #1375 re-entry remains blocked until TASK-1377-012 is complete.
