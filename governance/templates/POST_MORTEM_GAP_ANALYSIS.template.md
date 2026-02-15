# Post-Mortem Gap Analysis Report

**Current Build**: [Build name/identifier]  
**Comparison Builds**: [Previous build name(s) for comparison]  
**Analysis Date**: YYYY-MM-DD  
**Governance Administrator**: [Agent ID]  
**Report Version**: 1.0

---

## 1. Executive Summary

### 1.1 Analysis Scope

**Current Build**: [Build name, dates, scope]

**Comparison Baseline**: 
- [Previous build 1]: [Name, dates, scope]
- [Previous build 2]: [Name, dates, scope] (if applicable)

**Analysis Focus**:
- [Focus area 1 - e.g., "QA process improvements"]
- [Focus area 2 - e.g., "Standards compliance"]
- [Focus area 3 - e.g., "Governance effectiveness"]

---

### 1.2 Key Findings

**Overall Trajectory**: 
- ☐ IMPROVING — Most gaps resolved, few regressions
- ☐ MIXED — Some improvements, some regressions
- ☐ REGRESSING — Many regressions, few improvements
- ☐ STAGNANT — No significant change

**Summary Statement**: [2-3 sentence summary of overall progress]

---

### 1.3 Critical Insights

**Top 3 Improvements Verified**:
1. [Improvement with evidence]
2. [Improvement with evidence]
3. [Improvement with evidence]

**Top 3 Regressions Detected**:
1. [Regression with evidence]
2. [Regression with evidence]
3. [Regression with evidence]

**Top 3 New Patterns Emerging**:
1. [Pattern with implications]
2. [Pattern with implications]
3. [Pattern with implications]

---

## 2. Comparison Methodology

### 2.1 Data Sources

**Current Build Data**:
- Post-mortem reconciliation report: [Link]
- Agent self-reports: [Location]
- Build metrics: [Source]
- Gate performance: [Source]
- Evidence artifacts: [Location]

**Previous Build Data**:
- Post-mortem reconciliation report: [Link]
- Lessons learned canon: [Link]
- Gap analysis from previous comparison: [Link]

---

### 2.2 Comparison Dimensions

Analysis performed across the following dimensions:

- ✅ **Architecture** — Design quality, completeness, evolution
- ✅ **QA and Testing** — Test coverage, quality, gate alignment
- ✅ **Governance** — Compliance, enforcement, effectiveness
- ✅ **Process** — Efficiency, clarity, handover smoothness
- ✅ **Technical** — Code quality, standards adherence, debt
- ✅ **Standards Compliance** — International standards by domain
- ✅ **Build Metrics** — Duration, rework, gate performance

---

### 2.3 Gap Categories

Gaps are categorized as:

| Category | Definition | Action Required |
|----------|------------|-----------------|
| **RESOLVED** | Previous gap no longer present | Document success, preserve learning |
| **IMPROVING** | Gap still present but reduced | Continue current approach, monitor |
| **UNCHANGED** | Gap present with no improvement | Escalate, investigate root cause |
| **REGRESSED** | Gap worsened or mistake repeated | Urgent action, governance update |
| **NEW** | Gap not seen in previous builds | Investigate, document, prevent recurrence |

---

## 3. Improvements Verified

### 3.1 Architecture Improvements

**Gap from Previous Build**: [Description of previous gap]

**Current Status**: 
- ☐ RESOLVED — Gap no longer present
- ☐ IMPROVING — Gap reduced but not eliminated
- ☐ UNCHANGED — No change
- ☐ REGRESSED — Gap worsened

**Evidence of Improvement**:
- [Specific evidence item 1]
- [Specific evidence item 2]

**What Changed**:
- [Action taken that led to improvement]

**Success Factors**:
- [What enabled this improvement]

**Recommendation**: 
- [How to preserve this improvement in future builds]

---

[Repeat for each architecture improvement...]

---

### 3.2 QA and Testing Improvements

[Same structure as 3.1, repeat for each QA improvement]

---

### 3.3 Governance Improvements

[Same structure as 3.1, repeat for each governance improvement]

---

### 3.4 Process Improvements

[Same structure as 3.1, repeat for each process improvement]

---

### 3.5 Technical Improvements

[Same structure as 3.1, repeat for each technical improvement]

---

### 3.6 Improvements Summary

| Category | Gaps Resolved | Gaps Improving | Evidence Quality |
|----------|--------------|----------------|------------------|
| Architecture | [N] | [N] | [HIGH/MEDIUM/LOW] |
| QA/Testing | [N] | [N] | [HIGH/MEDIUM/LOW] |
| Governance | [N] | [N] | [HIGH/MEDIUM/LOW] |
| Process | [N] | [N] | [HIGH/MEDIUM/LOW] |
| Technical | [N] | [N] | [HIGH/MEDIUM/LOW] |
| **TOTAL** | **[N]** | **[N]** | — |

---

## 4. Regressions Detected

### 4.1 Critical Regressions (Mistakes Repeated)

**Regression 1: [Title]**

**Original Learning from**: [Previous build, date]

**What Was Learned**: [Summary of original lesson]

**Governance Action Taken**: [What was promoted/updated]

**What Happened This Time**: [Description of repeated mistake]

**Why Prevention Failed**:
- [Root cause analysis of why governance/learning didn't prevent recurrence]

**Evidence**:
- Original lesson: [Link]
- Canonical update: [Link]
- Current occurrence: [Link]

**Severity**: [CRITICAL/HIGH/MEDIUM/LOW]

**Impact**:
- Time lost: [X hours/days]
- Rework required: [YES/NO - description]
- Quality impact: [Description]

**Required Action**:
- [Specific action to prevent future recurrence]
- [Authority responsible]
- [Timeline]

---

**Regression 2: [Title]**
[Repeat structure...]

---

### 4.2 Process Regressions

[Same structure as 4.1, repeat for each process regression]

---

### 4.3 Quality Regressions

[Same structure as 4.1, repeat for each quality regression]

---

### 4.4 Regressions Summary

| Regression Type | Count | Severity Distribution | Root Cause Pattern |
|----------------|-------|----------------------|-------------------|
| Mistakes Repeated | [N] | [C:N, H:N, M:N, L:N] | [Common pattern] |
| Process Gaps | [N] | [C:N, H:N, M:N, L:N] | [Common pattern] |
| Quality Declines | [N] | [C:N, H:N, M:N, L:N] | [Common pattern] |
| **TOTAL** | **[N]** | — | — |

**Overall Regression Assessment**: [Why are regressions occurring]

---

## 5. New Learnings and Patterns

### 5.1 New Learnings Not Seen Before

**New Learning 1: [Title]**

- **Description**: [What was learned]
- **Why This is New**: [Why this wasn't observed in previous builds]
- **Significance**: [Why this matters]
- **Trend Indicator**: [Is this a one-time or emerging pattern]
- **Recommendation**: [What to do about this]
- **Promotion**: [PROMOTE_CANON/LOCAL/DISCARD]

**New Learning 2: [Title]**
[Repeat structure...]

---

### 5.2 Emerging Patterns

**Pattern 1: [Pattern title]**

**Pattern Description**: [What pattern is emerging]

**Frequency Across Builds**:
- [Build 1]: [Occurrence description]
- [Build 2]: [Occurrence description]
- [Current build]: [Occurrence description]

**Trend Direction**: 
- ☐ INCREASING — Pattern becoming more frequent/severe
- ☐ STABLE — Pattern consistent across builds
- ☐ DECREASING — Pattern becoming less frequent/severe

**Risk Assessment**: [CRITICAL/HIGH/MEDIUM/LOW]

**Root Cause Hypothesis**: [What might be causing this pattern]

**Recommendation**: [What systemic change is needed]

---

[Repeat for each emerging pattern...]

---

### 5.3 Early Warning Signals

**Signal 1: [Signal description]**

- **Observation**: [What was observed]
- **Potential Impact**: [What this could lead to]
- **Recommended Action**: [How to address proactively]

[Repeat for each signal...]

---

## 6. Standards Compliance Progress

### 6.1 Compliance Trajectory by Domain

#### Architecture Standards

| Standard | Previous Status | Current Status | Trajectory | Evidence |
|----------|----------------|----------------|------------|----------|
| [Standard] | [Status] | [Status] | [↑/→/↓] | [Link] |

**Architecture Compliance Summary**: [Overall assessment]

---

#### QA/Testing Standards

| Standard | Previous Status | Current Status | Trajectory | Evidence |
|----------|----------------|----------------|------------|----------|
| [Standard] | [Status] | [Status] | [↑/→/↓] | [Link] |

**QA Compliance Summary**: [Overall assessment]

---

#### Security Standards

| Standard | Previous Status | Current Status | Trajectory | Evidence |
|----------|----------------|----------------|------------|----------|
| [e.g., OWASP] | [Status] | [Status] | [↑/→/↓] | [Link] |

**Security Compliance Summary**: [Overall assessment]

---

#### Accessibility Standards

| Standard | Previous Status | Current Status | Trajectory | Evidence |
|----------|----------------|----------------|------------|----------|
| [e.g., WCAG 2.1] | [Status] | [Status] | [↑/→/↓] | [Link] |

**Accessibility Compliance Summary**: [Overall assessment]

---

### 6.2 Compliance Gaps Closed

**Gap Closed 1: [Standard and gap]**
- **Previous Status**: [Description]
- **Action Taken**: [What was done]
- **Current Status**: [Compliant/improved]
- **Evidence**: [Link]

[Repeat for each closed gap...]

---

### 6.3 Compliance Gaps Remaining

**Persistent Gap 1: [Standard and gap]**
- **Risk Level**: [CRITICAL/HIGH/MEDIUM/LOW]
- **Why Still Present**: [Reason]
- **Plan to Address**: [Specific plan]
- **Timeline**: [Expected resolution]

[Repeat for each remaining gap...]

---

### 6.4 Overall Compliance Trajectory

**Compliance Score** (if quantifiable):
- Previous build: [X%]
- Current build: [Y%]
- Change: [+/- Z%]

**Trajectory Assessment**: [IMPROVING/STABLE/DECLINING]

**Key Compliance Priorities for Next Build**:
1. [Priority 1]
2. [Priority 2]
3. [Priority 3]

---

## 7. Build Metrics Comparison

### 7.1 Duration and Efficiency

| Metric | Previous Build | Current Build | Change | Analysis |
|--------|---------------|---------------|--------|----------|
| Total Duration | [X days] | [Y days] | [+/- Z days] | [Better/worse/same and why] |
| Wave Count | [N] | [N] | [+/- N] | [Impact analysis] |
| Rework Instances | [N] | [N] | [+/- N] | [Root cause] |
| Gate Failures | [N] | [N] | [+/- N] | [What changed] |

**Efficiency Assessment**: [Overall efficiency trajectory]

---

### 7.2 Quality Metrics

| Metric | Previous Build | Current Build | Change | Analysis |
|--------|---------------|---------------|--------|----------|
| First-Time Gate Pass Rate | [X%] | [Y%] | [+/- Z%] | [Analysis] |
| Handover Acceptance Rate | [X%] | [Y%] | [+/- Z%] | [Analysis] |
| Evidence Completeness | [Score] | [Score] | [+/- Score] | [Analysis] |

**Quality Assessment**: [Overall quality trajectory]

---

## 8. Recommendations for Next Build

### 8.1 Critical Actions (Must Do Before Next Build)

**Action 1: [Title]**

- **Description**: [What must be done]
- **Rationale**: [Why this is critical]
- **Owner**: [Who is responsible]
- **Timeline**: [When this must be completed]
- **Success Criteria**: [How to measure success]
- **Evidence Required**: [What evidence proves completion]

**Action 2: [Title]**
[Repeat structure...]

---

### 8.2 High-Priority Actions (Should Do)

1. **[Action]**: [Description and owner]
2. **[Action]**: [Description and owner]

---

### 8.3 Medium-Priority Actions (Nice to Have)

1. **[Action]**: [Description and owner]
2. **[Action]**: [Description and owner]

---

### 8.4 Governance Changes Required

**Governance Change 1: [Canon or protocol to update]**

- **Change Type**: [NEW_CANON/CANON_UPDATE/TEMPLATE_UPDATE/PROCESS_CHANGE]
- **Rationale**: [Why this governance change is needed]
- **Impact**: [Which future builds will benefit]
- **Authority Required**: [CS2/Governance Admin/Self-Alignment]
- **Estimated Effort**: [Hours/days]

[Repeat for each governance change...]

---

### 8.5 CS2 Escalations

Issues requiring CS2 attention:

1. **[Issue title]**: [Description and recommended CS2 action]
2. **[Issue title]**: [Description and recommended CS2 action]

---

## 9. Learning Loop Effectiveness Assessment

### 9.1 Learning Capture

**Are learnings being captured effectively?**
- ☐ YES — All agents contributing, high quality
- ☐ PARTIAL — Some agents contributing, variable quality
- ☐ NO — Poor participation, low quality

**Assessment**: [Explanation]

**Recommendations**: [How to improve learning capture]

---

### 9.2 Learning Promotion

**Are qualified learnings being promoted to governance?**
- ☐ YES — Promotion pipeline working well
- ☐ PARTIAL — Some bottlenecks or delays
- ☐ NO — Promotion not happening

**Assessment**: [Explanation]

**Recommendations**: [How to improve promotion process]

---

### 9.3 Learning Application

**Are promoted learnings being applied in subsequent builds?**
- ☐ YES — Evidence of application and improvement
- ☐ PARTIAL — Some application, inconsistent
- ☐ NO — Learnings not being applied

**Assessment**: [Explanation]

**Recommendations**: [How to ensure application]

---

### 9.4 Overall Learning Loop Health

**Learning Loop Status**: 
- ☐ HEALTHY — Capture → Promote → Apply cycle working
- ☐ DEGRADED — One or more steps failing
- ☐ BROKEN — Loop not functioning

**Root Causes of Issues**: [If degraded or broken]

**Corrective Actions Required**: [Specific fixes]

---

## 10. Evidence Index

**All evidence referenced in this gap analysis**:

| Evidence Item | Type | Location/Link | Description |
|---------------|------|---------------|-------------|
| [Item name] | [Type] | [Path/URL] | [Brief description] |
| [Item name] | [Type] | [Path/URL] | [Brief description] |

---

## 11. Sign-Off

**Governance Administrator Certification**:
- ✅ Previous build post-mortems reviewed
- ✅ Current build post-mortem reviewed
- ✅ Improvements verified with evidence
- ✅ Regressions detected and analyzed
- ✅ New patterns identified
- ✅ Compliance trajectory assessed
- ✅ Recommendations are specific and actionable
- ✅ CS2 escalations documented (if applicable)

**Governance Administrator**: [Agent ID]  
**Analysis Date**: YYYY-MM-DD  
**Report Version**: 1.0

---

**Next Steps**:
- Present gap analysis findings to CS2 and Foreman
- Incorporate recommendations into next build initialization
- Update governance canon per identified needs
- Track compliance improvement in future post-mortems

---

**Authority**: POST_MORTEM_PROTOCOL.md v1.0.0 | LIVING_AGENT_SYSTEM.md v6.2.0
