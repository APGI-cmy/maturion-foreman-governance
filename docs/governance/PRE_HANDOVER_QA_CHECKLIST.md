# Pre-Handover QA Checklist

## Purpose

This checklist MUST be completed before ANY code handover. No exceptions.

**Principle**: If QA passes locally, CI/CD MUST pass. If CI/CD fails, QA was incomplete.

## The One-Time Build Law

**"If QA passes, the build is fully functional and deployable. Period."**

This means:
- Zero TypeScript errors (including error paths)
- Zero linting errors
- Zero test failures
- Zero deployment issues
- **Zero CI/CD failures**

## Pre-Handover Validation Steps

### 1. TypeScript Compilation ✅

**Command**: `npm run typecheck`

**Expected Result**: Zero errors (warnings about @types/node are acceptable)

**What This Catches**:
- Missing properties in interfaces
- Type mismatches
- Invalid function signatures
- **Error handling code paths** (critical!)

**Why It Failed**: I didn't run typecheck locally, so I missed the error in the pr-gatekeeper.ts error handling path.

### 2. Linting ✅

**Command**: `npm run lint`

**Expected Result**: Zero errors, zero warnings

**What This Catches**:
- Code style violations
- Potential bugs
- Best practice violations

### 3. Build Verification ✅

**Command**: `npm run build`

**Expected Result**: Build succeeds, artifacts created

**What This Catches**:
- Import errors
- Module resolution issues
- Build configuration problems
- **TypeScript errors in all code paths**

**Why It Failed**: I assumed local TypeScript check was enough. The build process catches different errors.

### 4. Test Execution ✅

**Command**: `npm run test:all`

**Expected Result**: All tests pass

**What This Catches**:
- Broken functionality
- Regression issues
- Integration problems

### 5. QIEL Validation (if applicable) ✅

**Command**: `npm run qiel:full`

**Expected Result**: All QIEL checks pass

**What This Catches**:
- QA policy violations
- Deployment readiness issues
- Feature deployment problems

## CI/CD Simulation

Before handover, simulate CI/CD locally:

```bash
#!/bin/bash
# Run the exact same checks as CI/CD

echo "=== Simulating CI/CD Locally ==="
echo ""

echo "1. Installing dependencies..."
npm ci

echo ""
echo "2. TypeScript compilation check..."
npm run typecheck
if [ $? -ne 0 ]; then
  echo "❌ TypeScript check failed"
  exit 1
fi

echo ""
echo "3. Linting..."
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ Linting failed"
  exit 1
fi

echo ""
echo "4. Building..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build failed"
  exit 1
fi

echo ""
echo "5. Running tests..."
npm run test:all
if [ $? -ne 0 ]; then
  echo "❌ Tests failed"
  exit 1
fi

echo ""
echo "✅ All CI/CD checks passed locally"
echo "Safe to hand over"
```

## What Went Wrong (Lessons Learned)

### Incident 1: Missing featureDeploymentPassed Property

**Error**: TypeScript compilation failed in CI

**Root Cause**: I updated the interface but didn't update all code paths that create objects of that type

**Why Local Testing Didn't Catch It**: I didn't run the build locally

**Fix**: Always run `npm run build` before handover

### Incident 2: Invalid --exclude Flag

**Error**: TypeScript doesn't support --exclude as CLI flag

**Root Cause**: I created a script with invalid TypeScript CLI options

**Why Local Testing Didn't Catch It**: I didn't run the production typecheck script

**Fix**: Always test new scripts before committing

### Incident 3: Invalid recordQIIncident Call

**Error**: Wrong properties passed to function

**Root Cause**: I didn't check the function signature before calling it

**Why Local Testing Didn't Catch It**: Error path wasn't exercised in normal flow

**Fix**: Run typecheck which validates ALL code paths

## Enforcement

### Before Every Commit

Run this command:
```bash
npm run typecheck && npm run lint && npm run build
```

If ANY step fails, **DO NOT COMMIT**.

### Before Every Handover

Complete the full checklist above. Document which steps were run.

### If CI/CD Fails

**This is a QA failure**, not a CI/CD issue. 

**Action**:
1. Acknowledge the QA gap
2. Identify why local validation didn't catch it
3. Update this checklist
4. Fix the issue
5. Re-run FULL validation
6. Commit only when all checks pass

## Accountability

**From Johan's Feedback**:
> "You are supposed to run all tests and checks before handing over. You would have picked this and fixed it if you ran your own full QA before handover, and the merge QIEL would have passed."

**He's absolutely right.**

**New Rule**: If CI/CD fails after handover, it means QA was incomplete. This is not acceptable for the One-Time Build philosophy.

## Integration with QIEL

This pre-handover checklist should eventually be automated as part of QIEL's local execution. When a developer runs `npm run qiel:full`, it should include:

1. TypeScript compilation
2. Linting
3. Build verification
4. Test execution
5. Feature deployment validation

**Result**: If QIEL passes locally, CI/CD MUST pass. No exceptions.

---

**Status**: Active

**Last Updated**: 2024-12-09

**Next Steps**: 
1. Automate this checklist
2. Add pre-commit hooks
3. Integrate into QIEL
