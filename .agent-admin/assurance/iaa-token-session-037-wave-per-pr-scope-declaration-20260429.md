# IAA Assurance Token — Session 041

**Token Type**: ASSURANCE-TOKEN  
**Session ID**: IAA-session-041-20260429  
**IAA Session Reference**: IAA-20260429-PR1360-R5  
**Date**: 2026-04-29  
**Authority**: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.8.0  

---

## PR Details

| Field | Value |
|-------|-------|
| PR Number | #1360 |
| PR Title | Replace global mutable SCOPE_DECLARATION.md with per-PR immutable scope declarations |
| Branch | copilot/replace-global-scope-declaration |
| Base | origin/main (2ba1d6a3cf9c97dd67fff483ca04a90549cba293) |
| HEAD (at assurance) | 54d763ea651cb5d89498dc8692976d24710b7ce5 |
| Issue | #1359 |
| Submitting Agent | copilot-swe-agent (builder-tool class) |
| Round | 5 |

---

## Verdict

**ASSURANCE-TOKEN — MERGE PERMITTED**

All phases passed. All prior rejection findings (R-01 through R-08) resolved.

---

## Phase Results

| Phase | Result | Notes |
|-------|--------|-------|
| Phase 1 — Preflight | PASS | PREHANDOVER at .agent-admin/prehandover/prehandover_proof_1360_20260429.md; substantive; A-030 carve-out applied |
| Phase 2 — Governance | PASS | CANON_INVENTORY 0 placeholder hashes; AHA v1.7.0, SDS v2.0.0, template v2.0.0 SHA256 verified; ripple assessment present |
| Phase 3 — Working | PASS | Implementation correct; local validation PASS (26/26 files); OVL-CI-005 satisfied on substantive grounds (log snippet present; CI action_required is CS2 platform constraint) |
| Phase 4 — Handover | PASS | gate_inventory present; merge-gate/verdict PASS (run 25099772598); admin-ceremony PENDING (expected; this token file satisfies bypass); correction addendum R3 accurate |

---

## Agent Integrity

All 4 agent contract hashes verified against INTEGRITY_INDEX.md baseline — PASS. No drift detected.

---

## Independence

IAA (assurance class) ≠ copilot-swe-agent (builder-tool class). Independence CONFIRMED.

---

## Post-Assurance Notes for CS2

1. **CI workflow approval**: `governance-scope-to-diff-gate.yml` (new) and `admin-ceremony-defect-gate.yml` (modified) are in `action_required` state — GitHub requires repo owner approval to run these pull_request workflows. CS2 should approve the workflow runs to confirm CI passes in GitHub Actions. This is a platform security gate, not a code defect.
2. **Admin-ceremony gate**: After merge, the `placeholder-final-state` check will pass because this token file (`iaa-token-session-037-wave-per-pr-scope-declaration-20260429.md`) exists in the branch and references PR #1360.
3. **Prior self-issued token**: `assurance-token-1360.md` (commit 528ebba5) was self-issued and is voided per `correction-addendum-1360-r3-20260429.md`. This token file supersedes it.

---

*IAA Session: IAA-20260429-PR1360-R5 | Agent: independent-assurance-agent v6.2.0 | CS2 Authority: APGI-cmy*
