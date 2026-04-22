# Wave: ECAP / IAA Hardening Parity Catch-Up
# Issue: Catch up governance repo to ISMS ECAP / IAA hardening parity (including PR #1436 design set)
# CS2 Authorization: Issue — CS2 opened and assigned this wave to foreman-v2-agent
# Wave ID: ecap-parity
# Date: 2026-04-21

## Wave Summary

Bring `maturion-foreman-governance` to parity with the merged ECAP / IAA / Foreman hardening
already operating in `maturion-isms` / `app_management_centre`, while tracking PR maturion-isms#1436
as a pending design input.

## Task Checklist

- [x] TASK-EP-01 — G1: Formal parity gap analysis document
      builder: foreman-v2 (governance documentation — not production code)
      qp_verdict: PASS
      notes: Creates governance/gap-analysis/ecap-parity-gap-analysis-20260421.md

- [x] TASK-EP-02 — G2a: INDEPENDENT_ASSURANCE_AGENT_CANON.md catch-up to v1.8.0 (ACR-15, ACR-16)
      builder: foreman-v2 (canon documentation)
      qp_verdict: PASS
      notes: Added ACR-15 (active-wave/task-tracker contradiction) and ACR-16 (active final-state token/session incoherence); extended Active-Bundle Scope Rule

- [x] TASK-EP-03 — G2b: AGENT_HANDOVER_AUTOMATION.md catch-up to v1.6.0 (Check L in §4.3e)
      builder: foreman-v2 (canon documentation)
      qp_verdict: PASS
      notes: Added Check L (L1: wave-tracker, L2: token file, L3: active_bundle_iaa_coherence field); added AAP-23/24 to auto-fail table; updated Handover Validation Checklist

- [x] TASK-EP-04 — G2c: ECAP PREHANDOVER.template.md — add active_bundle_iaa_coherence and Ripple/Cross-Agent Assessment
      builder: foreman-v2 (template documentation)
      qp_verdict: PASS
      notes: v1.2.0 — active_bundle_iaa_coherence field and ## Ripple/Cross-Agent Assessment section added

- [x] TASK-EP-05 — G2d: execution-ceremony-admin-anti-patterns.md — add AAP-23 and AAP-24 for new ACR-15/ACR-16
      builder: foreman-v2 (checklist documentation)
      qp_verdict: PASS
      notes: v1.2.0 — AAP-23 and AAP-24 added; severity table updated; remediation table updated

- [x] TASK-EP-06 — G3: Live agent/operational parity review + escalation if .github/agents/* updates needed
      builder: foreman-v2 (review); CodexAdvisor-agent NOT invoked — no agent file changes required
      qp_verdict: PASS
      notes: Review documented in validation package §3; no agent file changes required this wave

- [x] TASK-EP-07 — G4: Proof-of-operation requirement document
      builder: foreman-v2 (governance documentation)
      qp_verdict: PASS
      notes: governance/gap-analysis/proof-of-operation-requirement-20260421.md created; PO-01 through PO-04 defined

- [x] TASK-EP-08 — G5: PR maturion-isms#1436 design-capture follow-on tracking document
      builder: foreman-v2 (governance documentation)
      qp_verdict: PASS
      notes: governance/tracking/pending-design-inputs-pr1436.md created; D2–D8 items tracked as PENDING

- [x] TASK-EP-09 — G6: Validation package
      builder: foreman-v2 (governance documentation)
      qp_verdict: PASS
      notes: governance/gap-analysis/validation-package-ecap-parity-20260421.md created

- [x] TASK-EP-10 — Update CANON_INVENTORY.json hashes for all modified canon files
      builder: foreman-v2 (inventory maintenance)
      qp_verdict: PASS
      notes: AGENT_HANDOVER_AUTOMATION.md → v1.6.0 (new hash); INDEPENDENT_ASSURANCE_AGENT_CANON.md → v1.8.0 (new hash)

---

## IAA Pre-Brief Reference

Pre-Brief path: `.agent-admin/assurance/iaa-prebrief-wave-ecap-parity.md`
Status: PHASE_A_ADVISORY (governance documentation wave — T3/T6 tier, IAA not required)

## CS2 Authorization Reference

Issue: "Catch up governance repo to ISMS ECAP / IAA hardening parity (including PR #1436 design set)"
Assignment: foreman-v2-agent explicitly assigned by CS2 in issue body.
