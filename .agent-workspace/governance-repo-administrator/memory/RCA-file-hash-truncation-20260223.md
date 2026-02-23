# RCA — Truncated `file_hash` in CANON_INVENTORY.json

**RCA ID**: RCA-HASH-TRUNC-001  
**Date**: 2026-02-23  
**Agent**: governance-repo-administrator  
**Severity**: HIGH — integrity defect that triggers degraded-mode in all governance tooling  
**Session**: 047  
**PR**: #1184 (branch: copilot/canonize-aimc-strategy)

---

## 1. Summary

The `file_hash` field for the newly added `AIMC_STRATEGY.md` entry in `governance/CANON_INVENTORY.json` was set to a truncated 12-character value (`dfe539fe2901`) instead of the required full 64-character SHA256 (`dfe539fe290148e6e7c9112fa269b5cd0124c456954de1d75c9a7870cd79b2dc`). This constitutes a HIGH-severity integrity defect as the CANON_INVENTORY hash validation tooling requires the full SHA256 to perform alignment gate checks, and a truncated hash would trigger degraded-mode for all governance consumers.

---

## 2. Scope

**In-scope for this RCA**: The new AIMC_STRATEGY.md entry added in session-047 / PR #1184.

**Out-of-scope (separate remediation)**: The systemic pattern of truncated `file_hash` values across the existing 177 prior entries in `governance/CANON_INVENTORY.json`. That defect requires a dedicated CS2-authorized session and is tracked separately.

---

## 3. Root Cause

**Primary cause**: The agent (governance-repo-administrator, session-047) computed a hash summary and used a truncated rendering of the SHA256 value for the `file_hash` field, while correctly populating the companion `file_hash_sha256` field with the full 64-character value. The two fields are expected to be identical per REQ-CM-001.

**Contributing factors**:
- No automated pre-handover gate validates `file_hash` field length (should be exactly 64 hex characters).
- The agent contract (governance-repo-administrator-v2.agent.md) does not include an explicit PREHANDOVER check step for `file_hash` field length equality with `file_hash_sha256`.
- The CANON_INVENTORY.json schema does not enforce a `minLength: 64` constraint on the `file_hash` field.

---

## 4. Impact

| Impact Area | Detail |
|-------------|--------|
| Alignment gate | Would report DEGRADED for AIMC_STRATEGY.md entry (hash < 64 chars triggers degraded-mode per REQ-SS-004) |
| Consumer repos | Any consumer performing hash validation against CANON_INVENTORY would see a mismatch |
| Audit trail | CANON_INVENTORY integrity check would fail, producing false governance alerts |
| Severity | HIGH — directly violates REQ-CM-001 (full sha256 required, refuse merge if placeholders remain) |

---

## 5. Fix Applied

| File | Change |
|------|--------|
| `governance/CANON_INVENTORY.json` | `file_hash` for `AIMC_STRATEGY.md` corrected from `dfe539fe2901` (12 chars) to `dfe539fe290148e6e7c9112fa269b5cd0124c456954de1d75c9a7870cd79b2dc` (64 chars) |
| `governance/CANON_INVENTORY.json` | Trailing newline (EOF) added |
| `maturion/strategy/Maturion_AI_Scaling_Strategy.md` | Scope clarification note added at top to reference AIMC_STRATEGY.md canon for runtime routing |

---

## 6. Preventive Actions

**Short-term (this session)**:
- CANON-HASH-001 gate proposed: Add mandatory `file_hash` length validation (== 64 chars) to PREHANDOVER checklist
- Logged in `.agent-workspace/parking-station/suggestions-log.md` for governance promotion

**Medium-term (requires CS2 authorization)**:
- Promote CANON-HASH-001 to agent contract: governance-repo-administrator-v2.agent.md must include explicit PREHANDOVER step: `assert len(file_hash) == 64 and file_hash == file_hash_sha256`
- Add `minLength: 64` constraint to CANON_INVENTORY.json schema
- Remediate existing 177 truncated `file_hash` entries in a dedicated CS2-authorized session

**Long-term**:
- CI/CD alignment gate should validate all `file_hash` fields are 64 characters and match `file_hash_sha256`
- Pre-commit hook should warn when `file_hash` != `file_hash_sha256`

---

## 7. Lessons for Future Sessions

- Always verify `file_hash == file_hash_sha256` (full 64-char equality) before committing any CANON_INVENTORY.json change
- PREHANDOVER proof must explicitly assert hash field lengths
- The existence of a separate `file_hash_sha256` field alongside `file_hash` is a code smell — they should either be unified or schema-enforced equal

---

Authority: LIVING_AGENT_SYSTEM.md v6.2.0 | RCA: RCA-HASH-TRUNC-001 | Session: 047
