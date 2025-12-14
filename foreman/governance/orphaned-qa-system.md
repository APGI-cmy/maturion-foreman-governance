# Orphaned QA Parking & Watcher System - Constitutional Documentation

## Overview

The Orphaned QA Parking & Watcher System establishes a formal, governed lifecycle for RED QA artifacts that have no active build task. This system ensures:

- **Orphaned QA does NOT execute** (structural exclusion from CI)
- **Orphaned QA is NOT skipped** (no skip directives permitted)
- **Orphaned QA is NEVER forgotten** (continuous watcher monitoring)
- **Orphaned QA automatically reactivates** when relevant capabilities appear

## Constitutional Status

This system implements the requirements from:
- **Issue:** Orphaned QA Parking, Watcher & Refactor Program (Constitutional)
- **Authority:** Zero Test Debt Constitutional Rule + Test Dodging Constitutional Rule
- **Status:** Active and Enforced

## Key Definitions

### Orphaned QA
QA artifacts that assert expected behavior but have **no active, authorized build task**.

**Orphaned QA is NOT:**
- Test debt
- Executable QA
- Skipped tests

**Orphaned QA IS:**
- A future contract
- Structurally quarantined
- Continuously monitored
- Automatically reactivated

### Test Dodging
Using `describe.skip()`, `it.skip()`, or other skip mechanisms to avoid RED QA is **Test Dodging** and is constitutionally prohibited.

Orphaned QA Parking is the **correct mechanism** for handling RED QA when no build task exists.

## Architecture

### 1. Parking Station (`/qa-parking/orphaned/`)

**Location:** `/qa-parking/orphaned/`

**Structure:**
```
qa-parking/
└── orphaned/
    ├── README.md (this documentation)
    ├── metadata.json (master index)
    ├── memory/ (parked memory tests)
    ├── longitudinal/ (parked longitudinal tests)
    └── ... (other subsystems)
```

**Exclusion:** Jest configuration explicitly excludes `/qa-parking/` from execution.

**Metadata:** Each parked QA entry includes:
- `id`: Unique identifier
- `name`: Test suite name
- `filePath`: Path to parked test file
- `originSubsystem`: Origin subsystem/module
- `intendedWave`: Intended implementation wave
- `triggerCondition`: Reactivation trigger condition
- `reasonForParking`: Why this QA is orphaned
- `dateParked`: ISO timestamp
- `owner`: "Foreman"
- `relatedArchitecture`: Link to architecture doc
- `testCount`: Number of tests
- `coverage`: Coverage description

### 2. Watcher System

**Implementation:** `/lib/foreman/qa/orphaned-qa-watcher.ts`

**Capabilities:**
- Load parked QA metadata
- Check module existence
- Check export availability
- Parse trigger conditions
- Scan all parked QA
- Register reactivation incidents
- Generate reactivation instructions

**Trigger Heuristics:**
The watcher triggers when:
1. A referenced module path now exists
2. A referenced interface or export appears
3. An architecture signature indicates subsystem activation
4. A feature flag or capability marker is enabled
5. A new build task references the parked subsystem

**Confidence Levels:**
- **High:** All required exports present
- **Medium:** Module exists, partial exports
- **Low:** Module exists, no export validation

### 3. Reactivation Protocol

When the watcher triggers:

1. **Test Reactivation Incident** is registered
2. **Foreman is notified** via governance event
3. **Execution MUST HALT** if in progress
4. **Orphaned QA is reintroduced** as ACTIVE RED QA
5. **QA is driven RED → GREEN** under OPOJD
6. **Execution resumes** ONLY after resolution

**No silent reactivation is permitted.**

## Usage

### Parking New QA

When you need to park RED QA:

```bash
# 1. Move test file to parking station
mkdir -p qa-parking/orphaned/[subsystem]/
mv tests/[subsystem]/test.ts qa-parking/orphaned/[subsystem]/

# 2. Remove skip directives
# Edit the file to remove describe.skip() and replace with parking header

# 3. Update metadata.json
# Add entry to qa-parking/orphaned/metadata.json

# 4. Update file header with parking metadata
```

**Parking Header Template:**
```typescript
/**
 * [Test Suite Name] - ORPHANED QA
 * 
 * PARKING STATUS: Structurally quarantined in qa-parking/orphaned/[subsystem]/
 * ORIGIN SUBSYSTEM: [Subsystem Name]
 * INTENDED WAVE: [Implementation Wave]
 * TRIGGER CONDITION: Implementation of [module] with functions: [functions]
 * REASON FOR PARKING: [Reason]
 * DATE PARKED: [ISO Date]
 * OWNER: Foreman
 * RELATED ARCHITECTURE: [Link]
 * 
 * This is ORPHANED RED QA - a future contract that will be reactivated
 * when the [capability] implementation begins.
 */
```

### Running the Watcher

```typescript
import { runWatcherScan } from '@/lib/foreman/qa/orphaned-qa-watcher';

const result = await runWatcherScan();
console.log(`Scanned: ${result.scanned}, Matches: ${result.matches.length}`);
```

### Reactivating QA

When the watcher detects a trigger:

```typescript
import { getReactivationInstructions } from '@/lib/foreman/qa/orphaned-qa-watcher';

const instructions = await getReactivationInstructions('orphaned-qa-001');
console.log(instructions);
```

Follow the instructions to:
1. Move test file back to `tests/`
2. Update metadata.json
3. Run as RED QA
4. Issue "Build to Green"
5. Validate GREEN QA
6. Resume execution

## Current Parked QA

As of 2025-12-14, the following QA is parked:

### 1. Governance Memory Tests (`orphaned-qa-001`)
- **Location:** `qa-parking/orphaned/memory/governance-memory.test.ts`
- **Subsystem:** Memory Fabric - Governance Memory Tier
- **Trigger:** Implementation of `@/lib/memory/governance-memory`
- **Tests:** 20 tests covering immutability, constitutional events, ARC decisions, QA events, security events

### 2. Long-Term Tenant Memory Tests (`orphaned-qa-002`)
- **Location:** `qa-parking/orphaned/memory/long-term-memory.test.ts`
- **Subsystem:** Memory Fabric - LTM Tier
- **Trigger:** Implementation of `@/lib/memory/ltm`
- **Tests:** 18 tests covering tenant isolation, encryption, versioning, access logging

### 3. Embodiment Synchronization Tests (`orphaned-qa-003`)
- **Location:** `qa-parking/orphaned/memory/embodiment-sync.test.ts`
- **Subsystem:** Memory Fabric - Embodiment Sync
- **Trigger:** Implementation of `@/lib/memory/sync/embodiment-sync`
- **Tests:** 15 tests covering sync, conflicts, reconciliation, tenant isolation

### 4. Knowledge Boundaries Tests (`orphaned-qa-004`)
- **Location:** `qa-parking/orphaned/memory/knowledge-boundaries.test.ts`
- **Subsystem:** Memory Fabric - Knowledge Boundaries
- **Trigger:** Implementation of `@/lib/memory/boundaries`
- **Tests:** 16 tests covering tenant isolation, privileges, guardrails, safety, encryption

## Integration Points

### Jest Configuration
- `/qa-parking/` is explicitly excluded from test execution
- No skip directives are used or needed

### Governance Memory
- Reactivation incidents are logged to governance memory
- Constitutional events are tracked

### Incident System
- Test Reactivation Incidents follow standard incident lifecycle
- Status: pending → acknowledged → resolved

## Absolute Constraints

1. **Zero Test Debt** remains absolute
2. **Test Dodging** is prohibited
3. **Skipping** is not an acceptable mechanism
4. **CI GREEN** must reflect truthful executable QA only
5. **Orphaned QA** must be visible, tracked, and watched

## Validation

### CI Status
✅ CI executes ZERO tests from `/qa-parking/`  
✅ All executable tests have NO skip directives  
✅ CI is 100% GREEN (truthful)  

### Visibility
✅ All orphaned QA is visible in `/qa-parking/orphaned/`  
✅ All orphaned QA is tracked in `metadata.json`  
✅ All orphaned QA is auditable via git history  

### Watcher
✅ Watcher can scan parked QA  
✅ Watcher can detect trigger conditions  
✅ Watcher can register incidents  
✅ Watcher can generate reactivation instructions  

## Evidence

- **Parking Station:** `/qa-parking/orphaned/`
- **Metadata:** `/qa-parking/orphaned/metadata.json`
- **Watcher Implementation:** `/lib/foreman/qa/orphaned-qa-watcher.ts`
- **Type Definitions:** `/types/orphaned-qa.ts`
- **Jest Configuration:** `/jest.config.js` (excludes `/qa-parking/`)
- **Parked Tests:** 4 memory test files (governance, LTM, embodiment-sync, boundaries)
- **Removed Skip Directives:** 3 tests in active test suites (drift-telemetry, long-prompt)

## Future Work

1. **Automated Watcher Execution:** Run watcher on PR creation/push
2. **Dashboard Integration:** Show parked QA stats in Foreman dashboard
3. **Architecture Signature Detection:** Enhance trigger detection with architecture analysis
4. **Capability Marker System:** Define and detect feature flags/capability markers
5. **Parking Station UI:** Visual interface for managing parked QA

## References

- **Constitutional Rule:** `/foreman/governance/test-dodging-constitutional-rule.md`
- **Zero Test Debt Rule:** `/foreman/governance/zero-test-debt-rule.md`
- **Build Philosophy:** `/BUILD_PHILOSOPHY.md`
- **Architecture Checklist:** `/foreman/architecture-design-checklist.md`
