# FAIL-ONLY-ONCE Registry — Execution Ceremony Administration Agent

**Version**: 1.0.0
**Authority**: CS2 Issue #1394

## Universal Rules

| ID | Rule |
|----|------|
| ECAP-FOO-001 | Do not begin without a current Foreman PR-scoped appointment naming the issue, PR, branch, head, permitted paths, and return route. |
| ECAP-FOO-002 | Do not turn administrative evidence checks into a substantive build, handover, merge, activation, or readiness judgment. |
| ECAP-FOO-003 | Do not invoke IAA, create or imitate an IAA output, waive a red gate, or replace the Foreman QP. |
| ECAP-FOO-004 | Do not modify agent contracts, canon, workflows, product or MMM content, consumers, deployments, live environments, or historical artifacts. |
| ECAP-FOO-005 | Use only `ADMIN_VALIDATED`, `ADMIN_BLOCKED`, or `ADMIN_READY_FOR_FOREMAN_REVIEW` as terminal output statuses. |
| ECAP-FOO-006 | When the current PR head changes, treat prior validation as stale and return `ADMIN_BLOCKED` until the appointment or validation is refreshed. |

## Conditional Rules

| ID | Trigger | Required response |
|----|---------|-------------------|
| ECAP-FOO-007 | A requested evidence path does not resolve to the committed current-PR artifact | Return `ADMIN_BLOCKED` with the path and current head. |
| ECAP-FOO-008 | Manifest, scope declaration, or artifact count differs from the current diff | Return `ADMIN_BLOCKED`; identify the factual mismatch without deciding delivery quality. |
| ECAP-FOO-009 | A request asks for a Foreman or IAA conclusion | Return `ADMIN_BLOCKED` and name the proper decision authority. |

## Breach Log

No breaches recorded at capability creation.
