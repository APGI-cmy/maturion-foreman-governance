---
proposal_id: PROPOSAL_2026-10-15_ADMINISTRATION_SYSTEM_DESIGN
proposal_schema_version: v1.0
design_version: 0.3.0
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
- **Affected Governance Artifacts**: the canon, schema, gate, template, contract and knowledge families mapped in sections 4, 6 and 9. This work package revises the design and preserves its reviewed snapshots; it changes none of those governing sources.
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

The later instruction, “Please fix the gaps you identified”, authorizes revision 0.3.0 against N01–N03 in the [author review of 0.2.0](../reports/ADMINISTRATION_SYSTEM_DESIGN_REVIEW_0.2.0_2026-10-15.md). The reviewed [0.2.0 snapshot](../reports/historical/ADMINISTRATION_SYSTEM_DESIGN_0.2.0_2026-10-15.md) is preserved at SHA-256 `1aa2ccc9a241b5cee4d41f6d18e62342397c4e130c31c700f3a2d5be1e26c776`. That review was the author's further critical pass, not a second independent review. This revision proposes explicit closing-record, classification and automation corrections; it does not install them or assert independent closure.

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
| ADM-04 | Separate ownership profiles from one authoritative risk/assurance mapping; preserve stronger job-specific controls and adapt QA without irrelevant artifacts or actor-selected exemptions. |
| ADM-05 | Every material input/output has an authorized owner, permitted path, authenticated provenance and supported publication route. |
| ADM-06 | Preserve immutable historical reports; derive current views without making the projection an authority to change verdicts. |
| ADM-07 | Separate source/submitted/current identities and actual inventories; account for finite PASS/rejection/learning/closure outputs without editing frozen inputs, assuming PASS or requiring future acknowledgement before issuing a rejection. |
| ADM-08 | Use durable revisions, claims, action-specific idempotency, a trusted effect dispatcher and independent supervision; assign wake-up ownership and reconcile in-flight/uncertain outcomes before retry. |
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

#### 5.2.1 Ownership profiles and one assurance classification

A profile assigns work and adapts evidence. It does **not** select an exemption or create an additional blanket assurance obligation. The risk/assurance mapping below is the single proposed applicability source; contracts, Tier 2 methods and gates must reference its accepted canonical version. Knowledge **Tier 1/2/3** describes instruction layers; risk **T1–T6** describes ceremony. They are different concepts.

| Profile | Producer / accountable manager | Relevant quality evidence | Completion and re-entry |
|---|---|---|---|
| PRODUCT_IMPLEMENTATION | Foreman-appointed builders/QA; Foreman manages; active CS2 owns parent | Plan/architecture, relevant accepted QA-to-RED, builder checks and Foreman source QP | Authorized integration and functional/regression wave validation; repair only affected stages |
| AGENT_CONTRACT | CodexAdvisor under explicit human factory authorization, except the own-authority routes in 5.6 | Class-matched checklist, failing contract invariant/negative fixtures, minimum Tier 2/integrity bundle and required genuine source QP; no invented product RED | Human-controlled source/authority adoption and actual target parity; publication alone activates nothing |
| GOVERNANCE_GATE | Permitted governance administrator or appointed executable implementer; protected contracts separately routed | Exact contradictory clause/failing predicate, accepted replacement invariant, actual positive/negative controls and applicable source QP | Source release before consumer adoption; re-enter changed requirements, not unrelated product build |
| ADMIN_RECONCILIATION | Existing original owner/publisher; existing manager retains responsibility | Actual owned payload, schema/scope/parity checks and unchanged substantive bindings | Corrected affected stage only; reuse valid QP/assurance within its actual scope, no successor appointment |

**Proposed authoritative risk/assurance mapping.** Retain the IAA canon's T1–T6 vocabulary. Ceremony phases refer to that canon's definitions; the full lifecycle remains available without requiring an irrelevant product artifact. These rows replace the duplicated profile-stage assurance matrix in 0.2.0. ECAP's full bundle is required for T1/T2 and the protected-control overlay below; lighter rows use only their actual record/publication checks unless a stronger accepted obligation applies. This ECAP applicability is an explicit proposed clarification of ECAP protocol sections 3.2 and 5–7, not a claim that its current full-bundle wording already provides these exclusions.

| Risk / semantic selection | Quality / ceremony | ECAP and submission administration | Prospective / final independent IAA |
|---|---|---|---|
| T1 — autonomous agent-contract or agent-integrity change, including CS2-directed candidates in this design | Full five-phase contract route, integrity and class checks; FFA-01/03; contract invariant replaces irrelevant product RED | Full applicable bundle, genuine owner records and manager checkpoint | Required prospective scope before dependent implementation; final IAA mandatory |
| T2 — product/build deliverable: schema, API, hooks, frontend, equivalent executable product behavior | Full five-phase route, relevant RED/QP, wiring trace and FFA-01 through FFA-05 | Full applicable bundle and Foreman checkpoint | Required pre-brief and final IAA |
| T3 — canon/architecture clarification with no protected-control effect | Canon's CS2 Direct Review OR phases 1, 2, 4; FFA-01/03 and relevant source checks | Required scope/provenance/publication checks; no separate full ECAP session solely because a canon path changed | No new IAA solely from this tier; actual human review/accepted ceremony and stronger obligations still required |
| T4 — CI/workflow/script plumbing with no protected-control effect | Canon's CS2 Direct Review OR phases 1, 4; FFA-02 trigger/wiring checks plus relevant regression | Actual changed checks, scope and publication receipt; no blanket full ECAP session | No new IAA solely from this tier; protected-control changes take overlay below |
| T5 — ordinary Tier 2 method/knowledge maintenance without changing authority, mandatory controls or their interpretation | Source self-attestation and CS2 spot-check under accepted policy; actual references/freshness checked | Only actual required owner/memory/publication records | No new IAA solely from this tier; substantive policy hidden in knowledge takes the overlay |
| T6 — documentation/admin/parking/housekeeping with no substantive, policy or assurance effect | Relevant payload/schema/parity checks; actual human integration authority | Minimum truthful records; reconcile existing bundle only if affected | No new IAA solely for copying a valid owned fact; prior required final assurance remains outstanding |
| Protected-control overlay — any path changes agent authority, mandatory QA/assurance, safety, budgets/breakers, eligibility/evaluator decisions, evidence acceptance or gate enforcement semantics | Relevant invariant, adversarial rejection controls and applicable source QP; retain union of base-tier checks | Full applicable ECAP bundle and manager checkpoint | Prospective scope and final independent IAA required; path/extension/label cannot reduce this obligation |
| Stronger accepted job-specific obligation | Retain all actual required source, QA and validation controls | Retain required ECAP/administrative acceptance and accepted bootstrap boundaries | Retain required pre-brief/final IAA; **this existing parent retains its mandatory independent assurance** |

Selection and precedence are deterministic: (1) derive every applicable base tier from actual content and changed paths; (2) add semantic protected-control requirements; (3) add stronger accepted job-specific obligations; (4) take the **union** of checks/owners, retaining the highest applicable ceremony. T1+T2 retains product wiring/all FFA checks as well as contract integrity. An unchanged required final IAA cannot be removed by describing one repair as T6. A gate predicate correction that changes acceptance is protected-control work even if its diff is one line. A typo in explanatory prose may be T3/T6 only when no operative meaning changes.

The accountable manager proposes the classification with clause/content evidence; the accepted registry/evaluator verifies it through policy checks independent of the producer's claim. Where human/administrative review is required, its existing checkpoint verifies the same mapping; do not appoint a separate reviewer solely to classify each ordinary repair. IAA evaluates classification when assurance is already applicable; **a new IAA appointment is not required solely to decide that a demonstrably T5/T6 task is exempt**. Manual preparation records the actual non-author/CS2 check at that checkpoint, not a fictitious evaluator run. A producer cannot approve its own exclusions. Genuine ambiguity blocks only the dependent action, uses the stricter applicable controls meanwhile, and routes **one exact classification decision** to human CS2. Persist the decision and evidence; unchanged agents do not refer it back and forth. A later material input can justify a new decision.

These are proposed policy replacements, not active waivers. WP2/WP3 must align the following sources together before enabling the new mapping:

| Existing obligation / contradiction | Explicit proposed disposition and reason |
|---|---|
| IAA canon Risk-Tiered Ceremony / Trigger tables permit T3/T4 direct review; Tier 2 FAIL-ONLY-ONCE A-018 nevertheless makes canon/workflow/script paths mandatory triggers; A-015 also limits exemption classification to IAA | Keep risk-proportionate base tiers; replace unconditional path-only triggers and exemption-only IAA appointment with the accepted semantic mapping above. Retain A-015's full evidence duties for actually triggered work; ceremony-template semantics take the protected-control overlay. This removes needless review without dropping material control assurance. Reconcile linked contract/gate predicates and tests; Tier 2 must not remain competing policy |
| IAA canon's sole-CS2-authored T1-to-T3 reduction | This target design retains final independent IAA for all agent-contract changes, including human-authored candidates; explicitly supersede that reduction when accepted. A human instruction or Git co-author name is not an independent verdict |
| ECAP full-completed-job language versus a T5/T6 metadata-only repair | Require full ECAP for T1/T2/protected controls and any stronger job obligation; lighter work uses the row's actual records, reusing existing administration rather than commissioning a duplicate full ceremony |
| Existing parent QP/ECAP/IAA and one-time bootstrap decisions | Preserve their stronger obligations and exact limits; generic T3/T4/T6 rows do not retroactively waive them or install candidate roles |

Until accepted canonical amendments, matching contracts/knowledge/gates and transition tests exist, preserve current stronger obligations or use an expressly scoped human migration instruction with replacement checks. This proposal resolves the **target** choice; WP2 still owns the exhaustive clause/file conformance audit. No present-source conflict is declared repaired by this table.

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

Use one stage-aware parity rule across scope, manifest and assurance publication. An actual file inventory is distinct from a permission to produce a future output:

| Inventory | Meaning / validation |
|---|---|
| S0 — submitted inventory | Exact changed-file set/raw-byte hashes at frozen H0, including proof, scope, manifest, policy inputs and published owner records; actual parity checked before final IAA |
| A — finite closing-output allowance | Exact new paths, conditional obligation, producer and publication route for this review request's verdict, session/final wave, learning and any rejection follow-up. No future hash, wildcard or expected PASS |
| I1 — integration inventory | S0 union authenticated A_actual at H1; every H0 tracked blob is unchanged, additions satisfy A and actual closure conditions, and no undeclared change/deletion exists |

Before freeze the appointed independent instance and manager bind a stable review-request ID, actual invocation identity, H0 subject and exact outputs. Complete own housekeeping before freeze or declare exact new archive outputs. A required edit to an existing H0 file is **not** an addition. S0's FILES_CHANGED counts actual files only. Seal S0 through the existing event/check-evidence route after H0 exists; no file embeds its own raw hash or future containing-commit hash.

**Mandatory output contract.** Paths below are families for choosing exact destinations at appointment, not a wildcard grant. If several duties may lawfully share one record, use separate sections/references instead of duplicate files. The allowance records every actual chosen destination and producer.

| Outcome / record | Producer and destination | When required / continuation |
|---|---|---|
| PASS token OR REJECTION-PACKAGE | Actual IAA; one new review-specific verdict in `.agent-admin/assurance/` | Exactly the actual binary verdict; fixed per-PR filenames must be replaced by review-specific names under the accepted amendment, never overwritten |
| Independent review/final wave record | Actual IAA; new record in `.agent-admin/assurance/` if required | Findings, exact input and prior carrier links; no append to the frozen prospective carrier |
| Session and learning capture | Actual IAA; exact new own-memory file, with required learning section; separate new own per-session suggestion file only if required | All required fields, at least one concrete evidence-grounded improvement suggestion, recurrence/earlier-action dispositions; completion status must reflect actual closing duties |
| Rejection tracking / pending closure | Actual IAA; exact new own `escalation-inbox/` entry | Rejection items, source, actual delivery/ack status, accountable Foreman/factory manager and resubmission condition; repeat observations reference it |
| Delivery confirmation | Supported notification adapter/authorized sender; existing append-only event/check-evidence route | Actual recipient, channel/message receipt, verdict hash and remediation/re-entry content. A filed artifact alone is not delivery |
| Acknowledgement | Actual submitting owner/manager through trusted intake; existing append-only event route | Acknowledges the identified rejection, not acceptance or source correctness; IAA/manager cannot invent the submitter's reply |
| Final session close or closure addendum | Actual IAA instance; exact new memory/assurance path declared in A if a separate record is necessary | Only after own duties and, for rejection, required delivery/acknowledgement are satisfied; links prior records rather than rewriting them |

For a local adapter requiring delivery/ack receipts in Git, declare their **exact new paths and permitted genuine producers** in A before freeze. They do not become IAA-authored facts merely because published beside its verdict. Otherwise retain them in the existing event-evidence route, with real local source receipts and no false cloud notification claim. No new manual ledger is introduced.

**Learning capture versus rule adoption.** A newly detected pattern is captured in the session's immutable learning record under the reviewed policy version. It must be reflected in the actual verdict if it exposes a current failed obligation. Capturing a lesson does not install a new operative rule, change the just-reviewed policy or convert a failure into PASS. IAA never edits its existing reviewed FAIL-ONLY-ONCE registry after H0 to close this review.

This is an explicit proposed replacement of FAIL-ONLY-ONCE's Update Protocol and “Adding New Rules” clauses requiring a discovered rule/registry update in the same invocation bundle (current lines 8 and 637–644). The replacement requires **capture in this invocation**, plus a linked owned promotion obligation where a new operative rule is necessary. Preserve all existing seeds/history. IAA may later maintain its own permitted Tier 2 registry in a separately scoped, pre-freeze change under accepted policy; canonical/contract/authority changes go to the governance owner, CodexAdvisor or human route actually permitted. No new parent or replenished counters. Record owner, proposed rule/path, source evidence, eligibility trigger and disposition; active CS2/manager tracks it through resolution. Mandatory safety/control repair blocks its dependent acceptance/activation; optional future improvement has an explicit disposition without preventing valid unrelated delivery. Neither is silently dropped. New rules apply prospectively at an accepted policy revision, not retroactively to manufacture this verdict.

**Issue, deliver, acknowledge, close and resubmit are distinct facts.** A genuine rejection may be published immediately with the completed review/learning and escalation records while acknowledgement is absent. Mark review execution complete and administrative session closure pending; release the execution claim after durable handback. The manager owns delivery/follow-up and the named watcher wakes only on actual receipt/change. Missing delivery/ack leaves one blocker; it does not require a resident IAA process, repeat notification spam or another unchanged assurance review. Once genuine acknowledgement arrives, IAA's supported closing continuation produces its declared new close record; it does not rerun substantive review just to finish administration. Until then no whole-session COMPLETE or merge readiness is asserted. Repair preparation may proceed under existing authority; a dependent resubmission requires actual acknowledgement and evidence disposing **all** prior required findings.

These closing dimensions are proposed evidence fields, **not new installed top-level job states or verdict enums**. Explicitly align IAA contract steps 4.2–4.5 / INV-601–607, own-parity/close templates, the registry update policy and resubmission predicates in WP3/WP4. Current duties remain in force until accepted alignment or a bounded migration instruction; “pending closure” cannot silently excuse current mandatory work.

Illustrative allowance (each EXAMPLE path is resolved to an exact unique new path before use; no real session/verdict is asserted):

~~~text
H0/S0: actual source, policy inputs, owner records, proof, scope, manifest
A common: own memory/session-EXAMPLE-review.md (includes learning)
          assurance/iaa-review-EXAMPLE.md (where required)
A PASS:   assurance/iaa-token-EXAMPLE.md
A REJECT: assurance/rejection-EXAMPLE.md
          own escalation-inbox/rejection-EXAMPLE.md
          own memory/closure-EXAMPLE.md (only if delayed closing needs it)
Delivery and submitter acknowledgement: authenticated event receipts,
or exact adapter-required new Git destinations declared separately.
Only the actual verdict branch is mandatory; no PASS file on rejection.
H1/I1: S0 union actual permitted additions, never an H0-file rewrite.
~~~

Publish actual IAA verdict/review records as an atomic pack against the expected H0/current head. Rejection delivery/ack/closing may occur later: each subsequent append uses CAS, verifies cumulative A_actual, preserves all earlier blobs and records its actual producer/hash. Do not wait for future acknowledgement to publish the rejection. Integration is allowed only on the valid PASS branch with all applicable required outputs, current checks and human integration authority. A rejection stays a rejection, including after its administration closes.

Foreman's post-IAA binding is persisted in the existing event/check-evidence route, bound to H0/H1 and actual hashes; manual verification says no controller ran. No recursive source commit is needed. Exact permitted additions do not trigger another source QP/pre-brief/final IAA merely because H1 differs; material source/base/policy/authority changes still invalidate affected assurance. Align the old one-file ADMIN_TOKEN_ONLY classifier, carrier/session instructions, scope/manifest predicates and legacy committed-binding requirements together before this multi-record route is enabled.

**Omitted output or replacement instance:** A0 is frozen, finite and immutable. An authorized manager may propose an append-only envelope amendment in the existing evidence route, naming exact extra new paths/producer/instance, reason, prior allowance hash and input revision. The actual administrative/non-author verifier accepts it before output; publish no worker self-grant. This explicitly versioned route requires source/schema alignment. It preserves S0 and prior records, revalidates affected scope/independence/capabilities, and cannot permit an existing-file rewrite or change what was reviewed. A replacement has its own identity/records, never impersonates the old session. Recover and reuse a genuine completed old result when valid; if none can be established, retain one blocker and perform the actually needed independent review, not a fictitious resumed PASS. A changed substantive input instead requires a new truthful submitted revision. Preserve the parent, rejection history and accounting throughout.

### 5.6 Ownership, Publication and Tier Responsibilities

| Role | Own decision or output | Continuation / handback | Prohibited substitution |
|---|---|---|---|
| Human CS2 / Johan | Intent, approved scope/envelope, reserved policy/authority/budget decisions, agreed migration reviews and retained integration/activation decisions | One concise decision view; one actual instruction for each reserved matter/package | Human acknowledgement is not an independent IAA verdict |
| Active-CS2 agent | Approved parent ownership through every wave and integrated acceptance; evidence review, precise findings and requests for eligible progression | Dispatch eligible wave to Foreman; watch resumption; verify successor eligibility and parent completion | Does not build, appoint specialists, weaken gates, self-authorize or inherit human reserved powers; no activation implied |
| Foreman | Planning, applicable RED acceptance, specialist appointments, ordinary remediation, source QP, admin checkpoint and evidence binding | Supervise builders; route rejection to actual owner; return accountable evidence to active CS2 | Does not implement the delivery or replace independent IAA |
| CodexAdvisor | Authorized agent-factory contract changes, class checklist and minimum Tier 2/integrity/conformance bundle | Use its factory review/publication route; route outside-boundary prerequisite work through authorized Foreman | Not a product builder or Foreman; cannot change its own contract or assure its delivery |
| Builder agents / QA producers | Appointed source implementation, relevant RED/negative tests and self-check evidence | Return delivery/blocker to Foreman; repair under the same appointment where permitted | No self-appointment, self-acceptance, self-merge or protected contract authorship by convenience |
| ECAP | Expert stage-aware administrative validation, applicability/inventory reconciliation and publication handback | Return exact administrative outcome, missing obligation/owner and permitted next step to Foreman/factory route | Does not decide substantive quality, invent owner outputs or issue an IAA token |
| IAA | Required prospective pre-brief and independent assessment; actual verdict/token, immutable learning and required closing records | Return scoped PASS or precise rejection; report delivery/ack/closure separately and assign owned learning promotion | Does not implement/repair assured work or self-certify a candidate authority change |
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

**Own-authority change route:** CodexAdvisor authors authorized target-agent changes within its actual factory scope; it cannot author its own contract. The current IAA canon and SELF-MOD-IAA-001 reserve IAA-contract updates to human CS2: Johan authors that contract change; CodexAdvisor may prepare an inspectable proposal, not infer write authority from generic factory ownership. Any different author route would itself require an exact human-approved replacement of that protected rule before a write. For a CodexAdvisor-own-contract correction, Johan directly authors it or explicitly names a different permitted author and exact migration boundary before any write. Product builders do not acquire that authority implicitly. A separate non-author assurer operates under an unchanged trusted contract/policy; the changed IAA candidate cannot certify its own installation or be used as the sole independent assurance of its new powers. If no supported independent route exists, prepare the inspectable candidate and return that precise assurance blocker once. Preserve final independent QA and human adoption; no one-time ECAP substitute is generalized into an IAA waiver.

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

Git, comments, CI checks, agent dispatches and external applications are not one transaction. Use durable intent/outcome records and an outbox-style publication interface for nontransactional effects. A timeout does not prove an action failed. A worker fenced before dispatch must not start a new effect. An effect already dispatched to an external provider may still complete after fencing; record it as in flight/uncertain and reconcile it as specified below, rather than promising that a lease check cancels it. Runtime agent handles are instance-bound; never substitute a dead handle or profile name for a live invocation identity.

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

Each blocked item persists watcher identity, observation method, last observed input revision and next supported observation/reconciliation condition. A dead subscription is a continuity fault owned by the coordinator/manager, not permission to redispatch the implementation. Do not invent new polling/time/budget limits; use the accepted runtime configuration. If a watcher/controller/role is unavailable, show that fact and the supported manual owner. Manual execution does not claim active-CS2 automation or machine-breaker enforcement. An independent supervisor detects coordinator/watcher failure as section 5.8.2 specifies; a dead coordinator is not its own only monitor. Johan's pause of the 30-minute trial follow-up is retained; this design does not restart it.

For each rejection record one failed obligation, owner, needed source/publication/authority change and affected re-entry. Unchanged evidence causes no fresh appointment/review/escalation. Genuine changed input reopens only affected obligations; preserved scoped PASSes and unresolved others remain visible. Programme review checkpoints in section 7 apply to this migration, not every routine steady-state correction.

#### 5.8.2 Enforceable external effects and independent supervision

WP2 must specify, and WP5 must demonstrate, the **existing canonical** effect-control and independent-supervisor obligations before automated operation. A lease check in worker code or a Git expected-head comparison alone does not enforce current human authority.

Automated workers submit intents to one trusted effect-dispatch boundary; they do not hold a second direct credential route around it. The dispatcher validates the current claim/fencing token, authority epoch/revocation, input revision, permitted effect and budget immediately before admitting dispatch; records the accepted ordering; and owns credentials/publication. Revocation preceding admission refuses the action. A provider request already admitted may be uncancellable or complete later: inhibit dependent effects, retain the uncertainty and reconcile its authentic outcome. Revoke/disable the dispatcher on kill; never promise physical reversal of an admitted request. Local manual actions remain attributable to their actual human/authorized actor and do not claim this automatic enforcement.

Each adapter's acceptance dossier must contain the following operation-specific entries. Actual provider support is **UNVERIFIED here**; absence of a proven capability disables that dependent automated operation, not manual design work.

| Operation | Capability/authority checks required | Unknown or limited capability treatment |
|---|---|---|
| Git evidence/ref publication | Trusted dispatcher; exact expected ref/tree CAS, permission and epoch admission; payload/blob/commit lookup; conflict reconciliation | Git CAS protects content concurrency, not authority. Re-read outcome after timeout; no force update or guessed failure |
| Comment/notification | Actual authenticated sender/recipient, durable intent key, provider idempotency support or complete supported receipt lookup, cancellation semantics | Missing message in one observation is not proof of no send; keep uncertainty, avoid repeated notifications and route exact supported owner action |
| Agent invocation | Actual instance/appointment identity, dispatch key, provider task lookup and admission receipt, cancellation/result-recovery support | No copied profile/dead handle as completion. Recover actual invocation before retry; unresolved outcome quarantines dependent dispatch |
| Local file/publication adapter | Resolved path, expected prior hash/tree, actual writer and atomicity/recovery support; issuer provenance | Filesystem access is not human authority. Preserve concurrent edits; no unattended dispatch without its proven boundary |

For **every operation**, bind actual adapter/version, trusted dispatcher identity, native idempotency-key support, CAS scope, authority-check point/epoch, full supported lookup/reconciliation semantics, cancellation limits, uncertainty owner and manual fallback. Unsupported capabilities are explicit, not optimistic defaults. A non-idempotent action whose outcome cannot be proved stays quarantined with one actionable owner decision; an unexplained timeout never grants a retry. Any human resolution records evidence/accepted residual risk and permitted action; it does not erase an unknown effect, invent success or bypass provider restrictions.

Use the independent deterministic supervisor already required by ACTIVE_CS2 governance, outside the coordinator's process/availability failure boundary. WP2 names its actual runtime, health source, persistent outstanding-intent access, supported recovery executor and human notification route. It watches dispatcher/coordinator health, lost subscriptions and aged uncertain claims using accepted runtime settings. It can fence/stop and request reconciliation, not manufacture a verdict, replenish budget or become a builder. The human kill switch operates even if the coordinator is dead; reset/re-enable remains human-only, explicit and audited. If this separate supervision cannot be proved, automated dispatch is not ready.

WP5 must fault-inject revoked-before-dispatch, admitted-but-in-flight revocation, stale worker, lost reply, duplicate event, dead coordinator, lost subscription and restart. Verify both effects and durable outcomes, real receipt reconciliation, human kill/reset and absence of duplicate side effects. Model/unit fixtures alone do not demonstrate these controls. These are runtime acceptance conditions, not extra prerequisites for accepting this design or preparing a separately authorized manual correction.

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
5. If the target is CodexAdvisor's own contract, stop that author's write before step 2 and use section 5.6's human/different-author route. For the IAA contract, the current human-CS2-only author rule applies before step 2; the candidate is not used to certify itself. An unavailable independent route yields one precise assurance blocker and preserves prepared work; no repeated uninstalled-profile invocation or implicit waiver.

#### C. Ordinary record/publication correction

1. A genuine source-QP report exists but the current mutable scope/manifest omitted its path. The existing publisher/manager verifies the actual owner output and classifies the omission as ADMIN_RECONCILIATION only if source, verdict, authority, dependencies and required QA meaning are unchanged.
2. Record the existing failure and prepare the smallest correction to actual scope/count/manifest/task references. Reuse the genuine report/session and prior applicable QA; no new builder appointment, product RED suite or duplicate reviewer is created just to copy its verdict.
3. Before freeze, atomically publish the exact correction and necessary coupling after schema/parity/current-head concurrency checks. Return one receipt to the manager. ECAP rechecks the affected administration and Foreman resumes the eligible checkpoint; active CS2 retains parent continuity. A missing final IAA token does not prevent honest earlier preparation and does not grant final release.
4. If this defect is discovered after freeze, an edit to S0 is not an allowed assurance append. Create the next truthful evidence revision, re-evaluate affected administration/assurance under the profile, and preserve the old rejection and unaffected source QP. Do not rebuild unchanged product code or demand a future verdict to publish its inputs. If the correction actually changes policy/gate behavior, reclassify it as GOVERNANCE_GATE rather than hiding it as metadata.
5. The derived CS2 view now shows “source QP accepted; administrative correction published; next owner Foreman; final assurance pending; human decision NONE” when those are the actual outcomes. It does not claim whole-job completion.

#### D. Final IAA rejection, new learning and delayed acknowledgement

1. The actual manager submits H0/S0 and exact A for a stable review request under the accepted risk/job mapping. The required source QP/admin/checkpoint already exists; no future token or acknowledgement is a prerequisite to this review.
2. IAA finds an actual failed obligation and a new governance pattern. It issues REJECTION-PACKAGE with every required remediation item, evidence and exact re-entry. It creates its new review/learning records and declared escalation entry. It captures the new pattern and promotion owner without editing the frozen operational registry. The publisher commits the actual pack; no token or PASS is fabricated.
3. The authorized notification route delivers that rejection to the actual submitter/manager, with remediation, re-entry and acknowledgement requirement. Record the authentic delivery receipt. If acknowledgement is absent, show one owned follow-up: review execution completed; verdict REJECTION; delivered yes; acknowledged pending; administrative close pending; manager/watcher identified. Release the invocation claim after durable handback rather than waiting indefinitely or redispatching IAA.
4. The submitter actually acknowledges the identified rejection. Trusted intake records that new event. IAA's supported closing continuation records the declared new closure/addendum after verifying own duties and delivery/ack; an unavailable instance uses the explicit replacement-identity/envelope route in 5.5.1, not an invented old-session return. Administrative closure does not change the verdict.
5. The existing authorized producer repairs the failed source or administrative cause. Manager verifies acknowledgement and evidence disposing all required prior items before dependent resubmission. Actual changed inputs justify affected checks/assurance at the new submission revision; unaffected valid source QA remains scoped. An unchanged unresolved finding yields the same owned blocker, no new assurance appointment.
6. Required learning promotion follows its owned pre-freeze policy route with any needed source/authority approval and tests, under the same parent/accounting. Current safety/control deficits block dependent progression; an optional improvement's explicit disposition does not hold unrelated accepted delivery hostage. Only a later genuinely issued independent PASS and valid current binding can make this delivery eligible for integration; human authority and post-integration validation remain.

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

This document is work package 1, now revised to 0.3.0 under Johan's instruction to fix the further identified gaps. Hand it back, record requested changes against this revision and repeat until the identified design revision is accepted. Do not treat a request to review/correct the design as acceptance of live implementation.

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

Current authority is Johan's direct local instruction to prepare the design, followed by his instruction to implement the identified review corrections into this next revision and return it. No issue or PR is required. Revision 0.3.0 remains REVIEW and non-normative until he accepts an identified revision; no live gate, contract or consumer correction is claimed performed here.

The next human checkpoint should decide whether this design's operating model and migration boundaries are accepted, and identify the first implementation work package. This is a review checklist, not an assertion that approval has been received.

### 8.2 Separate Decisions

Record design acceptance, a bounded source correction, any legacy-rule supersession, independent QA/IAA outcome, per-consumer adoption, remote publication/integration and activation as separate facts. One may authorize several explicitly named actions, but cannot be inferred to authorize unnamed actions or provide an independent outcome.

Keep budgets and authority changes explicit. Mandatory independent assurance is not supplied by the implementing agent's self-check or by a human acknowledgement of this draft. Any accepted change to a governance requirement must name the replacement requirement and its validation.

The direct local mode and its equivalent evidence route need explicit source/schema alignment during implementation; source README/constitution/contract statements requiring issues/PRs must not remain contradictory active instructions. The design instruction is recorded here as the actual authority for this preparation rather than represented as a fictitious GitHub carrier.

## 9. Implementation Plan

### 9.1 Reviewable Work Packages

| Work package | Deliverable | Handback / dependency |
|---|---|---|
| WP1 — this design | Versioned proposal, role/profile/risk mapping, complete PASS/rejection/learning envelope, CS2 view and acceptance suite | Human review; 0.3.0 addresses N01–N03 in design, retaining R01–R07; no live rollout |
| WP2 — exact conformance audit | Complete clause-to-contract-to-gate-to-runtime matrix; exact classification/closing-clause amendment list; full target inventory; operation-specific effect capability and independent-supervisor specification | Human review of scoped policy changes and transport/override procedure |
| WP3 — governance/gate foundation | Accepted canonical clarifications, schema migrations, derived requirement interface and demonstrated stage/proof fixes; align finite closing-output/envelope amendments, risk/semantic mapping, classifier, scope/manifest verifier and non-committing binding receipt together | Source checks, applicable independent review and human handback; no live activation |
| WP4 — role expertise | Coherent Tier 1/2/3 and integrity updates for ECAP/IAA first, plus affected Foreman/author/liaison interfaces | Role conformance including capture/promotion, delivery/ack/closure and exact author authority; genuine independent assurance of role changes |
| WP5 — local pilot and runtime proof | Prove the accepted manual local adapter separately from production automation; demonstrate controller/claims/effect dispatcher, independent supervisor, human kill/reset and uncertain-effect recovery in the authorized runtime location before automatic dispatch | Actual evidence and contained rehearsal for each claimed capability; no service/database prerequisite for an independently authorized manual correction |
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
| V15 | Mandatory own-memory rotation adds ordinary files outside normative delivery list | Complete required rotation before freeze and account actual scope; after freeze only exact permitted new archives, never a disguised H0-file deletion/rewrite |
| V16 | Required history absent in shallow checkout | Supported normal history preparation or evidenced capability refusal; no fake full-hash PASS |
| V17 | Same finding/source/policy/capability observed repeatedly | No duplicate dispatch/review/escalation; unresolved obligation remains |
| V18 | Same Git head but relevant provider capability genuinely changes | One eligible resumption after validated new input |
| V19 | New material correction to an old finding | Resume affected stages; preserve prior rejection and counters |
| V20 | Crash before/after external dispatch, commit or acknowledgement | Reconcile actual outcome; no blind duplicate action |
| V21 | Expired/fenced claim before dispatch or concurrent checkout/head change | Trusted effect boundary refuses new stale-worker publication; preserve concurrent work; admitted in-flight cases use V64 |
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
| V57 | A mandatory new IAA closing output was omitted from A | Versioned exact non-author-verified envelope amendment before publication; S0/prior outputs preserved; existing-file edit is never disguised as an addition |
| V58 | Final IAA discovers a new governance failure pattern | Actual verdict reflects current obligations; immutable learning capture in declared output; no frozen registry rewrite; owned necessary promotion follows its authorized policy route |
| V59 | Rejection requires escalation/delivery but submitter acknowledgement is missing | Publish genuine rejection/tracking/learning, prove actual delivery; one follow-up owner, closure pending and claim released; no premature COMPLETE or unchanged fresh review |
| V60 | Acknowledgement arrives after rejection publication | Trusted actual submitter receipt wakes closing continuation; new declared close/addendum preserves verdict/history; resubmission still needs all prior required items resolved |
| V61 | Review instance becomes unavailable or is replaced | Recover genuine result if available; bind real replacement identity/exact outputs by validated amendment; no impersonation, wildcard or repeated unchanged review; honest blocker if evidence unavailable |
| V62 | Low-risk docs/Tier 2, neutral workflow, material gate and agent contract classified | T6/T5/T4 minimum routes only with proved non-operative semantics; protected gate overlay and T1 retain ECAP/independent IAA; source conflict retired through actual alignment |
| V63 | Mixed T1+T2 or generic low-risk repair within this mandatory-assurance parent | Union includes integrity, wiring/all FFA and stronger accepted job controls; no generic downgrade, actor exemption or new IAA solely to classify genuinely exempt work |
| V64 | Authority revoked before dispatch versus after provider admission | Before admission no effect; already admitted effect reconciled as in-flight/uncertain, dependent action quarantined until actual outcome, no promised cancellation or blind retry |
| V65 | Provider lacks idempotency/complete lookup or reply is lost | Exact operation capability recorded; automated operation disabled or uncertain outcome retained with supported owner action; momentary absence never proves safe retry |
| V66 | Coordinator dies or subscription is lost while an effect is outstanding | Independent supervisor outside that failure boundary surfaces/reconciles actual intent; human kill works, only audited human reset re-enables; no double effect or accounting reset |

### 10.2 Levels of Proof

Separate document/schema conformance, unit tests, actual gate/adapter integration, runtime fault injection, supported real-agent invocation, consumer parity and human acceptance. Fixtures or a successful outer workflow do not prove live generic dispatch, independent assurance or machine-breaker enforcement.

Demonstrate the old failing behavior against actual relevant source before claiming a fix. Execute the corrected path and negative controls; retain raw results and their source identities. Run affected checks after substantive changes, not an unchanged full-review cycle after every observation.

Acceptance is scoped to the claimed outcome. Source-release acceptance needs applicable source/admin/assurance evidence and accepted rollout authority, not future consumer acknowledgements. Consumer adoption needs that target's actual update/checks/parity. Aggregate rollout acceptance needs the named cohort outcomes and every inventory disposition. Runtime activation additionally needs actual generic runtime/recovery/issuer/accounting proof and its separate human decision. No outcome may claim the later outcome's completion; unknown dependent accounting or missing independent assurance is never converted to PASS.

### 10.3 Requirement-to-Validation Coverage

| Requirement | Acceptance cases |
|---|---|
| ADM-01 | V22, V35, V36, V47, V48 |
| ADM-02 | V01, V02, V03, V04, V05, V26, V48, V52, V59, V60 |
| ADM-03 | V01, V02, V04, V11, V13, V59, V60 |
| ADM-04 | V05, V06, V31, V32, V36, V48, V62, V63 |
| ADM-05 | V10, V14, V15, V28, V33, V59, V60, V61 |
| ADM-06 | V07, V11, V12, V13, V34, V58, V60 |
| ADM-07 | V06, V08, V09, V27, V34, V49, V57, V58, V59, V60, V61 |
| ADM-08 | V17, V18, V19, V20, V21, V43, V44, V50, V51, V59, V60, V61, V64, V65, V66 |
| ADM-09 | V22, V23, V24 |
| ADM-10 | V12, V26, V27, V42, V62, V63 |
| ADM-11 | V04, V25, V26, V33 |
| ADM-12 | V29, V30, V32, V51, V53, V56 |
| ADM-13 | V16, V20, V21, V37, V38, V39, V43, V44, V52 |
| ADM-14 | V11, V36, V39, V45, V47, V50 |
| ADM-15 | V10, V12, V28, V40, V42, V58, V59, V60, V61, V62, V63 |
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
8. Complete the operation-specific dispatcher capability dossier and separately supervised runtime/kill/reset design in WP2; demonstrate section 5.8.2 before automated operation in WP5. These are not prerequisites for this manual design handback.

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

### 10.6 Disposition of the Further Review (0.2.0)

These are **ADDRESSED_IN_DESIGN** statements by the correcting author, not independent closure, human acceptance or implemented controls. Preserve the 0.2.0 report and reviewed snapshot unchanged. The R01–R07 table above records the actual 0.2.0 corrections; N01/N02 refine its R02/R03 claims rather than rewriting that review history.

| Finding | Revision 0.3.0 correction | Acceptance coverage / remaining execution work |
|---|---|---|
| N01 — closing-record loop | Section 5.5.1 defines conditional verdict, learning, escalation, delivery, acknowledgement and close outputs; capture/promotion separated; exact envelope/replacement route; walkthrough D | V57–V61; WP3/WP4 must align actual registry/contract/close/publication predicates; no live rule changed |
| N02 — classification conflict | Section 5.2.1 replaces duplicate assurance matrix with one base-risk/semantic/job-obligation mapping, exact precedence and named source replacements; protected IAA-author rule clarified in 5.6 | V48, V56, V62, V63; WP2 exhaustively audits sources, WP3/WP4 implements accepted alignment; no present obligation waived |
| N03 — automated effect/supervision condition | Section 5.8.2 specifies dispatcher admission/epoch boundary, in-flight uncertainty, per-operation capability dossier and independent supervisor/human kill/reset | V20, V21, V51, V64–V66; required WP2 specification and actual WP5 fault-injection before automated operation, not before manual preparation |

### 10.7 Actual Document Verification for Revision 0.3.0

Author document checks: strict duplicate-key-rejecting front matter; REVIEW/non-normative and inactive runtime/rollout flags; 11 proposal sections; 18 unique requirements; 66 uniquely specified acceptance cases with complete requirement coverage; R01–R07 and N01–N03 disposition coverage; all named roles/four profiles/four walkthroughs; local reference targets; balanced code fences; valid UTF-8; original ten evidence rows preserved. The reviewed 0.1.0 and 0.2.0 snapshots and both review reports retain their recorded raw-byte hashes. Tracked/staged governance source remains unchanged and the recurring follow-up remains PAUSED.

These checks establish document consistency/preservation only. The 66 scenarios are **specified**, not executed runtime tests. This is the author's correction, with no new separate independent review, project IAA, human design acceptance, live contract/canon/gate change, consumer adoption or activation asserted. The remaining source conformance audit and runtime conditions are explicit work-package deliverables, not hidden PASS claims.

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
- [IAA contract](../../.github/agents/independent-assurance-agent.md), steps 4.2–4.5 and protected author scope; [IAA FAIL-ONLY-ONCE](../../.agent-workspace/independent-assurance-agent/knowledge/FAIL-ONLY-ONCE.md), update protocol, A-015/A-018 and “Adding New Rules”: closing, classification and learning clauses requiring explicit alignment.
- [Author review of revision 0.2.0](../reports/ADMINISTRATION_SYSTEM_DESIGN_REVIEW_0.2.0_2026-10-15.md) and its [byte-preserved reviewed snapshot](../reports/historical/ADMINISTRATION_SYSTEM_DESIGN_0.2.0_2026-10-15.md).
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
| 0.2.0 | 2026-10-15 | Johan instructed implementation of those corrections; revised roles/profiles, finite assurance publication, release ordering, continuation, authority receipts and simple CS2 view; extended acceptance specification | REVIEW; author document checks recorded for that revision; byte-preserved snapshot retained; no independent review of 0.2.0, live governance/gate/contract changes, rollout or activation asserted |
| 0.2.0 review | 2026-10-15 | Author critical source review identified N01/N02 design gaps and N03 automated-execution condition | Two bounded design corrections requested; report unchanged, not a fresh independent review or project IAA |
| 0.3.0 | 2026-10-15 | Johan instructed correction of the identified gaps; complete rejection/learning/closure route, consolidated risk/semantic mapping and enforceable automation prerequisites | REVIEW; author document checks only; actual source alignment and runtime demonstration remain later work packages |

This proposal is not entered into CANON_INVENTORY as accepted canon. This handover supplies the requested corrected design, revision 0.3.0, for the agreed next review. Acceptance and later adoption require an identified revision and actual evidence; neither the correction instruction nor this document's existence supplies them. The trial's recurring 30-minute follow-up remains paused.

