#!/usr/bin/env bash
# validate-token-usage.sh — REQ-TU-001/REQ-TU-002 gate
#
# Scans .github/workflows/*.yml for prohibited GITHUB_TOKEN / github.token usage
# in write-capable step positions. Exits non-zero if any violation is found.
#
# Detection covers two distinct patterns (each checked separately):
#   (A) GH_TOKEN env var set to a prohibited token value, e.g.:
#         GH_TOKEN: ${{ github.token }}
#         GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
#         GH_TOKEN: ${{ secrets.MATURION_BOT_TOKEN || github.token }}
#   (B) action 'with: token:' field set to a prohibited token value, e.g.:
#         token: ${{ github.token }}
#         token: ${{ secrets.GITHUB_TOKEN }}
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

for workflow_file in "$WORKFLOW_DIR"/*.yml "$WORKFLOW_DIR"/*.yaml; do
  [ -f "$workflow_file" ] || continue
  SCANNED=$((SCANNED + 1))
  filename=$(basename "$workflow_file")

  while IFS= read -r line_num_content; do
    line_num="${line_num_content%%:*}"
    line="${line_num_content#*:}"

    # (A) GH_TOKEN env assignment using a prohibited token (including || fallback).
    #     Matches: GH_TOKEN: ${{ github.token }}, ${{ secrets.GITHUB_TOKEN }},
    #              or any expression containing github.token / secrets.GITHUB_TOKEN.
    if echo "$line" | grep -qE 'GH_TOKEN\s*:.*\$\{\{.*(github\.token|secrets\.GITHUB_TOKEN)'; then
      VIOLATIONS+=("$filename:$line_num: GH_TOKEN set to prohibited token: $line")
      continue
    fi

    # (B) action 'with: token:' field using a prohibited token.
    #     Matches: token: ${{ github.token }}, token: ${{ secrets.GITHUB_TOKEN }}
    if echo "$line" | grep -qE 'token:\s*\$\{\{.*(github\.token|secrets\.GITHUB_TOKEN)'; then
      VIOLATIONS+=("$filename:$line_num: action token: field set to prohibited token: $line")
    fi

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
