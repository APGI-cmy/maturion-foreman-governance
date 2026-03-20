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

## Layer-Down Dispatch (`governance-layer-down-dispatch.yml`)

**Purpose**: On any push to `main` that touches governed paths (e.g., `governance/canon/**`, `.github/agents/**`), creates a single `[Layer-Down]` issue in each enabled consumer repo (direct issue creation via `gh api`).

**Design**: Single-signal dispatch — one `[Layer-Down]` issue per consumer per governance change.

> **Note**: The legacy `governance_ripple` `repository_dispatch` step was removed (2026-03-03) as it was a second, redundant signal causing duplicate issues and stale draft PRs in consumer repos. See `governance/CHANGELOG.md` entry `LAYER-DOWN-DEDUP-2026-03-03`.

---

## Active Workflows

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

## Workflow Templates for Application Repositories

**IMPORTANT**: The governance repository itself does NOT use the Builder QA Enforcement Gate because it contains only documentation, schemas, and policies—no application code requiring Builder QA.

Application repositories with actual code builds should:

1. **Copy Builder QA Enforcement Gate Template**:
   - Template location: `governance/templates/workflows/builder-qa-enforcement-gate.yml.template`
   - Copy to your repo's `.github/workflows/builder-qa-enforcement-gate.yml`
   - This enforces the Builder-First PR Merge Model

2. **Generate Builder QA Artifacts**: Create `.qa/builder/*` files after build-to-green:
   - `.qa/builder/BUILD_QA_REPORT.json`
   - `.qa/builder/GOVERNANCE_COMPLIANCE_REPORT.json`
   - `.qa/builder/SUMMARY.md`

3. **Follow Builder-First Model**: Let Builder QA artifacts be canonical truth

4. **Remove Legacy Gates**: Remove any gates that use `gh api` for PR comments or infer state

### Builder QA Enforcement Gate Template

**Location**: `governance/templates/workflows/builder-qa-enforcement-gate.yml.template`

**Purpose**: Enforce Builder-First PR Merge Model (for APPLICATION repositories only)

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

**Schemas**:
- `governance/schemas/BUILD_QA_REPORT.schema.json`
- `governance/schemas/GOVERNANCE_COMPLIANCE_REPORT.schema.json`
- `governance/schemas/BUILDER_QA_SUMMARY.structure.md`

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

---

## Layer-Down Dispatch — Single-Signal Design

**Canonical design** (as of 2026-03-03): Each governance push produces **exactly one notification per consumer repo** — a direct GitHub issue creation via `gh api repos/$repo/issues`.

### Why There Is No `repository_dispatch` Step

A legacy `Dispatch governance_ripple to consumer repos` step was removed (2026-03-03) because:
1. Consumer repos handled BOTH the direct issue AND the `repository_dispatch` event, producing 2–3 duplicate issues per push.
2. The issue-based notification is the canonical protocol per `CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md`.
3. The `repository_dispatch` path was never officially retired after the issue-based design was adopted.

**Do not re-add a `repository_dispatch` step to this workflow** without first disabling the `governance-ripple-sync.yml` handler in all consumer repos and auditing for duplicate issue creation.

### Current Flow

```
governance push to main
  → governance-layer-down-dispatch.yml fires
    → Creates [Layer-Down] Propagate Governance Changes issue in each consumer repo
      → consumer repo: ripple-integration.yml fires (triggered by governance+layer-down labels)
        → alignment runs → ripple PR created (DRAFT if agent files changed, auto-merge otherwise)
```
