# Working Proof — PR #1273 — [Governance] Upgrade foreman quality protocol: builder referral & progress tracker enforcement

**Agent**: governance-repo-administrator v2.0.0
**Session**: GA-20260302-QP-UPGRADE
**Date**: 2026-03-02
**Issue**: [Governance] Upgrade foreman quality protocol: builder referral & progress tracker enforcement (GitHub issue in APGI-cmy/maturion-foreman-governance)
**PR**: APGI-cmy/maturion-foreman-governance#1273
**Branch**: copilot/upgrade-quality-protocol

---

## Problem Statement

The foreman-v2 Quality Professor mode (Mode 3, Section 1.7 of foreman-v2.agent.md) issues remediation orders on FAIL but does not:
1. Create formal, trackable **Builder Referral Artifacts** that can be indexed, monitored, and formally closed
2. Enforce that **Progress Trackers** are current with delivered builds before the merge gate is released

This creates governance gaps:
- Rejections are not traceable to closure
- Progress trackers may drift from execution state without FM intervention

---

## Solution Implemented

### Files Created

#### 1. `governance/canon/FM_QUALITY_PROTOCOL_ENHANCED_SOP.md` (NEW v1.0.0)

**Purpose**: Tier-3 governance SOP for enhanced Quality Protocol

**Key Sections**:
- Section 3 — Builder Referral Protocol:
  - 7 failure condition codes (QP-FAIL-001 through QP-FAIL-007)
  - Formal `builder-referral-<date>-<builder-id>-<issue-ref>.md` artifact template
  - `REFERRAL_INDEX.md` for open-referral tracking
  - Closure protocol: referral closed when PASS verdict received on re-submission
  - Partial remediation rule: not accepted; new referral issued if re-submission still FAILs
- Section 4 — Progress Tracker Enforcement:
  - QP-FAIL-007: mandatory gate for tracker currency
  - Conditions for when tracker check is required
  - What must be verified in the tracker
- Appendices A and B: quick-reference flow diagrams
- layer_down_status: PUBLIC_API

#### 2. `.agent-workspace/foreman-v2/knowledge/FM_QP_ENHANCED_QUICK_REFERENCE.md` (NEW v1.0.0)

**Purpose**: Tier 2 operational quick reference for foreman-v2 agents
**Content**: Summarises QP-FAIL codes, artifact locations, steps on FAIL/PASS, tracker enforcement

### Files Updated

#### 3. `.agent-workspace/foreman-v2/knowledge/index.md` (UPDATED)

Added row: `FM_QP_ENHANCED_QUICK_REFERENCE.md | ... | 1.0.0`

#### 4. `governance/CANON_INVENTORY.json` (UPDATED)

New entry for `FM_QUALITY_PROTOCOL_ENHANCED_SOP.md`:
- file_hash: `8f39db0e33ac1d7523b9b21bae6a79ca03b9e3f8a7294ce0c5a1c7d18e15c54a`
- type: canon
- layer_down_status: PUBLIC_API
- total_canons: 189 → 190

#### 5. `GOVERNANCE_ARTIFACT_INVENTORY.md` (UPDATED)

New row for `FM_QUALITY_PROTOCOL_ENHANCED_SOP.md` with full description.

#### 6. `governance/CHANGELOG.md` (UPDATED)

New entry `[FM-QP-ENHANCED-SOP-2026-03-02] - 2026-03-02 - NON_BREAKING_ENHANCEMENT`.

---

## Alternatives Considered

| Alternative | Rationale for Not Choosing |
|-------------|---------------------------|
| Modify foreman-v2.agent.md directly | Issue explicitly requires preserving agent contract immutability |
| Create under governance/quality/ instead of governance/canon/ | Layer-down propagation requires PUBLIC_API status in canon; governance/quality/ does not trigger ripple |
| Add QP-FAIL-007 to existing FM_PREAUTH_CHECKLIST_CANON.md | That checklist governs pre-work checks, not Quality Professor mode; wrong authority source |

---

## Risks and Follow-Up

| Risk | Mitigation |
|------|-----------|
| Consumer repos may not immediately amend local QP checklists | layer_down_status: PUBLIC_API ensures governance liaisons are notified via layer-down ripple |
| Foreman agents may not load new Tier 2 knowledge | Tier 2 knowledge index updated; foreman-v2 knowledge/index.md updated; induction protocol requires loading all indexed Tier 2 docs |
| SHA256 hash will need updating if SOP file is amended | Standard process: amend CANON_INVENTORY.json when file is modified |

---

*Authority: LIVING_AGENT_SYSTEM.md v6.2.0 | Session GA-20260302-QP-UPGRADE | 2026-03-02*
