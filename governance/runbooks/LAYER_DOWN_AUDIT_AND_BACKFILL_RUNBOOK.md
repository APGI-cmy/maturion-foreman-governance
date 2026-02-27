# Layer-Down Audit and Backfill Runbook

**Version**: 1.0.0
**Effective Date**: 2026-02-27
**Authority**: CS2 (Johan Ras)
**Maintained By**: governance-repo-administrator

---

## Purpose

This runbook defines the formal protocol for governance agents to:

1. Perform periodic audits of layer-down dispatch completeness.
2. Identify undispatched (missed) layer-down events.
3. Trigger manual backfill dispatches to recover from missed events.
4. Verify sync state of all consumer repos against the current registry.

All missed layer-down events **must** be remediated with traceable backfill issues.
Silent compliance drift is a governance breach (FAIL-ONLY-ONCE Rule B-07).

---

## When to Run This Runbook

| Trigger | Frequency | Authority |
|---------|-----------|-----------|
| Routine periodic audit | Monthly (first working day) | governance-repo-administrator |
| Post-incident remediation | After any layer-down gap report | governance-repo-administrator |
| After CONSUMER_REPO_REGISTRY.json update | Immediately | governance-repo-administrator |
| After workflow fix that did not trigger path filter | Immediately | governance-repo-administrator |

---

## Phase 1: Audit — Identify Undispatched Events

### Step 1.1 — Scan ripple plan files for pending events

```bash
# List all ripple plan files in governance/ripple/
ls governance/ripple/

# For each plan file, check whether a corresponding layer-down dispatch record exists.
# Dispatch records are stored in .agent-admin/ripple/layer-down-dispatch-*.json
ls .agent-admin/ripple/layer-down-dispatch-*.json 2>/dev/null || echo "No dispatch records found."
```

A ripple plan is **undispatched** if:
- It exists in `governance/ripple/` with a pending or untracked status, AND
- No `layer-down-dispatch-*.json` record exists for that commit/date range.

### Step 1.2 — Check LAYER_DOWN_INVESTIGATION_REPORT files

```bash
ls governance/layer-down/LAYER_DOWN_INVESTIGATION_REPORT_*.md
```

Review each report for Gap 5 sections listing missed/pending layer-down events.

### Step 1.3 — Verify CONSUMER_REPO_REGISTRY.json integrity

```bash
# Confirm all enabled consumers have a governance_liaison configured
jq -r '.consumers[] | select(.enabled == true) | select((.governance_liaison // "") == "") | .repository' \
  governance/CONSUMER_REPO_REGISTRY.json
```

If any repos are listed, **stop** — fix `CONSUMER_REPO_REGISTRY.json` before proceeding.

### Step 1.4 — Cross-check dispatch records against push commits

```bash
# List all layer-down dispatch records
cat .agent-admin/ripple/layer-down-dispatch-*.json 2>/dev/null

# List all commits to main that touched layer-down trigger paths since last full audit
git log --oneline --after="YYYY-MM-DD" -- \
  governance/canon/ governance/schemas/ governance/templates/ \
  governance/executable/workflows/ BUILD_PHILOSOPHY.md
```

Compare commits against dispatch records. Any commit touching trigger paths without a
corresponding dispatch record is a **missed event**.

---

## Phase 2: Backfill — Dispatch Missed Events

### Step 2.1 — Determine backfill priority

| Priority | Criteria |
|----------|----------|
| HIGH | Agent files (`.github/agents/*.md`) changed — CS2 approval required before dispatch |
| HIGH | 4+ consumer repos affected, CS2-approved canons |
| MEDIUM | All 4 consumer repos, FM-approved canons |
| LOW | Optional propagation only |

Consult `governance/layer-down/LAYER_DOWN_INVESTIGATION_REPORT_*.md` for specific
priority classification of historical events.

### Step 2.2 — Trigger manual backfill via workflow_dispatch

**Via GitHub Actions UI:**
1. Navigate to **Actions** → **Governance Layer-Down Dispatch** → **Run workflow**.
2. Fill in:
   - **reason**: Describe the missed event (e.g., `Backfill: LAS_CONSUMER_RIPPLE_PLAN 2026-02-04 — missed due to Gap 2 root cause`).
   - **commit_sha** *(optional)*: The original commit SHA being backfilled (for traceability in issues).
3. Click **Run workflow**.

**Via GitHub CLI (for automation/scripting):**
```bash
gh workflow run governance-layer-down-dispatch.yml \
  --repo APGI-cmy/maturion-foreman-governance \
  -f reason="Backfill: <event description>" \
  -f commit_sha="<original-commit-sha>"
```

### Step 2.3 — Verify dispatch completion

After triggering the backfill:
1. Confirm the workflow run succeeded in GitHub Actions.
2. Verify that a new `layer-down-dispatch-*.json` record was created in `.agent-admin/ripple/`.
3. Verify that issues were created in each consumer repo with `[Layer-Down][Backfill]` title prefix.
4. Verify that `governance_ripple` repository_dispatch events were sent (check workflow logs).

### Step 2.4 — Record backfill in audit log

Append an entry to `.agent-admin/governance/layer-down-audit.log`:

```
<TIMESTAMP> BACKFILL dispatch triggered. Reason: <reason>. Commit: <sha>. Consumers: <list>.
```

---

## Phase 3: Consumer Sync State Verification

### Step 3.1 — Check alignment status in consumer repos

For each consumer repo in `CONSUMER_REPO_REGISTRY.json`, verify:
- `governance-ripple-sync.yml` is deployed and enabled.
- `.agent-admin/governance/sync_state.json` shows `alignment_status: ALIGNED` or `DRIFT` (not `ERROR`).
- `consecutive_failures` is 0 or low (circuit breaker not open).

If a consumer repo shows `circuit_open: true`:
1. The consumer's `governance-ripple-sync.yml` circuit breaker is open.
2. Create a layer-down issue **manually** in that consumer repo tagging the governance-liaison.
3. The liaison must reset the circuit breaker by resolving the alignment failures.

### Step 3.2 — Verify `consumer-alignment.yml.template` token

Consumer repos that deployed `consumer-alignment.yml.template` before 2026-02-27 may have
the old `RIPPLE_DISPATCH_TOKEN` secret reference. Verify:

```yaml
# Should use MATURION_BOT_TOKEN, not RIPPLE_DISPATCH_TOKEN
- name: Checkout governance canonical
  uses: actions/checkout@v4
  with:
    token: ${{ secrets.MATURION_BOT_TOKEN }}  # ✅ correct
```

If still using `RIPPLE_DISPATCH_TOKEN`, trigger a backfill and include template update instructions
in the layer-down issue body.

---

## Phase 4: Recurrence Prevention

### Step 4.1 — Update LAYER_DOWN_INVESTIGATION_REPORT

After completing backfill, update or create a new investigation report entry in
`governance/layer-down/` documenting:
- The missed events and root cause.
- The backfill actions taken.
- Any new FAIL-ONLY-ONCE rules added.

### Step 4.2 — Add FAIL-ONLY-ONCE rules for new failure modes

If this audit revealed a new failure mode not previously documented, append a rule to
`.agent-workspace/governance-repo-administrator/knowledge/FAIL-ONLY-ONCE.md` per the
RCA protocol in Rule A-03.

### Step 4.3 — Update CHANGELOG.md

Record the audit/backfill in `governance/CHANGELOG.md` with:
- Change type: `GOVERNANCE_IMPROVEMENT`
- Affected artifacts: backfilled ripple plans and updated registry
- Reference: this runbook

---

## References

- `governance/layer-down/LAYER_DOWN_INVESTIGATION_REPORT_20260227.md` — Root cause analysis for historical gaps
- `governance/CONSUMER_REPO_REGISTRY.json` — Registry of all consumer repos and liaisons
- `.github/workflows/governance-layer-down-dispatch.yml` — Layer-down dispatch workflow
- `governance/executable/workflows/consumer-alignment.yml.template` — Consumer alignment workflow template
- `governance/canon/CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md` — Cross-repo protocol
- `governance/strategy/LAYERING_AND_RIPPLING_AUTOMATION_STRATEGY.md` — Layer-down/ripple strategy

---

*Version 1.0.0 | 2026-02-27 | Authority: governance-repo-administrator | CS2 (Johan Ras)*
