# Governance Gap: Cross-Agent Coordination Protocol Required

**Gap ID**: GAP_CROSS_AGENT_COORD  
**Priority**: HIGH  
**Identified By**: governance-repo-administrator (Session 009, Issue #1069 RCA)  
**Date**: 2026-02-10

---

## Gap Summary

**Missing Canon**: CROSS_AGENT_COORDINATION_PROTOCOL.md

**Problem**: No documented process exists for agent-to-agent coordination when one agent discovers work requiring another agent's authority.

**Impact**: Agents may either:
1. Act outside authority boundaries (as occurred in Issue #1069)
2. Become blocked without clear escalation path
3. Create ad-hoc coordination processes (inconsistent)

---

## Discovered During

**Issue**: #1069 - Governance Repository Self-Audit  
**RCA**: `.agent-admin/rca/RCA_1070_unauthorized_merge_gate_modification.md`

**Scenario**: governance-repo-administrator discovered missing merge gate workflow during audit. Unclear whether to:
- Create it myself (violated authority)
- Escalate to CS2 (too heavy)
- Summon Foreman agent (correct, but no protocol existed)

---

## Required Canon: CROSS_AGENT_COORDINATION_PROTOCOL.md

### Scope

This canon must define:

1. **Detection Triggers**
   - How agents recognize out-of-bounds work
   - Authority boundary validation patterns
   - Pre-flight checks before starting work

2. **Escalation Decision Tree**
   - When to summon another agent (same-branch coordination)
   - When to escalate to CS2 (policy conflicts, strategic decisions)
   - When to HALT (blocking conflicts)

3. **Cross-Agent Issue Creation**
   - Standard issue template for summoning agents
   - Required labels (agent:class, priority, scope)
   - Required context (RCA, branch, acceptance criteria)
   - Evidence handoff requirements

4. **Same-Branch Coordination**
   - Workflow for multiple agents working on same PR branch
   - Commit message conventions
   - Evidence artifact coordination
   - Handover verification between agents

5. **Authority Boundaries**
   - Clear matrix: Agent Class → Allowed Paths
   - Explicit "who owns what" for common resources:
     - `.github/workflows/**` → Foreman
     - `governance/canon/**` → governance-repo-administrator
     - `.agent` contracts → CS2 only
   - Escalation paths for gray areas

### Success Criteria

- [ ] Canon defines clear escalation decision tree
- [ ] Standard issue templates for agent summoning
- [ ] Authority boundary matrix documented
- [ ] Same-branch coordination workflow defined
- [ ] Evidence handoff requirements specified
- [ ] Integrated with agent wake-up protocols
- [ ] Referenced in all agent contracts

---

## Related Governance Gaps

### Gap 2: Agent Contract Bindings

**Problem**: FM_MERGE_GATE_MANAGEMENT_PROTOCOL.md exists but not bound to governance-repo-administrator contract

**Action**: Add binding:
```yaml
- id: fm-merge-gate-management
  path: governance/canon/FM_MERGE_GATE_MANAGEMENT_PROTOCOL.md
  role: merge-gate-authority-boundary
```

### Gap 3: Wake-Up Protocol Enhancement

**Problem**: No authority boundary validation in wake-up protocol

**Action**: Add Step 8A to governance-repo-administrator wake-up protocol:
```bash
# STEP 8A: AUTHORITY BOUNDARY VALIDATION
echo "🔒 STEP 8A: Authority boundary check..."
# Check if task involves escalation_required_paths
# Display warnings/blocks for out-of-scope work
```

### Gap 4: Governance vs. Implementation Clarity

**Problem**: Ambiguity between defining standards (governance) and implementing enforcement

**Action**: Enhance GOVERNANCE_PURPOSE_AND_SCOPE.md with section:
```markdown
## Governance Canon vs. Enforcement Implementation

- **Governance Canon**: Owned by governance-repo-administrator (standards, requirements)
- **Enforcement Implementation**: Owned by responsible agent class (workflows, gates)
- **Principle**: Defining standards ≠ implementing enforcement
```

---

## Proposed Issue for GitHub

### Title
```
Governance Gap: Create CROSS_AGENT_COORDINATION_PROTOCOL.md canon
```

### Labels
```
governance-gap
priority:high
scope:canon-creation
agent:governance-repo-administrator
```

### Body

See this file for complete context.

Key points:
- No cross-agent coordination protocol exists
- Led to authority violation in Issue #1069
- Blocking efficient agent-to-agent coordination
- Required for Living Agent System v5.0.0 maturity

**Acceptance Criteria**:
- [ ] CROSS_AGENT_COORDINATION_PROTOCOL.md created in governance/canon/
- [ ] Added to CANON_INVENTORY.json
- [ ] Bound to relevant agent contracts
- [ ] Integrated with wake-up protocols
- [ ] Authority boundary matrix documented
- [ ] Issue summoning templates provided

---

## Timeline

**Identified**: 2026-02-10  
**Priority**: HIGH (blocks efficient agent coordination)  
**Target**: Include in next governance canon sprint  
**Dependencies**: None (can be created immediately)

---

## Stakeholders

- **Primary**: All agent classes (overseer, foreman, builder, liaison)
- **Authority**: CS2 (Johan Ras) - must approve canon
- **Implementer**: governance-repo-administrator (with CS2 guidance)

---

**Created by**: governance-repo-administrator  
**Session**: 009 (20260210)  
**Evidence**: `.agent-admin/rca/RCA_1070_unauthorized_merge_gate_modification.md`  
**Authority**: Issue #1069 RCA findings
