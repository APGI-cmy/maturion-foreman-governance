# IAA Knowledge Index
**Agent**: independent-assurance-agent  
**Version**: 1.4.3
**Updated**: 2026-09-03

## Tier 1 — Constitutional Knowledge (load and verify SHA256)
- `governance/canon/INDEPENDENT_ASSURANCE_AGENT_CANON.md` — Primary IAA canon
- `governance/canon/LIVING_AGENT_SYSTEM.md` — Living Agent framework
- `governance/canon/THREE_TIER_AGENT_KNOWLEDGE_ARCHITECTURE.md` — Knowledge architecture
- `governance/CANON_INVENTORY.json` — Canon hash registry
- `governance/GATE_REQUIREMENTS_INDEX.json` — Gate requirements
- `governance/quality/agent-integrity/INTEGRITY_INDEX.md` — Agent integrity baseline

## Tier 2 — Operational Knowledge (this directory)
- `iaa-core-invariants-checklist.md` v1.4.0 — Core invariant checklist (all phases, INV-001–INV-803)
- `iaa-category-overlays.md` v2.2.0 — Delivery-type overlays (A–G)
- `iaa-trigger-table.md` v2.2.0 — Operational trigger table (PR category → IAA required, overlays)
- `FAIL-ONLY-ONCE.md` v1.4.0 — Breach prevention registry (read at every session start)
- `IAA_ZERO_SEVERITY_TOLERANCE.md` v1.0.0 — Zero-Severity-Tolerance policy (any finding triggers REJECTION-PACKAGE; prohibited language table; machine-readable logic)
- `IAA_AGENT_CONTRACT_AUDIT_STANDARD.md` v1.0.0 — Mandatory AGENT_CONTRACT audit framework; load at Step 2.4 for AGENT_CONTRACT invocations.
- `FUNCTIONAL-BEHAVIOUR-REGISTRY.md` v1.2.0 — Mandatory BUILD/AAWP_MAT anti-regression registry; load at Step 3.1 under FAIL-ONLY-ONCE A-034.
- `iaa-high-frequency-checks.md` v2.1.0 — Mandatory Tier 2B CI enforcement specification; load during IAA preflight.

## Restored Source Provenance

The two files above are exact content restorations from
`APGI-cmy/maturion-isms` commit `13c41f2545ceb0a0cd5507ebf4224f26e6d0ff43`:

- `IAA_AGENT_CONTRACT_AUDIT_STANDARD.md`: source blob `ec5ad88fc3ba4dbd13d6236390d8d27318be92be`
- `FUNCTIONAL-BEHAVIOUR-REGISTRY.md`: source blob `7e1ad946f848d47e958174bc7dc626128c6f1894`
- `IAA_AGENT_CONTRACT_AUDIT_STANDARD.md`: local SHA256 `116f242c4e80fa6fbd7f23991d629e23f1bc89dea1795dd7342235d364e03051`
- `FUNCTIONAL-BEHAVIOUR-REGISTRY.md`: local SHA256 `54f04b5296d980913dff21b9883639cf3987dadfb366534e31d0c05bfaed833c`

The following Tier 2B prerequisite is an exact content restoration from
`APGI-cmy/maturion-isms` branch `main`:

- `iaa-high-frequency-checks.md`: source blob `52d9566e9d956f5cf1c044971640603e3fdb182a`

## Tier 3 — Session Knowledge (ephemeral)
- PR context, delegation package, repository state for the specific assurance session

## Session Memory
- `../memory/session-memory-template.md` — Template for all IAA session memories
- `../memory/` — Active session memories (≤5, rotate to `.archive/`)

## Escalation Inbox
- `../escalation-inbox/` — Active escalations to CS2
- `../escalation-inbox/resolved/` — Resolved escalations

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.4.3 | 2026-09-03 | Restored the IAA-required Tier 2B high-frequency checks from the authoritative ISMS source after IAA-T2-PREREQ-001. |
| 1.4.2 | 2026-09-02 | Restored the two Tier 2A prerequisites required by the active IAA v6.2.0 / contract v2.10.0 preflight from their authoritative ISMS source. |
