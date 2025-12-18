# GitHub Mutation Architecture

**Version**: 1.0.0  
**Status**: Authoritative  
**Authority**: True North Compliance - Architecture & QA Evolution  
**Applies To**: Foreman, All Builder Agents, GitHub Operations  

---

## Purpose

This document defines the **authoritative architectural blueprint** that enables Foreman to perform GitHub mutations (issue management, PR operations, branch protections, governance metadata) while maintaining strict separation of duties between Foreman and Builder agents.

This architecture ensures:

1. **Foreman-Exclusive Mutation Boundary** - Clear definition of what operations Foreman can perform vs. Builder agents
2. **Governance Rails** - All mutations are logged, validated, and governed
3. **Failure Recovery** - Predictable behavior when GitHub operations fail
4. **True North Alignment** - All operations respect QA governance and architectural principles
5. **One-Build Compliance** - GitHub mutations support, not bypass, build integrity

---

## Core Principles

### 1. Foreman is the GitHub Orchestrator, Not the Code Writer

**Foreman's GitHub Authority**:
- ✅ Close issues
- ✅ Comment on issues
- ✅ Label issues
- ✅ Create PRs
- ✅ Update PR metadata (title, description, labels, reviewers, assignees)
- ✅ Update branch protections
- ✅ Apply governance metadata

**Foreman CANNOT**:
- ❌ Write code (only Builder agents write code)
- ❌ Bypass QA or governance checks
- ❌ Merge PRs (GitHub repository rules enforce this)
- ❌ Delete issues or PRs without governance approval
- ❌ Modify code content directly (delegated to Builders)

### 2. Segregation of Duties

```
┌──────────────────────────────────────────────┐
│       FOREMAN (Orchestrator)                 │
│  - GitHub issue/PR lifecycle management      │
│  - PR assembly and metadata                  │
│  - Governance enforcement                    │
│  - Branch protection rules                   │
└──────────────┬───────────────────────────────┘
               │ delegates
               ▼
┌──────────────────────────────────────────────┐
│       BUILDER AGENTS (Code Writers)          │
│  - UI Builder: Component code                │
│  - API Builder: Endpoint code                │
│  - Schema Builder: Type definitions          │
│  - Integration Builder: External APIs        │
│  - QA Builder: Test generation               │
└──────────────────────────────────────────────┘
```

**Key Boundary**: Foreman manages GitHub _resources and metadata_; Builders manage _code content_.

### 3. Governance Supremacy Override

All GitHub mutations are subject to the **Governance Supremacy Rule (GSR)**:

- **GSR-GM-1**: PR creation is BLOCKED if ANY QA check fails (no partial passes)
- **GSR-GM-2**: Issue closure is BLOCKED if linked tasks have incomplete QA
- **GSR-GM-3**: Branch protection changes require governance approval
- **GSR-GM-4**: All mutations are logged to Governance Memory
- **GSR-GM-5**: Failed mutations trigger error recovery, not silent failures

---

## Foreman Mutation Boundary

### Mutation Categories

#### Category 1: Issue Lifecycle (Foreman-Exclusive)

**Operations**:
- `closeIssue(owner, repo, issueNumber, reason)` - Close an issue with a reason
- `reopenIssue(owner, repo, issueNumber, reason)` - Reopen a closed issue
- `commentOnIssue(owner, repo, issueNumber, body)` - Add a comment to an issue
- `labelIssue(owner, repo, issueNumber, labels)` - Apply labels to an issue
- `assignIssue(owner, repo, issueNumber, assignees)` - Assign users to an issue

**Governance Rails**:
- Issues can only be closed if:
  - All linked PRs are merged OR
  - Issue is marked as `wontfix`, `duplicate`, or `invalid` OR
  - Governance approval is obtained for closure
- All closures must include a reason comment
- Issue comments MUST NOT contain secrets (validated via secrets-detection)

**Example**:
```typescript
// Valid: Close issue after PR merge
await foreman.closeIssue('MaturionISMS', 'app', 42, 
  'Closed via PR #123. All QA passed.')

// BLOCKED: Close issue with failing QA
// This will throw GovernanceViolationError
await foreman.closeIssue('MaturionISMS', 'app', 42, 
  'Closed manually.') // ❌ No linked PR, QA incomplete
```

#### Category 2: Pull Request Lifecycle (Foreman-Exclusive)

**Operations**:
- `createPR(owner, repo, head, base, title, body, metadata)` - Create a PR
- `updatePR(owner, repo, prNumber, updates)` - Update PR title, description, etc.
- `addPRLabels(owner, repo, prNumber, labels)` - Apply labels to a PR
- `requestPRReview(owner, repo, prNumber, reviewers)` - Request reviewers
- `assignPR(owner, repo, prNumber, assignees)` - Assign users to a PR
- `commentOnPR(owner, repo, prNumber, body)` - Add a comment to a PR

**Governance Rails**:
- PRs can only be created if:
  - **100% QA passes** (Governance Supremacy Rule)
  - QA-of-QA meta-review is complete
  - Compliance checks pass (secrets detection, org validation)
  - Build sequence is complete
- PR body MUST include:
  - QA summary (pass/fail/blocker count)
  - Compliance summary
  - Linked issues (if applicable)
  - Build sequence ID
  - Governance metadata

**PR Metadata Schema**:
```typescript
interface PRMetadata {
  buildSequenceId: string
  qaResults: {
    passed: boolean
    totalChecks: number
    passedChecks: number
    blockers: string[]
  }
  complianceResults: {
    passed: boolean
    secretsDetected: boolean
    orgValidated: boolean
  }
  linkedIssues: number[]
  builders: string[]
  governanceTags: string[]
}
```

**Example**:
```typescript
// Valid: Create PR after successful build
await foreman.createPR('MaturionISMS', 'app', 'feature/dashboard', 'main', 
  'feat: Add dashboard component',
  prBodyWithGovernanceMetadata,
  {
    buildSequenceId: 'seq_123',
    qaResults: { passed: true, totalChecks: 10, passedChecks: 10, blockers: [] },
    complianceResults: { passed: true, secretsDetected: false, orgValidated: true },
    linkedIssues: [42],
    builders: ['ui-builder'],
    governanceTags: ['qa-approved', 'compliance-approved']
  }
)

// BLOCKED: Create PR with failing QA
// This will throw GovernanceViolationError
await foreman.createPR('MaturionISMS', 'app', 'feature/broken', 'main',
  'feat: Broken feature',
  body,
  { qaResults: { passed: false, ... } } // ❌ QA failed
)
```

#### Category 3: Branch Protection (Foreman-Exclusive, Requires Governance Approval)

**Operations**:
- `setBranchProtection(owner, repo, branch, rules)` - Set branch protection rules
- `updateBranchProtection(owner, repo, branch, updates)` - Update protection rules
- `removeBranchProtection(owner, repo, branch)` - Remove branch protection

**Governance Rails**:
- Branch protection changes require:
  - Governance approval (admin or governance-owner role)
  - Governance Memory log entry
  - Reason and audit trail
- Protected branches MUST enforce:
  - Required status checks
  - Required reviews (if applicable)
  - No force pushes
  - No deletions

**Example**:
```typescript
// Valid: Update branch protection with governance approval
await foreman.setBranchProtection('MaturionISMS', 'app', 'main', {
  required_status_checks: { strict: true, contexts: ['QA', 'Compliance'] },
  enforce_admins: true,
  required_pull_request_reviews: { required_approving_review_count: 1 },
  restrictions: null
}, { governanceApproval: 'admin-user-id', reason: 'Enforce QA gates' })

// BLOCKED: Remove branch protection without approval
await foreman.removeBranchProtection('MaturionISMS', 'app', 'main')
// ❌ Throws GovernanceApprovalRequiredError
```

#### Category 4: Governance Metadata (Foreman-Exclusive)

**Operations**:
- `applyGovernanceLabels(owner, repo, issueOrPR, labels)` - Apply governance labels
- `recordGovernanceEvent(owner, repo, eventType, metadata)` - Log governance event
- `tagWithQAStatus(owner, repo, prNumber, qaStatus)` - Tag PR with QA status
- `tagWithComplianceStatus(owner, repo, prNumber, complianceStatus)` - Tag PR with compliance

**Governance Labels**:
- `qa-approved` - 100% QA passed
- `qa-blocked` - QA failures detected
- `compliance-approved` - All compliance checks passed
- `compliance-blocked` - Compliance violations detected
- `governance-approved` - Governance review complete
- `awaiting-governance` - Pending governance review
- `autonomous-build` - Created via autonomous mode
- `manual-approval` - Created via manual approval mode

**Example**:
```typescript
// Apply QA status label
await foreman.tagWithQAStatus('MaturionISMS', 'app', 123, 'approved')
// Adds label: qa-approved

// Record governance event
await foreman.recordGovernanceEvent('MaturionISMS', 'app', 'pr_created', {
  prNumber: 123,
  buildSequenceId: 'seq_123',
  qaStatus: 'approved',
  complianceStatus: 'approved',
  autonomousMode: true
})
```

---

## Forbidden Operations for Builder Agents

Builder agents are **NEVER** permitted to:

1. **GitHub API Operations**
   - ❌ Create, update, or close issues
   - ❌ Create, update, or merge PRs
   - ❌ Add comments to issues or PRs
   - ❌ Apply labels or assignees
   - ❌ Modify branch protections

2. **Governance Operations**
   - ❌ Override QA results
   - ❌ Bypass compliance checks
   - ❌ Modify governance rules at runtime
   - ❌ Delete governance logs

3. **Orchestration Operations**
   - ❌ Trigger other builders directly (must go through Foreman dispatch)
   - ❌ Mark build sequences as complete
   - ❌ Create build reports

**Enforcement**: Builder agents operate in sandboxed environments without GitHub App credentials. Only Foreman has GitHub API access.

---

## GitHub Mutation Event Schema

All GitHub mutations are logged as **GitHub Mutation Events** in Governance Memory.

### Event Schema

```typescript
interface GitHubMutationEvent {
  id: string
  timestamp: string
  eventType: 
    | 'issue_closed'
    | 'issue_reopened'
    | 'issue_commented'
    | 'issue_labeled'
    | 'issue_assigned'
    | 'pr_created'
    | 'pr_updated'
    | 'pr_labeled'
    | 'pr_commented'
    | 'pr_reviewed'
    | 'branch_protection_updated'
    | 'governance_metadata_applied'
  
  actor: 'foreman' | 'human' | 'system'
  
  target: {
    owner: string
    repo: string
    resourceType: 'issue' | 'pr' | 'branch'
    resourceId: number | string
  }
  
  mutation: {
    operation: string
    parameters: Record<string, any>
    result: 'success' | 'failure' | 'blocked'
    blockReason?: string
  }
  
  governance: {
    qaStatus?: 'passed' | 'failed' | 'skipped'
    complianceStatus?: 'passed' | 'failed' | 'skipped'
    approvalRequired: boolean
    approvedBy?: string
    governanceTags: string[]
  }
  
  metadata: {
    buildSequenceId?: string
    organisationId?: string
    autonomousMode: boolean
    errorDetails?: any
  }
}
```

### Event Types

#### Issue Events
- `issue_closed` - Issue closed by Foreman
- `issue_reopened` - Issue reopened
- `issue_commented` - Comment added to issue
- `issue_labeled` - Labels applied to issue

#### PR Events
- `pr_created` - PR created after build completion
- `pr_updated` - PR metadata updated
- `pr_labeled` - Labels applied to PR
- `pr_commented` - Comment added to PR

#### Branch Events
- `branch_protection_updated` - Branch protection rules changed

#### Governance Events
- `governance_metadata_applied` - Governance tags/labels applied

---

## Governance Rails Mapping

### Rail 1: QA Enforcement

**Applies To**: `pr_created`, `issue_closed`, `governance_metadata_applied`

**Rules**:
1. PRs cannot be created unless 100% QA passes
2. Issues cannot be closed if linked PRs have failing QA
3. QA status labels must accurately reflect current state

**Implementation**:
```typescript
async function createPR(config: PRConfig): Promise<PR> {
  // Rail 1: Validate QA
  const qaResult = await validateQA(config.buildSequenceId)
  if (!qaResult.passed) {
    throw new GovernanceViolationError(
      `Cannot create PR: QA failed (${qaResult.passedChecks}/${qaResult.totalChecks})`
    )
  }
  
  // Proceed with PR creation
  const pr = await githubClient.createPR(config)
  
  // Record governance event
  await recordGovernanceEvent('pr_created', {
    prNumber: pr.number,
    qaStatus: 'passed',
    qaResults: qaResult
  })
  
  return pr
}
```

### Rail 2: Compliance Enforcement

**Applies To**: `pr_created`, `pr_updated`, `issue_commented`, `pr_commented`

**Rules**:
1. No secrets in PR bodies or comments
2. Organisation ID validation required
3. Audit trail for all mutations

**Implementation**:
```typescript
async function commentOnIssue(owner: string, repo: string, issueNumber: number, body: string) {
  // Rail 2: Validate compliance
  const secretsDetected = await detectSecrets(body)
  if (secretsDetected.found) {
    throw new ComplianceViolationError(
      `Cannot post comment: Secrets detected (${secretsDetected.patterns.join(', ')})`
    )
  }
  
  // Rail 2: Validate org
  const orgValidated = await validateOrganisation(owner)
  if (!orgValidated) {
    throw new ComplianceViolationError(
      `Cannot post comment: Organisation ${owner} not validated`
    )
  }
  
  // Proceed with comment
  const comment = await githubClient.createComment(owner, repo, issueNumber, body)
  
  // Record governance event
  await recordGovernanceEvent('issue_commented', {
    issueNumber,
    complianceStatus: 'passed',
    secretsDetected: false,
    orgValidated: true
  })
  
  return comment
}
```

### Rail 3: Approval Workflow

**Applies To**: `branch_protection_updated`, high-risk operations

**Rules**:
1. Branch protection changes require governance approval
2. Approval must be from admin or governance-owner role
3. Approval recorded in Governance Memory

**Implementation**:
```typescript
async function updateBranchProtection(
  owner: string, 
  repo: string, 
  branch: string, 
  rules: BranchProtectionRules,
  approval: GovernanceApproval
) {
  // Rail 3: Validate approval
  if (!approval || !approval.approvedBy) {
    throw new GovernanceApprovalRequiredError(
      `Cannot update branch protection: Governance approval required`
    )
  }
  
  const approverRole = await getApproverRole(approval.approvedBy)
  if (!['admin', 'governance-owner'].includes(approverRole)) {
    throw new GovernanceApprovalRequiredError(
      `Cannot update branch protection: Insufficient permissions (${approverRole})`
    )
  }
  
  // Proceed with update
  await githubClient.updateBranchProtection(owner, repo, branch, rules)
  
  // Record governance event
  await recordGovernanceEvent('branch_protection_updated', {
    branch,
    rules,
    approvedBy: approval.approvedBy,
    reason: approval.reason
  })
}
```

### Rail 4: Mutation Logging

**Applies To**: ALL GitHub mutations

**Rules**:
1. Every mutation creates a Governance Memory entry
2. Success, failure, and blocked operations are logged
3. Logs include full context (actor, target, governance state)

**Implementation**:
```typescript
async function recordMutation(event: GitHubMutationEvent) {
  await governanceMemory.recordEvent({
    type: 'github_mutation',
    event,
    timestamp: new Date().toISOString(),
    severity: event.mutation.result === 'failure' ? 'high' : 'low'
  })
}
```

---

## Failure Recovery Behavior

### Failure Categories

#### Category A: Transient Failures (Retry)

**Scenarios**:
- Network timeout
- Rate limit exceeded
- GitHub API temporarily unavailable

**Recovery**:
1. Log failure with `transient_failure` tag
2. Retry with exponential backoff (max 3 retries)
3. If all retries fail, escalate to Category B

**Implementation**:
```typescript
async function retryMutation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let attempt = 0
  while (attempt < maxRetries) {
    try {
      return await operation()
    } catch (error) {
      if (!isTransientError(error)) {
        throw error // Not transient, escalate
      }
      
      attempt++
      const delay = Math.pow(2, attempt) * 1000 // Exponential backoff
      await sleep(delay)
    }
  }
  
  throw new MutationFailureError('Max retries exceeded for transient failure')
}
```

#### Category B: Governance Violations (Block)

**Scenarios**:
- QA failed
- Compliance check failed
- Missing governance approval
- Secrets detected

**Recovery**:
1. Log failure with `governance_violation` tag
2. Block operation immediately (no retry)
3. Return error to caller with clear reason
4. Create governance incident in Governance Memory

**Implementation**:
```typescript
function handleGovernanceViolation(violation: GovernanceViolation) {
  // Log to Governance Memory
  recordGovernanceIncident({
    type: 'mutation_blocked',
    reason: violation.reason,
    operation: violation.operation,
    target: violation.target,
    timestamp: new Date().toISOString()
  })
  
  // Block operation
  throw new GovernanceViolationError(violation.reason)
}
```

#### Category C: Permanent Failures (Escalate)

**Scenarios**:
- Resource not found (404)
- Permission denied (403)
- Invalid parameters (422)
- GitHub API errors (5xx with no retry)

**Recovery**:
1. Log failure with `permanent_failure` tag
2. Do NOT retry
3. Record mutation event with `failure` status
4. Escalate to human if critical operation

**Implementation**:
```typescript
async function handlePermanentFailure(error: GitHubAPIError, context: MutationContext) {
  // Log mutation failure
  await recordMutation({
    ...context,
    mutation: {
      operation: context.operation,
      parameters: context.parameters,
      result: 'failure'
    },
    metadata: {
      errorDetails: {
        code: error.code,
        message: error.message,
        status: error.status
      }
    }
  })
  
  // Escalate if critical
  if (context.critical) {
    await escalateToHuman({
      reason: 'Critical GitHub mutation failed',
      error,
      context
    })
  }
  
  throw error
}
```

### Rollback Strategy

For operations that support rollback:

```typescript
interface MutationRollback {
  operation: string
  rollbackFn: () => Promise<void>
  executed: boolean
}

async function executeMutationWithRollback(
  mutation: () => Promise<any>,
  rollback: MutationRollback
) {
  try {
    const result = await mutation()
    rollback.executed = true
    return result
  } catch (error) {
    if (rollback.executed) {
      // Mutation failed after execution, attempt rollback
      try {
        await rollback.rollbackFn()
      } catch (rollbackError) {
        // Rollback failed, escalate
        await escalateToHuman({
          reason: 'Mutation and rollback both failed',
          mutationError: error,
          rollbackError
        })
      }
    }
    throw error
  }
}
```

**Rollback Support**:
- ✅ `labelIssue` → Remove labels (requires `issues: write` permission)
- ✅ `commentOnIssue` → Delete comment (requires `issues: write` permission, only for bot-authored comments)
- ✅ `createPR` → Close PR (requires `pull_requests: write` permission)
- ❌ `closeIssue` → Cannot automatically rollback (use `reopenIssue` manually with governance approval)
- ❌ `branch_protection_updated` → Requires manual governance review and approval to revert

---

## Integration with True North and One-Build

### True North Alignment

This architecture aligns with True North principles:

1. **Quality is Enforced by Systems, Not Humans**
   - GitHub mutations are governed by automated QA and compliance checks
   - No human intervention required for standard operations
   - Systematic validation replaces subjective judgment

2. **Governance Through Contracts**
   - All mutations are subject to governance contracts (QA, compliance, approval)
   - Violations block progress automatically
   - Contracts are enforced via code, not policy documents

3. **Architecture Evolves Through Memory**
   - All mutations logged to Governance Memory
   - Failure patterns analyzed to improve architecture
   - Continuous learning from mutation events

4. **Autonomy Within Boundaries**
   - Foreman operates autonomously within governance boundaries
   - Mutations require no human approval in autonomous mode (unless governance dictates)
   - Quality gates are non-negotiable

5. **Governance Supremacy Rule (GSR)**
   - GitHub mutations enforce GSR: 100% QA required
   - No partial passes, no exceptions
   - Architecture rules override implementation details

### One-Build Compliance

GitHub mutation architecture supports One-Build:

1. **Build Integrity**
   - PRs only created after successful builds (local and simulated production)
   - QA must pass in build environment before PR creation
   - Build logs parsed and validated before mutations

2. **Consistency**
   - Same governance rules apply locally and in production
   - Same QA checks run in all environments
   - Same mutation logging regardless of environment

3. **Traceability**
   - Every PR links to a build sequence ID
   - Every mutation links to a governance event
   - Complete audit trail from code change to PR merge

---

## Implementation Checklist

### Phase 1: Core Mutation API (Issue 2)

- [ ] Implement `lib/github/mutations.ts` with core mutation functions
- [ ] Implement `lib/foreman/governance/github-governance.ts` for governance validation
- [ ] Create GitHub mutation event schema in `types/github-events.ts`
- [ ] Implement mutation logging to Governance Memory
- [ ] Add failure recovery with retry logic

### Phase 2: Governance Rails (Issue 2)

- [ ] Implement QA enforcement rail
- [ ] Implement compliance enforcement rail
- [ ] Implement approval workflow rail
- [ ] Implement mutation logging rail
- [ ] Add governance violation handling

### Phase 3: PR Lifecycle (Issue 2)

- [ ] Implement `createPR` with full governance metadata
- [ ] Implement `updatePR` with validation
- [ ] Implement PR labeling and assignment
- [ ] Add PR comment generation with QA summary
- [ ] Integrate with build sequence completion

### Phase 4: Issue Lifecycle (Issue 2)

- [ ] Implement `closeIssue` with governance checks
- [ ] Implement `commentOnIssue` with secrets detection
- [ ] Implement `labelIssue` with governance labels
- [ ] Add issue-PR linkage validation

### Phase 5: Branch Protection (Issue 2)

- [ ] Implement `setBranchProtection` with approval workflow
- [ ] Implement `updateBranchProtection` with governance logging
- [ ] Add governance approval validation
- [ ] Create branch protection event types

### Phase 6: Testing & Validation (Issue 2)

- [ ] Unit tests for all mutation functions
- [ ] Integration tests with mocked GitHub API
- [ ] Governance violation scenario tests
- [ ] Failure recovery scenario tests
- [ ] End-to-end PR creation flow test

---

## API Reference

### Core Mutation Functions

```typescript
// Issue Lifecycle
closeIssue(owner: string, repo: string, issueNumber: number, reason: string): Promise<void>
reopenIssue(owner: string, repo: string, issueNumber: number, reason: string): Promise<void>
commentOnIssue(owner: string, repo: string, issueNumber: number, body: string): Promise<Comment>
labelIssue(owner: string, repo: string, issueNumber: number, labels: string[]): Promise<void>
assignIssue(owner: string, repo: string, issueNumber: number, assignees: string[]): Promise<void>

// PR Lifecycle
createPR(config: PRConfig): Promise<PR>
updatePR(owner: string, repo: string, prNumber: number, updates: PRUpdates): Promise<PR>
addPRLabels(owner: string, repo: string, prNumber: number, labels: string[]): Promise<void>
requestPRReview(owner: string, repo: string, prNumber: number, reviewers: string[]): Promise<void>
assignPR(owner: string, repo: string, prNumber: number, assignees: string[]): Promise<void>
commentOnPR(owner: string, repo: string, prNumber: number, body: string): Promise<Comment>

// Branch Protection
setBranchProtection(owner: string, repo: string, branch: string, rules: BranchProtectionRules, approval: GovernanceApproval): Promise<void>
updateBranchProtection(owner: string, repo: string, branch: string, updates: BranchProtectionUpdates, approval: GovernanceApproval): Promise<void>
removeBranchProtection(owner: string, repo: string, branch: string, approval: GovernanceApproval): Promise<void>

// Governance Metadata
applyGovernanceLabels(owner: string, repo: string, issueOrPR: number, labels: string[]): Promise<void>
recordGovernanceEvent(owner: string, repo: string, eventType: string, metadata: any): Promise<void>
tagWithQAStatus(owner: string, repo: string, prNumber: number, qaStatus: 'approved' | 'blocked'): Promise<void>
tagWithComplianceStatus(owner: string, repo: string, prNumber: number, complianceStatus: 'approved' | 'blocked'): Promise<void>
```

---

## Security Considerations

### 1. Credential Management

- GitHub App credentials stored in environment variables
- Installation tokens generated on-demand (short-lived)
- No long-lived personal access tokens
- Credentials never logged or exposed in errors

### 2. Secrets Detection

- All PR bodies, comments, and issue comments scanned for secrets
- Patterns detected: API keys, tokens, passwords, private keys
- Mutations blocked if secrets detected
- See `foreman/governance/secrets-management.md` for detection rules

### 3. Audit Trail

- Every mutation logged to Governance Memory
- Logs include actor, target, operation, result
- Logs immutable (append-only)
- Governance events queryable for compliance audits

### 4. Permission Model

- Foreman uses GitHub App installation permissions
- Permissions scoped to minimum required (issues, PRs, repo metadata)
- No admin permissions by default
- Branch protection changes require elevated permissions + governance approval

---

## Version History

- **v1.0.0** (Current) - Initial authoritative architecture
  - Defined Foreman mutation boundary
  - Established governance rails
  - Defined mutation event schema
  - Specified failure recovery behavior
  - Integrated with True North and One-Build

---

## References

### Core Documents
- `/foreman/true-north-architecture.md` - True North principles
- `/foreman/governance/governance-supremacy-rule.md` - GSR specification
- `/foreman/governance/governance-model.md` - Autonomy-first governance
- `/foreman/identity/foreman-identity.md` - Foreman's authority and constraints
- `/foreman/governance/secrets-management.md` - Secrets detection rules

### Implementation Files (relative to project root)
- `lib/github/mutations.ts` - Mutation API (to be implemented in Issue 2)
- `lib/foreman/governance/github-governance.ts` - Governance validation (to be implemented in Issue 2)
- `types/github-events.ts` - Event schemas (to be implemented in Issue 2)
- `lib/github/client.ts` - GitHub API client (existing, to be extended in Issue 2)

---

**This architecture is authoritative for Issue 2 and all future GitHub mutation implementations. All code must conform to these specifications.**
