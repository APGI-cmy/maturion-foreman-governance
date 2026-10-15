# Critical review of the administration-system design

**Review date:** 2026-10-15  
**Reviewed revision:** 0.1.0, REVIEW, non-normative  
**Reviewed artifact:** [Administration System Design and Controlled Migration](../proposals/PROPOSAL_2026-10-15_ADMINISTRATION_SYSTEM_DESIGN.md)  
**Reviewed SHA-256:** `264973d5aa1df1cc9ddd049b4e855502bf1312f22ecd148a3bc1aa6b0f92ad6a`  
**Source baseline:** local governance `main`, `68f3f0525060ec7115414af16b0931e54fae1344`  
**Disposition:** REVISE BEFORE DESIGN ACCEPTANCE. Retain the existing architecture; resolve the interfaces below before treating the design as an implementation specification.

This report answers Johan's request for a critical review of simplicity, avoidance of administrative loops, effectiveness and every agent's role. It combines the author's source checks with a separate read-only review by `/root/independent_advice_review`, which did not author this proposal. Both inspected the identified revision. That review is independent design feedback, **not** an appointed project IAA verdict, QA token, administrative acceptance or rollout approval. The proposal remains unchanged.

## 1. Overall assessment

The draft identifies the right principles, but is not yet sufficiently precise or easy to operate. Its most serious omission is the active-CS2 agent's continuing ownership of the job. It also leaves a concrete conflict between frozen evidence and the scope changes created by assurance publication. These could recreate the very stalls the design intends to remove.

The target should be **no unjustified administrative repetition**, rather than a promise that no correction cycle will ever occur. A valid rejection must still lead to repair. Each repeat must have changed relevant input or a justified new check, an accountable owner and preserved limits. An unchanged blocker should produce one clear waiting state, not another appointment or evidence packet.

Keep the safeguards that work: stage-specific readiness, independent assurance, early QA where applicable, immutable history, authenticated evidence, separation of producer from publisher, conserved accounting, safe recovery and actual consumer verification. The correction is to make these coherent and usable, not to replace them with a new constitution or remove them wholesale.

## 2. Findings requiring changes

Priority P1 means resolve before accepting the design for implementation. P2 means resolve in the next design revision; provider-specific implementation details can follow in a bounded work package. Line references are to the unchanged 645-line proposal, revision 0.1.0.

| ID | Priority | Finding | Proposal lines |
|---|---|---|---|
| R01 | P1 | Active CS2 is absent from the operating-role matrix; CodexAdvisor and builder/QA responsibilities are insufficiently distinct | 178–189, 269–288, 387–388 |
| R02 | P1 | Frozen scope and newly published assurance outputs can still create a publication/check loop | 203–205, 261–265, 298–300, 521–524, 542 |
| R03 | P1 | Stage applicability is promised without a concrete rule for the different kinds of work | 159, 175–225, 490, 520 |
| R04 | P1 | Source-release acceptance and consumer-rollout acceptance are not clearly ordered | 366–372, 444–446, 568 |
| R05 | P2 | Automatic continuation and wake-up ownership are not explicit enough | 68, 210, 304–321, 339, 417–430 |
| R06 | P2 | Direct human authority lacks a defined trusted receipt and revocation boundary | 233–251, 347–358, 429–440 |
| R07 | P2 | Ease of handling and minimum administrative effort are not acceptance requirements | 70–79, 280–288, 339–341, 397, 417, 488–492 |

### R01 — Restore CS2 ownership and distinguish every role

**Failure:** the evaluator becomes a manager, Foreman owns the parent indefinitely, or Johan must manually dispatch every next action. Treating CodexAdvisor as a generic implementer can also send protected contract work to the wrong author. An unspecified own-contract update route can halt the migration that is intended to repair those contracts.

The existing [active-CS2 canon](../canon/ACTIVE_CS2_AUTOMATED_WORKFLOW_GOVERNANCE.md), lines 22–30, already separates human CS2, active CS2, Foreman and the controller. The [CodexAdvisor contract](../../.github/agents/CodexAdvisor-agent.md), lines 46–57, 91–113 and 343–352, identifies an agent factory, permits authorized target-agent changes, and prohibits modifying its own contract. The premise that CodexAdvisor can never change agent files is therefore incorrect; authority, target, execution route and self-modification are separate questions. This does not prove that an earlier cloud task had working access.

**Required revision:** add the explicit role model in section 3 below. Define the distinct route for product work and agent-factory work. Name who authors and independently evaluates a change to CodexAdvisor's own contract or to IAA's authority. A changing agent must not bootstrap its own expanded authority or assure its own change. A valid human-directed route may be designed, but this review does not activate one.

### R02 — Finish the assurance/publication sequence

**Failure:** the pre-IAA scope exactly matches the submitted diff. IAA adds its token. The changed-file set now contains an undeclared file. Updating the manifest violates the token-only rule; leaving it frozen fails scope parity. Fresh current-head runs also have new identities, and token-dependent checks change outcome, while line 263 requires unchanged check results.

This is a source-grounded design gap. [.github/scripts/validate-scope-to-diff.sh](../../.github/scripts/validate-scope-to-diff.sh), lines 90 and 124–139, compares the complete current diff in both directions. [Handover canon](../canon/AGENT_HANDOVER_AUTOMATION.md), lines 787–789, requires actual pre-IAA scope parity; lines 1374–1383 require immutable proof and new-token-file-only publication. This review has not demonstrated a new live rejection caused by this combination.

**Required revision:** specify a worked sequence with three separate inventories:

1. **Submitted inventory:** the files that actually exist in frozen submission S0. Its counts and hashes are truthful at S0.
2. **Permitted assurance additions:** a finite, separately declared allowance for actual independent outputs. A reserved reference is not an existing file or an issued PASS.
3. **Integration inventory:** S0 plus only the actual validated additions. The verifier checks that union without rewriting the frozen submission.

For example, adding `.agent-admin/assurance/iaa-token-<bound-review-id>.md` must be accounted for by the integration verifier rather than smuggled into an earlier actual-file count. Enumerate any mandatory IAA session/verdict/wave outputs too: decide where each belongs, and explicitly amend conflicting policy if the legitimate output set exceeds the present token-only allowance. Do not drop mandatory IAA records to make the example work.

Separate preserved substantive-check evidence from new token/binding checks and fresh current-head checks. Define the exact invalidating changes and corresponding gate edits. Never make the token include its own future commit hash, or require final assurance to permit its own input publication. V06/V09 must test the complete path, including final scope parity and negative cases.

### R03 — Define job profiles before assigning stages

**Failure:** a contract update or ordinary evidence reconciliation inherits product-build requirements, produces fictitious RED evidence, or needs repeated human permission to skip irrelevant stages. The opposite failure is an actor choosing a convenient profile to avoid required assurance.

**Required revision:** provide a small table of approved profiles, using existing classifications first. At minimum cover product implementation, agent-contract creation/update, governance/gate correction, and ordinary administrative publication. For each, identify stage purpose, required/adapted/inapplicable requirements, author, evaluator and the canonical basis. Do not create a different lifecycle for every repository.

The selector must apply accepted policy to actual scope; Foreman or CodexAdvisor uses the appropriate route, ECAP checks the classification, and independent review examines it where required. A worker cannot grant its own exclusions. An uncertain material classification produces one precise decision, not an invented exemption. Changed executable gates, authority or substantive evidence are not an administrative-only edit merely because the files are under an admin directory.

Include three complete walkthroughs: a product feature, a protected agent-contract amendment, and an ordinary scope/publication repair. Adapt QA to the work: contract invariants and negative fixtures may demonstrate the relevant defect; a fabricated product test suite does not. Preserve every currently applicable requirement unless a named amendment is accepted.

### R04 — Separate source approval from rollout completion

**Failure:** consumers need an accepted release before adoption, but release acceptance needs consumers already adopted. A missing consumer then prevents even a ready pilot from proceeding.

**Required revision:** name and order these outcomes without adding a competing top-level state machine:

1. Accepted governance source release: the reviewed source/policy package is suitable for the authorized rollout.
2. Individual consumer adoption: one repository actually applies, validates and acknowledges it.
3. Aggregate rollout acceptance: the accepted rollout cohort has the required outcomes, with every deferred/unlocated target explicitly dispositioned.

A pilot may operate only within its accepted pilot authority; it need not claim aggregate completion. Deferral is an explicit scoped decision, not permission to silently omit a registered repository. Existing PR reconciliation remains behind Johan's agreed rollout checkpoint; this review does not move it forward.

### R05 — Make continuation an obligation, with a wake-up owner

**Failure:** a blocker is repaired, but no actor watches its resumption condition; alternatively every ordinary correction is treated as another reserved decision. Deduplication can prevent repeats while leaving work permanently idle.

**Required revision:** active CS2 retains parent ownership and requests eligible progression; Foreman retains ordinary repair routing and specialist appointment; the deterministic controller enforces eligibility. Identify who observes each event or reconciles an uncertain outcome, and how that observation reaches its owner. If the active-CS2 runtime is unavailable, record the supported temporary owner rather than pretending automation is active.

Ordinary correction within accepted scope, authority and usable accounting should continue without another permission request. A preserved substantive rejection means STOP_AND_FIX, not abandonment. Human checkpoints for this migration programme must not become a permanent approval requirement for every future routine repair. An unchanged reserved/external blocker stays quiet until a real trigger; independent eligible work may proceed.

### R06 — Make human overrides verifiable and bounded

**Failure:** a worker writes a file claiming Johan authorized a rule override, then cites its own file as authority. Revocation may also arrive after a worker has claimed an action.

**Required revision:** define a trusted instruction/approval receipt outside the executing worker's unilateral control. Bind it to identifiable human input, reviewed revision, scope, replacement checks and exit condition. Name the recorder and verifier; specify how revocation fences unperformed actions and how already completed effects are reconciled. A worker's summary may link the receipt but cannot create the underlying human decision.

Keep the current useful override principle: retain the old gate's truthful failure while the explicitly authorized migration uses named replacement checks. Do not require the broken rule to pass before preparing its repair. Prefer one bounded accepted migration instruction for a reviewed package over repeated approval of the same facts. Independent verdicts and actual provider permissions remain separate.

### R07 — Design the small operating surface, not just its machinery

**Failure:** agents replace repetitive Markdown with repetitive registry entries, receipts, matrices and handovers. Johan still has to reconcile several records just to identify the next action. Installing a coordinator becomes a prerequisite for a simple authorized local correction.

**Required revision:** require one generated CS2 view, one authoritative record per fact, and the minimum evidence set for each profile. Generate projections; never manually copy the same verdict into multiple competing authorities. A publisher is a capability of an authorized owner/route, not automatically a new agent appointment on every job.

Separate the usable local correction procedure from production automation. Runtime infrastructure is required before claiming safe automated dispatch, not automatically before every human-directed design/edit/review operation. An approved manual route must be explicit and honest about its limitations; it must not imitate a live deterministic controller. SQLite/service/outbox choices belong behind the interface and require later implementation proof.

## 3. Role model the next revision must contain

This is a recommended allocation for reconciliation with existing canon, not new role authority. In particular, active-CS2 functionality is not declared installed or activated.

| Role | Primary responsibility | Handback / continuation | Boundary |
|---|---|---|---|
| **Johan — human CS2** | Business intent, accepted scope/envelope, reserved policy/authority decisions, agreed migration checkpoints and retained integration/activation decisions | Receives one understandable decision view; answers only actual reserved matters or agreed reviews | Does not supply an independent IAA verdict by approving an instruction |
| **Active-CS2 agent** | Own the approved parent through all waves and integrated acceptance; inspect genuine outcomes, request eligible transitions and issue precise findings | Sends the eligible wave to Foreman; receives its complete evidence; monitors resumption and end-to-end completion | Does not build, appoint specialists, alter gates or assume human reserved authority; activation remains separate |
| **Foreman** | Planning, applicable early QA/RED acceptance, specialist appointments, builder supervision, ordinary remediation, QP/checkpoints and evidence binding | Returns precise owned evidence to CS2; routes a rejection to the responsible producer | Does not implement the delivery or replace IAA; does not surrender repair ownership on rejection |
| **CodexAdvisor** | Authorized agent-factory design/updates, checklist conformance, contract and minimum Tier 2/integrity bundle within its actual scope | Uses the explicit agent-contract review/publication route; requests an authorized prerequisite owner where necessary | Not a product builder or Foreman; no own-contract self-modification or self-assurance |
| **Builder agents / QA producers** | Bounded implementation, relevant RED tests/invariants where applicable, self-checks and actual delivery evidence | Return delivery or a precise blocker to Foreman; repair findings under the same appointment where permitted | No self-appointment, self-acceptance or silent authority expansion |
| **ECAP** | Expert administrative validation, stage/applicability reconciliation, evidence inventory and publication handback | Returns a bounded administrative outcome to Foreman; names missing inputs and owners once | Cannot invent another owner's verdict, accept substantive quality or issue assurance |
| **IAA** | Prospective pre-brief where required; independent assessment and owned verdict/token against identified evidence | Returns PASS or actionable rejection with exact re-entry obligations | Does not repair the implementation or assure its own contract/authority change |
| **Governance administrator / liaison** | Own permitted canonical administration and canonical-to-consumer adaptation, respectively | Return actual source/parity/adoption evidence through their authorized routes | Neither silently changes protected agent authority nor claims layer-down from copying alone |
| **Publisher capability** | Transport exact owned outputs and couple the actual inventory through an authorized route | Return actual publication receipts to the producer/Foreman | Transport is not a new acceptance decision or automatically a separate agent appointment |
| **Deterministic controller** | Validate transitions, claims, accounting, current evidence and permitted bindings | Return legal transition decisions and refusal reasons | Does not manage the job, invent owner verdicts or replace CS2/Foreman judgment |

No role should become a general fallback author merely because another role is unavailable. The next design must identify the actual supported fallback or give one precise blocked result.

## 4. Minimum CS2 operating view

The default handover should answer these questions in one place, with detailed evidence available through links:

| Visible item | Required answer |
|---|---|
| Outcome and identity | Which parent/wave/revision is being handled, and what is accepted so far? |
| Material change | What changed since the last meaningful checkpoint? |
| Current action | Who owns the next step, and will it proceed automatically? |
| Blockage | What exact requirement is unmet, and what observed event resumes it? |
| Human action | The precise decision needed from Johan, or “none”; never a generic request to approve everything |
| Evidence and limits | Links to actual checks/verdicts, unresolved risks and measured/UNKNOWN accounting |

Expand details on demand. Historical rejections remain accessible without appearing as current unresolved findings after an authorized disposition. A source-QP PASS remains visible even while later administration is pending. Preparation, submission, assurance, integration, activation and whole-job completion must remain distinct.

## 5. Acceptance checks missing from the first draft

Add these to the existing suite by extending its IDs rather than creating a second competing test catalogue:

1. Each named role can identify its input, decision, output, continuation owner and prohibited substitution.
2. Active CS2 progresses two eligible waves through Foreman without Johan manually dispatching ordinary stages; parent acceptance remains separately evidenced.
3. Product, agent-contract and ordinary administrative profiles complete without invented artifacts or actor-selected QA exclusions.
4. Real assurance publication passes integration inventory and current-head checks without changing frozen evidence or silently dropping mandatory IAA records.
5. A routine authorized repair resumes the affected stage once; unchanged observation causes no repeat dispatch or review.
6. A changed dependency reaches an identified watcher/owner; a stale or revoked claim cannot act.
7. Governance source acceptance precedes pilot adoption; aggregate rollout completion cannot be claimed from that pilot alone.
8. A worker-authored approval claim cannot authorize its own migration exception.
9. Each authoritative fact is entered once; CS2 can identify the next owner/action from one view without reconciling documents.
10. An authorized local correction can use its accepted manual route without being mislabeled live automation or blocked by an unrelated future infrastructure choice.
11. CodexAdvisor-own-contract and IAA-authority changes have a supported, independently reviewed author route; they cannot certify themselves.
12. Legitimate negative tests still reject premature completion, material token-envelope changes, unknown dependent accounting, provider denial and unauthorized scope/authority changes.

These are required design coverage additions, not assertions that runtime tests passed. Do not invent new budgets or numerical overhead thresholds in the review; set any such limits explicitly during accepted planning.

## 6. Recommended next revision and handover

Prepare revision **0.2.0 of the same proposal** with: the complete role table; a small profile-selection table; one exact freeze/assurance/publication walkthrough; separate source/adoption/rollout outcomes; explicit continuation/wake-up ownership; trusted human instruction receipts; and the minimal CS2 view. Move detailed implementation options behind that operating model.

Keep the existing architecture and valid safeguards. Do not create a replacement constitution, second job ledger or new agent for each administrative function. Distinguish design decisions that must be resolved now from file-level implementation details legitimately left for the conformance audit.

Return the revised design to Johan for the agreed review before changing governing sources, contracts, gates or consumers. This report makes no such changes and grants no blanket overrides. Existing open PRs remain deferred under the current local design-first programme. No new issue, PR, commit, push, role activation or project-assurance verdict is created by this review.
