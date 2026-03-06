# SCOPE_DECLARATION

**PR_ID**: copilot/fix-duplicate-layer-down-issues-again
**DATE_UTC**: 2026-03-06T12:15:27Z  
**RESPONSIBILITY_DOMAIN**: Governance Workflow Automation — Layer-Down Idempotency  
**AGENT_ROLE**: governance-repo-administrator  
**SCOPE**: Fix duplicate [Layer-Down] issues and ripple PRs via two idempotency guards

## FILES_CHANGED

```
.github/workflows/governance-layer-down-dispatch.yml
governance/executable/workflows/consumer-alignment.yml.template
SCOPE_DECLARATION.md
.agent-admin/prehandover/prehandover_proof_LAYER_DOWN_DEDUP_20260306.md
.agent-workspace/governance-repo-administrator/memory/session-062-20260306.md
```

## CHANGE_SUMMARY

**Purpose**: Fix two independent root causes of duplicate layer-down issues and ripple PRs
in consumer repos (CS2-authorized issue, raised 2026-03-06).

**Root Cause 1 (this repo)**: `governance-layer-down-dispatch.yml` created `[Layer-Down]` issues
with no prior idempotency check. Fixed by adding a `gh api` pre-check for existing open issues
matching both the `layer-down` label and current `SHORT_SHA` before creating a new one.

**Root Cause 2 (template)**: `consumer-alignment.yml.template` had no `concurrency:` block and
no dedup guard before PR creation. Fixed by adding a `concurrency:` block keyed on
`github.repository` and a `Check for existing alignment PR` step using `gh pr list` filtered by
`ALIGNMENT_BRANCH_PREFIX`.

## AUTHORITY

CS2 (Johan Ras) — Issue raised 2026-03-06. Workflow file changes authorized by CS2 issue authority.

---
