# Roll Out Ripple Dispatch + Consumer Alignment

**Version**: 1.0.0  
**Effective Date**: 2026-02-10  
**Authority**: CS2 (Johan Ras)

## Purpose

This runbook enables cross-repo ripple dispatch and scheduled alignment for consumer repositories.

---

## Step 1: Create Secrets

Create these secrets in each consumer repo:

- `MATURION_BOT_TOKEN` (fine-grained PAT, PR creation)
- `RIPPLE_DISPATCH_TOKEN` (dispatch listener)

---

## Step 2: Enable Dispatch Listener

1. Copy template:
   - `governance/executable/workflows/consumer-alignment.yml.template`
   - to `.github/workflows/consumer-alignment.yml`
2. Ensure the executable pack is layered down in the consumer repo:
   - `governance/executable/scripts/` must exist (alignment workflow fails fast if missing)
3. Ensure repository dispatch events are allowed.
4. Confirm the workflow lists `repository_dispatch` with type `governance_ripple`.

---

## Step 3: Enable Schedule

Verify the workflow includes:

```
  schedule:
    - cron: "0 * * * *"
```

---

## Step 4: Verification Steps

### Push Ripple
- Make a governance change in the governance repo.
- Confirm a `repository_dispatch` event triggers in the consumer repo.
- Verify alignment workflow starts immediately.

### Scheduled Fallback
- Wait for next scheduled run (hourly).
- Confirm the workflow executes and updates `.agent-admin/governance/sync_state.json`.

### Circuit Breaker
- Simulate repeated failures (e.g., remove token).
- Confirm the workflow stops after max retries and raises an issue.

---

## Evidence Checklist

- [ ] `.agent-admin/governance/ripple-log.json` updated
- [ ] `.agent-admin/governance/sync_state.json` updated
- [ ] Alignment PR created when drift detected
