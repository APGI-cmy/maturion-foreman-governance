# Issue #1382 Bootstrap Identity Alias Evidence

**Date**: 2026-09-03
**Issue**: [#1382](https://github.com/APGI-cmy/maturion-foreman-governance/issues/1382)
**Branch**: `apgi-cmy-administrator-bootstrap-recovery`
**Authorization**: CS2 authorization in Issue #1382, refined by the controlling CS2 session.

## Authorized Change

The repository-local `mcp-servers/agent-bootstrap` server now registers the
canonical YAML identity `governance-repo-administrator-v2` as an alias for the
existing filename identity `governance-repo-administrator-v2.agent`. Both
identities resolve `.github/agents/governance-repo-administrator-v2.agent.md`.

The explicit alias registry in `agent-ids.js` is the repository-local source
of truth for canonical runtime identities that differ from contract filename
stems. File-stem discovery remains the source of truth for conventional
identities.

## Boundaries Preserved

- The administrator contract body, authority, and other identities are unchanged.
- The active user-level bootstrap runtime configuration is unchanged.
- No live runtime activation is claimed; its configuration must be repointed
  only after this branch is merged to the stable canonical checkout.
- ECAP, independent IAA, PREHANDOVER, merge readiness, and merge are not
  claimed by this evidence.

## Required Validation

- Focused automated coverage verifies the canonical and filename identities
  resolve the same administrator contract path.
- The bootstrap package test suite and JavaScript syntax checks are run on the
  changed files.
- JSON, whitespace, manifest, and PR-scope validators are recorded in the
  PR-specific gate-results artifact after the draft PR number is assigned.
