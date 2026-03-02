# Rejection Package — PR #1257

**IAA Session**: IAA-20260302-PR1257
**Date**: 2026-03-02
**Verdict**: REJECTION-PACKAGE
**Primary Halt Condition**: HALT-004 — Independence Violation (Rule 4, SELF-ASSURANCE-001)
**Secondary Findings**: Missing evidence bundle (all 4 phases); out-of-scope governance regression; unauthorized agent contract modification; stale CANON_INVENTORY hashes.
**Authority**: CS2 (Johan Ras / @APGI-cmy)

---

```
REJECTION-PACKAGE
PR: #1257
Title: Purge 'non-blocking' from canon; add approved substitutes
Date: 2026-03-02
IAA Session: IAA-20260302-PR1257

Phases:
  Phase 1 (Preflight):  FAIL — No preflight proof artifact exists for PR #1257.
                                INV-101 to INV-106 all fail.
  Phase 2 (Governance): FAIL — No governance proof exists. CANON_INVENTORY.json has
                                stale hashes for all 5 modified canon files. No CS2
                                authorization for agent contract modification. No ripple
                                assessment. INV-201 to INV-207 all fail.
  Phase 3 (Working):    FAIL — No working proof exists. PR scope vs. stated intent
                                mismatch (INV-305). No issue/wave traceability (INV-306,
                                INV-701). No risk section (INV-307). INV-703: massive
                                out-of-scope governance regression bundled in diff.
  Phase 4 (Handover):   FAIL — No handover proof exists. INV-405 BLOCKING: no gate
                                parity check performed. INV-401 to INV-408 all fail.

Agent Integrity: FAIL — .github/agents/independent-assurance-agent.md is modified in
                         the PR diff (branch vs. main): contract downgraded from v2.0.0
                         to v1.0.0 without CS2 authorization (A-005 / OVB-001). SHA256
                         of IAA contract on this branch (0dbfe70f...) does not match
                         current main baseline (5580e2c4...). INTEGRITY_INDEX.md entry
                         for IAA is deleted by this PR. Reference copy
                         governance/quality/agent-integrity/independent-assurance-agent.md
                         is deleted by this PR. INV-501, INV-502, INV-503 all FAIL.

Independence: VIOLATION
  — PR diff (branch vs. main) includes modification of
    .github/agents/independent-assurance-agent.md (IAA's own canonical contract file).
  — IAA Canon §Independence Requirements Rule 4: "Only CS2 may update the IAA agent
    contract file itself. Any PR modifying the IAA agent file without CS2 sign-off is
    auto-FAIL." No CS2 sign-off is documented in this PR.
  — SELF-ASSURANCE-001: structural prohibition on IAA assuring its own contract
    modification, regardless of authoring agent identity.
  — Precedent: session-005-20260302 (PR #1261) issued REJECTION-PACKAGE/HALT-004
    under identical structural condition.
  — Root cause: the branch was created from a commit BEFORE the main-branch merge
    of PR #1261 (GOV-IAA v2.0.0 upgrade). The IAA contract downgrade is an
    unintentional git artefact, not the stated purpose of this PR.

Verdict: MERGE BLOCKED

Remediation Required:

  [R-001] CRITICAL — REBASE THE BRANCH ON CURRENT MAIN BEFORE ANY OTHER REMEDIATION.
          The branch copilot/purge-non-blocking-language is behind current main by
          multiple merged PRs (#1255, #1261, and associated governance improvements).
          Merging this PR as-is would:
          - Revert IAA contract from v2.0.0 to v1.0.0 (removes governance safeguards)
          - Delete governance session memories 003, 004, 005
          - Delete assurance artifacts for PRs #1255 and #1261
          - Delete IAA escalation inbox entries (including halt-004-1261)
          - Remove IAA from INTEGRITY_INDEX.md and delete IAA reference copy
          - Downgrade IAA Tier-2 knowledge files (FAIL-ONLY-ONCE, checklist, overlays)
          - Delete iaa-trigger-table.md from Tier-2 knowledge
          - Remove YAML validation from governance-gate.yml
          - Soften error handling in governance-layer-down-dispatch.yml
          Rebase command: git rebase origin/main
          After rebase, only the 7 stated canon/policy files should appear in the diff.

  [R-002] CRITICAL — COMPLETE EVIDENCE BUNDLE after rebase.
          After rebasing, create all required phase proof artifacts:
          - .agent-admin/evidence/preflight-proof-1257.md (Phase 1 preflight)
          - .agent-admin/evidence/governance-proof-1257.md (Phase 2 governance)
          - .agent-admin/evidence/working-proof-1257.md (Phase 3 working)
          - .agent-admin/prehandover/prehandover_proof_1257_YYYYMMDD.md (Phase 4 handover)
          Each proof must be PR-specific (not boilerplate), cite this issue/wave,
          include FAIL-ONLY-ONCE attestation, and satisfy all corresponding INV checks.

  [R-003] REQUIRED — UPDATE CANON_INVENTORY.json with correct SHA256 for all 5
          modified canon files:
          - BUILD_INTERVENTION_AND_ALERT_MODEL.md: ae68a65c...
          - GOVERNANCE_RIPPLE_MODEL.md: fa52c59c...
          - WATCHDOG_AUTHORITY_AND_SCOPE.md: 4f06306f...
          - ASSISTED_RIPPLE_SCAN_HUMAN_REVIEW_SEMANTICS.md: e1ab12b9...
          - AUTOMATED_QUALITY_TOOLING_CANON.md: ee6abd40...
          Also bump version numbers in each canon file if applicable.
          Note: These hash values are correct for the current branch content.
          After rebase, if rebasing introduces any merge conflict that alters file
          content, recompute SHA256 values after resolving conflicts.

  [R-004] REQUIRED — RIPPLE ASSESSMENT.
          Governance proof must include: "Ripple required: YES — 4 consumer repos
          (per CONSUMER_REPO_REGISTRY.json). Layer-down ripple to be dispatched
          post-merge via governance-layer-down-dispatch.yml."
          Create a ripple log entry in .agent-admin/governance/ripple-logs/.

  [R-005] REQUIRED — GATE PARITY CHECK (INV-405 BLOCKING).
          Prehandover proof must confirm: merge-gate/verdict PASS,
          governance/alignment PASS, stop-and-fix/enforcement PASS.
          Run local gate validation before opening handover.

  [R-006] ADVISORY — CHANGELOG and GOVERNING ISSUE.
          Add CHANGELOG.md entry for this PR's canon changes.
          Include a formal "Closes #<issue>" reference in the PR description.

  [R-007] ADVISORY — PRE-EXISTING AGENT INTEGRITY DRIFT (not caused by this PR).
          The INTEGRITY_INDEX.md baselines for CodexAdvisor-agent.md, foreman-v2.agent.md,
          and governance-repo-administrator-v2.agent.md are stale. CS2 should schedule
          a separate INTEGRITY_INDEX update PR to refresh these baselines.

Re-entry Point: Phase 1 — Step 1.1 — Rebase + Preflight (after completing R-001,
                the submitting agent re-enters at Phase 1 of the standard governance
                ceremony on the rebased branch, not directly at evidence creation).

Independence Resolution: After rebasing (R-001), the IAA contract modification will
                         be eliminated from the diff. At that point, the independence
                         structural prohibition is resolved and IAA can proceed with
                         full Phase 3 assurance on resubmission.

Routed To: copilot-swe-agent (PR #1257 author) — acknowledgement required before
           resubmission. CS2 (@APGI-cmy) notified of R-007 advisory separately.
```

---

## Detailed Findings

### Independence Violation Detail

The PR branch `copilot/purge-non-blocking-language` was created from a point in history that predates the merge of PR #1261 (`[GOV-IAA] Upgrade Governance IAA Agent to contract v2.0.0`). The current `main` branch has `contract_version: 2.0.0` in `.github/agents/independent-assurance-agent.md`, but this PR branch has `contract_version: 1.0.0`. The actual diff shows the branch is **downgrading** the IAA contract, not performing the stated "purge non-blocking language" operation on it.

This is an unintentional consequence of git history, not malicious intent. However, the governance outcome is the same: the PR modifies the IAA contract, and IAA Canon Rule 4 makes this an auto-FAIL regardless of intent.

### Out-of-Scope Changes (INV-703)

The following files appear in the diff (`git diff origin/main..HEAD --name-status`) but are NOT in the PR's stated scope:

**MODIFIED (unintended downgrades):**
- `.github/agents/independent-assurance-agent.md` — contract v2.0.0 → v1.0.0
- `.github/workflows/governance-gate.yml` — removes workflow-yaml-lint job
- `.github/workflows/governance-layer-down-dispatch.yml` — softens error handling
- `governance/quality/agent-integrity/INTEGRITY_INDEX.md` — removes IAA entry
- `.agent-workspace/independent-assurance-agent/knowledge/FAIL-ONLY-ONCE.md` — downgraded
- `.agent-workspace/independent-assurance-agent/knowledge/iaa-category-overlays.md` — downgraded
- `.agent-workspace/independent-assurance-agent/knowledge/iaa-core-invariants-checklist.md` — downgraded
- `.agent-workspace/independent-assurance-agent/knowledge/index.md` — downgraded

**DELETED (governance regressions):**
- `.agent-admin/assurance/assurance-token-1255.md`
- `.agent-admin/assurance/rejection-package-1255.md`
- `.agent-admin/assurance/rejection-package-1261.md`
- `.agent-admin/evidence/governance-proof-1255.md`
- `.agent-admin/evidence/preflight-proof-1255.md`
- `.agent-admin/evidence/prehandover_proof_1261.md`
- `.agent-admin/evidence/working-proof-1255.md`
- `.agent-admin/prehandover/prehandover_proof_1255_20260301.md`
- `.agent-workspace/independent-assurance-agent/escalation-inbox/esc-002-integrity-drift-20260301.md`
- `.agent-workspace/independent-assurance-agent/escalation-inbox/halt-004-1261-20260302.md`
- `.agent-workspace/independent-assurance-agent/escalation-inbox/rejection-tracking-1255-20260301.md`
- `.agent-workspace/independent-assurance-agent/knowledge/iaa-trigger-table.md`
- `.agent-workspace/independent-assurance-agent/memory/session-003-20260301.md`
- `.agent-workspace/independent-assurance-agent/memory/session-004-20260301.md`
- `.agent-workspace/independent-assurance-agent/memory/session-005-20260302.md`
- `docs/governance/layer-down-rca-2026-02.md`
- `docs/layer-down-backfill.md`
- `governance/quality/agent-integrity/independent-assurance-agent.md`

### CANON_INVENTORY Stale Hash Table

| Canon File | Inventory Hash (stale) | Actual SHA256 (correct) |
|-----------|----------------------|------------------------|
| BUILD_INTERVENTION_AND_ALERT_MODEL.md | b74ffd74... | ae68a65c... |
| GOVERNANCE_RIPPLE_MODEL.md | 00cc56b0... | fa52c59c... |
| WATCHDOG_AUTHORITY_AND_SCOPE.md | 36b66652... | 4f06306f... |
| ASSISTED_RIPPLE_SCAN_HUMAN_REVIEW_SEMANTICS.md | 1c72a452... | e1ab12b9... |
| AUTOMATED_QUALITY_TOOLING_CANON.md | c1f052a7... | ee6abd40... |

---

*Authority: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.0.0 | LIVING_AGENT_SYSTEM.md v1.1.0 | CS2 (Johan Ras)*
*Session: IAA-20260302-PR1257*
