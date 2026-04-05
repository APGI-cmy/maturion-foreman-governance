# SCOPE_DECLARATION

**PR_ID**: copilot/canonise-pre-build-stage-model
**DATE_UTC**: 2026-04-05T06:56:00Z  
**RESPONSIBILITY_DOMAIN**: Governance Canon — Pre-Build Stage Model Canonization + IAA Protocol Amendment + FAIL-ONLY-ONCE Promotion  
**AGENT_ROLE**: governance-repo-administrator-v2  
**SCOPE**: Canonise End-to-End Pre-Build Stage Model; amend IAA Pre-Brief Protocol v1.2.0; promote OVF-002 to active FAIL-ONLY-ONCE rule; update GA agent contract via CodexAdvisor

## FILES_CHANGED

```
governance/canon/PRE_BUILD_STAGE_MODEL_CANON.md
governance/canon/IAA_PRE_BRIEF_PROTOCOL.md
governance/canon/GOVERNANCE_CANON_MANIFEST.md
governance/CANON_INVENTORY.json
governance/CHANGELOG.md
.agent-workspace/governance-repo-administrator/knowledge/FAIL-ONLY-ONCE.md
.github/agents/governance-repo-administrator-v2.agent.md
.agent-admin/prehandover/prehandover_proof_1319_20260405.md
.agent-admin/assurance/correction-addendum-1319-r1-20260405.md
.agent-workspace/governance-repo-administrator/memory/session-GA-064-20260405.md
governance/quality/agent-integrity/INTEGRITY_INDEX.md
governance/quality/agent-integrity/governance-repo-administrator-v2.agent.md
.agent-workspace/governance-repo-administrator/knowledge/index.md
SCOPE_DECLARATION.md
```

## CHANGE_SUMMARY

**Purpose**: Three CS2-authorized governance deliverables:

1. **PRE_BUILD_STAGE_MODEL_CANON.md v1.0.0** — New canonical document formalising the 12-stage
   End-to-End Pre-Build Stage Model as mandatory governance for all governed builds under the
   100% one-time build philosophy. Addresses recurring build failure patterns from MAT.

2. **IAA_PRE_BRIEF_PROTOCOL.md v1.2.0** — Amendment clarifying Wave Checklist Invocation Gate
   scope (Foreman-governed wave: mandatory; GA direct-CS2 standalone: exempt by default).
   Resolves REM-007 governance ambiguity per CS2 guidance.

3. **OVF-002 FAIL-ONLY-ONCE Promotion** — Recurring uncommitted-changes-before-IAA pattern
   promoted to active rules A-10 and B-07 in GA FAIL-ONLY-ONCE registry. GA agent contract
   updated via CodexAdvisor to add Phase 4.5 Step 4.5.0 pre-IAA commit check.

## AUTHORITY

CS2 (Johan Ras) — Issue #1319 — Canonise End-to-End Pre-Build Stage Model for 100% One-Time
Build Governance (primary work + REM-007 scope clarification + OVF-002 promotion directive).

---
