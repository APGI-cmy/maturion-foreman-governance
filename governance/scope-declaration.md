# Scope Declaration

SCOPE_SCHEMA_VERSION: v1
PR_ID: Evidence Folder Cleanup (Governance vs App Execution)
OWNER: copilot
DATE_UTC: 2025-12-21

## PR Responsibility Domain
RESPONSIBILITY_DOMAIN: Evidence Folder Structure Reconciliation

## Explicitly In Scope
IN_SCOPE:
- Rename `/evidence-new/` to `/evidence/` (reconciliation)
- Update README files to reference correct folder names
- Verify governance evidence classification
- Verify app execution evidence classification
- Ensure no files are deleted (preservation requirement)
- Documentation updates for folder references

## Explicitly Out of Scope
OUT_OF_SCOPE:
- Tests
- CI
- Migrations
- Email
- Logging
- Audit
- Deployment
- Infra
- Application code changes
- Governance logic changes
- Build system changes
- Deletion of any evidence files
- Refactoring or rewriting of evidence content
- Moving files out of /memory/evidence/ (not root /evidence/)

## Expected Verification Signal
EXPECTED_VERIFICATION:
- CI: GREEN
- TESTS: UNCHANGED (no tests in this repo)
- GOVERNANCE_GATES: GREEN
- FOLDER_STRUCTURE: /evidence/ exists with governance evidence only
- FOLDER_STRUCTURE: /evidence_app_execution_archive/ exists with app execution artifacts
- NO_FILES_DELETED: All evidence files preserved (moved, not deleted)

## Scope Freeze Declaration
SCOPE_FROZEN: YES
