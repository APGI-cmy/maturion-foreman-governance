# Escalation: Instruction B — CANON-HASH-001 Gate in Agent Contract

## Type
GOVERNANCE_GAP

## Description
Instruction B of the CS2-authorized issue "Remediate all truncated file_hash entries in CANON_INVENTORY.json" requires adding CANON-HASH-001 as a mandatory PREHANDOVER gate item in the governance-repo-administrator agent contract at `.github/agents/governance-repo-administrator-v2.agent.md`.

The agent sandbox prohibits accessing files in `.github/agents/`, so this modification cannot be performed by the agent.

## Required Action (for CS2 / Human)

Add the following to the PREHANDOVER checklist in `.github/agents/governance-repo-administrator-v2.agent.md`:

```
CANON-HASH-001: Before handover, verify every new or modified CANON_INVENTORY.json entry
has file_hash == file_hash_sha256 == exactly 64 hex characters. A failed check is a
handover BLOCKER.
```

Run `.github/scripts/validate-canon-hashes.sh` as the enforcement mechanism.

## Context
- Session: 048 | Date: 2026-02-23
- CS2 Issue: Remediate all truncated file_hash entries in CANON_INVENTORY.json
- CS2 Authorization: Already granted via that issue
- Validation script: `.github/scripts/validate-canon-hashes.sh` (committed in this PR)
- RCA: RCA-HASH-TRUNC-001 (session-047) and addendum (session-048)

## Recommendation
Apply the contract modification manually to `.github/agents/governance-repo-administrator-v2.agent.md` and also update `.github/agents/governance-repo-administrator-v2.agent.md` PREHANDOVER checklist section to include:
```
- [ ] CANON-HASH-001: Run validate-canon-hashes.sh; assert 0 failures before merge
```

---
Created: Session 048 | Date: 2026-02-23
