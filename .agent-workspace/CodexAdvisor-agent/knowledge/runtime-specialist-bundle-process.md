# CodexAdvisor Runtime-Specialist Bundle Process

**Version**: 1.0.0
**Date**: 2026-09-18
**Authority**: CS2-approved prerequisite closure plan
**Applies to**: Orchestrator and specialist contract bundles for other agents only

This method governs agent-contract bundle design. It supplements the
applicable canonical role checklist and does not implement, deploy, register,
route, activate, or operate a specialist.

## 1. Authority and Scope Gate

Read the exact CS2 authorization and record the target, permitted files,
required outcomes, exclusions, acceptance criteria, assurance requirement,
and hard stops. Confirm the target is not CodexAdvisor. Stop on ambiguity or
when product, schema, migration, test, CI, runtime adapter, provider,
deployment, registry activation, routing activation, or specialist activation
is implied.

## 2. Current-State Audit

Read the target contract and relevant Tier 2 files. Record the version, class,
contract pattern, four-phase completeness, authority controls, operating
methods, registry and routing state, AIMC dependencies, QA-to-red obligations,
graceful-degradation needs, and actual status. Contract existence does not
prove activation.

## 3. Bundle Definition

Define the smallest complete governed bundle:

1. Target-agent Tier 1 contract.
2. Required Tier 2 operational files.
3. Registry or routing proposal, or separately authorized update.
4. AIMC dependency map.
5. QA-to-red traceability.
6. Truthful status and graceful-degradation handling.
7. Diff record, PREHANDOVER proof, session memory, and independent IAA
   evidence.

Map every component to an explicit authorization requirement.

## 4. Thin-Core Rule

`thin_core_living` may be used only for an orchestrator when
`four_phase_canonical` remains mandatory and operational. Tier 1 must retain
identity, authority, scope, prohibitions, escalation, phase scripts, and Tier
2 pointers. The subtype never weakens assurance, merge-gate, OPOJD, evidence,
memory, size, or protected-path controls.

## 5. Tier 2 Requirements

Tier 2 must provide the role method, input and output contract, authority
checks, dependency and failure handling, truthful status, graceful
degradation, evidence, escalation, and QA/assurance traceability. It must not
contain secrets, production data, or unauthorized implementation.

## 6. Registry, Routing, and AIMC Mapping

For every integration point, record the current state, proposed entry or
route, owner, dependency, readiness evidence, and separately authorized
implementation issue where required. A proposal is not an active route. AIMC
dependencies may be mapped but not implemented.

## 7. QA-to-Red Traceability

Map each requirement to observable behavior, negative condition, evidence
source, future implementation wave where outside scope, and assurance check.
Do not claim tests exist unless separately authorized tests are committed.

## 8. Activation-Readiness Gate

Use only these truthful states: `PLANNED`, `UNAVAILABLE`, `DEGRADED`,
`CONTRACT_READY`, `ACTIVATION_READY`, and `ACTIVE`. Contract-ready requires
the contract, Tier 2, evidence, and assurance. Activation-ready additionally
requires separately authorized runtime, registry, routing, dependency,
security, deployment, and validation evidence. Active means activation has
actually occurred. Contract existence alone proves none of these states.

## 9. Graceful Degradation and Review

Define behavior for unavailable, degraded, or invalid specialist output. A
fallback must not fabricate results or silently bypass controls. Maturion must
review and validate specialist output before responding to a user.

## 10. Protected Boundaries and Completion

CodexAdvisor may modify other agents' contracts only under exact CS2
authority and may never modify its own contract. IAA remains independent and
blocking; CS2 remains the sole merge authority. Before handover, confirm
checklist and method loading, four phases, authorized paths, size, QP, parity,
OPOJD, evidence, and draft PR status pending final IAA. Completion does not
authorize implementation, propagation, activation, or a successor wave.
