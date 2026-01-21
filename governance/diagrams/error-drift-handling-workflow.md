# Error and Drift Handling Workflow

**Purpose**: Visual representation of error and drift handling when agent alignment checks fail.  
**Authority**: AGENT_SELF_GOVERNANCE_PROTOCOL.md Section 9  
**Maintained By**: governance-repo-administrator  
**Last Updated**: 2026-01-21

---

## Alignment Check Failure Handling Workflow

```
═══════════════════════════════════════════════════════════════════════════
                  WHEN AGENT DETECTS MISALIGNMENT
═══════════════════════════════════════════════════════════════════════════

┌───────────────────────────────────────────────────────────────────────┐
│ Trigger: Agent performs Step 3 (Gap Analysis)                         │
│ ────────────────────────────────────────────────                      │
│ Result: MISALIGNED status detected                                    │
│                                                                       │
│ Possible Misalignments:                                               │
│   • Check 1: Own contract not current                                 │
│   • Check 2: Local repo governance not current                        │
│   • Both: Contract AND repo governance misaligned                     │
│                                                                       │
│ Agent MUST determine: Am I authorized to self-align for this gap?     │
└─────────────────────────────┬─────────────────────────────────────────┘
                              ↓
┌───────────────────────────────────────────────────────────────────────┐
│ Decision Point: Check Self-Align Authority                            │
│ ────────────────────────────────────────                              │
│ Agent evaluates authority matrix:                                     │
│                                                                       │
│ ┌──────────────────────┬────────────────┬────────────────────────┐   │
│ │ Agent Type           │ Check 1 Failed │ Check 2 Failed         │   │
│ ├──────────────────────┼────────────────┼────────────────────────┤   │
│ │ governance-liaison   │ NOT AUTHORIZED │ AUTHORIZED (self-align)│   │
│ │ FM Agent             │ NOT AUTHORIZED │ NOT AUTHORIZED         │   │
│ │ Builder Agents       │ NOT AUTHORIZED │ N/A (no authority)     │   │
│ │ governance-repo-admin│ NOT AUTHORIZED │ AUTHORIZED (self-align)│   │
│ └──────────────────────┴────────────────┴────────────────────────┘   │
│                                                                       │
│ IF (AUTHORIZED to self-align for detected gap):                       │
│    → Proceed to SELF-ALIGN PATH                                       │
│ ELSE:                                                                 │
│    → Proceed to ESCALATION PATH                                       │
└──────────┬────────────────────────────────────┬───────────────────────┘
           │                                    │
     AUTHORIZED                           NOT AUTHORIZED
     (Self-Align Path)                    (Escalation Path)
           │                                    │
           ↓                                    ↓
┌──────────────────────────┐         ┌─────────────────────────────────┐
│ SELF-ALIGN PATH          │         │ ESCALATION PATH                 │
│ ────────────────         │         │ ───────────────                 │
│                          │         │                                 │
│ Step 1: Begin Self-Align │         │ Step 1: HALT Work Immediately   │
│ ──────────────────────── │         │ ───────────────────────────     │
│ Agent proceeds to layer  │         │ • Stop ALL work in progress     │
│ down canonical artifacts │         │ • Do NOT proceed with any tasks │
│                          │         │ • Preserve current work state   │
│ For governance-liaison:  │         │   (do not commit partial work)  │
│   1. Identify outdated/  │         │                                 │
│      missing artifacts   │         │ Rationale: Operating with stale │
│   2. Copy latest canon   │         │ governance is non-compliant and │
│      files from          │         │ may produce invalid results     │
│      maturion-foreman-   │         │                                 │
│      governance          │         │         ↓                       │
│   3. Copy workflow       │         │                                 │
│      automation (scripts,│         │ Step 2: Close PR/Job            │
│      CI YAML)            │         │ ──────────────────────          │
│   4. Update INVENTORY.md │         │ • Close current PR (if exists)  │
│   5. Update ALIGNMENT.md │         │ • Mark job status: HALTED       │
│   6. Commit changes      │         │ • Clear message in close note   │
│                          │         │                                 │
│ For governance-repo-     │         │ Close Message Template:         │
│ administrator:           │         │   "SELF-GOVERNANCE CHECK FAILED │
│   1. Update INVENTORY.md │         │    Agent: <agent-name>          │
│   2. Create ripple plan  │         │    Repository: <repo-name>      │
│   3. Document ripple     │         │    Check Failed: [Check 1/2]    │
│   4. Create downstream   │         │    Reason: <specific gap>       │
│      issues              │         │    Action: Escalated to <auth>  │
│                          │         │    Status: AWAITING_ALIGNMENT   │
│ Requirements:            │         │    Reference: AGENT_SELF_       │
│   ✓ ALL artifacts rippled│         │               GOVERNANCE_       │
│   ✓ Version markers      │         │               PROTOCOL.md"      │
│     updated              │         │                                 │
│   ✓ Audit trail preserved│         │         ↓                       │
│                          │         │                                 │
│         ↓                │         │ Step 3: Create Escalation       │
│                          │         │         Message                 │
│ Step 2: Re-verify        │         │ ──────────────────────────      │
│         Alignment        │         │ Create clear, structured        │
│ ──────────────────────── │         │ escalation message:             │
│ • Return to Step 1 of    │         │                                 │
│   self-governance check  │         │ Required Elements:              │
│ • Perform gap analysis   │         │   1. Clear statement:           │
│   again                  │         │      "Cannot proceed - agent    │
│ • Confirm ALIGNED status │         │      file not current"          │
│                          │         │      OR                         │
│ IF STILL MISALIGNED:     │         │      "Cannot proceed - repo     │
│   → ESCALATE (path failed│         │      governance misaligned"     │
│      to resolve)         │         │   2. Agent name & repository    │
│                          │         │   3. Check that failed (1 or 2) │
│ IF NOW ALIGNED:          │         │   4. Specific misalignment      │
│   → PROCEED to Step 3    │         │   5. Escalation target          │
│                          │         │   6. Action required from       │
│         ↓                │         │      authority                  │
│                          │         │                                 │
│ Step 3: Proceed with Work│         │ Example Message:                │
│ ──────────────────────── │         │ ───────────────                 │
│ • Self-governance check  │         │ "SELF-GOVERNANCE CHECK FAILED   │
│   PASSED                 │         │                                 │
│ • Include attestation in │         │ Agent: builder-office-frontend  │
│   progress reports       │         │ Repository: APGI-cmy/office-app │
│ • Document self-align    │         │ Check Failed: Check 1 (Own      │
│   action in PR           │         │               Contract)         │
│                          │         │ Reason: Contract version v2.0.0 │
│ Attestation includes:    │         │         does not match expected │
│   • Self-align action    │         │         v2.1.0 per local        │
│     taken                │         │         governance profile      │
│   • Artifacts layered    │         │ Escalation Target: FM Agent     │
│     down                 │         │ Action Required:                │
│   • Alignment verified   │         │   1. FM to review governance    │
│                          │         │      profile update             │
│         ↓                │         │   2. FM to update builder       │
│                          │         │      contract to v2.1.0         │
│ ┌──────────────────────┐ │         │   3. After update, job will     │
│ │ SUCCESS              │ │         │      restart from beginning     │
│ │ ────────────         │ │         │                                 │
│ │ Agent operating with │ │         │ Awaiting CS2/FM intervention."  │
│ │ current governance   │ │         │                                 │
│ └──────────────────────┘ │         │         ↓                       │
└──────────────────────────┘         │                                 │
                                     │ Step 4: Escalate to Authority   │
                                     │ ──────────────────────────      │
                                     │ Send escalation message to      │
                                     │ appropriate authority:          │
                                     │                                 │
                                     │ Escalation Targets:             │
                                     │   • Builder → FM, then CS2      │
                                     │   • FM → CS2                    │
                                     │   • governance-liaison (Check 1)│
                                     │     → CS2                       │
                                     │   • governance-repo-admin       │
                                     │     (Check 1) → CS2             │
                                     │                                 │
                                     │ Escalation Methods:             │
                                     │   • GitHub issue (preferred)    │
                                     │   • PR comment (if PR exists)   │
                                     │   • Direct notification to CS2  │
                                     │                                 │
                                     │ Escalation Tracking:            │
                                     │   • Record escalation timestamp │
                                     │   • Track escalation status     │
                                     │   • Document in agent evidence  │
                                     │                                 │
                                     │         ↓                       │
                                     │                                 │
                                     │ Step 5: WAIT for Authority      │
                                     │         to Update Contract/     │
                                     │         Governance              │
                                     │ ──────────────────────────      │
                                     │ Agent MUST NOT:                 │
                                     │   ❌ Proceed with work          │
                                     │   ❌ Attempt self-modification  │
                                     │   ❌ Infer governance intent    │
                                     │   ❌ Bypass alignment check     │
                                     │                                 │
                                     │ Agent MUST:                     │
                                     │   ✅ Remain idle                │
                                     │   ✅ Preserve work state        │
                                     │   ✅ Await CS2/authority action │
                                     │   ✅ Respond to status queries  │
                                     │                                 │
                                     │ Authority Actions:              │
                                     │   • CS2 reviews escalation      │
                                     │   • CS2 updates contract OR     │
                                     │     canonical governance        │
                                     │   • CS2 commits and pushes      │
                                     │     updates                     │
                                     │   • CS2 notifies agent          │
                                     │                                 │
                                     │         ↓                       │
                                     │                                 │
                                     │ Step 6: Job Restarts After      │
                                     │         Alignment Restored      │
                                     │ ──────────────────────────      │
                                     │ When authority completes update:│
                                     │                                 │
                                     │   1. Job restarts from beginning│
                                     │   2. Agent performs self-       │
                                     │      governance check again     │
                                     │      (Step 1)                   │
                                     │   3. Verification confirms      │
                                     │      ALIGNED status             │
                                     │   4. Agent proceeds with work   │
                                     │   5. Attestation documents:     │
                                     │      • Initial failure          │
                                     │      • Escalation               │
                                     │      • Authority resolution     │
                                     │      • Alignment restored       │
                                     │                                 │
                                     │ Audit Trail:                    │
                                     │   • Both failure AND resolution │
                                     │     documented in job evidence  │
                                     │   • Escalation tracked in       │
                                     │     governance change log       │
                                     │                                 │
                                     │         ↓                       │
                                     │                                 │
                                     │ ┌───────────────────────────┐   │
                                     │ │ SUCCESS                   │   │
                                     │ │ ────────────              │   │
                                     │ │ Agent now operating with  │   │
                                     │ │ current governance after  │   │
                                     │ │ authority intervention    │   │
                                     │ └───────────────────────────┘   │
                                     └─────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════
                          END OF ERROR/DRIFT HANDLING
═══════════════════════════════════════════════════════════════════════════
```

---

## Prohibited Actions During Misalignment

When agent detects misalignment and is NOT authorized to self-align:

❌ **MUST NOT**:
1. Proceed with work despite misalignment
2. Attempt to modify own contract
3. Attempt unauthorized self-alignment
4. Infer governance intent to bypass check
5. Suppress or hide alignment failure
6. Continue with partial work
7. Cache or persist stale governance

✅ **MUST**:
1. HALT work immediately
2. Close PR/job with clear message
3. Create structured escalation message
4. Escalate to correct authority
5. WAIT for authority to resolve
6. Document failure in audit trail
7. Restart job after alignment restored

---

## Escalation Message Template

```markdown
## SELF-GOVERNANCE CHECK FAILED

**Agent**: <agent-name>  
**Repository**: <repository-name>  
**Check Failed**: Check 1: Own Contract Alignment | Check 2: Repository Governance Alignment  
**Timestamp**: <ISO 8601 timestamp>

### Misalignment Details
<Specific description of gap detected>

Example:
- Agent contract version: v2.0.0
- Expected version per canonical governance: v2.1.0
- Governance source: maturion-foreman-governance/governance/canon/...

### Authority Check
This agent is NOT authorized to self-align for this type of misalignment.

### Required Action
- **Escalation Target**: <CS2 | FM | governance-repo-administrator>
- **Action Required**:
  1. Review governance profile/canon update
  2. Update agent contract to match canonical requirements
  3. Commit and push contract update
  4. Notify agent to restart job

### Current Status
- **Work Status**: HALTED
- **PR Status**: CLOSED (awaiting alignment)
- **Agent Status**: AWAITING_ALIGNMENT

### References
- AGENT_SELF_GOVERNANCE_PROTOCOL.md Section 5 (Agent-Specific Rules)
- AGENT_CANONICAL_CONTEXT_SYNCHRONISATION_PROTOCOL.md
- <Link to canonical governance source>

**Escalated By**: <agent-name>  
**Escalated To**: <authority-name>  
**Escalation Method**: <GitHub Issue | PR Comment | Direct Notification>
```

---

## Audit Trail Requirements

Every alignment failure and escalation MUST be recorded with:

1. **Failure Record**:
   - Timestamp of detection
   - Check that failed (Check 1 or Check 2)
   - Specific misalignment details
   - Agent decision (escalate)

2. **Escalation Record**:
   - Escalation message sent
   - Escalation target
   - Escalation method
   - Escalation status

3. **Resolution Record**:
   - Authority action taken
   - Contract/governance update details
   - Resolution timestamp
   - Job restart confirmation

4. **Completion Record**:
   - Alignment verification after restart
   - Final status (ALIGNED)
   - Attestation in progress report

---

## Recovery Path

After authority resolves misalignment:

```
1. CS2/Authority commits contract/governance update
        ↓
2. Agent receives notification (or detects change on next poll)
        ↓
3. Job restarts from beginning
        ↓
4. Agent performs self-governance check (Step 1)
        ↓
5. Gap analysis (Step 3) now shows ALIGNED
        ↓
6. Agent proceeds with work (Step 4)
        ↓
7. Attestation documents full cycle:
   • Initial failure
   • Escalation
   • Resolution
   • Alignment verified
```

---

**Maintained By**: governance-repo-administrator  
**Authority**: AGENT_SELF_GOVERNANCE_PROTOCOL.md v1.0.0  
**Last Updated**: 2026-01-21
