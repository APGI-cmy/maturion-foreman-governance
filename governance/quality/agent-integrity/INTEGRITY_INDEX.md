# Agent Integrity Index

**Status**: CANONICAL | **Authority**: CS2 only  
**Date**: 2026-02-24  
**Maintained by**: IAA / CS2

---

## Purpose

SHA256 baseline index for all agent contract files held in this integrity store. The IAA uses this index to verify that live agent contract files have not been tampered with since their last CS2-approved update.

---

## Baseline Table

| Agent Contract | Authoritative Path | SHA256 (Baseline) | Last Updated | Updated By |
|---|---|---|---|---|
| `CodexAdvisor-agent.md` | `.github/agents/CodexAdvisor-agent.md` | `e2d75dd7d59b8064bbb44dec419062ea77bdf760bf6b4dcbaa71000d104cfb5d` | 2026-02-24 | CS2 (initial baseline) |
| `foreman-v2.agent.md` | `.github/agents/foreman-v2.agent.md` | `5d9851a2b3e75ea0a488501c2fe836ae6301332af9df7ea9b71a9181062a0307` | 2026-02-24 | CS2 (initial baseline) |
| `governance-repo-administrator-v2.agent.md` | `.github/agents/governance-repo-administrator-v2.agent.md` | `4caa3d447a99c20bcdfad342d3645a7d285ee0a7d5be067e49ebdd4f2260105b` | 2026-02-24 | CS2 (initial baseline) |

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

---

*Authority: CS2 (Johan Ras) | Governed by: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.0.0*
