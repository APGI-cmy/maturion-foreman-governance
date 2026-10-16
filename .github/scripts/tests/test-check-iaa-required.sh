#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../../.." && pwd)"
CHECKER="${REPO_ROOT}/.github/scripts/check-iaa-required.sh"
TEMP_ROOT="$(cd "${TMPDIR:-/tmp}" && pwd -P)"
WORK_DIR="$(mktemp -d "${TEMP_ROOT}/pr1420-iaa-gate.XXXXXXXX")"
WORK_DIR="$(cd "${WORK_DIR}" && pwd -P)"
case "${WORK_DIR}" in
  "${TEMP_ROOT}"/pr1420-iaa-gate.*) ;;
  *) echo "Unsafe regression fixture directory" >&2; exit 1 ;;
esac
trap 'rm -rf "${WORK_DIR}"' EXIT
PASS_COUNT=0
FAIL_COUNT=0
CASE_COUNT=0

# Use real repositories and commits: tests exercise diff retrieval and decision code.
run_case() {
  local name="$1" expected="$2" base="$3" files="$4" mode="${5:-normal}"
  CASE_COUNT=$((CASE_COUNT + 1))
  local repo="${WORK_DIR}/repo-${CASE_COUNT}" output="${WORK_DIR}/output-${CASE_COUNT}"
  local log="${WORK_DIR}/log-${CASE_COUNT}" status=0
  mkdir -p "${repo}"
  (
    cd "${repo}"
    git init -q
    git config user.name 'IAA Gate Regression'
    git config user.email 'iaa-gate-test@example.invalid'
    git -c core.hooksPath=/dev/null commit -qm 'base' --allow-empty
    local seed
    seed=$(git rev-parse HEAD)
    git update-ref refs/remotes/origin/main "${seed}"
    if [[ -n "${base}" ]] && git check-ref-format "refs/heads/${base}" >/dev/null 2>&1; then
      git update-ref "refs/remotes/origin/${base}" "${seed}"
    fi
    while IFS= read -r path; do
      [[ -n "${path}" ]] || continue
      mkdir -p "$(dirname "${path}")"
      printf 'regression fixture\n' > "${path}"
      git add -- "${path}"
    done <<< "${files}"
    git -c core.hooksPath=/dev/null commit -qm 'submitted change' --allow-empty
    export BASE_REF="${base}" DEFAULT_BRANCH=main PR_NUMBER=1420
    export AAWP_DELIVERABLE=false MAT_DELIVERABLE=false GITHUB_OUTPUT="${output}"
    # The checker must ignore this untrusted override and inspect the real diff.
    export CHANGED_FILES='docs/spoofed-list.md'
    case "${mode}" in
      aawp) AAWP_DELIVERABLE=true ;;
      mat) MAT_DELIVERABLE=true ;;
      missing_base) unset BASE_REF ;;
      missing_default) unset DEFAULT_BRANCH ;;
      missing_pr) unset PR_NUMBER ;;
      invalid_pr) PR_NUMBER=0 ;;
      invalid_label) AAWP_DELIVERABLE=unknown ;;
      missing_output) unset GITHUB_OUTPUT ;;
      missing_ref) git update-ref -d "refs/remotes/origin/${base}" ;;
      unrelated_history)
        local orphan
        orphan=$(printf 'unrelated base\n' | git -c core.hooksPath=/dev/null commit-tree "$(git rev-parse HEAD^{tree})")
        git update-ref "refs/remotes/origin/${base}" "${orphan}"
        ;;
      spoof_qualifying) CHANGED_FILES='.github/agents/spoof.md' ;;
    esac
    bash "${CHECKER}"
  ) >"${log}" 2>&1 || status=$?

  if [[ "${expected}" == error ]]; then
    if [[ "${status}" -ne 0 ]] && ! grep -qx 'iaa_required=false' "${output}" 2>/dev/null; then
      echo "PASS: ${name}"
      PASS_COUNT=$((PASS_COUNT + 1))
      return
    fi
  elif [[ "${status}" -eq 0 ]] && grep -qx "iaa_required=${expected}" "${output}"; then
    echo "PASS: ${name}"
    PASS_COUNT=$((PASS_COUNT + 1))
    return
  fi
  echo "FAIL: ${name} (exit ${status}, expected ${expected})"
  cat "${log}"
  FAIL_COUNT=$((FAIL_COUNT + 1))
}

run_case 'default branch contract requires IAA' true main '.github/agents/example.md'
run_case 'stacked branch contract still requires IAA' true copilot/parent '.github/agents/example.md'
run_case 'unrelated release branch cannot defer IAA' true release/unrelated 'governance/canon/example.md'
run_case 'integrity reference requires IAA' true copilot/parent 'governance/quality/agent-integrity/example.md'
run_case 'governance agent path requires IAA' true main 'governance/agents/example.md'
run_case 'contract directory requires IAA' true main 'governance/contracts/example.md'
run_case 'contract suffix requires IAA' true main 'docs/example-agent-contract.md'
run_case 'parent final gate remains mandatory' true main '.github/workflows/merge-gate-interface.yml'
run_case 'checker-only change requires IAA' true main '.github/scripts/check-iaa-required.sh'
run_case 'checker-only change on stacked branch requires IAA' true copilot/parent '.github/scripts/check-iaa-required.sh'
run_case 'AAWP label requires IAA on stacked branch' true copilot/parent 'docs/example.md' aawp
run_case 'MAT label requires IAA on stacked branch' true copilot/parent 'docs/example.md' mat
run_case 'docs-only actual diff does not require IAA' false main 'docs/example.md'
run_case 'empty actual diff is permitted with valid context' false main ''
run_case 'spoofed qualifying file list does not replace actual diff' false main 'docs/example.md' spoof_qualifying
run_case 'missing base fails closed' error main '.github/agents/example.md' missing_base
run_case 'empty base fails closed' error '' '.github/agents/example.md'
run_case 'invalid base fails closed' error 'invalid..base' '.github/agents/example.md'
run_case 'missing default branch fails closed' error main '.github/agents/example.md' missing_default
run_case 'missing PR identity fails closed' error main '.github/agents/example.md' missing_pr
run_case 'invalid PR identity fails closed' error main '.github/agents/example.md' invalid_pr
run_case 'unknown label state fails closed' error main '.github/agents/example.md' invalid_label
run_case 'missing output destination fails closed' error main '.github/agents/example.md' missing_output
run_case 'unresolvable base fails closed' error main '.github/agents/example.md' missing_ref
run_case 'failed diff retrieval fails closed' error main '.github/agents/example.md' unrelated_history

echo "Result: ${PASS_COUNT}/${CASE_COUNT} passed; ${FAIL_COUNT}/${CASE_COUNT} failed"
[[ "${FAIL_COUNT}" -eq 0 ]]
