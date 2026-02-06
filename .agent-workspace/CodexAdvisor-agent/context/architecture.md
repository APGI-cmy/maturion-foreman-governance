# System Architecture

## Repository Structure

```
maturion-foreman-governance/ (CANONICAL)
├── governance/
│   ├── canon/              # Tier 0: Constitutional documents
│   ├── policies/           # Tier 1: Policies and standards
│   ├── procedures/         # Tier 2: Implementation procedures
│   └── TIER_0_CANON_MANIFEST.json
├── .agent-workspace/       # Agent memory and learning
├── .github/
│   ├── agents/            # Agent contracts
│   └── workflows/         # CI/CD workflows
├── GOVERNANCE_ARTIFACT_INVENTORY.md
└── ... (documentation, evidence, reports)
```

## Governance Tiers

### Tier 0: Canon (Constitutional)
- Immutable without CS2 approval
- Source of truth for all governance
- Examples: LIVING_AGENT_SYSTEM.md, BUILD_PHILOSOPHY.md

### Tier 1: Policies
- Derived from canon
- Require governance ripple on change
- Examples: Testing policies, quality gates

### Tier 2: Procedures
- Implementation details
- Can evolve with approval
- Examples: Specific workflows, checklists

## Integration Points

### Governance Ripple
- Canon changes flow to consumer repositories
- Documented in GOVERNANCE_ARTIFACT_INVENTORY.md
- Must be executed for canonical changes

### Agent Coordination
- Escalation inbox enables handoffs
- Working contracts define session boundaries
- Memory enables cross-session learning

### CI/CD Integration
- Workflows enforce governance gates
- Quality checks run automatically
- Merge gates prevent non-compliant changes

---

**Authority**: Repository structure, LIVING_AGENT_SYSTEM.md  
**Version**: 1.0.0  
**Last Updated**: 2026-02-06
