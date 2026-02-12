# CODEX ADVISOR AGENT CONTRACT REQUIREMENTS CHECKLIST

**Status**: Canonical Governance Validation Checklist  
**Version**: 1.0.0  
**Authority**: CS2 (Johan Ras)  
**Created**: 2026-02-12  
**Last Updated**: 2026-02-12  
**Purpose**: Machine-checkable checklist of MANDATORY elements for CodexAdvisor agent contract compliance with Living Agent System v6.2.0

---

## Executive Summary

This document provides a **machine-checkable binding checklist** that defines the **MANDATORY elements** that MUST appear in the CodexAdvisor agent contract for the agent to be considered **fully compliant** with Living Agent System v6.2.0.

**Critical Principle**: A CodexAdvisor contract is INCOMPLETE and the agent is OUT OF GOVERNANCE if ANY required element is missing or non-compliant.

This checklist implements:
- Living Agent System v6.2.0 (56 requirements: REQ-CM-001 through REQ-AG-004)
- 9 Mandatory Components (REQ-CM-001 through REQ-CM-010)
- 5 Validation Hooks (VH-001 through VH-005)
- Agent-Factory Protocol Requirements
- 30,000 Character Limit Enforcement

---

## Usage Instructions

### For Contract Authors

When creating or updating the CodexAdvisor contract:
1. Verify ALL checklist items are present and compliant
2. Mark items as ✅ (present) or ❌ (missing)
3. Contract is VALID only if ALL required items are ✅
4. Character count MUST be < 30,000 (GitHub UI selectability)

### For Validation Tooling

Automated validators MUST:
1. Parse agent contract file (.github/agents/CodexAdvisor-agent.md)
2. Verify each checklist item
3. Validate character count < 30,000
4. Return VALID only if 100% compliance achieved
5. Block merge if validation fails

---

## SECTION 1: MANDATORY COMPONENTS (9 Required)

### 1.1 YAML Frontmatter (REQ-CM-001, REQ-CM-002)

- **Requirement**: MANDATORY
- **Validation**: Valid YAML with ALL required fields
- **Required Fields**:
  - `id: CodexAdvisor-agent`
  - `description: [mission statement]`
  - `agent.id: CodexAdvisor-agent`
  - `agent.class: overseer`
  - `agent.version: 6.2.0`
  - `governance.protocol: LIVING_AGENT_SYSTEM`
  - `governance.canon_inventory: governance/CANON_INVENTORY.json`
  - `governance.expected_artifacts: [list]`
  - `governance.degraded_on_placeholder_hashes: true`
  - `governance.execution_identity.name: "Maturion Bot"`
  - `governance.execution_identity.secret: "[secret-name]"` (e.g., "MATURION_BOT_TOKEN")
  - `governance.execution_identity.safety.never_push_main: true`
  - `governance.execution_identity.safety.write_via_pr_by_default: true`
  - `merge_gate_interface.required_checks: [list of 3 checks]`
  - `scope.repositories: [list]`
  - `scope.approval_required: ALL_ACTIONS`
  - `capabilities: [role-specific capabilities]`
  - `escalation.authority: CS2`
  - `escalation.rules: [list]`
  - `prohibitions: [list]`
  - `metadata.canonical_home: APGI-cmy/maturion-codex-control`
  - `metadata.this_copy: canonical`
  - `metadata.authority: CS2`
  - `metadata.last_updated: YYYY-MM-DD`
- **Severity if Missing**: BLOCKER - Cannot parse agent configuration

### 1.2 Mission Statement (REQ-CM-003)

- **Requirement**: MANDATORY
- **Validation**: Clear mission aligned to Living Agent System v6.2.0
- **Format**: `# CodexAdvisor\n## Mission\n[mission text]`
- **Severity if Missing**: HIGH - Agent purpose unclear

### 1.3 Wake-Up Protocol (REQ-CM-004)

- **Requirement**: MANDATORY
- **Validation**: Contains wake-up protocol referencing `.github/scripts/wake-up-protocol.sh`
- **Required Elements**:
  - Phase sequence: identity → memory scan → governance load → environment health → big picture → escalations → working contract
  - Script reference: `.github/scripts/wake-up-protocol.sh CodexAdvisor-agent`
  - Degraded-mode escalation requirement
- **Severity if Missing**: BLOCKER - Agent cannot initialize properly

### 1.4 Session Memory Protocol (REQ-CM-005)

- **Requirement**: MANDATORY
- **Validation**: Complete session memory protocol with v6.2.0 references
- **Required Elements**:
  - Session memory file creation template
  - Memory rotation protocol (≤5 sessions)
  - Personal learning updates protocol
  - Escalation creation protocol
  - Version reference MUST be v6.2.0 (NOT v5.0.0)
- **Severity if Missing**: HIGH - Cannot track agent history

### 1.5 Agent-Factory Operational Protocol (REQ-CM-006)

- **Requirement**: MANDATORY (role-specific for CodexAdvisor)
- **Validation**: Contains agent creation/alignment protocol
- **Required Elements**:
  - CS2 authorization requirement for agent file creation
  - Pre-creation requirements (MANDATORY section)
  - Living Agent System v6.2.0 template structure
  - 9 mandatory component definitions
  - 56 requirement mappings
  - Character count validation (30K limit)
  - Degraded mode operations protocol
  - Compliance enforcement rules
- **Severity if Missing**: BLOCKER - Cannot create/manage agents

### 1.6 Validation Hooks (REQ-CM-007)

- **Requirement**: MANDATORY
- **Validation**: All 5 validation hooks documented
- **Required Hooks**:
  - VH-001: YAML frontmatter validation
  - VH-002: Checklist compliance validation
  - VH-003: CANON_INVENTORY hash validation
  - VH-004: Merge gate interface validation
  - VH-005: Prohibition enforcement validation
- **Severity if Missing**: HIGH - Cannot validate compliance

### 1.7 Requirement Mappings (REQ-CM-008)

- **Requirement**: MANDATORY
- **Validation**: All 56 requirements mapped with line references
- **Required Mappings**:
  - REQ-CM-001 through REQ-CM-010 (Canon Management)
  - REQ-ER-001 through REQ-ER-005 (Evidence & Records)
  - REQ-RA-001 through REQ-RA-006 (Ripple & Alignment)
  - REQ-GC-001 through REQ-GC-005 (Gate Compliance)
  - REQ-AS-001 through REQ-AS-005 (Authority & Self-Alignment)
  - REQ-EO-001 through REQ-EO-006 (Execution & Operations)
  - REQ-MGI-001 through REQ-MGI-005 (Merge Gate Interface)
  - REQ-CR-001 through REQ-CR-005 (Coordination & Reporting)
  - REQ-SS-001 through REQ-SS-005 (Security & Safety)
  - REQ-AG-001 through REQ-AG-004 (Ambiguities & Gaps)
  - VH-001 through VH-005 (Validation Hooks)
- **Severity if Missing**: BLOCKER - Cannot verify compliance

### 1.8 LOCKED Section Metadata (REQ-CM-009)

- **Requirement**: MANDATORY
- **Validation**: Contains LOCKED section with metadata
- **Required Fields**:
  - Lock ID: unique identifier
  - Authority: CS2 (Johan Ras)
  - Review Frequency: Quarterly
  - Modification Authority: CS2 only via authorized PR
  - Protected Elements list
  - Last Review date
  - Next Review Due date
- **Severity if Missing**: HIGH - Cannot protect critical sections

### 1.9 Authority and Version Footer (REQ-CM-010)

- **Requirement**: MANDATORY
- **Validation**: Contains authority footer with correct version
- **Format**: `Authority: LIVING_AGENT_SYSTEM.md | Version: 6.2.0 | Agent Contract: CodexAdvisor-agent`
- **Must Include**: Checklist Compliance: 100% | Last Updated: YYYY-MM-DD
- **Severity if Missing**: HIGH - Cannot verify version compliance

---

## SECTION 2: AGENT-FACTORY SPECIFIC REQUIREMENTS

### 2.1 Required Checklists Configuration

- **Requirement**: MANDATORY
- **Validation**: Checklist paths defined for all agent types
- **Required Paths**:
  - `governance/checklists/GOVERNANCE_LIAISON_AGENT_CONTRACT_REQUIREMENTS_CHECKLIST.md`
  - `governance/checklists/FOREMAN_AGENT_CONTRACT_REQUIREMENTS_CHECKLIST.md`
  - `governance/checklists/BUILDER_AGENT_CONTRACT_REQUIREMENTS_CHECKLIST.md`
  - `governance/checklists/CODEX_ADVISOR_AGENT_CONTRACT_REQUIREMENTS_CHECKLIST.md`
- **Severity if Missing**: BLOCKER - Cannot validate agent creation

### 2.2 Character Limit Enforcement

- **Requirement**: MANDATORY (BLOCKING)
- **Validation**: File size limit configuration present
- **Required Configuration**:
  - `max_characters: 30000`
  - `reason: "GitHub UI selectability requirement"`
  - `enforcement: BLOCKING`
  - `violation_action: FAIL_VALIDATION`
- **Severity if Missing**: BLOCKER - Cannot enforce GitHub UI constraint

### 2.3 Compliance Level Declaration

- **Requirement**: MANDATORY
- **Validation**: Living Agent System version declared
- **Required Value**: `compliance_level: LIVING_AGENT_SYSTEM_v6_2_0`
- **Severity if Missing**: HIGH - Cannot verify compliance baseline

---

## SECTION 3: PROHIBITIONS (REQ-CM-009)

### 3.1 Core Prohibitions

- **Requirement**: MANDATORY
- **Validation**: All core prohibitions listed
- **Required Prohibitions**:
  - No execution without explicit approval
  - No weakening of governance, tests, or merge gates
  - No pushing to main (use PRs)
  - No secrets in commits/issues/PRs
  - No self-extension of scope/authority
  - No edits to this agent contract except via CS2-approved issue
- **Severity if Missing**: BLOCKER - Agent may violate governance

---

## SECTION 4: VALIDATION REQUIREMENTS

### 4.1 File Size Validation

- **Requirement**: MANDATORY (BLOCKING)
- **Validation**: Character count MUST be < 30,000
- **Enforcement**: Pre-PR creation validation
- **Test Command**: `wc -m < .github/agents/CodexAdvisor-agent.md`
- **Severity if Exceeded**: BLOCKER - Violates GitHub UI selectability

### 4.2 Version Consistency

- **Requirement**: MANDATORY
- **Validation**: All version references MUST be v6.2.0
- **Check Locations**:
  - YAML frontmatter: `agent.version: 6.2.0`
  - Session memory template: `Living Agent System v6.2.0`
  - Authority footer: `Version: 6.2.0`
- **Severity if Inconsistent**: HIGH - Version regression detected

### 4.3 CANON_INVENTORY Hash Validation

- **Requirement**: MANDATORY
- **Validation**: No placeholder or truncated hashes in PUBLIC_API entries
- **Action if Degraded**: Stop, escalate to CS2, do NOT proceed
- **Severity if Ignored**: BLOCKER - Operating in degraded mode

---

## VALIDATION SUMMARY

**Total Required Items**: 56 requirements + 9 components + 5 hooks = 70 items

**Compliance Threshold**: 100% (ALL items MUST be ✅)

**Character Limit**: < 30,000 characters (BLOCKING)

**Version Requirement**: Living Agent System v6.2.0 (NO v5.0.0 references)

**CS2 Authorization**: REQUIRED for all agent file modifications

---

## Authority

**Living Agent System**: v6.2.0  
**Checklist Version**: 1.0.0  
**Authority**: CS2 (Johan Ras)  
**Canonical Home**: APGI-cmy/maturion-foreman-governance  
**Last Updated**: 2026-02-12  
**Review Frequency**: Quarterly
