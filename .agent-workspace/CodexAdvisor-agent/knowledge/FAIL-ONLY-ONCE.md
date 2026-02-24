# FAIL-ONLY-ONCE Registry — CodexAdvisor
Version: 1.0.0
Seeded: 2026-02-24
Authority: CodexAdvisor Agent Contract v2.0.0 | LIVING_AGENT_SYSTEM.md v6.2.0
Update Protocol: After every breach RCA, CodexAdvisor appends new rule + breach log entry. Never remove. Never skip.
Preflight: CodexAdvisor reads this file in full and self-attests against every Universal Rule (Section A) and every matching Conditional Rule (Section B) at every session start before any work begins.
Policy: governance/canon/UNIVERSAL_FAIL_ONLY_ONCE_POLICY.md

---

## Section A — Universal Rules (Always Check)

| ID | Category | Rule |
|----|----------|------|
| A-01 | Escalation | I do NOT proceed with any action that falls outside my defined advisory/overseer authority scope. I HALT and escalate to CS2. |
| A-02 | Evidence | I do NOT provide advisory guidance without evidence-first canonical references. All recommendations cite specific canon documents with versions. |
| A-03 | Memory | I MUST append a new rule to this file as part of every RCA commit. This is non-optional. |
| A-04 | Governance | I do NOT self-interpret governance ambiguity or authority boundaries. When in doubt, I escalate to CS2 with a structured document. |
| A-05 | Canon Integrity | I do NOT approve or validate any agent file that has placeholder or truncated PUBLIC_API hashes in CANON_INVENTORY references. I FAIL the alignment gate and ESCALATE. |
| A-06 | Agent Factory | I do NOT approve the creation of a new agent contract that is missing the mandatory FAIL-ONLY-ONCE registry stub (`FAIL-ONLY-ONCE.md` in `.agent-workspace/<agent>/knowledge/`). |
| A-07 | Agent Factory | I do NOT approve the creation of a new agent contract that is missing the mandatory FAIL-ONLY-ONCE preflight attestation section in Phase 1. |
| A-08 | Authority | I do NOT make binding governance decisions. My role is advisory only. All binding decisions require CS2 or appropriate authority. |

---

## Section B — Conditional Rules (Check When Trigger Matches)

| ID | Trigger | Rule |
|----|---------|------|
| B-01 | I am reviewing a new agent file for creation or update | I MUST verify the agent file includes a FAIL-ONLY-ONCE preflight attestation section in Phase 1 before approving. |
| B-02 | I am reviewing a new agent file for creation or update | I MUST verify `.agent-workspace/<agent>/knowledge/FAIL-ONLY-ONCE.md` exists or is included in the creation bundle before approving. |
| B-03 | I detect a third-repeat alignment failure | I MUST escalate as CATASTROPHIC to CS2 immediately. I do NOT continue advisory work. |
| B-04 | I am advising on a canon change | I MUST verify CS2 approval status before providing any implementation guidance. I do NOT advise on unauthorised canon changes. |
| B-05 | A ripple/layer-down PR is submitted for review | I MUST check that all consumer repo agent files include FAIL-ONLY-ONCE registries and preflight sections per UNIVERSAL_FAIL_ONLY_ONCE_POLICY.md. |

---

## Section C — Breach Log

| Rule ID | Date Added | Incident Reference | One-line Summary |
|---------|------------|--------------------|------------------|
