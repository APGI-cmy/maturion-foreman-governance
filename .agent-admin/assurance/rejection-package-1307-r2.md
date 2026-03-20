# REJECTION-PACKAGE (R2)

**PR**: #1307 — Fix duplicate layer-down issues and ripple PRs — two idempotency guards (RESUBMISSION R2)
**Date**: 2026-03-06
**IAA Session**: IAA-20260306-PR1307-R2
**Branch**: copilot/fix-duplicate-layer-down-issues-again

---

```
REJECTION-PACKAGE
PR: #1307
Date: 2026-03-06
IAA Session: IAA-20260306-PR1307-R2
Phases:
  Phase 1 (Preflight): SOFT-FAIL — No dedicated preflight section in PREHANDOVER proof; session memory covers attestation; not blocking under T4 Two-Phase reduced ceremony
  Phase 2 (Governance): PASS — Protected-path check, CS2 authorization, ripple assessment, no canon/agent files touched
  Phase 3 (Working): FAIL — A-026 (SCOPE_DECLARATION.md does not match remote git diff — returns empty; nothing committed to remote); A-028 (SCOPE_DECLARATION.md not listed in its own FILES_CHANGED); scope contamination (IAA-produced artifacts incorrectly listed in SCOPE_DECLARATION.md)
  Phase 4 (Handover): FAIL — INV-401 BLOCKING (PREHANDOVER proof not committed to remote branch); INV-405 BLOCKING (no CI run on committed code — nothing committed to remote); INV-409 FAIL (REM-1 from prior rejection unresolved)
Agent Integrity: PRE-EXISTING VIOLATION — CodexAdvisor-agent.md hash drift (4302c3cb ≠ 6dff0aa9); escalated to CS2 in session-012; not caused by this PR; no new action required this session
Independence: CONFIRMED — IAA (assurance class) ≠ governance-repo-administrator-v2 (administrator class)
Wave Checklist Gate: PASS — T4 exemption applied per IAA canon v1.3.0; CS2 direct invocation confirms CS2-DIRECT-REVIEW track; wave checklist is Foreman infrastructure not applicable to CS2-direct T4 work
Resubmission Protocol: BLOCKED — REM-1 unresolved (remote branch has zero committed changes)
Verdict: MERGE BLOCKED
```

---

## Resubmission Protocol Finding

**REM-1 UNRESOLVED (CARRY-FORWARD FROM IAA-20260306-PR1307):**

`git diff --name-only origin/main...origin/copilot/fix-duplicate-layer-down-issues-again` returns **empty**.

The remote branch has zero committed changes compared to main. All changes (staged workflow files, PREHANDOVER proof, session memory, SCOPE_DECLARATION.md) exist only in the local working tree — not on the remote branch.

The submitting agent's stated position — "Changes will be committed via report_progress AFTER this IAA invocation" — is structurally incompatible with IAA's role. The ASSURANCE-TOKEN is merge authorization for the committed branch content. IAA cannot authorize merging code that has not been committed to the branch.

---

## Code Substance Assessment

**The code changes themselves are substantively correct.** Both idempotency guards implement their stated intent properly:

- `governance-layer-down-dispatch.yml`: `gh api -X GET` with jq filter `[Layer-Down].*SHORT_SHA` correctly identifies existing open layer-down issues before creating duplicates. The `continue` control flow correctly skips creation. Pattern is robust and matches reference implementation in `layer-up-trigger.yml`.

- `consumer-alignment.yml.template`: `concurrency: cancel-in-progress: false` correctly queues concurrent runs. `gh pr list --json headRefName` filtered by `startswith(ALIGNMENT_BRANCH_PREFIX)` is robust to title changes. `steps.dedup.outputs.skip != 'true'` condition correctly gates PR creation.

**Substantive verdict: APPROVED. All failures are ceremony-sequencing failures, not substantive code issues.**

---

## Remediation Required

### REM-1 (CARRY-FORWARD — UNCHANGED)

**Commit all changes to remote branch BEFORE re-invoking IAA.**

The following changes are currently in the local working tree but NOT committed to `origin/copilot/fix-duplicate-layer-down-issues-again`:

Staged for commit:
- `new file: .agent-admin/prehandover/prehandover_proof_LAYER_DOWN_DEDUP_20260306.md`
- `modified: .github/workflows/governance-layer-down-dispatch.yml`
- `modified: governance/executable/workflows/consumer-alignment.yml.template`

Unstaged (modified):
- `modified: .agent-admin/prehandover/prehandover_proof_LAYER_DOWN_DEDUP_20260306.md`
- `modified: SCOPE_DECLARATION.md`

Untracked:
- `.agent-admin/assurance/rejection-package-1307.md`
- `.agent-admin/escalation-inbox/rejection-1307-20260306.md`
- `.agent-workspace/governance-repo-administrator/memory/session-062-20260306.md`

**Required steps:**
1. Apply REM-A (SCOPE_DECLARATION.md fix) first
2. `git add .github/workflows/governance-layer-down-dispatch.yml`
3. `git add governance/executable/workflows/consumer-alignment.yml.template`
4. `git add .agent-admin/prehandover/prehandover_proof_LAYER_DOWN_DEDUP_20260306.md`
5. `git add .agent-workspace/governance-repo-administrator/memory/session-062-20260306.md`
6. `git add SCOPE_DECLARATION.md`
7. `git commit -m "Fix duplicate layer-down issues and ripple PRs — two idempotency guards"`
8. `git push origin copilot/fix-duplicate-layer-down-issues-again`
9. Verify: `git diff --name-only origin/main...HEAD` shows expected files
10. THEN invoke IAA as R3

**DO NOT add IAA-produced artifacts to the commit — see REM-A.**

---

### REM-A (NEW — SCOPE_DECLARATION.md Scope Contamination)

Remove IAA-produced artifacts from `SCOPE_DECLARATION.md` FILES_CHANGED. The following are IAA's own artifacts and are NOT part of the submitting agent's PR scope:

Remove from FILES_CHANGED:
- `.agent-admin/assurance/rejection-package-1307.md` — IAA prior-session artifact
- `.agent-admin/escalation-inbox/rejection-1307-20260306.md` — IAA prior-session artifact
- `.agent-workspace/independent-assurance-agent/memory/session-012-20260306.md` — IAA prior-session artifact

Add to FILES_CHANGED (missing from own list):
- `SCOPE_DECLARATION.md` (A-028 — SCOPE_DECLARATION.md must list itself when modified)

Expected FILES_CHANGED after fix:
```
.github/workflows/governance-layer-down-dispatch.yml
governance/executable/workflows/consumer-alignment.yml.template
.agent-admin/prehandover/prehandover_proof_LAYER_DOWN_DEDUP_20260306.md
.agent-workspace/governance-repo-administrator/memory/session-062-20260306.md
SCOPE_DECLARATION.md
```

---

### REM-B (NEW — Post-Token Ceremony Only)

After ASSURANCE-TOKEN is issued in R3, create dedicated token file at:
`.agent-admin/assurance/iaa-token-session-013-pr1307-20260306.md`
per §4.3b / A-021. This is a post-ceremony action; NOT required before R3 invocation (CORE-016 First Invocation Exception applies — `iaa_audit_token: PENDING` is valid for R3 since no prior ASSURANCE-TOKEN exists for this PR).

---

## Wave Checklist — Resolved

REM-7 is resolved. T4 (CI/workflow change) per IAA canon v1.3.0 exempts wave checklist ceremony. CS2 direct invocation confirms CS2-DIRECT-REVIEW track. No wave checklist is required or expected for this PR.

---

## ⚠ HALT-005 Warning

This is the SECOND consecutive same-basis rejection for PR #1307 (R1: IAA-20260306-PR1307; R2: this session). Both rejections are caused by the same structural issue: pre-commit IAA invocation.

If R3 fails on the same basis, per HALT-005 protocol (third-repeat alignment failure on same PR), IAA must escalate as CATASTROPHIC to CS2 and halt further assurance work on this PR until CS2 resolves the structural conflict between governance-repo-administrator-v2 A-09 and IAA INV-401.

---

## Re-entry Point

**Phase 3, Step 3.0 — Resubmission Protocol Verification**

Before re-invoking IAA as R3, confirm:
1. All staged changes committed and pushed to remote branch ✓
2. `git diff --name-only origin/main...HEAD` returns expected files ✓
3. SCOPE_DECLARATION.md corrected (REM-A applied) ✓
4. CI/merge gate checks have run on the committed branch (or YAML lint evidence documented) ✓

---

**Routed To**: governance-repo-administrator-v2 (copilot-swe-agent) — acknowledgement required before resubmission.

**Session Memory**: `.agent-workspace/independent-assurance-agent/memory/session-013-20260306.md`

---

*Authority: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.3.0 | IAA Session IAA-20260306-PR1307-R2 | 2026-03-06*
