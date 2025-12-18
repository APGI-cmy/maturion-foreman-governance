# GitHub Builder Model Scaling Engine Architecture

## Purpose

This architecture defines a **GitHub-specific** multi-tier, cross-model routing system for GitHub AI builders that ensures:
- Optimal cost efficiency (lowest viable model first)
- Optimal success rate (automatic escalation on struggle)
- Central governance control
- Consistent behavior across all 7 repositories

**Critical Constraint**: This system **ONLY** applies to GitHub AI builders. It **MUST NOT** affect:
- Maturion App model escalation (`lib/foreman/model-escalation.ts`)
- Local Builder Runtime model scaling

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                   GitHub Builder Model Scaling System                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                  Task Descriptor Input                        │  │
│  │  { taskType, complexity, filesAffected, ... }                 │  │
│  └───────────────────────┬──────────────────────────────────────┘  │
│                          │                                           │
│                          ▼                                           │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │         Central Master Routing Engine                         │  │
│  │         /lib/github/model-routing.ts                          │  │
│  │                                                                │  │
│  │  ┌─────────────────────────────────────────────────────────┐ │  │
│  │  │ 1. Task Classification                                   │ │  │
│  │  │    - Docs (T1), CRUD (T2), Architecture (T3), etc.      │ │  │
│  │  └─────────────────────────────────────────────────────────┘ │  │
│  │  ┌─────────────────────────────────────────────────────────┐ │  │
│  │  │ 2. Model Tier Selection                                 │ │  │
│  │  │    - Select lowest viable model from tier table         │ │  │
│  │  └─────────────────────────────────────────────────────────┘ │  │
│  │  ┌─────────────────────────────────────────────────────────┐ │  │
│  │  │ 3. Struggle Detection                                    │ │  │
│  │  │    - Monitor for failure patterns                        │ │  │
│  │  │    - Detect escalation triggers                          │ │  │
│  │  └─────────────────────────────────────────────────────────┘ │  │
│  │  ┌─────────────────────────────────────────────────────────┐ │  │
│  │  │ 4. Escalation Logic                                      │ │  │
│  │  │    - T1 → T2 → T3 (up to 3 attempts per tier)           │ │  │
│  │  └─────────────────────────────────────────────────────────┘ │  │
│  │  ┌─────────────────────────────────────────────────────────┐ │  │
│  │  │ 5. Governance Logging                                    │ │  │
│  │  │    - Log all routing decisions                           │ │  │
│  │  │    - Store evidence trail                                │ │  │
│  │  └─────────────────────────────────────────────────────────┘ │  │
│  └──────────────────────┬───────────────────────────────────────┘  │
│                         │                                            │
│                         ▼                                            │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                Routing Decision Output                        │  │
│  │  { tier: 'T2', modelId: 'gpt-4o', justification: '...' }     │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘

         ▲                                      │
         │                                      ▼
┌────────┴──────────┐               ┌──────────────────────┐
│  Model Tier Table │               │  Governance Memory   │
│  (config file)    │               │  Logs + Evidence     │
└───────────────────┘               └──────────────────────┘
```

## Core Components

### 1. Central Master Routing Engine
**Location**: `/lib/github/model-routing.ts`

**Responsibilities**:
- Accept task descriptor as input
- Classify task type and complexity
- Select lowest viable model from tier table
- Detect struggle signals during execution
- Escalate model tier when needed
- Log all decisions to governance memory
- Return routing decision with justification

**Protection**: CS1 guardrails (protected file, cannot be modified without approval)

**Key Functions**:
```typescript
// Main routing function
export function selectGitHubBuilderModel(
  descriptor: GitHubTaskDescriptor
): ModelRoutingDecision

// Struggle detection
export function detectStruggle(
  attempts: BuildAttempt[]
): StruggleSignal | null

// Escalation logic
export function escalateTier(
  currentTier: ModelTier,
  struggleReason: StruggleSignal
): ModelTier | null

// De-escalation logic
export function considerDeEscalation(
  history: TaskHistory[]
): boolean
```

### 2. Model Tier Table
**Location**: `/config/model-tiers.json`

**Structure**:
```json
{
  "tiers": {
    "T1": {
      "name": "Tier 1 - Lightweight Tasks",
      "models": ["gpt-4o-mini", "claude-haiku"],
      "taskTypes": ["docs", "simple-ui", "config-update"],
      "maxRetries": 3,
      "costMultiplier": 1
    },
    "T2": {
      "name": "Tier 2 - Standard Tasks",
      "models": ["gpt-4o", "claude-sonnet-lite"],
      "taskTypes": ["crud", "api-endpoint", "component"],
      "maxRetries": 3,
      "costMultiplier": 5
    },
    "T3": {
      "name": "Tier 3 - Complex Tasks",
      "models": ["claude-3.5-sonnet"],
      "taskTypes": ["architecture", "red-qa", "refactor"],
      "maxRetries": 3,
      "costMultiplier": 20
    }
  },
  "escalationRules": {
    "repeatedErrors": { "threshold": 2, "action": "escalate" },
    "invalidCodeGeneration": { "threshold": 1, "action": "escalate" },
    "missingImports": { "threshold": 2, "action": "escalate" },
    "partialFileRewrites": { "threshold": 1, "action": "escalate" },
    "qicFailures": { "threshold": 1, "action": "escalate" },
    "tokenOverflow": { "threshold": 1, "action": "escalate" },
    "ambiguityDetected": { "threshold": 2, "action": "escalate" }
  }
}
```

**Modifiable**: Yes (configuration file, can be updated as needed)

### 3. Struggle Detection System

**Escalation Triggers** (when to escalate from current tier to next):
1. **Repeated model errors** (2+ failures on same task)
2. **Invalid code generation** (syntax errors, type errors)
3. **Missing imports** (import statements not added)
4. **Partial file rewrites** (incomplete file modifications)
5. **QIC/QIEL heuristic failures** (quality gate violations)
6. **Excessive ambiguity** (model asks for clarification 2+ times)
7. **Token overflow** (context window exceeded)
8. **Inability to follow directives** (instructions not followed)

**Escalation Sequence**: T1 → T2 → T3
**Retry Sequence**: 3 attempts per tier before escalating

**Example Flow**:
```
Task: "Add CRUD endpoint for projects"
├─ Initial Classification: T2 (CRUD task)
├─ First Attempt: gpt-4o
│  └─ Result: Missing imports detected → Struggle Signal
├─ Second Attempt: gpt-4o (retry on same tier)
│  └─ Result: Invalid code generation → Struggle Signal
├─ Third Attempt: gpt-4o (final retry on T2)
│  └─ Result: Still failing → Escalation Decision
└─ Fourth Attempt: claude-3.5-sonnet (T3)
   └─ Result: Success ✓
```

### 4. Governance Integration

**Logging Location**: `/logs/model-routing/YYYY-MM-DD/*.json`

**Log Entry Structure**:
```json
{
  "id": "route_20251211_134512_abc123",
  "timestamp": "2025-12-11T13:45:12.123Z",
  "taskDescriptor": {
    "taskType": "crud",
    "complexity": "medium",
    "filesAffected": 3,
    "repositoryId": "maturion-foreman-app"
  },
  "routingDecision": {
    "tier": "T2",
    "modelId": "gpt-4o",
    "justification": "CRUD task classified as T2, selected gpt-4o as primary model"
  },
  "attempts": [
    {
      "attemptNumber": 1,
      "modelId": "gpt-4o",
      "tier": "T2",
      "timestamp": "2025-12-11T13:45:15.456Z",
      "result": "failure",
      "struggleSignal": "missing_imports"
    },
    {
      "attemptNumber": 2,
      "modelId": "gpt-4o",
      "tier": "T2",
      "timestamp": "2025-12-11T13:46:20.789Z",
      "result": "success"
    }
  ],
  "finalOutcome": "success",
  "totalAttempts": 2,
  "escalationsUsed": 0,
  "costEstimate": 0.12
}
```

**Governance Memory Events**:
- `github_model_routing_decision` - Initial routing decision
- `github_model_struggle_detected` - Struggle signal detected
- `github_model_escalation` - Tier escalation performed
- `github_model_success` - Task completed successfully
- `github_model_exhausted` - All tiers exhausted, task failed

### 5. Repository-Level Thin Routing Modules

**Purpose**: Each repository has a thin wrapper that normalizes local context and calls the central routing engine.

**Example**: `/lib/github/model-routing.ts` (in each repo)
```typescript
import { selectGitHubBuilderModel } from '@maturion/central-routing-engine'

export function selectModelForTask(localContext: LocalTaskContext) {
  // Normalize local context to standard task descriptor
  const descriptor = normalizeContext(localContext)
  
  // Call central routing engine
  const decision = selectGitHubBuilderModel(descriptor)
  
  // Enforce governance rules
  enforceLocalGovernanceRules(decision)
  
  return decision
}
```

**Constraints**:
- Must never hard-code model IDs
- Must always call Foreman central engine
- Must enforce governance rules
- Must throw if routing is not available

## Data Models

### GitHubTaskDescriptor
```typescript
interface GitHubTaskDescriptor {
  taskType: TaskType
  complexity: 'low' | 'medium' | 'high'
  filesAffected: number
  repositoryId: string
  branchName: string
  isArchitectureTask: boolean
  isGovernanceTask: boolean
  requiresRedQA: boolean
  estimatedTokens?: number
}
```

### TaskType
```typescript
type TaskType = 
  | 'docs'              // T1: Documentation updates
  | 'simple-ui'         // T1: Simple UI components
  | 'config-update'     // T1: Configuration changes
  | 'crud'              // T2: CRUD operations
  | 'api-endpoint'      // T2: API endpoint implementation
  | 'component'         // T2: React component
  | 'integration'       // T2: Service integration
  | 'architecture'      // T3: Architecture design
  | 'red-qa'            // T3: Red QA creation
  | 'refactor'          // T3: Large refactoring
  | 'multi-module'      // T3: Multi-module changes
```

### ModelRoutingDecision
```typescript
interface ModelRoutingDecision {
  tier: 'T1' | 'T2' | 'T3'
  modelId: string
  justification: string
  maxRetries: number
  escalationPath: ModelTier[]
  estimatedCost: number
}
```

### StruggleSignal
```typescript
interface StruggleSignal {
  type: StruggleType
  severity: 'low' | 'medium' | 'high'
  message: string
  recommendEscalation: boolean
}

type StruggleType =
  | 'repeated_errors'
  | 'invalid_code_generation'
  | 'missing_imports'
  | 'partial_file_rewrites'
  | 'qic_failure'
  | 'token_overflow'
  | 'ambiguity_detected'
  | 'directive_not_followed'
```

### BuildAttempt
```typescript
interface BuildAttempt {
  attemptNumber: number
  modelId: string
  tier: ModelTier
  timestamp: string
  result: 'success' | 'failure' | 'partial'
  struggleSignal?: StruggleSignal
  errorMessage?: string
  outputQuality?: number // 0-100 score
}
```

## Security Architecture

### Secrets Management
- No model API keys stored in this system
- Routing decisions logged without sensitive data
- All logs sanitized before storage

### Input Validation
- All task descriptors validated against schema
- Invalid descriptors rejected with clear error messages
- No injection vulnerabilities in logging

### Authorization
- Only Foreman can modify model-tiers.json
- Only Foreman can access routing logs
- Builders receive routing decisions, cannot modify them

## Error Handling Architecture

### Error Types
1. **Configuration Errors** (tier table invalid, missing tiers)
2. **Routing Errors** (cannot classify task, no viable model)
3. **Escalation Errors** (all tiers exhausted, no more escalation possible)
4. **Logging Errors** (cannot write to governance memory)

### Error Communication
- User-facing: "Model selection failed, task cannot proceed"
- Developer-facing: Detailed error with context and stack trace
- Governance log: Full error details for audit

### Error Recovery
- Configuration errors: Use default tier table
- Routing errors: Fall back to T2 (safe middle ground)
- Escalation errors: Report to Foreman for manual intervention
- Logging errors: Continue execution, log to stderr

## Performance Architecture

### Performance Requirements
- Routing decision: < 100ms
- Struggle detection: < 50ms per attempt
- Logging: Async, non-blocking

### Optimization Strategies
- Cache tier table in memory (reload on config change)
- Lazy-load governance memory logger
- Batch log writes (every 10 decisions or 30 seconds)

## Testing Architecture

### Test Coverage Strategy

**Unit Tests** (`/tests/model-scaling/routing-behaviour.test.ts`):
- Task classification logic
- Model tier selection
- Struggle detection patterns
- Escalation decision logic
- De-escalation logic

**Integration Tests** (`/tests/model-scaling/escalation-strategy.test.ts`):
- End-to-end routing flow
- Multi-attempt retry logic
- Governance memory integration
- Tier table loading

**Policy Tests** (`/tests/model-scaling/policy-validation.test.ts`):
- Tier table validation
- Governance rule enforcement
- Constitutional compliance
- CS1 guardrail protection

### Test Scenarios

**Happy Path**:
1. Simple task → T1 → Success on first attempt
2. CRUD task → T2 → Success after 1 retry
3. Architecture task → T3 → Success immediately

**Error Paths**:
1. T1 fails 3 times → Escalate to T2
2. T2 fails 3 times → Escalate to T3
3. T3 fails 3 times → Report exhaustion
4. Invalid task descriptor → Reject with error
5. Tier table missing → Use default config

**Edge Cases**:
1. Task type not in tier table → Default to T2
2. All models in tier unavailable → Escalate immediately
3. Governance memory unavailable → Log to stderr, continue
4. Concurrent routing requests → Handle thread-safely

## Deployment Architecture

### Build Configuration
- TypeScript compilation required
- No environment variables needed (uses config file)
- Outputs to `/dist/lib/github/model-routing.js`

### Deployment Strategy
- Deployed as part of Foreman app
- Config file hot-reloadable (watch for changes)
- Logs directory created on first run

### Environment Configuration
- No environment-specific settings
- Tier table can differ per environment if needed
- Governance memory path configurable

## Documentation Architecture

### Code Documentation
- JSDoc comments on all public functions
- Type definitions fully documented
- Complex logic explained inline

### User Documentation
**Governance Docs**:
- `/docs/governance/github-model-scaling-policy.md` - Policy overview
- `/docs/governance/model-tier-matrix.md` - Tier table reference

### Developer Documentation
- This architecture document
- Test documentation in test files
- README in `/lib/github/` explaining usage

## Workflow Enforcement

### GitHub Actions Workflow
**Location**: `/.github/workflows/model-scaling-check.yml`

**Purpose**: Verify system integrity on every commit

**Checks**:
1. Central router exists (`/lib/github/model-routing.ts`)
2. Tier table exists (`/config/model-tiers.json`)
3. Tier table is valid JSON
4. Governance docs exist
5. Test suite exists
6. All tests pass

**Workflow Steps**:
```yaml
name: Model Scaling System Check
on: [push, pull_request]
jobs:
  verify-model-scaling:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Setup Node
      - Install dependencies
      - Verify central router exists
      - Verify tier table exists and is valid
      - Run model scaling test suite
      - Report results
```

## Architecture Checklist Validation

### ✅ UI Architecture
- N/A (No UI components)

### ✅ API Architecture
- N/A (Internal library, no API endpoints)

### ✅ Data Architecture
- **Schema**: GitHubTaskDescriptor, ModelRoutingDecision, StruggleSignal, BuildAttempt
- **Storage**: Config file (model-tiers.json), Governance logs (JSON files)
- **Validation**: JSON schema validation for all types

### ✅ State Management
- **State**: In-memory cache for tier table, no persistent state
- **Operations**: Read config, cache in memory, reload on change

### ✅ Integration Architecture
- **Services**: Governance Memory (for logging)
- **Integration Points**: Called by GitHub builders before task execution
- **Error Handling**: Fallback to default config, continue with degraded service

### ✅ Security Architecture
- **Authentication**: N/A (internal library)
- **Authorization**: Only Foreman can modify config
- **Data Protection**: No sensitive data in logs
- **Input Sanitization**: All inputs validated against schema

### ✅ Error Handling Architecture
- **Error Types**: Configuration, Routing, Escalation, Logging errors
- **Detection**: Schema validation, try-catch blocks
- **Communication**: Structured error objects with context
- **Recovery**: Fallback strategies for each error type
- **Logging**: All errors logged to governance memory

### ✅ Performance Architecture
- **Requirements**: < 100ms routing decision
- **Optimization**: In-memory caching, async logging
- **Monitoring**: Log routing decision time

### ✅ Testing Architecture
- **Coverage**: Unit, integration, policy tests
- **Test Data**: Mock task descriptors, mock tier tables
- **Test Scenarios**: Happy path, error paths, edge cases
- **Infrastructure**: Node test runner with tsx

### ✅ Deployment Architecture
- **Build**: TypeScript → JavaScript
- **Environments**: Single environment, config can differ
- **Rollout**: Part of Foreman app deployment
- **Rollback**: Revert commit, config file unchanged

### ✅ Documentation Architecture
- **Code Docs**: JSDoc on all public functions
- **User Docs**: Governance policy, tier matrix
- **Developer Docs**: This architecture document

## Architecture Completeness: ✅ COMPLETE

All checklist items addressed. Architecture is detailed enough for builders to implement without questions.

---

**Version**: 1.0  
**Authority**: Build Philosophy  
**Status**: Ready for Red QA Creation  
**Last Updated**: 2025-12-11
