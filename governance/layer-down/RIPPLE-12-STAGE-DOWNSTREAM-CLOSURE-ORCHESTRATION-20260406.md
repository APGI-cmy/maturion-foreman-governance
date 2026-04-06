# Layer-Down Ripple Notice — 12-Stage Pre-Build Downstream Closure Orchestration

**Ripple Notice ID**: RIPPLE-12-STAGE-DOWNSTREAM-CLOSURE-ORCHESTRATION-20260406  
**Date**: 2026-04-06  
**Issued By**: Governance Repository Administrator (governance-repo-administrator-v2)  
**Authority**: CS2 (Johan Ras / Maturion)  
**Issue Reference**: APGI-cmy/maturion-foreman-governance (copilot/orchestrate-downstream-closure)  
**Parent Canon**: `PRE_BUILD_STAGE_MODEL_CANON.md` v1.0.0 (issue #1319)  
**Prior Ripple**: `RIPPLE-PRE-BUILD-STAGE-MODEL-DOCS-20260405` (issue #1320)  
**Layer-Down Status**: PUBLIC_API — consumer repos are obligated to act

---

## 1. Purpose

This layer-down ripple notice formally initiates the downstream closure of the canonical
12-stage pre-build governance model across all consumer repositories and agent layers.

The governance repository has already canonised the model and updated all governance-side
templates and canon documents (issues #1319 and #1320). This notice orchestrates the
remaining downstream closure across 5 parallel child tracks.

---

## 2. Canonical Model (Reference)

The binding canonical pre-build sequence is:

> **Stage 1 — App Description →
> Stage 2 — UX Workflow & Wiring Spec →
> Stage 3 — FRS →
> Stage 4 — TRS →
> Stage 5 — Architecture →
> Stage 6 — QA-to-Red →
> Stage 7 — PBFAG →
> Stage 8 — Implementation Plan →
> Stage 9 — Builder Checklist →
> Stage 10 — IAA Pre-Brief →
> Stage 11 — Builder Appointment →
> Stage 12 — Build**

All 12 stages are **mandatory** for every governed build. No stage may be skipped.

---

## 3. Downstream Actions Required

### 3.1 Consumer Repository: `APGI-cmy/maturion-isms`

**Priority**: HIGH  
**Responsible**: Governance Liaison (maturion-isms) / Foreman

The following actions must be completed in `maturion-isms` to align with the canonical
12-stage model:

| Action | Applicable Module(s) | Template Reference | Priority |
|--------|---------------------|-------------------|----------|
| Update `BUILD_PROGRESS_TRACKER.md` from 6-stage to 12-stage structure | All active modules (MAT, ROADMAP, PIT, AIMC, RADAM) | `governance/templates/BUILD_PROGRESS_TRACKER_TEMPLATE.md` | HIGH |
| Update App Description §5 stage list to 12-stage canonical sequence | All modules with active App Descriptions | `governance/templates/APP_DESCRIPTION_TEMPLATE.md` | HIGH |
| Update App Description §6 derivation chain to include UX Workflow & Wiring Spec | All modules with active App Descriptions | Same as above | HIGH |
| Update FRS Section 0 derivation chain to include UX Workflow & Wiring Spec | All modules with active FRS documents | `governance/templates/FRS_TEMPLATE.md` | HIGH |
| Create UX Workflow & Wiring Spec artifact for any module past Stage 1 without one | Modules at Stage 2 or beyond without a wiring spec | `governance/templates/UX_WORKFLOW_WIRING_SPEC_TEMPLATE.md` | HIGH |
| Create Builder Checklist artifact for any module at Stage 9 | Modules approaching or at Stage 9 | `governance/templates/BUILDER_CHECKLIST_TEMPLATE.md` | MEDIUM |
| Verify pre-build readiness checklists include Stages 2, 9, and 10 | All modules | — | MEDIUM |
| Update tracker templates and stage-folder structures to 12-stage numbering | All modules | `governance/templates/BUILD_PROGRESS_TRACKER_TEMPLATE.md` | MEDIUM |

**Action Required**: Foreman or Governance Liaison to create a tracking issue in
`APGI-cmy/maturion-isms` referencing this ripple notice and the parent canon.

---

### 3.2 Agent Contract Layer — Requires CS2 Authorization

The following agent contract changes have been escalated to CS2 and cannot proceed
without explicit CS2 authorization and CodexAdvisor execution.

**GA cannot implement these items** (Rule B-06). They are declared here for transparency.
CS2 should receive and action the escalation at:
`.agent-admin/escalation-inbox/escalation-agent-contracts-12-stage-alignment-20260406.md`

| Agent Contract | Change Required | Track | Status |
|----------------|----------------|-------|--------|
| `foreman-v2.agent.md` | Align pre-build stage references to 12-stage sequence; add Stages 2, 9 gate checkpoints | Track 2 | 🔴 Awaiting CS2 |
| Builder agent contract(s) | Align all stage references; confirm Stage 9 as explicit pre-appointment gate | Track 3 | 🔴 Awaiting CS2 |
| `independent-assurance-agent.md` | Update Tier 1/2/3 stage awareness for 12-stage model; confirm Stages 2, 9, 10 in assurance scope | Track 4 | 🔴 Awaiting CS2 |

---

### 3.3 `app_management_centre` Operational Alignment Review

**Priority**: MEDIUM  
**Responsible**: Foreman  
**Nature**: Discovery review — assess existing artifacts against 12-stage model

Foreman should schedule an alignment review for `app_management_centre` module artifacts
as Track 5 of this orchestration. See the orchestration tracker for detailed review criteria.

---

## 4. Templates Available for Consumer Use

All templates required for 12-stage model compliance are now available in the governance
repository under `governance/templates/`:

| Template | Stage | Status |
|----------|-------|--------|
| `APP_DESCRIPTION_TEMPLATE.md` | Stage 1 | ✅ Updated v1.1 (issue #1320) |
| `UX_WORKFLOW_WIRING_SPEC_TEMPLATE.md` | Stage 2 | ✅ NEW (issue #1320) |
| `FRS_TEMPLATE.md` | Stage 3 | ✅ Updated (issue #1320) |
| `TRS_TEMPLATE.md` | Stage 4 | Available |
| `BUILDER_CHECKLIST_TEMPLATE.md` | Stage 9 | ✅ NEW (issue #1320) |
| `BUILD_PROGRESS_TRACKER_TEMPLATE.md` | All stages | ✅ Updated to 12-stage (issue #1320) |

---

## 5. Governance Authority

This ripple is triggered by:
- `governance/canon/GOVERNANCE_RIPPLE_MODEL.md` — layer-down obligation when canon changes
- `governance/canon/PRE_BUILD_STAGE_MODEL_CANON.md` v1.0.0 §9 — downstream applicability
- `governance/canon/CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md` — consumer repo obligations

Consumer repositories are **obligated** to act on this ripple notice. Non-compliance
constitutes a governance drift violation.

---

## 6. Ripple Completion Criteria

This ripple is considered complete when:
1. All 5 child tracks are resolved or explicitly dispositioned
2. Consumer repo `maturion-isms` has filed evidence of 12-stage artifact alignment
3. Agent contract updates (Tracks 2–4) are merged with CS2-approved IAA tokens
4. `app_management_centre` review findings are declared and actioned or formally deferred

---

**Authority**: Governance Repository Administrator  
**Immutable Record**: This document is created once and not modified after filing.
