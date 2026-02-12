# FOREMAN AGENT CONTRACT REQUIREMENTS CHECKLIST

**Status**: Canonical Governance Validation Checklist  
**Version**: 1.0.0  
**Authority**: CS2 (Johan Ras)  
**Created**: 2026-02-12  
**Last Updated**: 2026-02-12  
**Purpose**: Machine-checkable checklist of MANDATORY elements for Foreman agent contract compliance with Living Agent System v6.2.0

---

## Executive Summary

This document provides a **machine-checkable binding checklist** that defines the **MANDATORY elements** that MUST appear in the Foreman agent contract for the agent to be considered **fully compliant** with Living Agent System v6.2.0.

**Critical Principle**: A Foreman contract is INCOMPLETE and the agent is OUT OF GOVERNANCE if ANY required element is missing or non-compliant.

This checklist implements:
- Living Agent System v6.2.0 (all 10 requirement categories)
- Architecture-first, QA-first, zero-test-debt enforcement
- Builder supervision and task delegation
- Merge Gate Interface ownership
- 30,000 Character Limit Enforcement

---

## Usage Instructions

### For Contract Authors

When creating or updating the Foreman contract:
1. Verify ALL checklist items are present and compliant
2. Mark items as ✅ (present) or ❌ (missing)
3. Contract is VALID only if ALL required items are ✅
4. Character count MUST be < 30,000 (GitHub UI selectability)

### For Validation Tooling

Automated validators MUST:
1. Parse agent contract file (.github/agents/foreman-v2.agent.md)
2. Verify each checklist item
3. Validate character count < 30,000
4. Return VALID only if 100% compliance achieved
5. Block merge if validation fails

---

## SECTION 1: MANDATORY COMPONENTS

### 1.1 YAML Frontmatter

- **Requirement**: MANDATORY
- **Validation**: Valid YAML with ALL required fields
- **Required Fields**:
  - `id: foreman`
  - `description: [mission statement]`
  - `agent.id: foreman`
  - `agent.class: supervisor`
  - `agent.version: 6.2.0`
  - `agent.contract_version: [version]`
  - `governance.protocol: LIVING_AGENT_SYSTEM`
  - `governance.canon_inventory: governance/CANON_INVENTORY.json`
  - `governance.expected_artifacts: [list]`
  - `governance.degraded_on_placeholder_hashes: true`
  - `governance.degraded_action: escalate_and_block_merge`
  - `merge_gate_interface.required_checks: [list of 3 checks]`
  - `scope.repository: [repo name]`
  - `scope.read_access: [list]`
  - `scope.write_access: [list]`
  - `scope.escalation_required: [list]`
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
- **Validation**: Clear mission statement defining supervisory role
- **Required Elements**:
  - Architecture-first execution
  - QA creation and ownership
  - Builder supervision
  - Zero-test-debt enforcement
  - Merge Gate Interface ownership
- **Severity if Missing**: HIGH - Agent purpose unclear

### 1.3 Wake-Up Protocol

- **Requirement**: MANDATORY
- **Validation**: Contains wake-up protocol referencing script
- **Required Elements**:
  - Script reference: `.github/scripts/wake-up-protocol.sh foreman`
  - CANON_INVENTORY hash validation
  - Degraded-mode escalation on placeholder hashes
  - Working contract generation
- **Severity if Missing**: BLOCKER - Agent cannot initialize

### 1.4 Session Memory Protocol

- **Requirement**: MANDATORY
- **Validation**: Complete session memory protocol
- **Required Elements**:
  - Session memory file creation template with v6.2.0
  - Memory rotation protocol (≤5 sessions)
  - Evidence capture protocol
  - Escalation creation protocol
  - Session closure script reference
- **Severity if Missing**: HIGH - Cannot track agent history

### 1.5 Core Protocols Section

- **Requirement**: MANDATORY
- **Validation**: Contains core operational protocols
- **Required Elements**:
  - Wake-up protocol with REQ-AS-005 reference
  - Session closure protocol with REQ-EO-005 reference
  - Execution identity with REQ-SS-001/003 references
  - Critical invariant: Foreman NEVER writes production code
- **Severity if Missing**: BLOCKER - Cannot operate correctly

### 1.6 Operating Boundaries & Escalations

- **Requirement**: MANDATORY
- **Validation**: Contains escalation rules
- **Required Elements**:
  - CS2 approval requirements
  - Degraded alignment handling
  - Authority boundary escalations
  - Governance ambiguity escalation
- **Severity if Missing**: HIGH - Cannot escalate properly

### 1.7 Requirement Mappings

- **Requirement**: MANDATORY
- **Validation**: All 10 requirement categories mapped
- **Required Categories**:
  1. Canon Management (REQ-CM-001..005)
  2. Evidence & Records (REQ-ER-001..005)
  3. Ripple & Alignment (REQ-RA-001..006)
  4. Gate Compliance (REQ-GC-001..005)
  5. Authority & Self-Alignment (REQ-AS-001..005)
  6. Execution & Operations (REQ-EO-001..006)
  7. Merge Gate Interface (REQ-MGI-001..005)
  8. Coordination & Reporting (REQ-CR-001..005)
  9. Security & Safety (REQ-SS-001..005)
  10. Ambiguities & Gaps (REQ-AG-001..004)
- **Severity if Missing**: BLOCKER - Cannot verify compliance

---

## SECTION 2: FOREMAN-SPECIFIC REQUIREMENTS

### 2.1 Builder Supervision

- **Requirement**: MANDATORY
- **Validation**: Contains builder management protocol
- **Required Elements**:
  - Builder appointment process
  - Task delegation protocol
  - Zero-test-debt enforcement
  - Prehandover proof requirements
  - Builder contract binding
- **Severity if Missing**: BLOCKER - Cannot supervise builders

### 2.2 QA Ownership

- **Requirement**: MANDATORY
- **Validation**: Contains QA creation and ownership protocol
- **Required Elements**:
  - Red QA creation (test-first)
  - QA gate enforcement
  - 100% GREEN requirement
  - No bypass of QA gates
- **Severity if Missing**: BLOCKER - Cannot enforce quality

### 2.3 Architecture-First Protocol

- **Requirement**: MANDATORY
- **Validation**: Contains architecture-first enforcement
- **Required Elements**:
  - Architecture review before implementation
  - Technical design validation
  - Wave model compliance
- **Severity if Missing**: HIGH - Cannot enforce architecture governance

### 2.4 Merge Gate Interface Ownership

- **Requirement**: MANDATORY
- **Validation**: Contains merge gate verdict ownership
- **Required Elements**:
  - Gate verdict creation authority
  - Three required checks (verdict, alignment, stop-and-fix)
  - Branch protection alignment
  - Evidence-first messaging
- **Severity if Missing**: BLOCKER - Cannot control merge gates

---

## SECTION 3: PROHIBITIONS

### 3.1 Core Prohibitions

- **Requirement**: MANDATORY
- **Validation**: All core prohibitions listed
- **Required Prohibitions**:
  - Never write production code (builders implement; FM supervises)
  - No bypass of QA gates; 100% GREEN required
  - No governance interpretation beyond authority; escalate ambiguities
  - No edits to this agent contract without CS2-approved issue
  - No skipping wake-up or session closure protocols
  - No evidence mutation in-place; create new artifacts
  - No direct pushes to main; PR-only writes
- **Severity if Missing**: BLOCKER - Agent may violate governance

---

## SECTION 4: VALIDATION REQUIREMENTS

### 4.1 File Size Validation

- **Requirement**: MANDATORY (BLOCKING)
- **Validation**: Character count MUST be < 30,000
- **Enforcement**: Pre-PR creation validation
- **Test Command**: `wc -m < .github/agents/foreman-v2.agent.md`
- **Severity if Exceeded**: BLOCKER - Violates GitHub UI selectability

### 4.2 Version Consistency

- **Requirement**: MANDATORY
- **Validation**: All version references MUST be v6.2.0
- **Check Locations**:
  - YAML frontmatter: `agent.version: 6.2.0`
  - Session memory template: `Living Agent System v6.2.0`
  - Mission header: `Living Agent System v6.2.0`
- **Severity if Inconsistent**: HIGH - Version regression detected

### 4.3 CANON_INVENTORY Alignment

- **Requirement**: MANDATORY
- **Validation**: References correct CANON_INVENTORY path
- **Required Path**: `governance/CANON_INVENTORY.json`
- **Degraded Mode**: Escalate on placeholder/truncated PUBLIC_API hashes
- **Severity if Missing**: BLOCKER - Cannot validate governance alignment

---

## VALIDATION SUMMARY

**Total Required Categories**: 10 requirement categories + Core protocols + Foreman-specific + Prohibitions

**Compliance Threshold**: 100% (ALL items MUST be ✅)

**Character Limit**: < 30,000 characters (BLOCKING)

**Version Requirement**: Living Agent System v6.2.0

**CS2 Authorization**: REQUIRED for contract modifications

---

## Authority

**Living Agent System**: v6.2.0  
**Checklist Version**: 1.0.0  
**Authority**: CS2 (Johan Ras)  
**Canonical Home**: APGI-cmy/maturion-foreman-governance  
**Last Updated**: 2026-02-12  
**Review Frequency**: Quarterly
