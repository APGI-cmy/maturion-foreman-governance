# Validation Evidence — Active-CS2 Multi-Wave Workflow

**Issue**: #1409  
**PR**: #1410  
**Frozen substantive submission**: `82af126e4469541fcd7c0d8c4dd81b891845b4e3`
**Base**: `0284e45882d1937c8a7aa0a6280ab1cd2dc29d52`
**Evidence envelope**: `pr-1410-finalisation-2026-09-23`
**Date**: 2026-09-23
**Producer**: governance-repo-administrator-v2

This is the sole active producer evidence packet for the corrected substantive submission. It supersedes the packet committed at `643385854d60dd642cfc8823c05ea95cb295b854`, which remains preserved as historic Git evidence, and replaces the earlier `4fcb0d39d18d1c2fdde149ee2f76c24940140ade` assurance packet as the active submission under review. This packet deliberately binds the frozen substantive content rather than the future commit that records this evidence.

## Static/schema evidence

`ACTIVE_CS2_JOB_WAVE.schema.json` accepts `valid-two-wave-pilot.json` and `valid-three-wave-plan.json`; `ACTIVE_CS2_MERGE_POLICY.schema.json` accepts `scoped-merge-policy.json`, through Draft 2020-12 validation. The wave collection is an array with a minimum only, so the three-wave fixture validates through the same path as the two-wave pilot. An incomplete `protected_authority_exclusions` baseline containing only `["AGENT_CONTRACT"]` is now rejected by the merge-policy schema.

`evaluator-rejection-cases.json` specifies static downstream evaluator acceptance cases, including token-only versus material assurance deltas, scoped merge-policy refusals, incomplete protected-authority baselines, and duplicate wave ID/ordinal ambiguity. It is not a runtime-controller result; runtime enforcement remains an ISMS Foreman/specialist implementation responsibility.

`scripts/regenerate_canon_inventory.py` now executes successfully against the full registered package, including the control map, both schemas, all five fixture files, and both templates through the existing `canons` route with no top-level `artifacts` key. Focused regression coverage proves explicitly missing registered support files still fail, and two consecutive runs produced the identical `governance/CANON_INVENTORY.json` SHA256 `c9bf52a4afc14e37dbecdfcfbc2b51754fccd4b8779ff90aeca4c9602077918f`. The workflow trigger/filter includes the top-level control map.

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
| ACTIVE_CS2_MERGE_POLICY.schema.json | `15ee9140c5c5a9bd4cde1ee15fc43eaba2662a955c214e2f700c7ce0810fd927` | `75d7d715c3945231cd1980cd78263f1fbc35381c` |
| active-cs2-job-wave/README.md | `2d29ee3acd042b2dd1a28eb3f86e86f69f3a00d066a3c0e8dd8d45405adfab0e` | `75d7d715c3945231cd1980cd78263f1fbc35381c` |
| evaluator-rejection-cases.json | `84cc4c1130c350b10a0183430be485bac880128b813aa67fff49ad76cd4b3449` | `75d7d715c3945231cd1980cd78263f1fbc35381c` |

The full canonical hash gate now passes after fetching the previously missing read-only history required to verify preserved provenance. The listed changed records and all ten newly indexed supporting artifacts were independently checked with `git show <commit>:<path> | sha256sum` and match their current bytes and inventory declarations.

## Current control status

- **Local deterministic checks**: PASS — JSON syntax, Draft 2020-12 positive fixtures, incomplete protected-authority baseline rejection, registered-supporting-artifact generator tests, two-run inventory determinism, `validate-canon-hashes.sh`, workflow control-map filter, manifest structure, and direct base-diff scope parity.
- **GitHub Actions**: BLOCKED EXTERNALLY — 12 current pull-request runs at frozen head `82af126e4469541fcd7c0d8c4dd81b891845b4e3` report `action_required` with zero jobs, including Governance Gate (`35835302606`), Preflight Evidence Gate (`35835302712`), Admin-Ceremony Defect Gate (`35835302734`), and Merge Gate Interface (`35835302775`). The Actions API exposes no failed jobs for these runs. Repository Actions administration must inspect/approve the runs in GitHub Actions or provide the withheld restriction. Seven failed push workflow runs with the same zero-job condition remain inherited infrastructure defects from the base path.
- **Independent IAA**: PASS — `ASSURANCE-TOKEN` issued by independent-assurance-agent session `IAA-20260923-PR1410-R2`, reviewed at head `dc4321b099029bccdb14749590d50e8a2ce3af9c` for frozen substantive submission `82af126e4469541fcd7c0d8c4dd81b891845b4e3`. The earlier `IAA-20260923-PR1410` token remains preserved as historic evidence for `4fcb0d39d18d1c2fdde149ee2f76c24940140ade` only.

## Layer-down disposition

Layer-down is not yet executable: upstream merge has not occurred, so there is no canonical main commit to dispatch. After human CS2 approval and merge, the configured dispatch must record the actual workflow run, ISMS issue, consumer PR, and ISMS-main parity. Any missing token, protected-contract gate, or conflicting ripple PR is an actionable blocker, not success.
