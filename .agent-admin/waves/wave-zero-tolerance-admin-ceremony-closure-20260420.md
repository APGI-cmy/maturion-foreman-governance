# Wave Task Checklist — Zero-Tolerance Admin-Ceremony Closure Wave

**Wave**: zero-tolerance-admin-ceremony-closure
**Issue**: APGI-cmy/maturion-foreman-governance#1355
**PR**: APGI-cmy/maturion-foreman-governance#1356
**Branch**: copilot/implement-zero-tolerance-closure-wave
**Foreman**: copilot-swe-agent[bot]
**IAA Pre-Brief**: `.agent-admin/assurance/iaa-prebrief-wave-zero-tolerance-admin-ceremony-closure-20260420.md`
**Status**: COMPLETE
**Date**: 2026-04-20
**Authority**: CS2 (APGI-cmy) — Issue #1355

---

## Workstream A — Live Contract Convergence

- [x] TASK-ZTAC-A-001 — Verify foreman-v2 contract reflects latest admin-compliance checkpoint expectations
      builder: copilot-swe-agent[bot]
      qp_verdict: N/A
      notes: Verified — foreman-v2.agent.md contract reviewed; no contract modification required for this wave

- [x] TASK-ZTAC-A-002 — Verify ECAP agent contract reflects latest normalization/reconciliation/gate-inventory/carried-forward duties
      builder: copilot-swe-agent[bot]
      qp_verdict: N/A
      notes: Verified — execution-ceremony-admin-agent.md reviewed; no contract modification required for this wave

- [x] TASK-ZTAC-A-003 — Verify IAA contract reflects latest admin-ceremony rejection logic (ACR-09 through ACR-14)
      builder: copilot-swe-agent[bot]
      qp_verdict: N/A
      notes: Verified — independent-assurance-agent.md reviewed; no contract modification required for this wave

## Workstream B — Workflow and Gate Convergence

- [x] TASK-ZTAC-B-001 — Create admin-ceremony-defect-gate.yml workflow
      builder: copilot-swe-agent[bot]
      qp_verdict: PASS
      notes: Created — .github/workflows/admin-ceremony-defect-gate.yml with 5 blocking checks (A–E)

- [x] TASK-ZTAC-B-002 — Update merge-gate-interface.yml governance/alignment job to block overclaim
      builder: copilot-swe-agent[bot]
      qp_verdict: PASS
      notes: Updated — .github/workflows/merge-gate-interface.yml; alignment overclaim sub-check added

## Workstream C — Placeholder-Check Canon Binding

- [x] TASK-ZTAC-C-001 — Create validate-placeholder-check.sh script bound to canonical exception classes
      builder: copilot-swe-agent[bot]
      qp_verdict: PASS
      notes: Created — .github/scripts/validate-placeholder-check.sh; EXC-001 through EXC-005; integrated as PLACEHOLDER-CHECK-001 in agent-contract-audit.yml

## Workstream D — Alignment Inventory Truth Hardening

- [x] TASK-ZTAC-D-001 — Add CANON_INVENTORY ALIGNED-overclaim check to governance/alignment workflow job
      builder: copilot-swe-agent[bot]
      qp_verdict: PASS
      notes: Created — .github/scripts/check-alignment-overclaim.py; integrated in merge-gate-interface.yml governance/alignment job

## Workstream E — Proof-of-Operation and Adversarial Rejection Suite

- [x] TASK-ZTAC-E-001 — Create proof-of-operation document demonstrating clean 3-layer pass
      builder: copilot-swe-agent[bot]
      qp_verdict: PASS
      notes: Created — .agent-admin/evidence/proof-of-operation-zero-tolerance-closure-20260420.md

- [x] TASK-ZTAC-E-002 — Create adversarial rejection test fixtures (seeded-bad artifacts)
      builder: copilot-swe-agent[bot]
      qp_verdict: PASS
      notes: Created — .agent-admin/evidence/adversarial-rejection-fixtures-20260420.md; 5 seeded-bad scenarios

## Phase 4 — Handover Artifacts

- [x] TASK-ZTAC-P4-001 — Create prehandover proof for this wave
      builder: copilot-swe-agent[bot]
      qp_verdict: PASS
      notes: Created — .agent-admin/prehandover/proof-1356-20260420.md; final_state: COMPLETE

- [x] TASK-ZTAC-P4-002 — Create session memory for this wave
      builder: copilot-swe-agent[bot]
      qp_verdict: PASS
      notes: Created — .agent-workspace/foreman-v2/memory/session-035-20260420.md

- [x] TASK-ZTAC-P4-003 — Create IAA Pre-Brief for this wave
      builder: copilot-swe-agent[bot]
      qp_verdict: PASS
      notes: Created — .agent-admin/assurance/iaa-prebrief-wave-zero-tolerance-admin-ceremony-closure-20260420.md

- [x] TASK-ZTAC-P4-004 — Invoke IAA and record token
      builder: copilot-swe-agent[bot]
      qp_verdict: PASS
      notes: Completed — .agent-admin/assurance/iaa-token-session-035-wave1-20260420.md; Verdict: MERGE PERMITTED
