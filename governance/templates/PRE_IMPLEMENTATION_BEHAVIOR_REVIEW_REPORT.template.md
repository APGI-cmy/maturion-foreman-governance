# Pre-Implementation Behavior Review Report

## Status
**Type**: Pre-Implementation Review Evidence  
**Created**: [YYYY-MM-DD]  
**Builder**: [Agent Name]  
**Reviewer**: [FM/Senior Builder Name, if applicable]  
**Protocol Version**: 1.0.0  
**Authority**: `governance/canon/PRE_IMPLEMENTATION_BEHAVIOR_REVIEW_PROTOCOL.md` v1.0.0

---

## 1. Scope Declaration

### 1.1 Component Being Enhanced
**Component Path(s)**: [File paths to components being enhanced]

**Component Description**: [Brief description of component function and role in system]

### 1.2 Enhancement Objective
**Enhancement Goal**: [What is being enhanced and why]

**Related Requirements**: [Link to issue, user story, or requirement specification]

**Enhancement Category**: [Select: Feature Enhancement / Performance Optimization / Behavior Modification / API Change / Database Schema Enhancement / UI/UX Improvement / Refactoring with Behavior Impact]

---

## 2. Step 1 Evidence: Implementation Review

### 2.1 Files Reviewed
| File Path | Lines Reviewed | Review Date | Notes |
|-----------|---------------|-------------|-------|
| [path/to/file.ext] | [start-end or "complete"] | [YYYY-MM-DD] | [Key observations] |

### 2.2 Implementation Patterns Identified
**Architecture Pattern(s)**: [e.g., MVC, Service Layer, Repository Pattern, Event-Driven, etc.]

**Key Design Decisions**:
- [Design decision 1 and its rationale]
- [Design decision 2 and its rationale]

**Code Complexity Assessment**: [Simple / Moderate / Complex / Highly Complex]

**Critical Code Paths**:
1. [Code path 1: Description]
2. [Code path 2: Description]

### 2.3 Existing Test Coverage Summary
**Test Files Reviewed**:
- [path/to/test-file.test.ext]

**Test Categories Present**:
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Performance tests
- [ ] Edge case tests

**Coverage Observations**:
- **Well-Covered Areas**: [List areas with good test coverage]
- **Coverage Gaps**: [List areas with missing or incomplete tests]
- **Test Quality Assessment**: [Assessment of existing test quality]

### 2.4 Known Technical Debt
**Existing Technical Debt**:
- [Debt item 1: Description and impact]
- [Debt item 2: Description and impact]

**Debt Impact on Enhancement**: [How existing debt affects this enhancement]

---

## 3. Step 2 Evidence: Current Behavior Documentation

### 3.1 Behavior Verification Commands
**Verification Method**: [Manual Testing / Automated Test Execution / Debug Session / API Testing Tool]

**Commands Executed**:
```bash
[Command 1 with full parameters]
[Command 2 with full parameters]
```

**Execution Timestamp**: [YYYY-MM-DD HH:MM:SS]

**Environment**: [Local Dev / Staging / Test Environment with version info]

### 3.2 Actual Behavior Specifications

#### Happy Path Behavior
**Scenario 1: [Scenario Name]**
```
GIVEN [initial system state]
WHEN [action is performed]
THEN [actual observed behavior]
```

**Verification Evidence**: [Screenshot path / log excerpt / output]

#### Edge Case Behaviors
**Edge Case 1: [Edge Case Name]**
```
GIVEN [edge case system state]
WHEN [action is performed]
THEN [actual observed behavior]
```

**Verification Evidence**: [Screenshot path / log excerpt / output]

**Edge Case 2: [Edge Case Name]**
```
GIVEN [edge case system state]
WHEN [action is performed]
THEN [actual observed behavior]
```

**Verification Evidence**: [Screenshot path / log excerpt / output]

#### Error Condition Behaviors
**Error Condition 1: [Error Condition Name]**
```
GIVEN [error-triggering state]
WHEN [action is performed]
THEN [actual error behavior]
```

**Verification Evidence**: [Screenshot path / log excerpt / output]

### 3.3 Behavior Verification Output
**Complete Output Capture**: [Path to full verification output file, or paste below]

```
[Paste verification output here]
```

### 3.4 Discrepancies Documented
**Code vs. Documentation Discrepancies**:
- [Discrepancy 1: Code does X but docs say Y]

**Code vs. Tests Discrepancies**:
- [Discrepancy 1: Tests validate X but code actually does Y]

**Implicit Assumptions Identified**:
- [Assumption 1: Implicit assumption in code not documented or tested]

---

## 4. Step 3 Evidence: Enhancement Delta

### 4.1 Preserved Behaviors Table
Behaviors that MUST continue to work after enhancement (backward compatibility):

| Behavior ID | Current Behavior | Preservation Requirement | Risk Level | Test Coverage |
|-------------|------------------|--------------------------|------------|---------------|
| PRESERVE-1 | [Current behavior description] | [Why it must be preserved] | [Low/Med/High] | [Existing test ref] |
| PRESERVE-2 | [Current behavior description] | [Why it must be preserved] | [Low/Med/High] | [Existing test ref] |

**Backward Compatibility Commitment**: [Explicit statement about backward compatibility guarantees]

### 4.2 Changed Behaviors Table
Behaviors that WILL be modified by this enhancement:

| Behavior ID | Current Behavior | Enhanced Behavior | Change Rationale | Risk Level |
|-------------|------------------|-------------------|------------------|------------|
| CHANGE-1 | [Current behavior] | [New behavior] | [Why change is needed] | [Low/Med/High] |
| CHANGE-2 | [Current behavior] | [New behavior] | [Why change is needed] | [Low/Med/High] |

**Breaking Change Assessment**: [Are any changes breaking? Impact on consumers?]

### 4.3 New Behaviors Table
Net-new capabilities being added:

| Behavior ID | New Behavior Description | Success Criteria | Risk Level |
|-------------|-------------------------|------------------|------------|
| NEW-1 | [New capability description] | [How to validate success] | [Low/Med/High] |
| NEW-2 | [New capability description] | [How to validate success] | [Low/Med/High] |

### 4.4 Integration Impact Analysis
**Components Affected by Changes**:
- [Component 1: Nature of impact]
- [Component 2: Nature of impact]

**Cross-Component Dependencies**:
- [Dependency 1: Description and impact]

**Integration Risk Points**:
- [Risk Point 1: Description and mitigation strategy]

### 4.5 Overall Risk Assessment
**Highest Risk Area**: [Identification of highest-risk aspect of enhancement]

**Risk Mitigation Strategy**: [How risks will be managed during implementation]

**Rollback Plan**: [How to revert if enhancement causes issues]

---

## 5. Step 4 Evidence: Test Design

### 5.1 Test Categorization Table
| Test ID | Test Name | Category | Coverage | Priority |
|---------|-----------|----------|----------|----------|
| TEST-P1 | [Test name] | PRESERVE | [Behavior ID covered] | [High/Med/Low] |
| TEST-P2 | [Test name] | PRESERVE | [Behavior ID covered] | [High/Med/Low] |
| TEST-C1 | [Test name] | CHANGE | [Behavior ID covered] | [High/Med/Low] |
| TEST-C2 | [Test name] | CHANGE | [Behavior ID covered] | [High/Med/Low] |
| TEST-N1 | [Test name] | NEW | [Behavior ID covered] | [High/Med/Low] |
| TEST-N2 | [Test name] | NEW | [Behavior ID covered] | [High/Med/Low] |

**Category Definitions**:
- **PRESERVE**: Tests validating behaviors that must continue working (regression prevention)
- **CHANGE**: Tests validating modified behaviors work as enhanced
- **NEW**: Tests validating net-new capabilities

### 5.2 Test Coverage Matrix
| Behavior ID | PRESERVE Tests | CHANGE Tests | NEW Tests | Coverage Complete? |
|-------------|----------------|--------------|-----------|-------------------|
| PRESERVE-1 | TEST-P1 | - | - | ✅ |
| PRESERVE-2 | TEST-P2 | - | - | ✅ |
| CHANGE-1 | - | TEST-C1 | - | ✅ |
| CHANGE-2 | - | TEST-C2 | - | ✅ |
| NEW-1 | - | - | TEST-N1 | ✅ |
| NEW-2 | - | - | TEST-N2 | ✅ |

### 5.3 Pre-Enhancement Test Run Results
**Test Execution Command**:
```bash
[Command to run PRESERVE tests against current implementation]
```

**Execution Timestamp**: [YYYY-MM-DD HH:MM:SS]

**Expected Result**: PRESERVE tests should PASS (validating current behavior)

**Actual Result**:
```
[Test execution output showing PRESERVE tests passing]
```

**Test Run Status**: ✅ PASS / ❌ FAIL

**Failure Analysis** (if applicable): [If PRESERVE tests fail, analyze why current behavior tests fail against current implementation - this indicates test design issues]

### 5.4 Test Independence Validation
**Test Isolation Strategy**: [How tests are isolated from each other]

**Test Execution Order Independence**: [Confirm tests can run in any order]

**Shared State Handling**: [How shared state is managed between tests]

### 5.5 Test File Paths
**Test Files Created/Modified**:
- [path/to/test-file.test.ext]

**Test Helper Files** (if created):
- [path/to/test-helper.ext]

---

## 6. Review Completion Certification

### 6.1 Builder Attestation
I, [Builder Agent Name], certify that:
- ✅ All four steps of Pre-Implementation Behavior Review Protocol have been completed
- ✅ Current implementation has been reviewed in detail
- ✅ Actual current behavior has been documented and verified
- ✅ Enhancement delta (preserved/changed/new behaviors) has been explicitly identified
- ✅ Tests have been designed to validate preserved, changed, and new behaviors
- ✅ PRESERVE tests have been run against current implementation and pass
- ✅ All required evidence has been documented in this report

**Builder Signature**: [Builder Agent Name]  
**Certification Date**: [YYYY-MM-DD]

### 6.2 FM/Reviewer Validation
**Reviewer**: [FM/Senior Builder Name]  
**Review Date**: [YYYY-MM-DD]

**Validation Checklist**:
- [ ] All four steps documented with complete evidence
- [ ] Behavior specifications are explicit and testable
- [ ] Enhancement delta is clear and risk-assessed
- [ ] Test coverage is comprehensive (preserved/changed/new)
- [ ] Pre-enhancement test run shows PRESERVE tests passing

**Review Status**: ✅ APPROVED / ⚠️ CONDITIONAL / ❌ REJECTED

**Review Comments**: [FM/Reviewer feedback and any required remediation]

**Approval Signature**: [FM/Reviewer Name]  
**Approval Date**: [YYYY-MM-DD]

---

## 7. Implementation Notes

### 7.1 Implementation Strategy
**Approach**: [High-level implementation approach based on behavior review]

**Implementation Phases**: [If multi-phase implementation]

### 7.2 Continuous Validation
**Validation Checkpoints**: [When to re-validate behavior during implementation]

**Behavior Change Monitoring**: [How to detect unintended behavior changes]

### 7.3 Post-Implementation Verification
**Final Validation Plan**: [How to validate complete enhancement after implementation]

**E2E Testing Requirements**: [E2E scenarios to validate end-to-end behavior]

---

## 8. Appendices

### 8.1 Raw Verification Outputs
**Attached Files**:
- [verification-output-1.txt]
- [screenshot-1.png]
- [log-excerpt-1.log]

### 8.2 Reference Documentation
**Related Documentation**:
- [Link to requirements]
- [Link to architecture docs]
- [Link to API specs]

### 8.3 Revision History
| Date | Version | Change Description | Changed By |
|------|---------|-------------------|------------|
| [YYYY-MM-DD] | 1.0 | Initial review completed | [Builder Name] |

---

**End of Pre-Implementation Behavior Review Report**

---

## Template Usage Notes

### When to Use This Template
- **MANDATORY** for all enhancement work per `PRE_IMPLEMENTATION_BEHAVIOR_REVIEW_PROTOCOL.md`
- Complete BEFORE writing enhancement tests
- Complete BEFORE beginning enhancement implementation

### How to Complete This Template
1. **Fill all sections in order** (Steps 1-4 must be completed sequentially)
2. **Provide concrete evidence** (not just statements - include commands, outputs, logs)
3. **Be explicit about behaviors** (use GIVEN/WHEN/THEN format)
4. **Risk-assess all changes** (Low/Med/High risk levels)
5. **Validate test coverage** (ensure all behaviors are tested)

### Evidence Requirements
- **Commands must be reproducible** (include full parameters and environment)
- **Outputs must be captured** (screenshots, logs, or terminal output)
- **Behaviors must be testable** (explicit, observable, verifiable)
- **Tests must run successfully** (PRESERVE tests pass against current implementation)

### Review Process
1. Builder completes all sections
2. Builder certifies completion (Section 6.1)
3. Builder submits to FM/Reviewer
4. FM/Reviewer validates evidence and approves/rejects (Section 6.2)
5. If approved, builder proceeds with implementation
6. If rejected, builder remediates and resubmits

### Document Lifecycle
- **Created**: Before enhancement testing begins
- **Updated**: If enhancement scope changes significantly
- **Finalized**: After FM/Reviewer approval
- **Archived**: With PR as evidence of protocol compliance

---

**Template Version**: 1.0.0  
**Authority**: `governance/canon/PRE_IMPLEMENTATION_BEHAVIOR_REVIEW_PROTOCOL.md` v1.0.0  
**Created**: 2026-01-14  
**Owner**: Governance Administrator Agent
