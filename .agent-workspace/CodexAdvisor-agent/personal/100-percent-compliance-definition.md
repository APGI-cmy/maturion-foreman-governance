# 100% Compliance Definition — Phase 1 Orchestrator/Specialist Architecture Governance

**Created**: 2026-02-20  
**Session**: CodexAdvisor session-006-20260220  
**Authority**: CS2 (Johan Ras)  
**Purpose**: Define what "100% compliance" means for Phase 1 governance work so future PRs can prove compliance unambiguously.

---

## Required Artifact Set

A Phase 1 governance PR is 100% complete only when ALL of the following artifacts exist, pass validation, and are correctly cross-referenced:

### Canon Files (must be in `governance/canon/`)
1. `ORCHESTRATOR_SPECIALIST_ARCHITECTURE.md` — role definitions, authority model, Registry Decision section
2. `AGENT_DELEGATION_PROTOCOL.md` — delegation mechanics, package structure, audit trail
3. `SPECIALIST_KNOWLEDGE_MANAGEMENT.md` — three-tier knowledge model, staleness detection
4. `MULTI_EMBODIMENT_ORCHESTRATION_MODEL.md` — parallel execution, embodiment identity, depth limits
5. `AGENT_REGISTRY_ARCHITECTURE.md` — dedicated registry schema, lifecycle, separation of concerns

### Registry Files
6. `governance/AGENT_REGISTRY.json` — operational agent registry (separate from CANON_INVENTORY)

### Updated Canon
7. `governance/canon/AGENT_CONTRACT_ARCHITECTURE.md` updated to include `orchestrator` and `specialist` agent classes

### Checklists (must be in `governance/checklists/`)
8. `ORCHESTRATOR_AGENT_CONTRACT_REQUIREMENTS_CHECKLIST.md`
9. `SPECIALIST_AGENT_CONTRACT_REQUIREMENTS_CHECKLIST.md`

### Templates (must be in `governance/templates/`)
10. `ORCHESTRATOR_AGENT_TEMPLATE.md`
11. `SPECIALIST_AGENT_TEMPLATE.md`
12. `DELEGATION_PROTOCOL_IMPLEMENTATION_GUIDE.md`

### CodexAdvisor Update
13. `.github/agents/CodexAdvisor-agent.md` updated with `orchestrator` and `specialist` class support

---

## Required Evidence Fields (PREHANDOVER PROOF)

Each Phase 1 PR MUST include a `PREHANDOVER_PROOF` section in the PR description containing:

### 1. CANON_INVENTORY Evidence
- List of ALL added/changed inventory entries
- SHA256 values confirmed present for ALL PUBLIC_API canon artifacts
- `total_canons` count before and after

### 2. Acceptance Reconciliation
- Statement of which option was chosen for any count mismatches (e.g., "5 new vs 4+1")
- Registry ambiguity resolved: explicit statement of where registry lives and what it contains

### 3. Size Compliance Evidence
- Measured character count for `.github/agents/CodexAdvisor-agent.md`
- Explicit statement: `< 30,000 chars` OR canonical deferral with issue number and ETA

### 4. Checklist Completion
- 100% tick confirmation for all new checklists introduced
- Link to checklist files

---

## Validation Invariants (must all be TRUE before merge)

### Invariant 1: No Placeholder Hashes
- All PUBLIC_API entries in CANON_INVENTORY.json MUST have `file_hash_sha256` of exactly 64 hex chars
- Zero entries with `placeholder`, `TBD`, or truncated hashes

### Invariant 2: No Ambiguous Registry References
- No canon file may say "register in CANON_INVENTORY" for agent operational state
- Agent operational registration: `governance/AGENT_REGISTRY.json`
- Artifact tracking: `governance/CANON_INVENTORY.json`
- These are separate concerns; never conflate them

### Invariant 3: Agent Contract Size
- ALL agent contracts in `.github/agents/` MUST be < 30,000 characters
- Measured with: `wc -m < .github/agents/<name>.agent.md`
- No exceptions without CS2-approved canonical deferral

### Invariant 4: Cross-Reference Consistency
- If a canon file introduces a new concept (e.g., registry), ALL related files MUST be updated consistently
- Templates, checklists, and other canon files MUST NOT reference the old concept after an update

### Invariant 5: No Secret Values in Templates
- Template YAML frontmatter MUST NOT contain hardcoded token names like `"MATURION_BOT_TOKEN"`
- Use `"<secret-name>"` or `"$SECRET_ENV_VAR"` style placeholders only

### Invariant 6: JSON Validity
- `CANON_INVENTORY.json` and `AGENT_REGISTRY.json` MUST be valid JSON (parseable with `python3 -c "import json; json.load(open(f))"`)

---

## What Constitutes "Partial" Compliance (must block merge)

| State | Compliance Level | Merge Decision |
|-------|-----------------|----------------|
| All invariants pass, all artifacts present | 100% ✅ | MERGE |
| Any PUBLIC_API entry has placeholder hash | DEGRADED ❌ | BLOCK |
| Agent contract > 30K chars | NON-COMPLIANT ❌ | BLOCK |
| Any invariant 1-6 fails | NON-COMPLIANT ❌ | BLOCK |
| Registry ambiguity unresolved | PARTIAL ❌ | BLOCK |
| Missing PREHANDOVER PROOF | UNVERIFIABLE ❌ | BLOCK |
| Checklist compliance < 100% | PARTIAL ❌ | BLOCK |

**There is no safe partial compliance. Any failing invariant is a merge blocker.**

---

## How Future PRs Prove Compliance

1. **Create PREHANDOVER_PROOF section** in PR description before opening PR for review
2. **Run pre-handover check script** (or manually verify all invariants above)
3. **Confirm no secret scan targets**: grep template files for hardcoded token names
4. **Measure file sizes**: `wc -m .github/agents/*.agent.md` — all must be < 30,000
5. **Validate JSON**: `python3 -c "import json; json.load(open('governance/CANON_INVENTORY.json'))"` and same for AGENT_REGISTRY.json
6. **Check cross-references**: after any registry/architecture change, search all related files for stale references

---

**Version**: 1.0.0  
**Authority**: CS2 (Johan Ras)  
**Last Updated**: 2026-02-20  
**Living Agent System**: v6.2.0
