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

---

### 2026-02-17 - BL-031 Canonization: Bootstrap Learning → Constitutional Enforcement

**Context**: Converting BL-031 (agent discovery failure) from documented learning to enforced prevention

**Lesson**: Canonizing a bootstrap learning requires more than just creating protocols—it needs constitutional enforcement through LOCKED sections, merge gates, and CATASTROPHIC FAILURE consequences.

**Pattern**: BL-xxx → Canonical Protocols → LOCKED Sections → Ripple → Enforcement → "We Only Fail Once"

**Remedy**: When a failure pattern is documented as BL-xxx:
1. Create canonical protocol(s) in governance/canon/ (PUBLIC_API tier-0)
2. Add full SHA256 hashes to CANON_INVENTORY.json (no placeholders)
3. Update BL-xxx status in BOOTSTRAP_EXECUTION_LEARNINGS.md
4. Add LOCKED sections to affected agent contracts (protected by AGENT_CONTRACT_PROTECTION_PROTOCOL.md)
5. Create CHANGELOG entry with migration guidance
6. Create ripple log for layer-down propagation to all consumer repos
7. Define CATASTROPHIC FAILURE consequence if pattern repeats (WE_ONLY_FAIL_ONCE_DOCTRINE.md)

**Impact**: BL-031 now has teeth—if a Foreman starts a wave without verifying builder availability, it's a governance catastrophic failure. The LOCKED section 3.0 in foreman-v2.agent.md cannot be removed or weakened without CS2 approval.

**Example Files Created**: 
- FOREMAN_PRE_WAVE_AGENT_AVAILABILITY_CHECK.md (13KB, 12 sections)
- BUILDER_AGENT_YAML_FRONTMATTER_COMPLIANCE_SPEC.md (16KB, 13 sections)
- Ripple log with 4 consumer repos requiring updates

**Authority**: BOOTSTRAP_EXECUTION_LEARNINGS.md BL-031, WE_ONLY_FAIL_ONCE_DOCTRINE.md, AGENT_CONTRACT_PROTECTION_PROTOCOL.md

---

### 2026-02-17 - FCWT Protocol Creation: Template-Driven Governance Design

**Context**: Creating comprehensive Final Complete Wave Test (FCWT) protocol from scratch based on issue requirements

**Lesson**: When establishing new governance protocol, create protocol + supporting templates simultaneously. Templates transform abstract protocol into executable checklist and reduce interpretation ambiguity.

**Pattern**: Protocol Definition → Execution Checklist → Evidence Templates → Summary Report → Handover Contract

**Remedy**: For any new canonical protocol:
1. Define comprehensive protocol in governance/canon/ with 10+ sections covering purpose, authority, definitions, steps, evidence, integration
2. Create execution checklist template showing step-by-step what to do (governance/templates/PROTOCOL_CHECKLIST.template.md)
3. Create evidence templates showing what artifacts to produce (e.g., FCWT_HANDOVER_CONTRACT, FCWT_SUMMARY_REPORT)
4. Include concrete examples (not just "document X", but "document X with sections A, B, C and evidence Y, Z")
5. Define evidence directory structure (e.g., .fcwt-evidence/ with subdirectories)
6. Integrate with existing governance (FULLY_FUNCTIONAL_DELIVERY_STANDARD.md, WAVE_MODEL.md, etc.)
7. Add to CANON_INVENTORY.json with full SHA256 hash
8. Add protocol + all templates to GOVERNANCE_ARTIFACT_INVENTORY.md
9. Create comprehensive CHANGELOG entry with migration guidance

**Impact**: FCWT protocol is immediately executable—agents know exactly what to do, what evidence to create, and what format to use. Templates prevent "what does comprehensive mean?" ambiguity.

**Example**: 
- Protocol: FINAL_COMPLETE_WAVE_TEST_PROTOCOL.md (34KB, 13 sections, 10 steps)
- Templates: FCWT_CHECKLIST.template.md (18KB), FCWT_HANDOVER_CONTRACT.template.md (16KB), FCWT_SUMMARY_REPORT.template.md (16KB)
- Total governance package: 84KB covering protocol + execution + evidence + handover

**Authority**: FINAL_COMPLETE_WAVE_TEST_PROTOCOL.md, FULLY_FUNCTIONAL_DELIVERY_STANDARD.md, WAVE_MODEL.md

---

### 2026-02-17 - Evidence-First Protocol Design: .fcwt-evidence/ Directory Structure

**Context**: Designing evidence collection for FCWT protocol

**Lesson**: Define evidence directory structure upfront in protocol, not as afterthought. Structure enables consistent collection, easy audit access, and clear evidence categorization.

**Pattern**: Protocol → Evidence Structure → Template References → Audit Trail

**Remedy**: When creating protocol requiring evidence:
1. Define standardized evidence directory (e.g., .fcwt-evidence/)
2. Define subdirectories by evidence category (test-results/, seed-data/, functional-tests/, ux-tests/, media/, etc.)
3. Specify file naming conventions (e.g., qa-to-red-full-suite-YYYYMMDD.log)
4. Document evidence in templates (checklist shows where to put files, summary report shows where to reference files)
5. Make evidence location deterministic (auditors know exactly where to look)

**Impact**: FCWT evidence is organized, discoverable, and audit-ready. No "where did I put that test log?" confusion.

**Example Structure**:
```
.fcwt-evidence/
├── test-results/ (QA-to-Red logs, summaries)
├── seed-data/ (scripts, dumps, documentation)
├── functional-tests/ (use-case logs, edge-case matrix, adversarial logs)
├── ux-tests/ (UX checklist, performance metrics, accessibility audit)
├── media/ (screenshots/, video links)
└── fcwt-summary-report.md (consolidation)
```

**Authority**: FINAL_COMPLETE_WAVE_TEST_PROTOCOL.md Section 7.1, FCWT_CHECKLIST.template.md

---

## Session 20260218 (Session 035)

### Lesson: Cross-Wave Pattern Analysis Reveals Systemic Governance Gaps

- **Context**: Institutionalizing lessons from MAT Waves 5-7 failures
- **Pattern**: Individual wave failures appear isolated, but cross-wave analysis reveals systemic governance gaps
- **Action**: 
  * Examine multiple related failures together (Waves 5.5, 5.6, 5.7)
  * Identify common root causes across waves
  * Document as failure patterns vs. isolated incidents
  * Create systemic prevention measures vs. point fixes
- **Example**: Waves 5.5 (missing React app), 5.6 (missing UI wiring), 5.7 (missing Supabase deployment) all stem from "wave closure validates tests but not deliverable existence" gap
- **Impact**: Created WAVES_5_TO_7_INFRA_FE_WIRING_LESSONS.md (22KB) documenting 4 systemic patterns with structural prevention measures

---

### Lesson: Template-Embedded Prevention > Post-Hoc Validation

- **Context**: Preventing deliverable omissions in future waves
- **Pattern**: Embedding validation requirements directly into architecture template ensures proactive enforcement
- **Action**:
  * Add validation sections to templates used at wave start (architecture, implementation plan)
  * Make validation checkboxes part of approval criteria
  * Require evidence before wave authorization (not just at closure)
  * Shift enforcement from reactive (closure gate) to proactive (authorization gate)
- **Example**: Added sections 4.1.1 (Infrastructure Deployment Validation), 4.11.1 (Frontend-Backend Wiring), 4.12.1 (Mandatory Workflow Evidence) to minimum-architecture-template.md
- **Impact**: Future architectures cannot be approved without addressing infrastructure/wiring/evidence requirements
- **Authority**: minimum-architecture-template.md, BUILD_PROGRESS_TRACKER_TEMPLATE.md

---

### Lesson: "Tests Pass" ≠ "Deployed" ≠ "Working" (Trinity Rule)

- **Context**: Waves closed with 100% GREEN tests but missing critical deliverables
- **Pattern**: Test coverage provides false confidence; must validate all three states
- **Action**:
  * **Tests Pass**: Validate automated test execution (unit, integration, E2E)
  * **Deployed**: Validate working deployment URLs (frontend + backend)
  * **Working**: Validate end-to-end workflows with evidence (screenshots/video)
  * Require ALL THREE before wave closure
  * Add explicit prohibitions against closure without any one of three
- **Example**: BUILD_PROGRESS_TRACKER_TEMPLATE Section 5.1 prohibits wave closure without frontend deployment, backend deployment, database deployment, working E2E workflows
- **Impact**: Institutionalizes trinity rule across templates and canon; prevents "tests pass, wave complete" false closures
- **Authority**: WAVES_5_TO_7_INFRA_FE_WIRING_LESSONS.md Section 3.2, FULLY_FUNCTIONAL_DELIVERY_STANDARD.md

---

### Lesson: Integration Cannot Be Assumed (Wiring Law)

- **Context**: Wave 5.6 had frontend and backend code but disconnected
- **Pattern**: Component existence ≠ integrated system; wiring must be explicitly tested
- **Action**:
  * When both UI and backend exist, UI-to-backend wiring tests are MANDATORY
  * E2E tests must run against deployed environment (not just localhost)
  * CORS configuration must be tested
  * Authentication flow must be validated
  * Add "Wiring Validation" section to build tracker
- **Example**: Added Section 4.11.1 to architecture template requiring explicit wiring validation when both UI and backend exist
- **Impact**: Future waves with both frontend and backend cannot close without demonstrating integration
- **Authority**: WAVES_5_TO_7_INFRA_FE_WIRING_LESSONS.md Section 3.4

---

### Lesson: Deviation Chain Documentation Enables Pattern Recognition

- **Context**: Finding related deviations #9, #12, #13 to understand failure patterns
- **Pattern**: Explicitly linking deviations creates chain enabling cross-wave pattern analysis
- **Action**:
  * Document deviation chain in canonical lessons (which issues are related)
  * Cross-reference related deviations in CHANGELOG
  * Create dedicated section in canon showing deviation progression
  * Include deviation chain in governance artifact inventory
- **Example**: WAVES_5_TO_7 canon Section 9 documents deviation chain with clear linkage
- **Impact**: Future governance reviews can identify related failures and prevent pattern recurrence
- **Authority**: WAVES_5_TO_7_INFRA_FE_WIRING_LESSONS.md Section 9

---

### Lesson: Reactive vs. Proactive Governance Transparency

- **Context**: Creating governance measures after failures vs. before
- **Pattern**: Honest acknowledgment of reactive vs. proactive governance strengthens credibility
- **Action**:
  * When creating reactive governance (after failure), acknowledge it
  * Document ideal proactive state in canon
  * Create path from reactive to proactive
  * Use reactive measures as bootstrap toward proactive governance
- **Example**: WAVES_5_TO_7 canon Section 12 "Governance Hygiene Note" acknowledges reactive nature and defines future proactive state
- **Impact**: Sets realistic expectations and creates improvement trajectory
- **Authority**: WAVES_5_TO_7_INFRA_FE_WIRING_LESSONS.md Section 12

---

### Lesson: Quick Reference Appendix Makes Canon Actionable

- **Context**: 22KB canon document may be too detailed for daily use
- **Pattern**: Comprehensive canon + quick reference checklist = usable governance
- **Action**:
  * Create detailed canonical document with full analysis and rationale
  * Add Appendix with one-page quick reference checklist
  * Ensure appendix captures all critical validation points
  * Reference appendix in templates and contracts
- **Example**: WAVES_5_TO_7 canon Appendix A provides one-page wave closure checklist
- **Impact**: Agents can use checklist daily while canon provides deep reference when needed
- **Authority**: WAVES_5_TO_7_INFRA_FE_WIRING_LESSONS.md Appendix A

---
