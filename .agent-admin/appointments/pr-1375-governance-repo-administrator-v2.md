# Bounded Appointment — governance-repo-administrator-v2 — PR #1375

**Appointment ID**: PR1375-GRA-V2-20260727  
**Issued**: 2026-07-27T11:55:32Z  
**Issued By**: foreman-v2 under direct CS2 authority — Johan Ras  
**Appointee**: governance-repo-administrator-v2  
**Agent Class**: administrator  
**Agent Version**: 6.2.0  
**Contract Version**: 2.0.0  
**Contract**: `.github/agents/governance-repo-administrator-v2.agent.md`  
**Contract SHA-256 at Appointment**: `55b87adf5794ceba832051caa3113fb01de0ea6ad8e21f8e4d12368ee585b961`  
**Repository**: APGI-cmy/maturion-foreman-governance  
**Issue**: #1374  
**PR**: #1375  
**Branch**: `repair/canon-inventory-provenance-1374`  
**Task-Set Commit**: `e45d0ba95d3052335dde5334b8afc79d25dd8339`  
**Independent IAA Pre-Brief Commit**: `c2ddd20234562bdb790cb767898777db6c81e41d`  
**Appointment Status**: ACTIVE ON PUBLICATION OF THIS RECORD TO THE PR BRANCH  
**Implementation Status at Appointment**: NOT STARTED

---

## Authority Chain

1. CS2 authorized the bounded canonical provenance repair and public governed PR evidence.
2. Issue #1374 defines the repair, non-goals, acceptance criteria, and required role order.
3. PR #1375 recorded its populated task set at `e45d0ba9…`.
4. Independent IAA classified every task and issued the Phase 0 pre-brief at `c2ddd202…`.
5. This later appointment delegates only the work defined below.

This record is a task-specific appointment. It does not amend the appointee's standing contract,
create general repository permissions, confer CS2 or Foreman authority, or authorize direct
pushes to `main`.

## Appointed Mission

Repair canonical CANON inventory commit provenance by proving deterministic Git-history
reconstruction and preservation, adding fail-closed regression coverage before implementation,
updating only the bounded governance-maintenance tooling and inventory, and returning a complete
evidence package for independent Foreman QP, ECAP, and final IAA.

## Authorized Task IDs

- TASK-1375-004 — administrator wake-up and frozen-contract preflight;
- TASK-1375-005 — QA-to-Red regression fixtures;
- TASK-1375-006 — deterministic provenance generation and preservation;
- TASK-1375-007 — fail-closed provenance validation;
- TASK-1375-008 — regenerate the existing 203-entry inventory;
- TASK-1375-009 — prove deterministic Green results and exact scope parity;
- TASK-1375-015 — governed ISMS layer-down only after canonical merge and main verification.

TASK-1375-015 is successor authority and remains dormant until Foreman records completion of
TASK-1375-014. This appointment does not authorize TASK-1375-016 or any ISMS feature work.

## Exact Task-Specific Write Boundary

The appointment permits changes only to these exact implementation/test paths:

- `scripts/regenerate_canon_inventory.py`
- `scripts/tests/test_regenerate_canon_inventory.py`
- `.github/scripts/validate-canon-hashes.sh`
- `.github/scripts/tests/test-canon-inventory-provenance.sh`
- `governance/CANON_INVENTORY.json`

It also permits creation of PR #1375 evidence and the appointee's required session records only
under:

- `.agent-admin/evidence/` with filenames explicitly scoped to PR #1375;
- `.agent-workspace/governance-repo-administrator/` for this appointment's session memory,
  escalation, and evidence;
- `.agent-workspace/parking-station/suggestions-log-governance-repo-administrator.md` for the
  mandatory learning suggestion, if changed.

The implementation/test paths above are a direct, task-specific CS2 grant for governance
maintenance tooling under Issue #1374. They are not application or production-runtime code and
do not expand the agent's standing contract. If any additional path is required, the appointee
must return `BLOCKED`; Foreman must obtain authority and refresh scope before that path is written.

## Mandatory Execution Order

1. Read the full appointee contract as the absolute first repository file.
2. Complete Tier 1/Tier 2 induction and FAIL-ONLY-ONCE attestation.
3. Run the canonical wake-up and independently verify any filename-resolution output.
4. Record the 203/203 missing provenance state as the authorized repair target, not as a waiver.
5. Perform read-only frozen-contract and Git-history feasibility checks.
6. Commit QA-to-Red fixtures in a discrete commit before modifying generator, validator, or
   inventory implementation.
7. Commit implementation and regenerated inventory only after RED evidence is captured.
8. Build to Green with repeatability, negative-boundary, per-entry commit/path/hash, and
   byte-identical deterministic-generation proof.
9. Return `COMPLETE` with evidence or `BLOCKED` with a precise escalation; no partial handover.
10. Do not tick tasks; Foreman alone updates the checklist after independent QP PASS.

## Required Proof Obligations

- all 203 entries have a verifiable 40-hex canonical commit SHA;
- each referenced commit exists in this repository;
- the declared path exists at that commit and hashes to the declared `file_hash_sha256`;
- generator output is byte-identical for a fixed repository state;
- a valid existing provenance value is preserved only when independently verifiable;
- missing, malformed, unknown, path-mismatched, and content-stale provenance fails closed;
- unrelated entries cannot receive a synthetic common `HEAD` value;
- no semantic canon or policy bytes change;
- no test is skipped, weakened, or rewritten to match implementation;
- exact changed-path and gate evidence is recorded on the returned head.

## Prohibitions

The appointee must not:

- modify any `.github/agents/` contract or agent-integrity baseline;
- modify semantic content under `governance/canon/` or `governance/policy/`;
- modify workflows, merge-gate policy, protected-path detection, or the inherited
  Admin-Ceremony historical evidence;
- hide, waive, suppress, or report the inherited Admin-Ceremony failure as Green;
- write outside the exact task-specific boundary;
- push directly to `main`, mark the PR ready, merge, close Issue #1374, or issue QP/ECAP/IAA
  verdicts;
- modify ISMS, MMM, Supabase, migrations, RLS, grants, runtime, deployment, or any live
  environment;
- begin TASK-1375-015 before canonical merge and post-merge verification;
- re-delegate this appointment or expand it at runtime.

## Stop Conditions

Return `BLOCKED` immediately if:

- the contract or registered agent identity does not match this appointment;
- a required change falls outside the exact write boundary;
- deterministic reconstruction cannot prove path and bytes at a canonical commit;
- the inherited gate defect prevents truthful exact-head evidence;
- any requested action conflicts with the IAA pre-brief, issue authority, or agent contract;
- CS2 authority becomes ambiguous.

## Handover Boundary

The appointee returns repository changes and evidence to Foreman for QP. It has no authority to
approve its own work, perform ECAP reconciliation, invoke or impersonate final IAA, authorize
handover, merge the PR, or resume ISMS PR #1973.

**Appointment Acceptance Requirement**: The appointee must begin its execution session by
validating this record, acknowledging the exact scope and prohibitions, and recording that
acknowledgment in its PR #1375 session memory.
