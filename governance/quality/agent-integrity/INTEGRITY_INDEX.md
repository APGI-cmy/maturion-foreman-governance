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
| `foreman-v2.agent.md` | `.github/agents/foreman-v2.agent.md` | `232a5d39dd9a7f01e35a3ba71b3dbea4de42fa58808c8e2e44201f2bd6339126` | 2026-09-03 | CodexAdvisor session-017 / Issue #1388 (v3.0.2: final IAA rejection branch requires sandbox classification, Foreman stop-and-fix, and final IAA PASS before progression.) |
| `governance-repo-administrator-v2.agent.md` | `.github/agents/governance-repo-administrator-v2.agent.md` | `55b87adf5794ceba832051caa3113fb01de0ea6ad8e21f8e4d12368ee585b961` | 2026-04-08 | Copilot (PHASE_B_BLOCKING — Harden pre-IAA handover discipline — advisory_phase PHASE_A_ADVISORY→PHASE_B_BLOCKING) |
| `independent-assurance-agent.md` | `.github/agents/independent-assurance-agent.md` | `0d414fd2d059fbda8ed8a2bab42fc4698674d893d45ea954d92d0f940165b8ac` | 2026-03-03 | CS2 (IAA Pre-Brief Protocol — APGI-cmy/maturion-foreman-governance#1294 — Step 2.4 Wave Checklist Invocation Gate + Step 3.5 Pre-Brief cross-reference) |
| `execution-ceremony-admin-agent.md` | `.github/agents/execution-ceremony-admin-agent.md` | `d6614f8adadc8ab20bce88d719d48e92b0982d16d322815ad6341f7797445383` | 2026-09-04 | CodexAdvisor-agent (CS2 Issue #1396; static administrative foundation) |

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
