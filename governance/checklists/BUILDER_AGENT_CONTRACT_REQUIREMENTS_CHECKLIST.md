# BUILDER AGENT CONTRACT REQUIREMENTS CHECKLIST

**Status**: Canonical Governance Validation Checklist  
**Version**: 1.0.0  
**Authority**: CS2 (Johan Ras)  
**Created**: 2026-02-12  
**Last Updated**: 2026-02-12  
**Purpose**: Machine-checkable checklist of MANDATORY elements for Builder agent contract compliance with Living Agent System v6.2.0

---

## Executive Summary

This document provides a **machine-checkable binding checklist** that defines the **MANDATORY elements** that MUST appear in any Builder agent contract for the agent to be considered **fully compliant** with Living Agent System v6.2.0.

**Critical Principle**: A Builder contract is INCOMPLETE and the agent is OUT OF GOVERNANCE if ANY required element is missing or non-compliant.

This checklist implements:
- Living Agent System v6.2.0 (Builder-specific requirements)
- Build-to-Green mandate
- Zero-test-debt enforcement
- Prehandover proof requirements
- Architecture-first execution
- 30,000 Character Limit Enforcement

---

## Usage Instructions

### For Contract Authors

When creating or updating a Builder contract:
1. Verify ALL checklist items are present and compliant
2. Mark items as ✅ (present) or ❌ (missing)
3. Contract is VALID only if ALL required items are ✅
4. Character count MUST be < 30,000 (GitHub UI selectability)

### For Validation Tooling

Automated validators MUST:
1. Parse agent contract file (.github/agents/[builder-name].agent.md)
2. Verify each checklist item
3. Validate character count < 30,000
4. Return VALID only if 100% compliance achieved
5. Block recruitment if validation fails

---

## SECTION 1: MANDATORY COMPONENTS

### 1.1 YAML Frontmatter

- **Requirement**: MANDATORY
- **Validation**: Valid YAML with ALL required fields
- **Required Fields**:
  - `id: [builder-id]`
  - `description: [mission statement]`
  - `agent.id: [builder-id]`
  - `agent.class: builder`
  - `agent.version: 6.2.0`
  - `agent.specialty: [UI/API/Schema/Integration/QA]`
  - `governance.protocol: LIVING_AGENT_SYSTEM`
  - `governance.canon_inventory: governance/CANON_INVENTORY.json`
  - `governance.expected_artifacts: [list]`
  - `governance.degraded_on_placeholder_hashes: true`
  - `merge_gate_interface.required_checks: [list of 3 checks]`
  - `scope.repository: [repo name]`
  - `scope.read_access: [list]`
  - `scope.write_access: [list]`
  - `scope.escalation_required: [list]`
  - `supervision.foreman_required: true`
  - `supervision.qa_gates: [list]`
  - `execution_identity.name: "Maturion Bot"`
  - `execution_identity.secret: "[secret-name]"` (e.g., "MATURION_BOT_TOKEN")
  - `execution_identity.never_push_main: true`
  - `execution_identity.write_via_pr: true`
  - `prohibitions: [list]`
  - `metadata.canonical_home: [repo]`
  - `metadata.this_copy: canonical`
  - `metadata.authority: CS2`
  - `metadata.last_updated: YYYY-MM-DD`
- **Severity if Missing**: BLOCKER - Cannot parse agent configuration

### 1.2 Mission Statement

- **Requirement**: MANDATORY
- **Validation**: Clear mission statement defining builder specialty
- **Required Elements**:
  - Builder specialty declaration (UI/API/Schema/Integration/QA)
  - Implementation responsibility
  - Test ownership (build-to-green)
  - Foreman supervision acknowledgment
- **Severity if Missing**: HIGH - Agent purpose unclear

### 1.3 Wake-Up Protocol

- **Requirement**: MANDATORY
- **Validation**: Contains wake-up protocol
- **Required Elements**:
  - Script reference or embedded protocol
  - Load last memories
  - Governance state validation
  - CANON_INVENTORY validation
  - Degraded-mode escalation
  - Working contract generation
- **Severity if Missing**: BLOCKER - Agent cannot initialize

### 1.4 Session Memory Protocol

- **Requirement**: MANDATORY
- **Validation**: Complete session memory protocol with v6.2.0
- **Required Elements**:
  - Session memory file creation template
  - Memory rotation protocol (≤5 sessions)
  - Evidence capture protocol
  - Escalation creation protocol
  - Session closure protocol
- **Severity if Missing**: HIGH - Cannot track agent history

---

## SECTION 2: BUILDER-SPECIFIC REQUIREMENTS

### 2.1 Build-to-Green Commitment

- **Requirement**: MANDATORY
- **Validation**: Contains build-to-green protocol
- **Required Elements**:
  - Test creation BEFORE implementation
  - Red QA ownership (Foreman creates, Builder passes)
  - 100% GREEN requirement before handover
  - Zero-test-debt enforcement
  - No skipping or disabling tests
- **Canonical Reference**: BUILD_PHILOSOPHY.md
- **Severity if Missing**: BLOCKER - Cannot enforce quality

### 2.2 Prehandover Proof Requirements

- **Requirement**: MANDATORY
- **Validation**: Contains prehandover proof protocol with static analysis gates
- **Required Elements**:
  - Evidence bundle creation before handover
  - Test execution logs (100% GREEN, 0 failures)
  - **Lint validation (0 errors, 0 warnings)**
  - **Type-check validation (0 errors, if applicable)**
  - **Build success verification (exit code 0)**
  - CLI/CI evidence for ALL gates (tests, lint, type-check, build)
  - Zero warnings/errors requirement across all gates
  - Handover prohibition if ANY gate fails
- **Canonical Reference**: PREHANDOVER_PROOF_TEMPLATE.md v4.0.0
- **Authority**: Issue "Governance Policy Update: Mandatory Lint/Static Analysis Gates Before Handover" (Wave 5.6 Post-Mortem)
- **Severity if Missing**: BLOCKER - Cannot verify work quality, violates Wave 5.6 learning

### 2.3 Architecture-First Acknowledgment

- **Requirement**: MANDATORY
- **Validation**: Contains architecture-first commitment
- **Required Elements**:
  - Implementation follows approved architecture
  - No deviation without Foreman approval
  - Wave model compliance
  - Technical design adherence
- **Severity if Missing**: HIGH - Cannot enforce architecture governance

### 2.4 Foreman Supervision

- **Requirement**: MANDATORY
- **Validation**: Contains Foreman supervision acknowledgment
- **Required Elements**:
  - Foreman appointment required before work
  - Task acceptance from Foreman
  - Handover to Foreman (not direct to main)
  - Escalation to Foreman for blockers
- **Severity if Missing**: BLOCKER - Cannot ensure supervision

### 2.5 Scope Limitations

- **Requirement**: MANDATORY
- **Validation**: Contains clear scope boundaries
- **Required Elements**:
  - Read access list
  - Write access list (limited to implementation areas)
  - Escalation required list (constitutional/protected files)
  - No governance/canon modifications
  - No agent contract modifications without CS2 approval
- **Severity if Missing**: HIGH - Cannot enforce boundaries

---

## SECTION 3: QUALITY GATES

### 3.1 Test Coverage Requirements

- **Requirement**: MANDATORY (if applicable to builder specialty)
- **Validation**: Contains test coverage requirements
- **Required Elements**:
  - Unit test creation
  - Integration test creation (if applicable)
  - Coverage thresholds (if specified)
  - No test skipping/disabling
- **Severity if Missing**: HIGH - Cannot ensure test quality

### 3.2 Lint/Format Compliance

- **Requirement**: MANDATORY
- **Validation**: Contains lint/format requirements
- **Required Elements**:
  - Linting tool execution
  - Format tool execution
  - Zero violations requirement
- **Severity if Missing**: MEDIUM - Cannot ensure code quality

### 3.3 Build Verification

- **Requirement**: MANDATORY
- **Validation**: Contains build verification requirements
- **Required Elements**:
  - Build execution before handover
  - Zero errors requirement
  - Zero warnings requirement (or Foreman approval for accepted warnings)
- **Severity if Missing**: HIGH - Cannot ensure buildability

---

## SECTION 4: EVIDENCE & RECORDS

### 4.1 Session Memory

- **Requirement**: MANDATORY
- **Validation**: Contains session memory protocol
- **Required Elements**:
  - Session file creation in `.agent-workspace/[builder-id]/memory/`
  - Living Agent System v6.2.0 reference
  - Files modified with checksums
  - Actions taken documentation
  - Decisions made documentation
  - Outcome tracking
- **Severity if Missing**: HIGH - Cannot track builder history

### 4.2 Evidence Artifacts

- **Requirement**: MANDATORY
- **Validation**: Contains evidence artifact protocol
- **Required Elements**:
  - Test execution logs
  - Build logs
  - Lint/format reports
  - Coverage reports (if applicable)
  - Immutable evidence (no in-place mutation)
- **Severity if Missing**: HIGH - Cannot verify work

---

## SECTION 5: PROHIBITIONS

### 5.1 Core Prohibitions

- **Requirement**: MANDATORY
- **Validation**: All core prohibitions listed
- **Required Prohibitions**:
  - No working without Foreman appointment
  - No skipping or disabling tests
  - No bypassing QA gates
  - No direct pushes to main; PR-only writes
  - No governance/canon modifications
  - No agent contract modifications without CS2 approval
  - No scope expansion without approval
  - No evidence mutation in-place
- **Severity if Missing**: BLOCKER - Agent may violate governance

---

## SECTION 6: VALIDATION REQUIREMENTS

### 6.1 File Size Validation

- **Requirement**: MANDATORY (BLOCKING)
- **Validation**: Character count MUST be < 30,000
- **Enforcement**: Pre-recruitment validation
- **Test Command**: `wc -m < .github/agents/[builder-id].agent.md`
- **Severity if Exceeded**: BLOCKER - Violates GitHub UI selectability

### 6.2 Version Consistency

- **Requirement**: MANDATORY
- **Validation**: All version references MUST be v6.2.0
- **Check Locations**:
  - YAML frontmatter: `agent.version: 6.2.0`
  - Session memory template: `Living Agent System v6.2.0`
- **Severity if Inconsistent**: HIGH - Version regression detected

### 6.3 CANON_INVENTORY Alignment

- **Requirement**: MANDATORY
- **Validation**: References correct CANON_INVENTORY path
- **Required Path**: `governance/CANON_INVENTORY.json`
- **Degraded Mode**: Escalate on placeholder/truncated PUBLIC_API hashes
- **Severity if Missing**: BLOCKER - Cannot validate governance alignment

---

## SECTION 7: SPECIALTY-SPECIFIC REQUIREMENTS

### 7.1 UI Builder (if applicable)

- **Required Elements**:
  - Component testing requirements
  - Accessibility testing requirements
  - Visual regression testing (if applicable)
  - Browser compatibility testing (if applicable)

### 7.2 API Builder (if applicable)

- **Required Elements**:
  - API contract testing
  - Integration testing requirements
  - Performance testing (if applicable)
  - Security testing (if applicable)

### 7.3 Schema Builder (if applicable)

- **Required Elements**:
  - Migration testing requirements
  - Data integrity validation
  - Backward compatibility testing
  - Rollback strategy

### 7.4 Integration Builder (if applicable)

- **Required Elements**:
  - End-to-end testing requirements
  - Service integration testing
  - Error handling validation
  - Retry/resilience testing

### 7.5 QA Builder (if applicable)

- **Required Elements**:
  - Test framework setup
  - Test data management
  - Test environment configuration
  - Test reporting requirements

---

## VALIDATION SUMMARY

**Total Required Items**: Universal requirements + Specialty-specific + Prohibitions

**Compliance Threshold**: 100% (ALL items MUST be ✅)

**Character Limit**: < 30,000 characters (BLOCKING)

**Version Requirement**: Living Agent System v6.2.0

**CS2 Authorization**: REQUIRED for contract modifications

**Foreman Supervision**: MANDATORY before any work begins

---

## Authority

**Living Agent System**: v6.2.0  
**Checklist Version**: 1.0.0  
**Authority**: CS2 (Johan Ras)  
**Canonical Home**: APGI-cmy/maturion-foreman-governance  
**Last Updated**: 2026-02-12  
**Review Frequency**: Quarterly
