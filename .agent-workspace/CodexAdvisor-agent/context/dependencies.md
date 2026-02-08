# Dependencies: CodexAdvisor

## Agent Dependencies

### Upstream (Depends On)

**CS2 (Constitutional Authority)**
- **Inputs**: Governance interpretation, conflict resolution, final decisions
- **Conditions**: Required for governance ambiguity and conflicts
- **Frequency**: Rare, escalate only when analysis reveals ambiguity

**Human Approval**
- **Inputs**: Explicit approval for ALL actions
- **Conditions**: ALWAYS required before any execution
- **Frequency**: Every proposed action

### Downstream (Depended Upon By)

**Governance Repository Administrator**
- **Outputs**: Governance drift reports, ripple coordination
- **State**: Multi-repo analysis and recommendations
- **Frequency**: On demand for cross-repo work

**Consumer Repository Agents**
- **Outputs**: Governance alignment verification, update coordination
- **State**: Cross-repo governance state reports
- **Frequency**: On governance changes or drift detection

## Repository Dependencies

### Multi-Repo Scope
- **Repositories**: 
  - APGI-cmy/maturion-foreman-governance (canonical)
  - APGI-cmy/maturion-foreman-office-app (consumer)
  - APGI-cmy/PartPulse (consumer)
  - APGI-cmy/R_Roster (consumer)

### Canonical Governance
- **Source**: `governance/canon/*` in governance repo
- **Purpose**: Source of truth for all governance
- **Responsibility**: Monitor, never modify without approval
- **Update Frequency**: Rare

### Layered-Down Governance
- **Source**: Consumer repo copies of canonical governance
- **Purpose**: Verify alignment with canonical source
- **Responsibility**: Detect drift, coordinate updates
- **Update Frequency**: When canonical changes

## External Dependencies

### Git/GitHub
- Multi-repo access for monitoring
- PR creation for coordinated updates
- Issue tracking for drift reports

### Tools and Services
- **jq**: JSON parsing across repositories
- **git**: Multi-repo operations
- **grep/ripgrep**: Cross-repo content search
- **bash**: Execution of coordination protocols

## Escalation Paths

### To CS2
- **When**: Governance interpretation, conflicting canon sources, contract ambiguity
- **How**: Create escalation file with analysis
- **Example**: "Two repos have different canon versions - which is correct?"

### To Governance Admin
- **When**: Canon changes need cross-repo ripple
- **How**: Create escalation with ripple instructions
- **Example**: "Canon updated, coordinate ripple to 3 consumer repos"

### From Consumer Repo Agents
- **When**: Governance questions, drift detection, alignment verification
- **How**: Receive escalation files
- **Example**: "Our governance seems out of date, please verify"

## Approval Workflow

**CRITICAL**: ALL actions require explicit approval

1. **Propose**: Present action with rationale and impact analysis
2. **Wait**: Stop and await human approval
3. **Execute**: Only proceed with explicit permission
4. **Verify**: Confirm action completed successfully
5. **Document**: Record outcome in memory

---

**Authority**: .github/agents/CodexAdvisor-agent.md, LIVING_AGENT_SYSTEM.md  
**Version**: 5.0.0  
**Last Updated**: 2026-02-06
