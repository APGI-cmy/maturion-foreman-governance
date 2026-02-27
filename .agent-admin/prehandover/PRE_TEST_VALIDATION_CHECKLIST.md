# Pre-Test Validation Checklist: Governance Ripple Pipeline

**Checklist ID**: GOVERNANCE-RIPPLE-PRETEST-20260227
**Date**: 2026-02-27
**Test Reference**: "[Test] Trigger End-to-End Layer-Down & Governance Ripple Pipeline"
**Status**: REQUIRES MANUAL VERIFICATION

---

## Purpose

This checklist must be completed **before** triggering the manual workflow dispatch. It validates that all prerequisites from the issue are met and that the system is ready for end-to-end testing.

---

## Section 1: Prerequisite PRs (CRITICAL)

The issue states these PRs should be merged before running the test:

### PR #1226 - Governance Repo Gaps

- [x] **Status**: MERGED (commit: `0f43e90`)
- [x] **Changes Applied**:
  - Gap 1 fixed: Liaison fields populated in `CONSUMER_REPO_REGISTRY.json`
  - Gap 2 fixed: `repository_dispatch` sender added to workflow
  - Gap 4 fixed: `consumer-alignment.yml.template` uses `MATURION_BOT_TOKEN`
  - Gap 3 confirmed: Layer-up workflows are active and non-conflicting
  - Gap 5 documented: Backfill plan created for past layer-down events

**Validation**: ✅ PR #1226 is merged and on `main` branch

### PR #643 - Consumer Repo Changes

- [ ] **Repository**: Unknown (likely governance repo or consumer)
- [ ] **Status**: ❓ NOT VERIFIED
- [ ] **Changes**: Unknown

**Action Required**: Verify PR #643 is merged:
```bash
gh pr view 643 --repo APGI-cmy/maturion-foreman-governance --json state,title,mergedAt
# OR search across consumer repos if not found in governance
```

### PR #645 - maturion-isms Specific Changes

- [ ] **Repository**: `APGI-cmy/maturion-isms` (per issue description)
- [ ] **Status**: ❓ NOT VERIFIED
- [ ] **Changes**: Unknown (likely isms-specific gap fixes)

**Action Required**: Verify PR #645 is merged:
```bash
gh pr view 645 --repo APGI-cmy/maturion-isms --json state,title,mergedAt
```

---

## Section 2: Governance Repo Configuration

### Workflow Configuration

- [x] `.github/workflows/governance-layer-down-dispatch.yml` exists
- [x] Workflow has `workflow_dispatch` trigger enabled
- [x] Workflow uses `MATURION_BOT_TOKEN` secret
- [x] Workflow sends both Signal 1 (issues) and Signal 2 (repository_dispatch)

### Consumer Registry

- [x] `governance/CONSUMER_REPO_REGISTRY.json` exists and is valid JSON
- [x] All consumer repos have `enabled: true`:
  - [x] `APGI-cmy/maturion-foreman-office-app`
  - [x] `APGI-cmy/PartPulse`
  - [x] `APGI-cmy/maturion-isms`
  - [x] `APGI-cmy/R_Roster`
- [x] All consumer repos have `governance_liaison` populated:
  - [x] `maturion-foreman-office-app` → `APGI-cmy`
  - [x] `PartPulse` → `APGI-cmy`
  - [x] `maturion-isms` → `APGI-cmy`
  - [x] `R_Roster` → `APGI-cmy`

### Issue Template

- [x] `.github/layer-down-issue-template.md` exists
- [x] Template contains required variables: `COMMIT_SHA`, `SHORT_SHA`, `TIMESTAMP`, `COMMIT_MESSAGE`, `FILES_LIST`, `AGENT_SECTION`

### Token Configuration (GOVERNANCE REPO)

- [ ] **`MATURION_BOT_TOKEN` secret exists** in governance repo settings
- [ ] **Token has required scopes**:
  - [ ] `contents:read` - To read governance repo content
  - [ ] `issues:write` - To create issues in consumer repos
  - [ ] `contents:write` - To send repository_dispatch to consumer repos

**Action Required**: Verify token exists and has correct scopes:
```bash
# Check token scopes (requires token to be accessible)
# Manual verification: https://github.com/APGI-cmy/maturion-foreman-governance/settings/secrets/actions
```

---

## Section 3: Consumer Repo Configuration (ALL 4 REPOS)

For **each consumer repo**, verify the following:

### maturion-foreman-office-app

- [ ] **Workflow deployed**: `.github/workflows/governance-ripple-sync.yml` (or `consumer-alignment.yml`)
- [ ] **Workflow listens on**: `repository_dispatch: types: [governance_ripple]`
- [ ] **Uses correct token**: `MATURION_BOT_TOKEN` (not `RIPPLE_DISPATCH_TOKEN`)
- [ ] **Token secret exists** in repo settings
- [ ] **Token has scopes**: `contents:write`, `pull-requests:write`, `issues:write`
- [ ] **Labels exist**: `governance`, `layer-down`, `high-priority`
- [ ] **User `APGI-cmy` can be assigned** to issues

**Action Required**:
```bash
# Check if workflow exists
gh api repos/APGI-cmy/maturion-foreman-office-app/contents/.github/workflows/governance-ripple-sync.yml --jq '.name'

# Check if labels exist
gh label list --repo APGI-cmy/maturion-foreman-office-app | grep -E "(governance|layer-down|high-priority)"
```

### PartPulse

- [ ] **Workflow deployed**: `.github/workflows/governance-ripple-sync.yml` (or `consumer-alignment.yml`)
- [ ] **Workflow listens on**: `repository_dispatch: types: [governance_ripple]`
- [ ] **Uses correct token**: `MATURION_BOT_TOKEN` (not `RIPPLE_DISPATCH_TOKEN`)
- [ ] **Token secret exists** in repo settings
- [ ] **Token has scopes**: `contents:write`, `pull-requests:write`, `issues:write`
- [ ] **Labels exist**: `governance`, `layer-down`, `high-priority`
- [ ] **User `APGI-cmy` can be assigned** to issues

**Action Required**:
```bash
# Check if workflow exists
gh api repos/APGI-cmy/PartPulse/contents/.github/workflows/governance-ripple-sync.yml --jq '.name'

# Check if labels exist
gh label list --repo APGI-cmy/PartPulse | grep -E "(governance|layer-down|high-priority)"
```

### maturion-isms

- [ ] **Workflow deployed**: `.github/workflows/governance-ripple-sync.yml` (or `consumer-alignment.yml`)
- [ ] **Workflow listens on**: `repository_dispatch: types: [governance_ripple]`
- [ ] **Uses correct token**: `MATURION_BOT_TOKEN` (not `RIPPLE_DISPATCH_TOKEN`)
- [ ] **Token secret exists** in repo settings
- [ ] **Token has scopes**: `contents:write`, `pull-requests:write`, `issues:write`
- [ ] **Labels exist**: `governance`, `layer-down`, `high-priority`
- [ ] **User `APGI-cmy` can be assigned** to issues

**Action Required**:
```bash
# Check if workflow exists
gh api repos/APGI-cmy/maturion-isms/contents/.github/workflows/governance-ripple-sync.yml --jq '.name'

# Check if labels exist
gh label list --repo APGI-cmy/maturion-isms | grep -E "(governance|layer-down|high-priority)"
```

### R_Roster

- [ ] **Workflow deployed**: `.github/workflows/governance-ripple-sync.yml` (or `consumer-alignment.yml`)
- [ ] **Workflow listens on**: `repository_dispatch: types: [governance_ripple]`
- [ ] **Uses correct token**: `MATURION_BOT_TOKEN` (not `RIPPLE_DISPATCH_TOKEN`)
- [ ] **Token secret exists** in repo settings
- [ ] **Token has scopes**: `contents:write`, `pull-requests:write`, `issues:write`
- [ ] **Labels exist**: `governance`, `layer-down`, `high-priority`
- [ ] **User `APGI-cmy` can be assigned** to issues

**Action Required**:
```bash
# Check if workflow exists
gh api repos/APGI-cmy/R_Roster/contents/.github/workflows/governance-ripple-sync.yml --jq '.name'

# Check if labels exist
gh label list --repo APGI-cmy/R_Roster | grep -E "(governance|layer-down|high-priority)"
```

---

## Section 4: Historical Context

### Previous Layer-Down Events (Backlog)

The investigation report identified 6 pending layer-down events that were never dispatched to consumer repos. This test should trigger a **new** dispatch, not backfill these:

1. LAS_CONSUMER_RIPPLE_PLAN.md (2026-02-04)
2. LAS-GAP-CLOSURE-RIPPLE-REPORT-20260208.md (2026-02-08)
3. RIPPLE_SIGNAL_DELEGATION_GUIDANCE_20260215.md (2026-02-15)
4. RIPPLE-ECOSYSTEM-VOCAB-FOREMAN-MODALITIES-20260221.md (2026-02-21)
5. RIPPLE-PRE-BUILD-REALITY-CHECK-CANON-20260223.md (2026-02-23)
6. Session 058 canons (2026-02-26)

**Note**: These backlog items are **out of scope** for this test. This test validates the **automated dispatch mechanism**, not the backlog content.

---

## Section 5: Test Readiness Gate

**All items in Sections 1-3 must be checked before proceeding with the test.**

### Critical Blockers (MUST be resolved)

- [ ] PR #1226 merged ✅ (VERIFIED)
- [ ] PR #643 merged ❓ (REQUIRES VERIFICATION)
- [ ] PR #645 merged ❓ (REQUIRES VERIFICATION)
- [ ] `MATURION_BOT_TOKEN` exists in governance repo
- [ ] Token has all required scopes

### Non-Critical (Test can proceed, but expect failures)

- [ ] Consumer repos have governance-ripple-sync.yml deployed
- [ ] Consumer repos have correct labels
- [ ] Consumer repos have MATURION_BOT_TOKEN configured

**If non-critical items are not complete**, the test will help identify gaps and produce clear error messages (fail-fast behavior per Gap 2 fix).

---

## Section 6: Pre-Test Commands (Optional)

Run these commands to gather information before the test:

### Check governance repo status
```bash
cd /home/runner/work/maturion-foreman-governance/maturion-foreman-governance
git log --oneline -5
git status
```

### Validate workflow syntax
```bash
yamllint .github/workflows/governance-layer-down-dispatch.yml
```

### Validate consumer registry
```bash
jq '.' governance/CONSUMER_REPO_REGISTRY.json
jq -r '.consumers[] | select(.enabled == true) | "\(.repository) - liaison: \(.governance_liaison)"' governance/CONSUMER_REPO_REGISTRY.json
```

### Check for pending dispatch records
```bash
ls -la .agent-admin/ripple/ 2>/dev/null || echo "No dispatch records yet"
```

---

## Approval

**Checklist Completed By**: _______________
**Date**: _______________
**Approved for Test**: [ ] YES  [ ] NO

**Blockers (if any)**: _______________________________________

---

## Next Steps

✅ **If all critical items checked**: Proceed to [TEST_EXECUTION_GUIDE_GOVERNANCE_RIPPLE.md](./TEST_EXECUTION_GUIDE_GOVERNANCE_RIPPLE.md)

❌ **If blockers remain**: Resolve blockers before proceeding

---

*Checklist prepared: 2026-02-27 | Authority: claude[agent] → CS2 (Johan Ras)*
