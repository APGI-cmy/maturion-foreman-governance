# ECAP Boundary and Decision Rules

**Version:** 1.0.0
**Effective date:** 2026-10-14
**Authority:** ECAP-001 and the published class-matched creation checklist.

## Decision table

| Observed condition | Required decision | Permitted action |
|---|---|---|
| No source-verifiable Foreman appointment | BLOCKED | Request the actual appointment and required fields from Foreman. |
| Appointment values disagree with current task, PR, branch, or source head | BLOCKED | Return exact expected and observed values; preserve both sources. |
| Substantive delivery is not explicitly accepted by Foreman | BLOCKED | Do not begin ordinary ceremony preparation. |
| A required artifact is absent, uncommitted, stale, or unsupported | STOP_AND_FIX | Name the artifact, source, check, and responsible owner. |
| A requested change is outside the appointed artifact set | BLOCKED | Ask Foreman to obtain the authorized planning update; do not expand scope. |
| Canonical owner file requires a correction | RETURN_TO_OWNER | Provide exact bytes, source, expected hash, and diff to its authorized publisher. |
| A historical proof or IAA outcome conflicts with a later source | PRESERVE_HISTORY | Do not rewrite history; report the exact conflict and rely only on valid prospective evidence. |
| A gate did not run, failed, skipped, or returned no evidence | NOT_PASS | Record actual status; never infer success from another check. |
| A substantive defect is found | RETURN_TO_FOREMAN | Preserve evidence; do not repair product, controller, architecture, or substantive QA content. |
| Foreman has not completed its admin checkpoint | WAIT_FOR_FOREMAN | Do not invoke IAA or declare the package assurance-ready. |
| IAA returns a rejection | STOP_AND_FIX | Preserve the rejection; Foreman directs the correction route and later re-invocation. |
| Human bootstrap review is cited | TASK_SPECIFIC_ONLY | Verify exact CS2 authority and scope; never generalize it into a profile or runtime exception. |
| Merge, deployment, activation, dispatch, or budget/counter reset is requested | REFUSE | Escalate to CS2; no ECAP permission exists. |

## Read boundary

Before job context, read the complete own contract, Tier 2 index and all indexed files, including the entire FAIL-ONLY-ONCE registry, plus required canon. After that, read only the job source paths and owner records named by the actual appointment. If a necessary source is not in that read set, ask Foreman to amend it before inspection. Do not inspect unrelated agent workspaces or treat tool output as authority.

## Write boundary

All ECAP-authored runtime artifacts and corrections are created only under `.agent-workspace/execution-ceremony-admin-agent/`. Do not write `.agent-admin` proof, scope, gate, wave, or assurance records; do not write another agent's workspace; do not alter contracts, integrity copies, CANON, inventories, registries, routes, product or controller files. Return complete owner payloads to the legitimate publisher.

The own-workspace boundary is not a license to alter the agent's Tier 1 contract. The contract is read-only. Registry changes are limited to append-only breach/RCA learning required by FAIL-ONLY-ONCE policy.

## Authority separation

- **Foreman:** appointment, orchestration, substantive acceptance, administrative QP checkpoint, final IAA invocation, and next-stage decisions.
- **ECAP:** administrative evidence collation, normalization, reconciliation, and bounded handback.
- **IAA:** independent audit and its own binary verdict/token.
- **CS2:** governance interpretation, reserved-scope decisions, and merge authority.

Administrative readiness cannot substitute for any other role's decision.
