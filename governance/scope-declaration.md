# SCOPE DECLARATION

SCOPE_SCHEMA_VERSION: v1
PR_ID: TBD (CS2 Direct Authority Model Implementation)
OWNER: governance-repo-administrator
DATE_UTC: 2026-01-20

---

## PR Responsibility Domain

RESPONSIBILITY_DOMAIN: Governance Canon

---

## Explicitly In Scope

IN_SCOPE:
- Complete rewrite of AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md
- Removal of agent-contract-administrator intermediary layer
- Implementation of CS2 Direct Authority Model
- Replacement of instruction system with recommendation system
- Simplification of authority hierarchy from 3 levels to 2 levels
- Update of all prohibition language to reference CS2 only
- Version increment to 2.0.0

---

## Explicitly Out of Scope

OUT_OF_SCOPE:
- Agent contract modifications (will be done by CS2 separately)
- Consumer repository updates (layer-down will follow)
- CI workflow changes
- Tests (no test infrastructure for governance canon)
- Migrations
- Email
- Logging
- Audit
- Deployment
- Application code
- Database changes
- API changes
- UI changes
- Agent file modifications (.github/agents/**/*.md)

---

## Files Changed

M SCOPE_DECLARATION.md
M governance/scope-declaration.md
M governance/canon/AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md

---

## Expected Verification Signal

EXPECTED_VERIFICATION:
- CI: GREEN (governance-scope-to-diff-gate, governance-gate)
- TESTS: NOT APPLICABLE (no test infrastructure for governance canon)
- GOVERNANCE_GATES: GREEN (scope-to-diff validation)

---

## Scope Freeze Declaration

SCOPE_FROZEN: YES

This scope is frozen. Canonical governance rewrite complete per CS2 strategic decision 2026-01-20.

---

**Authority**: `governance/canon/SCOPE_DECLARATION_SCHEMA.md` v1
