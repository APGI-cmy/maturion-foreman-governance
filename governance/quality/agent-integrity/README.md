# Agent Integrity Reference Store

**Status**: CANONICAL | **Authority**: CS2 only  
**Date**: 2026-02-24

---

## Purpose

This folder is the **canonical single source of truth** for all agent contract files within the Living Agent System v6.2.0. It holds CS2-approved reference copies of every active agent contract file.

The Independent Assurance Agent (IAA) uses this store to verify file integrity: it computes SHA256 of each agent contract in the repository and compares against the reference copies here. Any divergence triggers a `REJECTION-PACKAGE`.

---

## Amendment Authority

> ⚠️ **Only CS2 (Johan Ras / repo owner) may update files in this folder.**

Any PR that modifies files in `governance/quality/agent-integrity/` without explicit CS2 sign-off is **automatically FAIL** at the IAA merge gate. This is enforced by:

1. The `iaa-assurance-check` job in `.github/workflows/merge-gate-interface.yml`
2. The IAA agent per `governance/canon/INDEPENDENT_ASSURANCE_AGENT_CANON.md`

There is no exception path below CS2 level.

---

## Contents

| File | Description |
|------|-------------|
| `README.md` | This file — purpose and authority |
| `INTEGRITY_INDEX.md` | SHA256 baseline index for all reference agent files |
| `CodexAdvisor-agent.md` | Reference copy of the CodexAdvisor agent contract |
| `foreman-v2.agent.md` | Reference copy of the Foreman v2 agent contract |
| `governance-repo-administrator-v2.agent.md` | Reference copy of the Governance Repository Administrator v2 agent contract |

---

## How to Use (IAA Verification)

1. Load `INTEGRITY_INDEX.md` to get the canonical SHA256 baseline for each file
2. Compute `sha256sum` of the live agent file at its authoritative path (e.g. `.github/agents/foreman-v2.agent.md`)
3. Compare computed hash against the index baseline
4. If hashes match → integrity PASS for that file
5. If hashes differ → integrity FAIL → issue `REJECTION-PACKAGE`

---

## How to Update (CS2 Only)

1. Obtain CS2 explicit written approval (issue or PR comment from Johan Ras)
2. Update the reference file(s) with the new approved version
3. Recompute SHA256 and update `INTEGRITY_INDEX.md`
4. Reference the CS2 approval in the PR description
5. The IAA verifies the CS2 sign-off as part of its gate check

---

*Authority: CS2 (Johan Ras) | Governed by: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.0.0*
