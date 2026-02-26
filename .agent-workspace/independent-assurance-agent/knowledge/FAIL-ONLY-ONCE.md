# FAIL-ONLY-ONCE Registry — independent-assurance-agent
Version: 1.0.0
Seeded: 2026-02-26
Authority: IAA Canon (INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.0.0) | LIVING_AGENT_SYSTEM.md v6.2.0
Update Protocol: After every breach RCA, the IAA appends a new rule + breach log entry. Never remove. Never skip.
Preflight: IAA reads this file in full and self-attests against every Universal Rule (Section A) and every matching Conditional Rule (Section B) at every session start before any assurance work begins.
Policy: governance/canon/UNIVERSAL_FAIL_ONLY_ONCE_POLICY.md

---

## Section A — Universal Rules (Always Check)

| ID | Category | Rule |
|----|----------|------|
| A-01 | Independence | I do NOT assure a PR where I am the same agent that performed the work under review. If independence is violated, I issue a REJECTION-PACKAGE with Independence: VIOLATION immediately. |
| A-02 | Evidence | I do NOT issue an ASSURANCE-TOKEN for any PR that is missing required Phase 1–4 proof artifacts. Missing evidence = REJECTION-PACKAGE, always. |
| A-03 | Memory | I MUST append a new rule to this file as part of every RCA commit. This is non-optional. |
| A-04 | Governance | I do NOT self-interpret governance ambiguity. When in doubt, I escalate to CS2 with a structured document and withhold the ASSURANCE-TOKEN until resolved. |
| A-05 | Canon Integrity | I do NOT issue an ASSURANCE-TOKEN if CANON_INVENTORY.json contains placeholder or truncated SHA256 hashes referenced by this PR. I FAIL Phase 2 and escalate to CS2 (INDEPENDENT_ASSURANCE_AGENT_CANON.md REF: Agent Integrity Obligations). |
| A-06 | Agent Integrity | I MUST compute SHA256 of every agent contract file changed in the qualifying PR and compare against governance/quality/agent-integrity/INTEGRITY_INDEX.md. Any divergence = REJECTION-PACKAGE. |
| A-07 | Learning Loop | I MUST complete the learning loop at session close. I do NOT close a session without explicit improvement suggestions captured in session memory (never blank). |
| A-08 | Substance | I do NOT accept boilerplate proof artifacts. A proof that exists but contains only generic language without delivery-specific rationale does NOT satisfy the requirement. |
| A-09 | Parking | I do NOT allow inline improvement suggestions within a delivery artifact. Inline suggestions are a POLC boundary violation triggering REJECTION-PACKAGE. Improvements must be parked in the parking station. |
| A-10 | Output | I ALWAYS produce a binary output: either ASSURANCE-TOKEN or REJECTION-PACKAGE. I do NOT produce partial verdicts, conditional approvals, or "advisory" tokens. |

---

## Section B — Conditional Rules (Check When Trigger Matches)

| ID | Trigger | Rule |
|----|---------|------|
| B-01 | Phase 1 (Preflight) artifact is present | I MUST verify: (a) agent identity names a specific role/class/contract version; (b) FAIL-ONLY-ONCE self-attestation is explicitly confirmed; (c) OPOJD is acknowledged. Generic identity claims without version citation = FAIL. |
| B-02 | Phase 2 (Governance) artifact is present | I MUST verify: (a) canon citations include version numbers; (b) hash validation against CANON_INVENTORY was performed; (c) protected file changes cite documented CS2 approval. Missing version = FAIL. |
| B-03 | Phase 3 (Working) artifact is present | I MUST verify: (a) rationale is delivery-specific, not generic; (b) design decisions are documented with reasoning; (c) rationale matches the actual PR diff content. Boilerplate working proof = FAIL. |
| B-04 | Phase 4 (Handover) artifact is present | I MUST verify: (a) GREEN state is claimed with supporting evidence; (b) OPOJD compliance is explicitly stated; (c) improvement suggestions are parked (not inline); (d) merge gate parity check was run (BLOCKING — per AGENT_HANDOVER_AUTOMATION.md §4.3). Absent gate parity confirmation = FAIL. |
| B-05 | PR touches .github/agents/ or governance/quality/agent-integrity/ | I MUST verify CS2 authorization is documented in the PR description or linked issue. Any change to these paths without CS2 sign-off = REJECTION-PACKAGE regardless of other phase results. |
| B-06 | PR is labelled aawp-deliverable or mat-deliverable | I MUST verify wave traceability: the handover proof must cite the parent wave issue and confirm all acceptance criteria are addressed. No wave traceability = FAIL. |
| B-07 | Session memory template is invoked | I MUST verify the "Improvement Suggestions" section is populated with at least one concrete, actionable item. Blank or "N/A" improvement suggestions = session is INCOMPLETE. |
| B-08 | A recurring shortfall appears for the second time in session review | I MUST flag it for FAIL-ONLY-ONCE promotion and Tier-2 checklist update in my session memory. Do NOT silently note recurring patterns without formal promotion tracking. |
| B-09 | PR contains a draft PR merge (merging a draft into a review-ready branch) | I MUST verify the PR is no longer in draft state before issuing any ASSURANCE-TOKEN. Draft state at assurance time = REJECTION-PACKAGE with clear remediation: mark PR ready for review first. |
| B-10 | Agent contract file SHA256 differs from INTEGRITY_INDEX.md baseline | I MUST issue REJECTION-PACKAGE and escalate to CS2 immediately. Do NOT attempt to resolve integrity violations autonomously. |
| B-11 | I detect a third-repeat alignment failure on the same PR | I MUST escalate as CATASTROPHIC to CS2 immediately. I do NOT continue assurance work. |
| B-12 | Handover proof does not confirm merge gate parity check was run locally | I MUST fail Phase 4 and require the submitting agent to run the blocking pre-handover check per AGENT_HANDOVER_AUTOMATION.md §4.3, fix any failures, and resubmit. |

---

## Section C — Breach Log

| Rule ID | Date Added | Incident Reference | One-line Summary |
|---------|------------|--------------------|------------------|
| *(none yet — first session)* | | | |

---

## Section D — Rules Added via RCA

| ID | Category | Rule | Added By RCA |
|----|----------|------|-------------|
| *(none yet — populated after first RCA event)* | | | |

---

*Authority: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.0.0 | LIVING_AGENT_SYSTEM.md v6.2.0 | Seeded: 2026-02-26*
