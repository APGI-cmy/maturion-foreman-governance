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

## Governance

This file is persistent and must accumulate patterns over time. Never reset or clear without archiving.

---

## Patterns

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

### Self-Referential Detection in Meta-Tooling

**Frequency**: Uncommon but recurring in gate/validation implementations

**Context**: When implementing checks that scan for specific text patterns (e.g., STOP-AND-FIX markers, TODO comments, security keywords)

**Description**: Detection tools can trigger false positives by detecting the pattern in their own implementation code. Gate implementations that scan for "STOP-AND-FIX" will find that text in the grep command itself.

**Application**:
1. Always exclude tool implementation directories from pattern searches
2. For this repo: exclude `.github/` from STOP-AND-FIX detection
3. Test both CI workflow and local validator to ensure consistency
4. Document exclusion rationale in comments
5. Verify real instances would still be detected after exclusion

**Related Learnings**: Fixed in Session 012 (Issue #1091) - gate was detecting itself, causing false positives on gate implementation PRs

---
