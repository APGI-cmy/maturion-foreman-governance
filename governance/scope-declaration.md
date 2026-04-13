# Governance Scope Declaration

## Metadata
```yaml
---
PR_ID: "copilot/governance-harden-foreman-handover"
DATE_UTC: 2026-04-13T07:07:51Z
AGENT_ID: governance-repo-administrator-v2
RESPONSIBILITY_DOMAIN: Governance Repository Administration
CHANGE_TYPE: enforcement_hardening
---
```

## Executive Summary
Harden Foreman handover enforcement so final IAA audit/token is mandatory before PR can be treated as merge-ready. Root cause analysis identified token file naming inconsistency in CI check and missing PREHANDOVER PENDING token detection. Fixed both enforcement gaps with CI workflow changes.

## FILES_CHANGED

- .agent-admin/governance/foreman-handover-enforcement-analysis-1336.md
- .github/workflows/governance-ceremony-gate.yml
- .github/workflows/merge-gate-interface.yml
- governance/CHANGELOG.md
- governance/scope-declaration.md

## Scope Boundaries

### In Scope
- `.github/workflows/merge-gate-interface.yml` — `iaa/assurance-check` job widened to accept all valid token naming patterns (`assurance-token-*`, `iaa-token-session-*`, `iaa-assurance-token-*`)
- `.github/workflows/governance-ceremony-gate.yml` — New Job 4: `governance-ceremony/iaa-token-completeness` added to detect PREHANDOVER proofs with PENDING IAA tokens
- `.agent-admin/governance/foreman-handover-enforcement-analysis-1336.md` — Root cause analysis (D1-D4)
- `governance/CHANGELOG.md` — Entry for this change
- `governance/scope-declaration.md` — This file

### Out of Scope
- No Foreman contract changes (contract wording is sufficient per D2 analysis)
- No CANON_INVENTORY.json changes (no canon files modified)
- No consumer repo changes

## Constitutional Alignment
- `LIVING_AGENT_SYSTEM.md` v6.2.0 — GA contract authority
- `MERGE_GATE_INTERFACE_STANDARD.md` v1.0.0 — merge gate workflow structure
- CS2-authorized issue: #1336

## Ripple Requirements
- No canon files were modified — no ripple propagation required to consumer repos
- GA contract weaknesses identified (D4) are parking station items only — not in scope for this PR

## Scope-to-Diff Attestation
All modified files are within the Agent Contract Governance responsibility domain.

FILES_CHANGED above reflects the complete `git diff --name-only origin/main...HEAD` output for this PR. This scope declaration is the final update to this file; no further artifacts will be added to this PR.

**IAA Token**: `IAA-20260409-PR1339-R3` — ASSURANCE-TOKEN — MERGE PERMITTED  
**Attestation**: CodexAdvisor-agent (session-012-20260409)  
**Date**: 2026-04-09T11:07:00Z

---

**Timestamp**: 2026-04-09T09:10:00Z  
**Agent**: CodexAdvisor-agent
