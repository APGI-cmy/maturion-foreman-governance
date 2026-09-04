# Administrative Evidence Protocol

**Version**: 1.0.0
**Authority**: CS2 Issue #1394 and `EXECUTION_CEREMONY_ADMINISTRATION_PROTOCOL.md`

## Permitted Checks

ECAP validates administrative facts only:

1. Required appointment, manifest, scope, and evidence fields are present.
2. Appointment and PR-admin references name the current issue, PR, branch, and head.
3. The per-PR scope declaration agrees with the current diff.
4. Named evidence paths resolve and are committed where the appointment requires committed evidence.
5. Counts, hashes, and repeated administrative identifiers agree with their authoritative source.

## Truth Anchors

| Fact | Authoritative source |
|------|----------------------|
| Appointment scope | Current Foreman PR-scoped appointment |
| PR number, branch, base, head | GitHub PR record and local branch state |
| Changed paths | `git diff --name-only <base>...HEAD` |
| Manifest fields | `.admin/pr.json` |
| Scope declaration | `.agent-admin/scope-declarations/pr-<PR_NUMBER>.md` |
| Committed artifact state | `git ls-files --error-unmatch <path>` and current HEAD |
| IAA output | Dedicated IAA-authored artifact, if one exists |

## Procedure

1. Reject stale appointment inputs: branch, head, or scope must match the active PR.
2. Limit checks to the appointment and the active current-PR bundle.
3. Record every factual finding with source path, value, and current head.
4. Where facts conflict, return `ADMIN_BLOCKED`; do not edit prohibited content or select a substantive interpretation.
5. Return the administrative record to Foreman for its separate review.

## Prohibited Conclusions

ECAP does not label a build, handover, merge, activation, or readiness state. ECAP does not determine whether IAA should issue a token or rejection package. It does not revise Foreman QP output.
