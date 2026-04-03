# Governance Scope Declaration

## Metadata
```yaml
---
PR_ID: copilot/update-frs-trs-architecture-templates
DATE_UTC: 2026-04-03T13:14:33Z
AGENT_ID: copilot
RESPONSIBILITY_DOMAIN: Governance Administration
CHANGE_TYPE: governance_template_canon_update
---
```

## Executive Summary
Canon update: FRS/TRS/Architecture templates — traceability to APP_DESCRIPTION_REQUIREMENT_POLICY sections. Creates FRS_TEMPLATE.md and TRS_TEMPLATE.md with mandatory §AD traceability sections; updates minimum-architecture-template.md with §AD-10–§AD-16 and §AD-20–§AD-22 coverage checkboxes (new Section 4.14); updates CHANGELOG.md with the canon change entry. IAA evidence artifacts created retroactively per REJECTION-PACKAGE IAA-20260403-PR1317.

## FILES_CHANGED

- .agent-admin/assurance/correction-addendum-1317-r3-20260403.md
- .agent-admin/assurance/rejection-package-1317-r2.md
- .agent-admin/assurance/rejection-package-1317-r3.md
- .agent-admin/assurance/rejection-package-1317.md
- .agent-admin/evidence/governance-proof-1317.md
- .agent-admin/evidence/preflight-proof-1317.md
- .agent-admin/evidence/working-proof-1317.md
- .agent-admin/prehandover/prehandover_proof_1317_20260403.md
- .agent-admin/waves/wave-frs-trs-ad-traceability-current-tasks.md
- .agent-workspace/governance-repo-administrator/memory/session-copilot-1317-20260403.md
- .agent-workspace/independent-assurance-agent/escalation-inbox/rejection-tracking-1317-r3-20260403.md
- .agent-workspace/independent-assurance-agent/memory/session-022-20260403.md
- .agent-workspace/independent-assurance-agent/memory/session-023-20260403.md
- governance/CHANGELOG.md
- governance/scope-declaration.md
- governance/templates/FRS_TEMPLATE.md
- governance/templates/TRS_TEMPLATE.md
- governance/templates/minimum-architecture-template.md

## Scope Boundaries

### In Scope
- `governance/templates/FRS_TEMPLATE.md` (NEW v1.0): FRS template with mandatory §AD traceability per FR, FR Traceability Table, and FR-to-§AD Coverage Matrix (§AD-01–§AD-24)
- `governance/templates/TRS_TEMPLATE.md` (NEW v1.0): TRS template with dedicated required sections for §AD-03, §AD-10, §AD-11, §AD-12, §AD-15, §AD-17, §AD-20, §AD-22, §AD-24
- `governance/templates/minimum-architecture-template.md` (v1.0 → v1.1): New Section 4.14 with §AD-10–§AD-16 and §AD-20–§AD-22 coverage checkboxes; Section 8 completeness checklist updated
- `governance/CHANGELOG.md`: Canon change entry FRS-TRS-ARCH-TEMPLATE-AD-TRACEABILITY-2026-04-03
- IAA evidence artifacts: wave checklist, preflight/governance/working proofs, PREHANDOVER proof, rejection packages (R1, R2, R3), correction addendum (R3), IAA session memory files (session-022, session-023), escalation inbox entry, and this scope declaration — created retroactively per REJECTION-PACKAGE IAA-20260403-PR1317 remediation and subsequent rounds

### Out of Scope
- No changes to agent contracts (`.github/agents/`)
- No changes to `.github/workflows/`
- No changes to `governance/CANON_INVENTORY.json`
- No application code changes
- No constitutional canon changes

## Constitutional Alignment
- APP_DESCRIPTION_REQUIREMENT_POLICY.md v2.0 — policy authority for §AD-01–§AD-24
- LIVING_AGENT_SYSTEM.md v6.2.0
- IAA_PRE_BRIEF_PROTOCOL.md v1.1.0

## Ripple Requirements
- CHANGELOG.md entry marks `Layer-Down Status: PUBLIC_API — mandatory ripple to all consumer repos with build pipelines`. Standard ripple dispatch workflow will notify consumer repos on merge.

## Scope-to-Diff Attestation

This PR modifies files within the "Governance Administration" responsibility domain. All modified files are within allowed paths:

- `governance/templates/**` (governance template additions and updates)
- `governance/CHANGELOG.md` (canonical change log)
- `.agent-admin/**` (IAA evidence artifacts — wave checklist, proofs, rejection packages)
- `.agent-workspace/**` (IAA session memory artifacts)
- `governance/scope-declaration.md` (this file)

Manual verification: `git diff --name-only origin/main...HEAD` returns exactly 18 files, matching the FILES_CHANGED list above (line count: 18 == 18).

**Attestation**: Verified by copilot  
**Date**: 2026-04-03T13:14:33Z  
**Exit Code**: 0

---

**Timestamp**: 2026-04-03T13:14:33Z  
**Agent**: copilot (GitHub Copilot Coding Agent)
