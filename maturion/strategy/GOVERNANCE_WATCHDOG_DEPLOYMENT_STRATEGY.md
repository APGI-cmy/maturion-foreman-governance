---
title: "Governance Watchdog Deployment Strategy"
version: 1.0.0
status: Agreed Strategy
created: 2026-03-04
authority: CS2 (Johan Ras)
strategy_id: GWDS-001
category: strategy
tags: [governance, watchdog, pre-brief, IAA, automation, gap-detection, proactive-assurance]
related:
  - governance/canon/INDEPENDENT_ASSURANCE_AGENT_CANON.md
  - governance/canon/IAA_PRE_BRIEF_PROTOCOL.md
  - governance/canon/AGENT_HANDOVER_AUTOMATION.md
  - governance/canon/UNIVERSAL_FAIL_ONLY_ONCE_POLICY.md
  - maturion/strategy/INDEPENDENT_ASSURANCE_EXECUTION_STRATEGY.md
---

# GOVERNANCE WATCHDOG DEPLOYMENT STRATEGY

**Type**: Governance Automation Strategy  
**Strategy ID**: GWDS-001  
**Authority**: Johan Ras (CS2)  
**Status**: Agreed Strategy  
**Version**: 1.0.0  
**Created**: 2026-03-04  
**Applies To**: All Maturion repositories under governance  
**Purpose**: Define the reusable pattern for automated governance gap detection — catching missing IAA pre-briefs, premature handovers, and work-without-PR before they reach the merge gate  
**Reference Implementation**: `APGI-cmy/maturion-isms` `.github/workflows/governance-watchdog.yml`

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Strategic Context — Why Proactive Enforcement Exists](#2-strategic-context--why-proactive-enforcement-exists)
3. [The Three Gap Patterns](#3-the-three-gap-patterns)
4. [Architecture — The Enforcement Loop](#4-architecture--the-enforcement-loop)
5. [Deployment Prerequisites](#5-deployment-prerequisites)
6. [Consumer Repo Adaptation Guide](#6-consumer-repo-adaptation-guide)
7. [Integration with Existing Workflows](#7-integration-with-existing-workflows)
8. [False Positive Management](#8-false-positive-management)
9. [Rollout Sequence](#9-rollout-sequence)
10. [Governance of This Strategy](#10-governance-of-this-strategy)
11. [Success Criteria](#11-success-criteria)

---

## 1. Executive Summary

### 1.1 The Problem

The Maturion Living Agent System mandates that the Independent Assurance Agent (IAA) is invoked at two points in every wave:

1. **Before work begins** — a pre-wave Pre-Brief that declares which tasks will be audited, what evidence will be required, and what canon overlays apply
2. **After work completes** — a final-gate PREHANDOVER audit that issues an ASSURANCE-TOKEN or REJECTION-PACKAGE

Both invocations depend entirely on the Foreman following protocol correctly. When the Foreman is under execution pressure, these steps have historically been missed, fabricated, or deferred — causing REJECTION-PACKAGEs, re-invocation cycles, and wave delays.

Governance rules exist for all these failure modes (FAIL-ONLY-ONCE registries, A-014, A-021, A-025, A-026, A-027). But **rules alone are not enforcement**. The gap between a written rule and a prevented failure requires automated detection.

### 1.2 The Solution

A single **Governance Watchdog** workflow deployed to each consumer repository that:

- Detects governance gaps **at the moment they occur**, not at the merge gate
- Posts structured `@copilot` alert comments with exact remediation steps
- Requires no changes to existing agent contracts, merge gate workflows, or pre-brief workflows
- Is fully complementary to `iaa-prebrief-inject.yml` (which generates the pre-brief) and `merge-gate-interface.yml` (which enforces evidence at merge)

### 1.3 Strategic Positioning

This strategy represents the **fourth layer** of the proactive assurance architecture:

```
Layer 1 — Agent contract (Foreman Phase 0) ........... Instructs the Foreman what to do
Layer 2 — iaa-prebrief-inject.yml .................... Triggers IAA pre-brief on wave-current-tasks push
Layer 3 — merge-gate-interface.yml ................... Enforces evidence at the merge gate
Layer 4 — governance-watchdog.yml (THIS) ............. Catches gaps mid-wave, before the gate
```

Each layer catches what the previous layer cannot. The watchdog is the only layer that fires **during** wave execution rather than at its start or end.

---

## 2. Strategic Context — Why Proactive Enforcement Exists

### 2.1 The Incident-to-Rule-to-Enforcement Loop

Every rule in the system's FAIL-ONLY-ONCE registries represents a real failure that was investigated, root-caused, and memorialised. The three watchdog gaps correspond directly to documented, recurring failure patterns:

| Gap | FAIL-ONLY-ONCE Rule(s) | Incident Pattern |
|---|---|---|
| Gap 1 — No PR for branch | Foreman A-003 (bootstrap directive) | Foreman commits implementation before opening a PR, causing the pre-brief injection to miss the PR |
| Gap 2 — Ready with no pre-brief | IAA A-006, A-014; Foreman A-014 | Foreman marks PR ready without invoking IAA pre-brief; detected at merge gate too late, causing REJECTION-PACKAGE and wave rework |
| Gap 3 — PENDING token at handover | IAA A-021, A-025; Foreman A-014 | Foreman pushes PREHANDOVER proof with `iaa_audit_token: PENDING` and closure language; IAA issues REJECTION-PACKAGE for missing token; same branch fails 3+ times consecutively (A-027 systemic gap) |

### 2.2 Why Rules Alone Are Insufficient

Rules in agent contract files are read at session start. Between session start and handover, the Foreman executes many implementation steps under time and context pressure. The rule exists; the breach still occurs. This is not a failure of the rule — it is a structural limitation of text-only enforcement.

Automated detection transforms a rule from a statement into a tripwire. The watchdog does not replace the rule; it makes the rule self-enforcing at the moment of breach.

### 2.3 The "Catch It Earlier" Principle

Every governance gap costs more the later it is detected:

```
Detected mid-wave by watchdog:   1× cost — one corrective action, no merge blocked
Detected at merge gate:          3× cost — PR blocked, IAA re-invoked, REJECTION-PACKAGE cycle
Detected post-merge (retrospective): 10× cost — archived breach, RCA required, FAIL-ONLY-ONCE update
```

The watchdog consistently moves detection to the lowest-cost point.

---

## 3. The Three Gap Patterns

### 3.1 Gap 1 — Foreman Commits to a Branch With No Open PR

**When it fires**: On every `push` to a non-main, non-exempt branch

**What it detects**: A push where no open PR exists for the branch

**Why it matters**: The `iaa-prebrief-inject.yml` workflow fires when `wave-current-tasks.md` is pushed, but it can only post an alert comment to an associated PR. If no PR exists, the injection silently produces no comment, and the Foreman may proceed through multiple implementation commits without a pre-brief ever being requested.

**What the alert does**: Posts a commit comment on the pushed SHA instructing the Foreman to open a PR immediately, explaining that the pre-brief cannot fire without one.

**Exempt branch patterns** (no alert posted):
- `governance/` prefix — governance and liaison branches
- `ripple-` prefix — ripple execution branches
- `governance-alignment` — automated alignment branches
- `dependabot/` prefix — dependency update branches

### 3.2 Gap 2 — PR Marked Ready With No IAA Pre-Brief Artifact

**When it fires**: On `pull_request: ready_for_review` event — the instant DRAFT → Ready transition occurs

**What it detects**: No `.agent-admin/assurance/iaa-prebrief-wave*.md` file exists on the branch at the moment of the transition

**Why it matters**: DRAFT → Ready is the Foreman's declaration that wave work is complete and ready for review. A missing pre-brief at this moment means Phase 0 was never executed. Catching it here — at the declaration — is the earliest possible detection point. Waiting for the merge gate means IAA has already issued a REJECTION-PACKAGE, triggering a full re-invocation cycle.

**What the alert does**: Posts a PR comment that directly invokes `@copilot` as IAA with full Phase 0 obligations, the current `wave-current-tasks.md` snippet (if available), and the exact pre-brief artifact path to generate.

**Exempt PR patterns** (no alert posted):
- Title contains `ripple:` (case-insensitive) — liaison ripple PRs
- Title contains `[WIP] Update governance artifacts` — governance maintenance PRs
- PR has both `governance` and `automated` labels — automated alignment PRs
- PR has `agent:liaison` label — liaison-authored PRs

### 3.3 Gap 3 — PREHANDOVER Proof Pushed With PENDING Token and Handover Language

**When it fires**: On `pull_request: synchronize` — every push to an open PR

**What it detects**: A `PREHANDOVER*.md` file was modified in the push AND contains `iaa_audit_token: PENDING` or no `iaa_audit_token` field AND the PR description or commit message contains handover/closure keywords

**Handover keywords detected**: `session summary`, `wave closure`, `WAVE CLOSED`, `phase complete`, `handover`, `PREHANDOVER`, `ready for review`, `merge ready`

**Why it matters**: This is the A-021/A-025 failure pattern. The Foreman writes the PREHANDOVER proof, commits it, and pushes it to the PR as part of the handover — but has not yet invoked IAA or recorded the token. The merge gate will catch this, but by then the Foreman has already declared completion. The watchdog fires on the push, before the Foreman marks the PR ready, giving a corrective window.

**What the alert does**: Posts a PR comment citing FAIL-ONLY-ONCE A-014, A-021 with the exact four-step remediation sequence.

**Idempotency guard**: Before posting, the workflow checks the last 20 PR comments for an existing `GOVERNANCE WATCHDOG — IAA Token Missing` alert. If found within the last 5 comments, no new alert is posted (prevents push-flood spam).

---

## 4. Architecture — The Enforcement Loop

### 4.1 Full System Diagram

```
Wave Start
    │
    ├── Foreman creates branch + commits wave-current-tasks.md
    │       │
    │       ├── [No PR?] ◄── Gap 1 watchdog fires: commit comment alert
    │       │
    │       └── [PR exists] iaa-prebrief-inject.yml fires → @copilot IAA Pre-Brief comment
    │                           │
    │                           └── IAA generates pre-brief → commits .agent-admin/assurance/iaa-prebrief-waveN.md
    │
    │── Foreman executes wave tasks
    │
    ├── Foreman commits PREHANDOVER proof with iaa_audit_token: PENDING
    │       │
    │       └── [PENDING + handover language?] ◄── Gap 3 watchdog fires: PR comment alert
    │
    ├── Foreman invokes IAA → ASSURANCE-TOKEN issued → token recorded in PREHANDOVER
    │
    ├── Foreman marks PR ready for review
    │       │
    │       └── [No pre-brief on branch?] ◄── Gap 2 watchdog fires: PR comment alert
    │
    └── merge-gate-interface.yml runs → final evidence validation → PASS
```

### 4.2 What Each Component Does (and Does Not Do)

| Component | Fires When | Does | Does NOT Do |
|---|---|---|---|
| `iaa-prebrief-inject.yml` | `wave-current-tasks.md` pushed | Invokes IAA to generate pre-brief | Enforce that pre-brief exists |
| `governance-watchdog.yml` Gap 1 | Push to branch with no PR | Alert Foreman to open PR | Block the push |
| `governance-watchdog.yml` Gap 2 | DRAFT → Ready transition | Alert IAA to generate pre-brief | Block the PR transition |
| `governance-watchdog.yml` Gap 3 | PREHANDOVER with PENDING token pushed | Alert Foreman to invoke IAA | Block the push |
| `merge-gate-interface.yml` | PR opened/updated | Final evidence validation | Mid-wave detection |

**Key design principle**: The watchdog posts alerts and instructs. It does not block. Blocking belongs exclusively to the merge gate. The watchdog's value is **early, actionable notification** — not an additional gate.

---

## 5. Deployment Prerequisites

Before deploying the Governance Watchdog to a consumer repository, the following must be in place:

### 5.1 Required Workflows

| Workflow | Purpose | Required By |
|---|---|---|
| `iaa-prebrief-inject.yml` | Pre-brief injection on `wave-current-tasks.md` push | Gap 2 alert references it |
| `merge-gate-interface.yml` | Final evidence enforcement at PR merge | Gap 3 alert references it |

If either is absent, the watchdog will still function but alert comments will reference workflows that do not exist. Deploy both workflows first, or adapt the alert text during adaptation (see §6).

### 5.2 Required Directory Structure

| Path | Purpose |
|---|---|
| `.agent-admin/assurance/` | Pre-brief artifact storage (`iaa-prebrief-waveN.md`) |
| `.agent-workspace/foreman-v2/personal/` | Foreman's `wave-current-tasks.md` location |

These directories must exist (even empty) for the watchdog to function correctly. The pre-brief inject workflow creates artifact files here; the watchdog reads from here.

### 5.3 Required Agent Contract Conventions

The Foreman agent contract must include:
- **Phase 0** — Pre-Brief Invocation section referencing `IAA_PRE_BRIEF_PROTOCOL.md`
- **PREHANDOVER proof** convention with `iaa_audit_token:` field
- **FAIL-ONLY-ONCE** registry with at minimum A-014 (PHASE_A_ADVISORY fabrication) and A-021 (commit before invocation)

If the Foreman contract does not include Phase 0, Gap 2 alert text will reference a phase that does not exist in the agent's contract. Align the Foreman contract before deployment.

### 5.4 GitHub Actions Permissions

The workflow requires:
```yaml
permissions:
  pull-requests: write
  issues: write
  contents: read
```

These are standard and do not require elevated repository permissions beyond what `iaa-prebrief-inject.yml` already uses.

---

## 6. Consumer Repo Adaptation Guide

When layering down the Governance Watchdog to a consumer repository, the following parameters must be adapted. All other logic is portable as-is.

### 6.1 Adaptation Parameters

| Parameter | Default (maturion-isms) | Adapt To |
|---|---|---|
| Pre-brief artifact path | `.agent-admin/assurance/iaa-prebrief-wave*.md` | Match the repo's assurance directory convention |
| `wave-current-tasks.md` path | `.agent-workspace/foreman-v2/personal/wave-current-tasks.md` | Match the repo's Foreman workspace path |
| PREHANDOVER file pattern | `PREHANDOVER*.md` (repo root) | Adjust if the repo stores PREHANDOVER proofs in a subdirectory |
| IAA token field name | `iaa_audit_token:` | Must match the PREHANDOVER proof template used in the repo |
| Branch exemption list | `governance/`, `ripple-`, `governance-alignment`, `dependabot/` | Add repo-specific exempt branch patterns |
| Handover keyword list | `session summary`, `wave closure`, `WAVE CLOSED`, `phase complete`, `handover`, `PREHANDOVER`, `ready for review`, `merge ready` | Extend if the repo uses additional closure phrases |

### 6.2 Adaptation Checklist

Before raising the layer-down PR:

- [ ] Confirm pre-brief artifact path matches the target repo's `.agent-admin/assurance/` convention
- [ ] Confirm `wave-current-tasks.md` path matches the target repo's Foreman workspace
- [ ] Confirm PREHANDOVER file naming pattern matches the target repo's convention
- [ ] Confirm `iaa-prebrief-inject.yml` is deployed in the target repo
- [ ] Confirm `merge-gate-interface.yml` or equivalent merge gate is deployed
- [ ] Confirm Foreman agent contract includes Phase 0
- [ ] Confirm `.agent-admin/assurance/` directory exists
- [ ] Add any repo-specific branch exemptions
- [ ] Validate YAML syntax (`yamllint .github/workflows/governance-watchdog.yml`)
- [ ] Test Gap 2 manually: open a DRAFT PR on a branch with no pre-brief, convert to Ready, confirm alert fires

### 6.3 Layer-Down Artifact

The layer-down PR for each consumer repo must include:
1. `.github/workflows/governance-watchdog.yml` — adapted for the target repo
2. A record in `GOVERNANCE_ARTIFACT_INVENTORY.md` if the repo maintains one
3. A PREHANDOVER proof referencing IAA invocation (per standard ceremony)

---

## 7. Integration with Existing Workflows

### 7.1 Relationship to `iaa-prebrief-inject.yml`

These two workflows are **complementary, not competing**:

- `iaa-prebrief-inject.yml` **generates** the pre-brief by posting an `@copilot` comment when `wave-current-tasks.md` is pushed
- `governance-watchdog.yml` Gap 2 **enforces** that the pre-brief exists at the DRAFT → Ready transition

The inject workflow fires at wave start. The watchdog fires at wave end (when the PR is marked ready). They address different failure points in the wave lifecycle.

### 7.2 Relationship to `merge-gate-interface.yml`

These two workflows are **sequential defence layers**:

- `governance-watchdog.yml` fires mid-wave with soft alerts (corrective, not blocking)
- `merge-gate-interface.yml` fires at merge with hard gates (blocking)

The watchdog catches gaps while correction is cheap. The merge gate is the absolute backstop. A gap that slips past the watchdog is still caught at the gate; the gate never relies on the watchdog having fired.

### 7.3 No Changes Required to Existing Workflows

Deploying `governance-watchdog.yml` requires **zero modifications** to:
- `iaa-prebrief-inject.yml`
- `merge-gate-interface.yml`
- `preflight-evidence-gate.yml` (if present)
- Any agent contract files
- Any FAIL-ONLY-ONCE registries
- The `.agent-admin/assurance/` directory structure

The watchdog is a pure addition. It reads from existing paths and posts to existing PR/issue threads.

---

## 8. False Positive Management

### 8.1 Gap 1 False Positives

**Scenario**: Governance liaison pushes directly to a branch without a PR as part of a ripple execution.  
**Mitigation**: Branch exemption list covers `governance/`, `ripple-`, `governance-alignment`.  
**Residual risk**: A liaison branch that does not follow the naming convention will trigger Gap 1.  
**Resolution**: Add the branch prefix to the exemption list during adaptation (§6.1).

**Scenario**: A push containing only files under `governance/`, `.agent-workspace/`, or `.agent-admin/` — pure governance artifact commits with no PR.  
**Mitigation**: Gap 1 includes an all-governance-files guard that suppresses the alert when every changed file is under a pure governance path.  
**Residual risk**: Low. Mixed commits (governance + code) will still alert.

### 8.2 Gap 2 False Positives

**Scenario**: A governance maintenance PR (ripple, liaison, inventory update) is converted from DRAFT to Ready. It has no pre-brief because it is a governance artifact update, not a wave build PR.  
**Mitigation**: Label checks (`governance` + `automated`, `agent:liaison`) and title pattern checks (`ripple:`) suppress the alert.  
**Residual risk**: A governance PR that does not carry the standard labels or title prefix will trigger Gap 2.  
**Resolution**: Ensure all liaison/ripple PRs carry the `agent:liaison` label or use the `ripple:` title prefix.

### 8.3 Gap 3 False Positives

**Scenario**: A Foreman pushes a session memory or PREHANDOVER proof stub early in the wave (not at handover), triggering Gap 3 because the token is PENDING and the PR description mentions "phase".  
**Mitigation**: The keyword list is scoped to strong handover signals. "Phase" alone is not in the list; `phase complete` is. Tune the keyword list during adaptation if false positives occur.  
**Idempotency guard**: Even if Gap 3 fires on an early stub push, it will not re-fire on subsequent pushes in the same PR if the alert is already present in recent comments.  
**Residual risk**: Low with standard keyword list.

---

## 9. Rollout Sequence

### 9.1 Phase 1 — Reference Implementation (maturion-isms) — COMPLETE

The reference implementation was deployed and validated in `maturion-isms`. All three gaps are confirmed to fire correctly. Alert text has been validated against the current Foreman and IAA agent contracts.

**Validation gate**: Survive 2–3 real waves in `maturion-isms` with at least one confirmed Gap 2 or Gap 3 detection event before proceeding to Phase 2.

### 9.2 Phase 2 — Governance Repository (`maturion-foreman-governance`)

**Priority**: High — the governance repository is where agent contracts are authored and where IAA REJECTION-PACKAGEs on agent contract PRs are most costly.

**Adaptation notes**:
- Gap 1: Add `governance/` branch prefix to exemptions (governance admin commonly pushes directly)
- Gap 2: The governance repo uses `CodexAdvisor` as the producing agent, not Foreman v2. Adapt the pre-brief artifact path if CodexAdvisor uses a different assurance directory
- Gap 3: PREHANDOVER file convention in the governance repo follows the same template; no adaptation needed

### 9.3 Phase 3 — Consumer Repositories

Deploy in order of wave activity:

| Repository | Notes |
|---|---|
| `maturion-foreman-office-app` | Straightforward — same agent stack as maturion-isms |
| `PartPulse` | Same pattern; confirm `.agent-admin/assurance/` exists |
| `R_Roster` | Same pattern; confirm `.agent-admin/assurance/` exists |

Each deployment is a standard governance layer-down ripple. The governance-liaison agent in each repo receives the signal, adapts the workflow per §6.1, and raises a PR.

### 9.4 Rollout Decision Gate

Do not proceed to Phase 2 until:
- [ ] At least 2 waves completed in `maturion-isms` post-watchdog deployment
- [ ] At least one Gap 2 or Gap 3 detection event confirmed in production (not just YAML syntax test)
- [ ] No confirmed false positives that blocked or confused agents
- [ ] This strategy document updated with production evidence in §11

---

## 10. Governance of This Strategy

### 10.1 Ownership

This strategy is owned by CS2 (Johan Ras). Changes to the strategy require CS2 approval.

### 10.2 Canonisation Path

This strategy is currently in `maturion/strategy/`. Upon completion of Phase 1 validation (§9.1), it will be promoted to `governance/canon/GOVERNANCE_WATCHDOG_CANON.md` — a normative requirements document. The strategy document will be retained as the rationale layer.

The canon document will specify:
- MUST requirements for watchdog deployment per consumer repo
- Minimum set of gap detectors (currently Gaps 1–3)
- Required adaptation parameters and their permitted ranges
- Integration requirements with `iaa-prebrief-inject.yml` and `merge-gate-interface.yml`

### 10.3 Version History

| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-03-04 | Initial strategy authored. Reference implementation deployed in `maturion-isms`. |

### 10.4 Related Canon and Governance Artifacts

| Artifact | Relationship |
|---|---|
| `governance/canon/INDEPENDENT_ASSURANCE_AGENT_CANON.md` | Defines IAA mandate, pre-brief protocol, ASSURANCE-TOKEN ceremony |
| `governance/canon/IAA_PRE_BRIEF_PROTOCOL.md` | Pre-brief trigger conditions, artifact requirements, Phase 0 obligations |
| `governance/canon/AGENT_HANDOVER_AUTOMATION.md` | Pre-handover merge gate parity, PREHANDOVER proof convention |
| `governance/canon/UNIVERSAL_FAIL_ONLY_ONCE_POLICY.md` | Per-agent FAIL-ONLY-ONCE registry requirements — root cause for all three gaps |
| `maturion/strategy/INDEPENDENT_ASSURANCE_EXECUTION_STRATEGY.md` | Strategic rationale for independent assurance and cross-agent verification |
| `maturion/strategy/CROSS_REPO_ORCHESTRATION_STRATEGY.md` | Cross-repo coordination strategy — watchdog is one enforcement layer in the broader coordination model |

---

## 11. Success Criteria

### 11.1 Deployment Success

- [ ] `governance-watchdog.yml` deployed to all target repositories (§9)
- [ ] All three gaps validated in at least one production detection event per repository
- [ ] Zero confirmed false positives blocking normal agent operations
- [ ] Strategy promoted to canon (§10.2) after Phase 1 validation

### 11.2 Operational Success

- [ ] Gap 2 detection rate: **every** DRAFT → Ready transition without a pre-brief generates an alert (zero misses)
- [ ] Gap 3 detection rate: **every** PREHANDOVER push with PENDING token + handover language generates an alert within the first 5 pushes on a PR (idempotency guard)
- [ ] Reduction in REJECTION-PACKAGE rate for PENDING token failures: target ≥50% reduction after 5 waves post-deployment
- [ ] Reduction in re-invocation cycles for missing pre-brief: target ≥50% reduction after 5 waves post-deployment

### 11.3 Evidence Record (To Be Updated)

| Metric | Target | Actual (post-Phase 1) |
|---|---|---|
| Gap 2 confirmed fires | ≥1 production event | TBD |
| Gap 3 confirmed fires | ≥1 production event | TBD |
| False positives | 0 blocking | TBD |
| REJECTION-PACKAGE rate reduction (PENDING token) | ≥50% over 5 waves | TBD |
| Pre-brief miss rate reduction | ≥50% over 5 waves | TBD |