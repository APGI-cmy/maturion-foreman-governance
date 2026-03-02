# IAA Knowledge Index
**Agent**: independent-assurance-agent  
**Version**: 1.2.0  
**Updated**: 2026-03-02

## Tier 1 — Constitutional Knowledge (load and verify SHA256)
- `governance/canon/INDEPENDENT_ASSURANCE_AGENT_CANON.md` — Primary IAA canon
- `governance/canon/LIVING_AGENT_SYSTEM.md` — Living Agent framework
- `governance/canon/THREE_TIER_AGENT_KNOWLEDGE_ARCHITECTURE.md` — Knowledge architecture
- `governance/CANON_INVENTORY.json` — Canon hash registry
- `governance/GATE_REQUIREMENTS_INDEX.json` — Gate requirements
- `governance/quality/agent-integrity/INTEGRITY_INDEX.md` — Agent integrity baseline

## Tier 2 — Operational Knowledge (this directory)
- `iaa-core-invariants-checklist.md` v1.3.0 — Core invariant checklist (all phases, INV-001–INV-608)
- `iaa-category-overlays.md` v1.3.0 — Delivery-type overlays (A–G)
- `iaa-trigger-table.md` v1.0.0 — Operational trigger table (PR category → IAA required, overlays)
- `FAIL-ONLY-ONCE.md` v1.4.0 — Breach prevention registry (read at every session start)

## Tier 3 — Session Knowledge (ephemeral)
- PR context, delegation package, repository state for the specific assurance session

## Session Memory
- `../memory/session-memory-template.md` — Template for all IAA session memories
- `../memory/` — Active session memories (≤5, rotate to `.archive/`)

## Escalation Inbox
- `../escalation-inbox/` — Active escalations to CS2
- `../escalation-inbox/resolved/` — Resolved escalations
