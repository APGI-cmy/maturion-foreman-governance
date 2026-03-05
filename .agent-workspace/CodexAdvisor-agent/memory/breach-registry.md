# FAIL-ONLY-ONCE Breach Registry — CodexAdvisor
**Authority**: CodexAdvisor Agent Contract v3.4.0 | LIVING_AGENT_SYSTEM.md v6.2.0
**Update Protocol**: After every breach RCA, append new entry. Never remove. Never skip.
**Preflight**: Read in full and re-attest every open breach at session start before any work begins.

---

## Open Breaches

| Breach ID | Gate | Session | Date | Description | Status |
|-----------|------|---------|------|-------------|--------|
| BREACH-002 | B-06 / INC-IAA-SKIP-001 | session-011-20260305 | 2026-03-05 | IAA was not invoked before final handover commit on PR (agent contract alignment — `.github/agents/` modified). INC-IAA-SKIP-001 repeat. B-06 rule re-triggered. | CORRECTIVE ACTION COMPLETE — IAA invoked; REJECTION-PACKAGE IAA-20260305-ISMS-ALIGN (HALT-004 SELF-ASSURANCE-001); CS2 direct merge authorization required |

---

## Closed Breaches

| Breach ID | Gate | Session | Date | Description | Resolution | Closed By |
|-----------|------|---------|------|-------------|------------|-----------|
| BREACH-001 | S6-06 | session-008-20260303 | 2026-03-03 | IAA was not invoked before handover of PR #1289. INC-IAA-SKIP-001. | (1) Breach registered ✅; (2) RCA at rca-session-008-20260303.md ✅; (3) B-06 rule added to FAIL-ONLY-ONCE ✅; (4) IAA invoked (session-009) — REJECTION-PACKAGE IAA-20260303-PR1289 ✅; (5) All REM-002→006 addressed ✅; (6) IAA re-invoked (session-010) — **ASSURANCE-TOKEN IAA-20260303-PR1289-R2 issued 2026-03-03** ✅ | ASSURANCE-TOKEN IAA-20260303-PR1289-R2 | 2026-03-03 |

---

*CodexAdvisor-agent | Contract v3.4.0 | Updated: 2026-03-05*
