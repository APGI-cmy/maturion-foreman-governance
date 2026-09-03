# CS2-Bound Creation Appointment — Canonical ECAP Capability

**Appointment ID**: ISSUE1386-CANONICAL-ECAP-CREATION-20260903  
**Issued**: 2026-09-03  
**Issued by**: `foreman-v2` under CS2 authorization for issue #1386  
**Appointee**: `CodexAdvisor-agent`  
**Repository**: `APGI-cmy/maturion-foreman-governance`  
**Recovery stack**: PR #1381 → PR #1383 → PR #1384  
**Appointment status**: CREATION APPOINTMENT ISSUED — NOT EXECUTED

## Foreman decision

No lawful canonical ECAP capability is present in this checkout. The canonical
repository contains the ECAP protocol and historical ECAP evidence, but it does
not contain:

- a live `.github/agents/execution-ceremony-admin-agent.md` contract;
- a canonical ECAP Tier 2 knowledge bundle;
- a registered canonical ECAP bootstrap identity; or
- a current governed appointment path for that identity.

The tracked canonical agent contracts are `CodexAdvisor-agent.md`,
`foreman-v2.agent.md`, `governance-repo-administrator-v2.agent.md`, and
`independent-assurance-agent.md`. `mcp-servers/agent-bootstrap/agent-ids.js`
likewise does not register `execution-ceremony-admin-agent`. The existing
`governance/canon/EXECUTION_CEREMONY_ADMINISTRATION_PROTOCOL.md` is the
governance basis for the role, not a live agent capability.

## Decision evidence

Foreman verified the canonical checkout on 2026-09-03:

| Check | Result |
|---|---|
| `git ls-files '.github/agents/*'` | Four canonical contracts listed; no ECAP contract |
| `find .agent-workspace/execution-ceremony-admin-agent -maxdepth 2 -type f` | Historical session memories only; no Tier 2 index/bundle |
| `mcp-servers/agent-bootstrap/agent-ids.js` and `npm test` | Four registered IDs; `execution-ceremony-admin-agent` absent |
| `governance/canon/EXECUTION_CEREMONY_ADMINISTRATION_PROTOCOL.md` | ECAP-001 protocol present as role definition only |

The clean bootstrap test confirms the absence is a capability gap rather than
a failed test discovery: all four currently required agent IDs pass.

## Authorized CodexAdvisor mission

CodexAdvisor is appointed to create and return for Foreman verification a
canonical-only ECAP capability comprising:

1. a dedicated administrator-class
   `.github/agents/execution-ceremony-admin-agent.md` contract bound to
   `governance/canon/EXECUTION_CEREMONY_ADMINISTRATION_PROTOCOL.md`;
2. a complete ECAP Tier 2 bundle under
   `.agent-workspace/execution-ceremony-admin-agent/`, including its index,
   required induction/bootstrap knowledge, and session-memory structure;
3. an explicit canonical bootstrap identity and resolver registration for
   `execution-ceremony-admin-agent`; and
4. a governed Foreman appointment path, including the bounded appointment
   template and verification/return conditions needed to administer the
   recovery-stack Phase 4 package.

The contract, Tier 2 bundle, bootstrap identity, and appointment path must be
created as one traceable canonical capability. CodexAdvisor must not activate
the capability or claim that it is ready for recovery use.

## Required boundaries

The ECAP contract must preserve this separation:

| Role | Sole responsibility |
|---|---|
| Foreman | Managerial orchestration, substantive readiness, and ECAP appointment |
| ECAP | Ceremony administration and handover-bundle preparation only |
| IAA | Independent assurance and binary verdict only |

ECAP may administer evidence, reconciliation, scope, commit-state, and
handover-bundle artifacts for a bounded appointment. It may not make
substantive quality decisions, build or modify product/governance
implementation, invoke or replace IAA, waive gates, or override Foreman.

## Independent assurance requirements

Before any created contract or bootstrap registration is treated as governed:

- CodexAdvisor must provide executable validation and an evidence bundle;
- Foreman must verify the exact scope, identity, Tier 2 completeness, resolver
  behavior, and appointment boundaries;
- an independent IAA pre-brief is required before qualifying delegated work;
- an independent IAA review and dedicated assurance token are required before
  any readiness or handover claim; and
- CS2 remains the sole merge and activation authority.

No IAA verdict, token, readiness claim, or recovery-stack activation is made by
this appointment.

## Explicit exclusions

This appointment authorizes no merge, direct-main change, controller
activation, workflow alteration, trigger publication, ISMS layer-down, MMM
implementation, deployment/live-environment change, or modification of any
existing ISMS ECAP contract or consumer role. The canonical capability must
not be copied from an ISMS consumer repository or conflated with its ECAP
role.

## Prerequisites to advance

CodexAdvisor may begin only after CS2 confirms this appointment and the
recovery-stack branch remains the source of truth. Before Foreman issues a
bounded ECAP operating appointment, all of the following must be evidenced:

- the recovery prerequisites in PRs #1381, #1383, and #1384 are available and
  their documented blockers are respected;
- the four capability artifacts above exist in the canonical repository and
  pass contract, placeholder, Tier 2, and bootstrap tests;
- the created contract's canonical scope and exclusions are reviewed by
  Foreman;
- IAA pre-brief and final independent assurance are complete; and
- no artifact claims readiness before the independent assurance result is
  recorded.

**Return condition**: CodexAdvisor returns `CREATED_FOR_VERIFICATION` with
paths, hashes, test output, and scope evidence, or `BLOCKED` with the exact
missing prerequisite. Foreman then verifies and, only after independent
assurance, may issue a separate bounded ECAP appointment.
