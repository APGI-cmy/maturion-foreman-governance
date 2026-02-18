# FCWT Execution Checklist

**Application Name**: ____________________  
**Application Version**: ____________________  
**FCWT Executor**: ____________________  
**FM Supervisor**: ____________________  
**FCWT Start Date**: ____________________  
**Target Completion Date**: ____________________

---

## Pre-FCWT Validation (FM Sign-Off Required)

**FM Responsibility - ALL must be checked before FCWT begins:**

- [ ] All application waves complete and closed
- [ ] All wave closure certifications issued and complete
- [ ] All QA-to-Red tests 100% GREEN (zero test debt)
- [ ] Application builds successfully (no errors)
- [ ] Application deploys to test environment
- [ ] All acceptance criteria from FRS/TRS met
- [ ] No critical defects or blocking issues
- [ ] FCWT executor assigned and briefed
- [ ] FCWT templates and documentation provided

**FM Signature**: ____________________  **Date**: ____________________

**⚠️ BLOCKING: If any item unchecked, FCWT CANNOT begin. Remediate and re-validate.**

---

## Step 1: QA-to-Red Suite Compilation and Execution

- [ ] Full QA-to-Red test suite compiled from all waves
- [ ] Test suite completeness verified against QA Catalog
- [ ] All tests enabled (no skips, no stubs, no TODOs)
- [ ] Full test suite executed in clean environment
- [ ] **100% GREEN validation**: ALL tests pass, zero failures, zero warnings
- [ ] Test execution log captured
- [ ] Test results summary documented (pass/fail counts, coverage)
- [ ] Test dashboard screenshot saved
- [ ] Test execution environment documented (OS, runtime, versions)

**Evidence Location**: `.fcwt-evidence/test-results/qa-to-red-full-suite-YYYYMMDD.log`

**⚠️ BLOCKING: Any test failure STOPS FCWT. Remediate, fix, re-run until 100% GREEN.**

---

## Step 2: Seed Data Population

### Data Volume Requirements

**Minimum data populated:**
- [ ] 50+ Audit entries (various domains, statuses, configurations)
- [ ] 100+ Criteria (NIST, ISO, CIS, custom frameworks)
- [ ] 200+ Evidence items (documents, links, notes, files)
- [ ] Multiple user roles and permissions configured
- [ ] Representative data distribution (statuses, dates, relationships)

### Data Characteristics

- [ ] Data is realistic (reflects production usage patterns)
- [ ] Data is comprehensive (all entity types, relationships, statuses)
- [ ] Edge cases included (empty fields, max lengths, special characters)
- [ ] Temporal diversity (data spans multiple time periods)
- [ ] Data integrity validated (no orphaned references, valid relationships)

### Documentation

- [ ] Seed data scripts created (or documented manual procedures)
- [ ] Database populated successfully
- [ ] Data integrity validation passed
- [ ] Database snapshot/export created
- [ ] Data summary table created (entity types, counts, distributions)
- [ ] Data generation methodology documented

**Evidence Location**: `.fcwt-evidence/seed-data/`

**FM Input Required?** [ ] Yes [ ] No  
If Yes, input request created: `.fcwt-evidence/fm-input-requests/request-NNN.md`

---

## Step 3: Major Use-Case Flow Testing

### Audit Management Flows

- [ ] Create new audit
- [ ] Configure audit settings (name, framework, scope, dates)
- [ ] Add criteria to audit
- [ ] Assign evidence to criteria
- [ ] Score criteria (compliant, non-compliant, partial, N/A)
- [ ] Generate audit report
- [ ] Export audit report (PDF, Excel, etc.)
- [ ] Archive/close audit

### Evidence Management Flows

- [ ] Upload document evidence
- [ ] Create link evidence (external URLs)
- [ ] Create note evidence (text entries)
- [ ] Tag/categorize evidence
- [ ] Search evidence (by keyword, tag, type)
- [ ] Update evidence (edit, re-upload)
- [ ] Delete evidence
- [ ] Bulk evidence operations (if applicable)

### Criteria Management Flows

- [ ] Import criteria from standard frameworks
- [ ] Create custom criteria
- [ ] Edit criteria details
- [ ] Assign criteria to audits
- [ ] Score criteria across multiple evidence items
- [ ] Add criteria notes and recommendations
- [ ] Bulk criteria operations (if applicable)

### Reporting Flows

- [ ] Generate summary report (high-level audit status)
- [ ] Generate detailed report (all criteria, evidence, scores)
- [ ] Export reports in multiple formats
- [ ] Schedule automated reports (if applicable)
- [ ] Share reports with stakeholders (email, link, download)

### Settings/Configuration Flows

- [ ] User profile management (name, email, preferences)
- [ ] Permission/role configuration (admin, auditor, viewer)
- [ ] Framework selection and configuration
- [ ] Integration settings (if applicable)
- [ ] Notification preferences

### Testing Evidence

- [ ] Test case list created with pass/fail status
- [ ] Screenshots captured for each major workflow
- [ ] Video walkthrough recorded (RECOMMENDED - see Step 8)
- [ ] Detailed test log maintained (timestamps, outcomes)
- [ ] All workflows completed successfully

**Evidence Location**: `.fcwt-evidence/functional-tests/use-case-test-log.md`

---

## Step 4: Edge/Corner/Error Case Testing

### Empty State Testing

- [ ] New user with no data (verify empty state messaging)
- [ ] Empty audit (no criteria assigned)
- [ ] Empty evidence library
- [ ] No search results (verify appropriate messaging)
- [ ] All empty states display user-friendly messages

### Boundary Value Testing

- [ ] Maximum field lengths tested (text inputs at character limits)
- [ ] Minimum values tested (e.g., zero scores, empty lists)
- [ ] Maximum entity counts (e.g., 100+ audits, 500+ criteria)
- [ ] Large file uploads (maximum file size)
- [ ] Long-running operations (large reports, bulk imports)

### Error State Testing

- [ ] Invalid input validation (incorrect formats, out-of-range values)
- [ ] Failed file uploads (corrupted files, unsupported formats)
- [ ] Network errors/timeouts simulated (if possible)
- [ ] Server errors simulated (500 errors, if possible)
- [ ] Permission denied scenarios (unauthorized access attempts)
- [ ] Concurrent edit conflicts (two users editing same entity)

### Data Integrity Testing

- [ ] Duplicate data handling (prevent/warn on duplicates)
- [ ] Orphaned references detected (evidence without criteria, etc.)
- [ ] Circular dependencies handled (if applicable)
- [ ] Data migration/import errors handled gracefully

### Large Data Set Testing

- [ ] Application with 100+ audits (performance, UI responsiveness)
- [ ] Audit with 500+ criteria (loading time, pagination)
- [ ] Evidence library with 1000+ items (search performance, filtering)
- [ ] Search/filter performance with large datasets

### Testing Evidence

- [ ] Edge case test matrix created (case, expected, actual, status)
- [ ] Error handling screenshots captured
- [ ] Performance metrics for large data tests documented
- [ ] All discovered issues/defects documented

**Evidence Location**: `.fcwt-evidence/functional-tests/edge-case-test-matrix.md`

---

## Step 5: UX/Workflow/Accessibility Testing

### Navigation and Workflow

- [ ] All navigation paths intuitive and functional
- [ ] Breadcrumbs/back navigation work correctly
- [ ] No dead ends or confusing flows
- [ ] Consistent layout and UI patterns throughout
- [ ] Loading states and user feedback clear and visible

### Mobile/Responsive Testing (per TRS mobile-first requirement)

- [ ] Tested on mobile viewport (375px width - iPhone SE)
- [ ] Tested on mobile viewport (414px width - iPhone Pro Max)
- [ ] Tested on tablet viewport (768px width - iPad)
- [ ] Tested on tablet viewport (1024px width - iPad Pro)
- [ ] Tested on desktop viewport (1920px width)
- [ ] Touch interactions work correctly (tap, swipe, pinch)
- [ ] No horizontal scrolling on mobile
- [ ] All features accessible and functional on all screen sizes
- [ ] Mobile-first design principles evident

### Performance Testing

- [ ] Page load times < 2 seconds (per TRS requirement)
- [ ] Interaction feedback < 100ms (buttons, clicks responsive)
- [ ] Large list rendering performant (no lag with 100+ items)
- [ ] File upload/download speed reasonable
- [ ] No memory leaks detected (DevTools profiling)
- [ ] No resource exhaustion (CPU, memory usage acceptable)

### Accessibility Testing (if specified in TRS)

- [ ] Keyboard navigation functional (Tab, Enter, Escape keys)
- [ ] Screen reader compatibility tested (basic NVDA/VoiceOver test)
- [ ] Color contrast meets WCAG 2.1 AA guidelines
- [ ] Focus indicators visible and clear
- [ ] Form labels and ARIA attributes present
- [ ] Alt text for images (if applicable)

### Testing Evidence

- [ ] UX test checklist completed with results
- [ ] Screenshots from different viewports (mobile, tablet, desktop)
- [ ] Performance metrics documented (load times, interaction timings)
- [ ] Accessibility audit results (browser DevTools or axe DevTools)
- [ ] UX issues/friction points identified and documented

**Evidence Location**: `.fcwt-evidence/ux-tests/`

---

## Step 6: Adversarial/Stress Testing

### Security Probing

- [ ] SQL injection attempts in input fields (should be blocked)
- [ ] XSS attack attempts in text fields (should be sanitized)
- [ ] Authentication bypass attempts (should be prevented)
- [ ] Authorization boundary violations (access restricted resources)
- [ ] Malicious file uploads attempted (should be rejected)

### Boundary Exploitation

- [ ] Submit forms with all fields empty (validation works)
- [ ] Submit forms with maximum length strings (no crashes)
- [ ] Rapid-fire button clicking (no duplicate submissions)
- [ ] Concurrent operations on same data (conflict handling)
- [ ] Delete entities referenced by other entities (cascading or prevention)

### Workflow Violations

- [ ] Skip required steps in workflows (prevented or handled)
- [ ] Access restricted URLs directly (redirected or blocked)
- [ ] Manipulate URL parameters (validated and sanitized)
- [ ] Back/forward browser navigation mid-workflow (state preserved)
- [ ] Refresh page during operations (state recovered or warning shown)

### Resource Exhaustion

- [ ] Create maximum entities allowed (graceful limits)
- [ ] Upload maximum file sizes (size limits enforced)
- [ ] Perform bulk operations (500+ items, handled gracefully)
- [ ] Open multiple simultaneous connections (rate limiting if applicable)

### Testing Evidence

- [ ] Adversarial test log created (actions attempted, results)
- [ ] Security test results documented (exploits blocked/allowed)
- [ ] Application recovery evidence (graceful degradation demonstrated)
- [ ] Critical defects identified and documented (if any)

**Evidence Location**: `.fcwt-evidence/functional-tests/adversarial-test-log.md`

**⚠️ BLOCKING: Critical security vulnerabilities MUST be remediated before sign-off.**

---

## Step 7: Documentation and Evidence Compilation

### Video Walkthrough (HIGHLY RECOMMENDED)

- [ ] Screen recording created (10-30 minutes duration)
- [ ] Narration explains all major features and workflows
- [ ] Demonstrates happy paths and key error scenarios
- [ ] Shows mobile/responsive views
- [ ] Uploaded to persistent location (YouTube, Google Drive, etc.)
- [ ] Video link documented in FCWT summary report

### Screenshot Collection

- [ ] Screenshots of all major screens/views
- [ ] Before/after states for key operations
- [ ] Error messages and validation examples
- [ ] Empty states and boundary conditions
- [ ] Mobile/responsive views
- [ ] Organized in `.fcwt-evidence/media/screenshots/`

### Test Execution Log

- [ ] Chronological log of all tests performed
- [ ] Test names, timestamps, outcomes documented
- [ ] Issues discovered and resolution status tracked
- [ ] Environment details recorded (browser, OS, version)

### Data Tables

- [ ] Test scenario matrix (scenario, steps, expected, actual, status)
- [ ] Coverage matrix (requirement, test coverage, status)
- [ ] Defect log (issue, severity, status, resolution)
- [ ] Performance metrics table (operation, time, resource usage)

### Test Artifacts Archive Structure

- [ ] `.fcwt-evidence/` directory created
- [ ] `test-results/` subdirectory (QA-to-Red logs, summaries)
- [ ] `seed-data/` subdirectory (scripts, dumps, documentation)
- [ ] `functional-tests/` subdirectory (use-case, edge-case, adversarial logs)
- [ ] `ux-tests/` subdirectory (UX checklist, performance, accessibility)
- [ ] `media/` subdirectory (screenshots/, walkthrough video link)
- [ ] `fcwt-summary-report.md` created

**Evidence Location**: `.fcwt-evidence/` (all organized and committed)

---

## Step 8: FCWT Summary Report Creation

### Report Sections Completed

- [ ] Executive Summary (dates, executor, verdict, critical findings)
- [ ] Test Coverage Summary (QA-to-Red, functional, edge, UX, adversarial)
- [ ] Evidence Inventory (all artifacts with locations/links)
- [ ] Issues and Resolutions (defects found, severity, status)
- [ ] Functional Completeness Declaration (validation against 3 definitions)
- [ ] Handover Contract Checklist (see Step 9)

**Report Location**: `.fcwt-evidence/fcwt-summary-report.md`

---

## Step 9: Handover Contract Validation

### Fully Functional Design Validation (FULLY_FUNCTIONAL_DELIVERY_STANDARD.md Section 3.1)

- [ ] Architecture was implementation-ready (no guesswork required)
- [ ] All user-facing components completely specified
- [ ] All deployment requirements explicit
- [ ] QA Catalog derivable from architecture
- [ ] Implementing design exactly produced working system

**Evidence**: Architecture documents, implementation plan, QA Catalog

---

### Fully Functional App Validation (FULLY_FUNCTIONAL_DELIVERY_STANDARD.md Section 3.2)

- [ ] Application physically exists at documented path
- [ ] Application launches and operates without errors
- [ ] All requirements (FRS → TRS → Architecture) implemented 100%
- [ ] All user workflows operational
- [ ] Application meets all TRS quality standards (performance, UX, accessibility)
- [ ] Application is deployment-ready with valid configuration

**Evidence**: FCWT test results, video walkthrough, deployment verification

---

### Fully Functional Delivery Validation (FULLY_FUNCTIONAL_DELIVERY_STANDARD.md Section 3.3)

- [ ] Production-deployable system complete and works 100%
- [ ] Zero major rework required
- [ ] 100% GREEN test results, zero test debt
- [ ] All acceptance criteria met
- [ ] System works in target environment without fixes
- [ ] All operational requirements met (monitoring, logging, error handling)
- [ ] One-Time Build Law observed: system works completely at first build

**Evidence**: FCWT certification, all test evidence, deployment validation

---

### Handover Contract Document

- [ ] Application identification section complete
- [ ] Functional completeness declaration complete
- [ ] Requirements traceability matrix included
- [ ] Quality assurance declaration complete
- [ ] Evidence archive locations documented
- [ ] Known issues and limitations documented
- [ ] Sign-off section prepared (awaiting signatures)

**Contract Location**: `.fcwt-evidence/fcwt-handover-contract.md`

---

## Step 10: FM Validation and Certification

### FM Review Checklist

**FM Responsibility - review and validate:**

- [ ] FCWT summary report reviewed and complete
- [ ] All evidence artifacts present and accessible
- [ ] All test results reviewed (100% GREEN for QA-to-Red)
- [ ] Video walkthrough reviewed (if provided)
- [ ] Functional completeness criteria validated
- [ ] All issues/defects resolved or documented with rationale
- [ ] Handover contract checklist complete

### FM Certification Requirements

- [ ] All FCWT steps completed with evidence
- [ ] All critical defects resolved (or documented/approved)
- [ ] Application meets all three "fully functional" definitions
- [ ] Handover contract signed by executor

### FM Certification Issued

**Certification Verdict**: [ ] PASS [ ] FAIL

**If PASS:**
- [ ] FCWT certification document created
- [ ] FM signature and date on certification
- [ ] FM signature and date on handover contract
- [ ] Application approved for audit sign-off

**If FAIL:**
- [ ] Failure reasons documented
- [ ] Remediation tasks created
- [ ] Re-validation plan established

**FM Signature**: ____________________  **Date**: ____________________

---

## Post-FCWT Next Steps

After FCWT PASS certification:

- [ ] Post-mortem execution scheduled
- [ ] Canonization/learning capture scheduled
- [ ] Artifact generation completed
- [ ] Audit evidence package prepared
- [ ] CS2 audit review requested

---

## FCWT Test Debt Created (if applicable)

**New tests/functions/tables created during FCWT:**

| Test/Function Name | Purpose | Proposed Disposition |
|-------------------|---------|---------------------|
| _________________ | _______ | [ ] Integrate [ ] Archive |
| _________________ | _______ | [ ] Integrate [ ] Archive |
| _________________ | _______ | [ ] Integrate [ ] Archive |

**Post-Sign-Off Action**: FM to review and decide integration or archival

---

## FM/Owner Input Requests (if applicable)

**Input requests created during FCWT:**

| Request # | Topic | Status | Response Location |
|-----------|-------|--------|------------------|
| _________ | _____ | [ ] Pending [ ] Answered | _________________ |
| _________ | _____ | [ ] Pending [ ] Answered | _________________ |

---

## Critical Issues Discovered

**Critical defects/vulnerabilities found during FCWT:**

| Issue # | Description | Severity | Status | Resolution |
|---------|-------------|----------|--------|------------|
| _______ | ___________ | ________ | ______ | __________ |
| _______ | ___________ | ________ | ______ | __________ |

**⚠️ All CRITICAL issues MUST be RESOLVED before FM certification.**

---

## FCWT Completion Declaration

**I declare that all FCWT protocol steps have been completed in accordance with FINAL_COMPLETE_WAVE_TEST_PROTOCOL.md and that all evidence has been compiled and archived.**

**FCWT Executor Signature**: ____________________  **Date**: ____________________

---

**Reference**: `governance/canon/FINAL_COMPLETE_WAVE_TEST_PROTOCOL.md` v1.0.0  
**Template**: `governance/templates/FCWT_CHECKLIST.template.md`
