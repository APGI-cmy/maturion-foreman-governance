# IAA Assurance Token — Session 012, Wave 1 — 2026-04-09 (R3)

```
ASSURANCE-TOKEN
PR: #1339
Date: 2026-04-09
IAA Session: IAA-20260409-PR1339-R3
Phases Verified: 1-PASS, 2-PASS, 3-PASS, 4-PASS
Agent Integrity: PASS
Independence: CONFIRMED
Prior Sessions: IAA-20260409-PR1339 (REJECTION-PACKAGE R0 — resolved R1); IAA-20260409-PR1339-R1 (ASSURANCE-TOKEN — superseded by R2 CS2 fixes); IAA-20260409-PR1339-R2 (ASSURANCE-TOKEN — superseded by R3 CS2 fix)
R3 Fix Verified: wake-up-protocol.sh argument corrected foreman→foreman-v2 in live + reference copy; builder-tasks + session-memory paths corrected; INTEGRITY_INDEX SHA refreshed to 46afbf42... — ALL PASS
Verdict: MERGE PERMITTED
```

**Submitting Agent**: CodexAdvisor-agent (session-012-20260409)  
**Target Contract**: `.github/agents/foreman-v2.agent.md` v3.0.0  
**Contract SHA256**: `46afbf429f81226b0abdbdb8fed4d4649a057871da73f6548041dfde1f8b89e5`  
**CS2 Authorization**: Issue opened by APGI-cmy (Johan Ras); R3 commit 69585c7 co-authored by APGI-cmy  
**Branch**: `copilot/review-foreman-v2-agent-contract`  
**HEAD Commit**: `69585c763e7dc77bea97e3d4f32512d2adf6adcc`

---

## Phase Findings Summary

| Phase | Verdict | Key Evidence |
|-------|---------|-------------|
| Phase 1 — Preflight | PASS | PREHANDOVER committed at 3a7633c; immutable (not touched by R3 commit); CS2 auth confirmed; no open blockers |
| Phase 2 — Governance | PASS | CANON_INVENTORY 199 entries, no placeholder hashes; ripple NO RIPPLE REQUIRED per correction addendum |
| Phase 3 — Working | PASS | R3 changes correct and minimal (3 files); all prior findings F2/F3/F4/F5 remain resolved; char count 28,691/30,000 PASS |
| Phase 4 — Handover | PASS | Gate parity PASS; PREHANDOVER immutability preserved (not touched by R3); INV-405 BLOCKING check PASS |

---

## Agent Integrity Verification (all 4 agents — HEAD 69585c7)

| Agent Contract | Live SHA256 | INTEGRITY_INDEX SHA256 | Result |
|---|---|---|---|
| `CodexAdvisor-agent.md` | `bcc12cb03e1a67d8bf0d14a9dca53042d7a07e285d3b929d350454c02fa1ae6f` | `bcc12cb03e1a67d8bf0d14a9dca53042d7a07e285d3b929d350454c02fa1ae6f` | ✅ MATCH |
| `foreman-v2.agent.md` | `46afbf429f81226b0abdbdb8fed4d4649a057871da73f6548041dfde1f8b89e5` | `46afbf429f81226b0abdbdb8fed4d4649a057871da73f6548041dfde1f8b89e5` | ✅ MATCH |
| `governance-repo-administrator-v2.agent.md` | `55b87adf5794ceba832051caa3113fb01de0ea6ad8e21f8e4d12368ee585b961` | `55b87adf5794ceba832051caa3113fb01de0ea6ad8e21f8e4d12368ee585b961` | ✅ MATCH |
| `independent-assurance-agent.md` | `0d414fd2d059fbda8ed8a2bab42fc4698674d893d45ea954d92d0f940165b8ac` | `0d414fd2d059fbda8ed8a2bab42fc4698674d893d45ea954d92d0f940165b8ac` | ✅ MATCH |

---

## R3 CS2-Directed Fix Verification

| Fix | Described | Verified |
|-----|-----------|---------|
| wake-up-protocol.sh arg corrected `foreman`→`foreman-v2` in `.github/agents/foreman-v2.agent.md` | YES | ✅ Live file: `wake-up-protocol.sh foreman-v2` |
| wake-up-protocol.sh arg corrected in `governance/quality/agent-integrity/foreman-v2.agent.md` | YES | ✅ Reference copy: `wake-up-protocol.sh foreman-v2` |
| builder-tasks path corrected `foreman/`→`foreman-v2/` (×2 occurrences) | YES | ✅ Confirmed in live file |
| session-memory path corrected `foreman/memory/`→`foreman-v2/memory/` | YES | ✅ Confirmed in live file |
| INTEGRITY_INDEX SHA refreshed from `6609dc2e...`→`46afbf42...` | YES | ✅ Live SHA matches INTEGRITY_INDEX |
| Reference copy re-synced to live file | YES | ✅ diff = no output (FILES_MATCH) |

---

## Scope Declaration Check (A-026)

- `governance/scope-declaration.md` lists **19 files**
- `git diff --name-only origin/main...HEAD` returns **19 files** (exact match)
- R3 commit modifies 3 files already within declared scope — **A-026 PASS**

---

*IAA: independent-assurance-agent | Session IAA-20260409-PR1339-R3 | 2026-04-09 | CS2 authorized*  
*Authority: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.5.0 | LIVING_AGENT_SYSTEM.md v1.2.0*  
*Token file written per contract Phase 4 §4.2*
