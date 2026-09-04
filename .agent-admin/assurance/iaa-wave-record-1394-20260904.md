# IAA Wave Record — 1394 — 2026-09-04

## PRE-BRIEF

# IAA Pre-Brief — Wave 1394 — Canonical ECAP Bootstrap Capability

**IAA Session**: IAA-20260904-PREBRIEF-WAVE1394
**Wave**: 1394 (`canonical-ecap-capability-1394`)
**Date**: 2026-09-04
**Wave Task List**: `.agent-admin/waves/wave-1394-current-tasks.md`
**PR scope**: #1395 at HEAD `0670a0cfa0a8f579be95f154402af11bde9245a0`
**Authority**: CS2 Issue #1394 explicit ECAP appointment authorization and Foreman STOP-AND-FIX instruction to remediate `CHECKLIST-GATE-005` by independent IAA Pre-Brief issuance; `IAA_PRE_BRIEF_PROTOCOL.md` v1.2.2
**Status**: ACTIVE — late initial Pre-Brief, limited to the stated `CHECKLIST-GATE-005` remediation

## PRE-BRIEF-ONLY State

This is a proactive, late-issued requirements declaration. It is neither a verdict, a token,
an assurance, nor a substantive conclusion about Issue #1394, PR #1395, its evidence, its
implementation, its gates, or its readiness. No final audit, phase execution, gate-parity
determination, or pass/fail finding has been performed by this record.

No earlier Pre-Brief exists for this wave at the stated HEAD. This is therefore an initial
late Pre-Brief, not an amendment to a prior Pre-Brief. Its late issuance is accepted only
under the explicit CS2-authorized, bounded remediation instruction above; it does not alter
the requirement for a later independent final invocation.

## Wave Summary

Wave 1394 records the bounded canonical ECAP bootstrap capability described by CS2 Issue
#1394 and scoped in PR #1395. The checklist identifies an ECAP agent contract and integrity
mirror, an ECAP Tier 2 bundle and Foreman appointment template, static bootstrap identity
resolution with regression coverage, and the administrative records for the re-entry path.
This Pre-Brief declares the future-review evidence expectations for the qualifying checklist
tasks only; it does not evaluate whether any listed item satisfies them.

## Reviewed Evidence Register

The following were read solely to establish scope and declare future-review requirements:

- `.agent-admin/waves/wave-1394-current-tasks.md`
- `.agent-admin/scope-declarations/pr-1395.md`
- `.admin/pr.json`
- `.agent-admin/assurance/rejection-package-1395.md`
- `.agent-admin/prehandover/proof-issue-1394-ecap-capability-reentry-3-20260904.md`
- `governance/canon/IAA_PRE_BRIEF_PROTOCOL.md` v1.2.2
- `.agent-workspace/independent-assurance-agent/knowledge/iaa-trigger-table.md` v2.2.1
- `.agent-workspace/independent-assurance-agent/knowledge/iaa-category-overlays.md` v2.3.0
- PR #1395 stated HEAD `0670a0cfa0a8f579be95f154402af11bde9245a0`

## Qualifying Task Declarations

The source checklist contains no task IDs or metadata blocks. The identifiers below are
issuer-assigned, ordinal references that preserve each source checklist line verbatim in
meaning. Tasks 01, 03, and 09 do not independently match a Trigger Table qualifying category;
they are listed in **Limitations and Coverage** and are not silently omitted.

### Task ID: W1394-02

**Task summary**: Create canonical ECAP contract, integrity mirror, and Tier 2 bundle.
**IAA trigger category**: AGENT_CONTRACT; AGENT_INTEGRITY; KNOWLEDGE_GOVERNANCE (MIXED PR).
**Required phases at later invocation**: 1, 2, 3, 4.
**Required evidence artifacts**:
- `.github/agents/execution-ceremony-admin-agent.md`
- `governance/quality/agent-integrity/execution-ceremony-admin-agent.md`
- `governance/quality/agent-integrity/INTEGRITY_INDEX.md`
- `.agent-workspace/execution-ceremony-admin-agent/knowledge/index.md` and its declared Tier 2 files
- `.agent-admin/prehandover/proof-issue-1394-ecap-capability-*.md`
- `.agent-admin/scope-declarations/pr-1395.md` and `.admin/pr.json`
**Applicable overlays**: AGENT_CONTRACT (OVL-AC-001–012); AGENT_INTEGRITY (OVL-AI-001–003);
KNOWLEDGE_GOVERNANCE (OVL-KG-001–005).
**Specific rules**: FAIL-ONLY-ONCE A-001, A-002, A-005, and A-015; CORE-020 and CORE-021.
**Notes**: Exact integrity-reference parity, Tier 2 completeness, explicit CS2 authorization,
and the contract’s constitutional boundaries are declared future-review subjects.

### Task ID: W1394-04

**Task summary**: Create the fresh Foreman PR-scoped appointment template without changing
historical ECAP artifacts.
**IAA trigger category**: KNOWLEDGE_GOVERNANCE.
**Required phases at later invocation**: 1, 2, 3, 4.
**Required evidence artifacts**:
- `.agent-workspace/execution-ceremony-admin-agent/knowledge/foreman-pr-scoped-appointment-template.md`
- `.agent-workspace/execution-ceremony-admin-agent/knowledge/index.md`
- `.agent-admin/prehandover/proof-issue-1394-ecap-capability-*.md`
- `.agent-admin/scope-declarations/pr-1395.md`
**Applicable overlays**: KNOWLEDGE_GOVERNANCE (OVL-KG-001–005).
**Specific rules**: FAIL-ONLY-ONCE A-015; CORE-020 and CORE-021.
**Notes**: Future review must distinguish the fresh, PR-scoped template from historical ECAP
artifacts and must verify the declared knowledge/index relationships.

### Task ID: W1394-05

**Task summary**: Record PR manifest, scope parity, diff record, and pre-IAA evidence.
**IAA trigger category**: AGENT_ADMIN_ARTIFACT (within a MIXED PR).
**Required phases at later invocation**: 1, 2, 3, 4.
**Required evidence artifacts**:
- `.admin/pr.json`
- `.agent-admin/scope-declarations/pr-1395.md`
- `.agent-admin/governance/agent-contract-diffs/diff-20260904-execution-ceremony-admin-agent-issue-1394.md`
- `.agent-admin/prehandover/proof-issue-1394-ecap-capability-*.md`
**Applicable overlays**: No standalone AGENT_ADMIN_ARTIFACT overlay is defined; apply the
applicable MIXED-PR category overlays and CORE-020/CORE-021 at the later invocation.
**Specific rules**: FAIL-ONLY-ONCE A-001, A-015, and A-016; CORE-020 and CORE-021.
**Notes**: Future review must establish cross-artifact scope and identity consistency from
evidence, without treating administrative declarations as a substitute for independent review.

### Task ID: W1394-06

**Task summary**: Address the first two independent rejection packages with immutable
re-entry records.
**IAA trigger category**: AGENT_ADMIN_ARTIFACT (within a MIXED PR).
**Required phases at later invocation**: 1, 2, 3, 4.
**Required evidence artifacts**:
- `.agent-admin/assurance/rejection-package-1395.md`
- `.agent-admin/assurance/correction-addendum-session-021-wave1-20260904.md`
- `.agent-admin/assurance/correction-addendum-session-022-wave2-20260904.md`
- `.agent-admin/prehandover/proof-issue-1394-ecap-capability-reentry-*.md`
**Applicable overlays**: No standalone AGENT_ADMIN_ARTIFACT overlay is defined; apply the
applicable MIXED-PR category overlays and CORE-020/CORE-021 at the later invocation.
**Specific rules**: FAIL-ONLY-ONCE A-001, A-006, A-015, and A-016; CORE-020 and CORE-021.
**Notes**: Future review must verify re-entry evidence without editing immutable prior proof
artifacts and without accepting a self-certified IAA outcome.

### Task ID: W1394-07

**Task summary**: Acknowledge CHECKLIST-GATE-001 and add this issue-specific current-task
checklist.
**IAA trigger category**: AGENT_ADMIN_ARTIFACT (within a MIXED PR).
**Required phases at later invocation**: 1, 2, 3, 4.
**Required evidence artifacts**:
- `.agent-admin/waves/wave-1394-current-tasks.md`
- `.agent-admin/assurance/rejection-package-1395.md`
- `.agent-admin/prehandover/proof-issue-1394-ecap-capability-reentry-3-20260904.md`
**Applicable overlays**: No standalone AGENT_ADMIN_ARTIFACT overlay is defined; apply the
applicable MIXED-PR category overlays and CORE-020/CORE-021 at the later invocation.
**Specific rules**: `CHECKLIST-GATE-001` through `CHECKLIST-GATE-005`; CORE-020 and CORE-021.
**Notes**: Future review must cross-reference every qualifying checklist task against this
active Pre-Brief before commencing a final review.

### Task ID: W1394-08

**Task summary**: Freeze the current re-entry proof with
`wave_checklist.status: ALL_TICKED`.
**IAA trigger category**: AGENT_ADMIN_ARTIFACT (within a MIXED PR).
**Required phases at later invocation**: 1, 2, 3, 4.
**Required evidence artifacts**:
- `.agent-admin/prehandover/proof-issue-1394-ecap-capability-reentry-3-20260904.md`
- `.agent-admin/waves/wave-1394-current-tasks.md`
- `.agent-admin/assurance/rejection-package-1395.md`
**Applicable overlays**: No standalone AGENT_ADMIN_ARTIFACT overlay is defined; apply the
applicable MIXED-PR category overlays and CORE-020/CORE-021 at the later invocation.
**Specific rules**: `CHECKLIST-GATE-001` through `CHECKLIST-GATE-005`; CORE-020 and CORE-021.
**Notes**: The declared `ALL_TICKED` value is an item for later corroboration, not a finding
made by this Pre-Brief.

## Limitations and Coverage

- This record was issued after the checklist and pre-IAA re-entry records already existed.
  It does not reconstruct or validate prior wave-start timing.
- The checklist does not provide the protocol’s per-task IDs, builders, QP verdicts, or
  metadata blocks. Issuer-assigned identifiers are used above only for traceability.
- Checklist task 01 (CS2 authority/scope confirmation), task 03 (static bootstrap identity
  implementation, regression coverage, and documentation), and task 09 (obtaining a later
  independent IAA result) do not independently fall in a Trigger Table qualifying category.
  They remain within the overall MIXED PR context but are not represented as qualifying
  Pre-Brief declarations.
- The reviewed evidence register is a reading record, not corroboration, validation, or a
  conclusion about its contents.
- The active Pre-Brief must be referenced by a subsequent immutable PREHANDOVER proof before
  any later final IAA invocation. This record neither changes that proof nor supplies any
  final-review output.

## Declaration

The requirements above are the only Pre-Brief declarations issued in this bounded action.
They establish the task-to-requirement mapping needed to remediate `CHECKLIST-GATE-005` and
must be cross-referenced if an independent final IAA invocation occurs. They do not grant a
waiver, release, determination, or conclusion of any kind.

**IAA signature**: IAA-20260904-PREBRIEF-WAVE1394
