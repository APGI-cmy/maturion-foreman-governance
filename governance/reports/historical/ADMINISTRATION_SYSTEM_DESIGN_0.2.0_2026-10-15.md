---
proposal_id: PROPOSAL_2026-10-15_ADMINISTRATION_SYSTEM_DESIGN
proposal_schema_version: v1.0
design_version: 0.2.0
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
- **Affected Governance Artifacts**: the canon, schema, gate, template, contract and knowledge families mapped in sections 4, 6 and 9. This work package revises the design and preserves its original snapshot; it changes none of those governing sources.
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

Johan's subsequent instruction, “Please implement thos corrections”, authorizes this revision of the design to address R01–R07 in the [critical review](../reports/ADMINISTRATION_SYSTEM_DESIGN_CRITICAL_REVIEW_2026-10-15.md). It is the agreed design-correction step, not an assertion that the revised design, live gate changes or rollout have been accepted. The reviewed 0.1.0 is [preserved byte-for-byte](../reports/historical/ADMINISTRATION_SYSTEM_DESIGN_0.1.0_2026-10-15.md), SHA-256 `264973d5aa1df1cc9ddd049b4e855502bf1312f22ecd148a3bc1aa6b0f92ad6a`. Historical line references in the review refer to that snapshot, whose relative source links retain their original proposal-directory context.

## 2. Change Summary

### 2.1 Executive Summary

Make administration an executable, stage-aware process that assembles truthful evidence and permits the next authorized action. It must not require a future action's result to authorize the action that creates its inputs.

Reconcile and implement the existing approved architecture rather than create a parallel governance constitution or a second job ledger. Preserve substantive QA, independent assurance, human release authority, immutable historical evidence, role boundaries, generic repository adapters and conserved job-level accounting. Replace inconsistent enforcement and repeated manual transcription.

**The operating model:** Johan approves intent, scope and reserved decisions. The active-CS2 agent retains the approved parent through integrated acceptance and requests eligible progression; Foreman plans and supervises delivery and ordinary repairs. CodexAdvisor owns authorized agent-factory work; builders own implementation. ECAP validates administration; IAA independently assures. The deterministic controller enforces legal transitions. Publication is a capability of an authorized route, not another acceptance authority. Candidate or unavailable roles are not treated as active.

The default CS2 view shows the current outcome, material changes, next owner/action, exact blocker and any decision needed from Johan. Evidence expands behind those six fields (section 5.7). Ordinary in-envelope work proceeds through existing owners; human review intervals in this migration programme do not impose a new approval on every future repair. Legitimate correction cycles remain; unchanged inputs must not cause repeated appointments, reviews or packets.

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
9. An operator can identify the outcome, next owner/action and any required human decision from one view without reconciling separate documents.
10. An authoritative fact is entered once; repeated views are derived, and an admin-only event adds only the evidence required by its accepted profile.

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
| ADM-04 | Preserve the lifecycle's controls through explicit, policy-approved job profiles; adapt QA to the work and do not invent irrelevant artifacts or actor-selected exemptions. |
| ADM-05 | Every material input/output has an authorized owner, permitted path, authenticated provenance and supported publication route. |
| ADM-06 | Preserve immutable historical reports; derive current views without making the projection an authority to change verdicts. |
| ADM-07 | Separate source/submitted/current identities and actual inventories; account for a finite permitted assurance append without editing frozen inputs or assuming issued PASS. |
| ADM-08 | Use durable input revisions, claims and action-specific idempotency; assign wake-up ownership, resume eligible work and reconcile uncertain outcomes before retry. |
| ADM-09 | Preserve unresolved findings, aliases and conserved counters; UNKNOWN is not zero and no routine repair resets a breaker. |
| ADM-10 | Use one authoritative requirement registry and generate/check contracts, templates, gate inventories and expert knowledge against it. |
| ADM-11 | Support local CS2-directed and hosted PR transport without fake issue numbers, fake checks, missing actor evidence or expanded tool permissions. |
| ADM-12 | Permit a scoped migration override authenticated through the human-authority boundary, with replacement checks and revocation; workers cannot approve themselves. |
| ADM-13 | Distinguish source-release acceptance, per-consumer adoption and aggregate rollout acceptance; prove the execution and rollback claims relevant to each. |
| ADM-14 | Return at agreed migration work-package boundaries; keep those reviews separate from normal automatic continuation and governed delivery assurance. |
| ADM-15 | Make ECAP and IAA expert consumers of the same accepted requirement set while preserving their separate decisions and write authorities. |
| ADM-16 | Resume the existing PRs after accepted rollout by inspecting their actual deltas and evidence; do not erase old findings or bulk declare them compatible. |
| ADM-17 | Distinguish human CS2, active-CS2 parent ownership, Foreman orchestration, CodexAdvisor, builders/QA, ECAP, IAA, canonical administration/liaison and deterministic enforcement. |
| ADM-18 | Provide one concise CS2 view, one authoritative record per fact and a minimum artifact set; optional runtime infrastructure cannot block an otherwise authorized manual correction. |

### 5.2 Lifecycle and Transition Contracts

Keep the existing job/wave states and stage names until an explicit schema migration is accepted. The rows below refine transitions; they do not add a competing top-level state machine. This is the normal product-wave route. Section 5.2.1 selects the applicable route for other work; administrative-only repair re-enters the affected stage instead of restarting intake.

~~~text
Approved intake and envelope
  -> active-CS2 eligible wave request and controller eligibility
  -> Foreman pre-build and accepted QA-to-RED
  -> prospective independent IAA pre-brief
  -> Foreman implementation-specialist appointment
  -> implementation and producer self-checks
  -> Foreman source QP
  -> ECAP administration and authorized bundle publication
  -> Foreman administrative checkpoint and applicable gates
  -> final independent IAA
  -> verified assurance append and Foreman evidence binding
  -> active-CS2 evidence review -> permitted integration / reserved human decision
  -> wave validation -> active-CS2 requests next eligible approved wave
  -> integrated job acceptance / retained human acceptance boundary
~~~

Publication is a service used wherever a stage needs committed inputs, not a single late phase. For example, creator evidence must be published before the affected source QP; the genuine QP result must then be coupled before administrative acceptance. An authorized bootstrap substitute is named in that job's accepted plan.

| Stage | Actual prerequisites | Produced outcome / owner | Not required yet |
|---|---|---|---|
| INTAKE | Human authority, subject, exact scope, profile, adapter, envelope and existing ledger identity | Approved parent accepted / active CS2; work plan / Foreman or CodexAdvisor for its factory route; legality / evaluator where implemented | Implementation, final proof or final token |
| PRE_BUILD | Plan, architecture, requirements and relevant capability checks | Accepted QA-to-RED / Foreman and appointed QA producer | GREEN implementation |
| PRE_BRIEF | Real plan/RED and assurance scope | Prospective pre-brief / IAA | Final assurance result |
| APPOINTMENT | Required pre-brief and explicit implementation role/path/task context | Bound implementation appointment / Foreman; factory authorization uses its own approved profile | Builder delivery |
| BUILD | Actual appointment and loadable approved inputs | Source plus self-check evidence / appointed implementer | ECAP or final IAA acceptance |
| QP | Published actual producer inputs and source binding | Substantive source verdict / Foreman | Administrative completion or final token |
| ECAP | Applicable substantive acceptance and readable inputs | Prepared reconciled bundle / ECAP, published by authorized route | A final IAA verdict |
| GATES | Published current bundle, truthful stage inventory and committed-input parity | Administrative checkpoint and submission permission / Foreman with actual deterministic checks | Future final IAA outcome |
| FINAL_IAA | Required QP/admin/checkpoint, frozen submitted bundle and independent issuer | New assurance or rejection record / IAA | Merge or wave completion |
| EVIDENCE_BINDING | Actual IAA output and exact permitted append | Verified current-source binding / Foreman and deterministic verifier | Unperformed post-integration acceptance |
| REVIEW / MERGE | Current checks, actual assurance, no material blocker, explicit permitted integration authority | CS2-agent evidence review; integration by the actually authorized actor; human decision wherever reserved | Whole-job completion merely because one PR merged |
| VALIDATION | Actual integrated result | Wave functional/regression acceptance / responsible owners | Successor release on an unvalidated predecessor |
| JOB_ACCEPTANCE | Every selected wave validated and integrated evidence | Active-CS2 integrated acceptance verification and the retained human acceptance outcome | No remaining approved acceptance obligation |

Each transition contract names: requirement-set version, eligible event, predecessor evidence, input revision, authorized actor, write/publication scope, check set, allowed output, invalidation rules, budget effect, failure owner and resumption trigger. A precondition dependency graph must be validated before dispatch. Legitimate correction feedback is allowed after changed inputs; prerequisite cycles are not.

The pre-brief barrier is before the dependent implementation appointment/work. Bounded planning and QA preparation must already have their actual authorization in the accepted plan; they do not wait for the RED evidence they are appointed to produce. A QA-preparation task cannot be used to implement the product before its required pre-brief. This distinction must be reflected in appointment predicates, not left for each agent to guess.

#### 5.2.1 Profile selection and stage applicability

One lifecycle supports different work; a profile selects requirement applicability, not new authority. The following are proposed profile contracts for acceptance and exact source alignment in WP2/WP3. They are not installed exemptions. Their normative bases are the active-CS2 lifecycle, agent-contract management/protection, CodexAdvisor's actual contract, IAA canon and ECAP protocol. Resolve conflicts explicitly before enabling a profile.

| Profile | Producer / accountable manager | Early work and QA | Administration and assurance | Completion |
|---|---|---|---|---|
| PRODUCT_IMPLEMENTATION | Foreman-appointed builders/QA; Foreman manages; active CS2 owns parent | Plan/architecture, accepted RED and prospective IAA pre-brief before implementation appointment, build and source QP | ECAP, applicable submission checks, final independent IAA and verified append/binding | Authorized integration, functional/regression wave validation and parent acceptance |
| AGENT_CONTRACT | CodexAdvisor under explicit human-CS2 factory authorization; Foreman handles any separately authorized builder prerequisite | Class-matched checklist, prospective assurance scope as required, contract invariants/negative fixtures and required source QP/self-checks; no fictitious product RED | Required contract/Tier 2/integrity/proof/session bundle, applicable ECAP/checkpoint and mandatory independent final IAA | Human-controlled authority adoption and actual layer-down; no role becomes active merely from publication |
| GOVERNANCE_GATE | Permitted governance administrator or Foreman-appointed implementer for executable work; authorized contract changes separately routed to CodexAdvisor | Actual contradictory rule or failing predicate, accepted replacement invariant and negative controls; applicable prospective pre-brief/QP | ECAP and IAA according to the accepted governance-change classification; named migration replacement checks | Accepted source release first, then individually verified consumer adoption |
| ADMIN_RECONCILIATION | Existing authorized original owner/publisher; existing manager retains responsibility | No new product architecture/RED/build appointment for mere publication or transcription repair; verify actual owner payload, scope and unchanged substantive bindings | Affected publication/schema/parity checks and ECAP reconciliation as applicable; retain valid prior QA and perform any IAA required by actual materiality/classification | Corrected affected stage only; no new whole-job acceptance, appointment or full review cycle by default |

Selection procedure: the accountable manager (Foreman for delivery, CodexAdvisor for its authorized factory work) proposes the profile from actual changed content and canonical classification. The accepted requirement registry/evaluator verifies that choice; ECAP checks it and IAA examines it within its remit. Profiles are human-approved policy, not per-job discretionary waivers. In manual preparation, the designated reviewer verifies the same mapping and records that no evaluator executed it. A producer cannot select its own exclusions. Mixed work takes the union of applicable obligations; split ownership where needed without creating a new parent. Policy, executable-gate, dependency or authority changes cannot use ADMIN_RECONCILIATION to avoid assurance. Unknown classification blocks only its dependent action and routes one precise decision.

For each profile entry record required/adapted/inapplicable controls, canonical clause/version, selection rule, producer/manager, publication path and re-entry rule. Adapted QA proves the relevant failing behavior or invariant. Any omission that conflicts with installed mandatory QA requires an explicit accepted amendment, not the word “inapplicable”. Pure Tier 2/admin work follows the IAA classification rules; agent-contract changes always retain final IAA. Section 5.13 supplies complete worked routes.

Stage interpretation for the proposed profiles: **R** means required, **A** means required with the named adaptation, **E** means re-use the existing stage/evidence if still valid and re-enter only if affected. **C** means the accepted canonical classification decides before action; it is not the producer's optional choice. Existing mandatory obligations cannot be removed through E/C.

| Control | Product | Agent contract | Governance/gate | Admin reconciliation |
|---|---|---|---|---|
| Plan / QA-to-RED | R: product plan and accepted relevant RED | A: class checklist and failing contract invariant/negative fixture | A: exact contradiction/failing behavior and replacement invariant | E: existing plan/QA; no new product RED for transcription-only repair |
| Prospective IAA pre-brief | R before dependent build appointment | R for the material contract change under the aligned profile; no retrospective pre-brief | R for material policy/gate change under the aligned profile | E/C: preserve valid scope; affected material evidence follows IAA classification before action |
| Implementation appointment | R: Foreman appoints builder | A: human-authorized CodexAdvisor factory task; Foreman appoints any separately authorized implementation prerequisite | A: actual permitted administrator or Foreman-appointed implementer; protected contract work remains factory-owned | E: existing owner/publisher; no successor appointment for unchanged task |
| Source quality | R: builder checks plus Foreman QP | R: factory checks plus the genuine source-QP owner required by class checklist; self-check is not another owner's acceptance | R: source checks and required QP for actual scope | E/A: preserve valid source QP; verify exact payload/unchanged substantive binding and affected checks |
| ECAP / submission checks | R before final IAA | R under the aligned material-contract profile, with supported explicit bootstrap if needed | R for the material governance/gate profile | E/A: reconcile affected admin/checkpoint; no invented whole-job acceptance |
| Final independent IAA | R | R for every contract creation/update | R for material governance/gate changes in this profile | E/C: canonical trigger/invalidation decides; never actor-exempt a required re-assurance |
| Integration / validation | R: authorized integration and functional/regression wave evidence | A: accepted source/authority adoption and target checks; separate activation | A: source release then each consumer's actual adoption | E/A: corrected affected stage; no new parent completion or permission to integrate |

The R entries for aligned material contract/governance profiles express this proposed policy, not a claim that all old contracts already implement it. WP2 maps them to precise existing clauses and names any actual amendment; current-source obligations and permitted bootstrap apply until that amendment is accepted. A classification decision must resolve C before dispatch, so C cannot become an indefinite instruction to ask every reviewer again.

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

#### 5.4.1 Trusted human instruction receipt

The trust source is Johan's actual authenticated input channel, not an agent-authored file saying “Johan approved”. The receipt records source/channel identity and available message reference, exact instruction or approved revision/hash, permitted scope/actors/replacement checks, retained limits, termination condition and current revocation version. Do not invent a platform message identifier when none is exposed. Link one receipt wherever needed instead of transcribing independent approval claims.

| Function | Owner and trust boundary |
|---|---|
| Issue / revoke instruction | Johan through the actual human input channel; neither worker nor publisher may issue it on his behalf |
| Record receipt | Trusted intake/approval adapter records the actual input. A worker may prepare a proposed receipt, but cannot validate its own claim of human authority |
| Verify receipt | Controller's authority verifier checks the authenticated source, scope/revision and revocation state; its trust configuration is outside the executing worker's write scope |
| Manual local equivalent | Consume Johan's actual trusted direct input, not an agent's summary of it. At the agreed migration/release review, the designated non-author reviewer checks the instruction and exact candidate. If the actual authority source or scope cannot be verified, obtain one concise human readback/confirmation for that package in this existing channel. An already clear direct instruction needs no repeat approval, and ordinary in-scope edits do not each require another reviewer. No issue, PR, signature service or database is required merely to prepare the correction |
| Consume / revoke outstanding action | Recheck at claim and immediately before an external effect. A revocation advances the authority revision/fencing epoch, prevents unperformed stale actions, and routes completed/uncertain effects to reconciliation rather than erasing them |

Instruction receipt, independent assurance and integration permission are distinct. One reviewed migration instruction may authorize all its named ordinary steps; agents do not request the same permission for each serialization or retry. A material scope/authority/budget change still requires its actual reserved decision. These interfaces are design commitments; they confer no currently unavailable provider capability.

### 5.5 Evidence Identity and Immutability

Use the three existing canonical identities:

1. Frozen substantive submission: actual repository, source/base identity and reviewed-content fingerprint.
2. Finite submitted evidence envelope: exact inputs, requirement/policy versions, dependencies, producer identities and raw-byte hashes.
3. Current integration head or local accepted snapshot: freshly re-read before the permitted integration action.

A file does not embed the hash of the commit that will first contain that file. Bind it to an existing reviewed input snapshot; record its resulting publication separately. A planned assurance request/reference is not a future PASS and must not contain an invented IAA session or issued token.

IAA alone authors its actual verdict/token. Preserve substantive content, base, policy, authority, dependencies and the validity of the source-bound substantive-check evidence after freeze. Fresh runs may have new run IDs; token-dependent checks may become eligible/pass only after the actual token exists. Those are not required to have identical pre-token outcomes. A new substantive failure or changed material input invalidates the affected assurance. Never regenerate the frozen proof, scope or manifest to conceal a changed submission.

Historical proof/rejection/session contents stay immutable where required. Corrections use new owner-authored records and explicit supersession links. The current projection selects applicable records by job/wave/source/stage/revision, not a repository-wide newest filename or the last record returned by an API.

#### 5.5.1 Exact submission, assurance additions and integration inventory

The proposed correction is one stage-aware parity rule shared by scope and manifest checks. It distinguishes an actual file inventory from a prospective permission:

| Inventory | Meaning / validation |
|---|---|
| S0 — submitted inventory | Exact changed-file set and raw-byte hashes at the real frozen submission H0, including its proof, scope, manifest, prior planning and required producer/owner records. Validate actual parity before final IAA |
| A — permitted assurance additions | Finite exact paths and producer identities for this review's required final IAA token/verdict, final session and final wave record where applicable. These are permitted future outputs, not files counted as already present, future hashes or anticipated PASSes |
| I1 — integration inventory | S0 union the actually produced validated additions A_actual at current head H1. Every original S0 blob is unchanged, A_actual is a subset of A, mandatory outputs exist, and no undeclared path/deletion/rewrite is present |

Before freeze the actual independent review instance declares its required final-output paths through the existing appointment/pre-brief route. Include required own-memory/archive outputs or complete ordinary housekeeping before freeze. An unforeseen required output means amend the envelope at the affected stage; it does not justify a broad wildcard. Do not count prospective paths in S0's FILES_CHANGED. Do not place an expected PASS string where a planned review reference belongs.

Seal S0 from the actual committed H0 using the existing event/check-evidence route after H0 exists. The seal can reference H0/tree and its computed file hashes without a new source commit. Frozen files may declare their actual path inventory; none must contain its own raw-byte hash or the hash of its future containing commit. The A path/producer allowance is part of the reviewed submission; actual output hashes are supplied only after output creation.

The target publication contract permits only the exact **new** final assurance files in A, owned by their genuine producer and transported by the authorized publisher. The final wave record links the existing prospective carrier and stable parent rather than modifying that carrier after freeze. This requires explicit alignment of the current token-only/new-file ceremony, IAA carrier/session instructions, ADMIN_TOKEN_ONLY classifier and both scope/manifest predicates in WP3. Existing one-file ADMIN_TOKEN_ONLY eligibility is not silently extended to a multi-record pack. Until that amendment and verifier are accepted, the old rule remains the installed rule; an implementation migration uses the named replacement checks in section 5.4.

Worked fixture (illustrative paths only; no actual session or verdict is asserted):

~~~text
H0: S0 = actual source + published owner records + proof + scope + manifest
A  = .agent-admin/assurance/iaa-token-session-EXAMPLE-W1-YYYYMMDD.md
     .agent-admin/assurance/iaa-final-session-EXAMPLE-W1-YYYYMMDD.md
     .agent-workspace/independent-assurance-agent/memory/session-EXAMPLE-W1-YYYYMMDD.md
H1: H0 plus genuine required files in A; no change to an H0 file
I1 = S0 union A_actual; current diff must equal I1 exactly
~~~

IAA evaluates H0 and returns an actual independently owned result. The publisher validates producer/path/content bindings and atomically publishes A_actual against H0. IAA output hashes are computed from actual returned bytes and recorded in the publication receipt; no file contains its own future commit hash. The integration verifier re-reads H1, verifies S0 preservation, the finite allowed delta and the issuer/source bindings, and runs the newly applicable token/binding/current-head checks. Frozen scope and manifest remain truthful about S0; their integration-stage check evaluates I1, not S0 alone.

Foreman's post-IAA binding is a persisted verification result in the existing event/check-evidence route, bound to H0/H1 and actual output hashes; it does not require another source commit. The accepted local manual adapter records that verification without claiming a controller ran. Any legacy requirement for a further committed binding artifact must be aligned to this decision before enabling the route. Do not create a recursive chain of evidence-only head changes. A material mismatch routes affected repair/review; an exact permitted append does not commission another source QP/pre-brief/final IAA merely because the head changed. Final release still needs fresh applicable checks, no unresolved blocker and actual integration authority.

For a rejection, publish the genuine new rejection/session/wave outputs under their declared allowance, preserve them, and return to the failed requirement's producer. Freeze a new reviewed submission after the actual repair; never upgrade the rejection to PASS or reset the parent/counters.

### 5.6 Ownership, Publication and Tier Responsibilities

| Role | Own decision or output | Continuation / handback | Prohibited substitution |
|---|---|---|---|
| Human CS2 / Johan | Intent, approved scope/envelope, reserved policy/authority/budget decisions, agreed migration reviews and retained integration/activation decisions | One concise decision view; one actual instruction for each reserved matter/package | Human acknowledgement is not an independent IAA verdict |
| Active-CS2 agent | Approved parent ownership through every wave and integrated acceptance; evidence review, precise findings and requests for eligible progression | Dispatch eligible wave to Foreman; watch resumption; verify successor eligibility and parent completion | Does not build, appoint specialists, weaken gates, self-authorize or inherit human reserved powers; no activation implied |
| Foreman | Planning, applicable RED acceptance, specialist appointments, ordinary remediation, source QP, admin checkpoint and evidence binding | Supervise builders; route rejection to actual owner; return accountable evidence to active CS2 | Does not implement the delivery or replace independent IAA |
| CodexAdvisor | Authorized agent-factory contract changes, class checklist and minimum Tier 2/integrity/conformance bundle | Use its factory review/publication route; route outside-boundary prerequisite work through authorized Foreman | Not a product builder or Foreman; cannot change its own contract or assure its delivery |
| Builder agents / QA producers | Appointed source implementation, relevant RED/negative tests and self-check evidence | Return delivery/blocker to Foreman; repair under the same appointment where permitted | No self-appointment, self-acceptance, self-merge or protected contract authorship by convenience |
| ECAP | Expert stage-aware administrative validation, applicability/inventory reconciliation and publication handback | Return exact administrative outcome, missing obligation/owner and permitted next step to Foreman/factory route | Does not decide substantive quality, invent owner outputs or issue an IAA token |
| IAA | Required prospective pre-brief and independent assessment; actual verdict/token and required own records | Return scoped PASS or actionable rejection with exact failed obligation/re-entry | Does not implement/repair assured work or self-certify a candidate authority change |
| Governance administrator | Permitted canonical administration, schema/checklist/policy maintenance and provenance | Return owned records to the authorized manager/source-release route | Cannot silently expand protected agent authority or write another role's contract |
| Governance liaison | Canonical-to-consumer adaptation, parity and actual adoption acknowledgement | Return per-consumer result; escalate exact divergence rather than blindly copying | Does not alter canon, overwrite unrelated work or activate a candidate role |
| Publisher capability | Exact owned payload publication, scope coupling and actual receipt | Return acknowledgement to producer/manager; reuse existing authorized transport | Transport does not upgrade a verdict; not automatically a new agent appointment |
| Deterministic controller / verifier | Legal transitions, claims, accounting, bindings, authority verification and typed refusals | Execute eligible transition once or return its precise refusal to the manager/CS2 | Not a job manager; does not create human/owner/IAA decisions |

Before an appointment, build an input/output capability map: every mandatory read is authorized and resolvable; every own output, memory/archive/parking obligation and canonical destination has a producer/publisher route. Distinguish normative delivery paths from mandatory ordinary own-workspace housekeeping. Account for all actual submitted paths without guessing future counts.

If an agent may prepare but not publish a canonical record, it returns the exact UTF-8 payload, source binding, content hash, intended path, validation result and limitations. The publisher acknowledges the actual resulting path/blob/commit or local snapshot. Foreman resumes after that acknowledgement. “Task completed” from an outer workflow does not substitute for an owned payload or missing named-role return.

**Tier 1** should remain a concise contract: identity, accepted policy version, role, lifecycle obligations, allowed paths, publisher interface, mandatory QA and escalation.

**Tier 2** should contain the role's expert operating method and a versioned index referencing canonical requirements rather than competing normative copies. ECAP needs stage/check applicability, reconciliation, immutable publication, local/hosted adapters, failure triage and worked adverse cases. IAA needs independence and issuer checks, frozen-envelope verification, allowed-delta verification, early versus final review, recurrence/escape review, false-PASS detection and rejection re-entry. Foreman needs dispatch, owner routing and checkpoint methods. CodexAdvisor and liaisons need contract-conformance and migration methods. Each required learning registry and actual freshness attestation remains present.

**Tier 3** is the validated invocation context: parent/alias/wave, work package, actual role/runtime instance, current stage, scope, policy/adapter versions, input revision, immutable evidence references, capability map, outstanding obligations, counters/unknowns, next action and wake-up condition. Persist the invocation receipt for audit. It cannot override Tier 1 or supply missing authority by assertion.

Expertise is demonstrated by correct handling of adversarial cases, not by adding “expert” to an agent description. IAA must receive full context without becoming a co-author of the implementation.

**Own-authority change route:** CodexAdvisor authors authorized target-agent changes, including an IAA candidate; it cannot author its own contract. For a CodexAdvisor-own-contract correction, Johan directly authors it or explicitly names a different permitted author and exact migration boundary before any write. Product builders do not acquire that authority implicitly. A separate non-author assurer operates under an unchanged trusted contract/policy; the changed IAA candidate cannot certify its own installation or be used as the sole independent assurance of its new powers. If no supported independent route exists, prepare the inspectable candidate and return that precise assurance blocker once. Preserve final independent QA and human adoption; no one-time ECAP substitute is generalized into an IAA waiver.

### 5.7 Authoritative Records and Derived Views

Reuse the existing job/event model. One evaluator owns transitions; evidence remains distributed among authenticated owners. The authoritative state is not a mutable file into which every actor may write a PASS.

For each decision, retain the existing event identity, input revision, before/after state, requirement set, owner, evidence references, claim and budget information. Any proposed additional fields or sidecar documents must be mapped to the existing schema and versioned explicitly. Do not create a second competing lifecycle or covertly add forbidden properties.

Generate current task/scope/manifest summaries from the accepted event and actual file inventory where appropriate. Generation is a projection with references, not a rewrite of immutable owner outputs. The generator must reject contradictory active claims rather than choosing the most optimistic one.

A pre-freeze repository publication transaction groups the genuine new payloads and their actual administrative coupling, then checks numeric/list/diff/manifest parity against that candidate. Post-freeze assurance publication uses section 5.5.1's S0/A/I1 rule instead of regenerating frozen coupling files. Use the expected base/tree or compare-and-set update. If the head changed, stop and reconcile the actual delta; do not overwrite concurrent work or force-push.

#### 5.7.1 One CS2 view and minimum artifacts

The default view is a derived handover, not another ledger or acceptance authority. Show these fields in a single concise view; detailed history and raw evidence are expandable links:

| Field | Required operator answer |
|---|---|
| Outcome / identity | Parent, wave, profile/revision and what is actually accepted so far |
| Material change | What changed since the last meaningful checkpoint; substantive versus administrative |
| Next owner / action | Who owns it, the eligible next step and whether it proceeds automatically |
| Blocker / wake-up | Exact unmet requirement, responsible owner, observable resumption trigger and watcher |
| Human decision | The exact decision required from Johan, or NONE; no generic “approve everything” |
| Evidence / limits | Links to checks/verdicts/receipts, unresolved risks, actual measured or UNKNOWN accounting |

Record each fact once at its authoritative producer and reference it thereafter. The existing job record, owner outputs and decision events remain authoritative; views, counts and indexes are projections. A new work unit adds only a required output or real decision/change. Group required session/proof/learning material into the existing role-owned records where canon permits; do not add a second manually maintained packet to repeat the same claim.

Minimum sets: product work needs its approved envelope, actual producer/QA outputs and applicable QP/ECAP/IAA/integration/validation evidence; agent-contract work uses the class-matched contract/Tier 2/integrity bundle and required owner/assurance records; governance/gate work adds the exact rule/behavior reproduction, replacement checks and migration authority where needed; admin reconciliation adds the exact corrected payload and publication/parity receipt, reusing valid existing owner evidence. Mandatory learning/memory records remain required, but their facts need not be recopied into every view. A proposed extra artifact must identify the distinct obligation it serves.

Acceptance demonstrations must show that Johan can identify the next owner/action and any reserved decision from this view without reconciling documents, that authoritative facts are not manually re-entered, and that an ordinary correction creates no redundant appointment or full review cycle. Do not require an optional database/service before an otherwise authorized manual correction; do require proven coordination before claiming automatic multi-worker dispatch.

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

#### 5.8.1 Continuation and wake-up ownership

Within accepted scope/authority, usable accounting and the applicable profile, ordinary repair and eligible continuation are obligations of the existing owners; they do not wait for another human permission. Active CS2 owns end-to-end continuity, Foreman owns delivery correction/appointment, and CodexAdvisor owns continuity of its authorized factory task. The controller enforces legality rather than taking managerial decisions.

| Event | Watcher / accountable continuation |
|---|---|
| Builder/QA/producer return or changed source | Existing manager receives and validates it; Foreman requests the affected repair/QP/checkpoint, CodexAdvisor resumes its factory task |
| Publication acknowledgement, CI or IAA result | Publication/check adapter delivers the source-bound event; Foreman/factory manager reconciles it and requests the eligible next step |
| Reserved decision or changed provider capability | Trusted intake/capability observer records actual changed evidence; assigned manager revalidates the dependency once; active CS2 retains parent visibility |
| Wave validation completes | Active CS2 verifies dependencies and requests the next approved wave; controller prevents duplicate release |
| Lost event, timeout or restart | Coordinator's reconciliation watcher checks outstanding intents/claims against actual external outcomes before any retry |

Each blocked item persists watcher identity, observation method, last observed input revision and next supported observation/reconciliation condition. A dead subscription is a continuity fault owned by the coordinator/manager, not permission to redispatch the implementation. Do not invent new polling/time/budget limits; use the accepted runtime configuration. If a watcher/controller/role is unavailable, show that fact and the supported manual owner. Manual execution does not claim active-CS2 automation or machine-breaker enforcement. Johan's pause of the 30-minute trial follow-up is retained; this design does not restart it.

For each rejection record one failed obligation, owner, needed source/publication/authority change and affected re-entry. Unchanged evidence causes no fresh appointment/review/escalation. Genuine changed input reopens only affected obligations; preserved scoped PASSes and unresolved others remain visible. Programme review checkpoints in section 7 apply to this migration, not every routine steady-state correction.

#### Proposed initial local coordination backend

The working clones are inside OneDrive. Keep the authoritative live claim/event store outside synchronized working trees, in a deliberately configured non-synchronized local application-data directory. Repository copies are immutable audit exports, not independent live coordinators.

For a later automated local pilot, one SQLite database behind one coordinator service is a proposed backend option, with transactional revision checks, unique action keys, a durable outbox and verified backup/restore. It is not a dependency of this manual design/correction programme. WAL requires same-host coordination; it is not a distributed database. Use a patched supported SQLite release and durable commit settings. The Python runtime inspected for revision 0.1.0 reported SQLite 3.49.1; it was not declared suitable for this future service. Official SQLite documentation checked for that revision identified the WAL-reset fix in 3.51.3 and later, or named fixed backports. Reverify an appropriate supported patched build when selecting the actual implementation; no software is installed by this proposal.

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

Acceptance occurs in this order. These are outcome names for evidence, not replacement job-state enums:

| Outcome | Required evidence / authority | What it enables; what it does not claim |
|---|---|---|
| SOURCE_RELEASE_ACCEPTED | Actual reviewed source/tree, policy/schema versions, applicable source QA/admin/independent assurance and Johan's accepted rollout instruction | Prepare/adopt that release within the named cohort/pilot; no claim that consumers already adopted it |
| CONSUMER_ADOPTED | Accepted source release, target's exact adapted diff, required checks/review, actual update and acknowledgement/parity | That consumer's accepted use within its authority; no claim of aggregate rollout or runtime activation |
| ROLLOUT_ACCEPTED | Actual results for every target in the accepted rollout cohort, explicit dispositions for every inventoried target, residual/deferred obligations and Johan's rollout checkpoint | Proceed to the agreed next programme phase; “all intended repositories updated” only when each intended target actually adopted |

One accepted **source** release identifies the authoritative source tree/commit that actually exists, canonical raw-byte hashes, policy/schema versions, role/Tier 2 changes, adapter requirements and expected tests. Its acceptance does not depend on its future consumer acknowledgements. Do not invent a canonical commit for an uncommitted artifact.

For each intended consumer: locate and verify origin/role, snapshot branch/head/working changes, classify local divergences, prepare the exact adapted diff, validate agent/Tier 2/Tier 3/gate parity, and record a consumer acknowledgement after the actual accepted update. A file copy or registry notification is not successful layer-down.

Do not overwrite an uncommitted change, switch a user's branch, copy the entire governance repository into an application, or silently drop an unlocated consumer. Preserve target-specific constraints. If a repository uses another host/toolchain, its validated adapter must express the same requirements.

Compatibility must be explicit during migration. Old evidence remains readable under its original policy; new-policy eligibility is evaluated against an explicit cross-version map. Unknown or mixed policy versions block the dependent transition instead of “latest file wins.”

Name the rollout cohort and pilot before adoption. An unlocated/unready consumer blocks its own adoption and any dependent/global-completion claim; it does not block source preparation or an independently accepted ready pilot. Only Johan can accept deferral or change the intended rollout scope. Show ADOPTED, DEFERRED_WITH_AUTHORITY, BLOCKED or NOT_APPLICABLE_WITH_BASIS for each inventoried target in the rollout view; these are proposed disposition values requiring schema mapping, not silently installed enums. A deferred target retains its obligation and is never counted as updated. Existing PR integration remains deferred until Johan's agreed rollout handover; source acceptance alone does not release it. Runtime activation remains a separate decision with actual readiness evidence.

### 5.13 Worked End-to-End Routes

The following are design walkthroughs and future acceptance scenarios, not claims that a real job has run. They use the same parent identity/ledger and accepted limits throughout. References to an active-CS2/controller action describe the target operating system, not currently installed automation. In the local migration programme Johan and the explicitly named local owners use the honest manual route.

#### A. Product feature, rejection, repair and next wave

1. Johan approves intent, wave dependencies and envelope. Active CS2 accepts parent ownership and requests the first eligible wave; controller verifies authority/dependencies/accounting and claims it once. Intake emits the existing job/context record, not duplicate approval packets.
2. Foreman prepares requirements/architecture and obtains relevant accepted RED evidence from the authorized QA producer. IAA issues the actual prospective pre-brief. Foreman appoints the bounded builder after those prerequisites; builder implements and self-checks, publishing its actual records through its permitted route.
3. Foreman performs source QP. If it rejects a real defect, it routes one precise finding to that builder under the existing appointment where permitted. The parent stays owned; counters are preserved. An unchanged return cannot cause another review. A genuine fix returns to the affected checks/QP, retaining unaffected evidence.
4. After actual source acceptance, ECAP validates profile, inventory and administration. The publisher couples actual owned records before freeze. Foreman's earlier checkpoint can pass with final assurance/release flags still false. Complete the applicable submission checks, S0 inventory and exact A allowance before final IAA.
5. IAA independently reviews H0. On PASS, publish its actual declared outputs; verify I1 and current-head checks as section 5.5.1 specifies. Foreman returns the source-bound binding result; active CS2 reviews it. Only the actor actually permitted by integration policy integrates; a reserved human decision goes to Johan once.
6. Validate the integrated functional/regression result. Active CS2 requests the next already approved wave only when dependencies are validated; it cannot add scope or replenish limits. After all selected waves, verify integrated job acceptance and the retained human acceptance outcome. One merge never completes the parent by itself.

#### B. Protected agent-contract amendment

1. Johan authorizes the exact agent-factory target/scope. CodexAdvisor verifies its actual installed contract, correct class checklist, canon inputs, permitted paths and independent review route. It supplies a contract profile and task context; active CS2 retains parent visibility where this is part of an approved parent, without replacing the factory author.
2. Establish the relevant failing contract invariant/negative fixture and prospective assurance scope required by the accepted profile. CodexAdvisor authors the target contract, minimum Tier 2, learning registry/index and integrity records within actual authorization. Do not fabricate an application RED suite or send normal product coding to CodexAdvisor. Outside-boundary gate/schema work uses the named authorized owner/Foreman route.
3. Run actual class-matched source checks/QP, publish genuine creator records, and obtain applicable ECAP/checkpoint evidence. Freeze S0 plus the exact independent-output allowance; mandatory final IAA remains required for contract changes. Transport uses the accepted local or hosted adapter, never a fake PR number.
4. IAA under unchanged trusted authority evaluates the identified candidate, issues its actual outputs, and the publisher/verifier complete I1 and current checks. Johan controls the authority-adoption decision. Liaison applies only the accepted release to each intended consumer and returns actual parity/acknowledgement; candidate publication does not activate the changed agent.
5. If the target is CodexAdvisor's own contract, stop that author's write before step 2 and use section 5.6's human/different-author route. For an IAA authority change, the candidate is not used to certify itself. An unavailable independent route yields one precise assurance blocker and preserves prepared work; no repeated uninstalled-profile invocation or implicit waiver.

#### C. Ordinary record/publication correction

1. A genuine source-QP report exists but the current mutable scope/manifest omitted its path. The existing publisher/manager verifies the actual owner output and classifies the omission as ADMIN_RECONCILIATION only if source, verdict, authority, dependencies and required QA meaning are unchanged.
2. Record the existing failure and prepare the smallest correction to actual scope/count/manifest/task references. Reuse the genuine report/session and prior applicable QA; no new builder appointment, product RED suite or duplicate reviewer is created just to copy its verdict.
3. Before freeze, atomically publish the exact correction and necessary coupling after schema/parity/current-head concurrency checks. Return one receipt to the manager. ECAP rechecks the affected administration and Foreman resumes the eligible checkpoint; active CS2 retains parent continuity. A missing final IAA token does not prevent honest earlier preparation and does not grant final release.
4. If this defect is discovered after freeze, an edit to S0 is not an allowed assurance append. Create the next truthful evidence revision, re-evaluate affected administration/assurance under the profile, and preserve the old rejection and unaffected source QP. Do not rebuild unchanged product code or demand a future verdict to publish its inputs. If the correction actually changes policy/gate behavior, reclassify it as GOVERNANCE_GATE rather than hiding it as metadata.
5. The derived CS2 view now shows “source QP accepted; administrative correction published; next owner Foreman; final assurance pending; human decision NONE” when those are the actual outcomes. It does not claim whole-job completion.

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

This document is work package 1, now revised to 0.2.0 under Johan's instruction to implement the review corrections. Hand it back, record requested changes against this revision and repeat until the identified design revision is accepted. Do not treat a request to review/correct the design as acceptance of live implementation.

After every subsequent work package or agreed logical interval, hand over: accepted instruction/revision, actual scope, files and raw diff, behavior changed, checks with actual outcomes, residual risks, rollback point and the precise next action. User review and governed role acceptance are recorded distinctly.

These human checkpoints govern this correction/rollout programme. Normal steady-state in-envelope repairs follow section 5.8.1 automatically through their existing owners. Do not convert this programme's handovers into a new standing per-repair permission requirement. The 30-minute recurring follow-up was paused at Johan's explicit request; it remains paused until an actual resumption instruction.

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

First obtain SOURCE_RELEASE_ACCEPTED without requiring future consumer adoption. For each repository in the accepted rollout cohort, compare against that immutable source release; generate its exact adapter/contract/Tier 2/Tier 3/gate changes; validate; hand over; apply the accepted change; verify actual byte/version/behavior parity; record CONSUMER_ADOPTED. Then evaluate ROLLOUT_ACCEPTED against the cohort and all inventory dispositions. Do not mark all consumers complete based on one successful repository or count a deferred target as updated.

### 7.5 Rollback and Existing PR Integration

Rollback restores a previously verified policy/adapter/source snapshot without deleting subsequent decisions or resetting counters. Never “roll back” by replaying a stale side effect, discarding a later valid owner record or erasing a rejection.

After rollout acceptance, inspect each existing PR against the accepted policy and actual current source. Classify reusable source, still-valid scoped evidence, superseded transport/administrative records, outstanding substantive defects and external blockers. Reuse unaffected accepted work. Produce actual compatibility or correction evidence before final assurance; do not bulk close, merge, rebase or rewrite old PR history.

## 8. Approval Requirements

### 8.1 Current Authority and Next Decision

Current authority is Johan's direct local instruction to prepare the design, followed by his instruction to implement the identified review corrections into this next revision and return it. No issue or PR is required. Revision 0.2.0 remains REVIEW and non-normative until he accepts an identified revision; no live gate, contract or consumer correction is claimed performed here.

The next human checkpoint should decide whether this design's operating model and migration boundaries are accepted, and identify the first implementation work package. This is a review checklist, not an assertion that approval has been received.

### 8.2 Separate Decisions

Record design acceptance, a bounded source correction, any legacy-rule supersession, independent QA/IAA outcome, per-consumer adoption, remote publication/integration and activation as separate facts. One may authorize several explicitly named actions, but cannot be inferred to authorize unnamed actions or provide an independent outcome.

Keep budgets and authority changes explicit. Mandatory independent assurance is not supplied by the implementing agent's self-check or by a human acknowledgement of this draft. Any accepted change to a governance requirement must name the replacement requirement and its validation.

The direct local mode and its equivalent evidence route need explicit source/schema alignment during implementation; source README/constitution/contract statements requiring issues/PRs must not remain contradictory active instructions. The design instruction is recorded here as the actual authority for this preparation rather than represented as a fictitious GitHub carrier.

## 9. Implementation Plan

### 9.1 Reviewable Work Packages

| Work package | Deliverable | Handback / dependency |
|---|---|---|
| WP1 — this design | Versioned proposal, complete role/profile model, S0/A/I1 assurance sequence, CS2 view, migration and acceptance suite | Human review; 0.2.0 implements R01–R07 as proposed design corrections, not live rollout |
| WP2 — exact conformance audit | Complete clause-to-contract-to-gate-to-runtime matrix; duplicate/conflict disposition; full target inventory; exact edit plan | Human review of scoped policy changes and transport/override procedure |
| WP3 — governance/gate foundation | Accepted canonical clarifications, schema migrations, derived requirement interface and demonstrated stage/proof fixes; align finite IAA-output allowance, classifier, scope/manifest verifier and non-committing binding receipt together | Source checks, applicable independent review and human handback; no live activation |
| WP4 — role expertise | Coherent Tier 1/2/3 and integrity updates for ECAP/IAA first, plus affected Foreman/author/liaison interfaces | Role conformance and adversarial walkthroughs; genuine independent assurance of role changes |
| WP5 — local pilot and runtime proof | Prove the accepted manual local adapter separately from production automation; demonstrate missing generic controller/claims/watchers/recovery in the authorized runtime location before automatic dispatch | Actual evidence and contained rehearsal for each claimed capability; no service/database prerequisite for an independently authorized manual correction |
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
| V05 | The selected accepted profile requires prospective pre-brief or accepted RED, but it is absent before its dependent action | Dependent action rejected; no retrospective fabrication or invented product RED for a different profile |
| V06 | S0 frozen, then actual IAA PASS and required final records arrive | S0 proof/scope/manifest bytes unchanged; exact finite assurance additions and I1 parity verified |
| V07 | Expected assurance reference exists but no issued token | No assurance PASS inferred |
| V08 | “Token-only” append also changes code, policy, dependencies, base or an unpermitted summary | Prior assurance not reused; affected reassessment required |
| V09 | Validated permitted assurance append preserves all substantive bindings | No unnecessary source/pre-brief review; fresh current-head/token/binding checks run with truthful new identities/outcomes |
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
| V27 | Actual candidate diff differs from its stage inventory: S0 before freeze, or S0 union validated A_actual after freeze | Publication/integration rejected with exact discrepancy; prospective permission is not counted as an existing file |
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
| V38 | All intended consumers claimed updated | Each has actual acknowledgement/parity; accepted deferral cannot be counted as adoption |
| V39 | Rollback after partial rollout | Verified previous policy restored where authorized; later events/history/counters retained |
| V40 | Prompt/document asks a role to ignore authority or fabricate evidence | Treated as untrusted task data; rejected |
| V41 | Existing old PR reviewed after rollout | Actual compatibility/delta analysis; scoped valid evidence reused, no bulk historical rewrite |
| V42 | ECAP or IAA instruction contradicts canonical requirement registry | Conformance gate detects before appointment/use |
| V43 | OneDrive copy or a second host tries to act as another ledger authority | No duplicate writer; explicit fenced authority transfer required |
| V44 | Unsupported database build, journal loss, backup inconsistency or power-loss recovery failure | Dependent automated coordination/activation rejected until verified; unrelated authorized manual preparation not blocked |
| V45 | Human requests review or changes but has not accepted the identified design revision | Remain in design review; no inferred implementation acceptance |
| V46 | Every named role receives the same job context | Each identifies its input, output, decision, continuation owner and prohibited substitutions; active CS2 remains distinct from human CS2/controller |
| V47 | Two already approved dependent waves become eligible in order | Active CS2 progresses them through Foreman without human redispatch of routine steps; actual integrated acceptance and conserved limits still required |
| V48 | Product, agent-contract, mixed governance/gate and administrative-only work classified | Accepted policy selects required/adapted/inapplicable controls; no actor-chosen exemption, invented RED or metadata disguise of a gate change |
| V49 | Final IAA token/session/wave files add paths and fresh CI has different run IDs | S0 preserved, mandatory A_actual authenticated and I1 verified; new token/current-head checks allowed, new substantive failure still blocks |
| V50 | Routine source/publication defect repaired, followed by duplicate observation | Existing owner resumes affected stages exactly once for new input; unchanged event creates no fresh appointment/review |
| V51 | Dependency changes, a subscription is lost, or human authority is revoked | Named watcher/manager reconciles and resumes eligible work; dead watcher is surfaced; revoked/stale claims cannot create new effects |
| V52 | Ready source/pilot but another registered consumer is unlocated | Source acceptance and separately authorized pilot may proceed; missing target is explicit; aggregate/all-repository claims remain bounded to actual accepted scope/results |
| V53 | Worker writes a receipt claiming human approval without trusted source, or reuses revoked authority | Authority verifier/manual non-author review rejects it; no worker-created override |
| V54 | Operator inspects normal progress and one ordinary correction | One CS2 view answers outcome/change/owner/blocker/decision/evidence; authoritative facts entered once and no redundant packet/appointment |
| V55 | Authorized human-directed correction while optional coordinator infrastructure is unavailable | Accepted manual route prepares/validates it honestly; no false active controller or dependency on installing the future database |
| V56 | CodexAdvisor-own-contract or IAA-authority update requested | Named different/human author route and unchanged trusted independent assurance; no self-modification/self-certification or inferred activation |
| V57 | A mandatory IAA final output was omitted from the frozen allowance | No dropped record or wildcard expansion; reconcile the exact envelope at affected stage before publication, preserve old evidence/parent/accounting |

### 10.2 Levels of Proof

Separate document/schema conformance, unit tests, actual gate/adapter integration, runtime fault injection, supported real-agent invocation, consumer parity and human acceptance. Fixtures or a successful outer workflow do not prove live generic dispatch, independent assurance or machine-breaker enforcement.

Demonstrate the old failing behavior against actual relevant source before claiming a fix. Execute the corrected path and negative controls; retain raw results and their source identities. Run affected checks after substantive changes, not an unchanged full-review cycle after every observation.

Acceptance is scoped to the claimed outcome. Source-release acceptance needs applicable source/admin/assurance evidence and accepted rollout authority, not future consumer acknowledgements. Consumer adoption needs that target's actual update/checks/parity. Aggregate rollout acceptance needs the named cohort outcomes and every inventory disposition. Runtime activation additionally needs actual generic runtime/recovery/issuer/accounting proof and its separate human decision. No outcome may claim the later outcome's completion; unknown dependent accounting or missing independent assurance is never converted to PASS.

### 10.3 Requirement-to-Validation Coverage

| Requirement | Acceptance cases |
|---|---|
| ADM-01 | V22, V35, V36, V47, V48 |
| ADM-02 | V01, V02, V03, V04, V05, V26, V48, V52 |
| ADM-03 | V01, V02, V04, V11, V13 |
| ADM-04 | V05, V06, V31, V32, V36, V48 |
| ADM-05 | V10, V14, V15, V28, V33 |
| ADM-06 | V07, V11, V12, V13, V34 |
| ADM-07 | V06, V08, V09, V27, V34, V49, V57 |
| ADM-08 | V17, V18, V19, V20, V21, V43, V44, V50, V51 |
| ADM-09 | V22, V23, V24 |
| ADM-10 | V12, V26, V27, V42 |
| ADM-11 | V04, V25, V26, V33 |
| ADM-12 | V29, V30, V32, V51, V53, V56 |
| ADM-13 | V16, V20, V21, V37, V38, V39, V43, V44, V52 |
| ADM-14 | V11, V36, V39, V45, V47, V50 |
| ADM-15 | V10, V12, V28, V40, V42 |
| ADM-16 | V19, V22, V41 |
| ADM-17 | V10, V28, V46, V47, V48, V56 |
| ADM-18 | V14, V17, V44, V50, V54, V55 |

Coverage is traceability, not proof that these proposed tests passed. Implementation must produce actual results and identify any additional case required by the final concrete design.

### 10.4 Design Review Checklist and Open Items

WP1 is ready to review when its proposal structure, references, authority boundaries, known-source findings, lifecycle, local transport, override protocol, expertise plan, recovery, accounting, migration and acceptance cases are inspectable.

Open items for the next reviewed revision or WP2:

1. Confirm the full intended repository inventory and locate missing registered consumers.
2. Select a production backend only for the automated runtime package; specify exact local/manual/hosted adapter interfaces and runtime implementation location without gating this design on a database.
3. Specify the minimal compatible schema evolution for stage/local/unknown-accounting evidence.
4. Resolve exact clause/contract/gate conflicts and compile the file-by-file edit plan.
5. Bind the supported independent review/issuer and trusted authority-receipt implementation for the actual package; the ownership/own-contract rules in sections 5.4/5.6 are fixed design constraints, not deferred trust choices.
6. Establish durable accounting from evidence or an explicit human-approved reconciliation; do not infer a reset.
7. Define the accepted release snapshot and per-consumer rollback/acknowledgement format.

These are explicit design decisions to finish, not hidden assertions of perfection, new automatic blockers on this design handover, or a requirement to open issues/PRs.

### 10.5 Disposition of the Critical Review

The following means ADDRESSED_IN_DESIGN, not independently verified closure, accepted canon or an executed runtime result. Review R01–R07 remains historical evidence against 0.1.0; do not overwrite its findings or claim it reviewed 0.2.0.

| Finding | Revision 0.2.0 correction | Acceptance coverage |
|---|---|---|
| R01 | Sections 2.1, 5.2 and 5.6: human/active CS2, Foreman, CodexAdvisor, builders/QA and other roles explicit; own-authority route defined | V46, V47, V56 |
| R02 | Section 5.5.1: exact S0/A/I1 inventories, required independent final records, shared parity/classifier amendment and non-committing binding result | V06, V08, V09, V27, V49, V57 |
| R03 | Sections 5.2.1 and 5.13: policy-owned profile selection, mixed-work union, applicable controls and three worked routes | V05, V48 |
| R04 | Sections 5.12, 7.4 and 10.2: ordered source/adoption/rollout outcomes and explicit cohort/deferral treatment | V37, V38, V52 |
| R05 | Section 5.8.1: automatic in-envelope continuation, named wake-up watchers/owners and affected-stage re-entry | V17, V18, V47, V50, V51 |
| R06 | Section 5.4.1: human source/recorder/verifier boundary, scoped instruction reuse and revocation fencing | V29, V30, V51, V53 |
| R07 | Sections 2.1, 5.7.1 and WP5: one CS2 view, minimum artifacts, single entry per fact and honest manual path independent of optional runtime storage | V44, V54, V55 |

### 10.6 Actual Document Verification for Revision 0.2.0

Author document checks completed: strict front-matter parsing with duplicate-key rejection; REVIEW/non-normative and inactive rollout/runtime flags; all 11 proposal sections; 18 unique requirements; 57 acceptance scenarios with complete requirement mapping; R01–R07 disposition coverage; all named roles/four profiles/three walkthroughs; local references; balanced code fences; valid UTF-8; original ten evidence rows preserved. The original proposal snapshot and critical-review report remain byte-identical to their recorded hashes. The tracked/staged governance source is unchanged. The existing 30-minute automation remains PAUSED.

These results establish document consistency and preservation only. The 57 scenarios are specified acceptance cases, not 57 executed runtime tests. No independent review of 0.2.0, project IAA, live gate/contract change, consumer adoption, activation or human design acceptance is asserted. Return this identified revision for the next agreed review.

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
- [Agent contract management](../canon/AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md), [contract protection](../canon/AGENT_CONTRACT_PROTECTION_PROTOCOL.md), [IAA canon](../canon/INDEPENDENT_ASSURANCE_AGENT_CANON.md) and [CodexAdvisor contract](../../.github/agents/CodexAdvisor-agent.md); bases to reconcile when binding profile applicability and author/assurer routes.
- [Critical review of revision 0.1.0](../reports/ADMINISTRATION_SYSTEM_DESIGN_CRITICAL_REVIEW_2026-10-15.md) and its [byte-preserved reviewed snapshot](../reports/historical/ADMINISTRATION_SYSTEM_DESIGN_0.1.0_2026-10-15.md).
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
| 0.1.0 review | 2026-10-15 | Actual separate independent design review plus author's source checks recorded R01–R07 | REVISE BEFORE DESIGN ACCEPTANCE; review report and original snapshot preserved; not project IAA |
| 0.2.0 | 2026-10-15 | Johan instructed implementation of those corrections; revised roles/profiles, finite assurance publication, release ordering, continuation, authority receipts and simple CS2 view; extended acceptance specification | REVIEW; author document checks passed as section 10.6 records; no independent review of 0.2.0, live governance/gate/contract changes, rollout or activation asserted |

This proposal is not entered into CANON_INVENTORY as accepted canon. This handover supplies the requested corrected design, revision 0.2.0, for the agreed next review. Acceptance and later adoption require an identified revision and actual evidence; neither the correction instruction nor this document's existence supplies them. The trial's recurring 30-minute follow-up remains paused.

