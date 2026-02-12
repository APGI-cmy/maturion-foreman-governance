# One-Time Build Law - Governance Contract

## Philosophy

**"If QA passes, the build is fully functional and fully deployable. No exceptions. No regressions."**

This is the foundational principle of the Maturion Foreman system. When a build passes QA, it means:

1. **All features are wired and functional** - not just coded, but deployed
2. **All integrations work** - UI connects to API, API connects to database
3. **All routes are accessible** - navigation exists, pages load
4. **All tests pass** - including deployment verification
5. **The system is production-ready** - no "but it needs wiring" or "just needs deployment"

## The Problem This Solves

### Before: Broken Build Handovers

**Scenario**: Builder creates a feature, QA "passes", but:
- Feature doesn't appear in navigation
- API routes aren't registered
- Frontend can't call backend
- Types are defined but not used
- Tests exist but don't verify deployment

**Result**: Johan gets a build that technically "works" but is functionally broken. He has to go back, fix wiring, re-test, re-deploy. **This violates the One-Time Build Law.**

### After: One-Time Build Guarantee

**Scenario**: Builder creates a feature, QA validates:
- ✅ Feature appears in navigation (UI deployment)
- ✅ API routes respond correctly (API deployment)
- ✅ Frontend successfully calls backend (integration)
- ✅ Types are properly imported and used (wiring)
- ✅ Tests verify end-to-end functionality (deployment verification)

**Result**: Johan gets a build that is **fully functional on first handover**. No rework. No regression. **One-Time Build achieved.**

## Enforcement Mechanisms

### 1. Feature Deployment Validator (NEW)

**Purpose**: Verify features are not just built, but **deployed and wired**.

**What It Checks**:
- UI pages exist at expected routes
- API endpoints are registered and respond
- Navigation includes new features
- Types are properly exported and imported
- Integration tests verify end-to-end flow

**Enforcement**: Part of QIEL - **blocks handover** if features aren't properly deployed.

### 2. QIEL Expansion

**Old QIEL** checked:
- Build succeeds
- Lint passes
- Tests pass
- Deployment simulates

**New QIEL** also checks:
- **Features are deployed** (new validator)
- **Navigation is wired**
- **API routes are registered**
- **Integration works end-to-end**

**Result**: QA passing now means **fully functional system**, not just "compiles and tests pass".

### 3. Governance Memory Recording

Every QA failure related to deployment/wiring triggers:
- **QI Incident** recorded in governance memory
- **Blocker** that prevents handover
- **Regression test** auto-generated to prevent recurrence

**Effect**: The system **learns** from deployment failures and prevents them in future builds.

## Autonomous Build Rights Contract

### Why Foreman Has Autonomous Build Rights

Johan trusts the build **if and only if** QA validates:
1. Code quality (existing)
2. Test coverage (existing)
3. **Feature deployment** (NEW)
4. **Integration wiring** (NEW)

**Contract**: Builders can build autonomously **because QA guarantees functionality**. If QA is broken (doesn't validate deployment), autonomous builds create regressions.

### Restoration of Trust

**Problem**: Parking station feature was built but not wired. QA passed but feature was non-functional.

**Root Cause**: QA didn't validate deployment/wiring. It only validated code.

**Solution**: 
1. ✅ Add Feature Deployment Validator to QIEL
2. ✅ Require deployment verification in QA checklist
3. ✅ Block handover if features aren't wired
4. ✅ Record QI incidents for deployment failures
5. ✅ Auto-generate regression tests

**Result**: QA now validates **fully functional builds**, not just code that compiles.

## QA Checklist (Updated)

### Before Handover, ALL Must Pass:

#### Code Quality
- [ ] TypeScript compiles (zero errors)
- [ ] ESLint passes (zero errors, zero warnings)
- [ ] Build succeeds (production mode)

#### Testing
- [ ] Unit tests pass (100%)
- [ ] Integration tests pass (100%)
- [ ] Deployment simulation succeeds

#### Feature Deployment (NEW)
- [ ] All UI pages exist at expected routes
- [ ] All API endpoints are registered
- [ ] Navigation includes new features
- [ ] Types are properly wired
- [ ] End-to-end integration verified

#### System Integrity
- [ ] No schema drift
- [ ] No memory contradictions
- [ ] No governance violations
- [ ] Zero QI incidents unresolved

## Consequences of QA Failure

### If QA Detects Issues

**Action**: **Block handover immediately**

**Process**:
1. Record QI Incident in governance memory
2. Add blocker to build report
3. Generate regression test
4. **Do not hand over to Johan**
5. Return to builder with specific failures

**Rationale**: Johan should **never** receive a broken build. QA exists to prevent regressions.

### If QA Passes But Build Is Broken

**This should be impossible** if QA is working correctly.

**If it happens**:
1. **Critical QA Failure** - the QA system itself is broken
2. Record as **governance incident**
3. Update QA to detect this failure class
4. Add regression test to prevent recurrence
5. **Immediately fix QA** before accepting new builds

**Current Status**: This happened with parking station. QA has been fixed to prevent recurrence.

## Implementation Requirements

### For Builders

**Before**: "I built the feature, tests pass, here you go"

**Now**: "I built the feature, tests pass, **feature is deployed and wired**, verified by QA, here you go"

**Checklist for Builders**:
1. Build feature code
2. Build feature tests
3. **Wire feature into navigation**
4. **Register API routes**
5. **Verify end-to-end integration**
6. Run QIEL locally
7. Ensure QIEL passes (including deployment checks)
8. Hand over only if QIEL passes

### For QA System

**Requirements**:
1. Validate code compiles
2. Validate tests pass
3. **Validate features are deployed** (NEW)
4. **Validate navigation is wired** (NEW)
5. **Validate API integration works** (NEW)
6. Block handover if ANY check fails

### For Governance

**Monitoring**:
- Track QA pass rate
- Track deployment validation failures
- Track QI incidents related to wiring/deployment
- **Alert if QA passes but builds are broken** (should never happen)

## Success Metrics

### One-Time Build Success Rate

**Target**: 100%

**Measurement**: Percentage of builds that are fully functional on first handover.

**Formula**: 
```
Success Rate = (Builds with zero post-handover fixes) / (Total builds) × 100
```

**Current Status**: Need to establish baseline after QA fix.

### QA Effectiveness

**Target**: Zero false positives (QA passes but build broken)

**Measurement**: Number of builds where QA passed but Johan found issues.

**Formula**:
```
False Positive Rate = (Builds with QA pass but issues found) / (Total builds) × 100
```

**Target**: 0%

**Current Status**: 1 false positive (parking station) - QA now fixed.

## Escalation

### If QA Keeps Missing Deployment Issues

**Action**:
1. Pause all autonomous builds
2. Review QA system comprehensively
3. Add missing validation layers
4. Test QA against historical builds
5. Resume autonomous builds only when QA proven reliable

### If Builders Keep Skipping Deployment Wiring

**Action**:
1. Update builder instructions/prompts
2. Add deployment wiring to builder checklist
3. Emphasize in builder governance rules
4. Consider adding automated wiring tools

## Conclusion

The One-Time Build Law is enforced through:
1. **Comprehensive QA** that validates deployment, not just code
2. **Deployment validators** that verify features are wired
3. **Governance memory** that learns from failures
4. **Autonomous builds** that are trustworthy because QA is reliable

**Result**: Johan receives fully functional builds on first handover. No regressions. No rework. One-Time Build achieved.

---

**Status**: ✅ Active

**Last Updated**: 2024-12-09

**Version**: 1.0.0
