# Rejection Tracking — PR #1319 — IAA-20260405-PR1319

**PR**: #1319 — copilot/canonise-pre-build-stage-model
**Date**: 2026-04-05
**IAA Session**: IAA-20260405-PR1319
**Verdict**: REJECTION-PACKAGE
**Verdict Artifact**: `.agent-admin/assurance/rejection-package-1319.md`

## Status
- REJECTION-PACKAGE issued: 2026-04-05
- Delivered to branch: YES — committed as `.agent-admin/assurance/rejection-package-1319.md`
- Notified to submitting agent: YES — IAA session response returned to copilot-swe-agent[bot]
- Acknowledgement received: CONFIRMED via correction addendum (correction-addendum-1319-r1-20260405.md cites IAA-20260405-PR1319)
- Resolution Status: RESOLVED — ASSURANCE-TOKEN issued IAA-20260405-PR1319-R1

## Remediation Items Required

| ID | Rule(s) | Summary |
|----|---------|---------|
| F1 | CORE-015/CORE-018 | Session memory absent from PR bundle |
| F2 | INV-502/INV-503 | INTEGRITY_INDEX.md and reference copy not updated for GA contract modification |
| F3 | A-026/A-028 | SCOPE_DECLARATION.md stale from different PR |
| F4 | OVL-AC-011 | No before/after SHA256 drift evidence for GA contract in PREHANDOVER |
| F5 | OVL-AC-012 | No cross-agent ripple assessment for agent contract change |
| F6 | OVL-KG-003 | No version history table in GRA FAIL-ONLY-ONCE.md |
| F7 | OVL-KG-004 | GRA knowledge index.md not updated to reflect v1.1.0 and IAA_PRE_BRIEF_PROTOCOL.md v1.2.0 |

## Resolution Status
All items: RESOLVED — all 7 findings addressed per correction-addendum-1319-r1-20260405.md

## Resubmission Requirements (A-030)
Per A-030, resubmission requires a Correction Addendum at:
`.agent-admin/assurance/correction-addendum-1319-r1-20260405.md`
documenting: (a) this REJECTION-PACKAGE session reference, (b) how each finding was addressed, (c) new session number requested.
