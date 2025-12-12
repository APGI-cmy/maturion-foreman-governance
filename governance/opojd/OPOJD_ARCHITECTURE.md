# One-Prompt One-Job Doctrine (OPOJD) - Architecture Specification

**Version:** 1.0  
**Status:** Constitutional - Active  
**Authority:** Maturion Engineering Leadership (Johan)  
**Created:** 2025-12-12

---

## Executive Summary

The **One-Prompt One-Job Doctrine (OPOJD)** establishes a strict behavioral rule requiring Foreman to complete ENTIRE build lifecycles in one continuous autonomous execution without pausing, asking for permission, or waiting for intermediate approval—unless a constitutional guardrail is explicitly triggered.

This doctrine eliminates mid-build interruptions, unnecessary questions, and half-completed tasks, ensuring that when Johan issues a command, the complete job executes end-to-end autonomously.

---

## Architectural Principles

### 1. Continuous Execution Mandate

When the Owner (Johan) submits a prompt, assigns an issue, or issues a command, Foreman MUST execute the ENTIRE job lifecycle in a single continuous autonomous run:

```
ARCHITECTURE → RED QA → BUILD-TO-GREEN → VALIDATION → MERGE → EVIDENCE → NOTIFY
```

### 2. No Mid-Build Interruptions

Foreman MUST NOT:
- Pause execution to ask "Should I proceed?"
- Request permission to continue to next phase
- Await intermediate approval between lifecycle steps
- Enter WAITING_FOR_APPROVAL state except when CS2 explicitly requires it
- Halt for confirmation unless a constitutional violation is detected

### 3. Assume-Continue Principle

**Default Assumption: PERMISSION GRANTED**

Foreman must assume permission to continue unless **explicitly denied** by:
1. Constitutional guardrail trigger (CS1-CS6)
2. Protected file requiring Owner approval (CS2)
3. Unrecoverable failure requiring escalation
4. Governance rule violation

### 4. Human Interaction Points

Human feedback enters ONLY at:
- **Architecture Review (CS2):** When protected files or constitutional changes require approval
- **Governance Violations:** When GSR, QIC, or other governance rules are breached
- **Post-Deployment Feedback:** After build is complete and deployed
- **Escalation Events:** When recovery is impossible

### 5. Autonomy by Default

The default operational state is:
```typescript
AUTONOMOUS = TRUE
OPOJD_ENABLED = TRUE
WAITING_FOR_APPROVAL = EXCEPTIONAL (not default)
```

---

## System Architecture Changes

### Layer 1: Agent Behavioral Contracts

#### Foreman Agent Updates
**File:** `.github/agents/foreman.agent.md`

**New Sections:**
1. **Execution Discipline - OPOJD**
   - Complete lifecycle execution mandate
   - No mid-execution approval requests
   - Notification only at completion or escalation

2. **Autonomy Boundaries - OPOJD Extension**
   - Define when pausing is allowed (only CS2/CS1 triggers)
   - Define assume-continue behavior
   - Define escalation conditions

#### Builder Agent Updates
**Files:** 
- `.github/agents/builder.agent.md`
- `.github/agents/maturion-builder.agent.md`

**New Rules:**
1. **No Mid-Build Pausing**
   - Builders MUST NOT pause to ask for approval
   - Builders MUST execute all instructions in one cycle
   - Builders MUST attempt self-resolution before escalation

2. **Continuous Execution**
   - Build to Green must complete without interruption
   - Only escalate on unrecoverable failure
   - No permission requests during implementation

### Layer 2: Constitutional Framework

#### CS2 - Architecture Approval Workflow Extension
**New Document:** `/governance/opojd/CS2_OPOJD_EXTENSION.md`

**OPOJD Integration:**
- Only architecture changes require Owner approval
- Execution MUST proceed autonomously after architecture approval
- No re-approval needed for implementation phases
- Clear separation: Architecture (human) vs Implementation (autonomous)

#### CS5 - Performance Enforcement Extension
**New Document:** `/governance/opojd/CS5_ANTI_INTERRUPTION_RULE.md`

**Anti-Interruption Rule:**
- Any agent pausing without constitutional justification = CS5 violation
- Performance metrics must include "execution continuity" measurement
- Unnecessary pauses are logged as governance incidents
- Repeated violations trigger escalation

#### CS6 - Execution Boundary Extension
**New Document:** `/governance/opojd/CS6_EXECUTION_MANDATE.md`

**Execution Mandate:**
- Agents MUST NOT defer or delay execution without boundary violation
- Execution MUST proceed fully unless explicit governance conditions apply
- Boundary checks happen at phase transitions, not mid-phase
- Clear definition of when stopping is required vs optional

### Layer 3: Governance Documents

#### OPOJD Doctrine Specification
**File:** `/governance/opojd/OPOJD_DOCTRINE.md`

**Contents:**
- Formal doctrine definition
- Constitutional status and authority
- Enforcement mechanisms
- Violation consequences
- Integration with existing governance (GSR, QIC, QIEL)

#### Build Philosophy Integration
**File:** `/BUILD_PHILOSOPHY.md` (reference only, not modified)

**Integration Points:**
- OPOJD aligns with "One-Time Fully Functional Build" principle
- OPOJD enforces continuous Architecture → Red QA → Build to Green flow
- OPOJD prevents interruption of validated processes

### Layer 4: Runtime Systems

#### Autonomy State Machine Updates
**Target Logic:** Autonomy execution flow state transitions

**Changes:**
1. **Remove WAITING_FOR_APPROVAL as Default Transition**
   - Only enter when CS2 explicitly triggers
   - Default path: `READY → EXECUTING_TASK → EXECUTING_WAVE → VALIDATING → COMPLETING`

2. **Add OPOJD_CONTINUOUS_EXECUTION State Flag**
   - Tracks whether current execution is under OPOJD
   - Prevents accidental state transitions to approval states

3. **Implement Assume-Continue Logic**
   - Check governance conditions at state transitions
   - If no violations: continue immediately
   - If violation: enter appropriate escalation state

#### Wave Execution Engine Updates
**Target:** Wave orchestration logic

**Changes:**
1. **Continuous Wave Execution**
   - Waves MUST NOT pause between tasks unless:
     - Dependency failure occurs
     - Governance rule breach detected
     - Critical test failure

2. **Auto-Progress Logic**
   - After task completion: immediately check dependencies
   - If dependencies satisfied: start next task
   - No approval gate between tasks in same wave

3. **Wave Completion Signal**
   - Wave completes only when all tasks done OR unrecoverable failure
   - No partial wave completions requiring approval

#### Recovery Engine Updates
**Target:** Error recovery and retry logic

**Changes:**
1. **Automatic Recovery Attempts**
   - When recoverable: always recover automatically
   - No pause to ask "Should I retry?"
   - Recovery attempts logged for audit

2. **Immediate Escalation on Non-Recoverable**
   - When not recoverable: escalate immediately
   - Do not pause to confirm escalation
   - Clear escalation message with recovery context

3. **Recovery Decision Matrix**
   ```
   Recoverable Error → Auto-Retry → Continue
   Non-Recoverable Error → Escalate → Stop
   Governance Violation → Stop → Report
   ```

---

## Implementation Specification

### File Modifications Required

#### Constitutional Files (Content Updates)
1. `.github/agents/foreman.agent.md`
   - Add OPOJD execution discipline section
   - Update autonomy boundaries
   - Add notification-only policy

2. `.github/agents/builder.agent.md`
   - Add no-pause rule
   - Add continuous execution mandate

3. `.github/agents/maturion-builder.agent.md`
   - Add no-pause rule
   - Add continuous execution mandate

#### New Constitutional Documents
1. `/governance/opojd/OPOJD_DOCTRINE.md`
2. `/governance/opojd/CS2_OPOJD_EXTENSION.md`
3. `/governance/opojd/CS5_ANTI_INTERRUPTION_RULE.md`
4. `/governance/opojd/CS6_EXECUTION_MANDATE.md`
5. `/governance/opojd/OPOJD_ARCHITECTURE.md` (this file)
6. `/governance/opojd/OPOJD_COMPLETION_REPORT.md` (created post-implementation)

#### Governance References (Updates)
1. `/foreman/autonomy-rules.md`
   - Reference OPOJD doctrine
   - Update operational state section

### Code Changes Required

#### Runtime Logic (TypeScript)
Note: Per Build Philosophy, architectural specification only. Implementation via Red QA → Build to Green.

**Areas Requiring Implementation:**
1. Autonomy state machine transitions
2. Wave execution continuity checks
3. Recovery engine auto-retry logic
4. Governance condition checking at transitions

**Implementation Strategy:**
- Architecture defined in this document
- Red QA will encode expected behaviors
- Internal builder will implement to make tests pass

---

## Quality Assurance Strategy

### Red QA Test Coverage

#### Agent Behavioral Tests
**Location:** `/tests/governance/opojd/agent-behavior.test.ts`

**Tests:**
1. Foreman does not pause mid-run for non-constitutional reasons
2. Foreman only enters WAITING_FOR_APPROVAL when CS2 triggered
3. Builders do not ask for permission during Build to Green
4. Builders execute complete instructions in one cycle

#### State Machine Tests
**Location:** `/tests/governance/opojd/state-machine.test.ts`

**Tests:**
1. Default state transitions skip WAITING_FOR_APPROVAL
2. CS2 trigger properly enters approval state
3. Assume-continue logic works correctly
4. State transitions respect governance boundaries

#### Wave Execution Tests
**Location:** `/tests/governance/opojd/wave-execution.test.ts`

**Tests:**
1. Waves execute continuously without pauses
2. Task transitions happen automatically when dependencies met
3. Wave pauses only on: dependency failure, governance breach, critical test failure
4. Wave completion signals properly

#### Recovery Engine Tests
**Location:** `/tests/governance/opojd/recovery-engine.test.ts`

**Tests:**
1. Recoverable errors trigger automatic retry
2. Non-recoverable errors escalate immediately
3. No approval requests before recovery attempts
4. Recovery decision matrix correctly implemented

#### Integration Tests
**Location:** `/tests/governance/opojd/end-to-end.test.ts`

**Tests:**
1. Complete lifecycle executes without interruption (mock scenario)
2. Only CS2 architecture approval pauses execution
3. Notification sent only at completion or escalation
4. Evidence trail shows continuous execution

---

## Compliance & Governance

### GSR (Governance Supremacy Rule) Alignment

OPOJD extends GSR by:
- Enforcing continuous execution within governance boundaries
- Preventing unnecessary human interruptions that slow QA-governed builds
- Maintaining QA supremacy (QA failures still block progression)

### QIC (Quality Integrity Contract) Alignment

OPOJD maintains QIC by:
- All QA gates remain mandatory
- 100% QA passing still required
- No shortcuts allowed under continuous execution
- Quality checks happen automatically, not on-demand

### QIEL (QA Integrity Enforcement Layer) Alignment

OPOJD integrates with QIEL:
- QIEL checks run automatically during execution
- QIEL failures halt execution (governance boundary)
- QIEL violations escalate appropriately
- No degradation of quality enforcement

---

## Migration & Deployment

### Phase 1: Constitutional Document Creation
1. Create all new OPOJD governance documents
2. Update agent contracts with OPOJD rules
3. Document in constitutional registry

### Phase 2: Red QA Implementation
1. Create all test files in `/tests/governance/opojd/`
2. Implement test cases per specification
3. Verify RED status (tests fail as expected)

### Phase 3: Runtime Implementation
1. Update autonomy state machine logic
2. Update wave execution engine
3. Update recovery engine
4. Make all QA tests GREEN

### Phase 4: Validation & Documentation
1. Run complete test suite (100% passing required)
2. Generate OPOJD completion report
3. Update architectural documentation
4. Create evidence trail for governance

---

## Success Criteria

### Behavioral Success
- [ ] Foreman completes full lifecycle without mid-build pauses
- [ ] Only CS2 architecture approval causes execution pause
- [ ] Builders execute instructions continuously
- [ ] Recovery happens automatically when possible

### Technical Success
- [ ] All OPOJD tests pass (100%)
- [ ] No regression in existing tests
- [ ] State machine correctly implements assume-continue
- [ ] Wave engine executes continuously

### Governance Success
- [ ] OPOJD integrated into constitutional framework
- [ ] CS2, CS5, CS6 extensions documented
- [ ] No conflicts with existing governance rules
- [ ] Complete audit trail maintained

### Documentation Success
- [ ] OPOJD doctrine clearly documented
- [ ] Agent contracts updated
- [ ] Completion report generated
- [ ] Architecture checklist updated with OPOJD considerations

---

## Risk Mitigation

### Risk 1: Over-Automation
**Mitigation:** Constitutional guardrails (CS1-CS6) remain fully active and will halt execution when violated.

### Risk 2: Missing Human Oversight
**Mitigation:** CS2 architecture approval still requires human judgment. OPOJD applies to implementation, not strategic decisions.

### Risk 3: Undetected Failures
**Mitigation:** All QA gates remain mandatory. QIEL enforcement continues. No quality compromises.

### Risk 4: Governance Conflicts
**Mitigation:** OPOJD explicitly integrates with existing governance (GSR, QIC, CS1-CS6). No overrides, only extensions.

---

## Appendix A: OPOJD vs Manual Approval

### Before OPOJD (Manual Approval Pattern)
```
Requirement → Architecture → [PAUSE: Confirm architecture?]
→ Red QA → [PAUSE: Proceed to build?]
→ Build → [PAUSE: Review build?]
→ Validation → [PAUSE: Ready to merge?]
→ Merge
```

### After OPOJD (Continuous Execution)
```
Requirement → Architecture (CS2 if needed) → Red QA → Build → Validation → Merge → Notify
```

**Key Difference:** No unnecessary pauses. Only governance-required stops (CS2 for protected changes).

---

## Appendix B: OPOJD State Transitions

### Valid State Transition Paths

#### Normal Execution (No Governance Triggers)
```
READY 
  → EXECUTING_TASK 
  → EXECUTING_WAVE 
  → VALIDATING 
  → COMPLETING 
  → READY (next task)
```

#### With CS2 Architecture Approval
```
READY 
  → ARCHITECTURE_REVIEW (CS2 triggered)
  → WAITING_FOR_APPROVAL 
  → [Human approves]
  → EXECUTING_TASK 
  → EXECUTING_WAVE 
  → VALIDATING 
  → COMPLETING
```

#### With Escalation
```
READY 
  → EXECUTING_TASK 
  → ERROR_DETECTED 
  → [Recovery attempted]
  → [If not recoverable]
  → ESCALATING 
  → AWAITING_HUMAN_INPUT
```

---

## Version History

**v1.0 (2025-12-12):**
- Initial architecture specification
- Complete OPOJD design
- Integration with existing governance
- Red QA strategy defined

---

**Authority:** This architecture is authorized under CS2 (Architecture Approval Workflow) and forms part of the Maturion constitutional framework.

**Immutability:** This document can only be modified through the Constitutional Evolution Protocol (CEIP) or by direct authorization from Johan.

**Status:** ACTIVE - Ready for Red QA implementation phase.
