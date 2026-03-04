# Working Phase Proof — PR #1294 — Create Canon: IAA Pre-Brief Protocol

**Agent**: governance-repo-administrator-v2 (contract v2.0.0)  
**Session**: GA-20260303-IAA-PREBRIEF-PROTOCOL  
**Date**: 2026-03-03  
**PR**: APGI-cmy/maturion-foreman-governance#1294  

---

## Rationale Summary

PR #1294 introduces a proactive assurance mechanism to the governance system. Currently the IAA
acts only as a final-gate binary verditor; agents discover acceptance criteria only during
rejection, causing iterative reject-fix-reject cycles. This PR shifts assurance left by having
the IAA declare per-task acceptance criteria at wave start.

---

## Decision 1 — New Canon: `IAA_PRE_BRIEF_PROTOCOL.md` (v1.1.0)

**What**: Created a new canon artifact defining the complete IAA Pre-Brief Protocol.

**Why**: The issue acceptance criteria explicitly require: "New canon artifact is created to
define the IAA Pre-Brief Protocol, governing its trigger, content requirements, storage
location, and cross-agent interactions." A standalone canon (not just amendments to existing
canons) is necessary because the protocol introduces new governance behaviour spanning multiple
agents and requires a single authoritative reference document.

**Content rationale**:
- Pre-Brief trigger and qualifying task table: makes it machine-checkable which tasks need
  Pre-Brief coverage
- Wave Checklist Schema: standardises the `wave-current-tasks.md` format so IAA and Foreman
  have a shared contract; `[ ]`/`[x]`/`[~]` states cover all lifecycle outcomes
- Commit discipline (one tick = one discrete commit): prevents batch-ticking that could obscure
  when QP PASS actually occurred
- IAA Invocation Gate (CHECKLIST-GATE-001 to -005): each condition is an independent
  REJECTION-PACKAGE trigger, ensuring the gate cannot be partially satisfied
- Pre-Brief Amendment protocol: addresses the mid-wave task addition case explicitly so neither
  Foreman nor IAA needs to self-interpret the right behaviour
- Example Pre-Brief: provides a concrete reference for both Foreman and IAA, reducing
  ambiguity about the expected format

**Alternatives considered**:
- Embedding all Pre-Brief rules in the existing IAA canon → rejected because the protocol
  spans Foreman, builders, and IAA; a standalone reference document is cleaner and more
  maintainable
- Making Pre-Brief optional → rejected per issue requirement that missing Pre-Brief is a
  merge-blocker

---

## Decision 2 — Amendment to `INDEPENDENT_ASSURANCE_AGENT_CANON.md` (v1.0.0 → v1.1.0)

**What**: Added `§Proactive Assurance — Pre-Brief Protocol` section with Pre-Brief trigger, IAA
obligations, updated merge gate enforcement table (10 conditions), and the complete
CHECKLIST-GATE definitions.

**Why**: The issue requires "Proposal includes Tier 1 contract amendments for the IAA agent."
The IAA canon is the Tier 1 authority document for IAA behaviour. The amendment places the
Pre-Brief obligation at the canon level, making it non-bypassable via the existing IAA hard-
trigger authority mechanism.

**Alternatives considered**:
- Only amending the agent contract file, not the canon → rejected because agent contract files
  reference the canon as their authority; the canon must reflect the new requirement first

---

## Decision 3 — Tier 1 Contract Amendment: `independent-assurance-agent.md`

**What**: Added Step 2.4 (Wave Checklist Invocation Gate — blocking prerequisite before Phase 3)
and updated Step 3.5 (Pre-Brief and checklist cross-reference during handover proof review).

**Why**: Issue requires "Proposal includes Tier 1 contract amendments for the IAA agent (new
section: Proactive Assurance / Pre-Brief functionality)." Step 2.4 is placed in Phase 2 
(Session Start) because it must execute before any Phase 3 assessment — it is a gate, not
an assessment. Step 3.5 (Phase 4 review) is the natural location for Pre-Brief cross-reference
because that is where the PREHANDOVER proof is reviewed.

**Constraints**: This file carries SELF-ASSURANCE-001 and SELF-MOD-IAA-001 locks. Changes
authorised by CS2 via issue #1294. The IAA cannot assure this PR per SELF-ASSURANCE-001;
CS2 is the approval authority.

---

## Decision 4 — Tier 1 Contract Amendment: `foreman-v2.agent.md`

**What**: Added Section 3.0a (IAA Pre-Brief Invocation) and Section 3.0b (Wave Checklist
Management), updated PREHANDOVER proof template with `wave_checklist` block, and added
`IAA_PRE_BRIEF_PROTOCOL.md` to Operational Canon references.

**Why**: Issue requires "Proposal includes Tier 1 contract amendments for the foreman agent
(new section: Must invoke IAA for Pre-Brief after wave-current-tasks creation)." Sections 3.0a
and 3.0b are placed immediately before the existing Section 3.1 (Architecture-First Design) to
make clear that Pre-Brief invocation and checklist creation must precede any build wave
activity. The `wave_checklist` PREHANDOVER block is mandatory per the new protocol.

---

## Decision 5 — Atomic Integrity Index Update

**What**: Updated `governance/quality/agent-integrity/INTEGRITY_INDEX.md` and reference copies
for `foreman-v2.agent.md` and `independent-assurance-agent.md` with new SHA256 hashes.

**Why**: INTEGRITY_INDEX.md atomic update protocol states: "All agent contract edits in
`.github/agents/` MUST include a matching update to the reference copy and this index in the
same PR." This is a mandatory invariant; omitting it would cause IAA Step 3.6 to fail with a
SHA256 mismatch on every future PR.

---

## Risks and Constraints

| Risk | Mitigation |
|------|-----------|
| IAA contract amendment triggers SELF-ASSURANCE-001 | Acknowledged — CS2 is the assurance authority for this PR; IAA will HALT with SELF-ASSURANCE-001 if invoked on this PR |
| A-09 breach (PR opened before IAA invocation) | Recorded in FAIL-ONLY-ONCE; evidence artifacts created retroactively; IAA invoked this session |
| .github/agents/ changes need INTEGRITY_INDEX atomic update | Completed — reference copies and INTEGRITY_INDEX updated in this PR |

---

*governance-repo-administrator-v2 | Contract v2.0.0 | 2026-03-03*
