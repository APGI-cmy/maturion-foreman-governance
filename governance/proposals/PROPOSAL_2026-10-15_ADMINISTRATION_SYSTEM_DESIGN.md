---
proposal_id: PROPOSAL_2026-10-15_ADMINISTRATION_SYSTEM_DESIGN
proposal_schema_version: v1.0
design_version: 0.6.0
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

The request to design a “perfect” system is interpreted as an explicit, testable and repeatedly reviewed design target. No document can prove absence of every possible defect. **Design acceptance** approves an identified specification, disclosed open implementation items and its test plan; it does not require future runtime tests to have executed. **Source acceptance** requires the actual applicable source checks, administrative review and independent assurance. **Operational acceptance** requires the real adapter, monitoring, recovery and runtime demonstrations relevant to the claimed operation. Each needs its actual acceptance evidence; none supplies the others or an unperformed human integration/activation decision. Section 10.2 binds these distinct criteria.

### 1.2 Reading and review order

Read section 2 for the operating model, section 3 for the demonstrated problems, section 5 for the design, section 7 for safe migration, and section 10 for the acceptance tests. Review one version at a time. Record requested changes against requirement or finding IDs; do not restart the parent job or overwrite an earlier verdict.

Johan's subsequent instruction, “Please implement thos corrections”, authorizes this revision of the design to address R01–R07 in the [critical review](../reports/ADMINISTRATION_SYSTEM_DESIGN_CRITICAL_REVIEW_2026-10-15.md). It is the agreed design-correction step, not an assertion that the revised design, live gate changes or rollout have been accepted. The reviewed 0.1.0 is [preserved byte-for-byte](../reports/historical/ADMINISTRATION_SYSTEM_DESIGN_0.1.0_2026-10-15.md), SHA-256 `264973d5aa1df1cc9ddd049b4e855502bf1312f22ecd148a3bc1aa6b0f92ad6a`. Historical line references in the review refer to that snapshot, whose relative source links retain their original proposal-directory context.

The later instruction, “Please fix the gaps you identified”, authorizes revision 0.3.0 against N01–N03 in the [author review of 0.2.0](../reports/ADMINISTRATION_SYSTEM_DESIGN_REVIEW_0.2.0_2026-10-15.md). The reviewed [0.2.0 snapshot](../reports/historical/ADMINISTRATION_SYSTEM_DESIGN_0.2.0_2026-10-15.md) is preserved at SHA-256 `1aa2ccc9a241b5cee4d41f6d18e62342397c4e130c31c700f3a2d5be1e26c776`. That review was the author's further critical pass, not a second independent review. Revision 0.3.0 proposed explicit closing-record, classification and automation corrections; its [reviewed handover snapshot](../reports/historical/ADMINISTRATION_SYSTEM_DESIGN_0.3.0_2026-10-15.md) is preserved at SHA-256 `c9f9ecc06dff01973542460d8ed1d1a080649e88aac9472b5bbe18193e05f64c`.

Johan then required examination and explanation of actual merge-gate functions, their philosophy, prompt intervention when an agent deviates, injected reports usable by CS2, and eventual removal of conflicting administration documents. Revision 0.4.0 evaluates those sources and defines these requirements in sections 3.3, 5.14–5.15 and 6.4. This authorizes the design expansion and single-authority migration target, not unreviewed deletion or live workflow activation before the agreed handover sequence. Existing rules still govern until their accepted replacement is applied.

Johan subsequently instructed implementation of the targeted corrections in the [full author review of 0.4.0](../reports/ADMINISTRATION_SYSTEM_DESIGN_FULL_REVIEW_0.4.0_2026-10-15.md). Revision 0.5.0 implements FR01–FR04 and its two acceptance/usability refinements **in this design**. The reviewed [0.4.0 snapshot](../reports/historical/ADMINISTRATION_SYSTEM_DESIGN_0.4.0_2026-10-15.md) is preserved at SHA-256 `3d80904f680dd30b444c8ece3b47c57591ad6f8bc68aecde042f17615fbae2a3`; the review remains unchanged and is not project IAA. The selected factory route, compatibility preparation and intervention authority are proposed policy choices requiring actual source alignment before use, not declarations that live contracts have changed.

Johan's next instruction to implement the proposed corrections authorizes revision 0.6.0 against R5-01/R5-02 and the walkthrough clarification in the [author review of 0.5.0](../reports/ADMINISTRATION_SYSTEM_DESIGN_REVIEW_0.5.0_2026-10-15.md). The reviewed [0.5.0 snapshot](../reports/historical/ADMINISTRATION_SYSTEM_DESIGN_0.5.0_2026-10-15.md) retains exact SHA-256 `d597e850c885cf7011b410c0e780a7b5ff532876797b54464e1b27e711854419`. This revision preserves all rejection findings, binds the routine Foreman administrative resolver and clarifies parallel repair; it does not adopt the target policy, appoint a live resolver or change governing source.

## 2. Change Summary

### 2.1 Executive Summary

Make administration an executable, stage-aware process that assembles truthful evidence and permits the next authorized action. It must not require a future action's result to authorize the action that creates its inputs.

Reconcile and implement the existing approved architecture rather than create a parallel governance constitution or a second job ledger. Preserve substantive QA, independent assurance, human release authority, immutable historical evidence, role boundaries, generic repository adapters and conserved job-level accounting. Replace inconsistent enforcement and repeated manual transcription.

**The operating model:** Johan approves intent, scope and reserved decisions. The active-CS2 agent retains the approved parent through integrated acceptance and requests eligible progression; Foreman plans and supervises delivery and ordinary repairs. CodexAdvisor owns authorized agent-factory work; builders own implementation. ECAP validates administration; IAA independently assures. The deterministic controller enforces legal transitions. Publication is a capability of an authorized route, not another acceptance authority. Candidate or unavailable roles are not treated as active.

The default CS2 view shows the current outcome, material changes, next owner/action, exact blocker and any decision needed from Johan. Merge gates confirm properly bound prior proof and enforce eligibility; injection observers surface deviations at the first observable event and route correction, while the authorized controller/gate blocks prohibited dependent actions. The same authenticated intervention history supports CS2's handover evaluation. Once accepted and migrated, this artifact becomes the single normative administration manual; competing administrative policies are absorbed and removed from active use and the active tree as section 6.4 specifies. Evidence expands behind those six fields (section 5.7). Ordinary in-envelope work proceeds through existing owners; human review intervals in this migration programme do not impose a new approval on every future repair. Legitimate correction cycles remain; unchanged inputs must not cause repeated appointments, reviews or packets.

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
- Merge gates and intervention workflows: explicit philosophy, exact function/trigger mapping, prompt detection, bounded enforcement and CS2-readable intervention evidence.
- Authority consolidation: promote this artifact, migrate every unique administrative obligation and remove conflicting administrative documents and stale references in full.

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
11. A detector is either demonstrably observing its declared event surface or visibly unavailable; silence is never substituted for proof of compliant behavior.
12. No retired administration document remains a competing agent input, executable requirement or consumer authority.

### 2.4 One-page operating guide and stable entry points

This guide summarizes the detailed clauses; it is not a second rule set. This entire proposal is currently REVIEW/non-normative. On accepted promotion, the detailed clauses and their stable IDs below are the operative source, with the guide generated/checked against them. The 22 ADM requirements remain acceptance goals; this entry map makes their operating clauses findable without re-reading trial history.

| Step | Action and accountable owner | Stable clause / detail |
|---|---|---|
| 1 — bind | Human CS2 approves intent/scope/reserved matters; active CS2 retains parent, dependencies and limits. Manager selects the accepted profile/risk union | [ADMIN-INTAKE](#admin-intake); [ADMIN-AUTHORITY](#admin-authority) |
| 2 — prepare | Foreman accepts relevant plan/QA-to-RED and obtains prospective IAA scope before dependent implementation. Factory jobs use their explicit handoff | [ADMIN-INTAKE](#admin-intake); [ADMIN-FACTORY](#admin-factory) |
| 3 — deliver | Actual builder/CodexAdvisor authors source and self-checks; Foreman accepts source QP; ECAP prepares applicable administration; publisher returns exact receipts | [ADMIN-ROLES](#admin-roles); [ADMIN-FACTORY](#admin-factory) |
| 4 — assure | Freeze actual S0 and exact new-output allowance, complete the earlier checkpoint, obtain actual required independent IAA and verify current binding | [ADMIN-EVIDENCE](#admin-evidence); [ADMIN-GATES](#admin-gates) |
| 5 — correct | Contain only the prohibited dependent action. Deliver the finding and start permitted correction in parallel; an independent resolver handles implicated managers/assurers or contested findings | [ADMIN-INTERVENTION](#admin-intervention); [ADMIN-DISPOSITION](#admin-disposition); [ADMIN-CONTINUITY](#admin-continuity) |
| 6 — decide | Show CS2 the same six-field view with outcome, change, owner/action, blocker/wake-up, exact human decision and evidence/limits. Integrate and validate only when actually authorized; retain parent through integrated acceptance | [ADMIN-CS2-VIEW](#admin-cs2-view); [ADMIN-INTAKE](#admin-intake) |
| 7 — change policy safely | Accept an immutable source candidate; protect every legacy reader/in-flight invocation before destructive live cutover; migrate consumers and remove superseded rules with verified parity | [ADMIN-COMPATIBILITY](#admin-compatibility); [ADMIN-CONSOLIDATION](#admin-consolidation) |

Role entry points: CodexAdvisor uses ADMIN-FACTORY/ROLES; Foreman uses INTAKE/FACTORY/GATES; builders/QA use ROLES/INTAKE; ECAP uses EVIDENCE/GATES; IAA uses EVIDENCE/DISPOSITION; active CS2 uses CONTINUITY/CS2-VIEW; human CS2 uses AUTHORITY/CS2-VIEW/COMPATIBILITY. All roles retain their actual path/appointment authority. If the next requirement is unchanged and unmet, preserve its owner and wake-up condition instead of producing another packet or appointment.

**Promotion boundary:** operative requirements are the detailed control clauses in section 5 (excluding the historical source catalogue in 5.15.1), conflict/consolidation controls in 6.2/6.4 and decision separation in 8.2. Section 2.4 is a derived guide. Trial findings/baselines, source evaluations, author-verification transcripts and revision history remain explicitly non-normative evidence. Programme-specific handover/work-package instructions are not standing rules for every future job. Before promotion, WP2 maps every enforceable obligation to a stable clause/subclause ID and preserves any unique migration/rollback control in the operative core; no required control is lost through this editorial separation. A referenced test plan is acceptance evidence to execute at its named stage, not an invented current result. Use one canonical artifact with clearly labelled evidence/rationale, not another independently maintained operating manual.

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

### 3.3 Merge-gate and injection source evaluation (revision 0.4.0)

Inspected actual local source at governance `main` / `68f3f0525060ec7115414af16b0931e54fae1344` and ISMS `main` / `d725c685c732f0fc2252230be3bffbc8252a8881`. This is separate from the historical candidate PR heads in section 4.2. A 32-file raw-hash inventory covers the cited canon, workflows, manifests and helpers. Trigger definitions show **source wiring**, not proof that hosted workflows, branch protection, permissions or independent issuers currently operate. No GitHub action/comment or role invocation was performed for this evaluation.

| Observation | Actual source / bounded result | Required design treatment |
|---|---|---|
| G01 — confirmatory philosophy has an unsafe shortcut | MERGE_GATE_PHILOSOPHY v2.1.0, “Merge Gate Responsibilities”, “Two Validation Modes” and its evidence pattern accept a proof keyword as immediate PASS. Its gate-duplication mandate also says all gates before PR, while its Phase 4 section requires a later IAA token | Retain producer validation and confirmatory CI; replace keyword-only acceptance with authenticated exact-subject proof, and apply controls at their actual stage. Never require a future token to prepare its inputs |
| G02 — interface and implementations diverge | MERGE_GATE_INTERFACE_STANDARD §§2/8 specifies only three required branch contexts; ISMS required-check manifest lists 20 names, including 14 mapped legacy/external entries. The alignment helper validates mappings/names, not real successful runs of every mapped entry | Use one accepted logical registry and stable aggregate interface, retain every required child control with actual current receipts. Branch settings/issuer binding must be separately verified before rollout |
| G03 — shallow source checks can overclaim | Governance ceremony workflow's phase4-completeness checks broad proof/session presence then prints job COMPLETE. Governance token step checks PR-related filename/diff plus token/verdict text. ISMS interface's stop-and-fix step prints PASS even when no proof is found | Presence/format are limited checks, not issuer authentication, resolved findings or parent acceptance. Actual closure and binding must be evaluated by the accepted registry; this is not a claim that every other workflow also passes |
| G04 — not every injector is automatic | ISMS agent-bootstrap-inject, injection-audit-report, foreman-reanchor and copilot-loop-watchdog currently declare workflow_dispatch only. Pre-brief injector, pre-brief reminder gate, governance-watchdog, producer guidance, handover checkpoint/claim and post-handover remediation have event triggers; retry-watchdog also declares a schedule | Do not describe manual-only workflows as instant active protection. Replace conflicting/outdated triggers/messages through accepted rollout; manual availability is not a proved usable invocation |
| G05 — legacy audit is insufficient evidence | injection-audit-report lines 48–178 tracks nine marker categories and any later Copilot-login comment as response, without binding that reply to the finding or proving repair. An existing audit marker suppresses later reports. Isolated mocked cases E01–E03 reproduced spoofed marker/unrelated reply acceptance, zero-marker clean-looking output and stale-report suppression | Bind genuine detector/target/source/finding, exact acknowledgement and independent repair proof; refresh on material event revisions, preserve history and show detector coverage |
| G06 — useful terminal suppression has input limits | iaa-prebrief-inject.js buildInjectionDecision uses final-pass-cs2-review helpers to suppress repeated pre-brief work after valid final PASS and stop on invalidation. Its five existing unit tests passed. Isolated E04 also reproduced terminal helper acceptance when declared PASS fields exist but scope/identity/base/currentness/check-coverage fields are absent | Preserve suppression only after complete authenticated eligibility. Missing required facts are UNKNOWN, not success. E04 is helper-level evidence; a complete caller/workflow bypass was not tested or claimed |
| G07 — presentation cycles are not parent accounting | post-handover-auto-remediation.js resolveRemediationCycle uses a hard-coded three-cycle presentation counter and returns zero when unblocked; E05 reproduced that reset | Do not replace or replenish the conserved job ledger with this local counter. Any retained local threshold is a derived policy-configured signal, not a new budget |
| G08 — some injected instructions conflict with the target route | Governance watchdog gap3 text can ask to regenerate an immutable proof and its canon calls a comment a direct IAA invocation; push-intercept declares a restriction intentional and requires CS2 publication without establishing actual capability. Legacy gap3 scans the first matching workspace proof on opened/ready events | Use exact active-job evidence, supported role appointment/publisher routes, new correction records and evidenced provider limits. A comment is delivery/advice, not assignment, human authority or proof of an intentional restriction |

E01–E05 were isolated executions of actual embedded audit/helper code with fixture inputs and mocked GitHub methods; they caused no external effects. They demonstrate these bounded counterexamples, not a repaired system. The existing five pre-brief decision tests establish those helper cases only, not live injection, complete coverage or project IAA. All source defects above remain implementation work until accepted corrections are actually applied and tested.

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
| ADM-13 | Distinguish immutable source acceptance, compatibility readiness before destructive live cutover, per-consumer adoption and aggregate rollout; protect in-flight policy identity and prove relevant rollback. |
| ADM-14 | Return at agreed migration work-package boundaries; keep those reviews separate from normal automatic continuation and governed delivery assurance. |
| ADM-15 | Make ECAP and IAA expert consumers of the same accepted requirement set while preserving their separate decisions and write authorities. |
| ADM-16 | Resume the existing PRs after accepted rollout by inspecting their actual deltas and evidence; do not erase old findings or bulk declare them compatible. |
| ADM-17 | Distinguish all roles and protected authorship; name factory callers/decision owners and independent intervention resolvers, including when a managerial or assurance role is implicated. |
| ADM-18 | Provide one concise CS2 view, one authoritative record per fact and a minimum artifact set; optional runtime infrastructure cannot block an otherwise authorized manual correction. |
| ADM-19 | Make merge gates confirm authentic source-bound prior proof and enforce the attempted stage through one registry/interface; no keyword-only PASS or missing required check treated as success. |
| ADM-20 | Detect agent deviations at the first observable event, intercept prohibited effects where supported, and deliver one bounded owned intervention with monitored coverage and truthful latency/availability. |
| ADM-21 | Use authenticated injection, acknowledgement and verified-resolution history in CS2's job handover view without substituting it for QP, ECAP, IAA or human acceptance. |
| ADM-22 | Promote one normative administration artifact and remove subsumed/conflicting active documents, references and duplicate rules through mapped, reversible, verified migration. |

<a id="admin-intake"></a>

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
| AGENT_CONTRACT | CodexAdvisor retains factory implementation under human authorization; Foreman coordinates source QP/ECAP/IAA through 5.6.1; own-authority routes in 5.6 remain | Class-matched checklist, failing contract invariant/negative fixtures, minimum Tier 2/integrity bundle and required genuine source QP; no invented product RED | Human-controlled source/authority adoption and actual target parity; publication alone activates nothing |
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

<a id="admin-authority"></a>

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

<a id="admin-evidence"></a>

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
| Rejection tracking / pending closure | Actual IAA; exact new own `escalation-inbox/` entry | Rejection items, source, actual delivery/ack status, accountable Foreman (including the factory ceremonial route) and resubmission condition; repeat observations reference it |
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

<a id="admin-roles"></a>

### 5.6 Ownership, Publication and Tier Responsibilities

| Role | Own decision or output | Continuation / handback | Prohibited substitution |
|---|---|---|---|
| Human CS2 / Johan | Intent, approved scope/envelope, reserved policy/authority/budget decisions, agreed migration reviews and retained integration/activation decisions | One concise decision view; one actual instruction for each reserved matter/package | Human acknowledgement is not an independent IAA verdict |
| Active-CS2 agent | Approved parent ownership through every wave and integrated acceptance; evidence review, precise findings and requests for eligible progression | Dispatch eligible wave to Foreman; watch resumption; verify successor eligibility and parent completion | Does not build, appoint specialists, weaken gates, self-authorize or inherit human reserved powers; no activation implied |
| Foreman | Planning, applicable RED acceptance, specialist appointments, ordinary remediation, source QP, admin checkpoint and evidence binding; factory ceremonial coordination per 5.6.1 | Supervise builders; route rejection to actual owner; return accountable evidence to active CS2; never close a finding about itself | Does not implement the delivery or replace independent IAA |
| CodexAdvisor | Authorized factory implementation, class checklist and minimum Tier 2/integrity/conformance bundle | Publish real source/self-checks; request source-QP/ECAP/IAA through the selected Foreman ceremonial route; outside-boundary work also goes through authorized Foreman | Not a product builder or Foreman; cannot change its own contract or assure its delivery |
| Builder agents / QA producers | Appointed source implementation, relevant RED/negative tests and self-check evidence | Return delivery/blocker to Foreman; repair under the same appointment where permitted | No self-appointment, self-acceptance, self-merge or protected contract authorship by convenience |
| ECAP | Expert stage-aware administrative validation, applicability/inventory reconciliation and publication handback | Return exact administrative outcome, missing obligation/owner and permitted next step to Foreman, including ADMIN-FACTORY | Does not decide substantive quality, invent owner outputs or issue an IAA token |
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

<a id="admin-factory"></a>

#### 5.6.1 Selected factory assurance route (ADMIN-FACTORY)

**Target policy choice:** CodexAdvisor is the factory implementation owner; Foreman is the named ceremonial manager for the same factory task/parent. Foreman coordinates source-QP acceptance, ECAP and IAA. There is no successor wrapper/job, product-building grant to CodexAdvisor, contract-authoring grant to Foreman or separate human request for each ordinary correction. Bind this division once in the accepted factory envelope with actual permitted instances and publication routes.

| Transition | Authorized caller -> decision/output owner | Exact inputs / scope and receipt | Rejection or return owner |
|---|---|---|---|
| Factory intake/preparation | Human CS2 authorizes the factory scope; CodexAdvisor accepts preparation; existing Foreman accepts the ceremonial remit | Same parent/task, class checklist, actual allowed author, scope/capability map and existing owner context; record actual accepted remit | CodexAdvisor retains implementation continuity; reserved boundary question goes to human CS2 once |
| Prospective scope | CodexAdvisor publishes plan/invariant inputs -> Foreman requests IAA -> actual IAA issues pre-brief | Actual class/requirements/failing contract invariant; authorized planning/QA preparation already permitted; genuine IAA record before dependent contract implementation | Foreman routes needed plan correction to CodexAdvisor and requests continuation only on changed eligible input |
| Implementation/self-checks | Authorized factory author -> its actual source/check outputs | CodexAdvisor within its permitted target contract/Tier 2/integrity paths; its own contract/IAA-contract exceptions use 5.6; publish actual creator records | Same authorized author repairs; no Foreman implementation |
| Affected source QP | Foreman evaluates published factory inputs -> Foreman source-QP verdict | Class checklist, contract/static/negative checks, exact source and genuine creator evidence. CodexAdvisor self-check/QP fields are producer evidence, not a Foreman verdict | Foreman routes source findings to the authorized factory author; affected source-QP re-entry after actual change |
| ECAP appointment/return | Foreman -> permitted ECAP instance -> Foreman | Published source-QP acceptance and actual source/record inventory; ECAP writes only its allowed workspace/payloads, supported publisher couples outputs and returns receipt | ECAP corrects its own administration; original producer/publisher corrects its owned records; Foreman tracks the actual return |
| Submission checkpoint/freeze | Foreman -> actual gate/verifier and Foreman's administrative decision | Current earlier-stage bundle/checks, S0 and finite A; final IAA token is not yet a prerequisite | Foreman routes only the affected missing input; unsupported capability is one owned blocker |
| Final IAA / re-invocation | Foreman -> actual independent IAA | Frozen real inputs, current requirement set, authenticated independent instance and exact new-file allowance; genuine verdict/session/learning return | Foreman remains accountable for delivery, acknowledgement tracking, every required finding and eligible re-invocation; CodexAdvisor does source repair; IAA alone owns its verdict |
| Publication / final binding | Actual producer -> authorized publisher -> Foreman verifies returned receipts/current binding | Only true owner payloads; publisher writes within its actual grants, returns resulting bytes/path/tree; Foreman persists binding through the existing evidence route | Original producer corrects payload, publisher corrects transport, Foreman reconciles; no invented owner result |
| Adoption / completion | Foreman returns bundle -> active CS2 reviews evidence -> actual human/authorized adoption actor; liaison handles each target | True independent assurance, current gates, human authority and compatibility readiness where required; separate integration, validation and parent acceptance | Existing owner retains uncompleted obligations; one merge or candidate publication is not activation |

This **selects** the Foreman-mediated route rather than leaving two implied invokers. On accepted implementation, reconcile CodexAdvisor contract 4.3a/4.4 to “prepare the real source bundle and request Foreman invocation,” while retaining its pre-IAA commit-state duties and the independent-assurance distinction; align the IAA canon/invocation and ECAP appointment/return clauses, class checklists, templates, Tier 2 methods and gate predicates together. This is a proposed explicit change to the present direct-invocation duty, not a claim that current CodexAdvisor already lacks it. Until aligned or explicitly covered by a bounded migration instruction, current contracts govern; no live author/appointment change is made here.

For a mixed factory job, CodexAdvisor requests any already authorized outside-boundary builder/schema/canon prerequisite through Foreman; Foreman appoints its actual permitted implementer and owns that prerequisite's quality acceptance. The prerequisite has its own affected evidence within the same parent and is available before the factory action that depends on it. Ordinary in-scope repair reuses the same task/appointments. Role conflicts, unavailable instances or a finding about this ceremonial manager use ADMIN-DISPOSITION; an implicated actor cannot select itself as the independent closer. Candidate authority is never installed merely to make its own review possible.

### 5.7 Authoritative Records and Derived Views

Reuse the existing job/event model. One evaluator owns transitions; evidence remains distributed among authenticated owners. The authoritative state is not a mutable file into which every actor may write a PASS.

For each decision, retain the existing event identity, input revision, before/after state, requirement set, owner, evidence references, claim and budget information. Any proposed additional fields or sidecar documents must be mapped to the existing schema and versioned explicitly. Do not create a second competing lifecycle or covertly add forbidden properties.

Generate current task/scope/manifest summaries from the accepted event and actual file inventory where appropriate. Generation is a projection with references, not a rewrite of immutable owner outputs. The generator must reject contradictory active claims rather than choosing the most optimistic one.

A pre-freeze repository publication transaction groups the genuine new payloads and their actual administrative coupling, then checks numeric/list/diff/manifest parity against that candidate. Post-freeze assurance publication uses section 5.5.1's S0/A/I1 rule instead of regenerating frozen coupling files. Use the expected base/tree or compare-and-set update. If the head changed, stop and reconcile the actual delta; do not overwrite concurrent work or force-push.

<a id="admin-cs2-view"></a>

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

<a id="admin-continuity"></a>

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

Within accepted scope/authority, usable accounting and the applicable profile, ordinary repair and eligible continuation are obligations of the existing owners; they do not wait for another human permission. Active CS2 owns end-to-end continuity, Foreman owns delivery correction/appointment, and CodexAdvisor owns continuity of its authorized factory implementation, with Foreman retaining the ceremonial transitions explicitly assigned in 5.6.1. The controller enforces legality rather than taking managerial decisions.

| Event | Watcher / accountable continuation |
|---|---|
| Builder/QA/producer return or changed source | Existing manager receives and validates it; Foreman requests the affected repair/QP/checkpoint, CodexAdvisor resumes its factory task |
| Publication acknowledgement, CI or IAA result | Adapter delivers source-bound event; Foreman reconciles source-QP/ECAP/IAA/checkpoint/binding transitions, including factory work; CodexAdvisor resumes its owned implementation on the actual returned requirement |
| Reserved decision or changed provider capability | Trusted intake/capability observer records actual changed evidence; assigned manager revalidates the dependency once; active CS2 retains parent visibility |
| Wave validation completes | Active CS2 verifies dependencies and requests the next approved wave; controller prevents duplicate release |
| Lost event, timeout or restart | Coordinator's reconciliation watcher checks outstanding intents/claims against actual external outcomes before any retry |

Each blocked item persists watcher identity, observation method, last observed input revision and next supported observation/reconciliation condition. A dead subscription is a continuity fault owned by the coordinator/manager, not permission to redispatch the implementation. Do not invent new polling/time/budget limits; use the accepted runtime configuration. If a watcher/controller/role is unavailable, show that fact and the supported manual owner. Manual execution does not claim active-CS2 automation or machine-breaker enforcement. An independent supervisor detects coordinator/watcher failure as section 5.8.2 specifies; a dead coordinator is not its own only monitor. Johan's pause of the 30-minute trial follow-up is retained; this design does not restart it.

Preserve each rejection package with its **complete set of required findings**. Every distinct item retains a stable finding identity/reference, failed obligation, owner, needed source/publication/authority change, correction evidence and affected re-entry. Reference the issuer's actual items; derived tracking IDs do not pretend the issuer supplied identifiers it did not publish. One grouped record/view may hold the full set; no document or appointment per finding is required. Repeated observations reference the existing package/items without collapsing several obligations into one.

Before dependent resubmission the manager reconciles **every required item**, mapping it to the actual corrective evidence or properly authorized disposition and its current checks. Repairing item A leaves unresolved item B visible and resubmission blocked; no partial repair is presented as disposal of the package. This is submission-readiness verification, not a manager-issued replacement of IAA's rejection: the actual IAA determines its assurance findings in the required reassessment. A future IAA verdict is not a prerequisite to publishing/submitting the corrected inputs. Unchanged evidence causes no fresh appointment/review/escalation. Genuine changed input reopens only affected obligations; preserved scoped PASSes and unresolved others remain visible. Programme review checkpoints in section 7 apply to this migration, not every routine steady-state correction.

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

<a id="admin-compatibility"></a>

### 5.12 Consumer Layer-Down and Compatibility (ADMIN-COMPATIBILITY)

Separate an accepted **immutable source candidate** from making destructive changes to a **shared live/default reference**. Preparing/accepting a candidate does not delete the policy a consumer currently reads. These are evidence outcomes, not new top-level job-state enums:

| Outcome / predicate | Required evidence and authority | Effect / limit |
|---|---|---|
| SOURCE_RELEASE_ACCEPTED | Actual immutable candidate source/tree and hashes, versions, applicable source QP/admin/independent assurance and human acceptance of that source scope | Authorizes only the named candidate/pilot/adoption preparation; does not advance a shared default reference, delete its old inputs or claim adoption |
| LIVE_SOURCE_CUTOVER_READY | Accepted candidate plus the complete reader/in-flight compatibility receipts below, current authority, concurrency/rollback checks and any separately needed publication/integration instruction | Permits only the authorized shared-reference operation. It does not require future adoption by every consumer; a verified legacy pin or real fence can satisfy readiness |
| LIVE_SOURCE_CUTOVER_APPLIED | Actual authorized publication/ref update, expected-base CAS and receipt, post-operation source/reference verification and retained compatibility | Records that the live change occurred; it does not itself adopt/activate a consumer |
| CONSUMER_ADOPTED | Accepted candidate, exact target changes, applicable checks/review, actual accepted update and source/version/behavior parity acknowledgement | That target's accepted use within its authority; no aggregate or runtime-activation claim |
| ROLLOUT_ACCEPTED | Actual cohort results, every inventory disposition and residual obligation, human rollout checkpoint and live-cutover evidence wherever the claimed outcome required it | Agreed programme progression; “all intended repositories updated” only when each actually adopted |

Identify each source candidate by an actual immutable commit/tree when available or an accepted content-addressed local snapshot, never a future commit hash. Preserve policy/schema versions, complete role/Tier 2/integrity/source hashes, adapter requirements and tests. A local snapshot does not pretend a remote source exists. Any remote/default publication still needs its actual authorization and receipt.

**Compatibility preparation precedes destructive live cutover.** WP2 reconciles a finite governed inventory from the consumer registry and actual loader/caller/runtime dependencies. It includes every affected in-scope consumer and shared reader: governance bootstrap/agent tools, runtime contracts, inventory/ripple updaters, active source/gate loaders and running invocations that could follow the changed `main`/default reference. Inventory completeness requires actual dependency evidence; it is not a claim to discover every unrelated public reader. Per-file inventory commits alone do not prove that the bootstrap, contract or inventory fetch stopped following latest main. A receipt for each affected reader must prove exactly one safe treatment:

- **Pinned legacy:** the legitimate unmigrated reader resolves a verified immutable legacy **bundle**, including its inventory, required canon/contract/knowledge/schema/tool inputs and compatible interfaces. Actual fetching/loading tests demonstrate the pin; a filename or version label is insufficient.
- **Coherently migrated:** that reader already uses the accepted new release with actual parity/authority, if independently eligible. This is possible after source acceptance; it is not required to accept the candidate.
- **Explicitly fenced:** the dependent operation cannot run against the changing shared input, has an accountable owner, observable resumption condition and actual containment proof. A note saying “deferred” or “offline” is not a fence.

Safe preparation of a legacy pin is neither new-policy adoption nor permission to change unapproved role/QA/budget rules. It uses actual authorized owners and affected tests, preserves local work, and may be handed back as a bounded prerequisite. Unknown affected readers or unproved containment block only the **shared destructive cutover and its dependent claims**. They do not block an isolated source candidate, a safe separately accepted pilot or unrelated authorized preparation. Only human CS2 may accept a deferral/change of intended cohort; acceptance does not fabricate the missing pin/fence evidence.

Each running invocation binds one policy/input revision and its actual authority epoch. Before cutover it either finishes under a still-valid isolated legacy binding, is safely pinned with a supported context handoff, or has its dependent actions fenced and outcomes reconciled. Never silently replace its loaded policy mid-session. A revocation/unsafe capability overrides permission to finish; already admitted effects use 5.8.2's uncertainty/reconciliation route. Replacement/resumption retains actual identities, findings, claims and parent counters. Ripple/bootstrap refreshes cannot install a new inventory into an old-contract bundle outside this compatibility rule.

The safe sequence is: prepare reader/in-flight compatibility as needed; accept the immutable candidate with actual source QA; verify LIVE_SOURCE_CUTOVER_READY against fresh receipts; perform only the separately authorized live operation; verify its outcome; complete incremental consumer adoption and aggregate acceptance. Compatibility preparation can precede candidate acceptance using the known old release, so there is no requirement to produce future new-consumer adoption evidence to authorize the source candidate. If no shared/default reference changes, record why live-cutover predicates are not applicable; do not invent a deployment.

After actual retirement, old policy remains historical immutable compatibility **only for explicitly unmigrated readers**; it is not an active fallback for new-policy agents. Keep one current normative manual and remove subsumed files from the active source tree once safe. Pending legacy readers remain visible as not adopted; their pins are retired only after their actual new-release adoption. Full conflict-removal/all-consumer claims require the actual relevant cohort outcomes, not the existence of the new manual.

For each intended consumer, verify origin/role, branch/head/working changes, local divergences and exact adapted diff. Validate role/Tier 2/Tier 3, gate and behavior parity before acknowledging the actual accepted update. Do not overwrite local changes, switch the user's branch, copy an entire governance repository into an app or silently omit an unlocated target. Use the explicit cross-version map; unknown/mixed versions block the dependent action rather than selecting the latest filename.

Rollback has the same reader/in-flight compatibility precondition in reverse: protect new-release readers before restoring a shared legacy default, verify the coherent rollback result, and retain later evidence/counters. A failed rollback effect is reconciled, never assumed undone. The existing event/receipt route stores readiness/cutover/adoption evidence; no second ledger or new job is introduced. Existing PR integration remains deferred until the agreed rollout handover; runtime activation remains separate with real readiness proof.

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

1. Johan authorizes the exact factory target/scope; CodexAdvisor accepts its permitted implementation/preparation remit, and Foreman accepts the ceremonial remit once under the same parent. Verify the real class checklist, author boundaries and read/write/publication route in ADMIN-FACTORY. An own-contract/IAA-contract target uses the protected author route in 5.6 before any write.
2. CodexAdvisor publishes actual planning, relevant failing invariant/negative-fixture inputs and prospective scope. Foreman obtains the genuine IAA pre-brief before dependent contract implementation. Authorized preparation is not blocked on the future evidence it produces. Outside-boundary prerequisites use Foreman's actual permitted builder/administrator task, not a factory authority expansion.
3. The authorized factory author implements the target contract/minimum knowledge/registry/integrity bundle and self-checks. Foreman evaluates the published affected-source QP, appoints the actual permitted ECAP and receives its genuine administration return. A failure returns to the correct existing source/record owner through Foreman; no wrapper or per-repair human redispatch.
4. Publisher receipts couple actual owned records. Foreman performs the earlier checkpoint and freezes S0/A, then invokes final independent IAA under unchanged trusted authority. Only actual IAA issues its verdict/token. After rejection, Foreman retains delivery/acknowledgement and re-invocation ownership; CodexAdvisor repairs its source while separately required acknowledgement is tracked, preserving all findings and counters.
5. On actual PASS, publish/verify permitted additions and current binding. Active CS2 reviews the returned evidence; Johan controls authority adoption. Any destructive shared source change first proves ADMIN-COMPATIBILITY readiness; liaison records each real consumer adoption. Publication does not activate the candidate, and an implicated manager/assurer uses ADMIN-DISPOSITION instead of closing its own finding.

#### C. Ordinary record/publication correction

1. A genuine source-QP report exists but the current mutable scope/manifest omitted its path. The existing publisher/manager verifies the actual owner output and classifies the omission as ADMIN_RECONCILIATION only if source, verdict, authority, dependencies and required QA meaning are unchanged.
2. Record the existing failure and prepare the smallest correction to actual scope/count/manifest/task references. Reuse the genuine report/session and prior applicable QA; no new builder appointment, product RED suite or duplicate reviewer is created just to copy its verdict.
3. Before freeze, atomically publish the exact correction and necessary coupling after schema/parity/current-head concurrency checks. Return one receipt to the manager. ECAP rechecks the affected administration and Foreman resumes the eligible checkpoint; active CS2 retains parent continuity. A missing final IAA token does not prevent honest earlier preparation and does not grant final release.
4. If this defect is discovered after freeze, an edit to S0 is not an allowed assurance append. Create the next truthful evidence revision, re-evaluate affected administration/assurance under the profile, and preserve the old rejection and unaffected source QP. Do not rebuild unchanged product code or demand a future verdict to publish its inputs. If the correction actually changes policy/gate behavior, reclassify it as GOVERNANCE_GATE rather than hiding it as metadata.
5. The derived CS2 view now shows “source QP accepted; administrative correction published; next owner Foreman; final assurance pending; human decision NONE” when those are the actual outcomes. It does not claim whole-job completion.

#### D. Final IAA rejection, new learning and delayed acknowledgement

Delivery/acknowledgement in steps 3–4 and separately authorized corrective work in step 5 may proceed in parallel under section 5.15.2. The numbering does not make acknowledgement a prerequisite to permitted repair or necessary containment; it remains required before the particular resubmission/close that depends on it.

1. The actual manager submits H0/S0 and exact A for a stable review request under the accepted risk/job mapping. The required source QP/admin/checkpoint already exists; no future token or acknowledgement is a prerequisite to this review.
2. IAA finds an actual failed obligation and a new governance pattern. It issues REJECTION-PACKAGE with every required remediation item, evidence and exact re-entry. It creates its new review/learning records and declared escalation entry. It captures the new pattern and promotion owner without editing the frozen operational registry. The publisher commits the actual pack; no token or PASS is fabricated.
3. The authorized notification route delivers that rejection to the actual submitter/manager, with remediation, re-entry and acknowledgement requirement. Record the authentic delivery receipt. If acknowledgement is absent, show one owned follow-up: review execution completed; verdict REJECTION; delivered yes; acknowledged pending; administrative close pending; manager/watcher identified. Release the invocation claim after durable handback rather than waiting indefinitely or redispatching IAA.
4. The submitter actually acknowledges the identified rejection. Trusted intake records that new event. IAA's supported closing continuation records the declared new closure/addendum after verifying own duties and delivery/ack; an unavailable instance uses the explicit replacement-identity/envelope route in 5.5.1, not an invented old-session return. Administrative closure does not change the verdict.
5. The existing authorized producer may begin permitted source/administrative repair while steps 3–4 are pending. Manager tracks the complete finding set and verifies acknowledgement plus corrective evidence for every required prior item before dependent resubmission; fixing one item leaves the others visible. Actual changed inputs justify affected checks/assurance at the new submission revision; unaffected valid source QA remains scoped. An unchanged unresolved finding yields the same owned blocker, no new assurance appointment. Submission readiness does not claim that the manager has independently reversed IAA's rejection.
6. Required learning promotion follows its owned pre-freeze policy route with any needed source/authority approval and tests, under the same parent/accounting. Current safety/control deficits block dependent progression; an optional improvement's explicit disposition does not hold unrelated accepted delivery hostage. Only a later genuinely issued independent PASS and valid current binding can make this delivery eligible for integration; human authority and post-integration validation remain.

<a id="admin-gates"></a>

### 5.14 Merge-gate philosophy and functional contract

**Prove before claiming readiness; confirm before permitting integration.** The producer runs the applicable checks and supplies their actual results. Foreman accepts substantive quality; ECAP reconciles administration; IAA independently assures when required. Gates confirm trustworthy evidence and enforce the applicable transition. CS2 evaluates the handed-over outcome and takes reserved decisions. A gate does not become a builder, an observer an assurer, or a green badge a whole-job acceptance.

Retain the useful confirmatory philosophy in MERGE_GATE_PHILOSOPHY, while explicitly replacing its keyword-only fast path and blanket timing rules on accepted promotion. Confirmation still performs real semantic validation: who issued the proof, what exact source/base/policy/command it covers, whether execution succeeded, what was skipped/not applicable, and whether later inputs invalidate it. A keyword, filename, label, Git author, bot reply or copied report is not that proof. CI may discover a new defect and must expose it; “confirmatory” cannot mean ignore failure or trust a producer's unverified statement.

Run reproducible source checks before their dependent readiness claim using the same versioned logic/inputs as the gate. Do not maintain a second hand-copied implementation. Provider-only checks, issuer authentication and live integration-head checks must run through the actual supported host/adapter at the appropriate boundary; lacking local access is an explicit capability gap, not a locally fabricated PASS. Valid bound evidence may be reused where accepted policy permits. Fresh token/head/authority checks are still required. Re-run affected checks after genuine changes, not all historical reviews on unchanged observation.

| Gate family / actual inspected source | Function to retain and align | What its result must not imply |
|---|---|---|
| Governance/ISMS `.github/workflows/merge-gate-interface.yml`; standard interface canon | Evidence/schema/subject/issuer validity; canonical alignment; unresolved stop-and-fix enforcement. Governance also has an IAA/token check; ISMS adds contract/path protection | File presence, token text or “no markers found” does not certify all obligations resolved |
| Governance `governance-ceremony-gate.yml` and `governance-scope-to-diff-gate.yml` | Phase-appropriate required artifacts and actual scope parity, adapted to S0/A/I1 and exact active job | Earlier valid preparation is not final readiness; broad historical proof/session discovery cannot complete this job |
| ISMS `merge-gate-required-checks-alignment.js` / `validateAlignment` / check manifest | Bind logical requirement -> exact workflow/job/provider/check receipt. Eliminate dangling/duplicated aliases and unsupported legacy mappings during migration | A text mapping is not proof a real current-source check ran; schema/name alignment alone is not assurance |
| ISMS `foreman-prehandover-lane-gate.js` / `validateControl`, `emitCs2Trigger` and boundary/delegation gates | Validate actual stage/control, legal role/delegation order and exact source; structured `cs2-trigger.json` carries failure/action/run context where emitted | A trigger is an escalation request, not a CS2 decision; earlier ECAP preparation cannot require final IAA permission |
| ISMS `pre-handover-checkpoint.js` / `evaluateCheckpoint` plus `handover-claim-gate.yml` | Reconcile current source/base, checks, active evidence and failed-gate consumption. Checkpoint emits PRE_HANDOVER_CHECKPOINT_RESULT; claim gate verifies deliberate final claims. Its ready-for-review path is advisory, deliberate snapshot claims can hard-fail | A status enquiry, honest blocked handback or draft publication is not a false final-ready claim. A bot snapshot is not producer-owned ECAP output |
| ISMS `polc-boundary-gate.yml` | Check governed role, valid delegation and source ownership; distinguish shared Copilot executor from Foreman/builder authority | A shared runtime login or label is not sufficient governed identity or builder appointment |

**One interface, complete controls.** The target keeps the standard three stable outward contexts: `Merge Gate Interface / merge-gate/verdict`, `Merge Gate Interface / governance/alignment`, and `Merge Gate Interface / stop-and-fix/enforcement`. They aggregate the **complete applicable logical check set** in the accepted registry. Every child control, including required independent IAA, remains mandatory with its authentic receipt and semantic result; aggregation must fail closed on missing/pending/unknown required inputs. Extra diagnostic names can remain visible without becoming a competing policy list. This resolves the standard's “only three” versus local many-check manifests at the policy level; it does **not** authorize removing currently protected checks before actual aggregation, issuer bindings, branch settings and human adoption are verified. No required control disappears merely because its name is consolidated.

The full evaluator/detector dependency graph must be acyclic. A gate records the state it checks without requiring its own future completion receipt, a final token before the earlier ECAP checkpoint, or another committed summary after every assurance append. Stage-specific typed results and the finite append rule in 5.5.1 provide that order. Pending/missing data never becomes success through an all-green count. A truly inapplicable check needs the accepted requirement's reason, not arbitrary `skipped`/`neutral` success. Actual unvalidated branch-protection or status-app configuration remains an operational prerequisite; this source review did not query or change provider settings.

For each gate register requirement/version, stage, role/risk applicability, exact inputs/source bindings, implementation/command, trusted issuer, actual outcome, invalidation, failure owner and re-entry. This is a derived interface to this artifact's accepted rules, not another independent policy. A check may block only the action whose required obligation failed. Unrelated authorized preparation can proceed; the parent stays owned until real correction and integrated acceptance.

<a id="admin-intervention"></a>

### 5.15 Prompt intervention, injected reports and CS2 evaluation

The purpose of an injection is to **make a real deviation visible early and return it to its accountable owner before a prohibited next step**. It is not repeated instruction delivery, a way to appoint an agent by comment, or a substitute for actual enforcement. All roles are in scope: CodexAdvisor, Foreman, builders/QA, ECAP, IAA and active CS2 are observed against their own accepted boundaries. Human CS2 may change reserved policy through trusted instructions; an agent cannot impersonate that authority or suppress monitoring to approve itself.

#### 5.15.1 Current wiring and source functions

These rows describe inspected local definitions, not confirmed live service health. Relative workflow names below are under ISMS `.github/workflows/`; exact links appear in section 11.1.

| Workflow / helper | Defined trigger and actual function | Limitation / accepted target |
|---|---|---|
| `agent-bootstrap-inject.yml` | Manual `workflow_dispatch` only; posts bootstrap/pre-brief instructions, guessing agent from title/assignees | Not automatic preflight interception or authenticated role detection; stale header/instruction is not a live appointment |
| `iaa-prebrief-inject.yml` + `buildInjectionDecision` | Non-main task-file pushes, `/iaa-prebrief` comments or manual dispatch; resolves active task/wave, evaluates terminal state, requests canonical pre-brief if missing | Preserve genuine final-PASS suppression; require complete authenticated inputs, supported Foreman-owned IAA route, no retrospective pre-brief |
| `iaa-prebrief-gate.yml` | Opened/ready/synchronize PR events for its Copilot/branch selector; reminder when canonical wave PRE-BRIEF missing | Detection/advice, not a guaranteed hard gate or universal all-agent coverage |
| `governance-watchdog.yml` | Non-main push and opened/ready/synchronize target-PR events: branch-without-PR advisory, pre-brief barriers/reminders, PENDING-token-at-handover alert and canon-ceiling observation | Reconcile detection-only canon with actual job outputs; exact active subject and local transport, no blanket PR demand, historical-file false alert or comment-as-IAA assignment |
| `foreman-reanchor.yml` | Despite broader header descriptions, actual trigger is manual dispatch only | Manual reminder; cannot count as running on each push/claim until corrected and demonstrated |
| `pre-handover-checkpoint.yml` + `evaluateCheckpoint` | Created/edited PR comments; deliberate checkpoint or selected CS2/failed-gate/handover signals refresh intake and a structured current-head checkpoint | Keep deliberate intake separate from final success; no requirement for final token before a legitimately earlier stage |
| `producer-next-action-guidance.yml` + `renderGuidanceComment` | Target-PR events and filtered comments; one sticky next-control view, distinguishes STOP, waiting, unavailable, clean and with-CS2 | Useful delivery view; current report/checkpoint source and provenance must be verified, no automatic refresh of unaffected evidence |
| `handover-claim-gate.yml` | Comments and ready-for-review events; detects handover claims, validates snapshot/current checks/checkpoint, posts result and hard-fails deliberate invalid final claims | Its own source distinguishes advisory ready events from deliberate claims; future integration still needs the authoritative aggregate gate and actual human decision |
| `post-handover-auto-remediation.yml` + `classifyPostHandover` / `resolveRemediationCycle` | Comments/ready events; classifies infrastructure, product, gate/admin/IAA/ECAP defects and posts sticky correction guidance | “AUTO_REMEDIATION_ACTIVE” comment does not prove dispatch or repair; local three-cycle presentation is not conserved job accounting |
| `copilot-push-intercept.yml` | Selected PR/review comments mentioning Copilot plus push/credential reasoning; posts text-output redirect | Never infer an intentional restriction or require human copying without actual capability evidence; use proper publisher, no credential/provider bypass |
| `copilot-retry-watchdog.yml` / `copilot-loop-watchdog.yml` | Retry: 15-minute source schedule, opened/reopened PR and manual dispatch, posting bounded retry messages. Loop: manual dispatch only | These are repository workflow definitions, distinct from the paused desktop 30-minute monitor. No retry on an unchanged inaccessible input, uncertain effect or exhausted/UNKNOWN budget |
| `injection-audit-report.yml` | Manual dispatch only; scans nine legacy comment markers and later Copilot replies, posts one audit table | Replace marker/reply heuristics, old one-report-ever suppression and zero-fired clean implication; nine known markers are not complete coverage |

#### 5.15.2 Meaning of “the moment an agent goes out of line”

The accepted target is the **first observable violation event**, with a preventive runtime check before a forbidden effect where the adapter supports interception. Examples: unbound appointment, unauthorized path/tool effect, required pre-brief missing before implementation, failure ignored, a false final-ready claim, or an expired authority/budget. Preflight, appointment, read/write/tool boundaries, check completion, owned returns and handover are explicit observation points. A runtime hook can refuse a not-yet-admitted action; a hosted push/comment workflow runs asynchronously after its event and cannot undo an already performed write. No workflow can infer unreported agent thoughts or guarantee zero scheduling delay.

Each detector must declare event surface, applicable role/stage/requirement, input binding, deployment state, actual last successful observation, permission/subscription health, detection/delivery timestamps, latency and supported wake-up/fallback. Measure latency; accept its threshold through runtime configuration, not an invented time/budget here. Manual-only, disabled, failed, permission-denied or unobserved surfaces are visible coverage gaps. “Zero injections” can mean no deviation, no observation, or failed delivery: only proven coverage plus actual evaluated outcomes supports a clean result. Missing monitoring required for a dependent automated action blocks that action and names its owner; authorized manual preparation remains possible with honest limits.

**Detection, enforcement and correction have different owners.** The watchdog is an independent observer under WATCHDOG_AUTHORITY_AND_SCOPE and GOVERNANCE_WATCHDOG_CANON. It records evidence and delivers an advisory/escalation; it does not write the implementation, alter agent contracts or create QP/IAA acceptance. A deterministic gate/controller enforces the accepted failed requirement at the relevant boundary, including only its explicitly authorized hard-stop behavior. Existing canonical hard-stop exceptions remain scoped, not a blanket observer veto. The non-implicated accountable manager routes repair to the actual permitted producer; when the manager/assurer/control itself is implicated or the finding is contested, ADMIN-DISPOSITION selects a different authorized resolver/closer. A supported dispatch must have its own invocation receipt. Only actual human CS2 may alter a reserved rule or pause/reconfigure monitoring. The monitored worker cannot disable, erase or forge the observer. The independent supervisor in 5.8.2 detects observation/delivery failures as well as coordinator failure.

The target lifecycle uses the existing job/event/evidence model:

~~~text
Actual event -> observe and bind subject -> verify applicable requirement
  -> no breach: record evaluated coverage/outcome where required
  -> breach: record finding + gate refusal for prohibited dependent action
      -> deliver exact intervention to bound owner/manager
      -> delivery / actual acknowledgement tracking -----------+
      -> independently permitted targeted correction / QA -----+
      -> independent disposition joins applicable obligations
      -> append actual closure evidence; resume eligible stage
Unknown inputs or delivery/outcome -> one owned blocker and reconciliation
~~~

**Acknowledgement and correction are parallel obligations.** After recording the finding and containing only the prohibited dependent action, existing authorized owners may perform the targeted fix or necessary containment while delivery/acknowledgement remains pending. A receipt is not a prerequisite to a separately authorized fix. Keep actual acknowledgement before the specific resubmission/session closure that requires it; do not infer acknowledgement from a commit or silently drop that requirement. An unavailable subject goes through ADMIN-DISPOSITION, with a genuine replacement/manager receipt where accepted policy permits, never an invented old-instance reply.

Duplicate observations reuse the same finding fingerprint and parent counters. New material input produces a new revision with explicit relationship to the prior event. Do not create repeated messages/appointments merely because a timer or bot comment fired. An amendment/fix is evidence, not resolution until the proper verifier accepts it. Delivery is not acknowledgement; acknowledgement is not correction; correction is not independent acceptance; administrative closure is not final release.

The injected text is a **bounded, authenticated report**, not higher-priority instructions or new authority. Its required action references an already accepted requirement and permitted owner/path, with exact evidence and re-entry. The recipient verifies issuer/context; untrusted comment markers, quoted historical failures or another job's report cannot issue commands. A spoofed `@copilot`, copied role name or bot reply cannot activate a custom IAA/ECAP role. Required role dispatch remains through the supported appointment interface. A failed notification remains an undelivered finding even if its report file exists. Already admitted in-flight effects follow the uncertainty rules in 5.8.2, not promised cancellation.

#### 5.15.3 Intervention evidence and CS2's handed-over job view

Store each fact once in the existing authoritative evidence/event route. An injection comment/sticky report is a projection with links, not a competing ledger. Retain immutable actual receipts/history; update the current projection only for material state changes, binding its current input revision. Required Git records obey pre-freeze coupling or the exact new-file allowance, so an audit refresh cannot keep invalidating an assured head. A machine-generated correction/gate report is **not** an IAA-authored REJECTION-PACKAGE merely because its legacy heading uses “QA rejection package”.

| Evidence group | Required content / authentic producer |
|---|---|
| Identity and rule | Parent/alias, wave/job profile, role + runtime/appointment identity, stage, source/base/submitted/current identities as relevant, policy/requirement ID/version; verified detector/workflow/app/run/receipt |
| Detection and coverage | Actual observed action/failed invariant, evidence links/raw result, expected versus actual first detection layer, covered event surface, monitoring health and detection/delivery timestamps |
| Intervention and ownership | Finding fingerprint/revision/recurrence, affected blocked action, severity/reason, permitted next action/path, non-implicated receiver/resolver/closer and producer/wake-up; actual reserved human decision only when required |
| Delivery and acknowledgement | Exact intervention/message hash and actual recipient/channel/receipt; acknowledgement by that bound owner with finding/reference, not any later shared-bot comment |
| Repair and independent disposition | Actual correction or source-bound contested/detector-error disposition, prior finding outcomes, relevant checks, independent closure authority and genuine QP/ECAP/IAA; unresolved items remain visible |
| Accounting and closure | Conserved ledger references/measured or UNKNOWN costs, old presentation counters labelled separately, actual verifier/closure event, remaining limits and precise successor eligibility |

This evidence appears within section 5.7.1's **same CS2 view**: a concise summary of detector coverage, interventions, ignored/repeated findings, verified closures, outstanding blockers and links to raw receipts. Zero events with healthy proven coverage differs visibly from UNKNOWN coverage. Do not ask Johan to reconstruct comment chronology or run the technical gates himself. Preserve reports through eventual job acceptance so he can evaluate behavior as well as the delivered feature.

For final human evaluation the accountable manager/active CS2 presents:

1. The agreed outcome and actual delivered/validated scope; what remains pending or excluded by an actual accepted decision.
2. Applicable logical gates and authentic results at the relevant source/stages; any required missing/pending result remains a blocker.
3. QP, ECAP and independent IAA outcomes where required, actual issuer/binding, and no inferred PASS from an injection audit.
4. Coverage and intervention history: what went out of line, whether the agent acknowledged and corrected it, recurrence/root cause/prevention, and any unresolved capability or authority restriction.
5. Actual integration/rollback readiness and the **precise human decision** required. Ready for CS2 evaluation is not already merged, activated or accepted.

CS2 may use the injected reports to challenge the handover, request a scoped correction or approve a permitted next action. A clean report supports judgment; it never overrides a required red/unknown gate, supplies an independent token or waives a safety/authority boundary. Required exceptions use section 5.4 and record the actual human decision rather than editing an old report to look clean.

<a id="admin-disposition"></a>

#### 5.15.4 Independent intervention disposition (ADMIN-DISPOSITION)

An intervention's subject cannot select itself as its independent resolver, close its own finding, alter detector evidence or restore its own revoked capability. Delivery to the subject and routing to the accountable receiver are distinct. The following target matrix applies to an actual role-bound finding; routine verified metadata corrections use existing eligible owners/checkpoints without an additional reviewer appointment. Material authority/safety or verdict-integrity concerns take the independent/human route shown.

| Subject / category | Accountable receiver and permitted repair owner | Independent resolution / closure authority | Containment or unavailable-owner fallback |
|---|---|---|---|
| Builder / QA producer | Non-implicated Foreman; actual appointed producer repairs within its remit | Foreman accepts source/ordinary compliance with actual tests; applicable ECAP/independent IAA remain separate | Same permitted task; if Foreman implicated/unavailable, route human CS2 for an actual non-implicated manager/appointment |
| Governance administrator / liaison / publisher | Non-implicated delivery/ceremonial Foreman; original permitted record/code/payload owner repairs | Foreman resolves quality/ownership; ECAP may validate only administration; a verdict can only be superseded by its genuine authorized issuer, never publisher text | Preserve actual payload/receipts; disputed authority or unavailable manager goes to human CS2; no convenience write grant |
| Foreman | Pre-bound independent resolver receives strictly administrative findings; active CS2 maintains human visibility in the same CS2 view; actual source/record owner performs permitted repair | Ordinary administrative facts use the bound ECAP/limited mechanical-verifier route below. Substantive quality, managerial judgment, authority, independence and verdict-integrity concerns retain their proper non-implicated reviewer/IAA/human route; reserved disposition remains human | Reuse the accepted eligible resolver, never Foreman's self-closure. Human CS2 selects an actual fallback once if that route is absent, unavailable, implicated or insufficient; active CS2 does not supply missing QP or an independent verdict |
| CodexAdvisor / factory author | Human CS2 receives material factory-authority matters; non-implicated Foreman can coordinate ordinary affected source/admin repair through ADMIN-FACTORY | Non-author Foreman/actual IAA provides scoped quality/assurance as required; human CS2 resolves author/authority disputes | Own-contract/IAA-contract rules retained; no builder or Foreman contract authorship by substitution |
| ECAP | Non-implicated Foreman/ceremonial manager; ECAP or its properly authorized replacement repairs its own administration | Foreman checks the return and actual gates; required independent IAA remains. ECAP cannot accept its own implicated output as final-ready | Foreman requests a supported eligible continuation/replacement; unavailable candidate is one blocker, not repeated appointments |
| IAA / misleading verdict or independence concern | Human CS2, with relevant subject manager informed | Different explicitly appointed independent assurer under unchanged trusted authority checks the facts; only actual authorized IAA issues any required superseding token/verdict. Human CS2 resolves trust/authority, not an invented token | Quarantine affected assurance reuse; recover authentic evidence; if no supported independent route exists, preserve one blocker/candidate work and request the exact reserved route |
| Active-CS2 agent | Human CS2 through trusted direct intake, with independent supervisor visibility | Non-implicated manager/independent assurer supplies relevant factual/QA evidence; human CS2 resolves parent-progression/authority and any replacement | Active CS2 cannot clear its own ineligible-wave finding or grant itself a reset; dependent progress fenced without erasing parent ownership/history |
| Controller / authority verifier / effect dispatcher | Independent supervisor alerts human CS2; explicitly authorized non-implicated runtime implementer prepares repair | Independent validation of the relevant runtime invariant plus human-controlled trusted configuration/re-enable; no worker self-grant | Stop dependent dispatch at the existing trusted boundary; reconcile admitted effects. The implicated component is not the only notification path |
| Detector / observer / supervisor error or outage | Human CS2 via the fixed independent health/intake route; actual permitted runtime/detector owner repairs | Non-implicated reviewer verifies observation/health and rule applicability; human authority controls re-enable when reserved | Use the already specified external health signal/CS2 view and human fallback. No infinite new-watchdog chain and no assurance of unavailable monitoring |
| Unverifiable/conflicting claimed human instruction | Actual human CS2 through the trusted source, not the worker's paraphrase | Human resolves the intended instruction/scope once; independent QA still supplies its own outcome | Block only the dependent reserved action until authentic clarification; no agent discipline of human CS2 and no fabricated approval |

For any row, record the actual receiver/resolver identities, accepted authority, subject/conflict check, affected requirement/evidence and supported invocation route **before accepting closure**. Human appointment of an independent resolver is itself an authentic instruction; a comment or matrix label alone does not activate an agent. Where this table supplies a human fallback to the normal Foreman IAA route, align the precise canon/contract invocation exception before use. Existing non-implicated role authority can handle ordinary evidence checks; the table is not permission for a new unapproved role or generic waiver of final IAA.

**Standing resolver for routine Foreman administration.** Bind one ordinary resolver route in the accepted policy/envelope, with exact requirement IDs, permitted facts/predicates, supported invocation, independence checks, receipt/evidence destination and failure/fallback condition. Bind the resolving role/capability at intake and its actual eligible instance before use; do not require future ECAP output or a new human selection merely to prepare the envelope. For a profile already requiring ECAP, use its properly appointed **non-implicated ECAP that did not author the implicated fact** for strictly administrative evidence. For a lighter profile without ECAP, use only a pre-approved independent mechanical verifier for the explicitly listed executable administrative predicates; do not create a full ECAP ceremony solely for that metadata. The accepted envelope identifies which route applies, rather than allowing the subject to select its closer after the finding.

An ordinary case verifies a mechanical administrative fact, such as a corrected pointer to a genuine owned output, required field format or actual receipt/scope parity within existing authority. It cannot change substantive scope/meaning, issuer/verdict, required QA, permissions, accepted gates or budgets. ECAP may independently verify only such administration, not replace Foreman's substantive QP or IAA. A mechanical verifier must produce its actual trusted, source-bound result under the accepted predicate/version; Foreman's own self-check is not independent closure. A resolver that authored the implicated fact, is itself implicated, lacks the exact grant or needs substantive judgment is ineligible for this ordinary route.

Reuse the bound appointment/check interface for eligible corrections and append its actual limited disposition to the existing event/check-evidence route, obeying S0/A/I1 if Git publication is required. No source freeze is weakened. Active CS2 keeps human visibility in the same concise view; an ordinary verified correction does not require another human reviewer-selection decision. Material quality/managerial/authority/independence concerns, contested matters outside the resolver's scope, or an absent/unavailable/implicated/insufficient resolver go to the actual proper reviewer/human fallback once, with one owner and wake-up condition. Human reserved powers, required final IAA and the prohibition on subject self-closure remain unchanged. WP2 must align the precise ECAP/Foreman/verifier contracts, schemas, invocation and gates before this target route operates; this paragraph appoints no current agent or new capability.

**Contested findings and detector errors:** an authenticated report can still have the wrong scope, source or rule. The subject may acknowledge receipt **and dispute its conclusion**, linking exact contrary evidence; disagreement is not proof of a breach. The independent receiver/resolver records an actual disposition: CONFIRMED_BREACH, WRONG_SUBJECT, DETECTOR_DEFECT, NOT_APPLICABLE_WITH_BASIS or DUPLICATE_OF_EXISTING. CLOSED_VERIFIED additionally requires its applicable resolution/delivery/acknowledgement/check obligations. These are proposed finding-disposition fields needing schema alignment, not new binary IAA verdicts or top-level job states.

A wrong-subject/detector disposition clears only the block disproved by the accepted evidence. Preserve the raw observation and append the reason/issuer; repair the detector through its actual authorized source owner and affected regression. Do not mark an unchanged implementation defective to satisfy the detector, silently disable a required gate, or repeat unaffected source QP/pre-brief/IAA. A genuine still-unresolved safety/authority invariant remains contained. The subject's own acknowledgement, assertion of a fix or possession of a credential cannot supply independent closure.

Confirmed breach/recurrence accounting is distinct from detection count and actual cost. Do not invent a breach because a false alert fired; do not erase recorded runtime/spend, prior decisions or consumed correction allowances. Any needed correction to an erroneous historical classification is an explicit appended reconciliation under accepted authority, never a silent counter reset. Existing parent/alias/budgets remain conserved.

An unresponsive original instance does not hold a permitted repair hostage: retain its actual delivery/ack status, use the named non-implicated manager or properly bound replacement where the accepted requirement permits, and record that genuine actor's receipt. If a specific resubmission requires a still-missing acknowledgement/independent result, that dependent resubmission remains blocked with one owner/wake-up condition. Necessary containment and other authorized correction proceed without falsely declaring administrative closure.

## 6. Impact Analysis

### 6.1 Source and Responsibility Map

| Source family | Planned disposition | Required implementation boundary |
|---|---|---|
| ACTIVE_CS2_AUTOMATED_WORKFLOW_GOVERNANCE and control map | Incorporate the authoritative model here, reconcile implementation status and retire duplicate procedural files per 6.4 | Preserve generic ownership/ledger/envelope/QA controls; change policy only where explicitly accepted |
| EXECUTION_CEREMONY_ADMINISTRATION_PROTOCOL | Incorporate aligned preparation/acceptance/publication/bootstrap rules here and retire the superseded procedure per 6.4 | ECAP preparation remains separate from Foreman substantive acceptance and IAA |
| AGENT_HANDOVER_AUTOMATION | Incorporate immutable proof, exact assurance append, local transport and stage inventories; retire the superseded procedure per 6.4 | Preserve actual scope/diff checks and final independent assurance |
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

<a id="admin-consolidation"></a>

### 6.4 One administration authority and complete retirement of conflicting documents

**Target:** after acceptance, this artifact becomes the major and single normative administration specification in governance, promoted to `governance/canon/ADMINISTRATION_SYSTEM.md` with the same design lineage/parent and an accepted release/version. Promotion moves its operative content; the proposal/history remains clearly non-normative review evidence. Do not create a second active “new rules” manual beside the old ones. The constitution retains human/safety authority and other domain canon retains its distinct subject; their administrative interfaces point here rather than restating competing procedure.

All conflicting or fully subsumed **administration documents are to be removed in their entirety from the active tree** after their unique valid obligations have been mapped, incorporated and verified. A competing document must not remain loaded under an old name, a duplicate copy, a fallback agent bundle or a stale gate reference. Historical review/rejection/session evidence is retained immutably outside active policy loading; it is evidence of prior rules and chronology, not a second current authority. A document with unique non-administrative domain content needs that content relocated to its proper single existing authority before the conflicting document is retired. Cross-domain documents which remain may contain a reference to this manual, never a contradictory administration procedure. There is no approval here to discard substantive safety, authority, independent-QA or accounting controls.

This changes the earlier “retain each existing administrative policy” assumption into **preserve its necessary controls, consolidate once, then remove the superseded file**. Keep useful executable schemas, scripts and role-specific methods as versioned implementations/derived interfaces to the accepted manual, not independent policy sources. Tier 1 role contracts remain necessary execution boundaries; their admin requirements reference this authority, with minimal explicit enforceable role/path/QA provisions. Tier 2 expert examples and Tier 3 invocation context cannot invent competing obligations.

The following is the initial retirement/conformance inventory, not a claim that the full repository audit is complete or permission to delete these files today:

| Existing source family / exact starting source | Target disposition |
|---|---|
| MERGE_GATE_PHILOSOPHY.md and MERGE_GATE_INTERFACE_STANDARD.md | Absorb valid philosophy, interface, roles and gate controls in 5.14; explicitly replace keyword shortcuts/timing conflicts; remove their separate active documents after complete mapped coverage |
| GOVERNANCE_WATCHDOG_CANON.md and WATCHDOG_AUTHORITY_AND_SCOPE.md | Absorb detection, independence, delivery, exemptions and scoped hard-stop/authority requirements into 5.15; resolve comment-as-invocation and local/hosted differences; retire the conflicting procedural documents once every clause is disposed |
| EXECUTION_CEREMONY_ADMINISTRATION_PROTOCOL.md and AGENT_HANDOVER_AUTOMATION.md | Absorb stage/role/publication/immutability/closure controls; retire duplicate procedures only with the actual accepted gate/contract alignment |
| ACTIVE_CS2_AUTOMATED_WORKFLOW_GOVERNANCE.md and its control map | Incorporate the existing generic parent/evaluator/ledger/envelope/acceptance/supervisor model; keep one normative model here, no parallel lifecycle; relocate any unique out-of-scope content before whole-file retirement |
| IAA canon, pre-brief, gate-applicability/management and failure-handling procedural documents | WP2 maps each clause: incorporate administrative policy and remove superseded procedural sources; preserve distinct independent-assurance/role authority as the proper domain boundary without a duplicate admin sequence |
| Contracts, integrity copies, knowledge/checklists/templates, `.mcp.json`/bootstrap bundles and workflow/script references in governance and consumers | Replace every old operative pointer and conflicting instruction in the same compatible release. Preserve protected authorship, exact integrity and needed expert methods; never delete an agent's actual contract as a shortcut |
| Inventories, ripple/public API registries, schemas and executable requirement manifests | Update moved/removed paths/hashes/versions, derive/check all admin references against this manual and remove dangling aliases. Keep actual validators; no bypass, fabricated source commit or lost consumer obligation |

WP2's **exhaustive clause-level disposition** must identify old path/anchor/hash, requirement, accepted replacement anchor/ID, decision (retain-control/replace/relocate/retire), reason, author/approver, referencing consumers/loaders/gates and actual regression. Every unique clause must have a disposition; a filename similarity or a claim “all conflicts removed” is insufficient. Resolve constitutional/protected-policy replacements in the identified accepted revision and bounded source package; do not leave agents to choose whichever document is convenient.

Candidate preparation/promotion/removal is one reviewable compatible source release, accepted as immutable source before any destructive default-reference cutover: incorporate the complete accepted rules; update protected contracts/integrity, compiled schemas/gates/templates and all active links/loaders; update inventories; remove fully retired files; run positive/negative and stale-reference/load tests; obtain applicable QP/ECAP/independent IAA and human source acceptance. WP3 foundation and WP4 role updates may have separate candidate handovers, but their interdependent source changes are assembled and accepted together before operative cutover. ADMIN-COMPATIBILITY additionally proves every remaining live reader/in-flight invocation pinned, coherently migrated or actually fenced before a shared deletion/ref update; do not delete an input still read through that mutable reference. Historical citations to a retired file become explicit commit-pinned evidence references, not dangling live links or active fallback authority. A pre-existing rule that blocks its own authorized migration uses the exact scoped supersession/replacement-check route in 5.4. A migration cannot bootstrap by claiming the new manual already governs before adoption.

At the source acceptance boundary, the candidate may be isolated and non-operative. Complete the separate live-cutover readiness/actual-effect receipts in 5.12 before making its shared/default deletions operative; then complete incremental adoption per 5.12/7.4. Source candidate acceptance is not permission to break an unmigrated consumer. Each consumer reports migrated references, eliminated conflicting files/instructions, actual gate/injection parity and monitoring health. Unready consumers are explicit, never counted adopted. Rollback first protects affected new-release readers using the same compatibility rule in reverse, then restores a coherent earlier release/loader set with its own authority and preserved later history, not a mixed pair of competing manuals. Source acceptance, consumer adoption, complete conflict removal across the cohort and live automation readiness are separately evidenced outcomes.

Completion evidence: no active conflicting administration document remains; no contract/tool/bootstrap/gate/knowledge/index/consumer loader can resolve a retired authority as current; every preserved mandatory control has a valid accepted requirement and check; links and inventories match actual bytes; the single CS2 view points to the accepted manual/version and real receipts. A historical archive is acceptable only when explicitly excluded from current-policy selection. This design revision performs no source retirement, live promotion, gate edit or layer-down.

## 7. Migration Plan (if breaking)

### 7.1 Design-First Review Cycle

This document is work package 1, now revised to 0.6.0 under Johan's instruction to implement R5-01/R5-02 and the rejection-walkthrough clarification. Hand it back, record requested changes against this revision and repeat until the identified design revision is accepted. Do not treat a request to review/correct the design as acceptance of live implementation.

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

Prepare the legacy-reader/in-flight compatibility map and any authorized immutable legacy pins/fences; these do not claim new-policy adoption. Obtain SOURCE_RELEASE_ACCEPTED for the immutable candidate without requiring future consumer adoption. Before changing a shared default reference or making deletions operative, prove LIVE_SOURCE_CUTOVER_READY and obtain/verify the actual authorized cutover receipt. If candidate preparation never changes a shared source, record that distinction truthfully. For each repository in the accepted rollout cohort, compare against that immutable source release; generate its exact adapter/contract/Tier 2/Tier 3/gate changes; validate; hand over; apply the accepted change; verify actual byte/version/behavior parity; record CONSUMER_ADOPTED. Then evaluate ROLLOUT_ACCEPTED against the cohort and all inventory dispositions. Do not mark all consumers complete based on one successful repository or count a deferred target as updated.

### 7.5 Rollback and Existing PR Integration

Rollback restores a previously verified policy/adapter/source snapshot without deleting subsequent decisions or resetting counters. Never “roll back” by replaying a stale side effect, discarding a later valid owner record or erasing a rejection.

After rollout acceptance, inspect each existing PR against the accepted policy and actual current source. Classify reusable source, still-valid scoped evidence, superseded transport/administrative records, outstanding substantive defects and external blockers. Reuse unaffected accepted work. Produce actual compatibility or correction evidence before final assurance; do not bulk close, merge, rebase or rewrite old PR history.

## 8. Approval Requirements

### 8.1 Current Authority and Next Decision

Current authority is Johan's direct local instruction to prepare the design, followed by his instruction to implement the identified review corrections into this next revision and return it. No issue or PR is required. Revision 0.6.0 remains REVIEW and non-normative until he accepts an identified revision; no live gate, contract, resolver appointment or consumer correction is claimed performed here.

The next human checkpoint should decide DESIGN_ACCEPTED for the identified specification/test plan and migration boundaries, and identify the next bounded work package. DESIGN_ACCEPTED does not assert executed source/runtime acceptance, live cutover, consumer adoption or activation. This is a review checklist, not an assertion that approval has been received.

### 8.2 Separate Decisions

Record design acceptance, a bounded source correction, any legacy-rule supersession, independent QA/IAA outcome, per-consumer adoption, remote publication/integration and activation as separate facts. One may authorize several explicitly named actions, but cannot be inferred to authorize unnamed actions or provide an independent outcome.

Keep budgets and authority changes explicit. Mandatory independent assurance is not supplied by the implementing agent's self-check or by a human acknowledgement of this draft. Any accepted change to a governance requirement must name the replacement requirement and its validation.

The direct local mode and its equivalent evidence route need explicit source/schema alignment during implementation; source README/constitution/contract statements requiring issues/PRs must not remain contradictory active instructions. The design instruction is recorded here as the actual authority for this preparation rather than represented as a fictitious GitHub carrier.

## 9. Implementation Plan

### 9.1 Reviewable Work Packages

| Work package | Deliverable | Handback / dependency |
|---|---|---|
| WP1 — this design | Versioned specification/test plan, concise operating guide, selected factory route, safe live cutover, complete rejection tracking and independent intervention disposition with a standing ordinary resolver | Human design review of 0.6.0; no future runtime PASS needed for design acceptance and no live rollout inferred |
| WP2 — exact conformance audit | Complete clause-to-contract-to-gate-to-runtime matrix; exact classification/closing-clause amendment list; full target inventory; exhaustive clause/reader/in-flight retirement map; exact factory/invocation/disposition amendments including ordinary-resolver binding; legacy-pin/fence readiness; gate/observer/effect/supervisor specification | Human review of scoped policy changes and transport/override procedure |
| WP3 — governance/gate foundation | Candidate single admin manual and superseded-source removal plan/diff with inventory/reference migration; schemas, derived gate/injection interface and demonstrated stage/proof fixes; align finite closing outputs, risk mapping, classifier, parity verifier and binding receipt | Source checks and candidate handback; assemble with dependent WP4 role updates for immutable source acceptance; shared live cutover separately requires 5.12 readiness; no live activation |
| WP4 — role expertise | Coherent Tier 1/2/3 and integrity updates for ECAP/IAA first, plus affected Foreman/author/liaison interfaces | Verify every role consumes the manual, closing/author duties and proper independent assurance; complete coordinated WP3/WP4 source acceptance and prove legacy-reader/in-flight compatibility before a shared operative dependency is deleted |
| WP5 — local pilot and runtime proof | Prove the accepted manual local adapter separately from production automation; demonstrate controller/claims/effect dispatcher, independent supervisor, human kill/reset and uncertain-effect recovery in the authorized runtime location before automatic dispatch | Actual evidence including prompt breach injection, coverage/outage, report provenance and CS2 handover demonstration for each claimed capability; no service/database prerequisite for an independently authorized manual correction |
| WP6 — remaining consumers | Per-repository adapted diffs, gates/injection health, full conflicting-source/reference removal, tests, acknowledgement and rollback points | Handback at each repository or agreed logical batch |
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
| V60 | Acknowledgement arrives after a two-finding rejection; first only item A, then all required items have corrective evidence | Trusted actual submitter receipt wakes the permitted closing continuation; declared close/addendum preserves verdict/history. Item B stays visible and prevents premature resubmission after A alone is repaired. Once every required item has actual corrective evidence and other submission requirements hold, permit affected re-entry; IAA decides assurance in that reassessment, with no duplicate appointment or unrelated source-QA rerun |
| V61 | Review instance becomes unavailable or is replaced | Recover genuine result if available; bind real replacement identity/exact outputs by validated amendment; no impersonation, wildcard or repeated unchanged review; honest blocker if evidence unavailable |
| V62 | Low-risk docs/Tier 2, neutral workflow, material gate and agent contract classified | T6/T5/T4 minimum routes only with proved non-operative semantics; protected gate overlay and T1 retain ECAP/independent IAA; source conflict retired through actual alignment |
| V63 | Mixed T1+T2 or generic low-risk repair within this mandatory-assurance parent | Union includes integrity, wiring/all FFA and stronger accepted job controls; no generic downgrade, actor exemption or new IAA solely to classify genuinely exempt work |
| V64 | Authority revoked before dispatch versus after provider admission | Before admission no effect; already admitted effect reconciled as in-flight/uncertain, dependent action quarantined until actual outcome, no promised cancellation or blind retry |
| V65 | Provider lacks idempotency/complete lookup or reply is lost | Exact operation capability recorded; automated operation disabled or uncertain outcome retained with supported owner action; momentary absence never proves safe retry |
| V66 | Coordinator dies or subscription is lost while an effect is outstanding | Independent supervisor outside that failure boundary surfaces/reconciles actual intent; human kill works, only audited human reset re-enables; no double effect or accounting reset |
| V67 | Producer proof contains only a gate keyword or forged token text | No evidence-based PASS; require authenticated source/policy/command/result and actual independent issuer where applicable |
| V68 | Required pre-IAA checkpoint valid while final token absent, or live-only gate unavailable locally | Earlier lawful stage remains eligible; later final control/provider prerequisite stays explicit; no fictional local PASS or self-dependent gate cycle |
| V69 | Stable three gate contexts aggregate a larger check set | Every required child has a real trusted current/applicable receipt; missing/mapped-only/unknown required input blocks aggregate; existing protection changed only after accepted verified coverage |
| V70 | Agent attempts unauthorized appointment/path/tool effect or false final-ready claim | First supported observation emits source-bound intervention; preventive hook/gate refuses dependent effect where actually supported; no promise that a later workflow undoes it |
| V71 | Injection is delivered and any unrelated shared-bot reply follows | No acknowledgement/closure inferred; exact target/finding-bound authentic reply and verified repair required |
| V72 | No injections fired but detector disabled/manual-only, permission denied or subscription dead | Coverage UNKNOWN/unavailable shown; no clean report or success inference; dependent automation owned/blockable with actual fallback |
| V73 | Old audit marker exists and a new material breach/reply arrives | New bound revision updates derived view with immutable history; no one-report-ever suppression and no duplicate alert on unchanged input |
| V74 | Spoofed report marker, quoted old failure, wrong job or report containing instructions to exceed authority | Reject as authority/decision input; no agent appointment or required-action grant from comment text |
| V75 | Valid final IAA PASS and complete current evidence reach CS2; later a material blocker appears | Suppress redundant pre-brief/review only while all required bindings are proved; missing facts fail closed and real invalidation re-enters affected stage |
| V76 | Local remediation counter resets or a watchdog retries inaccessible input | Retain shared parent budget/correction ledger and uncertainty; no automatic replenishment, unsupported retry or unchanged author invocation |
| V77 | CS2 inspects the handed-over job and intervention report | One view gives outcome/gates/QP/ECAP/IAA, detection coverage, actual acknowledgements/verified repairs/recurrence and precise reserved decision; no report substitutes for acceptance |
| V78 | Single manual promoted while an old conflicting document/bootstrap pointer remains | Reject claimed source-consolidation completion; migrate every clause/reference/loader and remove retired active files entirely |
| V79 | Consumer still loads old admin rules or rollback mixes old/new policy | No adoption/aggregate completion; restore or migrate a coherent accepted release while preserving independent evidence/counters |
| V80 | Observer detects breach but lacks enforcement authority; a hard-stop exception is applicable | Observer reports, authorized gate/controller enforces only accepted scope, manager routes actual producer; no observer self-grant/repair/token |
| V81 | Hosted workflow queue delays an injection or in-flight effect completes after detection | Measure actual detection/delivery latency and limitation, reconcile admitted effect; no zero-latency or cancelled-effect claim without proof |
| V82 | Existing manual trigger/header claims automatic monitoring for every agent | Use actual event/role selectors and observed health; required missing coverage prevents automatic-readiness claim, not authorized manual design handback |
| V83 | Legacy contract/bootstrap/ripple reader follows shared main when an old canon/inventory input is to be deleted | Immutable candidate may be accepted; destructive live cutover refused until actual whole-bundle legacy pin, coherent migration or real dependent fence is proved |
| V84 | An invocation spans policy cutover or rollback | One valid isolated policy/authority binding or actual fence/reconciled handoff; no silent mid-session rule replacement, lost effect or reset |
| V85 | Consumer deferred/unlocated while an isolated candidate or safe pilot is ready | Candidate/pilot can progress within authority; unknown affected shared reader still blocks destructive live cutover; deferral is never pin/fence/adoption evidence |
| V86 | Contract-only factory job enters source QP, ECAP, checkpoint and IAA | Selected Foreman ceremonial caller/owner receives actual returns in order; CodexAdvisor remains author; no ambiguous second invoker or missing admin appointment |
| V87 | Factory bundle depends on a builder/schema/canonical prerequisite | Proper Foreman-appointed producer owns prerequisite; source-QP/receipts exist before dependent action; no factory authority expansion or new parent |
| V88 | Factory IAA rejects, then a genuine repair arrives | Foreman retains delivery/ack/checkpoint/re-invocation ownership, actual source author repairs, IAA owns verdict; reuse existing task and affected re-entry |
| V89 | Foreman has an ordinary metadata omission versus a quality/authority concern; IAA or active CS2 is itself an intervention subject | Ordinary Foreman administration uses the already bound eligible non-author ECAP/limited independent verifier without fresh human selection. Material or out-of-scope concerns retain the proper independent/human route. Every subject is barred from self-closure/reset; genuine required assurance and human authority remain |
| V90 | Detector reports a wrong job/historical proof or its conclusion is disputed | Authentic disputed acknowledgement is allowed; independent evidence-based disposition clears only the disproved block, preserves observation/cost/history and routes actual detector repair without unchanged implementation review |
| V91 | Trusted dispatcher/controller/observer/supervisor or normal receiver is unavailable; a standing ordinary resolver is absent, unavailable, implicated or insufficient | Fixed independent supervisor/health-to-human route and proper permitted repair. An ineligible ordinary resolver cannot close its finding; use the actual authorized human-selected fallback once and preserve its owner/wake-up condition. No implicated sole notifier/closer, repeated unavailable appointment, infinite watchdog chain or self-re-enable |
| V92 | A genuine fix is authorized while required delivery/ack receipt is delayed | Targeted fix/containment proceeds in parallel; no invented acknowledgement; dependent closure/resubmission remains blocked wherever actual receipt is required |
| V93 | Human accepts design while future runtime cases have not executed | Specification/test-plan acceptance is truthful; actual source QA, live-cutover readiness, operational proof and retained human activation still enforced at their own boundaries |
| V94 | A role uses the concise operating guide or the major manual is promoted | Stable clause anchors resolve to one detailed authority; historical/source transcripts and programme-only instructions cannot become standing policy; no second independently maintained manual |

### 10.2 Levels of Proof

Separate document/schema conformance, unit tests, actual gate/adapter integration, runtime fault injection, supported real-agent invocation, consumer parity and human acceptance. Fixtures or a successful outer workflow do not prove live generic dispatch, independent assurance or machine-breaker enforcement.

Demonstrate the old failing behavior against actual relevant source before claiming a fix. Execute the corrected path and negative controls; retain raw results and their source identities. Run affected checks after substantive changes, not an unchanged full-review cycle after every observation.

**Acceptance is scoped to the claimed outcome.** DESIGN_ACCEPTED requires a reviewed specification/test plan, explicit unresolved implementation items, coherent role/transition/authority definitions and the actual human decision; it does not claim 94 executed system tests or require them before implementing their specification. Source-release acceptance needs applicable source/admin/assurance evidence and accepted rollout authority, not future consumer acknowledgements. That source may be an isolated immutable candidate: making a shared/default change or deletion additionally requires actual LIVE_SOURCE_CUTOVER_READY and permitted effect evidence. Consumer adoption needs that target's actual update/checks/parity. Aggregate rollout acceptance needs the named cohort outcomes and every inventory disposition. Runtime activation additionally needs actual generic runtime/recovery/issuer/accounting proof and its separate human decision. No outcome may claim the later outcome's completion; unknown dependent accounting or missing independent assurance is never converted to PASS.

### 10.3 Requirement-to-Validation Coverage

| Requirement | Acceptance cases |
|---|---|
| ADM-01 | V22, V35, V36, V47, V48 |
| ADM-02 | V01, V02, V03, V04, V05, V26, V48, V52, V59, V60, V83, V85, V92, V93 |
| ADM-03 | V01, V02, V04, V11, V13, V59, V60, V83, V93 |
| ADM-04 | V05, V06, V31, V32, V36, V48, V62, V63 |
| ADM-05 | V10, V14, V15, V28, V33, V59, V60, V61, V86, V87, V88, V89 |
| ADM-06 | V07, V11, V12, V13, V34, V58, V60 |
| ADM-07 | V06, V08, V09, V27, V34, V49, V57, V58, V59, V60, V61 |
| ADM-08 | V17, V18, V19, V20, V21, V43, V44, V50, V51, V59, V60, V61, V64, V65, V66, V84, V88, V91, V92 |
| ADM-09 | V22, V23, V24, V84, V90, V91 |
| ADM-10 | V12, V26, V27, V42, V62, V63, V69, V78, V79 |
| ADM-11 | V04, V25, V26, V33 |
| ADM-12 | V29, V30, V32, V51, V53, V56 |
| ADM-13 | V16, V20, V21, V37, V38, V39, V43, V44, V52, V83, V84, V85 |
| ADM-14 | V11, V36, V39, V45, V47, V50 |
| ADM-15 | V10, V12, V28, V40, V42, V58, V59, V60, V61, V62, V63, V86, V88, V89, V90 |
| ADM-16 | V19, V22, V41 |
| ADM-17 | V10, V28, V46, V47, V48, V56, V86, V87, V88, V89, V91 |
| ADM-18 | V14, V17, V44, V50, V54, V55, V77, V92, V93, V94 |
| ADM-19 | V01, V04, V06, V08, V09, V27, V62, V63, V67, V68, V69, V75 |
| ADM-20 | V17, V20, V21, V28, V33, V40, V51, V64, V65, V66, V70, V72, V74, V76, V80, V81, V82, V89, V90, V91, V92 |
| ADM-21 | V10, V12, V17, V54, V59, V60, V71, V72, V73, V74, V75, V77, V89, V90, V92 |
| ADM-22 | V26, V37, V38, V39, V42, V52, V78, V79, V82, V83, V84, V85, V94 |

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
9. Complete section 6.4's exhaustive retirement map and section 5.15's all-role observation coverage. The current source evaluation covers the named 32 files, not every repository, hosted setting or runtime path.

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

### 10.7 Disposition of the Full Review (0.4.0)

The correcting author's entries mean **ADDRESSED_IN_DESIGN**, not independent closure, actual source adoption or executed runtime acceptance. The full review and exact 0.4.0 bytes remain preserved; no finding is retroactively rewritten.

| Finding / refinement | Revision 0.5.0 correction | Specified coverage / later boundary |
|---|---|---|
| FR01 | ADMIN-COMPATIBILITY separates immutable candidate acceptance from shared live readiness/effect; whole-bundle legacy pin/migration/fence and in-flight/rollback protection; 6.4/7.4/WP3–WP4 aligned | V83–V85; real reader/load/cutover tests in WP2–WP6 before a destructive live change |
| FR02 | ADMIN-FACTORY selects Foreman ceremonial coordination with CodexAdvisor implementation; names every caller/owner/scope/receipt/rejection route and the explicit direct-invocation clause amendment | V86–V88; actual canon/contract/checklist/permission alignment before using this selected route |
| FR03 | ADMIN-DISPOSITION names independent receivers/resolvers/closers by role, trusted-control/human fallbacks, contested/detector-error handling and conserved classification/cost history | V89–V91; actual issuer/appointment/schema and recovery proof before operating it |
| FR04 | Injection diagram and text make delivery/ack tracking parallel to authorized correction; resubmission/close still require their actual applicable receipts | V92 plus V59/V60; actual closure/resubmission predicates aligned, no invented old-instance reply |
| Acceptance refinement | Sections 1.1, 8.1 and 10.2 distinguish design/specification acceptance, source QA acceptance and runtime acceptance | V93; no additional generic approval or future-runtime-before-design prerequisite |
| Operating-core refinement | Section 2.4 supplies a concise derived guide, stable clause anchors and role entry points; explicit operative versus historical/programme evidence promotion map | V94; WP2 completes every clause/subclause mapping before canonical promotion |

### 10.8 Disposition of the Review (0.5.0)

These entries mean **ADDRESSED_IN_DESIGN** by the correcting author, not independent closure, accepted policy, live appointments or executed runtime evidence. Preserve the 0.5.0 review and its exact snapshot; its two P2 findings remain truthful review history.

| Finding / clarification | Revision 0.6.0 correction | Specified coverage / implementation boundary |
|---|---|---|
| R5-01 | Section 5.8.1 distinguishes a package from its complete set of findings; each item retains identity, owner, corrective evidence and re-entry, with all-items submission readiness distinct from IAA's actual reassessment | V60 refined for two findings/partial versus complete correction; V88 retains factory ownership; no document per finding or future-verdict prerequisite |
| R5-02 | Section 5.15.4 and its Foreman row pre-bind a limited ordinary resolver: existing non-author ECAP for an ECAP profile, or a pre-approved independent mechanical verifier for explicitly listed lighter-profile predicates. Material judgment/authority and unavailable/implicated resolver cases retain proper independent/human routes | V89/V91 refined for ordinary versus material concerns and genuine fallback; WP2 identifies exact permitted instances/predicates/clauses before operation |
| Walkthrough clarification | Walkthrough D explicitly permits authorized repair during delivery/acknowledgement tracking and retains the actual applicable receipt before resubmission/close | V92 and the refined V60; numbering supplies no administrative prerequisite to permitted repair |

### 10.9 Actual Document Verification for Revision 0.6.0

Author checks cover strict duplicate-key-rejecting front matter, REVIEW/non-normative/inactive runtime and rollout flags, 11 main proposal sections, 22 requirements, 94 uniquely specified cases with complete requirement coverage, preserved earlier dispositions, both R5 findings and their walkthrough clarification, stable guide links, factory/disposition matrices, role/profile/walkthrough coverage, resolved local references, UTF-8/fence/table consistency and the original ten evidence rows. Only V60/V89/V91 are refined; the other 91 case rows remain unchanged. All five earlier design snapshots and four review reports retain their exact recorded hashes. Tracked/staged governing source and ISMS source remain unchanged. The recurring desktop monitor is PAUSED.

These are **document consistency and preservation checks**, not 94 executed runtime cases, fresh independent review, project IAA or human design acceptance. The prior 0.4.0 source evaluation remains historical five-helper-test/five-mocked-counterexample evidence at its exact source; it was not re-run or relabelled as proof of these design corrections. Exact interface/contract/reader/issuer/schema changes and real negative/positive runtime demonstrations remain at their declared work-package boundaries.

The known original local Git pack read fault remains unmodified. Verification uses the preserved read-only snapshot of readable original objects with the actual original index/working tree and unchanged HEAD; it does not claim to repair all historical objects. No original object/index/ref reset, source switch, external comment, agent dispatch, live gate/contract edit, active-policy deletion, publication, merge or activation occurs here. The actual delivery is the corrected non-normative design plus a byte-preserved 0.5.0 snapshot for the next agreed human review.

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

- [Merge-gate philosophy](../canon/MERGE_GATE_PHILOSOPHY.md), especially confirmatory validation, keyword fast path, local parity mandate and Phase 4 completeness; [standard merge interface](../canon/MERGE_GATE_INTERFACE_STANDARD.md), §§2–8.
- [Governance Watchdog canon](../canon/GOVERNANCE_WATCHDOG_CANON.md), §§1, 3–6; [Watchdog authority](../canon/WATCHDOG_AUTHORITY_AND_SCOPE.md), §3 and scoped hard-stop rules.
- Governance actual workflows: [merge interface](../../.github/workflows/merge-gate-interface.yml), [ceremony gate](../../.github/workflows/governance-ceremony-gate.yml), [per-PR scope](../../.github/workflows/governance-scope-to-diff-gate.yml).
- ISMS source at the local baseline in 3.3 (sibling-clone links): [merge interface](../../../maturion-isms/.github/workflows/merge-gate-interface.yml), [check manifest](../../../maturion-isms/.agent-admin/control/merge-gate-required-checks.json), [check alignment function](../../../maturion-isms/.github/scripts/merge-gate-required-checks-alignment.js).
- ISMS injection sources: [bootstrap](../../../maturion-isms/.github/workflows/agent-bootstrap-inject.yml), [pre-brief workflow](../../../maturion-isms/.github/workflows/iaa-prebrief-inject.yml), [buildInjectionDecision](../../../maturion-isms/.github/scripts/iaa-prebrief-inject.js), [pre-brief reminder](../../../maturion-isms/.github/workflows/iaa-prebrief-gate.yml), [re-anchor](../../../maturion-isms/.github/workflows/foreman-reanchor.yml), [watchdog](../../../maturion-isms/.github/workflows/governance-watchdog.yml), [audit report](../../../maturion-isms/.github/workflows/injection-audit-report.yml).
- ISMS handover sources: [checkpoint workflow](../../../maturion-isms/.github/workflows/pre-handover-checkpoint.yml), [evaluateCheckpoint](../../../maturion-isms/.github/scripts/pre-handover-checkpoint.js), [producer guidance](../../../maturion-isms/.github/workflows/producer-next-action-guidance.yml), [renderGuidanceComment](../../../maturion-isms/.github/scripts/producer-next-action-guidance.js), [claim gate](../../../maturion-isms/.github/workflows/handover-claim-gate.yml), [remediation workflow](../../../maturion-isms/.github/workflows/post-handover-auto-remediation.yml), [classifyPostHandover / resolveRemediationCycle](../../../maturion-isms/.github/scripts/post-handover-auto-remediation.js), [final-PASS helper](../../../maturion-isms/.github/scripts/final-pass-cs2-review.js).
- ISMS boundaries/recovery: [lane workflow](../../../maturion-isms/.github/workflows/foreman-prehandover-lane-gate.yml), [validateControl / emitCs2Trigger](../../../maturion-isms/.github/scripts/foreman-prehandover-lane-gate.js), [POLC boundary](../../../maturion-isms/.github/workflows/polc-boundary-gate.yml), [push intercept](../../../maturion-isms/.github/workflows/copilot-push-intercept.yml), [retry watchdog](../../../maturion-isms/.github/workflows/copilot-retry-watchdog.yml), [loop watchdog](../../../maturion-isms/.github/workflows/copilot-loop-watchdog.yml).

- [Full author review of revision 0.4.0](../reports/ADMINISTRATION_SYSTEM_DESIGN_FULL_REVIEW_0.4.0_2026-10-15.md) and [reviewed 0.4.0 snapshot](../reports/historical/ADMINISTRATION_SYSTEM_DESIGN_0.4.0_2026-10-15.md); FR01–FR04 and the two refinements were the inputs to revision 0.5.0.
- Legacy mutable-source evidence: ISMS [API builder canonical main reference](../../../maturion-isms/.github/agents/api-builder.md), line 196, and [liaison canonical inventory fetch](../../../maturion-isms/.github/agents/governance-liaison-isms-agent.md), line 471. These require actual compatibility preparation before destructive live cutover.
- [Author review of revision 0.5.0](../reports/ADMINISTRATION_SYSTEM_DESIGN_REVIEW_0.5.0_2026-10-15.md) and [reviewed 0.5.0 snapshot](../reports/historical/ADMINISTRATION_SYSTEM_DESIGN_0.5.0_2026-10-15.md); R5-01/R5-02 and the walkthrough clarification are the inputs to revision 0.6.0.

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
| 0.4.0 | 2026-10-15 | Johan requested actual gate/injection evaluation, philosophy, prompt intervention/CS2 reporting and single admin authority with complete conflict retirement; 32 sources inspected, five existing helper tests and five mocked counterexamples evaluated | REVIEW; bounded local source/document evidence only; future source promotion/removal, workflow fixes and rollout explicitly specified, not performed |
| 0.4.0 full review | 2026-10-15 | Author reviewed all 11 sections and identified FR01–FR04 plus acceptance/operating-core refinements | Coherent basis for scoped conformance audit, with targeted corrections before canonical adoption; no independent IAA or live change |
| 0.5.0 | 2026-10-15 | Johan instructed targeted corrections; selected factory route, safe shared-source cutover, independent intervention disposition, parallel acknowledgement/repair and concise acceptance/operating guide | REVIEW; author document checks only; no source alignment, retirement, consumer adoption or runtime activation performed |
| 0.5.0 review | 2026-10-15 | Author reviewed all 11 sections; earlier corrections addressed in design, with R5-01/R5-02 and a walkthrough clarification remaining | Two P2 ambiguities, no new P0/P1 identified in that pass; report/hash and snapshot preserved, not independent IAA |
| 0.6.0 | 2026-10-15 | Johan instructed correction of the proposed findings; complete rejection-item tracking, standing independent routine Foreman resolver and explicit parallel repair; three existing acceptance cases refined | REVIEW; author document checks only; no live resolver appointment, governing-source change, consumer rollout or activation |

This proposal is not entered into CANON_INVENTORY as accepted canon. This handover supplies the requested corrected design, revision 0.6.0, for the agreed next review. Acceptance and later adoption require an identified revision and actual evidence; neither the correction instruction nor this document's existence supplies them. The trial's recurring 30-minute follow-up remains paused.

