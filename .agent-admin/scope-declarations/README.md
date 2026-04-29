# Per-PR Immutable Scope Declarations

**Authority**: Issue #1359 | `governance/canon/SCOPE_DECLARATION_SCHEMA.md` v2 | `governance/canon/AGENT_HANDOVER_AUTOMATION.md` §4.3d v1.6.0

## Purpose

This directory contains per-PR immutable scope declaration files. Each PR introduces exactly
one scope declaration file named after its PR number. These files replace the old global
`governance/scope-declaration.md` model, which caused merge conflicts when multiple PRs were
open concurrently.

## Canonical Path

```
.agent-admin/scope-declarations/pr-<PR_NUMBER>.md
```

Examples:
```
.agent-admin/scope-declarations/pr-1360.md
.agent-admin/scope-declarations/pr-1361.md
.agent-admin/scope-declarations/pr-1362.md
```

## Rules

1. Each PR must introduce **exactly one** scope declaration file matching its own PR number.
2. The file is **immutable** once committed — it must not be modified by subsequent PRs.
3. The file must be the **last committed artifact** before IAA invocation (ECAP-QC-002).
4. The file must not be created until the PR number is known.
5. The global `governance/scope-declaration.md` must **not** be used as the per-PR scope evidence.

## Required Format

Use `governance/canon/scope-declaration.template.md` as the source template.

Minimum required sections:

```markdown
# Scope Declaration — PR #<PR_NUMBER>

SCOPE_SCHEMA_VERSION: v2
PR_NUMBER: <PR_NUMBER>
ISSUE: #<ISSUE_NUMBER> — <issue title>
BRANCH: <branch-name>
OWNER: <agent-or-user>
DATE_UTC: <YYYY-MM-DDTHH:MM:SSZ>

## PR Responsibility Domain
RESPONSIBILITY_DOMAIN: <single noun phrase>

## Explicitly In Scope
IN_SCOPE:
- <item>

## Explicitly Out of Scope
OUT_OF_SCOPE:
- Tests
- CI
- Migrations
- Email
- Logging
- Audit
- Deployment
- Infra

## Expected Verification Signal
EXPECTED_VERIFICATION:
- CI: GREEN
- TESTS: UNCHANGED | GREEN
- GOVERNANCE_GATES: GREEN

## Scope Freeze Declaration
SCOPE_FROZEN: YES

## FILES_CHANGED

FILES_CHANGED: <N>

- <path/to/file1>
- <path/to/file2>
```

## Gate Validation

The CI workflow `.github/workflows/governance-scope-to-diff-gate.yml` validates this file on
every PR to main. It checks:

- The per-PR scope file exists at the correct path
- The `## FILES_CHANGED` list exactly matches the PR diff
- No stale or extra files are listed
- The file is committed (not dirty)

To run validation locally:

```bash
./.github/scripts/validate-scope-to-diff.sh <PR_NUMBER> [base-ref]

# Example
./.github/scripts/validate-scope-to-diff.sh 1360 origin/main
```

## Migration Notice

The old global `governance/scope-declaration.md` is now static documentation only. It is no
longer used as the per-PR scope evidence artifact. See `governance/scope-declaration.md` for
the full migration notice.
