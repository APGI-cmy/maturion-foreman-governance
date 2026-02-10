# Implementation Entrypoint (Governance Rollout)

**Version**: 1.0.0  
**Effective Date**: 2026-02-10  
**Authority**: CS2 (Johan Ras)

## Purpose

Single entrypoint runbook for rolling out the governance implementation pack in consumer repositories.

---

## Preconditions

- **Required secrets** (see `governance/canon/MATURION_BOT_EXECUTION_IDENTITY_MODEL.md`):
  - `MATURION_BOT_TOKEN`
  - `RIPPLE_DISPATCH_TOKEN`
- **Least-privilege permissions**:
  - `MATURION_BOT_TOKEN`: Contents R/W, Pull requests R/W, Issues R/W (escalations), Actions R
  - `RIPPLE_DISPATCH_TOKEN`: Repository dispatch W, Contents R
  - **Forbidden**: Admin, secrets management, branch protection overrides
- **Operator access**: Repo admin to set branch protection + secrets

---

## Implementation Order (do in sequence)

1) **Merge gate interface workflow rollout**
   - Runbook: `governance/runbooks/ROLL_OUT_MERGE_GATE_INTERFACE.md`
   - Template: `governance/executable/workflows/merge-gate-interface.yml.template`

2) **Branch protection configuration (3 standard contexts only)**
   - Runbook: `governance/runbooks/CONFIGURE_BRANCH_PROTECTION.md`
   - Required contexts:
     - `Merge Gate Interface / merge-gate/verdict`
     - `Merge Gate Interface / governance/alignment`
     - `Merge Gate Interface / stop-and-fix/enforcement`

3) **Consumer registry update**
   - Update: `governance/CONSUMER_REPO_REGISTRY.json`
   - Use canonical `owner/repo` spelling for clarity (GitHub is case-insensitive).

4) **Ripple dispatcher enablement (governance repo)**
   - Workflow: `governance/executable/workflows/ripple-dispatcher.yml`
   - Runbook: `governance/runbooks/ROLL_OUT_RIPPLE_AND_ALIGNMENT.md`

5) **Consumer listeners + scheduled fallback**
   - Workflow template: `governance/executable/workflows/consumer-alignment.yml.template`
   - Runbook: `governance/runbooks/ROLL_OUT_RIPPLE_AND_ALIGNMENT.md`

6) **First controlled test (success + intentional failure)**
   - Create one PR that passes and one that intentionally fails a gate.
   - Capture evidence per `governance/canon/EVIDENCE_ARTIFACT_BUNDLE_STANDARD.md`.

---

## Linked References

- Canon:
  - `governance/canon/MERGE_GATE_INTERFACE_STANDARD.md`
  - `governance/canon/EVIDENCE_ARTIFACT_BUNDLE_STANDARD.md`
  - `governance/canon/GOVERNANCE_RIPPLE_DETECTION_PROTOCOL.md`
- Runbooks:
  - `governance/runbooks/ROLL_OUT_MERGE_GATE_INTERFACE.md`
  - `governance/runbooks/CONFIGURE_BRANCH_PROTECTION.md`
  - `governance/runbooks/ROLL_OUT_RIPPLE_AND_ALIGNMENT.md`
- Workflow templates:
  - `governance/executable/workflows/merge-gate-interface.yml.template`
  - `governance/executable/workflows/consumer-alignment.yml.template`
  - `governance/executable/workflows/ripple-dispatcher.yml`

---

## Troubleshooting / Common Failure Modes

- **Check contexts missing or renamed** → ensure workflow/job names match the merge gate standard.
- **Ripple dispatch not firing** → confirm `RIPPLE_DISPATCH_TOKEN` scope + `repository_dispatch` enabled.
- **Scheduled fallback never runs** → verify `schedule` block in consumer alignment workflow.
- **PR stuck due to extra required checks** → branch protection must require **only** the three standard contexts.
