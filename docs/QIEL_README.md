# QIEL - Quality Integrity Enforcement Layer

## Overview

The **Quality Integrity Enforcement Layer (QIEL)** is a comprehensive quality assurance system that implements the **Quality Integrity Contract (QIC)** for the Maturion Foreman platform. QIEL ensures that no build, lint, runtime, or silent failure can ever pass QA again.

QIEL automatically learns from failures and prevents recurrence, fully aligned with One Build and True North principles.

## Architecture

QIEL consists of 8 subsystems that work together to enforce quality integrity:

### QIEL-1: Build Log Parser
- Reads `/tmp/build.log`
- Scans for failure signals: `ERR`, `ERROR`, `TypeError`, `ReferenceError`, `Failed to compile`, etc.
- Converts any detection into **QA FAIL**

### QIEL-2: Lint Log Parser
- Reads `/tmp/lint.log`
- Treats any warning or error as **QA FAIL**
- Allows explicit per-rule overrides via `foreman/qa/allowed-warnings.json`

### QIEL-3: Test Log Validator
- Parses `/tmp/test.log`
- Fails if any tests error, warn, or are skipped unintentionally
- Detects runtime failures inside tests

### QIEL-4: Deployment Simulation QA
- Runs `next build` and `next start` in both:
  - Preview mode
  - Production mode
- Any failure → **QA FAIL**

### QIEL-5: Schema Cohesion Validator
- Validates schema consistency across all cognitive engines:
  - Memory Fabric schema
  - Retirement Engine schema
  - Consolidation Engine schema
  - Drift Monitor schema
  - Analytics Engine schema
- Structural mismatch → **QA FAIL** → QI Incident created

### QIEL-6: Cognitive Engine Load Validator
- Ensures all Foreman engines:
  - Load without throwing
  - Initialize successfully under CI
  - Pass runtime self-tests
- Failures → **QA FAIL**

### QIEL-7: Governance Memory QI Incident Writer
- Records **Quality Integrity (QI) Incidents** for every QA failure
- Includes:
  - Error class
  - Affected subsystem
  - Source logs
  - Required architecture update
  - Required QA update
- Foreman uses this for self-evolution

### QIEL-8: Auto-Generated Regression Tests
- Generates regression tests automatically from QI Incidents
- Every new error class gets a test
- Prevents error recurrence
- Tests stored in `tests/qic/regression/`

## Usage

### Command Line

```bash
# Quick QIEL check (logs + schemas only)
npm run qiel:quick

# Full QIEL check (all validations)
npm run qiel:full

# Custom options
npx tsx scripts/run-qiel.ts --logs-dir ./build-logs --report qiel-report.md
```

### Programmatic API

```typescript
import { runQIEL, runQuickQIEL, runFullQIEL } from '@/lib/foreman/qa';

// Quick QIEL
const result = await runQuickQIEL('/tmp');

// Full QIEL
const result = await runFullQIEL(process.cwd(), '/tmp');

// Custom QIEL
const result = await runQIEL({
  projectDir: process.cwd(),
  logsDir: '/tmp',
  skipDeploymentSimulation: false,
  skipEngineValidation: false,
  buildId: 'build-123',
  commitSha: 'abc123',
  branch: 'main',
});

// Check result
if (!result.passed) {
  console.error('QIEL failed:', result.blockersFound);
  console.error('QI Incidents:', result.qiIncidents.length);
}

// Save report
import { saveQIELReport } from '@/lib/foreman/qa';
saveQIELReport(result, './qiel-report.md');
```

### CI/CD Integration

QIEL includes a GitHub Actions workflow template:

```bash
# Copy template to enable QIEL in CI
cp .github/workflows/qiel-template.yml .github/workflows/qiel.yml
```

The workflow:
- Runs on every push and pull request
- Generates comprehensive QIEL reports
- Comments PR with results
- Creates QI Incident issues on failure
- Auto-commits regression tests

## Exit Criteria

A build can only pass if **ALL** the following are true:

- ✅ Build logs contain zero errors or warnings
- ✅ Lint logs contain zero errors or warnings
- ✅ Tests contain zero errors or warnings
- ✅ Preview & production deploys both succeed
- ✅ All engines initialize cleanly
- ✅ All schemas match
- ✅ Zero silent failures detected
- ✅ QI system logs zero incidents
- ✅ Governance Memory records zero unresolved QI incidents

## Quality Integrity Contract (QIC)

QIEL enforces the Quality Integrity Contract defined in `/foreman/qa/quality-integrity-contract.md`:

1. **QIC-1**: Build Integrity Requirements
2. **QIC-2**: Lint Integrity Requirements
3. **QIC-3**: Runtime Integrity Requirements
4. **QIC-4**: Deployment Simulation Requirements
5. **QIC-5**: Silent Failure Prevention
6. **QIC-6**: Governance Memory Integration
7. **QIC-7**: Auto-Propagation Across All Apps

## Allowed Warnings

Warnings can be whitelisted in `foreman/qa/allowed-warnings.json`:

```json
{
  "build": [
    "Schema not found: /path/to/schema.json"
  ],
  "lint": [],
  "test": []
}
```

**Important**: Warnings should only be whitelisted with:
- Warning type/code
- Justification for acceptance
- Remediation timeline
- Architectural approval reference

## QI Incidents

Quality Integrity Incidents are recorded in Governance Memory at:
- Scope: `foreman`
- Key: `qi-incident-{id}`
- Tags: `['quality-integrity', 'incident', {type}, {severity}]`

### QI Incident Types
- `build_error`: Build errors (QIC-1)
- `lint_error`: Linting errors (QIC-2)
- `runtime_error`: Runtime failures (QIC-3)
- `deployment_failure`: Deployment failures (QIC-4)
- `silent_failure`: Silent failures (QIC-5)
- `schema_mismatch`: Schema inconsistencies (QIC-5)
- `test_failure`: Test execution failures
- `security_violation`: Security-related failures

### Severity Levels
- `critical`: System-breaking, blocks deployment
- `high`: Significant impact, requires immediate attention
- `medium`: Moderate impact, should be addressed soon
- `low`: Minor impact, can be addressed in next cycle

## Regression Tests

Auto-generated regression tests are stored in `tests/qic/regression/`:
- Named: `qi-{incident-type}-{timestamp}-{hash}.test.ts`
- Automatically run with `npm run test:qic`
- Prevent error recurrence
- Part of continuous QA evolution

## Reports

QIEL generates comprehensive markdown reports including:
- Overall status and summary
- QIC exit criteria checklist
- Blockers found
- QI Incidents recorded
- Regression tests generated
- Detailed results for each subsystem

## Testing

```bash
# Run QIEL tests
npm run test:qic

# Run all QA tests
npm run test:qa

# Run all tests
npm run test:all
```

## Architecture Integration

QIEL integrates with:
- **Memory Fabric**: Records QI Incidents in Governance Memory
- **Drift Monitor**: Detects architectural drift
- **Reasoning Engine**: Analyzes incident patterns
- **Retirement Engine**: Archives resolved incidents
- **Consolidation Engine**: Consolidates similar incidents

## Self-Evolution

QIEL enables Foreman to evolve through:
1. **QI Incident Analysis**: Identifies patterns in quality failures
2. **Architecture Updates**: Recommends architectural improvements
3. **QA Improvements**: Enhances detection rules
4. **Regression Tests**: Prevents recurrence
5. **Governance Memory**: Tracks quality evolution over time

## Best Practices

1. **Run QIEL before every deployment**
2. **Address all blockers immediately**
3. **Review QI Incidents weekly**
4. **Update architecture based on incident patterns**
5. **Keep allowed-warnings minimal**
6. **Never bypass QIEL**
7. **Use regression tests to prevent recurrence**
8. **Integrate QIEL into CI/CD**

## Troubleshooting

### QIEL fails with missing logs
```bash
# Ensure logs are created before running QIEL
npm run typecheck 2>&1 | tee /tmp/build.log
npm run lint 2>&1 | tee /tmp/lint.log
npm run test:all 2>&1 | tee /tmp/test.log
npm run qiel:quick
```

### Schema cohesion validation fails
- Check that all required types are exported in schema files
- Ensure TypeScript files are properly formatted
- Verify import/export statements are correct

### Engine load validation fails
- Check that all engines export required functions
- Verify module paths are correct
- Ensure dependencies are installed

### Deployment simulation fails
- Verify `next build` completes successfully
- Check for missing environment variables
- Ensure all dependencies are installed

## Support

For issues or questions:
1. Check QI Incidents in Governance Memory
2. Review QIEL reports for detailed error information
3. Consult Quality Integrity Contract documentation
4. Create a GitHub issue with QIEL report attached

---

**QIEL transforms quality enforcement from reactive to proactive, ensuring systemic quality integrity across the entire Maturion ecosystem.**
