# Parking Station Suggestion - Session 021

**Date**: 2026-09-04
**Session**: session-021-20260904
**Triggering Issue**: #1394
**Status**: OUT OF SCOPE - separate CS2 authorization required
**Priority**: LOW

## Suggestion

Add a schema-level validation for canonical agent frontmatter that rejects the
legacy `secret` field, requires `secret_env_var`, requires each AGCFPP-001
policy reference for agent-contract changes, and recognizes constitutional
self-modification prohibitions.

## Boundary

This is a future validation-hardening proposal only. It does not authorize a
workflow, bootstrap, contract, or policy change in this appointment.
