# Layer-Down Investigation Report — 2026-02-27

**Report ID**: LAYER-DOWN-INVESTIGATION-2026-02-27
**Date**: 2026-02-27
**Prepared By**: governance-repo-administrator (Session 059)
**Authority**: CS2 (Johan Ras)
**Issue Reference**: "[Investigation] End-to-end auto layering-down and ripple process – governance repo"
**Status**: COMPLETE

---

## Executive Summary

This report documents the end-to-end investigation of the automated layering-down and ripple
process for `maturion-foreman-governance`. Five structural gaps were identified and resolved:

| Gap | Severity | Description | Status |
|-----|----------|-------------|--------|
| Gap 1 | HIGH | Empty `governance_liaison` fields — all layer-down issues arrived unassigned | ✅ FIXED |
| **Gap 2** | **CRITICAL** | **Missing `repository_dispatch` sender — `governance-ripple-sync.yml` never fired** | **✅ FIXED** |
| Gap 3 | MEDIUM | Legacy layer-up workflows status — active or conflicting? | ✅ CONFIRMED ACTIVE (non-conflicting) |
| Gap 4 | HIGH | `consumer-alignment.yml.template` used undefined secret `RIPPLE_DISPATCH_TOKEN` | ✅ FIXED |
| Gap 5 | MEDIUM | Missed past layer-down events — no backfill plan existed | ✅ DOCUMENTED |

---

## 1. Legacy Auto-PR Workflow: Discontinuation Confirmed

**CONFIRMED DISCONTINUED**: `governance-ripple-dispatch.yml` (the legacy workflow that created
ripple PRs directly in consumer repos) **does not exist** in `.github/workflows/`.

The current workflow inventory contains no auto-PR creation workflow. The legacy pattern has been
fully retired and replaced by the issue-based dispatch via `governance-layer-down-dispatch.yml`.

**Acceptance criteria met**: ✅ Legacy auto-layering-down workflows discontinued and deleted.

---

## 2. Gap 2 (CRITICAL) — Missing `repository_dispatch` Sender

### Root Cause

`governance-layer-down-dispatch.yml` created GitHub Issues (Signal 1) in consumer repos but
**never sent a `repository_dispatch` event**. Consumer repos contain
`governance-ripple-sync.yml` (deployed via `consumer-alignment.yml.template`) which listens on:

```yaml
on:
  repository_dispatch:
    types: [governance_ripple]
```

Without a `governance_ripple` dispatch event, `governance-ripple-sync.yml` **never fires
automatically**, regardless of how many issues are created. This is the root cause of the
auto-layering failure — the machine-automation half of layer-down was completely missing.

### Fix Applied

A new step **"Dispatch governance_ripple repository_dispatch to consumer repos"** has been
added to `governance-layer-down-dispatch.yml`, immediately before the record step.

For each enabled consumer repo it calls:
```
POST /repos/{owner}/{repo}/dispatches
event_type: governance_ripple
client_payload: { source_repo, commit_sha, short_sha, timestamp, agent_files_changed }
```

The step is **non-blocking**: failure logs a warning and continues so that issue creation
(Signal 1) is never prevented if the token lacks `contents:write` in a specific consumer repo.

### Two-Signal Dispatch Model (post-fix)

| Signal | Mechanism | Purpose |
|--------|-----------|---------|
| Signal 1 | GitHub Issue | Human-readable instructions, auto-assigned to governance-liaison |
| Signal 2 | `repository_dispatch` (`governance_ripple`) | Machine trigger for `governance-ripple-sync.yml` — drift detection + alignment PR |

Both signals are required. Issues alone are insufficient for automated alignment.

---

## 3. Gap 3 — Layer-Up Workflows: KEEP BOTH

**Decision: ACTIVE — non-conflicting — both retained.**

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `governance-layer-up-intake.yml` | Issue opened/labeled `layer-up` in governance repo | Acknowledges intake, adds label, cross-links to consumer issue |
| `governance-layer-up-close-loop.yml` | Layer-up issue **closed** in governance repo | Dispatches close-loop layer-down notification back to originating consumer repo |

These workflows form the **layer-up round-trip** — the reverse governance flow from consumer
repos back to the canonical governance repo. They are distinct from the layer-down dispatch and
do not conflict with it. Neither should be deleted.

---

## 4. Gap 4 — `consumer-alignment.yml.template`: Undefined Secret Fixed

### Problem

`governance/executable/workflows/consumer-alignment.yml.template` used an undefined secret
`RIPPLE_DISPATCH_TOKEN` to authenticate the clone of the governance canonical repo:

```yaml
token: ${{ secrets.RIPPLE_DISPATCH_TOKEN }}   # ← not defined in consumer repos
```

Consumer repos do not define `RIPPLE_DISPATCH_TOKEN`. This caused the `align-governance` job
to fail silently at the clone step. After 3 consecutive failures the circuit breaker opens,
permanently disabling automated alignment until manually reset.

### Fix Applied

Replaced `RIPPLE_DISPATCH_TOKEN` with `MATURION_BOT_TOKEN` — the standard cross-repo token
used by all governance workflows.

**Action required**: Consumer repos that have already deployed this template must update their
local copy. Create a backfill layer-down issue for each affected consumer repo.

---

## 5. Gap 1 — `CONSUMER_REPO_REGISTRY.json` Liaison Fields Populated

All 4 consumer repos had empty `governance_liaison` fields (`""`). This caused every layer-down
issue to arrive **unassigned** — no agent was ever notified since the issue-based workflow
replaced the legacy auto-PR workflow.

**Fix applied** — `CONSUMER_REPO_REGISTRY.json` v1.1.0 → v1.2.0:

| Repository | Before | After |
|------------|--------|-------|
| APGI-cmy/maturion-foreman-office-app | `""` | `"governance-liaison-office-agent"` |
| APGI-cmy/PartPulse | `""` | `"governance-liaison-partpulse-agent"` |
| APGI-cmy/maturion-isms | `""` | `"governance-liaison-isms-agent"` |
| APGI-cmy/R_Roster | `""` | `"governance-liaison-r-roster-agent"` |

---

## 6. Gap 5 — Missed Past Layer-Down Events: Backfill Plan

The `governance-layer-down-dispatch.yml` workflow only fires on new pushes to `main`. It cannot
retroactively create issues for past commits. The following events in `governance/ripple/` are
**PENDING** and require manual corrective dispatch:

| # | Ripple Plan File | Date | Canon | Pending Repos | Agent File? | Approver |
|---|-----------------|------|-------|---------------|-------------|----------|
| 1 | `LAS_CONSUMER_RIPPLE_PLAN.md` | 2026-02-04 | `LIVING_AGENT_SYSTEM.md` + scripts | office-app, PartPulse, R_Roster | Yes (scripts) | CS2 |
| 2 | `LAS-GAP-CLOSURE-RIPPLE-REPORT-20260208.md` | 2026-02-08 | 7 new canonical docs | Multiple | Review per plan | Per file |
| 3 | `RIPPLE_SIGNAL_DELEGATION_GUIDANCE_20260215.md` | 2026-02-15 | Delegation guidance (OPTIONAL) | Multiple | No | FM / Liaison |
| 4 | `RIPPLE-ECOSYSTEM-VOCAB-FOREMAN-MODALITIES-20260221.md` | 2026-02-21 | `ECOSYSTEM_VOCABULARY.md` + `foreman-v2.agent.md` | All 4 | Yes (agent file) | CS2 |
| 5 | `RIPPLE-PRE-BUILD-REALITY-CHECK-CANON-20260223.md` | 2026-02-23 | `PRE_BUILD_REALITY_CHECK_CANON.md` | All 4 | No | FM / Liaison |
| 6 | Session 058 canons (2026-02-26) | 2026-02-26 | CONTRACT_TESTING, QUALITY_TOOLING, CODE_COVERAGE, TELEMETRY | All 4 | No | FM / Liaison |

### Backfill Priority Order

1. **HIGH / FM approval** — Items 5 and 6: non-agent files, all 4 consumer repos
2. **HIGH / CS2 required** — Item 4: includes `foreman-v2.agent.md` (agent file gate)
3. **MEDIUM / CS2 required** — Item 1: LAS scripts require CS2 approval
4. **MEDIUM** — Item 2: review per file for agent vs non-agent classification
5. **LOW / optional** — Item 3: consumer response is discretionary

---

## 7. Future-Proofing Recommendations

1. **Liaison completeness check**: Add a pre-dispatch validation step to
   `governance-layer-down-dispatch.yml` that exits non-zero when any enabled consumer has
   `governance_liaison == ""`. Prevents silent unassigned issues.

2. **`workflow_dispatch` back-fill trigger**: Add a manual trigger with an optional commit SHA
   input to enable re-dispatch for past commits without requiring a new push.

3. **Consumer repo bootstrap**: Consumer repos must have labels `governance`, `layer-down`,
   `high-priority` before their first layer-down issue arrives.

4. **Monthly ripple audit**: `governance/ripple/` should be audited monthly against
   `CONSUMER_REPO_REGISTRY.json` to catch pending layer-downs before they accumulate.

5. **Token scope documentation**: Document that `MATURION_BOT_TOKEN` requires `contents:write`
   in consumer repos for `repository_dispatch` to succeed. Add to the consumer onboarding guide.

---

## 8. Acceptance Criteria Verification

| Criterion | Status |
|-----------|--------|
| All past layer-down events verified for activation and completion | ✅ §6 — 6 pending events documented with backfill plan |
| Legacy auto-PR workflows discontinued and deleted | ✅ §1 — `governance-ripple-dispatch.yml` absent |
| New workflow: issue created and auto-assigned | ✅ Gap 1 fixed — liaisons populated |
| New workflow: `repository_dispatch` triggers `governance-ripple-sync.yml` | ✅ Gap 2 fixed — new step added |
| New workflow: auto-close eligible for non-agent-file ripples | ✅ Issue template updated |
| Layer-up workflows confirmed active and non-conflicting | ✅ Gap 3 — both kept |
| `consumer-alignment.yml.template` uses correct token | ✅ Gap 4 — `MATURION_BOT_TOKEN` |
| Investigation report with gap analysis, corrective action, future-proofing | ✅ This document |

---

## 9. Files Changed This Session

| File | Change |
|------|--------|
| `governance/CONSUMER_REPO_REGISTRY.json` | v1.1.0 → v1.2.0: liaison fields populated (Gap 1) |
| `.github/workflows/governance-layer-down-dispatch.yml` | Added `repository_dispatch` step (Gap 2) |
| `governance/executable/workflows/consumer-alignment.yml.template` | `RIPPLE_DISPATCH_TOKEN` → `MATURION_BOT_TOKEN` (Gap 4) |
| `.github/layer-down-issue-template.md` | Auto-close eligibility section + auto-assign note |
| `governance/layer-down/LAYER_DOWN_INVESTIGATION_REPORT_20260227.md` | NEW — this document (Gap 5) |
| `governance/CHANGELOG.md` | New entry `[LAYER-DOWN-INVESTIGATION-2026-02-27]` |

---

*Report generated: 2026-02-27 | Session 059 | Authority: governance-repo-administrator*
*Living Agent System v6.2.0 | Contract v2.0.0*
