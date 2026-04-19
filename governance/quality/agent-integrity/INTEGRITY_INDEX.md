# Agent Integrity Index

**Status**: CANONICAL | **Authority**: CS2 only  
**Date**: 2026-04-19  
**Maintained by**: IAA / CS2

---

## Purpose

SHA256 baseline index for all agent contract files held in this integrity store. The IAA uses this index to verify that live agent contract files have not been tampered with since their last CS2-approved update.

---

## Baseline Table

| Agent Contract | Authoritative Path | SHA256 (Baseline) | Last Updated | Updated By |
|---|---|---|---|---|
| `CodexAdvisor-agent.md` | `.github/agents/CodexAdvisor-agent.md` | `bcc12cb03e1a67d8bf0d14a9dca53042d7a07e285d3b929d350454c02fa1ae6f` | 2026-04-08 | Copilot (PHASE_B_BLOCKING + Pre-IAA Commit-State Gate §4.3c — Harden pre-IAA handover discipline — Step 4.3c commit-state gate added; advisory_phase PHASE_A_ADVISORY→PHASE_B_BLOCKING) |
| `foreman-v2.agent.md` | `.github/agents/foreman-v2.agent.md` | `675b63482e2bdc44eca10bf13cdb3e5d739d6bbad7acd4b17531c452461934ae` | 2026-04-19 | CodexAdvisor session-013 (v3.0.1: Remove 5 excess canon-ref entries from metadata — was 11 entries, platform limit is 10; fixes "Invalid config: metadata has more than 10 entries" load failure; agent.contract_version synced to 3.0.1) |
| `governance-repo-administrator-v2.agent.md` | `.github/agents/governance-repo-administrator-v2.agent.md` | `55b87adf5794ceba832051caa3113fb01de0ea6ad8e21f8e4d12368ee585b961` | 2026-04-08 | Copilot (PHASE_B_BLOCKING — Harden pre-IAA handover discipline — advisory_phase PHASE_A_ADVISORY→PHASE_B_BLOCKING) |
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
