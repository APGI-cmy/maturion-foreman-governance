# IAA Core Invariants Checklist

**Agent**: independent-assurance-agent
**Version**: 2.8.0
**Status**: ACTIVE
**Last Updated**: 2026-03-05
**Authority**: CS2 (Johan Ras / @APGI-cmy)

---

## §4.3b Architecture Alignment Note

> **Effective 2026-03-04 — CS2 directive.**

Under §4.3b architecture:
- The PREHANDOVER proof is **read-only post-commit**. It is committed by the producing agent BEFORE IAA invocation and must not be modified after that commit.
- `iaa_audit_token` in the PREHANDOVER proof is pre-populated with the **expected reference format** at commit time — this is a pre-declared reference, not a claimed result.
- The IAA verdict (ASSURANCE-TOKEN or REJECTION-PACKAGE) is written to a **dedicated token file** at: `.agent-admin/assurance/iaa-token-session-NNN-waveY-YYYYMMDD.md`
- **CORE-016 updated**: `## IAA Agent Response (verbatim)` section in the PREHANDOVER proof is now **obsolete** under §4.3b. IAA response lives in the dedicated token file.
- **CORE-018 updated**: Evidence sweep checks for the dedicated token file path, not for a verbatim section in the PREHANDOVER proof.
- **CORE-019 updated**: IAA token cross-verification path is the dedicated token file, not the session memory file (First Invocation Exception applies — see CORE-019 Detail).

---

## Orientation Mandate

> **CS2 directive — 90/10 rule.**

These checks are the **10% ceremony layer**. IAA's **90% obligation is substantive review**: does the evidence actually demonstrate what it claims? Is the change correct? Are risks identified?

- Hard-gate binary checks (apply once, they are pass/fail with no nuance): **CORE-018**, **CORE-016**, **CORE-013**
- All other checks: apply once, record result, then move immediately to substance
- Do not spend more than 10% of session effort on ceremony checks

Mechanical rule-matching without substantive review is an IAA quality failure.

---

## Purpose

This checklist defines the core checks applied to EVERY IAA invocation regardless of PR category.
It is the baseline gate that all PRs must pass before category-specific overlay checks apply.

---

## Core Invariants

All checks below are applied on every qualifying PR invocation.

| Check ID | Check Name | Description | Applies To | Failure Action |
|----------|-----------|-------------|------------|----------------|
| CORE-001 | YAML frontmatter valid | Agent contract YAML is parseable; all required fields (agent.id, agent.class, agent.version, identity.role, identity.mission, identity.class_boundary, governance.protocol, governance.canon_inventory) present and non-empty | AGENT_CONTRACT | REJECTION-PACKAGE |
| CORE-002 | Agent version correct | agent.version matches the LIVING_AGENT_SYSTEM.md version in effect at this contract revision | AGENT_CONTRACT | REJECTION-PACKAGE |
| CORE-003 | Contract version present | agent.contract_version is present, non-zero, and in semver format | AGENT_CONTRACT | REJECTION-PACKAGE |
| CORE-004 | Identity block complete | identity.role, identity.mission, identity.class_boundary all present and non-empty; class_boundary must be longer than 20 characters (not a stub) | AGENT_CONTRACT | REJECTION-PACKAGE |
| CORE-005 | Governance block present | governance.protocol, governance.version, governance.canon_inventory all present; no placeholder values | ALL | REJECTION-PACKAGE |
| CORE-006 | CANON_INVENTORY alignment | All governance artifacts listed in expected_artifacts exist in governance/CANON_INVENTORY.json with non-null, non-placeholder SHA256 hashes | ALL | REJECTION-PACKAGE |
| CORE-007 | No placeholder content | No stub, TODO, FIXME, or placeholder values in any delivered artifact. Search for: "STUB", "TODO:", "FIXME:", "placeholder", "to be populated", "TBD". Do not flag placeholder/PENDING entries in the verbatim IAA response section (`## IAA Agent Response (verbatim)`) — `iaa_audit_token: PENDING` is a valid mid-ceremony state (see CORE-016 Detail). §4.3b carve-out: do not flag `iaa_audit_token` pre-populated with the expected reference format (e.g., `IAA-session-NNN-waveY-YYYYMMDD-PASS` as a declared pre-reference) — this is the correct §4.3b pre-populated state, not a placeholder violation. | ALL | REJECTION-PACKAGE |
| CORE-008 | Prohibitions block present | At least one prohibition entry present with id, rule, and enforcement fields; at least one prohibition has enforcement: CONSTITUTIONAL | AGENT_CONTRACT | REJECTION-PACKAGE |
| CORE-009 | Merge gate interface present | merge_gate_interface.required_checks is a non-empty array; parity_required: true; parity_enforcement: BLOCKING | AGENT_CONTRACT | REJECTION-PACKAGE |
| CORE-010 | Tier 2 knowledge indexed | tier2_knowledge.index path is correct; the referenced index.md exists at the stated path in the repository | AGENT_CONTRACT | REJECTION-PACKAGE |
| CORE-011 | Four-phase structure present | Contract body contains all four phases (Phase 1 IDENTITY & PREFLIGHT, Phase 2 ALIGNMENT, Phase 3 WORK, Phase 4 HANDOVER) with mandatory evidence output declarations | AGENT_CONTRACT | REJECTION-PACKAGE |
| CORE-012 | Self-modification lock present | A prohibition with id matching SELF-MOD-* and enforcement: CONSTITUTIONAL is present | AGENT_CONTRACT | REJECTION-PACKAGE |
| CORE-013 | IAA invocation evidence | PREHANDOVER proof or IAA token reference present in PR artifacts (FAIL-ONLY-ONCE A-001). For AGENT_CONTRACT PRs: explicit IAA audit token required, not just a reference | ALL | REJECTION-PACKAGE |
| CORE-014 | No class exemption claim | Invoking agent has not claimed class exemption from IAA (FAIL-ONLY-ONCE A-002). Foreman, Builder, Overseer, Specialist — all subject to IAA | ALL | REJECTION-PACKAGE |
| CORE-015 | Session memory present | Session memory artifact included in PR bundle (file path present in PREHANDOVER proof or PR artifact manifest) | ALL | REJECTION-PACKAGE |
| CORE-016 | IAA tool call evidenced | §4.3b architecture: PREHANDOVER proof must have `iaa_audit_token` pre-populated with expected reference format. IAA verdict lives in dedicated token file at `.agent-admin/assurance/iaa-token-session-NNN-waveY-YYYYMMDD.md`. `## IAA Agent Response (verbatim)` section in PREHANDOVER proof is obsolete under §4.3b — check the dedicated token file instead. **First Invocation Exception**: on first IAA invocation for a PR (no prior token file exists), `iaa_audit_token: PENDING` = PASS (ceremony in progress). See **CORE-016 Detail** below. | ALL | REJECTION-PACKAGE |
| CORE-017 | No .github/agents/ modifications by unauthorized agent | PR diff must not contain modifications to `.github/agents/` files unless producing agent is CodexAdvisor-agent AND CS2 authorization is documented in PREHANDOVER proof (FAIL-ONLY-ONCE A-005 / A-013) | ALL | REJECTION-PACKAGE |
| CORE-018 | Complete evidence artifact sweep | BEFORE applying any overlay: verify ALL of the following are present and non-empty: (a) PREHANDOVER proof file on branch, (b) session memory file on branch, (c) `iaa_audit_token` field non-empty and non-placeholder, (d) §4.3b: dedicated token file at `.agent-admin/assurance/iaa-token-session-NNN-waveY-YYYYMMDD.md` (OR `iaa_audit_token: PENDING` on first invocation — **First Invocation Exception**). The legacy `## IAA Agent Response (verbatim)` section check is superseded by the dedicated token file check under §4.3b. Any absent/empty/placeholder item = immediate REJECTION-PACKAGE before overlay checks proceed. | ALL | REJECTION-PACKAGE |
| CORE-019 | IAA token cross-verification | §4.3b: When `iaa_audit_token` is not PENDING: (a) verify token format matches `IAA-session-NNN-waveY-YYYYMMDD-PASS`, (b) open the dedicated token file at `.agent-admin/assurance/iaa-token-session-NNN-waveY-YYYYMMDD.md`, (c) verify the token file's `pr_reviewed` field matches the current PR branch/number being audited, (d) verify token file `verdict` = ASSURANCE-TOKEN. **First Invocation Exception**: if no dedicated token file exists and `iaa_audit_token: PENDING`, this check is deferred (circular dependency break — first invocation cannot reference a token file that hasn't been created yet). Any mismatch = REJECTION-PACKAGE. See CORE-019 Detail. | ALL | REJECTION-PACKAGE |
| CORE-020 | Zero partial pass rule | Any core or overlay check that cannot be verified due to missing, blank, or unverifiable evidence = REJECTION-PACKAGE for that check. No assumed passes. Absence of evidence = failing check. A PR with partial evidence must not receive ASSURANCE-TOKEN under any category or class. | ALL | REJECTION-PACKAGE |
| CORE-021 | Zero-Severity-Tolerance | Any finding regardless of severity = REJECTION-PACKAGE. There is no "informational" or "advisory" outcome — any check that fails is blocking. Prohibited language table is enforced (see `IAA_ZERO_SEVERITY_TOLERANCE.md`). | ALL | REJECTION-PACKAGE |
| CORE-022 | Secret field naming compliance | `secret:` field name is prohibited in any `.github/agents/*.md` agent contract file. The correct field name is `secret_env_var:`. Scan PR diff for `secret: "` in agent contract files. Any occurrence = REJECTION-PACKAGE. Enforces FAIL-ONLY-ONCE A-024. | AGENT_CONTRACT | REJECTION-PACKAGE |

---

## Applying the Checklist

For each check:
1. Locate the relevant artifact(s) in the PR bundle
2. Apply the check description as stated
3. Record PASS or FAIL with specific evidence
4. Any FAIL → REJECTION-PACKAGE (no partial passes)

**AMBIGUITY RULE**: If uncertain whether a check applies to this PR → apply it. The cost of a false REJECTION-PACKAGE is a fix request. The cost of a missed REJECTION-PACKAGE is a governance breach.

---

## CORE-016 Detail — IAA Tool Call Evidence (§4.3b Architecture)

Under **§4.3b architecture** (effective 2026-03-04):

CORE-016 requires that the IAA verdict is evidenced via a dedicated token file — NOT the PREHANDOVER proof.

**§4.3b evidence check**:
- Locate the dedicated token file at `.agent-admin/assurance/iaa-token-session-NNN-waveY-YYYYMMDD.md`
- The token file must contain the complete IAA verdict block (ASSURANCE-TOKEN or REJECTION-PACKAGE)
- The `## IAA Agent Response (verbatim)` section is now located in the token file, NOT the PREHANDOVER proof

**First Invocation Exception (valid PASS state)**:
- `iaa_audit_token: PENDING` in the PREHANDOVER proof = PASS (first invocation, ceremony in progress)
- No dedicated token file will exist yet at first invocation — this is expected
- Do not fail a PREHANDOVER proof solely because `iaa_audit_token: PENDING` at first invocation

**PREHANDOVER proof `iaa_audit_token` field**:
- Pre-populated at commit time with the **expected reference format** (e.g., `IAA-session-NNN-waveY-YYYYMMDD-PASS`)
- This is a pre-declared reference, not a claimed result — do not apply A-006 fabrication check to this pre-populated reference
- On re-invocation after REJECTION-PACKAGE: see A-030 Correction Addendum path

**What is now obsolete under §4.3b**:
- `## IAA Agent Response (verbatim)` section IN the PREHANDOVER proof — this is no longer required in the PREHANDOVER proof
- Checking the PREHANDOVER proof for a verbatim IAA output section = stale §4.3b check; check the dedicated token file instead

**Note**: PHASE_A_ADVISORY is a legitimate outcome — but only when the IAA tool was actually called and the IAA agent itself issued the advisory. A bare date string without IAA session output is always a PHASE_A_ADVISORY FABRICATION breach (FAIL-ONLY-ONCE A-014 / INC-IAA-SKIP-001).

---

## CORE-018 Detail — Complete Evidence Artifact Sweep (§4.3b Architecture)

CORE-018 is the first check applied on every triggered invocation. Before evaluating any core invariant or overlay:

1. Confirm PREHANDOVER proof file exists on the PR branch
2. Confirm session memory file exists on the PR branch
3. Confirm `iaa_audit_token` field is present in the PREHANDOVER proof AND is non-empty AND is not a generic placeholder ("TODO", "TBD", "placeholder", etc.)
4. §4.3b check: Confirm dedicated IAA token file exists at `.agent-admin/assurance/iaa-token-session-NNN-waveY-YYYYMMDD.md`
   - **First Invocation Exception**: if `iaa_audit_token: PENDING` (first invocation, ceremony in progress), the token file will not exist yet — this is expected and is a PASS for item 4

If any of the four conditions fails (subject to the First Invocation Exception for item 4) → REJECTION-PACKAGE immediately. Do not continue to overlay checks.

---

## CORE-019 Detail — IAA Token Cross-Verification (§4.3b Architecture)

When `iaa_audit_token` is not PENDING and contains the expected reference format:

**§4.3b path** (dedicated token file):
1. Extract session-NNN, waveY, and date YYYYMMDD from the token reference
2. Open `.agent-admin/assurance/iaa-token-session-NNN-waveY-YYYYMMDD.md`
3. If file does not exist → FAIL (phantom token)
4. Read `pr_reviewed` field in that token file
5. Compare `pr_reviewed` to the current PR branch/number being audited
6. If mismatch → FAIL (A-016: cross-PR token reuse)
7. Read `verdict` field in that token file
8. If `verdict = REJECTION-PACKAGE` → FAIL (A-017: REJECTION-as-PASS citation)
9. If all checks pass → PASS

**First Invocation Exception (circular dependency break)**:
- When `iaa_audit_token: PENDING` and no dedicated token file exists, this check is **deferred**
- This is the first invocation — the token file cannot exist before IAA runs
- CORE-019 cross-verification applies AFTER the token file is created (on re-invocation or post-ceremony)

**A-030 Correction Addendum path**:
- On re-invocation after REJECTION-PACKAGE with immutable PREHANDOVER proof: the Correction Addendum at `.agent-admin/assurance/correction-addendum-session-NNN-waveY-YYYYMMDD.md` satisfies CORE-019 in lieu of an updated PREHANDOVER proof

This check MUST be run for EVERY non-PENDING token. Cross-referencing the dedicated token file is mandatory — do not accept the token string at face value.

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-02-25 | Initial STUB (placeholder from canon) |
| 2.0.0 | 2026-02-28 | Fully populated from INDEPENDENT_ASSURANCE_AGENT_CANON.md; CORE-016 added (A-014 IAA tool call evidence); CORE-017 added (A-005/A-013 agent file immutability); STUB status removed |
| 2.1.0 | 2026-03-01 | CORE-016: added explicit copy-paste-only requirement — verbatim full block, never paraphrase (maturion-isms#699) |
| 2.2.0 | 2026-03-02 | CORE-016: added PENDING mid-ceremony PASS state clarification (session-083 suggestion); CORE-018 added (complete evidence artifact sweep before overlay checks); CORE-019 added (IAA token cross-verification — A-016/A-017 enforcement at core level); CORE-020 added (zero partial pass rule — any unverifiable check = REJECTION-PACKAGE); CORE-018/019 detail sections added (maturion-isms#IAA-TIER2 Wave 13+) |
| 2.3.0 | 2026-03-02 | CORE-007: added explicit PENDING carve-out note — do not flag `iaa_audit_token: PENDING` or `## IAA Agent Response (verbatim)` placeholder entries as placeholder violations (maturion-isms#IAA-TIER2) |
| 2.4.0 | 2026-03-02 | CORE-021 added: Zero-Severity-Tolerance enforcement |
| 2.5.0 | 2026-03-03 | CORE-022 added: Secret field naming compliance |
| 2.6.0 | 2026-03-04 | CORE-016 PENDING carve-out updated for §4.3b |
| 2.7.0 | 2026-03-04 | BREAKING FIX: CORE-016, CORE-018, CORE-019 rewritten for §4.3b architecture |
| 2.8.0 | 2026-03-05 | Orientation Mandate added (90/10 rule; CS2 directive) |

---

**Authority**: CS2 (Johan Ras) | **Living Agent System**: v6.2.0
