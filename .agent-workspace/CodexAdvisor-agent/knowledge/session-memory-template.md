# Session Memory Template — CodexAdvisor

**Version**: 1.0.0  
**Created**: 2026-02-26  
**Authority**: CS2 (Johan Ras)  
**Canonical Source**: `governance/canon/AGENT_HANDOVER_AUTOMATION.md`

---

## Purpose

Template for all CodexAdvisor session memory files. Used in Phase 4 Step 4.3.
File naming: `.agent-workspace/CodexAdvisor-agent/memory/session-NNN-YYYYMMDD.md`

---

## Session Memory File Template

```markdown
# CodexAdvisor Session Memory — Session NNN

**Date**: YYYY-MM-DD  
**Session ID**: session-NNN  
**Agent Version**: 6.2.0  
**Contract Version**: 3.2.0  
**Triggering Issue/PR**: [issue or PR link]

---

## Session Summary

**Job Type**: [new agent creation | agent update | alignment check | other]  
**Target Agent**: [agent name or 'N/A']  
**CS2 Authorization**: [issue/PR link or 'N/A']

---

## Preflight

**prior_sessions_reviewed**: [list session IDs reviewed in Step 1.4, or 'none']  
**unresolved_items_from_prior_sessions**: [list each, or 'none']  
**breach_registry_status**: [CLEAR / BLOCKED — list open breaches if blocked]  
**canon_inventory_status**: [CLEAN / DEGRADED — halt if degraded]  
**tier2_knowledge_loaded**: [YES / PARTIAL — list missing files if partial]

---

## Work Performed

**roles_invoked**: [list all roles or agents invoked this session]  
**agents_created_or_updated**: [list target agent names, or 'none']  
**checklists_loaded**: [checklist name + version, or 'N/A']  
**gate_count_satisfied**: [N]/[N]

---

## Escalations & Halts

**escalations_triggered**: [list by HALT/ESC id, or 'none']  
**open_blockers**: [list each, or 'none']

---

## IAA

**iaa_trigger_classification**: [category from Step 3.2]  
**iaa_required**: [YES / NO / REVIEW]  
**iaa_invocation_result**: [ASSURANCE-TOKEN / REJECTION-PACKAGE / NOT_REQUIRED / PENDING / PHASE_A_ADVISORY]  
**iaa_token_or_rejection_ref**: [reference or 'N/A']

---

## Handover

**qp_verdict**: [PASS | FAIL — N/N gates]  
**merge_gate_parity**: [PASS | FAIL]  
**opojd_result**: [PASS | FAIL]  
**pr_opened**: [PR link or 'N/A']  
**prehandover_proof_path**: [path or 'N/A']  
**bundle_artifacts**:
  - [ ] Agent contract: [path]
  - [ ] Tier 2 knowledge stub: [path]
  - [ ] PREHANDOVER proof: [path]
  - [ ] Session memory: [this file]

---

## Parking Station Entries

[List any entries added to `.agent-workspace/parking-station/suggestions-log.md` this session, or 'none']

---

## Suggestions for Improvement

**MANDATORY — this field may NEVER be blank.**

[Record at least one concrete improvement suggestion observed this session.
If no degradation was observed, state a specific positive observation:
"No degradation observed. Continuous improvement note: [specific, actionable observation]."]

---

## Next Session Notes

[Any items that must be picked up in the next session, or 'none']
```

---

## PREHANDOVER Proof Template

File naming: `.agent-workspace/CodexAdvisor-agent/memory/PREHANDOVER-session-NNN-YYYYMMDD.md`

```markdown
# PREHANDOVER Proof — Session NNN

**Date**: YYYY-MM-DD  
**Session ID**: session-NNN  
**Agent Version**: 6.2.0  
**Triggering Issue/PR**: [link]  
**Target Agent**: [name and file path]

---

## Evidence Checklist

- **Checklist compliance**: [N]/[N] gates — [%]
- **Character count**: [exact count] / 30,000
- **CANON_INVENTORY alignment**: CONFIRMED (hash check passed)
- **Bundle completeness**:
  - [ ] Agent contract: [path]
  - [ ] Tier 2 knowledge stub: [path]
  - [ ] PREHANDOVER proof: [this file]
  - [ ] Session memory: [path]
- **IAA trigger category**: [from Step 3.2]
- **OPOJD gate**: PASS
  - YAML validation: PASS ✅
  - Character count: within limit ✅
  - Checklist compliance: 100% ✅
  - Canon hash verification: PASS ✅
  - No placeholder/stub/TODO content: ✅
  - No embedded Tier 2 content: ✅
  - No hardcoded version strings in phase body: ✅
- **Merge gate parity**: PASS
- **CS2 authorization**: [source — comment link or issue reference]
- **QP verdict**: PASS ([N]/[N] gates)
```

---

**Tier-3 Canon Reference**: `governance/canon/AGENT_HANDOVER_AUTOMATION.md`  
**Tier-3 Canon Reference**: `governance/canon/EVIDENCE_ARTIFACT_BUNDLE_STANDARD.md`
