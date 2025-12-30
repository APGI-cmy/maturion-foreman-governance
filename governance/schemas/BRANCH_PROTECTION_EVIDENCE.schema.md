# BRANCH PROTECTION EVIDENCE SCHEMA

## Status
**Type**: Normative Schema Definition  
**Authority**: Canonical  
**Schema ID**: SCHEMA-BRANCH-PROTECTION-EVIDENCE-01  
**Version**: 1.0.0  
**Effective Date**: 2025-12-30  
**Owner**: Governance Administrator  
**Canonical Reference**: governance/canon/BRANCH_PROTECTION_ENFORCEMENT.md

---

## 1. Purpose

This schema defines the **normative structure** for branch protection verification evidence artifacts.

Evidence artifacts conforming to this schema provide:
- Programmatic verification of branch protection enforcement
- Immutable audit trail of enforcement status
- Traceability for Platform Readiness validation
- Evidence for governance compliance

**Conformance**: All branch protection evidence artifacts MUST conform to this schema.

---

## 2. Schema Definition

### 2.1 Root Structure

```yaml
# Branch Protection Evidence
# Schema Version: 1.0.0

evidence_type: "branch_protection_verification"
evidence_id: string              # Unique identifier (format: BPEV-YYYY-NNNN)
schema_version: "1.0.0"          # This schema version

verification:
  verification_id: string         # Unique verification instance ID
  timestamp: string               # ISO 8601 timestamp
  repository: object              # Repository identification
  branch: string                  # Branch name verified
  verification_method: string     # Method/API used for verification
  
protection_rules:
  # Complete snapshot of protection rules
  require_pull_request: boolean
  require_approvals: number
  require_code_owner_review: boolean
  dismiss_stale_approvals: boolean
  require_status_checks: boolean
  require_branches_up_to_date: boolean
  required_status_checks: array[string]
  enforce_admins: boolean
  allow_bypass: boolean
  allow_force_push: boolean
  allow_deletions: boolean
  restrictions: object | null
  
enforcement_status:
  status: enum                    # ACTIVE | INACTIVE | DEGRADED
  determination_reason: string    # Why this status was determined
  critical_issues: array[string]  # Issues preventing ACTIVE status
  warnings: array[string]         # Non-critical issues
  
validator:
  fm_identity: string             # FM instance requesting verification
  maturion_identity: string       # Maturion instance executing verification
  delegation_instruction_id: string # Instruction ID from FM
  
evidence_integrity:
  api_response_hash: string       # Hash of raw API response
  evidence_hash: string           # Hash of this evidence artifact
  signature: string | null        # Digital signature (future)

audit_context:
  purpose: string                 # Why verification performed
  related_evidence: array[string] # Related evidence artifacts
  platform_readiness_reference: string | null # If part of readiness check
```

---

## 3. Field Specifications

### 3.1 Evidence Metadata

#### `evidence_type`
- **Type**: String (constant)
- **Required**: YES
- **Value**: Must be `"branch_protection_verification"`
- **Purpose**: Identifies evidence artifact type

#### `evidence_id`
- **Type**: String
- **Required**: YES
- **Format**: `BPEV-YYYY-NNNN` where YYYY = year, NNNN = sequential number
- **Example**: `BPEV-2025-0001`
- **Uniqueness**: Must be globally unique across all evidence artifacts
- **Purpose**: Immutable identifier for this evidence instance

#### `schema_version`
- **Type**: String (semver)
- **Required**: YES
- **Value**: `"1.0.0"` for this version
- **Purpose**: Schema version for compatibility validation

---

### 3.2 Verification Metadata

#### `verification.verification_id`
- **Type**: String
- **Required**: YES
- **Format**: UUID v4 or equivalent
- **Example**: `"a7f3c4d2-8b91-4e5a-9f2d-6c8b3e1a4d7f"`
- **Purpose**: Unique identifier for this verification execution

#### `verification.timestamp`
- **Type**: String (ISO 8601)
- **Required**: YES
- **Format**: `YYYY-MM-DDTHH:MM:SSZ`
- **Example**: `"2025-12-30T15:30:00Z"`
- **Purpose**: When verification was performed

#### `verification.repository`
- **Type**: Object
- **Required**: YES
- **Structure**:
  ```yaml
  repository:
    owner: string        # GitHub owner/organization
    name: string         # Repository name
    full_name: string    # owner/name format
    url: string          # GitHub repository URL
  ```
- **Example**:
  ```yaml
  repository:
    owner: "MaturionISMS"
    name: "maturion-foreman-governance"
    full_name: "MaturionISMS/maturion-foreman-governance"
    url: "https://github.com/MaturionISMS/maturion-foreman-governance"
  ```

#### `verification.branch`
- **Type**: String
- **Required**: YES
- **Example**: `"main"`
- **Purpose**: Branch name that was verified

#### `verification.verification_method`
- **Type**: String
- **Required**: YES
- **Format**: Descriptive method identifier
- **Example**: `"github_api_v3_branch_protection_GET_/repos/{owner}/{repo}/branches/{branch}/protection"`
- **Purpose**: Documents how verification was performed (auditability)

---

### 3.3 Protection Rules Snapshot

#### `protection_rules.require_pull_request`
- **Type**: Boolean
- **Required**: YES
- **Purpose**: Whether PR is required before merge

#### `protection_rules.require_approvals`
- **Type**: Number
- **Required**: YES
- **Range**: 0-6
- **Purpose**: Number of required approvals

#### `protection_rules.require_code_owner_review`
- **Type**: Boolean
- **Required**: YES
- **Purpose**: Whether CODEOWNERS approval required

#### `protection_rules.dismiss_stale_approvals`
- **Type**: Boolean
- **Required**: YES
- **Purpose**: Whether approvals dismissed on new commits

#### `protection_rules.require_status_checks`
- **Type**: Boolean
- **Required**: YES
- **Purpose**: Whether status checks required

#### `protection_rules.require_branches_up_to_date`
- **Type**: Boolean
- **Required**: YES
- **Purpose**: Whether branch must be up-to-date before merge

#### `protection_rules.required_status_checks`
- **Type**: Array of strings
- **Required**: YES (can be empty array)
- **Example**: `["qiel-enforcement", "qic-validation", "governance-validation"]`
- **Purpose**: List of required status check names

#### `protection_rules.enforce_admins`
- **Type**: Boolean
- **Required**: YES
- **Purpose**: Whether admins are subject to protection rules

#### `protection_rules.allow_bypass`
- **Type**: Boolean
- **Required**: YES
- **Purpose**: Whether bypassing protections is allowed
- **Note**: Should be `false` for constitutional compliance

#### `protection_rules.allow_force_push`
- **Type**: Boolean
- **Required**: YES
- **Purpose**: Whether force pushes allowed

#### `protection_rules.allow_deletions`
- **Type**: Boolean
- **Required**: YES
- **Purpose**: Whether branch deletion allowed

#### `protection_rules.restrictions`
- **Type**: Object or null
- **Required**: YES
- **Structure** (if not null):
  ```yaml
  restrictions:
    users: array[string]
    teams: array[string]
    apps: array[string]
  ```
- **Purpose**: Who can push to protected branch

---

### 3.4 Enforcement Status

#### `enforcement_status.status`
- **Type**: Enum
- **Required**: YES
- **Values**: 
  - `"ACTIVE"` - All required rules present, enforcement valid
  - `"INACTIVE"` - Protection not configured or critically incomplete
  - `"DEGRADED"` - Partial protection, non-critical issues present
- **Purpose**: Overall enforcement status determination

#### `enforcement_status.determination_reason`
- **Type**: String
- **Required**: YES
- **Example**: `"All required protection rules present and correctly configured"`
- **Purpose**: Human-readable reason for status determination

#### `enforcement_status.critical_issues`
- **Type**: Array of strings
- **Required**: YES (can be empty)
- **Example**: `["allow_bypass is true", "require_status_checks is false"]`
- **Purpose**: Issues that prevent ACTIVE status

#### `enforcement_status.warnings`
- **Type**: Array of strings
- **Required**: YES (can be empty)
- **Example**: `["enforce_admins is false (admins can bypass)"]`
- **Purpose**: Non-critical issues that don't prevent ACTIVE status

---

### 3.5 Validator Identity

#### `validator.fm_identity`
- **Type**: String
- **Required**: YES
- **Example**: `"foreman-v1.2.0-instance-github-copilot"`
- **Purpose**: Identifies FM instance requesting verification

#### `validator.maturion_identity`
- **Type**: String
- **Required**: YES
- **Example**: `"maturion-control-plane-v0.1.0"` or `"manual-verification-johan-ras"`
- **Purpose**: Identifies entity performing verification

#### `validator.delegation_instruction_id`
- **Type**: String
- **Required**: YES
- **Format**: Delegation instruction ID from FM
- **Example**: `"DAI-2025-0123"`
- **Purpose**: Links verification to delegation instruction (audit trail)

---

### 3.6 Evidence Integrity

#### `evidence_integrity.api_response_hash`
- **Type**: String
- **Required**: YES
- **Format**: SHA-256 hash (hexadecimal)
- **Example**: `"a7f3c4d28b914e5a9f2d6c8b3e1a4d7f..."`
- **Purpose**: Tamper detection for raw API response

#### `evidence_integrity.evidence_hash`
- **Type**: String
- **Required**: YES
- **Format**: SHA-256 hash of this evidence artifact (excluding this field)
- **Example**: `"b8e4d5f39c825f6b0e3e7d9c4f2b5e8g..."`
- **Purpose**: Tamper detection for evidence artifact

#### `evidence_integrity.signature`
- **Type**: String or null
- **Required**: NO (future enhancement)
- **Format**: Digital signature (algorithm TBD)
- **Purpose**: Cryptographic proof of evidence authenticity

---

### 3.7 Audit Context

#### `audit_context.purpose`
- **Type**: String
- **Required**: YES
- **Example**: `"platform_readiness_validation"`, `"periodic_audit"`, `"post_incident_verification"`
- **Purpose**: Why verification was performed

#### `audit_context.related_evidence`
- **Type**: Array of strings
- **Required**: YES (can be empty)
- **Example**: `["PLATFORM_READINESS_EVIDENCE_2025-12-30.md"]`
- **Purpose**: Links to related evidence artifacts

#### `audit_context.platform_readiness_reference`
- **Type**: String or null
- **Required**: NO
- **Example**: `"governance/evidence/PLATFORM_READINESS_EVIDENCE_2025-12-30.md"`
- **Purpose**: If part of Platform Readiness check, reference that evidence

---

## 4. Validation Rules

### 4.1 Required Field Validation

All fields marked **Required: YES** MUST be present.

Missing required fields → Evidence artifact is INVALID.

---

### 4.2 Status Determination Logic

**Status MUST be determined as follows**:

```
IF protection_rules.allow_bypass == true
   AND no emergency authorization documented:
    THEN status = INACTIVE
    AND critical_issues += "bypass allowed without authorization"

IF protection_rules.require_pull_request == false:
    THEN status = INACTIVE
    AND critical_issues += "pull request not required"

IF protection_rules.require_status_checks == false:
    THEN status = INACTIVE
    AND critical_issues += "status checks not required"

IF protection_rules.required_status_checks.length == 0:
    THEN status = DEGRADED
    AND warnings += "no required status checks configured"

IF protection_rules.enforce_admins == false:
    THEN warnings += "administrators can bypass protections"

IF critical_issues.length > 0:
    THEN status = INACTIVE

IF critical_issues.length == 0
   AND warnings.length > 0:
    THEN status = DEGRADED

IF critical_issues.length == 0
   AND warnings.length == 0:
    THEN status = ACTIVE
```

---

### 4.3 Timestamp Recency

For Platform Readiness validation:
- Verification timestamp MUST be within 7 days of readiness declaration
- Older evidence requires re-verification
- Stale evidence invalidates Platform Readiness GREEN status

---

### 4.4 Hash Integrity

- `api_response_hash` MUST match SHA-256 of raw API response
- `evidence_hash` MUST match SHA-256 of evidence artifact (excluding signature field)
- Hash mismatch → Evidence integrity compromised → INVALID

---

## 5. Evidence Artifact Lifecycle

### 5.1 Creation
- **Trigger**: FM delegation to Maturion for verification
- **Creator**: Maturion (or authorized human proxy during bootstrap)
- **Location**: `governance/evidence/branch-protection/BRANCH_PROTECTION_EVIDENCE_<date>.md`
- **Format**: YAML frontmatter + markdown body (optional human-readable summary)

### 5.2 Validation
- **Validator**: Governance Administrator (automated QA script)
- **Validation**: Schema conformance, required fields, hash integrity
- **Outcome**: VALID or INVALID determination

### 5.3 Usage
- **Consumers**: FM (Platform Readiness validation), Governance Administrator (audit), Human Authority (review)
- **Reference**: Platform Readiness Evidence MUST reference latest valid evidence

### 5.4 Retention
- **Duration**: Permanent (lifetime of repository)
- **Storage**: Immutable governance memory
- **Access**: Read-only to all agents, write-only to Maturion

---

## 6. Example Evidence Artifact

```yaml
---
# Branch Protection Evidence
# Schema Version: 1.0.0

evidence_type: "branch_protection_verification"
evidence_id: "BPEV-2025-0001"
schema_version: "1.0.0"

verification:
  verification_id: "a7f3c4d2-8b91-4e5a-9f2d-6c8b3e1a4d7f"
  timestamp: "2025-12-30T15:30:00Z"
  repository:
    owner: "MaturionISMS"
    name: "maturion-foreman-governance"
    full_name: "MaturionISMS/maturion-foreman-governance"
    url: "https://github.com/MaturionISMS/maturion-foreman-governance"
  branch: "main"
  verification_method: "github_api_v3_branch_protection_GET_/repos/{owner}/{repo}/branches/{branch}/protection"
  
protection_rules:
  require_pull_request: true
  require_approvals: 1
  require_code_owner_review: true
  dismiss_stale_approvals: true
  require_status_checks: true
  require_branches_up_to_date: true
  required_status_checks:
    - "qiel-enforcement"
    - "qic-validation"
    - "governance-validation"
  enforce_admins: false
  allow_bypass: false
  allow_force_push: false
  allow_deletions: false
  restrictions: null
  
enforcement_status:
  status: "ACTIVE"
  determination_reason: "All required protection rules present and correctly configured. Non-bypass enforcement enabled."
  critical_issues: []
  warnings:
    - "enforce_admins is false (administrators can bypass in emergencies)"
  
validator:
  fm_identity: "governance-administrator-copilot"
  maturion_identity: "manual-verification-copilot-bootstrap-phase"
  delegation_instruction_id: "DAI-2025-0001"
  
evidence_integrity:
  api_response_hash: "a7f3c4d28b914e5a9f2d6c8b3e1a4d7f9e0c1a2b3d4e5f6a7b8c9d0e1f2a3b4c"
  evidence_hash: "b8e4d5f39c825f6b0e3e7d9c4f2b5e8g0f1h2i3j4k5l6m7n8o9p0q1r2s3t4u5v"
  signature: null

audit_context:
  purpose: "platform_readiness_validation"
  related_evidence:
    - "governance/evidence/PLATFORM_READINESS_EVIDENCE_2025-12-30.md"
  platform_readiness_reference: "governance/evidence/PLATFORM_READINESS_EVIDENCE_2025-12-30.md"
---

# Branch Protection Verification Evidence

## Summary

Branch protection for the `main` branch in repository `MaturionISMS/maturion-foreman-governance` was verified on **2025-12-30 at 15:30:00 UTC**.

**Enforcement Status**: ✅ **ACTIVE**

All required protection rules are present and correctly configured. Branch protection enforcement is valid and constitutional.

## Verification Method

Verification performed via GitHub REST API v3 endpoint:
```
GET /repos/MaturionISMS/maturion-foreman-governance/branches/main/protection
```

## Protection Rules Snapshot

- ✅ Pull request required before merge
- ✅ 1 approval required
- ✅ Code owner review required
- ✅ Stale approvals dismissed on new commits
- ✅ Status checks required before merge
- ✅ Branches must be up-to-date before merge
- ✅ 3 required status checks configured: qiel-enforcement, qic-validation, governance-validation
- ⚠️ Administrator enforcement: Administrators CAN bypass (for emergency access)
- ✅ Bypass protection: NOT allowed
- ✅ Force push: NOT allowed
- ✅ Branch deletion: NOT allowed

## Warnings (Non-Critical)

- `enforce_admins is false`: Administrators have bypass capability for emergency situations. This is acceptable per constitutional emergency override model.

## Next Verification Due

**2026-01-06** (7 days from verification)

---

**Evidence Artifact Status**: ✅ VALID  
**Schema Conformance**: ✅ CONFORMANT  
**Hash Integrity**: ✅ VERIFIED
```

---

## 7. Schema Evolution

### 7.1 Version History

**Version 1.0.0** (2025-12-30):
- Initial schema release
- Supports GitHub branch protection verification
- Basic integrity validation (hashes)
- Platform Readiness integration

### 7.2 Future Enhancements

**Version 1.1.0** (Planned):
- Add cryptographic signature field
- Add multi-platform support (GitLab, Bitbucket)
- Add automated drift detection results
- Add continuous monitoring integration

**Version 2.0.0** (Future):
- Add declarative configuration comparison
- Add configuration-as-code validation
- Add cross-repository aggregation
- Add predictive analysis results

### 7.3 Backward Compatibility

- Schema version MUST be included in all evidence artifacts
- Validators MUST check schema version before validation
- Breaking changes MUST increment major version
- Parsers MUST support previous major version (1 version back)

---

## 8. Related Schemas

- **DELEGATED_ACTION_INSTRUCTION.schema.md** - Instruction format for verification delegation
- **DELEGATED_ACTION_RESPONSE.schema.md** - Response format from Maturion
- **PLATFORM_READINESS_EVIDENCE.schema.md** - Platform Readiness evidence (references this schema)
- **EVIDENCE_ARTIFACT_METADATA.schema.md** - Common metadata fields (if defined)

---

## 9. Compliance

### 9.1 Conformance Testing

Evidence artifacts MUST be validated using automated schema validator:
```bash
# Governance QA script
./scripts/validate-evidence.sh governance/evidence/branch-protection/BRANCH_PROTECTION_EVIDENCE_*.md
```

### 9.2 Non-Conformant Evidence

Non-conformant evidence artifacts are **INVALID** and MUST NOT be used for:
- Platform Readiness validation
- Governance compliance reporting
- Audit trail evidence

Non-conformance MUST trigger:
- Evidence regeneration
- Root cause analysis
- Schema validation fix

---

**End of BRANCH PROTECTION EVIDENCE SCHEMA**

---

**Document Metadata**:
- Schema ID: SCHEMA-BRANCH-PROTECTION-EVIDENCE-01
- Version: 1.0.0
- Authority: Normative Schema Definition
- Canonical Reference: governance/canon/BRANCH_PROTECTION_ENFORCEMENT.md
- Validation: Automated schema conformance checking required
