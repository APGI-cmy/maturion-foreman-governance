# Roll Out Merge Gate Interface

**Version**: 1.0.0  
**Effective Date**: 2026-02-10  
**Authority**: CS2 (Johan Ras)

## Purpose

This runbook guides rollout of the **Merge Gate Interface** workflow template into a consumer repo.

---

## Steps

1. Copy the template:
   - Source: `governance/executable/workflows/merge-gate-interface.yml.template`
   - Target: `.github/workflows/merge-gate-interface.yml`
2. Ensure `governance/executable/scripts/` is present in the repo.
3. Open a PR and confirm the workflow runs.
4. Verify the three check contexts appear:
   - `Merge Gate Interface / merge-gate/verdict`
   - `Merge Gate Interface / governance/alignment`
   - `Merge Gate Interface / stop-and-fix/enforcement`
5. Update branch protection to require **only** those three checks.

---

## Common Failure Modes

- **Check context name mismatch**: Job name or workflow name differs from standard.
- **Workflow not running on PR**: `on: pull_request` missing or disabled.
- **Jobs skipped**: Conditional steps or missing evidence files cause skipped jobs and deadlocks.

---

## Verification Checklist

- [ ] PR shows exactly three standard check contexts
- [ ] Branch protection requires only those contexts
- [ ] Auto-merge does not deadlock
