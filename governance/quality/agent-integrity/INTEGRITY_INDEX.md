# Agent Integrity Index

**Status**: CANONICAL | **Authority**: CS2 only  
**Date**: 2026-03-21  
**Maintained by**: IAA / CS2

---

## Purpose

SHA256 baseline index for all agent contract files held in this integrity store. The IAA uses this index to verify that live agent contract files have not been tampered with since their last CS2-approved update.

---

## Baseline Table

| Agent Contract | Authoritative Path | SHA256 (Baseline) | Last Updated | Updated By |
|---|---|---|---|---|
| `CodexAdvisor-agent.md` | `.github/agents/CodexAdvisor-agent.md` | `f928b2a735af4db49e369800cbe21d00362111e6c2f8e38cceddd6be960e5183` | 2026-03-21 | Copilot (IAA pre-brief protocol upgrades — APGI-cmy/maturion-foreman-governance#issue — Step 3.2 trigger table live; IAA_PRE_BRIEF_PROTOCOL.md Tier 2 reference added; contract footer v3.4.0 parity fix) |
| `foreman-v2.agent.md` | `.github/agents/foreman-v2.agent.md` | `50cf9dd930d32db503112c1a0ea96d7d055d79675c6fef171ab97207f3a4c920` | 2026-03-03 | CS2 (IAA Pre-Brief Protocol — APGI-cmy/maturion-foreman-governance#1294 — sections 3.0a/3.0b + wave_checklist PREHANDOVER field) |
| `governance-repo-administrator-v2.agent.md` | `.github/agents/governance-repo-administrator-v2.agent.md` | `ebb8ce29deea054ee98386850764ae7c89ae5ea20fbbdeac1ee0cae494b60254` | 2026-04-05 | Copilot (OVF-002 pre-IAA commit check — APGI-cmy/maturion-foreman-governance#1319 — Phase 4.5 Step 4.5.0 pre-IAA commit state check added; IAA_PRE_BRIEF_PROTOCOL.md reference updated v1.1.0→v1.2.0; FAIL-ONLY-ONCE Rules A-10, B-07 added) |
| `independent-assurance-agent.md` | `.github/agents/independent-assurance-agent.md` | `0d414fd2d059fbda8ed8a2bab42fc4698674d893d45ea954d92d0f940165b8ac` | 2026-03-03 | CS2 (IAA Pre-Brief Protocol — APGI-cmy/maturion-foreman-governance#1294 — Step 2.4 Wave Checklist Invocation Gate + Step 3.5 Pre-Brief cross-reference) |

---

## Verification Command

```bash
# Verify all agent contract files against this index
sha256sum .github/agents/CodexAdvisor-agent.md \
          .github/agents/foreman-v2.agent.md \
          .github/agents/governance-repo-administrator-v2.agent.md \
          .github/agents/independent-assurance-agent.md
```

Compare output against baseline table above. Any mismatch is an integrity violation.

---

## Update Protocol (CS2 Only)

When a CS2-approved agent contract update is merged:

1. Copy updated file to `governance/quality/agent-integrity/<filename>`
2. Recompute `sha256sum .github/agents/<filename>`
3. Update the SHA256 in this table
4. Update the `Last Updated` date and `Updated By` field
5. Reference the approval PR/issue number in the PR description

> **Atomic operation required**: All agent contract edits in `.github/agents/` MUST include a matching update to the reference copy and this index in the **same PR**. A PR that modifies an agent contract without also updating `INTEGRITY_INDEX.md` and the reference copy in `governance/quality/agent-integrity/` is invalid and will fail the IAA merge gate.

---

*Authority: CS2 (Johan Ras) | Governed by: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.1.0*
