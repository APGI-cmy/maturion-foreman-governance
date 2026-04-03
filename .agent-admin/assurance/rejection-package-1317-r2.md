# IAA Rejection Package — PR #1317 R2 — IAA-20260403-PR1317-R2

**Date**: 2026-04-03
**IAA Session**: IAA-20260403-PR1317-R2
**Prior Session**: IAA-20260403-PR1317 (R1)
**PR**: #1317
**Branch**: copilot/update-frs-trs-architecture-templates
**Submitting Agent**: copilot-swe-agent[bot]

---

```
REJECTION-PACKAGE
PR: #1317
Branch: copilot/update-frs-trs-architecture-templates
Date: 2026-04-03
IAA Session: IAA-20260403-PR1317-R2
Submitting Agent: copilot-swe-agent[bot] (Copilot)

Phases:
  Phase 1 (Preflight):  PASS — preflight-proof-1317.md substantive; A-09 breach honestly recorded
  Phase 2 (Governance): PASS — governance-proof-1317.md complete; SHA256 hashes verified; ripple assessed
  Phase 3 (Working):    PASS — working-proof-1317.md comprehensive; 4 design decisions; CORE-007 addressed
  Phase 4 (Handover):   PASS — PREHANDOVER proof present; wave checklist ALL_TICKED; gate parity confirmed;
                                iaa_audit_token: PENDING (First Invocation Exception)
Agent Integrity:        PASS — all 4 agent contracts verified; no SHA256 drift detected
Independence:           CONFIRMED

Scope Declaration:      FAIL — A-026 (2 phantom entries + 7 undeclared diff files) + A-028 (stale
                                prior-wave PR#1315 content throughout; prior-wave entries not trimmed)

Verdict: MERGE BLOCKED

Remediation Required:
  F7-R2 [A-026 + A-028]: governance/scope-declaration.md must be completely regenerated.
    Step 1: Run: git diff --name-only origin/main...HEAD
    Step 2: Replace FILES_CHANGED section with ONLY the files from that output (currently 12 files).
            Format: one entry per line: `- path/to/file`
    Step 3: Remove the stale PR#1315 content from the In Scope section entirely.
            Content to remove includes all references to: CodexAdvisor-agent.md changes,
            governance-repo-administrator-v2.agent.md IAA step additions, Tier 2 knowledge index
            updates, CodexAdvisor checklist-registry.md, governance-repo-administrator
            session-memory-template.md — none of this content relates to PR #1317.
    Step 4: Remove phantom entries from FILES_CHANGED:
            - governance/quality/agent-integrity/INTEGRITY_INDEX.md (0 lines of diff — phantom)
            - governance/quality/agent-integrity/governance-repo-administrator-v2.agent.md (0 lines of diff — phantom)
    Step 5: Verify: count of FILES_CHANGED entries == count of git diff --name-only output lines.

Re-entry Point: Phase 3 — Step 3.7 — Scope Declaration A-026/A-028 Check
NOTE: All other phases are PASS and all other evidence artifacts are ACCEPTED.
      Only governance/scope-declaration.md requires correction in R3.

WARNING: This is the SECOND consecutive A-026/A-028 failure for PR #1317 (F7 in R1, F7-R2 here).
         A THIRD failure on A-026/A-028 for this PR will trigger HALT-005 (CATASTROPHIC escalation).
```

---

## Resubmission Notes

All evidence artifacts ACCEPTED — do NOT recreate:
- [x] `.agent-admin/evidence/preflight-proof-1317.md` — ACCEPTED (Phase 1 PASS)
- [x] `.agent-admin/evidence/governance-proof-1317.md` — ACCEPTED (Phase 2 PASS)
- [x] `.agent-admin/evidence/working-proof-1317.md` — ACCEPTED (Phase 3 PASS)
- [x] `.agent-admin/prehandover/prehandover_proof_1317_20260403.md` — ACCEPTED (Phase 4 PASS; §4.3b IMMUTABLE — do not modify)
- [x] `.agent-admin/waves/wave-frs-trs-ad-traceability-current-tasks.md` — ACCEPTED
- [x] `.agent-workspace/governance-repo-administrator/memory/session-copilot-1317-20260403.md` — ACCEPTED

Only action required before R3 resubmission:
- [ ] Regenerate `governance/scope-declaration.md` from `git diff --name-only origin/main...HEAD`
- [ ] Verify: 12 entries in FILES_CHANGED, matching diff exactly, no phantom entries
- [ ] Remove stale PR#1315 In Scope content
- [ ] Acknowledge this REJECTION-PACKAGE before resubmitting to IAA

*independent-assurance-agent | IAA-20260403-PR1317-R2 | 2026-04-03*
