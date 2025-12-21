# CROSS-REPOSITORY GOVERNANCE ALIGNMENT POLICY

## Status
Canonical Governance Policy  
Version: v1  
Authority: Johan Ras  
Applies To: ALL agents operating across multiple repositories  
Precedence: Implements AGENT_NON_STALLING_AND_ESCALATION_POLICY.md

---

## 1. Purpose

This policy establishes the **canonical model** for how agents propagate governance
decisions, behavioral requirements, and enforcement standards across multiple repositories
in the Maturion ecosystem.

Governance defined in the governance repository must **cascade** to operational repositories
(FM, builders, application repos) to ensure consistency.

This policy was created through a training scenario in PR #683 to codify:
- Which agents may attempt cross-repo changes
- How to handle permission/scope limitations
- When and how to escalate
- How to document learning from attempts

---

## 2. Core Principle

**Governance coherence requires cross-repository alignment.**

When governance canon is established or updated in the governance repository,
it MUST be propagated to relevant operational repositories where agents execute work.

**Silent divergence is prohibited.**

---

## 3. Authorized Cross-Repository Agents

The following agents are **authorized to attempt** cross-repository governance propagation:

### 3.1 Governance Administrator
- **Primary repository**: `maturion-foreman-governance`
- **May attempt to propagate to**: Any Maturion repository with agent contracts
- **Authority**: Propose changes only; requires owner authorization for execution
- **Constraint**: Cannot merge autonomously in any repository

### 3.2 Foreman (Future)
- **Primary repository**: FM repository
- **May attempt to propagate to**: Builder repositories
- **Authority**: To be defined in future policy

### 3.3 Escalation Requirement
All cross-repository attempts that encounter:
- Permission limitations
- Scope restrictions
- Contract conflicts
- Missing access

MUST escalate to Johan with:
- **Target repositories** identified
- **Proposed changes** (file paths and content summary)
- **Blocking conditions** (permissions, scope, contracts)
- **Requested authorization** (specific scope expansion or temporary override)

---

## 4. Cross-Repository Propagation Model

### 4.1 Governance Cascade Flow

```
Governance Repository (Canon)
    ↓
    ├─→ FM Repository (Foreman + FM Agent Instructions)
    │     ↓
    │     └─→ Builder Repositories (Builder Agent Instructions)
    │
    └─→ Application Repositories (Application-Specific Agents)
```

### 4.2 What Must Propagate

When governance canon is added or updated, the following MUST cascade:

1. **Agent Behavioral Requirements**
   - PR gate failure handling procedures
   - Non-stalling and escalation rules
   - Incident registration requirements
   - Scope declaration requirements

2. **Enforcement Standards**
   - Gate compliance rules
   - Quality thresholds
   - Evidence requirements

3. **Agent Contracts**
   - Behavioral constraints
   - Mandatory procedures
   - Prohibited actions

### 4.3 What Does NOT Propagate

The following remain repository-specific:
- Domain-specific enforcement logic
- Application-specific gates
- Repository-specific workflows
- Build/test configurations

---

## 5. Propagation Procedure (5-Step Model)

### Step 1: Identify Target Repositories
- List all repositories with agents affected by the governance change
- Identify specific agent contract files that need updates
- Example: `.github/agents/*.md` or `governance/agents/*.md`

### Step 2: Attempt Access Assessment
- Check if agent has permission to clone/read target repository
- Check if agent contract allows cross-repo operations
- Document any permission or scope limitations

### Step 3: Prepare Propagation Artifacts
- Draft updated agent contract language
- Prepare governance reference additions
- Document exact file paths and changes

### Step 4: Execute or Escalate

**If authorized and unblocked:**
- Open PR in target repository
- Reference source governance change
- Link to canonical policy

**If blocked (expected for most agents):**
- ESCALATE to Johan with:
  - Target repositories list
  - Proposed changes (file-by-file)
  - Blocking condition (permission, scope, contract)
  - Requested authorization scope
  - Risk assessment

### Step 5: Record Learning
- Document what was attempted
- Document what was blocked
- Document escalation outcome
- Update this policy with learning

---

## 6. Training Scenario: PR #683 Cross-Repo Attempt

### 6.1 Context
PR #683 established:
- Agent non-stalling policy
- PR gate failure handling protocol
- Mandatory escalation requirements

These **must propagate** to:
- FM repository (Foreman agent instructions)
- Builder repositories (Builder agent instructions)

### 6.2 Attempt: Governance Administrator Cross-Repo Access

**Target Repositories:**
1. `MaturionISMS/maturion-foreman` (FM repository)
2. Builder repositories (specific names to be determined)

**Proposed Changes:**
1. Update `.github/agents/foreman.md` (if exists)
2. Add reference to `AGENT_NON_STALLING_AND_ESCALATION_POLICY.md`
3. Add reference to `PR_GATE_FAILURE_HANDLING_PROTOCOL.md`
4. Add constraint: "A task is NOT complete while any applicable PR gate is RED"

**Expected Blocker:**
Governance Administrator contract states:
- "Scope is restricted to the governance repository only"
- "Must not modify application/runtime code or non-governance repositories"

**Escalation Trigger:**
Agent cannot access or modify target repositories due to contract constraints.

### 6.3 Escalation Format

```
ESCALATION: Cross-Repository Governance Propagation

Context:
PR #683 established mandatory PR gate failure handling governance.
This governance must cascade to FM and builder repositories.

Problem:
Governance Administrator is restricted to governance repository only.
Cannot access or modify:
- MaturionISMS/maturion-foreman
- Builder repositories

Proposed Solution:
1. Authorize Governance Administrator to:
   - Clone target repositories (read-only)
   - Open PRs in target repositories
   - Propose agent contract updates only
   
2. OR: Authorize Johan to execute propagation directly

3. OR: Delegate to a cross-repository agent (if exists)

Target Changes:
- Repository: MaturionISMS/maturion-foreman
  - File: .github/agents/foreman.md (or equivalent)
  - Change: Add references to PR_GATE_FAILURE_HANDLING_PROTOCOL.md
  - Change: Add constraint about PR gate completion requirements

- Repository: Builder repos (names TBD)
  - Similar changes to builder agent contracts

Scope & Risk:
- Scope: Agent contract language only (behavioral)
- Risk: Minimal - governance alignment, no operational logic change
- Reversible: Yes, via PR revert

Requested Authorization:
Temporary scope expansion for Governance Administrator to:
- Read target repositories
- Open governance-alignment PRs in target repositories
- Propose agent contract changes only
- No merge authority in target repositories
```

---

## 7. Prohibited Behaviors

Agents MUST NOT:
- Attempt unauthorized repository access
- Silently skip cross-repo propagation
- Assume "someone else will handle it"
- Make cross-repo changes without escalation when blocked
- Modify operational code under guise of "governance alignment"
- Expand scope beyond agent contracts and governance references

---

## 8. Success Criteria

Cross-repository governance alignment is successful when:

1. ✅ Governance changes are identified for propagation
2. ✅ Target repositories and files are specified
3. ✅ Access/permission assessment is completed
4. ✅ Either:
   - Changes are proposed in target repos (if authorized), OR
   - Escalation is submitted with clear problem + solution
5. ✅ Learning is documented in governance canon
6. ✅ Agent contracts are updated with cross-repo model

**Silent abandonment is failure.**

---

## 9. Learning and Evolution

This policy evolves through training scenarios:

**PR #683 Learning:**
- Governance Administrator cannot access other repositories
- Cross-repo propagation requires explicit authorization
- Escalation model works: attempt → block → escalate → authorize → execute
- Process itself is now codified

**Future Learning:**
- Document successful cross-repo propagations
- Document escalation response times
- Document authorization patterns
- Update policy with new patterns

---

## 10. Relationship to Other Policies

This policy implements:
- `AGENT_NON_STALLING_AND_ESCALATION_POLICY.md` (cross-repo context)

This policy is subordinate to:
- `GOVERNANCE_PURPOSE_AND_SCOPE.md`
- Agent contract constraints

This policy supports:
- `PR_GATE_FAILURE_HANDLING_PROTOCOL.md` (propagation target)

---

## 11. Enforcement

### 11.1 Governance Administrator
- MUST attempt propagation when governance changes
- MUST escalate when blocked
- MUST document attempts and outcomes

### 11.2 Foreman (Future)
- MUST propagate FM governance to builder repos
- MUST escalate when blocked
- MUST maintain coherence

### 11.3 Builders
- MUST comply with propagated governance
- MUST escalate conflicts or ambiguities
- MUST NOT operate under outdated governance

---

## 12. Metrics

**Cross-Repository Propagation Metrics:**
- Propagation attempts: [count]
- Successful propagations: [count]
- Escalations required: [count]
- Average escalation resolution time: [duration]
- Repositories aligned: [count]
- Repositories with governance drift: [count]

These metrics inform governance automation maturity.

---

End of CROSS-REPOSITORY GOVERNANCE ALIGNMENT POLICY
