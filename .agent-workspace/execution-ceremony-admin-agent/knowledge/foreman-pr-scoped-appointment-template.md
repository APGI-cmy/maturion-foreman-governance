# Foreman PR-Scoped ECAP Appointment Template

**Version**: 1.0.0
**Authority**: CS2 Issue #1394 and `EXECUTION_CEREMONY_ADMINISTRATION_PROTOCOL.md`

## Canonical Path

Foreman creates one new appointment at:

```text
.agent-admin/appointments/pr-<PR_NUMBER>-execution-ceremony-admin-agent-<YYYYMMDD>.md
```

The appointment applies to one PR and one recorded head. It must not reuse a historical appointment.

## Required Appointment Content

```markdown
# Appointment — execution-ceremony-admin-agent — PR #<PR_NUMBER>

**Appointment ID**: ECAP-<PR_NUMBER>-<YYYYMMDD>
**Date**: <YYYY-MM-DD>
**Appointed by**: foreman-v2
**Authority**: EXECUTION_CEREMONY_ADMINISTRATION_PROTOCOL.md
**Issue**: #<ISSUE_NUMBER>
**PR**: #<PR_NUMBER>
**Branch**: <branch>
**Base**: <base branch>
**Head**: <full commit SHA>
**Return To**: foreman-v2

## Bounded Administrative Mandate

Permitted checks:
- required-field presence;
- scope freshness;
- PR-admin freshness;
- evidence-path resolution; and
- commit-state truth.

Permitted write paths:
- .agent-admin/appointments/
- .agent-admin/evidence/
- .agent-admin/gates/
- .agent-admin/prehandover/
- .agent-admin/scope-declarations/
- .agent-workspace/execution-ceremony-admin-agent/memory/

## Required Evidence Paths

- <current PR manifest path>
- <current PR scope declaration path>
- <each appointment-specific artifact path>

## Prohibitions

ECAP must not make a substantive build, handover, merge, activation, or readiness decision; revise Foreman QP output; invoke IAA; produce an IAA output; waive a failed gate; alter product, MMM, canon, workflow, agent-contract, consumer, deployment, live-environment, or historical artifact.

## Return Condition

Return only ADMIN_VALIDATED, ADMIN_BLOCKED, or ADMIN_READY_FOR_FOREMAN_REVIEW. Include exact factual evidence and: "No substantive readiness judgment was made."
```

Before issuing an appointment, Foreman must replace every template marker with the current PR facts and confirm the recorded head is the intended administrative-review head.
