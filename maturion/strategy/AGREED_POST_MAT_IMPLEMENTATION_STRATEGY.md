# POST-MAT IMPLEMENTATION STRATEGY: Agent Enhancement Roadmap

## Metadata
**Authority**: Johan Ras (Human Authority)  
**Status**: Agreed Strategy  
**Date**: 2026-02-15  
**Context**: MAT Implementation Planning - Strategic Alignment  
**Review Cycle**: After MAT build completes (Phase 1 → Phase 2 transition)  
**Purpose**: Capture phased approach to agent capability enhancements

---

## Executive Summary

On 2026-02-15, strategic alignment was achieved on a phased approach to enhance agent capabilities across the Maturion ecosystem. Key insights emerged around:

- **POLC-Only Constraint**: Foreman must operate strictly within Planning/Organizing/Leading/Controlling, never implementation
- **Agent Invocation Protocol**: Formal delegation mechanisms when work exceeds authority boundaries
- **Independent Assurance Layer**: Quality Professor agent operating in dedicated evaluation mode
- **Cognitive Mode Separation**: Work mode vs. evaluation mode as fundamental quality improvement mechanism

**Strategic Decision**: Implement these enhancements in **two phases**:

1. **Phase 1 (NOW - During MAT Build)**: Minimal, non-disruptive enhancements to existing contracts and governance
2. **Phase 2 (AFTER MAT Build)**: Full protocol implementation, new agent layers, comprehensive orchestration

**Current Focus**: Complete the MAT build with existing systems. Enhancement work proceeds only where it supports and does not disrupt the primary build objective.

---

## Critical Insights

### 1. POLC-Only Constraint for Foreman

The Foreman agent must operate **exclusively** within the POLC (Planning, Organizing, Leading, Controlling) management model. This means:

- **Planning**: Requirements analysis, architecture design, QA strategy
- **Organizing**: Resource allocation, builder appointment, workflow orchestration  
- **Leading**: Builder supervision, execution guidance, quality enforcement
- **Controlling**: Validation, compliance verification, delivery acceptance

**What Foreman Must NOT Do**:
- Write production code
- Implement features directly
- Fix builder code (delegates back to builders)
- Execute technical work beyond supervisory duties

**Current State**: The principle exists in `FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md` but needs explicit reinforcement in the agent contract itself.

### 2. Delegation with Accountability

When work exceeds an agent's authority or capability, formal delegation must occur with:

- **Clear handover specifications**: What is being delegated, why, and what success looks like
- **Quality expectations**: How the receiving agent will know they succeeded
- **Evidence requirements**: What artifacts must be produced
- **Validation criteria**: How the delegating agent will verify completion

This creates a chain of accountability while respecting authority boundaries.

### 3. Three-Tier Reference System (Already Working)

The ecosystem already operates a three-tier reference architecture:

1. **Constitutional Canon**: Immutable governance principles (`GOVERNANCE_PURPOSE_AND_SCOPE.md`)
2. **Canonical Governance**: Authoritative policies and models (`.../canon/` artifacts)
3. **Working Contracts**: Agent-specific implementations and protocols

**Gap**: This system works but is implicit. Agents understand it through inference rather than explicit protocol. Phase 2 will formalize the reference resolution protocol across all contracts.

### 4. Work Mode vs. Evaluation Mode (Profound Insight)

**Critical Discovery**: Agents operating in "work mode" (generation/completion) miss gaps that become visible when they shift to "evaluation mode" (validation/critique).

**Why This Happens**:

When generating work, agents:
- Optimize for completion and coherence
- Smooth over missing assumptions
- Produce structurally convincing outputs
- Operate under completion pressure

When evaluating work, agents:
- Apply constraint checking
- Identify missing dependencies
- Detect logical inconsistencies
- Spot structural weaknesses

**Why Independent Review Is Even Stronger**:

When Agent B critiques Agent A:
- No self-consistency bias
- No pressure to defend prior reasoning
- Different framing and token history
- Different perspective and constraints
- Adversarial pressure drives quality

**Architectural Implication**: This validates the Independent Assurance strategy. Quality Professor operating in pure evaluation mode (never generating the work it reviews) provides structural quality improvement beyond self-review.

**Reference**: See `INDEPENDENT_ASSURANCE_EXECUTION_STRATEGY.md` for full analysis of why cross-checking works.

---

## Phase 1: NOW (During MAT Build)

**Objective**: Make minimal, non-disruptive enhancements that support current work without adding protocol overhead.

### Enhancements

#### 1. Foreman Contract Enhancement

Add explicit POLC-only section to `.github/agents/foreman-v2.agent.md`:

```markdown
## POLC-Only Constraint (Planning, Organizing, Leading, Controlling)

The Foreman operates EXCLUSIVELY in managerial modes:

**Planning**: Requirements analysis, architecture design, QA strategy creation  
**Organizing**: Builder appointment, resource allocation, workflow orchestration  
**Leading**: Builder supervision, execution guidance, quality enforcement  
**Controlling**: Validation, compliance verification, delivery acceptance  

**Explicit Prohibitions**:
- Never write production code (builders implement; FM supervises)
- Never fix builder code directly (delegate back to builder)
- Never implement features (design and supervise only)
- Never bypass the build-to-green process

**When work exceeds authority**: Create handover specification and delegate to appropriate agent.
```

#### 2. Handover Quality Checklist

Create interim checklist for foreman to use when delegating work:

**Handover Quality Checklist** (embedded in foreman contract):

- [ ] **Clear Scope**: What specifically is being delegated
- [ ] **Success Criteria**: How will the receiving agent know they succeeded
- [ ] **Context Provided**: All necessary background and constraints
- [ ] **Quality Expectations**: Standards and validation requirements
- [ ] **Evidence Required**: What artifacts must be produced
- [ ] **Validation Criteria**: How completion will be verified
- [ ] **Authority Boundaries**: What the receiving agent can/cannot do
- [ ] **Escalation Triggers**: When to return to delegating agent

#### 3. Delegation Guidance in Canonical Governance

Add section to `governance/canon/FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md`:

**Section: "Delegation When Work Exceeds Authority"**

Content should cover:
- When delegation is required (complexity, authority boundaries, specialized expertise)
- How to structure handover specifications
- Quality expectations for delegated work
- Validation responsibilities remain with delegating agent
- Chain of accountability principles

#### 4. Issue Assignment Guidance for MAT Period

**During MAT Implementation**:
- Foreman focuses on supervision, not direct implementation
- Complex technical implementations → delegate to codex-advisor or specialized builders
- Governance canon updates → delegate to governance-liaison (which triggers ripple)
- Quality validation → maintain foreman authority
- Architecture decisions → foreman authority with escalation for ambiguity

**Be Explicit**: Issue descriptions should clearly state which agent is appropriate and why.

### What Phase 1 Does NOT Include

- ❌ Full `AGENT_INVOCATION_PROTOCOL.md` (wait for Phase 2)
- ❌ Quality Professor agent implementation (wait for Phase 2)
- ❌ Enhanced cross-repository orchestration protocols (wait for Phase 2)
- ❌ Formal three-tier reference resolution protocol (wait for Phase 2)

**Rationale**: Minimize disruption during active MAT build. Current systems work; enhancements wait until build completes.

---

## Phase 2: AFTER MAT BUILD COMPLETES

**Objective**: Implement full agent capability enhancements once MAT is stable and proven.

### Full Implementations

#### 1. Agent Invocation Protocol (Canonical)

Create `governance/canon/AGENT_INVOCATION_PROTOCOL.md`:

**Scope**:
- Formal delegation mechanisms across all agents
- Handover specification standard
- Quality expectation contracts
- Evidence requirements
- Validation protocols
- Authority boundary resolution
- Escalation pathways

**Authority**: Canonical governance (requires CS2 approval for implementation)

#### 2. Independent Assurance Layer

**Quality Professor Agent** (dedicated evaluation mode):

- Operates only in evaluation/critique mode (never generates work it reviews)
- Reviews architecture, QA strategies, and delivery artifacts
- Provides structured adversarial review
- Escalates quality concerns to foreman or human authority
- Maintains independence from execution agents

**Integration**: 
- Optional toggle (not always-on during Phase 2 start)
- Risk-triggered activation
- Context-aware dynamic review based on change scope

**Reference**: Implementation builds on principles validated in `INDEPENDENT_ASSURANCE_EXECUTION_STRATEGY.md`

#### 3. Enhanced Cross-Repository Orchestration

Formalize multi-repo coordination protocols:

- Canon propagation with ripple enforcement
- Cross-repo dependency tracking
- Synchronized governance updates
- Multi-repo build coordination
- Evidence aggregation across repositories

**Reference**: Extends strategies in `CROSS_REPO_ORCHESTRATION_STRATEGY.md`

#### 4. Three-Tier Reference System Formalization

Make reference resolution explicit in all contracts:

1. **Constitutional Canon** (immutable) → direct reference, no interpretation
2. **Canonical Governance** (authoritative) → interpret within bounds, escalate ambiguity
3. **Working Contracts** (operational) → implement canonical guidance, align upward

**Protocol**: How agents resolve conflicts, when to escalate, how to maintain alignment

---

## Immediate Actions (Phase 1)

Three issues to implement Phase 1 enhancements:

### Issue 1: Enhance Foreman Contract + Create Quality Checklist
**Assigned**: codex-advisor  
**Scope**: 
- Add POLC-only explicit section to `.github/agents/foreman-v2.agent.md`
- Embed handover quality checklist in contract
- Ensure alignment with `FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md`

**Rationale**: codex-advisor has cross-repo governance expertise and can ensure consistency

### Issue 2: Add Delegation Guidance to FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md
**Assigned**: governance-liaison (triggers ripple)  
**Scope**:
- Add "Delegation When Work Exceeds Authority" section
- Document handover specification requirements
- Clarify validation responsibilities
- Establish chain of accountability principles

**Rationale**: This tests the governance canon update → auto-ripple system. Changes to canonical governance should automatically propagate to consumer repos via the recently implemented auto-merge ripple system.

### Issue 3: Issue Assignment Guidance for MAT Implementation Period
**Assigned**: foreman  
**Scope**:
- Document agent assignment best practices during MAT build
- Clarify when to delegate vs. supervise
- Provide examples of appropriate agent selection
- Ensure explicitness in issue descriptions

**Rationale**: Foreman owns execution orchestration; this is process guidance within authority

---

## Work Mode vs. Evaluation Mode Principle

### The Fundamental Pattern

**Observation**: Across multiple tests, agents reviewing their own work consistently identify gaps invisible during generation. Independent agent review finds even more issues.

**Why Work Mode Misses Gaps**:

During generation (work mode):
- Focus on completion and forward progress
- Optimize for coherence and structural soundness
- Smooth over edge cases and assumptions
- Operate under implicit "make it work" pressure
- Token context optimized for construction

**Why Evaluation Mode Finds Errors**:

During evaluation (critique mode):
- Focus on constraint satisfaction and correctness
- Actively search for inconsistencies
- Question assumptions rather than accepting them
- Operate under "find what's wrong" framing
- Token context optimized for analysis

**These are effectively different cognitive pathways within the same model.**

### Why Independent Review Is Even Stronger

When Agent B reviews Agent A's work:

1. **No Self-Consistency Bias**: Agent B has no investment in defending Agent A's reasoning
2. **Different Framing**: Fresh perspective without construction-mode assumptions
3. **Adversarial Pressure**: Natural tension between creator and critic improves quality
4. **Token History Independence**: No momentum from generation phase
5. **Constraint Diversity**: Different agent may apply different quality standards

**Result**: Measurably higher quality output through structural independence.

### Architectural Validation

This pattern validates the **Independent Assurance strategy**:

- Quality Professor agent operates in pure evaluation mode
- Never generates work it reviews (maintains independence)
- Provides adversarial review with constraint diversity
- Escalates quality concerns without defensive bias

**This is not bureaucracy. This is structural assurance.**

Industries with mature quality systems (aviation, nuclear, financial auditing, high-assurance software) all employ separation of duties for exactly this reason: independent verification prevents self-attestation bias and catches gaps invisible to the creator.

### Connection to Existing Strategy

See `INDEPENDENT_ASSURANCE_EXECUTION_STRATEGY.md` for comprehensive analysis:

- Section 2.1: "Generation Mode ≠ Evaluation Mode"
- Section 2.2: "Why Independent Cross-Review Is Even Stronger"  
- Section 3: "This Is Not Bureaucracy — It Is System Maturity"
- Section 8: "Empirical Evidence from Your Tests"

**Strategic Conclusion**: Work-mode vs. evaluation-mode separation is not theoretical. It is empirically validated and architecturally sound. Independent Assurance implementation proceeds with confidence.

---

## Governance Ripple Testing

### Issue 2 as System Validation

Issue 2 (adding delegation guidance to `FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md`) serves dual purpose:

1. **Primary**: Enhance canonical governance with delegation protocol
2. **Secondary**: Test auto-ripple system

### Expected Ripple Behavior

When governance-liaison updates `governance/canon/FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md`:

1. Change detected in canonical governance artifact
2. Ripple system identifies consumer repositories registered in `CONSUMER_REPO_REGISTRY.json`
3. Automated PRs created in consumer repos with ripple notices
4. Recently implemented auto-merge system evaluates changes
5. Low-risk governance updates auto-merge after gate validation
6. Higher-risk changes require human approval

### Validation Criteria

✅ **Success**:
- Issue 2 update to FOREMAN_AUTHORITY triggers downstream ripple
- Consumer repos receive automated PRs
- Auto-merge processes low-risk governance alignment
- Evidence trail shows ripple propagation
- No manual intervention required for standard governance updates

❌ **Failure Modes**:
- Ripple not triggered (detection failure)
- Consumer repos not notified (transport failure)
- Auto-merge blocks inappropriately (risk classification failure)
- Human intervention required for routine updates (automation gap)

### Strategic Value

This test validates the **cross-repository governance propagation system**, a critical capability for:

- Living canon maintenance
- Consistent governance across repos
- Reduced manual coordination overhead
- Faster governance evolution
- Audit trail integrity

**If ripple test succeeds**: Phase 2 cross-repo orchestration builds on proven foundation.  
**If ripple test fails**: Surface issues during controlled Phase 1 test rather than during complex Phase 2 rollout.

---

## Strategic Validation

### Architectural Soundness

All insights from this strategy session are **architecturally sound**:

✅ **POLC-Only Constraint**: Standard management separation of duties  
✅ **Delegation Protocol**: Established engineering handover practice  
✅ **Three-Tier Reference**: Clear authority hierarchy (constitutional → canonical → working)  
✅ **Work vs. Evaluation Mode**: Empirically validated, theoretically grounded  
✅ **Independent Assurance**: Industry-standard quality practice  

No conceptual risks identified. Implementation risks managed through phased approach.

### Phased Approach Manages Complexity

**Phase 1 (NOW)**: 
- Minimal changes to existing contracts
- No new protocols or agents
- Supports current MAT build focus
- Tests governance ripple in controlled context

**Phase 2 (AFTER MAT)**:
- Full protocol implementations
- New agent layers (Quality Professor)
- Enhanced orchestration
- Builds on proven Phase 1 foundation

**Risk Mitigation**: If Phase 1 enhancements cause issues, they are small and reversible. Phase 2 proceeds only after MAT is stable and Phase 1 is validated.

### Current Build Focus Preserved

**Primary Objective**: Complete MAT build successfully.

**Phase 1 Support**: 
- Enhances foreman supervision clarity
- Improves delegation handover quality
- Tests ripple system under controlled conditions
- Does NOT add protocol overhead during active development

**Phase 2 Deferral**:
- Quality Professor implementation waits
- Full invocation protocol waits
- Enhanced orchestration waits
- Complex changes deferred until build complete

**Result**: MAT build proceeds with existing, working systems. Enhancements stage incrementally without disruption.

### Foundation for Future Enhancements

Phase 1 establishes patterns that Phase 2 will expand:

- **Handover Quality Checklist** → Full Agent Invocation Protocol
- **POLC-Only Section** → Complete managerial constraint specification
- **Delegation Guidance** → Canonical delegation protocol
- **Ripple Test** → Full cross-repo orchestration

**Strategic Patience**: Move incrementally, validate continuously, build on proven foundations.

---

## References

### Related Strategies

- **`INDEPENDENT_ASSURANCE_EXECUTION_STRATEGY.md`**: Empirical validation of work-mode vs. evaluation-mode principle; why cross-checking works; strategic value of independent review
- **`CROSS_REPO_ORCHESTRATION_STRATEGY.md`**: Multi-repository coordination patterns; ripple propagation strategy; synchronized governance updates
- **`LIVING_CANON_ALIGNMENT_EXECUTION_PLAN.md`**: Canon maintenance and evolution protocols; alignment verification

### Governance Canon

- **`governance/canon/FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md`**: Current state of foreman authority definition (will be enhanced in Phase 1)
- **`governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md`**: Constitutional foundation for agent authority
- **`governance/canon/CROSS_REPOSITORY_RIPPLE_AWARENESS_MODEL.md`**: Ripple detection and propagation mechanisms

### Agent Contracts

- **`.github/agents/foreman-v2.agent.md`**: Current foreman contract (will be enhanced in Phase 1)
- **`governance/foreman-agent-contract.md`**: Legacy foreman contract reference

---

## Review and Evolution

### Review Triggers

This strategy document should be reviewed:

1. **After MAT Build Completes**: Transition decision from Phase 1 to Phase 2
2. **After Phase 1 Implementation**: Validate that minimal enhancements worked as expected
3. **After Ripple Test (Issue 2)**: Confirm governance propagation system functioning
4. **Before Phase 2 Kickoff**: Confirm readiness for full protocol implementation
5. **After Quality Professor Implementation**: Validate independent assurance value

### Evolution Path

**Phase 1 → Phase 2 Transition**:
- MAT build complete and stable
- Phase 1 enhancements validated and working
- Ripple test successful (Issue 2)
- Team capacity available for protocol work
- Human authority approval for Phase 2 initiation

**Phase 2 → Phase 3 (Future)**:
- Quality Professor operational and validated
- Agent Invocation Protocol in use
- Cross-repo orchestration mature
- Consider: Advanced orchestration patterns, multi-agent collaboration protocols, autonomous quality escalation

---

## Conclusion

This strategy captures a **disciplined, phased approach** to agent capability enhancement that:

- ✅ Validates profound insights (work-mode vs. evaluation-mode)
- ✅ Preserves current build focus (MAT completion priority)
- ✅ Stages complexity incrementally (Phase 1 minimal, Phase 2 comprehensive)
- ✅ Tests systems under controlled conditions (ripple validation)
- ✅ Builds on empirical evidence (independent assurance validation)
- ✅ Establishes foundation for future enhancements (protocols, agents, orchestration)

**Current State**: Strategy agreed and documented.  
**Next Step**: Issue 1, Issue 2, Issue 3 implementation (Phase 1).  
**Future State**: Phase 2 after MAT build completes.

**Strategic Alignment Achieved**: 2026-02-15

---

**End of Document**
