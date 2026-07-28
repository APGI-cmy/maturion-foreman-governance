#!/usr/bin/env bash
set -u

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
VALIDATOR="${REPO_ROOT}/.github/scripts/validate-admin-ceremony-final-state.sh"
PASS_COUNT=0
FAIL_COUNT=0

if [ ! -x "${VALIDATOR}" ]; then
  echo "RED: required producer is missing or not executable: ${VALIDATOR}"
  echo "Scenarios blocked: 10"
  exit 1
fi

make_repo() {
  local root="$1"
  mkdir -p "${root}/.agent-admin/prehandover" "${root}/.agent-admin/assurance"
}

write_proof() {
  local root="$1"
  local name="$2"
  local pr_lines="$3"
  printf '%s\n' \
    '```yaml' \
    'final_state: COMPLETE' \
    "${pr_lines}" \
    'iaa_audit_token: PENDING' \
    'iaa_session_reference: PENDING' \
    '```' > "${root}/.agent-admin/prehandover/${name}"
}

write_token() {
  local root="$1"
  local name="$2"
  shift 2
  {
    printf '%s\n' '# IAA ASSURANCE TOKEN'
    for pr in "$@"; do
      printf 'PR: #%s\n' "${pr}"
    done
    printf '%s\n' 'Verdict: MERGE PERMITTED'
  } > "${root}/.agent-admin/assurance/${name}"
}

run_case() {
  local name="$1"
  local expected="$2"
  local setup="$3"
  local root
  root="$(mktemp -d)"
  make_repo "${root}"
  "${setup}" "${root}"

  set +e
  "${VALIDATOR}" "${root}" >/dev/null 2>&1
  local actual=$?
  set -e

  if { [ "${expected}" = "PASS" ] && [ "${actual}" -eq 0 ]; } ||
     { [ "${expected}" = "FAIL" ] && [ "${actual}" -ne 0 ]; }; then
    echo "PASS: ${name}"
    PASS_COUNT=$((PASS_COUNT + 1))
  else
    echo "FAIL: ${name} expected ${expected}, exit=${actual}"
    FAIL_COUNT=$((FAIL_COUNT + 1))
  fi
}

valid_1356() { write_proof "$1" proof-1356.md 'pr: 1356'; write_token "$1" iaa-token-session-035.md 1356; }
valid_1360() { write_proof "$1" proof-1360.md 'pr: 1360'; write_token "$1" iaa-token-session-037.md 1360; }
valid_1368() { write_proof "$1" proof-1368.md 'pr: 1368'; write_token "$1" iaa-token-session-044.md 1368; }
missing_identity() { write_proof "$1" proof-missing.md 'issue: 99'; write_token "$1" iaa-token-session-x.md 99; }
malformed_identity() { write_proof "$1" proof-malformed.md 'pr: abc'; write_token "$1" iaa-token-session-x.md 123; }
ambiguous_identity() { write_proof "$1" proof-ambiguous.md $'pr: 1356\npr: 1360'; write_token "$1" iaa-token-session-x.md 1356; }
missing_token() { write_proof "$1" proof-missing-token.md 'pr: 1356'; }
cross_pr_token() { write_proof "$1" proof-cross.md 'pr: 1356'; write_token "$1" iaa-token-session-cross.md 1360; }
bridge_token() { write_proof "$1" proof-bridge.md 'pr: 1356'; write_token "$1" iaa-token-session-bridge.md 1356 1360; }
duplicate_token() { write_proof "$1" proof-duplicate.md 'pr: 1356'; write_token "$1" iaa-token-session-a.md 1356; write_token "$1" iaa-token-session-b.md 1356; }

run_case "valid PR 1356" PASS valid_1356
run_case "valid PR 1360" PASS valid_1360
run_case "valid PR 1368" PASS valid_1368
run_case "missing proof identity" FAIL missing_identity
run_case "malformed proof identity" FAIL malformed_identity
run_case "ambiguous proof identity" FAIL ambiguous_identity
run_case "missing dedicated token" FAIL missing_token
run_case "cross-PR token" FAIL cross_pr_token
run_case "multi-PR bridge token" FAIL bridge_token
run_case "duplicate dedicated tokens" FAIL duplicate_token

echo "Result: ${PASS_COUNT}/10 passed; ${FAIL_COUNT}/10 failed"
[ "${FAIL_COUNT}" -eq 0 ]
