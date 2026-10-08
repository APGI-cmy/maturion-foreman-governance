#!/usr/bin/env bash
set -euo pipefail

echo "=== IAA Trigger Check ==="
echo "Changed files:"
echo "${CHANGED_FILES}"

IAA_REQUIRED=false

if [[ "${AAWP_DELIVERABLE}" == "true" ]]; then
  echo "🔴 IAA required: label aawp-deliverable"
  IAA_REQUIRED=true
fi
if [[ "${MAT_DELIVERABLE}" == "true" ]]; then
  echo "🔴 IAA required: label mat-deliverable"
  IAA_REQUIRED=true
fi

if [[ "${BASE_REF}" == "${DEFAULT_BRANCH}" ]]; then
  if echo "${CHANGED_FILES}" | grep -qE '^\.github/agents/|^governance/agents/'; then
    echo "🔴 IAA required: agent contract file changed"
    IAA_REQUIRED=true
  fi
  if echo "${CHANGED_FILES}" | grep -qE '^governance/contracts/|.*-agent-contract\.md$'; then
    echo "🔴 IAA required: agent contract changed"
    IAA_REQUIRED=true
  fi
  if echo "${CHANGED_FILES}" | grep -qE '^governance/canon/'; then
    echo "🔴 IAA required: canon file changed"
    IAA_REQUIRED=true
  fi
  if echo "${CHANGED_FILES}" | grep -qE '^governance/quality/agent-integrity/'; then
    echo "🔴 IAA required: agent-integrity folder changed"
    IAA_REQUIRED=true
  fi
  if echo "${CHANGED_FILES}" | grep -qE '^\.github/workflows/merge-gate-interface\.yml$'; then
    echo "🔴 IAA required: merge gate workflow changed"
    IAA_REQUIRED=true
  fi
else
  echo "ℹ️  Deferring path-based IAA checks for stacked PR targeting '${BASE_REF}'; they will run against the default branch after integration."
fi

echo "iaa_required=${IAA_REQUIRED}" >> "${GITHUB_OUTPUT}"
if [[ "${IAA_REQUIRED}" == "true" ]]; then
  echo "✅ IAA check is REQUIRED for this PR"
else
  echo "ℹ️  IAA check is NOT required for this PR (docs-only / parking-station / admin / stacked PR)"
fi
