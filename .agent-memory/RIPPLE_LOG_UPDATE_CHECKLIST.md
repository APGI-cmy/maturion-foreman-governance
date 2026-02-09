# RIPPLE LOG UPDATE CHECKLIST

## Purpose
This checklist ensures CodexAdvisor **never misses a ripple log update** during governance ripple operations. This serves as a bootstrap backup and human-readable reminder for critical governance tracking.

---

## When to Use This Checklist

Execute this checklist whenever:
- ✅ A governance PR merges that includes canon changes
- ✅ A governance ripple is initiated to consumer repositories
- ✅ Consumer repositories receive governance layer-down notifications
- ✅ Any canonical governance file changes in `governance/canon/`

---

## Mandatory Ripple Log Update Checklist

### Phase 1: Pre-Ripple Validation

- [ ] **Identify Changed Canon Files**: List all canonical files modified/added in the PR
- [ ] **Determine Affected Consumer Repos**: Check GOVERNANCE_RIPPLE_MODEL.md for consumer list
  - APGI-cmy/maturion-foreman-office-app
  - APGI-cmy/PartPulse
  - APGI-cmy/R_Roster
- [ ] **Verify PR Numbers**: Confirm the governance PR number(s) being rippled
- [ ] **Check Ripple Log Location**: Verify `.agent-workspace/governance-repo-administrator/ripple-log.md` exists

### Phase 2: Ripple Execution

- [ ] **Create Consumer Issues**: Open governance ripple issues in each consumer repository
- [ ] **Record Issue Numbers**: Note each created issue number for log entry
- [ ] **Timestamp Ripple**: Capture current timestamp (YYYY-MM-DD HH:MM format)
- [ ] **Document Canon Changes**: List all affected canonical files with version info

### Phase 3: Ripple Log Update (CRITICAL - DO NOT SKIP)

- [ ] **Update Ripple History Section**:
  ```markdown
  [YYYY-MM-DD HH:MM] PR #XXXX Canon Changes → consumer-repo (NOTIFIED) #issue_number
  ```
- [ ] **Add Ripple Details Section** with:
  - [ ] PR reference and description
  - [ ] List of all canon changes (with NEW/UPDATED status)
  - [ ] Status by repository (NOTIFIED → ACKNOWLEDGED → APPLIED)
  - [ ] Target dates and priority levels
  - [ ] Estimated effort
  - [ ] Special requirements (if any)

- [ ] **Update Ripple Debt Tracking**:
  - [ ] Last Canon Change date
  - [ ] Last Ripple Notification date
  - [ ] Ripple Debt Status

### Phase 4: Evidence Collection

- [ ] **Log to Evidence File**: Record ripple action in `.agent-workspace/governance-repo-administrator/evidence-YYYYMMDD.log`
- [ ] **Session Memory Update**: Document ripple in session memory file
- [ ] **Working Contract Update**: Reflect ripple status in working contract

### Phase 5: Follow-Up Tracking

- [ ] **Monitor Consumer Issues**: Track NOTIFIED → ACKNOWLEDGED → APPLIED transitions
- [ ] **Update Status**: Change status in ripple log as consumer repos apply changes
- [ ] **Close Loop**: Mark APPLIED when consumer validation confirms layer-down complete

---

## Ripple Log Format Reference

### History Entry Format:
```markdown
[YYYY-MM-DD HH:MM] PR #XXXX Description → consumer-repo (STATUS) #issue_number
```

### Status Values:
- **NOTIFIED**: Issue created, consumer notified of governance change
- **ACKNOWLEDGED**: Consumer governance-liaison has reviewed and planned layer-down
- **APPLIED**: Consumer has completed layer-down and validated integration
- **DRIFTED**: Consumer has deviated from canonical governance (escalate to CS2)

### Details Section Template:
```markdown
## Ripple Details: PR #XXXX - [Description]

### Canon Changes (N total):
1. FILE_NAME.md (vX.X.X) - NEW/UPDATED
2. ...

### Ripple Status by Repository:

#### APGI-cmy/consumer-repo-name
- **Status**: [NOTIFIED/ACKNOWLEDGED/APPLIED]
- **Issue**: #XXX
- **Priority**: [HIGH/MEDIUM/LOW]
- **Target Date**: YYYY-MM-DD
- **Files to Layer Down**: N canonical files
- **Agent Contracts**: [affected agents]
- **Estimated Effort**: X-Y hours
```

---

## Failure Modes & Prevention

### ❌ Failure: "Forgot to update ripple log"
**Prevention**: This checklist in `.agent-memory/` reminds CodexAdvisor before every session closure

### ❌ Failure: "Incomplete ripple log entry"
**Prevention**: Use the template above with all required fields

### ❌ Failure: "Lost track of consumer status"
**Prevention**: Update status transitions in ripple log (don't rely on memory)

### ❌ Failure: "Ripple debt undetected"
**Prevention**: Wake-up protocol checks ripple status automatically

---

## Authority References

- **GOVERNANCE_RIPPLE_MODEL.md**: Bidirectional governance evolution framework
- **GOVERNANCE_RIPPLE_CHECKLIST_PROTOCOL.md**: 10-step systematic ripple process
- **GOVERNANCE_RIPPLE_DETECTION_PROTOCOL.md**: Automatic ripple debt detection
- **CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md**: Consumer layer-down requirements
- **Issue #1047**: Living Agent System v5.0.0 governance gap closure

---

## Bootstrap Backup Instructions

**For CodexAdvisor**:
1. Before completing any governance ripple session, run:
   ```bash
   cat .agent-memory/RIPPLE_LOG_UPDATE_CHECKLIST.md
   ```
2. Verify each checklist item is complete
3. Update ripple log BEFORE session closure
4. Log evidence in workspace

**For Human Oversight**:
- Review this checklist if ripple log appears outdated
- Manually verify ripple log entries after governance PRs merge
- Escalate to CS2 if ripple debt accumulates

---

**Version**: 1.0.0  
**Created**: 2026-02-09  
**Authority**: Living Agent System v5.0.0, Issue #1047  
**Owner**: governance-repo-administrator  
**Purpose**: Bootstrap backup for ripple log maintenance
