# Layer-Down Ripple Log: BL-031 Canonization

**Ripple ID**: ripple-bl-031-canonization-20260217  
**Trigger**: BL-031 canonization - Agent discovery protocol and pre-wave checks  
**Date**: 2026-02-17  
**Initiated By**: governance-repo-administrator  
**Ripple Type**: Layer-Down (Governance → Consumer Repos)

---

## Governance Changes Requiring Ripple

### New Protocols Created (PUBLIC_API Tier-0)

1. **FOREMAN_PRE_WAVE_AGENT_AVAILABILITY_CHECK.md** v1.0.0
   - Path: `governance/canon/FOREMAN_PRE_WAVE_AGENT_AVAILABILITY_CHECK.md`
   - SHA256: `13b3633cd90e520c9121315aee33f2ef4cf34bceddd308dc5d2716963436855f`
   - Type: PUBLIC_API
   - Impact: ALL Foreman agents must execute pre-wave agent availability check

2. **BUILDER_AGENT_YAML_FRONTMATTER_COMPLIANCE_SPEC.md** v1.0.0
   - Path: `governance/canon/BUILDER_AGENT_YAML_FRONTMATTER_COMPLIANCE_SPEC.md`
   - SHA256: `296e7a5acb55e6c41d1c895c7d6a0d8ce09553967055856af092754157dffd22`
   - Type: PUBLIC_API
   - Impact: ALL builder agent contracts must comply with YAML frontmatter spec

### Contract Updates

3. **foreman-v2.agent.md** - LOCKED Section Added
   - Section 3.0: Pre-Wave Authorization Gate — Agent Availability Check
   - Protection: AGENT_CONTRACT_PROTECTION_PROTOCOL.md
   - Impact: ALL Foreman agent contracts must include this LOCKED section

### Learning Updates

4. **BOOTSTRAP_EXECUTION_LEARNINGS.md** - BL-031 Status Updated
   - Status changed: "requires governance protocol creation" → "protocols created and enforced"
   - Prevention measures documented as completed

---

## Consumer Repositories Requiring Updates

### 1. APGI-cmy/maturion-isms

**Status**: ⏳ PENDING  
**Priority**: HIGH (Wave 5.5 source of BL-031 failure)  
**Issue Created**: TBD

**Required Updates**:
- [ ] Update Foreman agent contract with LOCKED section 3.0
- [ ] Audit all builder agent contracts (ui-builder, api-builder, qa-builder, etc.)
- [ ] Remove prohibited YAML fields from any builder contracts
- [ ] Validate YAML syntax with yamllint
- [ ] Test GitHub Copilot agent recognition for all builders
- [ ] Update wave planning templates to include pre-wave agent availability check
- [ ] Document agent availability verification in existing wave evidence

**Builder Agents to Audit**:
- ui-builder.md (known issue: had `assigned_waves` field - may already be fixed)
- api-builder.md
- qa-builder.md
- schema-builder.md (if exists)
- integration-builder.md (if exists)

**Evidence Required**:
- Screenshot of GitHub agent selection list showing all builders
- YAML validation results
- Compliance audit report

---

### 2. APGI-cmy/maturion-foreman-office-app

**Status**: ⏳ PENDING  
**Priority**: HIGH (Active Foreman + builder development)  
**Issue Created**: TBD

**Required Updates**:
- [ ] Update Foreman agent contract with LOCKED section 3.0
- [ ] Audit all builder agent contracts
- [ ] Remove prohibited YAML fields from any builder contracts
- [ ] Validate YAML syntax with yamllint
- [ ] Test GitHub Copilot agent recognition for all builders
- [ ] Update wave planning templates to include pre-wave agent availability check

**Builder Agents to Audit**:
- (List to be confirmed based on repo inspection)

**Evidence Required**:
- Screenshot of GitHub agent selection list showing all builders
- YAML validation results
- Compliance audit report

---

### 3. APGI-cmy/PartPulse

**Status**: ⏳ PENDING  
**Priority**: MEDIUM (May have Foreman/builders)  
**Issue Created**: TBD

**Required Updates**:
- [ ] Check if Foreman agent exists
- [ ] If yes: Update Foreman agent contract with LOCKED section 3.0
- [ ] If yes: Audit all builder agent contracts
- [ ] If no builders: Mark as N/A

**Builder Agents to Audit**:
- (List to be confirmed based on repo inspection)

---

### 4. APGI-cmy/R_Roster

**Status**: ⏳ PENDING  
**Priority**: MEDIUM (May have Foreman/builders)  
**Issue Created**: TBD

**Required Updates**:
- [ ] Check if Foreman agent exists
- [ ] If yes: Update Foreman agent contract with LOCKED section 3.0
- [ ] If yes: Audit all builder agent contracts
- [ ] If no builders: Mark as N/A

**Builder Agents to Audit**:
- (List to be confirmed based on repo inspection)

---

## Ripple Execution Plan

### Phase 1: Create Ripple Issues (CS2 or Governance Administrator)

For each consumer repository:

1. Create issue with template:

```markdown
Title: [RIPPLE][BL-031] Implement agent discovery protocol and pre-wave checks

## Summary
Layer-down ripple from governance canonization of BL-031 prevention measures.

## Context
- **Governance Change**: BL-031 canonization (agent discovery protocol)
- **Ripple ID**: ripple-bl-031-canonization-20260217
- **Trigger**: Wave 5.5 agent discovery failure (ui-builder not recognized)
- **New Protocols**: FOREMAN_PRE_WAVE_AGENT_AVAILABILITY_CHECK.md, BUILDER_AGENT_YAML_FRONTMATTER_COMPLIANCE_SPEC.md

## Required Actions

### 1. Update Foreman Agent Contract
- [ ] Add LOCKED section 3.0: Pre-Wave Authorization Gate — Agent Availability Check
- [ ] Copy from canonical governance: `.github/agents/foreman-v2.agent.md` lines 327-425
- [ ] Verify LOCKED section protection enabled

### 2. Audit Builder Agent Contracts
- [ ] List all builder agents in `.github/agents/`
- [ ] Check YAML frontmatter for prohibited fields:
  - ❌ `assigned_waves`
  - ❌ `wave_assignments`
  - ❌ `task_queue`
  - ❌ `custom_*` fields
- [ ] Validate YAML syntax: `yamllint .github/agents/*-builder*.agent.md`
- [ ] Test GitHub Copilot agent recognition

### 3. Remove Prohibited Fields (if found)
- [ ] Remove non-standard YAML fields
- [ ] Move data to appropriate location (wave planning artifacts, workspace)
- [ ] Validate agent recognition after fix

### 4. Evidence Generation
- [ ] Screenshot of GitHub agent selection list (all builders visible)
- [ ] YAML validation results (yamllint output)
- [ ] Compliance audit report

## References
- Canonical Governance: APGI-cmy/maturion-foreman-governance
- FOREMAN_PRE_WAVE_AGENT_AVAILABILITY_CHECK.md v1.0.0
- BUILDER_AGENT_YAML_FRONTMATTER_COMPLIANCE_SPEC.md v1.0.0
- BL-031: BOOTSTRAP_EXECUTION_LEARNINGS.md lines 3727-3857

## Acceptance Criteria
- [ ] Foreman agent contract includes LOCKED section 3.0
- [ ] All builder agents comply with YAML frontmatter spec
- [ ] All builders visible in GitHub Copilot agent list
- [ ] Evidence artifacts generated and documented
```

2. Assign to repository maintainer or Governance Liaison
3. Label as `governance-ripple`, `BL-031`, `agent-contracts`

### Phase 2: Track Ripple Completion

- [ ] maturion-isms: Issue #TBD → PR #TBD → Merged: YYYY-MM-DD
- [ ] maturion-foreman-office-app: Issue #TBD → PR #TBD → Merged: YYYY-MM-DD
- [ ] PartPulse: Issue #TBD (or N/A if no Foreman) → PR #TBD → Merged: YYYY-MM-DD
- [ ] R_Roster: Issue #TBD (or N/A if no Foreman) → PR #TBD → Merged: YYYY-MM-DD

### Phase 3: Ripple Completion Verification

After all consumer repos updated:
- [ ] Ecosystem-wide compliance audit performed
- [ ] All Foreman agents have pre-wave check
- [ ] All builder agents compliant with YAML spec
- [ ] All builders visible in GitHub agent lists
- [ ] Ripple completion documented in governance

---

## Timeline

**Created**: 2026-02-17  
**Target Completion**: 2026-02-24 (7 days)  
**Follow-Up Audit**: 2026-03-03 (14 days after creation)

---

## Escalation Path

If ripple completion blocked:
1. Repository-level blockers → Escalate to repository Governance Liaison
2. Cross-repo blockers → Escalate to Codex Advisor
3. Constitutional blockers → Escalate to CS2

---

## Success Criteria

**Ripple Complete When**:
- ✅ All consumer repos with Foreman agents updated
- ✅ All Foreman contracts include LOCKED pre-wave check
- ✅ All builder contracts compliant with YAML spec
- ✅ All builders verified discoverable in GitHub agent lists
- ✅ Evidence artifacts generated for all repos
- ✅ No outstanding compliance issues

**If Pattern Repeats**: CATASTROPHIC FAILURE (BL-031 second occurrence)

---

**Authority**: GOVERNANCE_RIPPLE_MODEL.md | BL-031 | WE_ONLY_FAIL_ONCE_DOCTRINE.md  
**Created By**: governance-repo-administrator | 2026-02-17  
**Status**: ACTIVE (awaiting ripple issue creation)
