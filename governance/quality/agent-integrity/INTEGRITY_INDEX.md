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
| `CodexAdvisor-agent.md` | `.github/agents/CodexAdvisor-agent.md` | `6dff0aa9b0d4f84a658c343b1e3317585d70f99046756a40389304a0c8590780` | 2026-03-03 | CS2 (harmonization — APGI-cmy/maturion-foreman-governance#1288 — builder provisions + job_environment propagation) |
| `foreman-v2.agent.md` | `.github/agents/foreman-v2.agent.md` | `e601482d5409adaa40416e779bb1dd0214a0904ef826cc9a4c1959d7112dd070` | 2026-03-03 | CS2 (harmonization — APGI-cmy/maturion-foreman-governance#1288 — builder-class invocation rules + structured halt_conditions) |
| `governance-repo-administrator-v2.agent.md` | `.github/agents/governance-repo-administrator-v2.agent.md` | `80579a0ca49164a027ff99408d428c54105a6ba5b847f2514a261dc7189bac12` | 2026-03-03 | CS2 (harmonization — APGI-cmy/maturion-foreman-governance#1288 — job_environment propagation) |
| `independent-assurance-agent.md` | `.github/agents/independent-assurance-agent.md` | `46529935af1543393bba0f71bca85060e2be54ce60a2d6ee6b9cb6db0e298a28` | 2026-03-03 | CS2 (harmonization — APGI-cmy/maturion-foreman-governance#1288 — job_environment propagation) |

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
