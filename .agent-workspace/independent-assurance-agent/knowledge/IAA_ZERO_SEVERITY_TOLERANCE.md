# IAA Zero-Severity-Tolerance Policy

**Agent**: independent-assurance-agent
**Version**: 1.0.0
**Status**: ACTIVE
**Last Updated**: 2026-03-05
**Authority**: CS2 (Johan Ras / @APGI-cmy)
**Enforced by**: CORE-021

---

## Purpose

This document defines the Zero-Severity-Tolerance policy for IAA assurance verdicts.
IAA operates a binary verdict model: ASSURANCE-TOKEN or REJECTION-PACKAGE. There is no
intermediate "informational", "advisory", or "minor finding" outcome.

Any finding — regardless of perceived severity, impact, or the producing agent's assessment
of its significance — is BLOCKING and results in a REJECTION-PACKAGE.

---

## Policy Statement

> **Any finding = REJECTION-PACKAGE. No exceptions. No severity tiers.**

IAA does not grade findings. IAA does not distinguish between "critical" and "minor" failures.
The only question is: does the evidence satisfy the check? YES = PASS. NO = FAIL = REJECTION-PACKAGE.

This policy applies to:
- All CORE invariant checks (CORE-001 through CORE-022 and any future checks)
- All overlay checks (OVL-AC-*, OVL-CG-*, OVL-CI-*, OVL-AM-*, OVL-AI-*, OVL-KG-*)
- All FAIL-ONLY-ONCE rules (A-001 through A-030 and any future rules)

---

## Prohibited Language Table

The following language is PROHIBITED in IAA verdicts and session memory. Use of any
prohibited term constitutes a Zero-Severity-Tolerance policy breach.

| Prohibited Term / Phrase | Why Prohibited | Required Replacement |
|--------------------------|----------------|----------------------|
| "minor finding" | Implies findings can be non-blocking | "Finding — REJECTION-PACKAGE required" |
| "informational only" | Implies a non-blocking outcome exists | Remove — all findings are blocking |
| "advisory finding" | Implies advisory mode is still active | Remove — Phase B is blocking |
| "low severity" | Introduces severity grading — not permitted | "Finding" (no severity qualifier) |
| "medium severity" | Introduces severity grading — not permitted | "Finding" (no severity qualifier) |
| "high severity" | Introduces severity grading — not permitted | "Finding" (no severity qualifier) |
| "could be addressed later" | Implies deferral of a blocking finding | Remove — all findings must be resolved before ASSURANCE-TOKEN |
| "not blocking in this case" | Implies per-instance blocking decisions | Remove — all findings are blocking |
| "recommend" (in a verdict) | Implies optional action | "Required" — all fixes are required |
| "suggest" (in a verdict) | Implies optional action | "Required" — all fixes are required |
| "PHASE_A_ADVISORY" (outside of legitimate Phase A invocation) | Phase A is CLOSED | Remove — Phase B is current; PHASE_A_ADVISORY is only valid when IAA tool itself issued it |
| "partial pass" | No partial passes exist | Remove — ASSURANCE-TOKEN or REJECTION-PACKAGE only |
| "conditional pass" | No conditional passes exist | Remove — ASSURANCE-TOKEN or REJECTION-PACKAGE only |

---

## Application

IAA applies this policy at every invocation:

1. **Before drafting a verdict**: scan own draft output for any prohibited language in the table above.
   Any match → remove and replace per the required replacement.

2. **During Phase 3 review**: if the PREHANDOVER proof or session memory of the producing agent
   contains prohibited language (e.g., producing agent self-assessed a "minor finding" as non-blocking),
   this is itself a finding → REJECTION-PACKAGE.

3. **In session memory**: the Learning Loop section must not contain prohibited language when
   describing findings from the current or prior sessions.

---

## Relationship to CORE-021

CORE-021 enforces this policy at the core invariants layer:

> CORE-021: Any finding regardless of severity = REJECTION-PACKAGE. Prohibited language table enforced.
> See `IAA_ZERO_SEVERITY_TOLERANCE.md`.

CORE-021 is checked on every qualifying PR invocation. A PREHANDOVER proof or session memory
that uses prohibited severity language = CORE-021 FAIL = REJECTION-PACKAGE.

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-03-05 | Initial creation — Zero-Severity-Tolerance policy formalised; prohibited language table defined; CORE-021 reference added |

---

**Authority**: CS2 (Johan Ras) | **Living Agent System**: v6.2.0
**Canonical Source**: `APGI-cmy/maturion-foreman-governance`
