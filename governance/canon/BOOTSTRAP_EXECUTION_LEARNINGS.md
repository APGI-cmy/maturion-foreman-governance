# Bootstrap Execution Learnings

This document records structural learnings identified during
manual bootstrap execution (Wave 0).

These learnings inform future governance canon,
FM application automation, and delegated execution models.

Entries are additive and non-retroactive.

## BL-0001 — Governance Stabilisation Must Precede FM Recruitment

**Context:** Pre-Batch 3 (Governance Hardening & Readiness)

**Observed Issue:**  
FM recruitment was initially attempted while governance artifacts and authority boundaries were still in flux.

**Root Cause:**  
No explicit rule existed requiring governance lock and layer-down completion before FM activation.

**Learning:**  
Governance MUST be stabilised, locked, and layered down before FM is recruited or granted planning authority.

**Governance Impact:**  
Informs FM recruitment sequencing and Batch entry conditions.

**Status:** Recorded

## BL-0002 — Readiness Certification Is a Governance Function, Not an Execution Trigger

**Context:** Batch 3A — Final Readiness Certification

**Observed Issue:**  
Risk of interpreting readiness certification as implicit execution authorization.

**Root Cause:**  
Readiness and execution were not explicitly separated in early mental models.

**Learning:**  
Readiness certification records system state and constraints only; execution authority must be granted explicitly and separately.

**Governance Impact:**  
Clarifies Batch 3A vs Batch 3B boundary.

**Status:** Recorded

## BL-0003 — FM Identity Must Be Canonical Before Recruitment

**Context:** Batch 3B Entry Preparation

**Observed Issue:**  
Multiple legacy FM agent definitions created ambiguity in authority and scope.

**Root Cause:**  
Historical agent contracts were not deprecated before reuse.

**Learning:**  
Exactly one canonical FM agent definition MUST exist before FM recruitment. Legacy definitions must be removed or explicitly deprecated.

**Governance Impact:**  
Informs agent canonicalisation requirements and FM onboarding rules.

**Status:** Recorded

## BL-0004 — Bootstrap Execution Proxy Is a Governance-Safe Deviation

**Context:** Batch 3B — Wave 0 Bootstrap Execution

**Observed Issue:**  
FM could not perform GitHub platform actions prior to full automation.

**Root Cause:**  
Delegated execution pathways were not yet operational.

**Learning:**  
A human execution proxy may perform mechanical platform actions during bootstrap, provided authority, instruction, and auditability remain with FM and governance.

**Governance Impact:**  
Informs Bootstrap Execution Proxy clause and future automated delegation design.

**Status:** Recorded

### BL-0005 — Execution Visibility Gap Without Runtime

Context:
During Wave 0.2 task assignment dry run, FM correctly assigned tasks and established execution tracking.
However, CS2 experienced loss of real-time visibility into execution progress.

Observation:
GitHub provides no native mechanism for:
- long-running agent execution
- progress signaling
- background task monitoring
- agent wake/sleep awareness

Impact:
- FM appears inactive after assignment
- CS2 must manually poll for progress
- Execution continuity relies on human vigilance

Conclusion:
This is not an FM or governance defect.
This is an architectural gap requiring a runtime execution monitor.

Resolution Path (Future):
- Implement Maturion Runtime Execution Monitor inside FM App
- Provide UI-level execution state, timers, and alerts
- Enable FM to be event-driven rather than manually polled

Bootstrap Handling:
- During Wave 0 execution, CS2 acts as runtime observer
- Static execution trackers are acceptable temporarily

Formalisation Requirement:
This learning mandates the creation of a canonical specification for a
“Maturion Runtime Execution Monitor”.

This specification MUST be authored before any attempt to automate
execution, delegation, or progress monitoring, and MUST define:
- Responsibilities
- Authority boundaries
- Prohibited behaviors
- Governance integration
- Audit requirements

Reference Specification:
MATURION_RUNTIME_EXECUTION_MONITOR_SPEC.md
