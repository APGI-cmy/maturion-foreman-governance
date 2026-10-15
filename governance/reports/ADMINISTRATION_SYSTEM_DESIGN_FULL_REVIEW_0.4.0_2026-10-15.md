# Full critical review of administration-system design 0.4.0

**Date:** 2026-10-15  
**Reviewed artifact:** [Administration System Design and Controlled Migration](../proposals/PROPOSAL_2026-10-15_ADMINISTRATION_SYSTEM_DESIGN.md), revision 0.4.0  
**Reviewed raw SHA-256:** `3d80904f680dd30b444c8ece3b47c57591ad6f8bc68aecde042f17615fbae2a3`  
**Reviewed extent:** all 11 sections, 1,128 lines, approximately 23,198 words; all 22 requirements and 82 specified acceptance cases. Line references below identify this unchanged revision.  
**Source baselines:** local governance `main` / `68f3f0525060ec7115414af16b0931e54fae1344`; local ISMS `main` / `d725c685c732f0fc2252230be3bffbc8252a8881`.  
**Reviewer:** Codex, the design author, conducting the requested full-document critical review. No separate independent reviewer or appointed project IAA was invoked.  
**Overall result:** a coherent basis for the bounded source-conformance audit, with four targeted corrections before canonical adoption: three P1 control/route gaps and one P2 ordering clarification. Retain the architecture and earlier improvements. Do not promote it or remove governing documents on the strength of this review.

This report is review evidence, not an amendment to the proposal or installed policy. It creates no QA token, independent verdict, human acceptance, appointment, new parent, budget or activation. The proposal and prior reports/snapshots are unchanged. The desktop 30-minute follow-up remains paused.

## 1. Main conclusion

The design now distinguishes source quality, administration, independent assurance, integration and job acceptance; it preserves a single parent and conserved accounting; and it assigns the principal agent roles. Its finite assurance additions, delayed rejection closure, source-before-adoption ordering, honest local route and explicit runtime limitations address much of the original administration-loop problem.

The new gate/injection material is useful and materially better than relying on workflow names. It correctly distinguishes source wiring from live service health, a comment from an agent appointment, acknowledgement from correction, and an audit report from an assurance token. It also correctly requires actual coverage rather than interpreting silence as success.

The remaining concern is the join between these sound sections: removing shared policy while old consumers still read it; handing a factory delivery into role-owned assurance; resolving an intervention against a managerial/assurance role; and allowing correction before administrative acknowledgement. Those joins need explicit contracts to prevent another round of serial owner or prerequisite discoveries.

“Ready to use as the basis for WP2” is not “ready for operational adoption.” Exact schemas, provider/app bindings, per-adapter capabilities, full clause retirement mapping, real monitoring coverage and runtime fault-injection remain the implementation prerequisites already declared by the design. Their absence is not a new reason to hold up a separately authorized conformance audit.

## 2. Findings requiring correction

### FR01 — P1: Consumer compatibility must precede destructive source cutover

**Proposal evidence:** section 5.12, lines 583–595; section 6.4, lines 785–794; section 7.4, lines 831–833. The source release removes superseded files and changes inventories, and the design then layers that release down. An unready/deferred consumer is expressly allowed not to block source acceptance. The migration text does not make protection of an old consumer's live policy reads a prerequisite to making those deletions operative.

**Current source evidence:** ISMS [api-builder.md, line 196](../../../maturion-isms/.github/agents/api-builder.md) declares canonical governance with `reference: main`. The integration, QA, schema and UI builder contracts contain the same main reference. ISMS [governance-liaison-isms-agent.md, line 471](../../../maturion-isms/.github/agents/governance-liaison-isms-agent.md) fetches the canonical inventory from governance `main`. These are actual mutable-source references, not an inference that every consumer uses one particular retrieval implementation. Consumer inventories also carry per-file canonical commits; that does not establish that every contract/bootstrap/current-inventory read is pinned.

**Counterexample:** governance adopts the new source release and deletes AGENT_HANDOVER_AUTOMATION or the old active-CS2/ECAP procedure. A consumer not yet migrated starts a valid old-contract invocation and reads governance `main`, or refreshes the new inventory while its contract still names an old file. The required input is absent or inconsistent. The source can appear accepted while an explicitly permitted unmigrated consumer has lost its usable policy. The same problem can affect an invocation already in progress. Coherent rollback after failure does not prevent this initial break.

**Required correction:** distinguish acceptance of an immutable source candidate from making destructive changes to a shared live/default reference. Before the latter, require compatibility readiness for every consumer, bootstrap reader, ripple updater and in-flight invocation that can consume that reference. Pin the legitimate legacy reader to a verified immutable legacy release, migrate it coherently, or fence its dependent operation with an explicit owner/disposition before the shared deletion becomes operative. A preparation change that safely pins old policy is not adoption of the new policy; it need not introduce a consumer-acknowledgement-before-source-acceptance loop.

Keep one current normative manual. Historical commit-pinned compatibility for an explicitly unmigrated consumer must not become an active fallback authority for newly migrated agents. A genuinely isolated immutable candidate may still be accepted before consumer adoption. Do not leave competing old files in the active tree to conceal an unhandled dependency, and do not claim complete conflict removal or all-consumer adoption while preparation is outstanding.

**Acceptance additions:**

- A legacy consumer follows `main` while its named canon is scheduled for removal: destructive live cutover is refused until that read is pinned, migrated or explicitly fenced.
- An invocation spans the cutover: it finishes or is reconciled under one declared policy identity; no silent mid-session policy replacement.
- A deferred consumer remains explicitly not adopted without breaking a separately safe source candidate or pilot.

This is a gap introduced by combining whole-file retirement with phased consumer adoption. It does not reopen the already corrected rule that source acceptance must not require future adoption evidence.

### FR02 — P1: The agent-factory assurance handoffs still lack a selected authority route

**Proposal evidence:** AGENT_CONTRACT profile at line 262; role table at lines 425–429; factory walkthrough at lines 612–616; continuation references to a factory manager at lines 501–507. They assign CodexAdvisor factory ownership and require genuine source QP, ECAP/checkpoint and final independent IAA, but do not select each ceremonial invoker, accepting manager and rejection-continuation owner for that route.

**Current source evidence:** [IAA canon, line 64](../canon/INDEPENDENT_ASSURANCE_AGENT_CANON.md) describes Foreman as the canonical Phase 4 invoker and retains Foreman ownership after rejection. [CodexAdvisor contract, lines 560–588](../../.github/agents/CodexAdvisor-agent.md) separately requires its own pre-IAA commit-state gate and final IAA invocation for contract changes. [ECAP protocol, lines 73–75 and 90–94](../canon/EXECUTION_CEREMONY_ADMINISTRATION_PROTOCOL.md) names Foreman as ECAP appointment/reporting authority and recipient of its return. These sources need explicit profile-specific reconciliation. This is not a claim that CodexAdvisor has encountered a new provider denial or that all existing factory invocations are invalid.

**Counterexample:** CodexAdvisor completes a contract bundle. The generic target requires ECAP and a managerial checkpoint, but the factory owner is told to use its factory route while ECAP expects a Foreman appointment. IAA invocation text then points to both the canonical Foreman model and CodexAdvisor's explicit contract duty. An operator may appoint another wrapper, invoke through an unsupported owner, or repeatedly return the task to the author without a valid transition.

**Required correction:** add one explicit factory handoff table covering prospective scope, class source-QP acceptance, ECAP appointment/return, submission checkpoint, final IAA invocation/re-invocation, publication and final evidence binding. For each, name the authorized caller, decision owner, allowed read/write/publication scope, receipt and failure/re-entry owner. Select and reconcile the intended factory exception or Foreman-mediated ceremonial path in canon and the relevant contracts together. Do not infer the choice from a generic role title or silently expand CodexAdvisor's authority.

CodexAdvisor remains the factory implementation owner. Foreman's involvement, if selected, is a bounded managerial/review function, not product implementation or a takeover of factory authorship. Rejection resumes the existing accountable route without a new parent, duplicate appointment or human permission for every ordinary repair. Preserve the separately protected own-contract/IAA-contract author rules.

**Acceptance additions:** a contract-only factory job and a mixed contract-plus-builder prerequisite both reach every required owner in order, including a rejection/repair/resubmission, without conflicting callers or an unavailable implicit administrator. The chosen route is checked against actual source authority before dispatch.

### FR03 — P1: Interventions need an independent disposition route when the manager or assurer is the subject

**Proposal evidence:** section 5.15 covers all roles at line 660, routes correction through the accountable manager at line 687, then uses a generic owner/manager acknowledgement-correction-closure sequence at lines 689–717. Section 5.6 distinguishes duties and prohibits self-certification of candidate authority changes. It does not specify intervention escalation/closure authority for a breach by Foreman, CodexAdvisor, ECAP, IAA, active CS2, the publisher, controller or authority-verification component itself.

**Counterexample:** a valid observation concerns Foreman's unauthorized implementation, an IAA issuer's misleading assurance, or active CS2 progressing an ineligible wave. Routing the report back to the normal manager/assurer does not identify the independent actor who may investigate it, revoke the affected capability, reject a self-serving closure or restore eligibility. The generic wording can leave the finding in its subject's own queue or block indefinitely on that subject's acknowledgement. No actual misconduct or self-cleared finding is established by this review; this is an unhandled target-system case.

The related false-positive case also needs explicit disposition: an authenticated detector can use a wrong scope or stale requirement. Authenticity alone does not establish that its conclusion is correct. The document warns against historical-file errors but has no named challenge/resolution path for a contested current observation.

**Required correction:** define the intervention routing/disposition matrix by subject role and failure category, including accountable escalation recipient, independent resolver, closure authority and supported containment/fallback. Builder matters normally go to Foreman; managerial/factory matters need the appropriate higher authority; IAA, active-CS2 and trusted-control failures must reach human CS2 or another explicitly appointed independent authority outside the implicated role's control. Preserve the existing independent supervisor and actual human kill/reset route; do not demand an endless chain of new watchdogs.

For contested or detector-error findings, preserve the original evidence, allow an acknowledgement that disputes the conclusion, and obtain an independent disposition such as confirmed breach, wrong subject, detector defect or not applicable under the accepted rule. Any such values require proper schema mapping. The subject cannot waive its own requirement. The resolver must not fabricate a repair or charge a governance breach merely because a faulty detector fired; actual runtime/spend and prior events remain conserved. A detector repair is owned, scoped and tested, not a hidden gate disable. A genuine unresolved safety/authority condition retains its dependent containment.

**Acceptance additions:**

- Foreman, IAA and active CS2 are each the subject of a real intervention: an independent receiver/resolver is selected, their own acknowledgement cannot close the finding, and human visibility survives their unavailability.
- A detector incorrectly attributes a historical proof to the current job: the correct independent disposition clears only the erroneous dependent block, preserves the raw observation and repairs the detector without rerunning unchanged implementation QA.
- A trusted controller/observer component is unavailable: use the fixed supervisor/human fallback and report the coverage limitation, without self-authorized re-enable or another successor job.

This completes the all-role monitoring promise. The current role matrix and issuer checks remain useful; they do not by themselves supply this intervention-resolution authority.

### FR04 — P2: Acknowledgement must not become a prerequisite to permitted repair

**Proposal evidence:** line 393 explicitly permits repair preparation while rejection acknowledgement is pending, while requiring acknowledgement before resubmission. The later generic injection sequence at lines 695–697 places actual acknowledgement before targeted correction. Sections 5.8.1 and 5.15 otherwise require prompt ordinary continuation.

**Counterexample:** a genuine defect and its authorized corrective owner are known, but the acknowledgement channel is delayed or the initiating instance has stopped. Implementing the later diagram as a strict prerequisite chain holds a permitted fix for an administrative receipt, recreating a small version of the loop the design intends to remove.

**Required correction:** make delivery/acknowledgement tracking and eligible correction parallel obligations after the finding is recorded and the prohibited dependent action is contained. Preserve actual acknowledgement before the specific resubmission or administrative closure which requires it. Do not infer acknowledgement from a commit, and do not wait for it to perform a separately authorized correction or necessary containment. Route an unavailable owner through the FR03 matrix.

**Acceptance addition:** delayed acknowledgement does not block an authorized targeted fix; it still prevents false session closure, invalid resubmission and final readiness until its applicable requirement is actually satisfied.

## 3. Adoption and usability refinements

These are narrower clarifications, not grounds for another architecture or for requiring production runtime proof before a conformance audit.

**Separate the acceptance labels everywhere.** Line 37 broadly says acceptance means enumerated requirements/adversarial cases pass; sections 5.8.2 and 10.2 correctly reserve actual runtime proof for automated operation. State explicitly that design acceptance approves a specification and test plan; source acceptance requires its actual source checks/review; operational acceptance requires executed runtime/monitoring cases. The broad introductory wording should not be implementable as “all 82 runtime cases must pass before design acceptance permits implementation.” Retain the existing separation of outcomes rather than add another approval tax.

**Keep the operative manual short to use.** The reviewed proposal is about 23,198 words and includes trial chronology, old heads, author-check transcripts, temporary migration instructions and future target rules. Section 6.4 already says only operative content is promoted. Before that promotion, identify the normative core, stable clause IDs, role entry points and one-page operating sequence inside the same artifact, with historical/design rationale clearly non-normative or linked as preserved evidence. ECAP and IAA should derive their role instructions and CS2's six-field view from those stable clauses. Do not require every job to re-transcribe the full design or add another independently maintained manual. ADM-01–22 are useful acceptance goals; detailed operational obligations still need stable clause mapping in WP2.

## 4. Whole-document coverage

| Area reviewed | Conclusion / remaining boundary |
|---|---|
| Sections 1–2: intent, scope, operating model and success criteria | Clear human-directed design phase and generic objective; clarify acceptance labels and canonical promotion shape |
| Sections 3–4: evidence, baselines, candidates and repository inventory | Good separation of demonstrated defect, inference, unknown capability and candidate authority; no unsupported all-repository completion claim |
| Section 5.1: all 22 requirements | Coherent set; FR01–FR04 supply missing cross-section behavior rather than replace the requirements |
| Sections 5.2–5.4: lifecycle, risk, applicability and human override | Early planning/RED versus implementation pre-brief is well separated; risk union/stronger job controls and real human receipts are preserved; factory routing needs FR02 |
| Section 5.5: immutable evidence, finite outputs, rejection/learning/closure | Substantial correction of the original publication loop; exact amendment/instance/receipt implementations remain proper WP2/WP3 work; FR04 aligns the later injection diagram |
| Sections 5.6–5.7: all 11 roles, Tier 1/2/3, publisher and CS2 view | Sound broad separation and one-record-per-fact principle; FR02/FR03 complete invocation and intervention edges |
| Sections 5.8–5.11: continuity, effects, supervision, accounting, adapters and security | Correctly handles uncertain in-flight effects, provider boundaries, UNKNOWN counters, manual limits and independent supervision; actual enforcement still requires the specified runtime proof |
| Sections 5.12–5.13: source/adoption/rollout ordering and all four walkthroughs | Source acceptance does not require future adoption; new destructive retirement needs FR01 compatibility preparation; factory walkthrough needs FR02 |
| Section 5.14: merge philosophy, functions, standard contexts and semantic receipts | Good rejection of keyword PASS and aggregation without dropped controls; real branch settings/app issuer bindings remain operational prerequisites, not author claims |
| Section 5.15: injection wiring, prompt detection, reports and CS2 evaluation | Good source-versus-live-health and acknowledgement-versus-resolution distinctions; FR03/FR04 address remaining disposition and ordering gaps |
| Sections 6–7: impact, total retirement, coordinated source release, bootstrap and rollback | Clause-level preservation before full deletion is correct; FR01 adds compatibility for mutable-source readers and in-flight work. Do not remove files merely to satisfy the new target |
| Sections 8–9: approvals, all seven work packages and expert readiness | Logical bounded handovers, coordinated WP3/WP4 cutover and later runtime proof; no implied activation, budget increase or blanket QA exception |
| Section 10: all 82 scenarios, coverage and proof levels | Useful broad test specification and honest separation from the prior five unit tests/five mocked observations; add the targeted cases above during correction, not pretend existing IDs proved them |
| Section 11: all references and revision history | Local reference targets resolve; historical/source links must be pinned/updated on eventual promotion as already required; not proof of current remote service or settings |

## 5. Review method, evidence and limits

- Read the entire identified proposal and traced its cross-section dependencies, owners, applicability, publication, continuation, cutover and acceptance claims.
- Re-read the relevant actual IAA canon, CodexAdvisor contract, ECAP protocol and consumer contract/inventory retrieval references for FR01/FR02. These are current local sources at the recorded heads. No remote settings, live PR state or provider access was re-polled.
- Re-ran the author document/preservation validator against unchanged revision 0.4.0: structure, flags, IDs/mapping, local references, recorded source hashes, prior artifacts and local source state passed. That remains a document check, not assurance of the target runtime.
- Existing source evaluation evidence remains five pre-brief-helper unit cases passed and E01–E05 mocked counterexamples reproduced. Those unchanged-source tests were not re-run for this prose review and no new runtime behavior is claimed. FR01–FR04 counterexamples are design/source reasoning, not executed integration tests.
- The known original Git-pack read problem remains unmodified. The preserved readable-object inspection route, original index/working tree and unchanged head establish tracked/staged preservation for this review; they do not establish health of every historical Git object.
- The design's own open WP2/runtime items were treated as declared future work. They were not relabelled as newly discovered live failures. This review does not issue a project IAA token or independently close R01–R07, N01–N03 or G01–G08.

## 6. Recommended next bounded step

Make one focused correction of FR01–FR04 and the two wording/usability refinements, preserving this reviewed version and its existing evidence. Then use that identified design for the scoped WP2 clause/contract/gate/loader/consumer conformance map under Johan's agreed next-work-package instruction. Produce the concrete file/authority/test/retirement plan from actual sources before changing governing policy.

Do not start another broad architecture, re-run the old PR review chain, create a new parent, reopen unchanged appointments, or require production coordination infrastructure before authorized manual preparation. Live promotion/removal, consumer rollout, independent assurance and activation still need their actual accepted scope and evidence. This report grants none of those outcomes.

The reviewed 0.4.0 proposal remains byte-identical, non-normative and in REVIEW. Only this companion full-review report is added by the current review turn. The recurring follow-up remains PAUSED.
