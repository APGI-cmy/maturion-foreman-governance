# REJECTION-PACKAGE — PR #1275

```
REJECTION-PACKAGE
PR: #1275
Date: 2026-03-02
IAA Session: IAA-20260302-PR1275 (session-006)
Phases:
  Phase 1 (Preflight): PASS — GA preflight complete; FAIL-ONLY-ONCE attested; canon loaded; no violations
  Phase 2 (Governance): PASS — CANON_INVENTORY valid; no placeholder hashes; ripple assessment present
  Phase 3 (Working): FAIL — OVL-KG-003: index.md (v1.4.0) lacks ## Version History section
  Phase 4 (Handover): PASS — PREHANDOVER proof complete; gate parity acceptable for KNOWLEDGE_GOVERNANCE category
Agent Integrity: PASS — All 4 agent SHA256 hashes match INTEGRITY_INDEX baselines exactly
Independence: CONFIRMED — governance-repo-administrator-v2 ≠ independent-assurance-agent; no structural conflict
Verdict: MERGE BLOCKED

Remediation Required:
  1. [OVL-KG-003] Add a `## Version History` section to
     `.agent-workspace/independent-assurance-agent/knowledge/index.md`
     with at minimum an entry for v1.4.0 (date: 2026-03-02, change description:
     "Added session-memory-template.md entry; updated file version table to reflect
     v2.3.0/v2.2.0/v2.1.0 canonical sync; added KNOWLEDGE_GOVERNANCE trigger in IAA
     Trigger Summary; added A-015/A-020 to FAIL-ONLY-ONCE Active Rules table").
     Include any earlier version entries (v1.3.0, etc.) if available from the
     canonical source (maturion-isms). This section is mandatory — it is present in
     all other Tier 2 knowledge files and required by OVL-KG-003.

  2. [PREHANDOVER proof correction] Correct the false claim in the PREHANDOVER proof
     that states "All 4 updated files contain version history tables with entries for
     the new versions ✅". After adding the version history table to index.md in
     item 1 above, this claim will become accurate. No structural evidence bundle
     change is needed beyond items 1 and 2 together.

Re-entry Point: Phase 3 — Step 3.4 (Working Phase Proof review) — submitting agent must
re-enter at this step after fixing index.md and updating PREHANDOVER proof claim.

Routed To: governance-repo-administrator-v2 — acknowledgement required before resubmission.
```

---

## Detailed Findings

### OVL-KG-003 — Version History Table Missing from index.md

**Check**: Every modified Tier 2 knowledge file's version history table includes an entry for the new version with date and change description. Missing or stale version history = REJECTION-PACKAGE.

**Finding**: `index.md` was updated from v1.2.0 to v1.4.0 (canonical sync). The file contains no `## Version History` section. This was confirmed by:
- `grep -n -i "version history\|## Version"` returning exit code 1 (no match) for index.md
- Full review of all 102 lines of index.md confirming the absence
- Comparison with the other 3 updated files: iaa-category-overlays.md (version history at line 114), iaa-core-invariants-checklist.md (version history at line 108), iaa-trigger-table.md (version history at line 78)

**PREHANDOVER proof claim**: "All 4 updated files contain version history tables with entries for the new versions ✅" — this claim is **factually incorrect** for index.md.

**Fix required**: Add `## Version History` section to index.md with entries documenting at minimum v1.4.0 (and any intermediate versions if available from maturion-isms canonical source).

---

## Session Evidence

| Check | Result |
|-------|--------|
| CORE-005 | PASS |
| CORE-006 | PASS |
| CORE-007 | PASS (PENDING carve-out applied) |
| CORE-013 | PASS |
| CORE-014 | PASS |
| CORE-015 | PASS |
| CORE-016 | PASS (PENDING mid-ceremony state) |
| CORE-017 | PASS |
| CORE-018 | PASS |
| CORE-019 | PASS/N/A (token PENDING) |
| CORE-020 | Applied — OVL-KG-003 failure propagated |
| OVL-KG-001 | PASS |
| OVL-KG-002 | PASS |
| OVL-KG-003 | **FAIL** — index.md missing version history table |
| OVL-KG-004 | PASS |
| OVL-KG-005 | PASS |
| Agent Integrity | PASS — all 4 SHA256 hashes match |
| Independence | CONFIRMED |

---

*Authority: independent-assurance-agent | Session: IAA-20260302-PR1275 | Contract: v2.0.0*
*Routed to: governance-repo-administrator-v2 — acknowledgement required before resubmission*
