# IAA Pre-Brief — PR #1375 — CANON Inventory Provenance Repair

**IAA Session**: IAA-20260727-PREBRIEF-PR1375  
**Wave**: PR-1375-CANON-INVENTORY-PROVENANCE  
**Date**: 2026-07-27  
**Repository**: APGI-cmy/maturion-foreman-governance  
**PR**: #1375  
**Issue**: #1374  
**Task-Set Commit**: `e45d0ba95d3052335dde5334b8afc79d25dd8339`  
**Wave Task List**: `.agent-admin/waves/wave-pr-1375-canon-inventory-provenance-current-tasks.md`  
**Authority**: `IAA_PRE_BRIEF_PROTOCOL.md` v1.2.2; direct CS2 authorization dated 2026-07-27  
**Status**: ACTIVE  
**Independent Classification**: CLEAR — all 16 tasks qualify

---

## Independent Preflight

Independent preflight confirmed 203 valid content hashes and 203/203 explicitly authorized
missing commit-provenance values. The missing provenance remains the bounded defect to repair;
authorization is not a validation waiver.

## Wave Summary

PR #1375 repairs canonical commit provenance for the existing 203-entry CANON inventory.
The wave must establish deterministic reconstruction and preservation, fail-closed validation,
QA-to-Red before implementation, exact-head evidence, and independent final assurance without
changing semantic canon or policy content. Canonical merge and verification must precede the
governed ISMS layer-down and any resumption of ISMS PR #1973.

## Task Classification

Every task qualifies because it creates, updates, closes, or depends upon protected
`.agent-admin/` evidence/checklist state. Substantive canon and consumer tasks add the stated
governance trigger.

| Task | Qualifies | IAA trigger category | Required phase/evidence group |
|---|---|---|---|
| TASK-1375-001 | YES | MIXED — CANON_GOVERNANCE + AGENT_ADMIN_ARTIFACT | CG-MIXED |
| TASK-1375-002 | YES | AGENT_ADMIN_ARTIFACT | ADMIN — Phase 0 |
| TASK-1375-003 | YES | AGENT_ADMIN_ARTIFACT | ADMIN — appointment |
| TASK-1375-004 | YES | MIXED — CANON_GOVERNANCE + AGENT_ADMIN_ARTIFACT | CG-MIXED |
| TASK-1375-005 | YES | MIXED — CANON_GOVERNANCE + AGENT_ADMIN_ARTIFACT | CG-MIXED |
| TASK-1375-006 | YES | MIXED — CANON_GOVERNANCE + AGENT_ADMIN_ARTIFACT | CG-MIXED |
| TASK-1375-007 | YES | MIXED — CANON_GOVERNANCE + AGENT_ADMIN_ARTIFACT | CG-MIXED |
| TASK-1375-008 | YES | MIXED — CANON_GOVERNANCE + AGENT_ADMIN_ARTIFACT | CG-MIXED |
| TASK-1375-009 | YES | MIXED — CANON_GOVERNANCE + AGENT_ADMIN_ARTIFACT | CG-MIXED |
| TASK-1375-010 | YES | AGENT_ADMIN_ARTIFACT | ADMIN — QP |
| TASK-1375-011 | YES | AGENT_ADMIN_ARTIFACT | ADMIN — ECAP |
| TASK-1375-012 | YES | AGENT_ADMIN_ARTIFACT | ADMIN — Phase 4 |
| TASK-1375-013 | YES | AGENT_ADMIN_ARTIFACT | ADMIN — Phase 5 |
| TASK-1375-014 | YES | AGENT_ADMIN_ARTIFACT | ADMIN — merge/main verification |
| TASK-1375-015 | YES | MIXED — CANON_GOVERNANCE + AGENT_ADMIN_ARTIFACT | CG-MIXED |
| TASK-1375-016 | YES | MIXED — ambiguity defaults mandatory | SUCCESSOR |

## CG-MIXED Requirements

**Tasks**: TASK-1375-001, TASK-1375-004 through TASK-1375-009, and TASK-1375-015.

**Required Phases**: Phases 1–4, followed by independent Phase 5 assurance where applicable.

**Required Evidence**:

- exact authority carrier, final scope declaration, and active checklist;
- preflight, governance, working, and immutable handover proofs;
- QA-to-Red commit before any implementation commit;
- resolving 40-hex provenance for all 203 declared paths;
- per-entry commit existence plus path/content-hash verification;
- byte-identical repeated generation for a fixed repository state;
- exact before/after hashes, changed-path diff, and negative-boundary results;
- proof that valid provenance is preserved and synthetic `HEAD` reuse is rejected;
- hosted and local gate results on one exact head;
- Foreman QP PASS, ECAP administrative reconciliation, PREHANDOVER proof, and producer session memory;
- for TASK-1375-015, governed consumer layer-down proof after canonical merge and main verification.

**Applicable Rules and Overlays**:

- CORE-005–CORE-007;
- CORE-013–CORE-021;
- INV-801–INV-803;
- OVL-CG-001–OVL-CG-006;
- OVL-CI-005/006 if `.github/scripts/` or workflow paths change.

## AGENT_ADMIN_ARTIFACT Requirements

- **TASK-1375-002**: Phase 0 only; this committed independent pre-brief is the required artifact.
- **TASK-1375-003**: bounded appointment evidence committed after this pre-brief; no retrospective,
  placeholder, or open-ended authority.
- **TASK-1375-010**: same-head Foreman QP evidence with an explicit PASS before any `[x]` tick.
- **TASK-1375-011**: same-head ECAP administrative reconciliation without implementation, QP,
  or assurance authority.
- **TASK-1375-012**: immutable Phase 4 evidence with checklist reference and
  `wave_checklist.status: ALL_TICKED`.
- **TASK-1375-013**: independent Phase 5 binary verdict on the frozen, fully evidenced head.
- **TASK-1375-014**: post-PASS CS2 merge disposition and verification of canonical `main`.

**Applicable Rules**:

- CORE-013–CORE-021;
- CHECKLIST-GATE-001–CHECKLIST-GATE-005;
- discrete QP-backed tick discipline;
- exact-head parity and evidence truthfulness;
- IAA independence and zero-severity tolerance.

No category-specific administrative overlay is defined; the core rules remain mandatory.

## Successor Requirement

TASK-1375-016 begins only after proven canonical merge and governed layer-down. It requires its
own ISMS preflight, governance, working, and handover evidence; Supabase CLI preflight; bounded
migration/test proof; and proof of no live deployment. Ambiguity resolves to mandatory IAA
invocation, with consumer-repository triggers and overlays determined by the final ISMS changed
paths.

## Known Limitations

1. The wake-up protocol has a filename-resolution mismatch. Wake-up output alone cannot prove
   file resolution; final evidence must identify and independently corroborate resolved files
   and versions.
2. The Admin-Ceremony check has an inherited historical-placeholder failure. It is outside this
   repair scope and must be reproduced, evidenced, and truthfully dispositioned—not repaired
   opportunistically, hidden, waived, or reported as Green.

## Declaration

This artifact is a **PRE-BRIEF only**. It is not final assurance, an `ASSURANCE-TOKEN`, a
`REJECTION-PACKAGE`, a merge-readiness claim, an agent appointment, or implementation authority.
It appoints no agent and authorizes no tests, implementation, merge, layer-down, consumer work,
or live-environment action. Meeting every declared criterion is necessary but not sufficient
for a later independent binary verdict on the frozen, fully evidenced head.

**IAA signature**: IAA-20260727-PREBRIEF-PR1375
