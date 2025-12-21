# Escalation & Temporary Override Protocol (Governance-Level)

## Purpose

This protocol governs how an agent must behave when it becomes blocked by governance enforcement, legacy constraints, or structural mismatches that prevent progress but do not indicate intentional non-compliance.

The objective is to:
- Prevent silent halts
- Preserve governance integrity
- Enable controlled progress
- Capture procedural breaches as auditable incidents

---

## 1. Mandatory Escalation Trigger

An agent MUST escalate to Johan if ALL of the following are true:

- A required governance or PR gate fails
- The failure is caused by:
  - legacy enforcement logic, OR
  - structural mismatch, OR
  - missing registry entry that is not clearly mandated by canon
- The agent cannot proceed without:
  - weakening governance, OR
  - inventing authority, OR
  - bypassing enforcement

At this point, the agent MUST STOP execution and escalate.

---

## 2. Escalation Procedure (Required)

Upon escalation, the agent MUST:

1. Clearly describe:
   - The exact blocking condition
   - The specific file / check / rule involved
   - Why the failure is structural, not executional

2. Propose ONE narrowly scoped corrective action:
   - No alternatives
   - No scope expansion
   - No additional "cleanup"

3. Explicitly request:
   - **Temporary, one-time override authorization from Johan**

The agent MUST NOT proceed without explicit authorization.

---

## 3. Override Authorization Requirements

If Johan grants authorization, the override MUST be:

- Explicit (written, attributable to Johan)
- One-time only
- Narrowly scoped to the blocking issue
- Non-transferable to other domains or files
- Time-bound OR condition-bound

The authorization MUST specify:

- What is allowed
- What is forbidden
- The sunset condition

---

## 4. Mandatory Incident Registration

Every authorized procedural breach MUST be registered as an INCIDENT.

The incident record MUST include:

- Triggering condition
- Governance rule encountered
- Reason override was required
- Scope of override
- Authorizing authority (Johan)
- Date/time
- Affected governance components
- Planned remediation (e.g. removal of legacy check)

Incidents are NOT failures. They are governance learning inputs.

---

## 5. Post-Incident Obligations

After executing the authorized override, the agent MUST:

- Mark the affected artifact(s) as:
  - TEMPORARY
  - LEGACY COMPATIBILITY (if applicable)
  - PENDING REMOVAL or REVIEW
- Ensure no permanent canon is silently altered
- Reference the incident record in commits or documentation

---

## 6. Analytics & Learning

All incident records MUST be:

- Machine-readable
- Aggregatable
- Available for analytics

These incidents feed into:

- Governance evolution
- PR gate refinement
- Automation maturity metrics

Repeated incidents of the same type indicate a governance defect and MUST trigger learning promotion.

---

## 7. Absolute Prohibitions

An agent MUST NEVER:

- Self-authorize an override
- Silence or bypass a gate without authorization
- Add governance artifacts solely to satisfy enforcement
- Treat temporary overrides as permanent
- Proceed without incident registration

Violation of these rules invalidates the build or governance change.

---

## Principle

Governance may bend temporarily under explicit human authority, but it must never break silently.

---

**End of Escalation & Temporary Override Protocol**
