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

### Replicate Requirements Artifacts via Scoped Copy

**Frequency**: Occasionally  
**Context**: When a new agent needs requirement artifacts with identical structure to an existing agent.  
**Description**: Copy the existing requirements JSON/MD, then update metadata and agent-specific workspace paths to align with the new agent scope.  
**Application**: Duplicate the prior artifact, adjust authority/scope/note fields, and replace memory/escalation path references to the new agent to minimize divergence.  
**Related Learnings**: See lessons-learned.md "Wake-Up Contract Missing" for handling gaps when creating new agent artifacts.

---
