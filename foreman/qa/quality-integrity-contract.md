# Quality Integrity Contract (QIC)

## Architecture Update: Governance Evolution & Architecture Reinforcement

### Objective

The Quality Integrity Contract (QIC) is a governance layer that defines non-negotiable quality standards across all Maturion applications and systems. This contract ensures that QA systems cannot report "all checks passed" when actual build/lint/runtime failures exist.

QIC establishes:
- What constitutes a "healthy build"
- What failures are non-negotiable
- How QA must interpret logs
- How failures propagate into Governance Memory

**This contract applies to all current and future apps.**

---

## QIC-1 — Build Integrity Requirements

### Architecture Rule

**A build cannot pass QA if ANY build errors exist.**

### Requirements

1. **Exit codes alone are not sufficient** - Build logs must be parsed for error patterns
2. **Error detection must be comprehensive** - The following patterns in build output → QA FAIL:
   - `ERR`
   - `ERROR`
   - `TypeError`
   - `ReferenceError`
   - `Failed to compile`
   - `Build failed`

3. **Build log parsing is mandatory** - QA systems must:
   - Read and analyze complete build output
   - Detect error patterns regardless of exit code
   - Report all detected errors with context
   - Block PR creation if any errors are found

### Implementation Requirements

```typescript
// QA Builder must parse build logs for error patterns
const BUILD_ERROR_PATTERNS = [
  /\bERR\b/i,              // ERR as a complete word (not part of another word)
  /\bERROR\b/i,            // ERROR as a complete word
  /TypeError/,             // TypeError
  /ReferenceError/,        // ReferenceError
  /Failed to compile/i,    // Failed to compile
  /Build failed/i,         // Build failed
]

function parseBuildLogs(logOutput: string): QualityCheckResult {
  for (const pattern of BUILD_ERROR_PATTERNS) {
    if (pattern.test(logOutput)) {
      return {
        check: 'build_integrity',
        status: 'failed',
        message: 'Build errors detected in output',
        errors: extractErrorContext(logOutput, pattern)
      }
    }
  }
  return { check: 'build_integrity', status: 'passed' }
}
```

---

## QIC-2 — Lint Integrity Requirements

### Architecture Rule

**Lint must run in strict mode and produce zero errors.**

### Requirements

1. **Strict mode enforcement** - All linters must run with strict configuration
2. **Zero errors** - Any linting error → QA FAIL
3. **Zero warnings** - Warnings are allowed only if explicitly whitelisted in architecture
4. **Warning whitelist** - Acceptable warnings must be documented with:
   - Warning type/code
   - Justification for acceptance
   - Remediation timeline
   - Architectural approval reference

### Implementation Requirements

```typescript
interface LintCheckResult {
  check: 'lint_integrity'
  status: 'passed' | 'failed' | 'warning'
  errors: number
  warnings: number
  whitelistedWarnings: string[]
  details: LintIssue[]
}

function validateLintResults(lintOutput: LintOutput): LintCheckResult {
  const errors = lintOutput.errorCount
  const warnings = lintOutput.warningCount
  const whitelisted = getWhitelistedWarnings()
  
  if (errors > 0) {
    return { check: 'lint_integrity', status: 'failed', errors, warnings, details: lintOutput.messages }
  }
  
  const unwhitelistedWarnings = lintOutput.messages.filter(
    msg => msg.severity === 'warning' && !whitelisted.includes(msg.ruleId)
  )
  
  if (unwhitelistedWarnings.length > 0) {
    return { check: 'lint_integrity', status: 'failed', warnings: unwhitelistedWarnings.length }
  }
  
  return { check: 'lint_integrity', status: 'passed', errors: 0, warnings: 0 }
}
```

---

## QIC-3 — Runtime Integrity Requirements

### Architecture Rule

**Runtime QA must detect execution failures and block deployment.**

### Required Runtime Checks

QA must detect and report failures in:

1. **Route failures** - HTTP 404, 500, or other error responses
2. **API execution errors** - API endpoint exceptions or crashes
3. **Next.js page errors** - Page rendering failures
4. **Cognitive engine initialization errors** - AI/ML subsystem failures
5. **Memory system load failures** - Memory fabric initialization issues
6. **Governance hook failures** - Governance rule loading/execution failures

**Any runtime error → QA FAIL**

### Implementation Requirements

```typescript
interface RuntimeCheckResult {
  check: 'runtime_integrity'
  status: 'passed' | 'failed'
  failures: RuntimeFailure[]
}

interface RuntimeFailure {
  type: 'route' | 'api' | 'page' | 'engine' | 'memory' | 'governance'
  component: string
  error: string
  timestamp: string
  stackTrace?: string
}

async function validateRuntimeIntegrity(): Promise<RuntimeCheckResult> {
  const failures: RuntimeFailure[] = []
  
  // Check critical routes
  await checkRoutes(failures)
  
  // Check API endpoints
  await checkAPIEndpoints(failures)
  
  // Check Next.js pages
  await checkPageRendering(failures)
  
  // Check cognitive engine initialization
  await checkEngineInitialization(failures)
  
  // Check memory system
  await checkMemorySystem(failures)
  
  // Check governance hooks
  await checkGovernanceHooks(failures)
  
  if (failures.length > 0) {
    return { check: 'runtime_integrity', status: 'failed', failures }
  }
  
  return { check: 'runtime_integrity', status: 'passed', failures: [] }
}
```

---

## QIC-4 — Deployment Simulation Requirements

### Architecture Rule

**QA must simulate both Preview and Production builds successfully with zero warnings.**

### Requirements

1. **Preview build simulation** - Must complete successfully
2. **Production build simulation** - Must complete successfully
3. **Zero warnings** - Both builds must complete without warnings
4. **Environment parity** - Preview and production environments must be validated for consistency

### Implementation Requirements

```typescript
interface DeploymentSimulationResult {
  check: 'deployment_simulation'
  status: 'passed' | 'failed'
  preview: BuildResult
  production: BuildResult
}

async function simulateDeployments(): Promise<DeploymentSimulationResult> {
  // Simulate preview build
  const previewResult = await runBuild({ environment: 'preview' })
  
  // Simulate production build
  const productionResult = await runBuild({ environment: 'production' })
  
  const previewPassed = previewResult.exitCode === 0 && previewResult.warnings === 0
  const productionPassed = productionResult.exitCode === 0 && productionResult.warnings === 0
  
  if (!previewPassed || !productionPassed) {
    return {
      check: 'deployment_simulation',
      status: 'failed',
      preview: previewResult,
      production: productionResult
    }
  }
  
  return {
    check: 'deployment_simulation',
    status: 'passed',
    preview: previewResult,
    production: productionResult
  }
}
```

---

## QIC-5 — Silent Failure Prevention

### Architecture Rule

**"Silent failures" are defined issues that must cause QA FAIL even without explicit errors.**

### Defined Silent Failures

1. **Missing exports** - Declared but not exported symbols
2. **Deprecated APIs** - Use of deprecated dependencies or APIs
3. **Unused variables** - Declared but never used variables
4. **Schema mismatch** - Type definitions inconsistent with runtime data
5. **Engine interface drift** - Cognitive engine interfaces changed without migration
6. **Memory shape inconsistency** - Memory structure doesn't match schema
7. **Unreachable code** - Code paths that can never execute
8. **Incorrect TS narrowing** - Type narrowing that produces invalid states

### Detection Requirements

```typescript
interface SilentFailureCheck {
  check: 'silent_failure_prevention'
  status: 'passed' | 'failed'
  failures: SilentFailure[]
}

interface SilentFailure {
  type: 'missing_export' | 'deprecated_api' | 'unused_variable' | 
        'schema_mismatch' | 'engine_drift' | 'memory_inconsistency' |
        'unreachable_code' | 'incorrect_narrowing'
  location: string
  description: string
  severity: 'critical' | 'high' | 'medium'
}

async function detectSilentFailures(codebase: Codebase): Promise<SilentFailureCheck> {
  const failures: SilentFailure[] = []
  
  // Check for missing exports
  failures.push(...await checkMissingExports(codebase))
  
  // Check for deprecated API usage
  failures.push(...await checkDeprecatedAPIs(codebase))
  
  // Check for unused variables (via linter)
  failures.push(...await checkUnusedVariables(codebase))
  
  // Check schema consistency
  failures.push(...await checkSchemaConsistency(codebase))
  
  // Check engine interface drift
  failures.push(...await checkEngineDrift(codebase))
  
  // Check memory shape consistency
  failures.push(...await checkMemoryConsistency(codebase))
  
  // Check for unreachable code
  failures.push(...await checkUnreachableCode(codebase))
  
  // Check TypeScript narrowing correctness
  failures.push(...await checkTypeNarrowing(codebase))
  
  if (failures.length > 0) {
    return { check: 'silent_failure_prevention', status: 'failed', failures }
  }
  
  return { check: 'silent_failure_prevention', status: 'passed', failures: [] }
}
```

---

## QIC-6 — Governance Memory Integration

### Architecture Rule

**All quality failures must be recorded as Quality Integrity Incidents (QI Incidents) in Governance Memory.**

### QI Incident Structure

```typescript
interface QualityIntegrityIncident {
  id: string                    // Unique incident ID
  timestamp: string             // ISO 8601 timestamp
  incidentType: QIIncidentType  // Type of quality failure
  severity: 'critical' | 'high' | 'medium' | 'low'
  source: string                // Source of failure (module/file)
  description: string           // Human-readable description
  details: any                  // Detailed failure information
  resolution?: string           // How it was resolved (if resolved)
  resolvedAt?: string          // When it was resolved
  metadata: {
    buildId?: string
    sequenceId?: string
    commitSha?: string
    branch?: string
    environment?: string
  }
}

type QIIncidentType =
  | 'build_error'
  | 'lint_error'
  | 'runtime_error'
  | 'silent_failure'
  | 'schema_mismatch'
  | 'deployment_failure'
  | 'test_failure'
  | 'security_violation'
```

### Recording Requirements

QA systems must record QI Incidents when detecting:

1. **Build errors** (QIC-1)
2. **Lint errors** (QIC-2)
3. **Runtime errors** (QIC-3)
4. **Silent failures** (QIC-5)
5. **Schema mismatches** (QIC-5)
6. **Deployment failures** (QIC-4)

### Implementation Requirements

```typescript
import { writeMemory } from '@/lib/foreman/memory/storage'

async function recordQIIncident(incident: QualityIntegrityIncident): Promise<void> {
  await writeMemory({
    scope: 'foreman',
    key: `qi-incident-${incident.id}`,
    value: incident,
    tags: ['quality-integrity', 'incident', incident.incidentType, incident.severity],
    createdBy: 'qa-builder',
  })
  
  console.log(`[QIC] Recorded QI Incident: ${incident.id} - ${incident.incidentType}`)
}

// Usage in QA Builder
async function handleQAFailure(checkResult: QualityCheckResult): Promise<void> {
  if (checkResult.status === 'failed') {
    const incident: QualityIntegrityIncident = {
      id: generateIncidentId(),
      timestamp: new Date().toISOString(),
      incidentType: mapCheckTypeToIncidentType(checkResult.check),
      severity: determineSeverity(checkResult),
      source: checkResult.source || 'unknown',
      description: checkResult.message,
      details: checkResult.errors || checkResult.failures,
      metadata: {
        buildId: currentBuildId,
        sequenceId: currentSequenceId,
        commitSha: currentCommitSha,
        branch: currentBranch,
      }
    }
    
    await recordQIIncident(incident)
  }
}
```

### Evolution Through QI Incidents

Foreman uses QI Incidents to evolve:

1. **Architecture** - Identify patterns requiring architectural changes
2. **QA processes** - Improve detection rules based on missed failures
3. **Engine constraints** - Add safeguards based on runtime failures
4. **Regression tests** - Create tests for previously undetected issues

```typescript
async function analyzeQIIncidents(): Promise<ArchitecturalInsights> {
  const incidents = await readMemory({
    scope: 'foreman',
    tags: ['quality-integrity', 'incident']
  })
  
  return {
    architectureChangesNeeded: identifyArchitecturalPatterns(incidents.entries),
    qaImprovements: identifyQAGaps(incidents.entries),
    engineConstraints: identifyEngineWeaknesses(incidents.entries),
    regressionTests: identifyTestGaps(incidents.entries),
  }
}
```

---

## QIC-7 — Interface Integrity Requirements

### Architecture Rule

**Interfaces and type definitions must be complete, consistent, and validated before deployment.**

**Added**: 2025-12-12 (Issue #546 - Philosophy Re-Alignment)  
**Reason**: Prevent interface alignment failures that block 100% GREEN builds

### Background

During Wave 1 execution, three consecutive TypeScript compilation failures occurred due to interface alignment issues:
1. Missing legacy model names in union types
2. Incomplete Record<UnionType, T> definitions
3. Non-existent function imports

These failures violated the 100% GREEN build mandate and revealed a governance/QA gap.

### Requirements

1. **Pre-Build Type Validation** - TypeScript compilation must pass before deployment
   - Run `npx tsc --noEmit` as mandatory CI gate
   - Type errors block PR merge
   - No compilation errors reach deployment

2. **Type Completeness Validation** - Record<UnionType, T> must have all union values as keys
   - Automated tests validate completeness
   - Runtime validation as backup
   - Missing keys block build

3. **Export/Import Consistency** - All imports must reference exported members
   - Validate imported names exist in source modules
   - Detect missing exports before deployment
   - Function signature changes validated

4. **Breaking Change Detection** - Interface changes require validation of all usages
   - Flag changes to exported types
   - Require CS2 approval for breaking changes
   - Validate all dependent code is updated

### Implementation Requirements

```typescript
// Pre-build validation
async function validateInterfaceIntegrity(): Promise<QualityCheckResult> {
  const errors: InterfaceError[] = [];

  // 1. TypeScript compilation
  const tsResult = await runTypeScriptCompilation();
  if (!tsResult.success) {
    errors.push({
      type: 'compilation_error',
      message: 'TypeScript compilation failed',
      details: tsResult.errors,
    });
  }

  // 2. Type completeness
  const completenessResult = await validateTypeCompleteness();
  if (!completenessResult.success) {
    errors.push({
      type: 'type_completeness',
      message: 'Incomplete Record<UnionType, T> detected',
      details: completenessResult.incomplete,
    });
  }

  // 3. Import/export consistency
  const importResult = await validateImportExportConsistency();
  if (!importResult.success) {
    errors.push({
      type: 'import_error',
      message: 'Import references non-existent export',
      details: importResult.missing,
    });
  }

  // 4. Breaking change detection
  const breakingResult = await detectBreakingChanges();
  if (breakingResult.hasBreakingChanges && !breakingResult.approved) {
    errors.push({
      type: 'breaking_change',
      message: 'Breaking interface change without CS2 approval',
      details: breakingResult.changes,
    });
  }

  if (errors.length > 0) {
    return {
      check: 'interface_integrity',
      status: 'failed',
      message: 'Interface integrity violations detected',
      errors,
    };
  }

  return {
    check: 'interface_integrity',
    status: 'passed',
    message: 'All interface integrity checks passed',
  };
}
```

### CI Integration

```yaml
# .github/workflows/qic.yml
- name: QIC-7 Interface Integrity Validation
  run: |
    echo "Running TypeScript compilation check..."
    npx tsc --noEmit
    
    echo "Running type completeness tests..."
    npm run test:type-completeness
    
    echo "Running import/export consistency check..."
    npm run test:import-export-consistency
    
    echo "✅ Interface integrity validated"
```

### Pre-Build Script

```bash
#!/bin/bash
# scripts/pre-build-validation.sh
# Runs before every build to catch interface issues

set -e

echo "🔍 QIC-7: Interface Integrity Validation"

# TypeScript compilation
echo "  → TypeScript compilation..."
npx tsc --noEmit || { echo "❌ TypeScript compilation failed"; exit 1; }

# Type completeness
echo "  → Type completeness..."
npx tsx tests/qa/type-completeness.test.ts || { echo "❌ Type completeness failed"; exit 1; }

# Import/export consistency
echo "  → Import/export consistency..."
npx tsx tests/qa/import-export-consistency.test.ts || { echo "❌ Import consistency failed"; exit 1; }

echo "✅ QIC-7 validation passed"
```

### Type Completeness Test Template

```typescript
// tests/qa/type-completeness.test.ts
import { describe, it, expect } from '@jest/globals';
import type { ModelTier } from '@/types/model-escalation';

describe('QIC-7: Type Completeness Validation', () => {
  const allModelTiers: ModelTier[] = [
    'gpt-4',
    'gpt-4-turbo',
    'gpt-4o-mini',
    'gpt-4o',
    'gpt-4.1',
    'gpt-5.1',
    'local-builder',
  ];

  it('validates Record<ModelTier, T> objects have all ModelTier values', () => {
    // Dynamically import all Record<ModelTier, T> objects
    // Validate each has all union values as keys
    // Fail if any are incomplete
  });

  it('validates all imports reference exported members', () => {
    // Scan codebase for import statements
    // Check each imported name exists in source module
    // Fail if any imports are invalid
  });

  it('detects breaking changes to exported interfaces', () => {
    // Compare current exports with baseline
    // Flag any removed or changed exports
    // Require CS2 approval for breaking changes
  });
});
```

### Builder Integration

Updated in `/foreman/builder-specs/build-to-green-rule.md`:

**Before marking build as GREEN, builders MUST:**

1. ✅ Run `npx tsc --noEmit` to validate TypeScript compilation
2. ✅ Verify all Record<UnionType, T> objects are complete
3. ✅ Verify all imports reference exported members
4. ✅ Fix any interface alignment issues before reporting GREEN

### Governance Integration

**QI Incident Recording**:

When QIC-7 violations are detected, record as:
- `incidentType: 'interface_integrity_violation'`
- `severity: 'high'` (blocks 100% GREEN)
- Details include: compilation errors, incomplete types, missing exports

**CS2 Trigger**:

Breaking interface changes automatically trigger CS2 (Architecture Approval):
- Changes to exported types
- Removal of exports
- Function signature changes
- Type definition modifications

### Failure Prevention

QIC-7 prevents:
1. ❌ Type errors reaching deployment
2. ❌ Incomplete Record<UnionType, T> definitions
3. ❌ Imports referencing non-existent exports
4. ❌ Breaking changes without approval
5. ❌ Interface alignment failures blocking 100% GREEN

### Success Metrics

QIC-7 is working when:
- ✅ Zero TypeScript compilation errors in deployment
- ✅ Zero incomplete type definitions
- ✅ Zero import errors
- ✅ All interface changes validated before merge
- ✅ 100% GREEN builds achieved on first deploy

---

## QIC-8 — Auto-Propagation Across All Apps

### Architecture Rule

**QIC applies universally to all Maturion applications and systems.**

### Scope of Application

QIC automatically applies to:

1. **All Maturion apps** (existing and future)
2. **All multi-agent subsystems**
3. **All Foreman modules**
4. **All Builder modules**
5. **All CI pipelines**
6. **All deployment workflows**

### Implementation Requirements

1. **Global QIC loader** - All modules must load QIC rules at initialization
2. **Template inheritance** - New apps inherit QIC through global templates
3. **Automatic enforcement** - QA builders enforce QIC without configuration
4. **Version tracking** - QIC versions tracked in architecture memory

```typescript
// Global QIC loader (loaded by all modules)
import { loadQICRules } from '@/lib/foreman/governance/qic-loader'

export async function initializeQualityFramework(): Promise<QICConfig> {
  const qicRules = await loadQICRules()
  
  // Validate that all QIC requirements are met
  validateQICCompliance(qicRules)
  
  return {
    version: qicRules.version,
    buildIntegrityEnabled: true,
    lintIntegrityEnabled: true,
    runtimeIntegrityEnabled: true,
    deploymentSimulationEnabled: true,
    silentFailurePreventionEnabled: true,
    governanceMemoryIntegrationEnabled: true,
    enforcedBy: 'qa-builder',
    appliesTo: 'all-apps',
  }
}
```

### Template Integration

New applications automatically inherit QIC:

```typescript
// In app scaffolding/template
export const APP_TEMPLATE_CONFIG = {
  qualityFramework: {
    qicVersion: 'latest',
    inheritGlobalQIC: true,
    customRules: [], // Optional app-specific extensions
  },
  qa: {
    enforceQIC: true,
    blockOnQIFail: true,
    recordIncidents: true,
  }
}
```

---

## QIC Enforcement Checklist

Every QA Builder must validate:

- [ ] QIC-1: Build logs parsed for error patterns
- [ ] QIC-2: Lint runs in strict mode with zero errors
- [ ] QIC-3: Runtime integrity checks pass
- [ ] QIC-4: Preview and Production builds simulate successfully
- [ ] QIC-5: Silent failures detected and blocked
- [ ] QIC-6: QI Incidents recorded in Governance Memory
- [ ] QIC-7: Interface integrity validated (TypeScript compilation, type completeness, import/export consistency)
- [ ] QIC-8: QIC rules loaded and enforced globally

**If any QIC requirement fails → QA FAIL → PR blocked.**

---

## Exit Criteria

### Architecture Document Updates

- ✅ QIC section created with all 7 rules defined
- ⏳ Global architecture schema updated with QIC types
- ⏳ Governance rules updated for QI Incident handling
- ⏳ QIC anchor section created for module references

### Implementation Requirements

- ⏳ QIC rules enforced by all modules loading architecture
- ⏳ Governance Memory schema supports QI Incidents
- ⏳ Future apps inherit QIC through global templates
- ⏳ Compatibility validated with existing architecture

---

## Integration with Existing QA Philosophy

The QIC builds upon and reinforces the existing QA philosophy:

### QA Philosophy Alignment

From `/foreman/qa/qa-philosophy.md`:
- ✅ **QA is the Final Authority** - QIC formalizes what QA must check
- ✅ **No Human Code Review** - QIC provides deterministic validation
- ✅ **Architecture + QA + Compliance = Review System** - QIC defines architecture requirements for QA

### QA Enforcement Alignment

From `/foreman/qa/qa-enforcement.md`:
- ✅ **QA Validation Pipeline** - QIC defines mandatory validation steps
- ✅ **QA Failure Handling** - QIC requires QI Incident recording
- ✅ **QA as Ultimate Reviewer** - QIC specifies non-negotiable quality gates

### Governance Model Alignment

From `/foreman/governance/governance-model.md`:
- ✅ **Autonomy-First Governance** - QIC enables autonomous quality enforcement
- ✅ **QA Validation Checkpoint** - QIC defines what must be validated
- ✅ **Governance Memory Integration** - QIC requires incident tracking

---

## Summary

The Quality Integrity Contract (QIC) establishes a governance layer that:

1. **Defines "healthy builds"** - Explicit criteria for build success
2. **Prevents false positives** - QA cannot pass with actual failures
3. **Enforces non-negotiable quality** - Build/lint/runtime failures block deployment
4. **Tracks quality evolution** - QI Incidents feed architectural improvement
5. **Applies universally** - All apps inherit QIC automatically

**QIC transforms quality enforcement from reactive to proactive, ensuring systemic quality integrity across the entire Maturion ecosystem.**

---

*This Quality Integrity Contract is mandatory for all Maturion applications and cannot be bypassed. It represents the minimum quality standard for all code entering the system.*
