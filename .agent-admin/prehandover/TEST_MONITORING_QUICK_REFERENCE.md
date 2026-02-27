# Test Monitoring Quick Reference

**Test ID**: GOVERNANCE-RIPPLE-E2E-TEST-20260227
**Date**: 2026-02-27

---

## Quick Start

1. **Trigger**: Go to [Actions → Governance Layer-Down Dispatch](https://github.com/APGI-cmy/maturion-foreman-governance/actions/workflows/governance-layer-down-dispatch.yml) → Click "Run workflow"
2. **Monitor**: Follow the checklist below
3. **Document**: Record all URLs and outcomes

---

## Real-Time Monitoring Checklist

### Phase 1: Governance Workflow (5-10 minutes)

**URL**: https://github.com/APGI-cmy/maturion-foreman-governance/actions/workflows/governance-layer-down-dispatch.yml

- [ ] Workflow started successfully
- [ ] Job "dispatch-layer-down" running
- [ ] Step "Detect changed governance artifacts" ✅
- [ ] Step "Read consumer registry" ✅
- [ ] Step "Create layer-down issues" ✅ (4 repos)
- [ ] Step "Dispatch governance_ripple repository_dispatch" ✅ (4 repos)
- [ ] Step "Record layer-down dispatch" ✅
- [ ] Workflow completed: ✅ SUCCESS | ❌ FAILURE

**Dispatch Record Created**: `.agent-admin/ripple/layer-down-dispatch-YYYYMMDD-HHMMSS.json`

---

### Phase 2: Consumer Issues (Immediate - Check after Phase 1 completes)

#### maturion-foreman-office-app
**Issues URL**: https://github.com/APGI-cmy/maturion-foreman-office-app/issues

- [ ] Issue created with title: `[Layer-Down] Propagate Governance Changes - YYYY-MM-DD (xxxxxxxx)`
- [ ] Issue assigned to: `APGI-cmy`
- [ ] Issue has labels: `governance`, `layer-down`, `high-priority`
- [ ] Issue body contains: commit SHA, timestamp, changed files list, integration instructions

**Issue URL**: _______________________________________________

#### PartPulse
**Issues URL**: https://github.com/APGI-cmy/PartPulse/issues

- [ ] Issue created with title: `[Layer-Down] Propagate Governance Changes - YYYY-MM-DD (xxxxxxxx)`
- [ ] Issue assigned to: `APGI-cmy`
- [ ] Issue has labels: `governance`, `layer-down`, `high-priority`
- [ ] Issue body contains: commit SHA, timestamp, changed files list, integration instructions

**Issue URL**: _______________________________________________

#### maturion-isms
**Issues URL**: https://github.com/APGI-cmy/maturion-isms/issues

- [ ] Issue created with title: `[Layer-Down] Propagate Governance Changes - YYYY-MM-DD (xxxxxxxx)`
- [ ] Issue assigned to: `APGI-cmy`
- [ ] Issue has labels: `governance`, `layer-down`, `high-priority`
- [ ] Issue body contains: commit SHA, timestamp, changed files list, integration instructions

**Issue URL**: _______________________________________________

#### R_Roster
**Issues URL**: https://github.com/APGI-cmy/R_Roster/issues

- [ ] Issue created with title: `[Layer-Down] Propagate Governance Changes - YYYY-MM-DD (xxxxxxxx)`
- [ ] Issue assigned to: `APGI-cmy`
- [ ] Issue has labels: `governance`, `layer-down`, `high-priority`
- [ ] Issue body contains: commit SHA, timestamp, changed files list, integration instructions

**Issue URL**: _______________________________________________

---

### Phase 3: Consumer Workflows (Triggered by repository_dispatch - Check within 1 minute)

#### maturion-foreman-office-app
**Actions URL**: https://github.com/APGI-cmy/maturion-foreman-office-app/actions

- [ ] Workflow "Governance Consumer Alignment" (or similar) triggered
- [ ] Triggered by: `repository_dispatch` event
- [ ] Workflow running
- [ ] Job steps completed:
  - [ ] Checkout repository
  - [ ] Verify executable pack present
  - [ ] Checkout governance canonical
  - [ ] Check circuit breaker
  - [ ] Compute inventory hashes
  - [ ] Compare drift
  - [ ] Create alignment PR (if drift detected)
- [ ] Workflow status: ✅ SUCCESS | ⚠️ NO DRIFT | ❌ FAILURE

**Workflow Run URL**: _______________________________________________

**PR Created**: [ ] YES | [ ] NO (no drift)
**PR URL**: _______________________________________________

#### PartPulse
**Actions URL**: https://github.com/APGI-cmy/PartPulse/actions

- [ ] Workflow "Governance Consumer Alignment" (or similar) triggered
- [ ] Triggered by: `repository_dispatch` event
- [ ] Workflow running
- [ ] Job steps completed:
  - [ ] Checkout repository
  - [ ] Verify executable pack present
  - [ ] Checkout governance canonical
  - [ ] Check circuit breaker
  - [ ] Compute inventory hashes
  - [ ] Compare drift
  - [ ] Create alignment PR (if drift detected)
- [ ] Workflow status: ✅ SUCCESS | ⚠️ NO DRIFT | ❌ FAILURE

**Workflow Run URL**: _______________________________________________

**PR Created**: [ ] YES | [ ] NO (no drift)
**PR URL**: _______________________________________________

#### maturion-isms
**Actions URL**: https://github.com/APGI-cmy/maturion-isms/actions

- [ ] Workflow "Governance Consumer Alignment" (or similar) triggered
- [ ] Triggered by: `repository_dispatch` event
- [ ] Workflow running
- [ ] Job steps completed:
  - [ ] Checkout repository
  - [ ] Verify executable pack present
  - [ ] Checkout governance canonical
  - [ ] Check circuit breaker
  - [ ] Compute inventory hashes
  - [ ] Compare drift
  - [ ] Create alignment PR (if drift detected)
- [ ] Workflow status: ✅ SUCCESS | ⚠️ NO DRIFT | ❌ FAILURE

**Workflow Run URL**: _______________________________________________

**PR Created**: [ ] YES | [ ] NO (no drift)
**PR URL**: _______________________________________________

#### R_Roster
**Actions URL**: https://github.com/APGI-cmy/R_Roster/actions

- [ ] Workflow "Governance Consumer Alignment" (or similar) triggered
- [ ] Triggered by: `repository_dispatch` event
- [ ] Workflow running
- [ ] Job steps completed:
  - [ ] Checkout repository
  - [ ] Verify executable pack present
  - [ ] Checkout governance canonical
  - [ ] Check circuit breaker
  - [ ] Compute inventory hashes
  - [ ] Compare drift
  - [ ] Create alignment PR (if drift detected)
- [ ] Workflow status: ✅ SUCCESS | ⚠️ NO DRIFT | ❌ FAILURE

**Workflow Run URL**: _______________________________________________

**PR Created**: [ ] YES | [ ] NO (no drift)
**PR URL**: _______________________________________________

---

## Test Results Summary

### Signal 1 (Issues) Success Rate
- [ ] 4/4 issues created successfully
- [ ] 3/4 issues created (1 failure)
- [ ] 2/4 issues created (2 failures)
- [ ] 1/4 issues created (3 failures)
- [ ] 0/4 issues created (all failed)

### Signal 2 (repository_dispatch) Success Rate
- [ ] 4/4 workflows triggered
- [ ] 3/4 workflows triggered (1 failure)
- [ ] 2/4 workflows triggered (2 failures)
- [ ] 1/4 workflows triggered (3 failures)
- [ ] 0/4 workflows triggered (all failed)

### Alignment PR Creation
- [ ] PRs created where drift detected
- [ ] No drift detected (expected if repos already aligned)
- [ ] Drift detection failures (check logs)

### Overall Test Outcome
- [ ] ✅ **PASS** - All signals sent, all workflows executed as expected
- [ ] ⚠️ **PARTIAL PASS** - Some failures, but fail-fast behavior correct
- [ ] ❌ **FAIL** - Unexpected behavior or missing functionality

---

## Common Error Messages to Watch For

### Expected Errors (Acceptable)

```
Issue creation failed for <repo> (labels/assignees may not exist yet)
```
**Meaning**: Labels don't exist in consumer repo. Issue created but without labels.
**Action**: Create labels in consumer repo, or ignore if labels aren't critical.

```
repository_dispatch failed for <repo> (MATURION_BOT_TOKEN may lack contents:write scope in that repo)
```
**Meaning**: Token doesn't have `contents:write` scope in consumer repo.
**Action**: Update token permissions or verify token is configured.

```
Circuit breaker open due to repeated failures
```
**Meaning**: Consumer repo has failed alignment 3+ times.
**Action**: Check `.agent-admin/governance/sync_state.json` in consumer repo, fix underlying issue.

### Unexpected Errors (Investigate)

```
FATAL: Consumer registry not found
```
**Meaning**: `governance/CONSUMER_REPO_REGISTRY.json` missing.
**Action**: File should exist. Check if workflow checkout succeeded.

```
FATAL: Issue template not found
```
**Meaning**: `.github/layer-down-issue-template.md` missing.
**Action**: File should exist. Check if workflow checkout succeeded.

```
ERROR: governance/executable/scripts missing
```
**Meaning**: Consumer repo doesn't have executable pack layered down yet.
**Action**: This is first-time setup. Layer down executable pack manually first.

---

## Post-Test Actions

After test completes:

1. **Collect all URLs** from this checklist
2. **Screenshot any failures** for documentation
3. **Document findings** in the test issue
4. **Close layer-down issues** in consumer repos (after review)
5. **Merge alignment PRs** (if created and reviewed)

---

*Quick reference prepared: 2026-02-27 | Authority: claude[agent]*
