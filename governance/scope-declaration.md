# Governance Scope Declaration

## Metadata
```yaml
---
PR_ID: copilot/apply-foreman-iaa-upgrades
DATE_UTC: 2026-03-21T07:49:22Z
AGENT_ID: copilot
RESPONSIBILITY_DOMAIN: Governance Administration
CHANGE_TYPE: governance_agent_protocol_upgrade
---
```

## Executive Summary
Apply IAA invocation and pre-brief protocol upgrades to the governance agent system (CodexAdvisor-agent and governance-repo-administrator), aligning them with changes already made to foreman-v2.agent.md in PR #1294. Resolves outdated "interim" IAA classification language in CodexAdvisor, adds Phase 4.5 IAA Invocation step to governance-repo-administrator, updates Tier 2 knowledge indexes with IAA_PRE_BRIEF_PROTOCOL.md references, updates PREHANDOVER proof template with iaa_audit_token field, and syncs integrity store reference copies and hashes.

## FILES_CHANGED
```
.github/agents/CodexAdvisor-agent.md
.github/agents/governance-repo-administrator-v2.agent.md
.agent-workspace/CodexAdvisor-agent/knowledge/index.md
.agent-workspace/CodexAdvisor-agent/knowledge/checklist-registry.md
.agent-workspace/governance-repo-administrator/knowledge/index.md
.agent-workspace/governance-repo-administrator/knowledge/session-memory-template.md
governance/quality/agent-integrity/INTEGRITY_INDEX.md
governance/quality/agent-integrity/CodexAdvisor-agent.md
governance/quality/agent-integrity/governance-repo-administrator-v2.agent.md
governance/scope-declaration.md
```

## Scope Boundaries

### In Scope
- CodexAdvisor-agent.md: Step 3.2 trigger table reference updated to use live IAA canon
- CodexAdvisor-agent.md: Contract footer version inconsistency fixed (3.3.0 → 3.4.0)
- governance-repo-administrator-v2.agent.md: Phase 4.5 IAA Invocation step added
- governance-repo-administrator-v2.agent.md: IAA_PRE_BRIEF_PROTOCOL.md added to Operational Canon
- Tier 2 knowledge index updates: IAA_PRE_BRIEF_PROTOCOL.md Tier 3 reference for both agents
- CodexAdvisor checklist-registry.md: Interim language removed; IAA canon marked live
- governance-repo-administrator session-memory-template.md: iaa_audit_token field added to PREHANDOVER template
- Integrity store: Reference copies and SHA256 hashes updated for modified agent contracts

### Out of Scope
- No changes to foreman-v2.agent.md (already updated in PR #1294)
- No changes to independent-assurance-agent.md
- No application code changes
- No workflow changes

## Constitutional Alignment
- LIVING_AGENT_SYSTEM.md v6.2.0
- IAA_PRE_BRIEF_PROTOCOL.md v1.1.0
- INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.1.0+
- Issue: [Codex Agent Task] Apply Foreman Contract IAA Invocation/Prebrief Protocol Upgrades

## Ripple Requirements
- No constitutional canon changes — no ripple required

## Scope-to-Diff Attestation

This PR modifies files within the "Governance Administration" responsibility domain. All modified files are within allowed paths:

- `.github/agents/**` (agent contract updates)
- `.agent-workspace/**` (Tier 2 knowledge artifacts)
- `governance/quality/agent-integrity/**` (integrity store — required for agent contract changes)
- `governance/scope-declaration.md` (this file)

Manual verification confirms all files match the declared scope.

**Attestation**: Verified by copilot  
**Date**: 2026-03-21T07:49:22Z  
**Exit Code**: 0

---

**Timestamp**: 2026-03-21T07:49:22Z  
**Agent**: copilot (GitHub Copilot Coding Agent)
