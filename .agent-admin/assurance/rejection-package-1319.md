# REJECTION-PACKAGE

**PR**: #1319 — Canonise End-to-End Pre-Build Stage Model for 100% One-Time Build Governance
**Branch**: copilot/canonise-pre-build-stage-model
**Date**: 2026-04-05
**IAA Session**: IAA-20260405-PR1319
**Session Memory**: `.agent-workspace/independent-assurance-agent/memory/session-026-20260405.md`
**Submitting Agent**: copilot-swe-agent[bot] (governance-repo-administrator-v2)

---

## Phase Summary

| Phase | Verdict | Key Finding |
|-------|---------|-------------|
| Phase 1 (Preflight) | PASS | FAIL-ONLY-ONCE attestation present; OVF-002/A-10 explicitly cited |
| Phase 2 (Governance) | FAIL | Agent integrity index/reference copy not updated despite GA contract modification |
| Phase 3 (Working) | FAIL | OVL-AC-011 (drift evidence absent), OVL-AC-012 (cross-agent ripple absent), OVL-KG-003 (version history absent), OVL-KG-004 (knowledge index stale) |
| Phase 4 (Handover) | FAIL | Session memory absent (CORE-015/CORE-018 immediate blocker); SCOPE_DECLARATION.md stale from different PR (A-026/A-028) |
| Agent Integrity | FAIL | governance-repo-administrator-v2.agent.md modified (SHA256: ebb8ce29...) but INTEGRITY_INDEX.md and reference copy NOT updated in this PR |
| Independence | CONFIRMED | IAA ≠ submitting agent |

---

## Verdict: MERGE BLOCKED

```
REJECTION-PACKAGE
PR: #1319
Date: 2026-04-05
IAA Session: IAA-20260405-PR1319
Phases:
  Phase 1 (Preflight): PASS
  Phase 2 (Governance): FAIL — INV-502/503 agent integrity index not updated
  Phase 3 (Working): FAIL — OVL-AC-011, OVL-AC-012, OVL-KG-003, OVL-KG-004
  Phase 4 (Handover): FAIL — CORE-015/CORE-018 (session memory absent), A-026/A-028 (stale SCOPE_DECLARATION.md)
Agent Integrity: FAIL — SHA256 mismatch in INTEGRITY_INDEX.md
Independence: CONFIRMED
Verdict: MERGE BLOCKED
```

---

## Remediation Required (7 Items)

### F1 — Session Memory Absent (CORE-015 / CORE-018 — IMMEDIATE BLOCKER)

**Finding**: No session memory artifact for PR #1319 exists on the branch. The PREHANDOVER proof does not reference any session memory. CORE-018 is an immediate blocker — this check is applied before all overlay checks and its absence causes immediate REJECTION-PACKAGE.

**Remediation**: Create a GA session memory file at `.agent-workspace/governance-repo-administrator/memory/session-[N]-20260405.md` documenting this PR's session content (issue scope, design decisions, phase attestations, FAIL-ONLY-ONCE attestation, learning notes). Commit it to the branch. Reference the file path in the PREHANDOVER proof or in a correction addendum.

---

### F2 — Agent Integrity Index Not Updated (INV-502 / INV-503 — BLOCKING)

**Finding**: `governance-repo-administrator-v2.agent.md` was modified in this PR. The new SHA256 is:
```
ebb8ce29deea054ee98386850764ae7c89ae5ea20fbbdeac1ee0cae494b60254
```
However, `governance/quality/agent-integrity/INTEGRITY_INDEX.md` still reflects the pre-modification hash:
```
ebeb821af69e9f7fcb9d0d2367bae6b736b965d014099a77b4d789194cb7fec7
```
And the reference copy at `governance/quality/agent-integrity/governance-repo-administrator-v2.agent.md` was NOT updated (it still matches the old hash). The INTEGRITY_INDEX.md Update Protocol states: "All agent contract edits in `.github/agents/` MUST include a matching update to the reference copy and this index in the **same PR**."

**Remediation**: In this same PR:
1. Update `governance/quality/agent-integrity/INTEGRITY_INDEX.md` — change the SHA256 for `governance-repo-administrator-v2.agent.md` from `ebeb821af69e9f7fcb9d0d2367bae6b736b965d014099a77b4d789194cb7fec7` to `ebb8ce29deea054ee98386850764ae7c89ae5ea20fbbdeac1ee0cae494b60254`. Update the `Last Updated` date to 2026-04-05 and the `Updated By` field referencing this PR.
2. Overwrite (or update) the reference copy at `governance/quality/agent-integrity/governance-repo-administrator-v2.agent.md` to match the updated `.github/agents/governance-repo-administrator-v2.agent.md`.

Note: Per OVL-AI-001, modifications to `governance/quality/agent-integrity/` are CS2-only. Confirm CS2 authorization covers this update (CS2 issue #1319 authorized the GA contract change — this integrity index update is the required corollary).

---

### F3 — SCOPE_DECLARATION.md Stale (A-026 / A-028)

**Finding**: `SCOPE_DECLARATION.md` reflects a different PR (`copilot/fix-duplicate-layer-down-issues-again`, dated 2026-03-06). The current diff contains 8 files that are entirely absent from SCOPE_DECLARATION.md. Per A-026, SCOPE_DECLARATION.md must exactly match the current PR diff. Per A-028, prior-PR entries must be trimmed.

Current diff (8 files):
- `.agent-admin/prehandover/prehandover_proof_1319_20260405.md`
- `.agent-workspace/governance-repo-administrator/knowledge/FAIL-ONLY-ONCE.md`
- `.github/agents/governance-repo-administrator-v2.agent.md`
- `governance/CANON_INVENTORY.json`
- `governance/CHANGELOG.md`
- `governance/canon/GOVERNANCE_CANON_MANIFEST.md`
- `governance/canon/IAA_PRE_BRIEF_PROTOCOL.md`
- `governance/canon/PRE_BUILD_STAGE_MODEL_CANON.md`

(Plus any new files added during remediation, e.g., session memory, integrity index update, correction addendum.)

**Remediation**: Regenerate `SCOPE_DECLARATION.md` from `git diff --name-only origin/main...HEAD` (or equivalent for the shallow clone). Use plain list format (`- path/to/file`). Remove all prior-PR entries. Update PR_ID to `copilot/canonise-pre-build-stage-model` and DATE_UTC to the current date.

---

### F4 — Agent File Drift Evidence Missing (OVL-AC-011)

**Finding**: PREHANDOVER proof §3.4 describes the changes made to `governance-repo-administrator-v2.agent.md` but does not include before/after SHA256 hashes or character counts. OVL-AC-011 requires: "PREHANDOVER must include before/after character count for every modified agent contract file. If SHA256 hash comparison is available, before/after hashes must also be stated."

**Remediation**: Add to PREHANDOVER proof §3.4 (or to a correction addendum):
```
Agent File Drift Evidence — governance-repo-administrator-v2.agent.md:
  Prior hash (INTEGRITY_INDEX.md baseline): ebeb821af69e9f7fcb9d0d2367bae6b736b965d014099a77b4d789194cb7fec7
  New hash (current branch):                ebb8ce29deea054ee98386850764ae7c89ae5ea20fbbdeac1ee0cae494b60254
  Change scope: +17 lines added (Step 4.5.0 pre-IAA commit check block) +1 line modified (authority reference v1.1.0→v1.2.0, Rules A-10, B-07 added) +1 line modified (Canonical References IAA_PRE_BRIEF_PROTOCOL.md v1.1.0→v1.2.0)
```
Under §4.3b immutability, this must go into a Correction Addendum (`.agent-admin/assurance/correction-addendum-1319-r1-20260405.md`) rather than modifying the committed PREHANDOVER proof.

---

### F5 — Cross-Agent Ripple Assessment Absent for Agent Contract (OVL-AC-012)

**Finding**: The PREHANDOVER proof Phase 2 Ripple Assessment covers the two canon files (PRE_BUILD_STAGE_MODEL_CANON.md and IAA_PRE_BRIEF_PROTOCOL.md). However, there is no OVL-AC-012 cross-agent ripple assessment for the GA contract modification. OVL-AC-012 requires: "If the agent contract change triggers governance ripple requirements for other agents (e.g., shared Tier 2 references, cascading policy updates), PREHANDOVER proof must list all affected agents and whether ripple has been initiated or flagged. 'No ripple required' is acceptable only when explicitly stated with justification."

**Remediation**: Add to the Correction Addendum (per A-030 / F4 remediation path):
```
OVL-AC-012 Cross-Agent Ripple Assessment — governance-repo-administrator-v2.agent.md:
  Changes made: Added Step 4.5.0 pre-IAA commit state check (OVF-002); updated IAA_PRE_BRIEF_PROTOCOL.md reference v1.1.0→v1.2.0
  Affected agents:
    - foreman-v2.agent.md: NOT affected — Step 4.5.0 is GA-specific (GA != Foreman); no shared Tier 2 references changed
    - CodexAdvisor-agent.md: NOT affected — CodexAdvisor does not reference GA Phase 4.5 steps
    - independent-assurance-agent.md: NOT affected — this change applies to pre-IAA invocation steps within GA; IAA contract unchanged
  No ripple required for agent contracts. The IAA_PRE_BRIEF_PROTOCOL.md v1.2.0 update (PUBLIC_API) is separately handled by the canon ripple dispatch workflow.
```

---

### F6 — Version History Table Absent in GRA FAIL-ONLY-ONCE (OVL-KG-003)

**Finding**: `.agent-workspace/governance-repo-administrator/knowledge/FAIL-ONLY-ONCE.md` was updated from v1.0.0 to v1.1.0 in this PR, but the file has no `## Version History` table. OVL-KG-003 requires: "Every modified Tier 2 knowledge file's version history table includes an entry for the new version with date and change description."

**Remediation**: Add a version history section to the GRA FAIL-ONLY-ONCE.md file:
```markdown
## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-02-24 | Initial creation |
| 1.1.0 | 2026-04-05 | Added Rule A-10 (Pre-IAA Commit State), Rule B-07 (Pre-IAA State Check), OVF-002 breach log entry per CS2 directive (issue #1319) |
```

---

### F7 — GRA Knowledge Index Not Updated (OVL-KG-004)

**Finding**: `.agent-workspace/governance-repo-administrator/knowledge/index.md` (v1.2.0, last updated 2026-03-21) was NOT updated in this PR. It still shows:
- `FAIL-ONLY-ONCE.md` version: `1.0.0` (actual in this PR: `1.1.0`)
- Tier-3 Canon References: `governance/canon/IAA_PRE_BRIEF_PROTOCOL.md` v1.1.0 (actual in this PR: v1.2.0)

OVL-KG-004 requires: "The agent's `knowledge/index.md` reflects updated file versions and new rules or categories introduced."

**Remediation**: Update `index.md`:
1. Change `FAIL-ONLY-ONCE.md` row version from `1.0.0` to `1.1.0`
2. Update Tier-3 Canon References: `IAA_PRE_BRIEF_PROTOCOL.md` v1.1.0 → v1.2.0
3. Bump Index Version to `1.3.0` and update `Last Updated` to `2026-04-05`
4. Add version history row: `| 1.3.0 | 2026-04-05 | FAIL-ONLY-ONCE.md bumped to v1.1.0; IAA_PRE_BRIEF_PROTOCOL.md Tier-3 reference updated to v1.2.0 (OVF-002, CS2 issue #1319) |`

---

## Re-entry Instructions

**Re-entry Point**: Phase 3, Step 3.4 — Working Phase Proof Review

**Before Re-invoking IAA**:
1. Remediate all 7 findings (F1–F7)
2. Commit all changes atomically: session memory + SCOPE_DECLARATION.md update + integrity index + reference copy + Correction Addendum + GRA FAIL-ONLY-ONCE version history + GRA knowledge index update
3. Create a Correction Addendum at `.agent-admin/assurance/correction-addendum-1319-r1-20260405.md` per A-030, documenting: (a) this REJECTION-PACKAGE session reference (IAA-20260405-PR1319), (b) each remediation item and how it was addressed, (c) the new session number being requested
4. Verify `git status` is clean before re-invocation (A-10, B-07)
5. Re-invoke IAA via the independent-assurance-agent tool

**Acknowledgement Required**: copilot-swe-agent[bot] (governance-repo-administrator-v2) must acknowledge receipt of this REJECTION-PACKAGE before resubmission.

---

## Positive Assessment (Substance)

The core governance content is substantively correct:
- `PRE_BUILD_STAGE_MODEL_CANON.md` v1.0.0 is well-structured, CS2-authorized, and addresses documented recurring failure patterns with appropriate stage definitions
- `IAA_PRE_BRIEF_PROTOCOL.md` v1.2.0 §Applicability Scope is a proper, CS2-directed clarification of the Wave Checklist Gate scope with appropriate constraints
- The GRA FAIL-ONLY-ONCE v1.1.0 updates correctly codify the OVF-002 pre-IAA commit state requirement
- The GA contract Phase 4.5.0 addition is targeted, correct, and implements the OVF-002 governance learning
- SHA256 hashes for new CANON_INVENTORY entries are real and verified

The remediation items are entirely process/ceremony gaps — not substantive content failures. All 7 items are straightforward to resolve.

---

*Authority: CS2 (Johan Ras) | IAA Session: IAA-20260405-PR1319 | Date: 2026-04-05*
