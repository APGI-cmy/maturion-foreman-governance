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

### 2026-02-15 - Post-Mortem Protocol - Comprehensive Canonical Creation

**Context**: Creating universal post-mortem protocol for all agents across all builds

**Lesson**: When creating comprehensive canonical governance, use search_code_subagent first to understand existing related protocols before drafting. This prevents duplication and ensures proper integration points.

**Pattern**: Discovery → Research existing canon → Identify gaps → Create complementary protocol

**Remedy**: Always start major governance work with: (1) search_code_subagent for related protocols, (2) read and understand integration points, (3) position new work as complement vs replacement

**Impact**: Created POST_MORTEM_PROTOCOL.md that properly complements IN_BETWEEN_WAVE_RECONCILIATION.md (wave vs build level), LEARNING_INTAKE_AND_PROMOTION_MODEL.md (learning capture), and LAYER_UP_PROTOCOL.md (canonization mechanism)

**Authority**: POST_MORTEM_PROTOCOL.md v1.0.0, LAYER_UP_PROTOCOL.md, LEARNING_INTAKE_AND_PROMOTION_MODEL.md

---

### 2026-02-15 - Template-First Approach for Protocol Usability

**Context**: Creating post-mortem protocol with agent self-report requirements

**Lesson**: When defining new processes, create comprehensive templates ALONGSIDE the canonical protocol, not after. Templates validate that protocol requirements are practical and implementable.

**Pattern**: Protocol section → Corresponding template → Validate usability → Iterate

**Remedy**: For any canonical process protocol, create matching templates in same PR. If template is difficult to create, protocol requirements may be impractical.

**Impact**: Created three templates (agent report, reconciliation, gap analysis) totaling 35KB that make protocol immediately usable. JSON Schema enables future automation.

**Authority**: POST_MORTEM_PROTOCOL.md v1.0.0, governance/templates/POST_MORTEM_*.template.md

---

### 2026-02-06 - Memory Gitignored Incorrectly

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
- [2026-02-15] Always use search_code_subagent before creating new canonical governance to understand integration points
- [2026-02-16] Delegate complex cross-repository analysis to specialized agents for efficiency and consistency
- [2026-02-16] **CRITICAL GOVERNANCE GAP**: "Tested" ≠ "Delivered" - waves can close with 100% GREEN tests but missing critical deliverables (e.g., required frontend app never built). Solution: FULLY_FUNCTIONAL_DELIVERY_STANDARD.md with explicit definitions and enforced wave gates
- [2026-02-16] When governance gaps affect wave closure, must create structural enforcement (gates, certificates, prohibitions) not just documentation
- [2026-02-16] "Fully functional" needs three separate definitions: Design (architecture), App (implementation), Delivery (complete system) - each with distinct validation criteria
- [2026-02-16] Wave closure certificates must include deliverable inventory with evidence, not just test results

## Session 20260217

### Lesson: Four-Phase Agent Contracts Enable Executable Governance
- Context: When designing agent contracts that need to be both readable and executable
- Pattern: Separating Preflight (identity), Induction (context), Build (orchestration), Handover (closure) phases
- Action: Use executable bash scripts within contract, not just prose descriptions

### Lesson: Priority Codes Make Requirements Explicit
- Context: When everything feels equally important in a contract
- Pattern: Using FM_H/M/L and B_H/M/L priority codes throughout
- Action: Prefix all requirements and script sections with priority codes

### Lesson: Code Review Iterations Catch Shell Scripting Issues
- Context: When embedding bash scripts in documentation
- Pattern: Run code review multiple times, fixing shell-specific issues
- Action: Pay special attention to grep regex patterns, glob expansion, jq safety

### Lesson: POLC-Only Examples Block Implementation Defaults
- Context: When traditional coding agents jump to implementation
- Pattern: Show wrong (code) vs. right (POLC) behavior side-by-side
- Action: Use concrete prohibited behavior examples with priorities


## Session 20260217 (Session 032)

### Lesson: Use Search-First Strategy for Distributed Content
- Context: When consolidating governance guidance scattered across many files
- Pattern: Use search_code_subagent early to find all related content before creating canonical file
- Action: Search first, then consolidate; saves time vs. manual exploration and ensures comprehensive coverage

### Lesson: Batch Updates for Reference Changes
- Context: When updating many file references from old path to new canonical path
- Pattern: Use sed for batch updates across templates, schemas, reports; manual edits for core canon
- Action: Group similar files and batch update with sed; reduces errors and saves time

### Lesson: Deprecate Constitutional Content (Don't Delete)
- Context: When superseding old governance files with new canonical versions
- Pattern: Mark old files DEPRECATED with clear notice pointing to canonical source
- Action: Preserve historical reference for audit trail; safer than deletion for constitutional content

### Lesson: Model-Specific Guidance Integration
- Context: When adding model escalation guidance (Sonnet→Opus)
- Pattern: Integrate with COGNITIVE_CAPABILITY_ORCHESTRATION_MODEL to distinguish authority escalation vs capability switching
- Action: Ensure model-specific guidance aligns with existing capability orchestration framework
- [2026-02-17] Canonical consolidation pattern: search distributed content first with search_code_subagent before creating canonical file - ensures comprehensive coverage and saves time
