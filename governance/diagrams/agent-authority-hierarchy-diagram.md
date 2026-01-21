# Agent Authority Hierarchy Diagram

**Purpose**: Visual representation of the agent self-align authority matrix and escalation paths.  
**Authority**: AGENT_SELF_GOVERNANCE_PROTOCOL.md Section 5  
**Maintained By**: governance-repo-administrator  
**Last Updated**: 2026-01-21

---

## Self-Align Authority Matrix

```
═══════════════════════════════════════════════════════════════════════════
                    AGENT SELF-ALIGN AUTHORITY HIERARCHY
═══════════════════════════════════════════════════════════════════════════

┌───────────────────────────────────────────────────────────────────────┐
│                         CS2 (Supreme Authority)                        │
│                     (Johan Ras in Bootstrap Mode)                      │
│ ───────────────────────────────────────────────────────────────       │
│                                                                       │
│ Authority:                                                            │
│   • Can modify ANY agent contract in ANY repository                   │
│   • Can modify canonical governance                                   │
│   • Can override any agent decision                                   │
│   • Final authority on all escalations                                │
│                                                                       │
│ Responsibilities:                                                     │
│   • Resolve escalated alignment issues                                │
│   • Update agent contracts that agents cannot self-update             │
│   • Approve breaking governance changes                               │
│   • Maintain constitutional governance                                │
└───────────────────────────────┬───────────────────────────────────────┘
                                ↓
                     Delegates authority to:
                                ↓
        ┌───────────────────────┴───────────────────────┐
        │                                               │
        ↓                                               ↓
┌────────────────────────┐                   ┌──────────────────────────┐
│ governance-repo-       │                   │ governance-liaison       │
│ administrator          │                   │ (Consumer Repos)         │
│ (Governance Repo)      │                   │ ─────────────────────    │
│ ──────────────────     │                   │                          │
│                        │                   │ Repository:              │
│ Repository:            │                   │   • office-app           │
│   • maturion-foreman-  │                   │   • PartPulse            │
│     governance         │                   │   • R_Roster             │
│     (CANONICAL)        │                   │   • Future consumer repos│
│                        │                   │                          │
│ Check 1 Authority:     │                   │ Check 1 Authority:       │
│   Own Contract         │                   │   Own Contract           │
│   → ESCALATE to CS2    │                   │   → ESCALATE to CS2      │
│   (formal change       │                   │   (cannot self-modify)   │
│   process required)    │                   │                          │
│                        │                   │ Check 2 Authority:       │
│ Check 2 Authority:     │                   │   Repo Governance        │
│   Canonical Governance │                   │   → SELF-ALIGN           │
│   → SELF-ALIGN         │                   │   (layer down canonical) │
│   (update inventory,   │                   │                          │
│   create ripple plan,  │                   │ Self-Align Procedure:    │
│   create downstream    │                   │   1. Identify outdated/  │
│   issues)              │                   │      missing artifacts   │
│                        │                   │   2. Copy canonical:     │
│ Special Duties:        │                   │      • governance/canon/*│
│   • Maintain canonical │                   │      • .github/workflows/│
│     INVENTORY.md       │                   │      • scripts/*         │
│   • Track ripple to    │                   │      • diagrams/*        │
│     consumer repos     │                   │   3. Update INVENTORY.md │
│   • Create ripple      │                   │   4. Update ALIGNMENT.md │
│     issues             │                   │   5. Commit & verify     │
│   • Verify completion  │                   │                          │
└────────────────────────┘                   │ Escalates When:          │
                                             │   • Own contract         │
                                             │     misaligned           │
                                             │   • Cannot resolve       │
                                             │     alignment issue      │
                                             └──────────────────────────┘

                                ↓
                     Supervises/Manages:
                                ↓
                ┌───────────────┴───────────────┐
                │                               │
                ↓                               ↓
┌────────────────────────┐            ┌──────────────────────────┐
│ FM Agent               │            │ Builder Agents           │
│ (Consumer Repos)       │            │ (Consumer Repos)         │
│ ──────────────────     │            │ ──────────────────       │
│                        │            │                          │
│ Repository:            │            │ Repository:              │
│   • office-app         │            │   • office-app           │
│   • PartPulse          │            │   • PartPulse            │
│   • R_Roster           │            │   • R_Roster             │
│   • Future apps        │            │   • Future apps          │
│                        │            │                          │
│ Check 1 Authority:     │            │ Check 1 Authority:       │
│   Own Contract         │            │   Own Contract           │
│   → ESCALATE to CS2    │            │   → ESCALATE to FM/CS2   │
│   (cannot self-modify) │            │   (cannot self-modify)   │
│                        │            │                          │
│ Check 2 Authority:     │            │ Check 2 Authority:       │
│   Repo Governance      │            │   N/A                    │
│   → ESCALATE to CS2    │            │   (no authority to check │
│   (FM may NOT layer    │            │   repo governance)       │
│   down governance)     │            │                          │
│                        │            │ Responsibilities:        │
│ Special Rule:          │            │   • Trust FM for         │
│   • FM supervises      │            │     governance currency  │
│     builders but       │            │   • Escalate if own      │
│     cannot update own  │            │     contract misaligned  │
│     contract           │            │   • Follow governance    │
│   • FM detects builder │            │     requirements in work │
│     misalignment and   │            │                          │
│     escalates          │            │ Escalation Path:         │
│                        │            │   Builder → FM → CS2     │
│ Escalation Path:       │            │                          │
│   FM → CS2             │            └──────────────────────────┘
└────────────────────────┘

═══════════════════════════════════════════════════════════════════════════
```

---

## Authority Summary Table

| Agent Type | Check 1 (Own Contract) | Check 2 (Repo Governance) | Can Self-Align? |
|------------|------------------------|---------------------------|-----------------|
| **governance-repo-administrator** | ESCALATE to CS2 | SELF-ALIGN (inventory/ripple) | Yes (Check 2 only) |
| **governance-liaison** | ESCALATE to CS2 | SELF-ALIGN (layer-down) | Yes (Check 2 only) |
| **FM Agent** | ESCALATE to CS2 | ESCALATE to CS2 | No |
| **Builder Agents** | ESCALATE to FM/CS2 | N/A (no check) | No |

---

## Escalation Paths Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ESCALATION PATHS                             │
│                                                                     │
│  Builder Agent          FM Agent              governance-liaison   │
│  (Check 1 fails)        (Check 1 fails)       (Check 1 fails)      │
│       ↓                     ↓                       ↓              │
│       FM Agent              │                       │              │
│       ↓                     ↓                       ↓              │
│       └─────────────────────┴───────────────────────┘              │
│                             ↓                                      │
│                          CS2                                       │
│                          (Resolves)                                │
│                             ↓                                      │
│                    Updates Contract                                │
│                             ↓                                      │
│                    Agent Restarts Job                              │
│                                                                     │
│  governance-liaison     governance-repo-administrator              │
│  (Check 2 fails)        (Check 2 fails)                            │
│       ↓                     ↓                                      │
│   SELF-ALIGN            SELF-ALIGN                                 │
│   (layer-down)          (inventory/ripple)                         │
│       ↓                     ↓                                      │
│   Alignment Verified    Alignment Verified                         │
│       ↓                     ↓                                      │
│   Proceed with Work     Proceed with Work                          │
│                                                                     │
│  FM Agent                                                           │
│  (Check 2 fails)                                                    │
│       ↓                                                             │
│   ESCALATE to CS2                                                   │
│   (FM may not layer down governance)                                │
│       ↓                                                             │
│   CS2 coordinates with governance-liaison                           │
│       ↓                                                             │
│   governance-liaison layers down governance                         │
│       ↓                                                             │
│   FM restarts job                                                   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Self-Modification Prohibition (ABSOLUTE)

```
═══════════════════════════════════════════════════════════════════════════
                    SELF-MODIFICATION PROHIBITION
═══════════════════════════════════════════════════════════════════════════

┌───────────────────────────────────────────────────────────────────────┐
│                      NO AGENT CAN MODIFY OWN CONTRACT                 │
│                                                                       │
│  ❌ governance-repo-administrator CANNOT modify:                      │
│     • .github/agents/governance-repo-administrator.agent.md           │
│     (Must escalate to CS2, requires formal change process)            │
│                                                                       │
│  ❌ governance-liaison CANNOT modify:                                 │
│     • .github/agents/governance-liaison.agent.md                      │
│     (Must escalate to CS2)                                            │
│                                                                       │
│  ❌ FM Agent CANNOT modify:                                           │
│     • .github/agents/foreman.agent.md                                 │
│     (Must escalate to CS2)                                            │
│                                                                       │
│  ❌ Builder Agents CANNOT modify:                                     │
│     • .github/agents/<builder-name>.agent.md                          │
│     (Must escalate to FM, then CS2)                                   │
│                                                                       │
│  ❌ CodexAdvisor CANNOT modify:                                       │
│     • .github/agents/CodexAdvisor-agent.md                            │
│     (CS2 exclusive authority)                                         │
│                                                                       │
│  Violation Consequence:                                               │
│   • Immediate agent revocation                                        │
│   • Classification as catastrophic governance violation               │
│   • Escalation to CS2                                                 │
│   • All actions after self-modification are INVALID                   │
│                                                                       │
│  Rationale:                                                           │
│   Self-modification creates accountability gaps, enables              │
│   self-governance, and violates separation of duties.                 │
│   Contract updates are governance actions, not agent capabilities.    │
└───────────────────────────────────────────────────────────────────────┘
```

---

## Agent Capabilities Summary

### governance-repo-administrator
✅ **CAN**:
- Update GOVERNANCE_ARTIFACT_INVENTORY.md
- Create ripple plans for consumer repos
- Create downstream issues for governance-liaison
- Track ripple propagation
- Update canonical diagrams
- Maintain canonical governance files (per formal process)

❌ **CANNOT**:
- Modify own contract (must escalate to CS2)
- Modify CodexAdvisor contract
- Modify consumer repo agent contracts directly (governance-liaison does this)

---

### governance-liaison
✅ **CAN**:
- Layer down canonical governance to local repo
- Layer down workflow automation (scripts, CI YAML)
- Layer down inventories and diagrams
- Update local GOVERNANCE_ARTIFACT_INVENTORY.md
- Update GOVERNANCE_ALIGNMENT.md
- Self-align when Check 2 detects repo governance misalignment

❌ **CANNOT**:
- Modify own contract (must escalate to CS2)
- Modify canonical governance in maturion-foreman-governance
- Skip workflow/automation artifacts during layer-down
- Proceed without re-verification after self-align

---

### FM Agent
✅ **CAN**:
- Supervise builder agents
- Detect builder contract misalignment
- Coordinate with governance-liaison for repo governance updates

❌ **CANNOT**:
- Modify own contract (must escalate to CS2)
- Layer down governance (that's governance-liaison's role)
- Self-align for any type of misalignment

---

### Builder Agents
✅ **CAN**:
- Perform assigned build/test/deployment work
- Detect own contract misalignment

❌ **CANNOT**:
- Modify own contract (must escalate to FM/CS2)
- Check repo governance alignment (no authority)
- Self-align for any type of misalignment

---

**Maintained By**: governance-repo-administrator  
**Authority**: AGENT_SELF_GOVERNANCE_PROTOCOL.md v1.0.0, AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md v3.0.0  
**Last Updated**: 2026-01-21
