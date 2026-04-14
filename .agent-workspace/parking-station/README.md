# Parking Station — Suggestions Log Convention

> ⚠️ **PATH CHANGE NOTICE (2026-04-13)**: The canonical per-agent parking station path has changed.
> Per-agent suggestion logs in this shared directory are **deprecated**.
> The canonical path is now: `.agent-workspace/<agent-name>/parking-station/suggestions-log.md`
> See `governance/canon/PARKING_STATION_PATH_STANDARD.md` v1.0.0 for the authoritative specification.

This directory previously contained per-agent suggestion log files. Those files are now
deprecated historical archives. All new suggestions MUST be written to each agent's own
workspace parking station at the canonical path above.

---

## Current Canonical Paths

| Agent ID | Canonical Suggestions Log Path |
|----------|-------------------------------|
| `governance-repo-administrator` | `.agent-workspace/governance-repo-administrator/parking-station/suggestions-log.md` |
| `CodexAdvisor-agent` | `.agent-workspace/CodexAdvisor-agent/parking-station/suggestions-log.md` |
| `foreman-v2` | `.agent-workspace/foreman-v2/parking-station/suggestions-log.md` |
| `independent-assurance-agent` | `.agent-workspace/independent-assurance-agent/parking-station/suggestions-log.md` |

---

## Deprecated Files in This Directory

| File | Status |
|------|--------|
| `suggestions-log.md` | RETIRED — read-only archive since 2026-02-27 |
| `suggestions-log-governance-repo-administrator.md` | DEPRECATED — migrated to canonical path |
| `suggestions-log-codex-advisor.md` | DEPRECATED — migrated to canonical path |
| `suggestions-log-foreman-v2.md` | DEPRECATED — migrated to canonical path |
| `suggestions-log-independent-assurance-agent.md` | DEPRECATED — migrated to canonical path |

---

## Aggregate View

To produce a combined view of all suggestions across all agents:

```bash
find .agent-workspace/*/parking-station -name "suggestions-log.md" -exec cat {} +
```

---

## Migration History

- **2026-02-27**: Original shared `suggestions-log.md` deprecated; per-agent files created in this directory.
- **2026-04-13**: Per-agent files in this directory deprecated; canonical path moved to `.agent-workspace/<agent-name>/parking-station/suggestions-log.md` per `PARKING_STATION_PATH_STANDARD.md` v1.0.0.

---

**Convention Version**: 2.0.0  
**Effective**: 2026-04-13  
**Authority**: CS2 (Johan Ras) | Living Agent System v6.2.0
