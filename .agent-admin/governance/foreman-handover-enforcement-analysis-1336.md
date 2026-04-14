# Foreman Handover Enforcement Analysis — Issue #1336

**Date**: 2026-04-13  
**Author**: governance-repo-administrator-v2  
**Authority**: CS2 (Johan Ras) — Issue #1336  
**Status**: Analysis complete — enforcement changes implemented in this PR

---

## D1 — Root Cause Analysis

### Summary

Final IAA invocation and token ceremony are being missed on Foreman-produced PRs despite being mandatory in the Foreman contract (§4.4, §4.5, §4.6). The root cause is **a combination of missing automated enforcement and token-file naming inconsistency** — not a contract wording deficiency.

### Root Cause Breakdown

**RC-1: Token file naming inconsistency in CI check (PRIMARY)**

The existing `iaa/assurance-check` job in `merge-gate-interface.yml` (Job 4) searches for token files using:
```bash
find .agent-admin/assurance/ -maxdepth 1 -name "assurance-token-*.md"
```

But the Foreman contract (§4.5) specifies the token file naming convention as:
```
.agent-admin/assurance/iaa-token-session-NNN-waveY-YYYYMMDD.md
```

This means Foreman-produced IAA tokens (`iaa-token-session-*`) are **not detected** by the CI check, which only finds GA-produced tokens (`assurance-token-*`). In practice, both naming patterns are used:
- `assurance-token-<PR#>.md` — GA-produced pattern
- `iaa-token-session-<session>-<wave>-<date>.md` — Foreman/GA pattern
- `iaa-assurance-token-PR<N>-<round>-<date>.md` — hybrid pattern

**RC-2: No enforcement of PREHANDOVER proof token state**

When a PREHANDOVER proof is committed with `iaa_audit_token: PENDING`, no CI check detects this state. The governance ceremony gate validates proof existence but not the IAA token field value. This allows a PR to appear complete (proof exists, session memory exists) while the IAA step is still pending.

**RC-3: No Foreman-specific handover completeness check**

The existing governance ceremony gate (`governance-ceremony-gate.yml`) verifies:
- PREHANDOVER proof exists ✅
- Session memory exists ✅
- Phase 4 artifacts present ✅

But does NOT verify:
- IAA token file exists alongside proof ❌
- PREHANDOVER proof `iaa_audit_token` field is non-PENDING ❌
- Foreman-specific wave artifacts are complete ❌

**RC-4: Execution sequencing ambiguity**

Foreman's `report_progress` calls can open/update a PR at any point during the handover sequence. The contract says "do not open PR before IAA PASS" (§4.6), but there is no automated enforcement that prevents `report_progress` from being called before §4.4 (IAA invocation) and §4.5 (token ceremony) are complete. The agent execution model allows incremental commits that make a PR appear "substantially complete" before the final IAA step.

### Decision Question Answers

**Q1: Is this primarily a contract wording problem, an execution discipline problem, or a missing automated enforcement problem?**

**Answer**: Primarily a **missing automated enforcement problem** with a secondary **token naming inconsistency** bug. The Foreman contract v3.0.0 (§4.4, §4.5, §4.6) is already explicit and strong. The gap is that CI does not enforce the contract requirements mechanically.

**Q2: Should Foreman be forbidden from opening a non-draft PR before Step 4.3b/4.3c complete?**

**Answer**: YES. The Foreman contract already states this (§4.6: "A PR MUST NOT be opened or presented as non-draft / merge-ready until: Final IAA PASS received and token file committed"). This should be enforced by CI: any non-draft PR that has a PREHANDOVER proof but no matching IAA token file should fail the governance ceremony gate.

**Q3: Should Foreman be forbidden from opening any PR at all before final IAA token completion, or is draft PR acceptable?**

**Answer**: Draft PRs should be acceptable for progress visibility (WIP state). However, the governance ceremony gate should clearly indicate that the PR is NOT merge-ready when the IAA token is pending. The key distinction is: **draft PR = WIP visibility = acceptable** | **non-draft PR without IAA token = governance violation**.

**Q4: Should CI fail automatically when a Foreman wave includes PREHANDOVER proof but no matching final IAA token file?**

**Answer**: YES. This is the core enforcement gap. A new CI check should detect PREHANDOVER proofs with `iaa_audit_token: PENDING` and fail if no matching token file exists in `.agent-admin/assurance/`.

**Q5: Should CI fail automatically when PR body/checklist still marks final IAA audit pending / token pending?**

**Answer**: YES — but as a secondary enforcement layer. The primary enforcement should be file-based (presence/absence of token file), not PR body text-based (which is more fragile).

---

## D2 — Governance Recommendation

### Assessment: Foreman Contract Sufficiency

The Foreman contract v3.0.0 is **sufficient in wording**. Key provisions:

| Section | Requirement | Strength |
|---------|-------------|----------|
| §4.4 | ABSOLUTE RULE: Do NOT open PR without IAA | Strong ✅ |
| §4.5 | Token MUST be written to specific path | Strong ✅ |
| §4.6 | PR MUST NOT be non-draft without token | Strong ✅ |
| §4.7 | Await state after compliant handover | Clear ✅ |

### Recommendation

**No contract wording changes required for enforcement.** The Foreman contract is already strong enough. The fix belongs in the CI/merge-gate enforcement layer.

**Minor improvement (optional)**: The Foreman contract could be updated to use a standardized token file naming convention that exactly matches what CI checks for. However, fixing the CI check to accept all valid patterns is the better approach — it avoids contract churn and handles existing artifacts correctly.

---

## D3 — Enforcement Recommendation

### Concrete CI/Merge-Gate Enforcement Changes

**Change 1: Fix token file pattern matching in `merge-gate-interface.yml`**

Update the `iaa/assurance-check` job to accept ALL valid token file naming patterns:
```bash
# Current (too narrow):
find .agent-admin/assurance/ -maxdepth 1 -name "assurance-token-*.md"

# Fixed (accepts all valid patterns):
find .agent-admin/assurance/ -maxdepth 1 \( \
  -name "assurance-token-*.md" -o \
  -name "iaa-token-session-*.md" -o \
  -name "iaa-assurance-token-*.md" \
\)
```

**Change 2: Add IAA token completeness check to `governance-ceremony-gate.yml`**

Add a new job `governance-ceremony/iaa-token-completeness` that:
1. Finds the most recent PREHANDOVER proof file
2. Checks if the `iaa_audit_token` field contains `PENDING`
3. If PENDING: checks whether any matching IAA token file exists in `.agent-admin/assurance/`
4. If no token file found and proof says PENDING → FAIL
5. This catches the exact failure mode: PREHANDOVER committed, but IAA ceremony never completed

**Why governance-ceremony-gate.yml?**

The governance ceremony gate already handles ceremony completeness (draft check, verdict, phase4 completeness). Adding IAA token completeness is a natural extension. The existing `iaa/assurance-check` in `merge-gate-interface.yml` handles the "does any token exist at all" question. The ceremony gate handles "is the ceremony complete end-to-end."

---

## D4 — Implementation Recommendation

### Implemented in This PR

1. **`merge-gate-interface.yml`** — Fixed token file pattern matching to accept `iaa-token-session-*`, `iaa-assurance-token-*`, and `assurance-token-*` patterns
2. **`governance-ceremony-gate.yml`** — Added Job 4: `governance-ceremony/iaa-token-completeness` that detects PREHANDOVER proofs with PENDING IAA tokens and fails if no matching token file exists
3. **This analysis artifact** — Documents root cause, governance assessment, and enforcement rationale

### Follow-Up Actions (for CS2 / Foreman)

| Priority | Action | Owner |
|----------|--------|-------|
| HIGH | Verify branch protection includes `iaa/assurance-check` as required context (if not already) | CS2 |
| MEDIUM | Consider standardizing token file naming convention across all agents | CS2 / CodexAdvisor |
| LOW | Consider adding PR body text enforcement as secondary layer | Foreman |

---

**Document Metadata**  
Analysis ID: foreman-handover-enforcement-analysis-1336  
Issue: #1336  
Authority: CS2 (Johan Ras) / Governance Administrator  
Maintained By: Governance Administrator
