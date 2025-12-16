# Governance Convergence Merge Rule

## Purpose

During Governance Convergence Mode, the system is expected to be RED by design.
Standard merge gates are therefore temporarily reinterpreted under strict rules.

This document defines the ONLY allowed merge condition during convergence.

---

## Allowed During Convergence

A pull request MAY be merged if and only if:

1. The code compiles (no syntax or type errors)
2. FAIL → PASS overwrites are impossible
3. All failing checks are:
   - expected
   - explicitly declared
   - visible
4. No test is skipped, silenced, or bypassed
5. No governance semantics are weakened

---

## Forbidden During Convergence

- Merging with compilation errors
- Merging with hidden or skipped failures
- Merging by admin override
- Merging without explicit RED declaration
- Introducing new governance rules

---

## Exit Condition

This rule expires automatically when:
- Governance declares convergence COMPLETE

After exit:
- All standard merge gates apply with no exception

---

## Authority

Approved by: Johan  
Enforced by: Foreman
