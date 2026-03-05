# Independent Assurance Agent — Tier 2 Knowledge Index

**Agent**: independent-assurance-agent
**Contract Version**: 2.0.0
**Knowledge Version**: 2.4.0
**Last Updated**: 2026-03-05
**Architecture**: `governance/canon/THREE_TIER_AGENT_KNOWLEDGE_ARCHITECTURE.md`

---

## Tier 2 Knowledge Contents

| File | Purpose | Version | Status |
|------|---------|---------|--------|
| `index.md` (this file) | Knowledge entry point and version reference | 2.4.0 | PRESENT |
| `FAIL-ONLY-ONCE.md` | Permanent rules recording governance failures IAA must never repeat | 2.3.0 | PRESENT — Rules A-001 through A-030 active |
| `iaa-core-invariants-checklist.md` | Core checks applied to every IAA invocation regardless of category | 2.8.0 | ACTIVE — CORE-001 to CORE-022; §4.3b architecture; Orientation Mandate |
| `iaa-trigger-table.md` | PR category classification table — when IAA activates and when it is exempt | 2.1.0 | ACTIVE — KNOWLEDGE_GOVERNANCE trigger category added |
| `iaa-category-overlays.md` | Per-category additional checks (AGENT_CONTRACT, CANON_GOVERNANCE, CI_WORKFLOW, AAWP_MAT, KNOWLEDGE_GOVERNANCE) | 2.3.0 | ACTIVE — OVL-AM-008 added |
| `IAA_ZERO_SEVERITY_TOLERANCE.md` | Zero-Severity-Tolerance policy — any finding = REJECTION-PACKAGE; prohibited language table | 1.0.0 | ACTIVE — CORE-021 enforcement reference |
| `session-memory-template.md` | Standard session memory template for IAA invocations | 1.0.0 | PRESENT |

---

## Constitutional Canon References (Tier 1 — verified via CANON_INVENTORY)

- `governance/canon/INDEPENDENT_ASSURANCE_AGENT_CANON.md` — primary IAA governance canon
- `governance/canon/LIVING_AGENT_SYSTEM.md` v6.2.0
- `governance/canon/AGENT_CONTRACT_ARCHITECTURE.md` v1.0.0
- `governance/canon/AGENT_PREFLIGHT_PATTERN.md` v1.0.0
- `governance/canon/EVIDENCE_ARTIFACT_BUNDLE_STANDARD.md` v1.0.0
- `governance/canon/AGENT_HANDOVER_AUTOMATION.md` v1.0.0
- `governance/canon/AGENT_CONTRACT_FILE_PROTECTION_POLICY.md` (AGCFPP-001)

---

## IAA Trigger Summary (load full table from `iaa-trigger-table.md`)

| PR Category | IAA Triggered? | Notes |
|-------------|---------------|-------|
| Agent contract creation or update | YES — MANDATORY | All classes. No exceptions. FAIL-ONLY-ONCE A-002. |
| Canon / governance document changes | YES | |
| CI / workflow changes | YES | |
| AAWP / MAT deliverables | YES | |
| Tier 2 knowledge file changes | YES — MANDATORY | KNOWLEDGE_GOVERNANCE category. Evidence bundle + PREHANDOVER ceremony required (A-015). |
| Doc-only or parking station updates | NO | Must be unambiguously doc-only |
| Session memory files only | NO | |
| Ambiguous / unclear category | YES — MANDATORY | FAIL-ONLY-ONCE A-003: ambiguity resolves to mandatory invocation |

---

## FAIL-ONLY-ONCE Active Rules (Key Rules — full registry in `FAIL-ONLY-ONCE.md`)

| Rule ID | Trigger | Status |
|---------|---------|--------|
| A-001 | IAA invocation evidence must be present in all agent contract PRs | ACTIVE |
| A-002 | IAA is mandatory for ALL agent contract classes — no class exceptions | ACTIVE |
| A-003 | Ambiguity resolves to mandatory invocation | ACTIVE |
| A-004 | Bootstrap directive non-negotiable — repo read before agent file is a preflight violation | ACTIVE |
| A-005 | Agent contract file immutability — no agent may modify .github/agents/ except CodexAdvisor+CS2 | ACTIVE |
| A-006 | PHASE_A_ADVISORY FABRICATION breach detection (INC-IAA-SKIP-001 pattern) | ACTIVE |
| A-015 | Tier 2 knowledge patches require full PREHANDOVER ceremony | ACTIVE |
| A-016 | Cross-PR IAA token reuse is a governance breach | ACTIVE |
| A-017 | Session memory must not cite a REJECTION-PACKAGE session as PASS | ACTIVE |
| A-018 | Post-merge retrospective audit findings must be formally recorded — no informal notes | ACTIVE |
| A-019 | Trigger table misapplication is an IAA bypass — ALL triggering categories require IAA | ACTIVE |
| A-020 | IAA token format must be `IAA-session-NNN-YYYYMMDD-PASS` — named tokens are prohibited | ACTIVE |
| A-021 | IAA token must be written to dedicated token file — never into the PREHANDOVER proof | ACTIVE |
| A-022 | Re-evaluate ALL trigger categories on every IAA invocation — no carry-forward classification | ACTIVE |
| A-023 | OVL-AC-012 ripple assessment is a standing PREHANDOVER requirement for all AGENT_CONTRACT PRs | ACTIVE |
| A-024 | `secret:` field prohibited in agent contracts — must use `secret_env_var:` | ACTIVE |
| A-025 | Ceremony artifacts must use PENDING until post-ASSURANCE-TOKEN ceremony | ACTIVE |
| A-026 | `SCOPE_DECLARATION.md` must match `git diff --name-only origin/main...HEAD` exactly before IAA invocation | ACTIVE |
| A-027 | Third-consecutive A-021 failure on same PR/branch = systemic workflow gap | ACTIVE |
| A-028 | `SCOPE_DECLARATION.md` format compliance — list format required, prior-wave entries must be trimmed | ACTIVE |
| A-029 | PREHANDOVER proof immutability §4.3b — pre-populate expected reference token at commit time | ACTIVE |
| A-030 | CORE-019 re-invocation carve-out — correction addendum path for immutable-PREHANDOVER re-invocation scenarios | ACTIVE |

---

## Adoption Phase

| Phase | Status | Behaviour |
|-------|--------|-----------|
| Phase A | CLOSED | Advisory mode — verdicts informational, not hard-blocking |
| Phase B | **CURRENT — PHASE_B_BLOCKING** | Mandatory blocking — REJECTION-PACKAGE prevents PR open |

---

## Stub Population Status

All previously stub files have been fully populated (as of 2026-02-28):

1. `iaa-core-invariants-checklist.md` — fully populated from IAA canon v2.0.0 (CORE-001 to CORE-017)
2. `iaa-trigger-table.md` — fully populated from IAA canon v2.0.0 (with AGENT_INTEGRITY category and classification decision flow)
3. `iaa-category-overlays.md` — fully populated from IAA canon v2.0.0 (with OVL-CI-004 and AGENT_INTEGRITY overlay)

---

## Operating Model Summary

IAA operates with a single objective: binary verdict.
- **ASSURANCE-TOKEN**: all checks PASS → merge permitted (subject to CS2 approval)
- **REJECTION-PACKAGE**: one or more checks FAIL → merge blocked, all failures cited with fix required
- **STOP-AND-FIX mandate**: ACTIVE. No class exceptions. Ambiguity resolves to mandatory invocation.

IAA never produces partial verdicts, never reviews its own work, and is never the same agent
that produced the work under review. Every invocation is logged in session memory and
`learning_notes` are used to refine future decisions and grow the FAIL-ONLY-ONCE registry.

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-02-25 | Initial index — Tier 2 knowledge entry point created |
| 1.1.0 | 2026-02-26 | Stub population status section added; file status updated |
| 1.2.0 | 2026-02-28 | Fully populated files noted (iaa-core-invariants-checklist, iaa-trigger-table, iaa-category-overlays); AGENT_INTEGRITY category referenced; adoption phase updated |
| 1.3.0 | 2026-03-01 | FAIL-ONLY-ONCE active rules table updated; OVL-AC/CI/CG/AM additions referenced |
| 1.4.0 | 2026-03-02 | KNOWLEDGE_GOVERNANCE trigger category added to IAA Trigger Summary; session-memory-template.md added to knowledge contents table; FAIL-ONLY-ONCE A-015, A-016, A-017, A-018, A-019 added to active rules table (maturion-isms#IAA-TIER2) |
| 2.4.0 | 2026-03-05 | Synced to v2.4.0: FAIL-ONLY-ONCE v2.3.0 (A-022 to A-030); iaa-core-invariants-checklist v2.8.0 (§4.3b architecture, Orientation Mandate, CORE-021/022); iaa-category-overlays v2.3.0 (OVL-AM-008); IAA_ZERO_SEVERITY_TOLERANCE.md v1.0.0 created; active rules table updated A-020 to A-030 |

---

**Authority**: CS2 (Johan Ras) | **Living Agent System**: v6.2.0
**Canonical Source**: `APGI-cmy/maturion-foreman-governance`
