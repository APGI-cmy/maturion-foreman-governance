# Foreman Admin-Readiness Handback Summary Template

> **Usage**: Completed by the Foreman at the QP Admin-Compliance Checkpoint (§14.6 of FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md). Commit this as part of the handover evidence set, or embed in the PREHANDOVER proof / ECAP reconciliation summary. Required before IAA invocation for ECAP-involved jobs.

---

# Foreman Admin-Readiness Handback Summary

**Wave / Job**: [wave/job identifier]  
**Foreman Session**: session-NNN  
**ECAP Session**: ecap-session-NNN  
**Date**: YYYY-MM-DD  
**PR**: #[PR number]  
**Issue**: #[issue number]

---

## ECAP Reconciliation Artifacts Reviewed

| Artifact | Path | Reviewed |
|----------|------|---------|
| ECAP reconciliation summary | [path] | ✓/✗ |
| Artifact completeness table | [path or "embedded in reconciliation summary"] | ✓/✗ |
| Cross-artifact consistency table | [path or "embedded in reconciliation summary"] | ✓/✗ |
| Ripple assessment block | [path or "embedded" or "N/A — no PUBLIC_API changes"] | ✓/✗ |
| §4.3e gate run evidence | [path or "confirmed via ECAP reconciliation summary"] | ✓/✗ |

---

## Declared Exceptions Review

| # | Exception Declared by ECAP | Foreman Assessment |
|---|---------------------------|-------------------|
| 1 | [exception description or "None"] | ACCEPTABLE / UNACCEPTABLE / N/A |

**If any exception is UNACCEPTABLE**: The bundle must be returned to ECAP for resolution before this checkpoint can be accepted.

---

## Gate Inventory Verification (Step 4 — v1.5.0)

| Check | Result |
|-------|--------|
| Gate results JSON has individual per-gate entries (not only aggregate) | ✓/✗ |
| No provisional gate-pass wording in PREHANDOVER proof | ✓/✗ |
| Gate count in PREHANDOVER matches entries in gate results JSON | ✓/✗ |

## Pre-Final Instruction Wording Check (Step 5 — v1.5.0)

Template instruction scan output (must be empty for PASS):
```
[paste output of: grep -rniE "\[fill in\]|\[instruction\]|ASSEMBLY_TIME_ONLY|REMOVE BEFORE COMMIT" .agent-admin/prehandover/proof-*.md .agent-workspace/*/memory/session-*.md]
```
Result: PASS (no output) | BLOCKED (output exists — return to ECAP)

## Cross-Artifact Consistency (Step 6 — v1.5.0 — Active-Bundle Scoped)

| Dimension | PREHANDOVER Value | ECAP Reconciliation Value | Session Memory Value | Consistent? |
|-----------|------------------|--------------------------|----------------------|------------|
| final_state | COMPLETE | COMPLETE | (check latest only) | ✓/✗ |
| administrative_readiness | ACCEPTED | ACCEPTED | N/A | ✓/✗ |
| gate_verdict | PASS | PASS | N/A | ✓/✗ |

Active-bundle scope confirmed (historical archive excluded): ✓/✗

## Carried-Forward Claim Spot-Check (Step 7 — v1.5.0)

| Claim | Source File | Source Contains Claim? | Authority Changed? |
|-------|------------|----------------------|-------------------|
| [claim text or "None"] | [source path] | ✓/✗/N/A | ✓/✗/N/A |

---

## Checkpoint Verdict

| Field | Value |
|-------|-------|
| **substantive_readiness** | `ACCEPTED` \| `REJECTED` |
| **administrative_readiness** | `ACCEPTED` \| `REJECTED` |
| **QP admin-compliance check completed** | `yes` \| `no` |
| **IAA invocation authorized** | `yes` \| `no` |

**Rejection reason** *(if administrative_readiness = REJECTED)*:  
[State every reason precisely — these must be resolved by ECAP before re-submission]

---

## Post-Checkpoint Actions

| If administrative_readiness = ACCEPTED | If administrative_readiness = REJECTED |
|----------------------------------------|----------------------------------------|
| Proceed to §4.3e gate confirmation | Return bundle to ECAP with rejection reasons |
| Proceed to IAA invocation | Do NOT invoke IAA |
| Record this summary in PREHANDOVER proof | Re-run QP checkpoint after ECAP remediation |

---

*Template Version: 1.1.0 | Authority: FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md v1.5.0 §14.6 | Effective: 2026-04-19*
