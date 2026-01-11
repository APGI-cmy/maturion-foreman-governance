# EXECUTION BOOTSTRAP PROTOCOL LAYER-DOWN INSTRUCTIONS
## For FM Application Repositories

**Date**: 2026-01-11  
**From**: Governance Administrator  
**To**: Governance Liaison (All FM Application Repositories)  
**Priority**: HIGH  
**Action Required**: Layer down Execution Bootstrap Protocol to FM repositories

---

## 1. Purpose

This handover instructs Governance Liaisons to layer down the **Execution Bootstrap Protocol** and updated **Prehandover Verification Requirements** from the governance repository to all FM application repositories.

**Canonical Sources:**
- `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md` (v1.0.0, 2026-01-11)
- `governance/canon/GOVERNANCE_LIAISON_TRAINING_PROTOCOL.md` (v1.0.0, 2026-01-11)
- `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`
- `governance/canon/GOVERNANCE_LIAISON_MINIMUM_APPOINTMENT_REQUIREMENTS.md` (v1.1, 2026-01-11)
- `governance/canon/CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md` (v1.1.0, 2026-01-11)

---

## 2. Context

The governance canon has been updated to establish **mandatory execution verification** at every phase of repository work, particularly for:
- Directory structure creation
- Workflow installation and updates
- Agent contract deployment and modifications
- Gate implementation and changes
- Configuration changes affecting CI

**Key Principle:** CI confirms success, does not discover failures. All agents must validate execution locally before handover.

---

## 3. Scope of Layer-Down

### 3.1 Repositories Affected

This layer-down applies to ALL FM application repositories:
- ✅ foreman-office-app
- ✅ partpulse (if governance-enforced)
- ✅ slotmaster (if governance-enforced)
- ✅ Future FM application repositories

### 3.2 Agent Contracts Affected

The following agent contracts MUST be updated:
1. **ForemanApp-agent.md** (FM contract) — Add prehandover verification obligations
2. **All builder agents** (*-builder.md) — Add prehandover verification obligations
3. **Governance Liaison agent** (if exists) — Update with new training requirements

---

## 4. Layer-Down Tasks

### Task 1: Update Governance Liaison Agent Contract

**File**: `.github/agents/governance-liaison.agent.md` (if exists)

**Required Updates:**

#### 1.1 Add Execution Verification Obligations

Find the section describing liaison execution responsibilities and add:

```markdown
### Execution Verification Requirements (MANDATORY)

Before declaring ANY governance layer-down or coupling work complete, Governance Liaison MUST:

1. **Follow 7-Step Execution Bootstrap Protocol**
   - Step 1: Document requirements clearly
   - Step 2: Create actual artifacts (not just documentation)
   - Step 3: Execute/verify locally
   - Step 4: Capture output with exit codes
   - Step 5: Validate preflight (enumerate and check all gates)
   - Step 6: Attach PREHANDOVER_PROOF to PR
   - Step 7: Declare complete ONLY after local execution GREEN

2. **Attach PREHANDOVER_PROOF to PRs**
   - Template: `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`
   - Required sections: Artifacts, Execution, Gates, Timestamp, Guarantee
   - All exit codes must be 0 (success)
   - All applicable gates must be PASS or SKIP (not FAIL or UNKNOWN)

3. **Validate All Gates in Preflight**
   - Enumerate gates by checking `.github/workflows/*.yml` triggers
   - Test each applicable gate locally or document skip reason
   - Never hand over with unknown gate status

4. **CI is Confirmatory, NOT Diagnostic**
   - CI confirms preflight success
   - CI does not discover failures
   - All failures must be caught in preflight validation

**Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`  
**Training**: `governance/canon/GOVERNANCE_LIAISON_TRAINING_PROTOCOL.md`  
**Template**: `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`
```

#### 1.2 Add Prohibited Activities

Find or create prohibited activities section and add:

```markdown
### Prohibited Activities (Governance Liaison)

Governance Liaison MUST NOT:
- ❌ Hand over PRs without PREHANDOVER_PROOF when execution verification required
- ❌ Rely on CI to discover execution failures
- ❌ Skip execution verification for "simple" changes
- ❌ Claim completion based only on documentation
- ❌ Bypass prehandover proof requirement
- ❌ Attach placeholder prehandover proof ("will validate later")
- ❌ Declare complete with unknown gate status

**Violation Response**: Reviewer rejects PR, requests PREHANDOVER_PROOF completion.
```

---

### Task 2: Update ForemanApp Agent Contract

**File**: `.github/agents/ForemanApp-agent.md`

**Required Updates:**

#### 2.1 Add Prehandover Verification Expectations for Builders

Find the section describing FM's builder supervision responsibilities and add:

```markdown
### Builder Prehandover Verification Supervision (MANDATORY)

When supervising builders, FM MUST verify builders follow Execution Bootstrap Protocol:

**Before Accepting Builder Handover:**
1. **Check for PREHANDOVER_PROOF** in builder PR description
   - If missing and execution verification required: REJECT handover
   - Reference EXECUTION_BOOTSTRAP_PROTOCOL.md Section 5.2

2. **Validate PREHANDOVER_PROOF Completeness**
   - All sections present (Artifacts, Execution, Gates, Timestamp, Guarantee)
   - All exit codes are 0 (success)
   - All applicable gates enumerated and checked
   - No placeholders or "[FILL IN]" markers

3. **Validate Gate Enumeration**
   - Check builder enumerated all gates triggered by PR changes
   - Compare with FM's independent gate list
   - Verify no gates missing

4. **Accept or Reject Handover**
   - ✅ ACCEPT if PREHANDOVER_PROOF complete and verified
   - ❌ REJECT if PREHANDOVER_PROOF missing, incomplete, or invalid
   - 🚨 ESCALATE if pattern of violations detected

**Builder Training**: FM MUST ensure all builders trained on Execution Bootstrap Protocol before assignment.

**Reference**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md` Section 5  
**Training Reference**: `governance/canon/GOVERNANCE_LIAISON_TRAINING_PROTOCOL.md` Section 6
```

#### 2.2 Add Prehandover Verification for FM's Own PRs

Find the section describing FM's PR creation responsibilities and add:

```markdown
### FM Prehandover Verification Obligations (MANDATORY)

When FM creates PRs involving executable artifacts, FM MUST:

1. **Follow Execution Bootstrap Protocol** for:
   - Architecture artifact updates affecting CI/gates
   - Build tree modifications affecting execution paths
   - QA gate configuration changes
   - Any FM-authored workflows or scripts

2. **Attach PREHANDOVER_PROOF** to FM PRs when:
   - Changes affect CI workflows
   - Changes affect gate configurations
   - Changes create new executable artifacts
   - Changes modify build execution paths

3. **Validate Preflight** for all FM PRs:
   - Enumerate applicable gates
   - Test each gate locally or document skip reason
   - Capture execution evidence

**Template**: `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`  
**Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`
```

---

### Task 3: Update Builder Agent Contracts

**Files**: `.github/agents/*-builder.md` (all builder contracts)

**Required Updates:**

#### 3.1 Add Prehandover Verification Section to ALL Builder Contracts

Add a new section to EVERY builder agent contract:

```markdown
## Prehandover Verification Obligations (MANDATORY)

Before declaring work complete and handing over to FM, this builder MUST:

### 7-Step Execution Bootstrap Protocol

1. **Document Requirements** — List what must be created/changed
2. **Create Actual Artifacts** — Actually create (not just document intent)
3. **Execute/Verify Locally** — Run tests, validate, check execution
4. **Capture Output** — Save terminal output with exit codes (must be 0)
5. **Validate Preflight** — Enumerate and check all applicable gates
6. **Attach PREHANDOVER_PROOF** — Include in PR description (use template)
7. **Declare Complete** — ONLY after local execution GREEN

### PREHANDOVER_PROOF Requirements

Every PR from this builder involving executable artifacts MUST include:

**In PR Description:**
```markdown
## PREHANDOVER_PROOF

### Artifacts Created
[List with verification commands]

### Execution Validation
[Commands run with outputs and exit codes]

### Preflight Gate Status
[All gates enumerated with PASS/SKIP status]

### Execution Timestamp
[Date, time, environment]

### Handover Guarantee
[Explicit guarantee that CI will confirm, not discover]
```

**Template**: `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`

### When Execution Verification is MANDATORY

MUST apply to:
- ✅ All feature implementation with tests
- ✅ All build script modifications
- ✅ All CI/workflow changes
- ✅ All gate configuration changes
- ✅ All dependency updates
- ✅ Any change that can fail in CI

### When Execution Verification is OPTIONAL

MAY apply to (recommended but not mandatory):
- Documentation-only changes (pure markdown)
- Comment-only changes
- Whitespace-only changes

**When Uncertain**: Include PREHANDOVER_PROOF.

### Prohibited Actions

This builder MUST NOT:
- ❌ Hand over PRs without PREHANDOVER_PROOF when required
- ❌ Rely on CI to discover failures
- ❌ Skip execution verification for "simple" changes
- ❌ Claim "I tested it" without captured evidence
- ❌ Bypass prehandover proof requirement

**Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`  
**Training**: `governance/canon/GOVERNANCE_LIAISON_TRAINING_PROTOCOL.md`
```

---

### Task 4: Create Training Evidence Directory Structure

**Location**: Repository root

**Required Directories:**
```
/governance/
  /training/
    /execution-bootstrap/    (stores training completion evidence)
```

**Action**:
1. Create directory structure
2. Create `README.md` in `/governance/training/execution-bootstrap/` with:
   ```markdown
   # Execution Bootstrap Protocol Training Evidence
   
   This directory stores evidence of agent training completion for Execution Bootstrap Protocol.
   
   **Training Authority**: `governance/canon/GOVERNANCE_LIAISON_TRAINING_PROTOCOL.md`
   **Protocol Authority**: `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md`
   
   ## Training Completion Evidence
   
   When agents complete training, record here:
   - Agent name/ID
   - Training date
   - Training version
   - Certification authority (FM or Governance Administrator)
   
   ## Format
   
   Each agent training completion documented in separate file: `AGENT_NAME_training_YYYY-MM-DD.md`
   ```
3. Add `.gitkeep` to ensure directory tracked
4. Commit with message: "Initialize Execution Bootstrap Protocol training infrastructure"

---

### Task 5: Update Repository Documentation

**Files**: Local repository README or governance documentation

**Recommended Updates**:

1. **Add Reference to Execution Bootstrap Protocol**
   - Link to canonical protocol in governance repo
   - Note that ALL agents must follow protocol
   - Reference PREHANDOVER_PROOF template

2. **Update Developer Onboarding**
   - Include Execution Bootstrap Protocol in onboarding checklist
   - Require PREHANDOVER_PROOF training before PR creation
   - Link to training protocol

3. **Update PR Template** (if exists)
   - Add PREHANDOVER_PROOF section to PR template
   - Add checklist item: "Attached PREHANDOVER_PROOF (if required)"

---

## 5. Acceptance Criteria

Layer-down is complete when:

- ✅ Governance Liaison agent contract updated with execution verification obligations (Task 1)
- ✅ ForemanApp-agent.md updated with prehandover verification supervision (Task 2)
- ✅ ALL builder agent contracts updated with prehandover verification obligations (Task 3)
- ✅ Training evidence directory structure created (Task 4)
- ✅ Repository documentation updated with protocol references (Task 5)
- ✅ All changes committed to repository
- ✅ **PREHANDOVER_PROOF attached to layer-down PR** (demonstrating protocol compliance)
- ✅ Layer-down completion report generated

---

## 6. Timeline

**Target Completion**: Within 2 weeks of receiving this handover

**Priority Sequence**:
1. Task 3 (builder contracts) — HIGHEST PRIORITY
2. Task 2 (FM contract) — HIGH PRIORITY
3. Task 1 (governance liaison contract) — HIGH PRIORITY
4. Task 4 (training infrastructure) — MEDIUM PRIORITY
5. Task 5 (documentation) — LOWEST PRIORITY

---

## 7. Validation

After completion, Governance Liaison MUST:

### 7.1 Self-Validation Checklist

- [ ] All agent contracts include execution verification obligations
- [ ] All contracts reference EXECUTION_BOOTSTRAP_PROTOCOL.md
- [ ] All contracts reference PREHANDOVER_PROOF_TEMPLATE.md
- [ ] Training infrastructure created
- [ ] Documentation updated with protocol references

### 7.2 Generate Layer-Down Completion Report

Create `governance/evidence/layerdown/EXECUTION_BOOTSTRAP_PROTOCOL_LAYERDOWN_COMPLETE.md`:

```markdown
# Execution Bootstrap Protocol Layer-Down Completion Report

**Date**: [YYYY-MM-DD]  
**Governance Liaison**: [Agent name]  
**Repository**: [Repository name]

## Summary

Execution Bootstrap Protocol successfully layered down to [repository name].

## Artifacts Updated

1. **Governance Liaison Contract**: `.github/agents/governance-liaison.agent.md`
   - Added execution verification obligations
   - Added prohibited activities

2. **FM Contract**: `.github/agents/ForemanApp-agent.md`
   - Added builder prehandover verification supervision
   - Added FM prehandover verification obligations

3. **Builder Contracts**: [List all updated builder contracts]
   - Added prehandover verification section to each

4. **Training Infrastructure**: `governance/training/execution-bootstrap/`
   - Created directory structure
   - Created README.md

5. **Documentation**: [List updated documentation files]

## Validation Evidence

[Include validation commands/outputs showing contracts updated]

## Preflight Gate Status

[Enumerate gates, validate all pass]

## Governance Version

- Previous governance version: [version]
- New governance version: [version]
- EXECUTION_BOOTSTRAP_PROTOCOL.md version: v1.0.0
- GOVERNANCE_LIAISON_TRAINING_PROTOCOL.md version: v1.0.0

## Completion Declaration

✅ All tasks complete
✅ All agent contracts updated
✅ Training infrastructure created
✅ PREHANDOVER_PROOF attached to layer-down PR
✅ CI will confirm success (not discover failures)
```

### 7.3 Notify Governance Administrator

After layer-down complete:
1. Generate completion report (above)
2. Attach PREHANDOVER_PROOF to layer-down PR
3. Tag Governance Administrator in PR for review
4. Provide evidence (commit SHAs, file paths)

---

## 8. Support and Questions

**For Questions About:**
- **Protocol Intent**: Contact Governance Administrator (maturion-foreman-governance repository)
- **Agent Contract Language**: Use templates provided in this document
- **PREHANDOVER_PROOF Template Usage**: Reference `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md`
- **Implementation Issues**: Escalate to Governance Administrator

**For Blockers:**
- Escalate immediately to Governance Administrator
- Do not proceed with partial layer-down
- Do not modify governance canon language (use as-is)

---

## 9. References

**Governance Canon**:
- `governance/canon/EXECUTION_BOOTSTRAP_PROTOCOL.md` (v1.0.0) — Comprehensive protocol
- `governance/canon/GOVERNANCE_LIAISON_TRAINING_PROTOCOL.md` (v1.0.0) — Training standard
- `governance/canon/GOVERNANCE_LIAISON_MINIMUM_APPOINTMENT_REQUIREMENTS.md` (v1.1) — Liaison obligations
- `governance/canon/CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md` (v1.1.0) — Layer-down process
- `governance/canon/CI_CONFIRMATORY_NOT_DIAGNOSTIC.md` — Preflight obligation foundation

**Templates**:
- `governance/templates/PREHANDOVER_PROOF_TEMPLATE.md` — PREHANDOVER_PROOF template

**Related**:
- `governance/canon/FPC_REPOSITORY_LAYERDOWN_GUIDE.md` — Repository initialization guide
- `governance/canon/AGENT_RECRUITMENT.md` — Agent appointment
- `governance/canon/PR_GATE_EVALUATION_AND_ROLE_PROTOCOL.md` — Gate evaluation

---

**Document Authority**: Governance Administrator  
**Approval**: Governance Administrator  
**Effective Date**: 2026-01-11  
**Action Required**: Layer-down to FM repositories per tasks above

---

*End of Execution Bootstrap Protocol Layer-Down Instructions for FM Application Repositories*
