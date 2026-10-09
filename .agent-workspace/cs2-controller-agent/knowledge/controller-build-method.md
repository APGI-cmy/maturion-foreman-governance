# Controller Build Method

**Version:** 1.0.0
**Effective date:** 2026-10-07
**Authority:** CS2 issue #1414

## Inputs and acceptance

Require the appointed Foreman's written task, CS2 authority reference, exact
repository/PR/branch/head, frozen architecture, acceptance criteria and accepted
QA-to-RED. For ISMS, the intended work item is the existing frozen W0 PR #2061,
after canonical capability assurance and normal layer-down, not a new W0 PR.
The inactive canonical capability may receive independent assurance despite #1380
and then #1379; they remain hard blocks on consumer layer-down, ISMS appointment,
implementation, activation, dispatch, operational merge/release and final controller
assurance.

RED evidence must identify requirement/test mappings, negative cases, commands,
source head, failure output and exit codes. Foreman creates/owns RED QA and
accepts any supplemental builder regression before implementation.

## Build and focused validation

Implement only the five contract patterns; all other paths are forbidden.
Use static/offline tests and mocked integrations, never live controller runs.
Map each requirement to its positive/negative behavior and test evidence.
Invalid, missing, stale or contradictory authority/evidence must deny safely
without dispatch or reserved side effects. No failure may automatically reset,
reenable, resume, bypass review or collect spend telemetry.

Run accepted RED-to-GREEN tests and focused controller unit/workflow-integration
regressions. Include error paths and proof of absent live side effects. Require
100% GREEN, zero skipped/disabled assertions, lint/format without warnings/errors,
applicable type-check/build and workflow/schema validation. Non-applicable gates
need a recorded Foreman-accepted rationale. A local pass is not IAA assurance.

## Evidence and memory without a scope exception

All builder-authored repository records live at
`.github/cs2-controller/evidence/cs2-controller-agent/`:

- `memory/session-NNN-YYYYMMDD.md`: task/appointment, reviewed prior sessions,
  source head, actions, decisions, changed paths with SHA256, test/gate results,
  outcomes, blockers, breaches, invoked roles, actual IAA status, improvement note.
- `PREHANDOVER-session-NNN-YYYYMMDD.md`: immutable committed proof with accepted
  RED reference, GREEN/regressions, static gates, scope check, Foreman QP and parity.
- Append-only command logs, RCA and `parking-station/suggestions-log.md`.

Keep at most five current memory sessions; preserve older records in
`memory/.archive/` under this same allowed root, with monthly summaries.
Read the last five sessions and any available read-only workspace archive at
preflight. On a first commissioned session, explicitly record that no earlier
builder sessions exist; do not invent commissioning or activation evidence.
Use the Living Agent System version from contract YAML in session records.
Ask Foreman/governance administration to mirror records into the standard
`.agent-workspace/cs2-controller-agent/memory/` location if required by ceremony.
The builder has no write exception there or at `.agent-admin/`.

Do not run tooling whose outputs escape the allowlist. Verify normalized paths,
reject traversal and escaping symlinks, and inspect actual diffs before handback.
Committed proof is immutable; any correction requires a new, source-bound artifact.

## Dependency, review and handback

Preserve canonical issues #1379/#1380 as release blockers until independently
disposed under their applicable process. Restored files or local hash validation
do not discharge that requirement. Missing governance, unknown authority,
unavailable dependencies or failed gates produce BLOCKED with exact evidence.
Record the capability as `INACTIVE_UNASSURED` separately from consumer use and
layer-down as `BLOCKED_PENDING_1380_AND_1379`. Capability assurance is not consumer
delivery, and it does not discharge either prerequisite.
Return implementation blockers to Foreman and protected-authority conflicts to
CS2 through Foreman; no self-repair of CANON or contracts.

Foreman owns independent QP, IAA pre-brief, final invocation and rejection-loop
re-invocation. Builder hands over committed evidence; independent IAA issues the
verdict/token. Foreman/ceremony owner records the token outside builder scope.
No final assurance claim, merge-ready state or consumer delivery without the
required final-source review and committed token. CS2 remains merge authority;
activation, live dispatch, deployment and successor release remain prohibited.
