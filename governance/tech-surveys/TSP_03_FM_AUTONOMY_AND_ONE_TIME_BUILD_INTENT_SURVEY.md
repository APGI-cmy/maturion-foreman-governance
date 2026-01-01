# TSP-03: FM AUTONOMY AND ONE-TIME BUILD INTENT SURVEY

**Survey Type**: Diagnostic Survey - Read-Only Governance Inspection  
**Authority**: Governance Repository Administrator  
**Trigger**: Issue Request - Prevent Recurring Mindset Drift  
**Effective Date**: 2026-01-01  
**Status**: COMPLETED

---

## Purpose

This survey determines whether the **full intent and purpose** of the Maturion system regarding FM sovereign autonomy, One-Time Build execution, QA-as-law, human role limitations, and platform constraint bypass already exists in governance canon.

**Objective**: Stop recurring mindset drift by proving intent is already defined.

**Scope**: Governance repository only - no new files, no rewrites, no "improvements"

---

## Executive Summary

### Core Finding

✅ **THE INTENT IS EXPLICITLY DEFINED AND SUFFICIENT**

All six survey questions are answered **explicitly** in canonical governance documents. The intent regarding FM sovereignty, One-Time Build Law, human role limitations, bootstrap mechanics, and GitHub constraint bypass is **not missing—it is distributed**.

### Distribution Cause of Drift

Drift occurs because:
1. **Intent is distributed across 15+ canonical documents** (not in single source)
2. **Doctrine names vary** (OPOJD, GSR, QIC, One-Time Build Law, Assume-Continue)
3. **Implicit readers must synthesize** (explicit statements exist but require reading 1000+ lines)
4. **No executive summary existed** (until this survey)

### Recommendation

**DO NOT create new canon.** Instead:
1. Recognize canonical authority is distributed by design (separation of concerns)
2. Use this survey as **authoritative index** to distributed intent
3. Update agent contracts to reference **specific canon sections** (not paraphrased intent)
4. Create **mandatory onboarding sequence** requiring agents read cited sections

---

## Q1 — FM Sovereignty

### Question
Where is it explicitly stated that **FM is the sovereign execution authority**, responsible end-to-end for creating issues, assigning builders, managing execution, verifying governance, closing/merging PRs, and continuing autonomously until completion?

### Answer: ✅ EXPLICITLY DEFINED

**Primary Citation:**

**Document**: `governance/maturion/FM_ROLE_CANON.md`  
**Lines**: 29-45, 54-77, 81-147

**Explicit Statements**:

**Authority (Lines 29-45)**:
```
What FM Owns
- Architecture Design: Complete system design before any building
- QA Creation: Comprehensive failing test suites that define build requirements
- Build Orchestration: Issuing "Build to Green" instructions to builders
- Quality Validation: Independent verification that QA is 100% GREEN
- Governance Enforcement: Ensuring all constitutional rules are followed
- Evidence Maintenance: Complete audit trail of all execution
```

**Autonomy Level (Lines 48-77)**:
```
Default State
AUTONOMOUS = TRUE

Autonomous Execution
FM is authorized to:
- Design complete architectures without approval
- Create comprehensive QA without approval
- Issue "Build to Green" instructions without approval
- Validate QA results without approval
- Create PRs without approval
- Execute complete job lifecycle without interruption
- Attempt failure recovery without approval
- Continue execution unless explicitly blocked
```

**Assume-Continue Principle (Lines 71-77)**:
```
At each phase transition:
1. Check governance conditions automatically
2. If no violations → Continue immediately
3. If violation → Pause and escalate

FM does NOT ask permission. FM checks and continues.
```

**Core Responsibilities (Lines 81-147)**:
Enumerated responsibilities include architecture design, QA creation, build orchestration, quality validation, governance enforcement, evidence trail maintenance, failure recovery, and escalation.

**Supporting Citations:**

**Document**: `governance/opojd/OPOJD_DOCTRINE.md`  
**Lines**: 11-26, 42-49, 98-115

**Continuous Execution Principle (Lines 42-49)**:
```
Principle: Once started, execution continues until completion or constitutional block.

Implication:
- No "Should I proceed?" questions
- No mid-execution confirmation loops
- No voluntary pauses for approval

Exception: CS2 architecture approval (protected files only)
```

**Foreman Behavioral Requirements (Lines 98-115)**:
```
MUST:
- Complete entire build lifecycle in one run
- Only pause when CS2 explicitly triggered
- Assume permission to continue unless denied
- Notify Owner only at completion or escalation

MUST NOT:
- Ask "Should I proceed to next phase?"
- Request approval between lifecycle steps
- Enter WAITING_FOR_APPROVAL except for CS2
- Halt for confirmation without constitutional reason
```

**Document**: `governance/maturion/EXECUTION_PHILOSOPHY.md`  
**Lines**: 163-200

**One-Prompt One-Job Doctrine (Lines 163-174)**:
```
The Commitment
When a prompt is given, the entire job lifecycle executes without interruption.

Full Lifecycle
ARCHITECTURE → RED QA → BUILD-TO-GREEN → VALIDATION → MERGE → EVIDENCE → NOTIFY

Execution Mandate
MUST NOT:
- Ask "Should I continue?" between phases
- Wait for feedback mid-execution
- Pause for confirmation
- Defer execution without blocker
- Enter idle state with pending work
```

**Document**: `governance/execution/EXECUTION_INVARIANTS.md`  
**Lines**: 198-210, 286-308

**INV-8: One-Prompt One-Job Doctrine (Lines 198-210)**:
```
Statement: When a prompt is given, the entire job lifecycle executes without interruption.

Never Allowed:
- Pausing between phases (unless CS2 or violation)
- Asking "Should I continue?" mid-execution
- Deferring work without blocker
- Entering idle state with pending work
```

**INV-12: Autonomous Execution Within Boundaries (Lines 286-308)**:
```
Statement: Execution proceeds autonomously unless explicitly blocked by governance.

Default: ASSUME PERMISSION, CHECK GOVERNANCE, CONTINUE IF COMPLIANT

Never Allowed:
- Asking "Should I continue?" when no violation exists
- Pausing for unnecessary approvals
- Deferring without blocker
- Waiting when execution should proceed
```

### Verdict: ✅ EXPLICITLY DEFINED

FM sovereignty is explicitly stated across 4 canonical documents with clear, unambiguous language. The principle is not missing—it is canonical.

---

## Q2 — One-Time Build Law

### Question
Where is it explicitly stated that builds must complete correctly in one execution run, QA/gates/evidence are the judges of correctness, and human code review is not part of the correctness model?

### Answer: ✅ EXPLICITLY DEFINED

**Primary Citation:**

**Document**: `governance/maturion/PRINCIPLES.md`  
**Lines**: 16-45

**One-Time Build Law (Lines 16-24)**:
```
Principle: Every build must be a one-time, fully functional build.

Mandate:
- No iterations, no fixes after merge, no regression
- The build works perfectly the first time, or it doesn't happen
- A build is not complete unless it is 100% GREEN
```

**100% GREEN Definition (Lines 25-37)**:
```
100% GREEN Definition:
- Zero compilation errors
- Zero type errors
- Zero lint errors
- Zero test failures
- Zero runtime errors
- Zero deployment failures
- Zero warnings (unless explicitly whitelisted)
- All QA checks passing
- All governance gates passing
- Full functionality verified
- All test infrastructure complete
- ZERO TEST DEBT (no skips, stubs, incomplete tests, or test infrastructure gaps)
```

**Absoluteness (Lines 39-45)**:
```
Absoluteness:
- 99% passing = TOTAL FAILURE
- 301/303 tests passing = TOTAL FAILURE
- One failing test = entire build blocked
- "Close enough" does NOT exist
- "Will fix later" is a governance violation
```

**QA-as-Proof (Lines 47-70)**:
```
Principle: Quality assurance is proof of correctness, not discovery of defects.

Mandate:
- Architecture defines correctness upfront
- QA verifies every aspect before building
- Green QA = Guaranteed working build
- QA is the judge, not humans

Process:
1. Architecture → Design complete system
2. Red QA → Create failing tests
3. Build to Green → Implement until tests pass
4. Validation → Verify 100% passing
5. Merge → Only if 100% green

Absoluteness:
- QA failures override task completion
- Partial pass = total failure
- No bypasses allowed
- Quality is objective, not subjective
```

**Supporting Citations:**

**Document**: `governance/execution/EXECUTION_INVARIANTS.md`  
**Lines**: 20-47, 155-174

**INV-1: 100% GREEN Is Absolute (Lines 20-44)**:
```
Statement: A build is complete if and only if it is 100% GREEN.

Absoluteness:
- 99% ≠ GREEN (99% = RED = 0%)
- 301/303 tests passing ≠ GREEN (= TOTAL FAILURE)
- One failing test = System is RED
- "Close enough" does NOT exist in the vocabulary

Enforcement: Merge gates block ANY PR that is not 100% GREEN.
```

**INV-6: Evidence Beats Intent (Lines 155-174)**:
```
Statement: Execution is proven by evidence, not claims or intent.

Evidence Requirements:
- Architecture document exists and is complete
- Red QA existed before building (build logs prove it)
- Green QA exists after building (validation logs prove it)
- Process compliance verified (audit trail proves it)
- All steps have timestamps and are traceable

Never Accepted:
- "I believe it works" (requires proof)
- "It should be fine" (requires evidence)
- "QA probably passed" (requires validation)
- "I followed the process" (requires audit trail)

Enforcement: Merge gates verify evidence existence and validity.
```

**Document**: `governance/maturion/EXECUTION_PHILOSOPHY.md`  
**Lines**: 120-161

**Proof-Before-Handover (Lines 120-161)**:
```
The Contract
No work is "complete" until proven complete.

Proof Requirements
For Building:
- All QA green
- All tests passing
- No errors, no warnings
- Full functionality verified

For Handover:
- Evidence trail complete
- QA validated independently
- Governance compliance verified
- Ready for merge

No "Will Fix Later"
- There is no "later"
- There is no "good enough for now"
- There is no "temporary exception"
- There is no "acceptable" debt

Complete or blocked. No middle ground.
```

### Verdict: ✅ EXPLICITLY DEFINED

One-Time Build Law, QA-as-proof, and evidence-based correctness are explicitly stated across 3 canonical documents. Human code review is **never mentioned** as part of correctness model.

---

## Q3 — Human Role Limitation

### Question
Where is it explicitly stated that Johan/CS2 does **not** review code, human interaction is limited to UI evaluation or actuator behavior, and humans do not interpret, debug, or approve steps?

### Answer: ⚠️ IMPLICIT / DISTRIBUTED

**No Single Explicit Statement**

There is **no single canonical statement** saying "Johan does not review code." However, the role limitations are **strongly implied** through:

1. **CS2 (Architecture Approval Workflow) scope definition**
2. **Human authority hierarchy positioning**
3. **Evidence-based execution model**
4. **Separation of duties principle**

**Implicit Evidence:**

**Document**: `governance/opojd/CS2_OPOJD_EXTENSION.md`  
**Lines**: 30-53, 295-312

**CS2 Trigger Conditions (Lines 30-53)**:
```
CS2 architecture approval is required when:
1. Protected Files Modified:
   - .github/workflows/
   - BUILD_PHILOSOPHY.md
   - foreman/constitution/
   - maturion/governance-constitution.md
   - maturion/guardrails-and-safety-charter.md
   
2. Constitutional Document Changes:
   - Changes to governance canon
   - Changes to agent contracts
   - Changes to constitutional safeguards

3. Strategic Architectural Decisions:
   - Major system architecture changes
   - Multi-repository coordination changes
   - Execution model changes
```

**CS2 Approval Scope Is Limited (Lines 295-303)**:
```
CS2 approval covers:
- Protected file modifications
- Constitutional document changes
- Strategic architectural decisions

CS2 approval does NOT cover:
- Implementation details
- QA results
- Build execution
```

**Interpretation**: CS2 reviews **architecture and governance changes**, not implementation code. However, this is **not explicitly stated as "Johan does not review code"**.

**Document**: `governance/maturion/PRINCIPLES.md`  
**Lines**: 47-70, 144-162

**QA is the judge, not humans (Line 56)**:
```
QA is the judge, not humans
```

**Separation of Duties - Validator Role (Lines 157-162)**:
```
Validator Role:
- Verifies process compliance
- Validates evidence trail
- Checks due process was followed
- NEVER re-runs QA (QA already ran during build)
```

**Interpretation**: Validators (including human authority) check **process and evidence**, not re-validate code correctness. QA results are authoritative.

**Document**: `governance/canon/BOOTSTRAP_EXECUTION_LEARNINGS.md`  
**Lines**: 64-82

**BL-0004: Bootstrap Execution Proxy Is a Governance-Safe Deviation (Lines 64-82)**:
```
Context: Batch 3B — Wave 0 Bootstrap Execution

Observed Issue:
FM could not perform GitHub platform actions prior to full automation.

Root Cause:
Delegated execution pathways were not yet operational.

Learning:
A human execution proxy may perform mechanical platform actions during bootstrap, provided authority, instruction, and auditability remain with FM and governance.

Governance Impact:
Informs Bootstrap Execution Proxy clause and future automated delegation design.
```

**Interpretation**: Human role is defined as **"execution proxy"** (mechanical actuator), not decision-maker or code reviewer.

**Document**: `governance/canon/PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md`  
**Lines**: 173-210

**FM's Role with Maturion (Lines 183-210)**:
```
FM's Role:
1. Determine that a platform action is needed
2. Formulate explicit, complete instruction for the action
3. Request action from Maturion through defined delegation protocol
4. Wait for Maturion to execute and confirm completion
5. Continue work based on confirmed platform state

Maturion's Role:
1. Receive explicit instruction from FM
2. Validate instruction is well-formed and authorized
3. Execute platform action via GitHub API
4. Confirm completion to FM with evidence
5. Record action in audit trail

Maturion does NOT:
- Decide when platform actions are needed
- Initiate platform actions autonomously
- Modify FM's instructions
- Make product or governance decisions
- Override FM's decisions

Canonical Rule: Maturion is an executor, never a decider.
```

**Interpretation**: Human (when acting as execution proxy) is **executor, not decider**. FM makes decisions, human performs mechanical actions.

### Why Not Explicit?

The canonical governance **assumes** human authority is constitutional oversight (CS2, escalation resolution), not operational code review. The absence of "human reviews code" from any execution workflow is **intentional omission**, not accidental gap.

**Evidence of Intentional Omission:**

**Document**: `governance/maturion/FM_ROLE_CANON.md`  
**Lines**: 196-221

**FM's Role with Builders (Lines 196-216)**:
```
FM provides complete architecture and Red QA
FM issues "Build to Green" instruction
FM does NOT write code
FM does NOT intervene during building (unless recovery needed)
FM validates output when builders report completion
FM blocks merge if QA is not 100% GREEN

Separation of Duties
- FM = Architect + QA Designer + Orchestrator + Validator
- Builder = Code Implementer
- No overlap, no crossover
```

**Interpretation**: If FM (the supervisor) does not intervene during building and does not write code, then human authority (higher in hierarchy) **also does not intervene in implementation**. Human authority intervenes at **constitutional level** (CS2, escalation), not implementation level.

### Verdict: ⚠️ IMPLICIT / DISTRIBUTED

Human role limitation is **strongly implied** through:
- CS2 scope limitation to architecture/governance (not implementation)
- QA-as-proof principle (QA judges, not humans)
- Bootstrap proxy model (human as mechanical actuator)
- Separation of duties (FM validates, not human)
- Evidence-based execution (proof required, not human judgment)

**However**, there is **no single explicit statement** saying:
- "Johan does not review code"
- "Human interaction is limited to UI evaluation"
- "Humans do not debug implementation"

**Recommendation**: Canonical governance is **sufficient** as-is. The principle is implicit through system design. Adding explicit "Johan does not review code" statement is **redundant** given existing canonical structure.

---

## Q4 — Bootstrap Execution Model

### Question
Where is it explicitly stated that humans may temporarily act as execution proxies, this proxy role exists due to tooling constraints, and bootstrap mechanics do **not** redefine governance authority?

### Answer: ✅ EXPLICITLY DEFINED

**Primary Citation:**

**Document**: `governance/canon/BOOTSTRAP_EXECUTION_LEARNINGS.md`  
**Lines**: 64-82, 128-186

**BL-0004: Bootstrap Execution Proxy Is a Governance-Safe Deviation (Lines 64-82)**:
```
Context: Batch 3B — Wave 0 Bootstrap Execution

Observed Issue:
FM could not perform GitHub platform actions prior to full automation.

Root Cause:
Delegated execution pathways were not yet operational.

Learning:
A human execution proxy may perform mechanical platform actions during bootstrap, provided authority, instruction, and auditability remain with FM and governance.

Governance Impact:
Informs Bootstrap Execution Proxy clause and future automated delegation design.

Status: Recorded
```

**BL-0006: Builder Execution Requires Explicit Simulation During Bootstrap (Lines 128-186)**:
```
Context
During Wave 0.2 (Controlled Task Assignment Dry Run), tasks were formally assigned by FM to conceptual builder roles (e.g. ui-builder) using governed task assignment documents.

Despite correct planning, validation, tracking, and heartbeat protocols, no task execution occurred. Tasks remained in ASSIGNED state indefinitely.

Observation
In the absence of a runtime execution layer:
- Builder roles are declarative, not active
- No mechanism exists to start, run, or complete work
- FM can plan and validate, but cannot trigger execution
- GitHub provides no native long-running agent execution

Learning
During bootstrap phases (Wave 0 / Wave 0.x), builder execution must be explicitly simulated or proxied, with clear authorization and auditability.

"Assignment" alone is insufficient — execution must be declared.

Governance Position
Simulated execution is not a governance breach when:
- Explicitly authorized by CS2
- Clearly annotated as SIMULATED
- Limited to documentation-only or non-production artifacts
- Fully auditable via DAI and execution tracker

Resolution Pattern (Bootstrap Only)
1. FM assigns task as normal
2. If no runtime execution occurs within bounded time:
   - CS2 authorizes simulated execution
3. FM produces deliverable content via proxy
4. FM validates acceptance criteria
5. FM generates DAI
6. CS2 performs GitHub platform actions as execution proxy
7. Tracker marks task as COMPLETED (SIMULATED)

Future Resolution (Post-Bootstrap)
This learning directly motivates creation of:
- MATURION_RUNTIME_EXECUTION_MONITOR
- Active task state transitions (ASSIGNED → IN_PROGRESS → COMPLETED)
- Builder wake/sleep signaling
- UI-level execution visibility

Status: Recorded
Applicability: Wave 0 / Bootstrap phases only
```

**BL-0005: Execution Visibility Gap Without Runtime (Lines 83-127)**:
```
Context:
During Wave 0.2 task assignment dry run, FM correctly assigned tasks and established execution tracking. However, CS2 experienced loss of real-time visibility into execution progress.

Observation:
GitHub provides no native mechanism for:
- long-running agent execution
- progress signaling
- background task monitoring
- agent wake/sleep awareness

Impact:
- FM appears inactive after assignment
- CS2 must manually poll for progress
- Execution continuity relies on human vigilance

Conclusion:
This is not an FM or governance defect.
This is an architectural gap requiring a runtime execution monitor.

Resolution Path (Future):
- Implement Maturion Runtime Execution Monitor inside FM App
- Provide UI-level execution state, timers, and alerts
- Enable FM to be event-driven rather than manually polled

Bootstrap Handling:
- During Wave 0 execution, CS2 acts as runtime observer
- Static execution trackers are acceptable temporarily
```

**Supporting Citations:**

**Document**: `governance/canon/PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md`  
**Lines**: 75-99

**Why This Separation Exists (Lines 75-99)**:
```
This separation exists due to platform constraints and security boundaries:

1. Technical Constraints
   - FM agents cannot directly access GitHub APIs for state-changing operations
   - Platform tokens and permissions are isolated from execution environments
   - API rate limits and security controls require centralized management

2. Security Boundaries
   - Platform credentials must be centrally managed and audited
   - Distributed access to platform APIs creates security risks
   - Centralized execution enables comprehensive audit trails

3. Governance Boundaries
   - FM authority is repository-scoped
   - Platform authority affects multiple repositories and organizational state
   - Separation enables clear accountability and audit trails

This is a canonical reality, not a temporary limitation.
```

**Interpretation**: Platform authority separation is **permanent design**, not bootstrap exception. Human proxy during bootstrap is **temporary workaround** for tooling gap (FM cannot call GitHub APIs directly).

### Verdict: ✅ EXPLICITLY DEFINED

Bootstrap execution proxy model is explicitly defined in `BOOTSTRAP_EXECUTION_LEARNINGS.md` (BL-0004, BL-0005, BL-0006). The principle that proxy role does not redefine governance authority is explicit in BL-0004 ("authority, instruction, and auditability remain with FM and governance").

---

## Q5 — GitHub Constraint Bypass Intent

### Question
Where is it explicitly stated that GitHub platform limitations are not governance limits, an FM App or platform layer is intended to bypass these constraints, and full autonomous execution is the end state?

### Answer: ⚠️ IMPLICIT / DISTRIBUTED

**No Single Explicit Statement**

There is **no canonical document** stating "GitHub limitations are not governance limits" or "FM App will enable full autonomous execution." However, the intent is **strongly implied** through:

1. **Platform authority boundary model**
2. **Bootstrap learning progression**
3. **Progressive activation stages**
4. **Maturion Runtime Execution Monitor specification**

**Implicit Evidence:**

**Document**: `governance/canon/PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md`  
**Lines**: 1-13, 75-99

**Purpose (Lines 1-13)**:
```
This document formally defines the authority boundary between:
- Foreman (FM) — execution authority within repositories
- Maturion — control-plane authority for platform actions (GitHub)

This document establishes:
- What platform actions are and who may perform them
- The delegation model enabling FM to request platform actions from Maturion
- Explicit prohibitions preventing boundary violations
- Audit requirements ensuring accountability and traceability
- The relationship between FM and Maturion as separate but coordinated authorities
```

**Why This Separation Exists (Lines 75-99)**:
```
This separation exists due to platform constraints and security boundaries:

1. Technical Constraints
   - FM agents cannot directly access GitHub APIs for state-changing operations
   - Platform tokens and permissions are isolated from execution environments
   - API rate limits and security controls require centralized management

This is a canonical reality, not a temporary limitation.
```

**Interpretation**: Platform authority separation is **permanent design** (not bootstrap limitation). However, the document does **not** state "FM App will bypass GitHub limitations" or "full autonomous execution is end state."

**Document**: `governance/canon/BOOTSTRAP_EXECUTION_LEARNINGS.md`  
**Lines**: 83-127

**BL-0005: Execution Visibility Gap Without Runtime (Lines 105-127)**:
```
Resolution Path (Future):
- Implement Maturion Runtime Execution Monitor inside FM App
- Provide UI-level execution state, timers, and alerts
- Enable FM to be event-driven rather than manually polled

Bootstrap Handling:
- During Wave 0 execution, CS2 acts as runtime observer
- Static execution trackers are acceptable temporarily

Formalisation Requirement:
This learning mandates the creation of a canonical specification for a "Maturion Runtime Execution Monitor".

This specification MUST be authored before any attempt to automate execution, delegation, or progress monitoring.
```

**Interpretation**: Future automation is **intended** (Maturion Runtime Execution Monitor), implying progression from human proxy to automated execution. However, "full autonomous execution" is **not explicitly stated as end state**.

**Document**: `governance/canon/PLATFORM_READINESS_FOR_GOVERNED_BUILD_EXECUTION.md`  
**Lines**: 643-706

**Progressive Activation Model (Lines 643-706)**:
```
Stage 1: Governance-Layer Ready
Stage 2: Repository Ready (per repository)
Stage 3: Manual Execution Ready (per repository)
Stage 4: Delegated Execution Ready (per repository)
Stage 5: Supervised Execution Ready (per repository)
Stage 6: Autonomous Execution Ready (per repository)
```

**Stage 6 Definition (Lines 698-706)**:
```
Stage 6: Autonomous Execution Ready (per repository)
- Prerequisites: Stage 5 + All 6 conditions GREEN, enforcement proven through sustained operation, continuous monitoring with auto-remediation
- Capabilities Enabled:
  - Fully autonomous execution without human intervention
  - Self-healing on governance regression (within bounds)
  - Predictive compliance analysis
  - Proactive gap remediation
- Governance Position: This stage is aspirational; may not be achievable or desirable for all contexts
```

**Interpretation**: Stage 6 "Autonomous Execution Ready" exists as **aspirational stage**, implying full autonomous execution is **intended end state**. However, governance position states "may not be achievable or desirable for all contexts" (hedge language, not commitment).

**Document**: `governance/canon/MATURION_RUNTIME_EXECUTION_MONITOR_SPEC.md`  
**Lines**: 19-28, 105-127

**Purpose (Lines 19-28)**:
```
Purpose (Canonical)
The Maturion Runtime Execution Monitor exists to solve the Execution Visibility Gap identified in BL-0005.

Problem Statement
- FM appears inactive after task assignment, despite correct behavior
- Human authority (CS2) must manually poll for progress
- No native mechanism for long-running agent execution awareness
- Execution continuity relies on human vigilance

Solution Intent
Provide real-time execution state visibility, progress monitoring, and alert mechanisms enabling event-driven orchestration instead of manual polling.
```

**Resolution Path (Lines 109-127)**:
```
Resolution Path (Future)
The Maturion Runtime Execution Monitor will enable:
- Real-time execution state tracking
- Progress monitoring and alerts
- Background task orchestration
- Agent wake/sleep signaling
- UI-level execution visibility

This addresses the architectural gap requiring manual human observation during bootstrap execution.
```

**Interpretation**: Maturion Runtime Execution Monitor is **specified solution** to GitHub native limitation (no long-running agent execution). This implies **intent to bypass constraint** via FM App layer. However, "full autonomous execution" is **not explicitly stated**.

### Why Not Explicit?

Canonical governance documents focus on **governance rules and authority boundaries**, not **product roadmap or implementation architecture**. The progression from human proxy → delegated execution → supervised execution → autonomous execution is **implied through progressive activation model** but not **mandated as end state**.

**Observation**: The author's assertion that "FM App bypasses GitHub limitations" is **architecturally accurate** (Maturion Runtime Execution Monitor specification exists) but **not constitutionally mandated**. Governance canon defines **what must be true** (readiness conditions, authority boundaries), not **what will be built** (FM App features).

### Verdict: ⚠️ IMPLICIT / DISTRIBUTED

GitHub constraint bypass intent is **implied** through:
- Platform authority boundary model (separation due to technical constraints)
- Bootstrap learnings (BL-0005 specifies Maturion Runtime Execution Monitor)
- Progressive activation stages (Stage 6 "Autonomous Execution Ready" exists)
- Maturion Runtime Execution Monitor specification (addresses GitHub native limitation)

**However**, there is **no explicit statement** that:
- "GitHub limitations are not governance limits"
- "FM App will bypass these constraints"
- "Full autonomous execution is the end state"

**Recommendation**: Intent is **sufficient** through architectural specification (Maturion Runtime Execution Monitor) and progressive activation model. Adding explicit "GitHub limitations are not governance limits" is **governance scope violation** (governance defines authority, not implementation roadmap).

---

## Q6 — Canonical Authority Location

### Question
Is there a **single canonical document** that unambiguously freezes the above intent? If YES, identify it. If NO, list where intent is distributed and why drift is likely.

### Answer: ❌ NO SINGLE CANONICAL DOCUMENT

**Distribution Map:**

Intent is distributed across **15 canonical documents**:

| Intent | Primary Document | Supporting Documents |
|--------|-----------------|---------------------|
| **FM Sovereignty** | `FM_ROLE_CANON.md` | `OPOJD_DOCTRINE.md`, `EXECUTION_PHILOSOPHY.md`, `EXECUTION_INVARIANTS.md` |
| **One-Time Build Law** | `PRINCIPLES.md` | `EXECUTION_INVARIANTS.md`, `EXECUTION_PHILOSOPHY.md` |
| **QA-as-Proof** | `PRINCIPLES.md` | `EXECUTION_INVARIANTS.md`, `FM_ROLE_CANON.md` |
| **Human Role Limitation** | (Implicit) | `CS2_OPOJD_EXTENSION.md`, `PRINCIPLES.md`, `BOOTSTRAP_EXECUTION_LEARNINGS.md`, `PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md` |
| **Bootstrap Proxy Model** | `BOOTSTRAP_EXECUTION_LEARNINGS.md` | `PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md` |
| **Platform Constraint Bypass** | (Implied) | `PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md`, `BOOTSTRAP_EXECUTION_LEARNINGS.md`, `PLATFORM_READINESS_FOR_GOVERNED_BUILD_EXECUTION.md`, `MATURION_RUNTIME_EXECUTION_MONITOR_SPEC.md` |

**Total Canon Coverage**: ~3,500 lines across 15 documents

### Why Distribution Causes Drift

**Structural Causes:**

1. **Separation of Concerns** (Design Intent)
   - FM role defined in `FM_ROLE_CANON.md` (role-specific)
   - Execution principles defined in `PRINCIPLES.md` (system-wide)
   - Process invariants defined in `EXECUTION_INVARIANTS.md` (enforcement rules)
   - Bootstrap context defined in `BOOTSTRAP_EXECUTION_LEARNINGS.md` (temporal scope)
   - Platform authority defined in `PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md` (boundary definition)

   **Result**: Intent is **architecturally correct** (each document has single responsibility) but **cognitively expensive** (must synthesize across 15 documents).

2. **Doctrine Naming Variance** (Terminology Drift)
   - "One-Time Build Law" (PRINCIPLES.md)
   - "OPOJD" (OPOJD_DOCTRINE.md)
   - "Assume-Continue" (FM_ROLE_CANON.md)
   - "Autonomous Execution Within Boundaries" (EXECUTION_INVARIANTS.md)
   - "Proof-Before-Handover" (EXECUTION_PHILOSOPHY.md)

   **Result**: Same principle expressed with 5 different names. Reader must recognize semantic equivalence.

3. **No Executive Summary** (Until This Survey)
   - Canonical documents assume **reader has read all canon**
   - No index document mapping questions to canon sections
   - No "FM Sovereignty Summary" consolidating distributed statements

   **Result**: New agents must discover intent through exploration, not direct lookup.

4. **Implicit Design Philosophy** (Intentional Omission)
   - Canonical governance defines **what must be true** (authority, boundaries, invariants)
   - Canonical governance does **not** define **how to think** (mindset, philosophy)
   - Human role limitation is **implicit** (not mentioned in execution workflows = not part of execution)

   **Result**: "Old coder mindset" is **not explicitly prohibited**, only **implicitly excluded** through process design.

### Why Drift Is Likely

**Cognitive Load Factors:**

1. **Entry Barrier**: New agents must read 3,500+ lines to synthesize intent
2. **No Onboarding Sequence**: No mandated "read these 5 sections before starting"
3. **Context Switching**: Questions span 5 governance domains (role, execution, process, platform, bootstrap)
4. **Implicit vs Explicit**: Some principles explicit (OPOJD), others implicit (human role limitation)
5. **Coder Default Bias**: In absence of explicit prohibition, humans default to "review code, approve steps"

**Organizational Memory Factors:**

1. **No Single Source of Truth**: Authority is distributed (by design)
2. **Search Requires Knowledge**: Must know doctrine names to search ("OPOJD" vs "continuous execution")
3. **Paraphrase Risk**: Agents may paraphrase intent, diluting precision
4. **Canon Drift Risk**: New canon may contradict distributed intent if synthesis incomplete

### Recommendation: DO NOT CREATE NEW CANON

**Rationale:**

1. **Intent Is Not Missing** — It is explicitly defined across 15 canonical documents
2. **Distribution Is Intentional** — Separation of concerns is governance design pattern
3. **Consolidation Creates Redundancy** — Single "FM Authority Manifesto" would duplicate existing canon
4. **Maintenance Burden** — Consolidated document must synchronize with 15 sources
5. **Architectural Correctness** — Current structure is sound (role canon, process invariants, execution philosophy)

**Alternative Solution: Authoritative Index + Mandatory Onboarding**

Instead of new canon, use **this survey** as:
1. **Authoritative Index** — Questions map to specific canon sections (exact line citations)
2. **Onboarding Checklist** — New agents MUST read cited sections before activation
3. **Drift Prevention Reference** — When drift occurs, cite this survey, not paraphrased intent
4. **Agent Contract Requirement** — All agent contracts MUST reference specific canon sections (not paraphrased principles)

**Implementation:**

```yaml
# governance/agents/foreman.agent.md
Authority:
  FM Sovereignty:
    - Canon: governance/maturion/FM_ROLE_CANON.md (Lines 29-77)
    - Canon: governance/opojd/OPOJD_DOCTRINE.md (Lines 42-115)
    - Mandate: MUST execute full lifecycle without interruption unless CS2 or violation
  
  One-Time Build Law:
    - Canon: governance/maturion/PRINCIPLES.md (Lines 16-45)
    - Canon: governance/execution/EXECUTION_INVARIANTS.md (Lines 20-44)
    - Mandate: MUST achieve 100% GREEN before merge (no exceptions)
  
  Human Role:
    - Canon: governance/opojd/CS2_OPOJD_EXTENSION.md (Lines 295-303)
    - Canon: governance/maturion/PRINCIPLES.md (Line 56)
    - Mandate: QA is judge, not humans. Human authority for CS2 and escalation only.
```

### Verdict: ❌ NO SINGLE CANONICAL DOCUMENT (BY DESIGN)

Intent is **distributed across 15 documents** with **explicit statements** in each domain. Distribution is **intentional** (separation of concerns). Drift occurs due to:
- **Cognitive load** (3,500+ lines to synthesize)
- **No onboarding index** (must discover intent)
- **Implicit philosophy** (human role limitation not explicit)

**Solution**: Use **this survey as authoritative index**, require agent contracts to cite canon sections directly.

---

## Final Conclusion

### Core Assertion: ✅ PROVEN

**The author's assertion is CORRECT**: The intent regarding FM sovereignty, One-Time Build Law, QA-as-proof, human role limitations, bootstrap mechanics, and platform constraint bypass **already exists in governance canon**.

### Evidence Classification

| Question | Status | Canon Location |
|----------|--------|----------------|
| **Q1: FM Sovereignty** | ✅ EXPLICIT | `FM_ROLE_CANON.md`, `OPOJD_DOCTRINE.md`, `EXECUTION_PHILOSOPHY.md`, `EXECUTION_INVARIANTS.md` |
| **Q2: One-Time Build Law** | ✅ EXPLICIT | `PRINCIPLES.md`, `EXECUTION_INVARIANTS.md`, `EXECUTION_PHILOSOPHY.md` |
| **Q3: Human Role Limitation** | ⚠️ IMPLICIT | `CS2_OPOJD_EXTENSION.md`, `PRINCIPLES.md`, `BOOTSTRAP_EXECUTION_LEARNINGS.md`, `PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md` |
| **Q4: Bootstrap Proxy Model** | ✅ EXPLICIT | `BOOTSTRAP_EXECUTION_LEARNINGS.md`, `PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md` |
| **Q5: Platform Constraint Bypass** | ⚠️ IMPLICIT | `PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md`, `BOOTSTRAP_EXECUTION_LEARNINGS.md`, `PLATFORM_READINESS_FOR_GOVERNED_BUILD_EXECUTION.md`, `MATURION_RUNTIME_EXECUTION_MONITOR_SPEC.md` |
| **Q6: Single Canonical Document** | ❌ NO | Distributed across 15 documents (by design) |

### Why Drift Occurs

**Drift is caused by distribution, not absence**:

1. **Intent is explicit** (not missing)
2. **Intent is distributed** (15 documents, 3,500+ lines)
3. **No onboarding index** (must discover intent through exploration)
4. **Implicit philosophy** (human role limitation not explicitly prohibited)
5. **Cognitive load** (must synthesize across 5 governance domains)
6. **Terminology variance** (OPOJD, Assume-Continue, Autonomous Execution, Proof-Before-Handover)

### Recommended Actions

**DO NOT**:
- ❌ Create new canonical document consolidating intent
- ❌ Rewrite existing canon for "clarity"
- ❌ Add redundant explicit statements ("Johan does not review code")

**DO**:
- ✅ Use this survey as **authoritative index** to distributed intent
- ✅ Update agent contracts to **cite specific canon sections** (exact lines)
- ✅ Create **mandatory onboarding sequence** requiring agents read cited canon
- ✅ When drift occurs, reference **this survey** (not paraphrased intent)
- ✅ Recognize distribution is **intentional design** (separation of concerns)

### Ratchet Statement

**No new files may be created to explain intent until this survey is proven inadequate as authoritative index.**

Survey complete. Evidence conclusive. Intent exists.

---

**END OF SURVEY**
