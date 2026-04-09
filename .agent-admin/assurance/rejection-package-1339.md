# REJECTION-PACKAGE — PR #1339

**Date**: 2026-04-09
**IAA Session**: IAA-20260409-PR1339
**PR**: APGI-cmy/maturion-foreman-governance#1339
**Branch**: copilot/review-foreman-v2-agent-contract
**Submitting Agent**: CodexAdvisor-agent (Contract v4.0.2, session-012-20260409)
**Invocation Source**: CodexAdvisor-agent direct invocation — CS2-authorized issue

---

## Phases

- Phase 1 (Preflight): **PASS** — PREHANDOVER present and committed before IAA invocation; immutability maintained; CS2 authorization confirmed; session memory present; QP scorecard 67/67; bundle complete; SHA256 verified (b068e861...)
- Phase 2 (Governance): **PASS** — CANON_INVENTORY 199 canons, all hashes valid; IAA canon v1.4.0, LAS v1.2.0; INTEGRITY_INDEX updated with correct hash
- Phase 3 (Working): **FAIL** — 4 findings (F2, F3, F4, F5) — see Remediation Required below
- Phase 4 (Handover): **FAIL** — OVL-AC-012 absence in PREHANDOVER propagates; SCOPE_DECLARATION.md not updated prior to invocation

**Agent Integrity**: PASS — SHA256 `b068e861a02f156b5374eaefc6f1f9074baa22e78d38edbe85e931e1a5545e99` verified; INTEGRITY_INDEX matches; no drift; reference copy matches live file

**Independence**: CONFIRMED — IAA (assurance class) ≠ CodexAdvisor-agent (overseer class); no overlap

**Verdict**: MERGE BLOCKED

---

## Remediation Required

### F2 — A-026/A-028: SCOPE_DECLARATION.md Stale

`SCOPE_DECLARATION.md` contains entries from a prior GA session (`copilot/orchestrate-downstream-closure`, 2026-04-06). The actual files changed in this PR are entirely absent from the declared scope. The prior-wave entries are still present.

**Evidence**: `git diff --name-only origin/main...HEAD` yields 11 files (foreman contract, knowledge stubs, CodexAdvisor memory artifacts, INTEGRITY_INDEX, reference copy, parking station). `SCOPE_DECLARATION.md` declares 12 files from an unrelated PR.

**Remediation**: Regenerate `SCOPE_DECLARATION.md` from `git diff --name-only origin/main...HEAD` immediately before IAA re-invocation. Format: plain markdown list per line per A-028. Trim all prior-wave entries.

**Note for CS2 consideration**: CodexAdvisor's own contract (Phase 4.3a) does not explicitly require SCOPE_DECLARATION.md maintenance. A-026 is a universal FAIL-ONLY-ONCE rule but may benefit from a scope clarification analogous to the Wave Checklist exemption (IAA_PRE_BRIEF_PROTOCOL.md §Applicability Scope) if CS2 determines CodexAdvisor standalone actions are exempt. This finding is raised as-is per A-026; CS2 may grant an exemption if appropriate.

---

### F3 — OVL-AC-012: Missing Ripple Assessment in PREHANDOVER

The PREHANDOVER proof (`PREHANDOVER-session-012-20260409.md`) contains no ripple assessment section. OVL-AC-012 requires the PREHANDOVER to list all affected agents (with ripple initiation/flagging status) OR explicitly state "No ripple required" with justification.

**Evidence**: Full PREHANDOVER proof read — no ripple section present. The session memory (D3a) mentions GA contract weaknesses in the parking station (D4) as a "Follow-up Only" item but this is not a ripple assessment.

**Remediation**: Since the PREHANDOVER is immutable (A-029), produce a Correction Addendum per A-030 at `.agent-admin/assurance/correction-addendum-session-012-wave1-20260409.md` that includes:
1. Reference to this REJECTION-PACKAGE (IAA-20260409-PR1339)
2. Ripple assessment for the foreman-v2 contract repair, addressing: (a) are other agent contracts (GA, builders) affected by the new HALT-007/008/ESC-004 enforcement model? (b) does the new parallel-wave constraint model ripple to any canon files? (c) explicit statement on the GA contract weaknesses noted in D4 — is a ripple notice required or just a parking station entry?
3. Statement on all other remediation items addressed

---

### F4 — CORE-008: No Prohibition with enforcement: CONSTITUTIONAL

The delivered foreman-v2.agent.md v3.0.0 prohibitions block contains no prohibition with `enforcement: CONSTITUTIONAL`. CORE-008 requires at least one prohibition with this enforcement value.

Current prohibition enforcement values: BLOCKING (×4), CS2_GATED (×1). None are CONSTITUTIONAL.

**Note**: `SELF-MOD-FM-001` rule body text includes "CONSTITUTIONAL VIOLATION" in the description, but the `enforcement:` field value is `CS2_GATED`, not `CONSTITUTIONAL`. CORE-008 checks the `enforcement:` field value.

**Note**: This issue was present in the pre-repair contract (v2.x) — it was not introduced by this repair. However, it was not addressed by the repair and CORE-008 applies to the delivered artifact regardless.

**Remediation**: Update `SELF-MOD-FM-001` (or add a new prohibition) with `enforcement: CONSTITUTIONAL`. The self-modification lock is the natural candidate: `enforcement: CONSTITUTIONAL`. Update live contract, reference copy, and INTEGRITY_INDEX (new SHA256). A-030 Correction Addendum must reference the new contract SHA256.

---

### F5 — CORE-006: governance/canon/BUILD_PHILOSOPHY.md Wrong Path / Not in CANON_INVENTORY

The contract's `expected_artifacts` lists `governance/canon/BUILD_PHILOSOPHY.md`. This file does NOT exist at that path in the repository (only `BUILD_PHILOSOPHY.md` at repo root exists). The filename `BUILD_PHILOSOPHY.md` has no entry in `governance/CANON_INVENTORY.json` canons list.

CORE-006: "All governance artifacts listed in expected_artifacts exist in governance/CANON_INVENTORY.json with non-null, non-placeholder SHA256 hashes." — FAIL for `governance/canon/BUILD_PHILOSOPHY.md`.

**Note**: This was also present in the pre-repair contract and was not addressed by the repair.

**Remediation**: Either (a) correct path to `BUILD_PHILOSOPHY.md` (root) and add it to CANON_INVENTORY, or (b) remove `BUILD_PHILOSOPHY.md` from expected_artifacts if it is not a canonized governance artifact. If option (a): add `BUILD_PHILOSOPHY.md` to `governance/CANON_INVENTORY.json` with correct SHA256 hash and governance metadata. Update live contract, reference copy, and INTEGRITY_INDEX.

---

## Quality Note (Non-Blocking)

The core repair quality is strong. The delivered contract is SHA256-verified, within the character limit (28,894/30,000), correctly addresses all 9 identified material deltas, uses `secret_env_var` correctly (CORE-022 PASS), has well-formed HALT-007/008/ESC-004 enforcement, complete 12-stage pre-build model, and properly positioned IAA pre-brief gate. The Phase 4 token ceremony and immutability rules are correctly specified. The `iaa_audit_token: [to be filled after IAA invocation at §4.4 — do NOT leave blank]` field — while not using the approved `PENDING` notation — is noted as a recommendation for future sessions (use `iaa_audit_token: PENDING` or the pre-populated expected reference format `IAA-session-030-wave1-20260409-PASS` per A-029). This field was not assessed as a hard finding given the First Invocation context.

---

## Re-entry Point

**Phase 3 — Step 3.4 — Working Phase Proof Review**

The submitting agent (CodexAdvisor-agent) must:
1. Address F4 and F5 by updating the foreman contract file and reference copy
2. Update INTEGRITY_INDEX with new SHA256 for the corrected contract
3. Address F2 by regenerating SCOPE_DECLARATION.md
4. Address F3 by producing Correction Addendum per A-030
5. Re-run pre-IAA commit-state gate (CodexAdvisor Phase 4.3a)
6. Re-invoke IAA

**Routed To**: CodexAdvisor-agent — acknowledgement required before resubmission.

---

*IAA Session: IAA-20260409-PR1339 | Authority: CS2 (Johan Ras / @APGI-cmy) | independent-assurance-agent v6.2.0*
