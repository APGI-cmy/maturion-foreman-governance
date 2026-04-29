#!/bin/bash
# validate-scope-to-diff.sh
# 
# Purpose: Validate that the per-PR scope declaration accurately reflects actual git diff
# Authority: BL-027 (Scope Declaration Mandatory Before PR Handover)
#            Issue #1359 (Per-PR Immutable Scope Declaration Model)
# Exit Codes:
#   0 = PASS (per-PR scope declaration matches diff)
#   1 = FAIL (scope declaration missing or doesn't match diff)
#   2 = FAIL (invalid usage)
#
# Usage:
#   ./validate-scope-to-diff.sh <pr-number> [base-ref]
#
# Arguments:
#   pr-number: The PR number (required) — used to locate the scope file
#   base-ref:  Git ref to compare against (default: main)
#
# Per-PR scope file location:
#   .agent-admin/scope-declarations/pr-<pr-number>.md
#
# Notes:
#   - This script is OPTIONAL in agent environments where bash cannot execute before PR
#   - Agents may instead provide evidence-based validation in PREHANDOVER_PROOF
#   - Evidence-based validation requires: manual diff comparison, signature, attestation
#
# Deprecated:
#   The old global governance/scope-declaration.md model is abolished (issue #1359).
#   Do NOT use governance/scope-declaration.md as the per-PR scope evidence artifact.

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Arguments
if [ $# -lt 1 ]; then
    echo -e "${RED}❌ FAIL: PR number required${NC}"
    echo ""
    echo "Usage: $0 <pr-number> [base-ref]"
    echo ""
    echo "Example: $0 1360 main"
    echo ""
    exit 2
fi

PR_NUMBER="${1}"
BASE_REF="${2:-main}"
SCOPE_FILE=".agent-admin/scope-declarations/pr-${PR_NUMBER}.md"

echo "==================================="
echo "Per-PR Scope-to-Diff Validation"
echo "PR: #${PR_NUMBER}"
echo "==================================="
echo ""

# Check if per-PR scope declaration exists
if [ ! -f "$SCOPE_FILE" ]; then
    echo -e "${RED}❌ FAIL: $SCOPE_FILE not found${NC}"
    echo ""
    echo "BL-027 requires a per-PR scope declaration before PR handover."
    echo ""
    echo "Expected location: ${SCOPE_FILE}"
    echo ""
    echo "Create the file using the template at:"
    echo "  governance/canon/scope-declaration.template.md"
    echo ""
    echo "Required format (## FILES_CHANGED section):"
    echo "  ## FILES_CHANGED"
    echo "  FILES_CHANGED: N"
    echo "  - path/to/file1"
    echo "  - path/to/file2"
    echo ""
    echo "In agent environments where this script cannot run:"
    echo "  - Create the per-PR scope declaration manually"
    echo "  - Document evidence-based validation in PREHANDOVER_PROOF"
    echo "  - Include manual diff comparison and attestation"
    echo ""
    exit 1
fi

echo "✓ Per-PR scope declaration found: $SCOPE_FILE"
echo ""

# Get actual changed files from git diff (PR diff basis: merge-base of origin/$BASE_REF and HEAD)
echo "Comparing against base ref: $BASE_REF"
CHANGED_FILES=$(git diff --name-only "origin/${BASE_REF}...HEAD" 2>/dev/null || git diff --name-only HEAD 2>/dev/null || echo "")

if [ -z "$CHANGED_FILES" ]; then
    echo -e "${YELLOW}⚠️  WARNING: No changed files detected in git diff${NC}"
    echo "This may indicate:"
    echo "  - Working on same branch as base"
    echo "  - No commits yet"
    echo "  - Invalid base ref"
    echo ""
    echo "Skipping validation (assuming pre-commit state)"
    exit 0
fi

echo "Changed files in git diff:"
echo "$CHANGED_FILES" | while read -r file; do
    echo "  - $file"
done
echo ""

# Extract file declarations from per-PR scope declaration
# Look for files listed under ## FILES_CHANGED section (lines starting with '- ')
DECLARED_FILES=$(awk '/^## FILES_CHANGED/{found=1; next} found && /^- /{print substr($0,3)} found && /^##/{if(!/FILES_CHANGED/)found=0}' "$SCOPE_FILE" || echo "")

if [ -z "$DECLARED_FILES" ]; then
    echo -e "${YELLOW}⚠️  WARNING: No file changes declared in $SCOPE_FILE${NC}"
    echo ""
    echo "Scope declaration should list changed files under ## FILES_CHANGED:"
    echo "  ## FILES_CHANGED"
    echo "  FILES_CHANGED: N"
    echo "  - path/to/file1"
    echo "  - path/to/file2"
    echo ""
fi

# Validate: all changed files are declared
UNDECLARED=()
while IFS= read -r file; do
    if ! echo "$DECLARED_FILES" | grep -qxF "$file"; then
        UNDECLARED+=("$file")
    fi
done <<< "$CHANGED_FILES"

# Validate: all declared files are changed
EXTRA_DECLARED=()
while IFS= read -r file; do
    [ -z "$file" ] && continue
    if ! echo "$CHANGED_FILES" | grep -qxF "$file"; then
        EXTRA_DECLARED+=("$file")
    fi
done <<< "$DECLARED_FILES"

# Report results
if [ ${#UNDECLARED[@]} -eq 0 ] && [ ${#EXTRA_DECLARED[@]} -eq 0 ]; then
    echo -e "${GREEN}✅ PASS: Per-PR scope declaration matches git diff${NC}"
    echo ""
    exit 0
else
    echo -e "${RED}❌ FAIL: Per-PR scope declaration does not match git diff${NC}"
    echo ""
    
    if [ ${#UNDECLARED[@]} -gt 0 ]; then
        echo "Files changed but NOT declared in scope:"
        for file in "${UNDECLARED[@]}"; do
            echo "  - $file"
        done
        echo ""
    fi
    
    if [ ${#EXTRA_DECLARED[@]} -gt 0 ]; then
        echo "Files declared in scope but NOT changed:"
        for file in "${EXTRA_DECLARED[@]}"; do
            echo "  - $file"
        done
        echo ""
    fi
    
    echo "Fix: Update $SCOPE_FILE to match actual git diff"
    echo "     Run: git diff --name-only origin/$BASE_REF...HEAD"
    echo ""
    exit 1
fi

