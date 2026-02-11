# Lessons Learned

This file captures mistakes to avoid, accumulated across all sessions.

## Format

```markdown
### [Date] - [Lesson Title]

**Context**: What was I trying to do?

**Mistake**: What went wrong?

**Root Cause**: Why did it happen?

**Remedy**: How to avoid this in future?

**Impact**: What was the consequence?

---
```

## Example

### 2026-02-06 - Memory Gitignored Incorrectly

**Context**: Setting up agent workspace structure

**Mistake**: Initially gitignored entire .agent-workspace/ directory

**Root Cause**: Misunderstood ephemeral vs persistent requirements in canon

**Remedy**: Only gitignore working-contract.md and environment-health.json; commit all memory, personal, context, escalation files

**Impact**: Lost all session memories and cross-session learning capability

---

## Governance

This file is persistent and must accumulate learnings over time. Never reset or clear without archiving.

---

### 2026-02-06 - Agent Workspace Was Gitignored

**Context**: Setting up Living Agent System per LIVING_AGENT_SYSTEM.md canon

**Mistake**: Entire .agent-workspace/ directory was gitignored, making all agent memory ephemeral

**Root Cause**: Original .gitignore had blanket exclusion of .agent-workspace/ without understanding canon requirements for persistent memory

**Remedy**: Update .gitignore to only exclude ephemeral files (working-contract.md, environment-health.json) while committing all memory, personal, context, and escalation files

**Impact**: Before fix, agents had no memory across sessions, violating LIVING_AGENT_SYSTEM.md and preventing learning, coordination, and improvement

---
- [2026-02-11] When updating agent contracts always verify prohibition sections exist before adding
- [2026-02-11] Always preserve layer_down_status from existing inventory when regenerating - prevents classification drift
