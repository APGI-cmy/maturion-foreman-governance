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
| `CodexAdvisor-agent.md` | `.github/agents/CodexAdvisor-agent.md` | `5227cdff9dab03ab801145a5b4cddb9bd8a9b88275953c1ffed0de8a49ec21c4` | 2026-03-02 | CS2 (ESC-002 follow-up — APGI-cmy/maturion-foreman-governance#1261, session-005-20260302) |
| `foreman-v2.agent.md` | `.github/agents/foreman-v2.agent.md` | `e180c3e5df2d19012f4b68de816d48d049a3d7f98ac4e45258213c03d1029681` | 2026-03-02 | pending CS2 approval — APGI-cmy/maturion-foreman-governance#1281 |
| `governance-repo-administrator-v2.agent.md` | `.github/agents/governance-repo-administrator-v2.agent.md` | `6db19cffb9bc0aff4c548577fd2148dd2c4a3d2e00812a1c8e5e4fa5a8207670` | 2026-03-02 | CS2 (ESC-002 follow-up — APGI-cmy/maturion-foreman-governance#1261, session-005-20260302) |
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

> **Atomic operation required**: All agent contract edits in `.github/agents/` MUST include a matching update to the reference copy and this index in the **same PR**. A PR that modifies an agent contract without also updating `INTEGRITY_INDEX.md` and the reference copy in `governance/quality/agent-integrity/` is invalid and will fail the IAA merge gate.

---

*Authority: CS2 (Johan Ras) | Governed by: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.0.0*
