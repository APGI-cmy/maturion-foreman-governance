# SCOPE_DECLARATION — Static Documentation

> ⚠️ **This file is no longer the authoritative per-PR scope evidence artifact.**
>
> As of issue #1359, this repository uses **per-PR immutable scope declarations** instead of
> this single shared file. Editing this file as PR scope evidence is no longer permitted.

## New Canonical Model

Each PR must introduce its own scope declaration file at:

```
.agent-admin/scope-declarations/pr-<PR_NUMBER>.md
```

Examples:

```
.agent-admin/scope-declarations/pr-1360.md
.agent-admin/scope-declarations/pr-1361.md
.agent-admin/scope-declarations/pr-1362.md
```

See `.agent-admin/scope-declarations/README.md` for the required format and validation rules.

## Why This Changed

The previous model stored all PR scope evidence in one shared file. When multiple PRs were open
concurrently, they all modified the same file, causing repeated merge conflicts and stale-evidence
failures (PATH-MISMATCH, ISSUE-MISMATCH). Per-PR immutable files eliminate this structural defect.

## Authority

Issue #1359 | `governance/canon/SCOPE_DECLARATION_SCHEMA.md` v2 | `governance/canon/AGENT_HANDOVER_AUTOMATION.md` §4.3d v1.6.0

