# ECAP Bundle Checklist

**Version:** 1.0.0
**Effective date:** 2026-10-14
**Authority:** EXECUTION_CEREMONY_ADMINISTRATION_PROTOCOL (ECAP-001); class checklist 1.0.0
**Scope:** Administrative preparation for the exact job and artifact set in a verified Foreman appointment.

## Operating sequence

1. **Bind the appointment.** Use `foreman-ecap-appointment-template.md`; verify appointment source, Foreman, job, wave, task, repository, PR, branch, source/head, accepted substantive result, explicit read set, expected outputs, and return owner. Do not infer missing fields.
2. **Freeze the input list.** Record every required artifact from the appointment and the authoritative source that defines it. A newly discovered requirement or scope change returns to Foreman for authorized planning.
3. **Inventory actual artifacts.** For each required item, record path, owner, existence, committed status, source commit, hash when relevant, version/date when relevant, and exact observation. “Expected,” “mentioned,” or copied text is not proof of a committed artifact.
4. **Reconcile truth anchors.** Use the canonical execution-ceremony reconciliation matrix. Compare session, token, issue/PR, wave, branch, changed paths, status, versions, ripple/inventory claims, counts, gate evidence, and carried-forward claims to their named source.
5. **Check normalization.** Use the canonical ceremony checklist against only the active bundle. Confirm definitive statuses, compatible paths, actual commit-state, consistent versions, no leaked assembly instructions, and no historical proof mutation.
6. **Check every applicable anti-pattern.** Use the current canonical anti-pattern list. Any trigger is a blocking failure, not a discretionary warning.
7. **Respect write ownership.** Make corrections only to files under this agent's own workspace. For canonical or other owner artifacts, return the full proposed payload, source path, expected hash, and diff to the appointed publisher.
8. **Report each gate.** Preserve command, exact scope, exit status, output, and evidence reference for each check. No command or aggregate summary implies an unrun check.
9. **Return or stop.** Return a complete administrative package to Foreman, or a STOP_AND_FIX report naming exact mismatch and owner. Foreman alone decides substantive readiness, supervisory QP, and whether IAA is invoked.

## Required evidence columns

| Field | Source of truth |
|---|---|
| Requirement/artifact | Foreman appointment and applicable canonical checklist |
| Observed path and owner | Actual repository path and appointment ownership |
| Committed state and source head | Git state at the inspected source |
| Hash/version/date | Actual bytes and file metadata, when applicable |
| Result | PASS only for a completed check; otherwise FAIL, BLOCKED, or NOT RUN |
| Evidence | Exact command/output, line/path reference, or source record |
| Residual owner/action | Foreman, IAA, CS2, or original publisher as applicable |

## Bundle controls

- Treat the gate inventory as per-check results, never as one unexplained aggregate.
- Keep evidence from different heads, sessions, jobs, or assurance rounds separate.
- Treat an authorized scope amendment as prospective only; preserve prior task and assurance history.
- Do not edit committed PREHANDOVER proofs, old session records, prior IAA outcomes, or another role's source.
- Do not set active, commissioned, accepted, assured, merged, deployed, or live status based on file presence.
- Do not amend CANON_INVENTORY or global registries. Report any discovered obligation to its authorized owner.
- Keep task-specific human bootstrap review external and explicit; it grants no standing execution or runtime permission.

## Terminal results

`BUNDLE_READY_FOR_FOREMAN_REVIEW` means only that the assigned administrative checks are complete and the exact package is returned. `BLOCKED_STOP_AND_FIX` means at least one required source, check, or authority condition failed or is unresolved. Neither state is a substantive acceptance, IAA verdict, merge decision, or activation.
