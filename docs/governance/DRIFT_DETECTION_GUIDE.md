# Self-Governance Drift Detector Guide

## Overview

The Self-Governance Drift Detector is Foreman's identity-level enforcement mechanism that actively monitors Foreman's own behavior to prevent governance drift. It ensures that Foreman cannot deviate from the Governance-First principles, even unintentionally.

## Philosophy

**Core Principle**: Foreman must self-police before certifying builds.

The drift detector operates as an independent subsystem that:
- Monitors every Foreman decision for governance violations
- Blocks actions that contradict True North Philosophy
- Generates governance incidents for all drift events
- Tracks corrective actions and self-realignment needs
- Prevents execution when critical drift is detected

## Drift Detection Categories

The drift detector monitors 23 distinct behavioral categories organized into 4 major groups:

### A. Governance Drift
Violations of core governance principles:
- `skipped_check` - Skipping validation steps
- `softened_rule` - Weakening governance rules
- `relaxed_governance_thresholds` - Lowering quality thresholds
- `ignored_governance_memory` - Not consulting governance memory
- `whitelisted_failure` - Adding exceptions for failures

### B. Reasoning Drift
Decisions that contradict governance laws:
- `acted_as_developer` - Acting as developer instead of auditor/governor
- `attempted_forbidden_action` - Attempting actions forbidden by governance
- `used_alternative_logic_not_aligned` - Using logic that contradicts True North

### C. QA Drift
Quality assurance violations:
- `bypassed_qa` - Attempting to bypass QA checks
- `accepted_partial_qa` - Accepting less than 100% QA pass
- `normalized_error` - Treating errors as warnings/acceptable
- `ignored_anomalies` - Ignoring QA anomalies
- `filtered_logs_to_avoid_failure` - Hiding failures through log filtering
- `accepted_qiel_false_positives` - Accepting false positives in QIEL
- `modified_qiel_patterns` - Modifying QIEL patterns to be less strict
- `loosened_qiel_parsing` - Making QIEL parsing less strict
- `created_pr_with_incomplete_qa` - Creating PRs when QA is not 100% passed

### D. Execution Drift
Implementation violations:
- `reduced_strictness` - Reducing strictness settings
- `modified_tsconfig_strictness` - Weakening TypeScript strictness
- `renamed_files_to_hide_failures` - Renaming files to exclude from checks
- `removed_tests_or_samples` - Deleting tests or samples to reduce failures
- `suppressed_errors` - Using error suppression (e.g., @ts-ignore)

## Integration Points

The drift detector is integrated at all critical decision points in Foreman's execution pipeline:

### 1. Reasoning Engine (`lib/foreman/reasoning/engine.ts`)
**Hook Location**: `executeReasoning()`
**Detection**: Validates governance memory compliance before reasoning execution
**Blocks When**: Governance memory not loaded or rules not applied

### 2. PR Gatekeeper (`lib/foreman/pr-gatekeeper.ts`)
**Hook Locations**: 
- Before QIEL validation (pre-check)
- After QIEL validation (final check before PR creation)

**Detection**: 
- Attempts to create PR with incomplete QA
- QA not at 100% pass rate

**Blocks When**: 
- QIEL has not passed
- Warnings, errors, or failures present
- Any QA check failed

### 3. Overnight Execution (`lib/foreman/overnight-execution.ts`)
**Hook Location**: After QA validation, before proceeding with execution
**Detection**: Attempting to proceed when QA is not 100% passed
**Blocks When**: Any QA failures or incomplete validation

### 4. Builder Assignment (`lib/foreman/dispatch.ts`)
**Status**: Import added, hooks pending implementation
**Planned Detection**: 
- Builder selection bypassing governance rules
- Assignment without memory context

### 5. QA Enforcement (Pending)
**Planned Location**: `lib/foreman/qa/qiel-runner.ts`
**Planned Detection**:
- QIEL configuration modifications
- Pattern softening
- Threshold relaxation

### 6. Pattern Evolution (Pending)
**Planned Location**: `lib/foreman/reasoning/evolution-engine.ts`
**Planned Detection**:
- Pattern evolution contradicting governance
- Immutable pattern modifications

## Usage

### Basic Usage

```typescript
import { detectGovernanceDrift } from '@/lib/foreman/governance/drift-detector'

// Detect drift in a specific action
const driftResults = await detectGovernanceDrift({
  action: 'create_pull_request',
  prWithIncompleteQA: {
    qielPassed: false,
    hasWarnings: true,
    hasErrors: false,
    hasFailures: false,
    prAttempted: true
  }
})

if (driftResults.length > 0) {
  // Drift detected - handle accordingly
  console.error('Governance drift detected:')
  driftResults.forEach(drift => {
    console.error(`- ${drift.driftType}: ${drift.description}`)
    console.error(`  Severity: ${drift.severity}`)
    console.error(`  Actions: ${drift.actionTaken.join(', ')}`)
  })
  
  // Block execution
  throw new Error('Cannot proceed - governance drift detected')
}
```

### Individual Detection Methods

Each drift type has a dedicated detection method:

```typescript
import { foremanDriftDetector } from '@/lib/foreman/governance/drift-detector'

// Check if a check was skipped
const skipResult = foremanDriftDetector.detectSkippedCheck({
  checkName: 'TypeScript Compilation',
  skipped: true,
  reason: 'To save time'
})

// Check if QIEL patterns were modified
const qielResult = foremanDriftDetector.detectModifiedQIELPatterns({
  patternType: 'error_pattern',
  originalPattern: { strict: true },
  modifiedPattern: { strict: false },
  reason: 'Too many false positives'
})

// Check if anomalies were ignored
const anomalyResult = foremanDriftDetector.detectIgnoredAnomalies({
  anomalyType: 'QIW_ANOMALY',
  anomalyCount: 5,
  ignored: true,
  reason: 'Low severity'
})
```

### Drift Logging

All detected drift events are automatically logged:

```typescript
import { foremanDriftDetector } from '@/lib/foreman/governance/drift-detector'

// Get drift detection log
const driftLog = foremanDriftDetector.getDriftLog()

driftLog.forEach(entry => {
  console.log(`${entry.timestamp}: ${entry.driftType}`)
  console.log(`  Description: ${entry.description}`)
  console.log(`  Resolved: ${entry.resolved}`)
})

// Mark drift as resolved
const entry = driftLog.find(e => e.driftType === 'skipped_check')
if (entry) {
  foremanDriftDetector.markDriftResolved('skipped_check', entry.timestamp)
}
```

## Governance Memory Integration

All drift events are automatically recorded to the governance memory fabric:

**Memory Entry Structure**:
```json
{
  "scope": "global",
  "key": "foreman_drift_{type}_{timestamp}",
  "value": {
    "type": "foreman_behavioral_drift",
    "description": "Detailed drift description",
    "data": {
      "driftType": "skipped_check",
      "severity": "critical",
      "actionTaken": [
        "Create governance incident",
        "Block PR creation",
        "Log to Governance Memory"
      ],
      "timestamp": "2025-12-08T12:00:00.000Z",
      "resolved": false,
      "source": "ForemanGovernanceDriftDetector",
      "detectionTime": "2025-12-08T12:00:00.000Z",
      "requiresCorrection": true
    }
  },
  "tags": [
    "foreman_drift",
    "skipped_check",
    "governance_violation",
    "critical"
  ]
}
```

## Corrective Actions

When drift is detected, the system automatically takes the following actions:

### Severity: Critical
- **Block PR creation** - Prevents PR from being created
- **Block execution** - Stops further processing
- **Create governance incident** - Records to governance memory
- **Log to console** - Immediate visibility
- **Generate incident ID** - Unique tracking identifier

### Severity: High
- **Create governance incident** - Records to governance memory
- **Require investigation** - Flags for manual review
- **Log to console** - Immediate visibility

### Severity: Medium
- **Create governance incident** - Records to governance memory
- **Log to console** - Warning visibility

### Severity: Low
- **Log to console** - Informational tracking

## Self-Correction Workflow

When drift is detected, Foreman must:

1. **Stop Current Action** - Immediately halt the drifted behavior
2. **Record Incident** - Log to governance memory with full context
3. **Identify Root Cause** - Analyze why drift occurred
4. **Regenerate Reasoning** - Update reasoning patterns if needed
5. **Re-validate** - Re-run checks with correct governance alignment
6. **Resume** - Only proceed after drift is resolved

## Best Practices

### For Foreman Integration
1. **Always check drift before critical actions** (PR creation, QA bypass, execution)
2. **Never catch and suppress drift errors** - they indicate governance violations
3. **Log all drift detections** - even if not blocking, for audit trail
4. **Update reasoning patterns** when drift is detected repeatedly

### For Developers
1. **Add drift detection hooks** to any new decision points
2. **Test drift detection** for new governance rules
3. **Document drift categories** when adding new detection types
4. **Review drift logs** regularly to identify systemic issues

## Testing

Comprehensive test suite available at `tests/gsr/drift-detector.test.ts`:
- 138 tests covering all 23 drift types
- Integration tests for multiple drift detection
- Drift logging and resolution tests

Run tests:
```bash
npm test -- tests/gsr/drift-detector.test.ts
```

## Severity Classification

| Severity | Meaning | Action Required |
|----------|---------|----------------|
| **Critical** | Violates core governance principles, blocks execution | Immediate correction, cannot proceed |
| **High** | Significant governance concern | Investigation required, should not proceed |
| **Medium** | Governance deviation | Review and address |
| **Low** | Informational, potential concern | Log for awareness |

## Governance Principles Enforced

The drift detector enforces these core principles:

1. **Zero Tolerance** - Any error, warning, or anomaly triggers STOP
2. **100% QA** - Partial passes are never acceptable
3. **No Whitelisting** - Cannot add exceptions for failures
4. **No Softening** - Cannot reduce rule strictness
5. **Memory First** - Governance memory must always be consulted
6. **Auditor Not Developer** - Foreman delegates code work, doesn't write it
7. **No Bypasses** - QA checks cannot be skipped
8. **Transparent Logging** - All issues visible, no filtering

## Future Enhancements

Planned additions to drift detection:

1. **Builder Assignment Hooks** - Detect when builders selected without governance context
2. **QA Enforcement Hooks** - Monitor QIEL configuration changes in real-time
3. **Pattern Evolution Hooks** - Prevent governance-aligned patterns from being modified
4. **Autonomous Decision Hooks** - Monitor autonomous mode decisions for drift
5. **Memory Consolidation Hooks** - Ensure consolidation doesn't lose governance rules
6. **Cross-Agent Drift** - Detect when GitHub Foreman ≠ Foreman App ≠ Local Builder

## Related Documentation

- Governance-First Mindset (`lib/foreman/governance/mindset.ts`)
- PR Gatekeeper (`lib/foreman/pr-gatekeeper.ts`)
- Memory-Aware Reasoning Engine (`lib/foreman/reasoning/engine.ts`)
- QIEL Runner (`lib/foreman/qa/qiel-runner.ts`)

## Support

For issues or questions about drift detection:
1. Review drift logs in governance memory
2. Check test suite for expected behavior
3. Consult governance incident records
4. Review implementation in `lib/foreman/governance/drift-detector.ts`
