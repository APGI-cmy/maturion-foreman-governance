#!/usr/bin/env bash
# test-validate-simple-pr-admin.sh
#
# Regression tests for .github/scripts/validate-simple-pr-admin.sh
# Covers Check 11 (governance-control path enforcement) and
# Check 13 (execution_model enforcement for implementation PRs).
#
# Authority: governance/canon/MMM_SIMPLE_PR_ADMIN_MODEL.md v1.2.0
#            governance/canon/POLC_EXECUTION_MODEL_CANON.md
#
# Usage:
#   bash .github/scripts/tests/test-validate-simple-pr-admin.sh
#
# Exit codes:
#   0 = all tests passed
#   1 = one or more tests failed
#
# Test coverage:
#   Check 11 — Governance-control path enforcement (requires_iaa/requires_ecap):
#   14. .agent-admin/ path in scope with requires_iaa=false → FAIL
#   15. .agent-admin/ path in scope with requires_iaa=true and requires_ecap=true → PASS
#   16. governance/ non-canon path in scope with requires_iaa=false → FAIL
#   17. governance/ non-canon path in scope with requires_iaa=true and requires_ecap=true → PASS
#   18. governance/canon/ path (existing pattern, now subsumed by governance/) → PASS (IAA enforced)
#   19. Product-fix scope without governance-control paths → PASS without IAA/ECAP enforcement
#
#   Check 13 — execution_model enforcement:
#   1.  Implementation files in scope + missing execution_model → FAIL
#   2.  Invalid execution_model value → FAIL
#   3.  builder-governed without implementing_agent → FAIL
#   4.  foreman-orchestrated without orchestrating_agent → FAIL
#   5.  foreman-orchestrated without implementing_agent → FAIL
#   6.  foreman-orchestrated without either orchestrating_agent or implementing_agent → FAIL
#   7.  cs2-hotfix-override without cs2_justification → FAIL
#   8.  cs2-hotfix-override with empty cs2_justification → FAIL
#   9.  Governance-only scope (no implementation files) → PASS without execution_model
#   10. builder-governed with all required fields → PASS
#   11. foreman-orchestrated with all required fields → PASS
#   12. cs2-hotfix-override with all required fields → PASS
#   13. execution_model present but no implementation file pattern in scope → PASS (tolerated)

set -euo pipefail

# ── Resolve paths ─────────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../../.." && pwd)"
VALIDATOR="${REPO_ROOT}/.github/scripts/validate-simple-pr-admin.sh"
WORK_DIR="$(mktemp -d)"
trap 'rm -rf "${WORK_DIR}"' EXIT

# ── Color helpers ─────────────────────────────────────────────────────────────
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

PASS_COUNT=0
FAIL_COUNT=0

pass() { echo -e "${GREEN}  PASS${NC}: $*"; PASS_COUNT=$((PASS_COUNT + 1)); }
fail() { echo -e "${RED}  FAIL${NC}: $*"; FAIL_COUNT=$((FAIL_COUNT + 1)); }

# ── Helpers ────────────────────────────────────────────────────────────────────
# Run validator on a manifest and check exit code.
# Usage: assert_exit <expected_exit_code> <label> <manifest_path>
assert_exit() {
    local expected="$1"
    local label="$2"
    local manifest="$3"
    local actual=0
    bash "${VALIDATOR}" --manifest "${manifest}" --skip-diff > /dev/null 2>&1 || actual=$?
    if [[ "$actual" == "$expected" ]]; then
        pass "${label}"
    else
        fail "${label} — expected exit ${expected}, got ${actual}"
    fi
}

# Check that validator output contains a specific substring.
# Usage: assert_output_contains <label> <manifest_path> <substring>
assert_output_contains() {
    local label="$1"
    local manifest="$2"
    local needle="$3"
    local output
    output=$(bash "${VALIDATOR}" --manifest "${manifest}" --skip-diff 2>&1 || true)
    if echo "$output" | grep -qF "${needle}"; then
        pass "${label}"
    else
        fail "${label} — expected output to contain: '${needle}'"
        echo "    Actual output (last 10 lines):"
        echo "$output" | tail -10 | sed 's/^/      /'
    fi
}

# Write a manifest JSON file.
write_manifest() {
    local path="$1"
    local content="$2"
    echo "$content" > "${path}"
}

# ── Base valid manifest template (governance-only scope) ─────────────────────
# This manifest is valid for all existing checks 1-12.
BASE_MANIFEST='{
  "pr": 1600,
  "issue": 1555,
  "type": "product-fix",
  "owner": "Copilot",
  "scope": ["apps/mmm/src/pages/DashboardPage.tsx"],
  "risk": "low",
  "requires_iaa": false,
  "requires_ecap": false,
  "evidence_required": ["tests pass"],
  "merge_authority": "CS2"
}'

GOVERNANCE_ONLY_MANIFEST='{
  "pr": 1601,
  "issue": 1555,
  "type": "governance-change",
  "owner": "Copilot",
  "scope": [".github/workflows/some-gate.yml"],
  "risk": "high",
  "requires_iaa": true,
  "requires_ecap": true,
  "evidence_required": ["tests pass"],
  "merge_authority": "CS2"
}'

echo "======================================================="
echo "  validate-simple-pr-admin.sh — Check 11 + Check 13 Tests"
echo "  Authority: governance/canon/MMM_SIMPLE_PR_ADMIN_MODEL.md v1.2.0"
echo "======================================================="
echo ""

# ── Test 1: Implementation file in scope, execution_model missing → FAIL ─────
echo "Test 1: implementation files in scope + missing execution_model → FAIL"
M="${WORK_DIR}/t1.json"
write_manifest "${M}" "${BASE_MANIFEST}"
assert_exit 1 "Test 1 — exit code 1" "${M}"
assert_output_contains \
    "Test 1 — error message" \
    "${M}" \
    "execution_model is missing"
echo ""

# ── Test 2: Invalid execution_model value → FAIL ─────────────────────────────
echo "Test 2: invalid execution_model value → FAIL"
M="${WORK_DIR}/t2.json"
write_manifest "${M}" "$(echo "${BASE_MANIFEST}" | python3 -c "
import json, sys
d = json.load(sys.stdin)
d['execution_model'] = 'invalid-model'
print(json.dumps(d, indent=2))
")"
assert_exit 1 "Test 2 — exit code 1" "${M}"
assert_output_contains \
    "Test 2 — error message" \
    "${M}" \
    "is not accepted"
echo ""

# ── Test 3: builder-governed without implementing_agent → FAIL ────────────────
echo "Test 3: builder-governed without implementing_agent → FAIL"
M="${WORK_DIR}/t3.json"
write_manifest "${M}" "$(echo "${BASE_MANIFEST}" | python3 -c "
import json, sys
d = json.load(sys.stdin)
d['execution_model'] = 'builder-governed'
print(json.dumps(d, indent=2))
")"
assert_exit 1 "Test 3 — exit code 1" "${M}"
assert_output_contains \
    "Test 3 — error message" \
    "${M}" \
    "implementing_agent"
echo ""

# ── Test 4: foreman-orchestrated without orchestrating_agent → FAIL ───────────
echo "Test 4: foreman-orchestrated without orchestrating_agent → FAIL"
M="${WORK_DIR}/t4.json"
write_manifest "${M}" "$(echo "${BASE_MANIFEST}" | python3 -c "
import json, sys
d = json.load(sys.stdin)
d['execution_model'] = 'foreman-orchestrated'
d['implementing_agent'] = 'ui-builder'
print(json.dumps(d, indent=2))
")"
assert_exit 1 "Test 4 — exit code 1" "${M}"
assert_output_contains \
    "Test 4 — error message" \
    "${M}" \
    "orchestrating_agent"
echo ""

# ── Test 5: foreman-orchestrated without implementing_agent → FAIL ────────────
echo "Test 5: foreman-orchestrated without implementing_agent → FAIL"
M="${WORK_DIR}/t5.json"
write_manifest "${M}" "$(echo "${BASE_MANIFEST}" | python3 -c "
import json, sys
d = json.load(sys.stdin)
d['execution_model'] = 'foreman-orchestrated'
d['orchestrating_agent'] = 'foreman-v2'
print(json.dumps(d, indent=2))
")"
assert_exit 1 "Test 5 — exit code 1" "${M}"
assert_output_contains \
    "Test 5 — error message" \
    "${M}" \
    "implementing_agent"
echo ""

# ── Test 6: foreman-orchestrated without both orchestrating_agent and implementing_agent → FAIL
echo "Test 6: foreman-orchestrated without orchestrating_agent and implementing_agent → FAIL"
M="${WORK_DIR}/t6.json"
write_manifest "${M}" "$(echo "${BASE_MANIFEST}" | python3 -c "
import json, sys
d = json.load(sys.stdin)
d['execution_model'] = 'foreman-orchestrated'
print(json.dumps(d, indent=2))
")"
assert_exit 1 "Test 6 — exit code 1" "${M}"
echo ""

# ── Test 7: cs2-hotfix-override without cs2_justification → FAIL ─────────────
echo "Test 7: cs2-hotfix-override without cs2_justification → FAIL"
M="${WORK_DIR}/t7.json"
write_manifest "${M}" "$(echo "${BASE_MANIFEST}" | python3 -c "
import json, sys
d = json.load(sys.stdin)
d['execution_model'] = 'cs2-hotfix-override'
print(json.dumps(d, indent=2))
")"
assert_exit 1 "Test 7 — exit code 1" "${M}"
assert_output_contains \
    "Test 7 — error message" \
    "${M}" \
    "cs2_justification"
echo ""

# ── Test 8: cs2-hotfix-override with empty string cs2_justification → FAIL ───
echo "Test 8: cs2-hotfix-override with empty cs2_justification → FAIL"
M="${WORK_DIR}/t8.json"
write_manifest "${M}" "$(echo "${BASE_MANIFEST}" | python3 -c "
import json, sys
d = json.load(sys.stdin)
d['execution_model'] = 'cs2-hotfix-override'
d['cs2_justification'] = ''
print(json.dumps(d, indent=2))
")"
assert_exit 1 "Test 8 — exit code 1" "${M}"
assert_output_contains \
    "Test 8 — error message" \
    "${M}" \
    "cs2_justification"
echo ""

# ── Test 9: governance-only scope, no execution_model required → PASS ─────────
echo "Test 9: governance-only scope, execution_model not required → PASS"
M="${WORK_DIR}/t9.json"
write_manifest "${M}" "${GOVERNANCE_ONLY_MANIFEST}"
assert_exit 0 "Test 9 — exit code 0" "${M}"
assert_output_contains \
    "Test 9 — pass message" \
    "${M}" \
    "execution_model not required"
echo ""

# ── Test 10: builder-governed, all required fields → PASS ────────────────────
echo "Test 10: builder-governed with all required fields → PASS"
M="${WORK_DIR}/t10.json"
write_manifest "${M}" "$(echo "${BASE_MANIFEST}" | python3 -c "
import json, sys
d = json.load(sys.stdin)
d['execution_model'] = 'builder-governed'
d['implementing_agent'] = 'ui-builder'
print(json.dumps(d, indent=2))
")"
assert_exit 0 "Test 10 — exit code 0" "${M}"
assert_output_contains \
    "Test 10 — model accepted" \
    "${M}" \
    "execution_model: builder-governed"
echo ""

# ── Test 11: foreman-orchestrated, all required fields → PASS ────────────────
echo "Test 11: foreman-orchestrated with all required fields → PASS"
M="${WORK_DIR}/t11.json"
write_manifest "${M}" "$(echo "${BASE_MANIFEST}" | python3 -c "
import json, sys
d = json.load(sys.stdin)
d['execution_model'] = 'foreman-orchestrated'
d['orchestrating_agent'] = 'foreman-v2'
d['implementing_agent'] = 'ui-builder'
print(json.dumps(d, indent=2))
")"
assert_exit 0 "Test 11 — exit code 0" "${M}"
assert_output_contains \
    "Test 11 — model accepted" \
    "${M}" \
    "execution_model: foreman-orchestrated"
echo ""

# ── Test 12: cs2-hotfix-override, all required fields → PASS ─────────────────
echo "Test 12: cs2-hotfix-override with all required fields → PASS"
M="${WORK_DIR}/t12.json"
write_manifest "${M}" "$(echo "${BASE_MANIFEST}" | python3 -c "
import json, sys
d = json.load(sys.stdin)
d['execution_model'] = 'cs2-hotfix-override'
d['cs2_justification'] = 'Emergency fix approved by CS2 — ref: issue #9999'
print(json.dumps(d, indent=2))
")"
assert_exit 0 "Test 12 — exit code 0" "${M}"
assert_output_contains \
    "Test 12 — justification present" \
    "${M}" \
    "cs2_justification: present"
echo ""

# ── Test 13: execution_model present, no implementation file in scope → PASS ──
echo "Test 13: execution_model declared but no implementation file pattern in scope → PASS"
M="${WORK_DIR}/t13.json"
write_manifest "${M}" "$(echo "${GOVERNANCE_ONLY_MANIFEST}" | python3 -c "
import json, sys
d = json.load(sys.stdin)
d['execution_model'] = 'builder-governed'
d['implementing_agent'] = 'ui-builder'
print(json.dumps(d, indent=2))
")"
assert_exit 0 "Test 13 — exit code 0" "${M}"
echo ""

# ── Check 11 Tests: Governance-control path enforcement ──────────────────────
echo "======================================================="
echo "  Check 11 — Governance-control path enforcement tests"
echo "======================================================="
echo ""

# Base manifest templates for Check 11 tests
AGENT_ADMIN_MANIFEST='{
  "pr": 1602,
  "issue": 1365,
  "type": "governance-change",
  "owner": "Copilot",
  "scope": [".agent-admin/prehandover/proof-1602.md"],
  "risk": "high",
  "requires_iaa": false,
  "requires_ecap": false,
  "evidence_required": ["tests pass"],
  "merge_authority": "CS2"
}'

AGENT_ADMIN_MANIFEST_IAA='{
  "pr": 1602,
  "issue": 1365,
  "type": "governance-change",
  "owner": "Copilot",
  "scope": [".agent-admin/prehandover/proof-1602.md"],
  "risk": "high",
  "requires_iaa": true,
  "requires_ecap": true,
  "evidence_required": ["tests pass"],
  "merge_authority": "CS2"
}'

GOVERNANCE_TEMPLATES_MANIFEST='{
  "pr": 1603,
  "issue": 1365,
  "type": "governance-change",
  "owner": "Copilot",
  "scope": ["governance/templates/execution-ceremony-admin/README.md"],
  "risk": "high",
  "requires_iaa": false,
  "requires_ecap": false,
  "evidence_required": ["tests pass"],
  "merge_authority": "CS2"
}'

GOVERNANCE_TEMPLATES_MANIFEST_IAA='{
  "pr": 1603,
  "issue": 1365,
  "type": "governance-change",
  "owner": "Copilot",
  "scope": ["governance/templates/execution-ceremony-admin/README.md"],
  "risk": "high",
  "requires_iaa": true,
  "requires_ecap": true,
  "evidence_required": ["tests pass"],
  "merge_authority": "CS2"
}'

PURE_PRODUCT_FIX_MANIFEST='{
  "pr": 1604,
  "issue": 1365,
  "type": "product-fix",
  "owner": "Copilot",
  "scope": ["apps/mmm/src/pages/DashboardPage.tsx"],
  "risk": "low",
  "requires_iaa": false,
  "requires_ecap": false,
  "evidence_required": ["tests pass", "screenshot proof"],
  "merge_authority": "CS2",
  "execution_model": "builder-governed",
  "implementing_agent": "ui-builder"
}'

# ── Test 14: .agent-admin/ path in scope, requires_iaa=false → FAIL ──────────
echo "Test 14: .agent-admin/ path in scope, requires_iaa=false → FAIL (Check 11)"
M="${WORK_DIR}/t14.json"
write_manifest "${M}" "${AGENT_ADMIN_MANIFEST}"
assert_exit 1 "Test 14 — exit code 1" "${M}"
assert_output_contains \
    "Test 14 — error message" \
    "${M}" \
    "Governance-control file in scope but requires_iaa is not true"
echo ""

# ── Test 15: .agent-admin/ path in scope, requires_iaa/ecap=true → PASS ──────
echo "Test 15: .agent-admin/ path in scope, requires_iaa=true + requires_ecap=true → PASS (Check 11)"
M="${WORK_DIR}/t15.json"
write_manifest "${M}" "${AGENT_ADMIN_MANIFEST_IAA}"
assert_exit 0 "Test 15 — exit code 0" "${M}"
assert_output_contains \
    "Test 15 — governance-control enforcement confirmed" \
    "${M}" \
    "requires_iaa=true and requires_ecap=true"
echo ""

# ── Test 16: governance/templates/ path in scope, requires_iaa=false → FAIL ──
echo "Test 16: governance/templates/ path in scope, requires_iaa=false → FAIL (Check 11)"
M="${WORK_DIR}/t16.json"
write_manifest "${M}" "${GOVERNANCE_TEMPLATES_MANIFEST}"
assert_exit 1 "Test 16 — exit code 1" "${M}"
assert_output_contains \
    "Test 16 — error message" \
    "${M}" \
    "Governance-control file in scope but requires_iaa is not true"
echo ""

# ── Test 17: governance/templates/ path in scope, requires_iaa/ecap=true → PASS
echo "Test 17: governance/templates/ path in scope, requires_iaa=true + requires_ecap=true → PASS (Check 11)"
M="${WORK_DIR}/t17.json"
write_manifest "${M}" "${GOVERNANCE_TEMPLATES_MANIFEST_IAA}"
assert_exit 0 "Test 17 — exit code 0" "${M}"
assert_output_contains \
    "Test 17 — governance-control enforcement confirmed" \
    "${M}" \
    "requires_iaa=true and requires_ecap=true"
echo ""

# ── Test 18: governance/canon/ path — still enforced by broader governance/ pattern → PASS (IAA enforced)
echo "Test 18: governance/canon/ path with requires_iaa=true → PASS (subsumed by broader governance/ pattern)"
M="${WORK_DIR}/t18.json"
write_manifest "${M}" "${GOVERNANCE_ONLY_MANIFEST}"
assert_exit 0 "Test 18 — exit code 0" "${M}"
assert_output_contains \
    "Test 18 — governance-control enforcement confirmed" \
    "${M}" \
    "requires_iaa=true and requires_ecap=true"
echo ""

# ── Test 19: pure product-fix scope, no governance-control paths → PASS without IAA enforcement
echo "Test 19: product-fix with app-only scope, no governance-control enforcement → PASS"
M="${WORK_DIR}/t19.json"
write_manifest "${M}" "${PURE_PRODUCT_FIX_MANIFEST}"
assert_exit 0 "Test 19 — exit code 0" "${M}"
assert_output_contains \
    "Test 19 — no governance-control enforcement" \
    "${M}" \
    "No governance-control files in scope"
echo ""

# ── Summary ───────────────────────────────────────────────────────────────────
echo "======================================================="
TOTAL=$((PASS_COUNT + FAIL_COUNT))
if [[ $FAIL_COUNT -eq 0 ]]; then
    echo -e "${GREEN}All ${TOTAL} tests passed${NC}"
    echo "======================================================="
    exit 0
else
    echo -e "${RED}${FAIL_COUNT} of ${TOTAL} tests FAILED${NC}"
    echo "======================================================="
    exit 1
fi
