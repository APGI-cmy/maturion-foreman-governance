# Layer-Down Ripple Notice — POLC Execution Model Canon

**Ripple ID**: RIPPLE-EXECUTION-MODEL-CANON-20260506
**Issued By**: Governance Repository (copilot — canon alignment PR)
**Date**: 2026-05-06
**Source Repo**: APGI-cmy/maturion-foreman-governance
**Ripple Trigger**: Canon alignment — require explicit `execution_model` for implementation PRs to remove POLC role ambiguity
**Layer-Down Type**: PUBLIC_API — mandatory propagation to all consumer repos
**Reference Issue**: Canon alignment: require explicit execution_model for implementation PRs to remove POLC role ambiguity

---

## Summary of Changes

This ripple notifies consumer repositories of the following governance changes made in the source repository. These changes introduce a mandatory `execution_model` field for any PR that changes implementation files. Consumer repositories must reflect these changes in their PR manifests, merge gate validators, and agent contracts.

### Changed Files

| File | Change |
|------|--------|
| `governance/canon/POLC_EXECUTION_MODEL_CANON.md` | NEW — v1.0.0: Defines explicit execution model requirements for implementation PRs |
| `governance/canon/MMM_SIMPLE_PR_ADMIN_MODEL.md` | v1.0.0 → v1.1.0: Added `execution_model` field and Execution Model section |
| `.github/scripts/validate-simple-pr-admin.sh` | Added Check 13 — enforces `execution_model` for implementation PRs |

---

## Normative Changes That Must Propagate

### 1. `execution_model` is now mandatory for implementation PRs

Any PR that changes implementation files (under `apps/`, `src/`, `modules/`, `lib/`, `packages/`) MUST declare an `execution_model` field in its governing manifest.

Allowed values:

| Value | When to use |
|---|---|
| `builder-governed` | Implementation PR directly owned by an authorised builder agent |
| `foreman-orchestrated` | Foreman scopes work and delegates implementation to a builder |
| `cs2-hotfix-override` | Scoped emergency exception explicitly approved by CS2 |

**Failing without this field**:
```
Implementation files changed, but execution_model is missing.
Declare builder-governed, foreman-orchestrated, or cs2-hotfix-override.
```

### 2. Required companion fields per execution model

| `execution_model` | Required companion fields |
|---|---|
| `builder-governed` | `implementing_agent` |
| `foreman-orchestrated` | `orchestrating_agent`, `implementing_agent` |
| `cs2-hotfix-override` | `cs2_justification` (non-empty) |

### 3. Gate resolution order

Merge gates evaluating implementation PRs must now resolve role authority in this order:

1. Read `execution_model` from the active PR manifest.
2. If implementation files changed and `execution_model` is **missing** → FAIL immediately.
3. If `execution_model = builder-governed` → require `implementing_agent`; no Foreman delegation evidence required.
4. If `execution_model = foreman-orchestrated` → require `orchestrating_agent`, `implementing_agent`, and delegation evidence (`agents_delegated_to`).
5. If `execution_model = cs2-hotfix-override` → require non-empty `cs2_justification` and CS2 sign-off.
6. Runtime identity, PR labels, and optional Foreman memory are **secondary compatibility signals only**, not primary role authority.

### 4. Role inference prohibition

Any gate, script, or agent contract that currently classifies governed role from:
- shared Copilot runtime identity,
- PR author alone,
- labels (`copilot-builder-role`, etc.),
- presence/absence of Foreman session memory, or
- presence/absence of PREHANDOVER proof

MUST be updated to use `execution_model` as the primary signal.

---

## Required Actions in Consumer Repos

### `APGI-cmy/maturion-isms` (priority target)

| Action | Priority | Files to Review/Update |
|--------|----------|------------------------|
| Extend `.admin/pr.json` schema to support `execution_model` and companion fields | HIGH | `.admin/pr.json`, `.admin/pr.template.json` |
| Update POLC Boundary Validation gate | HIGH | `.github/workflows/` POLC gate workflow |
| Update `builder-involvement-check` to use `execution_model` as primary signal | HIGH | `.github/scripts/builder-involvement-check.*` |
| Update `foreman-implementation-check` to use `execution_model` as primary signal | HIGH | `.github/scripts/foreman-implementation-check.*` |
| Update `validate-simple-pr-admin.sh` (if a local copy exists) to include Check 13 | HIGH | `.github/scripts/validate-simple-pr-admin.sh` |
| Review handover-claim gate for role-authority references | MEDIUM | Handover-claim gate script/workflow |
| Review agent contracts for role inference from runtime identity or labels | MEDIUM | `.github/agents/*.agent.md` |
| Update any FAIL-ONLY-ONCE entries that permitted role inference from secondary signals | LOW | Agent FAIL-ONLY-ONCE registries |

### All other consumer repos

| Action | Priority |
|--------|----------|
| Extend PR manifest schema with `execution_model` field | HIGH |
| Update PR validators to enforce Check 13 equivalent | HIGH |
| Update POLC gate scripts to use `execution_model` as primary signal | HIGH |

---

## Non-Goals (carried from canon)

- Do not reintroduce heavy PREHANDOVER/LUIEP ceremony for ordinary product-fix PRs.
- Do not weaken POLC role separation.
- Do not allow Foreman to implement production code directly.
- Do not make labels the primary role authority.
- Do not rely on shared Copilot runtime identity to classify governed role.

---

## References

- `governance/canon/POLC_EXECUTION_MODEL_CANON.md` — full specification
- `governance/canon/MMM_SIMPLE_PR_ADMIN_MODEL.md` v1.1.0 — updated schema
- `.github/scripts/validate-simple-pr-admin.sh` — Check 13 implementation

---

**Authority**: Governance Repository | 2026-05-06
