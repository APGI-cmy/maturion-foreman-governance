# ECAP Reconciliation Summary Template

> **Usage**: Copy to `.agent-admin/prehandover/ecap-reconciliation-<PR#>.md`, or embed in the PREHANDOVER proof. Required for every ECAP-involved job. Completing this template satisfies the ECAP reconciliation artifact requirement in §4.3e Check A4.

---

# ECAP Reconciliation Summary — [Wave/Job Identifier]

**Issue**: #[issue number]  
**PR**: #[PR number or "not yet created"]  
**Wave**: [wave identifier]  
**Branch**: [branch name]  
**ECAP Session**: ecap-session-NNN  
**Foreman Session**: session-NNN  
**Final IAA Session Reference**: [IAA session ID or "pending"]  
**Final Token Reference**: [token file path or "pending"]  
**Date**: YYYY-MM-DD

---

## C1. Final-State Declaration

**Final State**: `COMPLETE`  
*(Must be COMPLETE before this summary is considered valid. A summary with any other value is a non-final draft.)*

| Dimension | Status |
|-----------|--------|
| Substantive readiness | ACCEPTED by Foreman |
| Administrative readiness | ACCEPTED (this summary) |
| IAA assurance verdict | ASSURANCE-TOKEN / PENDING |
| Ripple status | COMPLETED / DEFERRED / NOT-APPLICABLE |
| Admin-compliance result | PASS |

---

## C2. Artifact Completeness Table

| Artifact Class | Required Path | Present | Committed | Final-State Normalized | Notes / Exception |
|---------------|--------------|---------|-----------|----------------------|------------------|
| PREHANDOVER proof | `.agent-admin/prehandover/proof-<PR#>.md` | ✓/✗ | ✓/✗ | ✓/✗ | |
| Session memory | `.agent-workspace/<agent>/memory/session-NNN-YYYYMMDD.md` | ✓/✗ | ✓/✗ | ✓/✗ | |
| Gate results (JSON) | `.agent-admin/gates/gate-results-<TIMESTAMP>.json` | ✓/✗ | ✓/✗ | ✓/✗ | |
| ECAP reconciliation summary (this file) | `.agent-admin/prehandover/ecap-reconciliation-<PR#>.md` | ✓/✗ | ✓/✗ | ✓/✗ | |
| Scope declaration | `governance/scope-declaration.md` | ✓/✗ | ✓/✗ | ✓/✗ | |
| IAA token file (if assurance completed) | `.agent-admin/assurance/iaa-token-*.md` | ✓/✗/N/A | ✓/✗/N/A | ✓/✗/N/A | |

---

## C3. Cross-Artifact Consistency Table

| Row | Consistency Dimension | Source Value | Verified Against | Match |
|-----|-----------------------|-------------|-----------------|-------|
| Session reference | Session ID | `session-NNN` (PREHANDOVER) | Session memory filename, wave record | ✓/✗ |
| Token reference | Token path + session | `<token path>` (PREHANDOVER `iaa_audit_token`) | Token file at declared path | ✓/✗ |
| Issue/PR/wave | Issue #, PR #, wave ID | PREHANDOVER fields | Session memory, scope declaration | ✓/✗ |
| Version consistency | Each amended file version | File headers | CANON_INVENTORY entries | ✓/✗ |
| Path consistency | Artifact paths | PREHANDOVER artifact list | `git ls-files` | ✓/✗ |
| Status consistency | Final state | PREHANDOVER `final_state: COMPLETE` | Session memory final status, gate results verdict | ✓/✗ |
| Scope declaration parity | `FILES_CHANGED` count | Scope declaration count | `git diff --name-only \| wc -l` | ✓/✗ |
| Committed-state parity | All artifacts committed | PREHANDOVER artifact list | `git ls-files --error-unmatch` for each | ✓/✗ |

---

## C4. Ripple Assessment Block

| Field | Value |
|-------|-------|
| PUBLIC_API changed? | YES / NO |
| Layer-down required? | YES / NO |
| Inventory / registry update required? | YES / NO |
| Status | COMPLETED / DEFERRED / NOT-APPLICABLE |
| Linked downstream issue/PR (if deferred) | #[issue] or "none" |
| Notes | [detail or "none"] |

**Files with PUBLIC_API status changed in this PR:**

| File | CANON_INVENTORY layer_down_status | Ripple Action |
|------|----------------------------------|--------------|
| [path] | PUBLIC_API | [action taken or deferred reason] |

*(If no PUBLIC_API files changed: "No PUBLIC_API files changed in this PR. Ripple obligation: NOT-APPLICABLE.")*

---

## C5. Foreman Administrative Readiness Block

> Completed by the Foreman at the QP Admin-Compliance Checkpoint (§14.6):

| Field | Value |
|-------|-------|
| substantive_readiness | ACCEPTED / REJECTED |
| administrative_readiness | ACCEPTED / REJECTED |
| QP admin-compliance check completed | yes / no |
| IAA invocation authorized | yes / no |
| Rejection reason (if REJECTED) | [state reasons or "N/A"] |
| Foreman Session | session-NNN |
| Checkpoint Date | YYYY-MM-DD |

---

## C6. Gate Inventory (AAP-15 — required when gate parity claimed)

> **Active-Bundle Only**: Fill this section based on gate results for the current job only.

| Gate | Individual Outcome | Evidence Source |
|------|--------------------|----------------|
| merge-gate/verdict | PASS / FAIL | `.agent-admin/gates/gate-results-<TIMESTAMP>.json` |
| governance/alignment | PASS / FAIL / DEGRADED | gate results JSON |
| stop-and-fix/enforcement | PASS / FAIL | gate results JSON |
| *(add additional gates as applicable)* | | |

**Gate inventory source**: `.agent-admin/gates/gate-results-<TIMESTAMP>.json`  
**Aggregate verdict**: PASS (all above PASS) / FAIL (at least one FAIL)

No provisional gate-pass wording confirmed: ✓/✗

---

## C7. Template Non-Leakage Confirmation (AAP-17, AAP-21)

Template instruction leakage scan:
```bash
grep -rniE "\[fill in\]|\[instruction\]|ASSEMBLY_TIME_ONLY|REMOVE BEFORE COMMIT|replace this with|EXAMPLE TEXT" \
  .agent-admin/prehandover/ .agent-workspace/*/memory/session-*.md 2>/dev/null
```

Result: `[PASTE ACTUAL OUTPUT — empty = PASS]`

Confirmation: No ASSEMBLY_TIME_ONLY blocks, no [fill in] placeholders, no template instruction text in active-bundle artifacts. ✓/✗

---

*Template Version: 1.1.0 | Authority: ECAP-001 v1.2.0 | Effective: 2026-04-19*
