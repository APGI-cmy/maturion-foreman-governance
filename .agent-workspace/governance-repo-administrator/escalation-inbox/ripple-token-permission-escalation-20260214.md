# Escalation: MATURION_BOT_TOKEN Permission Update Required

## Type
AUTHORITY_BOUNDARY | TOKEN_SECURITY | CROSS_REPO_PERMISSIONS

## Date
2026-02-14

## Agent
governance-repo-administrator (session investigating auto ripple malfunction)

## Authority
- REQ-AS-002: Escalate CS2 for token/permission changes
- REQ-SS-001: Use fine-grained MATURION_BOT_TOKEN with least privilege
- REQ-RA-001: Constitutional canon changes trigger layer-down ripple

---

## Problem Statement

The auto governance ripple mechanism has been failing since activation (2026-02-12) due to insufficient permissions on `MATURION_BOT_TOKEN`. The token cannot trigger `repository_dispatch` events on consumer repositories, resulting in HTTP 403 errors for all dispatch attempts.

**Impact**: 
- No governance updates propagated to consumer repos for 2+ days
- Canon file drift occurring across 4 consumer repositories
- Compliance risk for governance layering requirements (REQ-RA-001, REQ-RA-002)

---

## Evidence

### Error Pattern
```
gh: Resource not accessible by personal access token (HTTP 403)
{"message":"Resource not accessible by personal access token",
 "documentation_url":"https://docs.github.com/rest/repos/repos#create-a-repository-dispatch-event",
 "status":"403"}
```

### Affected Repositories
1. APGI-cmy/maturion-foreman-office-app
2. APGI-cmy/PartPulse
3. APGI-cmy/maturion-isms
4. APGI-cmy/R_Roster

### Workflow Runs
- 10/10 recent runs show 100% dispatch failure rate
- All runs incorrectly marked as "success" (workflow design issue, separate fix)
- Latest run: 22016644761 (2026-02-14 11:35:47Z)

---

## Decision Required

**Should we grant additional permissions to MATURION_BOT_TOKEN to enable cross-repo dispatch?**

### Option 1: Grant Workflow Permissions (RECOMMENDED)

**Action**: Update MATURION_BOT_TOKEN with required permissions

**If Classic PAT**:
- Add `workflow` scope

**If Fine-grained PAT** (recommended for security):
- Grant `Actions: write` permission on 4 consumer repositories only
- Maintain least privilege principle
- Easier to audit and rotate

**Pros**:
- Enables intended ripple mechanism design
- Automated, real-time governance propagation
- Reduces manual intervention
- Ensures constitutional canon updates propagate immediately

**Cons**:
- Grants broader permissions to token
- Requires security policy update
- Token rotation becomes more critical

**Security Mitigations**:
1. Use fine-grained PAT with repo-specific permissions
2. Document token usage in security audit trail
3. Implement token rotation policy (90 days recommended)
4. Monitor dispatch events for unauthorized usage
5. Implement rate limiting if needed
6. Add alerting for suspicious dispatch patterns

### Option 2: Implement Pull-Based Sync

**Action**: Redesign ripple as pull-based mechanism

**Changes**:
- Consumer repos periodically poll governance repo
- No dispatch events needed
- Scheduled workflows in consumer repos

**Pros**:
- No additional token permissions required
- Consumer repos control sync timing

**Cons**:
- Increased latency (hours instead of minutes)
- More complex coordination
- Higher compute usage (4 repos polling)
- Drift risk increases between poll intervals

**Timeline**: 2-3 weeks to design, implement, test

### Option 3: Manual Governance Propagation

**Action**: Continue manual sync until long-term solution designed

**Process**:
- Agent manually creates PRs in consumer repos when governance changes
- Slower, labor-intensive
- Higher drift risk

**Pros**:
- No security changes needed
- No automation complexity

**Cons**:
- Violates governance automation requirements
- High manual effort
- Increased drift risk
- Not scalable

---

## Recommendation

**Option 1: Grant Workflow Permissions via Fine-Grained PAT**

**Rationale**:
1. Aligns with governance architecture intent (REQ-RA-001)
2. Enables automated canon propagation
3. Minimizes drift and compliance risk
4. Fine-grained PAT provides security controls
5. Scalable as consumer repos grow
6. Immediate fix (hours, not weeks)

**Implementation**:
1. Create new fine-grained PAT or update existing
2. Grant `Actions: write` on 4 specific consumer repos
3. Update `MATURION_BOT_TOKEN` secret in governance repo
4. Test dispatch workflow manually
5. Document in security audit trail
6. Establish token rotation schedule

**Security Requirements**:
- Fine-grained PAT with minimal scope
- 90-day rotation policy
- Monitoring and alerting
- Documented in TOKEN_ROTATION_POLICY.md
- Incident response plan for token compromise

---

## Context

### Governance Requirements
- **REQ-RA-001**: Constitutional canon changes MUST trigger layer-down ripple
- **REQ-SS-001**: Use fine-grained tokens with least privilege
- **REQ-AS-002**: Escalate token/permission changes to CS2

### Current State
- Ripple dispatch workflow exists and runs
- Consumer registry configured correctly
- 1/4 consumer repos has ripple receiver (maturion-isms)
- 3/4 consumer repos need ripple receivers deployed (separate task)

### Workflow File
`.github/workflows/governance-ripple-dispatch.yml`

### Related Issues
- Missing ripple receiver workflows in 3 consumer repos (can be fixed by agent)
- Workflow design masks failures (can be fixed by agent)
- Token permission issue (requires CS2 approval)

---

## Proposed Solution Details

### Fine-Grained PAT Configuration

**Token Name**: `MATURION_BOT_TOKEN` (or create new `MATURION_RIPPLE_DISPATCH_TOKEN`)

**Permissions Required**:
```
Repository: APGI-cmy/maturion-foreman-office-app
- Actions: Read and write

Repository: APGI-cmy/PartPulse
- Actions: Read and write

Repository: APGI-cmy/maturion-isms
- Actions: Read and write

Repository: APGI-cmy/R_Roster
- Actions: Read and write
```

**Expiration**: 90 days (2026-05-14)

**Rotation Plan**:
1. Create new token 7 days before expiration
2. Test with manual workflow dispatch
3. Update secret in governance repo
4. Revoke old token
5. Document rotation in evidence trail

### Verification Steps

1. **After permission update**:
   ```bash
   # Manually trigger ripple dispatch workflow
   gh workflow run governance-ripple-dispatch.yml --ref main
   ```

2. **Check logs** for successful dispatch:
   ```
   📤 Dispatching ripple to APGI-cmy/maturion-foreman-office-app...
   ✅ Dispatched successfully
   ```

3. **Verify maturion-isms receives dispatch**:
   - Check maturion-isms Actions tab for `governance-ripple-sync` workflow run
   - Verify it was triggered by `repository_dispatch` event

4. **Once verified**, backfill missed updates:
   - Manually trigger ripple for governance changes since 2026-02-12
   - Verify propagation to all consumer repos

---

## Documentation Requirements

If Option 1 approved, create/update:
1. `.agent-admin/security/TOKEN_ROTATION_POLICY.md`
2. `governance/runbooks/ripple-token-rotation.md`
3. `governance/security/token-audit-trail.md`
4. Update `CONSUMER_REPO_REGISTRY.json` with token details (non-sensitive)

---

## Timeline

### If Option 1 Approved
- **CS2 decision**: Immediate
- **Token update**: 30 minutes
- **Verification**: 1 hour
- **Agent fixes**: 2-3 hours (workflow hardening + ripple receivers)
- **Backfill**: 2-4 hours
- **Total**: ~1 day to full restoration

### If Option 2 Selected
- **Design**: 3-5 days
- **Implementation**: 5-7 days
- **Testing**: 2-3 days
- **Total**: ~2-3 weeks

### If Option 3 Selected
- **Manual PRs per change**: 2-4 hours each
- **Sustainability**: Low
- **Recommendation**: Use only as temporary stopgap

---

## CS2 Approval

**Decision**: [ ] Option 1 (Grant Permissions) | [ ] Option 2 (Pull-Based) | [ ] Option 3 (Manual)

**Approved by**: _________________ (CS2: Johan Ras)

**Date**: _________________

**Notes**:

---

**Authority**: LIVING_AGENT_SYSTEM.md v6.2.0  
**Session**: Ripple Malfunction Investigation  
**Created**: 2026-02-14  
**Status**: AWAITING_CS2_DECISION
