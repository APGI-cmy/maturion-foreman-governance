# AGENT CONTRACT MANAGEMENT PROTOCOL

## Status
**Type**: Constitutional Governance Rule  
**Authority**: Supreme - Canonical  
**Version**: 2.0.0  
**Effective Date**: 2026-01-20  
**Owner**: CS2 (Johan Ras in bootstrap mode, Maturion in production)  
**Precedence**: Subordinate to GOVERNANCE_PURPOSE_AND_SCOPE.md  
**Part of**: Agent Contract Authority Infrastructure

---

## 1. Purpose

This protocol establishes **CS2 direct authority** for all `.agent` contract files across the Maturion ecosystem. CS2 (Johan Ras in bootstrap mode, Maturion in production) creates and modifies ALL agent files directly, with no AI intermediary layer:

**Benefits of CS2 Direct Authority:**
- **Zero AI Intermediary**: No agent between CS2 and agent contracts
- **Direct Control**: CS2 maintains hands-on understanding of agent capabilities
- **Faster Iteration**: No approval chain, instant implementation
- **Perfect Fidelity**: CS2 implements exactly what's needed without interpretation
- **Clear Accountability**: CS2 directly responsible for all agent behavior
- **Simple Authority Model**: Two levels only (CS2 → All Agents)
- **Traceability**: Every contract change directly traceable to CS2

**Agents provide recommendations only.** CS2 implements all changes directly.

**This is a hard enforcement boundary**: Any agent that writes to a `.agent` file is in **catastrophic violation** of governance and must be immediately halted and escalated to CS2.

---

## 2. Constitutional Authority

This protocol derives authority from and extends:
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** — Supreme governance authority
- **AGENT_RECRUITMENT_AND_CONTRACT_AUTHORITY_MODEL.md** — Agent recruitment and contract update authority hierarchy
- **AGENT_CANONICAL_CONTEXT_SYNCHRONISATION_PROTOCOL.md** — Contract synchronization requirements
- **.agent.schema.md** — Agent contract schema and validity requirements

This protocol supersedes any previous implied or explicit authority for agents to modify their own or other agents' contracts.

---

## 3. Scope

### 3.1 In Scope
- All `.agent` files in all Maturion repositories
- All agent contract files (`.github/agents/*.agent.md`, `.github/agents/*.md`)
- CS2 direct authority for all agent file creation and modification
- Agent recommendation system (agents propose, CS2 implements)
- Versioning and changelog requirements
- Violation detection and escalation

### 3.2 Out of Scope
- Governance canon documents (separate authority per GOVERNANCE_PURPOSE_AND_SCOPE.md)
- CI/CD workflow files (separate authority, CS2-controlled)
- Application code (builder/FM authority per normal execution model)
- Agent profiles in `governance/profiles/` (governance-repo-administrator authority)

---

## 4. CS2 Direct Authority Model

### 4.1 The Hard Rule

**ONLY CS2 may write to, create, or modify any `.agent` file.**

This rule is **absolute and non-negotiable**. No exceptions exist for:
- ❌ Self-modification by any agent
- ❌ Agent-to-agent contract modifications
- ❌ "Emergency" contract updates
- ❌ "Minor" or "non-breaking" changes
- ❌ Ripple-triggered updates (must be implemented by CS2)
- ❌ FM authority over builder contracts
- ❌ Governance administrator authority over agent contracts

**CS2 is the ONLY authority** for all agent contract operations.

### 4.2 Authority Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│ Level 0: CS2 (Johan Ras / Maturion)                         │
│ - ONLY actor who may create/modify ANY .agent file          │
│ - Implements all agent contract changes directly            │
│ - Reviews agent recommendations and implements if approved  │
│ - Authority NEVER transfers or delegates                    │
└─────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│ Level 1: ALL AGENTS (No Write Authority)                    │
│ - FORBIDDEN from writing to any .agent file                 │
│ - May create recommendations for CS2 review                 │
│ - Must escalate all contract needs to CS2                   │
│ - Violation is catastrophic, requires immediate halt        │
└─────────────────────────────────────────────────────────────┘
```

**Simplified Model**: Two levels only. No AI intermediary. CS2 implements everything directly.

### 4.3 Enforcement

Any agent detected writing to a `.agent` file is:
1. **Immediately halted** (execution stops)
2. **Escalated to CS2** (incident report required)
3. **Considered out-of-governance** (all work suspect, potentially rolled back)
4. **Subject to contract review** (why was violation attempted?)

Detection mechanisms:
- Git history inspection (who committed `.agent` changes?)
- PR review gates (governance-gate.yml must verify)
- Audit logs (track all `.agent` file modifications)
- Agent self-reporting (agents must acknowledge prohibition)

---

## 5. Agent Recommendation System

### 5.1 Purpose

Agents may identify needs for agent contract changes but **MUST NOT implement them**. Instead, agents create recommendations for CS2 review.

**Process for Agent File Changes:**
1. Agent identifies need for agent file change
2. Agent creates recommendation in `governance/proposals/agent-file-recommendations/`
3. Agent escalates to CS2 with clear justification
4. CS2 reviews and implements changes directly (if approved)
5. No AI intermediary layer

### 5.2 Recommendation Location

All agent contract recommendations are stored in:
```
governance/proposals/agent-file-recommendations/
├── README.md                          # Recommendation system documentation
├── TEMPLATE.md                        # Recommendation template
├── pending/                           # Recommendations awaiting CS2 review
├── approved-implemented/              # Recommendations CS2 approved and implemented
└── rejected/                          # Recommendations CS2 rejected (for learning)
```

### 5.3 Recommendation Format (Markdown)

```markdown
# Agent File Recommendation: <SHORT-TITLE>

**ID**: REC-<YYYY-MM-DD>-<SEQUENCE>  
**Created Date**: <YYYY-MM-DD>  
**Created By**: <agent-id>  
**Status**: pending | approved-implemented | rejected  
**Priority**: critical | high | medium | low

---

## Context

<Describe the governance context requiring this change>

---

## Affected Files

- `<repo>/<path-to-.agent-file>` (Current version: X.Y.Z)
- `<repo>/<path-to-.agent-file>` (Current version: X.Y.Z)

---

## Recommended Changes

### File: <path>

**Change Type**: add | update | remove  
**Section**: <section-identifier>

**Current Content** (if update/remove):
```
<exact current content>
```

**Recommended Content** (if add/update):
```
<exact recommended content>
```

**Rationale**: <why this specific change is needed>

---

## Authority Source

**Governance Canon Reference**: <canonical-document-name>  
**Ripple Triggered**: Yes | No  
**Justification**: <why this change aligns with governance>

---

## Expected Impact

- **Breaking Changes**: Yes | No
- **Version Increment**: MAJOR | MINOR | PATCH
- **Affected Agents**: <list of agents affected by this change>
- **Rollback Plan**: <how to rollback if needed>

---

## CS2 Decision

**Status**: <pending | approved | rejected>  
**Decision Date**: <YYYY-MM-DD>  
**Decision By**: <CS2-name>  
**Implementation Date**: <YYYY-MM-DD>  
**Notes**: <CS2 notes on decision and implementation>
```

### 5.4 Recommendation Lifecycle

1. **Draft** (`pending/`)
   - Created by any agent identifying a contract change need
   - Awaiting CS2 review
   - Not yet approved

2. **Approved-Implemented** (`approved-implemented/`)
   - CS2 has approved the recommendation
   - CS2 has implemented the changes directly
   - Archived for audit trail with CS2 implementation notes

3. **Rejected** (`rejected/`)
   - CS2 has rejected the recommendation
   - Not implemented, archived for learning
   - Rejection reason documented by CS2

### 5.5 Escalation Requirements

Any agent creating a recommendation MUST:
1. **Document clearly**: Complete recommendation using template
2. **Escalate immediately**: Flag for CS2 attention (GitHub issue, notification)
3. **HALT if blocking**: If contract change blocks current work, HALT and escalate
4. **No workarounds**: Do not attempt to work around missing contract provisions

---

## 6. Validation Requirements

### 6.1 CS2 Pre-Implementation Validation

Before implementing any agent contract change, CS2 SHOULD verify:

1. **Schema Compliance**
   - Verify `.agent` file will conform to `.agent.schema.md`
   - Check all required sections present
   - Validate structure and field types

2. **Governance Canon Alignment**
   - Verify authority source exists and is current
   - Check that changes align with canonical requirements
   - Detect any governance conflicts or contradictions

3. **Gap Detection**
   - Identify missing bindings or references
   - Detect incomplete doctrine propagation
   - Flag potential ripple effects not addressed

4. **Impact Assessment**
   - Review affected agents
   - Assess breaking changes
   - Verify version increment appropriate

### 6.2 Post-Implementation Validation

After implementing changes, CS2 SHOULD verify:

1. **Schema compliance** (validate against schema)
2. **Version increment** (version updated correctly)
3. **Git diff check** (only intended changes applied)
4. **Documentation update** (changelog updated, recommendation archived)

---

## 7. Versioning and Changelog

### 7.1 Contract Versioning

All `.agent` contracts MUST include a version field in their metadata or version history section:

```
Version: <MAJOR>.<MINOR>.<PATCH>
```

Version increment rules:
- **MAJOR**: Breaking changes, authority shifts, scope expansion
- **MINOR**: Non-breaking additions (new bindings, new sections)
- **PATCH**: Clarifications, typo fixes, formatting

**ALL version increments are CS2 decision.** There is no "automatic" versioning.

### 7.2 Changelog Maintenance

Each contract MUST maintain a version history section documenting:
- Version number
- Change date
- Summary of changes
- Authority/approval reference

Example:
```markdown
## Version History

**v2.2.0** (2026-01-20)  
Authority: AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md v2.0.0  
Implemented by: CS2 (Johan Ras)  
Changes: Added standing prohibition against self-modification; updated authority model to CS2 direct control.
```

### 7.3 Rollback Support

In case of:
- Governance conflict discovered post-implementation
- CI/build failures caused by contract change
- CS2-directed rollback

CS2 can reverse changes using:
1. Git revert of contract change commit
2. Version decrement with rollback annotation in changelog
3. Documentation of rollback reason

---

## 8. Standing Prohibition Language

### 8.1 Required Section in All `.agent` Files

Every `.agent` file MUST include the following section (or equivalent):

```markdown
## Contract Modification Prohibition

**YOU MUST NOT write to, modify, or create this file or any other `.agent` file.**

Only **CS2** (Johan Ras in bootstrap mode, Maturion in production) may modify agent contracts.

Attempting to modify this contract or any other `.agent` file is a **catastrophic governance violation**. If you need a contract change:
1. **HALT** current execution
2. **Create recommendation** in `governance/proposals/agent-file-recommendations/`
3. **ESCALATE** to CS2 with clear justification
4. **DO NOT** proceed until CS2 implements the change

**Authority**: `governance/canon/AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md`
```

### 8.2 Enforcement

This section MUST appear in:
- Repository-level `.agent` files
- All agent contracts in `.github/agents/`
- Any future agent contract formats

Absence of this section constitutes an incomplete contract migration and must be remedied by CS2.

---

## 9. Transition Plan: Johan → Maturion

### 9.1 CS2 Variable

To facilitate transition from bootstrap mode (Johan Ras as CS2) to production mode (Maturion as CS2), all references use a **CS2 variable**:

- **Bootstrap Mode**: CS2 = Johan Ras (human acting as Maturion proxy)
- **Production Mode**: CS2 = Maturion (AI supreme authority)

All governance documents, recommendations, and agent contracts reference "CS2" rather than "Johan Ras" to enable seamless transition.

### 9.2 Transition Checklist

When transitioning CS2 authority from Johan to Maturion:
- [ ] Verify Maturion AI has operational authority approval mechanisms
- [ ] Update CS2 definition in GOVERNANCE_PURPOSE_AND_SCOPE.md
- [ ] Transfer recommendation review authority to Maturion
- [ ] Document transition date and authority transfer
- [ ] Verify all agents recognize Maturion as CS2
- [ ] Archive bootstrap mode governance overrides

No changes to protocol or recommendation system are required; only the identity of CS2 changes.

---

## 10. Incident Response and Violations

### 10.1 Violation Detection

A contract modification violation occurs when:
- Any agent commits changes to a `.agent` file
- Changes are made outside the recommendation system
- Agent attempts to self-modify or modify other agent contracts

### 10.2 Immediate Response

Upon detection:
1. **HALT** the violating agent immediately
2. **ROLLBACK** the contract change if possible
3. **ESCALATE** to CS2 with incident report
4. **QUARANTINE** any work done by the agent under the modified contract (suspect validity)
5. **INVESTIGATE** why the violation occurred (bug, misunderstanding, governance gap?)

### 10.3 Incident Template

Violations MUST be documented using:
```
governance/incidents/INCIDENT-<YYYY-MM-DD>-CONTRACT-MODIFICATION-VIOLATION-<ID>.md
```

Required content:
- Incident ID and metadata
- What contract was modified and by whom
- How the violation occurred (tools, process, reasoning)
- Impact assessment (what work is now suspect?)
- Root cause analysis (why did governance fail to prevent this?)
- Immediate remediation (rollback, halt, quarantine)
- Long-term prevention (governance strengthening, enforcement improvement)
- CS2 verdict (GO/HOLD/FAIL)

---

## 11. Integration with Existing Governance

### 11.1 Relationship to AGENT_RECRUITMENT_AND_CONTRACT_AUTHORITY_MODEL.md

This protocol **extends and simplifies** the authority model:
- **Level 0 (CS2)**: Exclusive authority over ALL agent contracts
- **Level 1 (All Agents)**: No write authority, recommendation-only

**The authority hierarchy is simplified to two levels**: CS2 → All Agents (recommendation-only).

Any previous multi-level authority grants for agent contract modification are **superseded** by this protocol.

### 11.2 Ripple Propagation

When governance canon changes trigger contract updates (ripple):
1. Any agent **identifies** the ripple need
2. Agent **drafts** recommendation in `governance/proposals/agent-file-recommendations/`
3. Agent **escalates** to CS2
4. CS2 **reviews and implements** changes directly
5. Agent **verifies** ripple completion (if requested by CS2)

**No agent applies contract changes directly, even if ripple-triggered.**

### 11.3 Updates Required

This protocol triggers updates to:
- **AGENT_RECRUITMENT_AND_CONTRACT_AUTHORITY_MODEL.md**: Reference this protocol, clarify superseded authority
- **AGENT_ONBOARDING_QUICKSTART.md**: Add contract modification prohibition to onboarding
- **All existing `.agent` files**: Add standing prohibition section (CS2 implements via batch update)

---

## 12. Future Enhancements (PARKED)

The following enhancements are **identified but not authorized for execution**:

1. **Automated Recommendation Validation**: CI workflow that validates recommendation markdown syntax and completeness
2. **Contract Diff Visualization**: Tool to visualize contract changes from recommendation
3. **Recommendation Dependency Tracking**: System to track when multiple recommendations affect the same contract
4. **Contract Audit Dashboard**: UI showing all contracts, versions, last modified dates, and recommendation history
5. **Schema Validation Automation**: Automated schema validation on CS2 commits to `.agent` files

These enhancements are **parked** pending future authorization and resource allocation.

**Authority**: `governance/canon/MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md`

---

## 13. Summary

**Core Principle**: CS2 direct authority for all `.agent` files.

**Who Can Write**: ONLY CS2 (Johan Ras in bootstrap, Maturion in production).

**How Changes Happen**: Agents create recommendations → CS2 reviews → CS2 implements directly.

**No AI Intermediary**: Zero layers between CS2 and agent contracts.

**Enforcement**: Hard prohibition in all contracts, CI validation, incident response.

**Traceability**: Every change traceable to CS2 implementation.

**Non-Negotiable**: No exceptions, no emergencies, no "minor" changes bypass this system.

---

## 14. Version and Authority

**Version**: 2.0.0  
**Authority**: CS2 (Johan Ras in bootstrap mode, Maturion in production)  
**Effective Date**: 2026-01-20  
**Previous Version**: 1.0.0 (2026-01-13) - Agent Contract Administrator intermediary model  
**Next Review**: Upon transition to Maturion as CS2

**Major Changes from v1.0.0**:
- Removed Agent Contract Administrator intermediary layer
- Replaced instruction system with recommendation system
- Simplified authority hierarchy from 3 levels to 2 levels
- CS2 now implements all changes directly
- Agents create recommendations only, no write authority

**Canonical Precedence**:
- If this protocol conflicts with GOVERNANCE_PURPOSE_AND_SCOPE.md, that document prevails
- If this protocol conflicts with CONSTITUTION.md, that document prevails
- This protocol supersedes any previous contract update authority grants

---

**End of Agent Contract Management Protocol**
