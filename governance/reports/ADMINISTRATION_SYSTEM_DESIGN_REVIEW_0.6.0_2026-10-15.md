# Critical review of administration-system design 0.6.0

**Date:** 2026-10-15  
**Reviewed artifact:** [Administration System Design and Controlled Migration](../proposals/PROPOSAL_2026-10-15_ADMINISTRATION_SYSTEM_DESIGN.md), revision 0.6.0  
**Reviewed raw SHA-256:** `a60d15d62b6f328c4704fdc5bdf5b432d15fa32ef01633c03d4e5ce42ba4e5ab`  
**Extent:** all 11 sections assessed for consistency and lifecycle dependencies; 1,287 lines, approximately 28,320 words; 22 requirements and 94 specified acceptance cases. Line references below identify this unchanged revision.  
**Local source baselines:** governance `main` / `68f3f0525060ec7115414af16b0931e54fae1344`; ISMS `main` / `d725c685c732f0fc2252230be3bffbc8252a8881`.  
**Reviewer:** Codex, the design author. No separate reviewer or appointed project IAA was invoked.  
**Assessment:** no additional actionable design findings raised in this pass. Recommend revision 0.6.0 for Johan's design-acceptance decision and as the baseline for the scoped WP2 conformance audit. This is not operational acceptance or a claim of perfection.

The proposal remains REVIEW/non-normative and byte-identical to the reviewed hash. This report does not accept it on Johan's behalf, install policy, assign a project agent, issue assurance, permit document deletion or resume monitoring. The 30-minute desktop follow-up remains paused.

## 1. Conclusion

The two latest findings are addressed in the specification without weakening the earlier controls. Rejection packages now preserve every required item, distinguish partial repair from complete submission readiness, and leave the assurance decision with IAA. Routine Foreman administration has a pre-bound independent resolution route, with limits that prevent it from absorbing substantive QP, authority or assurance decisions. The rejection walkthrough expressly permits repair alongside delivery/acknowledgement tracking.

The wider design remains coherent: roles and applicability are distinct; early preparation does not depend on final proof; source and evidence identities prevent recursive publication; unchanged observations do not commission another review; and human authority, provider boundaries, accounting and integrated acceptance remain explicit.

No further design edit is justified solely by this review. The next useful evidence comes from WP2: tracing actual clauses, contracts, schemas, gates, loaders and runtime capabilities to the accepted design. That audit may reveal concrete additional conflicts or implementation decisions. Record those against their actual source and affected requirement rather than treating this review as a guarantee that none can exist.

## 2. Latest corrections checked

| Item | Current clauses / cases | Review assessment |
|---|---|---|
| R5-01 — complete rejection findings | 5.8.1 lines 569–571; walkthrough D lines 703–706; refined V60 | Each package retains all required items and their identity, owner, needed change, evidence and re-entry. A single grouped record suffices; no artifact per item. Manager checks corrected submission readiness, while IAA retains its genuine reassessment. No future verdict is required to submit its inputs |
| R5-02 — routine Foreman resolver | Foreman row line 822 and standing route lines 833–837; refined V89/V91 | ECAP profiles use the properly appointed ECAP only when non-implicated and not the author of the implicated fact. Lighter profiles use only listed pre-approved independent mechanical predicates. Actual authority/instance is required; the subject cannot choose itself. Material or unsupported cases retain proper independent/human escalation |
| Parallel repair clarification | Walkthrough D line 700 and step 5; 5.15.2; V92 | Step numbering no longer suggests that permitted repair must wait for acknowledgement. Actual required acknowledgement still precedes dependent resubmission/session close; an acknowledgement is not a corrected source or a verdict |
| Earlier FR01–FR04 and acceptance/usability refinements | 5.5, 5.6.1, 5.12, 5.14–5.15, 6.4, 8.1 and 10.2 | Latest changes do not reopen factory-caller ambiguity, destructive cutover before compatibility, self-closure, frozen-evidence rewrites or future-runtime-tests-before-design-acceptance |

This is an author assessment of the specification. The earlier reports remain truthful historical findings against their identified versions; they have not been rewritten as independent closure records.

## 3. Adverse-route reasoning

These are specification walkthroughs, not newly executed tests or assurance outcomes.

| Situation | Result required by the current design |
|---|---|
| IAA rejects items A and B; only A has a genuine fix | Both items remain tracked; B prevents premature resubmission. Unaffected scoped source checks are preserved and another unchanged assurance cycle is not commissioned |
| All required items have corrective evidence, but no new IAA PASS exists yet | Manager may verify the corrected submission and invoke the required reassessment once eligible. Requiring that future PASS before submission would contradict the explicit rule; integration still requires the actual verdict and current binding |
| Acknowledgement is delayed while a permitted repair owner is ready | Repair/containment may proceed. Delivery/acknowledgement remains honestly pending and its dependent close/resubmission cannot be falsely declared complete |
| Ordinary Foreman metadata error occurs before the eventual ECAP return | Bind the approved resolver capability without requiring its future output at intake. The original owner may prepare the authorized correction; actual eligible resolver/receipt is required before the dependent closure. Concrete gate implementation must preserve the declared acyclic stage dependencies |
| ECAP authored the implicated fact, is unavailable, or the concern needs substantive judgment | ECAP cannot use the ordinary route to close it. Retain one owned fallback through the proper actual reviewer/human route; no self-closure, authority expansion or repeated unavailable appointment |
| A lower-ceremony job has no ECAP | Only its explicitly approved independent mechanical administrative predicates may use that route. No full ECAP or IAA ceremony is created merely to classify or correct harmless metadata; stronger job/semantic obligations still apply |
| A supposed administrative fix changes gate acceptance, authority, verdict or required QA | It is outside the ordinary resolver's scope and takes the protected-control/actual independent route. A small diff cannot grant a classification exemption |
| A new administrative receipt arrives after evidence freeze | Existing S0/A/I1 rules still govern publication. Use the permitted event route/exact allowance or the authorized amendment/revision mechanism; do not rewrite frozen proof or silently exempt metadata |
| A consumer or running invocation still relies on old governance main | Isolated source-candidate acceptance may proceed; destructive shared cutover needs the actual pin, coherent migration or fence. Consumer adoption, rollout and activation remain separate claims |
| An injector is silent or its detector/dispatcher is unavailable | Silence is not a clean result. Show actual coverage/limitations, contain only dependent prohibited actions, and use the supported fallback without inventing a machine-breaker success |

No new prerequisite cycle or self-acceptance permission was identified in these specified routes. Actual implementations must still demonstrate them under their concrete interfaces and failure modes.

## 4. Whole-document assessment and remaining implementation work

| Sections / area | Assessment and boundary |
|---|---|
| 1–2 — authority, scope, outcome and guide | Direct local design work, review handovers and separate acceptance levels are clear. The guide is derived from one detailed authority, not another manual or mandatory packet |
| 3–4 — evidence, baselines, old PRs and inventory | Actual observations, bounded mocks, latent contradictions and unknown access remain distinguished. Historical PR findings are not current operational certification; missing consumers remain explicit |
| 5.1–5.4 — requirements, lifecycle, profiles and human instructions | Accepted risk/semantic/job controls combine without actor-selected waivers. Planning/RED preparation is separated from dependent implementation. Scoped authenticated migration instructions can address a legacy rule blocking its own correction |
| 5.5 — evidence and closing | Frozen submission, finite genuine additions, current binding, conditional rejection/PASS records, delayed close and owned learning promotion fit together. They still need compatible source/schema implementations |
| 5.6–5.8 — all roles, factory route, CS2 view and continuation | CodexAdvisor implements within its factory remit; Foreman manages QP/ECAP/IAA; builders, ECAP, IAA, publisher and controller retain distinct duties. Active CS2 keeps the parent through integrated acceptance without becoming human CS2. Latest findings tracking and resolver changes are consistent with this division |
| 5.8.2–5.11 — effects, accounting, adapters and trust | CAS, intent/outcome reconciliation, dispatcher admission and independent supervision remain explicit. UNKNOWN is not zero. Manual local preparation is distinct from automated capability, provider-issued evidence and authenticated human permission |
| 5.12–5.13 — compatibility and four walkthroughs | Source acceptance does not require future consumer adoption. Shared live change and reverse rollback protect affected readers/in-flight work. The updated rejection walkthrough preserves both repair progress and proper resubmission conditions |
| 5.14 — merge philosophy and functions | Producers supply actual checks; gates confirm semantic, source-bound evidence and enforce the relevant transition. Stable aggregate contexts cannot discard required children or manufacture issuer/branch-setting support |
| 5.15 — injection and intervention | All-role observation, preventive versus asynchronous limits, coverage health, exact delivery, contested findings and independent disposition are specified. Reports inform the same CS2 handover; they do not become an IAA token or new authority |
| 6–7 — single authority, retirement and migration | Preserve valid controls, map every clause/reference, coordinate affected source/role updates and verify compatibility before removing superseded active documents. No deletion or rollout follows merely from this review |
| 8–9 — decisions and work packages | Human design acceptance, scoped corrections, independent outcomes, publication, consumer adoption and activation remain separate. WP2 is a concrete audit/specification handover; WP3/WP4 source alignment and WP5/runtime proof cannot be claimed complete from the design |
| 10–11 — cases, proof levels, references and history | All 94 cases remain specified, with three refined in 0.6.0. Traceability is complete but not execution evidence. Prior reviews/snapshots and actual source findings remain preserved |

The outstanding implementation work is already declared: the complete repository/reader and clause disposition inventory; exact role/predicate/schema/invocation amendments; real producer/publisher/issuer/authority interfaces; stage-aware aggregation and provider settings; operation-specific capabilities; and actual runtime, recovery, monitoring and consumer-parity demonstrations. These are not newly discovered design defects or grounds to require production runtime proof before accepting its specification.

## 5. Verification, limits and handover

- Used the [preserved, hash-verified 0.5.0](historical/ADMINISTRATION_SYSTEM_DESIGN_0.5.0_2026-10-15.md) and its [full author review](ADMINISTRATION_SYSTEM_DESIGN_REVIEW_0.5.0_2026-10-15.md) as the baseline; inspected the complete 0.5.0-to-0.6.0 change and rechecked dependencies across all 11 sections. The changes are limited to the authorized corrections, their case refinements and version/evidence handover material.
- Re-ran the author document/preservation validation against unchanged 0.6.0: strict front matter; 11 main sections; 22 requirements; 94 unique specified cases with complete mapping; 12 guide anchors; 59 distinct resolved local references; 11 roles; four profiles/walkthroughs; nine factory transitions; ten intervention subject categories. V60/V89/V91 are the only refined case rows; the other 91 remain unchanged.
- All five earlier snapshots and four earlier review reports retain their exact recorded hashes. The 32-file inspected source inventory matches its recorded bytes. Governance and ISMS governing source/heads remain unchanged; no fresh GitHub state, live workflow health or settings were queried or certified.
- No source fixtures were re-run. The five helper tests/five mocked counterexamples remain historical 0.4.0 evidence, not proof of target behavior. None of the 94 runtime/adapter acceptance cases is made executed by this prose review.
- The original local Git pack read fault remains unmodified. Preservation checks use the established readable-object snapshot with the original index/worktree and unchanged head, without claiming full historical Git-object health.
- This report is the only added repository artifact. There is no proposal amendment, role dispatch, project review/token, live gate/contract/injection change, active-policy deletion, commit/push, external message, merge, layer-down, counter reset or activation. The desktop monitor remains PAUSED.

Recommendation: retain 0.6.0 unchanged for the actual human design decision and move to the scoped WP2 conformance audit only when authorized. Do not manufacture another correction or repeat an unchanged review merely to continue the cycle. Newly evidenced source conflicts should produce the smallest inspectable proposed correction at the agreed handover. Independent project assurance and operational acceptance remain at their proper later boundaries.
