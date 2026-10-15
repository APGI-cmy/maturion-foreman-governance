---
proposal_id: PROPOSAL_2026-10-15_ADMINISTRATION_SYSTEM_DESIGN
proposal_schema_version: v1.0
design_version: 0.1.0
proposal_state: REVIEW
change_classification: BREAKING_CHANGE
normative: false
runtime_status: NOT_IMPLEMENTED_BY_THIS_PROPOSAL
rollout_status: NOT_STARTED
parent_job_id: job-CS2-AUTOMATION-W1-W2-20261008
parent_alias: CS2-AUTOMATION-W1-W2-20261008
---

# Governance Change Proposal: Administration System Design and Controlled Migration

## 1. Proposal Metadata

- **PROPOSAL_SCHEMA_VERSION**: v1.0.
- **Proposal ID**: PROPOSAL_2026-10-15_ADMINISTRATION_SYSTEM_DESIGN.
- **Proposal Date**: 2026-10-15; user timezone Africa/Johannesburg.
- **Proposer**: Johan, Human CS2.
- **Proposer Identity**: Johan Ras; prepared by Codex as his directly instructed local design author, without claiming a named project-agent role.
- **Proposal State**: REVIEW; design preparation is authorized, design acceptance and rollout completion are not asserted.
- **Change Classification**: BREAKING_CHANGE in aggregate; individual corrections must still be classified separately.
- **Affected Governance Artifacts**: the canon, schema, gate, template, contract and knowledge families mapped in sections 4, 6 and 9. This work package adds this proposal; it changes none of those governing sources.
- **Affected Repositories**: the governance authority and its intended consumers; the actual local/registered inventory discrepancy is recorded in section 4.3.
- **Priority**: HIGH.
- **Target Completion Date**: review-driven; no implementation deadline or new runtime allowance is invented.
- **Implementation Tracking**: local review checkpoints under this same proposal and parent identity; no new issue or PR is required for this first work package.

### 1.1 Direct instruction and first handover

On 2026-10-15 Johan instructed local work against his cloned repositories, without creating issues or PRs; first produce the administration-system design in governance, return it for review, iterate, and then implement and layer down accepted corrections at logical handover intervals. Existing open PRs are to be reconsidered after the new process is accepted and rolled out.

This supersedes an assumption that a GitHub issue/PR is the mandatory transport for this local design job. It does not turn this draft into installed governance, an ECAP acceptance, an IAA verdict, permission to impersonate an independent reviewer, or an activated controller. Future execution must follow Johan's design-first review sequence.

The request to design a “perfect” system is interpreted as an explicit, testable and repeatedly reviewed design target. No document can prove absence of every possible defect. Acceptance means that the enumerated requirements and adversarial cases pass, open uncertainties are disclosed, and the human accepts the identified revision.

### 1.2 Reading and review order

Read section 2 for the operating model, section 3 for the demonstrated problems, section 5 for the design, section 7 for safe migration, and section 10 for the acceptance tests. Review one version at a time. Record requested changes against requirement or finding IDs; do not restart the parent job or overwrite an earlier verdict.

## 2. Change Summary

### 2.1 Executive Summary

Make administration an executable, stage-aware process that assembles truthful evidence and permits the next authorized action. It must not require a future action's result to authorize the action that creates its inputs.

Reconcile and implement the existing approved architecture rather than create a parallel governance constitution or a second job ledger. Preserve substantive QA, independent assurance, human release authority, immutable historical evidence, role boundaries, generic repository adapters and conserved job-level accounting. Replace inconsistent enforcement and repeated manual transcription.

### 2.2 Change Scope

Areas planned for subsequent, separately reviewed implementation:

- Canon and procedural policy: resolve contradictory sequencing and define the local CS2-directed transport.
- Schemas: represent stage applicability, truthful intermediate results, local subjects and unknown accounting without fabricated values.
- Gate definitions: validate the attempted transition's actual requirements, with final assurance enforced at its proper stage.
- Templates and generated views: derive current summaries from authoritative evidence; never rewrite historical owner outputs.
- Tier 1 contracts: align obligations, permitted inputs, outputs, publication route and role boundaries.
- Tier 2 knowledge: make ECAP and IAA expert users of the accepted lifecycle, evidence and failure models.
- Tier 3 context: bind each invocation to a validated repository/job/wave/stage/source/policy envelope.
- Local and hosted adapters: use the same requirements with accurately identified execution and publication mechanisms.

This proposal does not implement generic runtime authority, install an app, acquire credentials, activate dispatch, change an approved budget, close a parent job, merge anything, or retrofit PASS into an earlier rejection.

### 2.3 Expected Benefit and Success Metrics

The system should reach a lawful next stage, or return one precise blocked result with an owner and a real resumption condition.

Measure correctness by these criteria:

1. Every required predecessor is available before its dependent transition; no prerequisite cycle exists in an accepted plan.
2. Repeated identical observations create zero repeated external actions.
3. A legitimate correction resumes the affected stage without discarding unfinished obligations.
4. Final handover and release remain impossible without their actual required approvals.
5. Every accepted claim resolves to an authenticated owner output and exact reviewed input.
6. Every planned output has an authorized producer and a working publication route before dispatch.
7. A restart or repository migration neither duplicates an uncertain action nor resets accounting.
8. All intended consumers acknowledge the same accepted release through actual parity evidence.

## 3. Trigger and Evidence

### 3.1 Trigger and Evidence Classification

**Trigger**: FAILURE_PATTERN and GOVERNANCE_GAP.

The Oct 8–15 trial exposed stage mismatches, publication omissions, environment prerequisites and an unverified external refusal. Exact recurrence counts and durable runtime/correction expenditure are UNKNOWN; workflow wall time and monitoring elapsed time are not that ledger. Do not manufacture a numerical recurrence claim from a long conversation.

| ID | Classification | Evidence and bounded conclusion |
|---|---|---|
| F01 | Demonstrated stage mismatch | ISMS #2074 return 6145740588 supplied an earlier ECAP_ADMIN_VALIDATED checkpoint with submission/final flags false. At ISMS source 48e52964551dfa8160668ed1292b4b3d8072568c, foreman-prehandover-lane-gate.js validates all_required_checks_green and pre_iaa_submission_allowed as true on its relevant path. Proposal 6145957520 records the reproduction. The script does not itself poll its own CI, and this is not evidence that every draft publication deadlocks. |
| F02 | Latent source contradiction | Governance foreman-v2.agent.md requires committed proof before IAA, then says to record the returned token in that proof. AGENT_HANDOVER_AUTOMATION section 4.3b forbids editing it and uses a new token file. A specific new rejection caused by this contradiction has not been demonstrated. |
| F03 | Demonstrated contract-input mismatch | Controller review 4260025334 and proposal 6148219678 identify required Foreman evidence omitted from the controller's read scope. This requires an exact contract correction, not copied or fabricated evidence. |
| F04 | Observed publication fragmentation | Genuine Task002/Task003 owner reports existed before all mutable scope/task/manifest views reflected their actual publication. Later proxy coupling repaired the ordinary records. Preserve the scoped PASSes and historical failures. |
| F05 | Observed invocation/environment defects | An unnecessarily narrow IAA invocation blocked required memory rotation; a shallow checkout could not resolve historical canon commits; missing durable creator inputs delayed source QP. These were repaired through ordinary scope/publication/runtime preparation. They do not each justify a new governance regime. |
| F06 | Bootstrap dependency | Governance's candidate ECAP role is unmerged/inactive. The approved one-time human bootstrap review is a particular preparation route, not permanent permission to substitute a human for every ECAP or IAA task. |
| F07 | External capability unknown | ISMS #2071 reports a cloud-agent restriction without a target-operation denial. Support 4835773 had no reply at the latest inspection. A successful governance authoring route does not prove that ISMS task's effective access. |
| F08 | Confirmed external administration boundary | #1420 installation work encountered managed-connector administration 403 and lacks required authenticated app/issuer bindings. A document or alternate workflow cannot create those capabilities. |
| F09 | Schema/transport gap | gate_results.schema.json requires a positive PR number and permits only PASS/FAIL/SKIPPED for gates. ACTIVE_CS2_JOB_WAVE already permits a nullable PR fingerprint, but requires integer runtime/correction accounting. A local, intermediate or unknown state must not be disguised with a fake PR number, PASS, SKIPPED or zero. |
| F10 | Inventory/concurrency gap | The discovered local repository set differs from CONSUMER_REPO_REGISTRY. During inspection governance moved from cs2/bootstrap-recovery to main. Establish current identity and a concurrency fence; do not assume either all intended targets or a stable checkout. |

### 3.2 Root Cause Analysis

The architecture already distinguishes substantive readiness, administration and independent assurance, but some contracts, callers, gates and templates implement different predicates or publication assumptions. Operators and agents then reconcile duplicated views manually. Missing runtime enforcement and unavailable platform capabilities further constrain progression.

Late validation of the complete input/producer/publisher route allowed serial discovery of prerequisites. The corrective response must distinguish source contradictions, ordinary execution preparation, missing implementation and external access; one broad “admin failure” label cannot select the correct repair.

## 4. Current State Analysis

### 4.1 Baselines and Authority

Primary local governance baseline: main at 68f3f0525060ec7115414af16b0931e54fae1344. The checkout was initially observed clean on cs2/bootstrap-recovery at fd504631e8e1bf71f144c2f8e35e91a205b643c0, then externally switched to main; neither branch is reset, merged or rewritten by this work.

Separate investigated candidate evidence: governance PR #1415 at 7c7dc89cb8aab8b13c88c259392c8c451f38b80c, Draft, 99 paths; ISMS #2072 at 48e52964551dfa8160668ed1292b4b3d8072568c, Draft, 13 paths. Candidate files are not installed-main authority. Historical review links are evidence references, not a requirement to open new issues/PRs.

| Existing source | Retain | Reconcile or implement |
|---|---|---|
| ACTIVE_CS2_AUTOMATED_WORKFLOW_GOVERNANCE v1.0.1 | Generic parent/waves, evaluator, ledger, claims, role separation, three identities, scoped correction, activation boundary | Demonstrate an actual generic runtime and adapters; do not substitute a PIT-only pilot or fixtures |
| ACTIVE_CS2_JOB_WAVE.schema.json v1.0.0 | Stable job identity, event sequence, envelope and accounting | Explicit proposed schema evolution for local evidence and unknown accounting where current fields cannot express reality |
| EXECUTION_CEREMONY_ADMINISTRATION_PROTOCOL v1.2.0 | Separate substantive/admin/IAA readiness and accountable handback | Align publication, stage predicates and bootstrap handling across its consumers |
| AGENT_HANDOVER_AUTOMATION v1.7.0 | Committed-input and actual-diff parity, immutable proof, separate IAA token | Remove contradictory contract/template instructions and distinguish transport checks from quality checks |
| Existing role contracts and Tier 2 | Defined duties and protected authority | Make required inputs readable, own outputs writable, mandatory housekeeping possible and canonical publication explicit |
| Existing gate schemas/workflows | Real required outcomes and truthful provenance | Stage-aware applicability, local adapter and semantic validation; no invented hosted checks |
| CONSUMER_REPO_REGISTRY and ripple records | Explicit consumer identities and accountable distribution | Reconcile registered targets with actual clones before claiming complete layer-down |

### 4.2 Current Trial State

The canonical parent job-CS2-AUTOMATION-W1-W2-20261008 and alias CS2-AUTOMATION-W1-W2-20261008 denote the same parent. W1 then W2 remain its selected proving scope. Design work packages below are not successor jobs and confer no replenished runtime or correction allowance.

Task003's affected-source QP PASS, Task002/004 scoped PASSes, the failed earlier QP, creator sessions and IAA prospective amendments remain valid historical records within their actual scope. There is no final whole-PR acceptance, human bootstrap administrative acceptance, final IAA token, merge or W1/W2 completion established by this design.

The earlier read-scope and checkpoint proposals remain inputs to the design review. This first design handover does not relabel either existing PR proposal as approved or silently implement it. Johan's new local-work instruction changes the delivery route; the accepted revision and ensuing work-package handover will identify the actual source corrections to execute.

### 4.3 Local and Registered Repository Inventory

Inspected root: C:/Users/Johan/OneDrive/Documents/GitHub. All five discovered working trees were clean at initial inventory.

| Local directory | Observed branch / HEAD | Design role |
|---|---|---|
| maturion-foreman-governance | main / 68f3f0525060ec7115414af16b0931e54fae1344 after the observed switch | Authority and first design destination |
| maturion-isms | main / d725c685c732f0fc2252230be3bffbc8252a8881 | Registered consumer and candidate first local compatibility pilot |
| app_management_centre | main / 5128db962e8ccf18760d4f1f56b63a22e9c881be | Located candidate consumer; registration, applicable agents and policy to be audited |
| apgi-public-website | main / 325cf7b6b865f3a11b95ed7bdf10fdb65557cbeb | Located repository; governance applicability not established by its presence |
| Training | main / 4391e39c9aeebb5caa4d94adabc3072c736f8061 | Located repository; governance applicability not established by its presence |

Registry v1.2.0 names maturion-isms, maturion-foreman-office-app, PartPulse and R_Roster as enabled consumers. The latter three clones were not found in the inspected root. That is a location/inventory gap, not proof they do not exist on the computer. “All repos” must resolve to an explicit intended target inventory; no target is silently omitted, newly registered or declared updated.

## 5. Proposed Change

### 5.1 Design Requirements

These IDs are acceptance requirements for the proposed system, not new installed rules.

| ID | Requirement |
|---|---|
| ADM-01 | Reuse the existing canonical lifecycle, parent identity and generic core; repository/module/job-type differences belong in validated adapters. |
| ADM-02 | Evaluate one attempted transition against a versioned requirement set; no future-stage result is a prerequisite for producing its inputs. |
| ADM-03 | Distinguish stage evidence completeness, substantive acceptance, administrative acceptance, assurance and release. Never compress them into one “all green” flag. |
| ADM-04 | Preserve Foreman pre-build, accepted QA-to-RED, prospective IAA pre-brief, specialist appointment, source QP, ECAP, final IAA and human release within their actual applicability. |
| ADM-05 | Every material input/output has an authorized owner, permitted path, authenticated provenance and supported publication route. |
| ADM-06 | Preserve immutable historical reports; derive current views without making the projection an authority to change verdicts. |
| ADM-07 | Separate source identity, submitted evidence identity and current integration head; permit only a specifically verified assurance append after submission freeze. |
| ADM-08 | Use durable input revisions, claims and action-specific idempotency; reconcile uncertain outcomes before retry. |
| ADM-09 | Preserve unresolved findings, aliases and conserved counters; UNKNOWN is not zero and no routine repair resets a breaker. |
| ADM-10 | Use one authoritative requirement registry and generate/check contracts, templates, gate inventories and expert knowledge against it. |
| ADM-11 | Support local CS2-directed and hosted PR transport without fake issue numbers, fake checks, missing actor evidence or expanded tool permissions. |
| ADM-12 | Permit an explicit human-authorized, scoped migration override of an identified legacy repository rule; do not let an execution agent grant itself a standing exception. |
| ADM-13 | Prove migration/rollback, per-consumer parity and actual runtime behavior before declaring operational rollout or activation. |
| ADM-14 | Return at every agreed work-package boundary for human review; a design-review result is distinct from governed delivery assurance. |
| ADM-15 | Make ECAP and IAA expert consumers of the same accepted requirement set while preserving their separate decisions and write authorities. |
| ADM-16 | Resume the existing PRs after accepted rollout by inspecting their actual deltas and evidence; do not erase old findings or bulk declare them compatible. |

### 5.2 Lifecycle and Transition Contracts

Keep the existing job/wave states and stage names until an explicit schema migration is accepted. The rows below refine transitions; they do not add a competing top-level state machine.

~~~text
Approved intake and envelope
  -> Foreman pre-build and accepted QA-to-RED
  -> prospective independent IAA pre-brief
  -> Foreman specialist appointment
  -> implementation and producer self-checks
  -> Foreman source QP
  -> ECAP administration and authorized bundle publication
  -> Foreman administrative checkpoint and applicable gates
  -> final independent IAA
  -> verified assurance append and Foreman evidence binding
  -> human CS2 review and permitted integration
  -> wave validation -> next approved wave -> integrated job acceptance
~~~

Publication is a service used wherever a stage needs committed inputs, not a single late phase. For example, creator evidence must be published before the affected source QP; the genuine QP result must then be coupled before administrative acceptance. An authorized bootstrap substitute is named in that job's accepted plan.

| Stage | Actual prerequisites | Produced outcome / owner | Not required yet |
|---|---|---|---|
| INTAKE | Human authority, subject, exact scope, adapter, envelope and existing ledger identity | Validated plan / Foreman and evaluator where implemented | Implementation, final proof or final token |
| PRE_BUILD | Plan, architecture, requirements and relevant capability checks | Accepted QA-to-RED / Foreman and appointed QA producer | GREEN implementation |
| PRE_BRIEF | Real plan/RED and assurance scope | Prospective pre-brief / IAA | Final assurance result |
| APPOINTMENT | Required pre-brief and explicit role/path/task context | Bound appointment / Foreman | Builder delivery |
| BUILD | Actual appointment and loadable approved inputs | Source plus self-check evidence / appointed implementer | ECAP or final IAA acceptance |
| QP | Published actual producer inputs and source binding | Substantive source verdict / Foreman | Administrative completion or final token |
| ECAP | Applicable substantive acceptance and readable inputs | Prepared reconciled bundle / ECAP, published by authorized route | A final IAA verdict |
| GATES | Published current bundle, truthful stage inventory and committed-input parity | Administrative checkpoint and submission permission / Foreman with actual deterministic checks | Future final IAA outcome |
| FINAL_IAA | Required QP/admin/checkpoint, frozen submitted bundle and independent issuer | New assurance or rejection record / IAA | Merge or wave completion |
| EVIDENCE_BINDING | Actual IAA output and exact permitted append | Verified current-source binding / Foreman and deterministic verifier | Unperformed post-integration acceptance |
| REVIEW / MERGE | Current checks, actual assurance, no material blocker, explicit permitted integration authority | Human review/integration decision and actual outcome | Whole-job completion merely because one PR merged |
| VALIDATION | Actual integrated result | Wave functional/regression acceptance / responsible owners | Successor release on an unvalidated predecessor |
| JOB_ACCEPTANCE | Every selected wave validated and integrated evidence | Accepted parent outcome / authorized review route and human CS2 | No remaining approved acceptance obligation |

Each transition contract names: requirement-set version, eligible event, predecessor evidence, input revision, authorized actor, write/publication scope, check set, allowed output, invalidation rules, budget effect, failure owner and resumption trigger. A precondition dependency graph must be validated before dispatch. Legitimate correction feedback is allowed after changed inputs; prerequisite cycles are not.

### 5.3 Stage Results and Gate Semantics

A proposed stage-result vocabulary is PASS, FAIL, PENDING, BLOCKED, NOT_APPLICABLE and UNAVAILABLE. This vocabulary requires explicit schema/adapter changes wherever the current schemas cannot carry it; it must not be inserted into v1 JSON and called schema-valid.

- PASS means the named check actually ran or the named authority actually accepted, with source-bound evidence.
- FAIL means an executed applicable check rejected its inputs; retain the raw result.
- PENDING means a required result is not yet available. A later-stage pending item is not a failure of an earlier eligible stage.
- BLOCKED names the unmet dependency/decision, owner and exact wake-up condition.
- NOT_APPLICABLE needs a requirement-specific, authorized applicability reason. It is never a renamed failed required test.
- UNAVAILABLE records a supported capability/tool/issuer problem and its evidence; it does not grant permission to bypass it.

For every transition, compute the required check set from the accepted policy and current stage. An earlier checkpoint can pass its own requirements while submission_allowed and release_allowed remain false. At submission, all applicable submission requirements must pass. At release, all applicable release requirements, including final independent assurance, must pass.

The evaluator must not count the future result of the current publishing action as an input to that action. Required prior checks remain required. A stage-specific check inventory must identify why any control is deferred and the exact later transition that enforces it. A generic list of failing checks cannot be silently filtered by the actor being checked.

The #2072 case must be reproduced with its actual honest payload. Acceptance of that checkpoint must not accept an unrelated blocker, wrong job/source, missing QP/ECAP, traversal, a premature final claim or missing final assurance.

### 5.4 Human Authority and Migration Overrides

There are two distinct operations: repairing work under an accepted rule, and amending a rule that prevents the accepted repair. The latter requires a real human decision with an explicit migration boundary. A worker cannot reinterpret a blocker as authority.

For a legacy-rule conflict, prepare a migration instruction containing:

| Field | Required content |
|---|---|
| Authority | Actual human instruction, identity, timestamp and scope; no invented issue or PR |
| Subject | Repository, source/policy revision, affected job/work package and exact target files |
| Conflict | Legacy clause/gate and the specific action it incorrectly prevents |
| Supersession | Exact rule being replaced or suspended for the migration, and replacement invariant/check |
| Limits | Permitted actor, operations, duration or terminal condition, and retained budget/accounting boundary |
| Evidence | Before snapshot, proposed diff, checks, review record and actual result |
| Exit | Required review, accepted new policy version, retirement of the temporary exception and rollback route |

Where a particular historical approval did not define an expiry or limit, preserve that fact rather than inventing one. A new migration record must define its own review/termination condition before use. No exception is permanent by omission.

The old check may truthfully remain FAIL because it enforces the rule being amended. That raw failure stays visible. A scoped human-approved migration can proceed under the named replacement checks; it must not relabel the old result PASS, disable unrelated checks, or declare ordinary release eligibility. Final acceptance must identify the accepted replacement policy and its evidence.

Repository-owned rule amendments can change transport and enforcement through this controlled route. They cannot forge an independent verdict, grant provider access the actual tool does not have, bypass a genuine service restriction, silently create credentials, erase evidence, or infer human integration/activation approval.

Johan's current instruction authorizes this design-first local work and a reviewed correction programme. This proposal is not itself the acceptance of every future override. At each logical handover, the actual revision and next bounded action must be clear. The system must support a directly recorded human instruction instead of requiring a new issue whose creation depends on the broken process.

### 5.5 Evidence Identity and Immutability

Use the three existing canonical identities:

1. Frozen substantive submission: actual repository, source/base identity and reviewed-content fingerprint.
2. Finite submitted evidence envelope: exact inputs, requirement/policy versions, dependencies, producer identities and raw-byte hashes.
3. Current integration head or local accepted snapshot: freshly re-read before the permitted integration action.

A file does not embed the hash of the commit that will first contain that file. Bind it to an existing reviewed input snapshot; record its resulting publication separately. A planned assurance request/reference is not a future PASS and must not contain an invented IAA session or issued token.

IAA alone authors its actual verdict/token. After the frozen submission, a token append is assurance-preserving only when the accepted finite envelope and deterministic comparison permit that exact output, with unchanged substantive content, base, policy, authority, dependencies and required check results. Automatically regenerating summaries or manifests at this point is not automatically permitted. Any additional material change returns to the affected stage.

Historical proof/rejection/session contents stay immutable where required. Corrections use new owner-authored records and explicit supersession links. The current projection selects applicable records by job/wave/source/stage/revision, not a repository-wide newest filename or the last record returned by an API.

### 5.6 Ownership, Publication and Tier Responsibilities

| Role | Own decision or output | Prohibited substitution |
|---|---|---|
| Human CS2 | Scope/policy/migration acceptance, reserved decisions, integration and activation authority | Acknowledgement is not an issued IAA result |
| Foreman | Planning, RED acceptance, appointment, source QP, failure routing, admin checkpoint and evidence binding | Does not become the implementation builder or independent IAA |
| Appointed implementer | Authorized source and self-check evidence | Does not accept its own delivery |
| ECAP | Expert stage-aware preparation, inventory, reconciliation, applicability and publication handback | Does not decide substantive quality, generate owner verdicts or issue an IAA token |
| IAA | Expert independent pre-brief, evidence audit, recurrence/escape review and actual verdict/token | Does not implement or repair the work it assures |
| Authorized publisher | Exact owned payload publication, actual diff/scope coupling and acknowledgement | Transport authority does not create or upgrade the producer's verdict |
| Deterministic evaluator/verifier | Legal transitions, claims, binding, counters and refusal evidence | Does not invent missing owner evidence or write human/IAA decisions |
| Governance liaison | Verified canonical-to-consumer adaptation and parity evidence | Does not silently alter canon or activate a candidate role |

Before an appointment, build an input/output capability map: every mandatory read is authorized and resolvable; every own output, memory/archive/parking obligation and canonical destination has a producer/publisher route. Distinguish normative delivery paths from mandatory ordinary own-workspace housekeeping. Account for all actual submitted paths without guessing future counts.

If an agent may prepare but not publish a canonical record, it returns the exact UTF-8 payload, source binding, content hash, intended path, validation result and limitations. The publisher acknowledges the actual resulting path/blob/commit or local snapshot. Foreman resumes after that acknowledgement. “Task completed” from an outer workflow does not substitute for an owned payload or missing named-role return.

**Tier 1** should remain a concise contract: identity, accepted policy version, role, lifecycle obligations, allowed paths, publisher interface, mandatory QA and escalation.

**Tier 2** should contain the role's expert operating method and a versioned index referencing canonical requirements rather than competing normative copies. ECAP needs stage/check applicability, reconciliation, immutable publication, local/hosted adapters, failure triage and worked adverse cases. IAA needs independence and issuer checks, frozen-envelope verification, allowed-delta verification, early versus final review, recurrence/escape review, false-PASS detection and rejection re-entry. Foreman needs dispatch, owner routing and checkpoint methods. CodexAdvisor and liaisons need contract-conformance and migration methods. Each required learning registry and actual freshness attestation remains present.

**Tier 3** is the validated invocation context: parent/alias/wave, work package, actual role/runtime instance, current stage, scope, policy/adapter versions, input revision, immutable evidence references, capability map, outstanding obligations, counters/unknowns, next action and wake-up condition. Persist the invocation receipt for audit. It cannot override Tier 1 or supply missing authority by assertion.

Expertise is demonstrated by correct handling of adversarial cases, not by adding “expert” to an agent description. IAA must receive full context without becoming a co-author of the implementation.

### 5.7 Authoritative Records and Derived Views

Reuse the existing job/event model. One evaluator owns transitions; evidence remains distributed among authenticated owners. The authoritative state is not a mutable file into which every actor may write a PASS.

For each decision, retain the existing event identity, input revision, before/after state, requirement set, owner, evidence references, claim and budget information. Any proposed additional fields or sidecar documents must be mapped to the existing schema and versioned explicitly. Do not create a second competing lifecycle or covertly add forbidden properties.

Generate current task/scope/manifest summaries from the accepted event and actual file inventory where appropriate. Generation is a projection with references, not a rewrite of immutable owner outputs. The generator must reject contradictory active claims rather than choosing the most optimistic one.

A repository publication transaction groups the genuine new payloads and their actual administrative coupling, then checks numeric/list/diff/manifest parity against that candidate. Use the expected base/tree or compare-and-set update. If the head changed, stop and reconcile the actual delta; do not overwrite concurrent work or force-push.

### 5.8 Claims, Deduplication and Recovery

An action key binds parent, wave, stage, action type, input revision and relevant policy/authority/capability revision. A finding fingerprint identifies the obligation, subject and defect; it is not a command to suppress every future action on that job.

~~~text
load accepted policy, identity, ledger and current external facts
validate authority, inputs, producer/publisher capabilities and accounting
classify delta and compute requirements for the requested transition
if an authoritative outcome already exists: verify it and reuse it
if an external action has an uncertain outcome: reconcile it before retry
if a dependency is unchanged and unmet: preserve owner/trigger; take no repeated action
otherwise claim the eligible action using the current revision and a fencing token
perform the bounded action; persist its result and publication acknowledgement
verify authoritative evidence; append the transition decision
release the claim or record its unresolved outcome for recovery
~~~

Git, comments, CI checks, agent dispatches and external applications are not one transaction. Use durable intent/outcome records and an outbox-style publication interface for nontransactional effects. A timeout does not prove an action failed. A restarted or stale worker must not execute after its claim is fenced or replaced. Runtime agent handles are instance-bound; never substitute a dead handle or profile name for a live invocation identity.

An unchanged substantive rejection blocks dependent progression, not unrelated authorized housekeeping or independently eligible prerequisites. Changed external capability or check results can be a genuine new input even at the same Git head. Never deduplicate away required synchronization, repair or final binding.

#### Proposed initial local coordination backend

The working clones are inside OneDrive. Keep the authoritative live claim/event store outside synchronized working trees, in a deliberately configured non-synchronized local application-data directory. Repository copies are immutable audit exports, not independent live coordinators.

For the contained local pilot, the proposed backend is one SQLite database behind one coordinator service on this host, with transactional revision checks, unique action keys, a durable outbox and verified backup/restore. WAL requires same-host coordination; it is not a distributed database. Use a patched supported SQLite release and durable commit settings. The inspected Python runtime reports SQLite 3.49.1; it is not declared suitable for this future service. Official SQLite documentation identifies the WAL-reset fix in 3.51.3 and later, or named fixed backports. Select and verify an appropriate supported patched build before implementation; no software is installed by this proposal.

Hosted workers must use the accepted coordinator interface or remain in observation/preparation mode; they must not start a second writable replica of the same parent ledger. Before multi-host execution, adopt a properly transactional service backend or a supported single-authority service route. Authority transfer must freeze/reconcile outstanding effects, preserve history/counters, advance a fencing epoch and prevent the old authority from continuing. An unavailable authority blocks dependent actions.

This is a proposed storage/coordination decision for review, not an implemented controller. Inference from SQLite's same-host constraints: asynchronous file synchronization must not be treated as cross-host locking or consensus. Validate power-loss recovery, database backup including journal state, stale claims, contention and migration as part of WP5.

### 5.9 Accounting, Stop Conditions and Observability

Preserve the accepted parent/wave graph and job-scoped limits across sessions, aliases, recuts and migrations. Missing accounting remains UNKNOWN. Current v1 event fields requiring integers cannot be populated with guessed zero; until an accepted version/import format can express that uncertainty, dependent automated operations remain blocked with a truthful non-transition observation.

Distinguish observed elapsed time, actual execution runtime, dispatch duration, retries, material corrections, merge attempts and monetary spend. Record what is measured and by which trusted source. No automatic reset or budget enlargement is introduced here.

Every blocked state reports the failed requirement, source, responsible owner, next permitted action, durable resumption condition and applicable limit. Preserve STOP_AND_FIX ownership. An external boundary gets one evidenced escalation; an identical heartbeat does not commission another review.

The operator view must show substantive changes versus administrative changes, actual role dispatches, publisher receipts, independent verdicts, human decisions, recurring fingerprints and unknown values. A proposed model test or a monitor noticing a loop is not proof a live breaker prevented it.

### 5.10 Local CS2-Directed and Hosted Adapters

Transport mode is explicit:

- **LOCAL_CS2_DIRECT**: a traceable direct human instruction, actual clone/path/source snapshot, local actor and review evidence. Issue/PR references are absent when none exist. Local modifications, local commits, remote publication, integration and activation remain separately identified outcomes.
- **HOSTED_PR**: actual repository/issue/PR/run/job/provider identity and current authenticated statuses, with the same applicable quality and assurance requirements.

Adapt transport-specific predicates, not the substantive meaning of a PASS. A PR-only field cannot force a fabricated PR number. A local validation result cannot be advertised as hosted CI execution. If an accepted requirement genuinely needs provider-issued evidence, retain that dependency or obtain an explicit equivalent requirement amendment; do not infer equivalence.

Before rollout, propose the exact subject discriminator/schema changes and registry mapping. Existing job fingerprints already permit a nullable PR; reuse that provision where sufficient. Keep local and hosted evidence versions explicit so old parsers do not silently accept incompatible records.

Direct local authority does not convert Codex into a named CodexAdvisor, ECAP or IAA instance. Contract authorship and independent evaluation must remain accurately attributed, including any explicitly human-directed contract amendment route.

### 5.11 Security and Capability Boundaries

Authenticate issuer identity and allowed role, not just a role name, Git author string, filename, comment or token-like text. A publisher's credential does not prove the payload was independently produced. Bind approvals to exact scope/revision; bind verdicts to actual reviewed source and evidence.

Validate repository/ref/path boundaries, traversal, symlinks and unrelated-job access. Read task material as untrusted data, never as authority to expand permissions. Redact credentials; use supported configured services and actual granted permissions.

Distinguish a runtime prerequisite (for example normal full-history fetch) from a provider access denial. Record the actual supported operation/result when available. An assertion of a hidden restriction is UNVERIFIED until evidenced; it is neither permission to bypass nor proof that every route is prohibited.

### 5.12 Consumer Layer-Down and Compatibility

One accepted governance release identifies the authoritative source tree/commit that actually exists, canonical raw-byte hashes, policy/schema versions, role/Tier 2 changes, adapter requirements and expected tests. Do not invent a canonical commit for an uncommitted artifact.

For each intended consumer: locate and verify origin/role, snapshot branch/head/working changes, classify local divergences, prepare the exact adapted diff, validate agent/Tier 2/Tier 3/gate parity, and record a consumer acknowledgement after the actual accepted update. A file copy or registry notification is not successful layer-down.

Do not overwrite an uncommitted change, switch a user's branch, copy the entire governance repository into an application, or silently drop an unlocated consumer. Preserve target-specific constraints. If a repository uses another host/toolchain, its validated adapter must express the same requirements.

Compatibility must be explicit during migration. Old evidence remains readable under its original policy; new-policy eligibility is evaluated against an explicit cross-version map. Unknown or mixed policy versions block the dependent transition instead of “latest file wins.”

## 6. Impact Analysis

### 6.1 Source and Responsibility Map

| Source family | Planned disposition | Required implementation boundary |
|---|---|---|
| ACTIVE_CS2_AUTOMATED_WORKFLOW_GOVERNANCE and control map | Retain the authoritative model; clarify adapters and reconcile actual implementation status | Canonical policy change only where a demonstrated gap remains |
| EXECUTION_CEREMONY_ADMINISTRATION_PROTOCOL | Align stage-aware preparation/acceptance/publication and approved bootstrap procedure | ECAP preparation remains separate from Foreman substantive acceptance and IAA |
| AGENT_HANDOVER_AUTOMATION | Retain immutable proof and exact token append; align local transport and stage inventories | Preserve actual scope/diff checks and final independent assurance |
| FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL and related doctrine | Check for duplicate or contradictory requirements before amending | Do not remove managerial ownership or turn Foreman into a builder |
| ACTIVE_CS2_JOB_WAVE / MERGE_POLICY and gate-result schemas | Reuse existing fields; version genuinely necessary extensions and migrations | No silent enum/property additions, fake PR identifiers or zeroed accounting |
| Canonical checklists, anti-patterns and templates | Compile/check against authoritative requirements, stage and subject | Retain semantic controls; narrow scans to the actual job's applicable active bundle |
| Foreman contract, integrity copy/index and own Tier 2 | Align proof/token instruction and checkpoint obligations | Exact byte/hash coherence; preserve other agents' baseline entries |
| ECAP and IAA contracts, integrity records and Tier 2 | Expert role methods, required evidence/read scopes, own output/publication boundaries and conformance cases | Correct author updates the role; role does not amend its own authority or assure its own change |
| CodexAdvisor, liaison, CS2 and builder interfaces | Conformance to the accepted lifecycle and actual adapters | No blanket grants; only necessary role-specific changes |
| Repository gates and workflows | Stage-specific requirement evaluation and truthful local/hosted reporting | No indiscriminate disabling of CI or removal of required safety checks |
| Runtime evaluator, store, claim/outbox and supervisor | Implement/validate missing generic mechanisms in their authorized runtime repository | Governance remains the policy authority, not an application implementation dump |
| Consumer registry and layer-down records | Reconcile actual intended repositories and acknowledgements | Source release and consumer parity are distinct facts |

Exact edit lists must be produced from the conformance audit before each implementation handover. A family listed here is not authorization to rewrite every file in that family.

### 6.2 Conflict and Duplication Resolution Rules

Maintain a conformance matrix: requirement ID, single authoritative clause, schema representation, contract reference, Tier 2 method, Tier 3 input, executable predicate, producer, publisher, test and consumer parity. Classify each row as CONFORMANT, CONTRADICTORY, MISSING_IMPLEMENTATION, UNWIRED, OPERATIONAL_PREREQUISITE, EXTERNAL_BOUNDARY or UNKNOWN.

Remove duplicated normative wording by assigning one owner clause and using references or generated views. Do not delete useful controls merely because two documents mention them. Replace obsolete executable predicates and references together; record retirement/supersession so an old gate cannot silently remain active.

Where precedence resolves a source conflict, encode that choice in the actual contract/gate update and its tests rather than leaving the next agent to rediscover it. Where the human changes policy, version and trace that decision. An unrelated old failure is not waived by a local transport exception.

### 6.3 Compatibility and Risk

Principal risks are competing state stores, generated false acceptance, unauthorized scope widening, overbroad deduplication, old-policy/new-schema mixtures, a token-only allowance expanded to arbitrary evidence edits, lost history, unknown-counter resets and accidental cross-repository overwrite.

Controls are explicit compatibility adapters, raw-result retention, authenticated ownership, content/revision fences, least-privilege publication, bounded rollout, negative tests and per-repository rollback. The local mode must not become a standing bypass for arbitrary actors.

The unresolved ISMS cloud refusal and #1420 app/status installation remain external/capability workstreams. Local design/validation can progress; a provider-dependent operation remains blocked until a supported route and actual binding exist.

## 7. Migration Plan (if breaking)

### 7.1 Design-First Review Cycle

This document is work package 1. Hand it back now, record Johan's requested changes, revise the same proposal with explicit version/history, and repeat until the identified design revision is accepted. Do not treat “please review” as acceptance or start implementation merely because a draft exists.

After every subsequent work package or agreed logical interval, hand over: accepted instruction/revision, actual scope, files and raw diff, behavior changed, checks with actual outcomes, residual risks, rollback point and the precise next action. User review and governed role acceptance are recorded distinctly.

During this design-first sequence, defer autonomous progression of the old PR chain. Read-only observation of a material external change may continue; no old PR mutation, review dispatch or source correction is inferred from a heartbeat. Johan will return to old PR integration after accepted rollout.

### 7.2 Prepare a Reversible Boundary

Before any source correction:

1. Re-read the actual checkout, branch, HEAD, working changes and active owner work. Snapshot or preserve changes through a supported method without resetting or discarding them.
2. Pin the source/policy/adapter baseline and proposed affected files.
3. Record the applicable direct human instruction and, where needed, exact migration override/replacement checks.
4. Prepare a candidate diff without activating it. Demonstrate current failure or contradiction and the corrected behavior.
5. Run applicable tests and independent review under a valid, explicitly identified preparation route.
6. Hand back for the agreed human checkpoint; apply the accepted revision within scope.

Normal local edits/commits and remote publication are separate choices. Do not push, merge, deploy or activate merely because local files were approved. Use a real local commit/tree manifest for an accepted release when available; never invent remote-main installation.

### 7.3 Bootstrap Without Self-Certification

If a required administrator or assurance capability is unavailable, do not repeatedly invoke a candidate/uninstalled profile. Identify a supported existing independent reviewer or an exact human-authorized bootstrap procedure, with bounded scope and later assurance obligations. A role cannot certify the installation that creates its own authority.

The already-approved #1415 one-time human administrative review remains particular to that bundle. This design does not generalize it to every job or replace final IAA. Any additional bootstrap arrangement must identify its actual scope, producer, independent review and exit condition.

If a legacy rule prevents preparing the correction to that rule, use section 5.4's explicit human migration record. Keep both raw legacy failure and replacement-check results visible. Do not fabricate a previous pre-brief, token, session, successful check or provider permission.

### 7.4 Migrate Consumers Incrementally

Reconcile the full intended consumer inventory, then choose a verified pilot by applicability and readiness. ISMS is a candidate, not automatically an accepted pilot. Preserve each target's existing source and local divergences.

For each repository, compare against one immutable accepted governance release; generate its exact adapter/contract/Tier 2/Tier 3/gate changes; validate; hand over; apply the accepted change; verify actual byte/version/behavior parity; record acknowledgement. Do not mark all consumers complete based on one successful repository.

### 7.5 Rollback and Existing PR Integration

Rollback restores a previously verified policy/adapter/source snapshot without deleting subsequent decisions or resetting counters. Never “roll back” by replaying a stale side effect, discarding a later valid owner record or erasing a rejection.

After rollout acceptance, inspect each existing PR against the accepted policy and actual current source. Classify reusable source, still-valid scoped evidence, superseded transport/administrative records, outstanding substantive defects and external blockers. Reuse unaffected accepted work. Produce actual compatibility or correction evidence before final assurance; do not bulk close, merge, rebase or rewrite old PR history.

## 8. Approval Requirements

### 8.1 Current Authority and Next Decision

Current authority is Johan's direct local instruction to prepare this first design and return it. No issue or PR is required to review it. This design remains REVIEW and non-normative until he accepts an identified revision.

The next human checkpoint should decide whether this design's operating model and migration boundaries are accepted, and identify the first implementation work package. This is a review checklist, not an assertion that approval has been received.

### 8.2 Separate Decisions

Record design acceptance, a bounded source correction, any legacy-rule supersession, independent QA/IAA outcome, per-consumer adoption, remote publication/integration and activation as separate facts. One may authorize several explicitly named actions, but cannot be inferred to authorize unnamed actions or provide an independent outcome.

Keep budgets and authority changes explicit. Mandatory independent assurance is not supplied by the implementing agent's self-check or by a human acknowledgement of this draft. Any accepted change to a governance requirement must name the replacement requirement and its validation.

The direct local mode and its equivalent evidence route need explicit source/schema alignment during implementation; source README/constitution/contract statements requiring issues/PRs must not remain contradictory active instructions. The design instruction is recorded here as the actual authority for this preparation rather than represented as a fictitious GitHub carrier.

## 9. Implementation Plan

### 9.1 Reviewable Work Packages

| Work package | Deliverable | Handback / dependency |
|---|---|---|
| WP1 — this design | Versioned proposal, evidence/conformance basis, target process, migration and acceptance suite | Human review; iterate this artifact |
| WP2 — exact conformance audit | Complete clause-to-contract-to-gate-to-runtime matrix; duplicate/conflict disposition; full target inventory; exact edit plan | Human review of scoped policy changes and transport/override procedure |
| WP3 — governance/gate foundation | Accepted canonical clarifications, schema migrations, generated requirement registry/interface and demonstrated fixes for stage/proof contradictions | Source checks, applicable independent review and human handback; no live activation |
| WP4 — role expertise | Coherent Tier 1/2/3 and integrity updates for ECAP/IAA first, plus affected Foreman/author/liaison interfaces | Role conformance and adversarial walkthroughs; genuine independent assurance of role changes |
| WP5 — local pilot and runtime proof | Validated local adapter, publication/recovery behavior and missing generic runtime controls in the authorized consumer/runtime location | Actual execution/integration evidence, contained rehearsal, independent review and human acceptance |
| WP6 — remaining consumers | Per-repository adapted diffs, parity, tests, acknowledgement and rollback points | Handback at each repository or agreed logical batch |
| WP7 — existing work reconciliation | Current PR/source/evidence compatibility matrix against the accepted system | Human decides the actual integration path; later final assurance/merge/activation remain separate |

These are subdivisions of the existing effort, not new parent jobs or an approved increase in wave count/allowances. If the actual accepted envelope cannot support a dependent operation, record the blocker; do not silently reset it.

### 9.2 Executable Requirement Registry

Prefer extending the existing governance executable/profile interfaces. If a compiled transition registry is necessary, it is a derived build artifact whose entries point to canonical requirement IDs and policy versions; it is not another normative source.

Each entry specifies stage/applicability, required inputs, authorized owner/publisher, execution adapter, check implementation, output, invalidation and negative-test references. Deterministically check that contracts, templates and role knowledge reference the same entries. A dependency-graph validator rejects unavailable required inputs, unowned outputs, contradictory producer/consumer ordering and incompatible schema versions before dispatch.

The proposed local coordination choice is described in section 5.8. Its exact runtime repository, validated database build, service/API/locking implementation, publication transport, credential/issuer bindings and claim/recovery behavior require WP2/WP5 specification and evidence. They are not claimed implemented by this proposal or by existing fixtures. Do not build a generic controller inside the pure governance repository merely because it is the design authority.

### 9.3 Expert-Agent Readiness

For each affected agent, verify:

- Actual installed/candidate identity, contract version, knowledge index and required files.
- Complete requirement mapping; no duplicate normative policy in Tier 2.
- Current learning registry, visible preflight evidence and mandatory own-memory handling.
- Exact read/write/publication path coherence, with traversals and cross-job access rejected.
- Worked correct and adversarial cases tied to section 10.
- Clear separation of source self-check, Foreman acceptance, ECAP acceptance and independent IAA.
- Supported runtime invocation and actual owned return; no comments mistaken for custom-agent assignments.

For IAA specifically, review independence, issuer authentication and source/evidence binding must remain outside the implementing actor's control. If genuine independent assurance is unavailable, report it at the affected assurance boundary and preserve work ownership.

## 10. Validation Criteria

### 10.1 Required Acceptance Cases

These are a proposed test specification. They have not been implemented or executed by writing this document.

| Case | Scenario | Required outcome |
|---|---|---|
| V01 | Honest earlier ECAP checkpoint with pre-IAA/final flags false | Accepted at its defined preparation transition; no submission/release permission |
| V02 | Same payload claims final completion without final assurance | Rejected |
| V03 | Checkpoint contains an unrelated substantive blocker or wrong source | Rejected or blocked at the affected stage; no waiver |
| V04 | Final IAA token absent during eligible bundle preparation | Preparation may proceed; final release remains blocked |
| V05 | Required prospective pre-brief or accepted RED absent before appointment/build | Dependent action rejected; no retrospective fabrication |
| V06 | Proof committed, then actual IAA PASS arrives | Proof bytes unchanged; exact permitted new assurance output published |
| V07 | Expected assurance reference exists but no issued token | No assurance PASS inferred |
| V08 | “Token-only” append also changes code, policy, dependencies, base or an unpermitted summary | Prior assurance not reused; affected reassessment required |
| V09 | Validated token append preserves all allowed bindings | No unnecessary source/pre-brief review; fresh final checks still enforced |
| V10 | Claimed verdict uses a copied role name, Git author or token-like text | Rejected without authenticated issuer and actual owned evidence |
| V11 | Source QP PASS exists while final administration is incomplete | Preserve scoped PASS and truthful non-final lifecycle status |
| V12 | Two current owner records contradict each other | Reject projection/transition and route exact contradiction to owner |
| V13 | Historical rejected proof contains old pending language | Preserve history; do not scan it as active final-state truth |
| V14 | Producer can prepare but not publish canonical evidence | Supported exact payload/acknowledgement route succeeds without role expansion |
| V15 | Mandatory own-memory rotation adds ordinary files outside normative delivery list | Permitted within actual role authority; byte-preserved archive and full submitted scope accounted |
| V16 | Required history absent in shallow checkout | Supported normal history preparation or evidenced capability refusal; no fake full-hash PASS |
| V17 | Same finding/source/policy/capability observed repeatedly | No duplicate dispatch/review/escalation; unresolved obligation remains |
| V18 | Same Git head but relevant provider capability genuinely changes | One eligible resumption after validated new input |
| V19 | New material correction to an old finding | Resume affected stages; preserve prior rejection and counters |
| V20 | Crash before/after external dispatch, commit or acknowledgement | Reconcile actual outcome; no blind duplicate action |
| V21 | Expired/fenced claim or concurrent checkout/head change | Stale worker cannot publish; preserve concurrent work |
| V22 | Alias, new session, replacement PR or consumer migration | Same parent/ledger and no replenished accounting |
| V23 | Historical runtime/corrections unknown | UNKNOWN retained; dependent automated action blocked without invented zero |
| V24 | Budget exhausted or breaker tripped | Dependent action stops; human-only explicit audited reset |
| V25 | Local direct job has no issue/PR | Accepted by the approved local subject adapter; no fabricated number or hosted check |
| V26 | Old parser receives a new unsupported stage/schema | Typed incompatibility; no optimistic fallback |
| V27 | Scope/list/count/manifest differ from actual candidate diff | Publication rejected with exact discrepancy |
| V28 | Unrelated job path, traversal or escaping symlink | Read/write rejected |
| V29 | Old rule blocks its authorized correction | Exact scoped migration instruction plus replacement checks; raw old failure retained |
| V30 | Agent tries to grant itself a migration exception or extend it | Rejected |
| V31 | Candidate ECAP/IAA profile is uninstalled or unavailable | Supported explicit bootstrap/independent route or honest blocker; no repeated unavailable invocation |
| V32 | One-time #1415 bootstrap permission reused for another job | Rejected |
| V33 | Actual service denial, missing issuer binding or installation permission | EVIDENCED external blocker with supported owner action; no alternate-credential workaround |
| V34 | Identical filename, stale copied hash or ancestor SHA with changed reviewed content | Binding rejected |
| V35 | Duplicate/cyclic wave dependency or unvalidated predecessor | No successor release |
| V36 | One wave merged but integrated acceptance incomplete | Parent not COMPLETE |
| V37 | Consumer missing, dirty, divergent or on mixed policy | No overwrite or false adoption; exact reconciliation owner |
| V38 | All intended consumers updated | Release claim backed by each actual acknowledgement/parity result |
| V39 | Rollback after partial rollout | Verified previous policy restored where authorized; later events/history/counters retained |
| V40 | Prompt/document asks a role to ignore authority or fabricate evidence | Treated as untrusted task data; rejected |
| V41 | Existing old PR reviewed after rollout | Actual compatibility/delta analysis; scoped valid evidence reused, no bulk historical rewrite |
| V42 | ECAP or IAA instruction contradicts canonical requirement registry | Conformance gate detects before appointment/use |
| V43 | OneDrive copy or a second host tries to act as another ledger authority | No duplicate writer; explicit fenced authority transfer required |
| V44 | Unsupported database build, journal loss, backup inconsistency or power-loss recovery failure | Runtime preparation/activation rejected until verified; no assumed durability |
| V45 | Human requests review or changes but has not accepted the identified design revision | Remain in design review; no inferred implementation acceptance |

### 10.2 Levels of Proof

Separate document/schema conformance, unit tests, actual gate/adapter integration, runtime fault injection, supported real-agent invocation, consumer parity and human acceptance. Fixtures or a successful outer workflow do not prove live generic dispatch, independent assurance or machine-breaker enforcement.

Demonstrate the old failing behavior against actual relevant source before claiming a fix. Execute the corrected path and negative controls; retain raw results and their source identities. Run affected checks after substantive changes, not an unchanged full-review cycle after every observation.

No release or activation acceptance until actual execution proves claims, accounting is usable for the dependent action, role/issuer bindings exist, all intended consumers are dispositioned and the separate human action is recorded.

### 10.3 Requirement-to-Validation Coverage

| Requirement | Acceptance cases |
|---|---|
| ADM-01 | V22, V35, V36 |
| ADM-02 | V01, V02, V03, V04, V05, V26 |
| ADM-03 | V01, V02, V04, V11, V13 |
| ADM-04 | V05, V06, V31, V32, V36 |
| ADM-05 | V10, V14, V15, V28, V33 |
| ADM-06 | V07, V11, V12, V13, V34 |
| ADM-07 | V06, V08, V09, V34 |
| ADM-08 | V17, V18, V19, V20, V21, V43, V44 |
| ADM-09 | V22, V23, V24 |
| ADM-10 | V12, V26, V27, V42 |
| ADM-11 | V04, V25, V26, V33 |
| ADM-12 | V29, V30, V32 |
| ADM-13 | V16, V20, V21, V37, V38, V39, V43, V44 |
| ADM-14 | V11, V36, V39, V45 |
| ADM-15 | V10, V12, V28, V40, V42 |
| ADM-16 | V19, V22, V41 |

Coverage is traceability, not proof that these proposed tests passed. Implementation must produce actual results and identify any additional case required by the final concrete design.

### 10.4 Design Review Checklist and Open Items

WP1 is ready to review when its proposal structure, references, authority boundaries, known-source findings, lifecycle, local transport, override protocol, expertise plan, recovery, accounting, migration and acceptance cases are inspectable.

Open items for the next reviewed revision or WP2:

1. Confirm the full intended repository inventory and locate missing registered consumers.
2. Accept/refine the proposed single-host backend, exact local/hosted adapter interfaces and runtime implementation location.
3. Specify the minimal compatible schema evolution for stage/local/unknown-accounting evidence.
4. Resolve exact clause/contract/gate conflicts and compile the file-by-file edit plan.
5. Choose supported independent review/issuer and any needed bootstrap route for the actual implementation package.
6. Establish durable accounting from evidence or an explicit human-approved reconciliation; do not infer a reset.
7. Define the accepted release snapshot and per-consumer rollback/acknowledgement format.

These are explicit design decisions to finish, not hidden assertions of perfection, new automatic blockers on this design handover, or a requirement to open issues/PRs.

## 11. References

### 11.1 Existing Local Authority and Specifications

- [Governance proposal schema](../schemas/GOVERNANCE_CHANGE_PROPOSAL.schema.md).
- [Active-CS2 governance](../canon/ACTIVE_CS2_AUTOMATED_WORKFLOW_GOVERNANCE.md), especially sections 3, 5, 6, 9, 10 and 12.
- [Active-CS2 control map](../ACTIVE_CS2_AUTOMATED_WORKFLOW_CONTROL_MAP.md).
- [Job/wave schema](../schemas/ACTIVE_CS2_JOB_WAVE.schema.json).
- [Merge policy schema](../schemas/ACTIVE_CS2_MERGE_POLICY.schema.json).
- [Execution ceremony administration](../canon/EXECUTION_CEREMONY_ADMINISTRATION_PROTOCOL.md), especially sections 5–7.
- [Handover automation](../canon/AGENT_HANDOVER_AUTOMATION.md), especially sections 4.3c–e and the append-only token ceremony.
- [Gate-result schema](../executable/schemas/gate_results.schema.json).
- [Consumer registry](../CONSUMER_REPO_REGISTRY.json).
- [Foreman contract](../../.github/agents/foreman-v2.agent.md).
- [Governance constitution](../CONSTITUTION.md); its PR-transport requirement is an explicit compatibility topic for the direct local instruction, not an undisclosed exception.
- [SQLite write-ahead logging](https://sqlite.org/wal.html), especially same-host constraints, journal/backup integrity and the WAL-reset fix; primary technical reference checked 2026-10-15. Storage selection remains proposed.

### 11.2 Traceable Trial Evidence

- [Parent #2068](https://github.com/APGI-cmy/maturion-isms/issues/2068).
- [Controller read-scope proposal 6148219678](https://github.com/APGI-cmy/maturion-foreman-governance/issues/1414#issuecomment-6148219678).
- [Checkpoint proposal 6145957520](https://github.com/APGI-cmy/maturion-isms/issues/2073#issuecomment-6145957520).
- [Actual earlier ECAP return 6145740588](https://github.com/APGI-cmy/maturion-isms/pull/2074#issuecomment-6145740588).
- [Actual Task003 source-QP return 6172466738](https://github.com/APGI-cmy/maturion-foreman-governance/pull/1415#issuecomment-6172466738).
- [Published nine-path ECAP candidate source](https://github.com/APGI-cmy/maturion-foreman-governance/commit/ba6160cb1280a6401cf00973d6098d629052a4d7); this is candidate evidence, not installed role authority.
- [Exact investigated ISMS gate](https://github.com/APGI-cmy/maturion-isms/blob/48e52964551dfa8160668ed1292b4b3d8072568c/.github/scripts/foreman-prehandover-lane-gate.js).
- [Reported ISMS refusal 6144436838](https://github.com/APGI-cmy/maturion-isms/pull/2071#issuecomment-6144436838); no target-operation denial established.
- [Existing support case 4835773](https://help.github.com/ticket/personal/0/4835773); access-controlled evidence, not a required public artifact.

### 11.3 Revision and Handover Record

| Revision | Date | Actual work | Review / implementation status |
|---|---|---|---|
| 0.1.0 | 2026-10-15 | Local design authored from existing canon, inspected clone baselines, trial evidence and the completed independent review of prior advice | REVIEW; no independent review of this new design asserted; no governing-source changes, consumer layer-down or runtime implementation performed |

This proposal is not entered into CANON_INVENTORY as accepted canon. Its first handover is for Johan's requested review. Acceptance and later adoption require an identified revision and actual evidence; neither a reassuring title nor this document's existence supplies them.

