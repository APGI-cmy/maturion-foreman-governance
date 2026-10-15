# Critical review of administration-system design 0.2.0

**Date:** 2026-10-15  
**Reviewed artifact:** [Administration System Design and Controlled Migration](../proposals/PROPOSAL_2026-10-15_ADMINISTRATION_SYSTEM_DESIGN.md), revision 0.2.0  
**Reviewed SHA-256:** `1aa2ccc9a241b5cee4d41f6d18e62342397c4e130c31c700f3a2d5be1e26c776`  
**Source baseline:** local governance `main`, `68f3f0525060ec7115414af16b0931e54fae1344`  
**Reviewer:** Codex, the design author, performing a further critical source review. No new separate independent reviewer or project IAA was invoked for this revision. The earlier independent review covered 0.1.0 only.  
**Outcome:** the operating model is substantially clearer. Resolve two bounded design issues before accepting it as the rollout specification; retain the other improvements. One additional execution condition must be specified and demonstrated before automated operation.

This is a review report, not an amendment to the design, governing policy, agent contract, gate, budget or authority. The reviewed proposal and prior evidence remain unchanged. No runtime acceptance test, formal assurance verdict, consumer rollout or activation is claimed. The recurring 30-minute follow-up remains paused.

## 1. What the revision successfully improved

The following are now explicit and coherent at the design level:

- Human CS2 retains reserved decisions; active CS2 owns the approved parent through all waves and integrated acceptance. The deterministic controller is not the job manager.
- Foreman manages implementation and ordinary repair; CodexAdvisor's agent-factory role is separate from builders. ECAP, IAA, administrator, liaison and publisher responsibilities are distinguished.
- Planning/QA preparation is authorized before it produces RED; the pre-brief barrier applies to the dependent implementation work. This avoids an appointment prerequisite referring to its own future QA output.
- Source acceptance, individual consumer adoption and aggregate rollout acceptance have a defined order. An unavailable consumer does not prevent an independently authorized pilot, nor count as an adopted repository.
- Ordinary in-envelope correction continues through existing owners, with named wake-up responsibilities. The migration programme's human handovers are not imposed on every routine future repair.
- Direct human instructions have a defined trust boundary, scoped reuse and revocation handling. A worker-authored approval claim is not human authority.
- The single CS2 view, minimum evidence principle and manual route make it possible to operate without first installing a production coordinator/database.
- S0/A/I1 distinguishes submitted files, prospective output permission and actual integration inventory. It resolves the original token/scope counting problem for the permitted new-file success path.

These are design improvements, not proof that the corresponding runtime exists or that current source already conforms.

## 2. Remaining findings

### N01 — P1: IAA closing duties do not yet fit the finite new-file envelope

**Proposal references:** lines 330–355, especially 334, 338 and 355; validation V49 and V57 at lines 735 and 743.

**Source evidence:**

- [IAA contract](../../.github/agents/independent-assurance-agent.md), lines 567–582 and 603–612, requires rejection tracking, delivery, acknowledgement checks and resubmission verification. A filed rejection without delivery is insufficient.
- [IAA FAIL-ONLY-ONCE](../../.agent-workspace/independent-assurance-agent/knowledge/FAIL-ONLY-ONCE.md), line 8 and lines 637–644, requires a new rule/breach entry in the existing registry when a new governance failure pattern is identified and commits that update in the session bundle.
- That same registry, lines 436–438, already provides a useful new-per-session-file route for parking/suggestion records. It does not similarly resolve the existing-registry update requirement.

**Failure scenario:** H0 freezes an existing registry file. During final review IAA discovers a new failure pattern, issues a rejection, and must record it. The proposed route allows only new files and preserves every H0 file, so it cannot carry the required registry append. Merely adding the registry path to A does not solve this: it already exists. A new IAA pass that discovers another pattern can repeat the same publication problem. Rejection tracking/delivery/acknowledgement is also not concretely represented by the three-file success fixture.

The existing V57 instruction to amend the envelope handles an omitted future new-file path, but does not define how a mandatory edit to an existing operational/knowledge record coexists with the invariant that existing files cannot change. No new live rejection is asserted here; this is a source-backed design counterexample.

**Required correction:** specify the PASS and REJECTION output sets, including conditional escalation, per-session learning and delivery/acknowledgement evidence. Give each a producer, publication destination and re-entry rule. Distinguish evidence of a newly discovered learning from adoption of a new operative rule. Choose and explicitly align the registry policy: for example, preserve the review's learning in a new per-session record and assign subsequent authorized rule promotion, rather than silently editing reviewed policy or dropping a mandatory registry update. If choosing a narrowly allowed append instead, define exact prefix-preservation, ownership, validity and invalidation rules; do not call it new-file-only.

Provide one complete rejection walkthrough: actual finding -> independent rejection and owned closing records -> delivery -> acknowledgement -> authorized repair -> affected-stage resubmission. Missing acknowledgement must have an accountable follow-up owner and cannot trigger an unchanged fresh review. Preserve the distinction between an issued verdict and a fully completed administrative session.

**Acceptance additions:** a final review discovers a new governance failure pattern; a rejection needs an escalation record; delivery succeeds but acknowledgement is missing; a new review instance replaces an unavailable one. Each must terminate in a valid recorded outcome or one precise owned blocker without fabricating records or repeatedly invalidating unchanged implementation evidence.

### N02 — P1: Governance/gate profiles need an explicit risk-proportionality decision

**Proposal references:** lines 233–253, particularly the GOVERNANCE_GATE summary at 234 and mandatory ECAP/IAA rows at 249–250.

**Source evidence:**

- [IAA canon](../canon/INDEPENDENT_ASSURANCE_AGENT_CANON.md), lines 92–107, explicitly describes risk-proportionate ceremony. Its table allows CS2 direct review for T3 canon/T4 workflow work and different handling for T5 knowledge/T6 documentation; T1 contract and T2 build work require IAA.
- [IAA FAIL-ONLY-ONCE A-018](../../.agent-workspace/independent-assurance-agent/knowledge/FAIL-ONLY-ONCE.md), lines 331–348, nevertheless treats governance/canon, workflows and scripts as assurance-triggering categories and rejects self-assessed NOT_REQUIRED.

Those sources contain a real classification conflict. This review does not resolve it by selecting the more permissive text, and does not waive this parent's existing mandatory independent QA.

**Failure scenario:** one table says governance/gate assurance follows the accepted classification, while the detailed profile assigns required ECAP and IAA to all material governance/gate changes. A simple, otherwise permitted correction can acquire another full review cycle. Agents still encounter conflicting source instructions even if the new broad requirement is intended to be the eventual policy.

Revision 0.2.0 does disclose that its R entries are proposed policy. The remaining problem is that the additional blanket ceremony and its proportionality are not justified or presented as a specific replacement of the conflicting classification rules. That is material to the goal of an easy, effective process.

**Required correction:** separate job profile (who does what) from risk/assurance tier (which independent controls apply). Use one authoritative policy table with explicit precedence and job-specific requirements. Retain existing mandatory assurance for protected authority, applicable product work and this approved parent. Where a broader or lighter requirement is proposed, name the exact changed obligation, rationale and human decision; do not infer it from the generic lifecycle. Retire or align conflicting Tier 1/Tier 2/gate instructions together.

**Acceptance additions:** low-risk documentation, Tier 2 maintenance, material executable-gate repair and protected agent-contract change receive explicit, proportionate classifications. Mixed work cannot use the lowest-risk label. An existing job-specific mandatory IAA obligation cannot be downgraded merely because a generic table offers a different route. An uncertain classification yields one precise resolution, not repeated referrals between agents.

### N03 — P2: Automated recovery needs an enforceable effect boundary and independent supervision

**Proposal references:** lines 395, 418–449 and 661–677. This is an execution condition for WP2/WP5, not a reason to prevent authorized manual design/correction work.

The design correctly requires claims, fencing, uncertain-outcome reconciliation and wake-up ownership. It should not promise that a local lease check can stop an action already in flight to an external provider. Git content compare-and-set prevents an unexpected head overwrite; it is not itself a check of the worker's current authority epoch. An external comment/dispatch may have different capabilities. A dead coordinator also cannot be its own only failure detector.

The [active-CS2 canon](../canon/ACTIVE_CS2_AUTOMATED_WORKFLOW_GOVERNANCE.md), lines 81–89, already requires an independent deterministic supervisor and human kill/reset controls. The next implementation specification should map that existing requirement into the recovery design rather than add another competing control system.

**Before automatic operation:** record each adapter's supported idempotency/CAS/fencing/lookup/cancellation capabilities. Identify the trusted effect dispatcher, where epoch/authority checks are enforced, and how in-flight effects are reconciled after revocation. If outcome cannot be established safely, retain an explicit uncertain state and route one actionable owner decision; do not treat a momentarily absent result as proof that retry is safe. Name a supervisor outside the failed coordinator's own fault boundary and demonstrate kill, lost-subscription, restart and uncertain-effect cases.

These details may be completed in the conformance/runtime work packages. They do not require installing optional infrastructure before the local manual route can proceed.

## 3. Status of the original seven findings

| Earlier finding | Result on 0.2.0 |
|---|---|
| R01 — role ownership | Addressed at design level: complete role model and own-authority boundaries now stated |
| R02 — freeze/publication loop | Success-path inventory correction addressed; closing/rejection/learning path remains partial under N01 |
| R03 — applicability | Explicit profiles and selection introduced; risk-proportionality/source precedence remains partial under N02 |
| R04 — release/adoption ordering | Addressed at design level; no remaining prerequisite cycle identified in the three named acceptance outcomes |
| R05 — automatic continuation | Addressed at design level; enforceability and independent supervision need the WP2/WP5 evidence described in N03 |
| R06 — human instruction trust | Addressed at design level; actual adapter/issuer bindings remain implementation prerequisites |
| R07 — simplicity | The single view, minimum evidence and manual-route principles address it at design level; actual effort/usability must be demonstrated, not inferred from document checks |

The design is now about 15,000 words. That is acceptable as an engineering specification only if the operating instructions remain short. Do not make agents re-transcribe this document or require Johan to read it to discover the next action. Consolidate duplicated profile requirements into the single authoritative mapping and derive the practical operating view from it.

## 4. Bounded next step

Make one focused design revision addressing N01 and N02, with a rejection/learning walkthrough and an authoritative profile/risk mapping. Record N03 as a required WP2/WP5 capability specification and demonstration. Retain the existing role, rollout, continuation, trust and simple-view improvements.

The next work is source conformance and exact implementation planning, not another architecture or an indefinite sequence of broad reviews. Do not demand production runtime proof before accepting a design for that audit; do demand actual proof before claiming production readiness. Johan's agreed handover/acceptance sequence still applies.

This report makes no changes to revision 0.2.0 or to live governance. It does not reactivate the paused follow-up, authorize source edits or replace independent assurance. This review is the author's further critical pass and must not be represented as a second independent review of 0.2.0.
