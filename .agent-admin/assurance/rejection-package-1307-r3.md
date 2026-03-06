# REJECTION-PACKAGE

```
REJECTION-PACKAGE
PR: #1307
Date: 2026-03-06
IAA Session: IAA-20260306-PR1307-R3
Phases:
  Phase 1 (Preflight): PASS — Session memory attestation present; T4 Two-Phase ceremony
  Phase 2 (Governance): PASS — Protected paths not touched; CS2 authorization documented; ripple assessment present
  Phase 3 (Working): FAIL — A-028: SCOPE_DECLARATION.md CHANGE_SUMMARY/AUTHORITY section contains stale references to 4 files not in this PR's diff
  Phase 4 (Handover): PASS — PREHANDOVER proof committed; iaa_audit_token PENDING (valid); session memory committed; environment parity documented
Agent Integrity: PASS — foreman, governance-repo-admin, IAA all match baseline; CodexAdvisor pre-existing drift (ESC-002 open, not caused by this PR)
Independence: CONFIRMED — independent-assurance-agent ≠ governance-repo-administrator-v2
Verdict: MERGE BLOCKED
Remediation Required:
  - REM-B1 (BLOCKING): Remove stale content from SCOPE_DECLARATION.md CHANGE_SUMMARY/AUTHORITY section.
    The following block appears verbatim in the committed SCOPE_DECLARATION.md but references files
    NOT present in git diff --name-only origin/main...origin/copilot/fix-duplicate-layer-down-issues-again:
      Changes:
        1. MERGE_GATE_PHILOSOPHY.md v2.0.0 - Added Pre-Handover Gate Duplication Mandate (constitutional)
        2. PREHANDOVER_PROOF_TEMPLATE.md v3.0.0 - Enhanced gate validation protocol (6-step process)
        3. OPOJD_COMPLETE_JOB_HANDOVER_DOCTRINE.md v2.0 - Added gate validation to quality gates checklist
        4. CROSS_AGENT_COORDINATION_PROTOCOL.md v1.1 - Added FM coordination example for gate failures
      Rationale: Close governance gaps identified in issue...
      Authority: Constitutional requirement per OPOJD v2.0, AGENT_IGNORANCE_PROHIBITION_DOCTRINE...
    These are prior-wave entries from an unrelated task. Per A-028, prior-wave entries MUST be trimmed.
    Fix: Remove this stale block from SCOPE_DECLARATION.md. The AUTHORITY section should only state
    the CS2 authorization for this PR's specific changes. Commit the corrected file and resubmit.
Re-entry Point: Phase 3 — Step 3.4 — A-028 SCOPE_DECLARATION format compliance (single edit required)
Routed To: governance-repo-administrator-v2 — acknowledgement required before resubmission
```

---

## Assessment Notes

### Code Substance: CONFIRMED CORRECT (3rd consecutive IAA confirmation)

Both idempotency guards are technically sound:
- `governance-layer-down-dispatch.yml`: `gh api` pre-check using `labels=layer-down` + jq `test("[Layer-Down].*$SHORT_SHA")` filter correctly prevents duplicate issues
- `consumer-alignment.yml.template`: `concurrency:` block + `Check for existing alignment PR` dedup step correctly prevents duplicate alignment PRs

**This REJECTION-PACKAGE is governance-ceremony-only.** The code has been reviewed and approved substantively across R1, R2, and R3.

### Framework Gap (NOT blocking — flagged for CS2)

A-026 strict match: 5 IAA-authored files appear in the diff but not in SCOPE_DECLARATION FILES_CHANGED:
- `.agent-admin/assurance/rejection-package-1307.md`
- `.agent-admin/assurance/rejection-package-1307-r2.md`
- `.agent-admin/escalation-inbox/rejection-1307-20260306.md`
- `.agent-workspace/independent-assurance-agent/memory/session-012-20260306.md`
- `.agent-workspace/independent-assurance-agent/memory/session-013-20260306.md`

These are IAA-produced artifacts. REM-A (session-013) required removing them from SCOPE_DECLARATION. This creates an irresolvable conflict between A-026 (exact match) and REM-A. Intelligence-led ruling: the purpose of A-026 (prevent hidden scope creep) is fully satisfied — zero hidden scope. **Not blocking.** CS2 should add an A-026 carve-out for IAA-produced artifacts in the diff.

### R4 Re-Entry Guidance

1. Edit `SCOPE_DECLARATION.md` — remove the stale "Changes" block from the AUTHORITY section (lines approximately 35–47 of the committed file). Retain only: `CS2 (Johan Ras) — Issue raised 2026-03-06. Workflow file changes authorized by CS2 issue authority.`
2. Commit the corrected `SCOPE_DECLARATION.md` to the branch
3. Confirm `git diff --name-only origin/main...origin/<branch>` still shows the expected 10 files
4. Resubmit IAA invocation

---

*Authority: CS2 (Johan Ras) | IAA Session: IAA-20260306-PR1307-R3 | 2026-03-06*
*Routed to: governance-repo-administrator-v2 — acknowledgement required before R4 resubmission*
