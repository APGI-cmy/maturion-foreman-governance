# LL-031: Platform-Wide AI Requirements Omission

**Date**: 2026-02-19  
**Status**: Canonical Lesson  
**Authority**: CS2 (Johan Ras)  
**Severity**: P0 - Catastrophic Oversight  
**Source**: MAT Frontend Deployment Failure  
**Lesson ID**: LL-031

---

## Executive Summary

**Incident**: MAT (Manual Audit Tool) frontend deployment failed platform governance standards due to complete omission of required embedded AI features. This represents a catastrophic governance gap where platform-wide mandatory requirements were not explicitly enforced, leading to apps being built without critical AI capabilities.

**Key Lesson**: Platform-wide mandatory requirements must be explicitly declared in canonical governance and enforced through merge gates, not assumed through precedent or implicit understanding.

---

## What Happened

### The Failure

MAT frontend was built and submitted for deployment with:
- ❌ No AI chat (assistant) UI component
- ❌ No AI scoring explanations or rationale features
- ❌ No human override enforcement with AI context
- ❌ No agent file for model selection and task routing
- ❌ No embedded AI features whatsoever

### Expected State

Per platform governance (implicit, not explicit):
- ✅ All apps MUST provide embedded AI assistant
- ✅ All apps MUST support context-aware AI in UI (scoring, reports, explanations)
- ✅ All apps MUST include agent file with model selection logic
- ✅ All apps MUST implement AI task routing
- ✅ Apps may only omit AI features with explicit CS2 justification and approval

### The Gap

**Root Cause**: Platform-wide AI requirements existed as:
1. **Legacy precedent** (Foreman Office app has AI features)
2. **Implicit understanding** (not canonical requirement)
3. **Optional pattern** (MANDATORY_CROSS_APP_COMPONENTS.md Section 13 says "for apps with AI chat interfaces")

**Consequence**: Without explicit canonical enforcement, builders/foreman did not include AI requirements in:
- App description documents
- FRS (Functional Requirements Specification)
- TRS (Technical Requirements Specification)
- Implementation plans
- Test suites (no red tests for AI absence)

---

## Why This Happened

### Governance Failure 1: Implicit vs. Explicit Requirements

**Problem**: AI requirements were **precedent-based**, not **canon-mandated**.

**MANDATORY_CROSS_APP_COMPONENTS.md Section 13** states:
```
**Requirement**: MANDATORY (for apps with AI chat interfaces)
```

**Issue**: This phrasing makes AI features **conditional** ("for apps with AI chat"), not **universal** ("all apps must have AI").

**Lesson**: If a requirement applies to ALL apps (unless explicitly excluded), it must be stated as:
```
**Requirement**: MANDATORY (all applications)
**Exclusions**: Only with CS2 approval and documented justification
```

### Governance Failure 2: No Enforcement Gate

**Problem**: No merge gate validates presence of AI features in apps.

**Missing Validation**:
- No check for AI assistant UI components
- No check for agent file existence
- No check for model selection configuration
- No check for AI task routing logic

**Lesson**: Platform-wide requirements need platform-wide gate enforcement, not per-app manual checking.

### Governance Failure 3: FRS/TRS Do Not Inherit Platform Requirements

**Problem**: App-specific FRS/TRS documents are created from scratch without explicit platform requirement inheritance.

**What Should Happen**:
1. Platform requirements document lists ALL mandatory cross-app requirements
2. FRS/TRS template includes: "See Platform Requirements in governance/canon/PLATFORM_REQUIREMENTS.md"
3. FRS/TRS explicitly lists platform requirements OR references them
4. Red tests validate platform requirements first, before app-specific features

**Current State**: Each FRS/TRS is independent; platform requirements are not scaffolded.

### Governance Failure 4: Precedent ≠ Canon

**Problem**: Team assumed "Foreman Office has AI, so everyone knows apps need AI."

**Reality**: 
- Agents have no access to other repos' code
- Builders start fresh with requirements documents
- Precedent is invisible without explicit canonical documentation
- Legacy examples are not governance enforcement

**Lesson**: If it's not in canonical governance with explicit enforcement, it doesn't exist as a requirement.

---

## Root Causes

### RC-1: MANDATORY_CROSS_APP_COMPONENTS.md Incomplete

**Section 13: AI Chat Interface Dual Pattern** exists but is:
- Scoped as optional ("for apps with AI chat interfaces")
- Does not mandate universal AI assistant
- Does not mandate AI scoring/explanation features
- Does not mandate agent file presence
- Does not mandate model selection logic

**Required Fix**: Rewrite Section 13 + add new sections to mandate AI features for ALL apps.

### RC-2: No Platform Requirements Inheritance Protocol

**Missing**: Formal protocol for how app FRS/TRS inherits platform-wide requirements.

**Required Fix**: Create canonical protocol that:
1. Defines platform requirements as Tier-0 (constitutional)
2. Requires all FRS/TRS to include platform requirements section
3. Requires red tests for platform requirements first
4. Gates FRS approval on platform requirement inclusion

### RC-3: No AI Feature Enforcement Gate

**Missing**: Merge gate that validates AI features presence.

**Required Fix**: Add gate requirement to GATE_REQUIREMENTS_INDEX.json:
```json
{
  "gate_id": "platform-ai-features",
  "requirement": "All apps must include embedded AI features",
  "validation": [
    "AI assistant UI component exists",
    "Agent file exists and validated",
    "Model selection configuration present",
    "AI task routing implemented"
  ],
  "exclusions": "CS2 approval required for exemption"
}
```

### RC-4: No Agent File Template with AI Capabilities

**Missing**: Agent file schema does not mandate AI model selection and capabilities section.

**Required Fix**: Update `.agent.schema.md` to require:
```yaml
ai_capabilities:
  primary_model: "..."
  task_routing:
    - task_type: "..."
      model: "..."
  embedding_model: "..."
  context_limits: { ... }
```

---

## Structural Changes Required

### Change 1: Update MANDATORY_CROSS_APP_COMPONENTS.md

**Section 13** must be rewritten:
```markdown
## 13. Embedded AI Features (MANDATORY - All Applications)

**Requirement**: MANDATORY (all applications)  
**Exclusions**: Only with CS2 written approval and documented justification  
**Specification**: governance/canon/PLATFORM_AI_REQUIREMENTS.md

All Maturion applications MUST implement the following AI features:

1. **AI Assistant (Chat Interface)**
   - Embedded chat UI for user assistance
   - Context-aware responses
   - Task-specific guidance
   - Secure authentication and logging

2. **Context-Aware AI in Application UI**
   - AI explanations for scoring/calculations
   - AI-generated rationale for recommendations
   - Human override with AI context preservation
   - Audit trail of AI vs. human decisions

3. **Agent File with AI Capabilities**
   - Model selection for different task types
   - Task-to-model routing configuration
   - Token limits and cost optimization
   - Fallback models for degraded states

4. **AI Task Routing**
   - Deterministic model selection per task type
   - Cost-optimized routing
   - Performance monitoring per model
   - Graceful degradation on model failures
```

### Change 2: Create PLATFORM_AI_REQUIREMENTS.md

New canonical document:
```
governance/canon/PLATFORM_AI_REQUIREMENTS.md
```

This document will specify:
- Mandatory AI features for all apps
- AI assistant UI requirements
- Agent file AI capabilities schema
- Model selection and routing requirements
- Exclusion process (CS2 approval)
- Evidence and validation requirements

### Change 3: Update APP_STARTUP_REQUIREMENTS_DECLARATION.md

Add platform requirements inheritance:
```markdown
### 4.5 Platform Requirements Inheritance

**Requirement**: MANDATORY

All application startup requirement declarations MUST include:

1. **Platform Requirements Reference**:
   ```
   This application inherits all platform-wide mandatory requirements from:
   - governance/canon/MANDATORY_CROSS_APP_COMPONENTS.md
   - governance/canon/PLATFORM_AI_REQUIREMENTS.md
   ```

2. **Platform AI Features Validation**:
   - AI assistant UI implemented: [YES/NO]
   - Agent file with AI capabilities: [YES/NO]
   - Model selection configured: [YES/NO]
   - AI task routing implemented: [YES/NO]
   - CS2 exemption (if applicable): [LINK]
```

### Change 4: Create Platform AI Requirements Checklist

New file:
```
governance/checklists/PLATFORM_AI_REQUIREMENTS_CHECKLIST.md
```

Checklist for builders to validate AI features before handover.

### Change 5: Update GATE_REQUIREMENTS_INDEX.json

Add platform AI features gate:
```json
{
  "gates": [
    {
      "gate_id": "platform-ai-features",
      "category": "platform-compliance",
      "requirement": "Platform-wide AI features implementation",
      "applies_to": ["builder", "foreman"],
      "enforcement": "BLOCKING",
      "validation_script": ".github/scripts/validate-platform-ai-features.sh",
      "documentation": "governance/canon/PLATFORM_AI_REQUIREMENTS.md"
    }
  ]
}
```

### Change 6: Update Agent File Schema

Add to `.agent.schema.md`:
```yaml
# AI Capabilities (MANDATORY for application agents)
ai_capabilities:
  primary_model: string          # Default model for general tasks
  task_routing:                   # Task-specific model selection
    - task_type: string
      model: string
      max_tokens: number
      temperature: number
  embedding_model: string         # For semantic search
  context_limits:
    max_context_window: number
    token_budget: number
  cost_optimization:
    enabled: boolean
    fallback_models: string[]
```

---

## Validation Questions

Per LEARNING_INTAKE_AND_PROMOTION_MODEL.md, promotion to canon requires answering:

### Q1: Is this truly structural or one-time?

**Answer**: STRUCTURAL.

This is not a one-time oversight. The absence of explicit platform requirements creates systematic risk where **any new app** could omit mandatory features if builders are not explicitly told.

### Q2: What canonical rule was missing?

**Answer**: 
1. "All apps must have embedded AI features (unless CS2-exempted)" - missing from MANDATORY_CROSS_APP_COMPONENTS.md
2. "FRS/TRS must inherit platform requirements" - missing from APP_STARTUP_REQUIREMENTS_DECLARATION.md
3. "Platform AI features gate must block non-compliant apps" - missing from GATE_REQUIREMENTS_INDEX.json

### Q3: How do we prevent this class of failure going forward?

**Answer**:
1. Update MANDATORY_CROSS_APP_COMPONENTS.md to make AI features universal
2. Create PLATFORM_AI_REQUIREMENTS.md canonical specification
3. Add platform AI features enforcement gate
4. Update FRS/TRS templates to include platform requirements
5. Create platform AI requirements checklist for builders
6. Update agent file schema to mandate AI capabilities section

### Q4: Is enforcement deterministic?

**Answer**: YES (after changes).

With the proposed changes:
- Gate validates AI component presence (deterministic file/code check)
- Agent file schema validator checks AI capabilities section
- FRS/TRS approval gate checks platform requirements inclusion
- Red tests validate AI features before green tests

---

## Evidence and Tracking

**Source Issue**: [Link to issue creating LL-031]  
**MAT Frontend Failure**: Deployment blocked due to missing AI features  
**Governance Repository**: maturion-foreman-governance  
**Blocking Wave**: All MAT frontend work (Wave 6/7/8)  
**Priority**: P0 - Catastrophic governance gap

---

## Lessons for Future

### For Builders
1. **Never assume features from precedent** - check canonical governance
2. **Platform requirements first** - validate platform checklist before app-specific work
3. **Red tests for platform features** - test platform requirements before app features
4. **FRS must inherit platform requirements** - explicit inclusion, not implicit

### For Foreman
1. **FRS approval gates on platform requirements** - do not approve FRS without platform checklist
2. **Builder alignment includes platform requirements** - explicit handoff of platform checklist
3. **Implementation plan must include platform features** - AI features, health checks, evidence, etc.
4. **QA-first includes platform QA** - red tests for platform requirements

### For Governance
1. **Implicit requirements don't exist** - if it's not in canon with enforcement, it's not a requirement
2. **Precedent ≠ governance** - legacy examples don't enforce future compliance
3. **Universal requirements need universal enforcement** - platform gates, not per-app checking
4. **Conditional wording creates gaps** - "for apps with X" makes X optional; say "all apps must have X"

---

## Canon Updates Required

1. ✅ Create this LL-031 canonical lesson
2. ⏳ Update MANDATORY_CROSS_APP_COMPONENTS.md Section 13 (universal AI requirements)
3. ⏳ Create governance/canon/PLATFORM_AI_REQUIREMENTS.md
4. ⏳ Update APP_STARTUP_REQUIREMENTS_DECLARATION.md (platform inheritance)
5. ⏳ Create governance/checklists/PLATFORM_AI_REQUIREMENTS_CHECKLIST.md
6. ⏳ Update GATE_REQUIREMENTS_INDEX.json (platform AI features gate)
7. ⏳ Update .agent.schema.md (AI capabilities section)
8. ⏳ Update CANON_INVENTORY.json (new canon entries)
9. ⏳ Update CHANGELOG.md (governance changes)

---

**Status**: Canonical lesson captured. Canon updates in progress per this lesson.

**Authority**: This lesson is now canonical governance memory. All future app builds MUST comply with the structural changes outlined above.

---

**Approved By**: CS2 (Johan Ras) - via issue creation and governance escalation  
**Canonized**: 2026-02-19  
**File**: governance/memory/canonical-lessons/LL-031_platform_ai_requirements_omission.md
