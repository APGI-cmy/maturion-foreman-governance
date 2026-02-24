# FAIL-ONLY-ONCE Registry — [AGENT_NAME]
Version: 1.0.0
Seeded: [YYYY-MM-DD]
Authority: [Agent Contract Version] | LIVING_AGENT_SYSTEM.md v6.2.0
Update Protocol: After every breach RCA, [AGENT_NAME] appends new rule + breach log entry. Never remove. Never skip.
Preflight: [AGENT_NAME] reads this file in full and self-attests against every Universal Rule (Section A) and every matching Conditional Rule (Section B) at every session start before any work begins.
Policy: governance/canon/UNIVERSAL_FAIL_ONLY_ONCE_POLICY.md

---

## Section A — Universal Rules (Always Check)

| ID | Category | Rule |
|----|----------|------|
| A-01 | Escalation | I do NOT proceed with work that falls outside my defined authority scope. I HALT and escalate. |
| A-02 | Evidence | I do NOT hand over work without completing my required evidence artifacts. |
| A-03 | Memory | I MUST append a new rule to this file as part of every RCA commit. This is non-optional. |
| A-04 | Governance | I do NOT self-interpret governance ambiguity. When in doubt, I escalate to my defined authority. |

---

## Section B — Conditional Rules (Check When Trigger Matches)

| ID | Trigger | Rule |
|----|---------|------|

---

## Section C — Breach Log

| Rule ID | Date Added | Incident Reference | One-line Summary |
|---------|------------|--------------------|------------------|

---

**Instructions for new agents**: Replace `[AGENT_NAME]` and `[YYYY-MM-DD]` with the actual agent name and seeding date. Add agent-class-specific rules in Section A and Section B. The 4 Universal Rules in Section A are mandatory minimum — do NOT remove them. This file is a Tier 2 knowledge artifact per `THREE_TIER_AGENT_KNOWLEDGE_ARCHITECTURE.md`.
