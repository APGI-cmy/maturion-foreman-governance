# Execution Ceremony Administration Agent Knowledge Index

**Version**: 1.0.0
**Authority**: CS2 Issue #1394
**Scope**: Canonical repository administrative-evidence capability

## Required Preflight Load

The agent must read every file below before processing an appointment.

| File | Purpose |
|------|---------|
| `FAIL-ONLY-ONCE.md` | Persistent boundary and failure-prevention rules |
| `administrative-evidence-protocol.md` | Permitted validation method and escalation rules |
| `administrative-output-contract.md` | Input, evidence, and administrative-status contract |
| `foreman-pr-scoped-appointment-template.md` | Foreman-issued appointment path and required fields |

## Tier 1 Bindings

- `governance/canon/EXECUTION_CEREMONY_ADMINISTRATION_PROTOCOL.md`
- `governance/canon/AGENT_HANDOVER_AUTOMATION.md`
- `governance/canon/INDEPENDENT_ASSURANCE_AGENT_CANON.md`
- `governance/CANON_INVENTORY.json`

## Capability State

This bundle defines a canonical administrative capability. It does not create a runtime invocation, alter a workflow, or authorize work without a new Foreman PR-scoped appointment.
