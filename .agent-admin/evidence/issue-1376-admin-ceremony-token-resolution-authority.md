# Issue #1376 — Admin-Ceremony Historical Token Resolution Authority

**Date**: 2026-07-28  
**Repository**: `APGI-cmy/maturion-foreman-governance`  
**Issue**: #1376  
**Authority**: CS2 — Johan Ras  
**Execution state**: AUTHORIZED; IMPLEMENTATION NOT STARTED

## Authorized instruction

> Authorized—open a separate bounded repair for the inherited Admin-Ceremony defects from
> PRs #1360, #1368, and #1356, obtain independent IAA and merge it, then re-run ECAP and
> final IAA for PR #1375.

## Reproduced defect

The `admin-ceremony/placeholder-final-state` job scans all immutable COMPLETE PREHANDOVER
proofs. On a pull-request event, it currently assigns the active pull request number to every
historical proof. Existing dedicated IAA token files for PRs #1356, #1360, and #1368 are
therefore not resolved while another PR is active, and their deliberately immutable
`PENDING` proof fields are falsely reported as unresolved.

## Bounded repair

- add executable regression fixtures before implementation;
- derive each proof's own PR identity deterministically;
- resolve only a genuine dedicated IAA token that references that proof-specific PR;
- fail closed on missing, malformed, ambiguous, or cross-PR evidence;
- preserve the historical PREHANDOVER proofs and IAA tokens byte-for-byte;
- complete Foreman QP, ECAP, independent final IAA, merge, and post-merge verification;
- return to PR #1375 only after the repair is verified on canonical `main`.

## Prohibited actions

- no waiver, allowlist, suppression, unconditional bypass, or weakening of the gate;
- no mutation of the historical PR #1356, #1360, or #1368 proof/token artifacts;
- no CANON semantic change, agent-contract change, consumer change, ISMS/MMM/Supabase work,
  deployment, or live-environment mutation;
- no change to PR #1375's provenance implementation.

## Opening checkpoint

This carrier opens the governed lane only. It grants no builder authority and records no
claim of QA, implementation, QP, ECAP, final IAA, or merge readiness.
