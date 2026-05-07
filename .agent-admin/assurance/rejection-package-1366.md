# REJECTION-PACKAGE

**IAA Session**: IAA-20260507-PR1366
**PR**: #1366
**Date**: 2026-05-07
**Agent**: independent-assurance-agent v6.2.0
**Contract Version**: 2.0.0

---

```
REJECTION-PACKAGE
PR: #1366
Date: 2026-05-07
IAA Session: IAA-20260507-PR1366
Phases:
  Phase 1 (Preflight): FAIL — validate-simple-pr-admin.sh Check 12 FAILS (exit code 1);
    .agent-admin/prehandover/prehandover_proof_1366_20260507.md and
    .agent-admin/scope-declarations/pr-1366.md are present in git diff but NOT in
    .admin/pr.json scope array. PREHANDOVER claims scope_declaration_parity: PASS —
    this claim is FALSE per IAA-independent validator run.
  Phase 2 (Governance): PASS — MMM_SIMPLE_PR_ADMIN_MODEL.md SHA256 6c050cb0cbb6d9ed...
    independently verified; matches CANON_INVENTORY entry exactly; version bump v1.1.0→v1.2.0
    confirmed; CANON_INVENTORY 201 entries, zero placeholder hashes.
  Phase 3 (Working): PASS — 36 tests independently confirmed passing; ripple assessed as
    NOT-APPLICABLE with justification; E1-E6 evidence is substantive and delivery-specific.
  Phase 4 (Handover): FAIL — PREHANDOVER proof line 25 claims scope_declaration_parity: PASS
    and line 30 claims preflight/validate-pr-admin-manifest: PASS — both are FALSE;
    IAA-independent run of validate-simple-pr-admin.sh returns exit code 1 (Check 12 FAIL).
    Gate parity INV-405 violated: PREHANDOVER gate claims do not match actual gate state.
Agent Integrity: PASS — all 4 agent SHA256 hashes match INTEGRITY_INDEX.md baseline:
    CodexAdvisor bcc12cb0..., foreman-v2 675b6348..., governance-repo-admin 55b87adf...,
    IAA 0d414fd2... — all verified.
Independence: CONFIRMED — IAA (assurance class) ≠ copilot-swe-agent (builder-tool class)
Verdict: MERGE BLOCKED
```

---

## Remediation Required

### Item 1 — Update .admin/pr.json scope array (BLOCKING)

Add the two `.agent-admin/` files to the `.admin/pr.json` scope array:

```json
".agent-admin/prehandover/prehandover_proof_1366_20260507.md",
".agent-admin/scope-declarations/pr-1366.md"
```

After updating, run:
```
bash .github/scripts/validate-simple-pr-admin.sh --manifest .admin/pr.json
```

The validator MUST return exit code 0 and report all 13 checks passing before re-invocation.

### Item 2 — Produce Correction Addendum per A-030 (REQUIRED for re-invocation)

Since the PREHANDOVER proof is immutable post-commit (§4.3b), do NOT modify it.
Create a Correction Addendum at:
`.agent-admin/assurance/correction-addendum-pr1366-20260507.md`

The addendum must document:
- (a) This REJECTION-PACKAGE reference: `IAA-20260507-PR1366`
- (b) The two undeclared files now added to scope
- (c) The corrected gate status: `preflight/validate-pr-admin-manifest: PASS` and
  `scope_declaration_parity: PASS` (verified after scope update)
- (d) The new session number being requested (IAA-session-044 or next available)

The Correction Addendum satisfies CORE-019 on re-invocation in lieu of an updated
PREHANDOVER proof (A-030 carve-out).

### Item 3 — Correct scope declaration internal discrepancy (ADVISORY)

`.agent-admin/scope-declarations/pr-1366.md` states `FILES_CHANGED: 12` but lists 13 files
(including the anticipated IAA token file). Correct the count to match the list, or remove
the anticipated token file entry and add it only after the token is issued. The internal
discrepancy should be resolved before re-invocation.

---

## Re-entry Point

**Phase 1 — Step 1.1 — Validator Gate**

Submitting agent must:
1. Update `.admin/pr.json` scope array (add 2 `.agent-admin/` files)
2. Run `bash .github/scripts/validate-simple-pr-admin.sh --manifest .admin/pr.json` → confirm all 13 checks PASS (exit code 0)
3. Produce Correction Addendum at `.agent-admin/assurance/correction-addendum-pr1366-20260507.md`
4. Commit all changes
5. Re-invoke IAA via `task(agent_type: "independent-assurance-agent")` with the updated PR context

**Acknowledgement required** before resubmission: copilot-swe-agent must acknowledge receipt of this REJECTION-PACKAGE.

---

## What Is Correct (Do NOT Redo)

The following have been verified by IAA and do NOT need remediation:

- SHA256 of `governance/canon/MMM_SIMPLE_PR_ADMIN_MODEL.md` = `6c050cb0cbb6d9ed205693893ae9cf597cbcbdd8c1d30ec99ffb18dff35697e4` ✓
- CANON_INVENTORY.json entry for MMM_SIMPLE_PR_ADMIN_MODEL.md is correct ✓
- All 36 regression tests pass ✓
- Agent file integrity: all 4 agent SHA256 hashes match INTEGRITY_INDEX.md ✓
- No `.github/agents/` files modified ✓
- Version bump v1.1.0 → v1.2.0 present ✓
- Ripple assessment documented ✓
- `iaa_audit_token: PENDING` is correct state for first invocation ✓

---

## Root Cause Analysis

The submitting agent (copilot-swe-agent) committed the `.agent-admin/` ceremony artifacts
(PREHANDOVER proof and scope declaration) to the branch in the same commit as the main PR
work. However, the `.admin/pr.json` scope array was not updated to include these two new files.

The PR itself introduces Check 11 expansion to enforce `requires_iaa/requires_ecap` for
`.agent-admin/**` paths — but the Check 12 scope-parity gate caught the omission: the two
`.agent-admin/` files are in the diff but absent from the scope declaration.

This is the same pattern flagged in session-043 Learning Loop suggestion #1:
"When IAA creates artifacts (token, prehandover proof, session memory) for a PR that uses the
MMM Simple PR Admin Model, the `.admin/pr.json` scope must be updated to include these new
files before committing."

The fix is mechanical and does not require any re-work of the substantive deliverables.

---

*Issued by: independent-assurance-agent v6.2.0 | Session: IAA-20260507-PR1366 | 2026-05-07*
*Authority: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.8.0 | CS2 (Johan Ras / @APGI-cmy)*
