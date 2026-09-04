# Administrative Output Contract

**Version**: 1.0.0
**Authority**: CS2 Issue #1394

## Inputs

- A current Foreman PR-scoped appointment conforming to `foreman-pr-scoped-appointment-template.md`
- Current repository and PR metadata
- The appointment's explicitly named administrative evidence paths

## Record Schema

Every ECAP-created record must include:

| Field | Required content |
|-------|------------------|
| `status` | One of the three permitted terminal statuses |
| `issue` | Current appointed issue number |
| `pr` | Current appointed PR number |
| `branch` | Current appointed branch |
| `head` | Current appointed commit head |
| `checks` | Each permitted administrative check and its factual result |
| `evidence_paths` | Resolved paths and committed-state facts |
| `statement` | `No substantive readiness judgment was made.` |
| `return_to` | `foreman-v2` |

## Terminal Statuses

| Status | Meaning |
|--------|---------|
| `ADMIN_VALIDATED` | Requested administrative facts were checked and recorded; this is not a substantive decision. |
| `ADMIN_BLOCKED` | A required administrative fact is absent, stale, conflicting, or outside appointment scope. |
| `ADMIN_READY_FOR_FOREMAN_REVIEW` | The administrative record is current and committed for Foreman review; this is not a substantive decision. |

No other terminal status is permitted. In particular, ECAP must not emit an IAA output or a substantive quality or merge conclusion.
