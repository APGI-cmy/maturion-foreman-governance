# Pending Design Inputs — maturion-isms PR #1436

**Document**: G5 Deliverable — PR #1436 Design-Capture Follow-On Tracking  
**Date**: 2026-04-21  
**Authority**: CS2 — Issue: "Catch up governance repo to ISMS ECAP / IAA hardening parity (including PR #1436 design set)"  
**Status**: ACTIVE WATCH — PR NOT YET MERGED  
**Produced by**: foreman-v2

---

## ⚠️ Critical Status Notice

**PR maturion-isms#1436 is NOT YET MERGED.**

The deliverables listed in this document are **pending design inputs only**. They have NOT been
adopted into governance canon. They MUST NOT be treated as authoritative or implemented until:

1. PR #1436 is merged into `maturion-isms` (or its final accepted state is otherwise published)
2. A follow-on governance catch-up wave is executed to absorb the final accepted design

Any governance agent that treats the items below as already-canonical is in breach of governance
discipline. The gap analysis (`governance/gap-analysis/ecap-parity-gap-analysis-20260421.md`)
explicitly classifies all D2–D8 items as `PENDING PR #1436 — track only`.

---

## PR Reference

| Field | Value |
|-------|-------|
| PR | `maturion-isms#1436` |
| Status at analysis date | NOT YET MERGED — WIP hardening wave with pre-brief and scope artifacts only |
| Watch obligation | Governance repo MUST absorb the final accepted design after merge |
| Classification | Pending design input — NOT canon |

---

## Pending Deliverables (NOT YET CANON — Track Only)

### D2 — Universal Authoritative-Reference Truth Hardening

- **Description**: New prohibition set for wrong-but-existing reference patterns. Adds rejection triggers for ceremony artifacts that cite an authoritative reference but use the wrong version, wrong section, or an outdated reference that has been superseded.
- **Expected impact on governance repo**: New ACR entries and/or AAP entries for reference-truth violations; potentially updates to agent contract prohibition language.
- **Follow-on action required**: After PR #1436 merges, assess the final D2 design and implement equivalent catch-up in governance canon.

### D3 — Wrong-But-Existing Reference Anti-Pattern / Rejection Hardening

- **Description**: New anti-patterns for artifacts that reference a document that exists but is the wrong document, wrong version, or wrong section for the context.
- **Expected impact on governance repo**: Additional AAP entries in `execution-ceremony-admin-anti-patterns.md`; possible new §4.3e check sub-rule.
- **Follow-on action required**: After PR #1436 merges, absorb final D3 AAP set.

### D4 — Renumber / Rebase / Conflict-Resolution Re-Reconciliation Rule

- **Description**: New rule for handling renaming, rebasing, and conflict resolution in ceremony artifacts — prevents conflicts between artifact numbering schemes when waves merge.
- **Expected impact on governance repo**: New canon rule in `AGENT_HANDOVER_AUTOMATION.md` or `EXECUTION_CEREMONY_ADMINISTRATION_PROTOCOL.md`.
- **Follow-on action required**: After PR #1436 merges, absorb final D4 rule.

### D5 — Foreman QP Authoritative Reference Table

- **Description**: Formal table declaring which canon document is the authoritative reference for each Foreman QP gate check. Prevents ambiguity when multiple documents could apply to a given check.
- **Expected impact on governance repo**: New section in `FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md` §14.6 or a new supporting document; possible Tier 2 knowledge update.
- **Follow-on action required**: After PR #1436 merges, absorb final D5 reference table. Route agent file changes through CodexAdvisor if required.

### D6 — Liaison / Non-ECAP Mini-Ceremony Pack

- **Description**: Mini-ceremony specification for liaison agent interactions that do not involve the full ECAP stack. Defines a lighter-weight ceremony for agent-to-agent interactions outside ECAP governance.
- **Expected impact on governance repo**: New governance document (template or canon); possibly new checklist.
- **Follow-on action required**: After PR #1436 merges, assess whether governance repo needs the same mini-ceremony pack; absorb if applicable.

### D7 — Checklist / Anti-Pattern / Template / Gate Updates

- **Description**: Further updates to AAP list, ACR list, checklists, and templates as part of the PR #1436 wave.
- **Expected impact on governance repo**: Additional updates to `execution-ceremony-admin-anti-patterns.md`, checklists, and templates.
- **Follow-on action required**: After PR #1436 merges, identify all D7 changes and perform equivalent governance-repo catch-up.

### D8 — Validation Package

- **Description**: PR #1436's own validation artifacts demonstrating end-to-end proof-of-operation for all D2–D7 deliverables.
- **Expected impact on governance repo**: Governance repo must produce its own proof-of-operation once D2–D7 are absorbed (see G4 deliverable).
- **Follow-on action required**: After PR #1436 merges and governance catch-up is complete, execute proof-of-operation per `governance/gap-analysis/proof-of-operation-requirement-20260421.md`.

---

## Follow-On Obligation

When PR #1436 merges (or its final accepted design is otherwise determined), the following
must be executed:

1. **Identify delta**: Compare the final merged state of PR #1436 against the pending items listed above. Note any items that were dropped, modified, or superseded.
2. **Create catch-up wave**: Open a new governance issue for the D2–D8 catch-up wave.
3. **Produce gap analysis update**: Append to `governance/gap-analysis/ecap-parity-gap-analysis-20260421.md` or create a versioned follow-up.
4. **Implement canon changes**: Follow the same pattern as this wave (Foreman orchestrates, builders implement, CodexAdvisor routes agent file changes if needed).
5. **Produce proof-of-operation**: Per `governance/gap-analysis/proof-of-operation-requirement-20260421.md`.
6. **Update this document**: Mark items as ABSORBED or DESCOPED with dated notes.

---

## Watch Mechanism

This document is committed at `governance/tracking/pending-design-inputs-pr1436.md`. It serves
as the **explicit organizational memory** that the governance repo MUST NOT forget PR #1436.

Any future governance session that touches `execution-ceremony-admin-anti-patterns.md`,
`INDEPENDENT_ASSURANCE_AGENT_CANON.md`, or `AGENT_HANDOVER_AUTOMATION.md` MUST check this
document first to determine whether any pending D2–D8 items have since merged.

---

*G5 Deliverable | Wave: ecap-parity | Produced by: foreman-v2 | Date: 2026-04-21 | Authority: CS2 issue assignment*
