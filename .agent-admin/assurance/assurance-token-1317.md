# IAA Assurance Token — PR #1317

```
ASSURANCE-TOKEN
PR: #1317
Date: 2026-04-03
IAA Session: IAA-20260403-PR1317-R5-PASS
Phases Verified: 1-PASS, 2-PASS, 3-PASS, 4-PASS
Agent Integrity: PASS
Independence: CONFIRMED
Verdict: MERGE PERMITTED
```

**Branch**: copilot/update-frs-trs-architecture-templates  
**Submitting Agent**: copilot-swe-agent[bot]  
**IAA Session**: IAA-20260403-PR1317-R5-PASS  
**Date**: 2026-04-03  
**Supersedes**: IAA-20260403-PR1317-R4 (R4 token retained below as historical artifact per CS2 direction)  
**R5 Authority**: CS2 STOP-AND-FIX directive — R4 attested "18 == 18" but final diff contained 19 files after assurance-token-1317.md was committed as file #19; R5 corrects count to 19 == 19

---

## Phase Summary

| Phase | Verdict |
|-------|---------|
| Phase 1 (Preflight) | PASS |
| Phase 2 (Governance) | PASS |
| Phase 3 (Working) | PASS |
| Phase 4 (Handover) | PASS |
| Agent Integrity | PASS — 4/4 SHA256 exact match |
| Independence | CONFIRMED |
| A-026 Scope Parity | PASS — 19 == 19 exact match |
| A-030 Correction Addendum | PASS |
| Zero-Severity-Tolerance | PASS — zero findings |

**Verdict: MERGE PERMITTED**

---

## R5 Scope Parity Verification

`git diff --name-only origin/main...HEAD` returns exactly **19 files**:

1. `.agent-admin/assurance/assurance-token-1317.md` (this file — overwritten in place per CS2 authorization)
2. `.agent-admin/assurance/correction-addendum-1317-r3-20260403.md`
3. `.agent-admin/assurance/rejection-package-1317-r2.md`
4. `.agent-admin/assurance/rejection-package-1317-r3.md`
5. `.agent-admin/assurance/rejection-package-1317.md`
6. `.agent-admin/evidence/governance-proof-1317.md`
7. `.agent-admin/evidence/preflight-proof-1317.md`
8. `.agent-admin/evidence/working-proof-1317.md`
9. `.agent-admin/prehandover/prehandover_proof_1317_20260403.md`
10. `.agent-admin/waves/wave-frs-trs-ad-traceability-current-tasks.md`
11. `.agent-workspace/governance-repo-administrator/memory/session-copilot-1317-20260403.md`
12. `.agent-workspace/independent-assurance-agent/escalation-inbox/rejection-tracking-1317-r3-20260403.md`
13. `.agent-workspace/independent-assurance-agent/memory/session-022-20260403.md`
14. `.agent-workspace/independent-assurance-agent/memory/session-023-20260403.md`
15. `governance/CHANGELOG.md`
16. `governance/scope-declaration.md`
17. `governance/templates/FRS_TEMPLATE.md`
18. `governance/templates/TRS_TEMPLATE.md`
19. `governance/templates/minimum-architecture-template.md`

`governance/scope-declaration.md` FILES_CHANGED section lists exactly **19 files** — identical to the above list. Line count: **19 == 19**. EXACT MATCH.

---

## R4 Token — Historical Artifact (retained per CS2 direction)

> The following was the R4 token issued by IAA-20260403-PR1317-R4. It is retained here for
> auditability. The R4 token attested "18 == 18" at the time of issuance (when the diff had 18
> files). After the R4 token was committed as file #19, the final diff contained 19 files,
> creating a count contradiction. CS2 issued a STOP-AND-FIX requiring R5 to correct this.
> The R5 token above supersedes the R4 token. All substantive findings from R4 remain valid.

```
ASSURANCE-TOKEN (R4 — SUPERSEDED BY R5)
PR: #1317
Date: 2026-04-03
IAA Session: IAA-20260403-PR1317-R4
Phases Verified: 1-PASS, 2-PASS, 3-PASS, 4-PASS
Agent Integrity: PASS
Independence: CONFIRMED
Verdict: MERGE PERMITTED
Note: R4 scope parity attested 18 == 18 (correct at time of issuance; superseded by R5 which attests 19 == 19)
```
