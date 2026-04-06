# CS2 Escalation — Agent Contract 12-Stage Model Alignment

**Escalation ID**: ESC-AGENT-CONTRACTS-12-STAGE-ALIGNMENT-20260406  
**Date**: 2026-04-06  
**Escalated By**: Governance Repository Administrator (governance-repo-administrator-v2)  
**Escalation Target**: CS2 (Johan Ras) + CodexAdvisor-agent  
**Authority Rule**: FAIL-ONLY-ONCE Rule B-06 — GA does NOT modify `.github/agents/` files  
**Related Issue**: APGI-cmy/maturion-foreman-governance (copilot/orchestrate-downstream-closure)  
**Parent Canon**: `PRE_BUILD_STAGE_MODEL_CANON.md` v1.0.0 (issue #1319)

---

## 1. Reason for Escalation

The downstream closure of the 12-stage pre-build model requires agent contract updates.
Per FAIL-ONLY-ONCE Rule B-06 and the GA authority boundary, the Governance Repository
Administrator cannot modify files in `.github/agents/` under any circumstance.

Child Tracks 2, 3, and 4 of the downstream closure orchestration each require agent
contract changes that must be executed by CodexAdvisor-agent with explicit CS2 authorization.

This escalation formally requests CS2 authorization for CodexAdvisor to execute those tracks.

---

## 2. Required Agent Contract Changes

### 2.1 Track 2 — Foreman Contract (`foreman-v2.agent.md`)

**File**: `.github/agents/foreman-v2.agent.md`  
**Change Type**: Non-semantic alignment — stage reference updates  
**Risk Assessment**: Low — updates stage references to reflect already-canonised model

**Required Changes**:
1. Locate all references to pre-build stages (currently reflecting older 6- or partial-stage model)
2. Update those references to reflect the canonical 12-stage sequence:
   App Description → UX Workflow & Wiring Spec → FRS → TRS → Architecture →
   QA-to-Red → PBFAG → Implementation Plan → Builder Checklist → IAA Pre-Brief →
   Builder Appointment → Build
3. Confirm Stage 2 (UX Workflow & Wiring Spec) is listed as a Foreman gate-check requirement
   in the pre-authorization workflow
4. Confirm Stage 9 (Builder Checklist) is listed as a required artifact before Stage 11
   (Builder Appointment)
5. Confirm `FM_BUILDER_APPOINTMENT_PROTOCOL.md` and `FM_PREAUTH_CHECKLIST_CANON.md` cross-
   references within the contract are consistent with the 12-stage sequence

**Atomicity Requirement** (per INTEGRITY_INDEX.md protocol):
- `governance/quality/agent-integrity/foreman-v2.agent.md` reference copy must be updated in the same PR
- `governance/quality/agent-integrity/INTEGRITY_INDEX.md` SHA256 entry must be updated in the same PR

---

### 2.2 Track 3 — Builder Agent Contract(s)

**File(s)**: Builder agent contract files in `.github/agents/`  
**Change Type**: Non-semantic alignment — stage reference updates  
**Risk Assessment**: Low — updates stage references to reflect already-canonised model

**Required Changes**:
1. Identify all builder agent contract files in `.github/agents/`
2. Update all pre-build stage references to reflect the canonical 12-stage sequence
3. Confirm Stage 9 (Builder Checklist) is explicitly recognized as the pre-appointment
   gate that must be passed before Stage 11 (Builder Appointment)
4. Confirm builder contract templates reference:
   - `governance/templates/UX_WORKFLOW_WIRING_SPEC_TEMPLATE.md` for Stage 2
   - `governance/templates/BUILDER_CHECKLIST_TEMPLATE.md` for Stage 9
5. Confirm no builder contract workflow abbreviates to the old 6-stage or 9-stage model

**Atomicity Requirement**: Reference copy and INTEGRITY_INDEX.md updates required
if builder contracts are listed in the integrity index.

---

### 2.3 Track 4 — IAA Agent Contract and IAA Pre-Brief Protocol

**File (Agent Contract)**: `.github/agents/independent-assurance-agent.md`  
**File (Canon)**: `governance/canon/IAA_PRE_BRIEF_PROTOCOL.md`  
**Change Type**: 
- Agent contract: non-semantic alignment  
- Canon protocol: verify/clarify scope — may be clarification only (no semantic change)  
**Risk Assessment**: Low to Medium — depends on whether Stages 2, 9, 10 require explicit
  protocol additions or are already implicitly covered

**Required Changes**:
1. Review `IAA_PRE_BRIEF_PROTOCOL.md` v1.2.0 for:
   - Whether Stage 2 (UX Workflow & Wiring Spec) artifacts are recognized as an assurance input
   - Whether Stage 9 (Builder Checklist) completion is a Tier 1/2/3 verification item
   - Whether Stage 10 (IAA Pre-Brief) — which IS the IAA ceremony — is correctly mapped in
     the protocol as a distinct mandatory stage (not just a check)
2. If the protocol currently covers these stages implicitly: add explicit stage references
   and clarify the binding to the 12-stage model
3. If the protocol currently omits these stages: propose amendments to CS2 for approval
4. Update `independent-assurance-agent.md` Tier 1/2/3 knowledge architecture to reference
   the 12-stage model as the binding pre-build chain
5. Update `governance/quality/agent-integrity/independent-assurance-agent.md` reference copy
   and `INTEGRITY_INDEX.md` SHA256 in the same PR

**Note on Canon Authority**: If `IAA_PRE_BRIEF_PROTOCOL.md` requires semantic changes
(not just clarification), those changes require a separate CS2-authorized canon amendment.
GA cannot assess this in advance; CodexAdvisor should do so during Track 4 execution.

---

## 3. Requested CS2 Actions

CS2 is requested to:

1. **Authorize CodexAdvisor** to execute Track 2 (Foreman contract alignment) by creating
   a CS2-gated issue in `maturion-foreman-governance` with subject:
   "CodexAdvisor: Align foreman-v2.agent.md to 12-stage pre-build model"

2. **Authorize CodexAdvisor** to execute Track 3 (Builder contract alignment) by creating
   a CS2-gated issue with subject:
   "CodexAdvisor: Align builder agent contracts to 12-stage pre-build model"

3. **Authorize CodexAdvisor** to execute Track 4 (IAA tier upgrade) by creating a CS2-gated
   issue with subject:
   "CodexAdvisor: IAA Tier 1/2/3 upgrade for 12-stage pre-build stage assurance"
   — noting that Track 4 may surface a need for a separate canon amendment issue

---

## 4. GA Constraint Attestation

Per FAIL-ONLY-ONCE Rule B-06, this escalation is GA's complete and only permissible
action regarding agent contract changes. GA does NOT:
- Modify any file in `.github/agents/`
- Instruct CodexAdvisor to act without CS2 authorization
- Interpret the required scope of agent contract changes without CS2 guidance

The work declared in §2 above is the GA's best-effort scope assessment based on the
canonical model. CS2 and CodexAdvisor may adjust the scope as appropriate.

---

**Escalation Status**: Open — awaiting CS2 response  
**Filed By**: Governance Repository Administrator (governance-repo-administrator-v2)  
**Date Filed**: 2026-04-06  
**Immutable Record**: This document is created once and not modified after filing.
