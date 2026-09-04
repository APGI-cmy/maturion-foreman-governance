# IAA PRE-BRIEF — Wave 1396

**Status:** PRE-BRIEF ONLY — not an assurance, readiness, availability, activation, handover, or merge conclusion  
**Authority:** CS2 direction in issue #1396 (2026-09-04)  
**Governing issue:** [#1396](https://github.com/APGI-cmy/maturion-foreman-governance/issues/1396)  
**Checklist:** `.agent-admin/waves/wave-1396-current-tasks.md` at baseline commit `1287e2b4b6656db2d408366ba1c484fc609154b4`  
**Immutable historical boundary:** Closed PR #1395, including every proof, correction, IAA record, rejection package, session-memory record, and artifact within it, is historical context only. It is not current evidence and must not be copied, amended, cited as active positive proof, or otherwise used to satisfy this pre-brief.

## Qualifying task and classification

| Task | Owner | Classification | IAA requirement |
|---|---|---|---|
| `TASK-1396-001` — establish the minimal static, administrative-only ECAP foundation | `CodexAdvisor-agent` | `MIXED`: `AGENT_CONTRACT`, `KNOWLEDGE_GOVERNANCE`, `AGENT_INTEGRITY`, and `AGENT_ADMIN_ARTIFACT` | Mandatory before any final conclusion |

Applicable later-review overlays: `AGENT_CONTRACT`, `KNOWLEDGE_GOVERNANCE`, and `AGENT_INTEGRITY`. The functional-behaviour registry has no applicable runtime/build pattern because this route must remain static and administrative-only.

## Fixed acceptance boundary

The implementation diff may contain **only** these capability paths:

1. `.github/agents/execution-ceremony-admin-agent.md`
2. `.agent-workspace/execution-ceremony-admin-agent/knowledge/index.md`
3. `.agent-workspace/execution-ceremony-admin-agent/knowledge/FAIL-ONLY-ONCE.md`
4. `.agent-workspace/execution-ceremony-admin-agent/knowledge/administrative-evidence-protocol.md`
5. `.agent-workspace/execution-ceremony-admin-agent/knowledge/administrative-output-contract.md`
6. `mcp-servers/agent-bootstrap/agent-ids.js`
7. `mcp-servers/agent-bootstrap/test-bootstrap.js`
8. `governance/quality/agent-integrity/execution-ceremony-admin-agent.md`
9. `governance/quality/agent-integrity/INTEGRITY_INDEX.md`
10. `.admin/pr.json`

Permitted administrative paths are limited to this checklist, this pre-brief, and the three fresh records named in **Current-head eligibility evidence** below. Any other changed path is out of scope and blocks a later final IAA review.

The following are expressly excluded: a reusable Foreman PR-scoped appointment template or route; any #1395 correction/proof series; #1395 IAA artifacts as active evidence; runtime or controller activation; workflows, canons, consumers, ISMS, product, MMM, or other agent changes; and #1389 progress. No artifact may state or imply ECAP availability, readiness, assurance, handover completion, activation, or merge permission.

## Non-recursive acceptance requirements for TASK-1396-001

1. **Authority and ownership.** The producer is `CodexAdvisor-agent`; the fresh producer PREHANDOVER proof explicitly cites issue #1396 as CS2 authorisation for this agent-contract change. No class exemption is claimed.
2. **Static administrative contract only.** The new contract has parseable YAML with a non-empty matching `agent.id`, valid class/version/contract version, substantive role, mission, and administrative-only class boundary; `governance.protocol`, `governance.canon_inventory`, AGCFPP-001 policy reference, blocking merge-gate interface, Tier 2 index reference, four substantive phases, and a constitutional `SELF-MOD-*` prohibition are present. Its body is under 30,000 characters and contains no `secret:` field.
3. **No authority expansion.** The contract permits only administrative validation of field presence, manifest/scope freshness, evidence-path resolution, and commit-state truth. It expressly prohibits substantive build, handover, merge, readiness, or availability decisions; IAA invocation; token or verdict creation; gate waivers; runtime activation; workflow changes; and product/MMM/ISMS actions. It must not embed Tier 2 protocols, templates, or checklists inline.
4. **Complete Tier 2 foundation.** All four named knowledge files exist, are non-empty, versioned, indexed by `index.md`, and cross-reference only the new administrative role and its static boundary. `FAIL-ONLY-ONCE.md` contains administrative anti-repeat rules; `administrative-evidence-protocol.md` defines deterministic evidence-path/field/commit-state checks; and `administrative-output-contract.md` defines bounded administrative output without token, verdict, readiness, availability, or activation language.
5. **Bootstrap identity and regression coverage.** `agent-ids.js` makes `execution-ceremony-admin-agent` a required canonical bootstrap identity and maps it to its exact contract path without replacing or weakening existing required IDs or aliases. `test-bootstrap.js` has a deterministic assertion that this exact identity resolves to the new contract, its YAML identity is `execution-ceremony-admin-agent`, and the contract is readable. `node mcp-servers/agent-bootstrap/test-bootstrap.js` exits zero on the final current head.
6. **Integrity atomics.** The integrity reference copy is byte-for-byte identical to `.github/agents/execution-ceremony-admin-agent.md`; its SHA256 is recorded accurately in `INTEGRITY_INDEX.md`; no existing integrity row is removed or altered except as required to add this new agent; and the producer records CS2 issue #1396 authority for the integrity update.
7. **Fresh manifest.** `.admin/pr.json` identifies issue `1396`, owner `CodexAdvisor-agent`, `requires_iaa: true`, CS2 as merge authority, this exact fixed scope, the static-administrative objective, and the exclusions above. It contains no #1395-derived proof, token, correction, or success claim.
8. **No excluded behaviour or scope.** Current-head checks show no changed files outside the fixed and permitted administrative paths, no reusable Foreman appointment path/template, no runtime/controller/consumer/workflow/canon/ISMS/product/MMM change, no #1389 work, and no prohibited claim language in new ECAP foundation artifacts.

## Current-head eligibility evidence

Before requesting a later final IAA review, the producer must commit these new, replacement-specific records on the same reviewed head:

1. `.agent-admin/evidence/issue-1396-current-head-eligibility.md` — records the exact `HEAD` SHA, merge-base used for comparison, complete `git diff --name-only <merge-base>...HEAD` list, exact manifest scope list, and an equality result; records the exact contract character count; records SHA256 values for both the contract and integrity copy and their equality; records the index SHA256 value; records the exact bootstrap test command and zero exit result; and records explicit zero-match results for each excluded category and prohibited availability/readiness/assurance/activation claim.
2. `.agent-admin/gates/gate-results-issue-1396-ecap-foundation.json` — binds the same `HEAD` SHA and records command, exit code, and PASS/FAIL result for `merge-gate/verdict`, `governance/alignment`, and `stop-and-fix/enforcement`. A missing, non-zero, stale-head, or unbound result is ineligible.
3. `.agent-admin/prehandover/prehandover-proof-1396.md` plus a fresh CodexAdvisor session-memory artifact — cites this pre-brief and checklist; declares the task complete only after its checklist entry is `[x]`; contains the AGCFPP-001/issue #1396 authorisation, all current-head evidence above, before/after contract character counts and hashes, a non-blank OVL-AC-012 ripple assessment, a no-runtime/no-activation statement, and an IAA field marked `PENDING` (not a token or verdict). These artifacts are fresh for #1396 only and must not reuse #1395 content.

The later review is eligible only when the Wave Checklist Invocation Gate passes: this canonical checklist exists, has no remaining `[ ]` task, is referenced by the fresh PREHANDOVER proof, and declares `wave_checklist.status: ALL_TICKED`. Eligibility is evidence sufficiency only; it makes no assurance, readiness, activation, or merge determination.

## Pre-brief outcome

`TASK-1396-001` is the sole qualifying replacement task. This document declares the bounded foundation and later-review evidence requirements only. It creates no ECAP appointment path, does not activate any capability, and does not issue a final IAA artifact.
