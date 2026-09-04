# IAA Wave Record — Wave 1399 — Canonical IAA Carrier Alignment

**Wave:** 1399
**Governing issue:** #1399
**Date:** 2026-09-04
**Producer:** CodexAdvisor-agent
**Checklist source:** `.agent-admin/waves/wave-1399-current-tasks.md` at `6b3046cdc45b7dba8e74803e5335f536e2e13af1`
**Authority:** CS2 carrier-model direction of 2026-09-04

## PRE-BRIEF

### Qualifying task

| Task | Summary | IAA trigger categories | Required overlays |
|---|---|---|---|
| `TASK-1399-001` | Align direct canonical IAA carrier instructions to one wave-record `## PRE-BRIEF` model. | `AGENT_CONTRACT`, `CANON_GOVERNANCE`, `AGENT_INTEGRITY`, `KNOWLEDGE_GOVERNANCE`, `AGENT_ADMIN_ARTIFACT` | AGENT_CONTRACT, CANON_GOVERNANCE, AGENT_INTEGRITY, KNOWLEDGE_GOVERNANCE |

This is a CS2-authorized, Foreman-governed carrier-alignment task. It is qualifying because it changes the IAA contract, canon carrier instructions, integrity material, and may change only direct IAA Tier 2 carrier references. Functional-behaviour-registry obligations do not apply: this task contains no build, AAWP, MAT, product, deployment, or runtime behaviour scope.

### Required carrier model

1. The sole pre-brief carrier is `.agent-admin/assurance/iaa-wave-record-<wave>-<date>.md`, with a non-empty `## PRE-BRIEF` section.
2. Active direct source instructions must create or commit only that carrier. The direct-source audit must demonstrate zero active instructions to create, commit, require, discover, or reference a standalone `iaa-prebrief-*` artifact.
3. The contract, `INDEPENDENT_ASSURANCE_AGENT_CANON.md`, `IAA_PRE_BRIEF_PROTOCOL.md`, and direct carrier-path references in `GOVERNANCE_WATCHDOG_CANON.md` must be mutually consistent with the one-carrier model.
4. Only direct conflicting IAA Tier 2 references found by a scoped source inventory may change. Unrelated Tier 2 content, policy logic, registry entries, and historical material are outside this task.

### Exact permitted scope

The submitted change set must be limited to:

- `.github/agents/independent-assurance-agent.md`;
- `governance/canon/INDEPENDENT_ASSURANCE_AGENT_CANON.md`;
- `governance/canon/IAA_PRE_BRIEF_PROTOCOL.md`;
- direct IAA carrier-path references only in `governance/canon/GOVERNANCE_WATCHDOG_CANON.md`;
- direct conflicting IAA Tier 2 carrier references only;
- `governance/quality/agent-integrity/independent-assurance-agent.md` and `governance/quality/agent-integrity/INTEGRITY_INDEX.md`;
- `governance/CANON_INVENTORY.json` entries only for canon files changed by this task; and
- this lane's manifest, checklist, wave record, current-HEAD scope-gate evidence, producer memory, and CS2 direct-review evidence.

The change set must exclude every #1397 path, provider or global configuration, runtime or workflow behaviour, ECAP, #1395 evidence, and consumer, ISMS, product, MMM, or deployment changes.

### Evidence and validation obligations

- A direct-source inventory must name every active carrier instruction in the permitted sources before and after alignment, including the exact match evidence for standalone paths and wave-record paths.
- The IAA contract YAML must parse successfully. The integrity reference copy must be byte-identical to the changed contract, and `INTEGRITY_INDEX.md` must contain the resulting SHA-256 baseline.
- Each changed canon file must have a correct current SHA-256 in its own `CANON_INVENTORY.json` entry; no unrelated inventory entry may be added, removed, or rewritten.
- The lane manifest, populated wave checklist, this wave record, producer memory, and current-HEAD scope-gate evidence must identify the same issue, wave, producer, and exact changed-path set.
- Current-HEAD scope-gate evidence must compare the declared permitted paths with the actual current-HEAD diff and show no undeclared, stale, or excluded path.
- Evidence must demonstrate replacement consistency: no active standalone creation or commit instruction remains, and the wave-record `## PRE-BRIEF` carrier is named consistently everywhere in scope.

### IAA self-contract exception and later review route

Because `TASK-1399-001` changes the IAA contract, IAA cannot provide a final self-assessment of this task. The required later review sequence is, in order: deterministic independent validation, Foreman QP, then CS2 direct review. The evidence must name this exact sequence and keep its responsibilities distinct. It must not recast any step as an IAA self-assessment, a substitute assurance artifact, a waiver, a readiness declaration, or permission to merge.

### Checklist cross-reference

`TASK-1399-001` is the sole qualifying task in `.agent-admin/waves/wave-1399-current-tasks.md`. Any material task added to that checklist requires a corresponding update to this `## PRE-BRIEF` record before it is represented as within Wave 1399.

## DECLARATION

The requirements above define the disclosed carrier-alignment acceptance obligations for `TASK-1399-001`. They do not expand the CS2-authorized scope and do not constitute an implementation, final assurance, readiness, handover, or merge determination.
