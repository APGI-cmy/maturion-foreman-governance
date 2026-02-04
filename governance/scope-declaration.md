# Scope Declaration

**PR_ID**: copilot/centralize-agent-file-guidance
**DATE_UTC**: 2026-02-04T12:28:00Z
**AUTHOR**: governance-repo-administrator
**RESPONSIBILITY_DOMAIN**: Agent Contract Guidance Centralization

---

## Change Summary

Centralize ALL agent contract policies, schemas, templates, and runbooks into a single canonical folder: `governance/canon/agent-contracts-guidance/`

**Rationale**: 
- Eliminates scattered, duplicated, or outdated guidance
- Enables atomic ripple and enforcement protocols
- Makes agent contract policy easy to find and maintain
- Ensures ripple is fully traceable

---

## FILES_CHANGED

### New Files Created
A governance/canon/agent-contracts-guidance/README.md

### Files Moved (Renames)
R governance/canon/.agent.schema.md -> governance/canon/agent-contracts-guidance/.agent.schema.md
R governance/canon/AGENT_FILE_CREATION_POLICY.md -> governance/canon/agent-contracts-guidance/AGENT_FILE_CREATION_POLICY.md
R governance/canon/AGENT_FILE_BINDING_REQUIREMENTS.md -> governance/canon/agent-contracts-guidance/AGENT_FILE_BINDING_REQUIREMENTS.md
R governance/canon/AGENT_CONTRACT_MIGRATION_GUIDE.md -> governance/canon/agent-contracts-guidance/AGENT_CONTRACT_MIGRATION_GUIDE.md
R governance/canon/AGENT_ONBOARDING_QUICKSTART.md -> governance/canon/agent-contracts-guidance/AGENT_ONBOARDING_QUICKSTART.md
R governance/templates/AGENT_CONTRACT.template.md -> governance/canon/agent-contracts-guidance/templates/AGENT_CONTRACT.template.md
R governance/templates/AGENT_FILE_LOCKED_SECTIONS_TEMPLATE.md -> governance/canon/agent-contracts-guidance/templates/AGENT_FILE_LOCKED_SECTIONS_TEMPLATE.md
R governance/runbooks/AGENT_FILE_VALIDATION.md -> governance/canon/agent-contracts-guidance/runbooks/AGENT_FILE_VALIDATION.md
R governance/runbooks/AGENT_FILE_MAINTENANCE.md -> governance/canon/agent-contracts-guidance/runbooks/AGENT_FILE_MAINTENANCE.md

### Files Modified (Reference Updates)
M .github/agents/CodexAdvisor-agent.md
M GOVERNANCE_ARTIFACT_INVENTORY.md
M README.md
M governance/canon/AGENT_CONTRACT_PROTECTION_PROTOCOL.md
M governance/canon/FPC_REPOSITORY_LAYERDOWN_GUIDE.md
M governance/canon/GOVERNANCE_RIPPLE_CHECKLIST_PROTOCOL.md
M governance/canon/agent-contracts-guidance/AGENT_CONTRACT_MIGRATION_GUIDE.md
M governance/canon/agent-contracts-guidance/AGENT_FILE_BINDING_REQUIREMENTS.md
M governance/canon/agent-contracts-guidance/runbooks/AGENT_FILE_MAINTENANCE.md
M governance/canon/agent-contracts-guidance/runbooks/AGENT_FILE_VALIDATION.md
M governance/canon/agent-contracts-guidance/templates/AGENT_FILE_LOCKED_SECTIONS_TEMPLATE.md
M governance/scope-declaration.md

---

## VALIDATION_PLAN

1. Gate 1: YAML frontmatter validation
2. Gate 2: Structure validation
3. Gate 3: Scope-to-diff validation
4. Gate 4: Locked section protection

---

**Authority**: Issue #[issue-number], governance-repo-administrator v4.3.0
