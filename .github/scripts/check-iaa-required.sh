#!/usr/bin/env bash
set -euo pipefail

fail() {
  echo "::error::$*" >&2
  exit 1
}

for name in BASE_REF DEFAULT_BRANCH PR_NUMBER GITHUB_OUTPUT; do
  [[ -n "${!name:-}" ]] || fail "Missing required context: ${name}"
done
[[ "${PR_NUMBER}" =~ ^[1-9][0-9]*$ ]] || fail "PR_NUMBER must be a positive integer"
git check-ref-format "refs/heads/${BASE_REF}" >/dev/null 2>&1 || fail "Invalid BASE_REF"
git check-ref-format "refs/heads/${DEFAULT_BRANCH}" >/dev/null 2>&1 || fail "Invalid DEFAULT_BRANCH"
for name in AAWP_DELIVERABLE MAT_DELIVERABLE; do
  case "${!name:-}" in
    true|false) ;;
    *) fail "${name} must be true or false" ;;
  esac
done

# Derive the diff from checkout history; caller-supplied file lists cannot bypass QA.
BASE_COMMIT=$(git rev-parse --verify "refs/remotes/origin/${BASE_REF}^{commit}") ||
  fail "Cannot resolve the PR base commit"
git rev-parse --verify HEAD >/dev/null || fail "Cannot resolve the submitted checkout"
CHANGED_FILES=$(git diff --name-only "${BASE_COMMIT}...HEAD" --) ||
  fail "Cannot obtain the PR diff"

echo "=== IAA Trigger Check ==="
echo "PR: ${PR_NUMBER}; base: ${BASE_REF}; default branch: ${DEFAULT_BRANCH}"
echo "Changed files:"
echo "${CHANGED_FILES}"

IAA_REQUIRED=false
if [[ "${AAWP_DELIVERABLE}" == true || "${MAT_DELIVERABLE}" == true ]]; then
  echo "IAA required: explicit assurance label"
  IAA_REQUIRED=true
fi

# Apply the existing path triggers on EVERY base. A branch name grants no exception.
if grep -qE '^\.github/agents/|^governance/agents/|^governance/contracts/|.*-agent-contract\.md$|^governance/canon/|^governance/quality/agent-integrity/|^\.github/workflows/merge-gate-interface\.yml$|^\.github/scripts/check-iaa-required\.sh$' <<< "${CHANGED_FILES}"; then
  echo "IAA required: qualifying governance path"
  IAA_REQUIRED=true
fi

echo "iaa_required=${IAA_REQUIRED}" >> "${GITHUB_OUTPUT}"
echo "IAA required: ${IAA_REQUIRED}"
