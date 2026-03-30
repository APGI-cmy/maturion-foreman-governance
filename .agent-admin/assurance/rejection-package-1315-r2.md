# REJECTION-PACKAGE — IAA Session IAA-20260321-PR1315-R2

```
REJECTION-PACKAGE
PR: #1315 (Re-invocation R2)
Date: 2026-03-21
IAA Session: IAA-20260321-PR1315-R2
Phases:
  Phase 1 (Preflight): PASS
  Phase 2 (Governance/Classification): PASS — AGENT_CONTRACT + KNOWLEDGE_GOVERNANCE + AGENT_INTEGRITY; independence confirmed; Wave Checklist gate N/A (no waves directory; carve-out applied consistent with sessions 016-018)
  Phase 3 (Working): FAIL — A-030 (Correction Addendum missing for re-invocation), CORE-015/OVL-AC-007/OVL-KG-001 (session memory absent; prior remediation item 4 unresolved), A-026 (9 undeclared files in SCOPE_DECLARATION.md), A-028 (SCOPE_DECLARATION.md format non-compliant — code block not plain list), OVL-KG-002 (checklist-registry.md version not bumped), OVL-KG-003 (version history tables absent in all 4 modified Tier 2 files), A-006 pattern (session-memory-template introduces prohibited bare PHASE_A_ADVISORY — YYYY-MM-DD format as iaa_audit_token template option)
  Phase 4 (Handover): FAIL — INV-408 (session memory path absent from PREHANDOVER proof; session memory artifact absent)
Agent Integrity: PASS — all 4 agent contract SHA256 hashes match INTEGRITY_INDEX; reference copies match live files (zero-diff verified); pre-existing CodexAdvisor mismatch (ESC-018) resolved by this PR
Independence: CONFIRMED — CodexAdvisor-agent/copilot-swe-agent[bot] vs independent-assurance-agent — no conflict
Verdict: MERGE BLOCKED
```

---

## What Was Verified (PASS)

Before stating failures, IAA records what this PR does correctly:

- ✅ All 9 primary deliverable files committed to branch (commit 0e4c403) — prior Finding 1 resolved
- ✅ PREHANDOVER proof created at `.agent-admin/prehandover/prehandover_proof_iaa_upgrades_20260321.md` with substantive content (specific SHA256 hashes, named files, CS2 issue reference, explicit ripple rationale)
- ✅ `iaa_audit_token: PENDING` present in PREHANDOVER proof — valid ceremony state
- ✅ CS2 authorization confirmed — Issue #1314 opened by APGI-cmy (Johan Ras)
- ✅ Before/after SHA256 hashes for both modified agent contracts verified against live files — MATCH
- ✅ Reference copies match live agent contract files (zero-difference on diff comparison)
- ✅ Pre-existing CodexAdvisor integrity mismatch (ESC-018) resolved — INTEGRITY_INDEX now shows correct hash f928b2a...
- ✅ CodexAdvisor-agent.md: Step 3.2 update correct and substantively sound
- ✅ GA Phase 4.5 IAA Invocation step: substantively correct; mandatory pre-PR IAA invocation clearly stated
- ✅ CANON_INVENTORY confirms IAA_PRE_BRIEF_PROTOCOL.md v1.1.0 is live
- ✅ Agent integrity check: PASS — all 4 SHA256 hashes verified
- ✅ Ripple assessment: valid — IAA_PRE_BRIEF_PROTOCOL.md already layered via PR #1294
- ✅ CodexAdvisor contract version parity fix (3.3.0 → 3.4.0): correct

---

## Remediation Required

### F1 — A-030 FAIL: Correction Addendum missing (BLOCKING)

**Rule**: FAIL-ONLY-ONCE A-030 — on re-invocation after REJECTION-PACKAGE with immutable PREHANDOVER proof, a dedicated Correction Addendum file is required.  
**Evidence**: No file matching `.agent-admin/assurance/correction-addendum-*.md` found in diff. The PREHANDOVER proof does contain a remediation summary paragraph, but A-030 requires a *dedicated file* at the specified path.  
**Remediation**: Create `.agent-admin/assurance/correction-addendum-session-018-R2-20260321.md` containing:
  (a) Prior rejection reference: `IAA-20260321-PR1315`
  (b) Per-finding account of changes made addressing each rejection item (items 1-6)
  (c) New session being requested: `IAA-20260321-PR1315-R2`

---

### F2 — CORE-015 / OVL-AC-007 / OVL-KG-001 FAIL: Session memory absent (BLOCKING)

**Rule**: CORE-015, OVL-AC-007, OVL-KG-001, A-015 — session memory artifact required in all triggered PR bundles; no content-type or agent-class exemption exists in canon.  
**Evidence**: No session memory artifact from submitting agent in PR bundle. PREHANDOVER proof does not reference a session memory path. "N/A for copilot agent" claim has no canon basis — FAIL-ONLY-ONCE registry has no copilot exemption. Prior REJECTION-PACKAGE IAA-20260321-PR1315 explicitly required session memory as remediation item 4; item remains unresolved.  
**Remediation**: Create session memory artifact (e.g., `.agent-workspace/CodexAdvisor-agent/memory/session-iaa-upgrades-20260321.md` or equivalent). Required content: session/task context, changes made and rationale, CS2 authorization reference, learning notes (≥1 concrete improvement). Reference the path in the PREHANDOVER proof. **Note for CS2**: if copilot as a non-resident agent is to be categorically exempt from session memory, this exemption must be established in canon or FAIL-ONLY-ONCE. IAA cannot grant it unilaterally.

---

### F3 — A-026 FAIL: SCOPE_DECLARATION.md has 9 undeclared files (BLOCKING)

**Rule**: FAIL-ONLY-ONCE A-026 — must exactly match `git diff --name-only origin/main...HEAD`.  
**Evidence**: Diff has 19 files; SCOPE_DECLARATION.md declares 10. Nine undeclared:
1. `.agent-admin/assurance/rejection-package-1315.md`
2. `.agent-admin/prehandover/prehandover_proof_iaa_upgrades_20260321.md`
3. `.agent-workspace/independent-assurance-agent/escalation-inbox/ESC-018-20260321-integrity-codexadvisor.md`
4. `.agent-workspace/independent-assurance-agent/memory/.archive/session-006-20260302.md`
5. `.agent-workspace/independent-assurance-agent/memory/.archive/session-011-20260303.md`
6. `.agent-workspace/independent-assurance-agent/memory/.archive/session-012-20260306.md`
7. `.agent-workspace/independent-assurance-agent/memory/.archive/session-013-20260306.md`
8. `.agent-workspace/independent-assurance-agent/memory/session-005-20260302.md`
9. `.agent-workspace/independent-assurance-agent/memory/session-018-20260321.md`

**Remediation**: Regenerate `governance/scope-declaration.md` file list from `git diff --name-only origin/main...HEAD` immediately before re-invocation. All 19 files (including IAA artifacts) must be declared. A-026 has no IAA-artifact carve-out.

---

### F4 — A-028 FAIL: SCOPE_DECLARATION.md format non-compliant (BLOCKING)

**Rule**: FAIL-ONLY-ONCE A-028 — plain markdown list `- path/to/file` per line required; no tables, sections, code blocks, or commentary.  
**Evidence**: `governance/scope-declaration.md` uses a multi-section YAML code block (``` delimited) with headers (`## FILES_CHANGED`, `## Scope Boundaries`, etc.). Format is non-compliant.  
**Remediation**: Replace the `FILES_CHANGED` code block with a plain markdown list. Each file on its own line as `- path/to/file`, covering all 19 files in the current diff.

---

### F5 — OVL-KG-002 FAIL: checklist-registry.md version not bumped (BLOCKING)

**Rule**: OVL-KG-002 — every modified Tier 2 knowledge file must have version incremented.  
**Evidence**: `checklist-registry.md` modified (removed interim language; updated trigger table description). Version header remains `**Version**: 1.0.0` — unchanged.  
**Remediation**: Bump `checklist-registry.md` version to `1.1.0` and add version history entry (see F6 below).

---

### F6 — OVL-KG-003 FAIL: Version history tables absent in all 4 modified Tier 2 files (BLOCKING)

**Rule**: OVL-KG-003 — every modified Tier 2 knowledge file must have version history table with entry for new version, date, and change description.  
**Evidence**: No version history tables in any of the 4 modified files:
  - `checklist-registry.md` (no table; version 1.0.0 → 1.1.0 needed)
  - `CodexAdvisor-agent/knowledge/index.md` (no table; version 1.1.0 → 1.2.0)
  - `governance-repo-administrator/knowledge/index.md` (no table; version 1.1.0 → 1.2.0)
  - `governance-repo-administrator/knowledge/session-memory-template.md` (no table; version 1.0.0 → 1.1.0)

**Remediation**: Add `## Version History` table to each file with format `| Version | Date | Change |`. Entry for new version: date `2026-03-21`, brief change description. Example:
```
## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-02-26 | Initial seeding |
| 1.1.0 | 2026-03-21 | Removed interim IAA canon language; updated trigger table description |
```

---

### F7 — A-006 pattern risk: session-memory-template.md promotes prohibited bare PHASE_A_ADVISORY format (BLOCKING)

**Rule**: FAIL-ONLY-ONCE A-006, A-020 — `PHASE_A_ADVISORY — YYYY-MM-DD` (bare date, no session reference) is the prohibited fabrication format; prohibited format must not be codified in governance templates.  
**Evidence**: New `iaa_audit_token` template line reads `[IAA-session-NNN-YYYYMMDD-PASS / PHASE_A_ADVISORY — YYYY-MM-DD / NOT_REQUIRED]`. Option `PHASE_A_ADVISORY — YYYY-MM-DD` is exactly the A-006 prohibited format. When GA follows this template, it will produce values that trigger REJECTION-PACKAGE under A-006 in future sessions.  
**Remediation**: Replace template option. Options:
  (a) `PHASE_A_ADVISORY — IAA-session-NNN-YYYYMMDD` (require session reference in the format)
  (b) Add a note: `# Note: PHASE_A_ADVISORY must be issued by IAA with session reference — bare PHASE_A_ADVISORY — YYYY-MM-DD format prohibited per FAIL-ONLY-ONCE A-006`

---

## Advisory (Not Standalone Rejection Findings — Future Action)

- **GA contract `secret:` field (pre-existing)**: `governance-repo-administrator-v2.agent.md` line 33 has `secret: MATURION_BOT_TOKEN` (should be `secret_env_var:` per CORE-022 / A-024). Pre-existing, not in this PR's diff. This PR modifies the GA contract without fixing it. Recommend CS2 directs a follow-up fix PR.

---

## Summary Table

| # | Rule | Severity | Status |
|---|------|----------|--------|
| F1 | A-030 — Correction Addendum missing | BLOCKING | NOT RESOLVED |
| F2 | CORE-015/OVL-AC-007/OVL-KG-001 — Session memory absent | BLOCKING | NOT RESOLVED |
| F3 | A-026 — SCOPE_DECLARATION.md 9 undeclared files | BLOCKING | NOT RESOLVED |
| F4 | A-028 — SCOPE_DECLARATION.md format non-compliant | BLOCKING | NOT RESOLVED |
| F5 | OVL-KG-002 — checklist-registry.md version not bumped | BLOCKING | NOT RESOLVED |
| F6 | OVL-KG-003 — Version history tables absent (4 files) | BLOCKING | NOT RESOLVED |
| F7 | A-006 pattern — template promotes prohibited bare PHASE_A_ADVISORY format | BLOCKING | NOT RESOLVED |

**Re-entry Point**: Phase 3 — Step 3.4 — Working Phase Proof Review  
**Routed To**: CodexAdvisor-agent (copilot-swe-agent[bot]) — acknowledgement required before resubmission

---

*IAA Session: IAA-20260321-PR1315-R2 | Authority: CS2 (Johan Ras / @APGI-cmy)*  
*Created: 2026-03-21 | Independence confirmed: YES*
