# Governance Scope Declaration

## Metadata
```yaml
---
PR_ID: "copilot/standardize-per-agent-parking-paths"
DATE_UTC: 2026-04-13T07:08:00Z
AGENT_ID: governance-repo-administrator
RESPONSIBILITY_DOMAIN: Governance Canon Administration
CHANGE_TYPE: non_breaking_enhancement
---
```

## Executive Summary
New canon `PARKING_STATION_PATH_STANDARD.md` v1.0.0 canonicalises the per-agent parking station path as `.agent-workspace/<agent-name>/parking-station/suggestions-log.md`. Deprecates the interim per-agent files in the shared `.agent-workspace/parking-station/` directory. Migrates all existing suggestion entries to canonical paths. Updates architecture docs, handover automation, contract architecture, CANON_INVENTORY, and GOVERNANCE_CANON_MANIFEST. Includes migration plan and layer-down instructions for consumer repos.

## FILES_CHANGED

- .agent-admin/assurance/assurance-token-PRPARKING.md
- .agent-admin/prehandover/proof-parking-station-path-standard-20260413.md
- .agent-workspace/CodexAdvisor-agent/knowledge/session-memory-template.md
- .agent-workspace/CodexAdvisor-agent/parking-station/suggestions-log.md
- .agent-workspace/foreman-v2/parking-station/suggestions-log.md
- .agent-workspace/governance-repo-administrator/memory/session-GA-parking-std-20260413.md
- .agent-workspace/governance-repo-administrator/parking-station/suggestions-log.md
- .agent-workspace/independent-assurance-agent/knowledge/session-memory-template.md
- .agent-workspace/independent-assurance-agent/parking-station/suggestions-log.md
- .agent-workspace/parking-station/README.md
- .agent-workspace/parking-station/suggestions-log-codex-advisor.md
- .agent-workspace/parking-station/suggestions-log-foreman-v2.md
- .agent-workspace/parking-station/suggestions-log-governance-repo-administrator.md
- .agent-workspace/parking-station/suggestions-log-independent-assurance-agent.md
- docs/architecture/per-agent-logging.md
- governance/CANON_INVENTORY.json
- governance/CHANGELOG.md
- governance/canon/AGENT_CONTRACT_ARCHITECTURE.md
- governance/canon/AGENT_HANDOVER_AUTOMATION.md
- governance/canon/GOVERNANCE_CANON_MANIFEST.md
- governance/canon/PARKING_STATION_PATH_STANDARD.md
- governance/scope-declaration.md

## FILES_CHANGED_COUNT
22
