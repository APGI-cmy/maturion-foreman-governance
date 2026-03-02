# REJECTION-PACKAGE

```
REJECTION-PACKAGE
PR: #1281
Date: 2026-03-02
IAA Session: IAA-20260302-PR1281
Phases:
  Phase 1 (Preflight): FAIL — No preflight-proof-1281.md exists on branch or in PR comments; all INV-101–INV-106 FAIL by artifact absence
  Phase 2 (Governance): FAIL — No governance-proof-1281.md exists; all INV-201–INV-207 FAIL by artifact absence; INV-207 ripple assessment absent
  Phase 3 (Working):   FAIL — No working-proof-1281.md exists; all INV-301–INV-307 FAIL by artifact absence; FAIL-ONLY-ONCE A-001 triggered (no prior IAA evidence in PR artifacts); FAIL-ONLY-ONCE A-015 triggered
  Phase 4 (Handover):  FAIL — No prehandover_proof_1281.md exists; INV-405 BLOCKING (gate parity absent); INV-409 conditional (PR not in draft ✅ but gate status pending, no handover proof to confirm); CS2 PR comment explicitly states TWO BLOCKING GAPS — DO NOT MERGE
Agent Integrity: CONDITIONAL PASS — SHA256 hashes consistent (c4a6711e... verified on all 4 agent files, no drift); reference copy matches; INTEGRITY_INDEX updated atomically; CS2 authorization cited via #1280. NOTED: INTEGRITY_INDEX "Updated By: CS2" attribution is premature — CS2 has explicitly blocked the PR with two gaps; CS2 final approval has not been granted for this specific content. Does not block token (hash integrity is valid on branch) but is recorded.
Independence: CONFIRMED — IAA (independent-assurance-agent) ≠ submitting agent (copilot-swe-agent / CodexAdvisor-agent workflow)
Verdict: MERGE BLOCKED
```

---

## Remediation Required

### REM-001 — Address CS2 GAP 1: Structural Architecture

**Finding**: CS2 commented at 17:32:02Z on the PR: "⛔ CS2 REJECT — TWO BLOCKING GAPS — DO NOT MERGE". GAP 1 requires the contract body to be restructured as a lean four-phase directive of ≤300–400 lines. Current file is 575 lines and still contains inline narrative that should reference Tier 3 canon files.

**Specific items CS2 requires removed from contract body**:
- Full POLC model explanation (Section 1.2) → replace with one-liner referencing `FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md`
- Verb-to-mode classification table inline (Section 1.6) → replace with reference to `ECOSYSTEM_VOCABULARY.md` and Tier 2 `phase3-qp-template.md`
- Mode-switching protocol detail for all three modes (Section 1.7) → replace with reference to `FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md`
- Reality Check Gate step-by-step (Sections 2.5.1–2.5.6) → replace with reference to `PRE_BUILD_REALITY_CHECK_CANON.md` and Tier 2 `phase2-induction-script.md`
- Phase 3 pre-wave agent availability inline checklist (Section 3.0) → replace with reference to `FOREMAN_PRE_WAVE_AGENT_AVAILABILITY_CHECK.md`

**Also required**: Change `id: foreman` → `id: foreman-v2-agent` in YAML frontmatter.

**Evidence required**: Updated foreman-v2.agent.md committed to branch with ≤300–400 lines. Updated SHA256 in INTEGRITY_INDEX.md and reference copy in governance/quality/agent-integrity/foreman-v2.agent.md.

---

### REM-002 — Create Full Evidence Bundle (AGCFPP-001 / FAIL-ONLY-ONCE A-001, A-015)

**Finding**: This PR modifies `.github/agents/foreman-v2.agent.md` — a protected agent contract file under AGCFPP-001. IAA invocation evidence + full evidence ceremony is mandatory before merge. The following artifacts are entirely absent:
- `.agent-admin/evidence/preflight-proof-1281.md` — MISSING
- `.agent-admin/evidence/governance-proof-1281.md` — MISSING
- `.agent-admin/evidence/working-proof-1281.md` — MISSING
- `.agent-workspace/foreman-v2/memory/session-NNN-20260302.md` — MISSING
- `.agent-admin/prehandover/prehandover_proof_1281.md` (or equivalent) — MISSING

**Evidence required**: All five artifacts above created, committed to the `copilot/reduce-contract-file-size` branch, and substantively populated (not boilerplate). Each artifact must pass INV-101–INV-106, INV-201–INV-207, INV-301–INV-307, INV-401–INV-409 respectively.

---

### REM-003 — Re-invoke IAA after Evidence Bundle and Structural Fix are Complete

**Finding**: IAA cannot issue ASSURANCE-TOKEN until REM-001 (structural architecture) and REM-002 (evidence bundle) are both fully resolved. The current invocation is the FIRST IAA invocation for PR #1281 — this is the initial REJECTION-PACKAGE.

**Evidence required**: After REM-001 and REM-002 are committed to branch, submit a new IAA invocation with the full PR category AGENT_CONTRACT + AGENT_INTEGRITY, citing this REJECTION-PACKAGE session IAA-20260302-PR1281, and confirming all remediation items are resolved.

---

### REM-004 — INTEGRITY_INDEX "Updated By" Attribution Premature

**Finding**: The INTEGRITY_INDEX on branch cites `Updated By: CS2 (contract size reduction — APGI-cmy/maturion-foreman-governance#1280, iaa_oversight added, HALT-001–007 added, Tier 2 extracted)`. CS2 has NOT granted final approval of this specific content — CS2 explicitly rejected the PR with two blocking gaps. The "Updated By: CS2" notation implies CS2 has approved the content, which is inaccurate at this time.

**Evidence required**: After structural changes per REM-001 are complete and CS2 grants final approval, the INTEGRITY_INDEX "Updated By" field should reflect the actual authorization state. Recommended format: `CS2 (authorized via issue #1280 — final content approved YYYY-MM-DD)` after CS2 explicitly approves the revised implementation.

*Note: This finding does not independently block the token — the hash integrity itself is valid on the branch. It is recorded as a process hygiene finding and must be addressed before final merge.*

---

## Re-entry Point

**Phase 1 — Step 1.1 — Preflight Proof creation** (submitting agent must re-enter at Phase 1, create full evidence bundle per REM-001 and REM-002, then re-invoke IAA)

**Correct sequence**:
1. Address CS2 GAP 1 structural architecture changes (REM-001)
2. Update INTEGRITY_INDEX and reference copy with new hash after structural changes
3. Create preflight-proof-1281.md → governance-proof-1281.md → working-proof-1281.md
4. Create session memory in foreman-v2 workspace
5. Create prehandover_proof_1281.md with gate parity check
6. Commit all artifacts to branch
7. Re-invoke IAA: `task(agent_type: "independent-assurance-agent")` with PR category AGENT_CONTRACT+AGENT_INTEGRITY
8. After IAA ASSURANCE-TOKEN: update prehandover proof with token (Step 4.3b ceremony)
9. Notify CS2 for final review

---

## Routed To

**GitHub Copilot (copilot-swe-agent) / CodexAdvisor-agent workflow** — acknowledgement required before resubmission

**Acknowledgement required**: Submitting agent must explicitly acknowledge receipt of this REJECTION-PACKAGE and confirm each remediation item (REM-001 through REM-004) before re-invoking IAA.

---

*Authority: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.0.0 | LIVING_AGENT_SYSTEM.md v6.2.0 | CS2 (Johan Ras)*  
*IAA Session: IAA-20260302-PR1281*  
*Issued: 2026-03-02*
