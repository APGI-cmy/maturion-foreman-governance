# Escalation — OVF-003 — SCOPE_DECLARATION Staleness 4th Occurrence — CS2 Promotion Required

**Escalation ID**: rejection-tracking-1320-20260405  
**Date**: 2026-04-05  
**Source**: IAA Session 028 (IAA-20260405-PR1320) — REJECTION-PACKAGE R0 F3  
**Pattern**: SCOPE_DECLARATION.md staleness — 4th occurrence (OVF-003 threshold met)

---

## Pattern History

| PR | Occurrence | IAA Session |
|----|-----------|-------------|
| #1315 | 1st | session-022 / ESC-019 |
| #1317 | 2nd | session-022–025 |
| #1319 | 3rd | session-026–027 |
| #1320 | 4th | session-028 |

---

## OVF-003 Requirement

Per OVF-003, a 4th occurrence constitutes a systemic pattern requiring CS2 escalation for formal FAIL-ONLY-ONCE promotion. IAA session 028 has formally flagged this escalation.

---

## Proposed Rule

**GA A-11** (proposed): "Regenerate SCOPE_DECLARATION.md from `git diff --name-only origin/main...HEAD` as the absolute last action before invoking IAA. SCOPE_DECLARATION.md must reflect the current PR branch, not a prior PR. Failure to regenerate SCOPE_DECLARATION.md before IAA invocation is a FAIL-ONLY-ONCE violation."

---

## Status

PENDING CS2 REVIEW — awaiting Johan Ras / CS2 decision on whether to promote to formal FAIL-ONLY-ONCE rule.

---

**Filed by**: governance-repo-administrator-v2  
**Date**: 2026-04-05
