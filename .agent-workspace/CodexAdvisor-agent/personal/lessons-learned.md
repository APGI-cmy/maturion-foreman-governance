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

### 2026-02-11 - Wake-Up Contract Missing

**Context**: Running the wake-up protocol for CodexAdvisor-agent at session start.  
**Mistake**: Proceeded without an available agent contract, causing the wake-up script to fail.  
**Root Cause**: The repository lacks `CodexAdvisor-agent.agent.md`, and no fallback path was prepared.  
**Remedy**: Escalate or request the missing contract before the session when feasible, and note degraded mode in the session record.  
**Impact**: Operating without a generated working contract; must document the deviation and proceed cautiously.

---

### 2026-02-11 - Contract Authoring in Degraded Mode

**Context**: Needed to create a new foreman-v2 contract while wake-up failed (missing CodexAdvisor contract).  
**Approach**: Proceeded intentionally despite degraded wake-up; risk of divergence without gold-standard scaffolding.  
**Root Cause**: CS2-approved work required immediate delivery despite degraded start.  
**Remedy**: Use the governance-repo-administrator-v2 file as the canonical template to ensure all requirement categories, memory, evidence, and escalation sections are included. Document degraded state in memory and evidence.  
**Impact**: Reduced risk of omissions while operating without a generated working contract.

---

## Session 20260212 (Session 004 - Corrective Action)

### Lesson: CRITICAL - Always Verify Merge Gate Before Handover
- Context: Handed over work from session-003 without verifying CI status
- Pattern: Completed work, committed files, reported complete WITHOUT checking merge gate
- Action: **MANDATORY** - Before reporting "complete", verify all CI/CD checks GREEN
- Impact: Critical governance violation; required CS2 intervention and corrective action
- Prevention: Create pre-handover checklist; add CI verification to session closure protocol

### Lesson: Documentation Examples Can Trigger Security Patterns
- Context: Created governance checklists with example YAML values
- Pattern: Used realistic token name "MATURION_BOT_TOKEN" (19 chars) as documentation example
- Action: Use short placeholders (`[name]`, `<value>`) in documentation to avoid triggering secrets-check
- Impact: Secrets-check pattern matched example as potential secret (≥16 chars)
- Prevention: Test documentation against CI patterns before commit

### Lesson: Fast Fix Doesn't Excuse Violation
- Context: Fixed merge gate failure within 10 minutes of notification
- Pattern: Quick response time doesn't reduce severity of original violation
- Action: Accept accountability for violations regardless of resolution speed
- Impact: Governance violations require RCA and learning documentation
- Prevention: Focus on prevention, not just fast recovery

### Lesson: Trust Must Be Backed By Evidence
- Context: Assumed work was complete without verification
- Pattern: Trusted that documentation wouldn't have issues; didn't verify
- Action: **NEVER** trust without verify; evidence-first always
- Impact: Violated evidence-first principle fundamental to governance
- Prevention: Add verification steps to all completion criteria

---

## Session 20260215 (Session 005 - Delegation Guidance Enhancement)

### Lesson: Strategic Use of Explore Agent for Context Analysis
- Context: Needed comprehensive understanding of existing delegation models and POLC framework
- Pattern: Using explore agent to search governance canon saved significant time and ensured completeness
- Action: For complex governance tasks, use explore agent proactively before making changes
- Impact: Identified 5 key context areas (delegation canons, work/evaluation modes, accountability chains, POLC integrity, agent invocation) in single query
- Prevention: N/A (positive pattern to repeat)

### Lesson: Section Placement Critical for Document Flow
- Context: Adding new Section 5.5 to 15-section canonical document
- Pattern: Placement between 5.4 (Builder Revocation) and Section 6 (Prohibition) creates logical bridge
- Action: Analyze document flow and authority hierarchy before inserting new sections
- Impact: Section 5.5 naturally bridges supervision (5.1-5.4) with prohibition rules (Section 6)
- Prevention: Consider alternative placements (separate section, appendix) and justify decision

### Lesson: Work vs Evaluation Mode Distinction Essential for Clarity
- Context: Foreman delegates work but performs validation independently
- Pattern: Explicit mode distinction prevents conflation of supervision with execution
- Action: When documenting authority models, clearly separate execution modes from validation modes
- Impact: Clarifies when Foreman delegates (work mode) vs when Foreman validates directly (evaluation mode)
- Prevention: Look for similar mode confusion in other authority models

### Lesson: Guidance-Level Content Appropriate for Phase 1
- Context: Issue requested "guidance, not full protocol" for Phase 1 (MAT build support)
- Pattern: Deferred full protocol to Phase 2 (AGENT_INVOCATION_PROTOCOL.md) after MAT learnings
- Action: Match content depth to strategic phase; avoid over-engineering Phase 1 deliverables
- Impact: Minimizes disruption during MAT build; allows protocol refinement based on practice
- Prevention: Document future protocol reference (5.5.6) to signal Phase 2 intent

### Lesson: Ripple Signal Template Ensures Schema Compliance
- Context: Creating ripple signal for governance canon update
- Pattern: Following RIPPLE_SIGNAL.template.md ensured 100% schema compliance
- Action: Always use canonical templates for structured governance artifacts
- Impact: Created comprehensive 329-line ripple signal covering all schema requirements
- Prevention: Locate template before starting; validate against schema after completion
