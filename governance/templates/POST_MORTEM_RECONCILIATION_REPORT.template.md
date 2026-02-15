# Post-Mortem Reconciliation Report

**Build**: [Build name/identifier]  
**Repository**: [Repository name]  
**Foreman**: [Foreman agent ID]  
**Report Date**: YYYY-MM-DD  
**Post-Mortem Issue**: [Link to post-mortem issue]

---

## 1. Executive Summary

### 1.1 Build Overview

**Build Scope**: [Brief description of what was built]

**Build Duration**: [Start date] to [End date] ([Total duration])

**Build Outcome**: 
- ☐ SUCCESS — All gates GREEN, all handovers accepted
- ☐ PARTIAL SUCCESS — [Describe partial completion]
- ☐ ABANDONED — [Describe why]

**Key Achievements**:
1. [Achievement 1]
2. [Achievement 2]
3. [...]

**Key Challenges**:
1. [Challenge 1]
2. [Challenge 2]
3. [...]

---

### 1.2 High-Level Learnings

**Top 3 Lessons Learned**:
1. [Lesson 1: Brief summary]
2. [Lesson 2: Brief summary]
3. [Lesson 3: Brief summary]

**Top 3 Recommendations for Next Build**:
1. [Recommendation 1]
2. [Recommendation 2]
3. [Recommendation 3]

---

## 2. Build Metrics

### 2.1 Duration and Effort

| Metric | Value | Notes |
|--------|-------|-------|
| Total Duration | [X days/weeks] | [Start to final IBWR] |
| Wave Count | [N waves] | [List wave names] |
| Builder Count | [N builders] | [List builder roles] |
| Issue Count | [N issues] | [Total issues created] |
| PR Count | [N PRs] | [Total PRs merged] |
| Rework Instances | [N] | [Major rework events] |

---

### 2.2 Gate Performance

| Gate | First Attempt | Final Result | Rework Required |
|------|--------------|--------------|-----------------|
| [Gate name] | [PASS/FAIL] | [PASS/FAIL] | [YES/NO - description] |
| [Gate name] | [PASS/FAIL] | [PASS/FAIL] | [YES/NO - description] |

**Gate Failure Analysis**:
- [Analysis of why gates failed and what was learned]

---

### 2.3 Wave Performance

| Wave | Duration | Status | Notable Issues |
|------|----------|--------|----------------|
| [Wave N] | [X days] | [COMPLETE/INCOMPLETE] | [Brief notes] |
| [Wave N] | [X days] | [COMPLETE/INCOMPLETE] | [Brief notes] |

---

## 3. Agent Participation Summary

### 3.1 Agent Participation

| Agent Role | Agent ID | Response Status | Report Completeness | Notes |
|-----------|----------|-----------------|---------------------|-------|
| [Role] | [ID] | [RESPONDED/NO_RESPONSE/UNAVAILABLE] | [COMPLETE/PARTIAL/NONE] | [Brief notes] |
| [Role] | [ID] | [RESPONDED/NO_RESPONSE/UNAVAILABLE] | [COMPLETE/PARTIAL/NONE] | [Brief notes] |

**Participation Assessment**:
- **Full Participation**: [N agents] ([X%])
- **Partial Participation**: [N agents] ([X%])
- **Non-Response**: [N agents] ([X%])

**Non-Response Follow-Up**:
- [Agent name]: [Reason for non-response, follow-up taken]

---

### 3.2 Post-Mortem Completeness

- ☐ COMPLETE — All agents responded, all questions answered
- ☐ SUBSTANTIALLY COMPLETE — Most agents responded, minor gaps
- ☐ INCOMPLETE — Significant gaps in agent participation
- ☐ SEVERELY INCOMPLETE — Major participation failures

**Gaps and Impact**:
- [Description of any gaps and their impact on post-mortem quality]

---

## 4. Lessons Learned by Category

### 4.1 Architecture Lessons

**Lesson 1: [Title]**

- **What Happened**: [Description]
- **Why Important**: [Impact on build quality/future builds]
- **Recommendation**: [Specific action to take]
- **Promotion Candidate**: [YES/NO - If YES, target canon]
- **Source**: [Which agent(s) reported this]
- **Evidence**: [Link to evidence]

**Lesson 2: [Title]**
[Repeat structure...]

**Architecture Lessons Summary**:
- Total architecture lessons: [N]
- Promotion candidates: [N]
- Key takeaway: [Brief summary]

---

### 4.2 QA and Testing Lessons

**Lesson 1: [Title]**

- **What Happened**: [Description]
- **Why Important**: [Impact on build quality/future builds]
- **Recommendation**: [Specific action to take]
- **Promotion Candidate**: [YES/NO - If YES, target canon]
- **Source**: [Which agent(s) reported this]
- **Evidence**: [Link to evidence]

**Lesson 2: [Title]**
[Repeat structure...]

**QA Lessons Summary**:
- Total QA lessons: [N]
- Promotion candidates: [N]
- Key takeaway: [Brief summary]

---

### 4.3 Governance Lessons

**Lesson 1: [Title]**

- **What Happened**: [Description]
- **Why Important**: [Impact on build quality/future builds]
- **Recommendation**: [Specific action to take]
- **Promotion Candidate**: [YES/NO - If YES, target canon]
- **Source**: [Which agent(s) reported this]
- **Evidence**: [Link to evidence]

**Lesson 2: [Title]**
[Repeat structure...]

**Governance Lessons Summary**:
- Total governance lessons: [N]
- Promotion candidates: [N]
- Key takeaway: [Brief summary]

---

### 4.4 Process Lessons

**Lesson 1: [Title]**

- **What Happened**: [Description]
- **Why Important**: [Impact on build quality/future builds]
- **Recommendation**: [Specific action to take]
- **Promotion Candidate**: [YES/NO - If YES, target canon]
- **Source**: [Which agent(s) reported this]
- **Evidence**: [Link to evidence]

**Lesson 2: [Title]**
[Repeat structure...]

**Process Lessons Summary**:
- Total process lessons: [N]
- Promotion candidates: [N]
- Key takeaway: [Brief summary]

---

### 4.5 Technical Lessons

**Lesson 1: [Title]**

- **What Happened**: [Description]
- **Why Important**: [Impact on build quality/future builds]
- **Recommendation**: [Specific action to take]
- **Promotion Candidate**: [YES/NO - If YES, target canon]
- **Source**: [Which agent(s) reported this]
- **Evidence**: [Link to evidence]

**Lesson 2: [Title]**
[Repeat structure...]

**Technical Lessons Summary**:
- Total technical lessons: [N]
- Promotion candidates: [N]
- Key takeaway: [Brief summary]

---

## 5. Standards Compliance Assessment

### 5.1 Compliance by Domain

#### Architecture Domain

| Standard | Compliance Status | Gaps Identified | Risk Level | Recommendation |
|----------|------------------|-----------------|------------|----------------|
| [Standard name] | [COMPLIANT/PARTIAL/NON-COMPLIANT] | [Gap description] | [HIGH/MEDIUM/LOW] | [Action to comply] |

#### QA Domain

| Standard | Compliance Status | Gaps Identified | Risk Level | Recommendation |
|----------|------------------|-----------------|------------|----------------|
| [Standard name] | [COMPLIANT/PARTIAL/NON-COMPLIANT] | [Gap description] | [HIGH/MEDIUM/LOW] | [Action to comply] |

#### Security Domain

| Standard | Compliance Status | Gaps Identified | Risk Level | Recommendation |
|----------|------------------|-----------------|------------|----------------|
| [e.g., OWASP] | [COMPLIANT/PARTIAL/NON-COMPLIANT] | [Gap description] | [HIGH/MEDIUM/LOW] | [Action to comply] |

#### Accessibility Domain

| Standard | Compliance Status | Gaps Identified | Risk Level | Recommendation |
|----------|------------------|-----------------|------------|----------------|
| [e.g., WCAG 2.1] | [COMPLIANT/PARTIAL/NON-COMPLIANT] | [Gap description] | [HIGH/MEDIUM/LOW] | [Action to comply] |

#### Other Domains

[Add additional domains as applicable...]

---

### 5.2 Compliance Summary

**Overall Compliance Assessment**: [Brief summary]

**High-Priority Compliance Gaps** (must address before next build):
1. [Gap and standard]
2. [Gap and standard]

**Medium-Priority Compliance Gaps** (should address):
1. [Gap and standard]
2. [Gap and standard]

---

## 6. Cross-Cutting Themes

### 6.1 Themes Observed Across Multiple Agents

**Theme 1: [Theme title]**

- **Description**: [What pattern was observed]
- **Frequency**: [How many agents reported similar issues]
- **Impact**: [Cumulative impact on build]
- **Root Cause**: [Hypothesized root cause]
- **Recommendation**: [Systemic improvement needed]
- **Promotion**: [PROMOTE_CANON/PROMOTE_TEMPLATE/LOCAL/DISCARD]

**Theme 2: [Theme title]**
[Repeat structure...]

---

### 6.2 Contradictions and Conflicts

**Contradiction 1: [Brief description]**

- **Agent A said**: [Summary of position]
- **Agent B said**: [Summary of conflicting position]
- **Reconciliation**: [How foreman resolved this]
- **Resolution**: [Final determination]

[Repeat for each contradiction...]

---

### 6.3 Unexpected Patterns

**Pattern 1: [Pattern description]**

- **Observation**: [What was observed]
- **Significance**: [Why this matters]
- **Investigation Needed**: [What should be explored further]

[Repeat for each pattern...]

---

## 7. Version 2 Recommendations

### 7.1 Prioritized Improvements

#### Must Have (Critical for Version 2)

1. **[Improvement title]**
   - **Description**: [What to improve]
   - **Rationale**: [Why this is critical]
   - **Implementation**: [How to implement]
   - **Owner**: [Who should implement]
   - **Source**: [Which agent(s) recommended]

2. **[Improvement title]**
   [Repeat structure...]

#### Should Have (High Value)

1. **[Improvement title]**
   - **Description**: [What to improve]
   - **Rationale**: [Why this is valuable]
   - **Implementation**: [How to implement]
   - **Owner**: [Who should implement]
   - **Source**: [Which agent(s) recommended]

#### Nice to Have (Enhancement)

1. **[Improvement title]**
   - **Description**: [What to improve]
   - **Rationale**: [Why this would be nice]
   - **Implementation**: [How to implement]
   - **Owner**: [Who should implement]

---

### 7.2 Features to Add

**New Features for Version 2**:
1. [Feature description and rationale]
2. [Feature description and rationale]

---

### 7.3 Features to Change

**Existing Features to Modify**:
1. [Feature and how to change it]
2. [Feature and how to change it]

---

### 7.4 Features to Remove/Simplify

**Features to Remove or Simplify**:
1. [Feature and why to remove/simplify]
2. [Feature and why to remove/simplify]

---

## 8. Learnings for Promotion

### 8.1 Canonical Governance Candidates (PROMOTE_CANON)

**Candidate 1: [Learning title]**

- **Learning**: [Description of what should be canonical]
- **Target Canon**: [Which canon document or new canon]
- **Authority Required**: [CS2/Governance Admin]
- **Rationale**: [Why this should be canonical]
- **Evidence**: [Supporting evidence]
- **Impact**: [Which future builds will benefit]

**Candidate 2: [Learning title]**
[Repeat structure...]

**Canon Promotion Summary**:
- Total candidates: [N]
- CS2 approval required: [N]
- Governance Admin self-alignment: [N]

---

### 8.2 Architecture Guidance Candidates (PROMOTE_ARCHITECTURE)

1. **[Learning title]**: [Brief description and target document]
2. [...]

---

### 8.3 QA Standards Candidates (PROMOTE_QA)

1. **[Learning title]**: [Brief description and target document]
2. [...]

---

### 8.4 Template/Checklist Candidates (PROMOTE_TEMPLATE)

1. **[Template name]**: [What to add/change]
2. [...]

---

### 8.5 Agent Contract Candidates (PROMOTE_AGENT_CONTRACT)

1. **[Agent contract]**: [What to add/change]
2. [...]

---

### 8.6 Local Learning Only (LOCAL_LEARNING)

These learnings are documented but NOT promoted:
1. [Learning]: [Why local only]
2. [...]

---

### 8.7 Discarded Learnings (DISCARD)

These learnings were reported but discarded:
1. [Learning]: [Why discarded]
2. [...]

---

## 9. Evidence Index

**All evidence referenced in this reconciliation report**:

| Evidence Item | Type | Location/Link | Description |
|---------------|------|---------------|-------------|
| [Item name] | [Type] | [Path/URL] | [Brief description] |
| [Item name] | [Type] | [Path/URL] | [Brief description] |

---

## 10. Foreman's Own Post-Mortem

### 10.1 Foreman Experience

**What worked well in my foreman role**:
- [Positive aspect 1]
- [Positive aspect 2]

**What was challenging**:
- [Challenge 1]
- [Challenge 2]

---

### 10.2 Foreman-Specific Learnings

**Lessons for future foreman sessions**:
1. [Lesson with description]
2. [Lesson with description]

---

### 10.3 Visibility and Control

**Did I have sufficient visibility into builder progress?**
- [Assessment and recommendations]

**Were wave planning artifacts adequate?**
- [Assessment and recommendations]

**Did authority boundaries work as intended?**
- [Assessment and recommendations]

---

## 11. Governance Up-Layer Plan

### 11.1 Learnings Requiring Governance Action

| Learning | Action Required | Target Document | Authority | Timeline |
|----------|----------------|-----------------|-----------|----------|
| [Learning] | [CANON_UPDATE/NEW_CANON/TEMPLATE_UPDATE] | [Target] | [CS2/GovAdmin] | [Expected timeline] |

---

### 11.2 Layer-Down Impact Assessment

**Affected Repositories**:
- [Repo 1]: [Impact description]
- [Repo 2]: [Impact description]

**Layer-Down Complexity**: [LOW/MEDIUM/HIGH]

**Estimated Layer-Down Duration**: [X days/weeks]

---

## 12. Next Steps

### 12.1 Immediate Actions (This Week)

- [ ] [Action item with owner]
- [ ] [Action item with owner]

---

### 12.2 Short-Term Actions (This Month)

- [ ] [Action item with owner]
- [ ] [Action item with owner]

---

### 12.3 Long-Term Actions (Next Build)

- [ ] [Action item with owner]
- [ ] [Action item with owner]

---

## 13. Sign-Off

**Foreman Certification**:
- ✅ All participating agents were queried
- ✅ All available agent reports were reviewed
- ✅ Cross-cutting themes were identified
- ✅ Learnings were categorized by promotion type
- ✅ Recommendations are specific and actionable
- ✅ Evidence is preserved and accessible
- ✅ Report is ready for governance up-layer

**Foreman**: [Foreman agent ID]  
**Date**: YYYY-MM-DD  
**Session**: [Session ID if applicable]

---

**Next Phase**: Governance Administrator up-layer per POST_MORTEM_PROTOCOL.md Section 9

---

**Authority**: POST_MORTEM_PROTOCOL.md v1.0.0 | LIVING_AGENT_SYSTEM.md v6.2.0
