# Governance Repo Parity Gap Analysis — ECAP / IAA / Foreman Hardening

**Document**: G1 Deliverable — Formal Parity Gap Analysis  
**Date**: 2026-04-21  
**Authority**: CS2 — Issue: "Catch up governance repo to ISMS ECAP / IAA hardening parity (including PR #1436 design set)"  
**Produced by**: foreman-v2  
**Status**: COMMITTED — baseline for this catch-up wave

---

## Purpose

This document formally records the parity gap between the `maturion-foreman-governance` current baseline
and the stronger merged hardening visible in `maturion-isms` and `app_management_centre`, as of
the date of this catch-up wave. It classifies each gap as:

- **SAFE TO ADOPT NOW** — already merged elsewhere; adoptable immediately
- **PENDING PR #1436** — pending design input from `maturion-isms#1436` (NOT YET MERGED — track only)
- **NOT REQUIRED** — repo-specific or already at parity; no governance-repo action needed

---

## Reference Baseline

| Repo / Artifact | Visible State at Analysis Date |
|-----------------|-------------------------------|
| `maturion-foreman-governance` current | Described per file below |
| `maturion-isms` merged baseline | Described per file below |
| `maturion-isms#1436` | ⚠️ NOT YET MERGED — tracked as pending input only |
| `app_management_centre` | Proof-of-operation / parity hardening reference |

---

## Gap Table

### Canon Files

| # | File | Gov Repo State | ISMS Merged State | Gap | Classification | Action |
|---|------|---------------|-------------------|-----|----------------|--------|
| 1 | `AGENT_HANDOVER_AUTOMATION.md` | v1.5.0 — Checks A–K in §4.3e | v1.6.0 — adds Check L (active-bundle token/session coherence) | Missing Check L | **SAFE TO ADOPT NOW** | Add Check L to §4.3e; bump to v1.6.0 |
| 2 | `INDEPENDENT_ASSURANCE_AGENT_CANON.md` | v1.7.0 — ACR-01 through ACR-14 | v1.8.0+ — adds ACR-15 (active-wave/task-tracker contradiction) and ACR-16 (active final-state token/session incoherence) | Missing ACR-15, ACR-16 | **SAFE TO ADOPT NOW** | Add ACR-15 and ACR-16; bump to v1.8.0 |
| 3 | `execution-ceremony-admin-anti-patterns.md` | v1.1.0 — AAP-01..09 (S1), AAP-10..22 (present) | v1.1.0+ — adds AAP-23 (active-tracker contradiction) and AAP-24 (active token/session incoherence) | Missing AAP-23, AAP-24 corresponding to ACR-15 and ACR-16 | **SAFE TO ADOPT NOW** | Add AAP-23, AAP-24; bump version |

### Templates and Checklists

| # | File | Gov Repo State | ISMS Merged State | Gap | Classification | Action |
|---|------|---------------|-------------------|-----|----------------|--------|
| 4 | `governance/templates/execution-ceremony-admin/PREHANDOVER.template.md` | v1.1.0 — no `active_bundle_iaa_coherence` field; no `## Ripple/Cross-Agent Assessment` section | v1.2.0 — mandatory `active_bundle_iaa_coherence` field and `## Ripple/Cross-Agent Assessment` section | Missing coherence field and ripple/cross-agent section | **SAFE TO ADOPT NOW** | Add field and section; bump to v1.2.0 |
| 5 | `governance/checklists/execution-ceremony-admin-checklist.md` | Current — no explicit active-bundle coherence check | ISMS — has explicit check for ACR-15/16 coherence | Minor gap in checklist language | **SAFE TO ADOPT NOW** | Add coherence check item |

### Live Agent / Operational Parity

| # | Area | Gov Repo State | ISMS Merged State | Gap | Classification | Action |
|---|------|---------------|-------------------|-----|----------------|--------|
| 6 | Foreman QP `gate_set_checked` / gate inventory | foreman-v2.agent.md does not explicitly declare `gate_set_checked` field | ISMS agent contracts use explicit `gate_set_checked` in Foreman QP section | Minor contract gap | **SAFE TO ADOPT NOW** | Route to CodexAdvisor-agent for agent file update if CS2 approves |
| 7 | IAA stale standalone pre-brief path assumptions | `.agent-workspace/foreman-v2/knowledge/` references older standalone path model | ISMS normalised to dedicated token file path model | Tier 2 knowledge parity gap | **SAFE TO ADOPT NOW** | Update Tier 2 knowledge files |
| 8 | ECAP prohibition set in agent contracts | Older prohibition language in some artifacts | ISMS uses stronger ECAP prohibition language | Content gap only | **SAFE TO ADOPT NOW** | Update operational artifacts via CodexAdvisor if needed |
| 9 | CodexAdvisor sole-authority / no-agent-file-write protection language | Present in AGENT_CONTRACT_FILE_PROTECTION_POLICY.md | Strengthened in ISMS per PR parity work | Minimal gap | **NOT REQUIRED** — already adequately covered in governance canon | No action |

### PR maturion-isms#1436 Pending Design Inputs (NOT YET MERGED)

| # | Deliverable | Description | Classification |
|---|-------------|-------------|----------------|
| D2 | Universal authoritative-reference truth hardening | New prohibition set for wrong-but-existing reference patterns | **PENDING PR #1436** — track only; do NOT adopt until final accepted design is known |
| D3 | Wrong-but-existing reference anti-pattern / rejection hardening | New ACRs and AAPs for stale-but-present wrong references | **PENDING PR #1436** — track only |
| D4 | Renumber / rebase / conflict-resolution re-reconciliation rule | New rule for renaming/rebasing anti-patterns | **PENDING PR #1436** — track only |
| D5 | Foreman QP Authoritative Reference Table | Formal table for Foreman QP authoritative reference checks | **PENDING PR #1436** — track only |
| D6 | Liaison / non-ECAP mini-ceremony pack | Mini-ceremony for liaison agent interactions outside ECAP | **PENDING PR #1436** — track only |
| D7 | Checklist / anti-pattern / template / gate updates | Further AAP, ACR, checklist, and template updates | **PENDING PR #1436** — track only |
| D8 | Validation package | PR #1436's own validation artifacts | **PENDING PR #1436** — track only |

---

## Summary: Immediate Catch-Up Items (Safe to Adopt Now)

The following items are confirmed merged in `maturion-isms` and are safe to adopt immediately:

1. **Check L** — Active-bundle token/session coherence in §4.3e Admin Ceremony Compliance Gate
2. **ACR-15** — Active-wave/task-tracker contradiction rejection trigger
3. **ACR-16** — Active final-state token/session incoherence rejection trigger
4. **AAP-23** — Active-tracker contradiction anti-pattern (corresponding to ACR-15)
5. **AAP-24** — Active token/session incoherence anti-pattern (corresponding to ACR-16)
6. **PREHANDOVER.template.md** v1.2.0 — `active_bundle_iaa_coherence` field and Ripple/Cross-Agent Assessment section
7. **Checklist** — Explicit active-bundle coherence check item
8. **Tier 2 knowledge parity** — Session memory template and operational artifacts

## Summary: Deferred Items (Pending PR maturion-isms#1436)

All D2–D8 deliverables from `maturion-isms#1436` are explicitly deferred. They are tracked in
`governance/tracking/pending-design-inputs-pr1436.md` (G5 deliverable).

## Summary: Not Required

| Item | Reason |
|------|--------|
| CodexAdvisor sole-authority language | Already adequately covered in `AGENT_CONTRACT_FILE_PROTECTION_POLICY.md` v1.0.0 |
| CS2-only modification for IAA contract | Already in IAA canon Independence Requirements rule 4 |

---

## Drift Prevention Mechanism

To prevent `maturion-foreman-governance` from falling behind `maturion-isms` again on ECAP/IAA/Foreman performance, the following controls are defined:

1. **G5 tracking document** (`governance/tracking/pending-design-inputs-pr1436.md`) — explicitly lists open pending design inputs with follow-up obligation
2. **Governance changelog discipline** — every canon amendment committed with amendment note and version bump
3. **IAA Pre-Brief requirement** — future waves that include canon changes trigger IAA Pre-Brief review
4. **CANON_INVENTORY.json PUBLIC_API layer_down_status** — `AGENT_HANDOVER_AUTOMATION.md` has `layer_down_status: PUBLIC_API` triggering ripple obligation when changed

---

*G1 Deliverable | Wave: ecap-parity | Produced by: foreman-v2 | Date: 2026-04-21 | Authority: CS2 issue assignment*
