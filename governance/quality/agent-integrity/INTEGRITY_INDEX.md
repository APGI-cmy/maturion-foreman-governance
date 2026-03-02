# Agent Integrity Index

**Status**: CANONICAL | **Authority**: CS2 only  
**Date**: 2026-03-02  
**Maintained by**: IAA / CS2

---

## Purpose

SHA256 baseline index for all agent contract files held in this integrity store. The IAA uses this index to verify that live agent contract files have not been tampered with since their last CS2-approved update.

---

## Baseline Table

| Agent Contract | Authoritative Path | SHA256 (Baseline) | Last Updated | Updated By |
|---|---|---|---|---|
| `CodexAdvisor-agent.md` | `.github/agents/CodexAdvisor-agent.md` | `fc5ff12aba9a3822cacb13218d1c7583559d0564ff8e4aaee60240475fc39792` | 2026-03-02 | CS2 (ESC-002 follow-up — APGI-cmy/maturion-foreman-governance#1261, session-005-20260302) |
| `foreman-v2.agent.md` | `.github/agents/foreman-v2.agent.md` | `817eb9f674c1b57aad9cf873d9e7fd9c159ca9e6e5eba833f6e1694c289eee2e` | 2026-03-02 | CS2 (ESC-002 follow-up — APGI-cmy/maturion-foreman-governance#1261, session-005-20260302) |
| `governance-repo-administrator-v2.agent.md` | `.github/agents/governance-repo-administrator-v2.agent.md` | `7b711ccdd85d122719ef162ce6e84e9c4775a42ebddbad2912fd43ce38390067` | 2026-03-02 | CS2 (ESC-002 follow-up — APGI-cmy/maturion-foreman-governance#1261, session-005-20260302) |
| `independent-assurance-agent.md` | `.github/agents/independent-assurance-agent.md` | `5580e2c4281366f5a4cddeebc9f7a9dbb715b11be8d83664d4d7823301313977` | 2026-03-02 | CS2 (authorized via issue: APGI-cmy/maturion-foreman-governance#1257 — GOV-IAA upgrade to v2.0.0) |

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

---

*Authority: CS2 (Johan Ras) | Governed by: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.0.0*
