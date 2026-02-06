# Dependencies

This file documents integration points and dependencies with other system components.

## Agent Dependencies

### Upstream (Depends On)
- [Agent or system this agent depends on]
- [Expected inputs or handoffs]
- [Required state or conditions]

### Downstream (Depended Upon By)
- [Agents or systems that depend on this agent]
- [Expected outputs or handoffs]
- [Produced artifacts or state]

## Repository Dependencies

### Canonical Governance
- **Source**: `governance/canon/*`
- **Purpose**: Constitutional rules and standards
- **Update Frequency**: Rare, requires CS2 approval

### Inventory
- **Source**: `GOVERNANCE_ARTIFACT_INVENTORY.md`
- **Purpose**: Track all governance artifacts
- **Update Frequency**: On every governance change

### Agent Contracts
- **Source**: `.github/agents/*.md`
- **Purpose**: Agent identity and boundaries
- **Update Frequency**: Rare, requires CS2 approval

## External Dependencies

### Consumer Repositories
- [List repositories that consume governance from this repo]
- [Document ripple requirements]
- [Note synchronization mechanisms]

### Tools and Services
- [Document external tools used]
- [Note service dependencies]
- [Specify version requirements]

## Escalation Paths

- **CS2**: For contract interpretation, governance ambiguity
- **CodexAdvisor**: For cross-repo coordination
- **Governance Admin**: For canonical changes and ripple

---

**Note**: This template should be customized for each specific agent type.

**Authority**: LIVING_AGENT_SYSTEM.md  
**Version**: 1.0.0  
**Last Updated**: 2026-02-06
