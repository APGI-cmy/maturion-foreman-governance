# Foreman Quality Professor Verdict — PR #1420 Source Correction

**Timestamp (UTC):** 2026-10-13T11:22:04Z  
**Foreman:** foreman-v2  
**Authority:** CS2 direction in PR comment 6144331075  
**Reviewed head:** `f39073215201dbaf24d86e8f241b7077548a5261`  
**Task under review:** Bounded repair of independent finding 6143948027: authenticated contributor provenance and the IAA evidence-only exception.  
**Disposition:** **PASS — this bounded source-correction task only.** This is not a whole-PR acceptance, wave-close, merge-gate release, or handover verdict. PR #1420 remains **STOP_AND_FIX**.

## Work classification and boundary

The active `.admin/pr.json` classifies PR #1420 as a **standalone direct-CS2 proxy CI repair** and explicitly says PR #1419 does not supply this PR's scope or authority. The PR-scoped task record carries job alias `CS2-AUTOMATION-W1-W2-20261008`, but it is not a Foreman build-wave checklist: it contains no `TASK-<wave>-<seq>` task rows, no appointed builder, and no record of a Foreman-run 12-stage build. This verdict therefore assesses only the directly authorized source-correction task; it does not certify a Foreman-governed wave.

## Assessment evidence

1. Reviewed the source delta in `.github/scripts/trusted-iaa-assurance.js` against finding 6143948027. Contributor provenance now comes from matching GitHub Actions `push` receipts for each PR commit and requires exact commit SHA, source branch, repository, and nonempty original `actor.login`. It does not use Git author/committer fields or `triggering_actor`; absent authenticated receipts fail closed.
2. The IAA evidence-only exception is narrowed to canonical IAA Markdown records and IAA session-memory files. The changed implementation path, or arbitrary executable content under the assurance directory, is not exempt. The new regression cases exercise spoofed Git attribution, absent push provenance, and executable assurance-path content.
3. Exact-head GitHub Actions run [38387698532](https://github.com/APGI-cmy/maturion-foreman-governance/actions/runs/38387698532), job [115263447642](https://github.com/APGI-cmy/maturion-foreman-governance/actions/runs/38387698532/job/115263447642), reports the original checker suite **25/25 passed** and trusted evaluator suite **38/38 passed**, with **0 failures, 0 skipped, and 0 todo** in the latter. The same run's workflow YAML lint and token-usage check succeeded. These tests corroborate, but do not alone establish, this verdict; the source behavior above was reviewed against the bounded finding.
4. The active manifest and frozen scope enumerate 12 paths, matching the 12 files in the reviewed PR diff at the target head.

## Limitations and remaining blockers

At the latest GitHub check-run query (2026-10-13T11:22Z), PR #1420 had **26 check runs: 23 success, 2 failure, 1 in progress**. `iaa/assurance-check` (run 38387698532, job 115263447642) and `governance-ceremony/iaa-token-completeness` (run 38387698490, job 115263447329) fail because no PR-1420 IAA token exists; logs explicitly report the token is absent and the PREHANDOVER field is `PENDING`. The Copilot run 38389093762/job 115268113573 was still in progress. Consequently, this QP result does not declare all CI checks green.

The protected environment, dedicated status-publishing App identity, independent IAA issuer, and required status-source installation/runtime verification remain external administrator work. The trusted workflow is not thereby shown to be active on `main`. No IAA verdict/token, ECAP acceptance, live installed-source result, merge, or activation is asserted.

This direct-CS2 task has no Foreman-appointed builder or builder identity in its frozen task/scope inputs. No builder referral is issued and no builder identity is inferred. The original authorized source publisher remains responsible for any source correction and for reconciling any later evidence-file addition with the frozen manifest/scope.

## QP conclusion

**PASS for the bounded source repair of finding 6143948027 only.** The examined implementation corrects the identified trust-boundary defect, fails closed when authenticated source-push provenance is unavailable, narrows the IAA record exception, and has exact-head passing adversarial/regression test evidence. This conclusion is deliberately narrower than acceptance of the PR's remaining assurance and installation obligations. **STOP_AND_FIX remains in force.**

## ECAP appointment reconciliation

No durable PR-1420 ECAP appointment was found in the checked appointment records, agent workspace records, or available Git history; prior PR-1375/1377 appointments do not transfer to this job. No new appointment is made in this review. Under `EXECUTION_CEREMONY_ADMINISTRATION_PROTOCOL.md` §§5.2, 5.4, and 10.1, appointment is per job and follows substantive acceptance/readiness. The source-correction task passed its bounded QP, but the full PR job is not substantively accepted or ready for ceremony preparation while required assurance and administrator-installation gates remain open. In addition, the execution-ceremony-admin agent is not available in this session's specialist dispatch choices, so a proper handoff cannot be made here; no generic agent is substituted.

The following expected return payloads remain **not delivered** and may be authored only by a properly appointed ECAP:

- `.agent-workspace/execution-ceremony-admin-agent/bundles/PREHANDOVER-pr-1420-trusted-assurance-20261013.md`
- `.agent-workspace/execution-ceremony-admin-agent/bundles/session-pr-1420-trusted-assurance-20261013.md`

Foreman must make the first per-job appointment only after the full job reaches substantive readiness and the proper ECAP route is available. Until then, no ECAP acceptance, pre-brief, or ceremony bundle is implied.

Other open owner payloads are:

- **Independent IAA only:** the canonical PR-1420 assurance record, authenticated exact-head approval/review binding the record and its hash, and (only if IAA issues PASS) the dedicated IAA token file. No producer, Foreman, or ECAP may create or infer these.
- **Repository administrator / CS2:** protected environment and dedicated status App configuration, authorized independent IAA identity, expected required-check source, and actual installed-source/runtime verification. Branch tests and mocks cannot satisfy these.
- **Original source publisher:** reconcile this Foreman QP report with the frozen 12-path `.admin/pr.json` manifest and `.agent-admin/scope-declarations/pr-1420.md` before publishing it into the PR; this report does not itself amend the frozen scope.
