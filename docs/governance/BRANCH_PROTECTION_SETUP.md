# Branch Protection Configuration Guide

## Purpose

This guide provides step-by-step instructions for Johan to manually configure branch protection rules in the GitHub repository settings. These settings are **critical** for enforcing the Non-Bypassable Governance Sandbox.

**⚠️ IMPORTANT**: Branch protection rules cannot be configured via code or CI/CD. They must be set manually in the GitHub UI by a repository administrator.

## Why Manual Configuration is Required

GitHub restricts branch protection rule management to repository administrators through the UI or API. Since:
- Foreman's token does not have `administration` permissions (by design)
- Branch protection cannot be committed to the repository
- API-based configuration requires admin tokens

**Johan must configure these settings manually** to activate the governance sandbox.

## Prerequisites

- [ ] You are logged into GitHub as a repository administrator
- [ ] You have access to: `https://github.com/MaturionISMS/maturion-foreman-app`
- [ ] All CI workflow files have been merged to `main` branch
- [ ] CODEOWNERS file exists in `.github/CODEOWNERS`

## Step-by-Step Configuration

### Step 1: Navigate to Repository Settings

1. Go to: `https://github.com/MaturionISMS/maturion-foreman-app`
2. Click: **Settings** tab (top navigation)
3. In the left sidebar, click: **Branches**

### Step 2: Add Branch Protection Rule for `main`

1. Under "Branch protection rules", click: **Add branch protection rule**
2. In "Branch name pattern", enter: `main`
3. Leave the page open for the next steps

### Step 3: Configure Pull Request Requirements

Enable these settings:

- [x] ✅ **Require a pull request before merging**
  - This ensures all changes go through PR review, even from admins
  
- [x] ✅ **Require approvals**: Set to **1**
  - CODEOWNERS files will require 1 approval from designated owners
  - Non-CODEOWNERS files can merge with 0 approvals (if all checks pass)
  
- [x] ✅ **Dismiss stale pull request approvals when new commits are pushed**
  - Ensures approvals are for the current version of the code
  
- [x] ✅ **Require review from Code Owners**
  - **CRITICAL**: This enforces the CODEOWNERS file
  - Without this, CODEOWNERS is advisory only
  - With this, PRs touching protected paths CANNOT merge without owner approval

### Step 4: Configure Status Check Requirements

1. Check: ✅ **Require status checks to pass before merging**
   - This enforces CI/CD validation

2. Check: ✅ **Require branches to be up to date before merging**
   - Ensures checks run on the latest code

3. In the **status checks** search box, add these required checks:
   - Type: `qiel-enforcement` → Click to add
   - Type: `qic-validation` → Click to add
   - Type: `deploy-validation` → Click to add
   - Type: `governance-validation` → Click to add

**Note**: These check names come from the workflow job names. They will appear in the search after at least one PR has run the workflows.

**If checks don't appear yet**:
- Open a test PR to trigger workflows
- Workflow runs will register the check names
- Come back to this page and add them

### Step 5: Configure Additional Protections

Enable these additional safeguards:

- [x] ✅ **Do not allow bypassing the above settings**
  - Prevents admins from bypassing protections
  - **CRITICAL**: Without this, admins can force merge

- [x] ❌ **Allow force pushes** (leave UNCHECKED)
  - Prevents rewriting history on main
  - Maintains audit trail

- [x] ❌ **Allow deletions** (leave UNCHECKED)
  - Prevents accidental deletion of main branch

### Step 6: Rules for Administrators (Optional)

You can optionally configure:

- [ ] **Include administrators**
  - If checked: Even admins must follow all rules above
  - If unchecked: Admins can bypass protections (for emergencies)
  - **Recommendation**: Leave UNCHECKED for emergency access
  - **Important**: Use emergency bypass sparingly and document usage

### Step 7: Save the Protection Rule

1. Scroll to the bottom of the page
2. Click: **Create** (or **Save changes** if editing existing rule)
3. Verify the rule appears under "Branch protection rules"

## Verification Steps

After configuring branch protection, verify it's working:

### Test 1: Verify CODEOWNERS Protection

1. Create a test branch: `git checkout -b test/codeowners`
2. Modify a protected file: `echo "# test" >> .github/workflows/qiel.yml`
3. Commit and push: `git commit -am "Test CODEOWNERS" && git push -u origin test/codeowners`
4. Open a PR to `main`
5. **Expected Result**: 
   - GitHub shows "Review required from code owners"
   - PR cannot be merged until you approve
6. Close the PR without merging
7. Delete the test branch

### Test 2: Verify Status Check Requirement

1. Create a test branch: `git checkout -b test/status-checks`
2. Make a breaking change (e.g., TypeScript error)
3. Commit and push
4. Open a PR to `main`
5. **Expected Result**:
   - CI checks run automatically
   - At least one check fails (due to breaking change)
   - GitHub shows "Required status checks must pass"
   - PR cannot be merged until checks pass
6. Close the PR without merging
7. Delete the test branch

### Test 3: Verify No Direct Push to Main

1. Checkout main: `git checkout main`
2. Make a small change: `echo "# test" >> README.md`
3. Try to push: `git commit -am "Test direct push" && git push`
4. **Expected Result**:
   - Push is rejected with message: "required status checks to pass before merging"
   - Or: "refusing to allow a Personal Access Token to create or update workflow"
5. Undo the commit: `git reset --hard HEAD~1`

If all three tests pass, branch protection is correctly configured! ✅

## Configuration Summary

After completing all steps, your `main` branch should have:

| Setting | Value | Status |
|---------|-------|--------|
| Require pull request | ✅ Enabled | Required |
| Require approvals | 1 | Required for CODEOWNERS |
| Dismiss stale approvals | ✅ Enabled | Recommended |
| Require code owner review | ✅ Enabled | **CRITICAL** |
| Require status checks | ✅ Enabled | **CRITICAL** |
| Require branches up to date | ✅ Enabled | Recommended |
| Required checks | qiel-enforcement, qic-validation, deploy-validation, governance-validation | **CRITICAL** |
| Do not allow bypassing | ✅ Enabled | **CRITICAL** |
| Allow force pushes | ❌ Disabled | Recommended |
| Allow deletions | ❌ Disabled | Recommended |

## Troubleshooting

### "Status checks not appearing in search"

**Problem**: Required status check names don't appear when searching

**Solution**: 
1. Create a test PR (can be from any branch)
2. Wait for CI workflows to run
3. After workflows complete, check names will be registered
4. Return to branch protection settings and add them

### "Cannot find CODEOWNERS teams"

**Problem**: `@MaturionISMS/admins` team doesn't exist

**Solution**:
1. Go to: `https://github.com/orgs/MaturionISMS/teams`
2. Create team: `admins`
3. Add yourself to the team
4. Update CODEOWNERS if needed

**Alternative**: Use your username instead:
- Replace `@MaturionISMS/admins` with `@YOUR_USERNAME` in CODEOWNERS

### "Required checks failing on every PR"

**Problem**: Status checks always fail, blocking all PRs

**Solution**:
1. Review the failed check logs
2. Fix underlying issues (e.g., linting errors, test failures)
3. Ensure CI workflows are properly configured
4. Do NOT disable required checks to "fix" this

### "Emergency: Need to merge without checks"

**Problem**: Critical hotfix needed, but checks are failing

**Solution** (Use sparingly):
1. Go to branch protection settings
2. Temporarily uncheck "Do not allow bypassing the above settings"
3. Temporarily uncheck "Include administrators" (if it was checked)
4. Merge the emergency PR
5. **IMMEDIATELY re-enable both settings**
6. Create a follow-up issue to fix the underlying problem
7. Document the emergency override in governance memory

## Post-Configuration Actions

After configuring branch protection:

1. **Update Governance Memory**
   - Record that branch protection is active
   - Document the configuration date
   - List all protected checks

2. **Notify Team**
   - Inform developers that `main` is now protected
   - Share this guide for reference
   - Explain the CODEOWNERS workflow

3. **Test the System**
   - Run the verification tests above
   - Open a test PR touching a protected file
   - Verify approval is required

4. **Monitor for Issues**
   - Watch for developers encountering blocks
   - Address questions about the process
   - Refine documentation based on feedback

## Maintenance

### Updating Required Checks

If you add new CI workflows that should be required:

1. Go to: Repository Settings > Branches
2. Click: **Edit** on the `main` protection rule
3. Scroll to: "Require status checks to pass before merging"
4. Search for the new check name
5. Click to add it to required checks
6. Click: **Save changes**

### Reviewing Protection Effectiveness

Periodically review:
- Are required checks passing consistently?
- Are CODEOWNERS approvals being granted appropriately?
- Are there too many false positives (checks failing unnecessarily)?
- Do protection rules need adjustment?

## Additional Resources

- **GitHub Docs**: [About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- **GitHub Docs**: [About code owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- **CODEOWNERS File**: `.github/CODEOWNERS` in this repository
- **Guardrail Sandbox**: `docs/governance/GUARDRAIL_SANDBOX.md`

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review GitHub documentation
3. Test with a minimal PR to isolate the issue
4. Document the problem for future reference

---

**Remember**: These settings are the foundation of the Non-Bypassable Governance Sandbox. Without proper branch protection, the entire governance framework can be bypassed.

**Take your time**, follow each step carefully, and verify the configuration is working as expected. ✅
