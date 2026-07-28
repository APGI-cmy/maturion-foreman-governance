# Issue #1374 — CANON Inventory Provenance Repair Authority and Blocker Evidence

STATUS: AUTHORIZED — GOVERNED REPAIR LANE OPEN  
DATE_UTC: 2026-07-27  
REPOSITORY: APGI-cmy/maturion-foreman-governance  
ISSUE: #1374  
BRANCH: repair/canon-inventory-provenance-1374  
BASELINE_MAIN: 91ace34412e34836e3db5aa4373ea45409fff7c1  
OWNER_AUTHORITY: CS2 — Johan Ras  
IMPLEMENTATION_STATUS: NOT STARTED  
IAA_STATUS: PRE-BRIEF PENDING  
MERGE_AUTHORITY: CS2 ONLY

## Public CS2 Authorization

> Authorized—publish the bounded CANON provenance repair issue and related governed PR evidence in the public APGI-cmy/maturion-foreman-governance repository.

Authorization was issued by Johan Ras on 2026-07-27 after the canonical upstream repository was confirmed as the defect source.

## Trigger and Dependency

The schema-builder lane on APGI-cmy/maturion-isms PR #1973 halted during canonical wake-up before migration generation or test implementation.

The blocking condition is upstream:

- `governance/CANON_INVENTORY.json` has 203 entries;
- all 203 entries lack canonical commit-SHA provenance;
- `scripts/regenerate_canon_inventory.py` writes hashes and metadata but does not resolve or preserve per-entry canonical commit provenance;
- `governance/canon/CANON_INVENTORY_INTEGRITY_REQUIREMENTS.md` requires missing provenance to force degraded mode and block merge/build work.

Consumer-only reconstruction is prohibited because it would fabricate authority and drift from the canonical repository.

## Bounded Responsibility

This repair lane is responsible only for:

1. provenance-aware generation and validation;
2. deterministic reconstruction from canonical Git history;
3. executable negative and preservation regressions;
4. regeneration of the existing 203-entry inventory;
5. governed quality, ECAP, and independent IAA evidence;
6. post-merge layer-down to ISMS.

## Explicit Exclusions

This lane does not authorize:

- semantic edits to canon or policy documents;
- changes to any agent contract;
- MMM runtime, helper, policy, grant, migration, or test implementation;
- Supabase or other live-environment mutation;
- weakening or bypassing degraded-mode validation;
- direct pushes to `main`;
- resumption of ISMS PR #1973 before canonical merge, verification, and layer-down.

## Required Role and Commit Order

1. Publish issue and initial authority/blocker carrier.
2. Open draft PR.
3. Add the PR-numbered immutable scope declaration.
4. Create the PR task set.
5. Obtain an independent IAA pre-brief.
6. Record a bounded `governance-repo-administrator-v2` appointment.
7. Commit QA-to-Red / negative fixtures before implementation.
8. Implement and build to Green.
9. Foreman QP, ECAP administrative reconciliation, PREHANDOVER, and independent final IAA.
10. CS2 disposition and post-merge verification.

No implementation role is appointed by this carrier.

## Initial Evidence Assertions

- Canon inventory entry count: 203.
- Missing canonical commit provenance: 203/203.
- Full SHA-256 artifact hashes remain present.
- Current canonical generator has no provenance resolution/preservation mechanism.
- Issue #1374 contains the authoritative detailed acceptance criteria and successor dependency.
- ISMS PR #1973 remains draft, blocked, and implementation-free.

## Current Handover State

This is an initial issue-scoped authority and blocker carrier only. It is not a QP verdict, ECAP result, PREHANDOVER proof, IAA verdict, assurance token, merge-readiness claim, or implementation authorization.
