# IAA ASSURANCE TOKEN — PR #1375

**PR**: #1375
**Issue**: #1374
**Date**: 2026-07-28
**IAA Session**: `IAA-20260728-PR1375-FINAL`
**Reviewed Head**: `fea60b89ee04870c9671104adb8c2f51ac852041`
**Classification**: `MIXED — CANON_GOVERNANCE + CI_SCRIPT + AGENT_ADMIN_ARTIFACT`
**Phases Verified**: 1-PASS, 2-PASS, 3-PASS, 4-PASS
**FFA Assessment**: NOT-REQUIRED
**Agent Integrity**: PASS
**Independence**: CONFIRMED

## Assurance Results

| Obligation | Result |
|---|---|
| Checklist gate | PASS — 12 `[x]`, 4 causally deferred `[~]`, 0 `[ ]` |
| Scope parity | PASS — 28/28 at reviewed head |
| QA-to-Red ordering | PASS |
| Generator fixtures | PASS — 4/4 independently re-executed |
| Validator | PASS — valid control plus 6/6 fail-closed boundaries |
| Inventory | PASS — 203/203, zero invalid provenance values |
| Provenance authenticity | PASS — 141 distinct content-producing commits |
| Deterministic regeneration | PASS |
| Semantic canon/policy drift | ZERO |
| Foreman QP | PASS |
| Prior blocked ECAP record | RETAINED AND TRUTHFUL |
| Canonical Admin-Ceremony repair | PASS — merged at `3e37fe454b68ee352146fdad070e898123196215` |
| Re-entry ECAP | ACCEPTED |
| Admin-Ceremony Defect Gate | PASS — run `30340670393` |

## Split Verdict

**ADMIN_PASS**: yes
**FUNCTIONAL_PASS**: NOT-ASSESSED
**VERDICT**: ADMIN_ONLY

## Final Verdict

**Verdict: MERGE PERMITTED**

Governance Ceremony run `30340670385` was red only at the expected first-invocation
`iaa-token-completeness` transition. This dedicated token resolves that transition. TASK-1375-013
must be recorded separately as PASS, exact scope parity must remain intact, and every hosted gate
must be Green before any later CS2 merge disposition.

**IAA signature**: IAA-20260728-PR1375-FINAL
