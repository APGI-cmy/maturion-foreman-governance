# REJECTION-PACKAGE
**PR**: #1289 — Harmonize agent contract files with canonical patterns: builder invocation for Foreman, job_environment propagation
**Date**: 2026-03-03
**IAA Session**: IAA-20260303-PR1289
**Submitting Agent**: CodexAdvisor-agent (session-008-20260303 + session-009-20260303 corrective)
**Branch**: copilot/harmonize-agent-contract-files
**Authority**: CS2 (Johan Ras / @APGI-cmy)

---

## Verdict

```
REJECTION-PACKAGE
PR: #1289
Date: 2026-03-03
IAA Session: IAA-20260303-PR1289
Phases:
  Phase 1 (Preflight):  FAIL — No preflight proof artifact; FAIL-ONLY-ONCE attestation absent;
                               BREACH-001 proves check was not done before work began.
  Phase 2 (Governance): FAIL — No governance proof at standard location; canon version numbers
                               not cited; GATE_REQUIREMENTS_INDEX.json not referenced.
  Phase 3 (Working):    FAIL — No working proof at standard location; design decisions absent;
                               risk section absent.
  Phase 4 (Handover):   FAIL — PREHANDOVER proof at wrong location; gate parity self-assessed
                               (not run); open blocker BREACH-001 not closed; CHANGELOG not
                               addressed; PR in DRAFT state (BLOCKING).
Agent Integrity:        PASS — All 4/4 SHA256 hashes match INTEGRITY_INDEX baselines.
Independence:           CONFIRMED — IAA ≠ CodexAdvisor-agent.
Verdict: MERGE BLOCKED
```

---

## Remediation Required

### REM-001 (BLOCKING) — PR Draft State (INV-409)

**Finding**: PR #1289 is in DRAFT state (`isDraft: true`). GitHub API confirms `mergeable_state: unstable`.

**Remediation**: CS2 (@APGI-cmy) must execute `gh pr ready 1289` to mark the PR as ready for review before IAA resubmission. This is the same tooling constraint documented in IAA sessions 006–008 for PR #1273 (copilot-swe-agent sandbox cannot execute `gh pr ready`). Do not resubmit for IAA until CS2 has confirmed the PR is no longer in draft state.

---

### REM-002 (BLOCKING) — Gate Parity Check Not Evidenced (INV-405)

**Finding**: The handover artifacts contain only a self-assessed `merge_gate_parity: PASS` in the session memory. The three standard gate checks (`Merge Gate Interface / merge-gate/verdict`, `Merge Gate Interface / governance/alignment`, `Merge Gate Interface / stop-and-fix/enforcement`) have not been run and documented with actual results.

**Remediation**: Run the gate parity check (`.github/scripts/` gate scripts or equivalent) and record all three gate results in the PREHANDOVER proof. Required format:
```
Gate parity:
  merge-gate/verdict:        PASS (or FAIL + reason)
  governance/alignment:      PASS (or FAIL + reason)
  stop-and-fix/enforcement:  PASS (or FAIL + reason)
Overall gate parity: PASS
```
If gates cannot be run in the copilot-swe-agent sandbox, document this constraint explicitly and request CS2 to verify gate state independently.

---

### REM-003 — PREHANDOVER Proof at Wrong Location + Missing Content (INV-401, INV-101, INV-201, INV-301)

**Finding**: The PREHANDOVER proof is at `.agent-workspace/CodexAdvisor-agent/memory/PREHANDOVER-session-008-20260303.md`. The required location is `.agent-admin/prehandover/prehandover_proof_<descriptor>_<date>.md`. No standard phase proof files exist at `.agent-admin/evidence/`. The merge gate automation reads from `.agent-admin/prehandover/`.

Additionally, the PREHANDOVER proof is missing content required by Phases 1–4:
- Phase 1 content absent: FAIL-ONLY-ONCE attestation result, Tier 1+2 knowledge load list with file names, constraints/limitations section
- Phase 2 content absent: Canon version citations, GATE_REQUIREMENTS_INDEX.json gate requirements reference
- Phase 3 content absent: Design decisions with "why" rationale for structural choices (e.g., halt_conditions format, job_environment structure), risk/follow-up section

**Remediation**: Create a comprehensive PREHANDOVER proof at:
`.agent-admin/prehandover/prehandover_proof_HARMONIZE_1289_20260303.md`

This file must include:
1. **Phase 1 section**: FAIL-ONLY-ONCE attestation (`FAIL-ONLY-ONCE: ATTESTED — [rules reviewed] — CLEAR`), Tier 1 knowledge loaded (list files with versions), Tier 2 knowledge loaded (list files), constraints/limitations (at minimum: "Retroactive proof — session-008 incurred BREACH-001; see rca-session-008-20260303.md")
2. **Phase 2 section**: Canon version citations, GATE_REQUIREMENTS_INDEX.json applicable requirements cited, hash verification stated, CS2 authorization cited
3. **Phase 3 section**: Design decisions (e.g., "halt_conditions chosen over escalation: aligns with PR #1287 canonical pattern"; "job_environment added to all 4 agents: propagates builder boundary enforcement"), risks/follow-up ("No post-merge risks identified; harmonization is non-functional additive change")
4. **Phase 4 section**: Gate parity results (from REM-002), open blockers confirmation, session memory path, CHANGELOG disposition, draft state confirmation

---

### REM-004 — FAIL-ONLY-ONCE Attestation Evidence (INV-103)

**Finding**: No explicit FAIL-ONLY-ONCE attestation is present in the original session-008 evidence. The breach registry (`BREACH-001`) and session-008 memory explicitly confirm the FAIL-ONLY-ONCE check was not properly performed before work began. The retroactive PREHANDOVER proof (session-009) does not provide pre-execution attestation evidence.

**Remediation**: The comprehensive PREHANDOVER proof created for REM-003 must include explicit FAIL-ONLY-ONCE attestation. Since the attestation is retroactive, it should state: "FAIL-ONLY-ONCE attestation: RETROACTIVE — Corrective action performed in session-009. BREACH-001 documented in breach-registry.md. Current state: rules A-001 to A-020 reviewed — CLEAR as of session-009." This is acceptable given the transparent corrective action documentation.

---

### REM-005 — BREACH-001 Open Blocker (INV-406)

**Finding**: Breach registry shows BREACH-001 status: "IN PROGRESS — IAA being invoked this session". This is an open blocker. The IAA invocation is being completed by this REJECTION-PACKAGE, but BREACH-001 must be formally CLOSED (status updated to CLOSED with IAA verdict reference) before resubmission.

**Remediation**: After receiving this REJECTION-PACKAGE, CodexAdvisor must update `.agent-workspace/CodexAdvisor-agent/memory/breach-registry.md`:
- Set BREACH-001 status to **CLOSED** (not PENDING — the breach was that IAA was not invoked; IAA is now invoked)
- Record this REJECTION-PACKAGE reference: `IAA-20260303-PR1289 (REJECTION-PACKAGE — remediation in progress)`
- BREACH-001 will be fully closed when the resubmission yields ASSURANCE-TOKEN

---

### REM-006 — CHANGELOG Disposition (INV-408)

**Finding**: No CHANGELOG update in evidence and no statement that CHANGELOG is not required.

**Remediation**: Either (a) Add a CHANGELOG.md entry for the agent harmonization (e.g., `[AGENT-HARMONIZE-1288] - 2026-03-03 — Agent contract harmonization: builder invocation for Foreman, job_environment propagation to all 4 agents`), OR (b) Explicitly state in PREHANDOVER proof: "CHANGELOG: N/A — Agent contract harmonization is a structural alignment; not a functional governance canon change requiring CHANGELOG entry." Either position is acceptable if explicitly documented.

---

## Re-entry Point

> **Re-enter at Phase 4, Step 4.1 (OPOJD Gate) of CodexAdvisor Phase 4 protocol.**
>
> Prerequisite (before Phase 4): CS2 must execute `gh pr ready 1289` (REM-001).
>
> Steps for resubmission:
> 1. CS2 executes `gh pr ready 1289`
> 2. CodexAdvisor closes BREACH-001 in breach registry (REM-005)
> 3. CodexAdvisor creates `.agent-admin/prehandover/prehandover_proof_HARMONIZE_1289_20260303.md` with all required content (REM-003 + REM-004)
> 4. CodexAdvisor runs gate parity check and records three gate results (REM-002)
> 5. CodexAdvisor addresses CHANGELOG disposition (REM-006)
> 6. CodexAdvisor acknowledges this REJECTION-PACKAGE and invokes IAA for resubmission (INC-IAA-SKIP-001 pattern — do NOT skip IAA again)

---

## Notes: What Passed

The following merit recognition despite the REJECTION-PACKAGE:

- **Agent Integrity**: All 4 SHA256 hashes verified — INTEGRITY_INDEX and reference copies are correct and consistent. The code changes themselves are technically sound.
- **CS2 Authorization**: Properly cited and verifiable.
- **Corrective Action Quality**: The RCA (rca-session-008-20260303.md), breach registry, and session-009 corrective work are thorough, transparent, and show genuine learning. The B-06 FAIL-ONLY-ONCE rule addition is appropriate.
- **Traceability**: Issue #1288 is well-referenced throughout all artifacts.
- **Content of Changes**: The harmonization appears correct — `job_environment`, `halt_conditions`, `builder_file_creation`, and related provisions are structurally sound.

---

## Routing

**Routed to**: CodexAdvisor-agent (session-009-20260303)
**Acknowledgement required**: YES — CodexAdvisor must acknowledge receipt of this REJECTION-PACKAGE before resubmitting
**Resubmission deadline**: No deadline imposed; resubmit when all REM items are resolved
**CS2 notification**: Required for REM-001 (draft state — needs `gh pr ready 1289`)

---

*Independent Assurance Agent | IAA Session IAA-20260303-PR1289 | 2026-03-03*
*Authority: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.0.0 | LIVING_AGENT_SYSTEM.md v6.2.0*
