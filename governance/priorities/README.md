# Agent Priority System

This directory implements the **priority-based context loading system** defined in `AGENT_PRIORITY_SYSTEM.md`.

## Purpose

Enable dynamic, role-specific context loading for agents without requiring contract modifications.

## Structure

```
priorities/
├── README.md                     # This file
├── supervisor/                   # Foreman agent class
│   ├── level-0-critical.txt     # Constitutional constraints
│   ├── level-1-high.txt         # Role-specific canon
│   ├── level-2-medium.txt       # Domain guidance
│   └── level-3-low.txt          # Reference material
├── implementer/                  # Builder agent class
│   ├── level-0-critical.txt
│   ├── level-1-high.txt
│   ├── level-2-medium.txt
│   └── level-3-low.txt
├── administrator/                # governance-repo-administrator class
│   ├── level-0-critical.txt
│   ├── level-1-high.txt
│   ├── level-2-medium.txt
│   └── level-3-low.txt
├── overseer/                     # CodexAdvisor agent class
│   ├── level-0-critical.txt
│   ├── level-1-high.txt
│   ├── level-2-medium.txt
│   └── level-3-low.txt
├── liaison/                      # Governance liaison class
│   ├── level-0-critical.txt
│   ├── level-1-high.txt
│   ├── level-2-medium.txt
│   └── level-3-low.txt
└── overrides/                    # Agent-specific overrides
    ├── foreman.txt              # Foreman-specific additions
    ├── governance-repo-administrator.txt
    └── CodexAdvisor-agent.txt
```

## Priority Levels

| Level | Name | When Loaded | Purpose |
|-------|------|-------------|---------|
| **0** | Critical | Always, first | Constitutional constraints |
| **1** | High | Always, second | Role-specific canon |
| **2** | Medium | Conditional | Domain-specific guidance |
| **3** | Low | On-demand | Reference material |

## File Format

Each `.txt` file contains one governance artifact path per line:

```
# Level 0: Critical (Constitutional Constraints)
governance/CONSTITUTION.md
governance/canon/BUILD_PHILOSOPHY.md
governance/canon/GOVERNANCE_PURPOSE_AND_SCOPE.md
governance/canon/LIVING_AGENT_SYSTEM.md
governance/canon/AGENT_CONTRACT_ARCHITECTURE.md
```

**Rules**:
- Paths relative to repository root
- One path per line
- Comments start with `#`
- Empty lines ignored
- All paths MUST exist (validated by CI)

## Maintenance

### Adding New Canon

When new canonical governance is created:

1. **Determine priority level**:
   - Constitutional? → Level 0
   - Role-specific? → Level 1
   - Domain-specific? → Level 2
   - Reference? → Level 3

2. **Add to appropriate class files**:
   ```bash
   # Example: New foreman canon (Level 1)
   echo "governance/canon/NEW_FOREMAN_CANON.md" >> governance/priorities/supervisor/level-1-high.txt
   ```

3. **Validate**:
   ```bash
   .github/scripts/validate-priority-files.sh
   ```

### Agent-Specific Overrides

For agent-instance-specific context (e.g., repo-specific requirements):

```bash
# Create override file
echo "docs/repo-specific/security-requirements.md" > governance/priorities/overrides/foreman-isms.txt
```

## Validation

Priority files are validated in CI:
- All referenced files exist
- No duplicate entries
- Valid format (paths, comments, empty lines only)
- Level 0 mandatory for all classes

## Integration

Agents load priority context during Phase 2 (Induction) per `AGENT_INDUCTION_PROTOCOL.md`:

```bash
# Wake-up protocol automatically loads priority context
.github/scripts/wake-up-protocol.sh <agent-type>
```

---

**Authority**: AGENT_PRIORITY_SYSTEM.md v1.0.0  
**Canonical Home**: maturion-foreman-governance  
**Layer-Down**: PUBLIC_API (all consumer repos must implement)
