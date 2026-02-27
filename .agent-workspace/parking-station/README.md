# Parking Station — Suggestions Log Convention

This directory contains agent suggestion logs for governance promotion.
Entries are reviewed periodically by CS2.

---

## File Naming Convention

Each agent owns **one dedicated suggestions log file**. The naming pattern is:

```
suggestions-log-{agent-id}.md
```

| Agent ID | Suggestions Log File |
|----------|----------------------|
| `governance-repo-administrator` | `suggestions-log-governance-repo-administrator.md` |
| `CodexAdvisor-agent` | `suggestions-log-codex-advisor.md` *(agent ID uses CamelCase; filename uses lowercase kebab-case `codex-advisor`)* |
| `foreman-v2` | `suggestions-log-foreman-v2.md` |
| `independent-assurance-agent` | `suggestions-log-independent-assurance-agent.md` |

> **Naming rule**: Agent IDs are converted to all-lowercase kebab-case in filenames (e.g. `CodexAdvisor-agent` → `codex-advisor`). All other agent IDs are already kebab-case and map directly.

When a **new agent** is added to the system, create its dedicated suggestions log at the same time as the agent contract (`.github/agents/<agent-id>.md`). Pre-populate it with the standard header only.

---

## Why Per-Agent Files?

Previously all agents appended to a single shared `suggestions-log.md`. When multiple agents worked in parallel on different branches, each append produced a git merge conflict requiring manual resolution.

Per-agent files eliminate this entirely: no two agents ever write to the same file, so parallel agent activity can never produce a conflict in the suggestions log.

---

## Writing to Your Log

Each agent MUST append only to **its own** file. Never write to another agent's log.

**Row format** (append one row per suggestion):
```
| YYYY-MM-DD | {agent-id} | session-NNN | [PHASE] | <summary> | <evidence-file> |
```

- **PHASE** (optional): `DRAFT-PHASE`, `SESSION-END`, or another meaningful label
- **summary**: Plain-language description of the suggestion (1-2 sentences)
- **evidence-file**: Session memory filename that contains the full suggestion detail

---

## Aggregate View

To produce a combined view of all suggestions (e.g., for CS2 review), concatenate the per-agent files:

```bash
cat .agent-workspace/parking-station/suggestions-log-*.md
```

Or use any standard markdown viewer that can merge multiple files.

The old shared `suggestions-log.md` is **deprecated** (see that file for the migration notice).
All new entries MUST go into the per-agent files.

---

**Convention Version**: 1.0.0  
**Effective**: 2026-02-27  
**Authority**: Living Agent System v6.2.0
