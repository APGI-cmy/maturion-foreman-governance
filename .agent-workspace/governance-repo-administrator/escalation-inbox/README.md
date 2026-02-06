# Escalation Inbox

This directory receives escalations from other agents and external sources.

## Purpose

Enable cross-agent coordination and intelligent handoffs without requiring direct agent-to-agent communication.

## Incoming Escalation Format

```markdown
# Escalation from [Agent Type]

**Date**: YYYY-MM-DD HH:MM:SS  
**Priority**: [Critical|High|Medium|Low]  
**Type**: [Handoff|Question|Blocker|Review]

## Context
[What was the agent trying to do?]

## Issue
[What problem was encountered?]

## Attempted Solutions
[What was already tried?]

## Required Action
[What does this agent need to do?]

## References
- [Related files, issues, PRs]
- [Relevant documentation]

---
**From**: [Agent Type]  
**To**: [This Agent]  
**Status**: PENDING
```

## Workflow

1. **Receive**: Escalation file created by other agent
2. **Acknowledge**: Read and understand the escalation
3. **Act**: Resolve the issue or escalate further
4. **Document**: Record outcome in escalation file
5. **Resolve**: Move to `resolved/` directory

## Resolved Escalations

Processed escalations are moved to `escalation-inbox/resolved/` with:
- Original escalation content
- Resolution actions taken
- Outcome and learnings
- Date resolved

---

**Authority**: LIVING_AGENT_SYSTEM.md  
**Version**: 1.0.0  
**Last Updated**: 2026-02-06
