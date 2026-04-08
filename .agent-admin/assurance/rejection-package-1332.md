# REJECTION-PACKAGE

```
REJECTION-PACKAGE
PR: #1332
Date: 2026-04-08
IAA Session: IAA-20260408-PR1332
Phases:
  Phase 1 (Preflight): PASS — FAIL-ONLY-ONCE attestation substantive; CS2 authorization cited; no .github/agents/ modifications
  Phase 2 (Governance): PASS — CANON_INVENTORY.json 199 entries, 0 placeholder hashes; ripple assessment present
  Phase 3 (Working): FAIL — OVL-CG-006: GOVERNANCE_CANON_MANIFEST.md hash stale in CANON_INVENTORY.json (recorded: 6abe9914fc9ba456..., actual: 53c8f4d26178cdc4...)
  Phase 4 (Handover): FAIL — OVL-CG-005: no drift evidence in PREHANDOVER proof; A-026: SCOPE_DECLARATION.md stale (5th occurrence)
Agent Integrity: PASS — all 4 SHA256 values match INTEGRITY_INDEX.md baseline
Independence: CONFIRMED — IAA (assurance class) ≠ submitting agent (governance-repo-administrator-v2, governance class)
Verdict: MERGE BLOCKED
```

## Remediation Required

### Finding 1 — OVL-CG-006: GOVERNANCE_CANON_MANIFEST.md hash stale in CANON_INVENTORY.json

**Severity**: BLOCKING (Zero-Severity-Tolerance per CORE-021)  
**Location**: `governance/CANON_INVENTORY.json` → entry for `GOVERNANCE_CANON_MANIFEST.md`

`GOVERNANCE_CANON_MANIFEST.md` was modified in this PR (ECAP-001 entry added, totals 92→93 canon files, 78→79 PUBLIC_API), but its `file_hash_sha256` field in `CANON_INVENTORY.json` was not updated to reflect the post-modification file state.

- **CANON_INVENTORY.json recorded hash**: `6abe9914fc9ba4564d8d0f0f906055611448c4518b6db27e651d998312354d68`
- **Actual file SHA256 (on branch)**: `53c8f4d26178cdc49dd9dc9cb9ec17e26ed0c9171b2d23360b96f27c5fdb1814`

**Remediation**: Recompute `sha256sum governance/canon/GOVERNANCE_CANON_MANIFEST.md` and update the `file_hash_sha256` field in `governance/CANON_INVENTORY.json` to match. Then re-run `validate-canon-hashes.sh` and confirm 0 failures.

---

### Finding 2 — OVL-CG-005: No drift evidence in PREHANDOVER proof

**Severity**: BLOCKING (Zero-Severity-Tolerance per CORE-021)  
**Location**: `.agent-admin/prehandover/proof-20260408T105848Z.md`

The PREHANDOVER proof contains ✅ checkmarks asserting that canon files were amended, but provides **zero drift evidence** for any of the 5 modified canon files:

- `FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md` (v1.1.0→v1.2.0)
- `AGENT_HANDOVER_AUTOMATION.md` (v1.1.5→v1.1.6)
- `INDEPENDENT_ASSURANCE_AGENT_CANON.md` (v1.3.0→v1.4.0)
- `IAA_PRE_BRIEF_PROTOCOL.md` (v1.2.0→v1.2.1)
- `GOVERNANCE_CANON_MANIFEST.md` (92→93 canon files)

Per OVL-CG-005, for each modified canon file, the PREHANDOVER proof must include either:
(a) SHA256 hash before AND after the change, or  
(b) A git diff excerpt or summary confirming the exact scope of change.

**Remediation**: Create a new PREHANDOVER proof (per PREHANDOVER immutability rule — new proof supersedes) that includes drift evidence for all 5 modified canon files. Minimum acceptable: for each file, state the before-hash (from prior CANON_INVENTORY.json state or git log) and after-hash (current sha256sum), OR a git diff --stat summary. A claim of "CANON_INVENTORY integrity verified" without per-file drift evidence does not satisfy OVL-CG-005.

Note: The prior proof (`proof-20260408T105848Z.md`) must remain on the branch; the new proof supersedes it per §4.3b architecture. PREHANDOVER immutability applies.

---

### Finding 3 — A-026: SCOPE_DECLARATION.md stale (5th occurrence)

**Severity**: BLOCKING (FAIL-ONLY-ONCE A-026, A-028)  
**Location**: `SCOPE_DECLARATION.md`

`SCOPE_DECLARATION.md` contains the wrong PR context:
- **Recorded PR_ID**: `copilot/orchestrate-downstream-closure` (2026-04-06)
- **Actual branch**: `copilot/create-canon-execution-ceremony-admin`
- **Files in SCOPE_DECLARATION**: 12 files from a prior session, none matching the 11 actual PR diff files

This is the **5th consecutive occurrence** of SCOPE_DECLARATION.md staleness at IAA invocation (PRs #1315, #1317, #1319, #1320, #1332). Per FAIL-ONLY-ONCE A-026/A-028 and OVF-003, a CS2 escalation for systemic workflow gap is warranted.

**Remediation**: As the absolute last action before resubmitting this PR to IAA, regenerate `SCOPE_DECLARATION.md` from `git diff --name-only origin/main...HEAD`. The PR_ID must match the current branch name. FILES_CHANGED must list exactly the files in the current diff. Do not copy from a prior session. Commit the regenerated file and then immediately invoke IAA — do not perform any further file modifications after regenerating SCOPE_DECLARATION.md.

---

## Re-entry Point

**Phase 3 — Step 3.4 — Working Phase Proof Review**

The submitting agent must:
1. Fix `CANON_INVENTORY.json` hash for `GOVERNANCE_CANON_MANIFEST.md` (Finding 1)
2. Create a new PREHANDOVER proof with drift evidence for all 5 modified files (Finding 2)
3. Regenerate `SCOPE_DECLARATION.md` as the absolute last pre-invocation action (Finding 3)
4. Commit all three remediation items and invoke IAA for re-assurance

The substantive work (ECAP-001 canon content, all version bumps, authority boundaries, non-substitution rule) is **correct** and does not require rework.

## Routed To

**governance-repo-administrator-v2** — acknowledgement required before resubmission.

Acknowledge receipt of this REJECTION-PACKAGE by noting all three remediation items in your next session memory and confirming the re-entry point.

---

**IAA Session**: IAA-20260408-PR1332  
**Authority**: independent-assurance-agent | CS2 (Johan Ras / @APGI-cmy)  
**Issued**: 2026-04-08
