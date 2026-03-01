#!/usr/bin/env bash
# validate-token-usage.sh — REQ-TU-001/REQ-TU-002 gate
#
# Scans .github/workflows/*.yml for prohibited GITHUB_TOKEN / github.token usage
# in write-capable steps. Exits non-zero if any violation is found.
#
# Usage: .github/scripts/validate-token-usage.sh [workflow-dir]
# Default workflow-dir: .github/workflows

set -euo pipefail

WORKFLOW_DIR="${1:-.github/workflows}"

if [ ! -d "$WORKFLOW_DIR" ]; then
  echo "⚠️  [REQ-TU-001] Workflow directory not found: $WORKFLOW_DIR — skipping"
  exit 0
fi

echo "[REQ-TU-001/REQ-TU-002] Scanning $WORKFLOW_DIR for prohibited token usage in write steps..."
echo ""

VIOLATIONS=()
SCANNED=0

# Patterns that indicate a write/mutation operation
WRITE_STEP_PATTERNS=(
  "git push"
  "git commit"
  "gh pr create"
  "gh pr merge"
  "gh issue create"
  "gh issue edit"
  "gh api.*-X POST"
  "gh api.*-X PATCH"
  "gh api.*-X PUT"
  "gh api.*-X DELETE"
  "gh api.*/dispatches"
  "gh api.*/merges"
  "gh api.*/pulls"
  "gh api.*/issues"
  "gh api.*/labels"
  "gh api.*/comments"
  "octokit.*create"
  "octokit.*update"
)

# Prohibited token references in any context
PROHIBITED_TOKEN_PATTERNS=(
  'github\.token'
  'secrets\.GITHUB_TOKEN'
)

for workflow_file in "$WORKFLOW_DIR"/*.yml "$WORKFLOW_DIR"/*.yaml; do
  [ -f "$workflow_file" ] || continue
  SCANNED=$((SCANNED + 1))
  filename=$(basename "$workflow_file")

  # Check for prohibited token patterns inline with write indicators in env blocks
  while IFS= read -r line_num_content; do
    line_num="${line_num_content%%:*}"
    line="${line_num_content#*:}"

    for prohibited in "${PROHIBITED_TOKEN_PATTERNS[@]}"; do
      if echo "$line" | grep -qE "$prohibited"; then
        # Check if this is in a GH_TOKEN env assignment or with: token: — these are write contexts
        if echo "$line" | grep -qE '(GH_TOKEN|GITHUB_TOKEN)\s*:.*\$\{\{|with:\s*token:|token:\s*\$\{\{'; then
          VIOLATIONS+=("$filename:$line_num: prohibited token in write context: $line")
        fi
        # Check if env block sets GH_TOKEN to github.token or GITHUB_TOKEN
        if echo "$line" | grep -qE 'GH_TOKEN\s*:\s*\$\{\{\s*(github\.token|secrets\.GITHUB_TOKEN)'; then
          VIOLATIONS+=("$filename:$line_num: GH_TOKEN set to prohibited token: $line")
        fi
      fi
    done
  done < <(grep -n "" "$workflow_file" || true)

done

echo "Scanned $SCANNED workflow file(s) in $WORKFLOW_DIR"
echo ""

if [ ${#VIOLATIONS[@]} -gt 0 ]; then
  echo "❌ [REQ-TU-001/REQ-TU-002] TOKEN USAGE VIOLATIONS FOUND: ${#VIOLATIONS[@]}"
  echo ""
  echo "The following workflow steps use a prohibited token (github.token / GITHUB_TOKEN)"
  echo "in a write-capable position. Replace with: \${{ secrets.MATURION_BOT_TOKEN }}"
  echo ""
  for violation in "${VIOLATIONS[@]}"; do
    echo "  VIOLATION: $violation"
  done
  echo ""
  echo "Required by: governance/canon/GOVERNANCE_TOKEN_USAGE_REQUIREMENTS.md REQ-TU-001, REQ-TU-002"
  echo "Fix: Replace github.token / secrets.GITHUB_TOKEN with secrets.MATURION_BOT_TOKEN"
  echo "     for all write-capable workflow steps (push, PR, issue, merge, dispatch)."
  exit 1
fi

echo "✅ [REQ-TU-001/REQ-TU-002] PASSED — No prohibited token usage in write steps found."
