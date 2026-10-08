#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../../.." && pwd)"
CHECKER="${REPO_ROOT}/.github/scripts/check-iaa-required.sh"
WORK_DIR="$(mktemp -d)"
trap 'rm -rf "${WORK_DIR}"' EXIT

PASS_COUNT=0
FAIL_COUNT=0

run_case() {
  local name="$1"
  local expected="$2"
  local base_ref="$3"
  local aawp_label="$4"
  local mat_label="$5"
  local changed_files="$6"
  local output="${WORK_DIR}/github-output"
  : > "${output}"

  BASE_REF="${base_ref}" \
  DEFAULT_BRANCH=main \
  AAWP_DELIVERABLE="${aawp_label}" \
  MAT_DELIVERABLE="${mat_label}" \
  CHANGED_FILES="${changed_files}" \
  GITHUB_OUTPUT="${output}" \
    bash "${CHECKER}" >/dev/null

  if grep -qx "iaa_required=${expected}" "${output}"; then
    echo "PASS: ${name}"
    PASS_COUNT=$((PASS_COUNT + 1))
  else
    echo "FAIL: ${name} expected iaa_required=${expected}"
    FAIL_COUNT=$((FAIL_COUNT + 1))
  fi
}

run_case "stacked contract changes defer to parent" false \
  copilot/parent false false $'.github/agents/example.md\ngovernance/quality/agent-integrity/example.md'
run_case "default-branch contract changes require IAA" true \
  main false false $'.github/agents/example.md'
run_case "explicit assurance label remains enforced on stacked PR" true \
  copilot/parent true false 'docs/example.md'
run_case "MAT assurance label remains enforced on stacked PR" true \
  copilot/parent false true 'docs/example.md'

echo "Result: ${PASS_COUNT}/4 passed; ${FAIL_COUNT}/4 failed"
[[ "${FAIL_COUNT}" -eq 0 ]]
