# Validation Evidence — Active-CS2 Multi-Wave Workflow

**Issue**: #1409  
**PR**: #1410  
**Frozen substantive submission**: `4fcb0d39d18d1c2fdde149ee2f76c24940140ade`
**Base**: `0284e45882d1937c8a7aa0a6280ab1cd2dc29d52`
**Evidence envelope**: `pr-1410-finalisation-2026-09-23`
**Date**: 2026-09-23
**Producer**: governance-repo-administrator-v2

This is the sole active producer evidence packet for the corrected substantive submission. It supersedes the packet committed at `643385854d60dd642cfc8823c05ea95cb295b854`, which remains preserved as historic Git evidence. This packet deliberately binds the frozen substantive content rather than the future commit that records this evidence.

## Static/schema evidence

`ACTIVE_CS2_JOB_WAVE.schema.json` accepts `valid-two-wave-pilot.json` and `valid-three-wave-plan.json`; `ACTIVE_CS2_MERGE_POLICY.schema.json` accepts `scoped-merge-policy.json`, through Draft 2020-12 validation. The wave collection is an array with a minimum only, so the three-wave fixture validates through the same path as the two-wave pilot.

`evaluator-rejection-cases.json` specifies static downstream evaluator acceptance cases, including token-only versus material assurance deltas and scoped merge-policy refusals. It is not a runtime-controller result; runtime enforcement remains an ISMS Foreman/specialist implementation responsibility.

The deterministic consumer-route parity check selects all ten required supporting artifacts from `CANON_INVENTORY.json.canons` with no top-level `artifacts` key, and verifies each selected file's SHA256 and content-producing commit bytes. The workflow trigger/filter includes the top-level control map.

## Canon provenance evidence

| Canon | SHA256 | Content-producing commit |
|---|---|---|
| ACTIVE_CS2_AUTOMATED_WORKFLOW_GOVERNANCE.md | `69cb6cb77d108d1c854420e883f58c7a3bd7b489398d0dd766d1d777ce733889` | `4fcb0d39d18d1c2fdde149ee2f76c24940140ade` |
| CS2_AGENT_FILE_AUTHORITY_MODEL.md | `2a75a2ae940743076a997dba380f76ce27460967e59c2c0b5f5a250871e077a6` | `f91a65db898ac44350aa2bacadd4728a0117330d` |
| ESCALATION_POLICY.md | `555852cf30eca3f33aee2cc76c08ccd64eead57f8a2de7cf85e09ccaf1803709` | `f91a65db898ac44350aa2bacadd4728a0117330d` |
| FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md | `8f43f1182441d6469590e1dff5bb177b86842b4d2d90f8c0e8beb7bebc1dc49c` | `f91a65db898ac44350aa2bacadd4728a0117330d` |
| INTERIM_CS2_AMC_AUTOMATION_GOVERNANCE.md | `2c43bbaa79a65dd480f644b82d67825d4642c5f9ad804c0a1ce2c75f4d21d9cf` | `f91a65db898ac44350aa2bacadd4728a0117330d` |
| MATURION_AGENT_NETWORK_ORGANIGRAM.md | `7ab67b534875fb6cebf43a42cc05e8ea842ed10906a0aaa40607b18b5f07ef0b` | `59c4fadb332042df8ed2dc7fa1bb2f2c4046f1bc` |
| THREE_TIER_AGENT_KNOWLEDGE_ARCHITECTURE.md | `fe51cfb7f7ca8a942b8de7692e7625bf4f3e8cde47d3e5a5ac7179da6f5fd29e` | `f91a65db898ac44350aa2bacadd4728a0117330d` |

The normal full inventory gate remains blocked by the shallow clone's missing historic commit objects (199 unrelated historical entries). The listed changed records and all ten newly indexed supporting artifacts were independently checked with `git show <commit>:<path> | sha256sum` and match their current bytes and inventory declarations.

## Current control status

- **Local deterministic checks**: PASS — JSON syntax, Draft 2020-12 positive fixtures, inventory selection/hash/provenance parity, workflow control-map filter, manifest structure, and direct base-diff scope parity.
- **GitHub Actions**: BLOCKED EXTERNALLY — each of the 12 pull-request runs at the frozen head reports `action_required` with zero jobs; the Actions API returns no failed job/log and a run-log request returns 404. The exact platform restriction is not exposed to this agent. The repository Actions administrator must inspect/approve the runs in GitHub Actions or provide the withheld restriction. Seven failed push workflow runs have the same zero-job condition and were observed on the base; they are inherited infrastructure defects, not passing checks and not changed here.
- **Independent IAA**: PENDING — invoked only after this final packet and scope declaration are committed on a clean tree.

## Layer-down disposition

Layer-down is not yet executable: upstream merge has not occurred, so there is no canonical main commit to dispatch. After human CS2 approval and merge, the configured dispatch must record the actual workflow run, ISMS issue, consumer PR, and ISMS-main parity. Any missing token, protected-contract gate, or conflicting ripple PR is an actionable blocker, not success.
