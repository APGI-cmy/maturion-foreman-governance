# Per-Agent Logging Architecture

**Status**: Active  
**Version**: 1.0.0  
**Effective**: 2026-02-27  
**Authority**: Living Agent System v6.2.0

---

## Problem Solved

Multiple governance agents (foreman, CodexAdvisor, governance-repo-administrator, independent-assurance-agent, etc.) previously wrote append-only suggestion entries into a **single shared file**:

```
.agent-workspace/parking-station/suggestions-log.md   ← DEPRECATED
```

When agents ran concurrently on separate branches, each agent appended to the same file on its branch, producing merge conflicts in every PR where more than one agent was active. These conflicts had to be resolved manually ("accept both changes"), introducing governance latency, risk of log-entry loss, and friction in every agent-coordinated build cycle.

---

## Solution: Per-Agent Scoped Log Files

Each agent now owns a **dedicated suggestions log file** that no other agent ever touches. Parallel agent activity can never produce a merge conflict because no two agents share a file.

### Naming Convention

```
.agent-workspace/parking-station/suggestions-log-{agent-id}.md
```

### Current Agent Files

| Agent ID | Suggestions Log |
|----------|----------------|
| `governance-repo-administrator` | `.agent-workspace/parking-station/suggestions-log-governance-repo-administrator.md` |
| `CodexAdvisor-agent` | `.agent-workspace/parking-station/suggestions-log-codex-advisor.md` *(filename uses lowercase `codex-advisor` per kebab-case convention)* |
| `foreman-v2` | `.agent-workspace/parking-station/suggestions-log-foreman-v2.md` |
| `independent-assurance-agent` | `.agent-workspace/parking-station/suggestions-log-independent-assurance-agent.md` |

When a **new agent** is introduced, its dedicated suggestions log MUST be created alongside its agent contract file in `.github/agents/`.

---

## Aggregate / Global View

To view all suggestions across all agents, concatenate the per-agent files:

```bash
cat .agent-workspace/parking-station/suggestions-log-*.md
```

No periodic merge job is needed because the per-agent files are the source of truth. CS2 review reads all files directly.

---

## Row Format

Each suggestion log entry is a Markdown table row:

```
| YYYY-MM-DD | {agent-id} | session-NNN | [PHASE] | <summary> | <evidence-file> |
```

- **PHASE** (optional label): `DRAFT-PHASE`, `SESSION-END`, or another meaningful label
- **summary**: Plain-language description of the suggestion (1-2 sentences)
- **evidence-file**: Session memory filename containing the full suggestion detail

---

## Agent Contract References

Each agent contract references only its own suggestions log:

- `CodexAdvisor-agent.md` → Step 3.5 and Step 4.3 reference `suggestions-log-codex-advisor.md`
- `governance-repo-administrator-v2.agent.md` → §4.2a references `suggestions-log-governance-repo-administrator.md`
- Future agent contracts follow the same pattern

---

## Migration from Shared File

The original shared file is preserved as a historical archive:

```
.agent-workspace/parking-station/suggestions-log.md   ← DEPRECATED archive
```

All historical entries have been migrated into the appropriate per-agent files. The deprecated file contains a migration notice and must not receive new entries.

---

## Conflict Prevention Guarantee

Under this scheme:

- Each agent branch only ever modifies **one file** (`suggestions-log-{its-agent-id}.md`)
- No two agents share a suggestions log file
- Git merges of parallel agent branches will never conflict on log files
- No manual merge resolution is ever required for suggestion log entries

---

## Governance Audit

The per-agent file structure preserves full traceability:

- **Agent identity**: encoded in filename and every table row
- **Session reference**: every row references its session memory file
- **Date**: ISO 8601 date on every row
- **Evidence**: direct link to the session artifact containing full detail

This structure satisfies the evidence and audit requirements of `EVIDENCE_ARTIFACT_BUNDLE_STANDARD.md` and `MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md`.

---

**See also**: `.agent-workspace/parking-station/README.md` — quick reference for all agents
