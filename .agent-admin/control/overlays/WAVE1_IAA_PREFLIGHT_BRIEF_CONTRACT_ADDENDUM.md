---
id: wave1-iaa-preflight-brief-contract-addendum
artifact_type: governance-control-overlay
agent_contract: false
description: Transitional overlay for IAA_PREFLIGHT_BRIEF contract alignment in governed waves.
governance:
  authority: CS2
  repository: APGI-cmy/maturion-foreman-governance
  path: .agent-admin/control/overlays/WAVE1_IAA_PREFLIGHT_BRIEF_CONTRACT_ADDENDUM.md
metadata:
  version: 1.0.0
  pr: 1373
---

# WAVE1 IAA_PREFLIGHT_BRIEF Contract Addendum

**Status**: Active overlay  
**Authority**: CS2  
**Scope**: Transitional governance waves requiring IAA pre-brief alignment

---

## 1. Overlay Purpose

This overlay binds current governed waves to the `IAA_PREFLIGHT_BRIEF` control while the repository transitions to the canonical wave-record model.

It exists to make pre-brief expectations explicit for gates and reviewers without changing product behaviour or runtime authority.

---

## 2. Required Alignment

For governance-canon PRs, the `IAA_PREFLIGHT_BRIEF` must confirm:

- affected canon files;
- ripple impact;
- consumer repositories affected;
- inventory alignment status;
- whether final assurance has been issued;
- whether any known blockers remain.

---

## 3. PR #1373 Overlay

PR #1373 creates `MATURION_AGENT_NETWORK_ORGANIGRAM.md` and a ripple record for consumer repositories.

IAA review must focus on:

1. whether the build/runtime agent split is clear;
2. whether Maturion-as-CS2 authority is staged and not prematurely granted;
3. whether APW specialist remains recommended but not active;
4. whether public APW retrieval is constrained to approved, public-safe, non-tenant knowledge;
5. whether inventory alignment is honestly disclosed as pending.

---

## 4. Non-Activation Rule

This overlay does not activate runtime specialists, public retrieval, App Management Centre CS2 authority, or registry mutations.
