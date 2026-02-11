# Living Agent System (LAS) - Quick Start Guide

**Version**: 1.0.0 | **Date**: 2026-02-04  
**Authority**: governance/canon/LIVING_AGENT_SYSTEM.md  
**For**: All agents (AI and human) in Maturion governed repositories

---

## What is LAS?

The Living Agent System (LAS) replaces static agent contracts with a dynamic, memory-enabled system that:
- ✅ Loads context from previous 5 sessions automatically
- ✅ Generates working contracts fresh each session
- ✅ Captures learnings and patterns continuously
- ✅ Provides environment health checks before work
- ✅ Prevents static contract drift and maintenance burden
- ✅ Zero direct agent contract file modifications

---

## For AI Agents: Your New Workflow

### Before (Old Model)
```
1. Read 600+ line static agent contract
2. Hope it's current and accurate
3. No memory of previous sessions
4. Manual procedures prone to drift
5. Frequent contract updates needed
```

### After (LAS Model)
```
1. Run wake-up-protocol.sh <agent-type>
2. Read generated working-contract.md (current context + last 5 sessions)
3. Perform work with full context
4. Run session-closure.sh <agent-type>
5. Memory automatically captured for next session
```

---

## Quick Start: 3 Commands

### 1. Wake Up (Session Start)
```bash
.github/scripts/wake-up-protocol.sh <agent-type>
```

**Example**:
```bash
.github/scripts/wake-up-protocol.sh governance-repo-administrator
```

**What happens**:
- ✅ Loads your last 5 session memories
- ✅ Generates working contract with current context
- ✅ Checks environment health (git state, governance alignment)
- ✅ Reviews any escalations waiting for you
- ✅ Analyzes governance gaps
- ✅ Creates workspace if first time

**Output**: Working contract at `.agent-workspace/<agent-type>/working-contract.md`

### 2. Work (Session Middle)
```bash
# Read your working contract
cat .agent-workspace/<agent-type>/working-contract.md

# Do your assigned work per working contract
# Follow canonical governance from CANON_INVENTORY.json
# Capture notes in your personal/ directory as you work
```

**Remember**:
- Follow the **working contract**, not the static agent contract file
- Reference canonical governance, not outdated procedures
- Note lessons learned, patterns, and anti-patterns during work
- Zero direct modifications to agent contract files

### 3. Close (Session End)
```bash
.github/scripts/session-closure.sh <agent-type>
```

**What happens**:
- ✅ Creates session memory with your learnings
- ✅ Rotates old sessions (keeps last 5, archives rest)
- ✅ Updates your personal lessons and patterns
- ✅ Creates escalations if needed (for next agent or CS2)
- ✅ Verifies environment left in safe state
- ✅ Archives working contract for reference

**Interactive prompts**:
- Session purpose and actions taken
- Decisions made and rationale
- Lessons learned
- Patterns observed
- Recommendations for next session
- Escalations to create

---

## Your Workspace Structure

After first wake-up, you'll have:

```
.agent-workspace/<agent-type>/
├── memory/                          # Your last 5 sessions
│   ├── session-20260204-140400.md   # Most recent
│   ├── session-20260203-081234.md
│   ├── session-20260202-143021.md
│   └── .archive/                    # Older sessions + summaries
├── working-contract.md              # Current session (read this!)
├── environment-health.json          # Last health check
├── personal/                        # Your private learnings
│   ├── lessons-learned.md           # Mistakes to avoid
│   ├── patterns.md                  # Recurring patterns you've seen
│   ├── efficiency-log.md            # Process improvements
│   └── anti-patterns.md             # Things that don't work
├── context/                         # Big picture understanding
│   ├── system-purpose.md            # What this system does
│   ├── architecture.md              # How it's structured
│   └── agent-role.md                # Your role in the ecosystem
└── escalation-inbox/                # Handoffs from other agents
    └── resolved/                    # Processed escalations
```

---

## Agent Contract Files: What Changed?

### Old (Static) Agent Contract
- 600+ lines of procedures
- Quickly becomes outdated
- No memory or context
- Direct modifications risky

**Location**: `.github/agents/legacy/<agent-type>.md` (archived)

### New (Minimal) Agent Contract
- YAML frontmatter (identity, bindings, scope)
- Mission statement (1-2 paragraphs)
- LAS protocol reference
- Quick start commands

**Location**: `.github/agents/<agent-type>.md` (current)

### Key Principle
**NEVER modify agent contract files directly**. Escalate contract changes to CS2. Use working contracts for session-specific context.

---

## Example: Complete Session

```bash
# 1. Wake up
$ .github/scripts/wake-up-protocol.sh governance-repo-administrator

[✓] Agent identified: governance-repo-administrator (class: administrator)
[✓] Found 3 previous session(s) in memory
[✓] Working contract generated
[✓] Wake-up protocol complete!

# 2. Read working contract
$ cat .agent-workspace/governance-repo-administrator/working-contract.md

# Working Contract: governance-repo-administrator - Session 20260204-140400
...
## Recent Learnings
### Last 3 Sessions Summary
- Always run validation before handover
- Check scope-to-diff after every file change
- Document ripple requirements in PREHANDOVER_PROOF
...

# 3. Perform work (following working contract)
# ... do your assigned task ...

# 4. Close session
$ .github/scripts/session-closure.sh governance-repo-administrator

Session purpose: Implement LIVING_AGENT_SYSTEM
Actions taken: Created canon, scripts, migrated contracts
Lessons learned: LAS reduces context loss significantly
...
[✓] Session closure protocol complete!
```

---

## Memory Continuity: How It Works

### Session 1
```
Wake-up: No previous sessions
Work: Implement feature X
Closure: Create session memory with learnings
```

### Session 2
```
Wake-up: Load Session 1 memory
Working contract includes: "Last session implemented feature X, learned Y"
Work: Build on Session 1 context
Closure: Create Session 2 memory referencing Session 1
```

### Session 3
```
Wake-up: Load Sessions 1 & 2
Working contract includes: "Pattern: Feature X approach works well"
Work: Apply learned pattern from previous sessions
Closure: Confirm pattern effectiveness
```

**Result**: Continuous improvement loop, no context loss between sessions.

---

## For Human Agents (CS2, FM)

You can:
- ✅ Review agent memories to understand their learnings
- ✅ Add context files to guide agents
- ✅ Resolve escalations in escalation-inbox/
- ✅ Approve agent improvement proposals
- ✅ Use wake-up/closure scripts yourself for consistency

You should:
- ❌ NOT modify agent contract files directly (escalate to CS2)
- ❌ NOT bypass wake-up/closure protocols
- ✅ DO review session memories to track agent progress
- ✅ DO use escalations for agent-to-human communication

---

## Common Questions

### Q: Do I still need to read the agent contract file?
**A**: No. Read the **working contract** generated by wake-up-protocol.sh. It contains your identity plus current context from the last 5 sessions.

### Q: Where do I find my past learnings?
**A**: In your workspace:
- `.agent-workspace/<agent-type>/memory/` - Last 5 sessions
- `.agent-workspace/<agent-type>/personal/` - Cumulative lessons, patterns, anti-patterns

### Q: What if I need to update my agent contract?
**A**: NEVER modify it directly. Create an improvement proposal per MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md and escalate to CS2 for approval.

### Q: How do I coordinate with other agents?
**A**: Use `escalation-inbox/`. Create escalation files during session closure for the target agent to pick up in their next wake-up.

### Q: What if this is my first session ever?
**A**: Wake-up protocol will initialize your workspace with empty memory and default context files. You'll build history from there.

### Q: Can I skip wake-up or closure?
**A**: ❌ NO. Both are **MANDATORY** per LIVING_AGENT_SYSTEM.md. Skipping them breaks memory continuity and governance compliance.

---

## Troubleshooting

### "Agent contract not found"
```bash
# Check agent type spelling
ls .github/agents/

# Example: governance-repo-administrator, not governance-administrator
```

### "Workspace not found"
```bash
# Wake-up protocol creates it automatically
.github/scripts/wake-up-protocol.sh <agent-type>
```

### "Permission denied" on scripts
```bash
# Make scripts executable
chmod +x .github/scripts/wake-up-protocol.sh
chmod +x .github/scripts/session-closure.sh
```

### "Cannot read working contract"
```bash
# Run wake-up first
.github/scripts/wake-up-protocol.sh <agent-type>
# Then read
cat .agent-workspace/<agent-type>/working-contract.md
```

---

## Next Steps

1. **First Session**: Run wake-up protocol and explore your new workspace
2. **Read LAS Canon**: See `governance/canon/LIVING_AGENT_SYSTEM.md` for complete details
3. **Try Session Closure**: Complete a session and review your memory file
4. **Review Patterns**: After 3-5 sessions, review your personal/ directory for insights

---

## Authority & References

- **Canonical Protocol**: `governance/canon/LIVING_AGENT_SYSTEM.md`
- **Wake-Up Script**: `.github/scripts/wake-up-protocol.sh`
- **Closure Script**: `.github/scripts/session-closure.sh`
- **Agent Contracts**: `.github/agents/<agent-type>.md` (minimal, v5.0.0+)
- **Legacy Contracts**: `.github/agents/legacy/` (archived, v4.x and earlier)
- **Version**: 1.0.0
- **Authority**: CS2 (Johan Ras/Maturion)

---

*Welcome to the Living Agent System. You now have memory, context, and continuity.*
