# Layer-Down Ripple Notice — Pre-IAA Commit-State Gate (§4.3c)

**Ripple Notice ID**: RIPPLE-PRE-IAA-COMMIT-STATE-GATE-20260408  
**Date**: 2026-04-08  
**Issued By**: Governance Repository Administrator (governance-repo-administrator-v2)  
**Authority**: CS2 (Johan Ras / Maturion)  
**Issue Reference**: [Governance] Harden pre-IAA handover discipline: explicit commit-state gate + PHASE_B alignment across producing-agent contracts  
**Parent Canon**: `AGENT_HANDOVER_AUTOMATION.md` v1.2.0 — §4.3c Pre-IAA Commit-State Gate  
**Layer-Down Status**: PUBLIC_API — consumer repos are obligated to act

---

## 1. Purpose

This layer-down ripple notice formally directs all consumer repositories to update their
**builder agent contracts** to include the canonical §4.3c Pre-IAA Commit-State Gate, as
required by `AGENT_HANDOVER_AUTOMATION.md` v1.2.0.

The governance repository has already:
- Canonised §4.3c in `AGENT_HANDOVER_AUTOMATION.md` v1.2.0
- Updated producing-agent contracts (Foreman, CodexAdvisor, GA) in this repo
- Updated `CANON_INVENTORY.json` and `CHANGELOG.md`

This notice directs consumer repositories to close the remaining gap in their builder contracts.

---

## 2. What Changed (Canonical Source)

### `AGENT_HANDOVER_AUTOMATION.md` v1.1.5 → v1.2.0

A new mandatory §4.3c Pre-IAA Commit-State Gate has been added to the canonical Phase 4
Handover structure. This gate is **BLOCKING** — no producing-agent contract may invoke IAA
without first running and passing this gate.

**New canonical Phase 4 structure:**

```
### 4.1 Evidence Artifact Generation
### 4.2 Session Memory & Closure
### 4.3 Pre-Handover Merge Gate Parity Check (mandatory, BLOCKING)
### 4.3b Token Update Ceremony (IAA token — append-only, dedicated file)
### 4.3c Pre-IAA Commit-State Gate (mandatory, BLOCKING)   ← NEW
### 4.4 Compliance Check & Escalation (if needed)
```

**Sequencing**: §4.3c runs immediately before IAA invocation. §4.3b runs after IAA verdict.

---

## 3. Required Actions for Consumer Repositories

### 3.1 Builder Agent Contracts

Every builder agent contract in every consumer repository MUST be updated to include §4.3c
**immediately before its IAA invocation step**.

**Minimum required checks** (all must PASS before IAA invocation):

| Check | Command | PASS condition |
|-------|---------|----------------|
| Clean working tree | `git status --porcelain` | Output is empty |
| No unstaged diffs | `git diff --name-only` | Output is empty |
| HEAD is the review state | `git show --name-only --format=fuller HEAD` | Latest commit shown |
| PREHANDOVER proof committed | `git ls-files --error-unmatch <proof-path>` | No error |
| Session memory committed | `git ls-files --error-unmatch <memory-path>` | No error |

**Canonical template**: `AGENT_HANDOVER_AUTOMATION.md` §Section 4.3c — copy the bash template,
replace `<Agent>` with the builder agent priority prefix (e.g., `B`), and place it immediately
before the IAA invocation tool call in Phase 4.

### 3.2 PHASE_A_ADVISORY → PHASE_B_BLOCKING

Builder agent contracts that still declare `advisory_phase: PHASE_A_ADVISORY` in their YAML
frontmatter MUST be updated to `advisory_phase: PHASE_B_BLOCKING` where the IAA is operationally
deployed.

**Note**: `PHASE_A_ADVISORY` is only the correct response when the IAA tool call itself returns a
`deployment-error`. It is NOT a self-declaration that can be written before or without the tool call.

### 3.3 Evidence Recording

After §4.3c PASS, builder contracts MUST record the commit-state evidence in the PREHANDOVER proof:

```markdown
## Commit-State Evidence (§4.3c)

- working_tree_status: CLEAN
- unstaged_diffs: NONE
- prehandover_proof_committed: YES — <path>
- session_memory_committed: YES — <path>
- head_commit: <full SHA>
- head_commit_title: <commit message first line>
- commit_state_gate: PASS
```

---

## 4. Affected Consumer Repositories

All repositories in `governance/CONSUMER_REPO_REGISTRY.json`:

| Repository | Status |
|------------|--------|
| APGI-cmy/maturion-foreman-office-app | ⏳ Awaiting builder contract update |
| APGI-cmy/PartPulse | ⏳ Awaiting builder contract update |
| APGI-cmy/maturion-isms | ⏳ Awaiting builder contract update |
| APGI-cmy/R_Roster | ⏳ Awaiting builder contract update |

Each consumer repo's governance liaison is responsible for issuing this ripple to their
respective Foreman / CodexAdvisor for builder contract alignment.

---

## 5. Non-Compliance Consequences

A builder agent contract that does not include §4.3c is **non-compliant** with
`AGENT_HANDOVER_AUTOMATION.md` v1.2.0 and the agent MUST halt and escalate when:
- The agent reaches Phase 4 and the gate step is missing
- IAA returns a REJECTION-PACKAGE citing commit-state / ceremony-state mismatch

The IAA is authorized to issue a REJECTION-PACKAGE for any PR where the submitting agent
cannot demonstrate §4.3c PASS in their PREHANDOVER proof.

---

## 6. Completion Criteria

This ripple is COMPLETE for a consumer repository when:
- [ ] All active builder agent contracts include §4.3c
- [ ] `advisory_phase` updated to `PHASE_B_BLOCKING` in all active builder contracts
- [ ] Commit-state evidence section added to PREHANDOVER proof template (if templated)
- [ ] Governance liaison confirms alignment in GOVERNANCE_ALIGNMENT.md

---

## 7. Authority and References

**Authority**: CS2 (Johan Ras) — pre-IAA handover discipline hardening  
**Canonical Source**: `governance/canon/AGENT_HANDOVER_AUTOMATION.md` v1.2.0 §4.3c  
**OVF Reference**: OVF-002 (promoted 2026-04-05) — Rules A-10, B-07  
**Related Canon**: `governance/canon/IAA_PRE_BRIEF_PROTOCOL.md` v1.2.0  
**FAIL-ONLY-ONCE**: Rules A-10, B-07 in all producing-agent FAIL-ONLY-ONCE registries

---

*Created: 2026-04-08 | Governance Repository Administrator | Authority: CS2*
