# Pre-Build 12-Stage Model — Downstream Closure Orchestration Tracker

**Status**: Active Orchestration  
**Version**: 1.0.0  
**Created**: 2026-04-06  
**Owner**: Governance Repository Administrator (GA)  
**Authority**: CS2 (Johan Ras / Maturion)  
**Issue Reference**: PR #1324 — APGI-cmy/maturion-foreman-governance  
**Parent Canon**: `PRE_BUILD_STAGE_MODEL_CANON.md` v1.0.0 (canonised issue #1319)  
**Depends On**: `ripple-pre-build-stage-model-docs-20260405.md` (issue #1320 documentation ripple)

---

## 1. Purpose

This document is the orchestration tracker for the downstream closure of the canonical
12-stage pre-build governance model across all affected consumer repositories and agent layers.

The canonical model (`PRE_BUILD_STAGE_MODEL_CANON.md` v1.0.0) and its documentation alignment
(issue #1320) are complete. This tracker governs the remaining downstream gap between:

- Constitutional governance truth (canon — complete)
- Live repo operating artifacts (consumer repos — partial)
- Actual agent execution logic (agent contracts — not yet updated)

---

## 2. Canonical Pre-Build Stage Sequence (Reference)

> **App Description → UX Workflow & Wiring Spec → FRS → TRS → Architecture →
> QA-to-Red → PBFAG → Implementation Plan → Builder Checklist → IAA Pre-Brief →
> Builder Appointment → Build**

All 12 stages are mandatory. No stage may be skipped. Stage order must be respected
except where explicit exceptions are documented and CS2-approved.

---

## 3. Orchestration Principle

Foreman operates as an orchestrator and may supervise multiple issue tracks in parallel.

Child issues may be worked in parallel, provided that:
- No child issue weakens canon
- No child issue reverts to the old shortened stage model
- No child issue introduces contradictions between governance, consumer repo artifacts,
  and agent contracts

---

## 4. Child Issue Tracks

### Track 1 — `maturion-isms` Consumer-Repo Pre-Build Artifact Alignment

**Owner**: Governance Liaison (maturion-isms) / Foreman  
**Scope**: Consumer repo `APGI-cmy/maturion-isms`  
**Type**: Layer-down ripple execution  
**CS2 Gated**: NO (documentation alignment within existing authority)  
**Agent Contract Changes**: NO  
**Status**: 🟡 PENDING — ripple notice issued; consumer repo action required

**Required Actions**:
- Update `BUILD_PROGRESS_TRACKER.md` stage structures in all active modules (MAT, ROADMAP,
  PIT, AIMC, RADAM) to reflect the canonical 12-stage sequence
- Update any active App Description documents: §5 stage list, §6 derivation chain
- Update any active FRS documents: Section 0 derivation chain to include UX Workflow & Wiring Spec
- Create `UX_WORKFLOW_WIRING_SPEC_TEMPLATE.md`-based artifacts for any module proceeding
  past Stage 1 that does not yet have one
- Update `BUILDER_CHECKLIST_TEMPLATE.md`-based artifacts for modules at Stage 9
- Verify all module pre-build readiness checklists include Stages 2, 9, and 10

**Tracking Issue**: To be created in `APGI-cmy/maturion-isms` by Foreman  
**Layer-Down Notice**: `governance/layer-down/RIPPLE-12-STAGE-DOWNSTREAM-CLOSURE-ORCHESTRATION-20260406.md`

---

### Track 2 — Foreman Contract Alignment to the 12-Stage Model

**Owner**: CodexAdvisor-agent (with CS2 authorization)  
**Scope**: `.github/agents/foreman-v2.agent.md`  
**Type**: Agent contract amendment  
**CS2 Gated**: YES — agent contract changes require CS2 authorization (Rule B-06)  
**Agent Contract Changes**: YES — `foreman-v2.agent.md`  
**Status**: 🔴 BLOCKED — escalation filed; awaiting CS2 authorization

**Required Actions**:
- CS2 authorizes a CodexAdvisor-executed issue to update `foreman-v2.agent.md`:
  - Align all pre-build stage references to the canonical 12-stage sequence
  - Add Stage 2 (UX Workflow & Wiring Spec) and Stage 9 (Builder Checklist) to any stage
    gate checklists or pre-authorization sequences
  - Confirm Stage 10 (IAA Pre-Brief) and Stage 11 (Builder Appointment) are reflected
    in `FM_BUILDER_APPOINTMENT_PROTOCOL.md` references within the contract
- After contract update: INTEGRITY_INDEX.md and `governance/quality/agent-integrity/`
  reference copy must be updated in the same PR (per memory store)
- Rule B-06 compliance confirmed: GA does NOT modify this file; CodexAdvisor executes

**Escalation**: `.agent-admin/escalation-inbox/escalation-agent-contracts-12-stage-alignment-20260406.md`  
**GA Authority Boundary**: GA cannot implement this track. CS2 must authorize CodexAdvisor.

---

### Track 3 — Builder Contract Alignment to the 12-Stage Model

**Owner**: CodexAdvisor-agent (with CS2 authorization)  
**Scope**: Any builder agent contract files (`.github/agents/` builder files)  
**Type**: Agent contract amendment  
**CS2 Gated**: YES — agent contract changes require CS2 authorization (Rule B-06)  
**Agent Contract Changes**: YES  
**Status**: 🔴 BLOCKED — escalation filed; awaiting CS2 authorization

**Required Actions**:
- CS2 authorizes a CodexAdvisor-executed issue to review builder agent contracts and:
  - Update all pre-build stage references to the canonical 12-stage sequence
  - Ensure Stage 9 (Builder Checklist) gate is explicitly recognized as a pre-appointment gate
  - Confirm that builder contracts reference the updated templates
    (`UX_WORKFLOW_WIRING_SPEC_TEMPLATE.md`, `BUILDER_CHECKLIST_TEMPLATE.md`)
  - Verify no builder contract workflow abbreviates to the old 6- or 9-stage model
- After contract update: INTEGRITY_INDEX.md and reference copy updates required in same PR

**Escalation**: `.agent-admin/escalation-inbox/escalation-agent-contracts-12-stage-alignment-20260406.md`  
**GA Authority Boundary**: GA cannot implement this track. CS2 must authorize CodexAdvisor.

---

### Track 4 — IAA Tier 1 / Tier 2 / Tier 3 Upgrade for Pre-Build Stage Assurance

**Owner**: CodexAdvisor-agent (with CS2 authorization) / IAA  
**Scope**: `governance/canon/IAA_PRE_BRIEF_PROTOCOL.md`, `.github/agents/independent-assurance-agent.md`  
**Type**: Canon amendment + agent contract amendment  
**CS2 Gated**: YES — both a constitutional canon semantic change AND an agent contract change  
**Agent Contract Changes**: YES — `independent-assurance-agent.md`  
**Status**: 🔴 BLOCKED — escalation filed; awaiting CS2 authorization

**Required Actions**:
- CS2 authorizes a CodexAdvisor-executed issue to:
  - Review `IAA_PRE_BRIEF_PROTOCOL.md` to verify Stages 2, 9, and 10 are explicitly
    recognized as qualifying stages for IAA assurance checks
  - Confirm the Tier 1 / Tier 2 / Tier 3 knowledge architecture references the full
    12-stage sequence as the binding pre-build chain
  - Update `independent-assurance-agent.md` stage awareness references to reflect 12-stage model
  - Update `governance/quality/agent-integrity/independent-assurance-agent.md` reference copy
    and `INTEGRITY_INDEX.md` in the same PR
  - Update `IAA_PRE_BRIEF_PROTOCOL.md` canon entry in `CANON_INVENTORY.json` with new SHA256

**Escalation**: `.agent-admin/escalation-inbox/escalation-agent-contracts-12-stage-alignment-20260406.md`  
**GA Authority Boundary**: Canon semantic changes require CS2. Agent contract changes require
  CodexAdvisor + CS2. GA cannot implement this track.

---

### Track 5 — `app_management_centre` Operational Alignment Review

**Owner**: Foreman / Governance Liaison  
**Scope**: `app_management_centre` module artifacts (in applicable consumer repo)  
**Type**: Operational review — verify alignment of existing artifacts to 12-stage model  
**CS2 Gated**: NO (review only; implementation may require CS2 depending on findings)  
**Agent Contract Changes**: NO (unless review identifies required contract changes)  
**Status**: 🟡 PENDING — review not yet started; assigned to next Foreman orchestration cycle

**Required Actions**:
- Foreman reviews `app_management_centre` module artifacts against the canonical 12-stage model:
  - Check whether a Stage 2 (UX Workflow & Wiring Spec) artifact exists and is approved
  - Check whether Stages 7 (PBFAG), 9 (Builder Checklist), 10 (IAA Pre-Brief) are either
    complete or explicitly deferred with CS2 rationale
  - Identify any artifacts that reference the old shortened stage model
  - Declare findings as: (a) Aligned, (b) Gap requiring action, (c) Not applicable with rationale
- If gaps are found: Foreman creates child issues for specific remediation actions

**Tracking**: Foreman cycle review; findings to be captured in a sub-issue  
**Note**: This track is a review/discovery action. Its scope may expand once findings are declared.

---

## 5. Track Dependency Map

```
Canon (Complete)
    │
    ├── Track 1: maturion-isms artifact alignment         [No dependency; parallelisable]
    │
    ├── Track 2: Foreman contract alignment               [CS2 authorization required first]
    │
    ├── Track 3: Builder contract alignment               [CS2 authorization required first]
    │   (can run parallel with Track 2 once CS2 approves)
    │
    ├── Track 4: IAA Tier upgrade                         [CS2 authorization required first]
    │   (can run parallel with Tracks 2 & 3 once CS2 approves)
    │
    └── Track 5: app_management_centre review             [No dependency; parallelisable]
        (findings may create sub-issues that depend on Tracks 2–4)
```

---

## 6. Success Condition

This umbrella tracker may be marked complete only when ALL of the following are satisfied:

| Condition | Status |
|-----------|--------|
| Track 1: `maturion-isms` artifact alignment complete | 🟡 Pending |
| Track 2: Foreman contract updated and merged (CS2 authorized) | 🔴 Blocked |
| Track 3: Builder contract updated and merged (CS2 authorized) | 🔴 Blocked |
| Track 4: IAA tier logic updated for 12-stage model | 🔴 Blocked |
| Track 5: `app_management_centre` review complete with findings dispositioned | 🟡 Pending |

---

## 7. GA Constraints and Authority Boundary

The Governance Repository Administrator is responsible for:
- ✅ Creating and maintaining this orchestration tracker
- ✅ Issuing layer-down ripple notices to consumer repositories
- ✅ Filing CS2 escalation requests for CS2-gated child tracks
- ✅ Recording the orchestration ripple log

The Governance Repository Administrator is **NOT** responsible for:
- ❌ Modifying `.github/agents/` files (Rule B-06 — requires CodexAdvisor + CS2)
- ❌ Implementing consumer repo changes (those happen in consumer repos)
- ❌ Making semantic canon changes without CS2 approval (Rule A-06)

---

## 8. Reference Documents

| Document | Purpose |
|----------|---------|
| `governance/canon/PRE_BUILD_STAGE_MODEL_CANON.md` v1.0.0 | Parent canon — 12-stage definition |
| `governance/canon/PRE_BUILD_REALITY_CHECK_CANON.md` v1.1.0 | Pre-build reality check gate |
| `governance/canon/IAA_PRE_BRIEF_PROTOCOL.md` v1.2.0 | IAA pre-brief ceremony |
| `governance/canon/FM_PREAUTH_CHECKLIST_CANON.md` | FM pre-authorization checklist |
| `governance/templates/UX_WORKFLOW_WIRING_SPEC_TEMPLATE.md` | Stage 2 template (new) |
| `governance/templates/BUILDER_CHECKLIST_TEMPLATE.md` | Stage 9 template (new) |
| `.agent-admin/governance/ripple-logs/ripple-pre-build-stage-model-docs-20260405.md` | Prior ripple log |
| `.agent-admin/escalation-inbox/escalation-agent-contracts-12-stage-alignment-20260406.md` | CS2 escalation for Tracks 2-4 |
| `governance/layer-down/RIPPLE-12-STAGE-DOWNSTREAM-CLOSURE-ORCHESTRATION-20260406.md` | Layer-down ripple notice |

---

**Authority**: Governance Repository Administrator  
**Approved Under**: GA orchestration authority — downstream closure tracking  
**Immutable Record**: This document is created once. Status updates are appended, not edited in-place.
