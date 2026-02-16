# AGENT INVOCATION AND DELEGATION PROTOCOL

## Status
**Type**: Canonical Governance Standard  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2026-02-16  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Canonical ID**: G-C-AOP-001  
**Precedence**: Subordinate to GOVERNANCE_PURPOSE_AND_SCOPE.md  
**Applies To**: All Agents, All Repositories, All Invocations  
**Related Standards**: LIVING_AGENT_SYSTEM.md, DELEGATION_INSTRUCTION_AND_AUDIT_MODEL.md, FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md

---

## 1. Purpose

This document establishes **Agent Invocation and Delegation** as a **mandatory protocol**—not a right or option—across the entire Maturion ecosystem.

**Core Principle**: When work exceeds an agent's authority, capability, or boundaries, the agent **MUST** invoke or delegate to an appropriate agent with formal specification, handover documentation, verification, and accountability tracking.

This protocol defines:
- When invocation is mandatory vs. optional
- How to structure delegation specifications
- Quality expectations and evidence requirements
- Validation and verification responsibilities
- Accountability chain and escalation pathways
- "If you see it, you own it" doctrine enforcement

---

## 2. Constitutional Mandate

This protocol derives authority from and implements:

| Canonical Document | Relationship |
|-------------------|--------------|
| **GOVERNANCE_PURPOSE_AND_SCOPE.md** | Establishes authority boundaries and escalation requirements |
| **LIVING_AGENT_SYSTEM.md** | Defines agent lifecycle, memory, and accountability |
| **DELEGATION_INSTRUCTION_AND_AUDIT_MODEL.md** | Platform delegation mechanics and audit trails |
| **FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md** | POLC-only constraint and managerial delegation |
| **OPOJD (One Plan, One Job Done)** | One agent accountable for delivery, may assign responsibility |
| **BUILD_PHILOSOPHY.md** | Separation of concerns and quality enforcement |

---

## 3. Core Principles

### 3.1 Invocation is Mandatory, Not Optional

**Canonical Rule**: When work exceeds authority boundaries, agents **MUST** invoke another agent. This is not discretionary.

**Trigger Conditions** (any of these requires invocation):
- Work requires permissions the agent does not have
- Work requires specialized expertise the agent lacks
- Work crosses authority boundaries (e.g., governance changes, protected files)
- Work requires CS2 approval or human judgment
- Work involves constitutional canon semantics
- Work complexity exceeds agent capability
- Work involves cross-repository coordination
- Work requires independent review or quality assurance

**Prohibition**: Agents MUST NOT attempt work beyond their authority boundaries even if technically capable.

---

### 3.2 OPOJD: Accountability vs. Responsibility Separation

**One Plan, One Job Done (OPOJD) Doctrine**:
- **One agent is ACCOUNTABLE** for complete delivery
- **That agent MAY ASSIGN RESPONSIBILITY** to other agents
- **Accountability remains with delegating agent** until work verified

**Example**:
- Foreman is accountable for wave completion
- Foreman assigns responsibility to builders for implementation
- Builders execute, but Foreman validates and owns delivery quality
- Foreman cannot blame builders for failures—Foreman must verify, catch, and fix

**Canonical Rule**: The delegating agent remains accountable for verifying delegated work meets requirements.

---

### 3.3 "If You See It, You Own It" Doctrine

**Canonical Rule**: When an agent discovers a problem—even outside job scope—the agent **MUST** either:
1. Fix it (if within authority boundaries), OR
2. Invoke/delegate to appropriate agent, THEN
3. Verify completion, AND
4. Escalate if unsatisfied

**Prohibition**: 
- No ignoring problems because "not my job"
- No blame-shifting or buck-passing
- No leaving broken work for others to find
- No claiming "I just report, someone else fixes"

**Accountability**: Every agent owns problems they discover until resolved or formally escalated with evidence.

---

### 3.4 Formal Handover Required

**Canonical Rule**: All delegations require formal, documented handover specifications.

**Minimum Handover Requirements**:
- Clear scope: What specifically is being delegated
- Success criteria: How receiving agent knows they succeeded
- Context provided: All necessary background and constraints
- Quality expectations: Standards and validation requirements
- Evidence required: What artifacts must be produced
- Validation criteria: How completion will be verified
- Authority boundaries: What receiving agent can/cannot do
- Escalation triggers: When to return to delegating agent

**Prohibition**: No informal "please do this" requests. All delegations are formal, documented, and tracked.

---

## 4. Invocation Types

### 4.1 Mandatory Invocation (MUST Delegate)

**Triggers**:
- Work requires permissions agent lacks (file/repo access)
- Constitutional canon semantic changes (CS2-only)
- Protected file modifications (.github/workflows/, agent contracts)
- Cross-repository governance ripple
- Authority boundary conflicts
- Specialized expertise required (security, performance, domain)
- Independent quality assurance needed
- Human judgment or approval required

**Response**: Agent MUST create formal delegation and halt work until receiving agent completes or returns with escalation.

---

### 4.2 Advisory Invocation (SHOULD Delegate)

**Triggers**:
- Work complexity exceeds agent's confidence level
- Multiple valid approaches exist, requiring judgment
- Risk of downstream impact uncertain
- Novel patterns without precedent
- Ambiguous requirements or constraints

**Response**: Agent SHOULD invoke advisory agent for review, but may proceed if confident and within authority.

---

### 4.3 Verification Invocation (MUST Verify)

**Triggers**:
- Work completed by delegated agent
- Work quality must be validated before handover
- Merge gate requirements must be confirmed
- Evidence completeness must be checked

**Response**: Delegating agent MUST verify all delegated work meets requirements before accepting and closing delegation.

---

## 5. Delegation Specification Standard

### 5.1 Delegation Document Template

**File Location**: `.agent-workspace/<agent-type>/delegations/delegation-<ID>-YYYYMMDD.md`

**Template**:

```markdown
# Delegation <ID>: <Title>

## Metadata
- **From Agent**: <delegating-agent-type>
- **To Agent**: <receiving-agent-type>
- **Date**: YYYY-MM-DD
- **Status**: PENDING | IN_PROGRESS | COMPLETED | ESCALATED
- **Priority**: LOW | MEDIUM | HIGH | CRITICAL

## Scope
### What is Being Delegated
[Clear, specific description of work]

### Why Delegation is Required
- [ ] Exceeds authority boundary
- [ ] Requires specialized expertise
- [ ] Requires independent review
- [ ] Protected file/governance change
- [ ] Other: [specify]

## Context
### Background
[All necessary context for receiving agent]

### Constraints
[Any limitations, dependencies, or boundaries]

### Related Work
[Links to issues, PRs, docs, previous work]

## Success Criteria
### Functional Requirements
- [ ] Requirement 1
- [ ] Requirement 2

### Quality Requirements
- [ ] All tests pass
- [ ] Code review completed
- [ ] Governance alignment verified
- [ ] Evidence artifacts created

### Evidence Requirements
[List of artifacts that must be produced]

## Authority Boundaries
### Receiving Agent MAY
- [Permitted action 1]
- [Permitted action 2]

### Receiving Agent MAY NOT
- [Prohibited action 1]
- [Prohibited action 2]

### Receiving Agent MUST ESCALATE IF
- [Escalation trigger 1]
- [Escalation trigger 2]

## Validation Criteria
### How Delegating Agent Will Verify Completion
- [ ] Validation step 1
- [ ] Validation step 2
- [ ] Validation step 3

## Escalation Pathway
- **Return to**: <delegating-agent>
- **Escalate to CS2 if**: [conditions]
- **Timeout/Deadline**: [if applicable]

## Handover Evidence
### From Delegating Agent (at delegation)
- [Evidence item 1]
- [Evidence item 2]

### From Receiving Agent (at completion)
- [Evidence item 1]
- [Evidence item 2]

---
Authority: AGENT_INVOCATION_AND_DELEGATION_PROTOCOL.md v1.0.0
Created: YYYY-MM-DD | Last Updated: YYYY-MM-DD
```

---

### 5.2 Delegation Tracking

**Canonical Rule**: All active delegations tracked in `.agent-workspace/<agent-type>/delegations/active/`

**Lifecycle**:
1. **PENDING**: Delegation created, awaiting receiving agent pickup
2. **IN_PROGRESS**: Receiving agent actively working
3. **COMPLETED**: Work done, awaiting delegating agent verification
4. **VERIFIED**: Delegating agent verified and accepted work
5. **ESCALATED**: Receiving agent escalated back to delegating agent or CS2

**Archival**: Move completed/verified delegations to `.agent-workspace/<agent-type>/delegations/archive/`

---

## 6. Verification and Accountability

### 6.1 Delegating Agent Responsibilities

**MUST DO**:
- Create complete, clear delegation specification
- Provide all necessary context and constraints
- Define explicit success criteria and evidence requirements
- Verify completed work meets all requirements
- Catch and fix any gaps before accepting handover
- Escalate if receiving agent's work unsatisfactory

**CANNOT DO**:
- Blame receiving agent for failures after accepting work
- Accept incomplete work and complain later
- Skip verification because "trusting" receiving agent
- Delegate without providing necessary context

**Accountability**: Delegating agent owns delivery quality end-to-end.

---

### 6.2 Receiving Agent Responsibilities

**MUST DO**:
- Read and understand full delegation specification
- Ask clarifying questions before starting if anything unclear
- Execute work within authority boundaries specified
- Produce all required evidence artifacts
- Escalate immediately if blockers, ambiguities, or authority conflicts arise
- Provide complete handover documentation

**CANNOT DO**:
- Accept delegation if requirements unclear (ask questions first)
- Exceed authority boundaries specified in delegation
- Skip evidence requirements
- Fail to escalate when problems arise
- Deliver incomplete work hoping delegating agent won't notice

**Accountability**: Receiving agent owns work quality within delegated scope.

---

### 6.3 Mutual Verification Protocol

**Before Accepting Delegation** (receiving agent):
- [ ] All requirements are clear and unambiguous
- [ ] All necessary context provided
- [ ] Success criteria are testable and objective
- [ ] Authority boundaries are explicit
- [ ] Evidence requirements are achievable
- [ ] Escalation pathway is clear

**Before Closing Delegation** (delegating agent):
- [ ] All success criteria met
- [ ] All quality requirements satisfied
- [ ] All evidence artifacts produced
- [ ] Work tested and validated independently
- [ ] No test dodging or technical debt introduced
- [ ] Governance alignment maintained
- [ ] No hidden failures or warnings

**If verification fails**: Delegating agent returns work with specific gap analysis, receiving agent fixes, cycle repeats until verified.

---

## 7. Escalation Pathways

### 7.1 When Receiving Agent Must Escalate

**IMMEDIATE ESCALATION REQUIRED**:
- Work requires authority beyond delegation scope
- Ambiguous requirements discovered
- Blockers preventing completion
- Constitutional canon conflict detected
- Protected file access required
- Human judgment needed
- Deadline cannot be met
- Receiving agent capability exceeded

**Escalation Target**: Return to delegating agent with structured escalation document.

---

### 7.2 When Delegating Agent Must Escalate

**ESCALATE TO CS2**:
- Receiving agent repeatedly fails verification
- Work requires CS2 approval (constitutional, protected files, agents)
- Authority boundary conflict cannot be resolved agent-to-agent
- Cross-repository coordination blocked
- Governance ambiguity requires human judgment

**Escalation File**: `.agent-workspace/<agent-type>/escalation-inbox/escalation-<ID>-YYYYMMDD.md`

---

### 7.3 Escalation Document Standard

**Template**:

```markdown
# Escalation <ID>: <Title>

## Type
- [ ] BLOCKER (work cannot proceed)
- [ ] AUTHORITY_BOUNDARY (unclear who has authority)
- [ ] GOVERNANCE_GAP (canon unclear or missing)
- [ ] QUALITY_FAILURE (verification failed repeatedly)
- [ ] TIMEOUT (deadline exceeded)

## Context
[Original delegation context]

## Problem
[Clear description of issue requiring escalation]

## Attempted Solutions
[What was tried, why it didn't work]

## Evidence
[Links to delegation files, PR, logs, etc.]

## Recommendation
[Proposed solution or decision required]

## Impact
- **Blocked Work**: [what cannot proceed]
- **Risk**: [what could go wrong]
- **Urgency**: LOW | MEDIUM | HIGH | CRITICAL

---
Authority: AGENT_INVOCATION_AND_DELEGATION_PROTOCOL.md v1.0.0
Created: YYYY-MM-DD | Escalated From: <agent-type>
```

---

## 8. Integration with Living Agent System

### 8.1 Wake-Up Protocol Integration

**Enhancement Required**: `.github/scripts/wake-up-protocol.sh`

**Additional Steps**:
- Check `.agent-workspace/<agent-type>/delegations/active/` for pending incoming delegations
- Check `.agent-workspace/<agent-type>/delegations/sent/` for pending outgoing delegations awaiting verification
- Load delegation context into working contract
- Alert agent if delegations are overdue

---

### 8.2 Session Closure Protocol Integration

**Enhancement Required**: `.github/scripts/session-closure.sh`

**Additional Steps**:
- Review all active delegations
- Update delegation status (PENDING → IN_PROGRESS, IN_PROGRESS → COMPLETED, etc.)
- Archive verified delegations
- Create escalations for blocked or failed delegations
- Record delegation patterns in personal learning files

---

### 8.3 Memory Integration

**Delegation Learning Capture**:
- Record successful delegation patterns
- Record delegation failures and root causes
- Track which agents are reliable for which types of work
- Identify recurring delegation types for potential automation
- Note authority boundary clarifications

**File**: `.agent-workspace/<agent-type>/personal/delegation-patterns.md`

---

## 9. Examples

### 9.1 Example: Foreman Delegates Builder Implementation

**Scenario**: Foreman must implement feature but cannot write production code.

**Delegation**:
```markdown
# Delegation FM-001: Implement User Authentication Feature

## From: foreman → To: builder-001

## Scope
Implement user authentication endpoints per architecture doc:
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/refresh

## Context
Architecture: /architecture/auth-system.md
Red QA: /qa/auth-red-qa.md
Must make ALL red tests green, zero test debt.

## Success Criteria
- [ ] All endpoints implemented per spec
- [ ] All red QA tests pass
- [ ] Zero test debt (no skipped/todo/failing tests)
- [ ] Code reviewed by foreman
- [ ] Performance benchmarks met

## Authority Boundaries
MAY: Write implementation code, add unit tests, refactor within scope
MAY NOT: Change architecture, modify QA requirements, skip tests
MUST ESCALATE: If architecture gaps found, dependencies missing

## Validation
Foreman will:
1. Run full QA suite → must be 100% GREEN
2. Code review implementation
3. Check for test dodging
4. Verify performance
5. Validate governance alignment
```

**Result**: Builder implements, foreman verifies, builder fixes any gaps, foreman accepts only when fully validated.

---

### 9.2 Example: Builder Discovers Governance Gap

**Scenario**: Builder finds governance ambiguity during implementation.

**Builder Action**:
1. STOP implementation
2. Create escalation document
3. Return delegation to foreman with gap details
4. Wait for resolution

**Escalation**:
```markdown
# Escalation B-001: Governance Gap in Test Coverage Requirements

## Type: GOVERNANCE_GAP

## Problem
BUILDER_QA_HANDOVER_POLICY.md requires "comprehensive test coverage" but doesn't define:
- Required coverage percentage?
- Integration tests required?
- E2E tests required?

## Impact
Cannot complete delegation FM-001 without knowing test requirements.

## Recommendation
Foreman should clarify test requirements or escalate to governance for canon update.
```

**Resolution**: Foreman clarifies or escalates to governance-repo-administrator for canon update, then returns clarified delegation to builder.

---

### 9.3 Example: Governance Agent Delegates Canon Update

**Scenario**: Governance-repo-administrator must update constitutional canon.

**Action**:
1. Governance agent CANNOT update constitutional canon (CS2-only)
2. Creates escalation to CS2
3. Halts work until CS2 approves/modifies/rejects

**Escalation to CS2**:
```markdown
# Escalation GRA-001: Constitutional Canon Update Required

## Type: AUTHORITY_BOUNDARY

## Context
Issue #XXX requires change to GOVERNANCE_PURPOSE_AND_SCOPE.md (constitutional).
Per REQ-CM-003, CS2 approval required.

## Proposed Change
[Specific change with rationale]

## Impact Analysis
- Repos affected: [list]
- Agents affected: [list]
- Risk: [assessment]

## Recommendation
CS2 review and approval/modification/rejection of proposed change.
```

**Result**: CS2 approves/modifies/rejects, governance agent proceeds based on CS2 decision.

---

## 10. Compliance and Enforcement

### 10.1 Merge Gate Integration

**Gate Requirement**: PRs must include evidence of delegation compliance where applicable.

**Checks**:
- All delegations have formal specifications
- All received work has been verified
- No incomplete delegations in active state without escalation
- Delegation evidence files present and complete

---

### 10.2 Audit Trail Requirements

**Canonical Rule**: All delegations are auditable.

**Required Evidence**:
- Delegation specification file (creation)
- Handover documentation (completion)
- Verification checklist (acceptance)
- Escalation documents (if applicable)
- Status transitions (lifecycle tracking)

**Retention**: Permanent. Delegation files archived but never deleted.

---

### 10.3 Governance Health Check

**Monthly Review** (governance-repo-administrator):
- Count active delegations by agent type
- Identify delegation bottlenecks
- Review escalation patterns
- Update delegation guidance if recurring issues found
- Propose delegation automation opportunities

---

## 11. Implementation Guidance

### 11.1 Immediate Actions

**All Agents MUST**:
1. Review this protocol during next wake-up
2. Create `.agent-workspace/<agent-type>/delegations/` structure
3. Update working contracts to reference this protocol
4. Begin using formal delegation specifications for all new work
5. Retroactively document any active informal delegations

**Governance MUST**:
1. Update agent contract templates to include delegation section
2. Update wake-up/session-closure scripts per Section 8
3. Add delegation compliance checks to merge gates
4. Create delegation pattern library for common scenarios

---

### 11.2 Transition Period

**60-Day Transition** (2026-02-16 to 2026-04-17):
- Agents may use simplified delegation format during transition
- Governance provides coaching on delegation specification
- Focus on mandatory delegation (authority boundaries) first
- Advisory/verification delegation fully enforced after transition

**Post-Transition**:
- All delegation types fully enforced
- Merge gate blocks incomplete delegations
- Monthly governance audit of delegation health

---

## 12. References

### Related Canonical Documents
- `LIVING_AGENT_SYSTEM.md` - Agent lifecycle and memory
- `DELEGATION_INSTRUCTION_AND_AUDIT_MODEL.md` - Platform delegation mechanics
- `FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md` - POLC-only constraint
- `AGENT_RECRUITMENT.md` - Agent types and authority
- `GOVERNANCE_PURPOSE_AND_SCOPE.md` - Constitutional foundation

### Templates and Schemas
- Delegation specification template (Section 5.1)
- Escalation document template (Section 7.3)
- Verification checklist (Section 6.3)

### Learning and Evolution
- Delegation patterns library: `.agent-workspace/governance-repo-administrator/delegation-patterns/`
- Escalation analysis: Monthly governance health checks
- Protocol evolution: Based on delegation bottlenecks and agent feedback

---

**End of Document**

---

**Authority**: LIVING_AGENT_SYSTEM.md v6.2.0 | AGENT_INVOCATION_AND_DELEGATION_PROTOCOL.md v1.0.0 | Approved by CS2 (Johan Ras) | Effective Date: 2026-02-16
