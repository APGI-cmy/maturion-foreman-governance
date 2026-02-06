# Patterns

This file captures recurring patterns discovered across sessions.

## Format

```markdown
### [Pattern Name]

**Frequency**: How often does this occur?

**Context**: When does this pattern appear?

**Description**: What is the pattern?

**Application**: How to leverage this pattern?

**Related Learnings**: Links to lessons-learned.md or other patterns

---
```

## Example

### Canon Changes Require Ripple

**Frequency**: Every governance/canon/* modification

**Context**: When updating canonical governance documents

**Description**: Changes to canon must ripple to consumer repositories and documentation

**Application**: 
1. Modify canon file
2. Update GOVERNANCE_ARTIFACT_INVENTORY.md
3. Execute governance ripple to consumer repos
4. Update layer-down documentation

**Related Learnings**: See lessons-learned.md "Forgot Ripple After Canon Change"

---

## Governance

This file is persistent and must accumulate patterns over time. Never reset or clear without archiving.

---

### Canon Changes Require Ripple

**Frequency**: Every governance/canon/* modification

**Context**: When updating canonical governance documents in this repository

**Description**: Changes to canonical governance (Tier 0) must propagate to all consumer repositories through governance ripple process

**Application**: 
1. Modify canon file in governance/canon/
2. Update GOVERNANCE_ARTIFACT_INVENTORY.md with change details
3. Execute governance ripple to consumer repositories (via CodexAdvisor or manual PRs)
4. Update any layer-down documentation
5. Verify ripple completion in all consumer repos

**Related Learnings**: Forgetting ripple after canon changes causes governance drift across repositories

---
