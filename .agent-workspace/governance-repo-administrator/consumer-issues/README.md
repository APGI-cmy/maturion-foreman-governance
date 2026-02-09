# Consumer Repository Ripple Issue Templates

This directory contains ready-to-use GitHub issue templates for propagating 5 canon changes from PR #1052 to consumer repositories.

## Quick Start Guide

### Step 1: Create Issues

For each consumer repository, create a new GitHub issue:

#### maturion-foreman-office-app (HIGH Priority)
1. Go to: https://github.com/APGI-cmy/maturion-foreman-office-app/issues/new
2. Copy content from: `maturion-foreman-office-app-ripple-issue.md`
3. Title: `[Governance Ripple] Propagate 5 Canon Changes from PR #1052`
4. Assign to: @governance-liaison
5. Labels: `governance`, `ripple`, `high-priority`
6. Create issue and note the issue number

#### PartPulse (MEDIUM Priority)
1. Go to: https://github.com/APGI-cmy/PartPulse/issues/new
2. Copy content from: `PartPulse-ripple-issue.md`
3. Title: `[Governance Ripple] Propagate 5 Canon Changes from PR #1052`
4. Assign to: @governance-liaison
5. Labels: `governance`, `ripple`, `medium-priority`
6. Create issue and note the issue number

#### R_Roster (MEDIUM Priority)
1. Go to: https://github.com/APGI-cmy/R_Roster/issues/new
2. Copy content from: `R_Roster-ripple-issue.md`
3. Title: `[Governance Ripple] Propagate 5 Canon Changes from PR #1052`
4. Assign to: @governance-liaison
5. Labels: `governance`, `ripple`, `medium-priority`
6. Create issue and note the issue number

### Step 2: Update Ripple Log

After creating all issues, update `../ripple-log.md`:

Replace:
```markdown
[2026-02-09 06:57] PR #1052 Canon Changes (5 files) → maturion-foreman-office-app (NOTIFIED)
[2026-02-09 06:57] PR #1052 Canon Changes (5 files) → PartPulse (NOTIFIED)
[2026-02-09 06:57] PR #1052 Canon Changes (5 files) → R_Roster (NOTIFIED)
```

With:
```markdown
[2026-02-09 HH:MM] PR #1052 Canon Changes (5 files) → maturion-foreman-office-app (ACKNOWLEDGED) - Issue #XXX
[2026-02-09 HH:MM] PR #1052 Canon Changes (5 files) → PartPulse (ACKNOWLEDGED) - Issue #YYY
[2026-02-09 HH:MM] PR #1052 Canon Changes (5 files) → R_Roster (ACKNOWLEDGED) - Issue #ZZZ
```

Where XXX, YYY, ZZZ are the actual issue numbers created.

### Step 3: Commit and Push

```bash
cd /home/runner/work/maturion-foreman-governance/maturion-foreman-governance
git add .agent-workspace/governance-repo-administrator/ripple-log.md
git commit -m "Update ripple log with consumer repo issue numbers"
git push origin copilot/propagate-canon-changes
```

### Step 4: Monitor Progress

Track ripple completion via:
- Consumer repo issue status
- Target completion date: 2026-02-16 (1 week SLA)
- Update ripple log when issues are closed (change ACKNOWLEDGED → APPLIED)

## Files in This Directory

- **maturion-foreman-office-app-ripple-issue.md** - HIGH priority (Foreman-centric app)
- **PartPulse-ripple-issue.md** - MEDIUM priority (Builder-focused app)
- **R_Roster-ripple-issue.md** - MEDIUM priority (Builder-focused app)
- **README.md** (this file) - Quick start guide

## Canon Changes Being Propagated

1. **FOREMAN_MEMORY_PROTOCOL.md** (v1.0.0) - NEW PUBLIC_API
2. **FOREMAN_WAVE_PLANNING_AND_ISSUE_ARTIFACT_GENERATION_PROTOCOL.md** (v1.0.0) - NEW PUBLIC_API
3. **FM_ROLE_CANON.md** - UPDATED (Sections 12, 13)
4. **STOP_AND_FIX_DOCTRINE.md** (v2.1.0) - UPDATED (Section 8)
5. **BOOTSTRAP_EXECUTION_LEARNINGS.md** - UPDATED (Appendix A)

## Related Documentation

- **RIPPLE_EXECUTION_SUMMARY.md** - High-level ripple execution summary
- **PREHANDOVER_PROOF.md** - Complete 10-step checklist execution
- **../consumer-ripple-plan.md** - Detailed consumer repository ripple plan
- **../ripple-log.md** - Ripple tracking log

## Authority

- GOVERNANCE_RIPPLE_CHECKLIST_PROTOCOL.md v1.0.0
- GOVERNANCE_RIPPLE_MODEL.md v1.0
- LIVING_AGENT_SYSTEM.md v5.0.0

---

**Created**: 2026-02-09  
**Agent**: governance-repo-administrator  
**Session**: Post-PR #1052 Ripple Execution
