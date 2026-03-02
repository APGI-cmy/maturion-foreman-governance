# IAA Zero-Severity-Tolerance Policy — Tier-2 Operational Knowledge
**Agent**: independent-assurance-agent  
**Version**: 1.0.0  
**Authority**: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.1.0 | CS2  
**Seeded**: 2026-03-02  
**Purpose**: Tier-2 operational reference for the Zero-Severity-Tolerance policy introduced in IAA canon v1.1.0. Load this file at session start alongside `iaa-core-invariants-checklist.md`.

---

## Core Rule

**Any finding — regardless of its perceived severity, size, wording, or scope — MUST trigger a `REJECTION-PACKAGE`.**

There is no concept of a "minor", "trivial", "cosmetic", or otherwise "passable" finding. The IAA binary output is `ASSURANCE-TOKEN` (no findings) or `REJECTION-PACKAGE` (any finding).

### Machine-Readable Policy

```
IF finding.exists == TRUE
THEN verdict = REJECTION-PACKAGE
REGARDLESS OF finding.perceived_severity
```

---

## Prohibited Language Table

The IAA MUST NOT use any of the following phrases to characterise a finding when issuing or considering an `ASSURANCE-TOKEN`. Detection of any prohibited phrase applied to an open finding is itself a policy violation.

| Prohibited Phrase  | Reason                                      |
|--------------------|---------------------------------------------|
| "minor"            | Implies finding is passable                 |
| "trivial"          | Implies finding is passable                 |
| "cosmetic"         | Implies finding is passable                 |
| "small"            | Implies finding is passable                 |
| "negligible"       | Implies finding is passable                 |
| "low-impact"       | Implies finding is passable                 |
| "not critical"     | Implies finding is passable                 |
| "can be ignored"   | Explicit bypass attempt                     |
| "does not affect"  | Implies finding is passable                 |
| "soft finding"     | Implies finding is passable                 |

> This list is non-exhaustive. Any phrasing that implies a finding is acceptable for merge constitutes a policy violation.

---

## Permitted Language

When a `REJECTION-PACKAGE` is issued, the IAA MAY note that a finding is **low-complexity to remediate** (to assist the submitting agent) — but this characterisation MUST NOT be used as a reason to issue an `ASSURANCE-TOKEN` instead.

Examples of permitted phrasing in a `REJECTION-PACKAGE`:

| Permitted Phrase                       | Context                            |
|----------------------------------------|------------------------------------|
| "finding present — simple to resolve" | In REJECTION-PACKAGE remediation guidance only |
| "low-effort fix required"              | In REJECTION-PACKAGE remediation guidance only |
| "one-line change needed"               | In REJECTION-PACKAGE remediation guidance only |

These phrases are **only** permitted inside a `REJECTION-PACKAGE`. They MUST NOT appear in an `ASSURANCE-TOKEN`.

---

## Operational Checklist

At every assurance invocation, apply the following Zero-Severity-Tolerance gate before issuing any verdict:

- [ ] **ZST-1**: Did any phase check (1–4) produce a finding? → `REJECTION-PACKAGE` (no exceptions)
- [ ] **ZST-2**: Does the assurance artifact contain any prohibited language characterising a finding as passable? → Policy violation; rewrite and issue `REJECTION-PACKAGE`
- [ ] **ZST-3**: Is the verdict clean `ASSURANCE-TOKEN`? → Confirm zero findings across all phases before finalising

This checklist maps to **INV-801** in `iaa-core-invariants-checklist.md`.

---

## Rationale

1. **Subjective severity classifications are a bypass vector.** Labelling a finding "minor" is a judgment call that can be gamed or drift over time. Zero-tolerance eliminates the vector entirely.
2. **Zero Test Debt policy.** The governance framework requires 100% clean builds. Any open finding violates Zero Test Debt.
3. **Independent assurance credibility.** An IAA that passes PRs with findings — however small — provides false assurance and undermines the independence guarantee.

---

## Canon Reference

This file operationalises the policy stated in:

> `governance/canon/INDEPENDENT_ASSURANCE_AGENT_CANON.md` v1.1.0 §Zero-Severity-Tolerance Policy

---

## Version History

| Version | Date       | Change |
|---------|------------|--------|
| 1.0.0   | 2026-03-02 | Initial creation — operationalises INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.1.0 §Zero-Severity-Tolerance Policy. Issue: Enforce zero-severity-tolerance — any finding triggers rejection. Authority: CS2. |

---

*Authority: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.1.0 | CS2 (Johan Ras)*
