# IAA Category Overlays — Tier-2 Operational Knowledge
**Agent**: independent-assurance-agent  
**Version**: 1.2.0  
**Authority**: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.0.0 | LIVING_AGENT_SYSTEM.md v6.2.0  
**Seeded**: 2026-02-24 (v1.0.0) | Updated: 2026-02-26 (v1.2.0 — Test & Assertion Quality overlay subsection added)  
**Purpose**: Category-specific evaluation overlays for IAA assurance sessions. Overlays refine the core invariant checklist with delivery-type-specific checks. Load alongside `iaa-core-invariants-checklist.md`.

---

## How to Use Overlays

1. Identify the PR category from the IAA Canon trigger table
2. Load the matching overlay(s) for this delivery type
3. Run overlay checks IN ADDITION TO the core invariants checklist
4. Record overlay findings in the Phase 5 assurance invocation artifact

Multiple overlays may apply to a single PR (e.g., a canon update that also modifies an agent contract).

---

## OVERLAY A — Canon / Governance PR Overlay

**Applies when**: PR touches `governance/canon/`, `governance/CANON_INVENTORY.json`, or `governance/CHANGELOG.md`

### A.1 Canon Change Quality Checks

| ID | Check | Pass Condition | Fail Trigger |
|----|-------|---------------|-------------|
| OVA-001 | Governance proof cites the specific canon file(s) being changed with pre-change and post-change version | Both pre- and post-version numbers cited | Missing version change documentation |
| OVA-002 | CANON_INVENTORY.json updated with correct SHA256 (64-char hex, not placeholder) | New hash is 64 hex chars; matches `sha256sum` output of the file | Placeholder, truncated, or absent hash |
| OVA-003 | CHANGELOG.md entry added with change ID, date, type, and rationale | Entry present at top of Change History; follows format `[CHANGE-ID] - YYYY-MM-DD` | Absent or malformed CHANGELOG entry |
| OVA-004 | Constitutional canon changes (LIVING_AGENT_SYSTEM.md, AGENT_CONTRACT_ARCHITECTURE.md) cite CS2 approval | PR description or governance proof links CS2 issue/approval | Constitutional canon changed without CS2 reference |
| OVA-005 | Layer-down ripple assessment completed | Working or governance proof states: "Ripple required: YES/NO" with consumer repo list if YES | Ripple assessment absent |
| **OVA-006** | **Ripple log or tracking entry created atomically with the PR (per REQ-RA-003)** | `.agent-admin/governance/ripple-logs/` or equivalent tracking artifact present if ripple required | **No ripple log despite YES ripple assessment — recurring shortfall: ripple noted but not tracked** |
| **OVA-007** | **Pre-canon-change layer-up scan performed for drift/pending issues (per REQ-RA-005)** | Working proof or session notes indicate a layer-up scan was run before making the canon change | **Layer-up scan absent — recurring shortfall: canon changes made without checking for pending consumer drift** |

---

## OVERLAY B — Agent Contract / Agent File PR Overlay

**Applies when**: PR touches `.github/agents/`, `governance/quality/agent-integrity/`, or any `*-agent-contract.md` file

### B.1 Agent Contract Change Quality Checks

| ID | Check | Pass Condition | Fail Trigger |
|----|-------|---------------|-------------|
| OVB-001 | CS2 authorization documented | PR description or governance proof contains explicit CS2 issue number authorizing the change | No CS2 reference |
| OVB-002 | CodexAdvisor involvement confirmed (per AGCFPP-001) | PR references CodexAdvisor review or CodexAdvisor submitted the PR | No CodexAdvisor involvement |
| OVB-003 | INTEGRITY_INDEX.md updated with new baseline SHA256 | `governance/quality/agent-integrity/INTEGRITY_INDEX.md` contains updated hash and "Updated By: CS2" | INTEGRITY_INDEX not updated |
| OVB-004 | Reference copy in `governance/quality/agent-integrity/` updated | Reference copy file hash matches updated `.github/agents/` file | Reference copy diverges from live file |
| OVB-005 | Agent contract includes FAIL-ONLY-ONCE preflight attestation section (Phase 1) | Agent file Phase 1 contains explicit FAIL-ONLY-ONCE attestation requirement | Missing FAIL-ONLY-ONCE section |
| OVB-006 | Agent workspace `knowledge/FAIL-ONLY-ONCE.md` exists for the agent | File at `.agent-workspace/<agent>/knowledge/FAIL-ONLY-ONCE.md` exists | FAIL-ONLY-ONCE registry missing |
| **OVB-007** | **Agent contract file change does not accidentally reduce gate parity check requirements (§4.3 of AGENT_HANDOVER_AUTOMATION.md)** | Phase 4 of modified agent contract still requires all three standard gate checks: merge-gate/verdict, governance/alignment, stop-and-fix/enforcement | **Gate parity check silently removed — recurring shortfall: contract edits inadvertently drop blocking gate requirement** |

---

## OVERLAY C — Build / Application Deliverable PR Overlay

**Applies when**: PR is labelled `aawp-deliverable` or `mat-deliverable`, or touches application code

### C.1 Build Deliverable Quality Checks

| ID | Check | Pass Condition | Fail Trigger |
|----|-------|---------------|-------------|
| OVC-001 | Wave traceability: parent wave issue cited | Handover or working proof contains wave issue number and wave ID | No wave reference |
| OVC-002 | All acceptance criteria addressed | Working proof maps each acceptance criterion to a delivered artifact or change | Acceptance criteria items unaddressed |
| OVC-003 | CI pipeline GREEN at handover | Handover proof references CI run result (URL or job status) confirming pass | CI result absent or shows failures |
| OVC-004 | Test coverage delta documented (if tests added or removed) | Working proof notes test coverage impact | Test delta undocumented for changes affecting test files |
| OVC-005 | No test skips or xfails introduced without explicit justification | Handover proof or working proof addresses any skipped/disabled tests | Silent test suppression |
| **OVC-006** | **YAML frontmatter compliance verified (per BUILDER_AGENT_YAML_FRONTMATTER_COMPLIANCE_SPEC.md)** | For builder agents: YAML frontmatter fields present and compliant | **YAML frontmatter missing or non-compliant — recurring shortfall: builders omit or abbreviate required metadata** |
| **OVC-007** | **Build effectiveness standard satisfied (per BUILD_EFFECTIVENESS_STANDARD.md)** | Deliverable meets the functional, testable, and deployable standard | **Partially functional deliverable submitted without acknowledgement — recurring shortfall: incomplete builds merged** |
| **OVC-008** | **Wave closure artifact or wave completion certification exists (per MANDATORY_CANONICAL_PROGRESS_RECORDING_AND_WAVE_CLOSURE_CERTIFICATION.md)** | Wave closure certificate present in `.agent-admin/` or equivalent | **Wave completed without closure artifact — recurring shortfall: wave outcomes not formally recorded** |

### C.2 Test & Assertion Quality Checks

| ID | Check | Pass Condition | Fail Trigger |
|----|-------|---------------|-------------|
| **OVC-009** | **No provider/model string assertions unless the ticket explicitly requires it** | Test assertions do not hard-code provider names (e.g. `"gpt-4"`, `"claude-3"`, `"openai"`) unless the relevant ticket acceptance criterion explicitly mandates provider-specific verification | Test contains a provider or model string literal that is not justified by a ticket requirement |
| **OVC-010** | **Tests assert capability routing, not model routing** | Test assertions verify that the correct capability (function/skill) is invoked; model-identity assertions are absent or explicitly justified | Test checks which model handled the request rather than whether the correct capability was exercised |
| **OVC-011** | **Snapshot updates include rationale and scope documentation** | Any snapshot update commit or PR contains an explanation of why the snapshot changed and which components are affected | Snapshot updated with no rationale (e.g. silent `--updateSnapshot` without description) |
| **OVC-012** | **Mock contracts match the current adapter response schema** | Mocked response objects in tests reflect the live adapter/API response shape; fields added or removed in the adapter are reflected in mocks | Mock response diverges from the actual adapter schema documented in the working proof or code |
| **OVC-013** | **Negative-path tests exist for every new error-handling branch** | For each new `catch`, error guard, or fallback path introduced in the PR, at least one test exercises that branch with an invalid/error input | New error-handling code has no corresponding negative-path test |

---

## OVERLAY D — Merge Gate Workflow PR Overlay

**Applies when**: PR touches `.github/workflows/merge-gate-interface.yml` or any merge-gate-related workflow

### D.1 Merge Gate Workflow Quality Checks

| ID | Check | Pass Condition | Fail Trigger |
|----|-------|---------------|-------------|
| OVD-001 | All three standard gate contexts still present: merge-gate/verdict, governance/alignment, stop-and-fix/enforcement | Workflow YAML contains all three job names unchanged | Any standard gate context renamed or removed |
| OVD-002 | iaa-assurance-check job still enforces ASSURANCE-TOKEN verification | Workflow YAML contains `iaa-assurance-check` with token validation logic | iaa-assurance-check missing or bypassed |
| OVD-003 | No `continue-on-error: true` added to blocking gates | Workflow YAML gates do not use `continue-on-error` on blocking steps | Blocking gate made non-blocking |
| OVD-004 | Branch protection requirements unchanged or updated per CS2 instruction | PR description addresses branch protection context for the workflow change | Branch protection impact unaddressed |

---

## OVERLAY E — Session Memory / Governance Documentation PR Overlay

**Applies when**: PR primarily updates session memories, governance documentation, or agent workspace files

### E.1 Governance Documentation Quality Checks

| ID | Check | Pass Condition | Fail Trigger |
|----|-------|---------------|-------------|
| OVE-001 | Session memory follows the canonical template from `session-memory-template.md` | All required sections present: Task, What I Did, Decisions, Evidence, Ripple Status, Outcome, Lessons | Missing required sections |
| OVE-002 | Session memory does not contain blank "Lessons" or "Improvement Suggestions" sections | At least one concrete lesson per section | Blank lessons section |
| **OVE-003** | **Session memory explicitly states FAIL-ONLY-ONCE attestation result (per FAIL-ONLY-ONCE.md requirement)** | Memory file contains "FAIL-ONLY-ONCE: Attested — [result]" or equivalent | **FAIL-ONLY-ONCE attestation result absent from session memory — recurring shortfall: attestation done but not recorded** |
| **OVE-004** | **Session memory explicitly calls out any recurring shortfall detected and whether it was promoted** | If a pattern was seen twice, memory contains "Recurring shortfall: [X] — [promoted/flagged for promotion]" | **Recurring shortfall observed but promotion not tracked — recurring shortfall: patterns noted informally, not formally promoted** |
| OVE-005 | Governance documentation PRs have a prehandover proof even if lightweight | Handover proof exists (may be a short PR comment for docs-only PRs that are exempt from IAA) | Major governance docs PR submitted without any handover artifact |

---

## OVERLAY F — Learning Loop & Self-Improvement Overlay

**Applies when**: IAA session is closing; OR when a PR is submitted to update Tier-2 IAA knowledge files

*This overlay was added in v1.1.0 as a direct result of the IAA self-improvement initiative.*

### F.1 Learning Loop Enforcement Checks

| ID | Check | Pass Condition | Fail Trigger |
|----|-------|---------------|-------------|
| **OVF-001** | **IAA session ends with an explicit learning integration step** | Session memory contains "Learning Loop" or "Improvement Suggestions" section with ≥1 concrete, actionable item | No learning integration at session close |
| **OVF-002** | **Recurring shortfalls detected across ≥2 assurance sessions are promoted to FAIL-ONLY-ONCE.md** | FAIL-ONLY-ONCE.md contains an entry for any shortfall observed in ≥2 sessions | Recurring shortfall not promoted after second observation |
| **OVF-003** | **Recurring shortfalls detected across ≥3 assurance sessions are escalated for Tier-3 canon review** | Escalation note created for CS2 in `escalation-inbox/` when a shortfall recurs 3+ times | Three-peat shortfall not escalated to governance |
| **OVF-004** | **New Tier-2 invariant or overlay additions follow the versioned PR process** | Tier-2 file version is bumped, change is committed via PR (not direct push), change is described in session memory | Tier-2 knowledge updated without version bump or evidence |
| **OVF-005** | **Improvement suggestions from previous session are reviewed at start of next session** | Session memory references whether prior session's improvement suggestions were actioned or deferred | No review of prior improvement suggestions at session start |

### F.2 Self-Improvement Feedback Loop

The following table tracks the categories of recurring improvement suggestions that have been observed. Update this table when a new category is identified.

| Category | First Observed | Times Seen | Tier-2 Status | Tier-3 Candidate? |
|----------|---------------|------------|---------------|-------------------|
| Missing merge gate parity check at handover | 2026-02-24 (session bootstrap) | Systemic | ✅ INV-405 added | Consider Tier-3 |
| Blank or generic session memory lessons | 2026-02-24 (session bootstrap) | Systemic | ✅ INV-602 added | No — Tier-2 sufficient |
| Ripple assessment absent from governance PRs | 2026-02-24 (session bootstrap) | Systemic | ✅ OVA-005, OVA-006 added | Consider Tier-3 |
| Inline improvement suggestions (POLC violation) | 2026-02-24 (session bootstrap) | Systemic | ✅ INV-404, A-09 FAIL-ONLY-ONCE | Tier-3 via existing POLC canon |
| Wave traceability gaps | 2026-02-24 (session bootstrap) | Systemic | ✅ INV-306, INV-701–704 added | Consider Tier-3 |
| Draft PR submitted for assurance | 2026-02-24 (session bootstrap) | Observed | ✅ INV-409 added | No — Tier-2 sufficient |
| Session memory FAIL-ONLY-ONCE attestation not recorded | 2026-02-26 | First observation | ✅ OVE-003 added | No — Tier-2 sufficient |
| Agent integrity check skipped when no agent files in diff | 2026-02-26 | First observation | ✅ INV-504 added | Consider Tier-3 |

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-02-24 | Initial seeding — IAA bootstrap with Overlays A–E |
| 1.1.0 | 2026-02-26 | Added Overlay F (Learning Loop), recurring shortfall items in Overlays A–E, self-improvement feedback table |
| 1.2.0 | 2026-02-26 | Added Overlay C.2 (Test & Assertion Quality): OVC-009–OVC-013 |

---

*Authority: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.0.0 | LIVING_AGENT_SYSTEM.md v6.2.0*
