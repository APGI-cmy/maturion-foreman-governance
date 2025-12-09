# Guardrail Sandbox - Non-Bypassable Governance

## Purpose

This document defines the **Non-Bypassable Governance Sandbox**, a comprehensive system of safeguards that prevent Foreman from removing or bypassing critical quality and governance mechanisms.

**Goal**: Make it impossible for Foreman to remove QIEL, deployment checks, or core governance files without explicit human approval.

## Philosophy

> **"Quality gates are not suggestions—they are walls."**

The Guardrail Sandbox ensures that:
- **Governance is supreme**: No agent, including Foreman, can circumvent quality controls
- **Humans retain final authority**: Critical infrastructure requires human approval
- **Automation serves governance**: CI/CD enforces, not replaces, human oversight
- **Trust is verified**: Every change is validated, every safeguard is protected

## What Foreman Cannot Change Autonomously

### 1. GitHub Actions Workflows

**Protected Path**: `.github/workflows/**`

**Protected Files**:
- `qiel.yml` - Quality Integrity Enforcement Layer
- `qic.yml` - Quality Integrity Contract (core QA suite)
- `deploy-check.yml` - Production deployment validation
- `foreman-governance.yml` - Governance policy validation
- `qiel-config-validation.yml` - QIEL configuration alignment check
- Any other workflow files

**Protection Mechanism**:
- CODEOWNERS requires `@MaturionISMS/admins` approval
- Foreman can create PRs modifying workflows
- Foreman CANNOT merge these PRs without human approval
- GitHub blocks merge until approval is granted

**Why Protected**:
- Workflows enforce quality gates
- Removing or weakening workflows bypasses governance
- CI/CD is the enforcement layer for all rules
- Modifying workflows = modifying the referee

### 2. Governance Documentation

**Protected Path**: `docs/governance/**`

**Protected Files**:
- `GUARDRAIL_SANDBOX.md` (this file)
- `DRIFT_DETECTION_GUIDE.md`
- Any future governance documentation

**Protection Mechanism**:
- CODEOWNERS requires `@MaturionISMS/admins` approval
- Documentation changes require human review
- Ensures governance rules remain intact

**Why Protected**:
- Governance docs define Foreman's boundaries
- Changing docs = changing the rules
- Human oversight ensures governance evolution is intentional

### 3. Foreman Governance Rules

**Protected Path**: `foreman/governance/**`

**Protected Files**:
- `governance-model.md` - Autonomy framework
- `deployment-governance.md` - Deployment rules and approval process
- `quality-integrity-contract.md` - QA validation requirements
- `governance-supremacy-rule.md` - GSR enforcement
- `approval-rules.md` - Human approval workflows
- `error-recovery.md` - Incident response
- `memory-lifecycle-governance.md` - Memory management rules
- `secrets-management.md` - Security rules
- All other governance files

**Protection Mechanism**:
- CODEOWNERS requires `@MaturionISMS/admins` approval
- Governance changes must be deliberate and reviewed

**Why Protected**:
- These files define Foreman's operational constraints
- Modifying them = rewriting Foreman's constitution
- Humans must approve changes to the governance framework

### 4. Foreman Constitutional Files

**Protected Files**:
- `foreman/autonomy-rules.md` - Autonomy boundaries and rules
- `foreman/true-north-architecture.md` - Architectural principles

**Protection Mechanism**:
- CODEOWNERS requires `@MaturionISMS/admins` approval
- Constitutional changes require explicit human approval

**Why Protected**:
- These are Foreman's foundational documents
- They define "True North" - the immutable principles
- Changing them changes Foreman's identity

### 5. CODEOWNERS File Itself

**Protected Path**: `.github/CODEOWNERS`

**Protection Mechanism**:
- Self-referential protection: CODEOWNERS protects itself
- Requires `@MaturionISMS/admins` approval to modify
- Cannot be removed or weakened without human consent

**Why Protected**:
- CODEOWNERS is the enforcement mechanism
- Removing it removes all protections
- Must be protected to protect everything else

## What Foreman CAN Do

Despite these protections, Foreman retains significant autonomy:

### ✅ Allowed Actions

1. **Propose Changes**: Foreman can create PRs modifying protected files
2. **Execute Builds**: Full autonomy to build, test, and validate code
3. **Create Issues**: Report governance violations or needed changes
4. **Run CI Checks**: Execute all workflows on every PR
5. **Modify Application Code**: Full autonomy over non-protected code
6. **Deploy (with approval)**: Initiate deployment process (human approves)

### ❌ Blocked Actions

1. **Merge Protected PRs**: Cannot merge changes to protected paths without approval
2. **Bypass CI Checks**: Cannot disable or skip required status checks
3. **Modify Branch Protection**: Cannot alter GitHub repository settings
4. **Remove Safeguards**: Cannot delete governance files or workflows
5. **Weaken Quality Gates**: Cannot reduce QA thresholds or requirements

## Mandatory CI Checks

### Required Status Checks for Main Branch

All PRs to `main` must pass these checks before merging:

#### 1. QIEL - Quality Integrity Enforcement Layer

**Workflow**: `.github/workflows/qiel.yml`

**What It Checks**:
- Type safety (TypeScript compilation)
- Code quality (linting)
- Build integrity (production build succeeds)
- Runtime validation
- Deployment simulation
- QA-of-QA meta-review

**Enforcement**: GitHub blocks merge if QIEL fails

#### 2. QIC - Quality Integrity Contract

**Workflow**: `.github/workflows/qic.yml`

**What It Checks**:
- ESLint (strict mode, zero errors)
- TypeScript type check (zero errors)
- All test suites (100% pass rate)

**Enforcement**: GitHub blocks merge if QIC fails

#### 3. Deploy Check - Production Validation

**Workflow**: `.github/workflows/deploy-check.yml`

**What It Checks**:
- Production build succeeds
- Build artifacts are valid
- Environment configuration is present
- Production type check passes

**Enforcement**: GitHub blocks merge if deploy check fails

#### 4. Foreman Governance - Policy Validation

**Workflow**: `.github/workflows/foreman-governance.yml`

**What It Checks**:
- Governance file structure intact
- Workflow files present
- No secrets in code
- CODEOWNERS properly configured

**Enforcement**: GitHub blocks merge if governance check fails

### Status Check Philosophy

> **"CI checks are not gatekeepers—they are guardians."**

- **Non-Negotiable**: All checks must pass, no exceptions
- **Automated**: No human discretion in enforcement
- **Comprehensive**: Cover quality, security, and governance
- **Consistent**: Same checks in local and CI environments

## Branch Protection Configuration

### Required Settings for `main` Branch

These settings must be configured manually by Johan in the GitHub repository settings:

#### General Protection Rules

- ✅ **Require a pull request before merging**: YES
- ✅ **Require approvals**: 0 (for non-protected files), 1 (for CODEOWNERS files)
- ✅ **Dismiss stale pull request approvals when new commits are pushed**: YES
- ✅ **Require review from Code Owners**: YES
- ✅ **Require status checks to pass before merging**: YES

#### Required Status Checks

Add these as required checks (exact names from workflows):

- `QIEL - Quality Integrity Enforcement / qiel-enforcement`
- `QIC - Quality Integrity Contract / qic-validation`
- `Deploy Check - Production Validation / deploy-validation`
- `Foreman Governance - Policy Validation / governance-validation`

#### Additional Protection

- ✅ **Require branches to be up to date before merging**: YES
- ✅ **Do not allow bypassing the above settings**: YES
- ❌ **Allow force pushes**: NO
- ❌ **Allow deletions**: NO

### How to Configure (Step-by-Step for Johan)

1. **Navigate to Repository Settings**
   - Go to: `https://github.com/MaturionISMS/maturion-foreman-app/settings`
   - Click: "Branches" in the left sidebar

2. **Add Branch Protection Rule**
   - Click: "Add branch protection rule"
   - Branch name pattern: `main`

3. **Configure Protection Rules**
   - Check: "Require a pull request before merging"
   - Check: "Require review from Code Owners"
   - Check: "Require status checks to pass before merging"
   - Check: "Require branches to be up to date before merging"

4. **Add Required Status Checks**
   - In "Status checks that are required", search for and add:
     - `qiel-enforcement`
     - `qic-validation`
     - `deploy-validation`
     - `governance-validation`

5. **Lock Down Bypasses**
   - Check: "Do not allow bypassing the above settings"
   - Uncheck: "Allow force pushes"
   - Uncheck: "Allow deletions"

6. **Save Protection Rule**
   - Click: "Create" or "Save changes"

## Token Permission Requirements

### Foreman's GitHub Token

Foreman's GitHub token (used via GitHub App or PAT) must have:

**Required Permissions**:
- `repo` - Read and write access to code
- `contents: write` - Create branches and commits
- `pull_requests: write` - Create and update PRs
- `issues: write` - Create and update issues

**Prohibited Permissions**:
- ❌ **Administration**: Cannot modify repository settings
- ❌ **Actions**: Cannot modify workflow files (blocked by CODEOWNERS anyway)
- ❌ **Branch Protection**: Cannot change protection rules

### Why This Matters

- Foreman can create PRs but cannot merge them if they touch protected paths
- Foreman can create branches but cannot bypass branch protection
- Foreman can execute workflows but cannot modify them
- **Humans retain ultimate control** through GitHub repository settings

## How Protection Works in Practice

### Scenario 1: Foreman Tries to Modify QIEL Workflow

1. Foreman creates a branch: `foreman/update-qiel-workflow`
2. Foreman modifies: `.github/workflows/qiel.yml`
3. Foreman commits and pushes changes
4. Foreman opens PR: "Update QIEL workflow configuration"
5. **GitHub Actions**:
   - All CI checks run automatically
   - CODEOWNERS detects protected path
   - GitHub requests review from `@MaturionISMS/admins`
6. **Merge Attempt**:
   - Foreman attempts merge (or PR is auto-merge enabled)
   - **GitHub blocks merge**: "Review required from code owners"
7. **Johan Reviews**:
   - Johan receives notification
   - Reviews changes to `.github/workflows/qiel.yml`
   - Either approves (merge allowed) or requests changes (merge blocked)

**Result**: Foreman cannot modify QIEL without Johan's explicit approval.

### Scenario 2: Foreman Tries to Remove CODEOWNERS

1. Foreman creates a branch: `foreman/remove-codeowners`
2. Foreman deletes: `.github/CODEOWNERS`
3. Foreman commits and pushes changes
4. Foreman opens PR: "Remove CODEOWNERS file"
5. **GitHub Actions**:
   - Foreman Governance workflow runs
   - Detects missing CODEOWNERS file
   - **Fails governance validation check**
6. **Merge Attempt**:
   - GitHub blocks merge: "Required status check 'governance-validation' failed"
   - Additionally, CODEOWNERS (before deletion) requires approval
7. **Cannot Merge**:
   - Governance check fails (blocks merge)
   - CODEOWNERS approval required (blocks merge)

**Result**: Double protection prevents removal of safeguards.

### Scenario 3: Foreman Modifies Application Code

1. Foreman creates a branch: `foreman/add-feature`
2. Foreman modifies: `app/dashboard/page.tsx` (not protected)
3. Foreman commits and pushes changes
4. Foreman opens PR: "Add new dashboard feature"
5. **GitHub Actions**:
   - QIEL runs: ✅ Passes
   - QIC runs: ✅ Passes
   - Deploy Check runs: ✅ Passes
   - Governance runs: ✅ Passes
   - CODEOWNERS: No review required (not a protected path)
6. **Merge Attempt**:
   - All status checks passed
   - No CODEOWNERS review required
   - **Merge succeeds automatically**

**Result**: Foreman has full autonomy over non-protected application code.

## Governance Memory Integration

### Recording Sandbox Activation

The Guardrail Sandbox is recorded in Foreman's governance memory:

```json
{
  "governanceEvent": "guardrail_sandbox_activated",
  "timestamp": "2024-12-09T09:00:00Z",
  "protectedPaths": [
    ".github/workflows/**",
    "docs/governance/**",
    "foreman/governance/**",
    "foreman/autonomy-rules.md",
    "foreman/true-north-architecture.md",
    ".github/CODEOWNERS"
  ],
  "requiredChecks": [
    "qiel-enforcement",
    "qic-validation",
    "deploy-validation",
    "governance-validation"
  ],
  "status": "active",
  "notes": "Non-bypassable governance sandbox prevents removal of quality gates and governance files"
}
```

### Memory Rules

1. **Sandbox is permanent**: Cannot be deactivated without human intervention
2. **Changes are audited**: All modifications to protected files are logged
3. **Violations are reported**: Attempts to bypass are flagged in governance memory

## Emergency Override (Johan Only)

### When Human Override is Necessary

In extreme cases (emergency fixes, critical vulnerabilities), Johan can:

1. **Temporarily Disable Branch Protection**:
   - GitHub Settings > Branches > Edit `main` rule
   - Uncheck required protections
   - Merge emergency PR
   - **Immediately re-enable protections**

2. **Bypass CODEOWNERS**:
   - Include admin team in PR approval
   - Admin approval overrides CODEOWNERS
   - Use only for emergencies

3. **Force Merge (Not Recommended)**:
   - Repository admin can force merge
   - Should be avoided except in dire circumstances
   - Must be documented in governance memory

### Emergency Protocol

If override is used:

1. Document reason in PR description
2. Log event in governance memory
3. Create follow-up issue to address properly
4. Re-enable all protections immediately after emergency

## Verification Checklist

Use this checklist to verify the Guardrail Sandbox is active:

### Files and Configuration

- [ ] `.github/CODEOWNERS` file exists and protects critical paths
- [ ] `.github/workflows/qiel.yml` workflow exists
- [ ] `.github/workflows/qic.yml` workflow exists
- [ ] `.github/workflows/deploy-check.yml` workflow exists
- [ ] `.github/workflows/foreman-governance.yml` workflow exists
- [ ] `docs/governance/GUARDRAIL_SANDBOX.md` (this file) exists

### GitHub Repository Settings (Manual - Johan)

- [ ] Branch protection enabled for `main`
- [ ] "Require pull request before merging" is enabled
- [ ] "Require review from Code Owners" is enabled
- [ ] "Require status checks to pass before merging" is enabled
- [ ] Required status checks include: `qiel-enforcement`, `qic-validation`, `deploy-validation`, `governance-validation`
- [ ] "Do not allow bypassing the above settings" is enabled
- [ ] "Allow force pushes" is disabled
- [ ] "Allow deletions" is disabled

### Foreman Token Permissions

- [ ] Foreman has `repo`, `contents: write`, `pull_requests: write`, `issues: write`
- [ ] Foreman does NOT have `administration` permission
- [ ] Foreman does NOT have ability to modify branch protection rules

### Governance Memory

- [ ] Guardrail sandbox activation recorded in governance memory
- [ ] Protected paths documented in memory
- [ ] Required checks documented in memory

## Philosophy and Principles

### The Guardrail Sandbox Philosophy

> **"Autonomy is earned through constraint."**

The Guardrail Sandbox embodies these principles:

1. **Trust, but Verify**: Foreman is autonomous, but governance is immutable
2. **Automation with Accountability**: Machines execute, humans authorize governance changes
3. **Defense in Depth**: Multiple layers (CODEOWNERS, branch protection, CI checks)
4. **Fail Secure**: If protection fails, default to requiring approval
5. **Governance is Supreme**: No agent can override the governance framework

### Why This Matters

Without the Guardrail Sandbox:
- ❌ Foreman could remove QIEL to make builds "pass"
- ❌ Quality gates could be weakened or bypassed
- ❌ Governance rules could be rewritten without oversight
- ❌ CI/CD could be disabled to speed up development
- ❌ The entire quality framework could collapse

With the Guardrail Sandbox:
- ✅ QIEL is permanent and non-bypassable
- ✅ Quality gates are enforced by both automation and structure
- ✅ Governance changes require deliberate human approval
- ✅ CI/CD is protected infrastructure
- ✅ The quality framework is self-sustaining

## Summary

The **Non-Bypassable Governance Sandbox** ensures that:

1. **QIEL, QIC, and deploy checks run on every PR** and cannot be removed
2. **Branch protection requires all checks to pass** before merge
3. **Foreman's token cannot alter branch protection** or repository settings
4. **Changes to workflows, governance docs, and constitutional files require Johan's approval**
5. **CODEOWNERS file protects itself** from unauthorized modification
6. **Governance memory records the sandbox as active** and permanent

**Result**: Foreman has full autonomy to build and iterate, but the quality gates and governance framework are immutable walls that cannot be bypassed, removed, or weakened without explicit human approval.

---

*This guardrail sandbox is the foundation of trustworthy automation: fast, autonomous development constrained by immutable quality standards.*
