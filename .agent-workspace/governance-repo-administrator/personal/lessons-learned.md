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
- [2026-02-13] TRS stage fills critical gap between FRS and Architecture - validates technical constraints early
- [2026-02-14] **CRITICAL**: ALWAYS verify responsibility domain against RESPONSIBILITY_DOMAIN_REGISTRY.md BEFORE creating scope-declaration.md - unregistered domains cause catastrophic merge gate failures
- [2026-02-14] CANON_INVENTORY.json hashes can go stale when canon files are updated without regenerating the inventory — always verify sha256 after canon edits
- [2026-02-14] Short hash (file_hash) field must equal first 12 chars of file_hash_sha256 — check both fields during validation

### 2026-02-14 - Ripple Dispatch vs Consumer Receipt Are Separate Concerns

**Context**: Auditing auto governance ripple end-to-end functionality

**Lesson**: Central dispatch success does NOT guarantee consumer receipt - these are separate systems

**Pattern**: 
- Governance repo can only verify dispatch was sent (HTTP 204 success)
- Consumer receipt depends on receiver workflows in consumer repos
- Cannot verify consumer receipt from governance repo directly
- Must check consumer repo workflow runs for repository_dispatch events

**Action**: When auditing ripple:
1. First verify dispatch mechanism (governance side)
2. Then separately verify receipt (consumer side)
3. Do not conflate dispatch success with end-to-end success
4. Document receiver deployment status for each consumer

**Impact**: Prevented false "all systems go" declaration when only 25% of consumers had receivers
