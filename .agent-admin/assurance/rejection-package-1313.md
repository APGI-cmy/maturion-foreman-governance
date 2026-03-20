# REJECTION-PACKAGE

```
REJECTION-PACKAGE
PR: #1313
Branch: copilot/add-app-description-template-guidance
Date: 2026-03-20
IAA Session: IAA-20260320-PR1313
Phases:
  Phase 1 (Preflight by submitting agent): FAIL — No preflight execution evidence in session memory GA-063; no bootstrap, no canon load, no FAIL-ONLY-ONCE attestation
  Phase 2 (Governance): PASS
  Phase 3 (Working): FAIL — CRITICAL: all 7 deliverable files are uncommitted; `git diff --name-only origin/main...HEAD` is EMPTY; A-026 scope declaration mismatch; no risk section
  Phase 4 (Handover): FAIL — `iaa_audit_token` field absent from PREHANDOVER proof (CORE-016/CORE-018); gate parity claim invalid (no committed changes); A-026
Agent Integrity: PASS
Independence: CONFIRMED
Verdict: MERGE BLOCKED
```

---

## Remediation Required

### REM-001 — CRITICAL: Commit All Changes to Branch [Phase 3 — INV-303]

**Finding**: `git diff --name-only origin/main...HEAD` returns EMPTY. The branch has one commit ("Initial plan") that is empty. All 7 claimed files (policy, template, checklist, CANON_INVENTORY, scope-declaration, prehandover proof, session memory) exist only in the git working tree — staged or unstaged.

**Evidence**: `git --no-pager diff --stat origin/main...HEAD` = (no output)

**Fix required**:
```bash
git add -A
git commit -m "Add App Description template guidance for oversight prevention (GA-063)"
git push origin copilot/add-app-description-template-guidance
```

After committing, verify: `git diff --name-only origin/main...HEAD` must list the 7 changed files.

**This is a blocker. Without committed code, no merge is possible and no assurance can proceed.**

---

### REM-002: Add `iaa_audit_token` Field to PREHANDOVER Proof [Phase 4 — INV-407 / CORE-016 / CORE-018]

**Finding**: The PREHANDOVER proof (`prehandover_proof_GA-063-20260320.md`) contains no `iaa_audit_token` field. Under §4.3b architecture, this field is **mandatory** — at minimum as `iaa_audit_token: PENDING` on first invocation.

**Fix required**: Add the following field to the PREHANDOVER proof before committing:
```yaml
iaa_audit_token: PENDING
```
Per A-029, the PREHANDOVER proof must be committed as a single immutable commit before IAA is invoked. The `PENDING` value is the correct pre-invocation state. After IAA issues a token, the token file is created separately (per §4.3b — dedicated token file).

**Note**: If the PREHANDOVER proof has already been committed with this field absent (which it hasn't, since nothing is committed yet), use the A-030 Correction Addendum path. In this case, since nothing is committed, the field can be added directly before the initial commit.

---

### REM-003: Align Scope Declaration with Committed Diff [Phase 4 — INV-409 / A-026]

**Finding**: Scope declaration lists 5 deliverable files. Committed diff is empty. Per A-026, `SCOPE_DECLARATION.md` must exactly match `git diff --name-only origin/main...HEAD` before IAA invocation.

**Fix required**: After committing all changes (REM-001), verify the scope declaration matches the actual committed diff. If the prehandover proof and session memory are in the diff, they should be listed or explicitly noted as evidence artifacts in the scope declaration. The current scope declaration lists 5 files but 7 are in the working tree.

---

### REM-004: Add Drift/Integrity Evidence for Modified Files [Overlay A — OVL-CG-005]

**Finding**: The PREHANDOVER proof claims "CANON-HASH-001: APP_DESCRIPTION_REQUIREMENT_POLICY.md hash updated" but provides no before-hash, after-hash, or git diff excerpt. OVL-CG-005 requires: for each modified canon file, either (a) SHA256 hash before AND after the change, or (b) a git diff excerpt confirming the exact scope of change.

**Fix required**: Add a section to the PREHANDOVER proof with:
```
APP_DESCRIPTION_REQUIREMENT_POLICY.md:
  before_hash: [SHA256 of main branch version]
  after_hash: 23437e90357a0627f48b674c83751162a8844cc9e0c86d37331d57d2f688a268
  change: Added §5.3 (24 mandatory sections §AD-01–§AD-24), §19, §20; version v1.0 → v2.0
```

---

### REM-005: Add Risk Section to Session Memory / PREHANDOVER [Phase 3 — INV-307]

**Finding**: No risk section is present in either the session memory (GA-063) or the PREHANDOVER proof. INV-307 requires a risk section documenting any identified risks.

**Fix required**: Add a `## Risks` section to the session memory or PREHANDOVER proof. This PR is additive governance only (no deletions, no CI changes) so risks are minimal — but the section must exist with at least a "no risks identified" attestation or a brief assessment.

---

### REM-006: Add Preflight Evidence to Session Memory [Phase 1 — INV-101, INV-102]

**Finding**: The GA-063 session memory contains no evidence that the submitting agent executed its bootstrap/preflight phase: no canon loading, no FAIL-ONLY-ONCE attestation, no CANON_INVENTORY hash verification at session start.

**Fix required**: The session memory should include a brief preflight attestation block confirming: (a) agent contract loaded, (b) CANON_INVENTORY verified (N canons, 0 placeholder hashes), (c) FAIL-ONLY-ONCE rules read. This can be added as a `## Preflight` section in the updated session memory.

---

## Substantive Quality Note

The actual deliverable content (policy §5.3, template, checklist) is substantively sound. All CANON_INVENTORY hashes are verified correct against the actual files. The governance rationale is well-grounded. The blocking items are entirely process/ceremony failures, not content failures. Addressing REM-001 through REM-006 with a clean commit should enable an ASSURANCE-TOKEN on resubmission.

---

## Re-entry Point

**Phase 3 — Step 3.4 — Working Phase Proof Review** (resubmit once all changes are committed and REM-001 through REM-006 are resolved)

The re-entry path is straightforward:
1. Resolve REM-001 (commit all files) — this is the critical path
2. Resolve REM-002 through REM-006 simultaneously  
3. Resubmit for IAA review

---

## Routed To

**governance-repo-administrator-v2** — acknowledgement required before resubmission.

The submitting agent must:
1. Acknowledge receipt of this REJECTION-PACKAGE
2. Address ALL 6 remediation items
3. Verify `git diff --name-only origin/main...HEAD` lists all 7 changed files
4. Re-invoke IAA for a fresh assurance session

---

**IAA Session**: IAA-20260320-PR1313
**Authority**: CS2 (Johan Ras / @APGI-cmy)
**Issued by**: independent-assurance-agent v6.2.0
**Date**: 2026-03-20
