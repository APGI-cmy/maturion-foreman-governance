# AGENT HANDOVER AND QUALITY PROTOCOL

## Status
**Type**: Canonical Governance Standard  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2026-02-16  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Canonical ID**: G-C-AOP-003  
**Precedence**: Subordinate to GOVERNANCE_PURPOSE_AND_SCOPE.md  
**Applies To**: All Agents, All Handovers, All PRs  
**Related Standards**: AGENT_INVOCATION_AND_DELEGATION_PROTOCOL.md, AGENT_RIGHTS_BOUNDARIES_AND_DUTIES_REGISTRY.md, LIVING_AGENT_SYSTEM.md

---

## 1. Purpose

This protocol establishes **comprehensive handover and quality requirements** for all agent work, implementing:

- **Three-Tier Governance Prompt Structure**: How agents receive and understand their mission
- **Pre-Handover Protocol**: What agents must do before declaring work complete
- **Merge Gate Duplication**: Agents must run merge gates in workspace before submitting
- **Improvement Suggestion Mandate**: Every handover requires improvement analysis
- **Quality Verification Checklist**: No failures, warnings, or debt handed over
- **Delivery Beyond Minimum**: Exceeding expectations as standard operating procedure

**Core Principle**: Handovers are not mere completion—they are validated, improved, excellence-driven deliveries with compulsory learning capture.

---

## 2. Constitutional Mandate

This protocol derives authority from and implements:

| Canonical Document | Relationship |
|-------------------|--------------|
| **GOVERNANCE_PURPOSE_AND_SCOPE.md** | Establishes quality and accountability requirements |
| **LIVING_AGENT_SYSTEM.md** | Defines agent lifecycle, memory, and session closure |
| **AGENT_INVOCATION_AND_DELEGATION_PROTOCOL.md** | Defines delegation and verification requirements |
| **MANDATORY_PROCESS_IMPROVEMENT_REFLECTION_PROTOCOL.md** | Mandates continuous improvement capture |
| **MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md** | Defines enhancement capture requirements |
| **BUILD_PHILOSOPHY.md** | One-Time Build Law, Zero Test Debt, QA-as-Proof |
| **WE_ONLY_FAIL_ONCE_DOCTRINE.md** | Learning from failures and preventing recurrence |

---

## 3. Three-Tier Governance Prompt Structure

Every agent operates with **three tiers of governance context**, loaded hierarchically during wake-up and referenced throughout execution.

### Tier 1: Role & General Governance (One-Page Summary)

**Purpose**: Who am I, what do I do, what are my boundaries?

**Content** (embedded in agent contract):
```markdown
## Tier 1: Role & General Governance

**Identity**:
- Agent Type: <agent-type>
- Class: <supervisor|administrator|builder|advisor|liaison>
- Mission: <one-sentence mission statement>

**Authority Sources**:
- Constitutional Canon: GOVERNANCE_PURPOSE_AND_SCOPE.md (immutable)
- Canonical Governance: governance/canon/* (authoritative)
- Working Contract: .agent-workspace/<agent-type>/working-contract.md (operational)

**Core Boundaries**:
- YOU MAY: [3-5 key permissions]
- YOU MAY NOT: [3-5 key prohibitions]
- YOU MUST: [3-5 key duties]
- YOU MUST INVOKE WHEN: [3-5 delegation triggers]

**Creative Obligations**:
- Exercise intelligent, creative ownership
- Proactively improve all work
- "If you see it, you own it" - fix or invoke/verify/escalate
- Deliver beyond minimum expectations
- Suggest improvements at every handover

**Invocation Rules**:
- Invocation is MANDATORY when work exceeds authority
- Formal delegation with specification required
- Verify all delegated work before accepting
- Escalate if unsatisfied with delegated work quality

**Quality Standards**:
- Zero test debt (no failing/skipped/todo/hidden tests)
- 100% GREEN required before handover
- Run merge gates in workspace before submitting
- No warnings, deprecations, or technical debt
- Evidence-first: all claims backed by artifacts

**Reference**: AGENT_RIGHTS_BOUNDARIES_AND_DUTIES_REGISTRY.md for complete authority mapping
```

**Load Time**: Wake-up protocol (`.github/scripts/wake-up-protocol.sh`)

---

### Tier 2: Specific Role Protocol (Agent-Specific Rules)

**Purpose**: How THIS agent type operates, unique responsibilities, specialized protocols.

**Content** (embedded in agent contract):
```markdown
## Tier 2: <Agent-Type> Specific Protocol

**Specialized Responsibilities**:
- [Unique duty 1 for this agent type]
- [Unique duty 2 for this agent type]
- [Unique duty 3 for this agent type]

**Agent-Specific Workflow**:
1. [Step 1 in agent's typical workflow]
2. [Step 2 in agent's typical workflow]
3. [Step 3 in agent's typical workflow]

**Delegation Management** (if applicable):
- Delegates to: [agent types this agent typically delegates to]
- Receives from: [agent types that typically delegate to this agent]
- Validation responsibility: [what this agent must verify]

**Quality Enforcement** (agent-specific):
- [Quality requirement 1 unique to this agent]
- [Quality requirement 2 unique to this agent]

**Evidence Requirements**:
- [Evidence artifact type 1 this agent must produce]
- [Evidence artifact type 2 this agent must produce]

**Escalation Pathways**:
- [Escalation condition 1] → escalate to [target]
- [Escalation condition 2] → escalate to [target]

**Integration with Living Agent System**:
- Memory location: .agent-workspace/<agent-type>/memory/
- Evidence location: .agent-admin/<agent-type>/ OR .agent-workspace/<agent-type>/evidence/
- Delegation location: .agent-workspace/<agent-type>/delegations/
- Escalation location: .agent-workspace/<agent-type>/escalation-inbox/

**Canonical References**:
- [List of canonical documents this agent frequently references]

**Example**: See foreman-v2.agent.md, governance-repo-administrator-v2.agent.md
```

**Load Time**: Wake-up protocol (`.github/scripts/wake-up-protocol.sh`)

---

### Tier 3: Pre-Handover & Delivery Protocol (Universal Quality Gate)

**Purpose**: What EVERY agent must do before declaring work complete and handing over.

**Content** (universal, applies to all agents):
```markdown
## Tier 3: Pre-Handover & Delivery Protocol

**MANDATORY: Execute Before Declaring Work Complete**

### 1. Duplicate Merge Gate Run (In Agent Workspace)

**Requirement**: Run merge gates in `.agent-workspace/<agent-type>/gate-validation/` BEFORE submitting PR.

**Purpose**: Catch failures BEFORE they reach PR gates (fail-fast, stop-and-fix in workspace).

**Process**:
```bash
# Create gate validation workspace
mkdir -p .agent-workspace/<agent-type>/gate-validation/

# Run merge gate checks locally (adapt to repo-specific gates):
# - Lint checks
# - Test suite (must be 100% GREEN)
# - Coverage analysis
# - Security scanning
# - Governance alignment check
# - Dependency vulnerability check

# Document results
echo "Gate Run: $(date)" >> .agent-workspace/<agent-type>/gate-validation/gate-run-log.md
echo "Result: PASS/FAIL" >> .agent-workspace/<agent-type>/gate-validation/gate-run-log.md
echo "Evidence: [links to logs]" >> .agent-workspace/<agent-type>/gate-validation/gate-run-log.md
```

**If ANY gate fails**:
- ❌ STOP immediately
- 🛠️ FIX all failures
- 🔄 RE-RUN gates
- ✅ Verify 100% PASS
- ➡️ THEN proceed to handover

**Prohibition**: Never submit PR with known gate failures or warnings.

---

### 2. Test Debt Detection and Elimination

**Zero Test Debt Required**: Detect and eliminate ALL forms of test debt before handover.

**Test Debt Forms** (check ALL):
- [ ] **Failing tests**: No tests with FAIL/ERROR status
- [ ] **Skipped tests**: No tests marked skip/ignore/pending
- [ ] **TODO tests**: No tests with todo/fixme/wip comments
- [ ] **Commented tests**: No tests commented out in code
- [ ] **Excluded tests**: No tests excluded from CI config
- [ ] **Hidden tests**: No tests in non-standard locations bypassing CI
- [ ] **Incomplete fixtures**: All test fixtures/mocks complete and correct
- [ ] **Suppressed warnings**: No test warnings suppressed or ignored
- [ ] **Deprecation warnings**: All deprecations addressed
- [ ] **Flaky tests**: No intermittently failing tests
- [ ] **Test infrastructure debt**: No stubs, TODOs, or incomplete test utilities

**Detection Methods**:
```bash
# Run full test suite with verbose output
<test-command> --verbose --show-all

# Check for skipped/pending tests
grep -r "skip\|ignore\|pending\|todo" <test-directory>

# Check for commented tests
grep -r "^[[:space:]]*#.*def test\|^[[:space:]]*//.*test\|^[[:space:]]*/\*.*test" <test-directory>

# Check test config for exclusions
cat <test-config-file> | grep -i "exclude\|ignore"

# Validate test count (compare expected vs actual)
echo "Expected test count: X"
echo "Actual test count: Y"
# If X != Y, investigate missing tests
```

**If test debt detected**:
- ❌ STOP handover
- 🛠️ FIX all debt (make skipped tests pass, complete TODOs, remove exclusions)
- 🔄 RE-RUN full suite
- ✅ Verify ZERO debt
- ➡️ THEN proceed to handover

**Prohibition**: Partial success (e.g., 301/303 tests passing) is FAILURE. 100% GREEN required.

---

### 3. Quality Verification Checklist

**Complete ALL items before handover**:

#### Code Quality
- [ ] **Linting passes**: No linting errors or warnings
- [ ] **Type checking passes**: No type errors (if applicable)
- [ ] **Formatting consistent**: Code follows project style guide
- [ ] **No compiler warnings**: Build completes with zero warnings
- [ ] **No deprecation warnings**: All deprecated APIs replaced
- [ ] **No security warnings**: Security scanners report zero issues

#### Test Quality
- [ ] **All tests pass**: 100% GREEN test suite
- [ ] **Zero test debt**: Per Section 2 above
- [ ] **Coverage meets requirements**: Per project standards (typically 80%+)
- [ ] **Integration tests pass**: Cross-component tests succeed
- [ ] **E2E tests pass** (if applicable): Full system tests succeed

#### Governance Quality
- [ ] **Governance alignment verified**: Changes align with canonical governance
- [ ] **Canon hash validation**: CANON_INVENTORY hashes match (no placeholders)
- [ ] **Cross-references valid**: All links to governance docs resolve
- [ ] **Protected files unchanged** (unless CS2-approved): No unauthorized changes
- [ ] **Evidence artifacts complete**: All required evidence produced

#### Documentation Quality
- [ ] **Code documented**: Functions/classes have clear docstrings/comments
- [ ] **README updated** (if applicable): Project docs reflect changes
- [ ] **Architecture docs updated** (if applicable): Design docs current
- [ ] **Change rationale documented**: Why changes were made

#### Delegation Quality (if work involved delegation)
- [ ] **All delegations closed**: No pending delegations
- [ ] **Delegated work verified**: All received work validated
- [ ] **Delegation evidence complete**: All delegation docs and artifacts present

---

### 4. Improvement Suggestion (MANDATORY)

**Canonical Rule**: EVERY handover MUST include improvement analysis.

**Two Options**:

**Option A**: Suggest Improvement
```markdown
## Improvement Suggestion

**What Could Be Improved**:
[Specific, actionable improvement that would enhance this work, process, or system]

**Why This Would Help**:
[Clear benefit: efficiency gain, quality improvement, risk reduction, etc.]

**Implementation Approach**:
[How to implement this improvement - concrete steps]

**Priority**: LOW | MEDIUM | HIGH

**Category**: 
- [ ] Process improvement (workflow, handover, coordination)
- [ ] Tool improvement (scripts, automation, CI/CD)
- [ ] Governance improvement (canon update, template, standard)
- [ ] Code quality improvement (architecture, patterns, maintainability)
- [ ] Documentation improvement (clarity, completeness, examples)

**Parking Station**: Record in .agent-workspace/<agent-type>/improvement-parking/
```

**Option B**: No Improvement (Must Explicitly State)
```markdown
## Improvement Suggestion

**Status**: No suggested improvement at this handover.

**Rationale**: [Brief explanation why no improvement suggested - e.g., "Work executed per standard process with no friction identified" or "Previous improvements recently implemented, awaiting data before suggesting further changes"]
```

**Prohibition**: Cannot skip improvement section. Must explicitly choose Option A or Option B.

**Parking Station Integration**:
- All improvements logged in `.agent-workspace/<agent-type>/improvement-parking/improvements.md`
- Reviewed quarterly by governance-repo-administrator
- High-priority improvements escalated for immediate implementation
- Medium/low-priority improvements batched for future waves

---

### 5. Verification of Delegated Work (If Applicable)

**If agent received delegated work from others**:

- [ ] **Review delegation specification**: Confirm all requirements met
- [ ] **Validate quality**: Run checks, review code, test functionality
- [ ] **Check evidence**: Verify all required artifacts produced
- [ ] **Test integration**: Ensure delegated work integrates correctly
- [ ] **Confirm governance alignment**: No governance violations introduced

**If verification fails**:
- ❌ REJECT work and return to delegating agent with gap analysis
- Document specific failures and what must be fixed
- Request remediation
- Re-verify after fixes
- Only accept after ALL requirements met

**If verification passes**:
- ✅ ACCEPT work
- Document acceptance in delegation file
- Integrate into overall work
- Own the integrated result (accountability now yours)

**Prohibition**: Cannot accept delegated work "on trust" - must verify independently.

---

### 6. Delivery Beyond Minimum

**Canonical Rule**: "Deliver beyond what was asked."

**Mindset**: Meeting requirements is baseline. Exceeding expectations is standard.

**Examples of Going Beyond**:
- Implement feature + add performance optimization
- Fix bug + add test to prevent regression
- Update doc + add examples and diagrams
- Complete task + suggest related improvements
- Meet deadline + deliver early with bonus features

**Proactive Excellence**:
- Anticipate follow-up questions and answer preemptively
- Identify edge cases and handle them
- Add error handling beyond basic requirements
- Improve adjacent code while in area
- Document learnings for future sessions

**Creative Ownership**:
- Think holistically about the problem
- Consider downstream impacts
- Identify opportunities for improvement
- Exercise judgment and initiative
- Take pride in craftsmanship

**Prohibition**: "Good enough" is not good enough. Excellence is expected.

---

### 7. Session Closure and Memory

**Final Step Before Handover**:

**Execute**: `.github/scripts/session-closure.sh <agent-type>`

**Actions**:
1. **Create session memory**: Document what was done, decisions made, lessons learned
2. **Rotate memories**: Keep ≤5 active sessions, archive older
3. **Update personal learning**: Add patterns, lessons, improvements to personal files
4. **Create escalations** (if needed): Document blockers, gaps, authority conflicts
5. **Record final state**: Update environment-health.json with completion status

**Memory Template**: See `LIVING_AGENT_SYSTEM.md` Section "After Work Completes - Session Memory Protocol"

**Mandatory Sections**:
- What I did (actions, files, decisions)
- Living Agent System evidence (logs, ripple status, gaps, hygiene)
- Outcome (✅ COMPLETE | ⚠️ PARTIAL | ❌ ESCALATED)
- Lessons (what worked, challenges, recommendations, governance insights)

---

### 8. Pre-Handover Proof Document

**Create**: `PREHANDOVER_PROOF.md` in repository root

**Purpose**: Evidence that ALL pre-handover requirements met.

**Template**:
```markdown
# Pre-Handover Proof

**Agent**: <agent-type>  
**Date**: YYYY-MM-DD  
**Session**: <session-id>

## 1. Duplicate Merge Gate Run
- [ ] Gates run in workspace: `.agent-workspace/<agent-type>/gate-validation/`
- [ ] All gates PASS
- [ ] Log file: [link]
- [ ] Evidence: [links to artifacts]

## 2. Test Debt Detection
- [ ] Full test suite run
- [ ] Zero failing tests (X/X passing)
- [ ] Zero skipped tests
- [ ] Zero TODO tests
- [ ] Zero commented/excluded/hidden tests
- [ ] All fixtures/mocks complete
- [ ] Zero suppressed warnings
- [ ] Zero deprecations
- [ ] Zero flaky tests
- [ ] Test infrastructure complete

## 3. Quality Verification
### Code Quality
- [ ] Linting: PASS
- [ ] Type checking: PASS (if applicable)
- [ ] Formatting: PASS
- [ ] Build warnings: ZERO
- [ ] Deprecation warnings: ZERO
- [ ] Security warnings: ZERO

### Test Quality
- [ ] Test results: X/X PASS (100%)
- [ ] Coverage: X% (meets requirement)
- [ ] Integration tests: PASS
- [ ] E2E tests: PASS (if applicable)

### Governance Quality
- [ ] Governance alignment: VERIFIED
- [ ] Canon hashes: VALID (no placeholders)
- [ ] Cross-references: VALID
- [ ] Protected files: UNCHANGED (or CS2-approved)
- [ ] Evidence artifacts: COMPLETE

### Documentation Quality
- [ ] Code documented: YES
- [ ] README updated: YES (if applicable)
- [ ] Architecture docs updated: YES (if applicable)
- [ ] Rationale documented: YES

### Delegation Quality (if applicable)
- [ ] All delegations closed: YES
- [ ] Delegated work verified: YES
- [ ] Evidence complete: YES

## 4. Improvement Suggestion
**Status**: [SUGGESTED | NO IMPROVEMENT]

**Suggestion** (if applicable):
[Details per Section 4 above]

## 5. Delegated Work Verification (if applicable)
- [ ] All delegated work reviewed
- [ ] Quality verified
- [ ] Evidence validated
- [ ] Integration tested
- [ ] Governance alignment confirmed

## 6. Delivery Beyond Minimum
**How work exceeded requirements**:
- [Specific example 1]
- [Specific example 2]

## 7. Session Closure
- [ ] Session memory created: `.agent-workspace/<agent-type>/memory/session-XXX-YYYYMMDD.md`
- [ ] Memories rotated (≤5 active)
- [ ] Personal learning updated
- [ ] Escalations created (if needed)
- [ ] Environment health recorded

---

**Pre-Handover Proof Complete**: ✅  
**Ready for CS2/Human Review**: ✅  
**Authority**: AGENT_HANDOVER_AND_QUALITY_PROTOCOL.md v1.0.0
```

**Requirement**: This document must exist and be complete before declaring work ready for review.

---

## 4. Integration with Agent Contracts

### 4.1 Agent Contract Structure Update

**All agent contracts MUST include**:

```markdown
---
# YAML frontmatter with agent metadata
---

# <Agent-Type> — Contract v<X> (Living Agent System v<Y>)

## Mission
[One-sentence mission statement]

## Tier 1: Role & General Governance
[Per Section 3, Tier 1 above]

## Tier 2: <Agent-Type> Specific Protocol
[Per Section 3, Tier 2 above]

## Tier 3: Pre-Handover & Delivery Protocol
Reference: AGENT_HANDOVER_AND_QUALITY_PROTOCOL.md
[Inline checklist or reference to this protocol]

## [Other contract sections: authorities, escalations, etc.]
```

### 4.2 Wake-Up Protocol Integration

**Enhancement Required**: `.github/scripts/wake-up-protocol.sh`

**Additional Steps**:
- Load Tier 1 governance into working contract
- Load Tier 2 agent-specific protocol
- Load Tier 3 pre-handover requirements
- Verify `.agent-workspace/<agent-type>/improvement-parking/` exists
- Check for pending improvement suggestions

### 4.3 Session Closure Protocol Integration

**Enhancement Required**: `.github/scripts/session-closure.sh`

**Additional Steps**:
- Verify pre-handover proof document exists and is complete
- Check improvement suggestion provided (or explicitly declined)
- Validate all gate runs logged
- Confirm zero test debt
- Archive gate validation logs
- Move completed improvement suggestions to parking station

---

## 5. Improvement Parking Station

### 5.1 Structure

**Location**: `.agent-workspace/<agent-type>/improvement-parking/`

**Files**:
```
improvement-parking/
├── improvements.md              # Master log of all suggestions
├── high-priority/               # High-priority improvements
│   ├── improvement-001.md
│   └── improvement-002.md
├── medium-priority/             # Medium-priority improvements
│   └── improvement-003.md
├── low-priority/                # Low-priority improvements
│   └── improvement-004.md
└── implemented/                 # Archive of implemented improvements
    └── improvement-005.md
```

### 5.2 Improvement Log Template

**File**: `improvement-parking/improvements.md`

**Template**:
```markdown
# Improvement Parking Station

**Agent**: <agent-type>  
**Last Updated**: YYYY-MM-DD

## Active Improvements

### High Priority
- [ ] **IMP-001**: [Title] - Suggested: YYYY-MM-DD - [Link to detail]
- [ ] **IMP-002**: [Title] - Suggested: YYYY-MM-DD - [Link to detail]

### Medium Priority
- [ ] **IMP-003**: [Title] - Suggested: YYYY-MM-DD - [Link to detail]

### Low Priority
- [ ] **IMP-004**: [Title] - Suggested: YYYY-MM-DD - [Link to detail]

## Implemented
- [x] **IMP-005**: [Title] - Implemented: YYYY-MM-DD - [Link to detail]

---

**Review Cycle**: Quarterly  
**Next Review**: YYYY-MM-DD  
**Reviewer**: governance-repo-administrator
```

### 5.3 Individual Improvement Template

**File**: `improvement-parking/<priority>/improvement-<ID>.md`

**Template**:
```markdown
# Improvement <ID>: <Title>

## Metadata
- **Agent**: <agent-type>
- **Session**: <session-id>
- **Date Suggested**: YYYY-MM-DD
- **Priority**: LOW | MEDIUM | HIGH
- **Status**: PENDING | IN_PROGRESS | IMPLEMENTED | DECLINED
- **Category**: Process | Tool | Governance | Code | Documentation

## What Could Be Improved
[Specific, actionable improvement description]

## Why This Would Help
[Clear benefit and value proposition]

## Implementation Approach
[Concrete steps to implement]

## Estimated Effort
[Small (<1 day) | Medium (1-3 days) | Large (>3 days)]

## Dependencies
[Any prerequisites or blockers]

## Implementation Plan (if IN_PROGRESS)
- [ ] Step 1
- [ ] Step 2
- [ ] Step 3

## Implementation Evidence (if IMPLEMENTED)
- PR: [link]
- Date: YYYY-MM-DD
- Outcome: [what changed]

---
**Authority**: AGENT_HANDOVER_AND_QUALITY_PROTOCOL.md v1.0.0
```

### 5.4 Parking Station Management

**Quarterly Review** (governance-repo-administrator):
1. Review all pending improvements
2. Re-prioritize based on current needs
3. Select high-priority improvements for next wave
4. Create issues for selected improvements
5. Archive implemented improvements
6. Decline low-value improvements with rationale

**Escalation**:
- High-priority improvements affecting multiple repos → escalate to CS2 for coordination
- Improvements requiring governance canon updates → prioritize in governance roadmap

---

## 6. Compliance and Enforcement

### 6.1 Merge Gate Integration

**Required Gate Check**: Pre-Handover Proof

**Gate Validation**:
```yaml
# .github/workflows/merge-gate-interface.yml

pre-handover-proof:
  name: "Pre-Handover Proof Verification"
  runs-on: ubuntu-latest
  steps:
    - name: Check pre-handover proof exists
      run: |
        if [ ! -f PREHANDOVER_PROOF.md ]; then
          echo "❌ PREHANDOVER_PROOF.md not found"
          exit 1
        fi
    
    - name: Validate proof completeness
      run: |
        # Check all required sections present
        grep -q "## 1. Duplicate Merge Gate Run" PREHANDOVER_PROOF.md || exit 1
        grep -q "## 2. Test Debt Detection" PREHANDOVER_PROOF.md || exit 1
        grep -q "## 3. Quality Verification" PREHANDOVER_PROOF.md || exit 1
        grep -q "## 4. Improvement Suggestion" PREHANDOVER_PROOF.md || exit 1
        grep -q "## 7. Session Closure" PREHANDOVER_PROOF.md || exit 1
        
        # Check proof marked complete
        grep -q "Pre-Handover Proof Complete: ✅" PREHANDOVER_PROOF.md || exit 1
        
    - name: Verify gate run logs exist
      run: |
        # Check gate validation logs present
        ls .agent-workspace/*/gate-validation/ || exit 1
```

**Prohibition**: Cannot merge PR without complete, valid pre-handover proof.

### 6.2 Audit Trail

**Required Evidence**:
- Pre-handover proof document
- Gate validation logs
- Test results (100% GREEN)
- Improvement suggestion (or explicit decline)
- Session memory
- Delegation documents (if applicable)

**Retention**: Permanent (archived but never deleted)

---

## 7. Examples

### 7.1 Example: Foreman Completing Wave

**Scenario**: Foreman completes wave execution, ready to hand over to CS2.

**Pre-Handover Steps**:

1. **Duplicate Merge Gate Run**:
```bash
cd .agent-workspace/foreman/gate-validation/
./run-gates.sh
# Result: All gates PASS
echo "Wave 1 Gates: PASS - $(date)" >> gate-run-log.md
```

2. **Test Debt Detection**:
```bash
# Run full test suite
npm test -- --verbose --coverage
# Result: 150/150 tests PASS, 0 skipped, 0 todos
# Coverage: 92%

# Check for hidden debt
grep -r "skip\|ignore\|pending" qa/
# Result: No matches

# Validate no excluded tests
cat jest.config.js | grep exclude
# Result: No exclusions
```

3. **Quality Verification**:
- [x] Linting: PASS
- [x] Build: PASS (zero warnings)
- [x] Tests: 150/150 PASS (100%)
- [x] Coverage: 92% (exceeds 80% requirement)
- [x] Governance: VALIDATED
- [x] Evidence: COMPLETE (architecture docs, Red QA, builder delegations, gate logs)

4. **Improvement Suggestion**:
```markdown
## Improvement Suggestion

**What**: Automate Red QA generation from architecture diagrams

**Why**: Would reduce Red QA creation time by ~30% and ensure consistency

**How**: Create script to parse architecture docs and generate test skeletons

**Priority**: MEDIUM

**Category**: Tool improvement
```

5. **Delegated Work Verification**:
- Builder-001 work: VERIFIED (all tests pass, zero debt, code quality good)
- Builder-002 work: VERIFIED (all requirements met, evidence complete)

6. **Delivery Beyond Minimum**:
- Implemented wave 1 per requirements ✅
- Added performance benchmarks (not required but valuable) ✅
- Created builder onboarding guide (proactive documentation) ✅
- Identified 3 process improvements for future waves ✅

7. **Session Closure**:
```bash
.github/scripts/session-closure.sh foreman
# Session memory created: session-042-20260216.md
# Memories rotated: 5 active, 37 archived
# Personal learning updated
# Environment health recorded: HEALTHY
```

8. **Pre-Handover Proof**: Created `PREHANDOVER_PROOF.md` with all sections complete

**Result**: Work ready for CS2 review with complete evidence of quality and excellence.

---

### 7.2 Example: Builder Completing Feature Implementation

**Scenario**: Builder implements authentication feature per foreman delegation.

**Pre-Handover Steps**:

1. **Duplicate Merge Gate Run**:
```bash
cd .agent-workspace/builder-001/gate-validation/
npm run lint && npm test && npm run security-check
# All PASS
```

2. **Test Debt Detection**:
```bash
npm test -- --coverage
# 23/23 tests PASS (100%)
# No skipped, no todos, no commented tests
# Coverage: 94%
```

3. **Quality Verification**:
- [x] All foreman Red QA tests: PASS
- [x] Additional unit tests: PASS
- [x] Integration tests: PASS
- [x] Code review: Self-reviewed, ready for foreman
- [x] Governance: Aligned with AUTH_ARCHITECTURE.md

4. **Improvement Suggestion**:
```markdown
## Improvement Suggestion

**What**: Add auth performance benchmarks to CI

**Why**: Would catch performance regressions automatically

**How**: Add benchmark suite to CI with pass/fail thresholds

**Priority**: LOW (feature complete, this is enhancement)
```

5. **Delivery Beyond Minimum**:
- Implemented all auth endpoints per spec ✅
- Added extra error handling for edge cases ✅
- Created API documentation (not required but helpful) ✅
- Added logging for security audit trail ✅

6. **Session Closure**:
```bash
.github/scripts/session-closure.sh builder-001
```

7. **Pre-Handover Proof**: Created and complete

**Result**: Foreman receives high-quality implementation with evidence, verifies, accepts, integrates.

---

## 8. Migration and Adoption

### 8.1 Immediate Actions

**All Agents MUST** (within 30 days):
1. Update agent contracts with three-tier structure
2. Implement pre-handover protocol in next session
3. Create improvement parking station structure
4. Begin using PREHANDOVER_PROOF.md for all work
5. Update wake-up/session-closure scripts

**Governance MUST** (within 30 days):
1. Update agent contract templates
2. Update wake-up/session-closure scripts
3. Add pre-handover proof gate to CI
4. Create improvement parking station templates
5. Schedule quarterly improvement review process

### 8.2 Transition Period

**60-Day Transition** (2026-02-16 to 2026-04-17):
- Pre-handover protocol encouraged but not strictly enforced
- Improvement suggestions required but simplified format accepted
- Merge gate duplication recommended but not blocking
- Full enforcement begins 2026-04-18

**Post-Transition**:
- Pre-handover proof REQUIRED for all PRs
- Incomplete proofs BLOCK merge
- Zero test debt strictly enforced
- Improvement suggestions mandatory

---

## 9. References

### Related Canonical Documents
- `AGENT_INVOCATION_AND_DELEGATION_PROTOCOL.md` - Delegation mechanics
- `AGENT_RIGHTS_BOUNDARIES_AND_DUTIES_REGISTRY.md` - Authority boundaries
- `LIVING_AGENT_SYSTEM.md` - Agent lifecycle and memory
- `MANDATORY_PROCESS_IMPROVEMENT_REFLECTION_PROTOCOL.md` - Continuous improvement
- `BUILD_PHILOSOPHY.md` - Zero test debt, one-time build
- `WE_ONLY_FAIL_ONCE_DOCTRINE.md` - Learning from failures

### Templates and Schemas
- Pre-handover proof template: Section 3.8
- Improvement suggestion template: Section 3.4
- Improvement parking station: Section 5
- Session memory template: `LIVING_AGENT_SYSTEM.md`

---

**End of Document**

---

**Authority**: LIVING_AGENT_SYSTEM.md v6.2.0 | AGENT_HANDOVER_AND_QUALITY_PROTOCOL.md v1.0.0 | Approved by CS2 (Johan Ras) | Effective Date: 2026-02-16
