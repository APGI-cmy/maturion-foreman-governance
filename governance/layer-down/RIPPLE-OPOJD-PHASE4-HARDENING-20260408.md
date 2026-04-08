# Layer-Down Ripple Notice — OPOJD Phase 4 Hardening

**Ripple ID**: RIPPLE-OPOJD-PHASE4-HARDENING-20260408  
**Issued By**: Governance Repository Administrator (governance-repo-administrator-v2)  
**Date**: 2026-04-08  
**Source Repo**: APGI-cmy/maturion-foreman-governance  
**Ripple Trigger**: OPOJD hardening — forbid handover of Phase 4 incomplete jobs and canonize terminal-state completion semantics  
**Layer-Down Type**: PUBLIC_API — mandatory propagation to all consumer repos

---

## Summary of Changes

This ripple notifies consumer repositories of the following governance changes made in the
source repository. These changes harden OPOJD terminal-state completion semantics and must
be reflected in all consumer repos using the Foreman / IAA / PREHANDOVER model.

### Changed Files

| File | Change |
|------|--------|
| `governance/opojd/OPOJD_COMPLETE_JOB_HANDOVER_DOCTRINE.md` | v2.0 → v2.1: Added terminal-state completion semantics, BLOCKED/INCOMPLETE definition, forbidden handover language |
| `governance/canon/AGENT_HANDOVER_AUTOMATION.md` | v1.1.4 → v1.1.5: Phase 4 Terminal State Rule added |
| `governance/canon/MERGE_GATE_PHILOSOPHY.md` | v2.0.0 → v2.1.0: Phase 4 Completeness Gate requirement added |
| `governance/canon/FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md` | v1.0.0 → v1.1.0: CS2 role clarification; review layer separation |

---

## Normative Changes That Must Propagate

### 1. Terminal-State Rule

> **COMPLETE means Phase 4 complete.**  
> A job is not COMPLETE until all required handover artifacts have been created and committed,
> including PREHANDOVER proof, session memory, and—where IAA is required—the independent
> assurance artifact. Missing Phase 4 artifacts place the session in BLOCKED / INCOMPLETE state.

All consumer-repo agent contracts referencing OPOJD v2.0 must be updated to reference v2.1.

### 2. Forbidden Handover Language

The following phrases are prohibited in PR descriptions and handover communications:
- "remaining Phase 4 ceremony"
- "PREHANDOVER still to be completed next session"
- "IAA token still pending but job otherwise complete"
- "work complete; ceremony can follow"

Consumer repos should add these to their FAIL-ONLY-ONCE registries as applicable.

### 3. Phase 4 Artifact Requirements

Phase 4 is complete only when all of the following are committed on the branch:
1. PREHANDOVER proof — `.agent-admin/prehandover/proof-*.md` (or prehandover_proof*.md)
2. Session memory — `.agent-workspace/<agent>/memory/session-*.md`
3. IAA assurance token — `.agent-admin/assurance/assurance-token-*.md` (when IAA required)

### 4. Review Layer Role Separation

Consumer repos should ensure documentation reflects the correct separation:
- **Producing agent**: assembles PREHANDOVER evidence bundle
- **IAA**: independent final audit
- **CI gates**: mechanical artifact presence enforcement
- **CS2 / human authority**: final merge decision based on assembled evidence

---

## Required Actions in Consumer Repos

| Action | Priority | Who |
|--------|----------|-----|
| Update agent contract references from OPOJD v2.0 to v2.1 | HIGH | Foreman agent contract |
| Add Phase 4 artifact completeness check to CI (or align with governance-ceremony-gate model) | HIGH | CI configuration |
| Remove any normalized "remaining Phase 4 ceremony" patterns | HIGH | Agent instructions / contracts |
| Add terminal-state rule to agent FAIL-ONLY-ONCE registry | MEDIUM | Per-agent knowledge |

---

**Ripple Log**: `.agent-admin/governance/ripple-logs/ripple-opojd-phase4-hardening-20260408.md`  
**Authority**: governance-repo-administrator-v2 | 2026-04-08
