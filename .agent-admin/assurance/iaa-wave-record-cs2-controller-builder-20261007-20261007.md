# IAA Wave Record — Wave cs2-controller-builder-20261007 — Bounded contract authoring

## PRE-BRIEF

**Producer**: independent-assurance-agent

**Wave**: cs2-controller-builder-20261007

**Date**: 2026-10-07

**Wave Task List**: `.agent-admin/waves/wave-cs2-controller-builder-20261007-current-tasks.md`

**Authority**: `governance/canon/IAA_PRE_BRIEF_PROTOCOL.md` v1.3.0

**Status**: ACTIVE — acceptance declaration only; not assurance or release approval

**IAA Session**: IAA-20261007-PR1415-PREBRIEF; sequential memory session-046

**Invocation source**: explicit user PRE-BRIEF instruction using the committed Foreman checklist

**Issue / PR**: #1414 / #1415 — Establish canonical automation-control builder for CS2 controller work

**Input HEAD**: `b5f707698ff2cd5a7e145e4a5acd671f063a175d`

**Branch**: `copilot/establish-canonical-automation-control-builder`

**Comparison base**: `origin/main`, `68f3f0525060ec7115414af16b0931e54fae1344`

**Input changed-file count**: 19, before this session's independent artifacts and memory rotation

**Submitting agent**: CodexAdvisor-agent / overseer / session-017-20261007

**Responsible supervisor**: foreman-v2

**Independence**: CONFIRMED — IAA did not author or amend the contract or submitting-agent evidence.

### Wave summary and timing

This wave has one contract-authoring task: a proposed automation-control builder
contract, minimum Tier 2 knowledge and an atomic proposed integrity reference.
The controller implementation, activation, registration and consumer layer-down
are outside this delivery. Authoring preceded checklist creation and this
PRE-BRIEF; this declaration is prospective for the remaining correction/QP and
later assurance work, not a retroactive wave-start compliance claim.

The input checklist exists and is populated, with the task still `[ ]` and
`qp_verdict: PENDING`. The earlier gate-only rejection remains operative.
The final-assurance invocation gate is NOT being executed in this planning
action: a pending checklist is valid PRE-BRIEF input, not final review admission.
No ASSURANCE-TOKEN, new final verdict or Phase 1–4 substantive PASS is issued.

This file is the sole PRE-BRIEF carrier. It uses the exact expected wave-record
path already declared in the checklist and explicitly requested by the caller.
No standalone pre-brief is created. The Foreman contract's older standalone-path
references are not rewritten or silently treated as reconciled; the responsible
Foreman/CS2 must record their applicability disposition before final handover.
The immutable Foreman proof's historical NOT_PUBLISHED state is not edited;
subsequent publication/readiness evidence belongs in a new artifact.

### Per-task assurance declaration

| Field | Declaration |
|---|---|
| task_id | TASK-cs2-controller-builder-20261007-001 |
| task_summary | Deliver the bounded cs2-controller-agent contract-authoring bundle: draft contract, minimum Tier 2 knowledge and proposed integrity reference. |
| iaa_trigger_category | T1 / AGENT_CONTRACT, with AGENT_INTEGRITY and KNOWLEDGE_GOVERNANCE; current PR also contains AGENT_ADMIN_ARTIFACT. MIXED, mandatory later IAA. |
| required_phases | Delivery proof phases 1 Preflight, 2 Governance, 3 Working, 4 Handover; independent final IAA only after resubmission and checklist gates clear. |
| applicable_overlays | AGENT_CONTRACT: OVL-AC-001–012; AGENT_INTEGRITY: OVL-AI-001–003; KNOWLEDGE_GOVERNANCE: OVL-KG-001–005; admin coherence checks in core/canon. Use named checks from overlays v2.3.0, not invented A–G letter mappings. |
| FFA applicability | T1 FFA-01 Delivery Completeness and FFA-03 Cross-Delivery Integration, applied to the inactive contract/knowledge bundle. FFA-02/04/05 runtime, API and Supabase checks are not required by this authoring-only task. No controller implementation or live runtime test success is implied. |
| specific_rules | CORE-001–022 where applicable; INV phase/integrity/traceability/learning families; A-001–006, A-015–018, A-020–030 as triggered; CHECKLIST-GATE-001–005; INV-405 is blocking. |
| task disposition | PENDING; no QP PASS, tick, descope, new appointment or implementation permission. |

### Required evidence artifacts

**Delivered sources to inspect at the later final source**, not accepted merely
because present:

- `.github/agents/cs2-controller-agent.md`
- `governance/quality/agent-integrity/cs2-controller-agent.md`
- `governance/quality/agent-integrity/INTEGRITY_INDEX.md`
- `.agent-workspace/cs2-controller-agent/knowledge/index.md`
- `.agent-workspace/cs2-controller-agent/knowledge/FAIL-ONLY-ONCE.md`
- `.agent-workspace/cs2-controller-agent/knowledge/controller-build-method.md`
- `.agent-workspace/cs2-controller-agent/knowledge/domain-flag-index.md`
- `.agent-workspace/cs2-controller-agent/knowledge/specialist-registry.md`

**Existing immutable context** to retain and cross-reference:

- `.agent-workspace/CodexAdvisor-agent/memory/PREHANDOVER-session-017-20261007.md`
- `.agent-workspace/CodexAdvisor-agent/memory/session-017-20261007.md`
- `.agent-admin/quality-professor/qp-verdict-1415-20261007-060336.md`
- `.agent-admin/prehandover/proof-1415-20261007-060336.md`
- `.agent-admin/gates/gate-results-1415-20261007-060336.json`
- `.agent-admin/assurance/rejection-package-1415.md`
- `.agent-workspace/independent-assurance-agent/escalation-inbox/rejection-tracking-1415-20261007.md`
- `.agent-admin/waves/wave-cs2-controller-builder-20261007-current-tasks.md`
- `.agent-admin/assurance/iaa-wave-record-cs2-controller-builder-20261007-20261007.md`

**New final-review inputs required** (planned paths, NOT existing evidence or
instructions to IAA to author the submitter's proofs):

- `.agent-admin/evidence/preflight-proof-1415-r1.md`
- `.agent-admin/evidence/governance-proof-1415-r1.md`
- `.agent-admin/evidence/working-proof-1415-r1.md`
- `.agent-admin/evidence/contract-acceptance-1415-r1.md` — task-specific approved design, acceptance/RED-to-GREEN mapping and raw command results.
- `.agent-admin/evidence/prerequisite-disposition-1415-r1.md` — resolvable independent #1380 then #1379 evidence, not a self-issued waiver.
- `.agent-admin/evidence/rejection-acknowledgement-1415-r1.md` — delivery and CodexAdvisor acknowledgement.
- `.agent-admin/quality-professor/qp-verdict-1415-r1.md` — independent Foreman QP and corresponding new session-memory reference.
- `.agent-admin/gates/gate-results-1415-r1.json` — individual task/source-bound gate evidence.
- `.agent-admin/prehandover/proof-1415-r1.md` — new immutable final-handover proof.
- `.agent-admin/assurance/correction-addendum-session-017-wavecs2-controller-builder-20261007-20261007.md` — A-030 resubmission mapping; new requested IAA session must be explicit.
- `SCOPE_DECLARATION.md` — exact current diff in plain path-list format.

Equivalent newly committed, source-bound artifacts may consolidate these
functions, but the final handover must explicitly map every requirement below
to its exact committed path/section and raw evidence. If names/session/date or
material scope change, record the final binding without mutating an earlier
proof; a material acceptance change requires an append-only PRE-BRIEF amendment
in this same record. No future token is assumed to exist.

### Exact acceptance criteria for later final assurance

Every row is a requirement, NOT a current PASS finding. Later IAA must record
each row as met or unmet, with corroborating evidence, after admission gates.

| ID | Substantive acceptance criterion and evidence |
|---|---|
| PB-01 — Authority and separation | Document explicit CS2 authority for the specific CodexAdvisor contract creation and atomic integrity change, with the issue/instruction and authorized author. Diff must show no unauthorized contract writer, informal extension to pit-specialist/integration-builder, IAA self-assurance or Foreman implementation. The name cs2-controller-agent must confer no human/interim/active-CS2 authority. Verify CORE-017, A-005 and OVL-AI-001; proxy intent or a proposed index entry is not by itself final CS2 approval. |
| PB-02 — Exact write authority | Parse YAML with duplicate keys rejected; both scope.write_paths and scope.write_access must resolve to exactly the five patterns listed below, with no extras or alternative grants elsewhere in YAML/body/Tier 2. Positive fixtures admit only these surfaces; negative fixtures reject another script/workflow, agent contract, CANON/inventory, .agent-admin and .agent-workspace write, traversal, escaping symlink and indirect tool output. Evidence, dependencies, logs, tests and housekeeping must not introduce a sixth exception. |
| PB-03 — Appointment and RED before implementation | Contract and build method must require explicit Foreman appointment, frozen architecture, repository/PR/branch/head, acceptance criteria and Foreman-accepted reproducible QA-to-RED before any controller implementation. Acceptance must be recorded, not inferred from contract existence. Missing appointment/design/RED blocks work. Demonstrate these enforceable clauses with line references and task-specific acceptance checks; do not fabricate an appointment or require implementation in this authoring wave. |
| PB-04 — Fail-closed envelope | Missing, invalid, stale, contradictory or unavailable authorization/evidence/dependencies must deny action without side effects, fallback-to-allow, reset or resume. Contract/Tier 2 must require positive and negative offline/mocked tests for these states in later appointed work. The contract-authoring validation must verify every state and prohibition is mandatory and consistent; it must not claim the still-unbuilt controller has run those regressions. |
| PB-05 — Reserved operations | Activation/enabling active-CS2, live dispatch/trigger publication, merge/direct main push, deployment, successor release, automatic reset, spend telemetry and protected CANON self-amendment must all remain prohibited. Reject scope or workflow mechanisms that indirectly enable them; no appointment, QP, IAA token or available credential can override these limits. Verify YAML, phases and every Tier 2 file together. |
| PB-06 — Regression ownership and independent route | Require accepted RED-to-100%-GREEN, focused unit and mocked workflow-integration regressions, denial/error/no-live-side-effect coverage, zero skipped/disabled/weakened tests and zero warnings/errors in applicable static gates. Non-applicable gates need recorded Foreman acceptance. Foreman owns QP, PRE-BRIEF, IAA invocation and rejection re-invocation; builder cannot directly assure its own work/contract, modify any contract/reference or issue a token. Unavailable independent review keeps the delivery blocked. |
| PB-07 — Executable contract structure | Strict frontmatter must validate with zero duplicate keys/warnings/errors, required identity/governance/prohibition/oversight/merge fields non-empty, semver versions coherent, constitutional self-mod lock and four complete evidence-producing phases. Read identity from YAML; no Tier 2 procedure inlining or unimplemented placeholders. Contract must be under 30,000 characters, with before/after counts and hashes (new file: before absent/0). AGCFPP-001 policy reference must satisfy OVL-AC-001. CORE-022/A-024 require secret_env_var rather than any secret field throughout the new contract; governance and root execution-identity declarations must agree. |
| PB-08 — Minimum Tier 2 and evidence containment | All five listed knowledge files must exist, be indexed, versioned and substantive, and match the contract's appointment/RED/inactivity/independence/scope rules. Verify all required-file references resolve. Evidence/memory/RCA/improvements stay beneath .github/cs2-controller/evidence/cs2-controller-agent/; last-five memory/archival handling must not grant protected-workspace writes. Registry/domain flags must remain inactive/unregistered until separately authorized completion. Apply OVL-KG-001–005; newly created files need initial version/date, later changes need bumped versions/history/index consistency. |
| PB-09 — Atomic proposed integrity, not activation | At the actual final source, compute full SHA256 of the live contract, byte-compare its reference and verify the matching index entry in the same PR, with explicit CS2 authorization for the change. Also verify the four existing approved baselines for silent drift. Preserve prior entries. An INACTIVE_UNASSURED proposed hash is provenance only, not an approved active baseline, commissioning or assurance. Any drift/unauthorized change blocks later verdict. |
| PB-10 — Independent canonical prerequisites | Provide independent applicable-process disposition for #1380 provenance/UTF-8/full inventory validation, then #1379 restored runtime-specialist method and real CodexAdvisor .md wake-up/bootstrap, strict YAML and parity. Evidence must bind immutable commits/PRs and actual independent outcomes; run current full-history CANON-HASH-001 and verify loaded canon hashes against inventory. Local hash success, restored files, old tokens or issue state alone do not discharge either prerequisite. No dependent final-source assurance, consumer delivery or appointment proceeds while these are unresolved. |
| PB-11 — Task-specific QP inputs | Supply the contract-authoring design reference and reproducible requirement-to-validation evidence, including accepted task-specific RED evidence and corresponding 100%-GREEN command output/counts/exit codes/zero-debt result, or an explicit CS2 applicability disposition accepted by Foreman for this non-runtime authoring task. Author S1–S11 summaries and generic gate-script success are not independent QP. Foreman then conducts independent QP and records its actual PASS and new session memory before ticking. No controller production implementation is required to manufacture this evidence. |
| PB-12 — Checklist and Pre-Brief admission | Foreman retains the exact task ID. A discrete QP-PASS tick commit must precede final invocation; no pre-tick, silent removal or manufactured descope. A valid [~] needs authorized deferral/descope and reason, and cannot count as delivered capability. New handover must reference this checklist and this record's PRE-BRIEF, status ALL_TICKED, pending none and explicit descoped reasons. Cross-reference all qualifying tasks both ways; any material added task requires a dated numbered amendment here. Apply CHECKLIST-GATE-001–005 before substantive review. |
| PB-13 — Prior rejection delivery/resubmission | Retain rejection-package-1415.md unchanged. Evidence must confirm routed delivery and CodexAdvisor acknowledgement; Foreman's acknowledgement is not its substitute. A new correction addendum maps every prior remediation item to committed evidence and identifies a fresh requested IAA session. Re-entry is Phase 2 Step 2.4 — Wave Checklist Invocation Gate; unresolved remediation or acknowledgement blocks resubmission before Phase 3. This PRE-BRIEF does not count as resubmission or close the rejection. |
| PB-14 — Four-phase substantive proofs | New proofs must demonstrate submitter identity/versions, loaded Tier 1/Tier 2, FAIL-ONLY-ONCE, prohibitions and constraints; delivery-specific canon versions/full hash validation/authority/gates/ripple; design rationale, alternatives, issue/wave traceability and risks; and truthful GREEN/OPOJD/zero-debt handover only after prerequisites and QP. Map every PB row to evidence. Preserve preparatory proofs; no boilerplate or author self-certification substitutes for independent checks. |
| PB-15 — Source binding and real parity | Bind the final bundle to the exact clean committed/published source; reconcile local HEAD with PR HEAD and declare all diff files, including independent artifacts/archived memories. Record commands, outputs, exit codes and per-check CI/log references for all applicable gates listed below, plus the current workflow inventory. Missing check implementations or CI results require actual resolution or explicit authorized applicability disposition, not invented parity. INV-405 blocks handover; a generic three-check aggregate is insufficient. |
| PB-16 — Coherence, token hygiene and finality | New handover, QP, gates, scope, session memory and checklist must agree on job/task/head/versions/paths and actual state. Record PRE-BRIEF publication without rewriting historical NOT_PUBLISHED or rejected evidence. Park improvement notes outside delivery artifacts. Prior rejection must never be cited as PASS; no anticipated token is an issued result. Final IAA owns its dedicated new verdict file, with actual PR/session/wave binding and later ceremony coherence. Apply active-bundle ACR checks; no partial approval. Keep draft/inactive until the real prerequisites are met; CS2 alone retains merge authority. |
| PB-17 — Completeness without release overclaim | FFA-01 must confirm a complete bounded contract/knowledge/reference unit, not a commissioned controller. FFA-03 must confirm no regression of existing contracts/authority/gates and independently resolved dependencies. Assess OVL-AC-012 cross-agent/ripple effects, identifying affected agents and later governance-owned delivery obligations or justified no immediate ripple; no consumer layer-down is executed or certified by this wave. Fresh final-source assurance, normal canonical layer-down and explicit ISMS Foreman appointment remain necessary before use on existing W0 PR #2061, not a new W0 PR. |

#### Exact five-pattern builder allowlist (PB-02)

1. `.github/scripts/pit-cs2-controller.js`
2. `.github/scripts/pit-cs2-controller.test.js`
3. `.github/scripts/pit-cs2-controller-workflow.test.js`
4. `.github/workflows/pit-cs2-controller.yml`
5. `.github/cs2-controller/**`

#### Minimum per-check final parity inventory (PB-15)

- `Merge Gate Interface / merge-gate/verdict`
- `Merge Gate Interface / governance/alignment`
- `Merge Gate Interface / stop-and-fix/enforcement`
- `Governance Ceremony Gate / governance-ceremony/draft-check`
- `Governance Ceremony Gate / governance-ceremony/verdict`
- `POLC Boundary Validation / foreman-implementation-check`
- `POLC Boundary Validation / builder-involvement-check`
- `POLC Boundary Validation / session-memory-check`
- `Evidence Bundle Validation / prehandover-proof-check`
- Applicable current agent-contract audit, strict YAML, CANON-HASH-001,
  scope/evidence consistency and independent-assurance checks discovered from CI.

The first five are the proposed builder's declared checks; the three Merge Gate
checks are also IAA's. The four POLC/Evidence checks are in the current Foreman
gate record. Their existence or execution is not inferred from these names.
Foreman must reconcile actual CI semantics, including draft-to-ready sequencing,
without allowing the inactive builder to change gates or perform live operations.

### Present planning observations and remaining holds

- The carrier absence addressed by this session is not all rejection remediation.
  QP remains PENDING and the task remains `[ ]`; CHECKLIST-GATE-002 and
  CHECKLIST-GATE-004 remain uncleared. The current BLOCKED addendum is not the
  new final-handover/reference required by CHECKLIST-GATE-003/004.
- The current proposed contract at input HEAD contains `execution_identity.secret`
  at line 167, whereas CORE-022/A-024 require `secret_env_var` (PB-07).
  This is a specific correction needed before later acceptance, not a secret-value
  disclosure, completed contract audit or new final-assurance verdict.
  Only authorized CodexAdvisor/CS2 may make the correction and atomic reference update.
- QP design/accepted task-specific QA and verifiable GREEN evidence or explicit
  CS2 applicability disposition are absent from the current QP record.
- CodexAdvisor rejection acknowledgement and confirmed external delivery remain
  unverified. Foreman's acknowledgement is recorded, not substituted.
- #1379 and #1380 were open when queried; the #1379 CS2 comments still hold final
  IAA/merge pending #1380. No independent discharge was supplied here.
- Final phase proofs, task/source-bound full parity/OPOJD, final scope and active
  bundle coherence are not established; Foreman carrier-applicability clarification
  remains for its stale contract references.
- GitHub PR #1415 returned remote head `3bb28974482cb204baa92fae00466f6abc73e9a6`,
  older than input HEAD. This is a local committed-source PRE-BRIEF, not assurance
  of that remote snapshot or evidence of publication/synchronization.
- Registration, commissioning, controller activation, dispatch, merge, deployment,
  successor release and consumer layer-down remain unperformed/unapproved.

## Declaration

The requirements above are the acceptance criteria IAA will verify at a later
valid handover. Meeting every criterion is necessary but not sufficient for an
ASSURANCE-TOKEN; intelligence-led review may identify additional issues, which
must be explicitly recorded, not silently introduced. All applicable core and
overlay checks must be satisfied; any final-review finding blocks acceptance.

This is a PRE-BRIEF planning declaration, not a partial verdict, advisory token,
final-source assurance, QP PASS, prerequisite waiver or permission to merge/use
the capability. The existing rejection remains operative.
The original PRE-BRIEF is immutable on publication; amendments must be dated,
numbered append-only subsections of this same wave record.

**IAA signature**: IAA-20261007-PREBRIEF-WAVEcs2-controller-builder-20261007
