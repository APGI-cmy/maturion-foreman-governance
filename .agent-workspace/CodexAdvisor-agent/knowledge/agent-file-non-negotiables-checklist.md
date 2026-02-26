# Agent File Non-Negotiables Checklist — CodexAdvisor

**Version**: 1.0.0  
**Created**: 2026-02-26  
**Authority**: CS2 (Johan Ras)  
**Canonical Source**: `governance/checklists/CODEX_ADVISOR_AGENT_CONTRACT_REQUIREMENTS_CHECKLIST.md`

---

## Purpose

Single authoritative source for mandatory agent file content gates.
Loaded and attested in Phase 3 Step 3.1. Checked by QP in Phase 3 Step 3.6.

A gate ID of ✅ means the requirement is satisfied. ❌ means it is a blocker.
QP VERDICT is PASS only when ALL applicable gates are ✅.

---

## S1 — YAML Frontmatter Gates

| Gate ID | Requirement | Enforcement |
|---------|-------------|-------------|
| S1-01 | YAML frontmatter present and parseable (no YAML errors) | BLOCKING |
| S1-02 | `name` and `id` match and equal the agent filename (without `.md`) | BLOCKING |
| S1-03 | `description` is a single functional sentence — no narrative, no lists | BLOCKING |
| S1-04 | `agent.id`, `agent.class`, `agent.version`, `agent.contract_pattern` all present | BLOCKING |
| S1-05 | `agent.contract_pattern: four_phase_canonical` | BLOCKING |
| S1-06 | `governance.protocol: LIVING_AGENT_SYSTEM` | BLOCKING |
| S1-07 | `governance.version: v6.2.0` | BLOCKING |
| S1-08 | `governance.canon_inventory: governance/CANON_INVENTORY.json` | BLOCKING |
| S1-09 | `governance.degraded_on_placeholder_hashes: true` | BLOCKING |
| S1-10 | `governance.canon_home: APGI-cmy/maturion-foreman-governance` | BLOCKING |
| S1-11 | `governance.execution_identity.secret: "MATURION_BOT_TOKEN"` (name only, no value) | BLOCKING |
| S1-12 | `governance.execution_identity.safety.never_push_main: true` | BLOCKING |
| S1-13 | `iaa_oversight.required: true` | BLOCKING |
| S1-14 | `iaa_oversight.trigger: all_agent_contract_creations_or_updates` | BLOCKING |
| S1-15 | `identity` block present with `role`, `mission`, `operating_model`, `class_boundary` | BLOCKING |
| S1-16 | `identity` block positioned AFTER `governance` block, not before | BLOCKING |
| S1-17 | `merge_gate_interface.required_checks` has all 3 required CI check names | BLOCKING |
| S1-18 | `merge_gate_interface.parity_enforcement: BLOCKING` | BLOCKING |
| S1-19 | `scope.repository` set to correct repository for this copy | BLOCKING |
| S1-20 | `scope.approval_required: ALL_ACTIONS` | BLOCKING |
| S1-21 | `escalation.authority: CS2` | BLOCKING |
| S1-22 | `escalation.halt_conditions` entries are structured objects (`id`, `trigger`, `action`) | BLOCKING |
| S1-23 | `prohibitions` entries have `id`, `rule`, `enforcement` | BLOCKING |
| S1-24 | `tier2_knowledge.index` references correct agent workspace path | BLOCKING |
| S1-25 | `metadata.this_copy` is `canonical` (governance repo) or `consumer` (consumer repo) | BLOCKING |
| S1-26 | `metadata.last_updated` is a real date (YYYY-MM-DD) | HIGH |
| S1-27 | YAML field order: `agent` → `governance` → `iaa_oversight` → `identity` → `merge_gate_interface` → `scope` → `capabilities` → `escalation` → `prohibitions` → `tier2_knowledge` → `metadata` | HIGH |

## S2 — Contract Body Structure Gates

| Gate ID | Requirement | Enforcement |
|---------|-------------|-------------|
| S2-01 | AGENT_RUNTIME_DIRECTIVE blockquote present immediately after H1 heading | BLOCKING |
| S2-02 | Four phases present: `## PHASE 1`, `## PHASE 2`, `## PHASE 3`, `## PHASE 4` | BLOCKING |
| S2-03 | Each phase opens with a bold `[CA_H]` or priority tag and execution directive | BLOCKING |
| S2-04 | Every phase step has a declared output block (quoted `>` blockquote) | BLOCKING |
| S2-05 | Output blocks include explicit ⛔ advance-block guard after mandatory declarations | HIGH |
| S2-06 | No hardcoded version strings in phase body text (version read from YAML only) | BLOCKING |
| S2-07 | No Tier 2 content inlined in contract (Tier 2 is referenced by path only) | BLOCKING |
| S2-08 | Character count: ≤ 30,000 characters (count, do not estimate) | BLOCKING |
| S2-09 | No merge conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) | BLOCKING |

## S3 — Phase 1 (Identity & Preflight) Gates

| Gate ID | Requirement | Enforcement |
|---------|-------------|-------------|
| S3-01 | Step 1.1: Agent reads identity from YAML block (not from memory) | BLOCKING |
| S3-02 | Step 1.2: Tier 2 knowledge index loaded and all required_files verified | BLOCKING |
| S3-03 | Step 1.3: `wake-up-protocol.sh` invoked | BLOCKING |
| S3-04 | Step 1.3: CANON_INVENTORY hash check: all non-null, non-placeholder | BLOCKING |
| S3-05 | Step 1.4: Session memory loaded (last 5 sessions) | HIGH |
| S3-06 | Step 1.5: FAIL-ONLY-ONCE breach registry loaded and attested | BLOCKING |
| S3-07 | Step 1.6: Merge gate checks loaded from YAML | BLOCKING |
| S3-08 | Step 1.7: Readiness state declared (STANDBY or BLOCKED) | BLOCKING |

## S4 — Phase 2 (Alignment) Gates

| Gate ID | Requirement | Enforcement |
|---------|-------------|-------------|
| S4-01 | Step 2.1: CS2 authorization verified before any work | BLOCKING |
| S4-02 | Step 2.2: CANON_INVENTORY re-confirmed clean | BLOCKING |
| S4-03 | Step 2.3: Job-specific checklist loaded from `governance/checklists/` | BLOCKING |
| S4-04 | Step 2.4: Self-modification guard run (HALT-003 if target = own contract without CS2) | BLOCKING |
| S4-05 | Step 2.5: Size projection computed (HALT-004 if >30,000 chars) | BLOCKING |
| S4-06 | Step 2.6: Tier 2/3 stubs confirmed present or delegation tracked | HIGH |

## S5 — Phase 3 (Work) Gates

| Gate ID | Requirement | Enforcement |
|---------|-------------|-------------|
| S5-01 | Step 3.1: Non-negotiables checklist loaded and all gates acknowledged | BLOCKING |
| S5-02 | Step 3.2: IAA trigger classification output produced | BLOCKING |
| S5-03 | Step 3.3: Escalation gate cleared (no blockers) before ADVISE | BLOCKING |
| S5-04 | Step 3.4: Agent contract uses `agent-creation-template.md` as structural base | HIGH |
| S5-05 | Step 3.5: Parking station entries made for all in-session improvement suggestions | HIGH |
| S5-06 | Step 3.6: QP interrupt executed — full scorecard output (S1–S6, every gate) | BLOCKING |
| S5-07 | Step 3.6: QP VERDICT is PASS before advancing | BLOCKING |
| S5-08 | Step 3.7: Complete bundle assembled (all 4 artifacts) | BLOCKING |
| S5-09 | Step 3.8: Merge gate parity check passed locally | BLOCKING |

## S6 — Phase 4 (Handover) Gates

| Gate ID | Requirement | Enforcement |
|---------|-------------|-------------|
| S6-01 | Step 4.1: OPOJD gate passed (all 7 sub-checks) | BLOCKING |
| S6-02 | Step 4.2: PREHANDOVER proof file written to memory | BLOCKING |
| S6-03 | Step 4.3: Session memory file written using `session-memory-template.md` | BLOCKING |
| S6-04 | Step 4.3: Suggestions for improvement field is non-blank | BLOCKING |
| S6-05 | Step 4.3: Parking station entries confirmed present | HIGH |
| S6-06 | Step 4.4: IAA invocation attempted (ASSURANCE-TOKEN or PHASE_A_ADVISORY recorded) | BLOCKING |
| S6-07 | Step 4.5: PR description includes all 6 required fields | BLOCKING |
| S6-08 | Step 4.6: Agent enters await state — does not merge | BLOCKING |

---

## QP Scorecard Usage (Phase 3 Step 3.6)

For each gate above (S1–S6), output one row per gate:

```
| [Gate ID] | [Requirement summary] | [✅ PASS / ❌ FAIL] | [Note if FAIL] |
```

Then output:
```
Total gates checked: [N]
Gates passing: [N]
Gates failing: [N] — [list IDs]
QP VERDICT: [PASS / FAIL]
```

If VERDICT is FAIL → fix every failing gate → re-run QP from scratch → only advance on PASS.

---

**Tier-3 Canon Reference**: `governance/checklists/CODEX_ADVISOR_AGENT_CONTRACT_REQUIREMENTS_CHECKLIST.md`  
**Tier-3 Canon Reference**: `governance/canon/AGENT_CONTRACT_ARCHITECTURE.md`  
**Tier-3 Canon Reference**: `governance/canon/AGENT_PREFLIGHT_PATTERN.md`
