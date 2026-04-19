# SCOPE_DECLARATION

**PR_ID**: copilot/fix-foreman-v2-agent-metadata-config
**DATE_UTC**: 2026-04-19T10:21:48Z  
**RESPONSIBILITY_DOMAIN**: Agent Contract Repair — foreman-v2 metadata compliance  
**AGENT_ROLE**: CodexAdvisor-agent (session-013; performed by Copilot Coding Agent)  
**SCOPE**: Fix foreman-v2.agent.md metadata block exceeding 10-entry platform limit. Remove 5 redundant canon-reference entries; sync reference copy; update INTEGRITY_INDEX SHA256; write PREHANDOVER and session memory; invoke IAA.

## FILES_CHANGED

- .agent-workspace/CodexAdvisor-agent/memory/PREHANDOVER-session-013-20260419.md
- .agent-workspace/CodexAdvisor-agent/memory/session-013-20260419.md
- .agent-workspace/CodexAdvisor-agent/parking-station/suggestions-log.md
- .github/agents/foreman-v2.agent.md
- governance/quality/agent-integrity/INTEGRITY_INDEX.md
- governance/quality/agent-integrity/foreman-v2.agent.md
- SCOPE_DECLARATION.md

## CHANGE_SUMMARY

**Purpose**: Fix runtime load failure caused by foreman-v2.agent.md having 11 entries in its `metadata` block, exceeding the platform's 10-entry maximum.

**Error fixed**: `Invalid config: metadata has more than 10 entries`

**Root cause**: Session-012 repair introduced 5 canon-reference keys into the `metadata` block (`contract_architecture`, `preflight_pattern`, `induction_protocol`, `handover_automation`, `ecosystem_vocabulary`). These are redundant with `governance.expected_artifacts` and pushed the total entry count to 11.

**Fix**: Removed the 5 redundant canon-reference entries. Metadata reduced from 11 to 6 entries. `agent.contract_version` and `metadata.contract_version` both bumped to 3.0.1. No phase body or behavioral content was modified.

**Ripple assessment**: No ripple required. This change only affects the YAML `metadata` block (cosmetic platform-compliance fix). The contract's governing behavior, phase structure, POLC rules, IAA requirements, and all operational fields are unchanged. No consumer repos or downstream agents reference the removed entries.

