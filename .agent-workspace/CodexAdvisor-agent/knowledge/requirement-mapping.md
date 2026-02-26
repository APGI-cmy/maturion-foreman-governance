# Requirement Mapping — CodexAdvisor

**Version**: 1.0.0  
**Created**: 2026-02-26  
**Authority**: CS2 (Johan Ras)  
**Canonical Source**: `governance/checklists/CODEX_ADVISOR_AGENT_CONTRACT_REQUIREMENTS_CHECKLIST.md`

---

## Purpose

Maps Living Agent System v6.2.0 requirements to CodexAdvisor contract sections.
Used in Phase 3 Step 3.4 when drafting or validating agent contracts.

---

## Canon Management Requirements (REQ-CM-*)

| ID | Requirement | Contract Location |
|----|-------------|------------------|
| REQ-CM-001 | Valid YAML frontmatter with all required fields | YAML frontmatter block |
| REQ-CM-002 | Correct field ordering in YAML | YAML frontmatter block |
| REQ-CM-003 | Mission statement | `identity.mission` YAML field |
| REQ-CM-004 | Wake-up protocol via `.github/scripts/wake-up-protocol.sh` | Phase 1 Step 1.3 |
| REQ-CM-005 | Session memory protocol | Phase 1 Step 1.4, Phase 4 Step 4.3 |
| REQ-CM-006 | Agent-factory operational protocol | Phase 3 Steps 3.1–3.8 |
| REQ-CM-007 | All 5 validation hooks documented | Phase 4 Step 4.1 (OPOJD gate) |
| REQ-CM-008 | 56 requirement mappings with references | This file |
| REQ-CM-009 | Protected sections with lock metadata | `identity.lock_id`, `prohibitions` YAML |
| REQ-CM-010 | Authority and version footer | Contract footer |

## Evidence & Records (REQ-ER-*)

| ID | Requirement | Contract Location |
|----|-------------|------------------|
| REQ-ER-001 | Declared evidence output at every phase gate | All phase step output blocks |
| REQ-ER-002 | PREHANDOVER proof artifact | Phase 4 Step 4.2 |
| REQ-ER-003 | Session memory artifact | Phase 4 Step 4.3 |
| REQ-ER-004 | Parking station entries | Phase 3 Step 3.5, Phase 4 Step 4.3 |
| REQ-ER-005 | FAIL-ONLY-ONCE breach registry | Phase 1 Step 1.5 |

## Ripple & Alignment (REQ-RA-*)

| ID | Requirement | Contract Location |
|----|-------------|------------------|
| REQ-RA-001 | CANON_INVENTORY alignment check | Phase 1 Step 1.3, Phase 2 Step 2.2 |
| REQ-RA-002 | Hash non-degraded verification | Phase 1 Step 1.3 |
| REQ-RA-003 | Degraded mode halt | `governance.degraded_on_placeholder_hashes`, HALT-002 |
| REQ-RA-004 | Consumer repo registry awareness | Phase 2 Step 2.2 |
| REQ-RA-005 | Ripple dispatch coordination | `capabilities.alignment` YAML |
| REQ-RA-006 | Cross-repo governance scope | `scope.repository` YAML |

## Gate Compliance (REQ-GC-*)

| ID | Requirement | Contract Location |
|----|-------------|------------------|
| REQ-GC-001 | Merge gate interface checks declared | `merge_gate_interface.required_checks` YAML |
| REQ-GC-002 | Parity enforcement: BLOCKING | `merge_gate_interface.parity_enforcement` YAML |
| REQ-GC-003 | Local parity check before Phase 4 | Phase 3 Step 3.8 |
| REQ-GC-004 | OPOJD gate in Phase 4 | Phase 4 Step 4.1 |
| REQ-GC-005 | Character count within 30,000 | Phase 2 Step 2.5, Phase 4 Step 4.1 |

## Authority & Self-Alignment (REQ-AS-*)

| ID | Requirement | Contract Location |
|----|-------------|------------------|
| REQ-AS-001 | CS2 authorization verification | Phase 2 Step 2.1 |
| REQ-AS-002 | Self-modification guard | Phase 2 Step 2.4, SELF-MOD-001 prohibition |
| REQ-AS-003 | No push to main | `governance.execution_identity.safety.never_push_main` |
| REQ-AS-004 | CS2-only merge authority | Phase 4 Step 4.6 |
| REQ-AS-005 | Self-approval prohibition | `prohibitions.NO-SELF-APPROVE-001` |

## Execution & Operations (REQ-EO-*)

| ID | Requirement | Contract Location |
|----|-------------|------------------|
| REQ-EO-001 | Four-phase canonical pattern | Contract structure |
| REQ-EO-002 | No execution without approval | `prohibitions`, escalation halts |
| REQ-EO-003 | Tier 2/3 stub check | Phase 2 Step 2.6 |
| REQ-EO-004 | Job-specific checklist load | Phase 2 Step 2.3 |
| REQ-EO-005 | QP interrupt after every draft | Phase 3 Step 3.6 |
| REQ-EO-006 | Complete bundle before PR | Phase 3 Step 3.7 |

## Merge Gate Interface (REQ-MGI-*)

| ID | Requirement | Contract Location |
|----|-------------|------------------|
| REQ-MGI-001 | `merge-gate/verdict` check present | `merge_gate_interface.required_checks` |
| REQ-MGI-002 | `governance/alignment` check present | `merge_gate_interface.required_checks` |
| REQ-MGI-003 | `stop-and-fix/enforcement` check present | `merge_gate_interface.required_checks` |
| REQ-MGI-004 | All checks run locally before PR | Phase 3 Step 3.8 |
| REQ-MGI-005 | CI parity with local results | Phase 3 Step 3.8 |

## Coordination & Reporting (REQ-CR-*)

| ID | Requirement | Contract Location |
|----|-------------|------------------|
| REQ-CR-001 | IAA invocation for agent contract changes | Phase 4 Step 4.4, `iaa_oversight` YAML |
| REQ-CR-002 | IAA trigger classification | Phase 3 Step 3.2 |
| REQ-CR-003 | PR description completeness | Phase 4 Step 4.5 |
| REQ-CR-004 | Await state after PR open | Phase 4 Step 4.6 |
| REQ-CR-005 | Suggestions for improvement (non-blank) | Phase 4 Step 4.3 |

## Security & Safety (REQ-SS-*)

| ID | Requirement | Contract Location |
|----|-------------|------------------|
| REQ-SS-001 | No secrets in commits/PRs | `prohibitions.NO-SECRETS-001` |
| REQ-SS-002 | Secret referenced by name only | `governance.execution_identity.secret` |
| REQ-SS-003 | No Tier 2 content in Tier 1 | `prohibitions.NO-EMBED-001` |
| REQ-SS-004 | Protected paths declared | `scope.protected_paths` YAML |
| REQ-SS-005 | Approval required for all actions | `scope.approval_required: ALL_ACTIONS` |

## Ambiguities & Gaps (REQ-AG-*)

| ID | Requirement | Contract Location |
|----|-------------|------------------|
| REQ-AG-001 | Ambiguous governance → escalate to CS2 | `escalation.escalate_conditions.ESC-002` |
| REQ-AG-002 | Missing canon artifacts → escalate | `escalation.halt_conditions.HALT-002` |
| REQ-AG-003 | Delegation failure → escalate | `escalation.halt_conditions.HALT-006` |
| REQ-AG-004 | Contract/authority change → escalate | `escalation.escalate_conditions.ESC-001` |

## Validation Hooks (VH-*)

| ID | Hook | Trigger | Contract Location |
|----|------|---------|------------------|
| VH-001 | YAML frontmatter validation | Pre-PR | Phase 4 Step 4.1 |
| VH-002 | Checklist compliance validation | Pre-PR | Phase 3 Step 3.6, Phase 4 Step 4.1 |
| VH-003 | CANON_INVENTORY hash validation | Session start + pre-PR | Phase 1 Step 1.3, Phase 2 Step 2.2 |
| VH-004 | Merge gate interface validation | Pre-PR | Phase 3 Step 3.8 |
| VH-005 | Prohibition enforcement validation | Throughout | `prohibitions` YAML block |

---

**Total**: 56 requirements (REQ-CM through REQ-AG) + 5 validation hooks = 61 mapped items

**Tier-3 Canon Reference**: `governance/checklists/CODEX_ADVISOR_AGENT_CONTRACT_REQUIREMENTS_CHECKLIST.md`  
**Tier-3 Canon Reference**: `governance/canon/AGENT_CONTRACT_ARCHITECTURE.md`
