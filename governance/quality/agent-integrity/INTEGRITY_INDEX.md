# Agent Integrity Index

**Status**: CANONICAL | **Authority**: CS2 only  
**Date**: 2026-03-03  
**Maintained by**: IAA / CS2

---

## Purpose

SHA256 baseline index for all agent contract files held in this integrity store. The IAA uses this index to verify that live agent contract files have not been tampered with since their last CS2-approved update.

---

## Baseline Table

| Agent Contract | Authoritative Path | SHA256 (Baseline) | Last Updated | Updated By |
|---|---|---|---|---|
| `CodexAdvisor-agent.md` | `.github/agents/CodexAdvisor-agent.md` | `b9bf079e63a0e5a39ee6f194978f7bba114a9e96d9616a47879ddca4164f9052` | 2026-03-03 | CS2 (secret field: `secret:` → `secret_env_var:` — APGI-cmy/maturion-foreman-governance#1290) |
| `foreman-v2.agent.md` | `.github/agents/foreman-v2.agent.md` | `3b9b1c7d55c30b2a71dffb1dcd041e03ace33c1d19536ada2cf8a525e40d9e2c` | 2026-03-03 | CS2 (secret field: `secret:` → `secret_env_var:` — APGI-cmy/maturion-foreman-governance#1290) |
| `governance-repo-administrator-v2.agent.md` | `.github/agents/governance-repo-administrator-v2.agent.md` | `b8948fb55b73c38aa18ad925a64871717f8cfd8f82b32e8fa575998f7efba4eb` | 2026-03-03 | CS2 (secret field: `secret:` → `secret_env_var:` — APGI-cmy/maturion-foreman-governance#1290) |
| `independent-assurance-agent.md` | `.github/agents/independent-assurance-agent.md` | `12bf021a48115662ef633b9083f0b071bb168665e121447d5906da855514b5aa` | 2026-03-03 | CS2 (secret field: `secret: "[REDACTED]"` → `secret_env_var: "MATURION_BOT_TOKEN"` — APGI-cmy/maturion-foreman-governance#1290) |

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

*Authority: CS2 (Johan Ras) | Governed by: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.0.0*
