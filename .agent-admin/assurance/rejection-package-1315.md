# REJECTION-PACKAGE

```
REJECTION-PACKAGE
PR: #1315
Date: 2026-03-21
IAA Session: IAA-20260321-PR1315
Phases:
  Phase 1 (Preflight): PASS — IAA preflight complete; independence confirmed
  Phase 2 (Governance/Classification): PASS — PR classified AGENT_CONTRACT + KNOWLEDGE_GOVERNANCE + AGENT_INTEGRITY; overlays B, G loaded; independence confirmed (CodexAdvisor-agent / assurance — no conflict)
  Phase 3 (Working Phase): FAIL — No PREHANDOVER proof; no ceremony artifacts; no committed file changes; stale SCOPE_DECLARATION.md; CS2 authorization not documented in proof; OVL-AC-011/012 absent; OVL-KG-001 absent
  Phase 4 (Handover): FAIL — Cannot assess; no PREHANDOVER proof or session memory to review
Agent Integrity: FAIL — INTEGRITY_INDEX.md on origin/main has mismatched baseline for CodexAdvisor-agent.md (committed hash: 4302c3c... vs baseline: 6dff0aa...); pre-existing violation that this PR is intended to resolve but has not committed a fix
Independence: CONFIRMED — CodexAdvisor-agent / IAA no conflict
Verdict: MERGE BLOCKED
```

---

## Detailed Findings

### Finding 1 — CORE-018 FAIL: Zero committed file changes; PR is WIP
**Rule**: CORE-018 — Complete evidence artifact sweep  
**Evidence**: PR #1315 branch `copilot/apply-foreman-iaa-upgrades` has a single commit `8810e04` titled "Initial plan". `git diff origin/main...FETCH_HEAD --name-only` returns empty — ZERO files changed in the PR. `git status` shows 9 files staged but NOT committed. The PR title is `[WIP]` and the PR body shows all 9 checklist tasks as `[ ]` (unchecked). The changes described in the assurance invocation exist only in the local staging area, not in the branch.  
**Severity**: BLOCKING — Assurance cannot be granted for uncommitted work.  
**Remediation**: Commit all staged changes (and ensure unstaged changes are also resolved and committed) before invoking IAA. The PR must contain the actual file changes as committed content.

---

### Finding 2 — CORE-013 / CORE-015 / CORE-016 / CORE-018 FAIL: No ceremony artifacts present
**Rules**: CORE-013 (IAA invocation evidence), CORE-015 (session memory), CORE-016 (IAA tool call evidence), CORE-018 (complete evidence artifact sweep), OVL-AC-006, OVL-AC-007, OVL-KG-001  
**Evidence**: Search of `.agent-admin/prehandover/` reveals no PREHANDOVER proof for PR #1315 or branch `copilot/apply-foreman-iaa-upgrades`. The most recent prehandover proof is `prehandover_proof_1294_20260303.md`. No session memory from the submitting agent. No `iaa_audit_token` field. No dedicated IAA token file in `.agent-admin/assurance/` for PR #1315.  
**Severity**: BLOCKING — Three independent blocking checks (CORE-013, CORE-018, OVL-AC-006) all fail on the same absence.  
**Remediation**: Create PREHANDOVER proof at `.agent-admin/prehandover/prehandover_proof_1315_20260321.md` with `iaa_audit_token: PENDING`. Create session memory artifact. Commit both to the branch. Then re-invoke IAA.

---

### Finding 3 — A-026 FAIL: SCOPE_DECLARATION.md is stale
**Rule**: FAIL-ONLY-ONCE A-026  
**Evidence**: `SCOPE_DECLARATION.md` at repo root references `PR_ID: copilot/fix-duplicate-layer-down-issues-again` dated `2026-03-06T12:15:27Z` and lists files from a previous PR (`.github/workflows/governance-layer-down-dispatch.yml`, etc.). A-026 requires `SCOPE_DECLARATION.md` to match `git diff --name-only origin/main...HEAD` exactly before IAA invocation. The stale scope declaration lists entirely different files.  
**Severity**: BLOCKING  
**Remediation**: Update `SCOPE_DECLARATION.md` to list the 9 files actually changed in this PR before invoking IAA. It must list the committed diff exactly.

---

### Finding 4 — CORE-017 / A-005 FAIL: CS2 authorization not documented in PREHANDOVER proof
**Rule**: FAIL-ONLY-ONCE A-005 / CORE-017  
**Evidence**: Staged changes include modifications to `.github/agents/CodexAdvisor-agent.md` and `.github/agents/governance-repo-administrator-v2.agent.md`. A-005 requires that the producing agent is CodexAdvisor-agent AND CS2 authorization is **explicitly documented in the PREHANDOVER proof**. No PREHANDOVER proof exists. Note: CS2 authorization at task level is confirmed (Issue #1314 was opened by APGI-cmy / Johan Ras). However, the requirement is that this authorization be explicitly referenced in the PREHANDOVER proof artifact — this is not satisfied because no PREHANDOVER proof exists.  
**Severity**: BLOCKING (resolved by creating PREHANDOVER proof per Finding 2, but must explicitly reference Issue #1314 CS2 authorization)  
**Remediation**: PREHANDOVER proof must explicitly cite issue #1314 (CS2 authorization) and confirm the producing agent is CodexAdvisor-agent.

---

### Finding 5 — OVL-AC-011 / OVL-AC-012 FAIL: No drift check; no ripple/cross-agent assessment
**Rules**: OVL-AC-011 (agent file drift check), OVL-AC-012 (ripple/cross-agent assessment)  
**Evidence**: No PREHANDOVER proof exists. Consequently, no before/after character count or SHA256 comparison for modified agent contract files, and no ripple/cross-agent impact assessment.  
**Note**: This PR modifies CodexAdvisor-agent.md and governance-repo-administrator-v2.agent.md — both may have downstream ripple implications for Tier 2 knowledge and other agents that reference IAA_PRE_BRIEF_PROTOCOL.md. The PREHANDOVER proof must address this.  
**Severity**: BLOCKING (resolved when PREHANDOVER proof is created with required sections)  
**Remediation**: PREHANDOVER proof must include: (a) before/after hashes for all modified agent contract files, (b) explicit ripple assessment listing affected agents and whether further ripple is required.

---

### Finding 6 — AGENT_INTEGRITY: Pre-existing integrity violation flagged (Advisory to CS2)
**Rule**: INV-501 to INV-504 (Agent Integrity Check)  
**Evidence**: `sha256sum` of committed `CodexAdvisor-agent.md` on origin/main and FETCH_HEAD = `4302c3cbaf6574b16c5093c21ebd32bf2b9762c799b25673ea5c11e6c39c0ac0`. INTEGRITY_INDEX.md baseline on origin/main = `6dff0aa9b0d4f84a658c343b1e3317585d70f99046756a40389304a0c8590780`. **MISMATCH detected**. This pre-dates this PR (both origin/main and FETCH_HEAD have the same committed hash). The staged changes in this PR would update INTEGRITY_INDEX to `f928b2a...` (matching the staged/modified CodexAdvisor-agent.md) — but the staged changes are not committed.  
**Status**: Pre-existing violation, not introduced by this PR. This PR's changes (when properly committed) would partially address it.  
**Action Required**: CS2 is notified of the pre-existing INTEGRITY_INDEX mismatch for CodexAdvisor-agent.md. This PR must ensure the final committed state of CodexAdvisor-agent.md and INTEGRITY_INDEX baseline are consistent.  
**Severity for this PR**: ADVISORY (pre-existing, not introduced by this PR) — however, the PR must ensure the committed fix is coherent.

---

## Remediation Required

| Priority | Action | Maps To |
|----------|--------|---------|
| 1 | Commit all 9 staged files to the branch; resolve unstaged changes | Finding 1 |
| 2 | Update `SCOPE_DECLARATION.md` to list the 9 committed files | Finding 3 |
| 3 | Create PREHANDOVER proof `prehandover_proof_1315_20260321.md` with: `iaa_audit_token: PENDING`, CS2 authorization citation (Issue #1314), before/after hashes, ripple assessment | Findings 2, 4, 5 |
| 4 | Create submitting agent session memory and commit to branch | Finding 2 |
| 5 | Verify that final committed CodexAdvisor-agent.md sha256 matches the INTEGRITY_INDEX entry being submitted | Finding 6 |
| 6 | Re-invoke IAA | All |

## Re-entry Point
**Phase 3 — Step 3.4 — Working Phase Proof Review**  
The submitting agent must re-enter at Phase 3 Step 3.4 after completing all remediation items above and committing the complete set of files to the branch.

## Routed To
`CodexAdvisor-agent` (submitting agent) — acknowledgement required before resubmission.  
The submitting agent must: (a) acknowledge receipt of this REJECTION-PACKAGE, (b) resolve all items in the remediation table above, (c) re-invoke IAA.

---

*IAA Session: IAA-20260321-PR1315 | Authority: CS2 (Johan Ras / @APGI-cmy)*  
*Contract: independent-assurance-agent v6.2.0 | Living Agent System v6.2.0*
