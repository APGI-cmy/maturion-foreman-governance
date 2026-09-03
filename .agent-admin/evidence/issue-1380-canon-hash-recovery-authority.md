# Issue #1380 Authority and Bootstrap-Remediation Record

**Date**: 2026-09-03  
**Repository**: `APGI-cmy/maturion-foreman-governance`  
**Issue**: #1380 — Reconcile CANON-HASH-001 provenance for interim-CS2 automation canon  
**PR**: #1383  
**Branch**: `apgi-cmy-canonical-hash-recovery`  
**Base**: `cs2/bootstrap-recovery` (draft PR #1381)  
**Authority**: CS2, via Issue #1380 and the explicit bootstrap-remediation waiver

## Authorized Scope

1. Establish the provenance of the current bytes of
   `governance/canon/INTERIM_CS2_AMC_AUTOMATION_GOVERNANCE.md`.
2. Update the corresponding `canonical_commit` entry in
   `governance/CANON_INVENTORY.json` when evidence identifies the path-specific
   content-producing commit.
3. Make `.github/scripts/validate-canon-hashes.sh` open the inventory as UTF-8.
4. Add the evidence required for this governed draft PR.

## Bootstrap Exception

The original Phase 1 invocation of CANON-HASH-001 could not parse the UTF-8
inventory on this Windows host because Python selected CP1252 by default. CS2
authorized the isolated inventory-open encoding correction despite that
self-blocking preflight defect. The wake-up protocol's generated working,
health, and memory-archive changes were restored before implementation.

## Exclusions Preserved

No canon-content change, agent-contract change, controller, workflow, ISMS
layer-down, trigger, MMM code, or runtime activation is authorized or included.

## Assurance State

IAA and ECAP are required before merge readiness. This record is not an ECAP
result, IAA verdict, assurance token, PREHANDOVER proof, activation claim, or
merge-readiness claim.
