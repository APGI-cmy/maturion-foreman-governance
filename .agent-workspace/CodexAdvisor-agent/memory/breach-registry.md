# FAIL-ONLY-ONCE Breach Registry — CodexAdvisor
**Authority**: CodexAdvisor Agent Contract v3.2.0 | LIVING_AGENT_SYSTEM.md v6.2.0
**Update Protocol**: After every breach RCA, append new entry. Never remove. Never skip.
**Preflight**: Read in full and re-attest every open breach at session start before any work begins.

---

## Open Breaches

| Breach ID | Gate | Session | Date | Description | Corrective Action | Status |
|-----------|------|---------|------|-------------|-------------------|--------|
| BREACH-001 | S6-06 | session-008-20260303 | 2026-03-03 | IAA was not invoked before handover of PR #1289 (agent harmonization). Task proceeded directly from OPOJD gate to report_progress commit without calling `task(agent_type: "independent-assurance-agent")`. Constitutes INC-IAA-SKIP-001. | (1) Register breach ✅; (2) Invoke IAA ✅ — REJECTION-PACKAGE IAA-20260303-PR1289 received; (3) Add B-06 rule to FAIL-ONLY-ONCE ✅; (4) RCA at rca-session-008-20260303.md ✅; (5) Create standard PREHANDOVER proof at .agent-admin/prehandover/ ✅; (6) Address all REM-002→006 ✅; (7) Re-invoke IAA after CS2 marks PR ready (REM-001 pending CS2) | PENDING CS2 — awaiting `gh pr ready 1289` then re-invocation |

---

## Closed Breaches

_none_

---

*CodexAdvisor-agent | Contract v3.2.0 | Created: 2026-03-03*
