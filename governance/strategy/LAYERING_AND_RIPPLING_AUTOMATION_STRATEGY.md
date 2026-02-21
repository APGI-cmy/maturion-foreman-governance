# LAYERING AND RIPPLING AUTOMATION STRATEGY

## Status
**Type**: Governance Strategy Document  
**Authority**: Governance Administrator  
**Version**: 1.0.0  
**Effective Date**: 2026-02-21  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Purpose**: Define automation strategy for layering down governance artifacts and rippling within consumer repositories

---

## 1. Purpose

This strategy document defines the **automated workflow** for distributing governance artifacts across repositories (layering) and integrating them within repositories (rippling).

It establishes:
- The distinction between cross-repo layering and within-repo rippling
- Automated workflows for triggering layering and rippling
- Escalation requirements for agent contract modifications
- CS2 approval gates for agent file changes
- Evidence and audit trail requirements

**Constitutional Principle**: Layering distributes artifacts; rippling integrates them. These are distinct, sequential processes with different automation boundaries.

---

## 2. Terminology (Canonical Definitions)

Per **ECOSYSTEM_VOCABULARY.md v1.1.0**:

### 2.1 Layering Down
**The process of distributing governance artifacts (canons, templates, agent contracts, schemas) from the canonical governance repository to downstream consumer repositories.**

- **Scope**: Cross-repository
- **Trigger**: PUBLIC_API canon file creation or modification
- **Mechanism**: GitHub issues created in consumer repos with artifact bundle
- **Authority**: Governance Administrator (for non-agent files); CS2 (for agent contracts)
- **Output**: Issue in consumer repo with integration instructions

### 2.2 Layering Up
**The process of propagating learnings, proposals, governance improvements, and strategic feedback from consumer repositories back to the canonical governance repository.**

- **Scope**: Cross-repository (reverse direction)
- **Trigger**: Lessons learned, governance gaps, drift detection, failure patterns
- **Mechanism**: Issue created in governance repo with evidence package
- **Authority**: Governance-liaison (consumer repo) → Governance Administrator (intake) → CS2 (approval)
- **Output**: Canon update in governance repo, followed by layer-down ripple

### 2.3 Rippling
**The process of integrating governance artifacts within a single repository to ensure consistency across all files, systems, agent contracts, templates, and references.**

- **Scope**: Intra-repository (single repo only)
- **Trigger**: After layering down completes (artifacts received)
- **Mechanism**: Automated or agent-driven synchronization of LOCKED sections, cross-references, templates
- **Authority**: Governance-liaison (for non-agent files); CS2 (for agent contract modifications)
- **Output**: PR in consumer repo with all ripple changes applied

**Key Distinction**: Layering is **distribution**; rippling is **integration**. Layering crosses repo boundaries; rippling stays within one repo.

---

## 3. Automated Layering Down Workflow

### 3.1 Trigger Conditions

Auto layer-down is triggered when:
- ✅ A PUBLIC_API canon file is created in `governance/canon/`
- ✅ A PUBLIC_API canon file is modified in `governance/canon/`
- ✅ A schema file is created or modified in `governance/schemas/`
- ✅ A template file is created or modified in `governance/templates/`
- ✅ Changes are merged to `main` branch

Auto layer-down is NOT triggered when:
- ❌ INTERNAL canon files are modified (consumer repos don't consume these)
- ❌ OPTIONAL canon files are modified (consumers choose when to adopt)
- ❌ Non-governance files are modified

### 3.2 Layer-Down Issue Creation Process

**Workflow**: `.github/workflows/governance-ripple-dispatch.yml` (to be renamed `governance-layer-down-dispatch.yml`)

**Process**:
1. Detect governance artifact changes on `main` branch merge
2. Read `governance/CONSUMER_REPO_REGISTRY.json` for enabled consumers
3. For each enabled consumer repository:
   - Create GitHub issue via API
   - Title: `[Layer-Down] Propagate Governance Changes from PR #<pr-number>`
   - Body: Include changed files, version info, integration instructions
   - Labels: `governance`, `layer-down`, `high-priority`
   - Assign to: `governance-liaison` (or repo-specific liaison)
4. Record layer-down dispatch in `.agent-admin/ripple/layer-down-dispatch-<timestamp>.json`

**Issue Template**:
```markdown
## Layer-Down: Governance Artifact Distribution

**Source**: maturion-foreman-governance PR #<pr-number>
**Date**: <timestamp>
**Artifacts Changed**: <count> files

### Changed Artifacts

<list of changed PUBLIC_API files with versions>

### Integration Instructions

1. Review changed artifacts
2. Execute rippling protocol (see Section 4 below)
3. Update GOVERNANCE_ALIGNMENT_INVENTORY.json with new versions
4. Create PR with ripple changes
5. Attach PREHANDOVER_PROOF if executable artifacts changed
6. Request approval (CS2 if agent files modified)
7. Merge after approval

**References**:
- CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md
- LAYERING_AND_RIPPLING_AUTOMATION_STRATEGY.md
```

### 3.3 Layer-Down Completion Tracking

**When consumer repo completes integration**:
1. Consumer repo governance-liaison closes layer-down issue with completion comment
2. Governance-repo-administrator verifies completion via issue closure webhook (future automation)
3. Layer-down entry marked COMPLETE in tracking log

---

## 4. Automated Rippling Workflow

### 4.1 Trigger Conditions

Auto ripple is triggered when:
- ✅ Layer-down issue created in consumer repo
- ✅ Governance artifacts received and reviewed
- ✅ Governance-liaison initiates ripple execution

### 4.2 Rippling Execution Process

**Rippling includes**:

#### 4.2.1 LOCKED Section Synchronization
- Extract LOCKED sections from layered-down agent contracts
- Update local agent contracts with new LOCKED sections
- Preserve LOCAL_ONLY sections untouched
- Validate LOCKED section integrity

#### 4.2.2 Cross-Reference Updates
- Update all references to versioned canon files
- Update schema references to new versions
- Update template references to new versions
- Update GOVERNANCE_ALIGNMENT_INVENTORY.json

#### 4.2.3 Template Synchronization
- Update local templates from governance templates
- Preserve repo-specific customizations
- Validate template schema compliance

#### 4.2.4 Contract Alignment (Rare)
- **ONLY when LOCKED sections or PUBLIC_API changes require it**
- Update agent contract references to canon files
- Update agent contract version dependencies
- **REQUIRES CS2 APPROVAL if agent behavioral changes**

### 4.3 Ripple Automation Boundaries

**Auto-Close Ripple When**:
- ✅ All changes are non-agent files (canons, schemas, templates)
- ✅ LOCKED section sync only (no behavioral changes)
- ✅ Cross-reference updates only
- ✅ No merge conflicts detected
- ✅ All validations pass (syntax, schema, inventory)

**Escalate to CS2 When**:
- ⚠️ Agent contract behavioral changes required
- ⚠️ Agent authority boundaries affected
- ⚠️ Agent responsibilities modified
- ⚠️ Agent separation-of-duties impacted
- ⚠️ New agent recruitment required

**In these cases**:
1. Governance-liaison creates ripple PR but marks as DRAFT
2. Governance-liaison creates escalation document in `.agent-workspace/<agent>/escalation-inbox/`
3. CS2 reviews and approves (or requests changes)
4. Only after CS2 approval, PR marked ready and merged

### 4.4 Ripple Completion Criteria

Ripple is complete when:
- ✅ All LOCKED sections synchronized
- ✅ All cross-references updated
- ✅ All templates synchronized
- ✅ GOVERNANCE_ALIGNMENT_INVENTORY.json updated with new versions
- ✅ All validations pass (syntax, schema, inventory, gates)
- ✅ PREHANDOVER_PROOF generated (if executable artifacts changed)
- ✅ PR approved by CS2 (if agent files modified) or FM (if non-agent files)
- ✅ PR merged to main

---

## 5. Integration with Existing Protocols

### 5.1 Layer-Down Protocol Integration

This strategy implements the automation vision from:
- **CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md** — Explicit layer-down requirements
- **LAYER_UP_PROTOCOL.md** — Upward learning flow requirements
- **GOVERNANCE_RIPPLE_MODEL.md** — Bidirectional governance evolution (to be updated with terminology fixes)

### 5.2 Agent Authority Integration

This strategy respects the authority hierarchy from:
- **CS2_AGENT_FILE_AUTHORITY_MODEL.md** — CS2 supreme authority for agent contracts
- **AGENT_RECRUITMENT_AND_CONTRACT_AUTHORITY_MODEL.md** — Contract update authority chain
- **AGENT_CONTRACT_PROTECTION_PROTOCOL.md** — Protected file enforcement

### 5.3 Evidence Integration

This strategy produces evidence per:
- **PREHANDOVER_PROOF.md** — Prehandover proof requirements
- **EVIDENCE_ARTIFACT_BUNDLE_STANDARD.md** — Evidence bundle requirements
- **AGENT_HANDOVER_AUTOMATION.md** — Session closure and evidence automation

---

## 6. Workflow Naming and Terminology Fixes

### 6.1 Workflow Renames (Recommended)

| Current Name | Recommended Name | Rationale |
|--------------|------------------|-----------|
| `governance-ripple-dispatch.yml` | `governance-layer-down-dispatch.yml` | Dispatch is cross-repo distribution (layering), not within-repo integration (rippling) |

### 6.2 Comment and Variable Name Updates

Within workflows and scripts:
- "ripple" references → "layer-down" when referring to cross-repo distribution
- "ripple" retained → when referring to within-repo integration
- Add clarifying comments distinguishing the two processes

---

## 7. Future Automation Enhancements

### 7.1 Phase 1 (Current): Manual Layer-Down, Manual Ripple
- Governance Administrator manually creates issues in consumer repos
- Governance-liaison manually executes ripple
- CS2 manually approves agent contract changes

### 7.2 Phase 2 (Near-Term): Auto Layer-Down, Manual Ripple
- ✅ **THIS STRATEGY IMPLEMENTS PHASE 2**
- GitHub Actions auto-create layer-down issues in consumer repos
- Governance-liaison still manually executes ripple
- CS2 still manually approves agent contract changes

### 7.3 Phase 3 (Future): Auto Layer-Down, Semi-Auto Ripple
- GitHub Actions auto-create layer-down issues
- Governance-liaison initiates ripple; automation executes synchronization
- Auto-generates ripple PR marked as DRAFT if agent files touched
- CS2 reviews and approves draft PRs
- Auto-merges if no agent files touched

### 7.4 Phase 4 (Long-Term): Full Automation with CS2 Review Gate
- GitHub Actions auto-create layer-down issues
- Consumer repo workflow auto-executes ripple on issue creation
- Auto-generates ripple PR (DRAFT if agent files, ready if not)
- CS2 review gate enforced for agent file PRs
- Auto-merge for non-agent file PRs after validation

**Current Implementation**: Phase 2

---

## 8. Escalation and Approval Requirements

### 8.1 Auto-Approve (No CS2 Required)

Ripple PR may auto-close when:
- ✅ Only non-agent files modified (canons, schemas, templates)
- ✅ Only LOCKED section sync (no behavioral changes)
- ✅ Only cross-references updated
- ✅ All validations pass
- ✅ PREHANDOVER_PROOF attached (if executable artifacts)

### 8.2 Require CS2 Approval

Ripple PR MUST escalate to CS2 when:
- ⚠️ Agent contract files modified (`.agent.md` files)
- ⚠️ Agent authority boundaries changed
- ⚠️ Agent responsibilities modified
- ⚠️ New LOCKED sections introduced
- ⚠️ Behavioral changes required in agent contracts

**Escalation Process**:
1. Governance-liaison creates escalation document: `.agent-workspace/<agent>/escalation-inbox/agent-contract-ripple-escalation-<date>.md`
2. Escalation document includes:
   - What changed in governance
   - Why agent contract modification required
   - Proposed changes to agent contract
   - Impact analysis
   - Risk assessment
3. CS2 reviews escalation document
4. CS2 approves or requests changes
5. Only after CS2 approval, ripple PR merged

---

## 9. Audit Trail and Evidence

### 9.1 Layer-Down Evidence

Every layer-down dispatch creates:
- `.agent-admin/ripple/layer-down-dispatch-<timestamp>.json` (in governance repo)
- GitHub issue in consumer repo with layer-down instructions
- Layer-down log entry in governance repo

### 9.2 Ripple Evidence

Every ripple execution creates:
- Ripple PR in consumer repo with all changes
- PREHANDOVER_PROOF (if executable artifacts)
- GOVERNANCE_ALIGNMENT_INVENTORY.json update
- Session memory entry (governance-liaison)
- Escalation document (if CS2 approval required)

### 9.3 Completion Evidence

Every layer-down completion creates:
- Layer-down issue closure comment
- Layer-down tracking log update (COMPLETE status)
- Bidirectional ripple log entry (governance repo)

---

## 10. Implementation Checklist

### 10.1 Governance Repository

- [ ] Update ECOSYSTEM_VOCABULARY.md with layering/rippling definitions (✅ COMPLETE)
- [ ] Create LAYERING_AND_RIPPLING_AUTOMATION_STRATEGY.md (✅ THIS DOCUMENT)
- [ ] Update GOVERNANCE_RIPPLE_MODEL.md with terminology fixes (see Section 11)
- [ ] Rename `governance-ripple-dispatch.yml` → `governance-layer-down-dispatch.yml`
- [ ] Update workflow to create GitHub issues in consumer repos
- [ ] Update workflow comments to use correct terminology
- [ ] Update CANON_INVENTORY.json with new/updated canon versions
- [ ] Execute layer-down to all consumer repos

### 10.2 Consumer Repositories (via Layer-Down)

- [ ] Receive layer-down issue with new governance artifacts
- [ ] Review ECOSYSTEM_VOCABULARY.md v1.1.0
- [ ] Review LAYERING_AND_RIPPLING_AUTOMATION_STRATEGY.md
- [ ] Execute rippling protocol per Section 4
- [ ] Update GOVERNANCE_ALIGNMENT_INVENTORY.json
- [ ] Create ripple PR
- [ ] Attach PREHANDOVER_PROOF (if executable artifacts)
- [ ] Escalate to CS2 (if agent contracts modified)
- [ ] Merge after approval

---

## 11. Required Canon Updates (Terminology Fixes)

### 11.1 GOVERNANCE_RIPPLE_MODEL.md

**Current Issues**:
- Uses "ripple" for both cross-repo and within-repo processes
- Section 4 "Downward Ripple" should be "Downward Layering"
- Section 5 "Upward Ripple" should be "Upward Layering"
- "Ripple Back" references should be "Layer-Down After Layer-Up"

**Recommended Changes**:
- Rename to GOVERNANCE_LAYERING_MODEL.md (or retain name and clarify scope)
- Update "Downward Ripple" → "Downward Layering (Layer-Down)"
- Update "Upward Ripple" → "Upward Layering (Layer-Up)"
- Add Section 6: "Rippling (Within-Repo Integration)"
- Clarify that "governance ripple" historically meant "cross-repo governance evolution" but is now split into layering (cross-repo) and rippling (within-repo)

### 11.2 Other Canon Files

Search and update references in:
- CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md (mostly correct, minor clarifications)
- LAYER_UP_PROTOCOL.md (mostly correct, minor clarifications)
- CROSS_REPOSITORY_RIPPLE_AWARENESS_MODEL.md (rename or clarify scope)
- GOVERNANCE_RIPPLE_DETECTION_PROTOCOL.md (rename or clarify scope)
- GOVERNANCE_RIPPLE_CHECKLIST_PROTOCOL.md (rename or clarify scope)

---

## 12. References

- `governance/canon/ECOSYSTEM_VOCABULARY.md` v1.1.0 — Canonical term definitions
- `governance/canon/CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md` — Layer-down protocol
- `governance/canon/LAYER_UP_PROTOCOL.md` — Layer-up protocol
- `governance/canon/GOVERNANCE_RIPPLE_MODEL.md` — Bidirectional governance evolution (to be updated)
- `governance/canon/CS2_AGENT_FILE_AUTHORITY_MODEL.md` — Agent contract authority
- `governance/canon/AGENT_CONTRACT_PROTECTION_PROTOCOL.md` — Protected file enforcement
- `.github/workflows/governance-ripple-dispatch.yml` — Current layer-down dispatch workflow

---

**Authority**: Governance Administrator  
**Version**: 1.0.0  
**Effective Date**: 2026-02-21  
**Layer-Down Status**: PUBLIC_API — layer down to all consumer repos mandatory  
**Last Updated**: 2026-02-21
