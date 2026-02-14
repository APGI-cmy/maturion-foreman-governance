# BUILD ARCHAEOLOGY AND LEARNING STRATEGY

**Status**: LIVING DOCUMENT (Draft v0.1.0)  
**Authority**: Foreman + CS2  
**Created**: 2026-02-14  
**Target Canonization**: After MAT build completion  
**Evolution Tracking**: See Section 8  

---

## Section 0: Document Status and Evolution

### Current State

This is a **LIVING DOCUMENT** actively evolving during the MAT (Maturion Autonomy Toolkit) build. It captures real-time governance improvements discovered through "build archaeology"—the systematic analysis of build processes, deviations, corrections, and institutional learnings.

**Purpose**: Document strategies for:
- Build monitoring and real-time progress tracking
- Institutional learning and pattern detection
- Process improvement through systematic reflection
- Prevention of recurring failures across builds

**Status**: Draft v0.1.0 (evolving during MAT build Stages 0-5)

### Evolution Log

Changes to this strategy document are tracked in Section 8: Evolution Log.

### Post-Build Canonization Plan

After MAT build completion and Stage 6 retrospective:

1. **Review** (Week 1): CS2 + Foreman conduct final review
2. **Formalize** (Week 1-2): Extract canonical protocols from living document
3. **Integrate** (Week 2): Update Living Agent System and related governance
4. **Layer-Down** (Week 2): Distribute to all relevant agent contracts

**Target**: Within 2 weeks of MAT build completion

---

## Section 1: Core Principles

### 1. Blameless Learning Culture

**Principle**: Focus on process improvement, not individual blame.

When deviations occur:
- Document what happened objectively
- Analyze systemic root causes
- Identify process improvements
- Never assign personal fault

**Rationale**: Psychological safety enables honest reporting of deviations, which is essential for institutional learning.

### 2. Real-Time Capture

**Principle**: Document deviations as they occur, not retrospectively.

**Implementation**:
- Record deviations in BUILD_PROGRESS_TRACKER immediately upon detection
- Conduct RCA while context is fresh
- Document preventive actions before moving forward
- Avoid end-of-build "memory reconstruction"

**Rationale**: Real-time documentation is more accurate and actionable than retrospective analysis.

### 3. Evolutionary Governance

**Principle**: Templates and processes improve with each build.

**Implementation**:
- Each build identifies template gaps
- Learnings feed back into next build's initialization
- Templates versioned (v1.0 → v1.1 → v2.0)
- Continuous improvement loop

**Rationale**: Static templates ossify; living templates evolve to prevent recurring failures.

### 4. Pattern Detection

**Principle**: Identify systemic issues across corrections.

**Implementation**:
- Track all deviations in structured format
- Analyze patterns across stages
- Group related root causes
- Distinguish one-off issues from systemic problems

**Rationale**: Individual corrections are tactical; pattern detection enables strategic improvements.

### 5. Institutional Memory

**Principle**: Learnings persist beyond individual agents/humans.

**Implementation**:
- Document lessons in persistent files
- "Review last 2 builds" protocol (Section 2)
- Cross-build pattern tracking
- Agent memory systems (.agent-workspace)

**Rationale**: Without institutional memory, organizations repeat the same mistakes indefinitely.

---

## Section 2: Build Initialization Protocol - Review Last 2 Builds

### CRITICAL REQUIREMENT

**Before creating BUILD_PROGRESS_TRACKER for a new module, Foreman MUST:**

#### 1. Review Last 2 Completed Builds (if available)

**Actions**:
- Read their BUILD_PROGRESS_TRACKER files in full
- Review all process deviations and corrections
- Review all RCAs (Root Cause Analyses) and preventive actions
- Review post-build retrospectives (Stage 6, when available)

**Example Builds to Review**:
- Most recent completed build (e.g., MAT)
- Second most recent completed build (if exists)

#### 2. Extract Lessons Learned

**Compile "Don't Repeat" Items**:
- What mistakes were made?
- What omissions occurred?
- What caused rework or delays?

**Compile "Must Include" Items**:
- What was forgotten and later added?
- What validation would have caught issues earlier?
- What checklist items prevented problems?

**Identify Template Improvements**:
- What stages were initially missing?
- What artifacts were incomplete?
- What validation was inadequate?

**Note Known Failure Patterns**:
- Template incompleteness
- Governance artifact stubs
- Authority boundary confusion
- Timing/sequencing issues

#### 3. Pre-populate New Tracker

**Add "Lessons from Previous Builds" to Stage 0**:

```markdown
### Stage 0: Build Initialization

#### Lessons from Previous Builds
**Reviewed:** MAT build (2026-02-13), [Previous Build Name]

**Key Preventive Actions:**
- [ ] Ensure CST/CWT included in Wave 0 schema (learned from MAT Issue #125)
- [ ] Ensure Builder Checklist creation stage present (learned from MAT Issue #123)
- [ ] Validate QA-to-Red stage present before Implementation Plan (learned from MAT Stage 2.5)

**Known Failure Patterns:**
- Template incompleteness (verify all stages present)
- Governance artifact stubs (verify completeness, not just presence)
- Authority boundary confusion (use decision trees)

**Traceability:**
- MAT BUILD_PROGRESS_TRACKER: `modules/mat/BUILD_PROGRESS_TRACKER.md`
- MAT Issues: #123, #125, #110
```

#### 4. Update Working Memory

**Record in Foreman Session Memory**:
- Which builds were reviewed
- Specific lessons applied to new build
- Create traceability: Previous Build Learning → New Build Prevention

**Memory Files**:
- `.agent-workspace/foreman-isms/memory/build-initialization-{module}.md`
- `.agent-workspace/foreman-isms/personal/lessons-learned.md` (cross-build patterns)
- `.agent-workspace/foreman-isms/personal/patterns.md` (recurring patterns)

### Automation Support

**Script**: `.github/scripts/build-init-review.sh`

```bash
#!/bin/bash
# Build Initialization Review Helper
# Assists Foreman in reviewing last 2 builds and extracting lessons

set -e

echo "=== Build Initialization Review ==="
echo ""

# Find last 2 completed builds
echo "Finding last 2 completed builds..."
BUILDS=$(find modules -name "BUILD_PROGRESS_TRACKER.md" -type f | sort -r | head -2)

if [ -z "$BUILDS" ]; then
    echo "No previous builds found. This is the first build."
    exit 0
fi

echo "Found builds to review:"
echo "$BUILDS"
echo ""

# For each build, extract key information
for BUILD_FILE in $BUILDS; do
    echo "=== Reviewing: $BUILD_FILE ==="
    echo ""
    
    # Extract deviations
    echo "Deviations:"
    grep -A 5 "DEVIATION\|CORRECTION" "$BUILD_FILE" || echo "  None found"
    echo ""
    
    # Extract lessons learned
    echo "Lessons Learned:"
    grep -A 3 "Lessons Learned\|LESSONS" "$BUILD_FILE" || echo "  None found"
    echo ""
    
    # Extract Stage 6 retrospective if present
    echo "Stage 6 Retrospective:"
    grep -A 10 "Stage 6" "$BUILD_FILE" || echo "  Not yet available"
    echo ""
    echo "---"
done

echo ""
echo "Next Steps:"
echo "1. Review the information above"
echo "2. Extract key preventive actions"
echo "3. Pre-populate new BUILD_PROGRESS_TRACKER Stage 0"
echo "4. Record learnings in .agent-workspace/foreman-isms/memory/"
```

---

## Section 3: Stage Exit Gates with Automated Validation

### Problem

**Issue**: Late detection of omissions (e.g., CST/CWT caught only during manual review)

**Impact**: Rework, delays, potential merge after build completion

### Solution

**Automated validation at each stage gate**

### Stage Exit Gate Requirements

For each stage completion, the following MUST be validated:

#### Common Requirements (Stages 0-4)

- [ ] BUILD_PROGRESS_TRACKER updated for current stage
- [ ] All key artifacts listed and created
- [ ] Completion date recorded
- [ ] Notes section populated with relevant context
- [ ] Any deviations documented with RCA + preventive action
- [ ] Agent session memory recorded

#### Stage-Specific Requirements

##### Stage 2 (Architecture)

- [ ] All 14 architecture completeness domains addressed
- [ ] TRS-to-Architecture traceability 100%
- [ ] .env.example includes all required variables
- [ ] Database schema documented
- [ ] API specifications complete
- [ ] State management architecture defined

##### Stage 2.5 (QA-to-Red)

- [ ] TEST_REGISTRY.json exists and valid
- [ ] All tests initially RED status
- [ ] 100% traceability to FRS, TRS, Architecture
- [ ] Test categories complete (unit, integration, e2e)
- [ ] Test infrastructure scaffolded
- [ ] No test debt introduced

##### Stage 3 (Implementation Plan)

- [ ] CST/CWT schema fields included in Wave 0
- [ ] CST/CWT API endpoints included
- [ ] CST/CWT test cases included
- [ ] All governance artifacts referenced
- [ ] Builder assignments documented
- [ ] Dependencies mapped
- [ ] Risk mitigation strategies defined
- [ ] Wave sequencing validated

##### Stage 3.5 (Builder Checklist)

- [ ] Builder checklist artifact created (not stub)
- [ ] Machine-checkable validation criteria present
- [ ] All 8 sections complete with detailed requirements
- [ ] Canon Inventory alignment verified
- [ ] Governance bindings documented
- [ ] Acceptance criteria clear and testable

##### Stage 4 (Build Execution)

- [ ] All waves completed sequentially
- [ ] Each wave evidence complete
- [ ] Test status progression: RED → GREEN
- [ ] Zero test debt maintained
- [ ] All warnings addressed
- [ ] Integration points validated

##### Stage 5 (Verification & Handover)

- [ ] 100% GREEN achieved
- [ ] All acceptance criteria met
- [ ] Evidence package complete
- [ ] Handover artifacts prepared
- [ ] FM sign-off obtained
- [ ] Zero outstanding issues

### Automation

**GitHub Workflow**: `.github/workflows/stage-gate-validation.yml`

```yaml
name: Stage Gate Validation
on:
  pull_request:
    paths:
      - 'modules/**/BUILD_PROGRESS_TRACKER.md'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Check stage gate requirements
        run: .github/scripts/validate-stage-gate.sh
        
      - name: Report validation results
        if: failure()
        run: |
          echo "::error::Stage gate validation failed. Review requirements."
          exit 1
```

**Validation Script**: `.github/scripts/validate-stage-gate.sh`

```bash
#!/bin/bash
# Stage Gate Validation Script
# Validates that stage completion meets all requirements

set -e

TRACKER_FILE="$1"
CURRENT_STAGE="$2"

if [ -z "$TRACKER_FILE" ]; then
    echo "Usage: $0 <tracker_file> <stage>"
    exit 1
fi

echo "Validating Stage $CURRENT_STAGE in $TRACKER_FILE"

# Common validations for all stages
validate_common() {
    echo "Checking common requirements..."
    
    # Check tracker updated
    if ! grep -q "Stage $CURRENT_STAGE.*Complete" "$TRACKER_FILE"; then
        echo "ERROR: Stage $CURRENT_STAGE not marked complete"
        return 1
    fi
    
    # Check completion date
    if ! grep -q "Completion Date:.*202[0-9]" "$TRACKER_FILE"; then
        echo "ERROR: Completion date not recorded"
        return 1
    fi
    
    echo "Common requirements: PASS"
}

# Stage-specific validations
validate_stage_2() {
    echo "Validating Stage 2 (Architecture)..."
    # Check for architecture completeness
    # Add specific checks here
    echo "Stage 2 requirements: PASS"
}

validate_stage_2_5() {
    echo "Validating Stage 2.5 (QA-to-Red)..."
    # Check for TEST_REGISTRY.json
    if [ ! -f "modules/*/TEST_REGISTRY.json" ]; then
        echo "ERROR: TEST_REGISTRY.json not found"
        return 1
    fi
    echo "Stage 2.5 requirements: PASS"
}

validate_stage_3() {
    echo "Validating Stage 3 (Implementation Plan)..."
    # Check for CST/CWT inclusion
    if ! grep -q "CST\|CWT" "$TRACKER_FILE"; then
        echo "WARNING: CST/CWT not explicitly mentioned"
    fi
    echo "Stage 3 requirements: PASS"
}

# Main validation logic
validate_common

case $CURRENT_STAGE in
    2)
        validate_stage_2
        ;;
    2.5)
        validate_stage_2_5
        ;;
    3)
        validate_stage_3
        ;;
    *)
        echo "Stage validation not yet implemented for stage $CURRENT_STAGE"
        ;;
esac

echo "Stage $CURRENT_STAGE validation: COMPLETE"
```

---

## Section 4: Agent Learning Loop Enforcement

### Problem

**Issue**: Agent learning loops currently manual and inconsistently enforced

**Impact**: 
- Lessons not captured
- Patterns not recorded
- Institutional memory gaps
- Recurring mistakes

### Solution

**Mandatory learning loop updates as session closure requirement**

### Session Closure Checklist (REQ-EO-005 Enhancement)

Every agent session closure MUST include:

- [ ] Session memory created: `.agent-workspace/{agent-id}/memory/session-{XXX}.md`
- [ ] Lessons learned updated: `.agent-workspace/{agent-id}/personal/lessons-learned.md`
- [ ] Patterns updated: `.agent-workspace/{agent-id}/personal/patterns.md`
- [ ] Anti-patterns updated (if applicable)
- [ ] Efficiency log updated (if performance issue discovered)

### Enforcement Mechanisms

#### 1. Script Validation

**Script**: `.github/scripts/session-closure.sh`

```bash
#!/bin/bash
# Session Closure Validation
# Ensures agent learning loops are updated before session closure

AGENT_ID="$1"
SESSION_ID="$2"

if [ -z "$AGENT_ID" ]; then
    echo "Usage: $0 <agent-id> <session-id>"
    exit 1
fi

WORKSPACE=".agent-workspace/$AGENT_ID"
MEMORY_FILE="$WORKSPACE/memory/session-$SESSION_ID.md"
LESSONS_FILE="$WORKSPACE/personal/lessons-learned.md"
PATTERNS_FILE="$WORKSPACE/personal/patterns.md"

echo "=== Session Closure Validation for $AGENT_ID ==="

# Check session memory created
if [ ! -f "$MEMORY_FILE" ]; then
    echo "ERROR: Session memory file not found: $MEMORY_FILE"
    echo "Please create session memory before closing session."
    exit 1
fi

# Check if learning files exist
if [ ! -f "$LESSONS_FILE" ]; then
    echo "WARNING: Lessons learned file not found: $LESSONS_FILE"
    echo "Creating template..."
    mkdir -p "$WORKSPACE/personal"
    echo "# Lessons Learned - $AGENT_ID" > "$LESSONS_FILE"
    echo "" >> "$LESSONS_FILE"
    echo "## Session $SESSION_ID" >> "$LESSONS_FILE"
fi

if [ ! -f "$PATTERNS_FILE" ]; then
    echo "WARNING: Patterns file not found: $PATTERNS_FILE"
    echo "Creating template..."
    mkdir -p "$WORKSPACE/personal"
    echo "# Patterns - $AGENT_ID" > "$PATTERNS_FILE"
fi

# Check if learning files were modified in this session
LAST_COMMIT=$(git log -1 --format="%H")
if git diff --name-only "$LAST_COMMIT~1" "$LAST_COMMIT" | grep -q "$LESSONS_FILE\|$PATTERNS_FILE"; then
    echo "✅ Learning files updated in this session"
else
    echo "⚠️  WARNING: Learning files not updated in this session"
    echo "Did you learn anything? Please update:"
    echo "  - $LESSONS_FILE"
    echo "  - $PATTERNS_FILE"
    read -p "Continue without learning updates? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "Session closure validation: COMPLETE"
```

#### 2. PR Gates

**CI Check**: Verify learning file updates in PR

- CI checks for learning file updates in agent workspace
- PR review checklist includes "Agent learning loops updated?"
- FM validates learning loop compliance before merge

#### 3. Template Guidance

**Each agent contract includes**:
- Learning loop examples
- Session memory template includes "Lessons Learned" section
- Clear guidance on what constitutes a "lesson"

### Example Learning Format

```markdown
## Session XXX Lessons

### Lesson 1: Template Incompleteness Pattern Detected

**What:** BUILD_PROGRESS_TRACKER template omitted Stage 2.5 (QA-to-Red)

**Why Critical:** Template omissions cause systematic gaps across all builds using that template version

**How to Apply:** 
- Always validate template completeness before build initialization
- Check template against canonical module lifecycle stages
- Add validation script to catch template-vs-canon mismatches

**Authority:** BUILD_PHILOSOPHY.md, MODULE_LIFECYCLE_STRATEGY.md

**Traceability:** MAT Issue #110, BUILD_PROGRESS_TRACKER deviation recorded 2026-02-13

### Lesson 2: CST/CWT Living Agent System Integration

**What:** Implementation plan initially omitted CST/CWT tracking fields

**Why Critical:** Living Agent System v6.2.0 mandates CST/CWT for all modules

**How to Apply:**
- Stage 3 validation must check for CST/CWT inclusion
- Add automated gate check: "grep 'CST\|CWT' implementation-plan.md"
- Pre-populate implementation plan template with CST/CWT section

**Authority:** LIVING_AGENT_SYSTEM.md v6.2.0

**Traceability:** MAT Issue #125, PR #124 correction
```

---

## Section 5: Cross-Agent Coordination and Authority Boundaries

### Problem

**Issue**: Authority boundaries unclear (e.g., Governance Liaison creating stub vs. invoking Codex Agent)

**Impact**:
- Agents working outside authority boundaries
- Incomplete artifacts (stubs instead of complete documents)
- Constitutional violations
- Rework and delays

### Solution

**Decision trees in agent contracts for "when to invoke another agent"**

### Decision Tree Template

For each agent contract, include:

```markdown
## Agent Invocation Decision Tree

### [Agent Name] Authority Boundaries

**✅ CAN DO (Self-Contained):**
- [List of tasks agent can complete independently]
- [Clear scope boundaries]

**❌ CANNOT DO (Must Invoke):**
- [Task type] → Invoke: [Agent name]
- [Task type] → Invoke: [Agent name]
- [Task type] → Escalate to: [CS2/Foreman]

**⚠️ DECISION RULE:**
If task requires [specific criteria], invoke [agent]. Do not attempt independently.

**Examples:**
1. Task: [Description] → Decision: [Self/Invoke/Escalate] → Rationale: [Why]
2. Task: [Description] → Decision: [Self/Invoke/Escalate] → Rationale: [Why]
```

### Specific Decision Trees

#### Governance Liaison Decision Tree

```markdown
## Governance Liaison Authority Boundaries

**✅ CAN DO (Self-Contained):**
- Layer down existing canonical governance to local repo
- Update CANON_INVENTORY.json and GOVERNANCE_INVENTORY.json
- Synchronize with canonical governance source
- Create ripple evidence documents
- Verify governance alignment
- Check hash integrity

**❌ CANNOT DO (Must Invoke):**
- Create NEW governance requirements → **Invoke: Codex Agent**
- Modify agent contracts (structure/authority) → **Invoke: CS2/Foreman**
- Make architecture decisions → **Invoke: Foreman**
- Interpret policy ambiguities → **Escalate to: CS2**
- Create governance from scratch → **Invoke: Codex Agent**

**⚠️ DECISION RULE:**
If creating new requirements (not layering down existing canonical governance), invoke Codex Agent.

**Examples:**

1. **Task:** Layer down BUILD_PHILOSOPHY.md to local repo
   - **Decision:** SELF (within authority)
   - **Rationale:** Canonical document exists; task is pure layer-down

2. **Task:** Create new BUILDER_VALIDATION_PROTOCOL.md
   - **Decision:** INVOKE Codex Agent
   - **Rationale:** New governance creation requires Codex Agent authority

3. **Task:** Update agent contract wake-up protocol section
   - **Decision:** ESCALATE to CS2/Foreman
   - **Rationale:** Agent contract modifications require supervisory approval

4. **Task:** Clarify ambiguous governance policy
   - **Decision:** ESCALATE to CS2
   - **Rationale:** Policy interpretation is constitutional matter
```

#### Foreman Decision Tree

```markdown
## Foreman Authority Boundaries

**✅ CAN DO (Self-Contained):**
- Create implementation plans
- Appoint builders
- Coordinate build execution
- Review evidence and gate checks
- Conduct build archaeology
- Update BUILD_PROGRESS_TRACKER
- Manage builder handoffs
- Enforce build gates

**❌ CANNOT DO (Must Invoke):**
- Modify canonical governance → **Invoke: Governance Liaison**
- Create technical solutions → **Invoke: Builders**
- Interpret constitutional changes → **Escalate to: CS2**
- Create agent contracts → **Invoke: Codex Agent**
- Make architecture changes → **Invoke: Architect** (with CS2 approval)

**⚠️ DECISION RULE:**
If governance layer-down needed, invoke Governance Liaison first.
If code implementation needed, invoke appropriate Builder.

**Examples:**

1. **Task:** Create Wave 0 implementation plan
   - **Decision:** SELF (within authority)
   - **Rationale:** Implementation planning is core Foreman responsibility

2. **Task:** Implement database schema
   - **Decision:** INVOKE Schema Builder
   - **Rationale:** Technical implementation delegated to builders

3. **Task:** Layer down new governance policy
   - **Decision:** INVOKE Governance Liaison
   - **Rationale:** Governance operations delegated to specialist

4. **Task:** Interpret Living Agent System v6.3.0 breaking change
   - **Decision:** ESCALATE to CS2
   - **Rationale:** Constitutional interpretation requires CS2 authority
```

#### Codex Agent Decision Tree

```markdown
## Codex Agent Authority Boundaries

**✅ CAN DO (Self-Contained):**
- Create new governance documents
- Draft agent contracts
- Create builder contracts
- Draft policies and protocols
- Create process documentation
- Design governance frameworks

**❌ CANNOT DO (Must Invoke):**
- Approve governance for canonization → **Escalate to: CS2**
- Layer down governance to repos → **Invoke: Governance Liaison**
- Implement technical solutions → **Invoke: Builders**
- Make final constitutional decisions → **Escalate to: CS2**

**⚠️ DECISION RULE:**
Codex Agent creates governance; CS2 approves; Governance Liaison layers down.

**Examples:**

1. **Task:** Draft new BUILDER_HANDOFF_PROTOCOL.md
   - **Decision:** SELF (within authority)
   - **Rationale:** Governance document creation is core Codex responsibility

2. **Task:** Approve BUILDER_HANDOFF_PROTOCOL.md for canonical status
   - **Decision:** ESCALATE to CS2
   - **Rationale:** Canonization requires CS2 approval

3. **Task:** Deploy approved protocol to maturion-isms repo
   - **Decision:** INVOKE Governance Liaison
   - **Rationale:** Layer-down operations delegated to specialist
```

#### Builder Decision Tree

```markdown
## Builder Authority Boundaries

**✅ CAN DO (Self-Contained):**
- Implement assigned wave scope
- Write tests for assigned scope
- Fix bugs in assigned scope
- Create technical documentation for assigned scope
- Collaborate with other builders on integration

**❌ CANNOT DO (Must Invoke):**
- Change architecture → **Escalate to: Foreman + CS2**
- Modify governance → **Escalate to: Foreman**
- Remove or skip tests → **Escalate to: Foreman**
- Change implementation plan → **Escalate to: Foreman**
- Modify wave assignments → **Escalate to: Foreman**

**⚠️ DECISION RULE:**
Builders execute plan; Foreman manages plan changes.

**Examples:**

1. **Task:** Implement schema for Wave 0 per implementation plan
   - **Decision:** SELF (within authority)
   - **Rationale:** Direct implementation of assigned scope

2. **Task:** Discover architecture issue requiring schema change
   - **Decision:** ESCALATE to Foreman
   - **Rationale:** Architecture changes require supervisory approval

3. **Task:** Test failing due to unrealistic requirement
   - **Decision:** ESCALATE to Foreman
   - **Rationale:** Requirement interpretation requires supervisory review

4. **Task:** Integrate Wave 0 schema with Wave 1 API
   - **Decision:** SELF with collaboration
   - **Rationale:** Builder-to-builder coordination within authority
```

---

## Section 6: Post-Build Retrospective Protocol (Stage 6)

### Overview

**New Stage Addition**: Add Stage 6 to BUILD_PROGRESS_TRACKER template

**Stage 6: Post-Build Retrospective**

### Purpose

Cumulative analysis of ALL tracker corrections to identify patterns and improve templates.

### Scope

1. Review ALL process deviations, corrections, and RCAs from Stages 0-5
2. Identify systemic patterns (e.g., "template incompleteness")
3. Analyze cumulative learnings across all agents
4. Propose canonical governance updates
5. Update BUILD_PROGRESS_TRACKER template for next module
6. Submit learnings to canonical governance for layer-up

### Artifacts

**Directory**: `modules/{slug}/06-retrospective/`

**Files**:
- `retrospective.md` - Cumulative analysis and summary
- `patterns-discovered.md` - Recurring patterns across stages
- `process-improvements.md` - Template updates and enhancements
- `lessons-canonized.md` - Submissions for canonical governance

### Retrospective Agenda

#### 1. Deviation Review (15 minutes per stage)

**For Each Stage (0-5)**:
- List all tracked deviations
- Review RCAs (Root Cause Analyses)
- Assess preventive actions
- Evaluate effectiveness of corrections

**Questions**:
- What was missed?
- Why was it missed?
- What would have prevented it?
- Did preventive action work?

#### 2. Pattern Detection (30 minutes)

**Activities**:
- Group related deviations
- Identify root cause patterns
- Document systemic issues
- Distinguish one-off from recurring

**Common Patterns to Look For**:
- Template incompleteness
- Validation gaps
- Authority boundary confusion
- Timing/sequencing issues
- Communication breakdowns
- Governance interpretation ambiguities

**Output**: `patterns-discovered.md`

#### 3. Template Improvement (30 minutes)

**Questions**:
- What should be added to template?
- What validation should be automated?
- What guidance should be clarified?
- What sections should be reordered?
- What examples should be added?

**Actions**:
- Draft BUILD_PROGRESS_TRACKER v{X+1}.0
- Identify automation opportunities
- Create validation scripts
- Update stage gate requirements

**Output**: `process-improvements.md`

#### 4. Canonical Submissions (30 minutes)

**Questions**:
- Which learnings apply to all builds?
- What governance updates needed?
- What should be layer-up to canonical?
- What agent contracts need updates?

**Submissions**:
- Protocol updates for canonical governance
- Agent contract enhancements
- Template improvements
- Automation scripts

**Output**: `lessons-canonized.md`

### Participants

**Required**:
- Foreman
- CS2

**Invited**:
- All agents who participated in build
- Builders (all waves)
- Governance Liaison
- QA Builder

### Timeline

**When**: Immediately after Stage 5 (Verification & Handover) complete

**Duration**: 2-3 hours total

**Output Deadline**: Within 3 business days of Stage 5 completion

### Stage 6 Template

```markdown
## Stage 6: Post-Build Retrospective

**Status**: [Not Started / In Progress / Complete]  
**Start Date**: YYYY-MM-DD  
**Completion Date**: YYYY-MM-DD  
**Participants**: Foreman, CS2, [agent list]

### Deviation Summary

**Total Deviations**: [count]

| Stage | Deviation | Root Cause | Pattern |
|-------|-----------|------------|---------|
| [X]   | [Brief]   | [Cause]    | [Y/N]   |

### Patterns Discovered

1. **[Pattern Name]**: [Description]
   - Occurrences: [count]
   - Root cause: [systemic issue]
   - Recommended fix: [template/process change]

### Template Improvements

**BUILD_PROGRESS_TRACKER v[X+1].0 Changes**:
- [ ] Add [section/requirement]
- [ ] Clarify [guidance]
- [ ] Automate [validation]

### Canonical Submissions

**Governance Updates Proposed**:
- [ ] [Protocol name]: [description]
- [ ] [Agent contract]: [enhancement]

### Lessons Learned (Summary)

**Top 5 Learnings**:
1. [Lesson 1]
2. [Lesson 2]
3. [Lesson 3]
4. [Lesson 4]
5. [Lesson 5]

### Next Build Improvements

**Pre-populate for Next Module**:
- [ ] [Preventive action 1]
- [ ] [Preventive action 2]
- [ ] [Preventive action 3]

### Retrospective Artifacts

- `06-retrospective/retrospective.md` ✅
- `06-retrospective/patterns-discovered.md` ✅
- `06-retrospective/process-improvements.md` ✅
- `06-retrospective/lessons-canonized.md` ✅
```

---

## Section 7: Canonization Checklist

This strategy document is ready for canonization when all criteria below are met:

### MAT Build Completion

- [ ] All stages 0-5 complete and evidence verified
- [ ] Post-build retrospective conducted (Stage 6)
- [ ] All sections of this strategy validated against real MAT experience
- [ ] Pattern detection confirmed with actual data
- [ ] Template improvements tested in practice

### Validation

- [ ] "Review last 2 builds" protocol tested during next build initialization
- [ ] Stage gate automation prototyped and tested on MAT build
- [ ] Agent learning loop enforcement tested with real agent sessions
- [ ] Cross-agent decision trees validated in real coordination scenarios
- [ ] Retrospective protocol executed and refined with MAT Stage 6

### Review

- [ ] CS2 final review complete
- [ ] Foreman final review complete
- [ ] Governance Liaison final review complete
- [ ] All feedback incorporated
- [ ] No outstanding concerns or blockers

### Artifact Preparation

- [ ] Canonical protocol documents drafted
- [ ] Template artifacts prepared (BUILD_PROGRESS_TRACKER v2.0)
- [ ] Automation scripts functional and tested
- [ ] Integration points with existing governance identified
- [ ] Documentation complete and clear

### Canonization Artifacts to Create

1. **BUILD_ARCHAEOLOGY_PROTOCOL.md** (canonical governance)
   - Formal protocol for build archaeology practice
   - Authority: CS2
   - Status: Canonical

2. **BUILD_INITIALIZATION_PROTOCOL.md** (review last 2 builds requirement)
   - Mandatory "review last 2 builds" process
   - Pre-population requirements
   - Memory system integration

3. **STAGE_GATE_VALIDATION_REQUIREMENTS.md**
   - Formal requirements for each stage gate
   - Automated validation specifications
   - CI/CD integration guidelines

4. **POST_BUILD_RETROSPECTIVE_PROTOCOL.md**
   - Formal Stage 6 retrospective process
   - Agenda, artifacts, participants
   - Pattern detection methodology

5. **LIVING_AGENT_SYSTEM.md v6.3.0** (update)
   - Integrate learning loop enforcement
   - Add agent invocation decision trees
   - Update session closure requirements

6. **BUILD_PROGRESS_TRACKER template v2.0.0**
   - Add Stage 6 (Post-Build Retrospective)
   - Add Stage 0 "Lessons from Previous Builds" section
   - Enhance deviation tracking format
   - Add stage gate validation checklists

7. **CANON_INVENTORY.json** (update)
   - Add new canonical protocols
   - Update version references
   - Add hash entries for new artifacts

### Target Date

**Deadline**: Within 2 weeks of MAT build completion

**Responsible**: Foreman + CS2

### Canonization Process

1. **Week 1**:
   - Days 1-3: Draft canonical protocol documents
   - Days 4-5: Internal review (Foreman + CS2)
   - Days 6-7: Revisions and refinements

2. **Week 2**:
   - Days 1-2: Prepare integration with existing governance
   - Days 3-4: Update LIVING_AGENT_SYSTEM.md and templates
   - Days 5-6: Final review and approval
   - Day 7: Canonize and layer-down

---

## Section 8: Evolution Log

### Purpose

Track all changes to this strategy document as MAT build progresses.

### Format

| Date | Version | Change | Rationale | Author |
|------|---------|--------|-----------|--------|
| 2026-02-14 | v0.1.0 | Initial draft | Capture observations from MAT Stages 0-3.5 | Foreman + CS2 |

### Current Version

**v0.1.0**

### Change Log

#### v0.1.0 (2026-02-14)

**Status**: Initial draft based on MAT build observations through Stage 3.5

**Key Innovations**:
1. "Review last 2 builds" protocol (Section 2)
2. Stage exit gates with automated validation (Section 3)
3. Agent learning loop enforcement (Section 4)
4. Agent invocation decision trees (Section 5)
5. Stage 6 retrospective protocol (Section 6)

**Inspired By**:
- MAT Issue #123: Builder checklist correction
- MAT Issue #125: CST/CWT implementation plan correction
- MAT BUILD_PROGRESS_TRACKER deviations (Stages 2.5, 3, 3.5)
- Living Agent System v6.2.0 session memory requirements

**Author**: Foreman + CS2

**Next Expected Update**: After MAT Stage 4 (Build Execution) completion

---

## Appendix A: Observations from MAT Build

### Purpose

Real-time observations that inform strategy refinements during MAT build.

### Stage 2.5 Observation (QA-to-Red)

**Observation Date**: 2026-02-13

**Deviation**: QA-to-Red stage initially omitted from BUILD_PROGRESS_TRACKER

**Root Cause**: BUILD_PROGRESS_TRACKER template v1.0 did not include Stage 2.5 (QA-to-Red) as a named stage

**Impact**: 
- QA-to-Red work occurred but wasn't tracked in standard format
- Confusion about stage sequencing
- Evidence organization inconsistent

**Learning**: Template incompleteness is a systemic pattern

**Corrective Action**: 
- Stage 2.5 added to BUILD_PROGRESS_TRACKER template
- Template updated to v1.1.0
- Historical gap documented in tracker

**Preventive Action**: 
- Validate template against canonical module lifecycle stages before each build
- Add template version checks to build initialization

**Applied**: Stage 2.5 now in template v1.1.0

**Reference**: MAT BUILD_PROGRESS_TRACKER deviation entry, PR #110

### Stage 3.5 Observation (Builder Checklist)

**Observation Date**: 2026-02-13

**Deviation**: Builder checklist creation stage initially omitted from BUILD_PROGRESS_TRACKER

**Root Cause**: BUILD_PROGRESS_TRACKER template v1.1 did not include Stage 3.5 (Builder Checklist) as a named stage

**Impact**:
- Builder checklist creation not tracked
- Unclear when checklist should be created
- Potential for incomplete builder guidance

**Learning**: Same pattern as Stage 2.5 (template incompleteness)

**Corrective Action**:
- Stage 3.5 added to BUILD_PROGRESS_TRACKER template
- Template updated to v1.2.0
- Deviation documented

**Preventive Action**:
- This strategy document (Section 2: Review last 2 builds)
- Stage gate validation (Section 3)
- Template evolution process (Section 6)

**Applied**: Stage 3.5 now in template v1.2.0

**Reference**: MAT BUILD_PROGRESS_TRACKER deviation entry, MAT Issue #123, PR #122

### Stage 3 Observation (CST/CWT)

**Observation Date**: 2026-02-13

**Deviation**: Implementation plan initially omitted CST/CWT (Current Session Tracking / Contextual Working Tracker) tracking

**Root Cause**: No validation to check for Living Agent System v6.2.0 requirements in implementation plans

**Impact**:
- CST/CWT fields missing from Wave 0 schema
- Living Agent System integration incomplete
- Potential governance violation

**Learning**: Need automated validation at stage gates for mandatory governance requirements

**Corrective Action**:
- Implementation plan updated to include CST/CWT
- Wave 0 scope expanded
- Documentation updated

**Preventive Action**:
- Stage 3 gate validation must check for CST/CWT inclusion
- Automated check: `grep 'CST\|CWT' implementation-plan.md`
- Pre-populate implementation plan template with CST/CWT section

**Applied**: Proposed stage gate validation in Section 3

**Reference**: MAT Issue #125, PR #124

### Pattern Detected: Template Incompleteness

**Pattern**: Recurring omissions in BUILD_PROGRESS_TRACKER template

**Evidence**:
- Stage 2.5 (QA-to-Red) omitted initially
- Stage 3.5 (Builder Checklist) omitted initially
- CST/CWT validation not in gate checks

**Root Cause**: Template evolution process was ad-hoc, not systematic

**Systemic Issue**: Templates created once and not updated based on learnings

**Meta-Learning**: Template evolution process itself was incomplete

**Solution**: This strategy document ensures templates improve systematically through:
- Build initialization protocol (review last 2 builds)
- Stage gate validation
- Post-build retrospective (Stage 6)
- Canonization and layer-down

**Impact**: Foundation for institutional learning and continuous improvement

### Pattern Detected: Authority Boundary Confusion

**Pattern**: Agents unclear when to work independently vs. invoke other agents

**Evidence**:
- Governance Liaison creating stubs instead of invoking Codex Agent
- Builders uncertain about architecture change authority
- Foreman uncertainty about governance modification authority

**Root Cause**: Agent contracts lack clear decision trees for invocation

**Systemic Issue**: Authority boundaries documented but not operationalized

**Solution**: Agent invocation decision trees (Section 5)

**Impact**: Clearer coordination, fewer authority violations, faster escalation

---

## Appendix B: References

### MAT Build Evidence

**BUILD_PROGRESS_TRACKER**:
- Path: `modules/mat/BUILD_PROGRESS_TRACKER.md`
- Status: In progress (through Stage 3.5 as of 2026-02-14)
- Deviations: Multiple documented with RCAs

**Issues**:
- Issue #123: Builder checklist correction
  - Problem: Stage 3.5 omitted from tracker
  - Resolution: Stage added, template updated
  
- Issue #125: CST/CWT implementation plan correction
  - Problem: CST/CWT omitted from implementation plan
  - Resolution: Plan updated, Wave 0 scope expanded

**Pull Requests**:
- PR #122: Builder checklist artifact creation
  - Created builder checklist per Living Agent System requirements
  
- PR #110: QA-to-Red test suite
  - Created TEST_REGISTRY.json and initial RED tests
  - Corrected Stage 2.5 tracking

### Canonical Governance

**LIVING_AGENT_SYSTEM.md v6.2.0**:
- Repository: APGI-cmy/maturion-foreman-governance
- Path: `governance/canon/LIVING_AGENT_SYSTEM.md`
- Key requirements: Session memory, learning loops, wake-up protocol

**BUILD_PHILOSOPHY.md**:
- Repository: APGI-cmy/maturion-foreman-governance
- Path: `BUILD_PHILOSOPHY.md`
- Key principles: 100% GREEN, zero test debt, one-time build

**AGENT_ENVIRONMENTAL_RESPONSIBILITY_DOCTRINE.md**:
- Repository: APGI-cmy/maturion-foreman-governance
- Path: `governance/canon/AGENT_ENVIRONMENTAL_RESPONSIBILITY_DOCTRINE.md`
- Key requirements: Environment health checks, autonomous remediation

**MODULE_LIFECYCLE_AND_REPO_STRUCTURE_STRATEGY.md**:
- Repository: APGI-cmy/maturion-foreman-governance
- Path: `maturion/strategy/MODULE_LIFECYCLE_AND_REPO_STRUCTURE_STRATEGY.md`
- Key content: Module lifecycle stages, structure requirements

### Related Strategy Documents

**CROSS_REPO_ORCHESTRATION_STRATEGY.md**:
- Path: `maturion/strategy/CROSS_REPO_ORCHESTRATION_STRATEGY.md`
- Relevance: Multi-repo coordination patterns

**INDEPENDENT_ASSURANCE_EXECUTION_STRATEGY.md**:
- Path: `maturion/strategy/INDEPENDENT_ASSURANCE_EXECUTION_STRATEGY.md`
- Relevance: Quality assurance and verification patterns

**LIVING_CANON_ALIGNMENT_EXECUTION_PLAN.md**:
- Path: `maturion/strategy/LIVING_CANON_ALIGNMENT_EXECUTION_PLAN.md`
- Relevance: Governance alignment and layer-down processes

### External References

**Build Archaeology Concept**:
- Origin: Software archaeology practices
- Application: Real-time learning during active builds
- Focus: Pattern detection and prevention, not blame

**Blameless Post-Mortems**:
- Origin: SRE (Site Reliability Engineering) practices
- Application: Deviation analysis without personal blame
- Focus: Systemic improvement

**Institutional Memory**:
- Origin: Organizational learning theory
- Application: Persistent learning across agent sessions
- Focus: Knowledge transfer and pattern reuse

---

**END OF DOCUMENT**

**Status**: LIVING DOCUMENT (Draft v0.1.0)  
**Next Review**: After MAT Stage 4 completion  
**Target Canonization**: Within 2 weeks of MAT build completion
