# REJECTION-PACKAGE — R2

```
REJECTION-PACKAGE
PR: #1313
Branch: copilot/add-app-description-template-guidance
Date: 2026-03-20 (Resubmission R2)
IAA Session: IAA-20260320-PR1313-R2
Prior Session: IAA-20260320-PR1313 (6 items — 5 resolved, 1 residual)
Phases:
  Phase 1 (Preflight): PASS — bootstrap/canon load/FAIL-ONLY-ONCE attestation evidenced; REM-006 resolved
  Phase 2 (Governance): PASS — CANON_INVENTORY verified (192 entries, 0 placeholder hashes); SHA256 hashes verified correct; ripple assessed; OVL-CG-001 through OVL-CG-006 all PASS
  Phase 3 (Working): FAIL — A-026: scope declaration (7 files) does not match committed diff (10 files); 3 IAA artifact files undeclared
  Phase 4 (Handover): PASS — iaa_audit_token: PENDING (First Invocation Exception); gate parity declared; SHA256 drift evidence present and verified
Agent Integrity: PASS — no agent contract files modified; governance-repo-administrator-v2 SHA256 = 80579a0c matches INTEGRITY_INDEX baseline
Independence: CONFIRMED — independent-assurance-agent ≠ governance-repo-administrator-v2
Verdict: MERGE BLOCKED
```

---

## Prior Remediation Status

| Item | Status |
|------|--------|
| REM-001: Commit all changes | ✅ RESOLVED — commit 92f6d21 present |
| REM-002: Add iaa_audit_token: PENDING | ✅ RESOLVED — present in PREHANDOVER proof |
| REM-003: Align scope declaration with committed diff | ⚠️ PARTIALLY RESOLVED — 3 IAA artifacts in diff but not in scope declaration |
| REM-004: Add SHA256 drift evidence | ✅ RESOLVED — before/after hashes present and independently verified |
| REM-005: Add risk section | ✅ RESOLVED — ## Risks section present in PREHANDOVER and session memory |
| REM-006: Add preflight evidence to session memory | ✅ RESOLVED — ## Preflight Evidence (Phase 1) section in session-063 |

---

## Remediation Required

### REM-007 — SOLE BLOCKER: Add 3 Missing Files to Scope Declaration FILES_CHANGED [Phase 3 — A-026]

**Finding**: The committed diff (`git diff origin/main...HEAD --name-only`) contains 10 files.
The scope declaration (`governance/scope-declaration.md`) FILES_CHANGED section lists only 7 files.
Three files present in the diff are absent from the scope declaration:

```
.agent-admin/assurance/rejection-package-1313.md
.agent-workspace/independent-assurance-agent/escalation-inbox/rejection-tracking-1313-20260320.md
.agent-workspace/independent-assurance-agent/memory/session-016-20260320.md
```

These are IAA-authored artifacts from the prior rejection session (IAA-20260320-PR1313) that were
committed together with the GA deliverables when resolving REM-001 (`git add -A && git commit`).

**Rule violated**: FAIL-ONLY-ONCE A-026: "Missing entries (files in diff not declared) = undeclared
scope → REJECTION-PACKAGE." No exception for files authored by a different agent.

**Fix required**: Add the 3 paths to the `## FILES_CHANGED` list in `governance/scope-declaration.md`:
```
.agent-admin/assurance/rejection-package-1313.md
.agent-workspace/independent-assurance-agent/escalation-inbox/rejection-tracking-1313-20260320.md
.agent-workspace/independent-assurance-agent/memory/session-016-20260320.md
```
Then commit and resubmit. This is the only remaining blocker.

**Severity context**: All substantive deliverable content (policy §5.3 with 24 sections, template,
checklist) is verified correct. All CANON_INVENTORY hashes independently confirmed. This is a
scope declaration ceremony gap only. No content rework required.

---

## Re-entry Point

**Phase 3 — Step 3.4 — Working Phase Proof Review** (INV-306 re-check only)

The submitting agent must:
1. Acknowledge receipt of this REJECTION-PACKAGE
2. Add the 3 file paths to `governance/scope-declaration.md` FILES_CHANGED
3. Commit with a scope correction message
4. Re-invoke IAA for verification

---

## Routed To

**governance-repo-administrator-v2** — acknowledgement required before resubmission.

---

**IAA Session**: IAA-20260320-PR1313-R2
**Authority**: CS2 (Johan Ras / @APGI-cmy)
**Issued by**: independent-assurance-agent v6.2.0
**Date**: 2026-03-20
