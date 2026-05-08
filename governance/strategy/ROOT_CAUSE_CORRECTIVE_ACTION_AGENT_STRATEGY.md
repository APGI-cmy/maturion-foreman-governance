# ROOT CAUSE AND CORRECTIVE ACTION AGENT STRATEGY

## Status
**Type**: Governance Strategy Document  
**Authority**: Maturion Engineering Leadership (CS2 and Agent Advisor Oversight)  
**Version**: 1.0.0  
**Effective Date**: 2026-05-08  
**Owner**: Governance Administrator  
**Purpose**: Define the strategy and design intent for a lightweight Root Cause and Corrective Action Agent model

---

## 1. Purpose

The **Root Cause and Corrective Action Agent** exists to diagnose meaningful failures and route corrective action so the same failure class is less likely to recur.

This strategy explicitly protects clean delivery flow:
- Clean PRs must not inherit new continuous-improvement ceremony.
- The RCA model must activate only on meaningful signals.
- The model must improve signal quality without creating contributor irritation or checklist inflation.

---

## 2. Name and Terminology

### 2.1 Canonical Naming
- **Formal name**: Root Cause and Corrective Action Agent
- **Accepted shorthand**: RCA Agent
- **Conversational alias**: Continuous Improvement Agent

### 2.2 Naming Guardrail
Avoid the abbreviation **CIA** in canon names, workflow names, labels, and operational artifacts unless explicitly approved by CS2, because it is ambiguous in cross-domain contexts.

---

## 3. Trigger Philosophy

The trigger model must be explicit and low-noise:

1. **Mandatory invocation** for high-signal governance, delivery, or assurance failures.
2. **Optional invocation** when learning value is likely but hard blocking is not justified.
3. **Manual invocation** through explicit trigger phrases when human oversight decides a learning loop is needed.

The model must not be used for routine typo review, first-pass non-substantive comments, or straightforward fixes already covered by existing standards.

---

## 4. Relationship to Existing Roles

- **RCA Agent**: Diagnoses failure cause, classifies failure type, selects lowest effective correction layer, and routes ownership.
- **Foreman**: Continues orchestration and delegation; does not treat RCA output as implemented fix.
- **Builder / specialist agent**: Implements product/code corrective changes.
- **ECAP**: Proves current-head gate/evidence truth and ceremony correctness.
- **IAA**: Independently assures corrected work and, when RCA is mandatory, reviews RCA quality and sufficiency.
- **CS2 + Agent Advisor**: Retain final overview for system-changing actions (canon, gates, contracts, burden-risk changes).

---

## 5. Lowest-Effective-Layer Doctrine

The RCA Agent must select the **lowest effective layer** that prevents recurrence without unnecessary burden:

1. No system action
2. Tier 2 guidance/checklist update
3. Tier 2 discoverability/index improvement
4. Evidence/template update
5. CI/gate update
6. Regression test addition
7. Canon issue
8. Agent-contract review
9. Product backlog item

Escalate to heavier layers only when lower-layer correction cannot reasonably prevent repeat failure.

---

## 6. Anti-Burden Guardrails

1. No RCA artifact required for clean PRs.
2. No RCA invocation for cosmetic comments unless CS2 explicitly requests it.
3. If existing guidance already covers the failure, valid RCA output is:
   - `NO SYSTEM CHANGE REQUIRED — APPLY EXISTING STANDARD`
4. RCA must not be used to create checklist bloat, redundant gates, or canon inflation.
5. Corrections should prefer clarification and discoverability before introducing new blockers.

---

## 7. Evidence and Handover Model

### 7.1 RCA Assessment Artifact
RCA output must be concise and structured to support implementation routing and independent review.

### 7.2 IAA Refer-Back Model
When RCA was mandatory, IAA may refer back to RCA if:
- root cause is misidentified,
- corrective layer is excessive or insufficient,
- corrective action was not implemented,
- recurrence risk remains unmitigated.

### 7.3 CS2 Final Overview Conditions
CS2/agent-advisor overview is required when RCA proposes:
- canon change,
- gate logic change,
- contract-impacting recommendation,
- systemic multi-workflow correction,
- high operational burden risk.

---

## 8. Activation Strategy (Strategy → Canon → Activation)

This model is rolled out in strict order:

1. **Strategy** (this document) — define intent, boundaries, and anti-burden posture.
2. **Canon** — define binding trigger law and RCA operating contract when invoked.
3. **Activation** — phased operationalization only after canon is established.

### 8.1 Phase A (Manual / Semi-Automated)
- Manual trigger phrases supported:
  - `RCA_REQUIRED`
  - `ROOT_CAUSE_REQUIRED`
  - `CONTINUOUS_IMPROVEMENT_REQUIRED`
- Reusable RCA assessment template and guidance made available.
- IAA RCA review guidance added.

### 8.2 Phase B (Label / Soft Automation)
- Optional workflow/bot applies `continuous-improvement-required` on trigger signal detection.
- Workflow posts RCA template comment.
- Handover remains soft-guided unless another required gate already blocks.

### 8.3 Phase C (Hard Gate, Only After Proven Value)
- Hard gate only after signal quality is demonstrated and false-positive rate is acceptable.
- If label exists, require RCA assessment + IAA `RCA_REVIEW: PASS` before handover success.
- CS2 approval required before hard-gate adoption.

---

## 9. Layer-Down Design Intent

When layering down to consumer repos (including `maturion-isms`), implementation must focus on operational usability, low-noise triggering, and role clarity. Activation is not complete by copying canon text; it requires practical templates, guidance, and review loops that preserve anti-burden principles.

---

## 10. Success Criteria

The strategy is successful when:
- clean PRs remain low ceremony,
- meaningful failures consistently produce root-cause learning,
- repeated/systemic failures are converted into durable correction,
- operational burden remains controlled,
- next agents have less room to repeat known failures.
