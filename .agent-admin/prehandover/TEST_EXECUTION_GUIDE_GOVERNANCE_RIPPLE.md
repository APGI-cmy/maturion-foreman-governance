# Manual Test Execution Guide: End-to-End Governance Ripple Pipeline

**Test ID**: GOVERNANCE-RIPPLE-E2E-TEST-20260227
**Date**: 2026-02-27
**Prepared By**: claude[agent]
**Authority**: CS2 (Johan Ras)
**Issue Reference**: "[Test] Trigger End-to-End Layer-Down & Governance Ripple Pipeline (Manual Test Request)"
**Status**: READY FOR EXECUTION

---

## Executive Summary

This document provides a step-by-step guide to manually trigger and validate the end-to-end governance ripple pipeline. The test validates that all recent fixes (Gap 1-5 from PR #1226) work together for automated layering/rippling across all consumer repos.

### Prerequisites Status

✅ **PR #1226** - Merged (fixes Gaps 1, 2, 4 in governance repo)
⚠️ **PR #643** - Status unknown (consumer repo changes)
⚠️ **PR #645** - Status unknown (maturion-isms specific changes)

**Note**: PRs #643 and #645 should be verified as merged before running this test.

---

## Test Objectives

1. Confirm Signal 1 (GitHub Issues) and Signal 2 (repository_dispatch) are sent correctly
2. Validate all 4 eligible consumer repos receive and process the ripple
3. Ensure gap fixes (liaison assignment, repository_dispatch sender, token configuration) work
4. Verify fail-fast behavior for missing tokens or configuration errors
5. Confirm session memory and evidence artifacts are produced end-to-end

---

## Pre-Test Validation Checklist

### ✅ Governance Repo Configuration

- [x] Workflow file exists: `.github/workflows/governance-layer-down-dispatch.yml`
- [x] Issue template exists: `.github/layer-down-issue-template.md`
- [x] Consumer registry valid: `governance/CONSUMER_REPO_REGISTRY.json`
- [x] All 4 consumer repos enabled with liaisons assigned:
  - `APGI-cmy/maturion-foreman-office-app` → liaison: `APGI-cmy`
  - `APGI-cmy/PartPulse` → liaison: `APGI-cmy`
  - `APGI-cmy/maturion-isms` → liaison: `APGI-cmy`
  - `APGI-cmy/R_Roster` → liaison: `APGI-cmy`
- [x] Workflow YAML syntax valid (yamllint warnings are non-critical)
- [x] Template variables present: `COMMIT_SHA`, `SHORT_SHA`, `TIMESTAMP`, `COMMIT_MESSAGE`, `FILES_LIST`, `AGENT_SECTION`

### ⚠️ Consumer Repo Configuration (To Be Verified)

For each consumer repo (`maturion-foreman-office-app`, `PartPulse`, `maturion-isms`, `R_Roster`):

- [ ] `governance-ripple-sync.yml` workflow deployed (from `consumer-alignment.yml.template`)
- [ ] Workflow listens on `repository_dispatch: types: [governance_ripple]`
- [ ] `MATURION_BOT_TOKEN` secret configured with correct scopes:
  - `contents:write` (for repository_dispatch to succeed)
  - `issues:write` (for issue creation)
  - `pull-requests:write` (for PR creation)
- [ ] Labels exist: `governance`, `layer-down`, `high-priority`
- [ ] User `APGI-cmy` exists and can be assigned to issues

---

## Test Execution Steps

### Step 1: Navigate to GitHub Actions

1. Go to https://github.com/APGI-cmy/maturion-foreman-governance
2. Click the **Actions** tab
3. Find the workflow **"Governance Layer-Down Dispatch"** in the left sidebar

### Step 2: Trigger Manual Workflow Run

1. Click **"Governance Layer-Down Dispatch"**
2. Click the **"Run workflow"** button (top right)
3. Select branch: **`main`** (recommended)
4. Optional: Enter a reason for manual dispatch (e.g., "Manual E2E test - validating Gap fixes")
5. Click **"Run workflow"** (green button)

### Step 3: Monitor Workflow Execution

1. Wait for the workflow run to appear in the list
2. Click on the workflow run to view details
3. Monitor each job step:
   - ✅ Checkout governance repo
   - ✅ Detect changed governance artifacts
   - ✅ Read consumer registry
   - ✅ Create layer-down issues in consumer repos (Signal 1)
   - ✅ Dispatch governance_ripple repository_dispatch to consumer repos (Signal 2)
   - ✅ Record layer-down dispatch

### Step 4: Verify Signal 1 (GitHub Issues Created)

For **each of the 4 consumer repos**, verify:

1. Navigate to the consumer repo's Issues tab
2. Check for a new issue with title matching: `[Layer-Down] Propagate Governance Changes - YYYY-MM-DD (xxxxxxxx)`
3. Verify issue contains:
   - Commit SHA and timestamp
   - List of changed governance artifacts (may be empty for manual dispatch)
   - Integration instructions
   - Auto-close eligibility checklist
4. Verify issue is **assigned to `APGI-cmy`** (governance-liaison)
5. Verify issue has labels: `governance`, `layer-down`, `high-priority`

**Expected Consumer Repos**:
- https://github.com/APGI-cmy/maturion-foreman-office-app/issues
- https://github.com/APGI-cmy/PartPulse/issues
- https://github.com/APGI-cmy/maturion-isms/issues
- https://github.com/APGI-cmy/R_Roster/issues

### Step 5: Verify Signal 2 (repository_dispatch Triggered Workflows)

For **each of the 4 consumer repos**, verify:

1. Navigate to the consumer repo's Actions tab
2. Look for a new workflow run of **"Governance Consumer Alignment"** (or similar name)
3. Verify the workflow was triggered by **`repository_dispatch`** event (not schedule)
4. Monitor the workflow execution:
   - ✅ Checkout repository
   - ✅ Verify executable pack present
   - ✅ Checkout governance canonical
   - ✅ Check circuit breaker
   - ✅ Resolve canonical commit
   - ✅ Compute inventory hashes
   - ✅ Compare drift
   - ✅ Create alignment PR (if drift detected)

**Expected Consumer Repo Actions**:
- https://github.com/APGI-cmy/maturion-foreman-office-app/actions
- https://github.com/APGI-cmy/PartPulse/actions
- https://github.com/APGI-cmy/maturion-isms/actions
- https://github.com/APGI-cmy/R_Roster/actions

### Step 6: Verify Alignment PRs Created (if Drift Detected)

If drift is detected in any consumer repo:

1. Navigate to the consumer repo's Pull Requests tab
2. Look for PR with title: **"Governance alignment: canonical layer-down"**
3. Verify PR contains:
   - Updated governance artifacts (canon, executable, schemas, etc.)
   - Updated `GOVERNANCE_ALIGNMENT_INVENTORY.json` (if present)
   - Updated `.agent-admin/governance/sync_state.json`
   - Alignment log in `.agent-admin/governance/alignment.log`
4. Verify PR has label: `governance`
5. Verify PR is assigned for review per protocol:
   - **CS2 approval required** if agent contract files (`.github/agents/*.md`) changed
   - **FM/Governance-Liaison approval** for non-agent files only

### Step 7: Verify Session Memory and Evidence Artifacts

In the **governance repo** (`maturion-foreman-governance`):

1. Check for dispatch record: `.agent-admin/ripple/layer-down-dispatch-YYYYMMDD-HHMMSS.json`
2. Verify record contains:
   - `schema_version`: "1.0.0"
   - `type`: "layer_down_dispatch"
   - `timestamp`: ISO 8601 format
   - `commit_sha`: The commit SHA from the manual dispatch
   - `agent_files_changed`: boolean
   - `consumers_notified`: Array of 4 consumer repo names

In **each consumer repo**:

1. Check for sync state: `.agent-admin/governance/sync_state.json`
2. Verify state contains:
   - `alignment_status`: "ALIGNED", "DRIFT", or "ERROR"
   - `canonical_commit`: The governance repo commit SHA
   - `canonical_inventory_sha256`: Hash of canonical inventory
   - `local_inventory_sha256`: Hash of local inventory
   - `last_sync`: Timestamp of last sync
   - `consecutive_failures`: Should be 0 if successful

---

## Expected Outcomes

### Success Criteria

✅ **Signal 1 (Issues)**:
- 4 issues created (one per enabled consumer repo)
- All issues assigned to `APGI-cmy`
- All issues have correct labels and content

✅ **Signal 2 (repository_dispatch)**:
- 4 `governance-ripple-sync.yml` workflows triggered
- All workflows complete successfully (or fail with clear errors)

✅ **Drift Detection**:
- Workflows correctly detect drift (or no drift if already aligned)
- Drift detection failures result in clear error messages and circuit breaker activation

✅ **PR Creation**:
- PRs created only when drift detected
- PRs contain all necessary governance artifacts
- PRs follow CS2 Agent File Authority Model (draft if agent files changed)

✅ **Evidence Artifacts**:
- Dispatch record created in governance repo
- Sync state updated in all consumer repos
- Alignment logs present

### Acceptable Failures

⚠️ **Token Permission Errors** (Fail Fast):
- If `MATURION_BOT_TOKEN` lacks `contents:write` in a consumer repo
- Error message clearly indicates permission issue
- Other consumer repos continue processing

⚠️ **Missing Labels**:
- If labels `governance`, `layer-down`, `high-priority` don't exist in a consumer repo
- Issue creation may succeed but without labels
- Error logged but not fatal

⚠️ **Circuit Breaker Activation**:
- If a consumer repo has 3+ consecutive alignment failures
- Workflow skips alignment run and logs circuit breaker status
- Manual intervention required to reset (documented in workflow output)

---

## Troubleshooting Guide

### Issue: No issues created in consumer repos

**Possible Causes**:
1. `MATURION_BOT_TOKEN` secret not configured in governance repo
2. Token lacks `issues:write` scope in consumer repos
3. Consumer registry has `enabled: false` for all repos

**Resolution**:
- Verify `MATURION_BOT_TOKEN` secret exists in governance repo settings
- Verify token has correct scopes (see MATURION_BOT_EXECUTION_IDENTITY_MODEL.md)
- Verify `governance/CONSUMER_REPO_REGISTRY.json` has `enabled: true` for consumer repos

### Issue: No `governance-ripple-sync.yml` workflows triggered

**Possible Causes**:
1. `repository_dispatch` step failed in governance workflow
2. Consumer repos don't have `governance-ripple-sync.yml` deployed
3. Token lacks `contents:write` scope for repository_dispatch

**Resolution**:
- Check governance workflow logs for `repository_dispatch` step errors
- Verify consumer repos have `.github/workflows/governance-ripple-sync.yml` (or similar)
- Verify `MATURION_BOT_TOKEN` has `contents:write` scope

### Issue: Alignment workflows fail with "governance canonical checkout failed"

**Possible Causes**:
1. Consumer repos using old template with `RIPPLE_DISPATCH_TOKEN` (Gap 4)
2. Token lacks `contents:read` scope for governance repo

**Resolution**:
- Update consumer repos' alignment workflow to use `MATURION_BOT_TOKEN` (not `RIPPLE_DISPATCH_TOKEN`)
- Follow Gap 4 fix from LAYER_DOWN_INVESTIGATION_REPORT_20260227.md

### Issue: Circuit breaker open, alignment skipped

**Possible Causes**:
1. Consumer repo has 3+ consecutive alignment failures
2. Previous drift detection failures not resolved

**Resolution**:
1. Check `.agent-admin/governance/sync_state.json` in consumer repo
2. Review `last_error` field for root cause
3. Fix underlying issue (e.g., token permissions, drift detection script)
4. Reset circuit breaker by manually updating `consecutive_failures` to 0 in sync state
5. Trigger manual workflow dispatch to retry

---

## Post-Test Verification

After test completion, document the following:

1. **Workflow Run URL**: Link to the governance workflow run
2. **Issues Created**: Links to all 4 layer-down issues
3. **Workflows Triggered**: Links to all 4 consumer repo workflow runs
4. **PRs Created**: Links to any alignment PRs created
5. **Failures**: Any failures encountered with root cause analysis
6. **Evidence Artifacts**: Confirm dispatch record and sync states created

### Test Success Criteria Summary

- [ ] All 4 Signal 1 issues created and assigned
- [ ] All 4 Signal 2 repository_dispatch events sent
- [ ] All 4 `governance-ripple-sync.yml` workflows triggered
- [ ] Drift detection completed (or failed with clear errors)
- [ ] PRs created where drift detected
- [ ] Session memory artifacts created in all repos
- [ ] No unexpected failures or silent errors

---

## References

- [LAYER_DOWN_INVESTIGATION_REPORT_20260227.md](../../../governance/layer-down/LAYER_DOWN_INVESTIGATION_REPORT_20260227.md) - Gap analysis and fixes
- [LAYERING_AND_RIPPLING_AUTOMATION_STRATEGY.md](../../../governance/strategy/LAYERING_AND_RIPPLING_AUTOMATION_STRATEGY.md) - Automation strategy
- [CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md](../../../governance/canon/CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md) - Layer-down protocol
- [MATURION_BOT_EXECUTION_IDENTITY_MODEL.md](../../../governance/canon/MATURION_BOT_EXECUTION_IDENTITY_MODEL.md) - Token permissions model

---

*Test guide prepared: 2026-02-27 | Authority: claude[agent] → CS2 (Johan Ras)*
*Living Agent System v6.2.0*
