# AGENT_CONTRACT_FILE_PROTECTION_POLICY.md v1.0.0 — Layer-Down Ripple Notice

**Status**: Ripple Required  
**Date**: 2026-02-24  
**Policy**: AGENT_CONTRACT_FILE_PROTECTION_POLICY.md  
**Version**: NEW — v1.0.0  
**Authority**: CS2 via governance-repo-administrator (Session 056)  
**Triggered By**: Governance breach in `APGI-cmy/maturion-isms` PR #517

---

## Change Summary

A new constitutional policy has been enacted: **AGENT_CONTRACT_FILE_PROTECTION_POLICY.md v1.0.0**.

This policy establishes that **no agent other than CodexAdvisor (with explicit CS2 permission via a CS2-approved layer-down issue) may modify `.github/agents/` contract files**.

All consumer repositories governed by Maturion MUST adopt this policy.

**Associated Canon Updates** (same ripple batch):
- `LIVING_AGENT_SYSTEM.md` v1.0.0 → v1.1.0: Added Agent Contract File Protection section + updated Prohibition #1
- `AGENT_HANDOVER_AUTOMATION.md` v1.1.1 → v1.1.2: Added Agent Contract File Modification Prohibition subsection in §4.3
- `.github/workflows/agent-contract-audit.yml` (NEW): CI/CD enforcement workflow

---

## Ripple Requirements

### Consumer Repositories Affected
- `APGI-cmy/maturion-foreman-office-app`
- `APGI-cmy/maturion-isms` (PRIORITY: also the breach origin — PR #517)
- `APGI-cmy/PartPulse`
- `APGI-cmy/R_Roster`

### Actions Required for Each Consumer Repository

Each consumer repo MUST:

1. **Adopt Policy**: Copy `governance/canon/AGENT_CONTRACT_FILE_PROTECTION_POLICY.md` v1.0.0 to local `governance/canon/`

2. **Update LIVING_AGENT_SYSTEM.md**: Apply the prohibition text update (Prohibition #1 updated, new Agent Contract File Protection section added)

3. **Update AGENT_HANDOVER_AUTOMATION.md**: Apply §4.3 Agent Contract File Modification Prohibition subsection

4. **Deploy Audit Workflow**: Copy `.github/workflows/agent-contract-audit.yml` to local `.github/workflows/`

5. **Brief agents**: Ensure all agents (governance-liaison, FM, builders) have this policy in their induction context

6. **Update local CANON_INVENTORY** (if maintained): Add AGENT_CONTRACT_FILE_PROTECTION_POLICY.md entry

7. **Update CHANGELOG** (if maintained): Record adoption

### Compliance Check (each consumer repo governance-liaison MUST verify)

- [ ] `AGENT_CONTRACT_FILE_PROTECTION_POLICY.md` v1.0.0 present in `governance/canon/`
- [ ] `LIVING_AGENT_SYSTEM.md` updated with Prohibition #1 and Agent Contract File Protection section
- [ ] `AGENT_HANDOVER_AUTOMATION.md` §4.3 includes prohibition and CodexAdvisor handoff pathway
- [ ] `.github/workflows/agent-contract-audit.yml` deployed
- [ ] Local agents briefed
- [ ] Local CANON_INVENTORY updated (if maintained)

---

## Type of Change

**Classification**: BREAKING_ENHANCEMENT — Constitutional protection layer added
- NEW policy document required in each consumer repo
- ALL agents must update their understanding of `.github/agents/` write authority
- CI/CD enforcement workflow required in each consumer repo
- **Breaking for any existing practice of ripple agents patching agent files directly**

**Impact**:
- Ripple agents MUST stop and escalate when ripple requires `.github/agents/` changes
- CodexAdvisor invocation is now mandatory for all agent file modifications
- IAA audit required before merge for agent contract changes

---

## Timeline

| Milestone | Date | Priority |
|-----------|------|----------|
| Governance repo enacted | 2026-02-24 ✅ | COMPLETE |
| `maturion-isms` adoption | As soon as possible | CRITICAL (breach origin) |
| `maturion-foreman-office-app` adoption | Within 7 days | HIGH |
| `PartPulse` adoption | Within 14 days | HIGH |
| `R_Roster` adoption | Within 14 days | HIGH |

---

## Consumer Repo Issue Template

Use the following template when creating layer-down issues in consumer repos:

```markdown
## Governance Layer-Down: AGENT_CONTRACT_FILE_PROTECTION_POLICY.md v1.0.0

**Priority**: HIGH  
**Source**: APGI-cmy/maturion-foreman-governance — Session 056, 2026-02-24  
**Triggered By**: Governance breach in maturion-isms PR #517

### Summary

A new constitutional policy has been enacted in the governance repo:
`AGENT_CONTRACT_FILE_PROTECTION_POLICY.md` v1.0.0

This policy establishes that **no agent other than CodexAdvisor (with explicit CS2 permission) may modify `.github/agents/` contract files**.

### Required Actions

1. Copy `governance/canon/AGENT_CONTRACT_FILE_PROTECTION_POLICY.md` v1.0.0 to local `governance/canon/`
2. Update `LIVING_AGENT_SYSTEM.md`: Add Prohibition #1 update and Agent Contract File Protection section
3. Update `AGENT_HANDOVER_AUTOMATION.md` §4.3: Add prohibition and CodexAdvisor handoff pathway
4. Deploy `.github/workflows/agent-contract-audit.yml`
5. Brief all local agents
6. Update local CANON_INVENTORY and CHANGELOG

### References
- Policy: governance/canon/AGENT_CONTRACT_FILE_PROTECTION_POLICY.md
- Incident: governance/incidents/INCIDENT-2026-02-24-PR517-AGENT-CONTRACT-BREACH.md
- Ripple Notice: governance/layer-down/AGENT_CONTRACT_FILE_PROTECTION_RIPPLE_NOTICE.md
- CHANGELOG: [AGCFPP-001]

**Completion Evidence Required**: PR with all above changes, CHANGELOG entry, local evidence artifacts.
```

---

## Governance Repo Layer-Down Status

### maturion-foreman-governance (Source)
- **Status**: ✅ COMPLETE
- Policy created, canon updated, workflow deployed
- Session 056, 2026-02-24

### maturion-isms
- **Status**: ⏳ PENDING — CRITICAL (breach origin)

### maturion-foreman-office-app
- **Status**: ⏳ PENDING

### PartPulse
- **Status**: ⏳ PENDING

### R_Roster
- **Status**: ⏳ PENDING

---

**Authority**: GOVERNANCE_RIPPLE_MODEL.md, CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md  
**Prepared By**: governance-repo-administrator (Session 056)  
**Approved By**: CS2 (implicit via breach remediation directive)  
**Incident Reference**: INCIDENT-2026-02-24-PR517-AGENT-CONTRACT-BREACH.md
