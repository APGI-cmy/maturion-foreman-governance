# Foreman-to-ECAP Appointment Template

**Version:** 1.0.0
**Effective date:** 2026-10-14
**Use:** Foreman supplies actual source values. Empty or conflicting required fields block appointment.

## Appointment record

| Required field | Value copied from authoritative source |
|---|---|
| Appointing Foreman identity and appointment reference | |
| Parent job identifier and existing alias, when applicable | |
| Wave identifier and task identifier | |
| Repository owner and repository name | |
| PR number, state, and URL, when applicable | |
| Branch name and exact source/head commit | |
| Substantive acceptance source and status | |
| Exact ceremony objective and expected return | |
| Exact artifact/read-path allowlist | |
| Exact ECAP own-workspace output location | |
| Original publisher for each owner-controlled record | |
| Required checklist and applicable canonical references | |
| Required commands/checks and expected evidence | |
| Known rejection, STOP_AND_FIX, or carried-forward conditions | |
| Explicit exclusions and prohibited operations | |
| Foreman return channel and decision owner | |

## Validation before appointment acceptance

1. Copy every value from the actual current owner source; do not synthesize an identifier or source head.
2. Verify that task, wave, PR, branch, and source commit identify the same work.
3. Verify substantive acceptance is explicit and precedes ordinary ECAP appointment.
4. List every source ECAP may read and every file it is expected to prepare.
5. Confirm all ECAP writes remain under `.agent-workspace/execution-ceremony-admin-agent/`.
6. Identify the legitimate publisher for any canonical owner file; ECAP returns its payload rather than writing it.
7. Preserve prior evidence and rejection history; define no reset or replacement task.
8. Confirm that Foreman retains administrative QP and IAA invocation, IAA retains verdict/token ownership, and CS2 retains merge authority.

An appointment is valid only when its source, fields, scope, and preconditions are verifiable. This form is not itself an appointment or authorization.
