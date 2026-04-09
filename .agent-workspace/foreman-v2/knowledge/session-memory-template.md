# Session Memory Template — Foreman v2

**Version**: 1.0.0  
**Created**: 2026-04-09  
**Authority**: CS2 (Johan Ras)  
**Canonical Source**: `governance/canon/AGENT_HANDOVER_AUTOMATION.md`

---

## Purpose

Template for all Foreman session memory files. Used in Phase 4 Step 4.2.  
File naming: `.agent-workspace/foreman-v2/memory/session-<SESSION_ID>.md`

---

## Session Memory File Template

```markdown
# Foreman Session Memory — <SESSION_ID>

**Date**: YYYY-MM-DD
**Session ID**: <SESSION_ID>
**Agent Version**: 6.2.0
**Contract Version**: (read from YAML)
**Triggering Issue/PR**: [issue or PR link]

---

## Session Summary

**Job Type**: [wave orchestration | single task | governance check | other]
**Build/Wave**: [wave identifier or task summary]
**CS2 Authorization**: [issue/PR link or explicit instruction reference]

---

## Preflight

**prior_sessions_reviewed**: [list session IDs reviewed, or 'none — first session']
**unresolved_items_from_prior_sessions**: [list each, or 'none']
**fail_only_once_attested**: [YES — no open breaches | OPEN BREACH — [id]]
**canon_inventory_status**: [CLEAN | DEGRADED — halt if degraded]
**tier2_knowledge_loaded**: [YES | PARTIAL — list missing files]

---

## Work Performed

**verb_classified_mode**: [POLC_ORCHESTRATION | QUALITY_PROFESSOR | IMPLEMENTATION_GUARD | ESCALATE | UNKNOWN]
**iaa_prebrief_invoked**: [YES — path: [path] | PHASE_A_ADVISORY | N/A — no qualifying tasks]
**wave_checklist_path**: [path or 'N/A']
**stages_completed**: [list of stages 1-10 completed this session, or 'N/A']
**builder_agents_delegated**: [list builder agents appointed, or 'none']
**qp_evaluations_performed**: [N — list task IDs, or 'none']

---

## Escalations & Halts

**escalations_triggered**: [list by HALT/ESC id, or 'none']
**open_blockers**: [list each with resolution owner, or 'none']

---

## Handover

**qp_final_verdict**: [PASS | FAIL | PENDING]
**merge_gate_parity**: [PASS | FAIL | N/A]
**prehandover_proof_path**: [path or 'N/A']
**iaa_invocation_result**: [ASSURANCE-TOKEN [ref] | REJECTION-PACKAGE | PHASE_A_ADVISORY | NOT_INVOKED — HALT-007]
**iaa_token_path**: [path or 'N/A']
**pr_opened**: [PR link or 'pending']

---

## Lessons Learned

[Record at least one concrete lesson. MANDATORY — never leave blank.]

---

## Next Session Notes

[Unresolved items, carried-forward blockers, or 'none']
```

---

## Prehandover Proof Template

File naming: `.agent-admin/prehandover/proof-<TIMESTAMP>.md`

```markdown
# Prehandover Proof — <TIMESTAMP>

**Date**: YYYY-MM-DD
**Session ID**: <SESSION_ID>
**Wave**: <wave identifier>
**Foreman**: foreman-v2

---

## Evidence Summary

- Architecture designed: ✅ / ❌
- Red QA created: ✅ / ❌
- Builder supervised to 100% GREEN: ✅ / ❌
- Zero test debt verified: ✅ / ❌
- All gates PASS: ✅ / ❌

## Wave Checklist

wave_checklist: .agent-admin/waves/wave-<N>-current-tasks.md
status: ALL_TICKED | PENDING — [task IDs]
descoped: [list] | none
iaa_prebrief: .agent-admin/assurance/iaa-prebrief-wave<N>.md
prebrief_status: ACTIVE | PHASE_A_ADVISORY

## Merge Gate Verdict

[PASS | FAIL] — All [N] required checks [passed | N failing: list]

## IAA Audit Token

iaa_audit_token: [ASSURANCE-TOKEN reference — fill after §4.4 | PENDING]

---

Authority: EVIDENCE_ARTIFACT_BUNDLE_STANDARD.md | AGENT_HANDOVER_AUTOMATION.md
```

---

**Tier 3 Canon Reference**: `governance/canon/AGENT_HANDOVER_AUTOMATION.md`  
**Tier 3 Canon Reference**: `governance/canon/EVIDENCE_ARTIFACT_BUNDLE_STANDARD.md`
