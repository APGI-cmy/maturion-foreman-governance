# FAIL-ONLY-ONCE Registry — governance-repo-administrator
Version: 1.1.0
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
| A-10 | Pre-IAA Commit State | I do NOT invoke the IAA agent if there are staged, modified, or unstabilised changes in the working tree that should have been committed before IAA invocation. I MUST confirm a clean and committed working state before invoking IAA. (OVF-002 — promoted 2026-04-05) |

---

## Section B — Conditional Rules (Check When Trigger Matches)

| ID | Trigger | Rule |
|----|---------|------|
| B-01 | I am about to merge a PR touching governance/canon/ | I MUST verify CS2 approval is documented for any semantic change to constitutional canon. |
| B-02 | I detect placeholder hashes in CANON_INVENTORY.json | I MUST immediately fail the alignment gate, escalate to CS2, and block the merge. |
| B-03 | A constitutional canon file is updated | I MUST execute layer-down ripple to all consumers in CONSUMER_REPO_REGISTRY.json and record the ripple log entry. |
| B-04 | I am reviewing a new agent contract | I MUST verify the agent file includes a FAIL-ONLY-ONCE preflight attestation section in Phase 1 and that the registry stub exists. |
| B-05 | CANON_INVENTORY total_canons is incremented | I MUST verify the new entry has a real SHA256 hash, provenance, and effective_date — not placeholder values. |
| B-07 | I am about to invoke the IAA agent (Phase 4.5) | I MUST run `git status` and confirm the working tree is clean (no untracked, staged, or modified files that belong in this PR). If any such changes exist, I MUST commit them first, then re-run pre-handover gate parity checks, before invoking IAA. (OVF-002) |
| B-08 | I am preparing a PREHANDOVER proof for a PR that amends one or more canon files | I MUST include a drift evidence table in the proof with before/after SHA256 for every amended canon file. A proof without per-file drift evidence when canon files were modified is non-compliant (ECAP-QC-001). |
| B-09 | I am about to invoke IAA on a governance PR (any PR that modifies files under governance/, .agent-admin/, .agent-workspace/, or .github/) | I MUST run the §4.3d scope-declaration parity gate: regenerate `governance/scope-declaration.md` from `git diff --name-only origin/main...HEAD` as the absolute last file committed, verify the FILES_CHANGED count matches, commit it, then and only then invoke IAA. No further file modifications are permitted after scope-declaration regeneration (ECAP-QC-002). |
| B-10 | I am updating any entry in CANON_INVENTORY.json | I MUST verify: (1) `amended_date` equals today's date for every amended entry; (2) `version == canonical_version` for every entry where `canonical_version` is present and non-null; (3) `file_hash` and `file_hash_sha256` are recomputed from the current file state. Failure to update any of these three fields is a metadata integrity violation (ECAP-QC-003, ECAP-QC-004). |

---

## Section C — Breach Log

| Rule ID | Date Added | Incident Reference | One-line Summary |
|---------|------------|--------------------|------------------|
| NEW-B-06 | 2026-02-24 | INCIDENT-2026-02-24-PR517-AGENT-CONTRACT-BREACH.md | Agent in maturion-isms PR #517 modified .github/agents/ files without CodexAdvisor involvement or CS2 layer-down issue — AGCFPP-001 enacted |
| A-09 | 2026-03-01 | PR #1253 (copilot/renumber-duplicate-rule-ids) — CS2 feedback on missing IAA invocation | GA opened PR #1253 without invoking IAA agent first; the omission violated Phase 4 Step 4.4 of the GA contract (`iaa_oversight.invocation_step`). Rule A-09 was created in this session to codify the requirement in FAIL-ONLY-ONCE and prevent recurrence. |
| A-09 | 2026-03-03 | PR #1294 (copilot/create-iaa-pre-brief-protocol) — CS2 feedback: "You cannot hand over without IAA token. Invoke IAA agent now. Record this failure as learning." | GA submitted report_progress commits without invoking IAA agent first; A-09 was in the FAIL-ONLY-ONCE registry but was not applied before the final commit. Evidence artifacts and IAA invocation performed retroactively this session. |
| OVF-002 | 2026-04-05 | PR #1313 and PR #1319 — recurring pattern: IAA invoked with staged-but-uncommitted changes present | GA invoked IAA agent in PR #1313 and PR #1319 with changes staged but not yet committed to the PR branch, creating unauditable session state at assurance time. CS2 directed promotion to active FAIL-ONLY-ONCE rule. Rules A-10 and B-07 added. |
| ECAP-QC | 2026-04-09 | PR #1332 — multiple remediation cycles: OVL-CG-005 (missing drift evidence), OVL-CG-006 (stale hash), A-026×6 (stale scope-declaration), version/canonical_version mismatch, stale amended_date | PR #1332 required IAA rejection + remediation + CS2 post-merge comment fixes before merge. Five distinct failure modes identified. Rules B-08, B-09, B-10 added to prevent recurrence. |

---

## Section D — Rules Added via RCA

| ID | Category | Rule | Added By RCA |
|----|----------|------|-------------|
| B-06 | Agent Contract Protection | I do NOT modify any file in `.github/agents/` under any circumstance — including ripple execution. If ripple requires agent contract changes, I STOP, create an escalation, and wait for CS2 to authorize CodexAdvisor. | INCIDENT-2026-02-24-PR517-AGENT-CONTRACT-BREACH.md |
| A-10 | Pre-IAA Commit State | I do NOT invoke IAA with a dirty working tree. All changes belonging to the current PR must be committed before IAA invocation. | OVF-002 — PR #1313 / PR #1319 recurring pattern — promoted 2026-04-05 per CS2 directive |
| B-07 | Pre-IAA State Check | Immediately before IAA invocation at Phase 4.5, I run `git status` and confirm clean state. If dirty, I commit all pending changes, re-run gate parity, then invoke IAA. | OVF-002 — promoted 2026-04-05 per CS2 directive |
| B-08 | Drift Evidence | For every PR that amends canon files, the PREHANDOVER proof MUST include a drift evidence table with before/after SHA256 for every amended file. No drift evidence = OVL-CG-005 finding. | ECAP-QC-001 — PR #1332 IAA REJECTION-PACKAGE 2026-04-09 |
| B-09 | Scope-Declaration Parity | For governance PRs, regenerate `governance/scope-declaration.md` as the absolute last committed file before IAA invocation. Run §4.3d gate to verify FILES_CHANGED count matches `git diff --name-only origin/main...HEAD`. This rule codifies OVF-003 as an active check. | ECAP-QC-002 — PR #1332 A-026 (6th occurrence) + CS2 post-merge feedback 2026-04-09 |
| B-10 | CANON_INVENTORY Metadata | When updating any CANON_INVENTORY.json entry: (1) set `amended_date` = today; (2) align `canonical_version` = `version`; (3) recompute `file_hash` and `file_hash_sha256` from current file. Failure = OVL-CG-006 or INV-607 or ECAP-QC-003. | ECAP-QC-003/ECAP-QC-004 — PR #1332 amended_date + version mismatch findings 2026-04-09 |

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-02-24 | Initial creation — Rules A-01 through A-09; Rules B-01 through B-05; B-06 via RCA (INCIDENT-2026-02-24-PR517) |
| 1.1.0 | 2026-04-05 | OVF-002 promotion — added Rule A-10 (Pre-IAA Commit State), Rule B-07 (Pre-IAA State Check); Section C breach log entry for OVF-002; Section D RCA entries for A-10 and B-07; per CS2 directive issue #1319 |
| 1.2.0 | 2026-04-09 | ECAP-QC closure — added Rules B-08 (Drift Evidence), B-09 (Scope-Declaration Parity), B-10 (CANON_INVENTORY Metadata); Section C breach log entry for ECAP-QC; Section D RCA entries for B-08/B-09/B-10; per ECAP-001 follow-up quality closure issue |
