# IAA Trigger Table — Tier-2 Operational Knowledge
**Agent**: independent-assurance-agent  
**Version**: 1.0.0  
**Authority**: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.0.0 | LIVING_AGENT_SYSTEM.md v6.2.0  
**Seeded**: 2026-03-02  
**Purpose**: Operational trigger table for IAA assurance sessions. Load this at session start alongside the core invariants checklist. This file is the canonical operational form of the trigger table defined in `governance/canon/INDEPENDENT_ASSURANCE_AGENT_CANON.md §Trigger Table`.

---

## How to Use This Table

At every assurance invocation (Phase 2, Step 2.3):
1. Load this table as Tier-2 knowledge (do NOT rely solely on memory)
2. Classify the incoming PR by matching its characteristics against the trigger conditions
3. Determine: IAA Required (YES/NO) and which overlays (A–G) apply
4. Record your classification in the session artifact
5. Apply **Ambiguity Rule** (A-003): if category is unclear, default is MANDATORY INVOCATION

---

## Trigger Table

| PR Category | IAA Required | Trigger Condition | Applicable Overlays |
|-------------|-------------|-------------------|---------------------|
| AAWP_MAT | YES | PR labelled `aawp-deliverable` or `mat-deliverable`, or files match AAWP/MAT path patterns | C, F |
| AGENT_CONTRACT | YES | Changes to `.github/agents/` or any `*-agent-contract.md` file | B, G, F |
| CANON_GOVERNANCE | YES | Changes to `governance/canon/` or `governance/CANON_INVENTORY.json` | A, F |
| AGENT_INTEGRITY | YES | Changes to `governance/quality/agent-integrity/` | B, G, F |
| CI_WORKFLOW | YES | Changes to `.github/workflows/` or `.github/scripts/` | D, F |
| ARCHITECTURE | YES | Changes to files matching `*ARCHITECTURE*.md` or `*STRATEGY*.md` in governance | A, F |
| DOCS_ONLY | NO | Only `*.md` files outside `governance/canon/`; no agent, workflow, or canon changes | E (if triggered) |
| PARKING_STATION | NO | PR labelled `parking-station` | — |
| ADMIN | NO | PR labelled `admin` or `housekeeping` | — |

---

## Ambiguity Resolution (A-003)

When the PR category cannot be unambiguously determined from the table above:

1. **Mixed PRs**: If a PR touches files from multiple categories, apply IAA for ALL triggering categories found. Use ALL applicable overlays.
2. **Unclear category**: Default to MANDATORY INVOCATION. Record the ambiguity in session memory.
3. **Self-assessed NOT_REQUIRED**: The producing agent may NOT self-assess IAA as NOT_REQUIRED for AGENT_CONTRACT, CANON_GOVERNANCE, CI_WORKFLOW, or AGENT_INTEGRITY categories. Only the IAA may determine EXEMPT. See A-018.
4. **Missing trigger table**: If this file is missing, apply A-003 directly — MANDATORY INVOCATION until table is restored.

---

## Category Definitions

| Category | Defining Characteristics |
|----------|--------------------------|
| AAWP_MAT | Labelled `aawp-deliverable` or `mat-deliverable`; AAWP/MAT path files |
| AGENT_CONTRACT | Any file under `.github/agents/` or `governance/contracts/` |
| CANON_GOVERNANCE | Any file under `governance/canon/`; `governance/CANON_INVENTORY.json` |
| AGENT_INTEGRITY | Any file under `governance/quality/agent-integrity/` |
| CI_WORKFLOW | Any file under `.github/workflows/` or `.github/scripts/` |
| ARCHITECTURE | Files matching `*ARCHITECTURE*.md`, `*STRATEGY*.md` in governance paths |
| DOCS_ONLY | Only `*.md` outside triggering paths; no code, workflow, or agent changes |
| PARKING_STATION | Labelled `parking-station` exclusively |
| ADMIN | Labelled `admin` or `housekeeping` exclusively |

---

## FAIL-ONLY-ONCE Rules for Trigger Evaluation

| Rule | Summary |
|------|---------|
| A-002 | IAA is mandatory for ALL agent contract classes — no class-based exceptions |
| A-003 | Ambiguity resolves to mandatory invocation |
| A-018 | Trigger table misapplication (self-assessed NOT_REQUIRED for triggering category) = IAA bypass |

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-03-02 | Initial creation — extracted from IAA Canon trigger table for Tier-2 operational use. Added mixed-PR handling, ambiguity resolution, FAIL-ONLY-ONCE cross-references, and overlay mapping. Issue: APGI-cmy/maturion-foreman-governance#1257 (GOV-IAA upgrade to v2.0.0). |

---

*Authority: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.0.0 | LIVING_AGENT_SYSTEM.md v6.2.0 | CS2 (Johan Ras)*
