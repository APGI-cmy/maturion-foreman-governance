#!/bin/bash
# Issue #1 — Automated Issue Closure Script
# Simple bash implementation using GitHub CLI
# Requires: gh CLI authenticated

set -e

REPO="MaturionISMS/maturion-foreman-app"
DRY_RUN="${1:-false}"

echo "🚀 Issue #1 — Automated Issue Closure"
echo "Repository: $REPO"
echo "Mode: $([ "$DRY_RUN" = "true" ] && echo "DRY RUN (no changes)" || echo "LIVE (will close issues)")"
echo ""

# Quality Integrity Incidents to close
QII_ISSUES=(
  180 182 183 184 186 191 192 195 197 198 199 200 202 203 206 207
)

# Semantic Duplicates to close (keep the lower number)
DUPLICATE_ISSUES=(
  120  # Close, keep #117 (WSME)
  121  # Close, keep #118 (AIIE)
  122  # Close, keep #119 (DCLB)
)

DUPLICATE_ORIGINALS=(
  117  # Original for #120
  118  # Original for #121
  119  # Original for #122
)

echo "📊 Summary:"
echo "  Quality Integrity Incidents: ${#QII_ISSUES[@]}"
echo "  Semantic Duplicates: ${#DUPLICATE_ISSUES[@]}"
echo "  Total to close: $((${#QII_ISSUES[@]} + ${#DUPLICATE_ISSUES[@]}))"
echo ""

# Function to close a QII issue
close_qii() {
  local issue_num=$1
  
  if [ "$DRY_RUN" = "true" ]; then
    echo "  [DRY RUN] Would close QII #$issue_num"
    return
  fi
  
  echo "  Closing QII #$issue_num..."
  
  # Add comment
  gh issue comment "$issue_num" --repo "$REPO" --body "**Closed by Foreman Issue #1 — Backlog Normalization**

This auto-generated Quality Integrity Incident has been closed as part of systematic backlog cleanup.

✅ **Reason**: CI-generated QA incidents are being replaced by improved QIEL workflows.

🔗 **Related**: Issue #1 — Backlog Normalization & Incident Cleanup" || echo "    ⚠️  Failed to add comment"
  
  # Close issue
  gh issue close "$issue_num" --repo "$REPO" --comment "" || echo "    ⚠️  Failed to close issue"
  
  # Add label
  gh issue edit "$issue_num" --repo "$REPO" --add-label "backlog-cleanup" || echo "    ⚠️  Failed to add label"
  
  echo "  ✅ Closed QII #$issue_num"
  sleep 2  # Rate limiting
}

# Function to close a duplicate issue
close_duplicate() {
  local issue_num=$1
  local original_num=$2
  
  if [ "$DRY_RUN" = "true" ]; then
    echo "  [DRY RUN] Would close duplicate #$issue_num (original: #$original_num)"
    return
  fi
  
  echo "  Closing duplicate #$issue_num (original: #$original_num)..."
  
  # Add comment
  gh issue comment "$issue_num" --repo "$REPO" --body "**Closed as Duplicate — Issue #1 Backlog Normalization**

This issue is a duplicate of #$original_num.

✅ **Action**: Consolidating to prevent backlog fragmentation.
✅ **All work tracked in**: #$original_num

🔗 **Related**: Issue #1 — Backlog Normalization & Incident Cleanup" || echo "    ⚠️  Failed to add comment"
  
  # Close issue
  gh issue close "$issue_num" --repo "$REPO" --comment "" || echo "    ⚠️  Failed to close issue"
  
  # Add labels
  gh issue edit "$issue_num" --repo "$REPO" --add-label "duplicate,backlog-cleanup" || echo "    ⚠️  Failed to add labels"
  
  echo "  ✅ Closed duplicate #$issue_num"
  sleep 2  # Rate limiting
}

# Process Quality Integrity Incidents
echo "📦 Closing Quality Integrity Incidents..."
for issue in "${QII_ISSUES[@]}"; do
  close_qii "$issue"
done
echo ""

# Process Duplicates
echo "🔄 Closing Semantic Duplicates..."
for i in "${!DUPLICATE_ISSUES[@]}"; do
  close_duplicate "${DUPLICATE_ISSUES[$i]}" "${DUPLICATE_ORIGINALS[$i]}"
done
echo ""

if [ "$DRY_RUN" = "true" ]; then
  echo "✅ DRY RUN COMPLETE - No changes made"
  echo ""
  echo "To execute for real, run:"
  echo "  ./scripts/close-issues.sh"
else
  echo "✅ CLOSURE COMPLETE"
  echo ""
  echo "Summary:"
  echo "  QII Issues Closed: ${#QII_ISSUES[@]}"
  echo "  Duplicates Closed: ${#DUPLICATE_ISSUES[@]}"
  echo "  Total: $((${#QII_ISSUES[@]} + ${#DUPLICATE_ISSUES[@]}))"
fi

echo ""
echo "🎉 Issue #1 Cleanup Execution Complete"
