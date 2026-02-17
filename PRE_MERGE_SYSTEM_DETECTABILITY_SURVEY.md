# PRE-MERGE SYSTEM DETECTABILITY SURVEY

## Survey Context

**PR**: Define minimum appointment requirements for Governance Liaison Agent  
**New Artifacts**:
- `governance/canon/GOVERNANCE_LIAISON_ROLE_SURVEY.md`
- `governance/canon/GOVERNANCE_LIAISON_MINIMUM_APPOINTMENT_REQUIREMENTS.md`
- `governance/canon/GOVERNANCE_LIAISON_MINIMUM_REQUIREMENTS_VALIDATION.md`

**Survey Date**: 2026-01-01  
**Surveyor**: Governance Administrator Agent  
**Repositories Surveyed**: 
1. Governance Repository (`maturion-foreman-governance`)
2. FM / Execution Repository (inferred from governance loading protocols)

---

## Executive Summary

**Detection**: ❌ **NOT DETECTED**  
**Enforcement**: ❌ **NO ENFORCEMENT**  
**Auto-Escalation on Violation**: ❌ **NO AUTO-ESCALATION**

**Human reliance required** for all three aspects until follow-up work completed.

---

## Question 1: Detection

### Will the presence of these files be detected by any existing validator, loader, or coupling mechanism?

**Answer**: ❌ **NOT DETECTED**

### Evidence

#### Governance Repository Detection Mechanisms Surveyed

1. **Governance Gate** (`.github/workflows/governance-gate.yml`)
   - **Scope**: Validates governance directory structure and critical files
   - **Critical Files Checked** (hardcoded):
     - `governance/philosophy/BYG_DOCTRINE.md`
     - `governance/philosophy/GOVERNANCE_INCIDENT_RESPONSE_DOCTRINE.md`
     - `governance/CONSTITUTION.md`
     - `governance/canon/ESCALATION_POLICY.md`
   - **Does it check for Governance Liaison files?**: **NO**
   - **Reason**: File checks are hardcoded; new files not in list

2. **Governance Completeness Model** (`governance/canon/GOVERNANCE_COMPLETENESS_MODEL.md`)
   - **Scope**: Defines component registry (Section 5) as "single source of truth for governance completeness checks"
   - **Component Registry Includes**:
     - AGENT_RECRUITMENT (Section 5.2)
     - REPO_SEEDING_ROLE_SEPARATION (Section 5.9)
     - Other agent-related components
   - **Does it include Governance Liaison minimum requirements?**: **NO**
   - **Evidence**: Sections 5.1-5.12 inventoried. No entry for `GOVERNANCE_LIAISON_MINIMUM_APPOINTMENT_REQUIREMENTS` component.
   - **Implication**: Governance Completeness Model does NOT require these files (yet)

3. **Agent Governance Check** (`.github/workflows/agent-governance-check.yml`)
   - **Scope**: Validates `.agent` contract file
   - **Does it check for agent minimum requirement documents?**: **NO**
   - **Reason**: Validates contract syntax only, not appointment requirements documentation

4. **FM Governance Loading Protocol** (`governance/canon/FM_GOVERNANCE_LOADING_PROTOCOL.md`)
   - **Scope**: Defines how FM loads governance from `maturion-foreman-governance`
   - **Specifies Tier 2 (Canonical Governance Models)**: `governance/canon/**` (31+ documents)
   - **Does it list Governance Liaison minimum requirements?**: **NO** (document count predates these files)
   - **Implication**: FM governance loading will see these files in `governance/canon/**` but has no specific loader logic for "Governance Liaison appointment requirements"

#### Conclusion: Detection

**NOT DETECTED** by any existing automated mechanism.

Files exist in canonical location (`governance/canon/`) but:
- Not in Governance Completeness Model component registry
- Not in Governance Gate hardcoded check list
- Not referenced by FM Governance Loading Protocol explicitly

**Detection would require**:
1. Adding component entry to GOVERNANCE_COMPLETENESS_MODEL.md Section 5
2. Updating Governance Gate (if critical file check desired)
3. No FM-specific loader changes needed (generic `governance/canon/**` loading applies)

---

## Question 2: Enforcement

### Is there any existing mechanism that would block execution, appointment, or merge if Governance Liaison is appointed without satisfying these requirements?

**Answer**: ❌ **NO ENFORCEMENT**

### Evidence

#### Enforcement Mechanisms Surveyed

1. **Agent Recruitment Enforcement**
   - **Canonical Source**: `governance/canon/AGENT_RECRUITMENT.md`
   - **Section 5**: "Recruitment Preconditions" lists required artifacts before any agent may act
   - **Required for all agents**:
     - Canonical governance reference (`/governance/canon`)
     - Governance profile corresponding to agent class
     - Compliant `.agent` contract
     - Explicit scope definition
   - **Does it require Governance Liaison minimum appointment requirements to exist?**: **NO**
   - **Evidence**: AGENT_RECRUITMENT.md does not reference GOVERNANCE_LIAISON_MINIMUM_APPOINTMENT_REQUIREMENTS.md
   - **Implication**: FM could recruit Governance Liaison without these requirements (per current AGENT_RECRUITMENT.md)

2. **Repository Seeding Role Separation** (`governance/canon/REPOSITORY_SEEDING_AND_ENFORCEMENT_ROLE_SEPARATION.md`)
   - **Section 6.1**: "Repository Seeding Agent Recruitment"
   - **Required Agent Contract Elements**:
     - `AGENT_ROLE: repository-seeding`
     - Reference to REPOSITORY_SEEDING_AND_ENFORCEMENT_ROLE_SEPARATION.md
     - Reference to REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md
   - **Does it require GOVERNANCE_LIAISON_MINIMUM_APPOINTMENT_REQUIREMENTS.md?**: **NO**
   - **Evidence**: Section 6.1 does not reference new requirements document

3. **Enforcement Design Note** (`governance/canon/ENFORCEMENT_DESIGN_NOTE.md`)
   - **Scope**: Pre-recruitment validation concepts
   - **Section 3.1.2**: "Pre-Recruitment Validation Gate" (conceptual)
   - **Status**: "TO BE CREATED" (validator for agent contracts before recruitment)
   - **Does it exist?**: **NO**
   - **Would it enforce Governance Liaison appointment requirements?**: **NO** (even if it existed, it validates contract syntax, not appointment requirements documentation)

4. **PR Gate Evaluation** (`governance/canon/PR_GATE_EVALUATION_AND_ROLE_PROTOCOL.md`)
   - **Section 6.1**: "Agent Role Detection" — determines agent role from PR
   - **Section 6.2**: "Applicable Gate Selection" — selects gates based on role
   - **Does it enforce Governance Liaison appointment requirements?**: **NO**
   - **Evidence**: Protocol evaluates gates for PRs, not agent appointment validity
   - **Implication**: PR gates validate PR compliance, not whether agent was validly appointed

5. **FM Runtime Enforcement** (`governance/canon/FM_RUNTIME_ENFORCEMENT_AND_AWARENESS_MODEL.md`)
   - **Section 5.1**: "Pre-Execution Governance Validation"
   - **Validates**:
     - Governance structure complete per GOVERNANCE_COMPLETENESS_MODEL.md
     - Tier-0 canon accessible
     - No governance conflicts
   - **Does it validate Governance Liaison appointment?**: **NO**
   - **Evidence**: Pre-execution validation checks governance completeness, not agent appointment validity

#### Enforcement Gap: Agent Contract vs Appointment Requirements

**Critical Finding**: Existing enforcement focuses on **agent contract validation** (`.agent` file syntax), NOT **appointment requirements documentation**.

**Agent Contract** (`.agent` file):
- ✅ Validated by `agent-governance-check.yml` workflow
- ✅ Required by AGENT_RECRUITMENT.md Section 5

**Appointment Requirements Documentation** (this PR):
- ❌ Not validated by any workflow
- ❌ Not required by AGENT_RECRUITMENT.md
- ❌ Not referenced in enforcement mechanisms

**Implication**: An agent can have valid `.agent` contract without satisfying minimum appointment requirements from these new documents.

#### Conclusion: Enforcement

**NO ENFORCEMENT** exists.

Current state:
- FM can recruit Governance Liaison agent with valid `.agent` contract
- No mechanism checks if GOVERNANCE_LIAISON_MINIMUM_APPOINTMENT_REQUIREMENTS.md preconditions satisfied
- No mechanism blocks appointment if governance preconditions (Section 5) not met
- No mechanism validates appointment semantics (Section 6)

**Enforcement would require**:
1. Update AGENT_RECRUITMENT.md to reference Governance Liaison minimum requirements
2. Create pre-recruitment validator that checks appointment preconditions
3. Integrate validator into FM recruitment logic
4. OR: Add runtime check in FM that validates appointment before allowing Governance Liaison to act

---

## Question 3: Escalation

### If Governance Liaison were mis-appointed or acted outside these requirements, would any existing STOP or ESCALATE path trigger automatically?

**Answer**: ❌ **NO AUTO-ESCALATION**

### Evidence

#### Escalation Mechanisms Surveyed

1. **STOP Conditions in Requirements Document**
   - **Section 7.2**: "STOP Discipline (Mandatory)" defines 5 STOP condition categories
   - **Who enforces STOP?**: **The Governance Liaison agent itself** (self-discipline)
   - **Is this automated?**: **NO** — relies on agent behavior compliance
   - **Would violation auto-escalate?**: **NO** — requires agent to self-report

2. **Escalation Policy** (`governance/canon/ESCALATION_POLICY.md`)
   - **Defines**: L1 (Builder), L2 (FM), L3 (Codex), L4 (Human)
   - **Does it monitor Governance Liaison behavior?**: **NO**
   - **Evidence**: Escalation policy defines escalation paths but does not monitor for violations

3. **Watchdog Authority** (if exists)
   - **Canonical Source**: `governance/canon/WATCHDOG_AUTHORITY_AND_SCOPE.md` (referenced in agent contract)
   - **Role**: Independent observation, hard stop authority for catastrophic violations
   - **Does Watchdog monitor Governance Liaison appointments?**: **UNKNOWN** (document not fully surveyed, but typically Watchdog is post-appointment, not pre-appointment)
   - **Auto-escalation**: Watchdog can escalate but requires detection mechanism first

4. **PR Gate Failure Escalation** (`governance/policy/PR_GATE_FAILURE_HANDLING_PROTOCOL.md`)
   - **Section 8**: "Escalation Paths"
   - **When triggered**: Gate failures (missing artifacts, schema violations, etc.)
   - **Would detect mis-appointed Governance Liaison?**: **NO**
   - **Reason**: PR gates validate PR compliance, not whether agent submitting PR was validly appointed

5. **Violation Detection** (`governance/canon/REPOSITORY_SEEDING_AND_ENFORCEMENT_ROLE_SEPARATION.md`)
   - **Section 10.2**: "Violation Response"
   - **Process**: Detect violation → Classify → Halt work → Revoke agent
   - **Who detects?**: **Governance Administrator (human or agent)**
   - **Is detection automated?**: **NO** — requires active monitoring
   - **Auto-escalation**: **NO** — detection is manual, not automatic

#### Escalation Timing Analysis

**At Gate-Merge Time**:
- PR gates validate PR compliance
- Do NOT validate agent appointment validity
- **Result**: No auto-escalation at merge time

**At Runtime**:
- FM runtime validation checks governance completeness
- Does NOT validate agent appointment validity
- Watchdog (if active) observes execution
- Does NOT validate appointment preconditions
- **Result**: No auto-escalation at runtime start

**During Execution**:
- Governance Liaison agent supposed to self-enforce STOP discipline
- Relies on agent behavior compliance
- Watchdog MAY detect violations post-facto (after damage)
- **Result**: No proactive auto-escalation, only reactive (if detected)

**After Execution**:
- Governance Administrator may audit and detect violations
- Manual review required
- **Result**: No auto-escalation, human-dependent

#### Conclusion: Escalation

**NO AUTO-ESCALATION** exists.

Current state:
- Mis-appointed Governance Liaison would NOT trigger automatic STOP
- Agent acting outside requirements would NOT trigger automatic escalation
- Detection relies on:
  - Agent self-discipline (STOP conditions in Section 7.2)
  - Manual Governance Administrator audit
  - Post-facto Watchdog observation (if violation severe enough)

**Auto-escalation would require**:
1. Pre-appointment validator that checks preconditions before FM recruits agent
2. Runtime monitor that validates agent actions against requirements
3. Automated STOP injection if violation detected
4. Integration with Watchdog for catastrophic violations (e.g., prohibited activities in Section 4.3)

---

## Question 4: Layer-Down Awareness

### Is FM currently aware (mechanically, not conceptually) that Governance Liaison now has minimum appointment requirements?

**Answer**: ❌ **NO MECHANICAL AWARENESS**

### Evidence

#### FM Awareness Mechanisms Surveyed

1. **FM Governance Loading Protocol** (`governance/canon/FM_GOVERNANCE_LOADING_PROTOCOL.md`)
   - **Section 4.2**: "Canonical Governance Structure"
   - **Tier 2 Loading**: `governance/canon/**` (31+ documents)
   - **Is GOVERNANCE_LIAISON_MINIMUM_APPOINTMENT_REQUIREMENTS.md in Tier 2?**: **YES** (location correct)
   - **Will FM load it?**: **YES** (generic `governance/canon/**` loading)
   - **Will FM know what to do with it?**: **UNKNOWN** — depends on FM implementation
   - **Mechanical awareness**: FM will see file exists but may not interpret it as "minimum appointment requirements for Governance Liaison"

2. **Agent Recruitment Protocol** (FM implementation inferred)
   - **Canonical Source**: `governance/canon/AGENT_RECRUITMENT.md`
   - **Section 5**: "Recruitment Preconditions" (current requirements)
   - **Does it reference Governance Liaison minimum requirements?**: **NO**
   - **Implication**: FM recruitment logic currently follows AGENT_RECRUITMENT.md (not new requirements)

3. **Governance Completeness Model** (FM validation dependency)
   - **FM validates governance completeness** per FM_RUNTIME_ENFORCEMENT_AND_AWARENESS_MODEL.md
   - **Completeness Model includes Governance Liaison requirements?**: **NO** (as of current component registry)
   - **Implication**: FM completeness check will PASS even if Governance Liaison requirements missing

4. **Layer-Down Contract** (`governance/canon/GOVERNANCE_LAYERDOWN_CONTRACT.md`)
   - **Purpose**: Define what governance must be layered down to application repos
   - **Does it list Governance Liaison minimum requirements?**: **NO** (document predates these files)
   - **Implication**: Layer-down contract does not require these files in application repos

#### Mechanical Awareness vs Conceptual Awareness

**Conceptual Awareness** (human understanding):
- ✅ Governance Administrator understands Governance Liaison now has minimum requirements
- ✅ Human reviewers reading governance canon will see new files
- ✅ Governance Liaison agents (if given governance canon) will see requirements

**Mechanical Awareness** (automated system understanding):
- ❌ FM recruitment logic does not check GOVERNANCE_LIAISON_MINIMUM_APPOINTMENT_REQUIREMENTS.md
- ❌ FM governance completeness validator does not require these files
- ❌ FM does not have "Governance Liaison appointment validator" component
- ❌ PR gates do not validate Governance Liaison appointments

#### Dependency Chain for Mechanical Awareness

For FM to be **mechanically aware**:

1. **GOVERNANCE_COMPLETENESS_MODEL.md** must include Governance Liaison component
2. **AGENT_RECRUITMENT.md** must reference Governance Liaison minimum requirements
3. **FM recruitment logic** must check requirements before appointing Governance Liaison
4. **FM pre-execution validation** must verify Governance Liaison appointments valid

**Current State**: None of these updates exist.

**Future Layer-Down Task**: Required to propagate awareness to FM.

#### Conclusion: Layer-Down Awareness

**NO MECHANICAL AWARENESS** currently exists.

**Awareness depends on future layer-down task** to:
- Update GOVERNANCE_COMPLETENESS_MODEL.md component registry
- Update AGENT_RECRUITMENT.md to reference new requirements
- (Optionally) Update FM recruitment implementation to validate requirements

---

## System Impact Report (Required Format)

### Detection

**Detected by system?** ❌ **NO**

**Mechanism(s)**: None

**Explanation**: 
- Governance Gate checks hardcoded critical files (not these files)
- Governance Completeness Model component registry does not include Governance Liaison minimum requirements
- FM Governance Loading Protocol loads `governance/canon/**` generically but has no specific detection for these requirements

---

### Enforcement

**Enforced by system?** ❌ **NO**

**Mechanism(s)**: None

**Explanation**:
- AGENT_RECRUITMENT.md does not require these documents to exist before Governance Liaison appointment
- No pre-recruitment validator checks appointment preconditions
- PR gates validate PR compliance, not agent appointment validity
- FM runtime validation checks governance completeness, not agent appointment requirements

**Human reliance required**: FM or human must manually verify Governance Liaison satisfies requirements before appointment

---

### Auto-Escalation on Violation

**Auto-escalated on violation?** ❌ **NO**

**Mechanism(s)**: None

**Explanation**:
- STOP conditions (Section 7.2) rely on agent self-discipline, not automated enforcement
- No runtime monitor validates agent actions against requirements
- No automated STOP injection if violations detected
- Escalation Policy defines paths but does not monitor for violations
- Watchdog (if exists) may detect post-facto, not proactively

**Human reliance required**: Governance Administrator must audit Governance Liaison behavior and detect violations manually

---

## Gap Summary

| System Function | Current State | Mechanism | Human Reliance Required |
|----------------|---------------|-----------|------------------------|
| **Detection** | ❌ Not Detected | None | ✅ YES — Human must verify files exist |
| **Enforcement** | ❌ Not Enforced | None | ✅ YES — Human/FM must verify preconditions before appointment |
| **Auto-Escalation** | ❌ No Auto-Escalation | None | ✅ YES — Human must audit and detect violations |
| **FM Awareness** | ❌ No Mechanical Awareness | Generic canon loading only | ✅ YES — Depends on future layer-down task |

---

## Follow-Up Work Required (Not Executed, Observation Only)

For system detectability, enforcement, and auto-escalation:

### 1. Update Governance Completeness Model (High Priority)

**File**: `governance/canon/GOVERNANCE_COMPLETENESS_MODEL.md`

**Change**: Add component entry to Section 5 (Component Registry)

**Example**:
```markdown
### 5.X Governance Liaison Agent

| Component ID | Required Artifacts | Notes / Purpose | Dependencies |
|---|---|---|---|
| GOVERNANCE_LIAISON_SURVEY | `governance/canon/GOVERNANCE_LIAISON_ROLE_SURVEY.md` | Survey deriving Governance Liaison role | CANON_PURPOSE_SCOPE, AGENT_RECRUITMENT |
| GOVERNANCE_LIAISON_MIN_REQ | `governance/canon/GOVERNANCE_LIAISON_MINIMUM_APPOINTMENT_REQUIREMENTS.md` | Minimum appointment requirements for Governance Liaison | GOVERNANCE_LIAISON_SURVEY, AGENT_RECRUITMENT, REPO_SEEDING_ROLE_SEPARATION |
```

**Impact**: Governance Completeness validation will require these files exist

---

### 2. Update Agent Recruitment Protocol (High Priority)

**File**: `governance/canon/AGENT_RECRUITMENT.md`

**Change**: Add reference to role-specific minimum requirements

**Example**:
```markdown
## 8. Role-Specific Constraints

### 8.X Governance Liaison Agents

Governance Liaison agents:
- Execute repository initialization and governance structural tasks
- MUST satisfy minimum appointment requirements per GOVERNANCE_LIAISON_MINIMUM_APPOINTMENT_REQUIREMENTS.md
- MUST NOT perform architecture, builder, enforcement, or governance evolution activities
- Halt and escalate when encountering ambiguity or conflict
```

**Impact**: FM recruitment must check Governance Liaison minimum requirements

---

### 3. Create Pre-Recruitment Validator (Medium Priority)

**Scope**: Validator that checks appointment preconditions before recruitment

**Requirements**:
- Validate Tier-0 governance accessible
- Validate explicit scope assignment exists
- Validate authorization trail documented
- Validate protocol specification available

**Integration**: FM recruitment logic uses validator before appointing Governance Liaison

**Impact**: Blocks appointment if preconditions not satisfied

---

### 4. Add Runtime Validation (Lower Priority)

**Scope**: Runtime monitor that validates agent actions against requirements

**Requirements**:
- Check agent role matches declared role
- Check agent actions within declared scope
- Detect prohibited activities (Section 4.3)
- Inject STOP if violation detected
- Auto-escalate to Governance Administrator or Watchdog

**Impact**: Auto-escalation on violation during execution

---

## Decision Gate

### Current PR State

**Can this PR merge?**: 
- ✅ **YES** — if gap is **consciously accepted**
- ❌ **NO** — if enforcement required before merge

### Conscious Acceptance

If merged as-is:
- ✅ Governance Liaison minimum requirements are **documented**
- ✅ Requirements are **canonical and authoritative**
- ✅ Human reviewers and agents can read requirements
- ❌ Requirements are **NOT automatically enforced**
- ❌ Violations are **NOT automatically detected**
- ❌ FM has **NO mechanical awareness** of requirements

**Risk**: Governance Liaison could be mis-appointed or act outside requirements without automatic detection or escalation.

**Mitigation**: Human reliance required until follow-up work completed.

### Follow-Up Work Queue

**Required for full enforcement**:
1. ✅ Update GOVERNANCE_COMPLETENESS_MODEL.md (add component entry)
2. ✅ Update AGENT_RECRUITMENT.md (reference Governance Liaison requirements)
3. ⚠️ Create pre-recruitment validator (optional, medium priority)
4. ⚠️ Add runtime validation (optional, lower priority)

**Effort Estimate**: 
- Items 1-2: Small (governance file updates only, no code)
- Items 3-4: Medium to Large (requires FM implementation changes)

---

## Recommendation

**Merge this PR** with **conscious acceptance** that:
- Requirements are documented and canonical
- Enforcement is **human-dependent** until follow-up work completed
- Follow-up work (Items 1-2) should be **queued as explicit next steps**
- Items 3-4 can be deferred to FM implementation roadmap

**Rationale**:
- Documentation must exist before enforcement can be built
- Human governance administrators can enforce requirements manually
- Risk is acceptable if human review applied to Governance Liaison appointments
- Follow-up work is well-defined and actionable

---

## Survey Completion

**Surveyor**: Governance Administrator Agent  
**Date**: 2026-01-01  
**Status**: ✅ COMPLETE  
**Classification**: Observation and reporting (no fixes, no proposals, no assumptions)

---

**End of Pre-Merge System Detectability Survey**
