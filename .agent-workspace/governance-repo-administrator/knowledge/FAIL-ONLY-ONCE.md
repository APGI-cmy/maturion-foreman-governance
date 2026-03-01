# FAIL-ONLY-ONCE Registry — governance-repo-administrator
Version: 1.0.0
Seeded: 2026-02-24
Authority: Governance Repository Administrator Contract v2.0.0 | LIVING_AGENT_SYSTEM.md v6.2.0
Update Protocol: After every breach RCA, governance-repo-administrator appends new rule + breach log entry. Never remove. Never skip.
Preflight: governance-repo-administrator reads this file in full and self-attests against every Universal Rule (Section A) and every matching Conditional Rule (Section B) at every session start before any work begins.
Policy: governance/canon/UNIVERSAL_FAIL_ONLY_ONCE_POLICY.md

---

## Section A — Universal Rules (Always Check)

| ID | Category | Rule |
|----|----------|------|
| A-01 | Escalation | I do NOT proceed with any action that falls outside my defined administrator authority scope. I HALT and escalate to CS2. |
| A-02 | Evidence | I do NOT merge or approve any PR that is missing required evidence artifacts. |
| A-03 | Memory | I MUST append a new rule to this file as part of every RCA commit. This is non-optional. |
| A-04 | Governance | I do NOT self-interpret governance ambiguity or canon semantics. When in doubt, I escalate to CS2 with a structured document. |
| A-05 | Canon Integrity | I do NOT merge any PR with placeholder or truncated SHA256 hashes in CANON_INVENTORY.json. I FAIL the alignment gate and ESCALATE to CS2 (REQ-SS-004). |
| A-06 | Protected Files | I do NOT merge changes to protected canon files or agent contracts without documented CS2 approval. |
| A-07 | Ripple | I do NOT allow a constitutional canon change to be merged without executing layer-down ripple to all consumer repositories. |
| A-08 | Writes | I do NOT push directly to the main branch. All writes are via PR only. |
| A-09 | IAA Invocation | I do NOT open a PR without first invoking the IAA agent (Phase 4 Step 4.4 per GA contract) and recording the ASSURANCE-TOKEN in the prehandover proof. IAA invocation precedes `report_progress` on the final commit. |

---

## Section B — Conditional Rules (Check When Trigger Matches)

| ID | Trigger | Rule |
|----|---------|------|
| B-01 | I am about to merge a PR touching governance/canon/ | I MUST verify CS2 approval is documented for any semantic change to constitutional canon. |
| B-02 | I detect placeholder hashes in CANON_INVENTORY.json | I MUST immediately fail the alignment gate, escalate to CS2, and block the merge. |
| B-03 | A constitutional canon file is updated | I MUST execute layer-down ripple to all consumers in CONSUMER_REPO_REGISTRY.json and record the ripple log entry. |
| B-04 | I am reviewing a new agent contract | I MUST verify the agent file includes a FAIL-ONLY-ONCE preflight attestation section in Phase 1 and that the registry stub exists. |
| B-05 | CANON_INVENTORY total_canons is incremented | I MUST verify the new entry has a real SHA256 hash, provenance, and effective_date — not placeholder values. |

---

## Section C — Breach Log

| Rule ID | Date Added | Incident Reference | One-line Summary |
|---------|------------|--------------------|------------------|
| NEW-B-06 | 2026-02-24 | INCIDENT-2026-02-24-PR517-AGENT-CONTRACT-BREACH.md | Agent in maturion-isms PR #517 modified .github/agents/ files without CodexAdvisor involvement or CS2 layer-down issue — AGCFPP-001 enacted |
| A-09 | 2026-03-01 | PR #1253 (copilot/renumber-duplicate-rule-ids) — CS2 feedback on missing IAA invocation | GA opened PR #1253 without invoking IAA agent first; the omission violated Phase 4 Step 4.4 of the GA contract (`iaa_oversight.invocation_step`). Rule A-09 was created in this session to codify the requirement in FAIL-ONLY-ONCE and prevent recurrence. |

---

## Section D — Rules Added via RCA

| ID | Category | Rule | Added By RCA |
|----|----------|------|-------------|
| B-06 | Agent Contract Protection | I do NOT modify any file in `.github/agents/` under any circumstance — including ripple execution. If ripple requires agent contract changes, I STOP, create an escalation, and wait for CS2 to authorize CodexAdvisor. | INCIDENT-2026-02-24-PR517-AGENT-CONTRACT-BREACH.md |
