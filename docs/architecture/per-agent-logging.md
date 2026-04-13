# Per-Agent Logging Architecture

**Status**: Active  
**Version**: 2.0.0  
**Effective**: 2026-04-13  
**Authority**: CS2 (Johan Ras) | Living Agent System v6.2.0

---

## Problem Solved

Multiple governance agents (foreman, CodexAdvisor, governance-repo-administrator, independent-assurance-agent, etc.) previously wrote append-only suggestion entries into a **single shared file**:

```
.agent-workspace/parking-station/suggestions-log.md   ← RETIRED (2026-02-27)
```

When agents ran concurrently on separate branches, each agent appended to the same file on its branch, producing merge conflicts in every PR where more than one agent was active. These conflicts had to be resolved manually ("accept both changes"), introducing governance latency, risk of log-entry loss, and friction in every agent-coordinated build cycle.

An interim solution (v1.0.0, 2026-02-27) placed per-agent files in the shared directory:

```
.agent-workspace/parking-station/suggestions-log-{agent-id}.md   ← DEPRECATED (2026-04-13)
```

This was effective but inconsistent with the workspace structure where each agent already owns `.agent-workspace/<agent-name>/`.

---

## Solution: Per-Agent Workspace Parking Station (v2.0.0)

Each agent now owns a **dedicated suggestions log file within its own workspace directory**:

```
.agent-workspace/<agent-name>/parking-station/suggestions-log.md
```

### Canonical Path Standard

The authoritative specification is: `governance/canon/PARKING_STATION_PATH_STANDARD.md` v1.0.0.

### Current Agent Files

| Agent ID | Suggestions Log |
|----------|----------------|
| `governance-repo-administrator` | `.agent-workspace/governance-repo-administrator/parking-station/suggestions-log.md` |
| `CodexAdvisor-agent` | `.agent-workspace/CodexAdvisor-agent/parking-station/suggestions-log.md` |
| `foreman-v2` | `.agent-workspace/foreman-v2/parking-station/suggestions-log.md` |
| `independent-assurance-agent` | `.agent-workspace/independent-assurance-agent/parking-station/suggestions-log.md` |

When a **new agent** is introduced, its parking station directory and `suggestions-log.md` MUST be created alongside its agent contract file in `.github/agents/`.

---

## Aggregate / Global View

To view all suggestions across all agents:

```bash
find .agent-workspace/*/parking-station -name "suggestions-log.md" -exec cat {} +
```

No periodic merge job is needed because the per-agent files are the source of truth. CS2 review reads all files directly.

---

## Row Format

Each suggestion log entry is a Markdown table row:

```
| YYYY-MM-DD | {agent-id} | session-NNN | [PHASE] | <summary> | <evidence-file> |
```

- **PHASE**: The column is **required in every table header** but its value is optional. When no phase applies, leave the cell blank (`|  |`). Typical values: `DRAFT-PHASE`, `SESSION-END`.
- **summary**: Plain-language description of the suggestion (1-2 sentences)
- **evidence-file**: Session memory filename containing the full suggestion detail

All per-agent log files MUST use exactly these six columns in this order for clean aggregate views.

---

## Agent Contract References

Each agent contract should reference only its own suggestions log at the canonical path:

- `CodexAdvisor-agent.md` → references `.agent-workspace/CodexAdvisor-agent/parking-station/suggestions-log.md`
- `governance-repo-administrator-v2.agent.md` → §4.2a currently references the deprecated `.agent-workspace/parking-station/suggestions-log-governance-repo-administrator.md`; requires follow-up update to canonical path (agent contract changes require CodexAdvisor per Rule B-06)
- Future agent contracts follow the same pattern

> **Follow-up required**: Agent contracts that still reference deprecated parking station paths must be updated by CodexAdvisor in a separate PR per FAIL-ONLY-ONCE Rule B-06.

---

## Migration History

### Phase 1 (2026-02-27): Shared → Per-Agent in Shared Directory

The original shared file was retired and replaced with per-agent files:

```
.agent-workspace/parking-station/suggestions-log.md            ← RETIRED archive
.agent-workspace/parking-station/suggestions-log-{agent-id}.md ← per-agent files
```

### Phase 2 (2026-04-13): Per-Agent Files → Agent Workspace Paths

Per-agent files migrated from the shared directory to each agent's workspace:

```
.agent-workspace/parking-station/suggestions-log-{agent-id}.md ← DEPRECATED
.agent-workspace/<agent-name>/parking-station/suggestions-log.md ← CANONICAL
```

All historical entries have been migrated. The deprecated files in `.agent-workspace/parking-station/` contain migration notices and must not receive new entries.

---

## Conflict Prevention Guarantee

Under this scheme:

- Each agent writes **only** to files within its own `.agent-workspace/<agent-name>/` directory
- No two agents share a suggestions log file
- Git merges of parallel agent branches will never conflict on log files
- No manual merge resolution is ever required for suggestion log entries

---

## Governance Audit

The per-agent file structure preserves full traceability:

- **Agent identity**: encoded in directory path and every table row
- **Session reference**: every row references its session memory file
- **Date**: ISO 8601 date on every row
- **Evidence**: direct link to the session artifact containing full detail

This structure satisfies the evidence and audit requirements of `EVIDENCE_ARTIFACT_BUNDLE_STANDARD.md` and `MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md`.

---

**See also**: `governance/canon/PARKING_STATION_PATH_STANDARD.md` — canonical specification  
**See also**: `.agent-workspace/parking-station/README.md` — migration notice and deprecated file index
