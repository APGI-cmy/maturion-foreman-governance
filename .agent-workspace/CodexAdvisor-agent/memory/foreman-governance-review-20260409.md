# Foreman Governance Review — Session 012 — 2026-04-09

**Author**: CodexAdvisor-agent (Contract v4.0.2)  
**Session**: session-012-20260409  
**Triggering Issue**: [Governance] CodexAdvisor review and repair of foreman-v2-agent contract in governance repo  
**CS2 Authorization**: Issue opened and assigned by APGI-cmy (Johan Ras)  
**Authority**: CS2

---

## 1. Executive Review Summary

The current governance-repo `foreman-v2.agent.md` is materially behind the strengthened current Foreman pattern as described in the triggering issue. The most critical defect is **file size**: at 62,414 bytes (characters), the contract is more than double the 30,000-character hard limit. This is a BLOCKING compliance failure.

Beyond size, the YAML structure deviates from the strengthened pattern in multiple ways, and the contract body contains embedded bash scripts and verbose commentary that belong in Tier 2 knowledge — not in the Tier 1 contract.

---

## 2. Mandatory Review Questions — Answers

### Q1: Does the current governance-repo Foreman contract match the strengthened current Foreman pattern?
**NO.** The contract is behind in the following areas (detailed in Section 3).

### Q2: Is IAA invocation fully specified at both the pre-brief stage and final handover stage?
**PARTIAL.** IAA Pre-Brief is present at §3.0a (Phase 3), but it should be a Phase 2 gate that blocks builder delegation. Final IAA handover is present at §4.5 with correct INC-IAA-SKIP-001 rule. However, the YAML `iaa_oversight` block is missing `artifact_immutability` (token ceremony) and `pre_brief` entries.

### Q3: Is PREHANDOVER immutability and token-file ceremony specified correctly?
**NO.** The current contract has no `artifact_immutability` block in `iaa_oversight`. The Phase 4 IAA section mentions the token file path pattern at §4.5 but does not have YAML-level enforcement of immutability.

### Q4: Does the contract explicitly block merge-ready state without final IAA PASS token?
**PARTIAL.** §4.5 has the "ABSOLUTE RULE" blockquote. However, the `iaa_oversight.advisory_phase: PHASE_B_BLOCKING` is present, which is correct. What's missing is the `artifact_immutability` specification.

### Q5: Is the 12-stage pre-build model present and complete?
**NO.** The current contract has an older "Phase 2.5 Pre-Build Reality Check Gate" with 6 prerequisites, not the canonical 12-stage model from `PRE_BUILD_STAGE_MODEL_CANON.md`.

### Q6: Are builder-delegation gates clearly enforced?
**PARTIAL.** The pre-wave agent availability check (§3.0) is solid. But the no-delegation-before-stages-5-to-10 (now stages 1-10 per the 12-stage model) is not explicitly stated as a HALT condition.

### Q7: Are mode boundaries (Foreman vs builder vs IAA vs CodexAdvisor) explicit and constitutionally safe?
**YES (mostly).** Mode boundaries are explicit. The Verb Classification Gate and Mode-Switching Protocol are present. The `cannot_invoke` list correctly identifies that IAA is not a task delegation. However, the `can_invoke` and `cannot_invoke` and `own_contract` sections are nested under `capabilities.job_environment` rather than being top-level YAML sections as required by the strengthened pattern.

### Q8: Are parallel-wave constraints explicitly declared?
**NO.** There are no parallel-wave constraints in the current contract. This is a gap.

### Q9: Does the contract remain under the prompt-size ceiling while preserving required behavior?
**NO.** At 62,414 bytes, the contract is 208% of the 30,000-character limit. This is a critical failure.

---

## 3. Material Deltas — Current vs. Strengthened Pattern

### 3.1 CRITICAL — BLOCKING

| Delta | Current State | Required State |
|-------|---------------|----------------|
| **D-CRIT-01**: File size | 62,414 bytes (208% of limit) | ≤ 30,000 characters |
| **D-CRIT-02**: `name:` field | MISSING | `name: foreman-v2` (top-level) |
| **D-CRIT-03**: `can_invoke` / `cannot_invoke` | Nested under `capabilities.job_environment` | Top-level YAML sections |
| **D-CRIT-04**: `own_contract` | Nested under `capabilities.job_environment` | Top-level YAML section |
| **D-CRIT-05**: `iaa_oversight.artifact_immutability` | MISSING | Required (token ceremony spec) |
| **D-CRIT-06**: 12-stage pre-build model | ABSENT (6-prerequisite older gate only) | Explicit 12-stage per PRE_BUILD_STAGE_MODEL_CANON.md |
| **D-CRIT-07**: Parallel-wave constraints | ABSENT | Explicit declaration required |
| **D-CRIT-08**: IAA pre-brief as Phase 2 gate | At Phase 3 (§3.0a) | Must be Phase 2 gate — blocks builder delegation |
| **D-CRIT-09**: No-delegation-before-stages-1-10 | Absent | Explicit HALT-008 condition required |

### 3.2 HIGH — Should Fix

| Delta | Current State | Required State |
|-------|---------------|----------------|
| **D-HIGH-01**: `execution_identity.secret` | `secret: MATURION_BOT_TOKEN` (legacy) | `secret_env_var: MATURION_BOT_TOKEN` |
| **D-HIGH-02**: Contract status | "EXPERIMENTAL - For governance/author review only" | Remove EXPERIMENTAL status |
| **D-HIGH-03**: `iaa_oversight.pre_brief` | MISSING from YAML | Required sub-block |
| **D-HIGH-04**: Phase structure | Phase 1, Phase 2, Phase 2.5, Phase 3, Phase 4 | Clean 4-phase: 1-2-3-4 |
| **D-HIGH-05**: ESC-004 (parallel-wave constraint conflict) | MISSING | Required escalation condition |
| **D-HIGH-06**: HALT-007 (IAA skip) | MISSING from YAML halt_conditions | Required |
| **D-HIGH-07**: HALT-008 (pre-build stages 1-10 incomplete) | MISSING from YAML halt_conditions | Required |
| **D-HIGH-08**: `tier2_knowledge.required_files` | Only 2 files listed | Should include FAIL-ONLY-ONCE.md and pre-build-stage-model-reference.md |

### 3.3 MEDIUM — Record for Follow-up

| Delta | Current State | Required State |
|-------|---------------|----------------|
| **D-MED-01**: Body footers have hardcoded version strings | "Contract Version: 2.1.0", "Last Updated: 2026-02-21" | Versions from YAML only |
| **D-MED-02**: Embedded bash scripts | Multiple long scripts embedded | Move to Tier 2 scripts; reference by path only |
| **D-MED-03**: `agent.id` | `foreman` | `foreman-v2` (match filename) |
| **D-MED-04**: `id:` (top-level) | `foreman` | `foreman-v2` (match filename) |
| **D-MED-05**: `iaa_oversight.invocation_step` | "Phase 4 Handover — IAA Independent Audit" | "Phase 4 — IAA Independent Audit" (cleaner) |

---

## 4. Repair Actions Taken

The repaired contract (D2) addresses all CRITICAL and HIGH deltas:
- Size reduced from 62,414 to approximately 29,000 characters by removing embedded bash scripts, verbose commentary, and Priority Reference Matrix (all moved to Tier 2 reference)
- YAML hardened: `name`, top-level `can_invoke`/`cannot_invoke`/`own_contract`, `secret_env_var`, `artifact_immutability`, `pre_brief`, HALT-007, HALT-008, ESC-004
- 12-stage pre-build model added (stage table with gate descriptions)
- Parallel-wave constraints explicitly declared
- IAA pre-brief promoted to Phase 2 gate
- Phase structure cleaned to 4 phases (Phase 2.5 absorbed into Phase 2 and Phase 3)
- EXPERIMENTAL status removed
- Contract version bumped to 3.0.0

---

## 5. Related Contract Weaknesses — Follow-Up Recommendations

See parking station note at `.agent-workspace/CodexAdvisor-agent/parking-station/suggestions-log.md` for full detail.

Summary of key follow-up for `governance-repo-administrator-v2.agent.md`:
- Legacy `secret:` usage instead of `secret_env_var`
- `can_invoke`/`cannot_invoke`/`own_contract` nested under `capabilities.job_environment` instead of top-level
- Thin Tier 2 requirement declaration
- Older body composition style relative to strengthened contract family

---

*CodexAdvisor-agent | Session 012 | 2026-04-09 | CS2 authorized*
