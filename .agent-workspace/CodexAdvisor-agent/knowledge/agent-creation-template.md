# Agent Creation Template — CodexAdvisor

**Version**: 1.0.0  
**Created**: 2026-02-26  
**Authority**: CS2 (Johan Ras)  
**Canonical Sources**: `governance/canon/AGENT_CONTRACT_ARCHITECTURE.md`, `governance/canon/AGENT_CREATION_BUNDLE_REQUIREMENTS.md`

---

## Purpose

Structural base template for all agent contracts created or updated by CodexAdvisor.
Used in Phase 3 Step 3.4 (ADVISE: Draft the agent contract).

---

## RAEC Model Reference

**Operating Model**: RAEC — Review, Advise, Escalate, Coordinate

| Phase | Action | Gate |
|-------|--------|------|
| REVIEW | Verify CANON_INVENTORY alignment via hash-compare | CS2 authorization confirmed |
| ADVISE | Evidence-first draft using this template | Non-negotiables checklist: all gates ✅ |
| ESCALATE | Structured escalation docs for blockers | All HALT conditions checked |
| COORDINATE | Deliver via PR with complete bundle | QP PASS + merge gate parity PASS |

---

## YAML Frontmatter Structure (Mandatory Order)

```yaml
---
name: <agent-id>
id: <agent-id>
description: "<single functional sentence — no narrative>"

agent:
  id: <agent-id>
  class: <overseer|foreman|builder|orchestrator|specialist>
  version: <semver>
  contract_version: <semver>
  contract_pattern: four_phase_canonical
  model: <model-name>

governance:
  protocol: LIVING_AGENT_SYSTEM
  version: v6.2.0
  canon_inventory: governance/CANON_INVENTORY.json
  degraded_on_placeholder_hashes: true
  canon_home: APGI-cmy/maturion-foreman-governance
  this_copy: <canonical|consumer>
  execution_identity:
    name: "Maturion Bot"
    secret: "MATURION_BOT_TOKEN"
    safety:
      never_push_main: true
      write_via_pr_by_default: true

iaa_oversight:
  required: true
  trigger: all_agent_contract_creations_or_updates
  mandatory_artifacts: [prehandover_proof, session_memory, agent_contract_bundle]
  invocation_step: "Phase 4 Step 4.4 — IAA Independent Audit"
  verdict_handling:
    pass: record_audit_token_and_proceed_to_pr_open
    stop_and_fix: halt_handover_return_to_phase3_step3_6
    escalate: route_to_cs2_do_not_open_pr
  advisory_phase: PHASE_A_ADVISORY
  policy_ref: AGCFPP-001

identity:
  role: <role title>
  mission: >
    <mission statement>
  operating_model: <RAEC|PACER|other>
  class_boundary: >
    <boundary statement>
  self_modification: CS2_GATED
  lock_id: SELF-MOD-001
  authority: CS2_ONLY

merge_gate_interface:
  required_checks:
    - "Merge Gate Interface / merge-gate/verdict"
    - "Merge Gate Interface / governance/alignment"
    - "Merge Gate Interface / stop-and-fix/enforcement"
  parity_required: true
  parity_enforcement: BLOCKING

scope:
  repository: APGI-cmy/maturion-foreman-governance
  agent_files_location: ".github/agents"
  write_paths: [<list>]
  protected_paths: [<list>]
  approval_required: ALL_ACTIONS

capabilities: {}

escalation:
  authority: CS2
  halt_conditions:
    - id: HALT-001
      trigger: missing_cs2_authorization
      action: "Output HALT message. Enter STANDBY. Do not proceed."
  escalate_conditions: []

prohibitions:
  - id: SELF-MOD-001
    rule: "..."
    enforcement: CS2_GATED

tier2_knowledge:
  index: .agent-workspace/<agent-id>/knowledge/index.md
  required_files: []

metadata:
  canonical_home: APGI-cmy/maturion-foreman-governance
  this_copy: <canonical|consumer>
  authority: CS2
  last_updated: YYYY-MM-DD
  tier2_knowledge: .agent-workspace/<agent-id>/knowledge/index.md
---
```

## Mandatory Structural Rules (enforced by QP, Step 3.6)

1. YAML frontmatter order: `agent` → `governance` → `iaa_oversight` → `identity` → `merge_gate_interface` → `scope` → `capabilities` → `escalation` → `prohibitions` → `tier2_knowledge` → `metadata`
2. `description` field: single functional sentence only. No narrative.
3. `identity` block: positioned after `governance`, not before it
4. `escalation.halt_conditions`: structured objects with `id`, `trigger`, `action` — not flat strings
5. Contract body is an executable prompt system, not human documentation
6. Tier 1 only: personality, phase scripts, and references to Tier 2 paths
7. Tier 2 content belongs in `.agent-workspace/` — never inline in the contract
8. Every phase must force declared evidence output before the agent may advance
9. Prohibitions must have `id`, `rule` (specific, not vague), `enforcement` type
10. Agent must identify itself, its limits, and its exact job from Phase 1 alone
11. No hardcoded version strings in phase body text — agent reads from YAML
12. Size target: under 25,000 characters. Hard limit: 30,000.

## Contract Body Template (Four-Phase Canonical)

```markdown
## PHASE 1 — IDENTITY & PREFLIGHT
[Steps 1.1–1.N: identity declaration, tier2 load, governance load, session memory, breach registry, merge gates]

## PHASE 2 — ALIGNMENT
[Steps 2.1–2.N: CS2 authorization, canon health, job checklist, self-mod guard, size projection, tier2 stubs]

## PHASE 3 — WORK
[Steps 3.1–3.N: non-negotiables load, IAA classification, escalation gate, draft, parking station, QP, bundle assembly, merge gate parity]

## PHASE 4 — HANDOVER
[Steps 4.1–4.N: OPOJD gate, PREHANDOVER proof, session memory, IAA invocation, PR open, await state]
```

---

**Tier-3 Canon Reference**: `governance/canon/AGENT_CONTRACT_ARCHITECTURE.md`  
**Tier-3 Canon Reference**: `governance/canon/AGENT_CREATION_BUNDLE_REQUIREMENTS.md`  
**Tier-3 Canon Reference**: `governance/canon/AGENT_HANDOVER_AUTOMATION.md`
