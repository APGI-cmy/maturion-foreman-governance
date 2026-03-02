# REJECTION-PACKAGE

```
REJECTION-PACKAGE
PR: #1281
Date: 2026-03-02
IAA Session: IAA-20260302-PR1281-R2
Phases:
  Resubmission Protocol: BLOCKED — prior REJECTION-PACKAGE (IAA-20260302-PR1281) remediation items REM-001 and REM-002 are UNRESOLVED on the remote branch. Full Phase 3 execution blocked by INV-607/INV-608.
  Phase 1 (Preflight): BLOCKED — preflight-proof-1281.md exists locally (untracked) but NOT committed to branch; cannot be assessed as branch artifact
  Phase 2 (Governance): BLOCKED — governance-proof-1281.md exists locally (untracked) but NOT committed to branch
  Phase 3 (Working):   BLOCKED — working-proof-1281.md exists locally (untracked) but NOT committed to branch
  Phase 4 (Handover):  BLOCKED — prehandover_proof_1281.md exists locally (untracked) but NOT committed to branch; INV-405 BLOCKING gate parity absent from branch artifacts
Agent Integrity: CONDITIONAL FAIL — INTEGRITY_INDEX on branch (c4a6711e...) does not match local working tree (e180c3e5...); attributed SHA on branch is for the unreduced 575-line version; local corrections are not committed. Committed baseline remains premature "CS2 (contract size reduction...)" attribution for an unapproved hash.
Independence: CONFIRMED — IAA (independent-assurance-agent) ≠ submitting agent (GitHub Copilot / CodexAdvisor-agent workflow)
Verdict: MERGE BLOCKED
```

---

## Root Cause: Work Not Committed to Branch

The invocation claims "All four phase proofs committed to branch" and describes REM-001 structural
changes as complete. Independent verification via GitHub API and git status reveals this is
inaccurate:

| Claim | Actual State on Branch |
|-------|------------------------|
| foreman-v2.agent.md: 431 lines, 18,601 chars, SHA `e180c3e5...` | Committed version: 575 lines, 25,785 chars, SHA `c4a6711e...` — UNCHANGED since original PR commit 5b488b9 |
| preflight-proof-1281.md committed | Local untracked file — never committed (git log returns empty) |
| governance-proof-1281.md committed | Local untracked file — never committed |
| working-proof-1281.md committed | Local untracked file — never committed |
| session-002-20260302.md committed | Local untracked file — never committed |
| prehandover_proof_1281.md committed | Local untracked file — never committed |
| INTEGRITY_INDEX "pending CS2 approval" | Branch INTEGRITY_INDEX still has `c4a6711e...` with premature "CS2 (contract size reduction...)" attribution |

The work exists in the local CI working directory from a previous session's uncommitted work.
The remote branch (`origin/copilot/reduce-contract-file-size`, HEAD `5b488b9110b04da8c04fcc9a3310c5391809a8b6`)
has not been updated since the original PR creation. The PR still has exactly 2 commits.

---

## Remediation Required

### REM-R2-001 (BLOCKING) — Commit and Push All Remediated Files to Branch

**Finding**: The structural change to `foreman-v2.agent.md` (431 lines, 18,601 chars, SHA `e180c3e5...`)
and all associated updates exist only in the local working directory. They must be committed and pushed
to the `copilot/reduce-contract-file-size` branch before IAA can proceed.

**Files that must be committed and pushed:**
1. `.github/agents/foreman-v2.agent.md` — the 431-line reduced version (SHA: `e180c3e5df2d19012f4b68de816d48d049a3d7f98ac4e45258213c03d1029681`)
2. `governance/quality/agent-integrity/foreman-v2.agent.md` — updated reference copy (same SHA)
3. `governance/quality/agent-integrity/INTEGRITY_INDEX.md` — with "pending CS2 approval" attribution and `e180c3e5...` hash
4. `.agent-admin/evidence/preflight-proof-1281.md`
5. `.agent-admin/evidence/governance-proof-1281.md`
6. `.agent-admin/evidence/working-proof-1281.md`
7. `.agent-workspace/foreman-v2/memory/session-002-20260302.md`
8. `.agent-admin/evidence/prehandover_proof_1281.md` (note: prehandover must reference IAA Session IAA-20260302-PR1281-R2 and iaa_audit_token: PENDING for this invocation)

**Evidence required**: `git push` must be executed, pushing to `origin/copilot/reduce-contract-file-size`.
GitHub API PR check must confirm new commit(s) on branch HEAD after the original `5b488b9`.
SHA256 of the committed `foreman-v2.agent.md` must equal `e180c3e5df2d19012f4b68de816d48d049a3d7f98ac4e45258213c03d1029681`.

### REM-R2-002 (BLOCKING) — Verify Structural Content After Commit

Once committed, IAA will independently verify:

**Minimum required content from REM-001:**
- `id: foreman-v2-agent` in YAML frontmatter (not `id: foreman`)
- Section 1.2 POLC inline explanation replaced with reference to `FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md`
- Sections 1.6-1.7 verb-to-mode table and mode-switching removed → references to `ECOSYSTEM_VOCABULARY.md` + Tier 2 `phase3-qp-template.md`
- Sections 2.5.1-2.5.6 Reality Check Gate step-by-step removed → reference to `PRE_BUILD_REALITY_CHECK_CANON.md` + Tier 2 `phase2-induction-script.md`
- Section 3.0 pre-wave agent availability checklist removed → reference to `FOREMAN_PRE_WAVE_AGENT_AVAILABILITY_CHECK.md`
- Priority Reference Matrix table replaced with single-line legend
- Final size: ≤300-400 lines (IAA will reconfirm independently against committed file)

### REM-R2-003 (BLOCKING) — Gate Check Results Must Be Verifiable on Branch

**Finding**: GitHub API shows PR status as "pending" (total_count: 0 — no check runs completed).
The invocation claims "merge-gate/verdict: PASS", "governance/alignment: PASS", "stop-and-fix/enforcement: PASS"
but these cannot be verified. After committing (REM-R2-001), the merge gate checks must run and pass.

**Evidence required**: After commit and push, GitHub Actions merge gate must complete and report
all three checks passing. The prehandover proof must reference actual gate run URLs.

---

## Re-entry Point

**The work exists locally but must be committed.**

Correct sequence for R3 invocation:

1. In the CI working directory, stage and commit all changes:
   ```
   git add .github/agents/foreman-v2.agent.md \
             governance/quality/agent-integrity/INTEGRITY_INDEX.md \
             governance/quality/agent-integrity/foreman-v2.agent.md \
             .agent-admin/evidence/preflight-proof-1281.md \
             .agent-admin/evidence/governance-proof-1281.md \
             .agent-admin/evidence/working-proof-1281.md \
             .agent-admin/evidence/prehandover_proof_1281.md \
             .agent-workspace/foreman-v2/memory/session-002-20260302.md
   git commit -m "Add evidence bundle and apply structural contract changes per IAA-20260302-PR1281 remediation"
   git push origin copilot/reduce-contract-file-size
   ```

2. Confirm the new commit appears as the HEAD of the PR branch (GitHub API should show new SHA)

3. Allow merge gate checks to complete

4. Update `prehandover_proof_1281.md` with gate check results and `iaa_audit_token: PENDING`

5. Re-invoke IAA for the third time (R3), citing:
   - This REJECTION-PACKAGE: IAA-20260302-PR1281-R2
   - All REM items resolved (REM-R2-001, REM-R2-002, REM-R2-003)
   - Branch HEAD SHA confirming new commit

**Re-entry Phase**: Phase 3 — Step 3.1 — after Step 4.2.1 (Resubmission Protocol confirms committed artifacts)

---

## Routed To

**GitHub Copilot (copilot-swe-agent) / CodexAdvisor-agent workflow** — acknowledged via invocation
statement. **Acknowledgement ON RECORD from R2 invocation.**

**Specific instruction**: The `git push` operation must be executed. The work is done; it simply
was not pushed to the remote branch. This is a one-step fix to unblock R3.

---

*Authority: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.0.0 | LIVING_AGENT_SYSTEM.md v6.2.0 | CS2 (Johan Ras)*
*IAA Session: IAA-20260302-PR1281-R2*
*Issued: 2026-03-02*
*Prior Session: IAA-20260302-PR1281 (REJECTION-PACKAGE)*
