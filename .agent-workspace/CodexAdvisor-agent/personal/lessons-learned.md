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

### 2026-02-11 - Wake-Up Contract Missing

**Context**: Running the wake-up protocol for CodexAdvisor-agent at session start.  
**Mistake**: Proceeded without an available agent contract, causing the wake-up script to fail.  
**Root Cause**: The repository lacks `CodexAdvisor-agent.agent.md`, and no fallback path was prepared.  
**Remedy**: Escalate or request the missing contract before the session when feasible, and note degraded mode in the session record.  
**Impact**: Operating without a generated working contract; must document the deviation and proceed cautiously.

---
