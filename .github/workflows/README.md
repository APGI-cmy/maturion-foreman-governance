# Governance Workflows

This directory contains GitHub Actions workflows for governance enforcement in the Maturion ecosystem.

## Builder-First PR Merge Model

**Status**: Active as of 2025-12-22  
**Authority**: Constitutional - Mandatory

The governance repository enforces the **Builder-First PR Merge Model** where:
- **Builder QA artifacts** (`.qa/builder/*`) are the canonical source of truth
- **CI/PR gates** enforce presence and validity of artifacts only
- **No CI diagnosis, debugging, or inference** of build state

See: `governance/canon/BUILDER_FIRST_PR_MERGE_MODEL.md` for complete documentation.

## Governance Supremacy Rule (GSR)

**CRITICAL**: Per Maturion governance doctrine, **all systems MUST follow governance rules**, including governance systems themselves.

### Core Principles

1. **GSR (Governance Supremacy Rule)**: No system is exempt from rules it imposes
2. **One Build**: All projects follow the same rules
3. **True North**: Quality enforcement applies universally
4. **Zero Legacy**: No grandfather clauses or exceptions
5. **QA Must Be 100% Green**: Systems demonstrate this by example

**This is NOT a circular dependency** - it is governance enforcement applied recursively and correctly.

## Active Workflows

### Builder QA Enforcement Gate (`builder-qa-enforcement-gate.yml`)

**Purpose**: Enforce Builder-First PR Merge Model

**Status**: Active - Mandatory for all PRs

**Enforces**:
- ✅ Required `.qa/builder/*` artifacts exist
- ✅ Artifacts are valid JSON/Markdown
- ✅ `BUILD_QA_REPORT.json` shows `build_status: "PASS"`
- ✅ `BUILD_QA_REPORT.json` shows `merge_readiness.ready: true`
- ✅ `GOVERNANCE_COMPLIANCE_REPORT.json` shows `compliance_status: "COMPLIANT"`

**Does NOT**:
- ❌ Read PR comments
- ❌ Read GitHub Issues  
- ❌ Use `gh api` to infer state
- ❌ Diagnose or debug failures
- ❌ Interpret logs or CI output

**Required Permissions**:
```yaml
permissions:
  contents: read
  pull-requests: write
```

**Triggers**: All PRs to `main` or `develop`

**Schemas**:
- `governance/schemas/BUILD_QA_REPORT.schema.json`
- `governance/schemas/GOVERNANCE_COMPLIANCE_REPORT.schema.json`
- `governance/schemas/BUILDER_QA_SUMMARY.structure.md`

---

### Governance Gate (`governance-gate.yml`)

**Purpose**: Validate governance repository structure integrity

**Validates**:
1. Critical governance directories exist
2. Constitutional documents present
3. No application code in governance repo

**Triggers**: All PRs to `main` or `develop`

---

## PR Merge Criteria

A PR can only merge when:
- ✅ **Builder QA Enforcement Gate passes** (artifacts present, valid, show PASS/COMPLIANT/READY)
- ✅ **Governance Gate passes** (structure integrity maintained)
- ✅ All other applicable workflow checks pass
- ✅ Human review approval (if required)

**Critical**: PR merge outcome is **deterministic** based on Builder QA artifacts. No surprise failures.

---

## Decommissioned Legacy Gates

The following gates were **permanently removed** as of 2025-12-22:

### ❌ governance-cascading-failure-gate.yml
- **Why Removed**: Used `gh api` to read PR comments and infer failure causality
- **Violation**: CI inferring truth from metadata instead of artifacts
- **Replaced By**: Builder QA artifacts declare failure state directly in reports

### ❌ governance-scope-declaration-gate.yml
- **Why Removed**: Enforced legacy scope declaration file format
- **Violation**: Conflicted with Builder QA report-based compliance model
- **Replaced By**: Scope compliance included in `GOVERNANCE_COMPLIANCE_REPORT.json`

**Reason for Removal**: These gates violated the Builder-First PR Merge Model by allowing CI to act as a source of truth rather than enforcing Builder's artifacts.

---

## For Application Repositories

Application repositories using Builder agents should:

1. **Generate Builder QA Artifacts**: Create `.qa/builder/*` files after build-to-green
2. **Use Builder QA Enforcement Gate**: Copy `builder-qa-enforcement-gate.yml` to your workflows
3. **Follow Builder-First Model**: Let Builder QA artifacts be canonical truth
4. **Remove Legacy Gates**: Remove any gates that use `gh api` for PR comments or infer state

---

## Governance Documentation

### Constitutional Documents
- `governance/canon/BUILDER_FIRST_PR_MERGE_MODEL.md` - PR merge model (MANDATORY)
- `governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md` - Highest governance authority
- `governance/canon/COMPLIANCE_AND_STANDARDS_GOVERNANCE.md` - ISO/NIST alignment
- `governance/policy/QA_POLICY_MASTER.md` - QA and verification doctrine
- `BUILD_PHILOSOPHY.md` - One-Time Build Law, Zero Test Debt

### Schemas
- `governance/schemas/BUILD_QA_REPORT.schema.json` - Build QA report structure
- `governance/schemas/GOVERNANCE_COMPLIANCE_REPORT.schema.json` - Compliance report structure
- `governance/schemas/BUILDER_QA_SUMMARY.structure.md` - Human-readable summary format

### Templates
- `qiel-template.yml.example` - QIEL workflow template for downstream projects
