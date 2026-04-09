# Governance Scope Declaration

## Metadata
```yaml
---
PR_ID: "copilot/review-foreman-v2-agent-contract"
DATE_UTC: 2026-04-09T07:55:00Z
AGENT_ID: CodexAdvisor-agent
RESPONSIBILITY_DOMAIN: Agent Contract Governance
CHANGE_TYPE: agent_contract_repair
---
```

## Executive Summary
CodexAdvisor session-012: Full review and repair of canonical `foreman-v2.agent.md` contract. Size reduced from 62,414 to 28,882 characters (was 208% over 30,000-character limit). YAML hardened to strengthened pattern. 12-stage pre-build model added. Parallel-wave constraints added. IAA pre-brief promoted to Phase 2 gate. All 9 critical deltas from D1 review artifact addressed. Includes IAA ceremony artifacts and Correction Addendum for REJECTION-PACKAGE IAA-20260409-PR1339.

## FILES_CHANGED

- .agent-admin/assurance/correction-addendum-session-012-wave1-20260409.md
- .agent-admin/assurance/iaa-token-session-012-wave1-20260409.md
- .agent-admin/assurance/rejection-package-1339.md
- .agent-workspace/CodexAdvisor-agent/memory/PREHANDOVER-session-012-20260409.md
- .agent-workspace/CodexAdvisor-agent/memory/foreman-governance-review-20260409.md
- .agent-workspace/CodexAdvisor-agent/memory/session-012-20260409.md
- .agent-workspace/CodexAdvisor-agent/parking-station/suggestions-log.md
- .agent-workspace/foreman-v2/knowledge/builder-task-template.md
- .agent-workspace/foreman-v2/knowledge/index.md
- .agent-workspace/foreman-v2/knowledge/pre-build-stage-model-reference.md
- .agent-workspace/foreman-v2/knowledge/session-memory-template.md
- .agent-workspace/independent-assurance-agent/escalation-inbox/rejection-tracking-1339-20260409.md
- .agent-workspace/independent-assurance-agent/memory/session-030-20260409.md
- .github/agents/foreman-v2.agent.md
- governance/quality/agent-integrity/INTEGRITY_INDEX.md
- governance/quality/agent-integrity/foreman-v2.agent.md
- governance/scope-declaration.md

## Scope Boundaries

### In Scope
- `.github/agents/foreman-v2.agent.md` (v2.3.0→v3.0.0) — full repair against strengthened canonical Foreman pattern; size reduced; YAML hardened; 12-stage pre-build model; parallel-wave constraints; IAA pre-brief gate; F4: SELF-MOD-FM-001 enforcement→CONSTITUTIONAL; F5: BUILD_PHILOSOPHY.md path corrected
- `governance/quality/agent-integrity/foreman-v2.agent.md` — reference copy updated (must match live file)
- `governance/quality/agent-integrity/INTEGRITY_INDEX.md` — SHA256 updated for foreman-v2.agent.md
- `.agent-workspace/foreman-v2/knowledge/` — Tier 2 stub updated: index.md updated; session-memory-template.md, builder-task-template.md, pre-build-stage-model-reference.md created
- Evidence and session artifacts (PREHANDOVER proof, session memory, review artifact D1, parking station D4)
- IAA ceremony artifacts (rejection package, correction addendum, escalation tracking)
- `governance/scope-declaration.md` — this file (F2 remediation)

### Out of Scope
- No application code changes
- No CANON_INVENTORY.json changes (foreman-v2.agent.md is not a canonized governance artifact)
- No consumer repo changes (GA contract weaknesses recorded in parking station as follow-up only)

## Constitutional Alignment
- `LIVING_AGENT_SYSTEM.md` v6.2.0 — CodexAdvisor contract authority
- `AGENT_CONTRACT_ARCHITECTURE.md` — contract structure authority
- `FAIL-ONLY-ONCE.md` — all universal and conditional rules
- CS2-authorized issue: [Governance] CodexAdvisor review and repair of foreman-v2-agent contract in governance repo (opened by APGI-cmy)

## Ripple Requirements
- No canon files were modified — no ripple propagation required to consumer repos
- GA contract weaknesses identified (D4) are parking station items only — not in scope for this PR

## Scope-to-Diff Attestation
All modified files are within the Agent Contract Governance responsibility domain.

FILES_CHANGED above reflects the complete `git diff --name-only origin/main...HEAD` output for this PR. This scope declaration is the final update to this file; no further artifacts will be added to this PR.

**IAA Token**: [pending IAA re-invocation — to be updated after ASSURANCE-TOKEN received]  
**Attestation**: CodexAdvisor-agent (session-012-20260409)  
**Date**: 2026-04-09T07:55:00Z

---

**Timestamp**: 2026-04-09T07:55:00Z  
**Agent**: CodexAdvisor-agent
