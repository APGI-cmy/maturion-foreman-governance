# Ripple Log — Pre-Build Stage Model Canon Documentation Updates

**Ripple ID**: RIPPLE-PRE-BUILD-STAGE-MODEL-DOCS-20260405  
**Date**: 2026-04-05  
**Initiated By**: Governance Repository Administrator (governance-repo-administrator-v2)  
**Issue Reference**: APGI-cmy/maturion-foreman-governance#1320  
**Parent Canon**: `PRE_BUILD_STAGE_MODEL_CANON.md` v1.0.0 (canonised in issue #1319)  
**Ripple Type**: Documentation implementation follow-on (non-breaking alignment)

---

## 1. Purpose

This ripple log records the governance-repository documentation changes made to formalise the End-to-End Pre-Build Stage Model across canonical governance artifacts in `maturion-foreman-governance`.

This is the follow-on documentation ripple to the canonisation of `PRE_BUILD_STAGE_MODEL_CANON.md` v1.0.0. The canon itself was established in issue #1319. This ripple performs the required documentation alignment: updating dependent artifacts so the new canonical sequence is reflected consistently across the governance stack.

---

## 2. Changes Made (This Repository)

### 2.1 Template Updates

| File | Change Type | Summary |
|------|------------|---------|
| `governance/templates/APP_DESCRIPTION_TEMPLATE.md` | Amendment | §5 Build Lifecycle Stages updated to canonical 12-stage sequence; §6 Requirements Derivation Chain updated to include UX Workflow & Wiring Spec |
| `governance/templates/FRS_TEMPLATE.md` | Amendment | Section 0 derivation statement and upstream authority table updated to include UX Workflow & Wiring Spec as second upstream source; derivation chain updated |
| `governance/templates/BUILD_PROGRESS_TRACKER_TEMPLATE.md` | Amendment | Stage structure updated from 6-stage model to 12-stage model per `PRE_BUILD_STAGE_MODEL_CANON.md` v1.0.0 |
| `governance/templates/UX_WORKFLOW_WIRING_SPEC_TEMPLATE.md` | **NEW** | New template for Stage 2 — UX Workflow & Wiring Spec; covers user journey maps, screen-level interactions, trigger catalogue, data movement flows, state transitions, AI action points, wiring matrix |
| `governance/templates/BUILDER_CHECKLIST_TEMPLATE.md` | **NEW** | New template for Stage 9 — Builder Checklist; covers agent contract checks, governance canon comprehension, scope comprehension, RED QA comprehension, dependency readiness, protocol compliance, Foreman role-fit assessment |

### 2.2 Canon Updates

| File | Change Type | Summary |
|------|------------|---------|
| `governance/canon/PRE_BUILD_REALITY_CHECK_CANON.md` | Amendment (v1.0.0 → v1.1.0) | §3.2 prerequisites updated to include UX Workflow & Wiring Spec; §1 purpose text updated; §5.1 Reality Check Log prerequisite checklist updated; `PRE_BUILD_STAGE_MODEL_CANON.md` added to §2 constitutional mandate |

### 2.3 Policy and Checklist Updates

| File | Change Type | Summary |
|------|------------|---------|
| `governance/policy/APP_DESCRIPTION_REQUIREMENT_POLICY.md` | Amendment | §AD-01 content updated to reference canonical 12-stage sequence; §AD-02 content updated to reference App Description → UX Workflow & Wiring Spec → FRS → TRS → Architecture chain |
| `governance/checklists/APP_DESCRIPTION_CREATION_CHECKLIST.md` | Amendment | B1 and B2 checks updated to reflect new 12-stage sequence and updated derivation chain |

---

## 3. Downstream Ripple Actions Required (Consumer Repositories)

The following consumer repositories must implement these changes to remain aligned with canonical governance. These are **identified and declared** here; they are not executed by this governance-repo change.

| Consumer Repo | Required Action | Priority | Tracking |
|--------------|----------------|----------|---------|
| `maturion-isms` (FM App, MAT, ROADMAP, PIT, AIMC, RADAM modules) | Update BUILD_PROGRESS_TRACKER.md stage structure in active modules | HIGH | Create ripple issue in consumer repo |
| `maturion-isms` | Update any active App Description documents: update §5 stage list and §6 derivation chain | HIGH | Create ripple issue in consumer repo |
| `maturion-isms` | Update any active FRS documents: update Section 0 derivation chain to include UX Workflow & Wiring Spec | HIGH | Create ripple issue in consumer repo |
| `maturion-isms` | Create UX Workflow & Wiring Spec artifacts for any module proceeding past Stage 1 without one | HIGH | Create ripple issue in consumer repo |
| All consumer repos | Update module pre-build readiness checklists to include Stages 2, 9, 10 | MEDIUM | Create ripple issue in consumer repo |
| All consumer repos | Update tracker templates and stage-folder structures to follow 12-stage numbering | MEDIUM | Create ripple issue in consumer repo |

---

## 4. Agent Contract Scope

Agent contract files (`.github/agents/`) are NOT modified by this ripple. Per Rule B-06, agent contract changes require CodexAdvisor involvement and CS2 authorization. The following agent contract files contain stage assumptions that should be reviewed in a separate CS2-authorized issue:

- `.github/agents/foreman-v2.agent.md` — contains pre-build stage references; should be reviewed to ensure alignment with 12-stage model
- Any consumer-repo agent contracts that reference pre-build stage sequences

**Action Required**: Create a separate CS2-gated issue to authorize CodexAdvisor to update agent contracts where stage assumptions have changed.

---

## 5. IAA Tier Logic

IAA tier 1, 2, and 3 logic should be reviewed to verify that:
- Stages 2, 9, and 10 are recognized as qualifying stages for assurance
- The 12-stage sequence is understood as the binding pre-build chain

This review is **identified** here as a downstream action. It should be executed under a separate issue in the consumer or governance repo as appropriate.

---

## 6. Builder Recruitment / Appointment Logic

FM_BUILDER_APPOINTMENT_PROTOCOL.md and FM_PREAUTH_CHECKLIST_CANON.md should be reviewed to ensure alignment with the 12-stage sequence, particularly:
- Stage 9 (Builder Checklist) as the explicit pre-appointment gate
- Stage 10 (IAA Pre-Brief) as mandatory before Stage 11 (Builder Appointment)

This review is **identified** here; it will be actioned in the next relevant governance update cycle.

---

## 7. Ripple Completion Status

| Action | Status |
|--------|--------|
| Templates updated (§2.1) | ✅ Complete |
| Canon updated (§2.2) | ✅ Complete |
| Policy and checklist updated (§2.3) | ✅ Complete |
| CANON_INVENTORY.json updated | ✅ Complete |
| GOVERNANCE_CANON_MANIFEST.md updated | ✅ Complete |
| CHANGELOG.md updated | ✅ Complete |
| Downstream ripple actions identified (§3) | ✅ Declared |
| Agent contract scope declared (§4) | ✅ Declared |

---

**Authority**: Governance Repository Administrator  
**Approved Under**: CS2 authority delegated to GA for documentation alignment (issue #1320)  
**Immutable Record**: This document is created once and not modified after filing.
