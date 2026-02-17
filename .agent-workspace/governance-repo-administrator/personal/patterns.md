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

### Canonical Protocol Creation Requires Templates

**Frequency**: When creating new process-oriented canonical protocols

**Context**: Creating protocols that define processes agents must follow (e.g., POST_MORTEM_PROTOCOL)

**Description**: Process protocols need matching templates to be practical. Templates validate protocol requirements are implementable and provide concrete guidance.

**Application**:
1. Draft protocol sections defining process steps
2. Create corresponding template sections in parallel
3. If template is hard to create, protocol may be too abstract/impractical
4. Add JSON Schema for automation (if applicable)
5. Templates should be comprehensive (8-14KB each for major processes)

**Related Learnings**: Session 027 - Created POST_MORTEM_PROTOCOL.md (24KB) with three templates (35KB total) and JSON Schema

---

### Discovery Phase Prevents Integration Conflicts

**Frequency**: When creating new canonical governance

**Context**: Before drafting new canonical protocols or governance

**Description**: Using search_code_subagent to find existing related protocols prevents duplication and ensures proper integration. New protocols should complement, not replace, existing governance.

**Application**:
1. Use search_code_subagent with relevant keywords
2. Read identified protocols to understand integration points
3. Position new protocol as "complements" in documentation
4. Explicitly document relationships in protocol (e.g., Section 15 "Integration with Existing Protocols")
5. Cross-reference related protocols throughout

**Related Learnings**: Session 027 - POST_MORTEM_PROTOCOL complements IBWR (wave vs build level), LAYER_UP (mechanism), LEARNING_INTAKE (capture process)

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
- [2026-02-15] Create templates alongside protocols to validate usability

---

### Governance Gap Detection Pattern

**Frequency**: Rare but critical - when execution failures reveal governance design flaws

**Context**: When systems fail despite governance checkpoints passing (e.g., wave closure gates passed but deliverables missing)

**Description**: Operational failures that shouldn't be possible under existing governance indicate gap between governance intent and enforcement. Pattern: (1) failure occurs, (2) gates were "passed", (3) deliverable verification was insufficient or absent.

**Application**:
1. Analyze: What governance checkpoints existed?
2. Identify: Why didn't they catch the issue?
3. Diagnose: Missing definition, missing enforcement, or ambiguous criteria?
4. Create: New canonical standard with explicit definitions
5. Strengthen: Add structural enforcement (gates, certificates, prohibitions)
6. Ripple: Propagate to all affected repositories

**Example**: MAT module - frontend app required in all governance docs but never built. Wave closure gates only checked test results, not deliverable existence. Solution: FULLY_FUNCTIONAL_DELIVERY_STANDARD.md with explicit "fully functional" definitions and enforced deliverable verification.

**Related Learnings**: WE_ONLY_FAIL_ONCE_DOCTRINE.md Section 3.2 - mandatory structural change prevents recurrence

**Related Patterns**: Canon Changes Require Ripple, Structural Enforcement vs Documentation Only

---

### Structural Enforcement vs Documentation Only

**Frequency**: Common - when addressing governance gaps

**Context**: After discovering governance failures, deciding between documentation update vs structural change

**Description**: Documentation alone is insufficient to prevent recurrence. Structural enforcement includes: (1) automated gates/CI checks, (2) required evidence artifacts, (3) explicit prohibitions in contracts, (4) certificate requirements, (5) manual checklists with sign-off.

**Application**:
1. If failure caused by missing guidance → add documentation
2. If failure possible despite guidance → add structural enforcement
3. For critical paths (wave authorization, wave closure) → always structural
4. Test: Could failure recur if someone "forgot" to read documentation? If yes → structural enforcement needed

**Example**: FULLY_FUNCTIONAL_DELIVERY_STANDARD.md includes (a) explicit definitions (documentation), (b) wave gate requirements (structural), (c) certificate templates (structural), (d) prohibited patterns in contracts (structural), (e) CI deliverable checks (structural).

**Related Learnings**: WE_ONLY_FAIL_ONCE_DOCTRINE.md requires structural governance changes, not advisory documentation

**Related Patterns**: Governance Gap Detection Pattern

---

## Pattern: Executable Agent Contracts
- Observed: 2026-02-17 (Session 031)
- Context: When agent contracts need to be both documentation and executable
- Response: Use embedded bash scripts with priority codes, not prose descriptions
- Benefits: Testable, deterministic, transparent behavior vs. interpreted prose

## Pattern: Incremental Code Review
- Observed: 2026-02-17 (Session 031)
- Context: When implementing complex files with embedded code
- Response: Run code review after each major change, fix issues iteratively
- Benefits: Catches issues early before they compound; improves final quality

## Pattern: Python for Large File Creation
- Observed: 2026-02-17 (Session 031)
- Context: When bash heredoc fails with large content blocks
- Response: Use Python with triple-quoted strings to create files in parts
- Benefits: Avoids heredoc timeout issues; clearer syntax for multi-line content


## Pattern: Canonical File Consolidation

- Observed: 2026-02-17 (Session 032)
- Context: When governance guidance is distributed across many documents with broken references
- Response: 
  1. Use search_code_subagent to find all distributed content
  2. Create comprehensive canonical file in governance/canon/
  3. Update all references systematically (batch sed for similar files, manual for canon)
  4. Deprecate old files with clear notice (don't delete)
  5. Update CANON_INVENTORY.json with SHA256 hash
  6. Add comprehensive CHANGELOG.md entry
  7. Validate all cross-references before commit

## Pattern: Model Escalation Guidance

- Observed: 2026-02-17 (Session 032)
- Context: When adding model-specific cognitive escalation (Sonnet→Opus/o1)
- Response:
  1. Distinguish authority escalation (L1→L2→L3→L4) from capability switching
  2. Integrate with COGNITIVE_CAPABILITY_ORCHESTRATION_MODEL.md
  3. Provide clear triggers: cognitive overload, complex governance, strategic decisions, safety-critical
  4. Include procedural steps: recognize, document, escalate, receive, resume
  5. Emphasize escalation is NOT failure—it's healthy governance awareness
