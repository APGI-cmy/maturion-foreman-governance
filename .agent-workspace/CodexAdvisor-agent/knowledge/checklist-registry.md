# CodexAdvisor Checklist Registry

**Version**: 1.0.0  
**Created**: 2026-02-26  
**Authority**: CS2 (Johan Ras)  
**Canonical Source**: `governance/checklists/`

---

## Purpose

Maps job types to the correct checklist file that CodexAdvisor MUST load during Phase 2 Step 2.3.
If the checklist file is not found at the listed path → **HALT-005. Do not begin ADVISE. Escalate to CS2.**

---

## Checklist Registry

| Job Type | Checklist File | Path | Version |
|----------|----------------|------|---------|
| New agent creation — Overseer class | CODEX_ADVISOR_AGENT_CONTRACT_REQUIREMENTS_CHECKLIST.md | `governance/checklists/CODEX_ADVISOR_AGENT_CONTRACT_REQUIREMENTS_CHECKLIST.md` | 1.0.0 |
| New agent creation — Foreman class | FOREMAN_AGENT_CONTRACT_REQUIREMENTS_CHECKLIST.md | `governance/checklists/FOREMAN_AGENT_CONTRACT_REQUIREMENTS_CHECKLIST.md` | 1.0.0 |
| New agent creation — Builder class | BUILDER_AGENT_CONTRACT_REQUIREMENTS_CHECKLIST.md | `governance/checklists/BUILDER_AGENT_CONTRACT_REQUIREMENTS_CHECKLIST.md` | 1.0.0 |
| New agent creation — Orchestrator class | ORCHESTRATOR_AGENT_CONTRACT_REQUIREMENTS_CHECKLIST.md | `governance/checklists/ORCHESTRATOR_AGENT_CONTRACT_REQUIREMENTS_CHECKLIST.md` | 1.0.0 |
| New agent creation — Governance Liaison class | GOVERNANCE_LIAISON_AGENT_CONTRACT_REQUIREMENTS_CHECKLIST.md | `governance/checklists/GOVERNANCE_LIAISON_AGENT_CONTRACT_REQUIREMENTS_CHECKLIST.md` | 1.0.0 |
| Agent contract update (any class) | Use checklist matching the target agent's class (row above) | — | — |
| Alignment check only (no file modification) | Not required — Phase 3 skipped | — | — |

---

## IAA Trigger Classification Table

Used during Phase 3 Step 3.2 to classify IAA requirements for this PR.

| PR Category | IAA Required | Basis |
|-------------|-------------|-------|
| Agent contract creation | YES | Agent contract change — governance artifact modification |
| Agent contract update | YES | Agent contract change — governance artifact modification |
| Tier 2 knowledge stub only | REVIEW | Governance change — verify against trigger table when IAA Phase B activates |
| Documentation / parking station only | NO | Non-governance artifact |

Until IAA canon is fully merged (see `governance/canon/INDEPENDENT_ASSURANCE_AGENT_CANON.md`), apply interim classification above.

---

**Tier-3 Canon Reference**: `governance/checklists/` (all checklist files)  
**Tier-3 Canon Reference**: `governance/canon/AGENT_CLASS_SPECIFIC_GATE_PROTOCOLS.md`
