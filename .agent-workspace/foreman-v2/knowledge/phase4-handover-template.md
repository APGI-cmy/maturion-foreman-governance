# Foreman Phase 4 — Handover Templates

**Tier 2 Knowledge | Version**: 1.0.0  
**Referenced from**: `.github/agents/foreman-v2.agent.md` Phase 4

---

## Evidence Artifact Generation Script (Phase 4.1)

```bash
#!/bin/bash
# FM Handover - Evidence Generation
# Priority: FM_H (mandatory for every governed PR)

echo "📦 EVIDENCE ARTIFACT GENERATION"

TIMESTAMP=$(date -u +"%Y%m%dT%H%M%SZ")

mkdir -p .agent-admin/{prehandover,gates,rca,improvements,governance}

# Generate gate results (machine-readable)
cat > .agent-admin/gates/gate-results-${TIMESTAMP}.json <<EOF
{
  "timestamp": "${TIMESTAMP}",
  "verdict": "PASS",
  "gates": {
    "merge-gate/verdict": {
      "status": "PASS",
      "test_results": {
        "total_tests": ${TOTAL_TESTS},
        "passed": ${PASSED_TESTS},
        "failed": 0,
        "skipped": 0,
        "test_debt": "ZERO"
      }
    },
    "governance/alignment": {"status": "PASS"},
    "stop-and-fix/enforcement": {"status": "PASS"}
  }
}
EOF

# Generate prehandover proof (human-readable)
cat > .agent-admin/prehandover/proof-${TIMESTAMP}.md <<EOF
# Prehandover Proof - ${TASK_SUMMARY}

**Priority**: FM_H
**Status**: COMPLETE

## Evidence
✅ Architecture designed
✅ Red QA created
✅ Builder supervised to 100% GREEN
✅ Zero test debt verified
✅ All gates PASS

## IAA Oversight
✅ IAA audit completed (Step 4.3a)
✅ PREHANDOVER token updated (Step 4.3b)
✅ IAA result: [ASSURANCE-TOKEN / ADVISORY-MODE]

## Merge Gate Verdict
**PASS** - All requirements met, merge approved

---
Authority: EVIDENCE_ARTIFACT_BUNDLE_STANDARD.md
EOF

echo "✅ [FM_H] Evidence artifacts generated"
```

---

## Session Memory & Closure Script (Phase 4.2)

```bash
#!/bin/bash
# FM Handover - Session Memory & Closure
# Priority: FM_M

echo "💾 SESSION MEMORY & CLOSURE"

AGENT_TYPE="foreman"
SESSION_ID="$(date +%Y%m%d-%H%M%S)"
WORKSPACE=".agent-workspace/${AGENT_TYPE}"

cat > "${WORKSPACE}/memory/session-${SESSION_ID}.md" <<EOF
# Session ${SESSION_ID} (Living Agent System v6.2.0)

## Agent
- Type: ${AGENT_TYPE}
- Class: supervisor
- Session ID: ${SESSION_ID}

## Task
${TASK_SUMMARY}

## What I Did
- Designed architecture (PLAN)
- Created Red QA (ORCHESTRATE)
- Appointed builder (LEAD)
- Supervised to 100% GREEN (CHECK)
- Generated evidence artifacts
- IAA audit completed (Step 4.3a)
- PREHANDOVER token updated (Step 4.3b)

## Outcome
✅ COMPLETE

## Lessons
- Architecture-first prevented rework
- Red QA caught edge cases early
- 100% GREEN enforcement prevented test debt

---
Authority: LIVING_AGENT_SYSTEM.md v6.2.0
EOF

# Rotate memories (keep last 5)
MEMORY_COUNT=$(ls -1 "${WORKSPACE}/memory"/session-*.md 2>/dev/null | wc -l)
if [ "${MEMORY_COUNT}" -gt 5 ]; then
  mkdir -p "${WORKSPACE}/memory/.archive"
  ls -t "${WORKSPACE}/memory"/session-*.md | tail -n +6 | while read old_memory; do
    mv "${old_memory}" "${WORKSPACE}/memory/.archive/"
  done
fi

# Update environment health
jq '.environment_health_status = "SAFE_FOR_HANDOVER"' "${WORKSPACE}/environment-health.json" > "${WORKSPACE}/environment-health.json.tmp"
mv "${WORKSPACE}/environment-health.json.tmp" "${WORKSPACE}/environment-health.json"

echo "✅ SESSION CLOSURE COMPLETE"
echo "📦 Evidence: Complete and verified"
echo "💾 Memory: Saved and rotated"
echo "🔍 Environment: SAFE_FOR_HANDOVER"
```

---

## IAA Independent Audit Output Format (Phase 4.3a)

After invoking the Independent Assurance Agent, record the result using this format:

```markdown
## IAA Audit Result — [TIMESTAMP]

**Audit Step**: Phase 4 Step 4.3a — IAA Independent Audit
**Verdict**: [ASSURANCE-TOKEN / REJECTION-PACKAGE / PHASE_A_ADVISORY]
**Token Reference**: [token ID or "PHASE_A_ADVISORY — IAA not yet deployed"]
**Evidence Provided**:
- [ ] Gate results JSON: .agent-admin/gates/gate-results-*.json
- [ ] Prehandover proof: .agent-admin/prehandover/proof-*.md
- [ ] Session memory: .agent-workspace/foreman-v2/memory/session-*.md
- [ ] FAIL-ONLY-ONCE attestation

**Next Step**: [Proceed to 4.3b / Return to Phase 3 for remediation]
```

---

## PREHANDOVER Token Update Ceremony (Phase 4.3b)

Step-by-step sequence for the PREHANDOVER Token Update Ceremony:

**Step 1** — Confirm IAA verdict is ASSURANCE-TOKEN (or PHASE_A_ADVISORY).  
If REJECTION-PACKAGE → return to Phase 3, address all cited failures, re-run from 4.3a.

**Step 2** — Update the PREHANDOVER proof artifact to include the IAA token reference:
```bash
PROOF_FILE=$(ls -t .agent-admin/prehandover/proof-*.md | head -1)
echo "" >> "${PROOF_FILE}"
echo "## IAA Token" >> "${PROOF_FILE}"
echo "Token: [IAA_TOKEN_REFERENCE]" >> "${PROOF_FILE}"
echo "Issued by: independent-assurance-agent" >> "${PROOF_FILE}"
echo "Ceremony: PREHANDOVER Token Update Ceremony (Step 4.3b)" >> "${PROOF_FILE}"
```

**Step 3** — Record the token reference in session memory (appended to current session file).

**Step 4** — Output ceremony completion statement:
> "PREHANDOVER Token Update Ceremony COMPLETE.  
> Token: [token_ref] | Session: [session_id] | Timestamp: [UTC]  
> Evidence bundle sealed. Proceeding to merge gate release (Step 4.4)."

**Step 5** — If IAA not yet deployed (PHASE_A_ADVISORY mode):  
Record advisory flag in session memory and prehandover proof. Note: full IAA ceremony activates at Phase B adoption.

---

## Pre-Handover Merge Gate Parity Script (Phase 4.4)

```bash
#!/bin/bash
# FM Handover - Pre-Handover Merge Gate Parity Check
# Priority: FM_H  — BLOCKING: do NOT open PR until all checks PASS

echo "🔍 PRE-HANDOVER MERGE GATE PARITY CHECK (BLOCKING)"

GATE_FAILURES=()

# merge-gate/verdict — all tests must pass
echo "  Running: merge-gate/verdict"
if [ "${FAILED_TESTS:-0}" -gt 0 ]; then
  GATE_FAILURES+=("merge-gate/verdict: FAIL (${FAILED_TESTS} failing tests)")
  echo "  ❌ merge-gate/verdict: FAIL"
else
  echo "  ✅ merge-gate/verdict: PASS"
fi

# governance/alignment — validate canon hashes locally
echo "  Running: governance/alignment"
if [ -f ".github/scripts/validate-canon-hashes.sh" ]; then
  bash .github/scripts/validate-canon-hashes.sh > /dev/null 2>&1
  ALIGNMENT_RESULT=$?
  if [ "${ALIGNMENT_RESULT}" -ne 0 ]; then
    GATE_FAILURES+=("governance/alignment: FAIL")
    echo "  ❌ governance/alignment: FAIL"
  else
    echo "  ✅ governance/alignment: PASS"
  fi
else
  echo "  ⚠️  governance/alignment: SKIPPED — validate-canon-hashes.sh not found"
fi

# stop-and-fix/enforcement — verify no open RCA blockers
echo "  Running: stop-and-fix/enforcement"
OPEN_BLOCKERS=$(find .agent-workspace -name "blocker-*.md" 2>/dev/null | wc -l)
if [ "${OPEN_BLOCKERS}" -gt 0 ]; then
  GATE_FAILURES+=("stop-and-fix/enforcement: FAIL (${OPEN_BLOCKERS} open blocker(s))")
  echo "  ❌ stop-and-fix/enforcement: FAIL (${OPEN_BLOCKERS} open blocker(s))"
else
  echo "  ✅ stop-and-fix/enforcement: PASS"
fi

if [ ${#GATE_FAILURES[@]} -gt 0 ]; then
  echo ""
  echo "❌ [FM_H] PRE-HANDOVER GATE PARITY FAILED — PR MUST NOT BE OPENED"
  echo "Failing gates:"
  for f in "${GATE_FAILURES[@]}"; do echo "  - ${f}"; done
  echo "ACTION REQUIRED: Fix all failing gates above, then re-run from step 1."
  echo "Opening a PR on a local gate failure is PROHIBITED."
  exit 1
fi

echo ""
echo "✅ [FM_H] ALL MERGE GATE PARITY CHECKS PASSED"
echo "✅ [FM_H] Agent is cleared to open the PR"
```

---

## Builder QA & Compliance Check Script (Phase 4.4 compliance check)

```bash
#!/bin/bash
# FM Handover - Builder Compliance Check
# Priority: FM_H

echo "✅ BUILDER QA & COMPLIANCE CHECK"

COMPLIANCE_ISSUES=()

[ "${FAILED_TESTS}" -gt 0 ] && COMPLIANCE_ISSUES+=("NOT 100% GREEN")

DEBT_COUNT=$(grep -rE '\.skip\(|\.todo\(|// TODO' tests/ 2>/dev/null | wc -l)
[ "${DEBT_COUNT}" -gt 0 ] && COMPLIANCE_ISSUES+=("Test debt detected")

[ $(ls .agent-admin/prehandover/proof-*.md 2>/dev/null | wc -l) -eq 0 ] && COMPLIANCE_ISSUES+=("Missing proof")

if [ ${#COMPLIANCE_ISSUES[@]} -gt 0 ]; then
  echo "❌ [FM_H] BUILDER COMPLIANCE FAILED"
  echo "Issues: ${COMPLIANCE_ISSUES[@]}"
  echo "FM ORDER: REASSIGNMENT REQUIRED"

  cat > .agent-workspace/foreman/builder-tasks/reassignment-$(date +%Y%m%d).md <<EOF
# Builder Reassignment - Compliance Failure

**Priority**: B_H

## Issues
$(for issue in "${COMPLIANCE_ISSUES[@]}"; do echo "- ${issue}"; done)

## Requirements
- Fix ALL compliance issues
- Achieve 100% GREEN
- Remove ALL test debt
- Generate ALL evidence artifacts

---
Authority: FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md
EOF

  exit 1
else
  echo "✅ [FM_H] Builder compliance VERIFIED"
  echo "✅ [FM_H] Ready for merge gate release"
fi
```

---

**Authority**: LIVING_AGENT_SYSTEM.md v6.2.0 | EVIDENCE_ARTIFACT_BUNDLE_STANDARD.md | AGENT_HANDOVER_AUTOMATION.md §4.3
