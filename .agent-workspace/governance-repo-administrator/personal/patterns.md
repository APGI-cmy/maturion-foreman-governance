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

### Canonical Protocol Alignment

**Frequency**: Occasional - when implementing workflows that integrate with canonical protocols

**Context**: When workflow files (.github/workflows/) implement transport mechanisms specified in canonical governance documents

**Description**: Workflow implementation must exactly match event types, field names, and payload structures specified in canonical protocol documents. Naming mismatches (e.g., hyphens vs underscores) break integrations silently.

**Application**:
1. Before implementing workflows, review canonical protocol specifications (e.g., CROSS_REPO_RIPPLE_TRANSPORT_PROTOCOL.md)
2. Extract exact field names and event types from protocol specification
3. Use grep to verify consistency between protocol and implementation
4. Test end-to-end event dispatch and receipt
5. Document alignment in PR descriptions

**Related Learnings**: Fixed in Session 016 - event_type mismatch (governance-ripple vs governance_ripple) blocked all cross-repo governance synchronization

---

## Pattern: Canon Inventory Hash Drift
- Observed: 2026-02-14 (Session 024)
- Context: When canon files are updated (e.g. LIVING_AGENT_SYSTEM.md), the CANON_INVENTORY.json hashes may not be regenerated
- Response: Run sha256 verification against all inventory entries after any canon file change; fix mismatches immediately

## Pattern: Root-Level File Accumulation
- Observed: 2026-02-14 (Session 024)
- Context: Historical/archive files accumulate at repository root level (67 md files found)
- Response: Document for CS2 review; recommend archival to dedicated directory

## Pattern: Infrastructure Audit with GitHub Actions MCP

- Observed: 2026-02-14 (Session 026)
- Context: Auditing workflow-based infrastructure for operational readiness
- Pattern: Use GitHub Actions MCP tools for comprehensive audit:
  1. List workflows → identify target workflow by name
  2. List workflow runs → check recent execution history
  3. List workflow jobs → get job IDs for specific runs
  4. Get job logs → verify execution details and outcomes
  5. Check consumer repos → verify event receipt (repository_dispatch)
- Response: This pattern provides complete audit trail without requiring direct workflow execution
- Effectiveness: Successfully audited 11 workflow runs, confirmed 100% success rate, identified consumer receiver gaps

## Pattern: Phased Infrastructure Activation

- Observed: 2026-02-14 (Session 026)
- Context: When central infrastructure is ready but downstream dependencies are not
- Pattern: Activate central mechanism independently, allow phased downstream rollout:
  - Central dispatch can be activated when it meets quality/reliability thresholds
  - Consumer integrations can follow separate timeline
  - Document partial deployment status clearly
  - Provide guidance for downstream teams to complete integration
- Response: Declare central dispatch "PRODUCTION READY" while consumer receivers are "PARTIAL DEPLOYMENT"
- Justification: Central and consumer concerns are separable; central readiness should not be blocked by consumer delays
