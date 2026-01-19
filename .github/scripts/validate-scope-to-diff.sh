#!/bin/bash
# validate-scope-to-diff.sh
# 
# Purpose: Validate that SCOPE_DECLARATION.md accurately reflects actual git diff
# Authority: BL-027 (Scope Declaration Mandatory Before PR Handover)
# Exit Codes:
#   0 = PASS (scope declaration matches diff)
#   1 = FAIL (scope declaration missing or doesn't match diff)
#   2 = FAIL (invalid usage)
#
# Usage:
#   ./validate-scope-to-diff.sh [base-ref]
#
# Arguments:
#   base-ref: Git ref to compare against (default: main)
#
# Requirements:
#   - SCOPE_DECLARATION.md must exist in governance/scope-declaration.md
#   - File must contain file change declarations
#   - All files in git diff must be declared in scope
#   - All declared files must be in git diff
#
# Notes:
#   - This script is OPTIONAL in agent environments where bash cannot execute before PR
#   - Agents may instead provide evidence-based validation in PREHANDOVER_PROOF
#   - Evidence-based validation requires: manual diff comparison, signature, attestation

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Arguments
BASE_REF="${1:-main}"
SCOPE_FILE="governance/scope-declaration.md"

echo "==================================="
echo "Scope-to-Diff Validation"
echo "==================================="
echo ""

# Check if scope declaration exists
if [ ! -f "$SCOPE_FILE" ]; then
    echo -e "${RED}❌ FAIL: $SCOPE_FILE not found${NC}"
    echo ""
    echo "BL-027 requires SCOPE_DECLARATION.md before PR creation."
    echo ""
    echo "Expected location: governance/scope-declaration.md"
    echo ""
    echo "In agent environments where this script cannot run:"
    echo "  - Create SCOPE_DECLARATION.md manually"
    echo "  - Document evidence-based validation in PREHANDOVER_PROOF"
    echo "  - Include manual diff comparison and attestation"
    echo ""
    exit 1
fi

echo "✓ Scope declaration file found: $SCOPE_FILE"
echo ""

# Get actual changed files from git diff
echo "Comparing against base ref: $BASE_REF"
CHANGED_FILES=$(git diff --name-only "$BASE_REF" 2>/dev/null || git diff --name-only HEAD 2>/dev/null || echo "")

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

# Extract file declarations from scope declaration
# Look for patterns like "M path/to/file" or "A path/to/file" or "D path/to/file"
DECLARED_FILES=$(grep -E "^[MAD] " "$SCOPE_FILE" | awk '{print $2}' || echo "")

if [ -z "$DECLARED_FILES" ]; then
    echo -e "${YELLOW}⚠️  WARNING: No file changes declared in $SCOPE_FILE${NC}"
    echo ""
    echo "Scope declaration should list changed files with format:"
    echo "  M path/to/modified/file"
    echo "  A path/to/added/file"
    echo "  D path/to/deleted/file"
    echo ""
fi

# Validate: all changed files are declared
UNDECLARED=()
while IFS= read -r file; do
    if ! echo "$DECLARED_FILES" | grep -qF "$file"; then
        UNDECLARED+=("$file")
    fi
done <<< "$CHANGED_FILES"

# Validate: all declared files are changed
EXTRA_DECLARED=()
while IFS= read -r file; do
    [ -z "$file" ] && continue
    if ! echo "$CHANGED_FILES" | grep -qF "$file"; then
        EXTRA_DECLARED+=("$file")
    fi
done <<< "$DECLARED_FILES"

# Report results
if [ ${#UNDECLARED[@]} -eq 0 ] && [ ${#EXTRA_DECLARED[@]} -eq 0 ]; then
    echo -e "${GREEN}✅ PASS: Scope declaration matches git diff${NC}"
    echo ""
    exit 0
else
    echo -e "${RED}❌ FAIL: Scope declaration does not match git diff${NC}"
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
    echo ""
    exit 1
fi
