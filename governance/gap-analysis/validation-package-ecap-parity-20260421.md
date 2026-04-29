# Validation Package — ECAP / IAA Hardening Parity Catch-Up

**Document**: G6 Deliverable — Validation Package  
**Date**: 2026-04-21  
**Authority**: CS2 — Issue: "Catch up governance repo to ISMS ECAP / IAA hardening parity (including PR #1436 design set)"  
**Produced by**: foreman-v2

---

## Summary

This document provides the validation record for the `maturion-foreman-governance` ECAP/IAA
hardening parity catch-up wave, clearly separating:

1. **Merged parity — closed immediately in this wave**
2. **Pending parity — deferred until maturion-isms PR #1436 finalises**
3. **Drift prevention — how the governance repo will avoid falling behind again**

---

## Section 1 — Parity Gaps Closed Immediately

The following gaps were identified in the formal gap analysis (G1) and closed in this wave:

| Gap ID | Description | Governance Artifact Updated | New Version | Status |
|--------|-------------|----------------------------|-------------|--------|
| GAP-01 | Missing ACR-15 (active-wave/task-tracker contradiction) | `governance/canon/INDEPENDENT_ASSURANCE_AGENT_CANON.md` | v1.8.0 | ✅ CLOSED |
| GAP-02 | Missing ACR-16 (active final-state token/session incoherence) | `governance/canon/INDEPENDENT_ASSURANCE_AGENT_CANON.md` | v1.8.0 | ✅ CLOSED |
| GAP-03 | Missing §4.3e Check L (active-bundle token/session coherence) | `governance/canon/AGENT_HANDOVER_AUTOMATION.md` | v1.6.0 | ✅ CLOSED |
| GAP-04 | Missing AAP-23 (active-tracker contradiction anti-pattern) | `governance/checklists/execution-ceremony-admin-anti-patterns.md` | v1.2.0 | ✅ CLOSED |
| GAP-05 | Missing AAP-24 (active token/session incoherence anti-pattern) | `governance/checklists/execution-ceremony-admin-anti-patterns.md` | v1.2.0 | ✅ CLOSED |
| GAP-06 | Missing `active_bundle_iaa_coherence` field in PREHANDOVER template | `governance/templates/execution-ceremony-admin/PREHANDOVER.template.md` | v1.2.0 | ✅ CLOSED |
| GAP-07 | Missing `## Ripple/Cross-Agent Assessment` section in PREHANDOVER template | `governance/templates/execution-ceremony-admin/PREHANDOVER.template.md` | v1.2.0 | ✅ CLOSED |
| GAP-08 | Auto-fail rule table not including AAP-23 and AAP-24 | `governance/canon/AGENT_HANDOVER_AUTOMATION.md` | v1.6.0 | ✅ CLOSED |
| GAP-09 | Handover Validation Checklist missing Check L item | `governance/canon/AGENT_HANDOVER_AUTOMATION.md` | v1.6.0 | ✅ CLOSED |
| GAP-10 | Anti-patterns severity table missing AAP-23, AAP-24 | `governance/checklists/execution-ceremony-admin-anti-patterns.md` | v1.2.0 | ✅ CLOSED |
| GAP-11 | No formal parity gap analysis existed | `governance/gap-analysis/ecap-parity-gap-analysis-20260421.md` | NEW | ✅ CLOSED |
| GAP-12 | No proof-of-operation requirement for governance repo | `governance/gap-analysis/proof-of-operation-requirement-20260421.md` | NEW | ✅ CLOSED |
| GAP-13 | No explicit tracking of PR #1436 as pending design input | `governance/tracking/pending-design-inputs-pr1436.md` | NEW | ✅ CLOSED |

---

## Section 2 — Parity Gaps Intentionally Deferred

The following items from `maturion-isms#1436` are **NOT YET MERGED** and are explicitly deferred.
They are tracked in `governance/tracking/pending-design-inputs-pr1436.md`.

| Pending Item | maturion-isms#1436 Deliverable | Reason for Deferral | Status |
|-------------|-------------------------------|--------------------|---------| 
| Universal authoritative-reference truth hardening | D2 | PR #1436 not yet merged — final design not known | ⏳ DEFERRED |
| Wrong-but-existing reference anti-pattern set | D3 | PR #1436 not yet merged — final design not known | ⏳ DEFERRED |
| Renumber / rebase / conflict-resolution rule | D4 | PR #1436 not yet merged — final design not known | ⏳ DEFERRED |
| Foreman QP Authoritative Reference Table | D5 | PR #1436 not yet merged — final design not known | ⏳ DEFERRED |
| Liaison / non-ECAP mini-ceremony pack | D6 | PR #1436 not yet merged — final design not known | ⏳ DEFERRED |
| Further AAP/ACR/checklist/template updates from D7 | D7 | PR #1436 not yet merged — final design not known | ⏳ DEFERRED |
| PR #1436 validation package equivalent | D8 | Must follow after D2–D7 are absorbed | ⏳ DEFERRED |

**Authority for deferral**: The gap analysis (G1) and issue instructions both explicitly state:
> "Do not treat `maturion-isms#1436` as already merged truth."

---

## Section 3 — G3 Live Agent / Operational Parity Review Findings

A review of the governance repo's live operating agents and evidence paths was performed.

### Findings

| Area | Finding | Action Taken | Status |
|------|---------|-------------|--------|
| Foreman QP gate inventory | `gate_set_checked` field not present as explicit field in agent contract | No agent file change required — gate inventory is covered by §4.3e Check H which verifies per-gate entries in the gate-results JSON | ✅ ADEQUATE |
| IAA stale standalone pre-brief path assumptions | Governance repo session evidence uses dedicated token file model (A-20, B-12 in FAIL-ONLY-ONCE) | No change required — token file model already enforced | ✅ ADEQUATE |
| ECAP prohibition set | governance canon already has strong ECAP prohibition language | No change required | ✅ ADEQUATE |
| CodexAdvisor sole-authority protection | `AGENT_CONTRACT_FILE_PROTECTION_POLICY.md` adequately covers this | No agent file change required via this wave | ✅ ADEQUATE |
| Active-bundle coherence in agent operations | Check L not previously enforced in §4.3e gate | ✅ RESOLVED — Check L added in this wave | ✅ CLOSED |

**Agent file changes required**: NONE identified in this review. If any agent contract gaps emerge in future waves, they will be routed through CodexAdvisor-agent under the appropriate CS2 authorization.

---

## Section 4 — Proof-of-Operation Requirement

The proof-of-operation requirement is defined in `governance/gap-analysis/proof-of-operation-requirement-20260421.md` (G4 deliverable). It defines four evidence requirements (PO-01 through PO-04) to be satisfied on the first qualifying governance PR after this wave.

**Current status**: PENDING EXECUTION — requirements defined, evidence to be produced on first qualifying ECAP governance PR.

---

## Section 5 — Drift Prevention Assessment

| Mechanism | Status |
|-----------|--------|
| G5 tracking document for PR #1436 | ✅ COMMITTED — `governance/tracking/pending-design-inputs-pr1436.md` |
| Governance changelog discipline (version bumps + amendment notes) | ✅ ENFORCED — all canon files amended with version + amendment note |
| CANON_INVENTORY.json updated with new hashes | PENDING — update in this wave's commit |
| `layer_down_status: PUBLIC_API` on `AGENT_HANDOVER_AUTOMATION.md` | ✅ ALREADY SET — triggers ripple obligation automatically |
| IAA Pre-Brief for future canon-change waves | ✅ DEFINED — T3 waves with IAA-required tasks will generate pre-brief |
| `execution-ceremony-admin-anti-patterns.md` v1.2.0 | ✅ COMMITTED — includes all current known anti-patterns |

---

## Section 6 — CANON_INVENTORY Parity After This Wave

| File | Before This Wave | After This Wave |
|------|-----------------|-----------------|
| `AGENT_HANDOVER_AUTOMATION.md` | v1.5.0 | v1.6.0 |
| `INDEPENDENT_ASSURANCE_AGENT_CANON.md` | v1.7.0 | v1.8.0 |
| `execution-ceremony-admin-anti-patterns.md` (checklist) | v1.1.0 | v1.2.0 |
| `PREHANDOVER.template.md` (ECAP template) | v1.1.0 | v1.2.0 |

---

## Validation Verdict

| Deliverable | Status |
|------------|--------|
| G1 — Formal gap analysis | ✅ COMPLETE |
| G2 — Canon catch-up | ✅ COMPLETE (immediate items) |
| G3 — Live agent parity review | ✅ COMPLETE (no agent file changes required) |
| G4 — Proof-of-operation requirement | ✅ DEFINED (execution pending on first qualifying PR) |
| G5 — PR #1436 follow-on tracking | ✅ COMPLETE |
| G6 — This validation package | ✅ COMPLETE |

**Overall wave verdict**: GOVERNANCE-COMPLETE for immediate catch-up items. Proof-of-operation execution pending. PR #1436 follow-on pending its merge.

---

*G6 Deliverable | Wave: ecap-parity | Produced by: foreman-v2 | Date: 2026-04-21 | Authority: CS2 issue assignment*
