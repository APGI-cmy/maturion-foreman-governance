# Administrative Evidence Protocol

**Version:** 1.0.0
**Role:** execution-ceremony-admin-agent

## Inputs

- Reviewed commit SHA
- Merge base SHA
- Declared manifest scope
- Observed changed-path list
- Required evidence paths

## Deterministic Checks

1. Read the reviewed commit SHA and merge base from Git.
2. Generate the changed-path list for the exact comparison.
3. Compare the changed-path list with the manifest scope as ordered sets and record equality or both differences.
4. Resolve each required evidence path on the reviewed commit and record existence and non-empty content.
5. Check required fields by exact key presence.
6. Record the clean or dirty working-tree state without changing it.

## Boundary

These checks report observable facts. They do not decide substantive outcomes, waive a gate, invoke IAA, or alter runtime behavior.
