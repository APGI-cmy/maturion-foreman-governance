# Working Proof — PR #1281 — [Governance] Reduce foreman-v2-agent.md contract file size

**Agent**: GitHub Copilot (acting on CodexAdvisor-agent workflow — AGCFPP-001 mandate)
**Session**: copilot-20260302-1281
**Date**: 2026-03-02
**Issue**: APGI-cmy/maturion-foreman-governance#1280
**PR**: APGI-cmy/maturion-foreman-governance#1281
**Branch**: copilot/reduce-contract-file-size

---

## Issue Traceability

**Root Cause** (from issue #1280): `foreman-v2.agent.md` at 48,583 chars exceeded GitHub Copilot's 30,000-char MCP bootstrap limit, causing silent failure and governance ceremony bypass.

**Acceptance Criteria Traceability**:

| Criterion | Status | Evidence |
|-----------|--------|---------|
| File under 30,000 chars | ✅ PASS | 18,601 chars (SHA256: e180c3e5) |
| IAA ceremony steps (4.3a, 4.3b, 4.4) present | ✅ PASS | Lines 252-296 in reduced contract |
| HALT conditions intact | ✅ PASS | HALT-001–007 in YAML escalation block |
| Prohibitions intact | ✅ PASS | SELF-MOD-FM-001, NO-IMPLEMENT-001, etc. in YAML |
| Tier 2 knowledge files created | ✅ PASS | phase2-induction-script.md, phase3-qp-template.md, phase4-handover-template.md |
| Agent loadable by MCP bootstrap | ✅ PASS | npm test confirms readable (18,601 bytes < 30,000) |
| Layer-down ripple to maturion-isms | ⏳ POST-MERGE | Governance proof documents ripple requirement |

---

## Design Decisions

### Decision 1: Extract bash scripts to Tier 2 rather than remove
**Rationale**: The bash scripts are governance artifacts and operational references. Removing them entirely would be a governance violation. Moving them to Tier 2 knowledge files preserves them while keeping the contract within platform limits.
**Alternative considered**: Truncation / removal of sections. Rejected — would violate FAIL-ONLY-ONCE rule A-06 (weakening governance).

### Decision 2: Add iaa_oversight, structured HALT conditions, structured prohibitions
**Rationale**: The original contract used flat string lists for HALT conditions and prohibitions. The YAML block standard for newer contracts (CodexAdvisor, governance-repo-administrator) uses structured objects with id/trigger/action fields. This aligns foreman-v2 with the canonical pattern.
**Source**: CodexAdvisor-agent.md and governance-repo-administrator-v2.agent.md structural precedent.

### Decision 3: Add Phase 4 Steps 4.3a and 4.3b explicitly
**Rationale**: These steps were absent from the original contract. The issue (#1280) explicitly required them. They are now MANDATORY — BLOCKING per AGCFPP-001.

### Decision 4: Lean contract body per CS2 Phase 2 instruction
**Rationale**: CS2 PR comment (17:32:02Z) identified residual verbosity after initial reduction. Sections 1.2, 1.5-1.7, 2.5.1-2.5.6, and 3.0 replaced with single-line canon/Tier 2 references. Target: ≤300-400 lines. Result: 431 lines.

### Decision 5: id: foreman → id: foreman-v2-agent
**Rationale**: CS2 explicitly required this change in the blocking gap list ("change id: foreman → id: foreman-v2-agent in the YAML frontmatter to match canonical naming").

---

## Delivery Summary

**Files Modified**:
- `.github/agents/foreman-v2.agent.md`: 48,583 → 18,601 chars; added iaa_oversight YAML, HALT-001–007, structured prohibitions with IDs, Phase 4 Steps 4.3a/4.3b/4.4; id changed to foreman-v2-agent; lean body per CS2 structural requirements
- `governance/quality/agent-integrity/INTEGRITY_INDEX.md`: SHA256 hash updated to e180c3e5
- `governance/quality/agent-integrity/foreman-v2.agent.md`: reference copy updated

**Files Created**:
- `.agent-workspace/foreman-v2/knowledge/phase2-induction-script.md`: Wake-Up Protocol and Pre-Build Reality Check bash scripts extracted from contract
- `.agent-workspace/foreman-v2/knowledge/phase3-qp-template.md`: Verb Classification Gate, Quality Professor evaluation, Phase 3 orchestration bash scripts
- `.agent-workspace/foreman-v2/knowledge/phase4-handover-template.md`: All Phase 4 handover scripts, IAA audit output format, PREHANDOVER Token ceremony sequence
- `.agent-workspace/foreman-v2/knowledge/index.md`: Updated with 3 new Tier 2 entries

---

## Risks

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Agent does not find Tier 2 files at runtime | Low | tier2_knowledge YAML block with index path; files committed |
| maturion-isms consumer copy still oversized | Medium | Ripple required post-merge (documented in acceptance criteria) |
| id change breaks existing agent references | Low | agent-ids.js uses filename (`foreman-v2.agent`) not id field |

---

**Authority**: LIVING_AGENT_SYSTEM.md v6.2.0 | AGCFPP-001
