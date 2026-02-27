# IAA Core Invariants Checklist — Tier-2 Operational Knowledge
**Agent**: independent-assurance-agent  
**Version**: 1.2.0  
**Authority**: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.0.0 | LIVING_AGENT_SYSTEM.md v6.2.0  
**Seeded**: 2026-02-24 (v1.0.0) | Updated: 2026-02-26 (v1.1.0 — recurring shortfall codification per IAA self-improvement issue) | Updated: 2026-02-27 (v1.2.0 — rejection routing, delivery confirmation, and resubmission enforcement per feedback-loop closure issue)  
**Purpose**: Tier-2 operational checklist for IAA assurance sessions. Load this at session start alongside Tier-1 canon.

---

## How to Use This Checklist

At every assurance invocation:
1. Load this checklist (Tier 2) alongside INDEPENDENT_ASSURANCE_AGENT_CANON.md (Tier 1) and the PR context (Tier 3)
2. Work through each invariant systematically for the PR under review
3. Record the finding (PASS/FAIL/N_A) for each checked invariant in the Phase 5 assurance invocation artifact
4. Any FAIL finding → REJECTION-PACKAGE; document specific gap and remediation required

---

## SECTION 1 — Independence & Identity Invariants

| ID | Invariant | Check Method | Fail Trigger |
|----|-----------|-------------|-------------|
| INV-001 | IAA is not the same agent that performed the work | Compare IAA identity against PR submitter/author history | Same agent found in PR history |
| INV-002 | IAA loads from its own governance context (Tier 1 + Tier 2) | Confirm IAA canon hash against CANON_INVENTORY.json | IAA canon hash mismatch |
| INV-003 | IAA self-integrity check performed | Verify IAA agent file hash (if IAA agent contract is in INTEGRITY_INDEX.md) | Hash mismatch on IAA contract |
| INV-004 | Assurance session has a unique session ID | Session ID follows `IAA-<YYYYMMDD>-<PR#>` or equivalent pattern | Duplicate or missing session ID |

---

## SECTION 2 — Phase 1 (Preflight) Invariants

| ID | Invariant | Check Method | Fail Trigger |
|----|-----------|-------------|-------------|
| INV-101 | Preflight proof artifact exists | Check `.agent-admin/evidence/preflight-proof-<PR#>.md` or PR comment | Artifact absent |
| INV-102 | Preflight names specific agent identity (role/class/contract version) | Inspect artifact for "role:", "class:", "contract version:" fields | Generic identity claim without version |
| INV-103 | FAIL-ONLY-ONCE self-attestation explicitly confirmed | Artifact contains "FAIL-ONLY-ONCE: ATTESTED" or equivalent explicit statement | Absent or vague attestation |
| INV-104 | OPOJD acknowledged in preflight | Artifact contains OPOJD acknowledgement | Absent OPOJD acknowledgement |
| INV-105 | Tier 1 and Tier 2 knowledge load is cited | Artifact lists which canon files and Tier-2 files were loaded for this session | Missing knowledge load citation |
| **INV-106** | **Preflight explicitly lists any known constraints or limitations for this delivery** | Artifact contains constraints/limitations section (even if empty with "none noted") | **Absent constraints section — recurring shortfall: agents omit constraints section entirely** |

---

## SECTION 3 — Phase 2 (Governance) Invariants

| ID | Invariant | Check Method | Fail Trigger |
|----|-----------|-------------|-------------|
| INV-201 | Governance proof artifact exists | Check `.agent-admin/evidence/governance-proof-<PR#>.md` or PR comment | Artifact absent |
| INV-202 | Canon citations include version numbers | Scan artifact for version citations (e.g., "v1.0.0", "v6.2.0") | Citations without version numbers |
| INV-203 | Hash validation against CANON_INVENTORY was performed | Artifact states hashes verified (or explains why N/A) | No mention of hash verification |
| INV-204 | Protected file changes (`.github/agents/`, `governance/canon/`) cite CS2 approval | Inspect PR diff; if protected paths touched, governance proof must cite CS2 issue/approval number | Protected files changed without approval citation |
| INV-205 | GATE_REQUIREMENTS_INDEX.json consulted for relevant gate requirements | Artifact cites specific gate requirements applicable to this PR | Gate requirements not cited |
| **INV-206** | **Governance proof confirms CANON_INVENTORY has no placeholder hashes for any file touched by this PR** | SHA256 values for touched files verified as 64-char hex strings (not "placeholder", "TBD", or short strings) | **Placeholder hash detected — recurring shortfall: degraded alignment not caught at assurance time** |
| **INV-207** | **Governance proof notes whether any canon file update requires layer-down ripple** | Artifact contains ripple assessment: YES/NO with consumer repos listed if YES | **Ripple assessment absent — recurring shortfall: canon changes merged without ripple notice** |

---

## SECTION 4 — Phase 3 (Working) Invariants

| ID | Invariant | Check Method | Fail Trigger |
|----|-----------|-------------|-------------|
| INV-301 | Working proof artifact exists | Check `.agent-admin/evidence/working-proof-<PR#>.md` or PR comment | Artifact absent |
| INV-302 | Rationale is delivery-specific (not boilerplate) | Verify artifact contains PR-specific context — references actual files changed, specific decisions made | Generic/template rationale without delivery details |
| INV-303 | Design decisions documented with reasoning | Artifact contains explicit decision entries with "why" rationale | Decision list absent or lacks reasoning |
| INV-304 | Alternatives considered (or explicitly noted as not applicable) | Artifact addresses alternatives for each major decision | Alternatives entirely absent without N/A note |
| INV-305 | Rationale matches actual PR diff | Cross-reference working proof claims against the PR file list | Working proof describes changes not in diff, or omits major changes |
| **INV-306** | **Working proof references the governing issue/ticket number and wave (if applicable)** | Artifact contains issue # and wave reference | **Missing issue/wave traceability — recurring shortfall: working proofs disconnected from parent wave/issue** |
| **INV-307** | **Working proof documents any known risks or follow-up actions** | Artifact contains risks/follow-up section (even if empty with "none") | **Absent risk section — recurring shortfall: risk awareness omitted from working evidence** |

---

## SECTION 5 — Phase 4 (Handover) Invariants

| ID | Invariant | Check Method | Fail Trigger |
|----|-----------|-------------|-------------|
| INV-401 | Handover proof artifact exists at `.agent-admin/prehandover/prehandover_proof*.md` | File exists and is non-empty | Artifact absent |
| INV-402 | GREEN state claimed with supporting evidence | Artifact states GREEN and lists specific gate results (not just claims) | Claim without supporting evidence |
| INV-403 | OPOJD compliance explicitly stated | Artifact contains OPOJD confirmation | OPOJD absent |
| INV-404 | Improvement suggestions are PARKED (not inline) | Artifact contains parking-station reference or explicit "no suggestions for this delivery" statement | Inline improvement suggestions present |
| **INV-405** | **Pre-handover merge gate parity check was run and passed (BLOCKING — §4.3 of AGENT_HANDOVER_AUTOMATION.md)** | Artifact contains gate parity check results: merge-gate/verdict PASS, governance/alignment PASS, stop-and-fix/enforcement PASS | **Gate parity result absent or failing gates present — recurring shortfall (most common): agents open PRs without running local gate parity** |
| **INV-406** | **Handover proof confirms no open stop-and-fix blockers** | Artifact checks `.agent-workspace/.*/blocker-*.md` count = 0 | **Open blockers at handover — recurring shortfall: stop-and-fix items not resolved before PR submission** |
| **INV-407** | **Handover proof confirms session memory will be created (or has been created) for this session** | Artifact contains session memory commitment or path | **Session memory absent — recurring shortfall: sessions close without memory record** |
| **INV-408** | **Handover proof states whether CHANGELOG was updated (for governance changes)** | Artifact addresses CHANGELOG update status explicitly | **CHANGELOG update silently skipped — recurring shortfall for governance PRs** |
| **INV-409** | **Handover proof confirms PR is NOT in draft state** | PR API state = "open" (not draft); or artifact explicitly confirms PR is ready for review | **PR in draft state at handover — recurring shortfall: draft PRs submitted for assurance prematurely** |

---

## SECTION 6 — Agent Integrity Invariants

| ID | Invariant | Check Method | Fail Trigger |
|----|-----------|-------------|-------------|
| INV-501 | All agent contract files changed in PR are in INTEGRITY_INDEX.md | Diff PR against `governance/quality/agent-integrity/` file list | Agent contract changed without integrity entry |
| INV-502 | SHA256 of each changed agent contract file matches INTEGRITY_INDEX.md baseline | `sha256sum .github/agents/<file>` vs INTEGRITY_INDEX.md | Hash mismatch |
| INV-503 | Any agent contract file update cites CS2 approval | PR description or governance proof links to CS2 issue | No CS2 approval cited for agent file change |
| **INV-504** | **Agent integrity check is performed even when no agent files are changed (confirm no steganographic drift)** | IAA explicitly confirms it checked whether agent files are unchanged, not just that no agent files appear in the diff | **Integrity check skipped when diff has no agent files — recurring shortfall: silent drift goes undetected** |

---

## SECTION 7 — Learning Loop Invariants (New — v1.1.0)

*These invariants were added in v1.1.0 to codify the mandatory learning loop requirement at every IAA session close.*

| ID | Invariant | Check Method | Fail Trigger |
|----|-----------|-------------|-------------|
| **INV-601** | **IAA session memory file created for this assurance session** | Session memory file at `.agent-workspace/independent-assurance-agent/memory/session-<NNN>-<YYYYMMDD>.md` exists | Memory file absent at session close |
| **INV-602** | **Session memory contains at least one concrete improvement suggestion** | Memory file's "Improvement Suggestions" / "Lessons" section is non-blank and non-generic | Blank or "N/A" suggestion section |
| **INV-603** | **Any second-occurrence gap detected during this assurance session is flagged for Tier-2 promotion** | Memory file explicitly notes: "Recurring shortfall detected: [X] — flagging for FAIL-ONLY-ONCE promotion" | Recurring shortfall observed but not promoted |
| **INV-604** | **Session memory notes whether the ASSURANCE-TOKEN or REJECTION-PACKAGE was issued and why** | Memory file records binary verdict with one-line rationale | Verdict absent from session memory |
| **INV-605** | **After issuing a REJECTION-PACKAGE, IAA creates a follow-up tracking note** | An escalation or tracking entry is created in escalation-inbox/ for each REJECTION-PACKAGE issued | Rejection issued but no tracking record created |
| **INV-606** | **REJECTION-PACKAGE is routed to the submitting agent with explicit remediation guidance and a precise phase/step re-entry point. Acknowledgement from the agent is required.** | Escalation tracking entry confirms: (a) submitting agent notified, (b) re-entry point stated (e.g., "Phase 3, Step 3.2"), (c) acknowledgement received or a follow-up blocker created | REJECTION-PACKAGE filed but not delivered; re-entry point absent; acknowledgement not recorded |
| **INV-607** | **On subsequent assurance invocation for a PR with a prior REJECTION-PACKAGE, IAA loads the prior rejection, verifies all remediation items are resolved, and blocks assurance if any item is unresolved** | Session memory records: prior REJECTION-PACKAGE ID loaded, each prior remediation item checked with evidence reference, resubmission gate outcome (PASS/BLOCKED) | Subsequent invocation proceeds without verifying prior remediation items; resubmission gate skipped |

---

## SECTION 8 — Delivery Scope & Traceability Invariants (New — v1.1.0)

*These invariants were added in v1.1.0 following identification of recurring traceability gaps in assurance review.*

| ID | Invariant | Check Method | Fail Trigger |
|----|-----------|-------------|-------------|
| **INV-701** | **PR description includes a reference to the governing issue or wave** | PR description contains "Closes #", "Resolves #", "Part of Wave", or equivalent traceability marker | No issue/wave reference in PR description |
| **INV-702** | **PR scope matches the acceptance criteria of the referenced issue** | Spot-check: files changed vs. acceptance criteria of the referenced issue align | Major acceptance criteria unaddressed in PR |
| **INV-703** | **PR does not contain out-of-scope changes** | Diff review: all changed files are necessary for the stated purpose | Unrelated or opportunistic changes bundled in |
| **INV-704** | **For AAWP/MAT deliverables: wave closure artifact exists** | Check for wave closure or "all acceptance criteria met" statement in handover proof | Wave deliverable without closure confirmation |

---

## Checklist Summary Table

Use this summary table for quick gate tallying in the Phase 5 assurance invocation artifact:

| Phase | Invariants | Fail Triggers |
|-------|-----------|---------------|
| Independence | INV-001 to INV-004 | Any = REJECTION-PACKAGE |
| Phase 1 Preflight | INV-101 to INV-106 | Any = Phase 1 FAIL |
| Phase 2 Governance | INV-201 to INV-207 | Any = Phase 2 FAIL |
| Phase 3 Working | INV-301 to INV-307 | Any = Phase 3 FAIL |
| Phase 4 Handover | INV-401 to INV-409 | Any = Phase 4 FAIL |
| Agent Integrity | INV-501 to INV-504 | Any = Agent Integrity FAIL |
| Learning Loop | INV-601 to INV-607 | Any = Session INCOMPLETE |
| Traceability | INV-701 to INV-704 | Any = Phase 3/4 FAIL |

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-02-24 | Initial seeding — IAA bootstrap |
| 1.1.0 | 2026-02-26 | Added recurring shortfall items (INV-106, INV-206, INV-207, INV-306, INV-307, INV-405 to INV-409, INV-504, INV-601 to INV-605, INV-701 to INV-704) per IAA self-improvement issue |
| 1.2.0 | 2026-02-27 | Added INV-606 (REJECTION-PACKAGE delivery and acknowledgement) and INV-607 (resubmission gate enforcement) per feedback-loop closure issue |

---

*Authority: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.0.0 | LIVING_AGENT_SYSTEM.md v6.2.0*
