# Dependencies: Governance Repository Administrator

## Agent Dependencies

### Upstream (Depends On)

**CS2 (Constitutional Authority)**
- **Inputs**: Governance interpretation, canon approval, contract guidance
- **Conditions**: CS2 approval required for constitutional changes
- **Frequency**: Rare, only for ambiguity or structural changes

**CodexAdvisor**
- **Inputs**: Cross-repo coordination requests, ripple execution assistance
- **Conditions**: Available for multi-repo governance work
- **Frequency**: On demand for governance ripple

### Downstream (Depended Upon By)

**All Consumer Repository Agents**
- **Outputs**: Canonical governance artifacts, updated inventory
- **State**: Clean, rippled governance ready for consumption
- **Frequency**: On every governance change

**CodexAdvisor**
- **Outputs**: Ripple instructions, governance updates
- **State**: Documented changes in inventory
- **Frequency**: When canon changes require cross-repo coordination

## Repository Dependencies

### Canonical Governance
- **Source**: `governance/canon/*`
- **Purpose**: Constitutional rules and standards (Tier 0)
- **Responsibility**: This agent manages these files
- **Update Frequency**: Rare, requires CS2 approval

### Inventory
- **Source**: `GOVERNANCE_ARTIFACT_INVENTORY.md`
- **Purpose**: Track all governance artifacts and versions
- **Responsibility**: This agent maintains this file
- **Update Frequency**: On every governance file change

### Agent Contracts
- **Source**: `.github/agents/*.md`
- **Purpose**: Agent identity and boundaries
- **Responsibility**: Read-only for this agent (CS2 manages)
- **Update Frequency**: Rare, requires CS2 approval

### TIER_0_CANON_MANIFEST
- **Source**: `governance/TIER_0_CANON_MANIFEST.json`
- **Purpose**: Index of all canonical documents
- **Responsibility**: Update when canon changes
- **Update Frequency**: When canon files are added/removed/renamed

## External Dependencies

### Consumer Repositories
**Known Consumers** (as of 2026-02-06):
- [To be documented as consumers are identified]
- Each requires governance ripple on canon changes
- Synchronization via CodexAdvisor or manual PR

### Tools and Services
- **jq**: JSON parsing for manifest validation
- **git**: Version control operations
- **grep/ripgrep**: Content search and validation
- **bash**: Execution of wake-up and closure protocols

## Escalation Paths

### To CS2
- **When**: Contract interpretation needed, governance ambiguity, canon structural changes
- **How**: Create escalation file in escalation-inbox
- **Example**: "Is this change constitutional?"

### To CodexAdvisor
- **When**: Cross-repo governance ripple needed
- **How**: Create escalation file with ripple instructions
- **Example**: "Canon changed, ripple to consumer repos"

### From Consumer Repo Agents
- **When**: Governance questions, drift detection, canon clarification
- **How**: Receive escalation files in escalation-inbox
- **Example**: "Our canon copy is outdated, please advise"

---

**Authority**: .github/agents/governance-repo-administrator.agent.md, LIVING_AGENT_SYSTEM.md  
**Version**: 5.0.0  
**Last Updated**: 2026-02-06
