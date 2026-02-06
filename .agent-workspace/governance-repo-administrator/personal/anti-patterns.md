# Anti-Patterns

This file captures approaches that don't work or should be avoided.

## Format

```markdown
### [Anti-Pattern Name]

**Description**: What is the problematic approach?

**Why It Fails**: What goes wrong?

**Better Approach**: What should be done instead?

**Detection**: How to recognize this anti-pattern?

**Examples**: Specific instances where this appeared

---
```

## Example

### Modifying Agent Contracts Directly

**Description**: Updating .github/agents/*.md files directly to change agent behavior

**Why It Fails**: 
- Creates governance risk and version drift
- Requires CS2 approval for each change
- Breaks Living Agent System design (agents should self-contextualize)
- High maintenance burden

**Better Approach**: 
- Use wake-up protocol to generate dynamic working contracts
- Capture learnings in personal/ directory
- Escalate to CS2 only for contract interpretation or structure changes
- Let agents learn and adapt within their mandate

**Detection**: Any PR that modifies agent contract files without CS2 approval

**Examples**: See session-XXX where attempted to add new rule to governance-repo-administrator.agent.md

---

## Governance

This file is persistent and must accumulate anti-patterns over time. Never reset or clear without archiving.
