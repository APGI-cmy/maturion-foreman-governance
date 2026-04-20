# Wave Task Checklist — Zero-Tolerance Admin-Ceremony Closure Wave

**Wave**: zero-tolerance-admin-ceremony-closure
**Issue**: APGI-cmy/maturion-foreman-governance#1355
**PR**: APGI-cmy/maturion-foreman-governance#1356
**Branch**: copilot/implement-zero-tolerance-closure-wave
**Foreman**: copilot-swe-agent[bot]
**IAA Pre-Brief**: `.agent-admin/assurance/iaa-prebrief-wave-zero-tolerance-admin-ceremony-closure-20260420.md`
**Status**: IN-PROGRESS
**Date**: 2026-04-20
**Authority**: CS2 (APGI-cmy) — Issue #1355

---

## Workstream A — Live Contract Convergence

- [ ] TASK-ZTAC-A-001 — Verify foreman-v2 contract reflects latest admin-compliance checkpoint expectations
      builder: copilot-swe-agent[bot]
      qp_verdict: PENDING
      notes: Review foreman-v2.agent.md for admin-ceremony compliance checkpoint

- [ ] TASK-ZTAC-A-002 — Verify ECAP agent contract reflects latest normalization/reconciliation/gate-inventory/carried-forward duties
      builder: copilot-swe-agent[bot]
      qp_verdict: PENDING
      notes: Inspect execution-ceremony-admin-agent.md contract binding

- [ ] TASK-ZTAC-A-003 — Verify IAA contract reflects latest admin-ceremony rejection logic (ACR-09 through ACR-14)
      builder: copilot-swe-agent[bot]
      qp_verdict: PENDING
      notes: Inspect independent-assurance-agent.md contract binding

## Workstream B — Workflow and Gate Convergence

- [ ] TASK-ZTAC-B-001 — Create admin-ceremony-defect-gate.yml workflow
      builder: copilot-swe-agent[bot]
      qp_verdict: PENDING
      notes: Template leakage, placeholder tokens in COMPLETE, carried-forward source, cross-artifact contradiction, alignment overclaim, version inconsistency

- [ ] TASK-ZTAC-B-002 — Update merge-gate-interface.yml governance/alignment job to block overclaim
      builder: copilot-swe-agent[bot]
      qp_verdict: PENDING
      notes: Prevent ALIGNED overclaim with stale canonical metadata

## Workstream C — Placeholder-Check Canon Binding

- [ ] TASK-ZTAC-C-001 — Create validate-placeholder-check.sh script bound to canonical exception classes
      builder: copilot-swe-agent[bot]
      qp_verdict: PENDING
      notes: EXC-001 through EXC-005 exception classes per AGENT_CONTRACT_PLACEHOLDER_CHECK_CANON.md

## Workstream D — Alignment Inventory Truth Hardening

- [ ] TASK-ZTAC-D-001 — Add CANON_INVENTORY ALIGNED-overclaim check to governance/alignment workflow job
      builder: copilot-swe-agent[bot]
      qp_verdict: PENDING
      notes: No ALIGNED entry with TBD/placeholder hash/version metadata

## Workstream E — Proof-of-Operation and Adversarial Rejection Suite

- [ ] TASK-ZTAC-E-001 — Create proof-of-operation document demonstrating clean 3-layer pass
      builder: copilot-swe-agent[bot]
      qp_verdict: PENDING
      notes: Documents that this wave itself is the clean-pass proof

- [ ] TASK-ZTAC-E-002 — Create adversarial rejection test fixtures (seeded-bad artifacts)
      builder: copilot-swe-agent[bot]
      qp_verdict: PENDING
      notes: seeded-bad: template leakage, placeholder iaa token, ALIGNED overclaim, carried-forward source failure

## Phase 4 — Handover Artifacts

- [ ] TASK-ZTAC-P4-001 — Create prehandover proof for this wave
      builder: copilot-swe-agent[bot]
      qp_verdict: PENDING
      notes: Per ECAP-001 v1.2.0 template

- [ ] TASK-ZTAC-P4-002 — Create session memory for this wave
      builder: copilot-swe-agent[bot]
      qp_verdict: PENDING
      notes: Per session-memory-template.md

- [ ] TASK-ZTAC-P4-003 — Create IAA Pre-Brief for this wave
      builder: copilot-swe-agent[bot]
      qp_verdict: PENDING
      notes: Per IAA_PRE_BRIEF_PROTOCOL.md

- [ ] TASK-ZTAC-P4-004 — Invoke IAA and record token
      builder: copilot-swe-agent[bot]
      qp_verdict: PENDING
      notes: Pending completion of all wave tasks
