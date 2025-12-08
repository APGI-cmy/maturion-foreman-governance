# QIEL Strict Mode Documentation

## Overview

QIEL (Quality Integrity Enforcement Layer) now operates in **STRICT MODE** by default, enforcing zero-tolerance quality assurance across the entire Maturion Foreman ecosystem.

## What is Strict Mode?

Strict Mode means:

- **ZERO warnings allowed** - All warnings are treated as errors
- **ZERO whitelisting** - No exceptions or "acceptable" issues
- **IMMEDIATE failure** - First error stops the build
- **COMPLETE alignment** - Local QIEL matches CI/CD QIEL exactly

## Key Changes from Previous Behavior

### Before (Permissive Mode)

```typescript
// ❌ OLD - Had whitelisting
const allowedWarnings = loadAllowedWarnings();
if (!isWarningWhitelisted(warning, allowedWarnings.build)) {
  // Only fail if NOT whitelisted
}
```

### After (Strict Mode)

```typescript
// ✅ NEW - No whitelisting
if (WARNING_PATTERN.test(line)) {
  // ALL warnings are blockers
  result.warnings.push(warning);
}
result.passed = result.errors.length === 0 && result.warnings.length === 0;
```

## Configuration

### QIEL Config (`lib/foreman/qiel-config.ts`)

```typescript
export const QIW_CONFIG = {
  blockOnCritical: true,   // Always blocked
  blockOnErrors: true,     // Always blocked
  blockOnWarnings: true,   // NEW: Now blocks (was false)
}

export const DRIFT_CONFIG = {
  blockOnCritical: true,
  blockOnMultipleErrors: true,
  errorThreshold: 1,       // NEW: Block on FIRST error (was 3)
}
```

## Running QIEL

### Quick Mode (for PRs)

```bash
npm run qiel:quick
```

Runs:
- Log validation
- Build log parsing
- Lint log parsing
- Test log parsing
- Zero-warning policy
- Schema cohesion

### Full Mode (for main/develop)

```bash
npm run qiel:full
```

Adds:
- Deployment simulation
- Engine load validation

## Exit Codes

- **0**: ALL checks passed - proceed
- **1**: ANY check failed - STOP

## What Gets Checked

### 1. Build Logs (`/tmp/build.log`)

Detects:
- TypeScript compilation errors
- Build failures
- Module not found
- Any `ERROR` or `Warning:` patterns

### 2. Lint Logs (`/tmp/lint.log`)

Detects:
- ESLint errors
- Code style violations
- Any warning markers (⚠)

### 3. Test Logs (`/tmp/test.log`)

Detects:
- Test failures (`FAIL`)
- Assertion errors
- Unhandled exceptions

### 4. Zero-Warning Policy

Scans ALL logs for:
- Build warnings
- Lint warnings
- TypeScript warnings
- Unused variables
- Deprecated API usage

### 5. QIW (Quality Integrity Watchdog)

Monitors all channels and blocks on:
- Critical anomalies
- Error patterns
- Warning patterns (NEW: now blocks)

## Failure Examples

### Example 1: TypeScript Warning

```
# Build log contains:
warning TS6133: 'unusedVar' is declared but its value is never read.

# Result:
❌ QIEL FAILED - 1 warning detected
Zero-warning policy (STRICT): FAILED - 1 issues found
```

### Example 2: Deprecated API

```
# Any log contains:
DeprecationWarning: Buffer() is deprecated

# Result:
❌ QIEL FAILED - Deprecated API detected
Recommendation: Update to use non-deprecated API immediately - strict mode enforced
```

### Example 3: Test With Expected Error

```
# Test log contains:
# Error: This is an expected error for testing

# Result:
❌ QIEL FAILED - Error pattern detected in test log
```

## Fixing Failures

### Strategy 1: Fix the Root Cause

**Best approach**: Fix the actual issue

```typescript
// ❌ Before: Has unused variable
function process(data: any) {
  const temp = data.value;  // unused
  return data;
}

// ✅ After: Removed unused variable
function process(data: any) {
  return data;
}
```

### Strategy 2: Suppress TypeScript Warnings (Last Resort)

Only if truly unavoidable:

```typescript
// @ts-expect-error: External library type mismatch - tracked in issue #123
const result = legacyFunction(data);
```

### Strategy 3: Update Deprecated APIs

```typescript
// ❌ Before: Uses deprecated API
const buf = new Buffer(10);

// ✅ After: Uses current API
const buf = Buffer.alloc(10);
```

## Test Writing Guidelines

### Write Clean Tests

```typescript
// ❌ BAD: Test that produces warnings
test('should handle error', () => {
  console.warn('Testing error handling');  // Creates warning in logs!
  expect(() => throwError()).toThrow();
});

// ✅ GOOD: Clean test
test('should handle error', () => {
  expect(() => throwError()).toThrow();
});
```

### Mock External Warnings

```typescript
// ❌ BAD: Allows external library to warn
test('should use deprecated API', () => {
  legacyLibrary.deprecatedMethod();  // Logs deprecation warning
});

// ✅ GOOD: Suppress warnings from dependencies
test('should use deprecated API', () => {
  const originalWarn = console.warn;
  console.warn = () => {};  // Suppress
  
  legacyLibrary.deprecatedMethod();
  
  console.warn = originalWarn;  // Restore
});
```

## PR Creation Flow

### Before Strict Mode

```
1. Make changes
2. Run tests locally (might pass with warnings)
3. Create PR
4. CI/CD fails ❌
5. QIW creates QIIs
6. Fix and retry
```

### With Strict Mode

```
1. Make changes
2. Run QIEL locally (must be clean)
3. If QIEL passes ✅: Create PR
4. If QIEL fails ❌: Cannot create PR, fix first
5. CI/CD passes ✅ (same config)
6. No QIIs generated
```

## Troubleshooting

### "QIEL failed but I don't see the error"

Check all log files:
```bash
cat /tmp/build.log | grep -i "error\|warn"
cat /tmp/lint.log | grep -i "error\|warn"
cat /tmp/test.log | grep -i "fail\|error"
```

### "This warning is unavoidable"

No warnings are unavoidable. Options:
1. Fix the root cause (preferred)
2. Upgrade dependencies
3. Refactor to avoid the pattern
4. Use proper TypeScript suppression with issue tracking

### "QIEL passes locally but fails in CI/CD"

This should NEVER happen with strict mode. If it does:
1. Verify you're running actual QIEL: `npm run qiel:quick`
2. Check QIEL config version matches
3. Run drift detection: `npm run qa:diff`

### "I need to create PR urgently"

No exceptions. Strict mode exists to prevent:
- Broken builds in main
- QII generation storms  
- Overnight execution failures
- Technical debt accumulation

Fix the issues first, then create PR.

## Benefits of Strict Mode

### 1. Eliminates QII Storms

Before: Dozens of Quality Integrity Incidents from whitelisted issues  
After: Zero QIIs from known issues

### 2. Prevents CI/CD Surprises

Before: "But it worked on my machine!"  
After: Local = CI/CD, guaranteed

### 3. Maintains Quality Bar

Before: Quality slowly degrades through exceptions  
After: Quality bar is absolute and enforced

### 4. Speeds Up Development

Before: Debug CI failures after PR creation  
After: Catch issues before PR creation

### 5. Reduces Technical Debt

Before: "We'll fix this warning later" (never happens)  
After: Must fix immediately

## Governance

This behavior is mandated by **GSR-QA-STRICT-001** (Governance Supremacy Rule).

It cannot be:
- Disabled project-wide
- Overridden per-developer
- Bypassed for "urgent" work
- Relaxed for "legacy" code

## Related Documentation

- `foreman/governance/gsr-qa-strict.md` - Governance rule
- `foreman/qa/qa-philosophy.md` - QA philosophy
- `foreman/qa/quality-integrity-contract.md` - QIC details
- `lib/foreman/qiel-config.ts` - Configuration source

## Support

If you encounter issues with strict mode:

1. Check this documentation
2. Review error messages carefully
3. Fix the root cause
4. Do NOT attempt to bypass

Remember: Strict mode exists to protect True North principles and ensure One Build philosophy. Every warning you fix makes the system stronger.

---

**Last Updated**: 2025-12-08  
**Governance Rule**: GSR-QA-STRICT-001  
**Status**: MANDATORY
