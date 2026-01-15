# Scope Declaration

SCOPE_SCHEMA_VERSION: v1
PR_ID: 967
OWNER: agent-contract-administrator
DATE_UTC: 2026-01-15

## PR Responsibility Domain
RESPONSIBILITY_DOMAIN: Governance Administration

## Explicitly In Scope
IN_SCOPE:
- Agent contract upgrades to canonical v2.5.0
- Protection Registry implementation (reference-based)
- Self-Awareness & Continuous Improvement framework
- Bidirectional governance evolution
- Governance artifacts creation (.agent-admin/)
- PREHANDOVER_PROOF documentation

## Modified Files
- `.github/agents/CodexAdvisor-agent.md` (M) - v2.0.0 → v2.5.0, 856→400 lines, reference-based protection
- `.github/agents/governance-repo-administrator.agent.md` (M) - v2.6.0 → v2.5.0, hybrid protection model
- `.agent-admin/scans/scan_20260115_130855.md` (A) - Governance scan
- `.agent-admin/risk-assessments/risk_006_20260115.md` (A) - Risk assessment
- `.agent-admin/change-records/change_007_20260115.md` (A) - Change record
- `.agent-admin/completion-reports/completion_007_20260115.md` (A) - Completion summary
- `.agent-admin/completion-reports/feature_enhancement_007_20260115.md` (A) - Feature enhancement review
- `.agent-admin/completion-reports/process_improvement_007_20260115.md` (A) - Process improvement reflection
- `governance/PREHANDOVER_PROOF_v250_UPGRADE.md` (A) - PREHANDOVER_PROOF documentation

## Explicitly Out of Scope
OUT_OF_SCOPE:
- Tests (no test infrastructure for agent contracts)
- CI (no CI workflow changes)
- Migrations (not applicable)
- Email (not applicable)
- Logging (not applicable)
- Audit (not applicable)
- Deployment (not applicable)
- Infra (not applicable)
- Application code (src/**, app/**, components/**, lib/**)

## Expected Verification Signal
EXPECTED_VERIFICATION:
- CI: GREEN (scope-to-diff gate, YAML validation, metadata validation)
- TESTS: UNCHANGED (no test infrastructure)
- GOVERNANCE_GATES: GREEN (all gates must pass)

## Scope Freeze Declaration
SCOPE_FROZEN: YES
