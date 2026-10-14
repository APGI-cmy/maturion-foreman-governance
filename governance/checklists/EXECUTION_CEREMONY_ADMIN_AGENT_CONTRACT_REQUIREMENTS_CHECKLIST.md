# Execution Ceremony Administrator Contract Creation Checklist

**Status:** Canonical class-matched creation checklist — published by governance-repo-administrator under Human-CS2 approval; not a QA verdict, IAA verdict/token, administrative acceptance or activation
**Version:** 1.0.0
**Date:** 2026-10-14
**Canonical path:** governance/checklists/EXECUTION_CEREMONY_ADMIN_AGENT_CONTRACT_REQUIREMENTS_CHECKLIST.md
**Scope:** Creation or update of the execution-ceremony-admin-agent administrator contract and its inactive knowledge/integrity bundle.
**Authority:** CS2 (Johan Ras) — Human-CS2 approval "Approve the three-path prerequisite repair." recorded in issue #1414 comment 6150615330, answering proposal comment 6148570092.
**Provenance:** Requirement rows are the complete approved 27-row draft from issue #1414 comment 6148570092 (draft SHA256 `4e84b2d5a1f182773c3ea52283e049da19cbfde20693646f6bde8ac3370ccab5`). Published on PR #1415 under task TASK-cs2-controller-builder-20261007-002, parent job `job-CS2-AUTOMATION-W1-W2-20261008`. Existing class checklists are not CANON_INVENTORY entries; this file is not a CANON_INVENTORY entry.

## Canonical inputs and applicability

Apply the current CodexAdvisor factory contract and all applicable common non-negotiable gates; AGENT_CONTRACT_ARCHITECTURE, AGENT_CREATION_BUNDLE_REQUIREMENTS, AGCFPP-001, THREE_TIER_AGENT_KNOWLEDGE_ARCHITECTURE, AGENT_PREFLIGHT_PATTERN, AGENT_HANDOVER_AUTOMATION, EVIDENCE_ARTIFACT_BUNDLE_STANDARD, INDEPENDENT_ASSURANCE_AGENT_CANON and IAA_PRE_BRIEF_PROTOCOL. Use their actual loaded versions and inventory hashes. Current governance/CANON_INVENTORY.json versions at publication: AGENT_CONTRACT_ARCHITECTURE 1.1.0; AGENT_CREATION_BUNDLE_REQUIREMENTS 1.0.0; AGCFPP-001 (AGENT_CONTRACT_FILE_PROTECTION_POLICY) 1.0.0; THREE_TIER_AGENT_KNOWLEDGE_ARCHITECTURE 1.0.1; AGENT_PREFLIGHT_PATTERN 1.0.0; AGENT_HANDOVER_AUTOMATION 1.7.0; EVIDENCE_ARTIFACT_BUNDLE_STANDARD 1.0.0; INDEPENDENT_ASSURANCE_AGENT_CANON 1.10.0; IAA_PRE_BRIEF_PROTOCOL 1.3.0.

The class-specific requirements come from EXECUTION_CEREMONY_ADMINISTRATION_PROTOCOL (ECAP-001), execution-ceremony-admin-checklist, execution-ceremony-admin-reconciliation-matrix and execution-ceremony-admin-anti-patterns (EXECUTION_CEREMONY_ADMINISTRATION_PROTOCOL 1.2.0; checklist, matrix and anti-patterns under governance/checklists/). This is an administrator creation checklist, not a Specialist or governance-liaison authority substitution. It does not copy either role's product, CANON-writing or ripple-maintenance authority into ECAP.

Every applicable row must have exact contract/knowledge line references and actual validation evidence. A missing requirement fails creation QP. Any true applicability conflict must be exposed for authorized disposition; it cannot be silently omitted. This checklist creates no exemption from common factory, independent IAA, immutability or merge gates.

## Common factory conformance

| ID | Mandatory requirement |
|---|---|
| CRE-01 | Explicit CS2 authority identifies the target, repository, source branch and permitted paths; creator uses its real factory identity and permitted publisher route. |
| CRE-02 | Strict YAML rejects duplicate keys; required current factory top-level sections are complete; name/id/filename agree, class is administrator, versions/provenance are coherent. Use secret_env_var for the environment variable name, never secret values or stale template secret fields. |
| CRE-03 | All four executable phases exist, force phase evidence, load the full own contract, required Tier2 and applicable canon before job context; placeholder/degraded or missing prerequisites halt. |
| CRE-04 | Actual character count is under30000; apply25000 warning/reduction; keep expanded procedures in Tier2. No missing required sections, TODOs or bulk Tier2 in Tier1. |
| CRE-05 | Own-contract writing/self-modification is prohibited, including indirect tools/symlinks; read access never supplies write authority. |
| CRE-06 | All current CodexAdvisor S1–S11 and other applicable common source requirements are mapped and evaluated. QP reruns after actual changes; a summary is not independent assurance. |
| CRE-07 | Required target knowledge files exist, are substantive, indexed, versioned and match the contract. Record inactive/unregistered and uncompleted commissioning/registry/routing obligations truthfully; do not assert active creation completeness or add unauthorized registration paths. |
| CRE-08 | Source/reference are byte-identical with an actual full SHA256 in the integrity index; preserve other baselines and publish related source/copy/index atomically. |
| CRE-09 | Actual scope/manifest/task/source/author evidence agree, with complete diff enumeration, ordinary owned records and clean published source. Preserve historical rejected proofs; do not refresh heads merely for evidence. |

## Administrator-only ECAP conformance

| ID | Mandatory requirement |
|---|---|
| ADM-01 | Repository is APGI-cmy/maturion-foreman-governance. Role is ceremony administration only; no product/controller builder, Foreman, IAA, governance-liaison/CANON writer or human-CS2 authority. |
| ADM-02 | Write scope is only this role's own repository workspace. Reads cover the actual appointed task's required canon/source/owner artifacts and bootstrap; read/write scopes and all phase instructions agree. No hidden workspace, global tool-output or protected-file write exception. |
| ADM-03 | A real Foreman per-job appointment supplies job/wave/task, repository/PR/branch/source, exact ceremony scope and expected return. Substantive acceptance precedes ordinary appointment; missing/stale/contradictory appointment returns a blocker. |
| ADM-04 | Foreman retains orchestration, substantive readiness, supervisory administrative verification and later final IAA invocation. ECAP does not adjudicate substantive correctness or absorb these responsibilities. |
| ADM-05 | Duties implement ECAP-001§3.5–3.9: final-state normalization, template non-leakage, active-bundle scope, carried-claim resolution, artifact completeness, reconciliation, commit-state truth, actual per-check evidence and applicable ripple/registry recording. |
| ADM-06 | Load and use the existing canonical completeness checklist, reconciliation matrix, anti-patterns and templates. Missing artifacts, inconsistent heads/statuses, unverifiable claims or substantive changes return to Foreman; they are not fabricated or silently repaired outside scope. |
| ADM-07 | Per-PR scope compatibility is explicit. Canonical owner publication is requested through the appointed owner/proxy when outside ECAP workspace; ECAP returns exact owned payloads and does not silently write canonical .agent-admin records. |
| ADM-08 | PREHANDOVER/session/proof and prior rejection chronology remain immutable as required; corrections use new/append-only evidence with actual dates/source/producer, not fictional historical pre-briefs or changed verdicts. |
| ADM-09 | IAA owns its canonical wave record and verdict/token; ECAP cannot create, modify, publish or issue IAA artifacts, invoke final IAA, self-assure or clean up an IAA rejection on IAA's behalf. Preserve canon's token limitations and expose any conflicting inventory requirement rather than invent permission. |
| ADM-10 | Maintain the three-layer separation: ECAP normalizes, Foreman verifies, IAA independently audits. The specific human bootstrap exception for PR1415 is recorded externally as a one-time approved review route, not generalized in this role contract. |
| ADM-11 | Return an explicit administrative handback with exact files/hashes/source/checks, scope/completeness, residual blockers and out-of-scope items. Administrative readiness, Foreman QP and independent verdict are distinct and never inferred from a planning record. |
| ADM-12 | OPOJD rejection means continued STOP_AND_FIX ownership. No automatic pass, retry-budget/counter reset, successor job, generic runtime dispatch, merge, deployment, CS2 activation or fabricated ledger spend. |

## Review and release conformance

| ID | Mandatory requirement |
|---|---|
| REV-01 | Foreman records the new qualifying task before the applicable independent IAA append-only pre-brief amendment. Only actual IAA writes its wave record; prior declared criteria and chronology are preserved. |
| REV-02 | Creator source QP and substantive Foreman acceptance use actual affected source/check evidence. Full-history CANON-HASH-001 and applicable static/parity checks pass without weakening missing-history validation. |
| REV-03 | For PR1415's approved bootstrap only, prepare a concrete complete original-author administrative packet and await actual human-CS2 administrative acceptance; authoring approval is not acceptance. |
| REV-04 | Final independent IAA occurs only after actual earlier-stage admission and complete committed input bundle. Its real token/verdict is required; a code review, model test or author QP cannot replace it. |
| REV-05 | Keep draft/CONTRACT_READY-INACTIVE until real independent assurance and the separate human merge decision. Normal named dispatcher availability requires actual installed default-branch profile; branch file existence is not live availability or wave completion. |
| REV-06 | Record authorized later layer-down, commissioning/routing and real activation obligations separately. No new App/issuer identity, administrator capability or consumer access is inferred from source creation. |

## Required creator record

The creator returns one complete row-per-requirement evidence matrix with PASS/FAIL and actual source references, character counts, strict YAML/common-gate output, loaded canon versions/full-history validation, exact reference hash/copy verification, actual diff scope, pre-brief/task mapping and residual release obligations. Every FAIL remains STOP_AND_FIX; future human administration/final IAA/merge results remain PENDING until they actually happen.
