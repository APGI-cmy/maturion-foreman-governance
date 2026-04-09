# Builder Task Template — Foreman v2

**Version**: 1.0.0  
**Created**: 2026-04-09  
**Authority**: CS2 (Johan Ras)  
**Canonical Source**: `governance/canon/FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md`

---

## Purpose

Standard template for builder task specification files created by Foreman during the POLC_ORCHESTRATION mode (Phase 3 §3.5). All builder delegations MUST use this template.

File location: `.agent-workspace/foreman/builder-tasks/task-<TASK_ID>-<TIMESTAMP>.md`

---

## Builder Task Specification Template

```markdown
# Builder Task — <TASK_SUMMARY>

**Task ID**: TASK-<WAVE>-<SEQ>
**Wave**: <wave number>
**Date**: YYYY-MM-DD HH:MM UTC
**Foreman**: foreman-v2
**Priority**: B_H (Builder High — Build to Green mandatory)

---

## FM Order

Build to GREEN. Not 99% — 100%. Zero test debt. No exceptions.

---

## Task Description

<description of WHAT to build — not HOW>

---

## Architecture Reference

Architecture design: `architecture/design-<YYYYMMDD>.md`

Key design decisions:
- <decision 1>
- <decision 2>

Integration boundaries:
- <boundary 1>
- <boundary 2>

---

## Red QA Reference

Red QA suite: `qa/red-qa-<YYYYMMDD>.md`

Builder MUST make ALL tests GREEN. Tests are currently RED — that is correct and expected.

Zero test debt requirements:
- No `.skip()` or `.todo()` permitted
- No `// TODO` in implementation
- All test helpers must be fully implemented
- No stub implementations

---

## Acceptance Criteria

- [ ] All Red QA tests GREEN (100% pass rate, 0 failures, 0 skips)
- [ ] Zero test debt (verified by grep check)
- [ ] Evidence artifacts complete (test results + implementation summary)
- [ ] Handover documentation ready

---

## Evidence Required at Handover

1. Test results confirming 100% GREEN
2. Implementation summary (what was built, not how)
3. Any architecture deviations from design (must be documented and FM-approved)

---

## Escalation

If blocked or unable to achieve 100% GREEN → escalate to FM immediately.  
Do NOT submit partial work as complete.  
Do NOT merge without FM QP PASS verdict.

---

Authority: FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md
```

---

## Builder Delegation Record Template

When creating a builder task, also log the delegation in session memory:

```
**builder_agents_delegated**: 
  - task_id: TASK-<WAVE>-<SEQ>
    builder: <builder-agent-id>
    task_spec: .agent-workspace/foreman/builder-tasks/task-<TASK_ID>-<TIMESTAMP>.md
    delegated_at: YYYY-MM-DD HH:MM UTC
    architecture_ref: architecture/design-<YYYYMMDD>.md
    red_qa_ref: qa/red-qa-<YYYYMMDD>.md
    qp_verdict: PENDING
```

---

## Implementation Guard Delegation Template

When MODE: IMPLEMENTATION_GUARD is triggered (FM received implementation task), use this variant:

```markdown
# Builder Delegation — Implementation Guard Triggered

**Reason**: FM received an implementation task and correctly rejected it per POLC.
**Original Task**: <task description>
**Delegated To**: [appropriate builder agent]
**FM Order**: Implement per architecture spec. Build to 100% GREEN.
**Evidence Required**: Full evidence bundle including test results.
**Delegated At**: YYYY-MM-DD HH:MM UTC

---

Authority: FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md
```

---

**Tier 3 Canon Reference**: `governance/canon/FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md`  
**Tier 3 Canon Reference**: `governance/canon/FM_BUILDER_APPOINTMENT_PROTOCOL.md`
