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

### Using Unregistered Responsibility Domains in Scope Declarations

**Description**: Creating scope-declaration.md with descriptive but unregistered responsibility domain names (e.g., "Canonical Governance Maintenance" instead of "Governance Administration")

**Why It Fails**:
- Governance scope validation gate blocks merge with "GOVERNANCE BLOCK" error
- Creates catastrophic merge gate failure requiring RCA
- Blocks handover and delays work
- Registry is authoritative - only registered domain names are valid

**Better Approach**:
1. ALWAYS consult RESPONSIBILITY_DOMAIN_REGISTRY.md BEFORE creating scope-declaration.md
2. Use EXACT domain name from registry (line 186: "Governance Administration")
3. If new domain needed, follow registry proposal process BEFORE work begins
4. Add "Verify domain against registry" to pre-work checklist

**Detection**: 
- Merge gate error: "GOVERNANCE BLOCK: Responsibility domain 'X' is not registered"
- Scope declaration uses domain name not found in RESPONSIBILITY_DOMAIN_REGISTRY.md

**Examples**: 
- Session-023 (2026-02-14): Used "Canonical Governance Maintenance" instead of "Governance Administration"
- Impact: Catastrophic merge gate failure on learning file staleness enforcement PR

---

## Governance

This file is persistent and must accumulate anti-patterns over time. Never reset or clear without archiving.
