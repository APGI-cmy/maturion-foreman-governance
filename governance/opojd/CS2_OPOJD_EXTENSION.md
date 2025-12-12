# CS2 - Architecture Approval Workflow: OPOJD Extension

**Version:** 1.1 (OPOJD Integration)  
**Status:** Constitutional Extension  
**Authority:** Extends CS2 under OPOJD  
**Created:** 2025-12-12

---

## Executive Summary

This document extends **CS2 (Architecture Approval Workflow)** to integrate with the **One-Prompt One-Job Doctrine (OPOJD)**, clarifying when architecture approval pauses execution and when execution proceeds autonomously.

---

## Core OPOJD Principle for CS2

**Principle:** Only architecture changes require Owner approval. Execution MUST proceed autonomously after architecture is approved.

**Separation of Concerns:**
- **Architecture (Strategic):** Human judgment required
- **Implementation (Tactical):** Autonomous execution under OPOJD

---

## When CS2 Triggers Under OPOJD

### Trigger Conditions (UNCHANGED from CS2)

CS2 architecture approval is required when:

1. **Protected Files Modified:**
   - `.github/workflows/*`
   - `.github/foreman/agent-contract.md`
   - `BUILD_PHILOSOPHY.md`
   - `foreman/constitution/*`
   - `foreman/architecture-design-checklist.md`
   - `foreman/governance/*`
   - `docs/governance/*`

2. **Constitutional Changes:**
   - New governance rules
   - Constitutional document updates
   - Guardrail modifications

3. **Strategic Architectural Changes:**
   - New system-wide patterns
   - Breaking changes to architecture
   - Changes affecting multiple modules
   - Security model changes

### Behavior Under OPOJD

When CS2 is triggered:

**Phase 1: Architecture Review (PAUSES EXECUTION)**
```
EXECUTING_TASK 
  → CS2_TRIGGERED 
  → ARCHITECTURE_REVIEW_REQUIRED
  → WAITING_FOR_APPROVAL (CS2 only)
```

**Foreman Actions:**
1. Detect protected file or constitutional change needed
2. Create architecture change proposal
3. Document rationale and impact
4. Submit for Owner review
5. **PAUSE execution** (this is the ONLY legitimate OPOJD pause)

**Owner Actions:**
1. Review architecture proposal
2. Approve or request changes
3. Provide approval via GitHub comment or API

**Phase 2: Post-Approval (RESUMES AUTONOMOUS EXECUTION)**
```
ARCHITECTURE_APPROVED 
  → RESUME_EXECUTION
  → RED_QA_CREATION
  → BUILD_TO_GREEN
  → VALIDATION
  → MERGE
  → NOTIFY
```

**Foreman Actions:**
1. Receive approval
2. **Resume autonomous execution immediately**
3. Create Red QA
4. Issue Build to Green
5. Validate
6. Create PR
7. Notify completion

**CRITICAL:** No additional approvals needed after architecture approval. Implementation proceeds under OPOJD.

---

## What Does NOT Trigger CS2 Under OPOJD

### Implementation Changes (Autonomous)

These do NOT require CS2 approval:

1. **Application Code:**
   - New features in app code
   - Bug fixes
   - Refactoring
   - Performance optimizations

2. **Test Code:**
   - New tests
   - Test updates
   - Test refactoring

3. **Documentation:**
   - README updates
   - Code comments
   - API documentation
   - User guides

4. **Configuration:**
   - Environment configs
   - Feature flags
   - Non-governance settings

5. **UI/UX:**
   - New components
   - UI updates
   - Style changes
   - Layout improvements

6. **Data Schemas (Non-Breaking):**
   - New fields
   - Optional properties
   - Backwards-compatible changes

**Under OPOJD:** These execute fully autonomously from Architecture → Merge → Notify.

---

## CS2 Execution Flow with OPOJD

### Scenario 1: No Protected Files (Typical Case)

```
User Request
  ↓
Architecture Design (autonomous)
  ↓
Architecture Validation (autonomous, no CS2 trigger)
  ↓
Red QA Creation (autonomous)
  ↓
Build to Green (autonomous)
  ↓
Validation (autonomous)
  ↓
PR Creation (autonomous)
  ↓
Completion Notification (autonomous)

Total Human Interactions: 1 (completion notification)
```

### Scenario 2: Protected File Modified (CS2 Triggered)

```
User Request
  ↓
Architecture Design (autonomous)
  ↓
Protected File Detected → CS2 TRIGGERED
  ↓
Architecture Proposal Created (autonomous)
  ↓
PAUSE FOR APPROVAL ← ONLY OPOJD PAUSE POINT
  ↓
[Human Reviews and Approves]
  ↓
RESUME AUTONOMOUS EXECUTION
  ↓
Red QA Creation (autonomous)
  ↓
Build to Green (autonomous)
  ↓
Validation (autonomous)
  ↓
PR Creation (autonomous)
  ↓
Completion Notification (autonomous)

Total Human Interactions: 2 (architecture approval + completion notification)
```

---

## Architecture Approval Process Under OPOJD

### Step 1: Detection (Autonomous)

Foreman detects CS2 condition:

```typescript
function detectCS2Trigger(filesChanged: string[]): boolean {
  const protectedPaths = [
    '.github/workflows/',
    '.github/foreman/agent-contract.md',
    'BUILD_PHILOSOPHY.md',
    'foreman/constitution/',
    // ... other protected paths
  ];
  
  return filesChanged.some(file => 
    protectedPaths.some(path => file.startsWith(path))
  );
}
```

### Step 2: Proposal Creation (Autonomous)

Foreman creates architecture proposal:

**Proposal Contents:**
- What changes are needed
- Why changes are needed
- Impact analysis
- Risk assessment
- Rollback plan
- Integration with existing architecture

**Format:**
```markdown
# CS2 Architecture Approval Request

## Changes Requested
[Description of protected file/constitutional changes]

## Rationale
[Why these changes are necessary]

## Impact Analysis
[How this affects existing systems]

## Risks
[Potential risks and mitigations]

## Integration
[How this integrates with True North/existing patterns]
```

### Step 3: Approval Wait (PAUSED)

**This is the ONLY point where OPOJD execution pauses.**

Foreman state: `WAITING_FOR_APPROVAL (CS2)`

**Owner Approval Methods:**
1. GitHub comment: `@foreman approved` or `@foreman approve architecture`
2. API call: `POST /api/cs2/approve {issueId, approved: true}`
3. Manual state update (for testing)

**Timeout:** If no response within 24 hours, escalate with reminder.

### Step 4: Resume Execution (Autonomous)

After approval received:

```
WAITING_FOR_APPROVAL 
  → APPROVAL_RECEIVED
  → EXECUTING_TASK (resume)
  → [continues with Red QA → Build → Validate → Merge → Notify]
```

**No additional pauses.** Implementation proceeds fully autonomously.

---

## CS2 + OPOJD Integration Rules

### Rule 1: Architecture Approval Is Synchronous
Once architecture is approved, implementation proceeds immediately without further approval.

### Rule 2: No Re-Approval for Implementation
After CS2 approval:
- Red QA does not need approval
- Build to Green does not need approval
- Validation does not need approval
- PR creation does not need approval

**Only QA gates matter**, not human approval gates.

### Rule 3: CS2 Approval Scope Is Limited
CS2 approval covers:
- ✅ Architecture changes
- ✅ Protected file modifications
- ✅ Constitutional updates

CS2 approval does NOT cover:
- ❌ Implementation details (automatic)
- ❌ Code review (QA handles this)
- ❌ Deployment (governed by QA + QIEL)

### Rule 4: CS2 Violations Still Block
If CS2 is triggered but approval not obtained:
- Execution MUST halt
- Cannot bypass CS2 under OPOJD
- Governance supremacy applies

**OPOJD does not override CS2.** It clarifies when CS2 applies.

---

## Examples

### Example 1: Feature Addition (No CS2)

**Request:** "Add risk assessment module to dashboard"

**Process:**
```
1. Architecture Design → No protected files → No CS2 trigger
2. Red QA Creation → Autonomous
3. Build to Green → Autonomous
4. Validation → Autonomous
5. PR Created → Autonomous
6. Owner Notified → Complete

Human Interactions: 1 (notification)
CS2 Triggered: No
OPOJD Pauses: 0
```

### Example 2: New Governance Rule (CS2 Triggered)

**Request:** "Add CS7 - Data Retention Governance"

**Process:**
```
1. Architecture Design → Detects `foreman/constitution/CS7.md` (protected)
2. CS2 Triggered → Create proposal
3. Submit for Approval → PAUSE (CS2)
4. [Owner reviews and approves]
5. Resume Execution → Create Red QA → Autonomous
6. Build to Green → Autonomous
7. Validation → Autonomous
8. PR Created → Autonomous
9. Owner Notified → Complete

Human Interactions: 2 (approval + notification)
CS2 Triggered: Yes
OPOJD Pauses: 1 (CS2 only)
```

### Example 3: Workflow Change (CS2 Triggered)

**Request:** "Update CI to run performance tests"

**Process:**
```
1. Architecture Design → Detects `.github/workflows/ci.yml` (protected)
2. CS2 Triggered → Create proposal
3. Submit for Approval → PAUSE (CS2)
4. [Owner reviews and approves]
5. Resume Execution → Update workflow → Autonomous
6. Create tests → Autonomous
7. Validate CI runs → Autonomous
8. PR Created → Autonomous
9. Owner Notified → Complete

Human Interactions: 2 (approval + notification)
CS2 Triggered: Yes
OPOJD Pauses: 1 (CS2 only)
```

---

## Compliance & Monitoring

### CS2 Metrics Under OPOJD

**Track:**
1. CS2 trigger rate (% of executions)
2. Average approval time
3. Post-approval execution time
4. False positive CS2 triggers (should be 0)

**Target:**
- CS2 trigger rate: < 10% (most work is implementation, not architecture)
- Average approval time: < 4 hours
- Post-approval execution time: Same as non-CS2 executions
- False positives: 0

### Audit Trail

Every CS2 event logged:

```typescript
{
  event: 'CS2_TRIGGERED',
  issueId: string,
  reason: 'protected_file' | 'constitutional_change',
  filesAffected: string[],
  proposalCreated: timestamp,
  approvalReceived: timestamp | null,
  approvedBy: string | null,
  executionResumed: timestamp | null,
  completed: timestamp | null
}
```

**Governance Review:** All CS2 events reviewable for pattern analysis and threshold adjustment.

---

## Version History

**v1.1 (2025-12-12):**
- OPOJD integration
- Clarified when CS2 pauses execution
- Defined post-approval autonomous execution
- Added examples and metrics

**v1.0:**
- Original CS2 specification

---

## Authority

This extension operates under:
- CS2 (Architecture Approval Workflow) - Original authority
- OPOJD (One-Prompt One-Job Doctrine) - Constitutional doctrine
- Build Philosophy - Supreme architectural authority

**Status:** ACTIVE - Part of constitutional framework

---

*CS2 + OPOJD: Strategic architecture requires human judgment. Tactical implementation proceeds autonomously.*
