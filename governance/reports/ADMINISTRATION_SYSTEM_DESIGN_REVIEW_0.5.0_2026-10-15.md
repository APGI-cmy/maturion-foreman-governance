# Critical review of administration-system design 0.5.0

**Date:** 2026-10-15  
**Reviewed artifact:** [Administration System Design and Controlled Migration](../proposals/PROPOSAL_2026-10-15_ADMINISTRATION_SYSTEM_DESIGN.md), revision 0.5.0  
**Reviewed raw SHA-256:** `d597e850c885cf7011b410c0e780a7b5ff532876797b54464e1b27e711854419`  
**Reviewed extent:** all 11 sections, 1,262 lines, approximately 27,211 words; 22 requirements and 94 specified acceptance cases. Line references identify this unchanged revision.  
**Source baselines:** governance `main` / `68f3f0525060ec7115414af16b0931e54fae1344`; ISMS `main` / `d725c685c732f0fc2252230be3bffbc8252a8881`.  
**Reviewer:** Codex, the design author, carrying out Johan's requested further review. No separate reviewer or appointed project IAA was invoked.  
**Overall assessment:** retain the architecture and proceed toward the scoped conformance audit after the actual human design decision. No new P0/P1 design finding was identified in this pass. Two P2 ambiguities should be clarified before canonical promotion; neither calls for a new architecture, blanket waiver or repeated review of unchanged project work.

This is author review evidence, not independent assurance, an IAA verdict/token, design acceptance or authority to activate the target rules. The proposal, prior reviews and preserved snapshots remain unchanged. This review adds only this report; the 30-minute desktop follow-up remains paused.

## 1. Main assessment

The design now gives the main roles coherent responsibilities and a traceable route through planning, relevant QA-to-RED, prospective assurance, implementation, source QP, ECAP administration, checkpoint, final independent assurance, integration and integrated acceptance. The profile/semantic-risk union prevents both irrelevant product ceremonies for routine records and disguising a protected gate change as harmless administration.

The key loop-prevention controls are present: earlier stages do not require future outputs; actual source evidence and later assurance additions have distinct inventories; rejection publication does not wait for a later acknowledgement; authorized correction can proceed while acknowledgement is tracked; valid scoped evidence can be reused; and unchanged findings retain one owner and wake-up condition rather than spawning another job or review. Missing accounting and provider capability stay explicit.

The new factory route selects a real division of work instead of implying two invokers. CodexAdvisor owns permitted implementation; Foreman coordinates the source-QP/ECAP/IAA transitions. The design expressly names the current CodexAdvisor direct-invocation duty that must be amended. Protected own-contract and IAA-contract authorship remain separate.

The gate and injection sections remain appropriately bounded. Gates verify authentic, applicable, source-bound evidence and preserve all required child controls behind the stable interface. Injection observers report at the first supported observable boundary; they cannot promise to undo an already admitted effect or turn a comment into a custom-agent appointment. Detection health, actual delivery, acknowledgement, repair and independent acceptance remain different facts in the same CS2 view.

The remaining concerns are narrower wording/ownership edges, described below. They do not invalidate the earlier corrections or prove that the proposed runtime already works.

## 2. Earlier full-review corrections checked

| Earlier finding | Current evidence in 0.5.0 | Assessment in this author review |
|---|---|---|
| FR01 — legacy consumers and destructive source cutover | 5.12 lines 635–663 separates isolated candidate acceptance, live readiness/effect, consumer adoption and rollout; whole-bundle pin/migration/fence, in-flight identity and reverse rollback protection. 6.4 and 7.4 use that boundary | Addressed in the specification. An unlocated consumer cannot be counted adopted or silently exposed to a destructive shared update; a safe isolated candidate need not wait for future adoption |
| FR02 — factory callers and rejection continuation | 5.6.1 lines 481–497 names nine transitions, actual callers/owners/receipts and re-entry; 5.6/5.8.1/walkthrough B agree | Addressed in the specification. Implement the named canon/contract/checklist/permission alignment before operating this selected route; current authority is not silently changed |
| FR03 — implicated managers/assurers and contested detection | 5.15.4 lines 810–833 names ten subject categories, independent disposition, genuine replacement identity, false-positive reconciliation and human/trusted-control fallback | Addressed in the specification. R5-02 below narrows a residual ordinary-case routing ambiguity; it does not reopen the prohibition on self-closure or trust disputes |
| FR04 — acknowledgement before repair | 5.15.2 lines 763–775 makes tracking and permitted repair parallel; 5.5.1 line 419 separately retains the applicable resubmission/close condition | Addressed as an explicit rule. The numbered rejection walkthrough should refer to this parallel rule so readers do not infer a stricter sequence from step order |
| Acceptance labels | 1.1, 8.1 and 10.2 distinguish design/test-plan acceptance, source acceptance, actual operation and human integration/activation | Addressed. Future runtime demonstrations are not a prerequisite to accepting their specification or commissioning a separately authorized audit |
| Usable operating core | 2.4 has a seven-step derived guide, 12 stable anchors and role entry points; promotion separates the operative core from programme/history evidence | Addressed as the document structure. WP2 still needs the complete stable clause/subclause map; a short guide does not itself complete that migration |

“Addressed” here means the requested design behavior is explicitly specified. It is not independent closure, installed source conformance or an executed acceptance result.

## 3. Remaining targeted findings

### R5-01 — P2: Preserve every finding within one rejection package

**Evidence:** section 5.8.1, line 567, says: “For each rejection record one failed obligation”. Sections 5.5.1 line 419 and walkthrough D lines 697/700 correctly require every prior required item to be disposed before resubmission. The actual [IAA canon](../canon/INDEPENDENT_ASSURANCE_AGENT_CANON.md), lines 76, 221 and 681–684, likewise addresses all cited gaps/failures.

**Risk:** a package contains findings A and B. An implementation treating line 567 as a cardinality rule stores one finding/blocker, repairs A and attempts resubmission with B absent from its current view. A stricter final check then rediscovers B, creating an avoidable repair/review cycle. Alternatively, ignoring the all-items rule would lose an obligation. The stronger clauses already forbid that outcome; the continuation instruction should not suggest a narrower record.

**Targeted correction:** distinguish the rejection package from its individual findings. Preserve one package with the complete set of required findings; each distinct finding has its own stable identity, owner, needed change and affected re-entry. A single grouped record/view may hold them, so this adds no document per finding. Repeated observations reference that set. Before resubmission reconcile every required item and identify which actual changed input disposes it, retaining unresolved items and valid scoped evidence.

**Acceptance refinement:** strengthen V60 or V88 with a two-finding rejection. Repairing one item must leave the other visible and prevent premature resubmission; completing the required set must permit the affected re-entry without duplicate appointments or re-running unrelated source checks. A new parent or a new broad test suite is unnecessary.

### R5-02 — P2: Pre-bind the independent resolver for routine Foreman administration

**Evidence:** section 5.15.4 line 810 allows routine verified metadata corrections through existing eligible owners/checkpoints without an additional reviewer appointment. Its Foreman row at line 816 instead directs visibility to human CS2 and says human CS2 selects the non-implicated managerial reviewer or actual independent IAA. Line 825 allows existing non-implicated role authority for ordinary checks, but does not explicitly connect a standing ordinary-case resolver to the Foreman row. Sections 2.1 and 5.8.1 otherwise avoid a new human intervention for each in-envelope repair.

**Risk:** Foreman omits an administrative pointer or receipt. Foreman can correct its own permitted record but cannot independently close its own finding. Without a selected ordinary resolver, an operator may request a human reviewer-selection decision for every such incident, or leave it blocked while asking existing roles which one owns closure. This is a remaining ambiguity rather than proof that every Foreman finding must currently take that expensive path; the general ordinary-case exception points in the right direction.

**Targeted correction:** bind a non-implicated routine resolver in the accepted policy/envelope once, with an exact supported route and limited scope. For strictly administrative facts this could be a properly appointed non-author ECAP or an accepted independent mechanical verifier, only within its actual authority. Do not make ECAP a substitute for Foreman's substantive QP. Source-quality, managerial judgment, authority, independence and verdict-integrity disputes use their actual distinct reviewer/human routes; required final IAA remains required. Human CS2 retains visibility and reserved decisions, and selects a fallback only when the pre-bound route is absent, unavailable, implicated or insufficient. The subject still cannot choose itself or supply its own independent closure.

This is a proposed routing clarification, not authorization for ECAP or a detector to acquire those powers now. WP2 must name the actual permitted resolver and affected clauses before it can operate.

**Acceptance refinement:** extend V89/V91 with two cases: (a) an ordinary Foreman metadata omission is repaired and independently verified through the already bound route without a fresh human selection; (b) a Foreman authority/quality concern still reaches the required independent/human route. If the selected ordinary resolver is also implicated, it cannot close the finding and the genuine fallback is used once.

## 4. Non-blocking editorial alignment

Walkthrough D lists acknowledgement in step 4 and repair in step 5 (lines 699–700). The explicit parallel-obligation rule at line 775 already governs and resolves FR04. When revising R5-01/R5-02, add a reference that permitted repair can begin while steps 3–4 are pending. This removes a misleading visual sequence; it is not a new P1 or evidence that the main rule is missing.

The proposal remains long because it contains the design, trial history, source evaluations and migration programme. Its derived guide is now useful. Follow the existing promotion boundary: map and preserve controls, promote the operating core and keep history outside current policy loading. Do not turn this into another independently maintained summary/manual or require every agent to repeat 27,211 words in its handover.

## 5. Whole-document coverage

| Area | Review outcome / actual remaining boundary |
|---|---|
| Sections 1–2: scope, decisions, guide and success criteria | Direct local design authority, truthful acceptance levels and one derived guide are coherent; no implied live rollout or timer resumption |
| Sections 3–4: findings, source evaluation, trial and inventory | Demonstrated defects, bounded mocks, latent contradictions, unknown access and historical candidate states remain distinguished; source inventory is not a claim of exhaustive repository/runtime coverage |
| Sections 5.1–5.4: requirements, lifecycle, profiles, gates and authority | All 22 requirements trace to the specified cases; semantic/base/job controls combine without an actor-selected exemption. Explicit migration replacement checks and trusted human receipts preserve authority |
| Section 5.5: immutable evidence, assurance additions and closure | S0/A/I1, conditional outputs, genuine issuer/replacement, deferred acknowledgement and learning capture versus policy promotion are coherent. Actual compatible schemas and owner/issuer interfaces remain WP2–WP4 work |
| Sections 5.6–5.8: roles, factory, single view, continuation and effects | All principal roles have duties and prohibitions; factory handoffs are selected; action uncertainty and external effects are not treated as a Git transaction. R5-01/R5-02 refine continuation and routine intervention resolution |
| Sections 5.9–5.11: accounting, adapters and security | UNKNOWN is conserved, provider limits remain real and local manual preparation is distinct from automated dispatch. No new budget, credential or named-agent identity is invented |
| Sections 5.12–5.13: compatibility and all four walkthroughs | Candidate acceptance, shared cutover, actual adoption and reverse rollback now protect dependent readers. Rejection walkthrough needs the small parallel-ordering reference above |
| Section 5.14: merge functions and philosophy | Confirmatory gates still validate actual semantics/currentness; three aggregate contexts cannot discard mandatory children. Actual aggregation, branch settings and issuer bindings must be demonstrated before replacing protection |
| Section 5.15: detection, injection, dispositions and CS2 evidence | Observer/enforcer/repair roles, asynchronous limitations, coverage health, exact delivery and false-positive handling are explicit. R5-02 avoids unnecessary human routing in the ordinary managerial case |
| Sections 6–7: consolidation, migration and rollback | Complete clause preservation before whole-file retirement, coordinated WP3/WP4 release, legacy compatibility and scoped human overrides address self-blocking migration. No source is removed by this review |
| Sections 8–9: decisions and seven work packages | Design, source, adoption, integration and activation remain separate; bounded handovers do not become standing permission for every future repair. WP2 is the next concrete conformance task after the human decision |
| Section 10: 94 cases, mapping, proof levels and open items | The test specification is broad and traceable; actual execution is explicitly absent. Strengthen existing multi-finding/ordinary-resolver cases rather than assume table coverage proves the new implementation |
| Section 11: references and lineage | Local references resolve; prior reviews/snapshots retain exact hashes. Full source retirement must pin historical evidence links and keep retired documents out of active policy loading |

## 6. Verification and limits

- Read the entire identified 0.5.0 proposal and checked the cross-section obligations, including the four prior full-review corrections, selected factory route, new disposition matrix and acceptance boundaries.
- Re-ran the existing author document/preservation validation against unchanged 0.5.0. It passed strict front matter, 11 main sections, 22 requirements, 94 unique specified cases/full mapping, 12 guide anchors, 57 distinct resolved local references, 11 roles, four profiles/walkthroughs, nine factory transitions and ten intervention subject categories. The earlier 82 case rows, ten historical evidence rows and seven prior review/snapshot hashes remain unchanged.
- Rechecked the 32-file source-hash inventory and unchanged governance/ISMS local source states. Re-read the actual IAA multi-failure/re-invocation requirements and ECAP boundaries relevant to the two findings. These are local-source checks, not refreshed GitHub state or proof of active hosted services.
- The five helper tests and five mocked counterexamples from 0.4.0 remain historical evidence only. They were not re-run or relabelled as target-runtime proof. The 94 acceptance cases have not been executed by this review.
- The original Git pack read fault remains unmodified. Source preservation checks use the previously preserved readable-object snapshot with the original index/worktree and unchanged head; no claim of full historical-object health is made.
- The only new repository artifact is this report. The reviewed proposal retains the SHA-256 above; prior artifacts and live policy/contract/gate/workflow files are preserved. No independent project review, role dispatch, token, deletion, commit/push, external message, merge, layer-down or activation occurred. The recurring desktop monitor is still PAUSED.

## 7. Handover

The earlier four full-review corrections are addressed in the design. Resolve R5-01/R5-02 with narrow wording/route updates before promoting it to canon; keep the architecture and existing acceptance plan. This review is sufficient to inform the human design checkpoint and scoped WP2 audit. It is not a request to start another unchanged-source review cycle, an operational-readiness verdict or acceptance on Johan's behalf.
