# Escalation — INV-504: CodexAdvisor-agent.md Integrity Drift (CS2 Action Required)

**Type**: INTEGRITY_DRIFT_ESCALATION  
**Priority**: GA_H  
**Date**: 2026-04-09  
**Session**: session-GA-067-20260409  
**Raised By**: governance-repo-administrator-v2 (per IAA REJECTION-PACKAGE IAA-20260409-PR-ECAP-QC)  
**Raised For**: CS2 (Johan Ras / @APGI-cmy)

## Description

The IAA flagged an integrity drift for `CodexAdvisor-agent.md` during the ECAP-QC PR assurance check (IAA-20260409-PR-ECAP-QC). The drift was introduced by CS2 commit `f5b6114` (2026-04-09 08:45 UTC+2, "Update CodexAdvisor-agent.md") which updated the live file but did NOT update `governance/quality/agent-integrity/INTEGRITY_INDEX.md`.

This is classified as a **pre-existing, CS2-introduced drift** — the submitting agent (governance-repo-administrator-v2) did NOT introduce this drift (no `.github/agents/` changes in this PR per Rule B-06).

## Technical Details

| Field | Value |
|-------|-------|
| **File** | `.github/agents/CodexAdvisor-agent.md` |
| **Baseline hash (INTEGRITY_INDEX.md)** | `628850b3cafa24041564c660958f9da288c73c5b4677c5d4d4c692a375ff7aa6` |
| **Actual live hash** | `a6aee49152e6fe9f01b992df73790b12406cf5604d54f5af26d1a31e1bd2996c` |
| **Introducing commit** | `f5b6114` — "Update CodexAdvisor-agent.md" (2026-04-09) |
| **IAA Finding** | INV-504 — REJECTION-PACKAGE per ESC-002 (integrity drift escalation protocol) |
| **Prior occurrence** | ESC-018 (2026-03-21) — same drift pattern, previously resolved in session-025 |

## Required CS2 Action

CS2 must update `governance/quality/agent-integrity/INTEGRITY_INDEX.md`:
- Change `CodexAdvisor-agent.md` baseline hash from `628850b3...` to `a6aee491...`
- (Or confirm the authoritative hash by running `sha256sum .github/agents/CodexAdvisor-agent.md` against the current main branch state)

## Impact

Until this is resolved, IAA will continue issuing REJECTION-PACKAGEs on any PR it reviews (regardless of submitting agent) due to the persistent integrity mismatch. This blocks all governed PR reviews.

Per IAA note: "CS2 must establish an atomic update protocol: ANY commit to `.github/agents/` MUST include a synchronous update to `INTEGRITY_INDEX.md`."

## Pattern Note

This is the **2nd occurrence** of this specific drift pattern (ESC-018 was the first, 2026-03-21). IAA recommends a merge gate or commit hook that verifies live SHA256 == INTEGRITY_INDEX baseline for all 4 agent files to eliminate this class permanently.

---
Authority: FAIL-ONLY-ONCE.md — A-03; IAA REJECTION-PACKAGE IAA-20260409-PR-ECAP-QC Finding F1  
Generated: 2026-04-09  
Agent: governance-repo-administrator-v2
