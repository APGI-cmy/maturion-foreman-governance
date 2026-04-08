# Governance Scope Declaration

## Metadata
```yaml
---
PR_ID: "copilot/governance-harden-pre-iaa-handover"
DATE_UTC: 2026-04-08T00:00:00Z
AGENT_ID: governance-repo-administrator-v2
RESPONSIBILITY_DOMAIN: Governance Administration
CHANGE_TYPE: governance_normative_enhancement
---
```

## Executive Summary
Canonised §4.3c Pre-IAA Commit-State Gate as a mandatory BLOCKING step in Phase 4 Handover for all producing-agent contracts. Updated AGENT_HANDOVER_AUTOMATION.md v1.1.5→v1.2.0. Updated three producing-agent contracts (Foreman, CodexAdvisor, GA) via CodexAdvisor (B-06 compliant). Updated INTEGRITY_INDEX.md. Issued layer-down ripple to consumer repos. Aligned advisory_phase PHASE_A_ADVISORY→PHASE_B_BLOCKING across all three contracts.

## FILES_CHANGED

- .agent-admin/assurance/rejection-package-1330.md
- .agent-admin/governance/ripple-logs/ripple-pre-iaa-commit-state-gate-20260408.md
- .agent-admin/prehandover/proof-20260408T095629Z.md
- .agent-admin/waves/wave-pre-iaa-commit-state-gate-20260408-checklist.md
- .agent-workspace/governance-repo-administrator/memory/session-20260408.md
- .github/agents/CodexAdvisor-agent.md
- .github/agents/foreman-v2.agent.md
- .github/agents/governance-repo-administrator-v2.agent.md
- governance/CANON_INVENTORY.json
- governance/CHANGELOG.md
- governance/canon/AGENT_HANDOVER_AUTOMATION.md
- governance/layer-down/RIPPLE-PRE-IAA-COMMIT-STATE-GATE-20260408.md
- governance/quality/agent-integrity/CodexAdvisor-agent.md
- governance/quality/agent-integrity/INTEGRITY_INDEX.md
- governance/quality/agent-integrity/foreman-v2.agent.md
- governance/quality/agent-integrity/governance-repo-administrator-v2.agent.md

## Scope Boundaries

### In Scope
- `governance/canon/AGENT_HANDOVER_AUTOMATION.md` (v1.2.0): §4.3c Pre-IAA Commit-State Gate added
- `governance/CANON_INVENTORY.json`: SHA256 updated
- `governance/CHANGELOG.md`: PRE-IAA-COMMIT-STATE-GATE-CANON-2026-04-08 entry
- `.github/agents/foreman-v2.agent.md`: §4.3a + §4.5; PHASE_B_BLOCKING (via CodexAdvisor)
- `.github/agents/CodexAdvisor-agent.md`: Step 4.3c; PHASE_B_BLOCKING (via CodexAdvisor)
- `.github/agents/governance-repo-administrator-v2.agent.md`: PHASE_B_BLOCKING (via CodexAdvisor)
- `governance/quality/agent-integrity/`: 3 reference copies + INTEGRITY_INDEX.md
- `governance/layer-down/RIPPLE-PRE-IAA-COMMIT-STATE-GATE-20260408.md`: layer-down ripple
- Evidence artifacts (PREHANDOVER proof, session memory, wave checklist, ripple log)

### Out of Scope
- No application code changes
- No changes to independent-assurance-agent.md

## Constitutional Alignment
- `AGENT_HANDOVER_AUTOMATION.md` v1.2.0 — parent canon
- `LIVING_AGENT_SYSTEM.md` v6.2.0 — GA contract authority
- `FAIL-ONLY-ONCE.md` — Rule B-06 agent contract protection (OVF-002, Rules A-10, B-07)
- `IAA_PRE_BRIEF_PROTOCOL.md` v1.2.0

## Ripple Requirements
- CHANGELOG.md entry marks `Layer-Down Status: PUBLIC_API`. Layer-down ripple issued to consumer repos.

## Scope-to-Diff Attestation
All modified files are within the Governance Administration responsibility domain.

**IAA Token**: PENDING  
**Attestation**: governance-repo-administrator-v2  
**Date**: 2026-04-08T00:00:00Z

---
**Timestamp**: 2026-04-08T00:00:00Z  
**Agent**: governance-repo-administrator-v2
