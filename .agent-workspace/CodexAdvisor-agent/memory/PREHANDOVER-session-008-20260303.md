# PREHANDOVER Proof — Session 008 — 2026-03-03

**Session ID**: session-008-20260303-harmonize
**Date**: 2026-03-03
**Agent**: CodexAdvisor-agent
**Contract Version**: 3.2.0
**Triggering Issue**: APGI-cmy/maturion-foreman-governance#1288 — [Propagation][Governance Canon]
Harmonize all agent contract files in governance repo to match isms consumer patterns; add builder
support for foreman

---

## Target Agents (4 updated)

| Agent File | SHA256 (post-update) | Char Count |
|------------|---------------------|------------|
| `.github/agents/foreman-v2.agent.md` | `e601482d5409adaa40416e779bb1dd0214a0904ef826cc9a4c1959d7112dd070` | ~10,500 |
| `.github/agents/CodexAdvisor-agent.md` | `6dff0aa9b0d4f84a658c343b1e3317585d70f99046756a40389304a0c8590780` | ~26,700 |
| `.github/agents/governance-repo-administrator-v2.agent.md` | `80579a0ca49164a027ff99408d428c54105a6ba5b847f2514a261dc7189bac12` | ~13,800 |
| `.github/agents/independent-assurance-agent.md` | `46529935af1543393bba0f71bca85060e2be54ce60a2d6ee6b9cb6db0e298a28` | ~14,900 |

---

## Bundle Completeness

**NOTE**: This PREHANDOVER proof is being created retroactively in session 009 as part of the
BREACH-001 corrective action. The actual code changes were committed in session 008. The session
memory (session-008-20260303.md) and this proof were missing — that is the breach being corrected.

| Artifact | Path | Status |
|----------|------|--------|
| Agent contracts (4) | `.github/agents/` | ✅ PRESENT (committed 2026-03-03) |
| Integrity reference copies (4) | `governance/quality/agent-integrity/` | ✅ PRESENT |
| INTEGRITY_INDEX.md (updated) | `governance/quality/agent-integrity/INTEGRITY_INDEX.md` | ✅ PRESENT |
| PREHANDOVER proof | `.agent-workspace/CodexAdvisor-agent/memory/PREHANDOVER-session-008-20260303.md` | ✅ PRESENT (this file) |
| Session memory | `.agent-workspace/CodexAdvisor-agent/memory/session-008-20260303.md` | ✅ PRESENT |
| Breach registry | `.agent-workspace/CodexAdvisor-agent/memory/breach-registry.md` | ✅ PRESENT |
| RCA document | `.agent-workspace/CodexAdvisor-agent/memory/rca-session-008-20260303.md` | ✅ PRESENT |

---

## IAA Trigger Classification

- **Category**: Agent contract update (`.github/agents/` + `governance/quality/agent-integrity/`)
- **IAA required**: YES — PR changes both agent contracts and integrity baselines
- **IAA invocation result**: PENDING — invocation being performed in session 009 per BREACH-001
  corrective action

---

## OPOJD Gate

| Check | Result | Note |
|-------|--------|------|
| YAML validation | ✅ PASS | All 4 agent YAML frontmatter valid (verified by python3 yaml.safe_load) |
| Character counts | ✅ PASS | All files within 30,000 char limit |
| Checklist compliance | ✅ PASS | All applicable harmonization changes are correct |
| Canon hash verification | ✅ PASS | All hashes are full 64-char SHA256 values |
| No placeholder/stub/TODO | ✅ PASS | No TODO or placeholder content in any file |
| No embedded Tier 2 content | ✅ PASS | job_environment and invocation rules are contract-level |
| No hardcoded version strings in phase body | ✅ PASS | Phase bodies read versions from YAML |

**OPOJD: PASS**

---

## CS2 Authorization Evidence

- Triggering issue #1288 opened by @APGI-cmy (Johan Ras)
- Issue explicitly assigns CodexAdvisor agent and describes the harmonization scope
- **CS2 authorization: CONFIRMED via triggering issue #1288**

---

## QP Verdict (applied to session 008 changes)

All four agent files passed YAML validation. Key structural checks:
- foreman-v2.agent.md: identity, iaa_oversight, tier2_knowledge blocks added ✅
- All files: job_environment blocks with can_invoke/cannot_invoke ✅
- Prohibitions structured as id/rule/enforcement objects (foreman) ✅
- Escalation structured as halt_conditions objects (foreman) ✅
- Integrity baselines updated consistently ✅

**QP VERDICT: PASS**

---

*CodexAdvisor-agent | Contract v3.2.0 | Session 008 (retroactive proof) | 2026-03-03*
