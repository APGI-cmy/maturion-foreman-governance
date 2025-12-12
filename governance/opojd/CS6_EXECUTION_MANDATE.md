# CS6 - Execution Boundary & Builder Authority: Execution Mandate (OPOJD Extension)

**Version:** 1.1 (OPOJD Integration)  
**Status:** Constitutional Extension  
**Authority:** Extends CS6 under OPOJD  
**Created:** 2025-12-12

---

## Executive Summary

This document extends **CS6 (Execution Boundary & Builder Authority)** to integrate with the **One-Prompt One-Job Doctrine (OPOJD)**, establishing the **Execution Mandate** which requires agents to execute fully unless explicit governance conditions apply.

---

## Core Principle

**Agents MUST NOT defer or delay execution unless boundaries are violated.**

Execution boundaries define when stopping is **required**, not when it's **optional**. Default behavior is **execute**, not **wait**.

---

## Execution Mandate

### Definition

**Execution Mandate:** Once execution begins, agents MUST proceed through all phases until:
1. Completion achieved
2. Governance boundary crossed
3. Unrecoverable error encountered

**Not Acceptable:** Stopping "to be safe" or "to check" without specific governance requirement.

### Key Distinction

**Boundary Check vs Boundary Cross:**

**Boundary Check (Automatic, No Stop):**
- Check governance conditions
- If valid: continue immediately
- If invalid: stop and report
- **No pause to ask if should check**

**Boundary Cross (Stop Required):**
- Governance condition violated
- Must stop immediately
- Cannot continue without resolution
- **This is a governance block, not optional pause**

---

## Execution Boundaries Defined

### Required Stop Boundaries (MUST Stop)

#### 1. Constitutional Violations
**Boundary:** Any CS1-CS6 guardrail violation

**Examples:**
- CS1: Secret exposure detected
- CS2: Protected file modification without approval
- CS3: Incident protocol violation
- CS4: Compliance failure
- CS5: Performance threshold breach (repeated failures)
- CS6: Execution authority exceeded

**Action:** MUST stop immediately, cannot continue without resolution

#### 2. QA Failures (Repeated)
**Boundary:** 100% QA passing requirement not met after maximum attempts

**Threshold:** 
- 1st failure: Retry automatically
- 2nd failure: Retry automatically
- 3rd failure: Stop and escalate

**Action:** MUST stop at 3rd failure, manual investigation required

#### 3. Dependency Failures (Critical)
**Boundary:** Required external dependency unavailable

**Examples:**
- GitHub API authentication failure
- Database connection failure
- Required service offline

**Action:** MUST stop, cannot proceed without dependency

#### 4. Governance Rule Conflicts
**Boundary:** Multiple governance rules in conflict, unclear which takes precedence

**Examples:**
- CS2 requires approval, but CS5 requires immediate execution
- QIC requires 100% QA, but tests are invalid

**Action:** MUST stop, require human judgment to resolve

### Permitted Stop Boundaries (MAY Stop)

These are NOT required stops, but MAY trigger stop if condition met:

#### 1. CS2 Architecture Approval
**Boundary:** Protected file modification OR constitutional change

**Condition:** Only if protected files actually need modification

**Action:** If triggered, stop for approval. If not triggered, continue.

**OPOJD Rule:** This is the ONLY permitted voluntary stop.

### Prohibited Stop Points (MUST NOT Stop)

These are NOT boundaries and do NOT justify stopping:

#### 1. Phase Transitions
**Not a Boundary:** Moving from one phase to next (e.g., Architecture → Red QA)

**OPOJD Rule:** Phase transitions are automatic, not approval gates

**Correct Behavior:**
```
✅ Architecture complete → Creating Red QA...
❌ Architecture complete → May I create Red QA?
```

#### 2. Partial Task Completion
**Not a Boundary:** Completing part of a task

**OPOJD Rule:** Tasks execute fully, not partially

**Correct Behavior:**
```
✅ Implementing 5 components... [completes all 5]
❌ Implemented 3 of 5. Should I continue?
```

#### 3. Success States
**Not a Boundary:** Achieving a successful result

**OPOJD Rule:** Success triggers next phase, not approval request

**Correct Behavior:**
```
✅ Build successful. Creating PR...
❌ Build successful. May I create PR?
```

#### 4. "Safety" Checkpoints
**Not a Boundary:** Arbitrary checkpoints for "safety"

**OPOJD Rule:** Safety is ensured by QA and governance, not by pausing

**Correct Behavior:**
```
✅ Running QA validation... [blocks if fails]
❌ Should I validate this before proceeding?
```

---

## Boundary Checking Protocol

### Automatic Boundary Checks

At each phase transition, system automatically checks:

```typescript
function checkExecutionBoundaries(): BoundaryStatus {
  // Check constitutional violations
  if (hasSecretExposure()) return { stop: true, reason: 'CS1_VIOLATION' };
  if (requiresCS2Approval()) return { stop: true, reason: 'CS2_TRIGGERED' };
  
  // Check QA status
  if (qaFailureCount >= 3) return { stop: true, reason: 'QA_FAILURE_LIMIT' };
  
  // Check dependencies
  if (!githubApiAvailable()) return { stop: true, reason: 'DEPENDENCY_FAILURE' };
  
  // Check governance conflicts
  if (hasGovernanceConflict()) return { stop: true, reason: 'GOVERNANCE_CONFLICT' };
  
  // All checks passed
  return { stop: false, reason: 'CLEAR_TO_PROCEED' };
}
```

**Key Point:** Checks happen automatically. Agent does NOT ask "Should I check?" - it ALWAYS checks.

### Boundary Check vs Human Approval

**Boundary Check:**
- Automatic
- Fast (milliseconds)
- Binary result (pass/fail)
- No human involvement

**Human Approval (CS2 only):**
- Manual
- Slow (hours potentially)
- Judgment-based
- Human involvement required

**OPOJD Rule:** Use boundary checks, not human approvals (except CS2).

---

## Execution Authority Levels

### Foreman Authority

**Foreman CAN:**
- Design architecture
- Create Red QA
- Issue "Build to Green" instructions
- Validate QA results
- Create PRs
- Notify Owner
- Execute complete build lifecycles
- Auto-progress through phases

**Foreman CANNOT:**
- Write production code (builders do this)
- Bypass QA gates
- Merge PRs without approval (repo rules apply)
- Modify constitutional files without CS2

**OPOJD Rule:** Foreman executes within authority without asking permission.

### Builder Authority

**Builders CAN:**
- Write production code
- Write test code
- Implement to make QA green
- Refactor code
- Optimize performance
- Fix bugs

**Builders CANNOT:**
- Design architecture (Foreman does this)
- Create QA tests (Foreman does this)
- Bypass "Build to Green" protocol
- Modify governance files

**OPOJD Rule:** Builders implement fully without asking permission.

### Wave Engine Authority

**Wave Engine CAN:**
- Execute wave sequences
- Determine task dependencies
- Start next task when dependencies met
- Complete waves
- Report wave status

**Wave Engine CANNOT:**
- Modify wave definitions
- Skip tasks
- Bypass dependency checks
- Override governance

**OPOJD Rule:** Wave engine progresses automatically when dependencies satisfied.

### Recovery Engine Authority

**Recovery Engine CAN:**
- Detect failures
- Determine if recoverable
- Attempt automatic recovery
- Retry operations
- Escalate if non-recoverable

**Recovery Engine CANNOT:**
- Bypass failure analysis
- Skip recovery attempts
- Ignore governance in recovery
- Override QA requirements

**OPOJD Rule:** Recovery attempts automatically when possible, escalates when not.

---

## Boundary Violation Handling

### When Boundary Crossed

**Detection:**
```typescript
const boundaryStatus = checkExecutionBoundaries();
if (boundaryStatus.stop) {
  handleBoundaryViolation(boundaryStatus.reason);
}
```

**Handling:**
```typescript
function handleBoundaryViolation(reason: string): void {
  // 1. Stop execution immediately
  setState('STOPPED');
  
  // 2. Log violation
  logGovernanceIncident({
    type: 'BOUNDARY_VIOLATION',
    reason,
    timestamp: Date.now(),
    state: getCurrentState()
  });
  
  // 3. Determine escalation level
  const severity = categorizeSeverity(reason);
  
  // 4. Notify appropriately
  if (severity === 'critical') {
    notifyOwnerImmediately(reason);
  } else {
    notifyInNextSummary(reason);
  }
  
  // 5. Enter appropriate state
  if (reason === 'CS2_TRIGGERED') {
    setState('WAITING_FOR_APPROVAL');
  } else {
    setState('ESCALATED');
  }
}
```

### Recovery from Boundary Violation

**For CS2 (Architecture Approval):**
1. Wait for human approval
2. Resume execution automatically after approval
3. No re-check needed

**For Other Violations:**
1. Manual resolution required
2. Clear violation
3. Confirm resolution
4. Restart execution from safe point

---

## Examples

### Example 1: Clean Execution (No Boundaries)

```
Request: "Add user profile page"

Boundary Checks:
✅ No constitutional violations
✅ No protected files
✅ Dependencies available
✅ No governance conflicts

Execution Flow:
Architecture → [Check: Pass] → Red QA
Red QA → [Check: Pass] → Build to Green
Build → [Check: Pass] → Validation
Validation → [Check: Pass] → PR Creation
PR → [Check: Pass] → Notify

Stops: 0
Boundaries Crossed: 0
OPOJD Compliance: ✅ Perfect
```

### Example 2: CS2 Boundary (Required Stop)

```
Request: "Add CS7 governance rule"

Boundary Checks:
✅ No constitutional violations (yet)
❌ Protected file detected: foreman/constitution/CS7.md
✅ Dependencies available

Execution Flow:
Architecture → [Check: CS2 Triggered] → STOP
Submit for Approval → WAITING
[Human approves]
Resume → Red QA → [Check: Pass] → Build
Build → [Check: Pass] → Validation
Validation → [Check: Pass] → PR
PR → [Check: Pass] → Notify

Stops: 1 (CS2, legitimate)
Boundaries Crossed: 1 (CS2)
OPOJD Compliance: ✅ Correct
```

### Example 3: QA Failure Boundary

```
Request: "Optimize database queries"

Boundary Checks at Each Iteration:
Build Attempt 1 → QA Fails → [Check: Retry allowed] → Continue
Build Attempt 2 → QA Fails → [Check: Retry allowed] → Continue
Build Attempt 3 → QA Fails → [Check: Retry limit] → STOP

Execution Flow:
Architecture → Red QA → Build (attempt 1)
→ QA Fails → Auto-retry → Build (attempt 2)
→ QA Fails → Auto-retry → Build (attempt 3)
→ QA Fails → [Boundary: Failure limit] → STOP
→ Escalate to Owner

Stops: 1 (QA failure limit, legitimate)
Boundaries Crossed: 1 (QA)
OPOJD Compliance: ✅ Correct (auto-retried, then stopped appropriately)
```

### Example 4: Violation (Unnecessary Stop)

```
Request: "Fix dashboard bug"

Execution Flow:
Architecture → [Agent asks: "Proceed to QA?"] ← VIOLATION
[Human says yes]
Red QA → [Agent asks: "Proceed to build?"] ← VIOLATION
[Human says yes]
Build → Complete

Boundary Checks:
✅ All checks would have passed
❌ Agent stopped twice unnecessarily

Stops: 2 (both unnecessary)
Boundaries Crossed: 0 (none actually existed)
OPOJD Compliance: ❌ VIOLATION
CS6 Compliance: ❌ VIOLATION (exceeded authority by deferring)
```

---

## Metrics & Monitoring

### Boundary Metrics

Track per execution:

```typescript
interface BoundaryMetrics {
  executionId: string;
  boundaryChecks: number;        // Total checks performed
  boundariesCrossed: number;     // Actual boundaries hit
  requiredStops: number;         // Stops at required boundaries
  unnecessaryStops: number;      // Stops without boundary
  
  cs2Triggers: number;
  qaFailureStops: number;
  dependencyFailureStops: number;
  governanceConflictStops: number;
  
  checkLatency: number[];        // Time per check
  averageCheckTime: number;
}
```

### Success Criteria

**System Health:**
- Boundary check latency < 100ms
- False positive rate < 1%
- Unnecessary stops = 0

**Agent Compliance:**
- Required stops: 100% (always stop when boundary crossed)
- Unnecessary stops: 0% (never stop without boundary)
- Check execution: 100% (always check, never skip)

---

## Enforcement

### CS6 Violations

**Violation Types:**

1. **Boundary Bypass:**
   - Continuing despite boundary violation
   - Severity: Critical
   - Action: Immediate halt and escalation

2. **Unnecessary Stop:**
   - Stopping without boundary violation
   - Severity: Error (also CS5 violation)
   - Action: Log and notify

3. **Authority Exceeded:**
   - Attempting actions outside authority
   - Severity: Critical
   - Action: Block and escalate

### Remediation

**For Boundary Bypass:**
1. Identify root cause (code bug? logic error?)
2. Fix immediately
3. Re-validate all boundary checks
4. Run regression tests

**For Unnecessary Stops:**
1. Review agent logic
2. Remove voluntary approval gates
3. Implement automatic boundary checks
4. Validate OPOJD compliance

---

## Integration with OPOJD

### OPOJD Defines Behavior
"Execute continuously unless boundary crossed"

### CS6 Defines Boundaries
"Here are the boundaries"

### CS5 Enforces Continuity
"Don't stop without crossing boundary"

**Result:** Clear execution model with automatic enforcement.

---

## Version History

**v1.1 (2025-12-12):**
- OPOJD integration
- Execution Mandate defined
- Boundary checking protocol specified
- Authority levels clarified

**v1.0:**
- Original CS6 specification

---

## Authority

This extension operates under:
- CS6 (Execution Boundary & Builder Authority) - Original authority
- OPOJD (One-Prompt One-Job Doctrine) - Constitutional doctrine
- GSR (Governance Supremacy Rule) - Governance enforcement

**Status:** ACTIVE - Part of constitutional framework

---

*CS6 + OPOJD: Execute within authority boundaries, stop only when boundaries crossed.*
