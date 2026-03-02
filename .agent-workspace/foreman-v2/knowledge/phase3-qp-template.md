# Foreman Phase 3 — Quality Professor Templates

**Tier 2 Knowledge | Version**: 1.0.0  
**Referenced from**: `.github/agents/foreman-v2.agent.md` Phase 1 (Sections 1.6–1.7) and Phase 3

---

## Verb Classification Gate Script (Phase 1.6)

Full executable bash implementation for FM verb classification:

```bash
#!/bin/bash
# FM Verb Classification Gate v1.0.0
# Authority: governance/canon/ECOSYSTEM_VOCABULARY.md
# Priority: FM_H

echo "🔤 VERB CLASSIFICATION GATE"
echo "[FM_H] Extracting primary verb from task: '${TASK_DESCRIPTION}'"

classify_verb() {
  local task="${1}"
  local verb

  # Normalize to lowercase, extract first significant action word
  # NOTE: verb list derived from governance/canon/ECOSYSTEM_VOCABULARY.md Mode Reference Table.
  # If vocabulary is extended with new terms, update both ECOSYSTEM_VOCABULARY.md AND this pattern.
  verb=$(echo "${task}" | tr '[:upper:]' '[:lower:]' | grep -oE '\b(orchestrate|plan|organize|lead|coordinate|delegate|implement|build|code|write|fix|create|review|evaluate|qa|assess|validate|audit|escalate|canonize)\b' | head -1)

  case "${verb}" in
    orchestrate|plan|organize|lead|coordinate|delegate)
      echo "MODE:POLC_ORCHESTRATION"
      ;;
    implement|build|code|write|create)
      echo "MODE:IMPLEMENTATION_GUARD"
      ;;
    fix)
      echo "MODE:IMPLEMENTATION_GUARD"
      ;;
    review|evaluate|qa|assess|validate|audit)
      echo "MODE:QUALITY_PROFESSOR"
      ;;
    escalate)
      echo "MODE:ESCALATE"
      ;;
    canonize)
      echo "MODE:ESCALATE"
      ;;
    *)
      echo "MODE:UNKNOWN — consult governance/canon/ECOSYSTEM_VOCABULARY.md and escalate if unclear"
      ;;
  esac
}

DETECTED_MODE=$(classify_verb "${TASK_DESCRIPTION}")
echo "[FM_H] Detected mode: ${DETECTED_MODE}"

if [ "${DETECTED_MODE}" = "MODE:IMPLEMENTATION_GUARD" ]; then
  echo "❌ [FM_H] IMPLEMENTATION ATTEMPT DETECTED — Foreman cannot implement"
  echo "ACTION: Reject task as scoped to FM. Delegate to appropriate builder."
  exit 1
fi

if echo "${DETECTED_MODE}" | grep -q "MODE:UNKNOWN"; then
  echo "⚠️  [FM_H] Unknown verb — escalating to CS2"
  exit 1
fi

echo "✅ [FM_H] Verb classified. Activating mode: ${DETECTED_MODE}"
```

---

## Implementation Guard Delegation Script (Phase 1.7 Mode 2)

```bash
echo "❌ [FM_H][MODE:IMPLEMENTATION_GUARD] POLC Boundary Violation Detected"
echo "Task '${TASK_DESCRIPTION}' requires implementation — FM cannot implement."
echo "[FM_H] Creating builder delegation task..."
cat > .agent-workspace/foreman/builder-tasks/guard-delegation-$(date +%Y%m%d-%H%M%S).md <<EOF
# Builder Delegation — Implementation Guard Triggered

**Reason**: FM received an implementation task and correctly rejected it per POLC.
**Original Task**: ${TASK_DESCRIPTION}
**Delegated To**: [appropriate builder agent]
**FM Order**: Implement per architecture spec. Build to 100% GREEN.
**Evidence Required**: Full evidence bundle including test results.
EOF
echo "✅ [FM_H] Delegation created. FM returns to supervision mode."
```

---

## Quality Professor Evaluation Script (Phase 1.7 Mode 3)

Full executable bash implementation for Quality Professor evaluation:

```bash
#!/bin/bash
# FM Quality Professor Mode v1.0.0
# Priority: FM_H — MANDATORY before handover

echo "🎓 [FM_H][MODE:QUALITY_PROFESSOR] Quality Professor Activated"

TIMESTAMP=$(date -u +"%Y%m%dT%H%M%SZ")
QP_REPORT=".agent-admin/quality-professor/qp-verdict-${TIMESTAMP}.md"
mkdir -p .agent-admin/quality-professor

evaluate_quality() {
  local verdict="PASS"
  local issues=()

  # Check 1: 100% GREEN required
  if [ "${FAILED_TESTS:-0}" -gt 0 ] || [ "${SKIPPED_TESTS:-0}" -gt 0 ]; then
    verdict="FAIL"
    issues+=("NOT 100% GREEN: ${FAILED_TESTS:-0} failed, ${SKIPPED_TESTS:-0} skipped")
  fi

  # Check 2: Zero test debt
  local debt
  debt=$(grep -rE '\.skip\(|\.todo\(|// TODO' tests/ 2>/dev/null | wc -l)
  if [ "${debt}" -gt 0 ]; then
    verdict="FAIL"
    issues+=("Test debt detected: ${debt} occurrences")
  fi

  # Check 3: Evidence artifacts present
  if [ "$(ls .agent-admin/prehandover/proof-*.md 2>/dev/null | wc -l)" -eq 0 ]; then
    verdict="FAIL"
    issues+=("Missing prehandover evidence artifacts")
  fi

  # Check 4: Architecture alignment
  if ! ls architecture/design-*.md 2>/dev/null | grep -q .; then
    verdict="FAIL"
    issues+=("No architecture design document found")
  fi

  cat > "${QP_REPORT}" <<EOF
# Quality Professor Verdict — ${TIMESTAMP}

**Mode**: Quality Professor (FM_H)
**Verdict**: ${verdict}
**Evaluated By**: Foreman (Quality Professor Mode)
**Authority**: governance/canon/ECOSYSTEM_VOCABULARY.md, EVIDENCE_ARTIFACT_BUNDLE_STANDARD.md

## Evaluation Summary

$(if [ "${verdict}" = "PASS" ]; then
  echo "✅ All quality criteria satisfied. Deliverable is ready for merge."
else
  echo "❌ Quality criteria NOT satisfied. Merge gate BLOCKED."
  echo ""
  echo "## Issues Found"
  for issue in "${issues[@]}"; do echo "- ${issue}"; done
  echo ""
  echo "## Remediation Order"
  echo "Builder MUST fix all issues above before re-submission for Quality Professor review."
  echo "FM does NOT implement fixes — builder is responsible."
fi)

## Criteria Checked
- [x] 100% GREEN test results
- [x] Zero test debt (no .skip/.todo/stubs)
- [x] Evidence artifacts present
- [x] Architecture design document present

---
Authority: FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md | ECOSYSTEM_VOCABULARY.md v1.0.0
EOF

  echo "${verdict}"
  return $([ "${verdict}" = "PASS" ] && echo 0 || echo 1)
}

QP_VERDICT=$(evaluate_quality)

if [ "${QP_VERDICT}" = "FAIL" ]; then
  echo "❌ [FM_H][MODE:QUALITY_PROFESSOR] Verdict: FAIL — merge gate BLOCKED"
  echo "Report: ${QP_REPORT}"
  echo "[FM_H] Issuing builder remediation order..."
  exit 1
else
  echo "✅ [FM_H][MODE:QUALITY_PROFESSOR] Verdict: PASS — merge gate may proceed"
  echo "Report: ${QP_REPORT}"
fi
```

---

## Phase 3 Build Orchestration Scripts

### Architecture-First Design (3.1)

```bash
#!/bin/bash
# FM Build Orchestration - Architecture Phase
# Priority: FM_H (required before any builder appointment)

echo "🏗️  ARCHITECTURE DESIGN PHASE"
echo "[FM_H] Reviewing task requirements against canonical standards..."

if grep -qiE 'governance|canon|constitution' <<< "${TASK_DESCRIPTION}"; then
  echo "⚠️  [FM_H] Task touches protected governance - CS2 escalation required"
  exit 1
fi

echo "[FM_H] Designing architecture (PLAN phase)..."
cat > architecture/design-$(date +%Y%m%d).md <<EOF
# Architecture Design - ${TASK_SUMMARY}

**Date**: $(date -u +%Y-%m-%d)
**Priority**: FM_H
**Phase**: PLAN

## Requirements Analysis
${TASK_DESCRIPTION}

## Canonical Constraints
- BUILD_PHILOSOPHY.md: Must achieve 100% GREEN
- Must enforce zero test debt
- Must have complete handover evidence

## Architecture Design
[FM designs module structure, interfaces, integration points]

## Builder Task Specification
[FM specifies WHAT to build, not HOW to build it]

## Red QA Requirements
[FM lists test scenarios that must pass]

## Acceptance Criteria
- [ ] All Red QA tests GREEN
- [ ] Zero test debt
- [ ] Evidence artifacts complete
- [ ] Handover documentation ready

---
Authority: FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md
EOF

echo "✅ [FM_H] Architecture design complete"
```

### Red QA Creation & Builder Delegation (3.2)

```bash
#!/bin/bash
# FM Build Orchestration - Red QA & Builder Delegation
# Priority: FM_H

echo "🔴 RED QA CREATION & BUILDER DELEGATION"
echo "[FM_H] Creating Red QA test suite..."
cat > qa/red-qa-$(date +%Y%m%d).md <<EOF
# Red QA Test Suite - ${TASK_SUMMARY}

**Priority**: FM_H
**Status**: RED (must fail initially, builder makes GREEN)

## Test Scenarios (Builder Must Make GREEN)
- [ ] Functional tests
- [ ] Edge cases
- [ ] Integration tests
- [ ] Performance criteria

## Zero Test Debt Requirements
- All tests must run
- No .skip() or .todo()
- All helpers fully implemented

---
Builder Order: "Build to Green" - Make ALL tests pass 100%
EOF

echo "[FM_H] Creating builder appointment..."
cat > .agent-workspace/foreman/builder-tasks/task-$(date +%Y%m%d).md <<EOF
# Builder Task - ${TASK_SUMMARY}

**Priority**: B_H
**FM Order**: Build to Green

See: architecture/design-*.md and qa/red-qa-*.md

Mission: Make ALL Red QA tests GREEN. Not 99%, but 100%.

Zero Test Debt Mandate:
- No failing/skipped/incomplete tests
- No stub implementations
- Complete handover with evidence

Escalation: If blocked → escalate to FM
EOF

echo "✅ [FM_H] Builder delegated - FM SUPERVISES, does not implement"
```

### Supervision & QA Enforcement (3.3)

```bash
#!/bin/bash
# FM Supervision & QA Enforcement
# Priority: FM_H

echo "👁️  SUPERVISION & QA ENFORCEMENT"
echo "[FM_H] Verifying builder test results..."

if [ "${FAILED_TESTS}" -gt 0 ] || [ "${SKIPPED_TESTS}" -gt 0 ]; then
  echo "❌ [FM_H] NOT 100% GREEN - EXECUTION STOPPED"
  echo "FM ORDER: Fix ALL test debt, then re-run"
  exit 1
fi

STUB_COUNT=$(grep -rE '// TODO|\.skip\(|\.todo\(' tests/ 2>/dev/null | wc -l)
if [ "${STUB_COUNT}" -gt 0 ]; then
  echo "❌ [FM_H] HIDDEN TEST DEBT DETECTED"
  echo "FM ORDER: Remove ALL test debt"
  exit 1
fi

echo "✅ [FM_H] 100% GREEN VERIFIED"
echo "✅ [FM_H] Zero test debt verified"
```

---

**Authority**: LIVING_AGENT_SYSTEM.md v6.2.0 | FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md
