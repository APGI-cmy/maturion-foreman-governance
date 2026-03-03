# IAA PRE-BRIEF PROTOCOL

**Status**: CANONICAL | **Version**: 1.0.0 | **Authority**: CS2  
**Date**: 2026-03-03

---

## Purpose

Defines the **IAA Pre-Brief Protocol** — a proactive assurance mechanism that shifts quality
assurance left by declaring acceptance criteria at wave start rather than at final handover.

At the beginning of every wave, once the Foreman has created and populated
`wave-current-tasks.md`, the IAA is invoked to read the task list and generate a **Pre-Brief**
artifact. The Pre-Brief declares, per task, the exact assurance requirements the IAA will check
at handover. Submitting agents receive these criteria before building, eliminating iterative
reject-fix-reject cycles caused by late discovery of assurance expectations.

> **Amendment Authority**: Only CS2 (Johan Ras / repo owner) may amend this canon. Any PR
> modifying this file without CS2 sign-off is auto-FAIL at the merge gate.

---

## Problem Statement

The current IAA protocol operates exclusively as an end-of-wave binary gate. Submitting agents
learn about assurance expectations only when the IAA issues a `REJECTION-PACKAGE` at handover,
leading to:

- **Iterative rejection cycles** — agents repeat work after discovering missing evidence requirements
- **Late-stage surprises** — agents build without knowing which ceremony artifacts, overlays, or
  compliance rules the IAA will check
- **Alignment gap** — the Foreman and builders cannot self-verify compliance before handover
  if the acceptance bar is implicit

As AI CS2 autonomy increases and human oversight decreases, implicit assurance expectations
become unsustainable. The Pre-Brief Protocol makes acceptance criteria machine-checkable at
wave start.

---

## Trigger

The IAA Pre-Brief is triggered **once per wave**, immediately after the Foreman creates and
populates the wave task list artifact (`wave-current-tasks.md` or equivalent). The Foreman
invokes the IAA via the standard `task(agent_type: "independent-assurance-agent")` tool call
with a `PRE-BRIEF` action flag.

**Trigger conditions** (all must be true):
1. Foreman has created the wave task list artifact for the current wave
2. The wave task list contains at least one qualifying task (per §Qualifying Tasks below)
3. No Pre-Brief already exists for this wave number

If the IAA tool call fails or is unavailable, the Foreman records `PHASE_A_ADVISORY` status
and the Pre-Brief is deferred until IAA is accessible. Wave execution **may proceed** in
`PHASE_A_ADVISORY` mode, but Pre-Brief must be completed before the first qualifying PR opens
for review.

---

## Qualifying Tasks

A task qualifies for Pre-Brief coverage if it would trigger IAA assurance at handover per the
IAA Trigger Table in `INDEPENDENT_ASSURANCE_AGENT_CANON.md §Trigger Table`. Specifically:

| Task Category | Qualifies? |
|---------------|-----------|
| AAWP deliverable | YES |
| MAT deliverable | YES |
| Core agent file update | YES |
| Agent contract update | YES |
| Canon file update | YES |
| Architecture update | YES |
| Merge gate workflow update | YES |
| Agent-integrity folder update | YES |
| Docs-only task | NO |
| Parking station update | NO |
| Admin / housekeeping task | NO |

---

## Pre-Brief Content Requirements

Each Pre-Brief artifact MUST contain the following sections:

### Header Block

```markdown
# IAA Pre-Brief — Wave <N> — <Wave Description>

**IAA Session**: IAA-<YYYYMMDD>-PREBRIEF-WAVE<N>
**Wave**: <N>
**Date**: YYYY-MM-DD
**Wave Task List**: <path/to/wave-current-tasks.md>
**Authority**: IAA_PRE_BRIEF_PROTOCOL.md v1.0.0
**Status**: ACTIVE
```

### Wave Summary

A concise summary (2–5 sentences) of what the wave aims to deliver, synthesised from the task
list. This gives context for why specific assurance requirements are selected for each task.

### Per-Task Assurance Declaration

For each qualifying task, the Pre-Brief lists:

| Field | Required | Description |
|-------|----------|-------------|
| `task_id` | YES | Unique task identifier from the wave task list |
| `task_summary` | YES | One-sentence summary of what the task delivers |
| `iaa_trigger_category` | YES | Which Trigger Table row applies |
| `required_phases` | YES | Which delivery proof phases (1–4) are required |
| `required_evidence_artifacts` | YES | Explicit list of artifact paths the IAA will check |
| `applicable_overlays` | YES | Which category overlays apply (from `iaa-category-overlays.md`) |
| `specific_rules` | NO | Named compliance rules (e.g., CORE-018, INV-409) the IAA will check |
| `notes` | NO | Additional context or caveats specific to this task |

### Pre-Brief Footer

```markdown
## Declaration

The requirements listed above are the acceptance criteria the IAA will verify at handover.
Meeting all criteria listed is necessary (but not sufficient) for an ASSURANCE-TOKEN.
The IAA retains intelligence-led assessment authority and may identify additional issues
discovered during review not listed here.

**IAA signature**: IAA-<YYYYMMDD>-PREBRIEF-WAVE<N>
```

---

## Storage Location

Pre-Brief artifacts are stored at:

```
.agent-admin/assurance/iaa-prebrief-wave<N>.md
```

Where `<N>` is the zero-padded wave number (e.g., `iaa-prebrief-wave09.md`).

If a wave has a descriptive identifier rather than a number, use:

```
.agent-admin/assurance/iaa-prebrief-<wave-slug>.md
```

Pre-Brief artifacts are **immutable** once published. If task scope changes materially after
publication, the Foreman must request a **Pre-Brief Amendment** (see §Pre-Brief Amendment
below).

---

## Merge Gate Enforcement

The following conditions are merge-blockers for any PR from a wave that has a Pre-Brief:

| Condition | Blocker | Resolution |
|-----------|---------|-----------|
| Pre-Brief artifact missing for a wave with qualifying tasks | YES | Foreman invokes IAA to generate Pre-Brief |
| Pre-Brief not referenced in Foreman's prehandover proof | YES | Foreman adds Pre-Brief reference to prehandover proof |
| At handover, a declared requirement from Pre-Brief is not met | YES | Submitting agent resolves gap; IAA re-assesses |
| Pre-Brief was generated but is marked `SUPERSEDED` without a replacement | YES | Generate replacement Pre-Brief Amendment |

The IAA **must** cross-reference the active Pre-Brief at handover and report:
- Which declared requirements were met (✅)
- Which declared requirements were not met (❌) — each becomes a `REJECTION-PACKAGE` finding

---

## Pre-Brief Amendment

If the wave task scope changes materially after the Pre-Brief is published (tasks added,
removed, or substantially redesigned), the Foreman must:

1. Note the scope change in the wave task list
2. Invoke IAA for a Pre-Brief Amendment via `task(agent_type: "independent-assurance-agent")`
   with action flag `PRE-BRIEF-AMEND`
3. IAA generates an amendment artifact at:
   `.agent-admin/assurance/iaa-prebrief-<wave-slug>-amend<M>.md`
   where `M` is the amendment number (01, 02, …)
4. The original Pre-Brief is marked `SUPERSEDED` with a reference to the amendment
5. The amendment becomes the active Pre-Brief for assurance purposes

Minor scope changes (e.g., file paths corrected, typo fixes in descriptions) do not require
an amendment. The IAA uses judgment about materiality.

---

## Cross-Agent Interactions

### IAA Obligations

- The IAA **MUST** generate a Pre-Brief when invoked by the Foreman with `PRE-BRIEF` action
- The IAA **MUST** cross-reference the active Pre-Brief at handover and report per-requirement status
- The IAA **MUST NOT** silently apply requirements not declared in the Pre-Brief without noting
  the addition (intelligence-led additions are permitted but must be disclosed)
- The IAA **MUST** mark the Pre-Brief as `SUPERSEDED` when a valid amendment replaces it

### Foreman Obligations

- The Foreman **MUST** invoke the IAA for a Pre-Brief after populating `wave-current-tasks.md`
  for any wave containing qualifying tasks
- The Foreman **MUST** reference the Pre-Brief artifact path in the prehandover proof
- The Foreman **MUST** communicate the Pre-Brief to all builders assigned to the wave so they
  can self-check compliance before submitting handover artifacts
- The Foreman **MUST** request a Pre-Brief Amendment if material scope changes occur

### Builder Obligations

- Builders **SHOULD** review the wave Pre-Brief before beginning implementation
- Builders **MUST** verify their handover proof addresses each Pre-Brief requirement that
  applies to their task before submitting

---

## Example Pre-Brief

```markdown
# IAA Pre-Brief — Wave 10 — Agent Registry Harmonisation

**IAA Session**: IAA-20260303-PREBRIEF-WAVE10
**Wave**: 10
**Date**: 2026-03-03
**Wave Task List**: .agent-admin/waves/wave-10-tasks.md
**Authority**: IAA_PRE_BRIEF_PROTOCOL.md v1.0.0
**Status**: ACTIVE

---

## Wave Summary

Wave 10 harmonises agent registry files across the canonical governance repo and two consumer
repos. It modifies three agent contract files, updates the INTEGRITY_INDEX, and creates a new
canon file for registry alignment. No application code is touched.

---

## Task: TASK-10-001 — Harmonise foreman-v2.agent.md

**Summary**: Update foreman-v2.agent.md to align job_environment fields with canonical pattern.  
**IAA Trigger Category**: Core agent file update  
**Required Phases**: 1 (Preflight), 2 (Governance), 3 (Working), 4 (Handover)  
**Required Evidence Artifacts**:
- `.agent-admin/evidence/preflight-proof-<PR#>.md` — must name the submitting agent and cite
  contract version
- `.agent-admin/evidence/governance-proof-<PR#>.md` — must cite LIVING_AGENT_SYSTEM.md v6.2.0
  and confirm canon hash verification
- `.agent-admin/evidence/working-proof-<PR#>.md` — must document why specific fields were
  changed and reference CODEX_ADVISOR_AGENT_CONTRACT_REQUIREMENTS_CHECKLIST.md
- `.agent-admin/prehandover/prehandover_proof_<PR#>_<date>.md` — must confirm GREEN status,
  OPOJD, and all gate parity checks

**Applicable Overlays**: OVD-001 (Agent Contract Update), OVG-001–OVG-005 (Agent Integrity
Deep Checks per Overlay G)  
**Specific Rules**: CORE-018 (complete evidence sweep), INV-409 (PR must not be DRAFT)  
**Notes**: SELF-ASSURANCE-001 does not apply as this PR does not modify the IAA contract file.

---

## Task: TASK-10-002 — Add IAA_REGISTRY_ALIGNMENT_CANON.md

**Summary**: Create new canon file defining registry alignment requirements.  
**IAA Trigger Category**: Canon file update  
**Required Phases**: 1, 2, 3, 4  
**Required Evidence Artifacts**:
- All standard evidence artifacts (preflight, governance, working, prehandover)
- `.agent-admin/governance/ripple-executed-*.json` — canon update triggers ripple; evidence
  of ripple execution required

**Applicable Overlays**: OVD-002 (Canon File Update)  
**Specific Rules**: REQ-CM-001 (no placeholder hashes in CANON_INVENTORY after update)  
**Notes**: CANON_INVENTORY.json must be updated in the same PR with correct SHA256 hash for
the new canon file. Placeholder hash will fail alignment gate.

---

## Declaration

The requirements listed above are the acceptance criteria the IAA will verify at handover.
Meeting all criteria listed is necessary (but not sufficient) for an ASSURANCE-TOKEN.
The IAA retains intelligence-led assessment authority and may identify additional issues
discovered during review not listed here.

**IAA signature**: IAA-20260303-PREBRIEF-WAVE10
```

---

## Integration with Existing IAA Phases

The Pre-Brief Protocol introduces a new **Phase 0** that precedes the existing five-phase
delivery proof protocol:

| Phase | Name | Timing | Artifact |
|-------|------|--------|----------|
| Phase 0 | Pre-Brief | Wave start — before building begins | `iaa-prebrief-<wave>.md` |
| Phase 1 | Preflight Proof | Per PR — before build | `preflight-proof-<PR#>.md` |
| Phase 2 | Governance Proof | Per PR — before build | `governance-proof-<PR#>.md` |
| Phase 3 | Working Phase Proof | Per PR — during/after build | `working-proof-<PR#>.md` |
| Phase 4 | Handover Proof | Per PR — before IAA invocation | `prehandover_proof_<PR#>.md` |
| Phase 5 | Assurance Invocation | Per PR — final gate | `assurance-token-<PR#>.md` or `rejection-package-<PR#>.md` |

Phase 0 is the IAA's proactive declaration. Phases 1–4 are the submitting agent's delivery
evidence. Phase 5 is the IAA's final verdict, which cross-references Phase 0.

---

## References

- `governance/canon/INDEPENDENT_ASSURANCE_AGENT_CANON.md` v1.0.0 — IAA class definition and trigger table
- `governance/canon/LIVING_AGENT_SYSTEM.md` v6.2.0 — Living Agent framework
- `.agent-workspace/independent-assurance-agent/knowledge/iaa-category-overlays.md` — Overlay definitions
- `.agent-workspace/independent-assurance-agent/knowledge/iaa-trigger-table.md` — Trigger table
- `governance/CANON_INVENTORY.json` — Canon hash registry
- `governance/canon/FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md` — Foreman authority model

---

*Authority: CS2 (Johan Ras) | Version: 1.0.0 | Effective: 2026-03-03*
