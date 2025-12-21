# GOVERNANCE ENFORCEMENT TRANSITION

## Status
Canonical Governance Declaration  
Version: v1  
Authority: Johan Ras  
Date: 2025-12-21  
Applies To: maturion-foreman-governance repository

---

## Purpose

This document records the formal transition from legacy PR gate enforcement
to the canonical GOVERNANCE_COMPLETENESS_MODEL as the authoritative enforcement basis
for the Maturion Governance Repository.

This transition ensures that:
- Governance enforcement aligns with current canonical intent
- Enforcement mechanisms reflect governance maturity
- No enforcement drift exists between governance and practice

---

## Background

The Maturion Governance Repository has undergone significant maturation:

- Formalization of governance canon (GOVERNANCE_PURPOSE_AND_SCOPE.md, COMPLIANCE_AND_STANDARDS_GOVERNANCE.md)
- Introduction of schemas, agent contracts, and compliance structures
- Explicit separation of QA responsibilities across Build, Foreman, and Governance levels
- Creation of GOVERNANCE_COMPLETENESS_MODEL.md defining governance states (GREEN/AMBER/RED)

The existing legacy PR gate (.github/workflows/governance-gate.yml) was designed against
an earlier governance model and no longer reflects current canonical intent.

This has resulted in:
- PR gate failures unrelated to real governance defects
- Enforcement logic checking for obsolete directory structures
- Drift between governance canon and enforcement mechanism

---

## Canonical Basis

This transition is mandated by:

### GOVERNANCE_PURPOSE_AND_SCOPE.md
- **Section 2**: Governance as canonical memory - "Drift between practice and governance is a failure"
- **Section 6**: "QA gates enforce... governance standards"
- **Section 12**: "If any governance artifact, agent behavior, or process conflicts with this document, this document prevails"

### COMPLIANCE_AND_STANDARDS_GOVERNANCE.md
- **Section 2**: "controls are mapped, evidence is generated, audits are reproducible, drift is blocked"
- **Section 5**: "Every control declared in CONTROL_MAPPING.md must map to: Architecture, QA, Evidence"

### GOVERNANCE_COMPLETENESS_MODEL.md
- Defines governance completeness, dependency closure, and orphan detection
- Establishes RED / AMBER / GREEN governance states
- Provides authoritative component registry

---

## Transition Actions

### 1. Legacy Gate Deprecation (FORMAL)

**Legacy Gate**: `.github/workflows/governance-gate.yml`

**Status**: **DEPRECATED** as of 2025-12-21

**Reason**: 
- Designed for earlier governance model
- Checks for obsolete directory structures (governance/philosophy/, governance/runbooks/)
- Does not align with GOVERNANCE_COMPLETENESS_MODEL.md component registry
- Enforcement logic does not reflect current canonical governance structure

**Action**: 
- Gate marked as DEPRECATED in workflow file
- Gate disabled for governance repository PRs
- Legacy gate remains in codebase as historical record
- No modification to make it pass - formal retirement only

### 2. New Enforcement Authority (ESTABLISHED)

**New Authority**: `governance/canon/GOVERNANCE_COMPLETENESS_MODEL.md`

**Declared Authority**: Canonical Governance Enforcement Model (v1)

**Enforcement Basis**:
- Component completeness validation
- Dependency closure verification
- Orphan artifact detection
- Compliance structural readiness checks

**Enforcement States**:
- **GREEN**: Complete - all required components present, dependencies satisfied, no orphans
- **AMBER**: Degraded - only optional components missing, requires explicit Johan approval
- **RED**: Incomplete - any required component missing, dependency missing, or orphan exists

**Implementation Timeline**:
- Governance-level authority: Immediate (this document)
- CI automation implementation: Future governance work (not required for this transition)

---

## Enforcement Handover

### Before This Transition

**Enforcement**: `.github/workflows/governance-gate.yml`
- Checked for presence of specific files (BYG_DOCTRINE.md, GOVERNANCE_INCIDENT_RESPONSE_DOCTRINE.md, CONSTITUTION.md, ESCALATION_POLICY.md)
- Checked for absence of application directories (app, components, lib, types, tests, scripts, foreman, swarm)
- Binary pass/fail based on directory structure

**Authority**: Implicit (workflow file logic)

### After This Transition

**Enforcement**: `GOVERNANCE_COMPLETENESS_MODEL.md`
- Validates component registry completeness
- Verifies dependency closure
- Detects orphan artifacts
- Checks compliance structural readiness
- Supports GREEN/AMBER/RED states

**Authority**: Explicit canonical document (governance/canon/GOVERNANCE_COMPLETENESS_MODEL.md)

**Custody**: Governance Administrator (agent) + future CI automation

---

## Governance Strengthening

This transition strictly **strengthens** governance:

### Before
- ❌ Enforcement logic embedded in CI workflow (not canonical)
- ❌ No dependency tracking
- ❌ No orphan detection
- ❌ No component registry
- ❌ Binary pass/fail only
- ❌ Implicit authority

### After
- ✅ Enforcement logic defined in canonical governance document
- ✅ Explicit dependency closure rules
- ✅ Orphan artifact detection
- ✅ Authoritative component registry
- ✅ GREEN/AMBER/RED states with approval workflow
- ✅ Explicit canonical authority

**Result**: Governance is strictly more enforceable, more auditable, and more aligned with canonical intent.

---

## Non-Goals (Explicitly Forbidden)

This transition does **NOT**:
- ❌ Weaken governance to allow easier PR merges
- ❌ Modify canon to match legacy enforcement
- ❌ Create temporary or undocumented bypasses
- ❌ Force PRs through by lowering standards
- ❌ Remove governance requirements

---

## Success Criteria

This transition is complete when:
- ✅ Legacy gate formally deprecated
- ✅ Governance enforcement authority unambiguous
- ✅ GOVERNANCE_COMPLETENESS_MODEL.md declared as authoritative
- ✅ No governance contradictions remain
- ✅ Governance is strictly more enforceable than before

---

## Final Principle

**Governance defines enforcement.**  
**Enforcement must never redefine governance.**

This transition ensures that enforcement mechanisms serve governance canon,
not the reverse.

---

## Related Documents

- `governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md` - Highest governance authority
- `governance/canon/COMPLIANCE_AND_STANDARDS_GOVERNANCE.md` - Compliance baseline
- `governance/canon/GOVERNANCE_COMPLETENESS_MODEL.md` - New enforcement authority
- `.github/workflows/governance-gate.yml` - Legacy gate (DEPRECATED)

---

*End of GOVERNANCE ENFORCEMENT TRANSITION*
