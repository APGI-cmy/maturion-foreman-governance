# IAA Pre-Brief — Zero-Tolerance Admin-Ceremony Closure Wave

**Pre-Brief ID**: iaa-prebrief-wave-zero-tolerance-admin-ceremony-closure-20260420
**Wave**: zero-tolerance-admin-ceremony-closure
**Issue**: APGI-cmy/maturion-foreman-governance#1355
**Branch**: copilot/implement-zero-tolerance-closure-wave
**Date**: 2026-04-20
**Prepared by**: foreman-v2 (copilot-swe-agent[bot])
**Authority**: governance/canon/IAA_PRE_BRIEF_PROTOCOL.md

---

## 1. Wave Summary

This wave implements the zero-tolerance admin-ceremony closure for the governance repo. It creates mechanical blocking infrastructure so that ceremony-defective artifacts (template leakage, placeholder tokens in COMPLETE proofs, alignment inventory overclaim, carried-forward source failures, cross-artifact contradiction) are rejected automatically before CS2 review.

## 2. Key Deliverables Under IAA Scope

| Task ID | Deliverable | Path |
|---------|------------|------|
| TASK-ZTAC-B-001 | Admin-ceremony defect gate workflow | `.github/workflows/admin-ceremony-defect-gate.yml` |
| TASK-ZTAC-B-002 | Updated governance/alignment job | `.github/workflows/merge-gate-interface.yml` |
| TASK-ZTAC-C-001 | Placeholder-check script (canon-bound) | `.github/scripts/validate-placeholder-check.sh` |
| TASK-ZTAC-D-001 | Alignment inventory overclaim check | Embedded in workflow |
| TASK-ZTAC-E-001 | Proof-of-operation document | `.agent-admin/evidence/proof-of-operation-zero-tolerance-closure-20260420.md` |
| TASK-ZTAC-E-002 | Adversarial rejection test fixtures | `.agent-admin/evidence/adversarial-rejection-fixtures-20260420.md` |

## 3. Expected Failure Modes This Wave Prevents

- `AAP-17`: Template instruction leakage in committed final-state artifacts
- `AAP-21`: Placeholder final-state fields in COMPLETE artifacts
- Alignment inventory overclaim: `ALIGNED` with TBD/placeholder hash/version
- Carried-forward source resolvability failure
- Cross-artifact contradiction (stale status markers in active bundle)
- Version/header/footer inconsistency

## 4. IAA Scope for This Wave

IAA should verify:
1. The admin-ceremony defect gate workflow correctly blocks all listed failure modes
2. The placeholder-check script correctly applies canonical exception classes (EXC-001 through EXC-005)
3. The governance/alignment job correctly prevents ALIGNED overclaim
4. The proof-of-operation artifacts demonstrate clean 3-layer pass
5. The adversarial rejection fixtures demonstrate deterministic rejection
6. No existing gate has been weakened or bypassed

## 5. Cross-Contract Authority Verification

IAA should verify no cross-contract contradiction on:
- Ownership: ECAP owns ceremony admin, Foreman owns IAA invocation, IAA is independent
- Path authority: `.agent-admin/prehandover/` for proofs, `.agent-admin/assurance/` for tokens
- Approval basis: CS2-only for canon changes, Foreman for wave decisions
- Final-state semantics: COMPLETE must not contain placeholder/PENDING values

## 6. Risk Notes

- This wave makes the governance repo itself the proof-of-operation artifact (the PR demonstrates clean passage)
- The adversarial fixtures are non-committed test inputs (stored in `.agent-admin/evidence/` as reference only)
- No existing agent contract is being modified — this wave adds CI enforcement infrastructure only

---

*IAA Pre-Brief v1.0 | Authority: IAA_PRE_BRIEF_PROTOCOL.md | Wave: zero-tolerance-admin-ceremony-closure | Date: 2026-04-20*
