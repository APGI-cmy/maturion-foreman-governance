# Root Cause Analysis: Governance Layer-Down Dispatch Failures (2026-02)

**Date**: 2026-03-01  
**Author**: governance-repo-administrator (Copilot)  
**Issue Reference**: Fix governance layer-down dispatch: missed canons, silent failures, legacy signals  
**PRs**: #1221, #1226, #1244, #1249, #1255 (this PR)

---

## Executive Summary

The `governance-layer-down-dispatch` workflow failed silently for >2 weeks (2026-02-01 through
2026-02-28), preventing new governance canons from reaching consumer repositories
(maturion-foreman-office-app / app_management_centre, PartPulse, maturion-isms, R_Roster).

Four root causes were identified and resolved across a series of PRs. This document records
the full timeline, root causes, fixes applied, and verification status.

---

## Timeline

| Date       | Event |
|------------|-------|
| 2026-02-01 | New governance canons begin being added but layer-down automation silent-fails. |
| 2026-02-16 | Audit report (RIPPLE_AUTOMATION_AUDIT_REPORT_2026-02-16.md) concludes system is operational — this was incorrect; the audit predated the YAML parse failures. |
| 2026-02-28 | PR #1244 merged — fixes YAML parse error (0-job runs) and incomplete changed-file detection. |
| 2026-03-01 | PR #1249 merged — removes `github.token` fallback expressions from write steps (token policy enforcement). |
| 2026-03-01 | Manual `workflow_dispatch` confirms workflow now dispatches successfully to all 4 consumer repos (run #26). |
| 2026-03-01 | This PR (#1255) — adds failure tracking, artifact upload, YAML regression test, and backfill docs. |

---

## Root Cause 1: YAML Parse Error → 0-Job Runs (CRITICAL)

**Symptom**: Workflow ran with 0 jobs (no steps executed), no error surfaced to operators.

**Cause**: A Python heredoc block embedded in a `run: |` YAML literal block scalar had its body
starting at column 0. The YAML parser interpreted the column-0 content as terminating the block
scalar, producing a structurally invalid YAML document. GitHub Actions silently skipped all jobs.

**Fix** (PR #1244): Extracted the Python template logic to `.github/scripts/fill-layer-down-template.py`
and replaced the inline heredoc with a simple `python3 script_path.py` call.

---

## Root Cause 2: Silent Failures — No Job Exit on Dispatch Errors

**Symptom**: Individual `gh api` calls for issue creation and `repository_dispatch` could fail
(token error, rate limit, repo not found) but the job always exited `0`. No one was notified.

**Cause**: Both dispatch loops used `|| echo "...failed..."` — suppressing the non-zero exit code
from `gh api` and continuing normally.

**Fix** (this PR): Changed error handlers from `|| echo "failed"` to
`|| { echo "FAILED"; echo "type:repo" >> /tmp/dispatch-failures.txt; }`. Added two new final steps:
1. **Upload dispatch failure log** (`actions/upload-artifact@v4`) — uploads `/tmp/dispatch-failures.txt`
   as a named artifact on every run (ignored if no failures).
2. **Fail job if any dispatches failed** — exits 1 with `::error::` annotation if the failure file
   is non-empty, ensuring the workflow is marked failed and operators are notified via GitHub.

---

## Root Cause 3: Token Fallback Allowing Silent Token-Scope Failures

**Symptom**: Dispatch step used `${{ secrets.RIPPLE_DISPATCH_TOKEN || secrets.MATURION_BOT_TOKEN }}`
which, if both secrets were missing, fell through to `github.token` (implicitly or via earlier
fallback patterns in layer-up workflows). `github.token` has insufficient scope for
`repository_dispatch` to other repos, producing authorization errors.

**Fix** (PR #1249): Removed all `|| github.token` and `|| secrets.GITHUB_TOKEN` fallback
expressions from write-capable steps. Added canonical policy `GOVERNANCE_TOKEN_USAGE_REQUIREMENTS.md`
and a `governance/token-usage-check` merge gate job to block future violations.

---

## Root Cause 4: No YAML Regression Test

**Symptom**: YAML parse errors in workflow files were only detected when the workflow ran and
produced 0 jobs — by which time production dispatch had already failed.

**Fix** (this PR): Added `workflow-yaml-lint` job to `governance-gate.yml` (triggered on every PR
and push to main). The job validates that `governance-layer-down-dispatch.yml` is syntactically
valid YAML using `python3 yaml.safe_load`. Future PRs that introduce a YAML parse error in this
critical workflow will be blocked at merge gate.

---

## Consumer Repo Status After Backfill

A manual `workflow_dispatch` was triggered on 2026-03-01T16:41:35Z (run #26, conclusion: success).
All 4 consumer repos received both the layer-down issue and the `governance_ripple` dispatch:

| Consumer Repo | Issue Created | Dispatch Sent |
|---------------|--------------|---------------|
| APGI-cmy/maturion-foreman-office-app | ✅ | ✅ |
| APGI-cmy/PartPulse | ✅ | ✅ |
| APGI-cmy/maturion-isms | ✅ | ✅ |
| APGI-cmy/R_Roster | ✅ | ✅ |

Consumer repos should process their `governance_ripple` events and open ripple-sync PRs
automatically. If any consumer repo's ripple-sync workflow is not configured, a manual
ripple sync is required — see `docs/layer-down-backfill.md`.

---

## Changes Made in This PR

| File | Change |
|------|--------|
| `.github/workflows/governance-layer-down-dispatch.yml` | Track per-repo failures to `/tmp/dispatch-failures.txt`; upload failure log artifact; fail job if any dispatch failed |
| `.github/workflows/governance-gate.yml` | Add `workflow-yaml-lint` job — validates `governance-layer-down-dispatch.yml` YAML on every PR |
| `docs/layer-down-backfill.md` | New: manual backfill instructions for operators |
| `docs/governance/layer-down-rca-2026-02.md` | This file: root cause analysis and closure report |

---

## Acceptance Criteria Verification

| # | Criterion | Status |
|---|-----------|--------|
| AC-1 | All layer-down/sync workflows robust to YAML, secret, or comms errors — no silent failures | ✅ Fixed (silent `|| echo` replaced by failure tracking + job exit) |
| AC-2 | All canons since 2026-02-01 re-dispatched to every consumer repo | ✅ Manual backfill run #26 dispatched to all 4 repos |
| AC-3 | Ripple notifications correctly assign to a real GitHub username | ✅ Registry uses `APGI-cmy` — verified in run #26 logs |
| AC-4 | Governance issues and signals land in all target repos | ✅ Confirmed in run #26 |
| AC-5 | Artifacts/logs for all failed dispatches. No pipeline failures go unreported | ✅ Failure log artifact + job exit 1 added |
| AC-6 | Instructions for manual backfill triggering documented | ✅ `docs/layer-down-backfill.md` created |
| AC-7 (Stretch) | Regression test to prevent YAML parse failures | ✅ `workflow-yaml-lint` job in `governance-gate.yml` |
| AC-8 | Summary report of root causes + actions | ✅ This document |

---

**Authority**: GOVERNANCE_RIPPLE_MODEL.md, LIVING_AGENT_SYSTEM.md v6.2.0  
**Agent**: governance-repo-administrator (Copilot)  
**Completed**: 2026-03-01
