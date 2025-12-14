# Orphaned QA Parking Station

## Purpose

This directory contains **Orphaned RED QA** — test artifacts that assert expected behavior but have **no active, authorized build task**.

## Constitutional Status

Per **Orphaned QA Parking, Watcher & Refactor Program**:

- Orphaned QA is NOT test debt
- Orphaned QA is NOT executable QA
- Orphaned QA is a **future contract**

## Rules

### 1. No Execution
- Files in this directory are **NOT executed by CI**
- Jest configuration explicitly excludes this directory
- No `describe.skip()` or skip-based mechanisms are permitted
- Parking is **structural, not logical**

### 2. Mandatory Metadata
Each parked QA artifact MUST include:
- `origin-subsystem`: The subsystem or module this test belongs to
- `intended-wave`: The wave or annex where this was originally planned
- `trigger-condition`: What capability or module must exist for reactivation
- `reason-for-parking`: Why this QA is orphaned
- `date-parked`: ISO timestamp when parked
- `owner`: Always "Foreman"
- `related-architecture`: Link to architecture doc if available

### 3. Watcher Monitoring
A watcher continuously monitors:
- Parked QA artifacts
- Repository state (modules, exports, architecture signatures)

The watcher triggers when:
- A referenced module path now exists
- A referenced interface or export appears
- An architecture signature indicates subsystem activation
- A feature flag or capability marker is enabled
- A new build task references the parked subsystem

### 4. Reactivation Protocol
When a watcher triggers:
1. A **Test Reactivation Incident** MUST be registered
2. Foreman MUST be notified
3. Execution MUST HALT if in progress
4. Orphaned QA MUST be reintroduced as ACTIVE RED QA
5. QA MUST be driven RED → GREEN under OPOJD
6. Execution resumes ONLY after resolution

No silent reactivation is permitted.

## Directory Structure

```
qa-parking/
└── orphaned/
    ├── README.md (this file)
    ├── metadata.json (master index of parked QA)
    ├── memory/ (parked memory tests)
    ├── longitudinal/ (parked longitudinal tests)
    ├── app/ (parked app tests)
    └── ... (other subsystems as needed)
```

## Adding New Orphaned QA

When parking RED QA:

1. Move the test file to the appropriate subdirectory under `qa-parking/orphaned/`
2. Update `metadata.json` with the required metadata
3. Ensure the file header includes parking documentation
4. Verify CI no longer executes the test

## Retrieving Orphaned QA

When reactivating parked QA:

1. Watcher detects trigger condition
2. Test Reactivation Incident is registered
3. Move test file back to `tests/` directory
4. Update `metadata.json` to mark as reactivated
5. Run as RED QA
6. Issue Build to Green instruction
7. Validate GREEN QA

## Auditing

All parked QA is:
- Visible in this directory
- Tracked in `metadata.json`
- Auditable via git history
- Monitored by the watcher

## Absolute Constraints

- Zero Test Debt remains absolute
- Test Dodging is prohibited
- Skipping is not an acceptable mechanism
- CI GREEN must reflect truthful executable QA only
- Orphaned QA must be visible, tracked, and watched
