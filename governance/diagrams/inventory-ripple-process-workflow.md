# Inventory Ripple Process Workflow

**Purpose**: Visual representation of the inventory ripple and reference process when canonical governance changes.  
**Authority**: AGENT_SELF_GOVERNANCE_PROTOCOL.md Section 8.2  
**Maintained By**: governance-repo-administrator  
**Last Updated**: 2026-01-21

---

## Inventory Ripple Workflow

```
═══════════════════════════════════════════════════════════════════════════
            WHEN CANONICAL GOVERNANCE CHANGES (Canon/Workflow/Scripts)
═══════════════════════════════════════════════════════════════════════════

┌───────────────────────────────────────────────────────────────────────┐
│ Trigger: Canonical Governance Change Detected                         │
│ ────────────────────────────────────────────────                      │
│ Change Types:                                                         │
│   • New canon file created in governance/canon/                       │
│   • Existing canon file modified                                      │
│   • Workflow automation updated (.github/workflows/, scripts/)        │
│   • Validator/checker script modified                                 │
│   • Schema or policy changed                                          │
│                                                                       │
│ Detection:                                                            │
│   • governance-repo-administrator monitors governance repo commits    │
│   • CI workflow completion notifications                              │
│   • Manual identification by CS2                                      │
└─────────────────────────────┬─────────────────────────────────────────┘
                              ↓
┌───────────────────────────────────────────────────────────────────────┐
│ Step 1: governance-repo-administrator Analyzes Change                 │
│ ────────────────────────────────────────────────────────────          │
│ Responsibilities:                                                     │
│   1. Identify changed/new files                                       │
│   2. Classify change impact (affects consumer repos?)                 │
│   3. Determine ripple scope:                                          │
│      • Which canon files changed?                                     │
│      • Which workflow/automation files affected?                      │
│      • Which consumer repos consume these artifacts?                  │
│      • Breaking vs non-breaking change?                               │
│                                                                       │
│ Output: Ripple Impact Assessment                                      │
│   • List of changed artifacts                                         │
│   • List of affected consumer repos                                   │
│   • Ripple priority (high/medium/low)                                 │
└─────────────────────────────┬─────────────────────────────────────────┘
                              ↓
┌───────────────────────────────────────────────────────────────────────┐
│ Step 2: Update GOVERNANCE_ARTIFACT_INVENTORY.md (Canonical)           │
│ ────────────────────────────────────────────────────────────          │
│ governance-repo-administrator updates central inventory:              │
│                                                                       │
│ For each changed artifact:                                            │
│   1. Add new entry (if new file) OR update existing entry             │
│   2. Update version marker:                                           │
│      • Increment version (e.g., v1.0.0 → v1.1.0)                      │
│      • OR add new version field if missing                            │
│   3. Mark last-updated timestamp (ISO 8601 format)                    │
│      Example: "last_updated": "2026-01-21T15:00:00Z"                  │
│   4. Document ripple requirement:                                     │
│      • "ripple_required": true                                        │
│      • "ripple_priority": "high|medium|low"                           │
│      • "affected_repos": ["office-app", "PartPulse", "R_Roster"]      │
│                                                                       │
│ Commit message: "Inventory update: <artifact-name> v<version>"        │
└─────────────────────────────┬─────────────────────────────────────────┘
                              ↓
┌───────────────────────────────────────────────────────────────────────┐
│ Step 3: Create Ripple Plan                                            │
│ ────────────────────────────                                          │
│ governance-repo-administrator creates comprehensive ripple plan:      │
│                                                                       │
│ For each affected consumer repo (office-app, PartPulse, R_Roster):    │
│                                                                       │
│   1. Identify all artifacts to ripple:                                │
│      ✓ Canon files (governance/canon/*)                               │
│      ✓ Workflow automation (.github/workflows/*, scripts/*)           │
│      ✓ Inventories (GOVERNANCE_ARTIFACT_INVENTORY.md)                 │
│      ✓ Diagrams (governance/diagrams/*)                               │
│      ✓ Validators/checkers (.github/scripts/*)                        │
│                                                                       │
│   2. Determine layer-down method:                                     │
│      • governance-liaison self-align (for most changes)               │
│      • Manual CS2 intervention (for breaking changes)                 │
│                                                                       │
│   3. Create ripple tracking entry:                                    │
│      • Repo: <consumer-repo-name>                                     │
│      • Artifacts: <list of files to ripple>                           │
│      • Status: PENDING                                                │
│      • Created: <timestamp>                                           │
│      • Priority: <high|medium|low>                                    │
│                                                                       │
│ Output: Ripple Plan Document (governance/reports/ripple-<date>.md)    │
└─────────────────────────────┬─────────────────────────────────────────┘
                              ↓
┌───────────────────────────────────────────────────────────────────────┐
│ Step 4: Create Downstream Issues/PRs                                  │
│ ────────────────────────────────────────                              │
│ For each consumer repo in ripple plan:                                │
│                                                                       │
│   1. Create issue in consumer repo:                                   │
│      Title: "[GOVERNANCE RIPPLE] Update to canonical <artifact>       │
│              v<version>"                                              │
│      Body:                                                            │
│        • Canonical version: <commit-SHA or tag>                       │
│        • Changed artifacts: <list>                                    │
│        • Reason: <why change was made>                                │
│        • Priority: <high|medium|low>                                  │
│        • Action required:                                             │
│          "governance-liaison: Perform self-governance check,          │
│          detect Check 2 misalignment, self-align by layering down     │
│          canonical artifacts"                                         │
│        • Reference: AGENT_SELF_GOVERNANCE_PROTOCOL.md Section 5.1     │
│                                                                       │
│   2. Assign issue to:                                                 │
│      • Primary: governance-liaison (in consumer repo)                 │
│      • CC: CS2 for tracking                                           │
│                                                                       │
│   3. Label issue:                                                     │
│      • governance-ripple                                              │
│      • canonical-alignment                                            │
│      • priority-<high|medium|low>                                     │
│                                                                       │
│   4. Update ripple tracking:                                          │
│      • Status: ISSUE_CREATED                                          │
│      • Issue URL: <link>                                              │
└─────────────────────────────┬─────────────────────────────────────────┘
                              ↓
┌───────────────────────────────────────────────────────────────────────┐
│ Step 5: governance-liaison in Consumer Repo Self-Aligns               │
│ ────────────────────────────────────────────────────────────          │
│ governance-liaison receives issue notification:                       │
│                                                                       │
│   1. Performs self-governance check (AGENT_SELF_GOVERNANCE_PROTOCOL):  │
│      • Step 1: Read own .agent file                                   │
│      • Step 2: Identify canonical source                              │
│      • Step 3: Gap analysis                                           │
│        → Check 1: Own contract (likely ALIGNED)                       │
│        → Check 2: Repo governance (MISALIGNED - triggers self-align)  │
│                                                                       │
│   2. Self-Align Procedure (Check 2 authorized):                       │
│      a. Identify outdated/missing governance artifacts                │
│      b. Copy latest canonical files from                              │
│         maturion-foreman-governance:                                  │
│         • governance/canon/* (changed files)                          │
│         • .github/workflows/* (if changed)                            │
│         • scripts/* (if changed)                                      │
│         • governance/diagrams/* (if changed)                          │
│      c. Update local GOVERNANCE_ARTIFACT_INVENTORY.md:                │
│         • Mark new versions                                           │
│         • Update last-updated timestamps                              │
│         • Reference canonical commit SHA                              │
│      d. Update GOVERNANCE_ALIGNMENT.md:                               │
│         • Confirm alignment with canonical version                    │
│         • Timestamp alignment check                                   │
│      e. Commit changes:                                               │
│         Message: "Governance layer-down: canonical v<version>"        │
│      f. Create PR with alignment confirmation                         │
│                                                                       │
│   3. Include self-governance attestation in PR:                       │
│      • Self-governance check PASSED                                   │
│      • Check 2 self-aligned                                           │
│      • Artifacts layered down: <list>                                 │
│      • Alignment verified: <timestamp>                                │
│                                                                       │
│   4. Close ripple issue with PR link                                  │
└─────────────────────────────┬─────────────────────────────────────────┘
                              ↓
┌───────────────────────────────────────────────────────────────────────┐
│ Step 6: Verify Ripple Completion                                      │
│ ────────────────────────────────────                                  │
│ governance-repo-administrator tracks ripple propagation:              │
│                                                                       │
│ For each consumer repo:                                               │
│   1. Monitor ripple PR status:                                        │
│      • PR created? (governance-liaison action)                        │
│      • Gates passing?                                                 │
│      • PR merged? (indicates ripple complete)                         │
│                                                                       │
│   2. Verify inventory alignment:                                      │
│      • Check consumer GOVERNANCE_ARTIFACT_INVENTORY.md                │
│      • Confirm version markers match canonical                        │
│      • Confirm last-updated timestamps current                        │
│                                                                       │
│   3. Update ripple tracking:                                          │
│      • Status: PR_CREATED → PR_MERGED → COMPLETE                      │
│      • Completion timestamp                                           │
│                                                                       │
│ When ALL consumer repos complete:                                     │
│   • Mark ripple COMPLETE in central tracking                          │
│   • Update governance/CHANGELOG.md:                                   │
│     "Ripple complete: <artifact> v<version> propagated to all         │
│     consumer repos (office-app, PartPulse, R_Roster)"                 │
│   • Close all tracking issues                                         │
│                                                                       │
│ If any consumer repo BLOCKED or FAILED:                               │
│   • Escalate to CS2                                                   │
│   • Document blocker                                                  │
│   • Mark ripple ESCALATED in tracking                                 │
└───────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════
                          END OF RIPPLE WORKFLOW
═══════════════════════════════════════════════════════════════════════════
```

---

## Ripple Tracking States

```
DETECTED → ANALYZED → INVENTORY_UPDATED → PLAN_CREATED → ISSUES_CREATED
    ↓
    └→ For each consumer repo:
       PENDING → PR_CREATED → PR_MERGED → VERIFIED → COMPLETE
                        ↓
                        └→ If blocked: ESCALATED (to CS2)
```

---

## Inventory Update Requirements

Every canonical change MUST update:
1. **GOVERNANCE_ARTIFACT_INVENTORY.md** (main repo)
   - Add/update artifact entry
   - Increment version marker
   - Mark last-updated timestamp
   - Document ripple requirement

2. **Ripple Plan Document** (governance/reports/ripple-<date>.md)
   - List affected consumer repos
   - List artifacts to ripple
   - Track propagation status

3. **Consumer Repo Inventories** (via governance-liaison self-align)
   - Update GOVERNANCE_ARTIFACT_INVENTORY.md (local)
   - Update GOVERNANCE_ALIGNMENT.md
   - Confirm canonical version alignment

---

## Ripple Artifact Superset

ALL of the following MUST ripple when changed:

| Artifact Type | Location | Ripple Method |
|---------------|----------|---------------|
| Canon Files | governance/canon/*.md | governance-liaison self-align |
| Workflow Automation | .github/workflows/*.yml | governance-liaison self-align |
| Scripts | scripts/*, .github/scripts/* | governance-liaison self-align |
| Inventories | GOVERNANCE_ARTIFACT_INVENTORY.md | governance-liaison self-align |
| Diagrams | governance/diagrams/*.md | governance-liaison self-align |
| Validators | .github/scripts/check_*.py | governance-liaison self-align |
| Schemas | governance/schemas/*.md | governance-liaison self-align |

---

## Agent Responsibilities Summary

### governance-repo-administrator
- Detect canonical changes
- Update central GOVERNANCE_ARTIFACT_INVENTORY.md
- Create ripple plan
- Create downstream issues
- Track ripple completion
- Verify consumer repo alignment

### governance-liaison (Consumer Repos)
- Receive ripple issue notifications
- Perform self-governance check
- Self-align when Check 2 detects repo governance misalignment
- Layer down ALL canonical artifacts (canon + workflow + automation + inventories)
- Create PR with alignment confirmation
- Close ripple issue

### CS2
- Review ripple plans
- Approve breaking changes
- Resolve escalations
- Verify critical ripple completion

---

**Maintained By**: governance-repo-administrator  
**Authority**: AGENT_SELF_GOVERNANCE_PROTOCOL.md v1.0.0  
**Last Updated**: 2026-01-21
