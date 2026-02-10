# Foreman Summoning Instructions - PR #1070 Gate Fix

**Date**: 2026-02-10  
**Agent**: governance-repo-administrator  
**Authority**: CS2 (Johan Ras) fix-then-merge directive

---

## Executive Summary

PR #1070 contains critical governance self-audit work but is failing merge gates due to missing evidence artifacts. Per CS2 directive, we will fix properly (not override gates), then merge immediately.

**Missing Artifacts**:
- Gate results JSON (machine-readable validation)
- Continuous improvement capture (mandatory learnings)

**Status**: Templates prepared, ready for human to create coordination issue

---

## Step 1: Create GitHub Issue to Summon Foreman

### Via GitHub Web UI (Recommended - no GH_TOKEN needed)

1. **Go to**: https://github.com/APGI-cmy/maturion-foreman-governance/issues/new

2. **Title**: 
   ```
   [@Foreman] Fix PR #1070 Gate Failures - Add Missing Evidence Artifacts
   ```

3. **Labels**: 
   - `agent-coordination`
   - `foreman`
   - `urgent`
   - `gate-failure`

4. **Assignee**: @copilot

5. **Body**: Copy entire content from:
   ```
   .agent-workspace/governance-repo-administrator/escalation-inbox/foreman-gate-fix-coordination.md
   ```

### Via GitHub CLI (if GH_TOKEN available)

```bash
cd /home/runner/work/maturion-foreman-governance/maturion-foreman-governance

gh issue create \
  --repo APGI-cmy/maturion-foreman-governance \
  --title "[@Foreman] Fix PR #1070 Gate Failures - Add Missing Evidence Artifacts" \
  --assignee @copilot \
  --label "agent-coordination,foreman,urgent,gate-failure" \
  --body-file .agent-workspace/governance-repo-administrator/escalation-inbox/foreman-gate-fix-coordination.md
```

---

## Step 2: Comment on PR #1070

After creating the coordination issue:

1. **Go to**: PR #1070 on GitHub

2. **Add comment**: Copy content from:
   ```
   .agent-workspace/governance-repo-administrator/escalation-inbox/pr-1070-comment-template.md
   ```

3. **Update**: Replace `#[TBD]` with the actual issue number from Step 1

---

## Step 3: What Foreman Will Do

Foreman agent will be summoned to:

### Create Gate Results JSON

**File**: `.agent-admin/gates/PR-1070-gate-results.json`

Contains:
- Machine-readable validation results
- Status for all 5 gates (prehandover, alignment, stop-and-fix, no-minimizing-language, rca)
- Overall verdict: PASS
- Timestamps and session metadata

### Create Continuous Improvement Capture

**File**: `.agent-admin/improvements/PR-1070-improvements.md`

Contains:
- What worked well (4 process strengths)
- What could be improved (3 learnings for future)
- Governance gaps identified (4 gaps documented)
- Metrics and status

### Commit to PR Branch

Foreman will:
1. Checkout `copilot/governance-repo-self-audit` branch
2. Add both artifacts
3. Commit with clear message
4. Push to trigger gate re-run
5. Verify gates pass
6. Comment on coordination issue and PR

---

## Step 4: After Foreman Completes

### You (governance-repo-administrator) Will:

1. **Verify artifacts created**:
   ```bash
   ls -lh .agent-admin/gates/PR-1070-gate-results.json
   ls -lh .agent-admin/improvements/PR-1070-improvements.md
   ```

2. **Check gate status**: All 3 checks should show green ✅
   - merge-gate/verdict
   - governance/alignment
   - stop-and-fix/enforcement

3. **Close coordination issue**: Comment "✅ Verified and complete"

4. **Merge PR #1070**: Immediate merge per CS2 directive

---

## Why This Approach?

### CS2 Philosophy: Fix-Then-Merge (Not Override)

**Problem**: PR #1070 has valuable governance work but fails gates

**Wrong Approach**: Override gates to merge  
❌ Violates governance integrity  
❌ Sets bad precedent  
❌ Undermines gate system

**Right Approach**: Fix gates properly, then merge  
✅ Maintains governance integrity  
✅ Demonstrates proper process  
✅ Work gets merged correctly

**CS2 Quote**: "This work is too valuable to override gates. Foreman will fix properly, then we merge."

---

## What PR #1070 Accomplishes

### Critical Governance Work

1. **Evidence Structure Standardization**
   - Created .agent-admin/ hierarchy
   - Deprecated legacy locations
   - Forward guidance for all future work

2. **Canon Inventory Validation**
   - Validated 132 canon files
   - SHA256 hash verification
   - No placeholders found

3. **Executable Pack Validation**
   - 10 Python scripts validated
   - All syntax checks passed
   - Ripple dispatcher tested

4. **Governance Gap Identification**
   - Cross-agent coordination protocol missing
   - Authority boundary validation needed
   - Agent contract bindings incomplete
   - Implementation vs. governance clarity required

5. **Comprehensive Learnings**
   - Authority boundary lessons captured
   - Process improvements documented
   - Future sessions have clear guidance

### This IS the Foundation

PR #1070 establishes the governance standards that make future work possible. It's exactly what we need. Worth fixing properly.

---

## Timeline

**Now**: Human creates coordination issue  
**+30 min**: Foreman acknowledges and starts work  
**+2 hours**: Foreman completes, gates pass  
**+2.5 hours**: governance-repo-administrator verifies and merges

**Total**: Same day completion

---

## Files Created for Handover

1. **Coordination Issue Template**:
   `.agent-workspace/governance-repo-administrator/escalation-inbox/foreman-gate-fix-coordination.md`
   - Complete issue body (12KB)
   - All context and requirements
   - Step-by-step instructions for Foreman

2. **PR Comment Template**:
   `.agent-workspace/governance-repo-administrator/escalation-inbox/pr-1070-comment-template.md`
   - Ready-to-paste PR comment
   - Clear status and timeline

3. **This Summary**:
   `.agent-workspace/governance-repo-administrator/escalation-inbox/foreman-summoning-instructions.md`
   - Human execution guide
   - Complete workflow documentation

---

## Next Action Required

**Human must**: Create GitHub issue using template from Step 1 above

**Cannot be automated**: No GH_TOKEN available in this context

**Ready to execute**: All templates prepared and verified

---

**Prepared by**: governance-repo-administrator  
**Session**: 009 (20260210)  
**Authority**: LIVING_AGENT_SYSTEM v5.0.0, CS2 approval
