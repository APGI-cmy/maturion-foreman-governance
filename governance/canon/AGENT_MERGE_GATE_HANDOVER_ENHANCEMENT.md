# AGENT MERGE GATE HANDOVER ENHANCEMENT

## Status
**Type**: Canonical Governance Standard  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2026-02-16  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Canonical ID**: G-C-AOP-005  
**Precedence**: Subordinate to GOVERNANCE_PURPOSE_AND_SCOPE.md  
**Applies To**: All Agents, All PRs, All Merge Gates  
**Related Standards**: AGENT_HANDOVER_AND_QUALITY_PROTOCOL.md, BUILD_PHILOSOPHY.md, MERGE_GATE_INTERFACE_STANDARD.md

---

## 1. Purpose

This standard establishes **enhanced merge gate requirements** focused on detecting and preventing test dodging, technical debt, and quality shortcuts.

**Core Principle**: Merge gates must catch ALL forms of quality compromise—not just obvious failures, but also hidden debt, test dodging, warnings, deprecations, and shortcuts that accumulate into systemic problems.

This standard defines:
- **Comprehensive Test Debt Detection**: All forms of test debt must be detected and blocked
- **Test Dodging Detection**: Intentional or accidental test avoidance must be caught
- **Technical Debt Detection**: All forms of technical debt must be identified
- **Warning and Deprecation Detection**: No warnings or deprecations allowed
- **Pre-Handover Duplicate Gate Runs**: Agents must run gates in workspace before PR submission
- **Evidence-First Failures**: All gate failures must provide clear evidence and remediation guidance

---

## 2. Constitutional Mandate

This standard derives authority from and implements:

| Canonical Document | Relationship |
|-------------------|--------------|
| **GOVERNANCE_PURPOSE_AND_SCOPE.md** | Establishes quality and accountability requirements |
| **BUILD_PHILOSOPHY.md** | One-Time Build Law, Zero Test Debt, QA-as-Proof |
| **MERGE_GATE_INTERFACE_STANDARD.md** | Defines merge gate requirements and structure |
| **AGENT_HANDOVER_AND_QUALITY_PROTOCOL.md** | Defines pre-handover requirements |
| **STOP_AND_FIX_DOCTRINE.md** | Immediate remediation of quality issues |
| **WE_ONLY_FAIL_ONCE_DOCTRINE.md** | Learning and preventing recurrence |

---

## 3. Test Debt Detection

### 3.1 Test Debt Categories

**Canonical Rule**: ALL forms of test debt must be detected and blocked at merge gate.

#### Category 1: Failing Tests
**Detection**:
```yaml
- name: Detect Failing Tests
  run: |
    # Run full test suite
    npm test -- --verbose 2>&1 | tee test-output.txt
    
    # Check for failures
    if grep -i "fail\|error" test-output.txt; then
      echo "❌ FAILING TESTS DETECTED"
      echo "All tests must pass. No exceptions."
      exit 1
    fi
    
    # Verify 100% pass rate
    TOTAL_TESTS=$(grep -oP '\d+(?= tests?)' test-output.txt | head -1)
    PASSED_TESTS=$(grep -oP '\d+(?= passed)' test-output.txt | head -1)
    
    if [ "$TOTAL_TESTS" != "$PASSED_TESTS" ]; then
      echo "❌ NOT ALL TESTS PASSING"
      echo "Required: $TOTAL_TESTS/$TOTAL_TESTS passing"
      echo "Actual: $PASSED_TESTS/$TOTAL_TESTS passing"
      exit 1
    fi
```

**Prohibition**: Partial pass (e.g., 301/303) is FAILURE. 100% pass required.

---

#### Category 2: Skipped Tests
**Detection**:
```yaml
- name: Detect Skipped Tests
  run: |
    # Check test output for skip indicators
    npm test -- --verbose 2>&1 | tee test-output.txt
    
    # Detect skipped tests
    if grep -i "skip\|ignored\|pending" test-output.txt; then
      echo "❌ SKIPPED TESTS DETECTED"
      echo "All tests must run. No tests may be skipped."
      echo "Found: $(grep -i "skip\|ignored\|pending" test-output.txt)"
      exit 1
    fi
    
    # Verify no skip markers in code
    if grep -r "skip\|xdescribe\|xit\|fdescribe\|fit" test/ spec/; then
      echo "❌ SKIP MARKERS IN TEST CODE"
      echo "Remove all skip markers (skip, xdescribe, xit, etc.)"
      exit 1
    fi
```

**Prohibition**: No tests may be skipped for ANY reason. If test is broken, FIX IT.

---

#### Category 3: TODO/WIP Tests
**Detection**:
```yaml
- name: Detect TODO/WIP Tests
  run: |
    # Check for TODO/WIP markers
    if grep -ri "todo\|wip\|fixme" test/ spec/; then
      echo "❌ TODO/WIP TESTS DETECTED"
      echo "All tests must be complete. No TODO or WIP tests allowed."
      echo "Found:"
      grep -rni "todo\|wip\|fixme" test/ spec/
      exit 1
    fi
```

**Prohibition**: Tests must be complete. No placeholder or incomplete tests.

---

#### Category 4: Commented Tests
**Detection**:
```yaml
- name: Detect Commented Tests
  run: |
    # Detect commented test definitions
    # (Patterns vary by language - adapt as needed)
    
    # JavaScript/TypeScript
    if grep -r "^[[:space:]]*//.*\(describe\|it\|test\)" test/ spec/; then
      echo "❌ COMMENTED TESTS DETECTED (JS/TS)"
      grep -rn "^[[:space:]]*//.*\(describe\|it\|test\)" test/ spec/
      exit 1
    fi
    
    # Python
    if grep -r "^[[:space:]]*#.*def test_" test/ tests/; then
      echo "❌ COMMENTED TESTS DETECTED (Python)"
      grep -rn "^[[:space:]]*#.*def test_" test/ tests/
      exit 1
    fi
    
    # Multi-line comments containing tests
    if grep -Pzo "(?s)/\*.*?(describe|it|test).*?\*/" test/ spec/; then
      echo "❌ COMMENTED TESTS IN MULTI-LINE COMMENTS"
      exit 1
    fi
```

**Prohibition**: No commented-out tests. Delete or fix, don't comment.

---

#### Category 5: Excluded Tests
**Detection**:
```yaml
- name: Detect Excluded Tests
  run: |
    # Check test config for exclusions
    
    # Jest (package.json or jest.config.js)
    if grep -i "testPathIgnorePatterns\|coveragePathIgnorePatterns" jest.config.js package.json; then
      echo "⚠️  TEST EXCLUSIONS IN CONFIG"
      echo "Review test exclusions - are they legitimate?"
      grep -ni "testPathIgnorePatterns\|coveragePathIgnorePatterns" jest.config.js package.json
      # May be legitimate (e.g., node_modules) - review manually
    fi
    
    # Pytest (pytest.ini, setup.cfg)
    if grep -i "testpaths\|ignore" pytest.ini setup.cfg; then
      echo "⚠️  TEST EXCLUSIONS IN CONFIG"
      grep -ni "testpaths\|ignore" pytest.ini setup.cfg
    fi
    
    # Check for tests outside standard directories
    STANDARD_DIRS="test/ tests/ spec/ __tests__/"
    NON_STANDARD=$(find . -name "*test*.js" -o -name "*test*.py" | grep -v "$STANDARD_DIRS" | grep -v node_modules)
    if [ -n "$NON_STANDARD" ]; then
      echo "⚠️  TESTS OUTSIDE STANDARD DIRECTORIES"
      echo "$NON_STANDARD"
      echo "Are these intentionally excluded from CI?"
    fi
```

**Prohibition**: Test exclusions require documented justification. No hidden tests.

---

#### Category 6: Incomplete Fixtures/Mocks
**Detection**:
```yaml
- name: Detect Incomplete Test Infrastructure
  run: |
    # Check for TODO/FIXME in test utilities
    if grep -ri "todo\|fixme\|hack\|temporary" test/fixtures/ test/mocks/ test/utils/; then
      echo "❌ INCOMPLETE TEST INFRASTRUCTURE"
      echo "Test fixtures and mocks must be complete."
      grep -rni "todo\|fixme\|hack\|temporary" test/fixtures/ test/mocks/ test/utils/
      exit 1
    fi
    
    # Check for empty/stub implementations
    if grep -r "throw new Error.*not implemented" test/; then
      echo "❌ STUB IMPLEMENTATIONS IN TEST INFRASTRUCTURE"
      grep -rn "throw new Error.*not implemented" test/
      exit 1
    fi
```

**Prohibition**: Test infrastructure must be production-quality. No stubs or TODOs.

---

#### Category 7: Suppressed Warnings
**Detection**:
```yaml
- name: Detect Suppressed Test Warnings
  run: |
    # Run tests with all warnings enabled
    npm test -- --verbose --no-warnings-ignore 2>&1 | tee test-output.txt
    
    # Check for warnings
    if grep -i "warning\|deprecation" test-output.txt; then
      echo "❌ TEST WARNINGS DETECTED"
      echo "All warnings must be addressed, not suppressed."
      grep -i "warning\|deprecation" test-output.txt
      exit 1
    fi
    
    # Check for warning suppression in code
    if grep -ri "@ts-ignore\|@ts-expect-error\|# type: ignore\|# noqa" test/; then
      echo "⚠️  WARNING SUPPRESSION IN TEST CODE"
      echo "Review suppressions - are they necessary?"
      grep -rni "@ts-ignore\|@ts-expect-error\|# type: ignore\|# noqa" test/
    fi
```

**Prohibition**: Fix warnings, don't suppress them (unless documented exception).

---

#### Category 8: Flaky Tests
**Detection**:
```yaml
- name: Detect Flaky Tests
  run: |
    # Run test suite multiple times to catch intermittent failures
    echo "Running test suite 5 times to detect flakiness..."
    
    for i in {1..5}; do
      echo "Run $i/5"
      npm test -- --verbose > "test-run-$i.txt" 2>&1
      
      if [ $? -ne 0 ]; then
        echo "❌ TEST RUN $i FAILED"
        cat "test-run-$i.txt"
        exit 1
      fi
    done
    
    echo "✓ All 5 test runs passed - no flakiness detected"
```

**Prohibition**: Flaky tests are test debt. Fix or remove, don't tolerate.

---

### 3.2 Test Count Validation

**Canonical Rule**: Test count must match expectations. Decreasing test count requires explanation.

**Detection**:
```yaml
- name: Validate Test Count
  run: |
    # Get current test count
    CURRENT_COUNT=$(npm test -- --listTests | wc -l)
    
    # Get baseline test count (from previous commit or recorded baseline)
    BASELINE_COUNT=$(cat .test-baseline-count 2>/dev/null || echo "0")
    
    echo "Baseline test count: $BASELINE_COUNT"
    echo "Current test count: $CURRENT_COUNT"
    
    # Test count should not decrease
    if [ "$CURRENT_COUNT" -lt "$BASELINE_COUNT" ]; then
      echo "❌ TEST COUNT DECREASED"
      echo "Tests were removed or excluded. Explanation required."
      echo "If legitimate, update .test-baseline-count and document in PR"
      exit 1
    fi
    
    # Test count should increase for new features
    if [ "$CURRENT_COUNT" -eq "$BASELINE_COUNT" ]; then
      echo "⚠️  TEST COUNT UNCHANGED"
      echo "Did you add tests for new functionality?"
    fi
    
    # Update baseline
    echo "$CURRENT_COUNT" > .test-baseline-count
```

---

## 4. Test Dodging Detection

### 4.1 Test Dodging Patterns

**Canonical Rule**: Intentional or accidental test avoidance must be caught and blocked.

#### Pattern 1: Test Exclusion Through Config
**Detection**: See Category 5 above - test config exclusions

#### Pattern 2: Conditional Test Execution
**Detection**:
```yaml
- name: Detect Conditional Test Execution
  run: |
    # Check for environment-based test skipping
    if grep -ri "if.*process\.env\|if.*CI\|if.*SKIP_TEST" test/; then
      echo "⚠️  CONDITIONAL TEST EXECUTION DETECTED"
      echo "Tests should run unconditionally in CI"
      grep -rni "if.*process\.env\|if.*CI\|if.*SKIP_TEST" test/
    fi
```

#### Pattern 3: Test Timeout Manipulation
**Detection**:
```yaml
- name: Detect Test Timeout Manipulation
  run: |
    # Check for excessive timeouts (may hide slow/broken tests)
    if grep -ri "timeout.*[1-9][0-9]{4,}" test/; then
      echo "⚠️  EXCESSIVE TEST TIMEOUTS DETECTED"
      echo "Timeouts >10s may hide broken tests"
      grep -rni "timeout.*[1-9][0-9]{4,}" test/
    fi
```

#### Pattern 4: Test Coverage Manipulation
**Detection**:
```yaml
- name: Detect Coverage Manipulation
  run: |
    # Check for istanbul/nyc ignore comments
    if grep -ri "istanbul ignore\|c8 ignore" src/ lib/; then
      echo "⚠️  COVERAGE EXCLUSIONS DETECTED"
      echo "Code excluded from coverage - is this legitimate?"
      grep -rni "istanbul ignore\|c8 ignore" src/ lib/
    fi
    
    # Ensure coverage meets threshold
    npm test -- --coverage | tee coverage-output.txt
    
    COVERAGE=$(grep -oP '\d+(?=\.\d+%.*All files)' coverage-output.txt | head -1)
    THRESHOLD=80
    
    if [ "$COVERAGE" -lt "$THRESHOLD" ]; then
      echo "❌ COVERAGE BELOW THRESHOLD"
      echo "Required: ${THRESHOLD}%"
      echo "Actual: ${COVERAGE}%"
      exit 1
    fi
```

---

## 5. Technical Debt Detection

### 5.1 Code-Level Technical Debt

#### Detection: TODO/FIXME/HACK Comments
```yaml
- name: Detect Technical Debt Markers
  run: |
    # Scan for debt markers in production code
    if grep -ri "TODO\|FIXME\|HACK\|XXX\|KLUDGE" src/ lib/ --exclude-dir=test; then
      echo "⚠️  TECHNICAL DEBT MARKERS DETECTED"
      echo "Address or document these before merging:"
      grep -rni "TODO\|FIXME\|HACK\|XXX\|KLUDGE" src/ lib/ --exclude-dir=test
      
      # Count debt markers
      DEBT_COUNT=$(grep -ri "TODO\|FIXME\|HACK\|XXX\|KLUDGE" src/ lib/ --exclude-dir=test | wc -l)
      echo "Total debt markers: $DEBT_COUNT"
      
      # Block if excessive
      if [ "$DEBT_COUNT" -gt 5 ]; then
        echo "❌ EXCESSIVE TECHNICAL DEBT"
        echo "Reduce to ≤5 markers or create explicit debt tickets"
        exit 1
      fi
    fi
```

#### Detection: Disabled Linting Rules
```yaml
- name: Detect Disabled Linting Rules
  run: |
    # Check for inline linting disables
    if grep -ri "eslint-disable\|pylint: disable\|rubocop:disable" src/ lib/; then
      echo "⚠️  LINTING RULES DISABLED"
      echo "Address lint issues instead of disabling rules:"
      grep -rni "eslint-disable\|pylint: disable\|rubocop:disable" src/ lib/
    fi
```

---

### 5.2 Dependency Technical Debt

#### Detection: Outdated Dependencies
```yaml
- name: Detect Outdated Dependencies
  run: |
    # Check for outdated dependencies
    npm outdated > outdated.txt 2>&1 || true
    
    if [ -s outdated.txt ]; then
      echo "⚠️  OUTDATED DEPENDENCIES DETECTED"
      cat outdated.txt
      
      # Check for major version updates
      if grep -i "major" outdated.txt; then
        echo "⚠️  MAJOR VERSION UPDATES AVAILABLE"
        echo "Review for breaking changes"
      fi
    fi
```

#### Detection: Vulnerable Dependencies
```yaml
- name: Detect Vulnerable Dependencies
  run: |
    # Security audit
    npm audit --audit-level=moderate 2>&1 | tee audit-output.txt
    
    if grep -i "vulnerabilities" audit-output.txt; then
      echo "❌ SECURITY VULNERABILITIES DETECTED"
      npm audit
      exit 1
    fi
```

---

### 5.3 Deprecation Detection

```yaml
- name: Detect Deprecations
  run: |
    # Run code with deprecation warnings enabled
    npm test -- --verbose --force-deprecation-warnings 2>&1 | tee deprecation-output.txt
    
    if grep -i "deprecation\|deprecated" deprecation-output.txt; then
      echo "❌ DEPRECATION WARNINGS DETECTED"
      echo "Address all deprecations before merging:"
      grep -i "deprecation\|deprecated" deprecation-output.txt
      exit 1
    fi
    
    # Check for use of deprecated APIs in code
    # (This is language/framework-specific - examples below)
    
    # Example: Node.js deprecated APIs
    if grep -r "new Buffer(\|deprecated" src/; then
      echo "❌ DEPRECATED API USAGE"
      grep -rn "new Buffer(\|deprecated" src/
      exit 1
    fi
```

---

## 6. Warning Detection

### 6.1 Compiler/Build Warnings

```yaml
- name: Detect Build Warnings
  run: |
    # Build with warnings as errors
    npm run build -- --warnings-as-errors 2>&1 | tee build-output.txt
    
    if [ $? -ne 0 ]; then
      echo "❌ BUILD WARNINGS DETECTED"
      echo "All warnings must be addressed:"
      cat build-output.txt
      exit 1
    fi
    
    # Verify zero warnings explicitly
    if grep -i "warning" build-output.txt; then
      echo "❌ WARNINGS IN BUILD OUTPUT"
      grep -i "warning" build-output.txt
      exit 1
    fi
```

### 6.2 Runtime Warnings

```yaml
- name: Detect Runtime Warnings
  run: |
    # Run application/tests and capture warnings
    npm start > runtime-output.txt 2>&1 &
    APP_PID=$!
    sleep 10
    kill $APP_PID
    
    if grep -i "warning" runtime-output.txt; then
      echo "❌ RUNTIME WARNINGS DETECTED"
      grep -i "warning" runtime-output.txt
      exit 1
    fi
```

---

## 7. Pre-Handover Duplicate Gate Run

### 7.1 Agent Workspace Gate Validation

**Canonical Rule**: Agents MUST run merge gates in workspace BEFORE submitting PR.

**Location**: `.agent-workspace/<agent-type>/gate-validation/`

**Script**: `run-gates.sh`

```bash
#!/bin/bash
# .agent-workspace/<agent-type>/gate-validation/run-gates.sh

set -e

echo "=== Pre-Handover Merge Gate Validation ==="
echo "Date: $(date)"
echo "Agent: <agent-type>"
echo ""

# Create gate validation directory
mkdir -p .agent-workspace/<agent-type>/gate-validation/

cd .agent-workspace/<agent-type>/gate-validation/

# Copy repo content for isolated validation
echo "Setting up validation environment..."
rsync -a --exclude .agent-workspace --exclude node_modules ../../../ ./repo/
cd repo/

# Install dependencies
echo "Installing dependencies..."
npm ci

# Run all gate checks
FAILED=0

# 1. Linting
echo "=== Running Linting ==="
npm run lint 2>&1 | tee ../lint-output.txt || FAILED=1

# 2. Type Checking (if applicable)
if [ -f tsconfig.json ]; then
  echo "=== Running Type Checking ==="
  npm run type-check 2>&1 | tee ../type-check-output.txt || FAILED=1
fi

# 3. Test Suite (100% pass required)
echo "=== Running Full Test Suite ==="
npm test -- --verbose --coverage 2>&1 | tee ../test-output.txt || FAILED=1

# 4. Test Debt Detection
echo "=== Detecting Test Debt ==="
bash ../../../../governance/scripts/detect-test-debt.sh 2>&1 | tee ../test-debt-check.txt || FAILED=1

# 5. Security Audit
echo "=== Running Security Audit ==="
npm audit --audit-level=moderate 2>&1 | tee ../security-audit.txt || FAILED=1

# 6. Build
echo "=== Running Build ==="
npm run build 2>&1 | tee ../build-output.txt || FAILED=1

# 7. Governance Alignment (if applicable)
if [ -f ../../../../governance/scripts/check-alignment.sh ]; then
  echo "=== Checking Governance Alignment ==="
  bash ../../../../governance/scripts/check-alignment.sh 2>&1 | tee ../alignment-check.txt || FAILED=1
fi

# Generate summary
echo ""
echo "=== Gate Validation Summary ==="
if [ $FAILED -eq 0 ]; then
  echo "✅ ALL GATES PASSED"
  echo "Status: READY_FOR_PR" > ../gate-status.txt
else
  echo "❌ GATE FAILURES DETECTED"
  echo "Status: FAILED" > ../gate-status.txt
  echo ""
  echo "STOP: Fix all failures before submitting PR"
  exit 1
fi

# Log results
echo "Gate validation completed: $(date)" >> ../gate-run-log.md
echo "Status: PASS" >> ../gate-run-log.md
echo "" >> ../gate-run-log.md

cd ../../../..
echo ""
echo "Gate validation logs: .agent-workspace/<agent-type>/gate-validation/"
```

**Usage**:
```bash
# Before creating/pushing PR
bash .agent-workspace/<agent-type>/gate-validation/run-gates.sh

# Only proceed if all gates pass
git add .
git commit -m "..."
git push
```

---

### 7.2 Gate Validation Evidence

**Required Files** (created by duplicate gate run):
```
.agent-workspace/<agent-type>/gate-validation/
├── repo/                      # Isolated copy of repo for validation
├── gate-run-log.md            # Log of all gate runs
├── gate-status.txt            # Current status (READY_FOR_PR or FAILED)
├── lint-output.txt            # Linting results
├── type-check-output.txt      # Type checking results (if applicable)
├── test-output.txt            # Full test suite results
├── test-debt-check.txt        # Test debt detection results
├── security-audit.txt         # Security audit results
├── build-output.txt           # Build results
└── alignment-check.txt        # Governance alignment results (if applicable)
```

**Integration with PREHANDOVER_PROOF.md**:
```markdown
## 1. Duplicate Merge Gate Run
- [x] Gates run in workspace: `.agent-workspace/<agent-type>/gate-validation/`
- [x] All gates PASS
- [x] Log file: `.agent-workspace/<agent-type>/gate-validation/gate-run-log.md`
- [x] Evidence files: All output files present and show PASS
```

---

## 8. Evidence-First Failure Messaging

### 8.1 Failure Message Standard

**Canonical Rule**: All gate failures MUST provide clear evidence and remediation guidance.

**Template**:
```
❌ GATE FAILURE: <Gate Name>

**Problem**:
<Clear description of what failed>

**Evidence**:
<Specific files, lines, errors that demonstrate failure>

**Impact**:
<Why this matters / what could go wrong>

**Remediation**:
<Specific steps to fix>
1. Step 1
2. Step 2
3. Step 3

**Verification**:
<How to verify fix worked>

**Reference**:
<Link to relevant governance doc, standard, or guidance>

---
Authority: AGENT_MERGE_GATE_HANDOVER_ENHANCEMENT.md
```

**Example**:
```
❌ GATE FAILURE: Test Debt Detection

**Problem**:
Skipped tests detected in test suite.

**Evidence**:
File: test/auth.test.js:45
  describe.skip('Authentication edge cases', () => {
    // 3 tests skipped

File: test/user.test.js:120
  it.skip('should handle concurrent updates', () => {
    // Test skipped

Total skipped: 4 tests

**Impact**:
Skipped tests = untested code paths. Bugs can hide in skipped tests.
Zero test debt policy violated.

**Remediation**:
1. Remove .skip from describe/it statements
2. Fix broken tests to make them pass
3. Run full suite: npm test
4. Verify 100% pass rate (0 skipped)

**Verification**:
npm test -- --verbose
# Should show X/X passing, 0 skipped

**Reference**:
- BUILD_PHILOSOPHY.md: Zero Test Debt
- AGENT_MERGE_GATE_HANDOVER_ENHANCEMENT.md: Test Debt Detection

---
Authority: AGENT_MERGE_GATE_HANDOVER_ENHANCEMENT.md
```

---

## 9. Integration with Merge Gate Interface

### 9.1 Enhanced Merge Gate Workflow

**File**: `.github/workflows/merge-gate-interface.yml`

```yaml
name: Merge Gate Interface

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  # Existing gates
  verdict:
    name: "merge-gate/verdict"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run verdict checks
        run: bash .github/scripts/merge-gate-verdict.sh

  alignment:
    name: "governance/alignment"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run alignment checks
        run: bash .github/scripts/merge-gate-alignment.sh

  stop-and-fix:
    name: "stop-and-fix/enforcement"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run stop-and-fix checks
        run: bash .github/scripts/merge-gate-stop-and-fix.sh

  # NEW: Enhanced quality gates
  test-debt-detection:
    name: "quality/test-debt-detection"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Detect test debt
        run: bash .github/scripts/detect-test-debt.sh

  test-dodging-detection:
    name: "quality/test-dodging-detection"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - name: Install dependencies
        run: npm ci
      - name: Detect test dodging
        run: bash .github/scripts/detect-test-dodging.sh

  technical-debt-detection:
    name: "quality/technical-debt-detection"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Detect technical debt
        run: bash .github/scripts/detect-technical-debt.sh

  warning-detection:
    name: "quality/warning-detection"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - name: Install dependencies
        run: npm ci
      - name: Detect warnings
        run: bash .github/scripts/detect-warnings.sh

  pre-handover-proof-validation:
    name: "quality/pre-handover-proof"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Validate pre-handover proof
        run: bash .github/scripts/validate-prehandover-proof.sh
```

### 9.2 Branch Protection Update

**Required**: Update branch protection to require new quality gates:

```
Required status checks:
- merge-gate/verdict
- governance/alignment
- stop-and-fix/enforcement
- quality/test-debt-detection          [NEW]
- quality/test-dodging-detection       [NEW]
- quality/technical-debt-detection     [NEW]
- quality/warning-detection            [NEW]
- quality/pre-handover-proof           [NEW]
```

---

## 10. Detection Scripts

### 10.1 Test Debt Detection Script

**File**: `.github/scripts/detect-test-debt.sh`

```bash
#!/bin/bash
# Comprehensive test debt detection

set -e

echo "=== Test Debt Detection ==="

DEBT_FOUND=0

# Category 1: Failing tests
echo "Checking for failing tests..."
npm test -- --verbose 2>&1 | tee test-output.txt
if grep -i "fail\|error" test-output.txt; then
  echo "❌ FAILING TESTS DETECTED"
  DEBT_FOUND=1
fi

# Category 2: Skipped tests
echo "Checking for skipped tests..."
if grep -i "skip\|ignored\|pending" test-output.txt; then
  echo "❌ SKIPPED TESTS DETECTED"
  DEBT_FOUND=1
fi

# Category 3: TODO/WIP tests
echo "Checking for TODO/WIP tests..."
if grep -ri "todo\|wip\|fixme" test/ spec/; then
  echo "❌ TODO/WIP TESTS DETECTED"
  DEBT_FOUND=1
fi

# Category 4: Commented tests
echo "Checking for commented tests..."
if grep -r "^[[:space:]]*//.*\(describe\|it\|test\)" test/ spec/; then
  echo "❌ COMMENTED TESTS DETECTED"
  DEBT_FOUND=1
fi

# Category 5: Incomplete fixtures
echo "Checking for incomplete test infrastructure..."
if grep -ri "todo\|fixme" test/fixtures/ test/mocks/ test/utils/; then
  echo "❌ INCOMPLETE TEST INFRASTRUCTURE"
  DEBT_FOUND=1
fi

# Summary
if [ $DEBT_FOUND -eq 0 ]; then
  echo "✅ NO TEST DEBT DETECTED"
else
  echo "❌ TEST DEBT DETECTED - MUST BE FIXED"
  exit 1
fi
```

---

## 11. References

### Related Canonical Documents
- `AGENT_HANDOVER_AND_QUALITY_PROTOCOL.md` - Pre-handover requirements
- `BUILD_PHILOSOPHY.md` - Zero test debt, one-time build
- `MERGE_GATE_INTERFACE_STANDARD.md` - Merge gate structure
- `STOP_AND_FIX_DOCTRINE.md` - Immediate remediation
- `WE_ONLY_FAIL_ONCE_DOCTRINE.md` - Learning and prevention

### Scripts and Tools
- Test debt detection: `.github/scripts/detect-test-debt.sh`
- Test dodging detection: `.github/scripts/detect-test-dodging.sh`
- Technical debt detection: `.github/scripts/detect-technical-debt.sh`
- Warning detection: `.github/scripts/detect-warnings.sh`
- Pre-handover proof validation: `.github/scripts/validate-prehandover-proof.sh`

---

**End of Document**

---

**Authority**: LIVING_AGENT_SYSTEM.md v6.2.0 | AGENT_MERGE_GATE_HANDOVER_ENHANCEMENT.md v1.0.0 | Approved by CS2 (Johan Ras) | Effective Date: 2026-02-16
