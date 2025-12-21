# Governance Bootstrap PR Declaration — PR #680

## Status
**PR Number:** #680  
**Branch:** copilot/cleanup-evidence-folder-structure  
**Classification:** Governance Bootstrap PR  
**Authorization:** Johan Ras (2025-12-21)  
**Override Type:** One-time, temporary FM enforcement bypass

---

## Purpose

This document declares PR #680 as a **Governance Bootstrap PR** and authorizes
temporary bypass of FM-level enforcement gates that depend on non-initialized
FM evidence artifacts.

---

## Context

PR #680 introduces new governance canon that mandates:
- Learning intake & promotion (via `LEARNING_INTAKE_AND_PROMOTION_MODEL.md`)
- Failure recording and enforcement
- Non-stalling escalation behavior (via `ESCALATION_AND_TEMPORARY_OVERRIDE_PROTOCOL.md`)
- Updated agent contract obligations

**Gate Status:**
- ✅ Governance-level validation gates: GREEN
- ❌ FM-level enforcement gates: RED

**Root Cause:**
FM enforcement gates expect operational FM evidence artifacts that do not yet exist:
- `architecture/BUILD_ACTIVE`
- `architecture/builds/{BUILD_ID}/learning.md`
- `architecture/builds/{BUILD_ID}/failures/`
- `architecture/builds/{BUILD_ID}/effectiveness.md`

This is a **governance → FM sequencing issue**, not non-compliance.

The governance canon must be established **before** operational FM artifacts can
be created according to the new rules.

---

## Classification

**Type:** Governance Bootstrap PR  
**Rationale:** Introduces foundational governance canon that establishes the
framework for FM evidence artifacts.

**Sequencing Logic:**
1. Governance canon defines rules for FM evidence (this PR)
2. FM operational artifacts are created according to canon (future PRs)
3. FM enforcement gates validate those artifacts (future PRs)

Attempting to satisfy FM enforcement gates in this PR would create circular dependency.

---

## Authorization

**Authorizing Authority:** Johan Ras  
**Date Granted:** 2025-12-21  
**Override Type:** One-time, temporary

**Scope:**
- Applies ONLY to PR #680
- Affects ONLY FM-level enforcement gates
- Does NOT affect governance-level validation gates

**Permitted Actions:**
- Classify PR #680 as Governance Bootstrap PR
- Temporarily bypass FM enforcement gates that require:
  - Learning records
  - Failure artifacts
  - FM effectiveness evidence

**Constraints:**
- Governance-level gates MUST remain enforced
- No governance canon may be weakened
- Bypass MUST be explicitly documented
- No fake or placeholder evidence may be added

---

## Affected Gates

The following FM-level enforcement gates are temporarily bypassed for PR #680:

1. **FM Learning Promotion Gate**
   - Expects: `architecture/BUILD_ACTIVE`, `learning.md`
   - Reason: Learning promotion framework established in this PR
   - Status: BYPASSED (bootstrap)

2. **FM Failure Promotion Gate**
   - Expects: `architecture/BUILD_ACTIVE`, `failures/` directory
   - Reason: Failure promotion framework established in this PR
   - Status: BYPASSED (bootstrap)

3. **FM Effectiveness Validation Gate**
   - Expects: `architecture/BUILD_ACTIVE`, `effectiveness.md`, `failures/`
   - Reason: Effectiveness tracking framework established in this PR
   - Status: BYPASSED (bootstrap)

4. **FM Failure Enforcement Gate**
   - Expects: Failure artifacts and enforcement rules
   - Reason: Failure enforcement framework established in this PR
   - Status: BYPASSED (bootstrap)

---

## Governance-Level Gates (ENFORCED)

The following governance-level gates REMAIN ENFORCED and must be GREEN:

1. ✅ Governance Gate Validation
2. ✅ Governance Policy Validation
3. ✅ Governance Scope Declaration Gate
4. ✅ Governance Cascading Failure Gate (permissions fixed)
5. ✅ Governance Scope-to-Diff Gate

All governance-level validation remains strict and non-negotiable.

---

## Post-Condition

**Expiry:** This override expires immediately after PR #680 is merged.

**Future Behavior:**
- All subsequent PRs MUST satisfy FM enforcement gates
- No further bootstrap exceptions will be granted
- FM operational artifacts MUST be created per the governance canon established in this PR

**Validation Trigger:**
Once this PR is merged, the next PR that modifies `architecture/**` MUST:
- Initialize FM evidence artifacts per governance canon
- Satisfy all FM enforcement gates
- Demonstrate full compliance with learning/failure/effectiveness tracking

---

## Rationale

This bootstrap exception is necessary to:
1. Establish governance canon for FM evidence without circular dependency
2. Prevent false-negative gate failures during framework initialization
3. Enable clean, sequential rollout of governance → FM → enforcement
4. Preserve strict governance enforcement while bootstrapping FM operational layer

**Key Principle:** Governance canon is foundational and must be established before
operational artifacts that implement the canon can exist.

---

## Governance Integrity Statement

**Governance Status:** Preserved and strengthened  
**Enforcement Status:** Governance-level enforcement remains strict  
**FM Enforcement Status:** Temporarily bypassed for bootstrap only

This bootstrap exception does NOT weaken governance. It enables orderly
initialization of the FM operational layer according to governance canon.

---

## Audit Trail

**Override ID:** BOOTSTRAP-PR-680  
**Incident Type:** Governance Bootstrap (not a failure)  
**Authorization Reference:** Comment #3678860836  
**Commit Reference:** [To be added]  
**Merge Date:** [Pending]

---

**End of Governance Bootstrap PR Declaration**
