# PREHANDOVER Proof — Active-CS2 Multi-Wave Workflow

**Issue / PR**: #1409 / #1410  
**Classification**: governance-change / GOVERNANCE_CONTROL  
**Frozen substantive submission**: `54e2d5fd08d36c7b02468614734467cff32a6039`
**Evidence envelope**: `pr-1410-finalisation-2026-09-23`
**Authority**: Johan Ras / CS2 authorisation in issue #1409  
**Status**: PENDING RENEWED INDEPENDENT ASSURANCE — earlier R3 assurance is historical-only and does not cover frozen substantive submission `54e2d5fd08d36c7b02468614734467cff32a6039`

## Scope and authority

The delivery defines contract-ready governance only. It does not modify `.github/agents/**`, activate active CS2, start the ISMS pilot, merge itself, create credentials, or claim layer-down completion. The active-CS2 model permits one parent job with an arbitrary explicitly approved wave collection; two waves occur only in the initial pilot fixture.

## Required separation

- Interim CS2 remains advisory and its historic evidence is unchanged.
- Foreman retains orchestration, specialist appointment, ordinary remediation, gates, and evidence binding.
- IAA remains independent and cannot be replaced by active-CS2 review.
- Human CS2 retains activation, scope/envelope changes, breaker reset, costs/credentials, destructive actions, and constitutional authority.

## Drift evidence

| Canon | Before SHA256 | After SHA256 |
|---|---|---|
| ACTIVE_CS2_AUTOMATED_WORKFLOW_GOVERNANCE.md | N/A (new) | `69cb6cb77d108d1c854420e883f58c7a3bd7b489398d0dd766d1d777ce733889` |
| CS2_AGENT_FILE_AUTHORITY_MODEL.md | `a87f99eac31be2fc6d0d9bcf392dec685aa8422be9149520a098dc38ab8e44fe` | `2a75a2ae940743076a997dba380f76ce27460967e59c2c0b5f5a250871e077a6` |
| ESCALATION_POLICY.md | `27cb87ee3a0466086ee1459698fbf7daa3cd2ac6ba46e5039af92630c52be7ec` | `555852cf30eca3f33aee2cc76c08ccd64eead57f8a2de7cf85e09ccaf1803709` |
| FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md | `4c8e2f1818cc29fb1a564832a9eedb39724057a3ad0f75b8500a64f3a6c9b5e5` | `8f43f1182441d6469590e1dff5bb177b86842b4d2d90f8c0e8beb7bebc1dc49c` |
| INTERIM_CS2_AMC_AUTOMATION_GOVERNANCE.md | `52327b7356e6497c3e437b79f20a5e1adebba35fa70f84cfd836911d94dadfc2` | `2c43bbaa79a65dd480f644b82d67825d4642c5f9ad804c0a1ce2c75f4d21d9cf` |
| MATURION_AGENT_NETWORK_ORGANIGRAM.md | Uninventoried pre-change canon | `7ab67b534875fb6cebf43a42cc05e8ea842ed10906a0aaa40607b18b5f07ef0b` |
| THREE_TIER_AGENT_KNOWLEDGE_ARCHITECTURE.md | `3aaf14f2500eeeed93eecdd210d1a7b4defec7e004ad557f7f69c3f4742cd9d3` | `fe51cfb7f7ca8a942b8de7692e7625bf4f3e8cde47d3e5a5ac7179da6f5fd29e` |

## Validation

- PASS: JSON syntax and Draft 2020-12 validation for two-wave, three-wave, and scoped-policy fixtures; the merge-policy schema now rejects an incomplete protected-authority baseline.
- PASS: ten required layer-down artifacts are selected through the consumer's existing `canons` route; explicitly missing registered support files fail; discovery of new canon files with an existing inventory remains intact; two consecutive inventory regenerations produced identical SHA256 `96b2d53b53a996c06cda51ae62c37962f040b508013662ac0bd69678ad05eb12`.
- PASS: changed-canon current bytes equal the declared content-producing commits, duplicate wave ID/order rejection cases are explicit downstream evaluator fixtures, and the regenerated inventory now truthfully includes `CS2_GOVERNED_BUILD_GATE_CLASS_ROUTING_CANON.md`.
- PASS: `validate-canon-hashes.sh` now succeeds for all 217 inventory entries after fetching the missing read-only history required to preserve valid provenance.
- BLOCKED EXTERNALLY: 12 pull-request workflow runs at frozen substantive submission `54e2d5fd08d36c7b02468614734467cff32a6039` are `action_required` with zero jobs and no API-visible failure reason; representative runs include FM Failure Promotion Gate `35841749280`, Governance Gate `35841749215`, Merge Gate Interface `35841749079`, and Preflight Evidence Gate `35841749049`. `get_job_logs` for run `35841749280` reports zero failed jobs and `total_jobs=0`. Seven zero-job failed push runs are inherited from base and are not treated as passing.
- PENDING: renewed independent IAA audit is required for frozen substantive submission `54e2d5fd08d36c7b02468614734467cff32a6039`. `IAA-20260923-PR1410-R3`, reviewed at head `d61fe2df6d63a1c9e08fc26c7795656f4a36a6e0` for frozen substantive submission `cf0c3e8ae54e936ad516266d6adda4c94d9a4be5`, is preserved as historical-only evidence.

## Required downstream route

After upstream merge: `governance-layer-down-dispatch.yml` → ISMS layer-down issue → `ripple-integration.yml` → consumer PR → checks/review/merge → ISMS-main parity. The separate CodexAdvisor handoff and activation conditions are in `governance/ACTIVE_CS2_AUTOMATED_WORKFLOW_CONTROL_MAP.md`.
