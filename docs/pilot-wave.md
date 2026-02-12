# Pilot Wave — Foreman First Build Execution

## 🎯 Objective

Execute the first real autonomous build wave end-to-end, with Foreman making decisions and orchestrating builders automatically without human intervention.

**This is the moment Foreman actually builds something.**

## 📋 Target Scope

### Repository
**Target**: `maturion-foreman-app` (this repository)

**Why This Repository?**
- Foreman knows the codebase intimately
- Safe environment for first autonomous execution
- Dogfooding our own orchestration system
- Immediate value delivery to Foreman operations

### Feature: Foreman Status Panel

**Implementation**: `/foreman` dashboard enhancement

**Components to Build**:
1. **Real-time Status Display**
   - Autonomous mode indicator
   - Active build sequences with progress
   - Builder task queue visualization
   - QA results summary
   - Recent audit logs preview

2. **Key Metrics**
   - System uptime
   - Git SHA tracking
   - QA pass/fail ratio
   - Builder task distribution
   - Compliance status

3. **Interactive Elements**
   - Refresh status button
   - Filter/sort build sequences
   - View detailed logs link
   - Quick actions panel

### Why This Feature is Safe

✅ **Small Scope**
- Single component/module
- No database migrations
- Read-only data operations
- Additive changes only

✅ **Testable**
- Component can be tested in isolation
- QA validation straightforward
- Easy to validate functionality
- Clear acceptance criteria

✅ **Compliant**
- No secrets involved
- No external integrations
- No breaking changes
- Full audit trail

## 🚀 Trigger Mechanisms

### 1. Chat UI Command

In the Foreman Chat UI (`/foreman`), users can type:

```
Foreman, run Pilot Build Wave.
```

Or:

```
/foreman run pilot
```

The chat interface detects these patterns and triggers the pilot build via API.

### 2. GitHub Issue Comment

In any GitHub issue, post a comment:

```
@foreman run pilot
```

Or:

```
/foreman run pilot
```

The webhook handler detects these patterns and initiates the pilot build.

### 3. Direct API Call

```bash
POST /api/foreman/run-build
Content-Type: application/json

{
  "pilot": true,
  "organisationId": "maturion_isms",
  "autonomousBuildEnabled": true,
  "createPR": true,
  "generateReport": true,
  "owner": "MaturionISMS",
  "repo": "maturion-foreman-app",
  "branch": "foreman/pilot-wave",
  "baseBranch": "main",
  "pilotWave": true,
  "waveNumber": 1,
  "feature": "foreman-status-dashboard"
}
```

## 🔄 Full Pipeline Execution

### Phase 1: Architecture Analysis
**Foreman must:**
1. Load current architecture from codebase
2. Analyze existing `/foreman` page structure
3. Identify gaps for status dashboard feature
4. Determine required components and types

**Expected Output**: Architecture gap analysis with implementation plan

### Phase 2: Task Generation
**Foreman must:**
1. Convert architecture gaps to builder tasks
2. Assign tasks to appropriate builders:
   - **Schema Builder**: Type definitions for dashboard data
   - **UI Builder**: Dashboard component creation
   - **UI Builder**: Page integration
   - **QA Builder**: Component tests
3. Set task priorities and dependencies

**Expected Output**: 4-6 builder tasks with clear descriptions

### Phase 3: Builder Dispatch
**Foreman must:**
1. Dispatch tasks to builder endpoints
2. In autonomous mode: Auto-approve tasks
3. Builders execute in parallel where possible
4. Collect builder outputs/artifacts

**Expected Output**: Completed code artifacts from builders

### Phase 4: QA Validation
**Foreman must:**
1. Run QA Builder on all code artifacts
2. Validate:
   - Type safety
   - Component rendering
   - Code quality standards
   - Accessibility compliance
3. Run QA-of-QA meta-review
4. Block if QA fails

**Expected Output**: QA validation report with pass/fail status

### Phase 5: Compliance Checks
**Foreman must:**
1. Scan for secrets in code
2. Validate organization ID present
3. Check for breaking changes
4. Verify audit logging complete

**Expected Output**: Compliance verification report

### Phase 6: PR Assembly
**Foreman must:**
1. Collect all artifacts
2. Assemble PR description with:
   - Architecture gaps addressed
   - Builder tasks summary
   - QA results
   - Compliance status
   - Governance reasoning
3. Create pull request automatically

**Expected Output**: PR created with comprehensive context

### Phase 7: Report Generation
**Foreman must:**
1. Generate comprehensive build report
2. Include all execution details
3. Save to `reports/WAVE_3_3_PILOT_BUILD.md`

**Expected Output**: Detailed build report file

## 📊 Build Report Format

### File: `reports/WAVE_3_3_PILOT_BUILD.md`

**Required Sections**:

1. **Executive Summary**
   - Build status (PASSED/FAILED)
   - Execution time
   - PR link (if created)
   - Key metrics

2. **Build Context**
   - Organisation ID
   - Trigger source
   - Autonomous mode status
   - Git SHA
   - Foreman version

3. **Architecture Analysis**
   - Gaps identified
   - Implementation strategy
   - Modules affected
   - Dependencies

4. **Builder Tasks**
   - Task ID and description
   - Builder type
   - Status (completed/failed)
   - Execution time
   - Output summary

5. **Builders Called**
   - Builder name and type
   - Tasks executed
   - Artifacts generated
   - Success rate

6. **QA Results**
   - Total checks run
   - Passed checks
   - Failed checks
   - QA-of-QA result
   - Detailed findings

7. **Compliance Verification**
   - Secret detection result
   - Organisation ID validation
   - Breaking change check
   - Audit log completeness

8. **PR Details** (if created)
   - PR URL
   - Branch name
   - Description preview
   - Files changed

9. **Reasoning Summary**
   - Foreman's decision-making process
   - Why each builder was chosen
   - Trade-offs considered
   - Risk mitigation

10. **Architecture Impact**
    - New components added
    - Modified components
    - Type definitions created
    - Dependencies added

11. **Execution Timeline**
    - Start time
    - Phase durations
    - End time
    - Total duration

12. **Lessons Learned**
    - What worked well
    - Challenges encountered
    - Optimizations for next wave
    - Recommendations

## ✅ Acceptance Criteria

### Pipeline Execution
- ✅ Pilot wave runs from start to finish
- ✅ All phases complete successfully
- ✅ No manual intervention required
- ✅ Full automation demonstrated

### Autonomous Operation
- ✅ No human approval needed when `autonomousMode = true`
- ✅ Tasks auto-approved by system
- ✅ Build completes without pausing
- ✅ Decision-making logged

### Quality Gates
- ✅ QA passed (or blocks appropriately)
- ✅ QA-of-QA meta-review passed
- ✅ Compliance checks passed
- ✅ All gates enforced

### Deliverables
- ✅ PR generated automatically
- ✅ Comprehensive build report created
- ✅ All artifacts collected
- ✅ Audit trail complete

### Observability
- ✅ Vercel logs show full reasoning and execution steps
- ✅ Each phase logged with timestamps
- ✅ Errors logged with context
- ✅ Metrics tracked

### Communication
- ✅ Foreman able to explain decisions in Chat UI
- ✅ Report is human-readable
- ✅ PR description is comprehensive
- ✅ Stakeholders can understand what happened

## 🛡️ Safety Mechanisms

### Pre-Flight Checks
1. Verify autonomous mode is enabled
2. Check all required environment variables
3. Validate GitHub credentials
4. Confirm OpenAI API access

### Quality Gates (Always Enforced)
1. **QA Gate**: All code must pass QA validation
2. **QA-of-QA Gate**: Meta-review ensures QA quality
3. **Compliance Gate**: No secrets, audit logging required
4. **Test Gate**: Code changes must include tests

### Failure Handling
- Any gate failure aborts the build
- Failures logged with full context
- PR not created if any gate fails
- Report generated even on failure

### Rollback Plan
- PR can be closed if issues found
- Changes are isolated to feature branch
- No direct commits to main
- Easy to revert if needed

## 📈 Success Metrics

### Technical Metrics
- **Build Duration**: < 10 minutes end-to-end
- **QA Pass Rate**: 100% (or build blocks)
- **Compliance Pass Rate**: 100% (or build blocks)
- **Artifacts Generated**: 4-6 files
- **Tasks Completed**: 4-6 builder tasks

### Process Metrics
- **Autonomy**: 0 human interventions
- **Logging**: 100% of actions logged
- **Reasoning**: All decisions explained
- **Traceability**: Full audit trail

### Quality Metrics
- **Type Safety**: All TypeScript types valid
- **Linting**: 0 lint errors
- **Build**: Successful compilation
- **Tests**: All tests pass (if applicable)

## 🎬 Execution Example

### Triggering via Chat UI

```
User: Foreman, run Pilot Build Wave.

Foreman: Initiating Pilot Build Wave 1...

✓ Architecture analysis complete (2.3s)
  - Identified 1 gap: Status dashboard missing
  - Generated 5 builder tasks

✓ Tasks dispatched (0.8s)
  - Schema Builder: Dashboard types
  - UI Builder: Status component (2 tasks)
  - QA Builder: Component tests (2 tasks)

✓ Autonomous approval granted (0.1s)
  - All tasks auto-approved
  - Executing in parallel...

✓ Builders completed (4.2s)
  - 5/5 tasks successful
  - 6 artifacts generated

✓ QA validation passed (1.7s)
  - Type safety: ✓
  - Rendering: ✓
  - Code quality: ✓
  - Accessibility: ✓

✓ QA-of-QA meta-review passed (0.9s)

✓ Compliance checks passed (0.5s)
  - No secrets detected
  - Organisation ID validated
  - No breaking changes

✓ PR created (1.2s)
  - Branch: foreman/pilot-wave
  - URL: https://github.com/MaturionISMS/maturion-foreman-app/pull/42

✓ Build report generated (0.3s)
  - File: reports/WAVE_3_3_PILOT_BUILD.md

🎉 Pilot Build Wave 1 completed successfully in 12.0s

Total tasks: 5
Artifacts: 6
QA pass rate: 100%
```

### Expected PR Description

```markdown
# [Pilot Build Wave 1] Foreman Status Dashboard

## Summary
Autonomous build wave executed by Foreman orchestrator. This PR implements
a real-time status dashboard for the Foreman system.

## Architecture Gaps Addressed
- Missing status visualization for build sequences
- No real-time monitoring of builder tasks
- Limited visibility into QA results

## Builder Tasks Completed
1. ✅ Schema Builder: Dashboard type definitions (0.8s)
2. ✅ UI Builder: ForemanDashboard component (1.2s)
3. ✅ UI Builder: Page integration (0.7s)
4. ✅ QA Builder: Component tests (1.1s)
5. ✅ QA Builder: Integration tests (0.4s)

## QA Results
- Type safety: ✅ PASSED
- Component rendering: ✅ PASSED
- Code quality: ✅ PASSED
- Accessibility: ✅ PASSED
- QA-of-QA: ✅ PASSED

## Compliance Status
- Secret detection: ✅ PASSED (no secrets found)
- Organisation ID: ✅ VALIDATED (maturion_isms)
- Breaking changes: ✅ NONE DETECTED
- Audit logging: ✅ COMPLETE

## Files Changed
- `types/dashboard.ts` (new)
- `components/ForemanDashboard.tsx` (new)
- `app/foreman/page.tsx` (modified)
- `lib/foreman/dashboard-data.ts` (new)
- `components/__tests__/ForemanDashboard.test.tsx` (new)
- `reports/WAVE_3_3_PILOT_BUILD.md` (new)

## Governance Reasoning
This build was executed under autonomous mode with full QA governance.
All quality gates were enforced. No human code review performed - QA
and architecture are the reviewers.

## Generated By
- Foreman Orchestrator v0.1.0
- Build Sequence ID: seq_1234567890_abc123
- Autonomous Mode: ENABLED
- Git SHA: abc123def456
```

## 🔮 Future Waves

This pilot establishes patterns for:
- **Wave 2**: Multi-module features
- **Wave 3**: Cross-repository builds
- **Wave 4**: Database schema changes
- **Wave 5**: External service integrations

Each wave increases complexity, building confidence in autonomous operation.

## 📚 References

- [Wave 3.2 Summary](../WAVE_3.2_SUMMARY.md) - Autonomous execution implementation
- [Pilot Build Wave 1](./pilot-build-wave-1.md) - Original pilot specification
- [README](../README.md) - Autonomous mode configuration
- [Foreman Identity](../foreman/identity/foreman-identity.md) - No human review principle

---

**Status**: Ready for Execution  
**Last Updated**: 2025-12-05  
**Version**: 1.0  
**Owner**: Foreman Orchestrator
