# Session Memory Template — independent-assurance-agent
**Version**: 1.1.0  
**Authority**: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.0.0 | LIVING_AGENT_SYSTEM.md v6.2.0  
**Updated**: 2026-02-26 — v1.1.0: Mandatory learning loop section added (IAA self-improvement initiative)

---

> **Usage**: Copy this template to create a new session memory file.  
> **File path**: `.agent-workspace/independent-assurance-agent/memory/session-NNN-YYYYMMDD.md`  
> **Example**: `.agent-workspace/independent-assurance-agent/memory/session-002-20260301.md`  
> **CRITICAL**: The "Learning Loop" section is MANDATORY. Leaving it blank is a governance violation (INV-602).

---

```markdown
# Session NNN - YYYYMMDD — IAA Assurance Session (Living Agent System v6.2.0)

## Agent
- Type: independent-assurance-agent
- Class: assurance
- Session ID: IAA-YYYYMMDD-PR<number>
- Canon version loaded: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.0.0 (SHA256 verified: YES/NO)

## Preflight

### FAIL-ONLY-ONCE Attestation
- Self-attested against all Universal Rules (Section A): YES/NO
- Self-attested against applicable Conditional Rules (Section B): YES/NO — rules checked: [B-01, B-02, ...]
- Violations found: NONE / [list if any]

### Independence Check
- IAA identity: [role/class/session]
- Submitting agent identity: [role/class/session]  
- Independence confirmed: YES / NO — [reason if NO]

### Knowledge Load
- Tier 1: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.0.0 — hash verified: YES/NO
- Tier 2 checklist: iaa-core-invariants-checklist.md v[version] — loaded: YES/NO
- Tier 2 overlays: iaa-category-overlays.md v[version] — loaded: YES/NO
- Tier 3 (PR context): PR #[number] — [brief description]
- Overlays applicable: [list overlay letters: A, B, C, D, E, F]

---

## PR Under Review

| Field | Value |
|-------|-------|
| PR Number | #NNN |
| PR Title | [title] |
| PR Category | [category from IAA canon trigger table] |
| Submitting Agent | [agent role/class] |
| Review Date | YYYY-MM-DD |
| Files Changed | [count] |

---

## Phase Review Findings

### Phase 1 — Preflight Proof
- Artifact location: [path or "PR comment"]
- Artifact present: YES/NO
- Agent identity cited with version: YES/NO
- FAIL-ONLY-ONCE attestation confirmed: YES/NO
- OPOJD acknowledged: YES/NO
- Knowledge load cited: YES/NO
- Constraints section present: YES/NO
- **Finding**: PASS / FAIL — [one-line summary]

### Phase 2 — Governance Proof
- Artifact location: [path or "PR comment"]
- Artifact present: YES/NO
- Canon citations include versions: YES/NO
- Hash validation performed: YES/NO
- Protected file CS2 approval cited: YES/NO/N_A
- Gate requirements cited: YES/NO
- CANON_INVENTORY placeholder hashes: NONE / [list if any]
- Ripple assessment: YES required / NO required / [consumer repos listed]
- **Finding**: PASS / FAIL — [one-line summary]

### Phase 3 — Working Phase Proof
- Artifact location: [path or "PR comment"]
- Artifact present: YES/NO
- Rationale is delivery-specific: YES/NO
- Design decisions documented with reasoning: YES/NO
- Alternatives considered: YES/NO/N_A
- Rationale matches PR diff: YES/NO
- Issue/wave traceability cited: YES/NO
- Risk section present: YES/NO
- **Finding**: PASS / FAIL — [one-line summary]

### Phase 4 — Handover Proof
- Artifact location: [path]
- Artifact present: YES/NO
- GREEN state claimed with evidence: YES/NO
- OPOJD confirmed: YES/NO
- Improvement suggestions parked (not inline): YES/NO/N_A
- Merge gate parity check ran and passed: YES/NO ← **BLOCKING**
- No open stop-and-fix blockers: YES/NO
- Session memory committed: YES/NO
- CHANGELOG updated (if governance change): YES/NO/N_A
- PR not in draft state: YES/NO
- **Finding**: PASS / FAIL — [one-line summary]

### Agent Integrity Check
- Agent files changed in PR: YES/NO — [list if YES]
- INTEGRITY_INDEX.md baseline checked: YES/NO
- CS2 authorization for agent file changes: YES/NO/N_A
- Integrity result: PASS / FAIL / N_A — [one-line summary]

---

## Overlay Findings

*Complete for each applicable overlay:*

### Overlay [Letter] — [Name]
- [OVX-NNN]: PASS / FAIL / N_A — [one-line finding]
- [OVX-NNN]: PASS / FAIL / N_A — [one-line finding]
- **Overlay result**: PASS / FAIL

---

## Binary Verdict

```
[ASSURANCE-TOKEN | REJECTION-PACKAGE]
PR: #NNN
Date: YYYY-MM-DD
IAA Session: IAA-YYYYMMDD-PRNNN
Phases Verified: 1-[PASS|FAIL], 2-[PASS|FAIL], 3-[PASS|FAIL], 4-[PASS|FAIL]
Agent Integrity: [PASS|FAIL|N_A]
Independence: [CONFIRMED|VIOLATION]
Verdict: [MERGE PERMITTED | MERGE BLOCKED]
[Remediation Required:
  - <specific gap 1>
  - <specific gap 2>]
```

---

## Recurring Shortfalls Detected

*Identify any shortfalls seen in this session that also appeared in prior sessions. Required for learning loop.*

| Shortfall | First Seen | This Session? | Action Taken |
|-----------|-----------|---------------|-------------|
| [describe shortfall] | Session NNN / Date | YES | Flagged for Tier-2 promotion / Already in checklist |

---

## 🔄 LEARNING LOOP (MANDATORY — INV-601 to INV-605)

> **This section is MANDATORY. It CANNOT be blank. A session memory with blank learning loop is a governance violation.**

### Improvement Suggestions for This Session
*Concrete, actionable suggestions based on what was observed in this assurance session:*

1. [Specific improvement — what to check, change, or add]
2. [Specific improvement — reference the invariant or overlay that surfaced this gap]
3. [Specific improvement — or explicitly state "No new improvements — all existing invariants covered this session adequately"]

### Recurring Shortfalls to Promote
*If any shortfall was observed for the second or subsequent time:*

- [ ] [Shortfall X] — **Flag for FAIL-ONLY-ONCE promotion** — observed [N] times
- [ ] [Shortfall Y] — **Flag for Tier-3 canon escalation** — observed [N] times (≥3)
- *OR:* No recurring shortfalls detected this session.

### Prior Session Improvements Review
*Check: did this session action any improvement suggestion from the prior session?*

- Prior session suggestion: "[suggestion text]" — **ACTIONED / DEFERRED / N_A**
- Notes: [why actioned or deferred]

### Tier-2 Updates Triggered by This Session
*List any additions to iaa-core-invariants-checklist.md, iaa-category-overlays.md, or FAIL-ONLY-ONCE.md that should be made based on this session's findings:*

- [ ] Add invariant [INV-XXX] for: [gap description]
- [ ] Add overlay check [OVX-XXX] for: [gap description]
- [ ] Add FAIL-ONLY-ONCE entry for: [rule description]
- *OR:* No Tier-2 updates required — existing checks covered all gaps.

---

## Outcome
[✅ ASSURANCE-TOKEN ISSUED | ❌ REJECTION-PACKAGE ISSUED | ⚠️ ESCALATED TO CS2]

## Lessons

### What Worked Well
- [lesson 1]

### What Was Challenging
- [challenge 1]

### What Future Sessions Should Know
- [recommendation 1]

### Governance Insights
- [insight 1]

---
Authority: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.0.0 | Session: NNN
```

---

## Template Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-02-24 | Initial template — IAA bootstrap |
| 1.1.0 | 2026-02-26 | Added mandatory Learning Loop section (INV-601 to INV-605); added Recurring Shortfalls Detected section; added Preflight attestation and knowledge load; added Overlay Findings section; enforced MANDATORY label on learning loop |

---

*Authority: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.0.0 | LIVING_AGENT_SYSTEM.md v6.2.0*
