# Builder Ecosystem v1.1 — Constitutional Architecture

## Version Information

**Version**: 1.1  
**Status**: Active  
**Authority**: Maturion Engineering Leadership (Johan)  
**Last Updated**: 2025-12-11  
**Constitutional Alignment**: CS1–CS6, Build Philosophy v1.1

---

## Purpose

This document defines the complete architectural specification for the **Builder Ecosystem v1.1**, which provides:

1. Constitutional alignment with Build Philosophy v1.1
2. Deterministic, reliable builder execution
3. Multi-builder orchestration with fallback chains
4. Health monitoring and telemetry
5. Failure escalation and recovery
6. Philosophy Tree integration
7. PR evidence generation

The Builder Ecosystem is the **execution layer** of the Maturion engineering fabric, responsible for transforming architecture + Red QA into functional code.

---

## System Overview

```
┌────────────────────────────────────────────────────────────────────┐
│                        FOREMAN (Orchestrator)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│  │ Architecture │─▶│    Red QA    │─▶│Build-to-Green│            │
│  │   Designer   │  │   Generator  │  │  Instructor  │            │
│  └──────────────┘  └──────────────┘  └──────┬───────┘            │
└────────────────────────────────────────────┼──────────────────────┘
                                              │
                     ┌────────────────────────┼────────────────────────┐
                     │    BUILDER ECOSYSTEM v1.1 (Execution Layer)    │
                     └────────────────────────┼────────────────────────┘
                                              │
              ┌───────────────────────────────┴───────────────────────────────┐
              │                                                                │
    ┌─────────▼─────────┐                                    ┌────────────────▼─────────┐
    │  PRIMARY BUILDERS  │                                    │  SPECIALIZED BUILDERS    │
    ├────────────────────┤                                    ├──────────────────────────┤
    │ • GitHub Copilot   │                                    │ • UI Builder             │
    │ • Local Builder    │                                    │ • API Builder            │
    │                    │                                    │ • Schema Builder         │
    │ [Protocol v1.1]    │                                    │ • Integration Builder    │
    │ [Checkpointing]    │                                    │ • QA Builder             │
    │ [Telemetry]        │                                    │                          │
    │ [Fallback]         │                                    │ [Build-to-Green Only]    │
    └────────┬───────────┘                                    │ [Red QA Required]        │
             │                                                 └────────────┬─────────────┘
             │                                                              │
    ┌────────▼──────────────────────────────────────────────────────────────▼─────────┐
    │                       BUILDER RUNTIME LAYER                                      │
    ├──────────────────────────────────────────────────────────────────────────────────┤
    │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
    │  │Checkpointing │  │  Telemetry   │  │   Fallback   │  │  Escalation  │        │
    │  │    Engine    │  │   Reporter   │  │   Manager    │  │   Handler    │        │
    │  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘        │
    │                                                                                   │
    │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                          │
    │  │   Health     │  │   Protocol   │  │  Evidence    │                          │
    │  │   Monitor    │  │  Validator   │  │  Generator   │                          │
    │  └──────────────┘  └──────────────┘  └──────────────┘                          │
    └───────────────────────────────────────────────────────────────────────────────────┘
                                              │
                     ┌────────────────────────┴────────────────────────┐
                     │         GOVERNANCE MEMORY (Audit Trail)         │
                     │  • Builder execution logs                       │
                     │  • Health metrics                               │
                     │  • Failure patterns                             │
                     │  • PR evidence                                  │
                     └─────────────────────────────────────────────────┘
```

---

## 1. Builder Roles & Scopes

### 1.1 Primary Builders (Multi-Repo Capable)

#### GitHub Copilot Builder
**Scope**: Small, incremental changes across any repository  
**Repository Access**: All repositories in the organization  
**Capabilities**:
- Quick edits (1-5 files)
- Bug fixes
- Small feature additions
- Documentation updates

**Constraints**:
- Must follow Build-to-Green protocol
- Cannot modify governance files
- Cannot modify workflows
- Limited to 5 file changes per task

**Protocol**: v1.1 (Constitutional)

---

#### Local Builder Agent
**Scope**: Large refactors, multi-file operations, deep architectural changes  
**Repository Access**: All repositories in the organization  
**Capabilities**:
- Large-scale refactoring (10+ files)
- Multi-module changes
- Architectural transformations
- Complex migrations

**Constraints**:
- Must follow Build-to-Green protocol
- Cannot modify governance files
- Cannot modify workflows
- Requires explicit activation

**Protocol**: v1.1 (Constitutional)

---

### 1.2 Specialized Builders (Single-Repo Scoped)

#### maturion-builder (ISMS/app Repository)
**Scope**: ISMS repository only  
**Repository**: `MaturionISMS/app`  
**Capabilities**:
- ISMS-specific features
- Organization management
- Asset management
- Compliance modules

**Protocol**: v1.1 (Constitutional)

---

#### internal-builder (Foreman Repository)
**Scope**: Foreman repository only  
**Repository**: `MaturionISMS/maturion-foreman-app`  
**Capabilities**:
- Foreman features
- Governance enhancements
- QA improvements
- Constitutional updates (non-protected files)

**Protocol**: v1.1 (Constitutional)

---

#### UI Builder
**Scope**: User interface components and pages  
**Capabilities**:
- React components
- Next.js pages
- Layouts and styles
- UI interactions

**Task Types**:
- `create_component`
- `update_component`
- `create_page`
- `update_page`
- `create_layout`
- `update_styles`

**Protocol**: Build-to-Green Only

---

#### API Builder
**Scope**: Backend endpoints and services  
**Capabilities**:
- API routes
- Service layer functions
- Middleware
- Data transformations

**Task Types**:
- `create_endpoint`
- `update_endpoint`
- `create_service`
- `update_service`
- `create_middleware`
- `update_middleware`

**Protocol**: Build-to-Green Only

---

#### Schema Builder
**Scope**: Type definitions and data models  
**Capabilities**:
- TypeScript types
- Database schemas
- Data validation
- Migrations

**Task Types**:
- `create_type`
- `update_type`
- `create_schema`
- `update_schema`
- `create_migration`
- `validate_schema`

**Protocol**: Build-to-Green Only

---

#### Integration Builder
**Scope**: External service integrations  
**Capabilities**:
- API clients
- Webhooks
- Third-party service connections
- Authentication flows

**Task Types**:
- `create_integration`
- `update_integration`
- `create_client`
- `update_client`
- `create_webhook`
- `update_webhook`

**Protocol**: Build-to-Green Only

---

#### QA Builder
**Scope**: Test creation and validation  
**Capabilities**:
- Unit tests
- Integration tests
- E2E tests
- Red QA generation

**Task Types**:
- `create_test`
- `update_test`
- `run_tests`
- `validate_output`
- `qa_review`
- `qa_of_qa_review`

**Protocol**: Create Red QA (Different from Build-to-Green)

---

## 2. Build Philosophy v1.1 Enforcement

### 2.1 Red QA Requirement (ABSOLUTE)

**Rule**: Builders SHALL NOT build unless Red QA exists.

**Validation Logic**:
```typescript
function validateRedQA(request: BuildRequest): ValidationResult {
  // GATE 1: QA suite provided?
  if (!request.qa_suite) {
    return {
      valid: false,
      error: "BuildPhilosophyViolation",
      message: "No QA suite provided",
      action: "Foreman must create Red QA first"
    }
  }
  
  // GATE 2: QA status is RED?
  if (request.qa_suite.current_status !== "RED") {
    return {
      valid: false,
      error: "BuildPhilosophyViolation",
      message: "QA must be RED (failing)",
      action: request.qa_suite.current_status === "GREEN" 
        ? "QA is already green. Nothing to build."
        : "Foreman must run QA to verify it's failing"
    }
  }
  
  // GATE 3: Failing tests exist?
  if (request.qa_suite.failing_tests === 0) {
    return {
      valid: false,
      error: "BuildPhilosophyViolation",
      message: "No failing tests to drive building",
      action: "Add failing tests or cancel build"
    }
  }
  
  return { valid: true }
}
```

**Enforcement**: Every builder validates Red QA before accepting task.

---

### 2.2 Build-to-Green Structure (ABSOLUTE)

**Rule**: Only instruction format accepted is "Build to Green".

**Valid Request Format**:
```typescript
interface BuildToGreenRequest {
  instruction: "Build to Green"  // EXACT STRING REQUIRED
  architecture: {
    reference: string  // Path to architecture document
    summary: string    // Brief summary of architecture
  }
  qa_suite: {
    name: string
    location: string
    current_status: "RED"  // MUST BE RED
    total_tests: number
    passing_tests: number  // MUST BE < total_tests
    failing_tests: number  // MUST BE > 0
  }
  acceptance_criteria: string  // What defines "done"
  organisationId: string
}
```

**Rejection Format**:
```typescript
interface BuildRejection {
  success: false
  error: "BuildPhilosophyViolation"
  message: string
  details: {
    reason: string
    philosophy: string
    action: string
  }
  philosophy_reference: "/BUILD_PHILOSOPHY.md"
  workflow_reference: "/foreman/qa/qa-first-workflow.md"
  timestamp: string
}
```

---

### 2.3 Architecture-First Correctness

**Rule**: Builders implement EXACTLY what architecture specifies.

**No Quick Patches**:
- ❌ Builders do NOT invent solutions
- ❌ Builders do NOT add features not in architecture
- ❌ Builders do NOT skip architectural requirements
- ✅ Builders implement architecture precisely

**No TODOs**:
- ❌ No `// TODO: implement later`
- ❌ No placeholder implementations
- ❌ No partial features
- ✅ Complete implementations only

**No "Best Guess" Behavior**:
- ❌ Do not guess when architecture is unclear
- ❌ Do not assume requirements
- ✅ Escalate when architecture is ambiguous

---

## 3. Constitutional Obedience (CS1–CS6)

### 3.1 CS1: Governance Supremacy Rule (GSR)

**Builders MUST**:
- Block builds when QA fails
- Enforce 100% QA passing before completion
- Never bypass quality gates
- Log all governance violations

**Builders MUST NOT**:
- Accept partial QA passes
- Skip failing tests
- Reduce quality standards
- Merge with failing QA

---

### 3.2 CS2: QA-First Build Philosophy

**Builders MUST**:
- Require Red QA before building
- Refuse "Build feature X" without Red QA
- Validate architecture exists
- Follow Build-to-Green exclusively

**Builders MUST NOT**:
- Build without Red QA
- Accept any instruction except "Build to Green"
- Implement features not in QA

---

### 3.3 CS3: Constitutional File Protection

**Builders MUST NOT modify**:
- `.github/workflows/` (Workflow files)
- `.github/foreman/agent-contract.md` (Constitutional contract)
- `/BUILD_PHILOSOPHY.md` (Build philosophy)
- `/foreman/constitution/` (Constitutional documents)
- `/foreman/architecture-design-checklist.md` (Architecture checklist)

**Validation**:
```typescript
function validatePathProtection(filePath: string): boolean {
  const protectedPaths = [
    /^\.github\/workflows\//,
    /^\.github\/foreman\/agent-contract\.md$/,
    /^BUILD_PHILOSOPHY\.md$/,
    /^foreman\/constitution\//,
    /^foreman\/architecture-design-checklist\.md$/,
  ]
  
  return !protectedPaths.some(pattern => pattern.test(filePath))
}
```

**Enforcement**: Builders reject tasks that attempt protected path modifications.

---

### 3.4 CS4: Autonomous QA Governance

**Builders MUST**:
- Run QA after every code change
- Continue building until 100% QA passes
- Report exact QA status with every update
- Never report completion with failing QA

---

### 3.5 CS5: Secrets Protection

**Builders MUST**:
- Never log secrets
- Never include secrets in code
- Validate all environment variable usage
- Use authorized secrets management only

---

### 3.6 CS6: Audit Trail Integrity

**Builders MUST**:
- Log all build actions to governance memory
- Include timestamps for all events
- Record architecture references
- Record QA status progression
- Generate evidence for PR validation

---

## 4. Error & Escalation Model

### 4.1 Error Classification

#### Recoverable Errors
**Examples**:
- Syntax errors in generated code
- Type mismatches
- Import errors
- Test failures due to incomplete implementation

**Action**: Builder retries with corrections

---

#### Non-Recoverable Errors
**Examples**:
- Architecture ambiguity (cannot determine correct implementation)
- Red QA is impossible to satisfy (tests contradictory)
- Protected path modification requested
- Missing dependencies cannot be resolved

**Action**: Escalate to Foreman immediately

---

#### Constitutional Violations
**Examples**:
- Build request without Red QA
- Instruction format not "Build to Green"
- Request to modify protected paths
- Request to bypass QA

**Action**: Reject immediately, log to governance memory

---

### 4.2 Escalation Triggers

Builders escalate to Foreman when:

1. **Red QA is Impossible to Satisfy**
   - Tests contradict each other
   - Tests require architectural changes
   - Tests require features not in architecture

2. **Architecture and Tests Contradict**
   - Architecture says X, tests require Y
   - Cannot satisfy both simultaneously

3. **Governance Boundary is Unclear**
   - Unsure if path is protected
   - Unsure if action violates constitutional rules

4. **Multiple Retry Failures**
   - 10+ iterations without progress
   - Same test keeps failing despite fixes

5. **Implementation Gap Indicates Architectural Ambiguity**
   - Architecture incomplete
   - Missing specifications
   - Unclear requirements

---

### 4.3 Escalation Format

```typescript
interface BuilderEscalation {
  escalation_type: "non_recoverable_error" | "architectural_ambiguity" | "constitutional_uncertainty"
  builder: string
  task_id: string
  issue: string
  details: {
    error_message: string
    attempted_fixes: string[]
    architecture_reference: string
    qa_suite_reference: string
    current_qa_status: {
      total: number
      passing: number
      failing: number
    }
  }
  suggested_resolution: string
  timestamp: string
}
```

---

### 4.4 Retry Strategy

**Iterative Build-to-Green**:
```
Iteration 1: Implement → Run QA → 0/10 passing
Iteration 2: Fix failures → Run QA → 3/10 passing
Iteration 3: Fix failures → Run QA → 7/10 passing
...
Iteration N: Fix failures → Run QA → 10/10 passing ✓
```

**Max Iterations**: 100  
**Escalation Threshold**: 10 iterations without progress

**Progress Definition**: At least 1 additional test passing per iteration.

---

### 4.5 Fallback Chain

**When Primary Builder Fails**:

```
GitHub Copilot Builder (Primary)
   │
   ├─ Recoverable Error → Retry (up to 10x)
   │
   ├─ Non-Recoverable Error → Fallback to Local Builder
   │
   └─ Local Builder Unavailable → Escalate to Foreman
```

**Fallback Criteria**:
- 5+ consecutive failures within 1 hour
- Builder reports "cannot complete"
- Builder health check fails
- Token exhaustion detected

**Fallback Actions**:
1. Log fallback event to governance memory
2. Attach all context (architecture, QA, progress)
3. Dispatch to fallback builder with same "Build to Green" instruction
4. Continue monitoring fallback builder

---

## 5. Telemetry Model

### 5.1 Builder Heartbeat

**Frequency**: Every 30 seconds while active  
**Format**:
```typescript
interface BuilderHeartbeat {
  builder: string
  status: "active" | "idle" | "unhealthy" | "degraded"
  last_task_id: string | null
  timestamp: string
  health_indicators: {
    api_latency_ms: number
    error_rate: number
    success_rate: number
  }
}
```

**Stale Detection**: Heartbeat older than 60 seconds = Unhealthy

---

### 5.2 Performance Metrics

**Tracked Metrics**:
- Task completion time (mean, p50, p95, p99)
- Iterations required to reach green QA
- Retry count per task
- Fallback frequency
- Error types distribution

**Reporting Frequency**: Every task completion

---

### 5.3 Failure Logs

**Captured Data**:
- Error type
- Error message
- Stack trace (if applicable)
- Task context (architecture, QA, iteration)
- Timestamp

**Retention**: 30 days

---

### 5.4 Operational Timestamps

**Recorded Events**:
- Task received
- Validation started
- Validation completed
- Building started
- Each QA run
- Task completed
- Task failed
- Escalation triggered

**Format**: ISO 8601 UTC timestamps

---

### 5.5 Builder Health Status

**Status Levels**:
- **Healthy**: Operating normally, all checks passing
- **Degraded**: Operating with errors but functional
- **Unhealthy**: Failing health checks, not accepting tasks
- **Dead**: Completely unavailable

**Health Checks**:
1. API reachability
2. Authentication valid
3. Recent successful builds
4. Error rate < 20%
5. Average latency < 5s

---

## 6. PR + Evidence Protocol

### 6.1 Required Evidence in Every PR

**Evidence Artifacts**:

1. **Architecture Reference**
   - Path to architecture document
   - Checklist validation report

2. **Red QA Evidence**
   - Pre-build QA run log
   - QA status = RED
   - Count of failing tests

3. **Build Instruction**
   - Instruction text: "Build to Green"
   - Architecture provided: ✓
   - QA suite provided: ✓

4. **Builder Validation Log**
   - Builder name
   - Protocol version
   - Validation checks passed
   - No BuildPhilosophyViolation errors

5. **Green QA Achievement**
   - Final QA run log
   - QA status = GREEN
   - All tests passing (100%)
   - Iteration count

6. **Timeline Integrity**
   - All timestamps in correct order
   - Architecture → Validation → Red QA → Build → Green QA

---

### 6.2 PR Description Format

```markdown
## Build to Green: [Feature Name]

### Architecture
- **Reference**: `/architecture/[path].md`
- **Checklist Validation**: ✓ Complete

### Red QA
- **QA Suite**: `tests/[path]/`
- **Pre-Build Status**: RED (0/N tests passing)
- **Failing Tests**: N

### Build Execution
- **Builder**: [GitHub Copilot | Local Builder | Specialized Builder]
- **Protocol**: v1.1 (Constitutional)
- **Instruction**: "Build to Green"
- **Iterations**: N

### Green QA
- **Final Status**: GREEN (N/N tests passing)
- **Pass Rate**: 100%

### Constitutional Compliance
- ✓ Red QA existed before building
- ✓ Build-to-Green instruction format
- ✓ No protected paths modified
- ✓ 100% QA passing
- ✓ Timeline integrity verified

### Evidence
- [Link to governance memory log]
```

---

### 6.3 Evidence Validation

**PR Merge Validator Checks**:

1. Architecture document exists
2. Checklist validation passed
3. Red QA log shows failing tests
4. Build instruction = "Build to Green"
5. Green QA log shows all passing
6. Timeline is correct
7. No constitutional violations

**If ANY check fails → BLOCK merge**

---

## 7. Builder Protocol v1.1 Specification

### 7.1 Request Structure

```typescript
interface BuilderRequestV1_1 {
  protocol_version: "1.1"
  instruction: "Build to Green"
  architecture: ArchitectureReference
  qa_suite: QASuiteReference
  acceptance_criteria: string
  organisationId: string
  metadata: {
    task_id: string
    priority: "low" | "normal" | "high" | "critical"
    timeout_seconds: number
  }
}
```

---

### 7.2 Response Structure

```typescript
interface BuilderResponseV1_1 {
  success: boolean
  protocol_version: "1.1"
  task_id: string
  builder: string
  
  // If success = true
  result?: {
    qa_status: "GREEN"
    tests_passing: number
    tests_total: number
    iterations: number
    artifacts: Artifact[]
    evidence: Evidence
  }
  
  // If success = false
  error?: {
    type: string
    message: string
    details: object
    action_required: string
  }
  
  telemetry: {
    duration_ms: number
    retry_count: number
    final_status: string
  }
  
  timestamp: string
}
```

---

### 7.3 Validation Sequence

**Every builder MUST execute this sequence**:

```
1. Validate protocol version = "1.1"
2. Validate instruction = "Build to Green"
3. Validate architecture reference exists
4. Validate QA suite reference exists
5. Validate QA status = "RED"
6. Validate failing_tests > 0
7. Validate acceptance_criteria defined
8. Validate no protected paths in scope
9. Log validation result to governance memory
10. Proceed with building OR reject with structured error
```

---

### 7.4 Checkpointing

**Checkpoint Creation**:
- Before each build iteration
- After each QA run
- Before escalation
- On task completion/failure

**Checkpoint Contents**:
```typescript
interface BuilderCheckpoint {
  checkpoint_id: string
  task_id: string
  builder: string
  iteration: number
  qa_status: {
    total: number
    passing: number
    failing: number
  }
  architecture_assumptions: string[]
  qa_assumptions: string[]
  next_action: string
  timestamp: string
}
```

**Recovery**: If builder crashes, resume from last checkpoint.

---

## 8. Philosophy Tree Integration

### 8.1 Foreman Controls Philosophy Tree

**Rule**: Builders DO NOT interpret or modify Philosophy Tree.

**Philosophy Tree Authority**: Foreman exclusively

**Builder Behavior**:
- Treat Philosophy Tree as "Foreman-controlled truth"
- Never modify Philosophy Tree files
- Never contradict Philosophy Tree principles
- Accept references to Philosophy Tree from Foreman

---

### 8.2 Philosophy Tree References in Build-to-Green

**Foreman may include**:
```typescript
interface BuildToGreenWithPhilosophy {
  instruction: "Build to Green"
  architecture: {...}
  qa_suite: {...}
  philosophy_context: {
    principles: string[]  // References to Philosophy Tree principles
    constraints: string[] // Philosophy-derived constraints
  }
}
```

**Builder Action**: Follow philosophy context as part of architecture.

---

## 9. Deterministic Build Loops

### 9.1 Iterative Build-to-Green Until 100% QA Passes

**Loop Structure**:
```typescript
async function buildToGreen(request: BuildToGreenRequest): Promise<BuildResult> {
  let iteration = 0
  const maxIterations = 100
  
  while (iteration < maxIterations) {
    iteration++
    
    // Checkpoint
    await createCheckpoint(iteration, request)
    
    // Run QA
    const qaResult = await runQA(request.qa_suite.location)
    
    // Check completion
    if (qaResult.passing === qaResult.total) {
      return {
        success: true,
        qa_status: "GREEN",
        iterations: iteration,
        tests_passing: qaResult.passing,
        tests_total: qaResult.total
      }
    }
    
    // Build to make next test pass
    await implementForNextTest(qaResult.failures[0], request.architecture)
  }
  
  // Max iterations exceeded
  throw new MaxIterationsError(`Could not achieve green QA within ${maxIterations} iterations`)
}
```

---

### 9.2 Incremental Failure Handling

**Strategy**: Fix one test at a time, verify progress.

**Progress Validation**:
- If passing count increases → Making progress, continue
- If passing count same for 3 iterations → Stuck, escalate
- If passing count decreases → Regression, rollback last change

---

### 9.3 Local QA Validation

**Before reporting completion**:
```typescript
async function validateFinalQA(qa_suite: QASuite): Promise<boolean> {
  // Run QA locally one final time
  const result = await runQA(qa_suite.location)
  
  // Verify 100% passing
  if (result.passing !== result.total) {
    throw new QANotGreenError(
      `QA is not 100% passing: ${result.passing}/${result.total}`
    )
  }
  
  // Verify zero errors
  if (result.errors > 0) {
    throw new QAHasErrorsError(`QA has ${result.errors} errors`)
  }
  
  // Verify zero warnings
  if (result.warnings > 0) {
    throw new QAHasWarningsError(`QA has ${result.warnings} warnings`)
  }
  
  return true
}
```

---

### 9.4 Clean PR Outputs

**Before creating PR**:
1. Run lint → Fix all errors
2. Run type check → Fix all type errors
3. Run build → Ensure successful
4. Run QA → Ensure 100% green
5. Generate evidence artifacts
6. Create PR with evidence

**No shortcuts**: PR is only created when all checks pass.

---

## 10. Multi-Builder Fallback Logic

### 10.1 Fallback Chain Definition

**Primary → Secondary → Escalation**:

```
Task Received
    │
    ├─ Route to Primary Builder (GitHub Copilot)
    │      │
    │      ├─ Success → Complete ✓
    │      │
    │      └─ Failure (5+ retries or unhealthy) → Fallback
    │             │
    │             └─ Route to Secondary Builder (Local Builder)
    │                    │
    │                    ├─ Success → Complete ✓
    │                    │
    │                    └─ Failure → Escalate to Foreman
```

---

### 10.2 Fallback Triggers

**Trigger fallback when**:
1. Primary builder health = unhealthy or degraded
2. Primary builder 5+ consecutive failures
3. Primary builder timeout (no response for 5 minutes)
4. Primary builder reports "cannot complete"
5. Token exhaustion detected

---

### 10.3 Fallback Execution

**Process**:
```typescript
async function executeWithFallback(request: BuildToGreenRequest): Promise<BuildResult> {
  const primaryBuilder = getPrimaryBuilder(request)
  const secondaryBuilder = getSecondaryBuilder(request)
  
  try {
    // Attempt with primary
    return await primaryBuilder.execute(request)
  } catch (error) {
    // Log fallback event
    await logGovernanceEvent({
      type: "builder_fallback",
      from: primaryBuilder.name,
      to: secondaryBuilder.name,
      reason: error.message,
      task_id: request.metadata.task_id
    })
    
    // Attempt with secondary
    try {
      return await secondaryBuilder.execute(request)
    } catch (secondaryError) {
      // Escalate to Foreman
      await escalateToForeman({
        task_id: request.metadata.task_id,
        primary_error: error,
        secondary_error: secondaryError,
        request: request
      })
      throw new BuilderNetworkFailureError("All builders failed")
    }
  }
}
```

---

### 10.4 Context Preservation in Fallback

**Transfer to Secondary Builder**:
- Full Build-to-Green request
- All checkpoints from primary builder
- Error logs from primary builder
- Iteration count
- QA progress so far

**Secondary builder starts where primary left off.**

---

## 11. Builder Health Monitor

### 11.1 Continuous Health Checks

**Check Frequency**: Every 60 seconds  
**Checks**:
1. Builder API reachable
2. Authentication valid
3. Recent successful builds (within 1 hour)
4. Error rate < 20%
5. Average latency < 5 seconds

---

### 11.2 Health Status Updates

**Update Frequency**: On every health check  
**Storage**: Governance memory

**Health Record**:
```typescript
interface BuilderHealthRecord {
  builder: string
  timestamp: string
  status: "healthy" | "degraded" | "unhealthy" | "dead"
  checks: {
    api_reachable: boolean
    auth_valid: boolean
    recent_success: boolean
    error_rate: number
    avg_latency_ms: number
  }
  last_success: string | null
  last_error: string | null
}
```

---

### 11.3 Degraded Mode Handling

**When builder enters degraded mode**:
- Continue accepting tasks
- Increase monitoring frequency (30s)
- Log all errors
- Notify Foreman if degradation persists > 10 minutes

---

### 11.4 Dead Builder Detection

**Builder considered dead when**:
- 3 consecutive health checks fail
- No heartbeat for 5 minutes
- API unreachable for 3 minutes

**Action**: Remove from active pool, route all tasks to fallback.

---

## 12. Constitutional Enforcement Mechanisms

### 12.1 Code-Level Enforcement

**Every builder repository includes**:
- `/lib/validation/build-to-green-validator.ts`
- `/lib/validation/constitutional-validator.ts`
- `/lib/validation/protected-paths.ts`

**Validation runs before every task.**

---

### 12.2 Runtime Enforcement

**Builder APIs enforce**:
- Protocol v1.1 structure
- Build-to-Green instruction format
- Red QA existence
- Protected path restrictions

**Rejection on violation.**

---

### 12.3 CI/CD Enforcement

**Builder deployment pipelines verify**:
- Validation logic exists
- Validation tests pass
- Constitutional checks pass
- No bypasses in code

**Block deployment on failure.**

---

### 12.4 Governance Memory Enforcement

**Foreman monitors**:
- Builder compliance with constitutional rules
- Builders accepting invalid instructions
- Builders skipping validation
- Builders bypassing QA

**Escalate violations to Johan immediately.**

---

## 13. Success Criteria

### 13.1 Builder Network Readiness = 15/15

**Criteria**:
1. ✅ All builders enforce protocol v1.1
2. ✅ All builders enforce Build-to-Green only
3. ✅ All builders enforce Red QA requirement
4. ✅ All builders enforce protected path restrictions
5. ✅ All builders implement checkpointing
6. ✅ All builders report telemetry
7. ✅ All builders implement health monitoring
8. ✅ All builders implement failure escalation
9. ✅ Primary → Secondary fallback works
10. ✅ Evidence generation works
11. ✅ PR validation works
12. ✅ Philosophy Tree integration works
13. ✅ Deterministic build loops work
14. ✅ 100% QA enforcement works
15. ✅ Governance memory logging works

---

### 13.2 Zero Constitutional Violations

**Target**: 0 BuildPhilosophyViolation errors accepted by builders.

---

### 13.3 100% QA Passing Before Merge

**Target**: Every PR has evidence of 100% QA passing.

---

### 13.4 Fallback Chain Validated

**Target**: Successful fallback from primary to secondary builder in test scenarios.

---

## 14. Version History

**v1.0** (2025-12-09): Initial builder ecosystem architecture  
**v1.1** (2025-12-11): Constitutional alignment, checkpointing, telemetry, fallback, Philosophy Tree integration

---

## 15. References

- `/BUILD_PHILOSOPHY.md` - Build Philosophy v1.1
- `/.github/foreman/agent-contract.md` - Foreman Constitutional Contract
- `/foreman/builder-specs/build-to-green-rule.md` - Build-to-Green Rule
- `/foreman/architecture-design-checklist.md` - Architecture Design Checklist
- `/foreman/qa/qa-first-workflow.md` - QA-First Workflow
- `/foreman/governance/pr-merge-validator.md` - PR Merge Validator

---

**End of Builder Ecosystem v1.1 Architecture**

*This architecture is the canonical specification for all builder behavior in the Maturion Engineering Ecosystem.*
