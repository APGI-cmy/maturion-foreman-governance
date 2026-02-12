# GOVERNANCE LIAISON AGENT CONTRACT REQUIREMENTS CHECKLIST

**Status**: Canonical Governance Validation Checklist  
**Version**: 1.0.0  
**Authority**: CS2 (Johan Ras)  
**Created**: 2026-02-12  
**Last Updated**: 2026-02-12  
**Purpose**: Machine-checkable checklist of MANDATORY elements for Governance Liaison (governance-repo-administrator) agent contract compliance with Living Agent System v6.2.0

---

## Executive Summary

This document provides a **machine-checkable binding checklist** that defines the **MANDATORY elements** that MUST appear in the Governance Liaison agent contract for the agent to be considered **fully compliant** with Living Agent System v6.2.0.

**Critical Principle**: A Governance Liaison contract is INCOMPLETE and the agent is OUT OF GOVERNANCE if ANY required element is missing or non-compliant.

This checklist implements:
- Living Agent System v6.2.0 (all 56 requirements)
- Governance repository administration
- Ripple enforcement and tracking
- Inventory integrity maintenance
- Gate stewardship
- 30,000 Character Limit Enforcement

---

## Usage Instructions

### For Contract Authors

When creating or updating the Governance Liaison contract:
1. Verify ALL checklist items are present and compliant
2. Mark items as ✅ (present) or ❌ (missing)
3. Contract is VALID only if ALL required items are ✅
4. Character count MUST be < 30,000 (GitHub UI selectability)

### For Validation Tooling

Automated validators MUST:
1. Parse agent contract file (.github/agents/governance-repo-administrator-v2.agent.md)
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
  - `id: governance-repo-administrator`
  - `description: [mission statement]`
  - `agent.id: governance-repo-administrator`
  - `agent.class: administrator`
  - `agent.version: 6.2.0`
  - `agent.contract_version: [version]`
  - `governance.protocol: LIVING_AGENT_SYSTEM`
  - `governance.canon_inventory: governance/CANON_INVENTORY.json`
  - `governance.expected_artifacts: [list]`
  - `governance.degraded_on_placeholder_hashes: true`
  - `governance.degraded_action: escalate_and_block_merge`
  - `merge_gate_interface.required_checks: [list of 3 checks]`
  - `scope.repository: [repo name]`
  - `scope.read_access: ["**/*"]`
  - `scope.write_access: [list including governance/**]`
  - `scope.escalation_required: [list including governance/canon/**]`
  - `capabilities.governance_ops: [list]`
  - `capabilities.evidence: [list]`
  - `capabilities.security: [list]`
  - `capabilities.validation: [list]`
  - `execution_identity.name: "Maturion Bot"`
  - `execution_identity.secret: "MATURION_BOT_TOKEN"`
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
- **Validation**: Clear mission statement defining governance administration role
- **Required Elements**:
  - Canonical governance repository operation
  - Inventory integrity maintenance
  - Ripple stewardship
  - Merge gate enforcement
  - Evidence-first operations
- **Severity if Missing**: HIGH - Agent purpose unclear

### 1.3 Wake-Up Protocol

- **Requirement**: MANDATORY
- **Validation**: Contains wake-up protocol
- **Required Elements**:
  - Script reference: `.github/scripts/wake-up-protocol.sh` or embedded protocol
  - Load last 5 memories
  - Governance state validation
  - Environment health check
  - CANON_INVENTORY validation
  - Degraded-mode escalation on placeholder/truncated PUBLIC_API hashes
  - Working contract generation
- **Severity if Missing**: BLOCKER - Agent cannot initialize

### 1.4 Session Memory Protocol

- **Requirement**: MANDATORY
- **Validation**: Complete session memory protocol with v6.2.0
- **Required Elements**:
  - Session memory file creation template
  - Memory rotation protocol (≤5 sessions)
  - Evidence capture protocol
  - Escalation creation in `.agent-workspace/governance-repo-administrator/escalation-inbox/`
  - Session closure script reference
- **Severity if Missing**: HIGH - Cannot track agent history

### 1.5 Core Protocols Section

- **Requirement**: MANDATORY
- **Validation**: Contains core operational protocols
- **Required Elements**:
  - Wake-up protocol with REQ-AS-005 reference
  - Session closure protocol with REQ-EO-005, REQ-ER-003/004 references
  - Execution identity with REQ-SS-001/003 references
  - Branch protection requirement for three Merge Gate Interface contexts (REQ-MGI-004)
- **Severity if Missing**: BLOCKER - Cannot operate correctly

### 1.6 Operating Boundaries & Escalations

- **Requirement**: MANDATORY
- **Validation**: Contains escalation rules
- **Required Elements**:
  - CS2 approval requirements for constitutional canon changes (REQ-CM-003, REQ-CM-005)
  - Degraded alignment handling (REQ-SS-004)
  - Structured escalation creation (REQ-AG-002/004, REQ-AS-003)
  - Authority boundary conflict escalation
- **Severity if Missing**: HIGH - Cannot escalate properly

### 1.7 Requirement Mappings (All 56)

- **Requirement**: MANDATORY
- **Validation**: All 56 requirements explicitly mapped with line references
- **Required Mappings**:
  - REQ-CM-001..005: Canon Management
  - REQ-ER-001..005: Evidence & Records
  - REQ-RA-001..006: Ripple & Alignment
  - REQ-GC-001..005: Gate Compliance
  - REQ-AS-001..005: Authority & Self-Alignment
  - REQ-EO-001..006: Execution & Operations
  - REQ-MGI-001..005: Merge Gate Interface
  - REQ-CR-001..005: Coordination & Reporting
  - REQ-SS-001..005: Security & Safety
  - REQ-AG-001..004: Ambiguities & Gaps
- **Severity if Missing**: BLOCKER - Cannot verify compliance

---

## SECTION 2: GOVERNANCE LIAISON SPECIFIC REQUIREMENTS

### 2.1 CANON_INVENTORY Maintenance (REQ-CM-001, REQ-CM-002)

- **Requirement**: MANDATORY
- **Validation**: Contains CANON_INVENTORY maintenance protocol
- **Required Elements**:
  - Full sha256 hash maintenance
  - Provenance recording (effective_date, version)
  - Placeholder hash detection and escalation
  - Inventory synchronization protocol
- **Severity if Missing**: BLOCKER - Cannot maintain governance inventory

### 2.2 Ripple Stewardship (REQ-RA-001..006, REQ-CR-002..003)

- **Requirement**: MANDATORY
- **Validation**: Contains ripple execution and tracking protocol
- **Required Elements**:
  - Constitutional canon change detection
  - Ripple dispatch to consumer repositories
  - Ripple log creation and tracking
  - Bidirectional ripple flow logging
  - CONSUMER_REPO_REGISTRY maintenance
  - Cross-repo impact analysis
- **Severity if Missing**: BLOCKER - Cannot propagate governance changes

### 2.3 Merge Gate Interface Stewardship (REQ-GC-001..005, REQ-MGI-001..005)

- **Requirement**: MANDATORY
- **Validation**: Contains merge gate workflow maintenance protocol
- **Required Elements**:
  - Workflow maintenance (named "Merge Gate Interface")
  - GATE_REQUIREMENTS_INDEX maintenance
  - Pull request classification (deterministic)
  - Three required contexts enforcement
  - Verdict gate evidence validation
  - Alignment gate hash comparison
  - Stop-and-fix gate RCA enforcement
  - Fail-fast, evidence-first messaging
- **Severity if Missing**: BLOCKER - Cannot enforce merge gates

### 2.4 Protected File Enforcement (REQ-SS-002, REQ-CM-005)

- **Requirement**: MANDATORY
- **Validation**: Contains protected file detection and approval enforcement
- **Required Elements**:
  - Constitutional canon protection
  - Agent contract protection (.github/agents/**)
  - Protected file list in escalation_required
  - CS2 approval requirement for protected file changes
- **Severity if Missing**: HIGH - Cannot protect governance artifacts

### 2.5 Evidence Preservation (REQ-ER-001..005)

- **Requirement**: MANDATORY
- **Validation**: Contains evidence preservation protocol
- **Required Elements**:
  - Immutable evidence artifacts
  - Date/Author inclusion in evidence
  - Structured session memories
  - Memory rotation (≤5 active sessions)
  - Audit trail via PR-only writes
  - No evidence mutation in-place
- **Severity if Missing**: HIGH - Cannot maintain audit trail

---

## SECTION 3: CAPABILITIES

### 3.1 Governance Operations Capabilities

- **Requirement**: MANDATORY
- **Validation**: Contains governance_ops capabilities
- **Required Capabilities**:
  - Maintain CANON_INVENTORY with full hashes and provenance
  - Steward ripple execution and tracking
  - Maintain merge gate interface workflows
  - Maintain GATE_REQUIREMENTS_INDEX
- **Severity if Missing**: HIGH - Cannot perform governance operations

### 3.2 Evidence Capabilities

- **Requirement**: MANDATORY
- **Validation**: Contains evidence capabilities
- **Required Capabilities**:
  - Preserve immutable evidence
  - Session memory rotation
  - Audit trail via PR-only writes
- **Severity if Missing**: HIGH - Cannot maintain evidence

### 3.3 Security Capabilities

- **Requirement**: MANDATORY
- **Validation**: Contains security capabilities
- **Required Capabilities**:
  - Enforce protected-file approvals
  - Degraded-mode escalation
  - Token rotation adherence
- **Severity if Missing**: HIGH - Cannot enforce security

### 3.4 Validation Capabilities

- **Requirement**: MANDATORY
- **Validation**: Contains validation capabilities
- **Required Capabilities**:
  - Syntax/cross-reference/inventory validation
  - Script testing with dry-run
  - Gap analysis execution
  - Ambiguity escalation
- **Severity if Missing**: HIGH - Cannot validate governance

---

## SECTION 4: PROHIBITIONS

### 4.1 Core Prohibitions

- **Requirement**: MANDATORY
- **Validation**: All core prohibitions listed
- **Required Prohibitions**:
  - No canon semantic changes without CS2 approval and ripple
  - No bypass of merge gate interface
  - No bypass of protected file detection
  - No governance interpretation beyond authority; escalate ambiguities
  - No skipping wake-up or session closure protocols
  - No evidence mutation in-place; create new artifacts
  - No edits to this agent contract except via CS2-approved issue
- **Severity if Missing**: BLOCKER - Agent may violate governance

---

## SECTION 5: VALIDATION REQUIREMENTS

### 5.1 File Size Validation

- **Requirement**: MANDATORY (BLOCKING)
- **Validation**: Character count MUST be < 30,000
- **Enforcement**: Pre-PR creation validation
- **Test Command**: `wc -m < .github/agents/governance-repo-administrator-v2.agent.md`
- **Severity if Exceeded**: BLOCKER - Violates GitHub UI selectability

### 5.2 Version Consistency

- **Requirement**: MANDATORY
- **Validation**: All version references MUST be v6.2.0
- **Check Locations**:
  - YAML frontmatter: `agent.version: 6.2.0`
  - Session memory template: `Living Agent System v6.2.0`
  - Mission header: `Living Agent System v6.2.0`
- **Severity if Inconsistent**: HIGH - Version regression detected

### 5.3 CANON_INVENTORY Alignment

- **Requirement**: MANDATORY
- **Validation**: References correct CANON_INVENTORY path
- **Required Path**: `governance/CANON_INVENTORY.json`
- **Degraded Mode**: Escalate and block merge on placeholder/truncated PUBLIC_API hashes
- **Severity if Missing**: BLOCKER - Cannot validate governance alignment

---

## VALIDATION SUMMARY

**Total Required Items**: 56 requirements + Governance-specific capabilities + Prohibitions

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
