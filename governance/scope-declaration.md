# SCOPE DECLARATION

SCOPE_SCHEMA_VERSION: v1
PR_ID: #980
OWNER: governance-repo-administrator
DATE_UTC: 2026-01-19

---

## PR Responsibility Domain

RESPONSIBILITY_DOMAIN: Evidence-Based Agent Validation Infrastructure

---

## Explicitly In Scope

IN_SCOPE:
- CI workflow updates to accept evidence-based validation (governance-scope-to-diff-gate.yml, locked-section-protection-gate.yml)
- Gate script creation (validate-scope-to-diff.sh, validate-yaml-frontmatter.sh)
- Gate script documentation (README.md)
- Governance canon updates (BL-027, BL-028) to formalize both validation paths
- Evidence-based validation examples and patterns

---

## Explicitly Out of Scope

OUT_OF_SCOPE:
- Tests (no test infrastructure exists for CI workflows)
- CI workflows not related to scope-to-diff or locked sections
- Migrations
- Email
- Logging
- Audit
- Deployment
- Infrastructure beyond CI gates
- Agent contract modifications (delegated to agent-contract-administrator)
- Application code
- Database changes
- API changes
- UI changes

---

## Files Changed

A .github/scripts/README.md
A .github/scripts/validate-scope-to-diff.sh
A .github/scripts/validate-yaml-frontmatter.sh
M .github/workflows/governance-scope-to-diff-gate.yml
M .github/workflows/locked-section-protection-gate.yml
M governance/canon/BOOTSTRAP_EXECUTION_LEARNINGS.md

---

## Expected Verification Signal

EXPECTED_VERIFICATION:
- CI: GREEN (governance-scope-to-diff-gate, locked-section-protection-gate, governance-gate)
- TESTS: NOT APPLICABLE (no test infrastructure for workflow files)
- GOVERNANCE_GATES: GREEN (scope-to-diff via evidence-based validation, locked sections not modified)

---

## Scope Freeze Declaration

SCOPE_FROZEN: YES

This scope is frozen. If additional changes are needed, this PR will be closed and a new PR created.

---

**Authority**: `governance/canon/SCOPE_DECLARATION_SCHEMA.md` v1
