# Escalation: CANON-HASH-001 Gate in Agent Contract (CodexAdvisor Handoff)

## Type
AGENT_CONTRACT_MODIFICATION_REQUEST

## Status
PENDING CS2/CodexAdvisor action — converted from blocker-20260223-canon-hash-001-gate.md

## Background
Session 048 (2026-02-23) identified that CANON-HASH-001 gate enforcement was not present in `.github/agents/governance-repo-administrator-v2.agent.md`. A blocker was created. Under the new AGENT_CONTRACT_FILE_PROTECTION_POLICY.md v1.0.0, this modification MUST be executed by CodexAdvisor with CS2 permission — not directly by governance-repo-administrator.

## Files Requiring Modification
- `.github/agents/governance-repo-administrator-v2.agent.md`:
  - Add to PREHANDOVER checklist: `- [ ] CANON-HASH-001: Run \`.github/scripts/validate-canon-hashes.sh\`; assert 0 failures before merge`
  - This gate is already present in the execution checklist section but needs to be in the prehandover checklist section

## Originating Issue
CS2 Issue: "Remediate all truncated file_hash entries in CANON_INVENTORY.json" (2026-02-23)
Blocker: blocker-20260223-canon-hash-001-gate.md (moved to resolved/ since CodexAdvisor pathway is now defined)

## Proposed Diff Specification
In `.github/agents/governance-repo-administrator-v2.agent.md`, find the execution checklist section and ensure:
```
- [ ] CANON-HASH-001: Run `.github/scripts/validate-canon-hashes.sh`; assert 0 failures before merge
```
is present in the prehandover/blocking section.

## Authority
Per AGENT_CONTRACT_FILE_PROTECTION_POLICY.md §1 and §3:
Only CodexAdvisor with CS2 permission may modify .github/agents/ files.
This escalation requests CS2 review and CodexAdvisor invocation.

---
Created: Session 056 | Date: 2026-02-24
Converted from: blocker-20260223-canon-hash-001-gate.md
