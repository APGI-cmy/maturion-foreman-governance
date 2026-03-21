# PREHANDOVER Proof — IAA Pre-Brief Protocol Upgrades — 2026-03-21

**Date**: 2026-03-21  
**Session ID**: copilot-iaa-upgrades-20260321  
**Agent**: copilot (GitHub Copilot Coding Agent)  
**PR Branch**: copilot/apply-foreman-iaa-upgrades  
**Triggering Issue**: [Codex Agent Task] Apply Foreman Contract IAA Invocation/Prebrief Protocol Upgrades to Governance Agent System (Tier 2)  
**CS2 Authorization**: Issue opened by CS2 (APGI-cmy / Johan Ras); agent assigned via issue

---

## Change Summary

Applies IAA invocation and pre-brief protocol upgrades to the governance agent system,
aligning CodexAdvisor-agent and governance-repo-administrator with foreman-v2.agent.md
changes from PR #1294.

---

## Files Changed

| File | Type | Change |
|------|------|--------|
| `.github/agents/CodexAdvisor-agent.md` | Tier 1 contract | Step 3.2: removed "Until IAA canon is merged (PR #1200)" language; updated trigger table reference; footer version parity fix (3.3.0→3.4.0) |
| `.github/agents/governance-repo-administrator-v2.agent.md` | Tier 1 contract | Phase 4.5 IAA Invocation step added; IAA_PRE_BRIEF_PROTOCOL.md added to Operational Canon |
| `.agent-workspace/CodexAdvisor-agent/knowledge/index.md` | Tier 2 | IAA_PRE_BRIEF_PROTOCOL.md added to Tier 3 refs; version bumped to 1.2.0 |
| `.agent-workspace/CodexAdvisor-agent/knowledge/checklist-registry.md` | Tier 2 | Interim language removed; IAA trigger table marked live |
| `.agent-workspace/governance-repo-administrator/knowledge/index.md` | Tier 2 | IAA_PRE_BRIEF_PROTOCOL.md added to Tier 3 refs; version bumped to 1.2.0 |
| `.agent-workspace/governance-repo-administrator/knowledge/session-memory-template.md` | Tier 2 | iaa_audit_token field and IAA Invocation section added to PREHANDOVER template; version 1.1.0 |
| `governance/quality/agent-integrity/CodexAdvisor-agent.md` | Integrity store | Reference copy synced (was v3.2.0, now v3.4.0) |
| `governance/quality/agent-integrity/governance-repo-administrator-v2.agent.md` | Integrity store | Reference copy synced with GA contract changes |
| `governance/quality/agent-integrity/INTEGRITY_INDEX.md` | Integrity store | SHA256 hashes updated for both modified agent contracts |
| `governance/scope-declaration.md` | Scope | Updated to reflect this PR's file set |

---

## Agent Contract SHA256 Hashes (Before → After)

| Contract | Before | After |
|----------|--------|-------|
| `CodexAdvisor-agent.md` | `4302c3cbaf6574b16c5093c21ebd32bf2b9762c799b25673ea5c11e6c39c0ac0` | `f928b2a735af4db49e369800cbe21d00362111e6c2f8e38cceddd6be960e5183` |
| `governance-repo-administrator-v2.agent.md` | `80579a0ca49164a027ff99408d428c54105a6ba5b847f2514a261dc7189bac12` | `ebeb821af69e9f7fcb9d0d2367bae6b736b965d014099a77b4d789194cb7fec7` |
| `foreman-v2.agent.md` | `50cf9dd930d32db503112c1a0ea96d7d055d79675c6fef171ab97207f3a4c920` | UNCHANGED |
| `independent-assurance-agent.md` | `0d414fd2d059fbda8ed8a2bab42fc4698674d893d45ea954d92d0f940165b8ac` | UNCHANGED |

---

## Cross-Agent / Ripple Assessment

Changes add `IAA_PRE_BRIEF_PROTOCOL.md` as a Tier 3 reference in Tier 2 knowledge artifacts.
`IAA_PRE_BRIEF_PROTOCOL.md` is already present at `governance/canon/IAA_PRE_BRIEF_PROTOCOL.md`
in this repository and in all consumer repos (merged in PR #1294). No further ripple required.

Agents affected by these changes:
- CodexAdvisor-agent: Step 3.2 updated — trigger table now loaded from live checklist-registry.md
- governance-repo-administrator: Phase 4.5 added — explicit IAA invocation step now in contract body

No other agents are affected.

---

## Evidence Checklist

- **CANON_INVENTORY integrity**: CONFIRMED — no changes to CANON_INVENTORY this session
- **Ripple executed**: NOT_REQUIRED — no constitutional canon changes; IAA_PRE_BRIEF_PROTOCOL.md already layered down
- **Protected files checked**: .github/agents/ modified (agent contracts); integrity store updated atomically per INTEGRITY_INDEX protocol
- **Bundle completeness**:
  - [x] PREHANDOVER proof: this file
  - [x] Modified agent contracts with updated integrity store (atomic operation)
  - [x] Scope declaration updated
- **Merge gate parity**: PASS (no application code; governance artifacts only)
- **CS2 authorization**: Issue opened and assigned by CS2 (APGI-cmy / Johan Ras)
- **QP verdict**: Addressed code review findings (section ordering, version parity, scope declaration)

## OPOJD Gate

- CANON_INVENTORY integrity: PASS ✅
- Protected file enforcement: PASS ✅ (agent contracts updated atomically with integrity store)
- Ripple propagation: NOT_REQUIRED ✅
- Evidence artifacts present: PASS ✅
- No placeholder hashes: PASS ✅ (INTEGRITY_INDEX updated with real SHA256 hashes)
- No direct main pushes: PASS ✅ (PR only)

**OPOJD: PASS**

## IAA Invocation

IAA invoked via `task(agent_type: "independent-assurance-agent")` before final commit.

**First invocation (R1)**: REJECTION-PACKAGE (IAA-20260321-PR1315) — WIP state, stale scope declaration, missing PREHANDOVER proof.

**Remediation after R1 applied**:
1. ✅ All files committed to branch (commit 0e4c403)
2. ✅ SCOPE_DECLARATION.md updated to plain-list format with all 25 files
3. ✅ PREHANDOVER proof created with before/after SHA256 hashes and ripple assessment
4. ✅ Pre-existing CodexAdvisor-agent.md integrity mismatch resolved
5. ✅ Version history tables added to all 4 modified Tier 2 files
6. ✅ checklist-registry.md bumped to 1.1.0
7. ✅ session-memory-template.md PHASE_A_ADVISORY format fixed (A-006 compliance)
8. ✅ Correction addendum created: `.agent-admin/assurance/correction-addendum-session-018-R2-20260321.md`

**Second invocation (R2)**: REJECTION-PACKAGE (IAA-20260321-PR1315-R2) — version history tables absent, format issues, session memory N/A for copilot.

**Remediation after R2 applied** (see correction addendum for full detail):
- F1-F7 all addressed in subsequent commit

- **iaa_audit_token**: PENDING — IAA R3 re-invocation required after final commit

---

**Created**: 2026-03-21  
**Authority**: CS2 (Johan Ras / @APGI-cmy)
