# IAA Rejection Package — PR #1317 — IAA-20260403-PR1317

**Date**: 2026-04-03  
**IAA Session**: IAA-20260403-PR1317  
**PR**: #1317  
**Branch**: copilot/update-frs-trs-architecture-templates  
**Submitting Agent**: copilot-swe-agent[bot]

---

## Rejection Package (verbatim from IAA output)

```
REJECTION-PACKAGE
PR: #1317
Branch: copilot/update-frs-trs-architecture-templates
Date: 2026-04-03
IAA Session: IAA-20260403-PR1317
Submitting Agent: copilot-swe-agent[bot] (Copilot)

Phases:
  Phase 1 (Preflight):  FAIL — preflight-proof-1317.md absent
  Phase 2 (Governance): FAIL — governance-proof-1317.md absent
  Phase 3 (Working):    FAIL — working-proof-1317.md absent; scope-declaration.md stale (A-026)
  Phase 4 (Handover):   FAIL — no PREHANDOVER proof; CORE-018 all four conditions absent;
                                INV-405 gate parity unverifiable; iaa_audit_token absent
Wave Checklist Gate:    FAIL — CHECKLIST-GATE-001 (.agent-admin/waves/ directory absent)
Agent Integrity:        PASS — all 4 agent contracts verified (no drift)
Independence:           CONFIRMED

Verdict: MERGE BLOCKED

Remediation Required:
  F1 [CHECKLIST-GATE-001]: Create .agent-admin/waves/wave-<N>-current-tasks.md with all
     tasks ticked [x] before IAA re-invocation. If this PR operates outside wave governance,
     obtain explicit CS2 authorisation and document in PREHANDOVER proof.
  F2 [CORE-018 / INV-401]: Create .agent-admin/prehandover/prehandover_proof_1317_<date>.md
     with all required fields (iaa_audit_token: PENDING, wave_checklist: ALL_TICKED,
     gate parity, all phases complete, files changed, CS2 auth reference).
  F3 [CORE-015]: Create session memory file for PR #1317 in submitting agent's memory path.
  F4 [INV-101]: Create .agent-admin/evidence/preflight-proof-1317.md.
  F5 [INV-201]: Create .agent-admin/evidence/governance-proof-1317.md with ripple assessment
     and CANON_INVENTORY registration check for new template files.
  F6 [INV-301]: Create .agent-admin/evidence/working-proof-1317.md with CORE-007 placeholder
     scan and §AD alignment confirmation.
  F7 [A-026]: Update scope-declaration.md to match the 4 files changed in this PR exactly.

Re-entry Point: Phase 2 — Step 2.4 — Wave Checklist Invocation Gate
```

---

## Remediation Status

| Item | Status |
|------|--------|
| F1 — Create wave checklist | ✅ DONE — `.agent-admin/waves/wave-frs-trs-ad-traceability-current-tasks.md` |
| F2 — Create PREHANDOVER proof | ✅ DONE — `.agent-admin/prehandover/prehandover_proof_1317_20260403.md` |
| F3 — Create session memory | ✅ DONE — `.agent-workspace/governance-repo-administrator/memory/session-copilot-1317-20260403.md` |
| F4 — Create preflight proof | ✅ DONE — `.agent-admin/evidence/preflight-proof-1317.md` |
| F5 — Create governance proof | ✅ DONE — `.agent-admin/evidence/governance-proof-1317.md` |
| F6 — Create working proof | ✅ DONE — `.agent-admin/evidence/working-proof-1317.md` |
| F7 — Update scope-declaration.md | ✅ DONE — `governance/scope-declaration.md` updated |

**All F1–F7 remediation items addressed. IAA re-invocation to follow.**
