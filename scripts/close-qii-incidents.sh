#!/bin/bash
#
# close-qii-incidents.sh
#
# Purpose: Close all QIC/QIEL/QII incident issues that represent environmental misalignment
# Issue Reference: #256 - QIC/QIEL/QII INCIDENT CONSOLIDATION & REMOVAL
#
# Prerequisites:
# - GitHub CLI (gh) installed and authenticated
# - Permission to close issues in the repository
#
# Usage:
#   ./scripts/close-qii-incidents.sh [--dry-run]
#

set -euo pipefail

# Configuration
REPO="MaturionISMS/maturion-foreman-app"
DRY_RUN=false

# Parse arguments
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=true
  echo "🔍 DRY RUN MODE - No issues will be closed"
  echo ""
fi

# List of all quality-integrity issues to close
ISSUES=(
  239 237 234 231 230 227 224 223 222 221
  220 219 218 215 214 213 212 209 208 207
  206 203 202 200 199 198 197 195 192 191
  186 184 183 182 180
)

# Closure comment template
read -r -d '' COMMENT << 'EOF' || true
## Resolution

This Quality Integrity Incident issue has been resolved via:

**QIEL Environment Alignment + Drift Detector Enforcement**

### Background

This issue was auto-generated during a period of environmental misalignment between development and CI environments. The root causes have been identified and resolved:

1. ✅ Environment alignment completed
2. ✅ Drift Detector enforcement active  
3. ✅ QIEL validation stabilized

### Impact

- Issue Type: Environmental Misalignment (Historical)
- Status: **RESOLVED**
- Resolution Date: 2025-12-08

These incidents no longer represent actionable quality issues and are being closed as part of the QIC/QIEL incident consolidation effort.

---

_This issue closure is part of [Issue #256](https://github.com/MaturionISMS/maturion-foreman-app/issues/256) - QIC/QIEL/QII Incident Consolidation & Removal_
EOF

# Function to close a single issue
close_issue() {
  local issue_number=$1
  
  if [[ "$DRY_RUN" == true ]]; then
    echo "  [DRY RUN] Would close issue #$issue_number"
    return 0
  fi
  
  # Close the issue with comment
  if gh issue close "$issue_number" --repo "$REPO" --comment "$COMMENT" 2>/dev/null; then
    echo "  ✅ Closed issue #$issue_number"
    return 0
  else
    echo "  ❌ Failed to close issue #$issue_number"
    return 1
  fi
}

# Main execution
main() {
  local total=${#ISSUES[@]}
  local closed=0
  local failed=0
  
  echo "════════════════════════════════════════════════════════════════════════════════"
  echo "QIC/QIEL/QII INCIDENT CONSOLIDATION & REMOVAL"
  echo "════════════════════════════════════════════════════════════════════════════════"
  echo ""
  echo "Repository: $REPO"
  echo "Total Issues to Close: $total"
  echo ""
  
  if [[ "$DRY_RUN" == false ]]; then
    echo "⚠️  This will close $total issues. Press Ctrl+C to abort."
    echo "   Continuing in 3 seconds..."
    sleep 3
    echo ""
  fi
  
  echo "Processing issues..."
  echo "────────────────────────────────────────────────────────────────────────────────"
  
  for issue in "${ISSUES[@]}"; do
    if close_issue "$issue"; then
      ((closed++))
    else
      ((failed++))
    fi
    
    # Rate limiting - be nice to GitHub API
    if [[ "$DRY_RUN" == false ]]; then
      sleep 1
    fi
  done
  
  echo "────────────────────────────────────────────────────────────────────────────────"
  echo ""
  echo "Summary:"
  echo "  Total Issues: $total"
  echo "  ✅ Successfully Closed: $closed"
  if [[ $failed -gt 0 ]]; then
    echo "  ❌ Failed: $failed"
  fi
  echo ""
  
  if [[ "$DRY_RUN" == true ]]; then
    echo "🔍 DRY RUN COMPLETE - No actual changes were made"
    echo ""
    echo "To execute for real, run:"
    echo "  ./scripts/close-qii-incidents.sh"
  else
    echo "✅ QII INCIDENT CONSOLIDATION COMPLETE"
    echo ""
    echo "Verification:"
    echo "  Run: gh issue list --repo $REPO --label quality-integrity --state open"
    echo "  Expected: No results"
  fi
  
  echo "════════════════════════════════════════════════════════════════════════════════"
  
  # Exit with error if any failed
  if [[ $failed -gt 0 && "$DRY_RUN" == false ]]; then
    exit 1
  fi
}

# Check if gh is installed
if ! command -v gh &> /dev/null; then
  echo "❌ Error: GitHub CLI (gh) is not installed"
  echo ""
  echo "Install it from: https://cli.github.com/"
  exit 1
fi

# Check if gh is authenticated
if ! gh auth status &> /dev/null; then
  echo "❌ Error: GitHub CLI is not authenticated"
  echo ""
  echo "Run: gh auth login"
  exit 1
fi

# Run main function
main
