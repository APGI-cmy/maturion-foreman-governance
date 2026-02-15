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

### Gold-Standard Contract Scaffolding

**Frequency**: Frequent when introducing new agent contracts.  
**Context**: Authoring or upgrading agent contracts without an existing working-contract output (degraded wake-up).  
**Description**: Use the governance-repo-administrator-v2 agent file as scaffolding to ensure all governance requirement categories, memory/evidence protocols, and merge gate expectations are preserved.  
**Application**: Copy structure and requirement headings, then tailor mission/roles/invariants while keeping evidence, escalation, and merge-gate sections intact.  
**Related Learnings**: See lessons-learned.md "Contract Authoring in Degraded Mode".

---

## Pattern: Pre-Handover Verification Protocol
- Observed: 2026-02-12 (Session 004 - Corrective Action)
- Context: Before reporting work "complete" or handing over to CS2
- Response: Execute mandatory verification checklist
- Steps:
  1. Verify all files committed and pushed
  2. Wait for CI/CD workflows to trigger and complete
  3. Check all workflow statuses (not just started, but completed)
  4. Verify ALL checks GREEN (no failures, warnings acceptable only if documented)
  5. Verify merge gate status explicitly
  6. Create evidence artifacts and session memory
  7. ONLY THEN report work complete
- Trigger: Any time work is being handed over or reported as complete
- Severity: CRITICAL - Skipping this violates governance

## Pattern: Documentation Example Format
- Observed: 2026-02-12 (Session 004)
- Context: Creating documentation that includes example configuration values
- Response: Use short placeholders that won't trigger CI security patterns
- Format:
  - ✅ Use: `field: "[placeholder]"` (short, <16 chars)
  - ✅ Use: `field: "<VALUE>"` (angle brackets, short)
  - ✅ Use: `field: [value]` (no quotes, brackets)
  - ❌ Avoid: `field: "REALISTIC_TOKEN_NAME"` (triggers secrets-check if ≥16 chars)
- Clarification: Add examples in comments: `(e.g., "ACTUAL_VALUE")`
- Trigger: Writing YAML/JSON examples in documentation
- Severity: MEDIUM - Can cause CI failures

## Pattern: Secrets-Check Pattern Recognition
- Observed: 2026-02-12 (Session 004)
- Context: Content that might trigger secrets-check in CI/CD
- Response: Test against known patterns before commit
- Patterns to avoid:
  - `password: "string≥8chars"`
  - `api_key: "string≥16chars"`
  - `secret: "string≥16chars"`
  - `token: "string≥16chars"`
- Testing: Use local grep with patterns before committing documentation
- Trigger: Creating/modifying governance documentation with configuration examples
- Severity: HIGH - Blocks merge gate

---

## Pattern: Incremental Commits for Audit Trail
- Observed: 2026-02-15 (Session 005)
- Context: Multi-step governance enhancement (content + inventory + ripple signal)
- Response: Create separate commits for logically distinct changes
- Steps:
  1. Initial plan commit (checklist)
  2. Core content change commit (canon + inventory update)
  3. Supporting artifact commit (ripple signal)
  4. Evidence commit (session memory + learning updates)
- Benefits: Clear audit trail, recovery points, easier review
- Trigger: Complex governance tasks with multiple artifact types
- Severity: MEDIUM (best practice, not requirement)

## Pattern: Delegation Requires Mode Distinction
- Observed: 2026-02-15 (Session 005)
- Context: Documenting Foreman delegation to builders
- Response: Explicitly distinguish execution mode from validation mode
- Model:
  - **Work Mode**: Foreman delegates execution to builders
  - **Evaluation Mode**: Foreman validates independently (QA rerun, architecture review)
- Critical Rule: Never conflate modes (delegation ≠ abdication of validation)
- Accountability: Foreman remains accountable even when delegating
- Trigger: Any authority model involving delegation
- Severity: HIGH - Prevents accountability gaps

## Pattern: Guidance-Level vs Protocol-Level Documentation
- Observed: 2026-02-15 (Session 005)
- Context: Phase 1 guidance (immediate use) vs Phase 2 protocol (formalized after learnings)
- Response: Match documentation depth to strategic phase
- Guidance-Level (Phase 1):
  - Principles and best practices
  - Flexible interpretation
  - Supports immediate execution
  - Example: Section 5.5 delegation guidance
- Protocol-Level (Phase 2):
  - Formal specifications
  - Enforcement mechanisms
  - Schema validation
  - Example: Future AGENT_INVOCATION_PROTOCOL.md
- Transition: Document future protocol reference in guidance
- Trigger: Strategic phasing identified in issue requirements
- Severity: MEDIUM - Prevents over-engineering Phase 1

## Pattern: Ripple Signal Criticality Classification
- Observed: 2026-02-15 (Session 005)
- Context: Classifying governance canon update for consumer repos
- Response: Use three-level criticality model
- Levels:
  - **HIGH**: Breaking changes, immediate action required, blocks execution
  - **MEDIUM**: Important updates, awareness required, no immediate block
  - **LOW**: Minor changes, informational only, optional awareness
- Factors:
  - Breaking nature (does it invalidate existing behaviors?)
  - Urgency (does it require immediate action?)
  - Scope (how many consumer repos affected?)
- Example: Section 5.5 delegation guidance = MEDIUM (affects interpretation but non-breaking)
- Trigger: Creating ripple signals for governance changes
- Severity: MEDIUM - Affects consumer repo response expectations

## Pattern: CANON_INVENTORY Hash Update Protocol
- Observed: 2026-02-15 (Session 005)
- Context: Updated canonical governance file requires inventory update
- Response: Execute systematic hash update protocol
- Steps:
  1. Calculate SHA256 of modified file: `sha256sum <file>`
  2. Update both `file_hash` (first 12 chars) and `file_hash_sha256` (full hash)
  3. Update `last_updated` and `generation_timestamp` in inventory metadata
  4. Optionally update `description` if change is significant
  5. Validate JSON syntax: `python3 -m json.tool <file> > /dev/null`
- Critical: Both hash fields must match (truncated + full)
- Trigger: Any change to governance/canon/* files
- Severity: HIGH - Breaks alignment checks if incorrect
