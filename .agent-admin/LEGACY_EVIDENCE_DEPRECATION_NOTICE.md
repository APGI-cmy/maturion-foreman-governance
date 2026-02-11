# Legacy Evidence Deprecation Notice

**Date**: 2026-02-10  
**Issue**: #1069 - Governance Repository Self-Audit & Alignment Cleanup  
**Authority**: EVIDENCE_ARTIFACT_BUNDLE_STANDARD.md

---

## Summary

As part of the governance repository self-audit (Issue #1069), legacy evidence artifacts have been reorganized to comply with `EVIDENCE_ARTIFACT_BUNDLE_STANDARD.md`.

---

## Legacy Locations (DEPRECATED)

The following locations are **deprecated** and should not be used for new evidence:

- ❌ `.agent-admin/scans/` → Use `.agent-admin/governance/` instead
- ❌ `.agent-admin/risk-assessments/` → Use `.agent-admin/rca/` instead  
- ❌ `.agent-admin/change-records/` → Use `.agent-admin/governance/` instead
- ❌ Root-level `PREHANDOVER_PROOF*.md` → Use `.agent-admin/prehandover/` instead

---

## Migration Actions Taken

### 1. Scans (moved to governance/)
- Preserved in original location for historical reference
- Added symlink/reference in `.agent-admin/governance/LEGACY_SCANS.md`

### 2. Risk Assessments (moved to rca/)
- Preserved in original location for historical reference
- Added symlink/reference in `.agent-admin/rca/LEGACY_RISK_ASSESSMENTS.md`

### 3. Change Records (moved to governance/)
- Preserved in original location for historical reference
- Added reference in `.agent-admin/governance/LEGACY_CHANGES.md`

### 4. Root-level Prehandover Proofs
- Preserved in original location for historical reference
- Added reference in `.agent-admin/prehandover/LEGACY_PREHANDOVER_PROOFS.md`

---

## Forward Guidance

**All new evidence artifacts MUST use the standard locations:**

1. **Prehandover evidence**: `.agent-admin/prehandover/`
2. **Gate results**: `.agent-admin/gates/`
3. **RCA artifacts**: `.agent-admin/rca/`
4. **Improvements**: `.agent-admin/improvements/`
5. **Governance sync state**: `.agent-admin/governance/`

---

## Enforcement

Any PR that places evidence artifacts in deprecated locations will fail the merge gate per `MERGE_GATE_INTERFACE_STANDARD.md`.

---

**Signed**: Governance Repository Administrator  
**Date**: 2026-02-10  
**Session**: governance-repo-administrator (Living Agent System v5.0.0)
