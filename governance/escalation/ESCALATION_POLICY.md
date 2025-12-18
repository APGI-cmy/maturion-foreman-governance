# AI Model Usage Escalation Policy

## Purpose
Control cost while preserving correctness and governance safety.

## Principle
The **overseeing intelligence must be at least one level higher**
than the implementing intelligence.

No layer may approve itself.

## Levels (Conceptual)
- L1: Builder / Implementer (routine work, cheaper model)
- L2: Foreman Runtime (coordination + guardrails)
- L3: Codex Control (independent oversight, rare)
- L4: Human + Highest model (last line of defense)

## Escalation Triggers
Escalate upward when any of the following occur:
- repeated CI failures without clear cause
- governance deadlock (merge blocked by phase mismatch)
- architecture ambiguity or contradictions
- security / permissions uncertainty
- repeated regressions or unstable behavior
- cross-repo changes required

## Cost Rule
Escalation is a *failure signal*.
Frequent escalation means the system below needs strengthening.
