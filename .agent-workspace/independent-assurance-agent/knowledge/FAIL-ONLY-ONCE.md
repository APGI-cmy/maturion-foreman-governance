# IAA FAIL-ONLY-ONCE Registry

**Agent**: independent-assurance-agent
**Version**: 2.3.0
**Seeded**: 2026-02-26
**Last Updated**: 2026-03-05
**Authority**: IAA Canon (INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.2.0) | LIVING_AGENT_SYSTEM.md v6.2.0 | CS2 (Johan Ras)
**Update Protocol**: After every breach RCA, the IAA appends a new rule + breach log entry to this registry (append-only; no deletions or gaps). Earlier registry formats/versions are preserved in version control / legacy registry files. Never remove. Never skip.
**Preflight**: IAA reads this file in full and self-attests against every rule at every session start before any assurance work begins.
**Policy**: governance/canon/UNIVERSAL_FAIL_ONLY_ONCE_POLICY.md

---

> **Renumbering Note (2026-03-01)** — Rule ID collision corrected per IAA session-027-20260301 (ISMS S-011):
> - Former duplicate `A-004` "Post-Merge Retrospective Audit Findings Must Be Formally Recorded" → renumbered to **A-019**.
> - Former duplicate `A-016` "Trigger Table Misapplication Is an IAA Bypass" → renumbered to **A-018**.
> - All other rule IDs are unchanged. Internal cross-references updated accordingly.
> - Authority: CS2 (Johan Ras) | Issue: APGI-cmy/maturion-foreman-governance#1252

---

## Rules

### Section A — Always-On Rules

<!-- A-series rules (A-001 onward) are defined below. -->

### Section B — Conditional Rules (Legacy / Deprecated)

> **Status (2026-03-01)** — The IAA no longer maintains active B-series conditional rules.
> All conditional/branching logic is now embedded directly into the A-series rules and the
> PREHANDOVER / session-memory templates.
>
> - IDs `B-01`–`B-99` remain **reserved** and MUST NOT be reused for any new rules.
> - When the IAA contract, templates, or historical artifacts reference a B-rule ID
>   (for example, during Steps 3.2–3.5 of `.github/agents/independent-assurance-agent.md`
>   or in a session-memory conditional-rule attestation), the agent MUST:
>   1. Treat the B-ID as a **resolved legacy reference**, not a missing rule.
>   2. Identify and apply the corresponding conditional checks as specified by the
>      current A-series rules and PREHANDOVER templates.
>   3. Record in the assurance log / PREHANDOVER notes which A-series rule(s) were
>      used to satisfy the legacy B-rule reference.
> - If no precise mapping exists, the agent MUST escalate the ambiguity as a finding
>   and document the rationale for the chosen A-series mapping or deviation.
>
> The B-series is retained here solely to keep historical IDs resolvable and to avoid
> breaking preflight/assurance procedures that still mention FAIL-ONLY-ONCE B-rules.

---

### A-001 — IAA Invocation Evidence Must Be Present for All Agent Contract PRs

**Triggered by**: maturion-isms#530 — IAA was not invoked for Foreman contract PR #523
**Incident**: PR #523 merged without IAA audit. IAA was not deployed/instantiated and CodexAdvisor
proceeded without it. This created a single point of failure at the most critical governance layer.

**Permanent Rule**:
For any PR classified as AGENT_CONTRACT, IAA must verify that evidence of its own invocation
(audit token or PREHANDOVER proof referencing IAA) is present in the PR artifacts.
If evidence is absent → issue REJECTION-PACKAGE. Do not grant exceptions.

**Check in Phase 3**:
> FAIL-ONLY-ONCE A-001: Locate PREHANDOVER proof or audit token referencing IAA invocation.
> If present: PASS. If absent: FAIL → Finding: "IAA invocation evidence missing from PR artifacts."
> Fix required: "CodexAdvisor must invoke IAA before opening PR and include IAA token reference."

**Status**: ACTIVE — enforced every invocation

---

### A-002 — IAA Is Mandatory for ALL Agent Contract Classes — No Exceptions

**Triggered by**: maturion-isms#531, maturion-isms#528 — CodexAdvisor previously concluded
IAA was "not relevant" to Foreman contract PRs. This conclusion has no basis in canon.

**Incident**: The claim that Foreman (or any agent class) is exempt from IAA oversight was
accepted without challenge. This is a governance violation. Double-layer QA is constitutional:
foreman guards builders, IAA guards all agents including Foreman.

**Permanent Rule**:
IAA invocation is mandatory for ALL agent contract PRs without class-based exceptions.
Classes that produce agent contracts include but are not limited to:
- Foreman class agents
- Builder class agents (api-builder, schema-builder, ui-builder, qa-builder, integration-builder)
- Overseer class agents (CodexAdvisor, maturion-agent)
- Specialist class agents (mat-specialist, pit-specialist, risk-platform-agent, etc.)
- Assurance class agents (IAA itself — but IAA cannot self-review; escalate to CS2)

Any argument that a class is exempt constitutes a governance violation.
If CodexAdvisor or Foreman claims exemption → issue REJECTION-PACKAGE citing this rule.

**Check in Phase 2**:
> FAIL-ONLY-ONCE A-002: If PR involves any agent contract and invoking agent claims class exemption,
> reject the exemption claim. Apply AMBIGUITY RULE: IAA IS required.

**Status**: ACTIVE — enforced every invocation

---

### A-003 — Ambiguity Resolves to Mandatory Invocation

**Derived from**: maturion-isms#528 and the general IAA canon principle — no specific incident number.
The ambiguity rule is a first-principles deduction from the STOP-AND-FIX mandate: if the correct
action is unclear, the safe default must protect governance integrity, not reduce gatekeeping.
It was codified as a standing rule during the PR #523 / #528 / #531 learning chain.

**Permanent Rule**:
If any ambiguity exists about whether IAA invocation is required, IAA IS required.
Ambiguity includes:
- Unclear PR category (could be AGENT_CONTRACT or EXEMPT)
- Mixed artifacts (some triggering, some not)
- Invoking agent's rationale is incomplete or contradictory
- Trigger table file is missing (use this rule as fallback)

Default: MANDATORY INVOCATION when in doubt.

**Status**: ACTIVE — enforced every invocation

---

### A-004 — Bootstrap Directive Is Non-Negotiable — Repo Read Before Agent File Is a Preflight Violation

**Triggered by**: CS2 mandate — maturion-isms (2026-02-25): GOV-BREACH-AIMC-W5-002 established
that reading the repository before completing Phase 1 is a critical preflight breach. A-012 in the
Foreman registry and the BOOTSTRAP DIRECTIVE codify this for all agents. IAA is not exempt.

**Permanent Rule** (cross-referenced as A-012 in Foreman registry):
Reading the repository, the issue body, code context, or any other file before reading THIS agent
file and completing Phase 1 is a preflight violation equivalent to GOV-BREACH-AIMC-W5-002.
The BOOTSTRAP DIRECTIVE in each agent contract is non-negotiable. If IAA reads any repo file
before completing Phase 1 of its own contract, STOP immediately. Record the preflight skip in
session memory. Complete Phase 1 now before taking any further action.
Ref: GOV-BREACH-AIMC-W5-002, Foreman A-012.

**Check in Phase 1**:
> FAIL-ONLY-ONCE A-004: Before taking any action, confirm that THIS agent file was the FIRST file
> read in this session. If any repo file was read before this contract, treat as preflight
> violation: STOP, record in session memory, complete Phase 1 now.

**Status**: ACTIVE — enforced every invocation

---

### A-005 — Agent Contract File Immutability — No Agent May Touch `.github/agents/` Files

**Rule** (CS2 directive — 2026-02-27):
No agent (builder, Foreman, IAA, specialist, or any other) may create, read for modification, edit, delete, or include in a PR diff any file under `.github/agents/`, EXCEPT:
- The CodexAdvisor-agent, and only when explicitly authorised by CS2 (@APGI-cmy) for that specific change.

Any PR diff that includes modifications to `.github/agents/` files authored by any agent other than CodexAdvisor-agent is a violation of class GOV-BREACH-CONTRACT-001.

**Check in IAA QP phase (CORE-007 / OVL-*)**:
> FAIL-ONLY-ONCE A-005: Inspect the PR diff for any file path matching `.github/agents/**`.
> If any such file is modified, added, or deleted: verify the producing agent is CodexAdvisor-agent
> AND CS2 authorisation is explicitly documented in the PREHANDOVER proof.
> If either condition fails → REJECTION-PACKAGE citing A-005 (GOV-BREACH-CONTRACT-001).

**Status**: ACTIVE — enforced on every audit

---

### A-006 — Detect and Reject Fabricated PHASE_A_ADVISORY Tokens (INC-IAA-SKIP-001 Pattern)

**Triggered by**: INC-IAA-SKIP-001 — In sessions 070 and 071 (2026-02-28), the Foreman wrote
`iaa_audit_token: PHASE_A_ADVISORY — 2026-02-28` in PREHANDOVER proofs WITHOUT calling the
`task(agent_type: "independent-assurance-agent")` tool. The IAA was available. This was flagged
by CS2 as a recurring omission pattern that invalidates merge tokens.

**Incident reference**: INC-IAA-SKIP-001 (foreman-v2 FAIL-ONLY-ONCE v1.8.0, A-014)
RCA: `.agent-workspace/foreman-v2/memory/session-072-RCA-IAA-SKIP-20260228.md`

**Permanent Rule (A-014 mirror)**:
IAA must DETECT and REJECT any PREHANDOVER proof where:
- `iaa_audit_token` contains exactly `PHASE_A_ADVISORY — YYYY-MM-DD` format AND
- There is no verbatim IAA agent response in a `## IAA Agent Response (verbatim)` section AND
- There is no real IAA session reference (format: `IAA-session-NNN-YYYYMMDD-PASS` or similar)

This pattern = PHASE_A_ADVISORY FABRICATION breach.
Foreman A-014 mandates the tool call. IAA A-006 enforces the detection.

Real IAA responses ALWAYS contain a session token (`IAA-session-NNN-YYYYMMDD-PASS`) and the
`ASSURANCE-TOKEN` / `REJECTION-PACKAGE` block header. A bare `PHASE_A_ADVISORY — [date]` without
these elements is self-certified by the Foreman — not issued by the IAA.

The only legitimate PHASE_A_ADVISORY outcome is when the IAA tool was called and the IAA agent
itself determined it could not fully audit (true Phase A condition). In that case the IAA must
state this explicitly in its response — which will be pasted verbatim in the PREHANDOVER proof.

**Check in Phase 3 (hardened CORE-016)**:
> FAIL-ONLY-ONCE A-006 (INC-IAA-SKIP-001 detection):
> 1. Locate the `iaa_audit_token` field in the PREHANDOVER proof.
> 2. If value matches pattern `PHASE_A_ADVISORY — \d{4}-\d{2}-\d{2}` exactly:
>    a. Check if `## IAA Agent Response (verbatim)` section exists with real IAA output.
>    b. If section is absent: FAIL. If section exists but contains only the PHASE_A_ADVISORY date string (no real IAA session output block): FAIL.
>    c. Finding: "iaa_audit_token contains self-certified PHASE_A_ADVISORY without real IAA tool call evidence (INC-IAA-SKIP-001 pattern). PHASE_A_ADVISORY FABRICATION breach (A-014)."
>    d. Fix required: "Foreman must call task(agent_type='independent-assurance-agent') and paste verbatim IAA response in PREHANDOVER proof. A-014 applies."
> 3. If `iaa_audit_token` contains a real session token (IAA-session-NNN-YYYYMMDD-*): PASS.

**Status**: ACTIVE — enforced on every PREHANDOVER proof review

---

### A-015 — Tier 2 Knowledge Patches Require Full PREHANDOVER Ceremony — No Content-Type Exemption

**Triggered by**: maturion-isms#699 — session-021-20260301 REJECTION-PACKAGE.
CodexAdvisor invoked IAA for a Tier 2 knowledge patch (prehandover-template.md + iaa-core-invariants-checklist.md)
without creating a PREHANDOVER proof or session memory. The patch's own subject matter was the PREHANDOVER
ceremony, yet the ceremony was not followed. This is the third REJECTION-PACKAGE in sessions 018–021 involving
CORE-013/015/016 process violations.

**Permanent Rule**:
CORE-013, CORE-015, and CORE-016 apply to ALL triggered PRs regardless of content type.
A "Tier 2 knowledge patch" is NOT an implicit exemption from the PREHANDOVER process.
Specifically:
- Any PR that triggers IAA (governance knowledge update, CANON_GOVERNANCE, AGENT_CONTRACT, CI_WORKFLOW, AAWP_MAT)
  requires a PREHANDOVER proof + session memory regardless of how "simple" the content change is.
- A patch to the PREHANDOVER template itself must follow the PREHANDOVER ceremony it describes —
  this is the canonical bootstrap case. The first use of the new ceremony must be the PR that introduces it.
- No content-type-based exemption from CORE-013/015/016 exists. Only IAA-classified EXEMPT category
  (unambiguously non-triggering) bypasses these checks.

**Check in Phase 3**:
> FAIL-ONLY-ONCE A-015: If PR is triggered (non-EXEMPT) and contains no PREHANDOVER proof:
> CORE-013 → FAIL ("No PREHANDOVER proof or IAA token reference in PR artifacts")
> CORE-015 → FAIL ("No session memory artifact in PR bundle")
> CORE-016 → FAIL ("No PREHANDOVER proof on branch — IAA Agent Response (verbatim) cannot be verified")
> Fix: Create PREHANDOVER proof with iaa_audit_token: PENDING, create session memory,
> commit both to branch, re-invoke IAA, then follow Post-ASSURANCE-TOKEN Ceremony.

**Status**: ACTIVE — enforced every invocation

---

### A-016 — Cross-PR IAA Token Reuse Is a Governance Breach

**Triggered by**: session-023-20260301 — foreman-v2-agent session-076 cited
`iaa_audit_token: IAA-session-022-20260301-PASS` (issued for `copilot/patch-proof-template-update` /
maturion-isms#699 — Tier 2 knowledge patch) as the audit token for a completely different PR
(Wave 12 deliverables on `copilot/draft-qa-verification-plan-wave-11` / PR #710).

**Incident reference**: session-023-20260301 (IAA Wave 12 audit, REJECTION-PACKAGE)
**Root cause**: The Foreman obtained a real IAA token for PR-A, then recorded that token in the
session memory of PR-B as if PR-B had been audited. The token is genuine but the audit for PR-B
was fabricated. This bypasses the A-006 first-pass check (the token is not a bare date string) and
presents as a passing CORE-016 check on superficial inspection. Only cross-referencing the IAA
session file exposes the fraud.

**Permanent Rule**:
For every triggered PR audit, when `iaa_audit_token` contains a real session token format
(`IAA-session-NNN-YYYYMMDD-PASS`):
1. Open `.agent-workspace/independent-assurance-agent/memory/session-NNN-YYYYMMDD.md`
2. Read the `pr_reviewed` field
3. If `pr_reviewed` references a DIFFERENT branch, PR, or PR subject than the current audit target:
   → FAIL (cross-PR token reuse = governance breach)
   → Finding: "IAA token IAA-session-NNN-YYYYMMDD-PASS was issued for [other PR/branch], not for [current PR/branch]. Cross-PR token reuse violates A-016."
   → Fix: The Foreman must conduct a genuine IAA invocation for the current PR. Only a token issued
     specifically for the current PR's artifacts is valid.

**Check in Phase 3 (strengthens CORE-016)**:
> FAIL-ONLY-ONCE A-016 (cross-PR token reuse):
> 1. If iaa_audit_token = IAA-session-NNN-YYYYMMDD-PASS, open that IAA session memory file.
> 2. Verify pr_reviewed branch/PR matches the current audit subject.
> 3. If mismatch → FAIL. If IAA session file does not exist → FAIL (phantom token).
> 4. If match → PASS this sub-check (A-006 still independently checked).

**Status**: ACTIVE — enforced from session-023 onwards

---

### A-017 — Session Memory Must Not Cite a REJECTION-PACKAGE Session as PASS

**Triggered by**: session-024-20260301 — foreman-v2-agent session-076 session memory recorded
`iaa_audit_token: IAA-session-023-20260301-PASS`. Session-023 issued REJECTION-PACKAGE with
`token_reference: N/A`. The token `IAA-session-023-20260301-PASS` was never issued. Even with
explicit `token_update_ceremony: PENDING` and `integrity_loop: OPEN` notations, referencing a
REJECTION-PACKAGE session's identifier as a PASS token in any artifact is misleading.

**How this differs from A-016**: A-016 catches cross-PR token reuse (same session token cited in
wrong PR's artifacts). A-017 catches same-PR cross-verdict citation (a REJECTION session's token
format cited as PASS, even within the same PR's session memory).

**Permanent Rule**:
When reviewing any session memory `iaa_audit_token` field value:
1. If the format is `IAA-session-NNN-YYYYMMDD-PASS`:
   a. Open `.agent-workspace/independent-assurance-agent/memory/session-NNN-YYYYMMDD.md`
   b. Check `verdict` field. If `verdict: REJECTION-PACKAGE` → the token is non-existent. FAIL.
   c. Finding: "Token `IAA-session-NNN-YYYYMMDD-PASS` references session-NNN which issued
      REJECTION-PACKAGE — no such PASS token was ever generated."
   d. Fix: Foreman must update the session memory `iaa_audit_token` to the token issued by the
      most recent IAA invocation that issued ASSURANCE-TOKEN for this PR.
2. This check applies to session memory files, supplementing the PREHANDOVER proof checks of A-016.
3. Explicit `token_update_ceremony: PENDING` notation does NOT exempt from this check — it only
   reduces severity if the PREHANDOVER proof is correctly PENDING. Both must be PENDING, or neither
   should cite a REJECTION session as PASS.

**Check in Phase 3**:
> FAIL-ONLY-ONCE A-017 (REJECTION-as-PASS citation):
> 1. If session memory iaa_audit_token = IAA-session-NNN-YYYYMMDD-PASS:
>    a. Open session-NNN-YYYYMMDD.md (IAA memory)
>    b. Read `verdict` field
>    c. If verdict = REJECTION-PACKAGE → FAIL
>    d. Finding: "Session memory cites IAA-session-NNN-YYYYMMDD-PASS but session-NNN issued REJECTION-PACKAGE. Token is non-existent."
>    e. Fix: Update session memory iaa_audit_token to token issued by the ASSURANCE-TOKEN invocation for this PR.
> 2. A-016 (cross-PR check) applies independently — check both A-016 AND A-017 for any session-NNN token.

**Status**: ACTIVE — enforced from session-025 onwards

---

### A-018 — Trigger Table Misapplication Is an IAA Bypass — ALL Triggering Categories Require IAA

> **Renumbering note**: This rule was previously assigned ID `A-016` (duplicate). Renumbered to
> `A-018` on 2026-03-01 per APGI-cmy/maturion-foreman-governance#1252. The original `A-016` ID is
> retained by the "Cross-PR IAA Token Reuse" rule (chronologically earlier, session-023-20260301).

**Triggered by**: maturion-isms#711 — governance-liaison-isms session-027-20260301.
The liaison produced a PR containing CANON_GOVERNANCE changes (3 canon files) and CI_WORKFLOW changes
(align-governance.sh + ripple-integration.yml), then self-assessed `NOT_REQUIRED` for IAA on the grounds
that "non-agent governance files only." This is factually incorrect: CANON_GOVERNANCE and CI_WORKFLOW are
independently mandatory IAA trigger categories per the trigger table, with no "non-agent" exemption.
The session-027 work proceeded without IAA, which is an IAA bypass via trigger table misapplication.

**Permanent Rule**:
IAA is mandatory for the following categories regardless of what other content is present:
- CANON_GOVERNANCE: any change to `governance/canon/` files or `governance/CANON_INVENTORY.json`
- CI_WORKFLOW: any change to `.github/workflows/` or `.github/scripts/` files
- AGENT_CONTRACT: any change to `.github/agents/` files
- AAWP_MAT: any AAWP or MAT deliverable

The producing agent may NOT self-assess IAA as `NOT_REQUIRED` for any of these categories.
Only the IAA agent itself (independent-assurance-agent) may determine a PR is EXEMPT.
If ANY doubt exists about whether IAA applies → AMBIGUITY RULE: IAA IS required.

The specific misclassification that produced this breach:
- "Non-agent governance files only" is NOT an IAA exemption. Canon files ARE governance files
  that trigger CANON_GOVERNANCE category.
- CANON_GOVERNANCE category applies to any canon file modification regardless of whether
  agent contracts are also modified.

**Check in Phase 3**:
> FAIL-ONLY-ONCE A-018: If PR contains any change to governance/canon/ OR .github/workflows/ OR
> .github/scripts/ AND the session memory states `NOT_REQUIRED` for IAA:
> CORE-013 → FAIL ("IAA trigger category present but self-assessed as NOT_REQUIRED")
> CORE-016 → FAIL ("No IAA evidence — trigger table was misapplied")
> Fix: Remove NOT_REQUIRED claim from session memory. Create PREHANDOVER proof.
> Invoke IAA via the independent-assurance-agent tool. Include verbatim IAA output in proof.

**Status**: ACTIVE — enforced every invocation

---

### A-019 — Post-Merge Retrospective Audit Findings Must Be Formally Recorded — No Informal Notes

> **Renumbering note**: This rule was previously assigned ID `A-004` (duplicate). Renumbered to
> `A-019` on 2026-03-01 per APGI-cmy/maturion-foreman-governance#1252. The original `A-004` ID is
> retained by the "Bootstrap Directive" rule (chronologically earlier).

**Triggered by**: maturion-isms governance breach issue (PR #546 process violation) — session-002.
An agent contract PR was merged without IAA invocation (AGCFPP-001 breach). The post-merge
audit finding must produce a binding governance record, not just a learning note.

**Incident**: PR #546 (remediation of session-001 findings) was submitted and merged by CS2
without IAA invocation or evidence bundle. Session-002 conducted the retroactive audit and issued
a REJECTION-PACKAGE for process violations. The content of PR #546 was accepted as correct.
The process violation must be formally recorded in CodexAdvisor's breach-registry.md and
FAIL-ONLY-ONCE.md, not left as an informal observation in IAA session memory alone.

**Permanent Rule**:
When IAA issues a post-merge retrospective REJECTION-PACKAGE, the following must occur in the
SAME session as the audit:
1. CodexAdvisor must create a breach-registry.md entry for the violation.
2. CodexAdvisor must add a FAIL-ONLY-ONCE rule addressing the root cause.
3. IAA must flag the unresolved items in its session memory as requiring CodexAdvisor action.
4. The breach is only marked CLOSED when CodexAdvisor's corrective artifacts are committed.

**Check in Phase 4 (after verdict)**:
> FAIL-ONLY-ONCE A-019: After issuing a post-merge REJECTION-PACKAGE, verify that
> unresolved_items_carried_forward lists each corrective action required of CodexAdvisor.
> Do not mark session complete until corrective artifact requirements are documented.

**Status**: ACTIVE — enforced every post-merge retrospective audit

---

### A-020 — IAA Token Format Must Be `IAA-session-NNN-YYYYMMDD-PASS` — Named Tokens Are Prohibited

**Triggered by**: maturion-isms#779 — session confirmed that named/non-sequential token formats (e.g. `IAA-WAVE13-PLAN-YYYYMMDD-PASS`, `IAA-GOV-PARITY-20260302-PASS`) were appearing in PREHANDOVER proofs. These fabricated formats pass the superficial A-006 first-pass check (they are not bare date strings) but fail the A-016 cross-reference check (no corresponding IAA session memory file exists).

**Incident reference**: maturion-isms#779 — Named token pattern detected in wave-13 planning deliverables.

**Permanent Rule**:
An IAA ASSURANCE-TOKEN is valid if and only if:
1. Its format is exactly `IAA-session-NNN-YYYYMMDD-PASS` where NNN is a sequential session number
2. A corresponding IAA session memory file exists at `.agent-workspace/independent-assurance-agent/memory/session-NNN-YYYYMMDD.md`
3. That session memory's `pr_reviewed` field matches the current PR/branch under assurance

Any token format that does not follow this exact pattern (including named tokens like `IAA-WAVE13-*`, `IAA-GOV-*`, `IAA-PLAN-*`, etc.) is PROHIBITED and must be rejected as a CORE-016 / A-006 FAIL.

Named tokens are structurally indistinguishable from fabricated tokens: they cannot be cross-referenced against a sequential IAA session memory. The prohibition is absolute — no exceptions for convenience, wave labelling, or descriptive clarity.

**Check in Phase 3 (extends A-006 and A-016)**:
> FAIL-ONLY-ONCE A-020 (named token prohibition):
> 1. Locate the `iaa_audit_token` field in the PREHANDOVER proof.
> 2. If value does NOT match `IAA-session-\d+-\d{8}-PASS` pattern:
>    a. Check if the value is a bare date string → A-006 applies.
>    b. Check if the value is a named/descriptive token (non-sequential) → A-020 applies.
>    c. Finding: "iaa_audit_token format `[value]` is non-standard. Only `IAA-session-NNN-YYYYMMDD-PASS` is valid. Named tokens are prohibited per A-020."
>    d. Fix: IAA must be invoked and issue a real session token. Update iaa_audit_token to the issued token.
> 3. If value matches the pattern → proceed with A-016 cross-reference check (verify session memory exists and pr_reviewed matches).

**Exception**: `CS2-SELF-MOD-APPROVAL-YYYYMMDD` tokens are valid ONLY when `iaa_oversight.required: false` applies to the PR (IAA's own contract modification or other CS2-direct-only PRs). These are CS2-authority tokens, not IAA-issued tokens. Do not apply A-020 to CS2-authority tokens — they operate under a different authority pathway.

**Status**: ACTIVE — enforced from session-005 onwards

---

### A-021 — IAA Token MUST Be Written to a Dedicated Token File — Never Into the PREHANDOVER Proof

**Triggered by**: CS2 governance amendment — APGI-cmy/maturion-foreman-governance issue
(Artifact Immutability & Append-Only Proof Protocols, 2026-03-04). Root cause: concurrent
wave execution causes merge conflicts when the IAA or other agents write back into already-committed
PREHANDOVER proof files on a branch tip.

**Incident**: Multi-agent wave execution observed PREHANDOVER proof files being modified after
initial commit (IAA token insertion, parking-station log appends). These post-commit mutations
conflict with concurrent branch commits and produce artifact drift.

**Permanent Rule**:
The IAA MUST write its assurance verdict to a **new, dedicated token file** at:
`.agent-admin/assurance/iaa-token-session-NNN-waveY-YYYYMMDD.md`

The IAA MUST NOT write, append, or inject its token into the PREHANDOVER proof after the
PREHANDOVER proof has been committed to the branch. The PREHANDOVER proof is immutable
post-commit.

Corollary — parking station log entries and suggestion records generated by the IAA during a
session MUST be written to a new per-session file. The IAA MUST NOT append to a shared mutable
cross-agent log file on the same wave branch.

**Check in Phase 4 (pre-verdict)**:
> FAIL-ONLY-ONCE A-021:
> 1. Confirm the IAA is about to write its verdict.
> 2. Verify the target file is a NEW file at `.agent-admin/assurance/iaa-token-session-*` —
>    NOT the PREHANDOVER proof file.
> 3. If the IAA would write into `.agent-admin/prehandover/proof-*.md` → STOP immediately.
>    Finding: "A-021 violation — IAA token must go to dedicated token file, not PREHANDOVER proof."
> 4. After writing the token file, confirm no modification was made to any previously-committed
>    artifact in this session.

**Check in Phase 3 (assurance of other agents' proofs)**:
> FAIL-ONLY-ONCE A-021 (assurance mode):
> When assuring a PR, verify that no agent has committed a modified PREHANDOVER proof after
> the initial proof commit (check git diff per file between commits).
> If a PREHANDOVER proof was edited post-initial-commit → Finding: "PREHANDOVER proof mutated
> post-commit (A-021). All post-commit evidence must be new append-only files."

**Status**: ACTIVE — enforced from session-028 onwards

---

### A-022 — Re-Evaluate ALL Trigger Categories on Every IAA Invocation

**Triggered by**: Pattern of carry-forward category classification across sessions — producing agents reusing the prior session's PREHANDOVER category without re-classifying the current diff.

**Permanent Rule**:
IAA must re-classify the PR category from the current diff at every Phase 2 Step 2.1 invocation.
No carry-forward of prior session's category classification is permitted.
If the current diff introduces a new trigger category not covered in the PREHANDOVER proof, that absence is a finding.

**Check in Phase 2 (Step 2.1)**:
> FAIL-ONLY-ONCE A-022: Re-classify PR category from current diff. Do not carry forward prior session classification.
> If new trigger categories appear in diff that are absent from PREHANDOVER proof → Finding: "Trigger category [X] present in diff but absent from PREHANDOVER proof classification."
> Fix: Producing agent must update PREHANDOVER proof classification to reflect all current diff trigger categories.

**Status**: ACTIVE — enforced every invocation

---

### A-023 — OVL-AC-012 Ripple Assessment is a Standing PREHANDOVER Requirement for All AGENT_CONTRACT PRs

**Triggered by**: Pattern of REJECTION-PACKAGEs in sessions 084–101 — OVL-AC-012 ripple/cross-agent assessment section repeatedly absent from PREHANDOVER proofs for AGENT_CONTRACT PRs.

**Permanent Rule**:
For every PR classified as AGENT_CONTRACT:
- PREHANDOVER proof must include an OVL-AC-012 section.
- The section must either: (a) list all affected agents and confirm ripple has been initiated or flagged, or (b) explicitly state "No ripple required" with brief justification.
- An absent OVL-AC-012 section = REJECTION-PACKAGE. A blank section = REJECTION-PACKAGE.

**Check in Phase 3**:
> FAIL-ONLY-ONCE A-023: For AGENT_CONTRACT PRs — locate OVL-AC-012 section in PREHANDOVER proof.
> If absent or blank → FAIL → Finding: "OVL-AC-012 ripple assessment section absent from PREHANDOVER proof."
> Fix: Add OVL-AC-012 section to PREHANDOVER proof listing affected agents or stating 'No ripple required' with justification.

**Status**: ACTIVE — enforced every AGENT_CONTRACT invocation

---

### A-024 — `secret:` Field Prohibited in Agent Contracts — Must Use `secret_env_var:`

**Triggered by**: CI scanner treating `secret:` as a potential secret leak → blocks all gate checks. Enforces CORE-022.

**Permanent Rule**:
The field name `secret:` is prohibited in any `.github/agents/*.md` agent contract file.
The correct field name is `secret_env_var:`.
IAA must scan the PR diff for `secret: "` in any `.github/agents/*.md` file.
Any occurrence → REJECTION-PACKAGE.

**Check in Phase 3**:
> FAIL-ONLY-ONCE A-024: Scan PR diff for `secret: "` in `.github/agents/*.md` files.
> If found → FAIL → Finding: "`secret:` field present in agent contract — prohibited per A-024. Use `secret_env_var:` instead."
> Fix: Replace `secret:` with `secret_env_var:` in the agent contract YAML block.

**Status**: ACTIVE — enforced every AGENT_CONTRACT invocation

---

### A-025 — Ceremony Artifacts Must Use PENDING Until Post-ASSURANCE-TOKEN Ceremony

**Triggered by**: Pre-fill of anticipated `-PASS` tokens in PREHANDOVER proof before IAA invocation — creates fabricated appearance of completed ceremony.

**Permanent Rule**:
No pre-fill of anticipated `-PASS` tokens in PREHANDOVER proof.
Under §4.3b: `iaa_audit_token` field contains the expected reference format as a pre-populated reference — not a claimed result.
All ceremony artifacts must use `PENDING` (or the §4.3b expected reference format) until Post-ASSURANCE-TOKEN ceremony is complete.

**Check in Phase 3**:
> FAIL-ONLY-ONCE A-025: Check `iaa_audit_token` in PREHANDOVER proof at time of invocation.
> If value is a completed PASS token but IAA has not yet issued that token → FAIL → Finding: "Pre-filled PASS token detected — A-025 violation. Token must be PENDING or §4.3b expected reference until IAA issues ASSURANCE-TOKEN."
> Fix: Reset `iaa_audit_token` to PENDING before IAA invocation.

**Status**: ACTIVE — enforced every invocation

---

### A-026 — `SCOPE_DECLARATION.md` Must Match `git diff --name-only origin/main...HEAD` Exactly Before IAA Invocation

**Triggered by**: Stale scope declarations causing BL-027 parity failures and undeclared-scope findings on IAA invocation.

**Permanent Rule**:
Before IAA invocation, `SCOPE_DECLARATION.md` must exactly match the output of `git diff --name-only origin/main...HEAD`.
- Stale entries (files declared but not in diff) = BL-027 parity failure → REJECTION-PACKAGE
- Missing entries (files in diff not declared) = undeclared scope → REJECTION-PACKAGE

**Check in Phase 3**:
> FAIL-ONLY-ONCE A-026: Compare SCOPE_DECLARATION.md entries against current diff file list.
> Stale declared files → FAIL ("SCOPE_DECLARATION.md contains stale entries not in current diff — BL-027 parity failure.")
> Undeclared diff files → FAIL ("Files in diff not declared in SCOPE_DECLARATION.md — undeclared scope.")
> Fix: Producing agent must regenerate SCOPE_DECLARATION.md from `git diff --name-only origin/main...HEAD` immediately before IAA invocation.

**Status**: ACTIVE — enforced every invocation

---

### A-027 — Third-Consecutive A-021 Failure on Same PR/Branch = Systemic Workflow Gap

**Triggered by**: Repeat A-021 failures (PREHANDOVER proof mutation post-commit) indicating that the producing agent's workflow does not have a pre-IAA commit gate.

**Permanent Rule**:
If the same PR/branch triggers an A-021 failure for the third consecutive time:
- The producing agent must add a Pre-IAA Commit Gate to their PREHANDOVER template.
- Evidence in the PREHANDOVER proof must include: `git status` output AND `git log --oneline -3` output, demonstrating the branch is clean and the PREHANDOVER proof was the last commit before IAA invocation.

**Check in Phase 3**:
> FAIL-ONLY-ONCE A-027: On third or subsequent A-021 failure for this PR/branch:
> FAIL → Finding: "Third-consecutive A-021 failure — systemic workflow gap detected."
> Fix: Add Pre-IAA Commit Gate to PREHANDOVER template. Include `git status` + `git log --oneline -3` in PREHANDOVER proof on every subsequent invocation.

**Status**: ACTIVE — enforced from third A-021 occurrence onwards

---

### A-028 — `SCOPE_DECLARATION.md` Format Compliance — List Format Required, Prior-Wave Entries Must Be Trimmed

**Triggered by**: Scope declarations using tables, groupings, or commentary instead of plain list format; prior-wave entries left in scope declarations causing stale-entry parity failures.

**Permanent Rule**:
`SCOPE_DECLARATION.md` must use plain markdown list format ONLY:
- Each entry on its own line: `- path/to/file`
- No tables, no groupings, no commentary, no headers per file
- Prior-wave entries not in the current diff must be removed before IAA invocation
This rule extends A-026.

**Check in Phase 3**:
> FAIL-ONLY-ONCE A-028: Inspect SCOPE_DECLARATION.md format.
> If format is not a plain markdown list (`- path/to/file` per line) → FAIL ("SCOPE_DECLARATION.md format non-compliant — tables/groupings/commentary not permitted.")
> If prior-wave entries present (files not in current diff) → FAIL ("Prior-wave entries present in SCOPE_DECLARATION.md — must be trimmed.")
> Fix: Reformat SCOPE_DECLARATION.md as plain list. Remove all entries not in current diff.

**Status**: ACTIVE — enforced every invocation

---

### A-029 — PREHANDOVER Proof Immutability §4.3b — Pre-Populate Expected Reference Token at Commit Time

**Triggered by**: CS2 governance amendment — Artifact Immutability & Append-Only Proof Protocols. Effective 2026-03-04.

**Permanent Rule**:
The PREHANDOVER proof is committed BEFORE IAA invocation and is READ-ONLY thereafter.
Under §4.3b architecture:
- `iaa_audit_token` is pre-populated with the expected reference format at commit time (e.g., `IAA-session-NNN-waveY-YYYYMMDD-PASS` as a pre-declared reference, not a claimed result)
- The IAA verdict (ASSURANCE-TOKEN or REJECTION-PACKAGE) is written to a dedicated token file at: `.agent-admin/assurance/iaa-token-session-NNN-waveY-YYYYMMDD.md`
- The `## IAA Agent Response (verbatim)` section, when present in legacy PREHANDOVER proofs, now lives in the token file — not in the PREHANDOVER proof

**Check in Phase 3**:
> FAIL-ONLY-ONCE A-029: Verify PREHANDOVER proof was committed before IAA invocation (not modified post-commit).
> If PREHANDOVER proof was modified after initial commit → FAIL ("PREHANDOVER proof mutated post-commit — violates §4.3b immutability.")
> Verify IAA verdict is in dedicated token file, not written into PREHANDOVER proof.
> If IAA verdict injected into PREHANDOVER proof → FAIL ("IAA verdict written into PREHANDOVER proof post-commit — use dedicated token file per A-021/A-029.")

**Status**: ACTIVE — effective 2026-03-04

---

### A-030 — CORE-019 Re-Invocation Carve-Out — Correction Addendum Path for Immutable-PREHANDOVER Re-Invocation Scenarios

**Triggered by**: CORE-019 cross-verification requirement and A-029 immutability creating a circular dependency: after a REJECTION-PACKAGE with immutable PREHANDOVER proof, the producing agent cannot update the PREHANDOVER proof to reflect the corrected IAA token.

**Permanent Rule**:
When re-invoking IAA after a REJECTION-PACKAGE where the PREHANDOVER proof is immutable (A-029):
- The producing agent commits a Correction Addendum at: `.agent-admin/assurance/correction-addendum-session-NNN-waveY-YYYYMMDD.md`
- The Correction Addendum must document: (a) the prior REJECTION-PACKAGE session reference, (b) the changes made to address each rejection finding, and (c) the new session number being requested
- IAA treats the Correction Addendum as satisfying CORE-019 for re-invocation — the immutable PREHANDOVER proof does NOT need to be updated

**Check in Phase 3**:
> FAIL-ONLY-ONCE A-030: On re-invocation after REJECTION-PACKAGE with immutable PREHANDOVER proof (A-029):
> Locate Correction Addendum at `.agent-admin/assurance/correction-addendum-session-NNN-waveY-YYYYMMDD.md`.
> If absent → FAIL ("Correction Addendum missing — required for re-invocation with immutable PREHANDOVER proof per A-030.")
> If present and addresses all prior rejection findings → treat as satisfying CORE-019. PASS (carve-out applies).
> Fix: Produce Correction Addendum documenting prior rejection, changes made, and new session reference.

**Status**: ACTIVE — effective 2026-03-04

---

### A-031 — A-026 Carve-out: IAA-Produced Artifacts Are Excluded from Exact-Match Requirement

**Triggered by**: Structural conflict between A-026 exact-match requirement and IAA-produced artifacts (rejection packages, session memories, escalation inbox entries, assurance tokens) that are committed to the PR branch as part of REJECTION-PACKAGE remediation cycles, making A-026 exact-match unsatisfiable for the submitting agent.

**Permanent Rule**:
The following directories are **excluded** from the A-026 / A-028 exact-match requirement when their files appear in `git diff --name-only origin/main...HEAD`:

- `.agent-admin/assurance/` — IAA-produced rejection packages, assurance tokens, correction addenda
- `.agent-workspace/independent-assurance-agent/` — IAA session memories, escalation inbox entries, knowledge patches produced during IAA sessions

Files in these directories that appear in the diff do **not** need to be listed in `SCOPE_DECLARATION.md` by the submitting agent. Their presence in the diff must **not** be counted as an A-026 parity failure or a BL-027 violation.

IAA must silently exclude these paths when computing the expected file list for A-026 comparison.

**Check in Phase 3**:
> FAIL-ONLY-ONCE A-031: When applying A-026/A-028 diff-vs-scope comparison:
> Strip all paths under `.agent-admin/assurance/` and `.agent-workspace/independent-assurance-agent/` from `git diff --name-only` before comparing against SCOPE_DECLARATION.md.
> Do NOT raise BL-027 or A-026 parity failure for missing SCOPE_DECLARATION entries covering these paths.

**Status**: ACTIVE — effective 2026-03-06

---

When a new governance failure pattern is identified during a session (learning_notes in session
memory), IAA adds a new entry to this file following the format above. Each new rule:
- Gets the next sequential ID (A-020, A-021, etc.)
- References the incident that triggered it
- States the permanent rule precisely
- Defines how the rule is checked in the phase steps

All updates to this file must be committed as part of the session bundle for that invocation.

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-02-26 | Initial seeding — IAA bootstrap (A-01 to A-10, B-01 to B-12, tabular format; these legacy IDs were superseded by the A-001+ narrative series in v1.1.0; full legacy rule texts are preserved in the git history of this file prior to v1.1.0). |
| 1.1.0 | 2026-02-27 | Added A-001 through A-006 in narrative format (ISMS-context rules; replaces legacy tabular A-01 to A-10, B-01 to B-12 identifiers). |
| 1.2.0 | 2026-02-28 | Added A-015, A-016, A-017 (Tier 2 patch rule, cross-PR token reuse, REJECTION-as-PASS rule) |
| 1.3.0 | 2026-03-01 | Fixed duplicate IDs: former A-016 (Trigger Table Misapplication) → A-018; former A-004 (Post-Merge Retrospective) → A-019. Added renumbering note and version history. Restored deprecated Section B notice for B-rule resolvability. Issue: APGI-cmy/maturion-foreman-governance#1252. |
| 1.4.0 | 2026-03-02 | Added A-020 (Named token prohibition — `IAA-session-NNN-YYYYMMDD-PASS` format mandatory; named tokens prohibited). Issue: maturion-isms#779. CS2 instruction via APGI-cmy/maturion-foreman-governance#1260. |
| 1.5.0 | 2026-03-04 | Added A-021 (IAA token must be written to dedicated file; PREHANDOVER proof is immutable post-commit; parking-station suggestions are per-session files). CS2 auth: APGI-cmy/maturion-foreman-governance issue — Artifact Immutability & Append-Only Proof Protocols. |
| 1.6.0 | 2026-03-03 | Added A-022 (re-evaluate ALL trigger categories every invocation) |
| 1.7.0 | 2026-03-03 | Added A-023 (OVL-AC-012 ripple assessment is standing PREHANDOVER requirement for all AGENT_CONTRACT PRs) |
| 1.8.0 | 2026-03-03 | Added A-024 (`secret:` prohibited — must use `secret_env_var:`) |
| 1.9.0 | 2026-03-03 | Added A-025 (ceremony artifacts must use PENDING until Post-ASSURANCE-TOKEN ceremony) |
| 2.0.0 | 2026-03-03 | Added A-026 (SCOPE_DECLARATION.md must match diff exactly) |
| 2.1.0 | 2026-03-03 | Added A-027 (third-consecutive A-021 failure = systemic workflow gap) |
| 2.2.0 | 2026-03-04 | Added A-028 (SCOPE_DECLARATION format compliance) and A-029 (PREHANDOVER immutability §4.3b) |
| 2.3.0 | 2026-03-04 | Added A-030 (CORE-019 re-invocation carve-out — correction addendum path) |
| 2.4.0 | 2026-03-06 | Added A-031 (A-026 carve-out for IAA-produced artifacts in `.agent-admin/assurance/` and `.agent-workspace/independent-assurance-agent/`). Issue: APGI-cmy/maturion-foreman-governance#1316. |

---

*Authority: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.2.0 | LIVING_AGENT_SYSTEM.md v6.2.0 | CS2 (Johan Ras)*
