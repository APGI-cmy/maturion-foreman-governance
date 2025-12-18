# Wave 3A — Architecture Constraint Foundations
## Architecture Design Document

**Version**: 1.0  
**Status**: Architecture Design  
**Owner**: Foreman  
**Date**: 2025-12-13

---

## 1. Purpose

Wave 3A establishes the **foundational architecture constraint model** that enables future architectural enforcement, drift detection, and safe autonomous evolution within the Maturion Engineering Ecosystem.

This wave defines **what constraints are**, not how they are enforced. It provides:
- A taxonomy for classifying architectural constraints
- A deterministic, versioned representation of system architecture (signatures)
- A central registry for declared constraints

**Success Metric**: The system can *describe* its architectural constraints precisely and reproducibly.

---

## 2. System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│              Architecture Constraint Foundations                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────┐      ┌──────────────────┐                │
│  │   Constraint     │      │   Architecture   │                │
│  │    Taxonomy      │      │    Signature     │                │
│  │                  │      │     Engine       │                │
│  │  - Structural    │      │                  │                │
│  │  - Contract      │      │  - Deterministic │                │
│  │  - Governance    │      │  - Versioned     │                │
│  └────────┬─────────┘      │  - Hashable      │                │
│           │                └────────┬──────────┘                │
│           │                         │                           │
│           └─────────┬───────────────┘                           │
│                     │                                           │
│                     ▼                                           │
│          ┌──────────────────────┐                               │
│          │  Constraint Registry  │                              │
│          │                       │                              │
│          │  - Read-only (v1)    │                              │
│          │  - Central catalog   │                              │
│          │  - Explicit ownership│                              │
│          └──────────────────────┘                               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Data Flow**:
1. System architecture → Signature Engine → Canonical signature
2. Constraint declarations → Registry → Catalog of constraints
3. Taxonomy → Classification framework for all constraints

---

## 3. Core Components

### 3.1 Constraint Taxonomy

**Location**: `/lib/foreman/constraints/taxonomy.ts`

**Purpose**: Defines the classification system for all architectural constraints in the Maturion ecosystem.

**Constraint Categories**:

#### Structural Constraints
Define the physical and logical organization of the codebase:
- Module boundaries (what code belongs where)
- Directory layout rules (enforced structure)
- Layering rules (runtime vs governance vs application)
- Dependency direction (no inverted dependencies)
- Import restrictions (what can import what)

**Example Structural Constraint**:
```typescript
{
  type: 'structural',
  category: 'dependency_direction',
  rule: 'Application layer must not import from infrastructure layer',
  scope: 'global',
  severity: 'critical'
}
```

#### Contract Constraints
Define interfaces and agreements between components:
- API contracts (endpoint signatures, request/response schemas)
- Type contracts (TypeScript interfaces, type stability)
- Event schemas (event names, payloads)
- Version compatibility rules (breaking vs non-breaking changes)
- Interface stability (public API surface area)

**Example Contract Constraint**:
```typescript
{
  type: 'contract',
  category: 'api_stability',
  rule: 'Public API endpoints must maintain backward compatibility',
  scope: 'module:api',
  severity: 'high'
}
```

#### Governance Constraints
Define constitutional and safety boundaries:
- Protected files and directories (immutable paths)
- Constitutional documents (BUILD_PHILOSOPHY.md, agent-contract.md)
- CS1-CS6 boundaries (constitutional safeguards)
- Runtime safety boundaries (execution authority limits)
- Governance memory integrity (audit trail requirements)

**Example Governance Constraint**:
```typescript
{
  type: 'governance',
  category: 'protected_path',
  rule: 'Constitutional files must not be modified by agents',
  scope: 'global',
  severity: 'critical',
  paths: ['.github/foreman/', 'BUILD_PHILOSOPHY.md', 'foreman/constitution/']
}
```

### 3.2 Architecture Signature Engine

**Location**: `/lib/foreman/constraints/signature-engine.ts`

**Purpose**: Generates a canonical, versioned, deterministic representation of the system architecture at any point in time.

**Signature Properties**:
1. **Deterministic**: Same codebase state → Same signature (always)
2. **Versioned**: Includes schema version for evolution
3. **Hashable**: Can be reduced to a cryptographic hash for comparison
4. **Comprehensive**: Captures all architecturally significant aspects

**Signature Components**:

```typescript
interface ArchitectureSignature {
  version: string;              // Signature schema version (e.g., '1.0.0')
  timestamp: string;            // ISO 8601 timestamp
  repository: {
    url: string;
    commit: string;             // Git commit SHA
    branch: string;
  };
  structure: {
    modules: ModuleSignature[];  // All modules in the system
    dependencies: DependencyGraph; // Dependency relationships
    layers: LayerDefinition[];   // Architectural layers
  };
  contracts: {
    apis: APIContract[];         // Public API contracts
    types: TypeContract[];       // Public type contracts
    events: EventContract[];     // Event schemas
  };
  governance: {
    protectedPaths: string[];    // Immutable paths
    constraints: string[];       // Active constraint IDs
    version: string;             // Governance version
  };
  hash: string;                  // SHA-256 hash of entire signature
}
```

**Determinism Guarantees**:
- File paths are sorted alphabetically
- Object keys are sorted
- Timestamps are normalized to UTC
- Hashes are computed using SHA-256
- Version strings follow semver

**Example Usage**:
```typescript
const signature = await generateArchitectureSignature();
const hash = signature.hash; // "a1b2c3d4..."
// Later comparison:
const newSignature = await generateArchitectureSignature();
const hasChanged = signature.hash !== newSignature.hash;
```

### 3.3 Constraint Registry

**Location**: `/lib/foreman/constraints/registry.ts`

**Purpose**: Central catalog of all declared architectural constraints with explicit ownership and scope.

**Registry Operations (v1 - Read-Only)**:
- `list()` - List all registered constraints
- `get(id)` - Get constraint by ID
- `query(filters)` - Query constraints by type, scope, severity
- `validate(id)` - Validate a constraint declaration

**Not Implemented in v1** (future waves):
- `register()` - Add new constraint
- `update()` - Modify existing constraint
- `enforce()` - Runtime enforcement
- `remediate()` - Auto-fix violations

**Constraint Declaration Schema**:

```typescript
interface ConstraintDeclaration {
  id: string;                    // Unique constraint ID
  version: string;               // Constraint version
  type: ConstraintType;          // Structural, Contract, Governance
  category: string;              // Specific category within type
  rule: string;                  // Human-readable rule description
  scope: ConstraintScope;        // Where constraint applies
  severity: ConstraintSeverity;  // Critical, High, Medium, Low
  owner: string;                 // Who owns this constraint
  source: string;                // Source document/file
  examples: {
    valid: string[];             // Examples of compliant code
    invalid: string[];           // Examples of violations
  };
  metadata: Record<string, any>; // Additional constraint-specific data
  createdAt: string;
  updatedAt: string;
}
```

**Registry Storage**:
- Location: `/foreman/constraints/registry.json`
- Format: JSON array of ConstraintDeclaration objects
- Version controlled in git
- Manually curated (automated in future waves)

---

## 4. Data Models

### 4.1 Core Types

**Location**: `/types/constraints.ts`

```typescript
/**
 * Constraint Type Classification
 */
export type ConstraintType = 'structural' | 'contract' | 'governance';

/**
 * Constraint Severity
 */
export type ConstraintSeverity = 'critical' | 'high' | 'medium' | 'low';

/**
 * Constraint Scope
 */
export type ConstraintScope = 
  | 'global'                      // Applies to entire codebase
  | `module:${string}`            // Applies to specific module
  | `layer:${string}`             // Applies to architectural layer
  | `path:${string}`;             // Applies to specific path pattern

/**
 * Module Signature
 */
export interface ModuleSignature {
  name: string;
  path: string;
  exports: string[];              // Public exports
  imports: string[];              // External imports
  layer: string;                  // Architectural layer
  hash: string;                   // Module content hash
}

/**
 * Dependency Graph
 */
export interface DependencyGraph {
  nodes: string[];                // Module names
  edges: Array<{
    from: string;                 // Source module
    to: string;                   // Target module
    type: 'import' | 'require';
  }>;
}

/**
 * Layer Definition
 */
export interface LayerDefinition {
  name: string;
  description: string;
  allowedDependencies: string[];  // Layers this layer can depend on
  modules: string[];              // Modules in this layer
}

/**
 * API Contract
 */
export interface APIContract {
  endpoint: string;
  method: string;
  requestSchema: Record<string, any>;
  responseSchema: Record<string, any>;
  version: string;
}

/**
 * Type Contract
 */
export interface TypeContract {
  name: string;
  file: string;
  definition: string;             // TypeScript definition
  exported: boolean;
  version: string;
}

/**
 * Event Contract
 */
export interface EventContract {
  name: string;
  payload: Record<string, any>;
  version: string;
}

/**
 * Architecture Signature (complete)
 */
export interface ArchitectureSignature {
  version: string;
  timestamp: string;
  repository: {
    url: string;
    commit: string;
    branch: string;
  };
  structure: {
    modules: ModuleSignature[];
    dependencies: DependencyGraph;
    layers: LayerDefinition[];
  };
  contracts: {
    apis: APIContract[];
    types: TypeContract[];
    events: EventContract[];
  };
  governance: {
    protectedPaths: string[];
    constraints: string[];
    version: string;
  };
  hash: string;
}

/**
 * Constraint Declaration (complete)
 */
export interface ConstraintDeclaration {
  id: string;
  version: string;
  type: ConstraintType;
  category: string;
  rule: string;
  scope: ConstraintScope;
  severity: ConstraintSeverity;
  owner: string;
  source: string;
  examples: {
    valid: string[];
    invalid: string[];
  };
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

/**
 * Constraint Registry Query Result
 */
export interface ConstraintQueryResult {
  constraints: ConstraintDeclaration[];
  total: number;
  filtered: number;
}

/**
 * Signature Comparison Result
 */
export interface SignatureComparisonResult {
  identical: boolean;
  differences: {
    type: 'added' | 'removed' | 'modified';
    path: string;
    description: string;
  }[];
  oldHash: string;
  newHash: string;
}
```

---

## 5. API Specifications

### 5.1 Constraint Registry API

**getAllConstraints()**
```typescript
/**
 * Retrieve all registered constraints
 */
export async function getAllConstraints(): Promise<ConstraintDeclaration[]>
```

**getConstraintById()**
```typescript
/**
 * Retrieve a specific constraint by ID
 */
export async function getConstraintById(id: string): Promise<ConstraintDeclaration | null>
```

**queryConstraints()**
```typescript
/**
 * Query constraints with filters
 */
export async function queryConstraints(filters: {
  type?: ConstraintType;
  severity?: ConstraintSeverity;
  scope?: string;
  owner?: string;
}): Promise<ConstraintQueryResult>
```

**validateConstraint()**
```typescript
/**
 * Validate a constraint declaration structure
 */
export function validateConstraint(constraint: ConstraintDeclaration): {
  valid: boolean;
  errors: string[];
}
```

### 5.2 Architecture Signature API

**generateArchitectureSignature()**
```typescript
/**
 * Generate architecture signature for current codebase state
 */
export async function generateArchitectureSignature(options?: {
  includeCommit?: boolean;
  includeBranch?: boolean;
}): Promise<ArchitectureSignature>
```

**compareSignatures()**
```typescript
/**
 * Compare two architecture signatures
 */
export function compareSignatures(
  oldSignature: ArchitectureSignature,
  newSignature: ArchitectureSignature
): SignatureComparisonResult
```

**hashSignature()**
```typescript
/**
 * Compute hash of an architecture signature
 */
export function hashSignature(signature: ArchitectureSignature): string
```

**loadSignatureFromFile()**
```typescript
/**
 * Load architecture signature from JSON file
 */
export async function loadSignatureFromFile(path: string): Promise<ArchitectureSignature>
```

**saveSignatureToFile()**
```typescript
/**
 * Save architecture signature to JSON file
 */
export async function saveSignatureToFile(
  signature: ArchitectureSignature,
  path: string
): Promise<void>
```

---

## 6. File Structure

```
/lib/foreman/constraints/
  ├── taxonomy.ts                 # Constraint taxonomy definitions
  ├── signature-engine.ts         # Architecture signature generation
  ├── registry.ts                 # Constraint registry (read-only)
  ├── index.ts                    # Public API exports
  └── utils/
      ├── hash.ts                 # Hashing utilities
      ├── sort.ts                 # Deterministic sorting
      └── validation.ts           # Validation utilities

/types/
  └── constraints.ts              # TypeScript type definitions

/foreman/constraints/
  ├── registry.json               # Constraint declarations
  └── README.md                   # Registry documentation

/tests/constraints/
  ├── taxonomy.test.ts            # Taxonomy tests
  ├── signature-engine.test.ts   # Signature engine tests
  ├── registry.test.ts            # Registry tests
  └── integration.test.ts         # Integration tests
```

---

## 7. Governance Integration

### 7.1 Constitutional Alignment

**Build Philosophy Compliance**:
- Architecture → Red QA → Build to Green (followed)
- 100% test coverage required
- No runtime enforcement in v1 (definition only)

**Governance Supremacy Rule (GSR)**:
- Protected paths are cataloged as governance constraints
- Constraint registry is read-only (no agent modification)
- All changes require CS2 approval for protected files

**Quality Integrity Contract (QIC)**:
- Deterministic signature generation
- Comprehensive validation
- Zero tolerance for ambiguity

### 7.2 Memory Fabric Integration

**Storage**:
- Architecture signatures stored in governance memory
- Constraint declarations stored in version control
- Drift detection results stored as memory entries

**Retention**:
- Signatures: 90 days (historical comparison)
- Constraints: Permanent (version controlled)
- Drift reports: 30 days (trend analysis)

---

## 8. Error Handling

### 8.1 Error Categories

**Validation Errors**:
- Invalid constraint declaration structure
- Missing required fields
- Invalid constraint scope
- Circular dependency in constraints

**Signature Generation Errors**:
- File system access failures
- Git repository access failures
- Hash computation failures
- Serialization errors

**Registry Errors**:
- Registry file not found
- Invalid JSON format
- Duplicate constraint IDs
- Version conflicts

### 8.2 Error Recovery

**Validation Errors** → Return detailed error messages, do not throw
**Signature Errors** → Log error, return partial signature with error markers
**Registry Errors** → Fail fast, require manual intervention (CS2)

### 8.3 Error Logging

All errors logged to governance memory with:
- Error type
- Error message
- Stack trace
- Context (file, function, parameters)
- Timestamp
- Severity

---

## 9. Performance Considerations

### 9.1 Performance Requirements

- Signature generation: < 5 seconds for typical codebase
- Registry query: < 100ms for any filter
- Constraint validation: < 10ms per constraint
- Hash computation: Deterministic, repeatable

### 9.2 Optimization Strategies

**Caching**:
- Cache file system scans
- Cache git commit information
- Cache computed hashes for unchanged files

**Incremental Processing**:
- Only re-scan changed files
- Only re-compute changed module signatures
- Only update affected portions of signature

**Parallel Processing**:
- Scan modules in parallel
- Hash files in parallel
- Validate constraints in parallel

---

## 10. Testing Architecture

### 10.1 Test Categories

**Unit Tests**:
- Constraint taxonomy structure validation
- Signature generation for individual modules
- Registry query operations
- Hash computation determinism
- Sorting algorithms

**Integration Tests**:
- End-to-end signature generation
- Registry loading and querying
- Signature comparison
- Multi-module dependency analysis

**Property-Based Tests**:
- Determinism: Same input → Same signature (always)
- Commutativity: Order-independent operations
- Idempotence: Multiple runs → Same result

**Regression Tests**:
- Known signature snapshots
- Version stability tests
- Breaking change detection

### 10.2 Test Data

**Fixtures**:
- Sample constraint declarations
- Sample architecture signatures
- Sample module structures
- Sample dependency graphs

**Mocks**:
- File system operations
- Git repository operations
- Registry storage operations

### 10.3 Test Coverage Requirements

- Line coverage: 100%
- Branch coverage: 100%
- Function coverage: 100%
- All public APIs tested
- All error paths tested
- All edge cases tested

---

## 11. Security Considerations

### 11.1 Security Requirements

**Data Protection**:
- No sensitive data in signatures
- No credentials in constraint declarations
- No PII in any constraint data

**Access Control**:
- Registry is read-only in Wave 3A
- Constraint modification requires CS2 approval
- Protected paths enforced at constraint level

**Input Validation**:
- All constraint declarations validated
- All file paths sanitized
- All user input validated

**Audit Trail**:
- All constraint operations logged
- All signature generations logged
- All validation failures logged

### 11.2 Secrets Management

- No secrets in constraint definitions
- No secrets in architecture signatures
- No secrets in registry storage
- All file paths relative (no absolute with credentials)

---

## 12. Deployment Considerations

### 12.1 Deployment Strategy

**Phase 1** (Wave 3A):
- Deploy types and models
- Deploy signature engine (read-only)
- Deploy registry (read-only)
- No enforcement, no blocking

**Phase 2** (Future waves):
- Add enforcement logic
- Add runtime validation
- Add auto-remediation
- Add blocking capabilities

### 12.2 Rollback Strategy

**If issues detected**:
1. Disable signature generation (no-op)
2. Return empty registry
3. Log all operations as no-op
4. Escalate to CS2

**Rollback triggers**:
- Signature generation takes > 30 seconds
- Registry access fails repeatedly
- Memory fabric integration fails
- Type errors in production

---

## 13. Documentation

### 13.1 Code Documentation

**All public APIs**:
- JSDoc comments with examples
- Parameter descriptions
- Return type descriptions
- Error conditions
- Usage examples

**All types**:
- TSDoc comments
- Field descriptions
- Valid value ranges
- Example values

### 13.2 Architecture Documentation

**Registry README**:
- How to read constraint declarations
- How to interpret constraint types
- How to query the registry
- When to escalate changes (CS2)

**Signature Engine README**:
- How signatures are generated
- What determinism means
- How to compare signatures
- How to interpret differences

---

## 14. Architecture Checklist Validation

### User Interface (UI) Architecture
- [ ] N/A - No UI components in Wave 3A

### API Architecture
- [x] **Endpoint Definition**: TypeScript function signatures defined
- [x] **Request Specification**: Parameters typed and documented
- [x] **Response Specification**: Return types fully specified
- [x] **Authentication & Authorization**: N/A - Internal library functions
- [x] **Data Validation**: Constraint validation function specified
- [x] **Error Handling**: All error scenarios documented
- [x] **Performance Considerations**: Performance requirements specified

### Data Architecture
- [x] **Schema Definition**: All types fully defined in `/types/constraints.ts`
- [x] **Relationships**: Module → Signature → Registry relationships clear
- [x] **Data Storage**: Registry stored in `/foreman/constraints/registry.json`
- [x] **Data Lifecycle**: Immutable in Wave 3A (read-only)
- [x] **Data Validation**: Validation functions specified
- [x] **Type Definition Completeness**: All types fully defined, no TODOs
- [x] **Data Migrations**: N/A - First version

### State Management Architecture
- [x] **State Location**: Registry in JSON file, signatures ephemeral
- [x] **State Shape**: All data structures fully typed
- [x] **State Operations**: Read-only in Wave 3A
- [x] **State Synchronization**: N/A - No server-client sync

### Integration Architecture
- [x] **Service Identification**: Memory Fabric integration specified
- [x] **Integration Points**: Governance memory for storage
- [x] **Error Handling**: Retry and fallback specified
- [x] **Configuration**: File paths and storage locations specified

### Security Architecture
- [x] **Authentication**: N/A - Internal library
- [x] **Authorization**: CS2 required for registry changes
- [x] **Data Protection**: No sensitive data in signatures
- [x] **Input Sanitization**: All inputs validated
- [x] **Secrets Management**: No secrets in constraint data

### Error Handling Architecture
- [x] **Error Types**: All error categories documented
- [x] **Error Detection**: Validation at all entry points
- [x] **Error Communication**: Error messages and codes specified
- [x] **Error Recovery**: Recovery strategies specified
- [x] **Error Logging**: Governance memory logging specified

### Performance Architecture
- [x] **Performance Requirements**: All timing requirements specified
- [x] **Optimization Strategies**: Caching and parallel processing specified
- [x] **Performance Monitoring**: N/A - No metrics in Wave 3A

### Testing Architecture
- [x] **Test Coverage Strategy**: 100% coverage requirement specified
- [x] **Test Data**: Fixtures and mocks specified
- [x] **Test Scenarios**: Unit, integration, property-based tests specified
- [x] **Test Infrastructure**: Jest, existing test infrastructure

### Deployment Architecture
- [x] **Build Configuration**: No special build requirements
- [x] **Deployment Strategy**: Phased deployment specified
- [x] **Environment Configuration**: File paths specified
- [x] **Post-Deployment**: Rollback strategy specified

### Documentation Architecture
- [x] **Code Documentation**: JSDoc/TSDoc required for all public APIs
- [x] **User Documentation**: Registry README specified
- [x] **Developer Documentation**: Architecture diagram included

**Result**: ✅ **ARCHITECTURE COMPLETE**

All relevant checklist items addressed. Architecture is comprehensive and ready for Red QA creation.

---

## 15. Acceptance Criteria

Wave 3A is complete when:

1. ✅ **Constraint Taxonomy Defined**
   - All three constraint types documented
   - Examples provided for each type
   - Clear categorization rules

2. ✅ **Architecture Signatures Implemented**
   - Deterministic generation verified
   - Version stability tested
   - Hash computation reproducible
   - Comparison logic functional

3. ✅ **Constraint Registry Operational**
   - Read-only access functional
   - Query operations working
   - Validation logic correct
   - Registry file structure valid

4. ✅ **Red QA → Green QA**
   - All tests initially RED (failing)
   - Implementation makes tests GREEN
   - 100% test pass rate
   - Zero errors, zero warnings

5. ✅ **Evidence Trail Complete**
   - Architecture documented
   - Checklist validated
   - Red QA evidence recorded
   - Green QA evidence recorded
   - Timeline integrity verified

---

## 16. Future Extensions (Out of Scope for Wave 3A)

**Wave 3B** (Constraint Enforcement):
- Runtime constraint validation
- Blocking on violations
- Automatic remediation suggestions

**Wave 3C** (Drift Detection):
- Longitudinal signature comparison
- Trend analysis
- Risk scoring
- Alerting

**Wave 3D** (Autonomous Evolution):
- Safe refactoring within constraints
- Constraint-aware code generation
- Architectural health monitoring

---

*This architecture is complete and ready for Red QA creation.*

**Version**: 1.0  
**Status**: Architecture Complete ✅  
**Next Phase**: Red QA Creation  
**Date**: 2025-12-13
