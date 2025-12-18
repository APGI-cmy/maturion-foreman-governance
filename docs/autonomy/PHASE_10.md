# PHASE_10: Mutation Governor Kernel

**Wave:** 3  
**Layer:** Safety Kernel  
**Status:** Implemented  
**Version:** 1.0.0

## Purpose

The Mutation Governor Kernel prevents runaway mutations, prohibits unsafe mutation patterns, enforces sequencing, and provides constitutional control over code modifications.

This module ensures:
- Foreman does NOT over-mutate
- Mutations follow safe sequences
- PR gatekeeper approves each mutation type
- Mutation count is limited
- Mutations are atomic & reversible

It prevents catastrophic build cascades.

## Mutation Classification

Every potential mutation is classified as one of:

### SAFE
Mutations that are always allowed with minimal governance:
- Documentation updates (non-governance docs)
- Test file additions
- Type definition additions (non-breaking)
- Comment additions
- Formatting changes (linter-approved)

### REGULATED
Mutations that require validation and counting:
- Source code modifications
- Configuration changes
- Dependency updates
- API signature changes
- Database schema updates
- Build script modifications

### FORBIDDEN
Mutations that are explicitly blocked:
- Editing governance files (`.github/foreman/agent-contract.md`)
- Editing workflows (`.github/workflows/`)
- Architecture redesign without approval
- Touching protected paths (CS1 guardrails)
- Modifying constitutional documents
- Deleting working files without justification

## Protected Paths (CS1)

The following paths are constitutionally protected:

```
.github/workflows/
.github/foreman/agent-contract.md
/BUILD_PHILOSOPHY.md
/foreman/architecture-design-checklist.md
foreman/constitution/
docs/governance/
```

## Sequence Rules

A mutation sequence is only allowed if:

1. **No Guardrail Violations**: All CS1 guardrails pass
2. **No Governance Blocks**: GitHub governance allows the mutation
3. **QIC/QIEL Passes**: Quality Integrity Contract validated
4. **Recovery Path Defined**: Builder can restore previous state if needed
5. **Atomic Operation**: Each mutation is a complete, testable unit
6. **Sequential Safety**: Previous mutation completed successfully

## Mutation Throttling

### Limits

```typescript
{
  maxMutationsPerPR: 50,
  maxMutationsPerIssue: 100,
  maxMutationsPerWave: 200,
  cooldownPeriod: 60, // seconds between mutation bursts
  maxConcurrentMutations: 5
}
```

### Counter Storage

Mutation metrics are tracked in:
```
foreman/constitution/mutation-metrics.json
```

Format:
```json
{
  "currentPR": {
    "prNumber": 123,
    "mutationCount": 15,
    "lastMutationTimestamp": "2025-12-11T10:00:00Z",
    "mutationsByType": {
      "safe": 5,
      "regulated": 10,
      "forbidden": 0
    }
  },
  "dailyStats": {
    "date": "2025-12-11",
    "totalMutations": 45,
    "blockedMutations": 3,
    "recoveredMutations": 1
  }
}
```

## Mutation Logging

Every mutation is logged with:

```typescript
{
  type: 'mutation_requested' | 'mutation_approved' | 'mutation_blocked' | 'mutation_completed',
  severity: 'info' | 'medium' | 'high' | 'critical',
  description: string,
  metadata: {
    mutationType: 'safe' | 'regulated' | 'forbidden',
    impactRadius: number, // files affected
    constitutionalVerdict: 'approved' | 'blocked' | 'requires_review',
    recoveryPath: string,
    sequenceId: string,
    filesAffected: string[],
    timestamp: string
  }
}
```

## Impact Radius

Each mutation has an impact radius calculated as:

```typescript
impactRadius = filesAffected + (importsAffected * 2) + (testsRequired * 3)
```

Categories:
- **Low**: 1-5 impact radius (single file, no breaking changes)
- **Medium**: 6-15 impact radius (multiple files, some imports)
- **High**: 16+ impact radius (architecture changes, many dependencies)

## Recovery Logic

For every regulated mutation:

1. **Pre-mutation State**: Snapshot current state
2. **Mutation Execution**: Apply changes
3. **Validation**: Run QA/linting
4. **Success Path**: Commit and continue
5. **Failure Path**: 
   - Log failure
   - Restore from snapshot
   - Mark mutation as failed
   - Optional: Retry with smaller scope

## Sequence Types

### Linear Sequence
Mutations executed one after another, each depending on the previous:
```
Mutation A → Mutation B → Mutation C
```

### Parallel Sequence
Independent mutations that can execute simultaneously:
```
Mutation A ┐
           ├→ Continue
Mutation B ┘
```

### Conditional Sequence
Mutations that execute based on conditions:
```
Mutation A → [Check] → Mutation B (if pass) or Mutation C (if fail)
```

## Integration with Existing Systems

### CS1 Guardrails
- Every regulated/forbidden mutation validated against CS1
- Protected paths automatically blocked
- Baseline hash validation enforced

### GitHub Governance
- Mutation requests validated by github-governance.ts
- QA/Compliance checks required
- Approval workflow for sensitive mutations

### QIC/QIEL
- Quality checks run after each mutation
- Build integrity validated
- Lint/type-check enforced

### PR Gatekeeper
- Final mutation review before merge
- Ensures all mutations justified
- Validates mutation counts within limits

## Dashboard Integration

The Mutation Governor provides dashboard indicators:

### Mutation Counter
```
PR Mutations: [████████░░] 15 / 50
Wave Mutations: [██░░░░░░░░] 45 / 200
```

### Mutation Timeline
Shows recent mutations with status:
- ✅ Completed
- ⏳ In Progress
- ❌ Blocked
- 🔄 Recovered

### Risk Indicator
Based on impact radius and mutation count:
- 🟢 Low Risk (< 20 mutations, low impact)
- 🟡 Medium Risk (20-40 mutations, medium impact)
- 🔴 High Risk (> 40 mutations, high impact)

## API

### Main Functions

```typescript
// Classify mutation type
export function classifyMutation(files: string[]): MutationClassification

// Check if mutation is allowed
export async function canMutate(
  files: string[],
  mutationType: MutationType,
  context: MutationContext
): Promise<MutationGovernanceResult>

// Record mutation attempt
export async function recordMutation(
  mutation: MutationRecord
): Promise<void>

// Get mutation statistics
export function getMutationStats(): MutationStats

// Check throttling limits
export function isThrottled(): boolean

// Reset mutation counters (new PR/wave)
export function resetMutationCounters(scope: 'pr' | 'wave'): void
```

## Safety Guarantees

The Mutation Governor ensures:

- **No Runaway Mutations**: Throttling enforced at PR/Wave level
- **Constitutional Compliance**: Protected paths never modified
- **Atomic Operations**: Each mutation is complete and testable
- **Recovery Capability**: Failed mutations can be rolled back
- **Audit Trail**: Complete history of all mutation attempts
- **Sequence Safety**: Mutations execute in safe order

## Acceptance Criteria

- [x] Mutation classification (SAFE, REGULATED, FORBIDDEN)
- [x] Type definitions created
- [x] Forbidden mutations blocked via CS1 guardrails
- [x] Throttling configuration defined
- [x] Mutation metrics structure defined
- [x] Recovery logic specified
- [x] Dashboard integration planned
- [x] Documentation complete

## Future Enhancements

1. **Learning from Patterns**: Adjust classifications based on success patterns
2. **Predictive Throttling**: Estimate mutations needed for a task
3. **Smart Recovery**: Automatically determine best recovery strategy
4. **Mutation Optimization**: Suggest combining related mutations
5. **Risk Scoring**: More sophisticated impact analysis

## Constitutional Authority

This implementation follows:

- **BUILD_PHILOSOPHY.md**: One-time fully functional builds
- **Agent Instructions**: Mutation restrictions
- **Governance Supremacy Rule (GSR)**: Constitutional compliance priority
- **CS1 Guardrails**: Protected path enforcement
- **Quality Integrity Contract (QIC)**: Quality validation

## Version History

- **1.0.0** (2025-12-11): Initial implementation
  - Mutation classification system
  - Throttling framework
  - Recovery logic
  - Metrics tracking structure
  - Integration with existing governance

## References

- Types: `types/mutation-governor.ts`
- Implementation: `lib/foreman/cognition/mutation-governor.ts`
- CS1 Guardrails: `lib/foreman/constitution/guardrails-validator.ts`
- GitHub Governance: `lib/foreman/governance/github-governance.ts`
- Build Philosophy: `BUILD_PHILOSOPHY.md`
- Agent Contract: `.github/foreman/agent-contract.md`
