# REJECTION-PACKAGE

**PR**: #1307 — [WIP] Fix duplicate layer-down issues and ripple PRs  
**Date**: 2026-03-06  
**IAA Session**: IAA-20260306-PR1307  
**Branch**: copilot/fix-duplicate-layer-down-issues-again  

---

```
REJECTION-PACKAGE
PR: #1307
Date: 2026-03-06
IAA Session: IAA-20260306-PR1307
Phases:
  Phase 1 (Preflight): FAIL — No preflight evidence section in PREHANDOVER proof; canon load, FAIL-ONLY-ONCE attestation, and merge gate status absent
  Phase 2 (Governance): PARTIAL-FAIL — Ripple assessment and protected-path check present; no governance hash verification documented
  Phase 3 (Working): FAIL — Stale SCOPE_DECLARATION.md (references different PR from 2026-02-11); no CI check run evidence; iaa_audit_token field absent; no risk section; changes not committed to branch
  Phase 4 (Handover): FAIL — iaa_audit_token field absent (CORE-018 BLOCKING); no session memory (CORE-015); INV-405 BLOCKING (no gate parity confirmation); PREHANDOVER proof not committed to branch
Agent Integrity: FAIL (pre-existing) — CodexAdvisor-agent.md hash drift on origin/main: baseline 6dff0aa9b0... ≠ actual 4302c3cb... Not caused by this PR. Escalated to CS2 per ESC-002.
Independence: CONFIRMED — IAA (assurance class) ≠ governance-repo-administrator-v2 (administrator class)
Wave Checklist Gate: FAIL — CHECKLIST-GATE-001 (no wave checklist at .agent-admin/waves/wave-<N>-current-tasks.md), CHECKLIST-GATE-003 (no wave_checklist reference in PREHANDOVER proof), CHECKLIST-GATE-004 (wave_checklist.status absent from PREHANDOVER proof)
Verdict: MERGE BLOCKED
```

---

## Remediation Required

### REM-1 — CRITICAL: WIP State — Commit Changes Before Resubmitting

The PR is in Work-In-Progress state. All three files (`.github/workflows/governance-layer-down-dispatch.yml`,
`governance/executable/workflows/consumer-alignment.yml.template`, and
`.agent-admin/prehandover/prehandover_proof_LAYER_DOWN_DEDUP_20260306.md`) are staged but
**NOT committed** to the remote branch. `git diff origin/main...origin/copilot/fix-duplicate-layer-down-issues-again`
returns empty — the remote branch has zero committed changes vs main.

**Fix required**: Commit all changes to the branch. Push to remote. Verify `git diff --name-only origin/main...HEAD`
lists all three files before re-invoking IAA.

---

### REM-2 — CORE-018 BLOCKING: iaa_audit_token Field Absent from PREHANDOVER Proof

The PREHANDOVER proof (`.agent-admin/prehandover/prehandover_proof_LAYER_DOWN_DEDUP_20260306.md`)
has no `iaa_audit_token` field at all. Under §4.3b architecture, this field MUST be pre-populated
with `PENDING` (or the expected reference format) before IAA invocation.

**Fix required**: Add the following to the PREHANDOVER proof before committing:

```markdown
## IAA Audit Token

iaa_audit_token: PENDING
```

Commit this before invoking IAA. The token will be updated to the IAA session reference
post-ceremony via the dedicated token file mechanism (§4.3b / A-021).

---

### REM-3 — CORE-015: No Session Memory Artifact

No session memory file exists on the branch for this PR. A session memory artifact is required
for all triggered PRs (CORE-015).

**Fix required**: Create a session memory artifact in `.agent-workspace/governance-repo-administrator-v2/memory/`
(or equivalent path for the producing agent) documenting this PR's work. Reference the session
memory path in the PREHANDOVER proof.

---

### REM-4 — A-026 / A-028: Stale SCOPE_DECLARATION.md

`SCOPE_DECLARATION.md` in the repository root references `copilot/canonicalize-gate-validation`
PR from 2026-02-11 with completely different files. It does not list any of the files changed in
PR #1307.

**Fix required**: Regenerate `SCOPE_DECLARATION.md` from `git diff --name-only origin/main...HEAD`
for THIS PR branch. Plain markdown list format required (A-028). Expected content:

```
- .github/workflows/governance-layer-down-dispatch.yml
- governance/executable/workflows/consumer-alignment.yml.template
- .agent-admin/prehandover/prehandover_proof_LAYER_DOWN_DEDUP_20260306.md
```

---

### REM-5 — OVL-CI-005: No CI Check Run Result URL

The PREHANDOVER proof contains no CI check run URL or log snippet confirming the modified
workflows executed successfully. For any `.github/workflows/` modification, OVL-CI-005 requires
at least one of: (a) a URL to the resulting CI check run, or (b) a log snippet confirming no
errors/failures.

**Fix required**: After committing the changes, run or reference any CI execution of the
modified workflow (or of the merge gate checks on the PR). Include the URL in the PREHANDOVER
proof under an Evidence section. If the workflow cannot be directly triggered in this context,
document the YAML syntax validation output with file references.

---

### REM-6 — OVL-CI-006: No Environment Parity Statement

The PREHANDOVER proof contains no environment parity statement. OVL-CI-006 requires an explicit
statement about whether the workflow change affects dev, staging, and production environments
differently.

**Fix required**: Add to the PREHANDOVER proof:

```markdown
## Environment Parity

These changes affect governance automation workflows only. The idempotency guards operate
identically across all environments (dev, staging, production) — they query the target
repository's issue/PR list before creation and skip if a duplicate exists. No environment-specific
behavior differences. No parity concern.
```

(Adjust the exact content to match the actual assessed impact.)

---

### REM-7 — Wave Checklist Invocation Gate: CHECKLIST-GATE-001, -003, -004

No wave checklist file exists at `.agent-admin/waves/wave-<N>-current-tasks.md`. The PREHANDOVER
proof has no `wave_checklist` block.

**Fix required (two options)**:

**Option A** — Wave context: If this PR is part of an active wave, the Foreman must create
`.agent-admin/waves/wave-<N>-current-tasks.md` with this task ticked (`[x]`), and add the
following block to the PREHANDOVER proof:

```markdown
## Wave Checklist

wave_checklist:
  path: .agent-admin/waves/wave-<N>-current-tasks.md
  status: ALL_TICKED
  unticked_tasks: NONE
```

**Option B** — CS2 Direct Review Track: For T4 (CI/workflow) PRs, the IAA canon v1.3.0
permits "CS2 Direct Review" as an alternative to full ceremony. If CS2 posts a
`CS2-DIRECT-REVIEW` comment on the PR explicitly approving the change, the checklist gate
and most ceremony requirements are waived. Confirm with CS2 which track applies.

> **Note**: IAA canon v1.3.0 (Tier 1, 2026-03-04) classifies this as T4 (CI/workflow) and says
> IAA is NOT required. The trigger table v2.1.0 (Tier 2, 2026-03-02) says CI_WORKFLOW is MANDATORY.
> This conflict requires CS2 resolution. In the interim, A-003 (ambiguity = mandatory) is applied.

---

### REM-8 — Pre-existing: CodexAdvisor-agent.md Hash Drift (CS2 Action Required)

**Not caused by this PR.** `INTEGRITY_INDEX.md` baseline hash for `CodexAdvisor-agent.md` is
`6dff0aa9b0d4f84a658c343b1e3317585d70f99046756a40389304a0c8590780` but the actual file on
`origin/main` computes as `4302c3cbaf6574b16c5093c21ebd32bf2b9762c799b25673ea5c11e6c39c0ac0`.
The most recent origin/main commit is "Update CodexAdvisor-agent.md" — the INTEGRITY_INDEX
was not updated in that commit.

**CS2 action required**: Update `governance/quality/agent-integrity/INTEGRITY_INDEX.md` and
`governance/quality/agent-integrity/CodexAdvisor-agent.md` reference copy to reflect the
current CodexAdvisor-agent.md state, following the Update Protocol in INTEGRITY_INDEX.md.
This is a CS2-only operation.

The producing agent for PR #1307 does NOT need to resolve this to unblock their PR (unless
CS2 directs otherwise).

---

## Substantive Assessment (Informational)

The actual code logic in both workflow files is technically sound:
- **governance-layer-down-dispatch.yml**: Idempotency guard correctly queries the target repo's
  issues API for open issues labeled `layer-down` with `SHORT_SHA` in the title, and uses
  `continue` to skip creation. Logic is correct.
- **consumer-alignment.yml.template**: `concurrency: cancel-in-progress: false` queues concurrent
  runs correctly. Dedup step with `steps.dedup.outputs.skip != 'true'` condition on the Create PR
  step is architecturally sound.

**This REJECTION-PACKAGE is based entirely on governance ceremony gaps.** The substance of the
change is approved; the ceremony must be completed before ASSURANCE-TOKEN can be issued.

---

## Re-entry Point

**Phase 2 — Step 2.1** — The submitting agent must re-enter at the beginning of the invocation
after resolving all remediation items (REM-1 through REM-7 above). REM-8 is a CS2-only action.

Minimum viable re-entry sequence:
1. Commit all staged changes to the branch (REM-1)
2. Update PREHANDOVER proof: add `iaa_audit_token: PENDING`, environment parity statement,
   CI evidence, and `wave_checklist` block (REM-2, REM-5, REM-6, REM-7)
3. Create session memory artifact (REM-3)
4. Regenerate SCOPE_DECLARATION.md from current diff (REM-4)
5. Commit all artifacts
6. Re-invoke IAA

**Routed To**: governance-repo-administrator-v2 (executing agent: copilot-swe-agent) —
acknowledgement required before resubmission.

---

*IAA Session: IAA-20260306-PR1307 | Authority: CS2 (Johan Ras) | Living Agent System v6.2.0*
