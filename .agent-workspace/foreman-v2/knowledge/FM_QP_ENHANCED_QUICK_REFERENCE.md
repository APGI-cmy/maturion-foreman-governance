# FM Enhanced Quality Protocol — Tier 2 Quick Reference

**Purpose**: Operational quick reference for foreman-v2 agents implementing the enhanced Quality Protocol (QP)
**Version**: 1.0.0
**Effective Date**: 2026-03-02
**Authority**: `governance/canon/FM_QUALITY_PROTOCOL_ENHANCED_SOP.md` v1.0.0
**Tier**: 2 (Operational Domain Knowledge)

---

## What This Document Is

This is the Tier 2 operational quick reference that foreman-v2 MUST load during session induction when a Quality Professor session is anticipated. It summarises the key procedures from the canonical SOP.

**Read the canonical SOP for full authority**: `governance/canon/FM_QUALITY_PROTOCOL_ENHANCED_SOP.md`

---

## Key Additions to Quality Professor Mode (Mode 3)

The foreman-v2 agent contract (Section 1.7) defines Quality Professor mode. This SOP adds two mandatory enhancements:

1. **Formal Builder Referral** — Every FAIL produces a trackable artifact; referrals are indexed
2. **Progress Tracker Enforcement** — Tracker currency is a QP gate requirement (QP-FAIL-007)

---

## Builder Referral — At a Glance

### When to Issue a Referral
Issue a Builder Referral for ANY Quality Professor FAIL condition:

| Code | Condition |
|------|-----------|
| QP-FAIL-001 | QA not 100% GREEN |
| QP-FAIL-002 | Test debt detected |
| QP-FAIL-003 | Evidence artifacts missing |
| QP-FAIL-004 | Architecture alignment gap |
| QP-FAIL-005 | Scope violation |
| QP-FAIL-006 | Zero-tolerance finding unresolved |
| QP-FAIL-007 | Progress tracker not updated |

### Artifact Location
```
.agent-admin/quality-professor/builder-referral-<YYYYMMDD>-<builder-id>-<issue-ref>.md
.agent-admin/quality-professor/REFERRAL_INDEX.md
```

### Steps on FAIL
1. Create `qp-verdict-<TIMESTAMP>.md` (as usual)
2. Create `builder-referral-<YYYYMMDD>-<builder-id>-<issue-ref>.md`
3. Update `REFERRAL_INDEX.md` (add row, status: OPEN)
4. Notify builder — include referral path + all remediation items
5. Block merge gate

### Steps on Re-submission PASS
1. Close referral artifact (add closure date + QP report reference)
2. Update `REFERRAL_INDEX.md` (status: CLOSED)
3. Release merge gate

---

## Progress Tracker Enforcement — At a Glance

### When Required
Check the tracker when ALL three are true:
- ✅ Build corresponds to an open GitHub issue
- ✅ Issue has an associated implementation plan / progress tracker
- ✅ Issue is part of a multi-wave or multi-phase execution

### What to Check
- Tracker shows current wave/phase state
- All delivered artifacts are listed
- No uncertified waves marked complete
- Tracker timestamp reflects this delivery

### If Tracker Is Out of Sync
→ Add `QP-FAIL-007` to failure list
→ Issue Builder Referral citing QP-FAIL-007
→ Block merge gate until tracker is updated and re-submission passes QP

---

## REFERRAL_INDEX.md Format

Create at `.agent-admin/quality-professor/REFERRAL_INDEX.md` on first referral:

```markdown
# Builder Referral Index

| Date | Issue | Builder | Referral Artifact | Status | Closure Date |
|------|-------|---------|-------------------|--------|--------------|
| YYYY-MM-DD | <issue-ref> | <builder-id> | .agent-admin/quality-professor/builder-referral-*.md | OPEN | - |
```

---

## Canonical SOP Reference

Full procedure, templates, and authority references:
- `governance/canon/FM_QUALITY_PROTOCOL_ENHANCED_SOP.md` — canonical SOP
- `governance/quality/agent-integrity/foreman-v2.agent.md` Section 1.7 — Quality Professor mode
- `governance/canon/FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md` — supervision authority
- `governance/canon/MANDATORY_CANONICAL_PROGRESS_RECORDING_AND_WAVE_CLOSURE_CERTIFICATION.md` — tracker canon
