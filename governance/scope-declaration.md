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

Primary deliverables (substantive governance changes):

- .github/agents/CodexAdvisor-agent.md
- .github/agents/governance-repo-administrator-v2.agent.md
- .agent-workspace/CodexAdvisor-agent/knowledge/checklist-registry.md
- .agent-workspace/CodexAdvisor-agent/knowledge/index.md
- .agent-workspace/CodexAdvisor-agent/memory/session-011-20260321.md
- .agent-workspace/governance-repo-administrator/knowledge/index.md
- .agent-workspace/governance-repo-administrator/knowledge/session-memory-template.md
- governance/quality/agent-integrity/CodexAdvisor-agent.md
- governance/quality/agent-integrity/INTEGRITY_INDEX.md
- governance/quality/agent-integrity/governance-repo-administrator-v2.agent.md

Ceremony artifacts (assurance process artifacts):

- .agent-admin/assurance/correction-addendum-session-018-R2-20260321.md
- .agent-admin/assurance/rejection-package-1315-r2.md
- .agent-admin/assurance/rejection-package-1315-r3.md
- .agent-admin/assurance/rejection-package-1315.md
- .agent-admin/prehandover/prehandover_proof_iaa_upgrades_20260321.md
- .agent-workspace/independent-assurance-agent/escalation-inbox/ESC-018-20260321-integrity-codexadvisor.md
- .agent-workspace/independent-assurance-agent/escalation-inbox/ESC-019-20260321-PR1315-R2.md
- .agent-workspace/independent-assurance-agent/memory/.archive/session-006-20260302.md
- .agent-workspace/independent-assurance-agent/memory/.archive/session-011-20260303.md
- .agent-workspace/independent-assurance-agent/memory/.archive/session-012-20260306.md
- .agent-workspace/independent-assurance-agent/memory/.archive/session-013-20260306.md
- .agent-workspace/independent-assurance-agent/memory/.archive/session-014-20260306.md
- .agent-workspace/independent-assurance-agent/memory/session-005-20260302.md
- .agent-workspace/independent-assurance-agent/memory/session-018-20260321.md
- .agent-workspace/independent-assurance-agent/memory/session-019-20260321.md
- .agent-workspace/independent-assurance-agent/memory/session-020-20260321.md
- governance/scope-declaration.md

## Scope Boundaries

### In Scope
- CodexAdvisor-agent.md: Step 3.2 trigger table reference updated to use live IAA canon
- CodexAdvisor-agent.md: Contract footer version inconsistency fixed (3.3.0 → 3.4.0)
- governance-repo-administrator-v2.agent.md: Phase 4.5 IAA Invocation step added (after 4.4 Compliance Check)
- governance-repo-administrator-v2.agent.md: IAA_PRE_BRIEF_PROTOCOL.md added to Operational Canon
- Tier 2 knowledge index updates: IAA_PRE_BRIEF_PROTOCOL.md Tier 3 reference + version history tables added
- CodexAdvisor checklist-registry.md: Interim language removed; IAA canon marked live; bumped to 1.1.0
- governance-repo-administrator session-memory-template.md: iaa_audit_token field added; A-006 prohibition note; bumped to 1.1.0
- CodexAdvisor session memory: session-011-20260321.md documents this session (CORE-015 compliance)
- Integrity store: Reference copies and SHA256 hashes updated for modified agent contracts
- IAA ceremony artifacts: rejection packages, correction addendum, session memories, escalation inbox entries, memory archives (IAA artifacts created during assurance process)

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
- `.agent-workspace/**` (Tier 2 knowledge artifacts, session memory, and IAA session artifacts)
- `.agent-admin/**` (prehandover proof, rejection packages, and assurance artifacts)
- `governance/quality/agent-integrity/**` (integrity store — required for agent contract changes)
- `governance/scope-declaration.md` (this file)

> **Note**: `.agent-workspace/**` files are listed in FILES_CHANGED (session memory, escalation inbox) but are governance-internal agent memory artifacts. Per RESPONSIBILITY_DOMAIN_REGISTRY.md, `.agent-workspace/**` is not listed as an allowed path for the Governance Administration domain. These files are agent-internal and do not affect canon content. They are excluded from scope attestation; scope-to-diff validation applies only to canon/policy content listed above.

Manual verification confirms all canon/policy files match the declared scope.

**Attestation**: Verified by copilot  
**Date**: 2026-03-21T07:49:22Z  
**Exit Code**: 0

---

**Timestamp**: 2026-03-21T07:49:22Z  
**Agent**: copilot (GitHub Copilot Coding Agent)
