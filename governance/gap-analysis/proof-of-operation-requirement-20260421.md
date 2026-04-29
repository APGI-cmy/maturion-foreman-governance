# Proof-of-Operation Requirement — ECAP / IAA Hardening Parity Catch-Up

**Document**: G4 Deliverable — Proof-of-Operation Requirement  
**Date**: 2026-04-21  
**Authority**: CS2 — Issue: "Catch up governance repo to ISMS ECAP / IAA hardening parity (including PR #1436 design set)"  
**Produced by**: foreman-v2

---

## Purpose

This document defines the proof-of-operation (PoO) requirement for the `maturion-foreman-governance`
ECAP/IAA hardening parity catch-up wave. It ensures the catch-up is not treated as artifact-presence
only, but is validated against real governance operations.

---

## Problem Statement

A governance catch-up that creates canon documents and templates but never runs them end-to-end
provides false confidence. The governance repo must demonstrate that the hardened path actually
executes correctly — not just that the artifacts exist. This is the same principle that drives
proof-of-operation requirements in consumer repos (`app_management_centre`).

---

## PoO Scope

The proof-of-operation covers:

1. **Check L in §4.3e** — The new active-bundle token/session coherence check must execute without false positives on a clean bundle AND detect a coherence defect when one is deliberately introduced.
2. **ACR-15 and ACR-16** — The IAA must correctly identify wave-tracker contradictions and token/session incoherence in a test scenario.
3. **AAP-23 and AAP-24** — The new anti-patterns must be detectable by the §4.3e gate script.
4. **PREHANDOVER.template.md** — The updated template must be used in at least one real governance PR to confirm the `active_bundle_iaa_coherence` field and Ripple/Cross-Agent Assessment section work in practice.

---

## PoO Requirements

### PO-01 — Check L End-to-End Execution

**Requirement**: Run §4.3e Check L on a governance PR branch.

**Pass condition**:
- Check L runs without script errors
- A clean bundle (all tasks ticked, token file present, `active_bundle_iaa_coherence: VERIFIED`) produces Check L: PASS
- A bundle with a deliberate coherence defect (open `[ ]` task OR missing `active_bundle_iaa_coherence`) produces Check L: FAIL with the correct error message

**Evidence artifact**: Script execution output captured in a session memory or `.agent-admin/evidence/` file.

**Who executes**: Foreman (or execution-ceremony-admin-agent under Foreman supervision) on the next qualifying governance PR.

### PO-02 — ACR-15 Detection in IAA Context

**Requirement**: Verify that the IAA correctly cites ACR-15 when the wave task-tracker contradicts the PREHANDOVER final state.

**Pass condition**:
- A deliberate ACR-15 scenario (open `[ ]` task + `final_state: COMPLETE`) produces an IAA REJECTION-PACKAGE citing ACR-15 specifically

**Evidence artifact**: REJECTION-PACKAGE artifact or IAA session log showing ACR-15 citation.

**Who executes**: IAA invocation on a test bundle (or captured from the first qualifying PR that exercises this path).

### PO-03 — ACR-16 Detection in IAA Context

**Requirement**: Verify that the IAA correctly cites ACR-16 when `active_bundle_iaa_coherence` is absent.

**Pass condition**:
- A deliberate ACR-16 scenario (`active_bundle_iaa_coherence` absent + `final_state: COMPLETE`) produces an IAA REJECTION-PACKAGE citing ACR-16 specifically

**Evidence artifact**: REJECTION-PACKAGE artifact or IAA session log showing ACR-16 citation.

**Who executes**: IAA invocation on a test bundle (or captured from the first qualifying PR that exercises this path).

### PO-04 — PREHANDOVER Template Used in Live Governance PR

**Requirement**: The next governance PR that uses an ECAP bundle MUST use the v1.2.0 PREHANDOVER.template.md, including the `active_bundle_iaa_coherence` field and `## Ripple/Cross-Agent Assessment` section.

**Pass condition**:
- PREHANDOVER proof on that PR includes `active_bundle_iaa_coherence: VERIFIED`
- PREHANDOVER proof includes a completed `## Ripple/Cross-Agent Assessment` section
- §4.3e gate runs without Check L failures

**Evidence artifact**: The PREHANDOVER proof in that PR serves as the evidence.

**Who executes**: The Foreman on the next ECAP-involved governance PR.

---

## PoO Timeline

| Requirement | When to Execute | Status |
|-------------|-----------------|--------|
| PO-01 (Check L script) | Next ECAP governance PR | PENDING — will execute on first qualifying PR after this wave |
| PO-02 (ACR-15 detection) | First qualifying IAA review or deliberate test run | PENDING |
| PO-03 (ACR-16 detection) | First qualifying IAA review or deliberate test run | PENDING |
| PO-04 (Template live use) | Next ECAP governance PR | PENDING — will execute on first qualifying PR after this wave |

---

## PoO Completion Criteria

The proof-of-operation is **COMPLETE** when all of PO-01 through PO-04 have been executed and
their evidence artifacts are committed. Evidence must be committed to:

- `.agent-admin/evidence/pop-ecap-parity-PO-01.md`
- `.agent-admin/evidence/pop-ecap-parity-PO-02.md`
- `.agent-admin/evidence/pop-ecap-parity-PO-03.md`
- `.agent-admin/evidence/pop-ecap-parity-PO-04.md`

Once all four are committed, update the wave task-tracker to tick `TASK-EP-07` as complete.

---

## Note on Phased PoO

This wave's deliverable is the **requirement definition** for the proof-of-operation. The actual
execution of PO-01 through PO-04 is a follow-on obligation on the next qualifying PR. This is
consistent with the governance model where artifact catch-up waves define requirements and
operational PRs satisfy them.

---

*G4 Deliverable | Wave: ecap-parity | Produced by: foreman-v2 | Date: 2026-04-21 | Authority: CS2 issue assignment*
