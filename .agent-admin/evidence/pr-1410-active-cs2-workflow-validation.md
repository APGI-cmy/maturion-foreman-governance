# Validation Evidence — Active-CS2 Multi-Wave Workflow

**Issue**: #1409  
**PR**: #1410  
**Reviewed implementation head**: `643385854d60dd642cfc8823c05ea95cb295b854`  
**Date**: 2026-09-22  
**Producer**: governance-repo-administrator-v2

## Static/schema evidence

`ACTIVE_CS2_JOB_WAVE.schema.json` accepts both `valid-two-wave-pilot.json` and `valid-three-wave-plan.json` through Draft 2020-12 validation. The collection is an array with a minimum only, so the three-wave fixture validates through the same path as the two-wave pilot.

`evaluator-rejection-cases.json` specifies deterministic downstream acceptance cases for unknown/cyclic dependencies, duplicate/reordered events, budget reset, premature closure, stale assurance, post-PASS blockers, admin-only no-op, and forbidden self-authorising merge. Runtime enforcement remains an ISMS Foreman/specialist implementation responsibility.

## Canon provenance evidence

| Canon | SHA256 | Content-producing commit |
|---|---|---|
| ACTIVE_CS2_AUTOMATED_WORKFLOW_GOVERNANCE.md | `3616c7768f48ba3b547dce67ddb81edd20858377b55420344a28a337d51fe71b` | `f91a65db898ac44350aa2bacadd4728a0117330d` |
| CS2_AGENT_FILE_AUTHORITY_MODEL.md | `2a75a2ae940743076a997dba380f76ce27460967e59c2c0b5f5a250871e077a6` | `f91a65db898ac44350aa2bacadd4728a0117330d` |
| ESCALATION_POLICY.md | `555852cf30eca3f33aee2cc76c08ccd64eead57f8a2de7cf85e09ccaf1803709` | `f91a65db898ac44350aa2bacadd4728a0117330d` |
| FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md | `8f43f1182441d6469590e1dff5bb177b86842b4d2d90f8c0e8beb7bebc1dc49c` | `f91a65db898ac44350aa2bacadd4728a0117330d` |
| INTERIM_CS2_AMC_AUTOMATION_GOVERNANCE.md | `2c43bbaa79a65dd480f644b82d67825d4642c5f9ad804c0a1ce2c75f4d21d9cf` | `f91a65db898ac44350aa2bacadd4728a0117330d` |
| MATURION_AGENT_NETWORK_ORGANIGRAM.md | `7ab67b534875fb6cebf43a42cc05e8ea842ed10906a0aaa40607b18b5f07ef0b` | `59c4fadb332042df8ed2dc7fa1bb2f2c4046f1bc` |
| THREE_TIER_AGENT_KNOWLEDGE_ARCHITECTURE.md | `fe51cfb7f7ca8a942b8de7692e7625bf4f3e8cde47d3e5a5ac7179da6f5fd29e` | `f91a65db898ac44350aa2bacadd4728a0117330d` |

The normal full inventory gate is blocked by the shallow clone's missing historic commit objects (199 unrelated historical entries). The listed changed records were independently checked with `git show <commit>:<path> | sha256sum` and match their current bytes and inventory declarations.

## Layer-down disposition

Layer-down is not yet executable: upstream merge has not occurred, so there is no canonical main commit to dispatch. After human CS2 approval and merge, the configured dispatch must record the actual workflow run, ISMS issue, consumer PR, and ISMS-main parity. Any missing token, protected-contract gate, or conflicting ripple PR is an actionable blocker, not success.
