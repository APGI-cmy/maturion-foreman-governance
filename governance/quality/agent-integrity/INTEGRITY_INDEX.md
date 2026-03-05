# Agent Integrity Index

**Status**: CANONICAL | **Authority**: CS2 only  
**Date**: 2026-03-05  
**Maintained by**: IAA / CS2

---

## Purpose

SHA256 baseline index for all agent contract files held in this integrity store. The IAA uses this index to verify that live agent contract files have not been tampered with since their last CS2-approved update.

---

## Baseline Table

| Agent Contract | Authoritative Path | SHA256 (Baseline) | Last Updated | Updated By |
|---|---|---|---|---|
| `CodexAdvisor-agent.md` | `.github/agents/CodexAdvisor-agent.md` | `6dff0aa9b0d4f84a658c343b1e3317585d70f99046756a40389304a0c8590780` | 2026-03-03 | CS2 (harmonization — APGI-cmy/maturion-foreman-governance#1288 — builder provisions + job_environment propagation) |
| `foreman-v2.agent.md` | `.github/agents/foreman-v2.agent.md` | `3674310096874442cba50efc5c64a2cade625a3dfaa8f9c79ec59247b3e87c80` | 2026-03-05 | CodexAdvisor-agent session-011 / CS2 (ISMS alignment — secret_env_var, §4.3b, artifact_immutability, merge_gate_interface standard checks) |
| `governance-repo-administrator-v2.agent.md` | `.github/agents/governance-repo-administrator-v2.agent.md` | `fa9bead032866ad8589e3f3c65f6031128d098a719091598cdedcd4eaaf56148` | 2026-03-05 | CodexAdvisor-agent session-011 / CS2 (ISMS alignment — secret_env_var, §4.3b, artifact_immutability) |
| `independent-assurance-agent.md` | `.github/agents/independent-assurance-agent.md` | `aa87af39201aa87c76aa9b1ca067ad02730d060cec18af720303ca02fb2c10fd` | 2026-03-05 | CodexAdvisor-agent session-011 / CS2 (ISMS alignment — secret_env_var rename) |

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
