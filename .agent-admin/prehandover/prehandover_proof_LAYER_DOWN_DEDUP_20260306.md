# Prehandover Proof — Layer-Down Idempotency Fixes
**Agent**: governance-repo-administrator v2.0.0
**Session**: GA-20260306-LAYER-DOWN-DEDUP
**Date**: 2026-03-06
**Issue**: APGI-cmy/maturion-foreman-governance (Duplicate Layer-Down Issues and Ripple PRs — Two Missing Idempotency Guards)
**Authority**: CS2 (Johan Ras) — raised 2026-03-06
**iaa_audit_token**: ASSURANCE-TOKEN — IAA Session IAA-20260306-PR1307-R5 — MERGE PERMITTED (2026-03-06)

---

## wave_checklist

```yaml
wave_checklist:
  status: CS2_DIRECT_REVIEW_TRACK
  notes: >
    T4 (CI/workflow change) per IAA canon v1.3.0 — CS2-DIRECT-REVIEW ceremony is sufficient.
    Wave checklist infrastructure is Foreman-managed; T4 exemption applies.
```

---

## Problem Statement

Every auto layer-down from `maturion-foreman-governance` to consumer repos can produce duplicate
`[Layer-Down]` issues and duplicate ripple PRs. Two independent root causes were identified and fixed
in this PR.

---

## Acceptance Criteria Status

- [x] **AC-1**: `governance-layer-down-dispatch.yml` adds idempotency pre-check for existing open
  `[Layer-Down]` issues with the same `SHORT_SHA` before creating a new one.
- [x] **AC-2**: `consumer-alignment.yml.template` has a `concurrency:` block keyed on repository name.
- [x] **AC-3**: `consumer-alignment.yml.template` has a pre-PR dedup guard checking for existing open
  governance alignment PRs.
- [x] **AC-4**: `consumer-alignment.yml.template` updated so all consumer repos inherit the fix.
- [ ] **AC-5**: Duplicate issues/PRs in `maturion-isms` — out of scope for this governance-repo fix
  (requires separate action in consumer repo).

---

## Work Completed

### Files Changed

| File | Change Type | Summary |
|------|------------|---------|
| `.github/workflows/governance-layer-down-dispatch.yml` | Modified | Added idempotency guard before `gh api ... POST`: queries consumer repo for existing open `layer-down` issue matching `SHORT_SHA`, skips creation if found |
| `governance/executable/workflows/consumer-alignment.yml.template` | Modified | Added `concurrency:` block keyed on `github.repository` (cancel-in-progress: false) + `Check for existing alignment PR` dedup step before `Create alignment PR` |

---

## Evidence

✅ YAML syntax validated for both modified files (`python3 yaml.safe_load` — both returned VALID)
✅ CodeQL analysis: 0 alerts (actions ecosystem)
✅ Idempotency guard pattern matches existing reference implementation (`layer-up-trigger.yml` dup_check step)
✅ Branch-prefix dedup (`startswith(ALIGNMENT_BRANCH_PREFIX)`) is robust to future title changes
✅ `concurrency:` block uses `cancel-in-progress: false` so second run queues and hits dedup guard cleanly
✅ Protected file enforcement checked — `.github/workflows/` changes authorized by CS2 issue authority
✅ No canon files (`governance/canon/`, `governance/CANON_INVENTORY.json`) touched
✅ No agent contract files (`.github/agents/`) touched — B-06 compliance maintained
✅ PR-only write — no direct push to main
✅ IAA invoked pre-commit (A-09 compliant)

### CI Evidence

YAML lint (environment parity: local `python3 yaml.safe_load` == governance-gate.yml `workflow-yaml-lint` job):
```
VALID: .github/workflows/governance-layer-down-dispatch.yml
VALID: governance/executable/workflows/consumer-alignment.yml.template
```

### Environment Parity

Validation run locally using `python3 yaml.safe_load` — same validation method used by the
`workflow-yaml-lint` job in `.github/workflows/governance-gate.yml`. The governance-gate.yml
YAML regression test targets `governance-layer-down-dispatch.yml` specifically; this local
validation confirms the modified file passes that test equivalently.

---

## OPOJD Compliance

One Problem, One Job. This PR addresses a single scoped problem: duplicate layer-down issue and ripple
PR idempotency. All changes are scoped to the two identified root causes.

---

## Ripple Assessment

No constitutional canon files changed. Layer-down ripple not required.
The `consumer-alignment.yml.template` is updated so the fix propagates to consumer repos via the next
regular layer-down.

---

## Protected File Check

Files changed:
- `.github/workflows/governance-layer-down-dispatch.yml` — workflow file (CS2-authorized via issue)
- `governance/executable/workflows/consumer-alignment.yml.template` — governance executable template

Protected paths NOT touched: `governance/canon/`, `.github/agents/`, `governance/CANON_INVENTORY.json`

CS2 authority: issue raised by CS2 (Johan Ras) 2026-03-06 — sufficient authorization for workflow
file changes per issue authority.

---

*Authority: LIVING_AGENT_SYSTEM.md v6.2.0 | Session GA-20260306-LAYER-DOWN-DEDUP | 2026-03-06*
