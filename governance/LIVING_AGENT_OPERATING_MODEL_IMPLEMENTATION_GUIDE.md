# Living Agent Operating Model: Implementation Guidance

## Document Information
**Type**: Implementation Guide  
**Version**: 1.0.0  
**Date**: 2026-02-16  
**Authority**: Governance Repository Administrator  
**Status**: Active

---

## Purpose

This document provides **step-by-step implementation guidance** for adopting the Living Agent Operating Model enhancement across all repositories in the Maturion ecosystem.

**Target Audience**: 
- Governance liaisons implementing ripple updates
- Foreman agents managing builder contracts
- Repository administrators setting up agent infrastructure
- CS2 reviewing implementation progress

---

## Overview

The Living Agent Operating Model enhancement introduces 5 new canonical governance documents that transform how agents operate:

1. **AGENT_INVOCATION_AND_DELEGATION_PROTOCOL.md** - Mandatory invocation and OPOJD accountability
2. **AGENT_RIGHTS_BOUNDARIES_AND_DUTIES_REGISTRY.md** - Centralized authority boundaries
3. **AGENT_HANDOVER_AND_QUALITY_PROTOCOL.md** - Three-tier prompts and pre-handover requirements
4. **AGENT_CREATIVE_OWNERSHIP_AND_IMPROVEMENT_DOCTRINE.md** - Creative responsibility doctrine
5. **AGENT_MERGE_GATE_HANDOVER_ENHANCEMENT.md** - Comprehensive quality gate enhancements

**Key Changes**:
- Agent invocation is now **MANDATORY** (not optional)
- All agents must follow **three-tier governance prompt structure**
- **Pre-handover duplicate merge gate runs** required before PR submission
- **Improvement suggestions mandatory** at every handover
- **Comprehensive test debt detection** in merge gates
- **"If you see it, you own it"** doctrine enforced

---

## Implementation Timeline

### Phase 1: Governance Repository (COMPLETE)
**Status**: ✅ Complete  
**Date**: 2026-02-16

- [x] Create 5 new canonical documents
- [x] Update AGENT_CONTRACT.template.md
- [x] Update CHANGELOG.md
- [ ] Update CANON_INVENTORY.json
- [ ] Update GOVERNANCE_ARTIFACT_INVENTORY.md

### Phase 2: Transition Period (60 Days)
**Start**: 2026-02-16  
**End**: 2026-04-17  
**Focus**: Gradual adoption, training, infrastructure setup

**Activities**:
- Consumer repositories receive ripple PRs with new governance
- Agents begin using new structures (encouraged but not strictly enforced)
- Improvement suggestions required but simplified format accepted
- Pre-handover gate runs recommended but not blocking
- Training and documentation for all agents

### Phase 3: Full Enforcement (Post-Transition)
**Start**: 2026-04-18  
**Status**: Full enforcement begins

**Requirements**:
- Pre-handover proof REQUIRED for all PRs
- Incomplete proofs BLOCK merge
- Zero test debt strictly enforced
- Improvement suggestions mandatory
- All agent contracts updated
- All merge gates enhanced

---

## Step-by-Step Implementation

### Step 1: Governance Repository Updates

**Who**: governance-repo-administrator  
**Timeline**: Immediate (during current PR)

**Actions**:
1. ✅ Create 5 new canonical documents (COMPLETE)
2. ✅ Update AGENT_CONTRACT.template.md (COMPLETE)
3. ✅ Update CHANGELOG.md (COMPLETE)
4. Update CANON_INVENTORY.json with 5 new documents
5. Update GOVERNANCE_ARTIFACT_INVENTORY.md
6. Create this implementation guidance document
7. Submit PR for CS2 review
8. After approval, trigger layer-down ripple

**Files to Update**:
```json
// governance/CANON_INVENTORY.json
{
  "G-C-AOP-001": {
    "filename": "AGENT_INVOCATION_AND_DELEGATION_PROTOCOL.md",
    "sha256": "[hash]",
    "path": "governance/canon/AGENT_INVOCATION_AND_DELEGATION_PROTOCOL.md",
    "version": "1.0.0",
    "effective_date": "2026-02-16",
    "provenance": "Created for Living Agent Operating Model enhancement",
    "type": "CANONICAL_STANDARD",
    "status": "ACTIVE"
  },
  // ... repeat for G-C-AOP-002 through G-C-AOP-005
}
```

---

### Step 2: Consumer Repository Ripple

**Who**: governance-liaison  
**Timeline**: Within 7 days of CS2 approval

**Actions**:
1. Receive ripple notification from governance-repo-administrator
2. Create ripple PRs in all consumer repositories
3. Include all 5 new canonical documents
4. Include updated AGENT_CONTRACT.template.md
5. Include implementation guidance (this document)
6. Update CANON_INVENTORY.json in each consumer repo
7. Coordinate with consumer repo agents for review

**Ripple PR Template**:
```markdown
# Governance Ripple: Living Agent Operating Model v1.0.0

## Summary
This PR implements the Living Agent Operating Model enhancement introducing mandatory agent invocation, accountability protocols, handover requirements, and creative ownership.

## Files Added
- governance/canon/AGENT_INVOCATION_AND_DELEGATION_PROTOCOL.md
- governance/canon/AGENT_RIGHTS_BOUNDARIES_AND_DUTIES_REGISTRY.md
- governance/canon/AGENT_HANDOVER_AND_QUALITY_PROTOCOL.md
- governance/canon/AGENT_CREATIVE_OWNERSHIP_AND_IMPROVEMENT_DOCTRINE.md
- governance/canon/AGENT_MERGE_GATE_HANDOVER_ENHANCEMENT.md
- governance/LIVING_AGENT_OPERATING_MODEL_IMPLEMENTATION_GUIDE.md

## Files Updated
- governance/canon/agent-contracts-guidance/templates/AGENT_CONTRACT.template.md
- governance/CANON_INVENTORY.json
- governance/CHANGELOG.md

## Migration Required
YES - See implementation guidance document for details.

## Transition Period
60 days (2026-02-16 to 2026-04-17) for gradual adoption.

## Next Steps
1. Review new canonical documents
2. Begin creating .agent-workspace/ directory structure
3. Start updating agent contracts with new template
4. Plan merge gate enhancement implementation
5. Schedule agent training sessions

## Questions?
Contact governance-repo-administrator or escalate to CS2.
```

---

### Step 3: Agent Workspace Structure Setup

**Who**: Repository administrators, foreman agents  
**Timeline**: Within 14 days of ripple PR merge

**Actions**:
1. Create `.agent-workspace/` directory structure for each agent in repo
2. Create subdirectories per specification
3. Create initial template files
4. Update .gitignore if needed

**Script to Automate**:
```bash
#!/bin/bash
# setup-agent-workspace.sh

AGENT_TYPE=$1

if [ -z "$AGENT_TYPE" ]; then
  echo "Usage: $0 <agent-type>"
  echo "Example: $0 foreman"
  exit 1
fi

BASE_DIR=".agent-workspace/$AGENT_TYPE"

# Create directory structure
mkdir -p "$BASE_DIR/memory"
mkdir -p "$BASE_DIR/evidence"
mkdir -p "$BASE_DIR/delegations/active"
mkdir -p "$BASE_DIR/delegations/sent"
mkdir -p "$BASE_DIR/delegations/archive"
mkdir -p "$BASE_DIR/escalation-inbox"
mkdir -p "$BASE_DIR/improvement-parking/high-priority"
mkdir -p "$BASE_DIR/improvement-parking/medium-priority"
mkdir -p "$BASE_DIR/improvement-parking/low-priority"
mkdir -p "$BASE_DIR/improvement-parking/implemented"
mkdir -p "$BASE_DIR/gate-validation"
mkdir -p "$BASE_DIR/personal"

# Create initial files
cat > "$BASE_DIR/improvement-parking/improvements.md" << 'EOF'
# Improvement Parking Station

**Agent**: [AGENT_TYPE]
**Last Updated**: [DATE]

## Active Improvements

### High Priority
(None yet)

### Medium Priority
(None yet)

### Low Priority
(None yet)

## Implemented
(None yet)

---
**Review Cycle**: Quarterly
**Next Review**: [DATE]
**Reviewer**: governance-repo-administrator
EOF

cat > "$BASE_DIR/personal/lessons-learned.md" << 'EOF'
# Lessons Learned

**Agent**: [AGENT_TYPE]

## Session YYYYMMDD

### Lesson: [Title]
- Context: [when this applies]
- Pattern: [what to watch for]
- Action: [what to do]
EOF

cat > "$BASE_DIR/personal/patterns.md" << 'EOF'
# Patterns

**Agent**: [AGENT_TYPE]

## Pattern: [Name]
- Observed: YYYY-MM-DD (Session NNN)
- Context: [when this occurs]
- Response: [how to handle]
EOF

cat > "$BASE_DIR/personal/creative-ownership-log.md" << 'EOF'
# Creative Ownership Log

**Agent**: [AGENT_TYPE]

## Problems Owned and Resolved
(Track "if you see it, you own it" demonstrations)

## Improvements Implemented
(Track proactive improvements)

## Beyond Minimum Deliveries
(Track exceeding expectations)

## Accountability Demonstrations
(Track ownership demonstrations)
EOF

cat > "$BASE_DIR/personal/delegation-patterns.md" << 'EOF'
# Delegation Patterns

**Agent**: [AGENT_TYPE]

## Successful Delegations
(Track what worked well)

## Delegation Failures
(Track what didn't work and why)

## Lessons
(Track learnings about delegation)
EOF

echo "✅ Agent workspace created: $BASE_DIR"
echo "Next: Run for each agent type in your repository"
```

**Usage**:
```bash
chmod +x setup-agent-workspace.sh
./setup-agent-workspace.sh foreman
./setup-agent-workspace.sh builder-001
./setup-agent-workspace.sh builder-002
# etc.
```

---

### Step 4: Update Agent Contracts

**Who**: Agent contract owners (per CS2_AGENT_FILE_AUTHORITY_MODEL.md)  
**Timeline**: Within 30 days of ripple PR merge

**Actions for Each Agent Contract**:

1. **Add Tier 1: Role & General Governance**
   - Copy from updated AGENT_CONTRACT.template.md
   - Customize MAY/MAY NOT/MUST DO/MUST INVOKE per agent type
   - Reference AGENT_RIGHTS_BOUNDARIES_AND_DUTIES_REGISTRY.md

2. **Add Tier 2: Agent-Specific Protocol**
   - Define specialized responsibilities
   - Document agent-specific workflow
   - Define delegation management
   - List quality enforcement requirements
   - List evidence requirements
   - Define escalation pathways
   - Document integration with Living Agent System

3. **Reference Tier 3: Pre-Handover & Delivery Protocol**
   - Reference AGENT_HANDOVER_AND_QUALITY_PROTOCOL.md
   - May inline checklist or full reference

4. **Update Enhancement & Improvement Capture Section**
   - Replace old section with new comprehensive improvement requirements
   - Reference AGENT_CREATIVE_OWNERSHIP_AND_IMPROVEMENT_DOCTRINE.md
   - Reference MANDATORY_PROCESS_IMPROVEMENT_REFLECTION_PROTOCOL.md

**Example Migration**:
```markdown
Before:
## Allowed Actions
- Do X
- Do Y

## Forbidden Actions
- Don't do Z

After:
## Tier 1: Role & General Governance
### YOU MAY DO (Rights)
- ✅ Do X within scope
- ✅ Do Y with foreman approval

### YOU MAY NOT DO (Boundaries)
- ❌ Don't do Z (governance violation)

### YOU MUST DO (Duties)
- ✅ Report completion
- ✅ Escalate blockers

### YOU MUST INVOKE WHEN
- Scope exceeds delegation → invoke foreman
```

---

### Step 5: Create Pre-Handover Gate Scripts

**Who**: Repository administrators, DevOps  
**Timeline**: Within 30 days of ripple PR merge

**Scripts to Create**:

1. **.agent-workspace/[AGENT]/gate-validation/run-gates.sh**
   - See AGENT_HANDOVER_AND_QUALITY_PROTOCOL.md Section 7.1 for template
   - Adapt to repository-specific gates

2. **.github/scripts/detect-test-debt.sh**
   - See AGENT_MERGE_GATE_HANDOVER_ENHANCEMENT.md Section 10.1 for template
   - Detects all 8 categories of test debt

3. **.github/scripts/detect-test-dodging.sh**
   - Detects test exclusion, conditional execution, timeout manipulation
   - Detects coverage manipulation

4. **.github/scripts/detect-technical-debt.sh**
   - Detects TODO/FIXME/HACK comments
   - Detects disabled linting rules
   - Detects outdated/vulnerable dependencies

5. **.github/scripts/detect-warnings.sh**
   - Detects compiler/build warnings
   - Detects runtime warnings
   - Detects deprecation warnings

6. **.github/scripts/validate-prehandover-proof.sh**
   - Validates PREHANDOVER_PROOF.md exists and is complete
   - Checks all required sections present
   - Verifies proof marked complete

**Make Scripts Executable**:
```bash
chmod +x .agent-workspace/*/gate-validation/run-gates.sh
chmod +x .github/scripts/detect-*.sh
chmod +x .github/scripts/validate-prehandover-proof.sh
```

---

### Step 6: Enhance Merge Gate Workflows

**Who**: Repository administrators, DevOps  
**Timeline**: Within 30 days of ripple PR merge

**Actions**:

1. **Update .github/workflows/merge-gate-interface.yml**
   - Add 5 new quality gate jobs per AGENT_MERGE_GATE_HANDOVER_ENHANCEMENT.md Section 9.1
   - Ensure scripts are called correctly

2. **Update Branch Protection Rules**
   - Add new required status checks:
     - quality/test-debt-detection
     - quality/test-dodging-detection
     - quality/technical-debt-detection
     - quality/warning-detection
     - quality/pre-handover-proof

**Example Workflow Addition**:
```yaml
  test-debt-detection:
    name: "quality/test-debt-detection"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Detect test debt
        run: bash .github/scripts/detect-test-debt.sh
```

---

### Step 7: Update Wake-Up and Session Closure Scripts

**Who**: Repository administrators  
**Timeline**: Within 30 days of ripple PR merge

**Actions**:

1. **Update .github/scripts/wake-up-protocol.sh**
   - Add creative ownership reminders
   - Load Tier 1/2/3 governance into working contract
   - Check for pending delegations and escalations
   - Load improvement parking station status

2. **Update .github/scripts/session-closure.sh**
   - Verify pre-handover proof complete
   - Check improvement suggestion provided
   - Validate all gate runs logged
   - Confirm zero test debt
   - Archive gate validation logs
   - Move completed improvement suggestions to parking station

**Example Enhancements**:
```bash
# In wake-up-protocol.sh
echo "=== Creative Ownership Reminders ==="
echo "✓ You are intelligent and creative - think critically"
echo "✓ If you see it, you own it - problems require action"
echo "✓ Continuous improvement - every session makes something better"
echo "✓ No blame-shifting - you own outcomes"
echo "✓ Deliver beyond minimum - excellence is standard"

# In session-closure.sh
if [ ! -f PREHANDOVER_PROOF.md ]; then
  echo "⚠️  WARNING: PREHANDOVER_PROOF.md not found"
  echo "Create pre-handover proof before completing session"
fi
```

---

### Step 8: Agent Training

**Who**: All agents in ecosystem  
**Timeline**: Throughout transition period

**Training Topics**:

1. **Mandatory Invocation Protocol**
   - When invocation is required vs. optional
   - How to create delegation specifications
   - How to verify delegated work
   - "If you see it, you own it" doctrine

2. **Three-Tier Governance Prompts**
   - Understanding Tier 1 (Role & General)
   - Understanding Tier 2 (Agent-Specific)
   - Understanding Tier 3 (Pre-Handover)

3. **Pre-Handover Protocol**
   - Running duplicate merge gates in workspace
   - Detecting and eliminating test debt
   - Creating pre-handover proof document
   - Providing improvement suggestions

4. **Creative Ownership**
   - Thinking critically and owning outcomes
   - Proactive improvement mindset
   - No blame-shifting
   - Delivering beyond minimum

5. **Improvement Parking Station**
   - How to record improvements
   - Priority classification
   - Quarterly review process

**Training Methods**:
- Read new canonical documents
- Review examples in documents
- Practice with mock scenarios
- Pair with experienced agents during transition

---

## Validation Checklist

### Repository-Level Validation

Use this checklist to verify complete implementation:

- [ ] All 5 new canonical documents copied to governance/canon/
- [ ] CANON_INVENTORY.json updated with new documents
- [ ] GOVERNANCE_ARTIFACT_INVENTORY.md updated
- [ ] .agent-workspace/ directory structure created for each agent
- [ ] All agent contracts updated with three-tier structure
- [ ] Pre-handover gate validation scripts created and tested
- [ ] Merge gate workflows enhanced with quality gates
- [ ] Branch protection updated with new required checks
- [ ] Wake-up protocol updated
- [ ] Session closure protocol updated
- [ ] Agent training completed

### Agent-Level Validation

For each agent:

- [ ] Agent contract includes Tier 1 (Role & General Governance)
- [ ] Agent contract includes Tier 2 (Agent-Specific Protocol)
- [ ] Agent contract references Tier 3 (Pre-Handover Protocol)
- [ ] MAY/MAY NOT/MUST DO/MUST INVOKE sections complete
- [ ] Delegation management section present
- [ ] Workspace directory exists and populated
- [ ] Agent has run wake-up protocol successfully
- [ ] Agent has completed first session with new protocols
- [ ] Agent has created first pre-handover proof
- [ ] Agent has provided first improvement suggestion

---

## Troubleshooting

### Common Issues

**Issue**: Agent workspace structure not created
**Solution**: Run setup-agent-workspace.sh script for each agent

**Issue**: Pre-handover gate scripts failing
**Solution**: Adapt scripts to repository-specific test commands and file structures

**Issue**: Merge gate workflows not running
**Solution**: Check workflow YAML syntax, ensure scripts are executable

**Issue**: Agent unclear on authority boundaries
**Solution**: Reference AGENT_RIGHTS_BOUNDARIES_AND_DUTIES_REGISTRY.md for specific agent type

**Issue**: Improvement suggestions unclear
**Solution**: Reference examples in AGENT_HANDOVER_AND_QUALITY_PROTOCOL.md Section 3.4

**Issue**: Delegation format unclear
**Solution**: Use template in AGENT_INVOCATION_AND_DELEGATION_PROTOCOL.md Section 5.1

---

## Support and Escalation

**For Implementation Questions**:
- Reference this implementation guide
- Review relevant canonical documents
- Check examples in canonical documents
- Escalate to governance-liaison if unclear

**For Governance Ambiguities**:
- Escalate to governance-repo-administrator
- Provide specific example of ambiguity
- Suggest clarification if possible

**For Authority Boundary Conflicts**:
- Reference AGENT_RIGHTS_BOUNDARIES_AND_DUTIES_REGISTRY.md
- Escalate to CS2 if unresolved

**For Technical Issues**:
- Check script syntax and permissions
- Verify file paths are correct
- Review workflow logs for errors
- Escalate to DevOps if needed

---

## Success Metrics

**Transition Period (60 days)**:
- 100% of consumer repositories received ripple PRs
- 80%+ of agent contracts updated
- 80%+ of pre-handover gate scripts created
- 80%+ of merge gate workflows enhanced
- Agent training completed for all active agents

**Post-Transition (ongoing)**:
- 100% of PRs include pre-handover proof
- 100% of PRs include improvement suggestions
- Zero test debt violations in merged PRs
- Improvement parking station reviewed quarterly
- Continuous learning captured in agent personal files

---

## Timeline Summary

| Phase | Duration | Key Milestones |
|-------|----------|----------------|
| Governance Repo | 1 day | New canonical documents, updated templates |
| Ripple PRs | 7 days | All consumer repos receive updates |
| Infrastructure | 14 days | Agent workspaces, scripts created |
| Agent Contracts | 30 days | All contracts updated with three-tier structure |
| Merge Gates | 30 days | Enhanced quality gates operational |
| Training | 60 days | All agents trained and practicing |
| Full Enforcement | Day 61+ | All requirements strictly enforced |

---

## References

### New Canonical Documents
- `AGENT_INVOCATION_AND_DELEGATION_PROTOCOL.md` (G-C-AOP-001)
- `AGENT_RIGHTS_BOUNDARIES_AND_DUTIES_REGISTRY.md` (G-C-AOP-002)
- `AGENT_HANDOVER_AND_QUALITY_PROTOCOL.md` (G-C-AOP-003)
- `AGENT_CREATIVE_OWNERSHIP_AND_IMPROVEMENT_DOCTRINE.md` (G-C-AOP-004)
- `AGENT_MERGE_GATE_HANDOVER_ENHANCEMENT.md` (G-C-AOP-005)

### Updated Documents
- `agent-contracts-guidance/templates/AGENT_CONTRACT.template.md`

### Related Governance
- `LIVING_AGENT_SYSTEM.md` v6.2.0
- `DELEGATION_INSTRUCTION_AND_AUDIT_MODEL.md`
- `FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md`
- `MANDATORY_PROCESS_IMPROVEMENT_REFLECTION_PROTOCOL.md`
- `BUILD_PHILOSOPHY.md`

---

**End of Implementation Guidance**

**Version**: 1.0.0  
**Date**: 2026-02-16  
**Authority**: Governance Repository Administrator  
**Next Review**: 2026-04-17 (post-transition period)
