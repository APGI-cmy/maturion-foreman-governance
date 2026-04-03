# Working Phase Proof — PR #1317 — Canon Update: FRS/TRS/Architecture Templates §AD Traceability

**Agent**: copilot-swe-agent[bot] (GitHub Copilot Coding Agent)  
**Session**: copilot-frs-trs-ad-traceability-20260403  
**Date**: 2026-04-03  
**PR**: APGI-cmy/maturion-foreman-governance#1317  
**Branch**: copilot/update-frs-trs-architecture-templates

---

## Rationale Summary

PR #1317 closes the process gap identified in the governance issue: downstream FRS, TRS, and Architecture artifacts had no structural mechanism to trace requirements back to the 24 mandatory §AD sections of `APP_DESCRIPTION_REQUIREMENT_POLICY.md` v2.0 (layered down via governance ripple 57efff77). This PR introduces canonical templates that enforce this traceability as a mandatory gate condition.

---

## Decision 1 — New Canon: `governance/templates/FRS_TEMPLATE.md` (v1.0)

**What**: Created a new FRS template with mandatory §AD traceability sections.

**Why**: The issue acceptance criterion requires "FRS template includes a traceability table or field for every FR to cite relevant §AD section(s)." A template is the canonical mechanism for enforcing this requirement at creation time, preventing omissions in new FRS documents.

**Content rationale**:
- **Section 0** (Derivation): Mandatory derivation statement with App Description reference and §AD-02 chain — ensures upstream traceability is established before any FR is written
- **FR Traceability Table** (Section 2): Per-FR summary table with `§AD Source(s)` column — provides at-a-glance §AD mapping across all requirements
- **Per-FR §AD Traceability block**: Each individual FR entry carries a dedicated `§AD Traceability` sub-table mapping the specific FR to its policy source — prevents any FR from being written without a §AD citation
- **FR-to-§AD Coverage Matrix** (Section 3): Exhaustive table covering all 24 §AD sections — requires explicit coverage declaration (✅ Covered / ⚠️ Partial / ❌ Not Covered / N/A) for every §AD section; any ❌ row without justification blocks FRS approval
- **Completeness Gate** (Section 6): Checklist blocking FRS approval until all §AD citations are present and Coverage Matrix is complete

**Placeholder content**: Template `{placeholder}` fields are intentional — templates are fill-in documents for consumer repos.

**Alternatives considered**:
- Adding a minimal §AD column to an existing FRS format → rejected because no canonical FRS template existed; creating a full template is more useful
- Making §AD traceability optional → rejected per issue requirement that it is mandatory

---

## Decision 2 — New Canon: `governance/templates/TRS_TEMPLATE.md` (v1.0)

**What**: Created a new TRS template with dedicated required sections for §AD-03, §AD-10, §AD-11, §AD-12, §AD-15, §AD-17, §AD-20, §AD-22, and §AD-24.

**Why**: The issue acceptance criterion requires "TRS template updated with dedicated required content areas for listed §AD sections." A template with explicit per-§AD required sections is the canonical enforcement mechanism.

**Per-§AD section rationale**:
- **§AD-03 (Technology Stack)**: Placed as Section 2 because it is the first downstream realization of the App Description technology baseline; includes an App Description alignment gate that blocks TRS approval if contradictions exist
- **§AD-10 (Schema-to-Hook Validation)**: Section 4.1 with per-table audit table and evidence artifact pointer; applicability gate allows N/A with documented justification for apps without database schema
- **§AD-11 (Table Pathway Audit)**: Section 4.2 with `.from()` usage × migration × RLS inventory table
- **§AD-12 (RLS Audit Gate)**: Section 4.3 with CRUD policy coverage table; explicitly states production deployment is blocked until RLS sign-off is recorded
- **§AD-15 (Edge Function Registry)**: Section 4.4 with invocation registry table; applicability gate for apps without edge functions
- **§AD-17 (Secret Naming Convention)**: Section 4.5 with env var registry tied to `.env.example` validation
- **§AD-20 (Shared State Architecture)**: Section 4.6 with named state owner per domain; explicitly prohibits ambiguous state ownership
- **§AD-22 (Audit Log Design)**: Section 4.7 with action types, query surface, deduplication strategy, and example SQL schema
- **§AD-24 (State Persistence Specification)**: Section 4.8 with storage location, retention policy, and authoritative owner per state item

**FRS-to-TRS Traceability Matrix** (Section 3): Every TRS requirement must trace to FRS; orphan TRs without FRS traceability block TRS approval.

**Section 10 Completeness Checklist**: Gate requiring all 9 §AD sections to be completed or marked N/A with justification.

---

## Decision 3 — Update: `governance/templates/minimum-architecture-template.md` (v1.0 → v1.1)

**What**: Added Section 4.14 with mandatory §AD-10–§AD-16 and §AD-20–§AD-22 coverage tables and checkboxes; updated Section 8 completeness checklist.

**Why**: The issue acceptance criterion requires "Minimum architecture template includes explicit coverage/checkboxes for all noted §AD fields." Section 4.14 is placed after the existing 4.13 sections (maintaining template structure) and before Section 5 (QA Strategy).

**Content rationale**:
- **Coverage tables**: §AD-10–§AD-16 table and §AD-20–§AD-22 table — each row has `Architecture Coverage` (reference to relevant architecture section or TRS section) and `Status` (✅ Covered / ❌ Not Covered / N/A) — provides a summary view for reviewers
- **Coverage checkboxes**: One checkbox per §AD section with a descriptive compliance statement — architects can verify against the description without looking up the policy document
- **Coverage Completion Gate**: Any unchecked item without N/A justification blocks Architecture approval
- **Section 8 updates**: Two new checklist items referencing Section 4.14 — these gate Architecture approval on completion of the §AD coverage section

**Version bump v1.0 → v1.1**: Reflects additive enhancement; not a breaking change since all existing sections are preserved.

---

## Decision 4 — Update: `governance/CHANGELOG.md`

**What**: Added CHANGELOG entry `FRS-TRS-ARCH-TEMPLATE-AD-TRACEABILITY-2026-04-03` at the top of the Change History section.

**Why**: Per governance protocol, all canon changes must be recorded in CHANGELOG.md with affected artifacts, migration guidance, and rationale.

**Migration guidance**: Documents that new FRS/TRS/Architecture documents must use the new templates; existing documents should be updated at next revision.

**Layer-Down Status**: `PUBLIC_API — mandatory ripple to all consumer repos with build pipelines` — standard ripple workflow will dispatch to consumer repos.

---

## CORE-007 Placeholder Content Scan

New template files intentionally contain `{placeholder}` fields (e.g., `{APP}`, `{VERSION}`, `{DATE}`) — this is expected and correct for governance templates. These are not governance evidence placeholders; they are fill-in fields for downstream consumer repo documents. No actual SHA256 or evidence fields contain placeholder values.

---

## Risks and Constraints

| Risk | Mitigation |
|------|-----------|
| A-09 breach (PR opened before IAA invocation) | Recorded in preflight-proof-1317.md; evidence artifacts created retroactively; IAA invoked this session |
| Template `{placeholder}` content flagged by IAA CORE-007 | Addressed above — placeholders are intentional template design, not governance placeholders |
| No existing FRS/TRS templates to verify format against | Templates modeled after APP_DESCRIPTION_TEMPLATE.md and minimum-architecture-template.md patterns; consistent with repo conventions |

---

*copilot-swe-agent[bot] | Session copilot-frs-trs-ad-traceability-20260403 | 2026-04-03*
