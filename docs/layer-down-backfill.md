# Layer-Down Manual Backfill Guide

**Authority**: `governance/canon/CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md`  
**Audience**: CS2 (Johan Ras), Governance Administrator, any operator with repo write access

---

## When to Use This Guide

Use this guide when any of the following apply:

- One or more consumer repos are out of sync with the governance master (e.g. after a pipeline outage).
- The `governance-layer-down-dispatch` workflow experienced YAML parse errors, token errors, or silent failures that prevented dispatch.
- A new consumer repo was added to `CONSUMER_REPO_REGISTRY.json` and needs its first layer-down backfill.
- You want to re-dispatch canons to all consumer repos after a confirmed gap period.

---

## How to Trigger a Manual Backfill

### Option 1 — Via GitHub UI (Recommended)

1. Navigate to **Actions → Governance Layer-Down Dispatch** in this repository:  
   `https://github.com/APGI-cmy/maturion-foreman-governance/actions/workflows/governance-layer-down-dispatch.yml`

2. Click **"Run workflow"** (top right).

3. In the **"Reason for manual dispatch (for audit log)"** field, enter a brief reason, e.g.:  
   `backfill: missed canons 2026-02-01 to 2026-03-01 due to YAML parse failures`

4. Click **"Run workflow"** to confirm.

The workflow will:
- Create a `[Layer-Down]` issue in every enabled consumer repo in `CONSUMER_REPO_REGISTRY.json`.
- Send a `governance_ripple` `repository_dispatch` event to every enabled consumer repo, triggering their ripple-sync workflow.
- Record a dispatch log in `.agent-admin/ripple/`.
- **Fail the job** (non-zero exit) and upload a `dispatch-failure-log-<run_number>` artifact if any individual dispatch failed — no silent failures.

### Option 2 — Via GitHub CLI

```bash
gh workflow run governance-layer-down-dispatch.yml \
  --repo APGI-cmy/maturion-foreman-governance \
  --field reason="backfill: missed canons 2026-02-01 to 2026-03-01"
```

---

## Verifying the Backfill Succeeded

After the workflow run completes:

1. **Check the workflow run summary** in Actions. All steps should show ✅.
2. **Check the "Fail job if any dispatches failed" step** — if green, all repos received the dispatch.
3. **Verify issues were created** in each consumer repo (look for `[Layer-Down]` issues opened by `APGI-cmy`):
   - `https://github.com/APGI-cmy/maturion-foreman-office-app/issues`
   - `https://github.com/APGI-cmy/PartPulse/issues`
   - `https://github.com/APGI-cmy/maturion-isms/issues`
   - `https://github.com/APGI-cmy/R_Roster/issues`
4. **Verify ripple-sync workflows triggered** in each consumer repo (look for `governance-ripple-sync` workflow runs triggered by the `governance_ripple` event).

---

## If a Dispatch Fails

If the "Fail job if any dispatches failed" step turns red:

1. Download the **`dispatch-failure-log-<run_number>`** artifact from the workflow run summary page.
2. The file lists which repos failed and which operation failed (`issue-create:<repo>` or `ripple-dispatch:<repo>`).
3. Common causes:
   - **`MATURION_BOT_TOKEN` secret expired or missing**: Re-generate and update the secret in repo settings.
   - **`RIPPLE_DISPATCH_TOKEN` secret missing**: Acceptable fallback is `MATURION_BOT_TOKEN`; verify that secret is set.
   - **Consumer repo renamed or archived**: Update `governance/CONSUMER_REPO_REGISTRY.json` to correct the `repository` field or set `enabled: false`.
   - **Labels `governance`, `layer-down`, `high-priority` missing in consumer repo**: Create the labels manually or via `gh label create`.
4. Fix the root cause, then re-trigger the backfill workflow.

---

## Checking Which Canons Were Missed

To list canons added or modified since a given date:

```bash
git log --since="2026-02-01" --name-only --pretty=format: -- governance/canon/ | sort -u | grep -v '^$'
```

This outputs all governance canon files changed since 2026-02-01. These are the files that should have been layer-downed to all consumer repos.

---

## Adding or Disabling a Consumer Repo

Edit `governance/CONSUMER_REPO_REGISTRY.json`:

- To **add** a new consumer, add an entry with `"enabled": true` and a valid `"governance_liaison"` GitHub username.
- To **disable** a consumer temporarily (e.g. during repo migration), set `"enabled": false`.
- Changes to the registry trigger a layer-down dispatch automatically on merge to `main`.

---

*Auto-generated as part of issue resolution for [Fix governance layer-down dispatch: missed canons, silent failures, legacy signals](https://github.com/APGI-cmy/maturion-foreman-governance/issues).*
