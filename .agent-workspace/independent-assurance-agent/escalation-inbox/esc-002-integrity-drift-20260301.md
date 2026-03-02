# ESC-002 — Pre-existing Agent Integrity Drift

**Escalation ID**: ESC-002-20260301-integrity-drift
**Date Filed**: 2026-03-01
**Filed By**: independent-assurance-agent (IAA-20260301-PR1255)
**Escalation Type**: ESC-002 (integrity_violation_sha256_mismatch)
**Authority**: CS2 (Johan Ras / @APGI-cmy)
**Status**: OPEN — Awaiting CS2 action

---

## Finding

During assurance of PR #1255, IAA performed the mandatory INV-504 agent integrity check.
No agent files were changed in PR #1255. The check confirmed no drift was introduced by this PR.

However, live SHA256 hashes for all three INTEGRITY_INDEX-indexed agent files diverge from
their baselines set on 2026-02-24:

| Agent File | INTEGRITY_INDEX Baseline (2026-02-24) | Live SHA256 |
|-----------|---------------------------------------|-------------|
| `.github/agents/CodexAdvisor-agent.md` | `e2d75dd7d59b8064bbb44dec419062ea77bdf760bf6b4dcbaa71000d104cfb5d` | `fc5ff12aba9a3822cacb13218d1c7583559d0564ff8e4aaee60240475fc39792` |
| `.github/agents/foreman-v2.agent.md` | `5d9851a2b3e75ea0a488501c2fe836ae6301332af9df7ea9b71a9181062a0307` | `817eb9f674c1b57aad9cf873d9e7fd9c159ca9e6e5eba833f6e1694c289eee2e` |
| `.github/agents/governance-repo-administrator-v2.agent.md` | `4caa3d447a99c20bcdfad342d3645a7d285ee0a7d5be067e49ebdd4f2260105b` | `7b711ccdd85d122719ef162ce6e84e9c4775a42ebddbad2912fd43ce38390067` |

Git log confirms these files were last modified in the "Initial plan" commit (branch start point
representing the main branch state as of 2026-03-01). The drift was introduced in PRs merged
between 2026-02-24 (baseline) and 2026-03-01. Notably, session-059-20260227 explicitly modified
`governance-repo-administrator-v2.agent.md` without updating INTEGRITY_INDEX.md.

---

## Root Cause

`governance/quality/agent-integrity/INTEGRITY_INDEX.md` was not updated when agent files were
modified in session-059-20260227 (and possibly other sessions). The INTEGRITY_INDEX has not been
maintained as agent files evolved after the initial CS2 baseline on 2026-02-24.

---

## Required Action (CS2)

1. **Authorize an INTEGRITY_INDEX update**: Create a CS2-authorized PR to update
   `governance/quality/agent-integrity/INTEGRITY_INDEX.md` with the current verified SHA256 hashes
   for all three agent files (hashes listed above).

2. **Verify the agent file changes were CS2-authorized**: Confirm that each change to the agent
   files since 2026-02-24 had explicit CS2 authorization per A-005 (FAIL-ONLY-ONCE) and
   INDEPENDENT_ASSURANCE_AGENT_CANON.md Independence Requirements rule 4.

3. **Establish INTEGRITY_INDEX maintenance protocol**: Agent file changes must include an
   INTEGRITY_INDEX update in the same PR as an atomic operation. This gap should be captured
   as a FAIL-ONLY-ONCE rule addition or canon clarification.

---

## Blocking Status

This escalation does NOT block merge of PR #1255 (which does not touch agent files and does not
introduce the drift). PR #1255 is blocked only by the missing phase evidence artifacts documented
in REJECTION-PACKAGE.

The INTEGRITY_INDEX update must be addressed as a SEPARATE CS2-authorized action.

---

**IAA Session**: IAA-20260301-PR1255
**Date**: 2026-03-01
**Authority**: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.0.0 | ESC-002 protocol
