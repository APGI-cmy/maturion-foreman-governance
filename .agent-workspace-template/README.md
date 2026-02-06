# Agent Workspace Template

This directory provides the canonical template structure for agent workspaces as defined in `governance/canon/LIVING_AGENT_SYSTEM.md`.

## Purpose

Each agent maintains a persistent workspace to enable:
- **Rolling Memory**: Last 5 sessions retained, older archived
- **Continuous Learning**: Patterns, mistakes, and improvements captured
- **Context Preservation**: Big-picture understanding maintained across sessions
- **Smart Escalation**: Cross-agent handoffs and coordination

## Directory Structure

```
.agent-workspace/<agent-type>/
├── memory/                      # Rolling memory (last 5 sessions)
│   ├── session-*.md            # Individual session memories
│   └── .archive/               # Older sessions + monthly summaries
│       ├── summary-YYYY-MM.md  # Monthly summary
│       └── sessions-YYYY-MM/   # Full archived sessions
├── working-contract.md         # Current session context (EPHEMERAL)
├── environment-health.json     # Last environment check (EPHEMERAL)
├── personal/                   # Private learnings (PERSISTENT)
│   ├── lessons-learned.md      # Mistakes to avoid
│   ├── patterns.md             # Recurring patterns
│   ├── efficiency-log.md       # Process improvements
│   └── anti-patterns.md        # Things that don't work
├── context/                    # Big-picture understanding (PERSISTENT)
│   ├── system-purpose.md       # Overall system goals
│   ├── architecture.md         # High-level architecture
│   ├── agent-role.md           # This agent's role in ecosystem
│   └── dependencies.md         # Integration points
└── escalation-inbox/           # Handoffs from other agents (PERSISTENT)
    ├── from-<agent>-*.md       # Incoming escalations
    └── resolved/               # Processed escalations
```

## Ephemeral vs Persistent Files

### Ephemeral (Gitignored)
- `working-contract.md` - Regenerated each session
- `environment-health.json` - Regenerated each session

### Persistent (Committed)
- All `memory/` files - Session history and learning
- All `personal/` files - Agent-specific learnings
- All `context/` files - System understanding
- All `escalation-inbox/` files - Cross-agent coordination

## Usage

To create a new agent workspace:

```bash
# Copy template
cp -r .agent-workspace-template .agent-workspace/<agent-type>

# Populate context files
cd .agent-workspace/<agent-type>/context
# Edit system-purpose.md, architecture.md, agent-role.md, dependencies.md

# Initialize personal files
cd ../personal
# Create initial lessons-learned.md, patterns.md, etc.
```

## Governance

- **Authority**: `governance/canon/LIVING_AGENT_SYSTEM.md`
- **Version**: 1.0.0
- **Status**: CANONICAL
- **Last Updated**: 2026-02-06

## Memory Rotation

- Last 5 sessions kept in `memory/`
- Older sessions moved to `memory/.archive/sessions-YYYY-MM/`
- Monthly summaries created in `memory/.archive/summary-YYYY-MM.md`
- No permanent deletion without CS2 approval

## Prohibition

❌ **NEVER** delete memory files without archiving  
❌ **NEVER** gitignore the entire `.agent-workspace/` directory  
❌ **NEVER** skip wake-up or closure protocols  
❌ **NEVER** bypass memory rotation procedures
