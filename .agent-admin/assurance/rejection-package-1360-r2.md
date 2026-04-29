```
REJECTION-PACKAGE
PR: #1360
Date: 2026-04-29
IAA Session: IAA-20260429-PR1360-R2
Round: 2 (resubmission after IAA-20260429-PR1360 / session-038)
Phases:
  Phase 1 (Preflight): PASS — PREHANDOVER proof present; iaa_reinvocation_round: 1;
                               remediation_completed block present; A-030 re-invocation carve-out applied
  Phase 2 (Governance): PASS — CANON_INVENTORY updated; all 3 canon file SHA256 hashes IAA-verified exact match;
                                version bumps confirmed (AHA v1.7.0, SDS v2.0.0, template v2.0.0)
  Phase 3 (Working): FAIL — OVL-CI-005: PREHANDOVER claims scope-to-diff/validation: PASS with no CI URL;
                             all 4 CI runs on branch concluded=failure; new workflow has 0 pull_request runs
  Phase 4 (Handover): FAIL — PREHANDOVER files_changed: 10 but git diff --name-only origin/main...HEAD = 16 files;
                              pr-1360.md scope declaration correctly lists 16; discrepancy in attestation document
Agent Integrity: PASS — IAA contract SHA256 0d414fd2d059fbda8ed8a2bab42fc4698674d893d45ea954d92d0f940165b8ac
                         matches INTEGRITY_INDEX baseline; no .github/agents/ files in diff
Independence: CONFIRMED — IAA (assurance class) vs GitHub Copilot (builder/tool class); no conflict
Verdict: MERGE BLOCKED

Remediation Required:

  R-04 [BLOCKING — OVL-CI-005]: CI check run result missing from PREHANDOVER proof.
    Gap: PREHANDOVER proof gate_inventory states scope-to-diff/validation: PASS but:
      (a) No CI check run URL is provided.
      (b) No CI log snippet is provided.
      (c) All 4 actual CI runs on this branch (run IDs #1969–#1972) concluded=failure.
          Most recent: run #1972, commit c4b7c171a2, event=push, conclusion=failure.
          URL: https://github.com/APGI-cmy/maturion-foreman-governance/actions/runs/25097562014
      (d) The new governance-scope-to-diff-gate.yml workflow (pull_request trigger) has NEVER
          run as a pull_request event (0 pull_request runs found).
      (e) The 3 remediation commits (75bd418, 179ba49, 363c008) have NOT been pushed to origin.
          The PR at GitHub is still at commit c4b7c171a2. CI cannot run on the remediation state.
    Remediation steps required:
      1. Push the 3 pending local commits to origin/copilot/replace-global-scope-declaration.
      2. Confirm the PR #1360 at GitHub now reflects all 16 files (including PREHANDOVER proof,
         session memory, CANON_INVENTORY update, and updated pr-1360.md scope declaration).
      3. Wait for the pull_request CI trigger of governance-scope-to-diff-gate.yml to execute.
      4. If CI passes: create a Correction Addendum at
         .agent-admin/assurance/correction-addendum-1360-r2-YYYYMMDD.md per §4.3b / A-030
         documenting the CI check run URL and confirming PASS.
      5. If CI fails: diagnose the workflow failure, fix, re-run, and then produce the Correction Addendum.
      6. The Correction Addendum (not a modified PREHANDOVER proof) is the appropriate vehicle
         per §4.3b architecture (PREHANDOVER is immutable post-commit).
    OVL-CI-005 requirement (verbatim): "When any .github/workflows/ or .github/scripts/ file is
    modified, PREHANDOVER must include the URL of the resulting CI check run result or a log
    snippet confirming the workflow executed successfully (no errors/failures). A claim that CI
    passed without any supporting URL or log reference = REJECTION-PACKAGE."

  R-05 [BLOCKING — Phase 4 / ZST]: PREHANDOVER files_changed count stale.
    Gap: PREHANDOVER proof states files_changed: 10 and Summary section says "Scope of changes
    (10 files)". The actual git diff --name-only origin/main...HEAD = 16 files:
      .agent-admin/assurance/rejection-package-1360.md
      .agent-admin/prehandover/prehandover_proof_1360_20260429.md
      .agent-admin/scope-declarations/README.md
      .agent-admin/scope-declarations/pr-1360.md
      .agent-workspace/foreman-v2/memory/session-036-20260429.md
      .agent-workspace/independent-assurance-agent/escalation-inbox/rejection-tracking-1360-20260429.md
      .agent-workspace/independent-assurance-agent/memory/session-038-20260429.md
      .github/scripts/README.md
      .github/scripts/validate-scope-to-diff.sh
      .github/workflows/governance-scope-to-diff-gate.yml
      SCOPE_DECLARATION.md
      governance/CANON_INVENTORY.json
      governance/canon/AGENT_HANDOVER_AUTOMATION.md
      governance/canon/SCOPE_DECLARATION_SCHEMA.md
      governance/canon/scope-declaration.template.md
      governance/scope-declaration.md
    The pr-1360.md scope declaration correctly lists all 16 files (updated in commit 363c008).
    The discrepancy is between the PREHANDOVER attestation (10) and the actual delivery scope (16).
    Additional omissions from PREHANDOVER summary: .github/scripts/README.md (implementation file,
    not ceremony), governance/CANON_INVENTORY.json (R-01 remediation artifact), and 3 IAA-produced
    ceremony files. The PREHANDOVER also does not account for 3 files it produced itself.
    Note: 6 of the 16 are IAA-produced or ceremony artifacts added post-PREHANDOVER. The
    .github/scripts/README.md and governance/CANON_INVENTORY.json are submitting-agent artifacts
    that should have been listed in the PREHANDOVER scope.
    Remediation: Issue a Correction Addendum (same artifact as R-04, combined) that:
      (a) Acknowledges the files_changed: 10 → 16 correction.
      (b) Identifies all 16 files with their categories (implementation / governance / ceremony).
      (c) Explains why the discrepancy exists (6 files were added after the PREHANDOVER was written,
          including 3 IAA-produced ceremony files from round 1 rejection).
      (d) Confirms the pr-1360.md scope declaration accurately reflects all 16 files.
    Under Zero-Severity-Tolerance: any discrepancy in an attestation document = REJECTION-PACKAGE,
    regardless of whether it is "understandable" from context.

Re-entry Point: Phase 3 — Step 3.7 — Overlay B CI check (OVL-CI-005) AND
                Phase 4 — Step 3.5 — Handover Proof (files_changed accuracy / INV-405)
  → The submitting agent must:
      (1) Push all 3 pending local commits to origin.
      (2) Trigger CI and obtain a successful pull_request run URL.
      (3) Issue a combined Correction Addendum addressing R-04 and R-05.
      (4) Request re-invocation with reference to this REJECTION-PACKAGE.

Routed To: GitHub Copilot (copilot-swe-agent) — acknowledgement required before resubmission.

Prior Round Summary:
  Round 1: IAA-20260429-PR1360 (session-038) — 3 findings (R-01, R-02, R-03)
  Round 2: IAA-20260429-PR1360-R2 (session-039) — 2 new findings (R-04, R-05)
  Prior round findings (R-01/R-02/R-03): ALL VERIFIED RESOLVED in this session.
```

---

## Evidence of Prior Remediation Resolution (Round 2 Verification)

### R-01 (CANON_INVENTORY hashes) — RESOLVED ✅
IAA independently computed SHA256 for all 3 modified canon files:
- `governance/canon/AGENT_HANDOVER_AUTOMATION.md`:
  - Live: `4b1fc80de6258b782995a1b31eb5d7f321dbf0ff641ca564c4109fa4fc605ba1`
  - CANON_INVENTORY: `4b1fc80de6258b782995a1b31eb5d7f321dbf0ff641ca564c4109fa4fc605ba1`
  - **MATCH ✅**
- `governance/canon/SCOPE_DECLARATION_SCHEMA.md`:
  - Live: `9aca071be20525159e8ee5f9b1450f53b144aeceeddd156146906be5a9e0f02f`
  - CANON_INVENTORY: `9aca071be20525159e8ee5f9b1450f53b144aeceeddd156146906be5a9e0f02f`
  - **MATCH ✅**
- `governance/canon/scope-declaration.template.md`:
  - Live: `f233e0bd21d745f5e2df0d0c9625913168a2ff94baa77e790084485c78afdf53`
  - CANON_INVENTORY: `f233e0bd21d745f5e2df0d0c9625913168a2ff94baa77e790084485c78afdf53`
  - **MATCH ✅**

### R-02 (Version bumps) — RESOLVED ✅
- `AGENT_HANDOVER_AUTOMATION.md`: v1.7.0 amendment header confirmed in file body
- `SCOPE_DECLARATION_SCHEMA.md`: v2.0.0 status block confirmed
- `scope-declaration.template.md`: v2.0.0 version comment confirmed

### R-03 (PREHANDOVER proof + session memory) — RESOLVED ✅
- PREHANDOVER proof: `.agent-admin/prehandover/prehandover_proof_1360_20260429.md` exists ✅
- Foreman session memory: `.agent-workspace/foreman-v2/memory/session-036-20260429.md` exists ✅
- Acknowledgement (INV-607): session-036-20260429.md explicitly records all 3 items as COMPLETE
  and requests IAA re-invocation ✅

---

## Substantive Review Findings

### Architecture (PASS)
The per-PR scope declaration model is architecturally sound. Replacing the single shared
SCOPE_DECLARATION.md with per-PR files at `.agent-admin/scope-declarations/pr-<PR_NUMBER>.md`
correctly resolves the merge-conflict defect identified in issue #1359. The implementation:
- Uses three-dot merge-base diff (`git diff --name-only origin/$BASE_REF...HEAD`) — correct
- Uses `grep -qxF` (exact-line, fixed-string) matching — correct, prevents false positives
- Stores per-PR scope at a predictable, conflict-free path — correct

### Workflow Logic (PASS — with CI execution caveat)
The new `governance-scope-to-diff-gate.yml` implements the validation correctly. The script
`validate-scope-to-diff.sh` implements all required checks. The implementation is correct
in design; the REJECTION-PACKAGE is for lack of CI execution evidence, not implementation error.

### Canon Updates (PASS)
All three canon files updated correctly: AGENT_HANDOVER_AUTOMATION.md §4.3d/§4.3e updated,
SCOPE_DECLARATION_SCHEMA.md v2.0.0 defines the new format, template updated. CANON_INVENTORY
correctly reflects all updates with verified SHA256 hashes.

---

**IAA Session**: IAA-20260429-PR1360-R2
**Authority**: CS2 (Johan Ras / @APGI-cmy)
**Date**: 2026-04-29
