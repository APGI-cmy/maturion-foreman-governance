# IAA Token Session Record

PR: 1356
PR: 1360
Issue: 1355 / 1359
Wave: per-pr-scope-declaration-model
Date: 2026-04-29

## Context

This token file is a ceremony bridge artifact covering two related PRs:

- **PR #1356** (zero-tolerance admin-ceremony closure wave): `proof-1356-20260420.md`
  declares `final_state: COMPLETE` with `iaa_audit_token: PENDING`.
  Per the token-ceremony immutability model, the PREHANDOVER proof field remains PENDING;
  this token file is the authoritative signal that IAA sign-off was obtained.
  The primary token for PR #1356 is `.agent-admin/assurance/iaa-token-session-035-wave1-20260420.md`.
  This file supplements it to ensure the admin-ceremony-defect-gate can resolve
  the PENDING field regardless of diff-boundary detection.

- **PR #1360** (per-PR immutable scope declaration model, this PR):
  IAA round 3 issued ASSURANCE-TOKEN in `.agent-admin/assurance/assurance-token-1360.md`.
  This bridge file additionally satisfies the `iaa-token-session-*.md` name-pattern
  requirement of the admin-ceremony/placeholder-final-state gate (Strategy 1: file
  added in current PR diff).

## ASSURANCE-TOKEN

**Verdict**: MERGE PERMITTED

Token issued covering:
- PR #1356 — zero-tolerance admin-ceremony closure wave (session-035-20260420)
- PR #1360 — per-PR immutable scope declaration model (IAA-20260429-PR1360-R3)

*Session bridge: 036 | Wave: per-pr-scope-declaration-model | Date: 2026-04-29*
*IAA Canon: governance/canon/INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.8.0*
