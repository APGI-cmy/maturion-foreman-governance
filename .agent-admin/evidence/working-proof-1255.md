# Working Proof — PR #1255 — Fix governance layer-down dispatch: silent failures, YAML regression test

**Agent**: governance-repo-administrator v2.0.0
**Session**: GA-20260301-1255
**Date**: 2026-03-01
**Issue**: APGI-cmy/maturion-foreman-governance#1254
**PR**: APGI-cmy/maturion-foreman-governance#1255
**Wave/Context**: Governance automation hardening — issue #1254 (layer-down dispatch reliability)

---

## Problem Statement

The `governance-layer-down-dispatch` workflow had been silently swallowing per-repo dispatch errors via `|| echo "failed"`, always exiting 0 regardless of failure. Combined with YAML parse errors fixed in prior PRs (#1244, #1249), new canons went undelivered to consumer repos for >2 weeks with no operator notification. This PR addresses the remaining acceptance criteria from issue #1254 that were not covered by #1244 and #1249.

---

## Changes Made

### 1. `.github/workflows/governance-layer-down-dispatch.yml` — Silent Failure Elimination

**Change**: Modified both dispatch loops to write failures to `/tmp/dispatch-failures.txt` instead of silently swallowing errors. Added two new terminal steps:
- `Upload dispatch failure log` — uploads `/tmp/dispatch-failures.txt` as `dispatch-failure-log-<run_number>` artifact (`if-no-files-found: ignore`, so no noise when all succeed)
- `Fail job if any dispatches failed` — exits 1 with `::error::` annotation if failure file is non-empty

**Why**: The original `|| echo "failed"` pattern suppressed the non-zero exit code from `gh api`, making all dispatch failures invisible to operators and to CI. The job always exited 0. Now, any individual dispatch failure causes the job to exit 1 with a visible error annotation, and the failure log is preserved as an artifact for diagnosis.

**Alternatives considered**:
- Using `set -e` at script level — rejected because the dispatch loops are written as `while` + `|| echo` patterns; `set -e` inside a subshell loop does not propagate reliably in bash
- Using a separate summary step to list all failures without failing the job — rejected because it would still be a silent failure (job exits 0); operators need the job to be visibly red

### 2. `.github/workflows/governance-gate.yml` — YAML Regression Test

**Change**: Added new `workflow-yaml-lint` job that validates `governance-layer-down-dispatch.yml` is syntactically valid YAML using `python3 yaml.safe_load` via heredoc.

**Why**: The root cause of the >2-week dispatch outage was a YAML parse error (0-job run). GitHub Actions silently produced 0-job runs rather than failing. This regression test ensures that future PRs that introduce a YAML parse error in the critical dispatch workflow are blocked at merge gate.

**Scope decision**: Scoped to `governance-layer-down-dispatch.yml` only, not all `*.yml` workflow files. Reason: several other workflow files (e.g. `governance-layer-up-auto-triage.yml`) have pre-existing YAML parse issues that are out of scope for this PR. Expanding scope would fail the gate on pre-existing unrelated issues and block this PR unreasonably.

**Alternatives considered**:
- Use `yamllint` or an external YAML linter — rejected because it adds a new tool dependency; Python's `yaml.safe_load` is available without installation
- Lint all `*.yml` files — deferred (see scope decision above)

### 3. `docs/layer-down-backfill.md` — Manual Backfill Documentation

**Change**: New file. Step-by-step instructions for triggering manual backfill (UI + CLI), verifying success, diagnosing failures, and updating the consumer registry.

**Why**: Acceptance criterion AC-6 explicitly requires documented instructions for manual backfill triggering. No such document existed.

### 4. `docs/governance/layer-down-rca-2026-02.md` — Root Cause Analysis Report

**Change**: New file. Documents full timeline, 4 root causes, fixes applied, consumer repo status, and AC verification table for the layer-down dispatch outage.

**Why**: Acceptance criterion AC-8 requires a summary report of root causes + actions. This document satisfies that requirement.

---

## Decisions and Rationale Summary

| Decision | Rationale |
|----------|-----------|
| Write failures to file before final step rather than `|| exit 1` inline | Using inline `|| exit 1` in the loop would abort on the first failure, skipping remaining repos. Writing to a file and checking at the end allows all repos to be attempted, with complete failure reporting. |
| Use `if: always()` on final steps | Ensures the failure log upload and job-fail step run even if earlier steps fail for other reasons. |
| Heredoc for Python script in governance-gate.yml | Avoids creating an additional script file; self-contained in the workflow; tested locally. |
| New RCA doc under `docs/governance/` | Consistent with existing docs structure (`docs/governance/` contains other governance analysis docs). |

---

## Known Risks and Follow-Up Actions

| # | Risk / Follow-Up | Severity | Owner |
|---|------------------|----------|-------|
| 1 | Pre-existing YAML parse errors in `governance-layer-up-auto-triage.yml`, `governance-layer-up-close-loop.yml`, `governance-layer-up-intake.yml` remain unaddressed | Medium | Separate PR required (out of scope here) |
| 2 | PR #1255 is in DRAFT state — must be undrafted before merge | Blocking | CS2 / APGI-cmy |
| 3 | Pre-existing INTEGRITY_INDEX.md hash drift for 3 agent files (filed as ESC-002 by IAA) | Low for this PR | Separate CS2-authorized PR |
| 4 | Consumer repos need to process the backfill dispatch (manual trigger confirmed run #26, 2026-03-01T16:41:35Z) | Follow-up monitoring | CS2 / governance-liaison |

---

*Authority: LIVING_AGENT_SYSTEM.md v6.2.0 | Session GA-20260301-1255 | 2026-03-01*
