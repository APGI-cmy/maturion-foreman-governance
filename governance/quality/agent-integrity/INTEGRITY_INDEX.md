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
| `CodexAdvisor-agent.md` | `.github/agents/CodexAdvisor-agent.md` | `fc5ff12aba9a3822cacb13218d1c7583559d0564ff8e4aaee60240475fc39792` | 2026-03-02 | CS2 (ESC-002 correction — issue #1256) |
| `foreman-v2.agent.md` | `.github/agents/foreman-v2.agent.md` | `817eb9f674c1b57aad9cf873d9e7fd9c159ca9e6e5eba833f6e1694c289eee2e` | 2026-03-02 | CS2 (ESC-002 correction — issue #1256) |
| `governance-repo-administrator-v2.agent.md` | `.github/agents/governance-repo-administrator-v2.agent.md` | `7b711ccdd85d122719ef162ce6e84e9c4775a42ebddbad2912fd43ce38390067` | 2026-03-02 | CS2 (ESC-002 correction — issue #1256) |

---

## Verification Command

```bash
# Verify all agent contract files against this index
sha256sum .github/agents/CodexAdvisor-agent.md \
          .github/agents/foreman-v2.agent.md \
          .github/agents/governance-repo-administrator-v2.agent.md
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

*Authority: CS2 (Johan Ras) | Governed by: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.0.0*
