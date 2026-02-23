# Maturion AI Usage & Scaling Strategy

> ⚠️ **SCOPE CLARIFICATION** (2026-02-23)
>
> This document governs **build-time agent model tiering** (Foreman/builder agent model assignment: Tier A/B/C).
> It does NOT govern runtime AI capability routing for ISMS modules.
>
> For runtime AI capability selection, provider dispatch, memory integration, and escalation routing
> across all ISMS modules, refer to the authoritative canon:
> **[governance/canon/AIMC_STRATEGY.md v1.0.0](../../governance/canon/AIMC_STRATEGY.md)**

**Version:** 1.0\
**Author:** CS2 (Johan Ras)\
**Purpose:** Define scalable AI model strategy for Orchestrator +
Specialist architecture\
**Date:** 2026-02-21

------------------------------------------------------------------------

# Executive Summary

This document defines the AI usage strategy supporting the
Orchestrator + Specialist architecture across all ISMS apps (MAT, PIT,
XDETECT, etc.).

The strategy is designed for:

-   Slow, stable growth
-   Cost control at scale
-   Model-agnostic flexibility
-   Governance alignment
-   Multi-million user scalability

The architecture remains model-independent. AI models are assigned by
role, cost tier, and risk level.

------------------------------------------------------------------------

# Core Principle: Model Tiering

The platform must not rely on a single premium model for all tasks.

Instead, implement a three-tier model strategy.

------------------------------------------------------------------------

## Tier A -- Lightweight / Low-Cost Model

**Purpose:** - Intent classification - Routing decisions - Mechanical
formatting - Low-risk tasks - Delegation transparency decision

**Examples:** - Claude Haiku (or equivalent) - Other lightweight
reasoning models

**Impact:** Handles \~60--70% of traffic at minimal cost.

------------------------------------------------------------------------

## Tier B -- Core Reasoning Model (Primary Engine)

**Purpose:** - Orchestrator synthesis - Specialist domain execution -
Multi-specialist chaining - Structured JSON output - Domain-heavy
reasoning

**Recommended Model:** - Claude Sonnet

**Role:** Primary operational intelligence for the platform.

------------------------------------------------------------------------

## Tier C -- Premium Escalation Model

**Purpose:** - Complex reasoning - Ambiguous risk analysis -
High-liability decisions - Multi-layer inference - Constitutional edge
cases

**Examples:** - Claude Opus (future tier) - GPT-class premium reasoning
model

**Usage Policy:** Triggered only when: - Confidence score is low -
Sentinel flags drift risk - Complexity threshold exceeded

Expected usage: \<5% of total volume.

------------------------------------------------------------------------

# Model Gateway Layer (Mandatory at Scale)

All AI calls must pass through an internal AI Gateway abstraction layer.

Orchestrator ↓ AI Gateway ├─ Claude Sonnet ├─ Claude Haiku ├─ GPT
fallback └─ Future models

**Why this matters:**

-   Avoid vendor lock-in
-   Enable redundancy
-   Manage cost dynamically
-   Allow provider experimentation
-   Future-proof architecture

Orchestrator must never directly call a specific vendor API.

------------------------------------------------------------------------

# Growth Phases

## Phase 1 -- Foundation (0--10k users)

-   Single provider (Claude Sonnet)
-   Focus on governance correctness
-   Capture detailed telemetry
-   No aggressive cost optimization

Priority: Stability \> Cost

------------------------------------------------------------------------

## Phase 2 -- Optimization (10k--100k users)

-   Introduce Tier A routing model
-   Maintain Sonnet for specialist execution
-   Implement response caching
-   Token compression for session memory
-   Basic cost monitoring dashboard

Expected cost reduction: 40--60%

------------------------------------------------------------------------

## Phase 3 -- Scale (100k--1M+ users)

-   Deploy full AI Gateway abstraction
-   Multi-provider redundancy
-   Auto model selection based on task complexity
-   Confidence-based escalation
-   Parallel validation (Guardian, Sentinel, Arbiter)

Introduce dynamic model assignment per agent class.

------------------------------------------------------------------------

# Model Assignment by Agent Class

  -----------------------------------------------------------------------
  Agent Class                          Model Tier
  ------------------------------------ ----------------------------------
  Orchestrator (routing)               Tier A

  Orchestrator (synthesis)             Tier B

  Specialist execution                 Tier B

  High-risk escalation                 Tier C

  Validation                           Tier A or rule-engine hybrid
  (Guardian/Sentinel/Arbiter)          
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# Cost Strategy at Large Scale

Example scenario: - 1M monthly active users - 10 AI interactions per
user - 4k tokens per interaction

Without tiering → Extreme cost exposure.

With tiering: - 60% Tier A - 35% Tier B - 5% Tier C

Result: Multi-million annual savings potential.

------------------------------------------------------------------------

# Governance Alignment

This AI strategy aligns with:

-   Unified identity requirement
-   Validation gate enforcement
-   Structured delegation protocol
-   Knowledge tier governance
-   Specialist domain isolation

Model selection does not alter governance hierarchy.

------------------------------------------------------------------------

# Strategic Decisions

1.  Use Claude Sonnet as primary engine.
2.  Introduce lightweight routing model at growth threshold.
3.  Build AI Gateway early.
4.  Separate routing, execution, and validation models.
5.  Optimize cost only after governance stability is proven.
6.  Maintain multi-provider capability.
7.  Avoid early fine-tuning until usage stabilizes.

------------------------------------------------------------------------

# Primary Risk

The greatest risk is not cost.

It is architectural instability due to: - Routing failure - Specialist
overlap - Memory contamination - Validation latency

Mitigation priority order:

1.  Governance correctness
2.  Telemetry visibility
3.  Model tiering
4.  Cost optimization
5.  Multi-provider redundancy

------------------------------------------------------------------------

# Conclusion

The Maturion platform should scale through structured model tiering,
strict governance enforcement, and provider abstraction.

Primary recommendation:

-   Tier A: Lightweight routing model
-   Tier B: Claude Sonnet as core reasoning engine
-   Tier C: Premium escalation model
-   AI Gateway abstraction mandatory
-   Multi-provider support by Phase 3

This ensures controlled, scalable growth from MVP to multi-million user
platform.

------------------------------------------------------------------------

End of Document
