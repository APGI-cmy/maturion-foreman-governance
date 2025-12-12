#!/bin/bash
# Pre-Build Validation Script
# QIC-7: Interface Integrity Validation
# 
# This script runs before every build to catch interface issues
# that would prevent reaching 100% GREEN builds.
#
# Usage: ./scripts/pre-build-validation.sh
# Exit Code: 0 = success, 1 = validation failed

set -e

echo "🔍 QIC-7: Interface Integrity Validation"
echo "========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track overall status
VALIDATION_FAILED=0

# 1. TypeScript Compilation Check
echo "1️⃣  TypeScript Compilation Check"
echo "   → Running: npx tsc --noEmit"
if npx tsc --noEmit 2>&1; then
  echo -e "   ${GREEN}✅ TypeScript compilation passed${NC}"
else
  echo -e "   ${RED}❌ TypeScript compilation failed${NC}"
  echo "   → Fix type errors before deployment"
  VALIDATION_FAILED=1
fi
echo ""

# 2. Type Completeness Validation
echo "2️⃣  Type Completeness Validation"
echo "   → Checking Record<UnionType, T> completeness..."

# Check ModelTier Record completeness (legacy validation)
echo "   → Validating ModelTier Records..."
MODEL_TIER_PATTERN="'gpt-4'|'gpt-4-turbo'|'gpt-4o-mini'|'gpt-4o'|'gpt-4.1'|'gpt-5.1'|'local-builder'"
ROUTE_FILE="app/api/foreman/chat/route.ts"

if [ -f "$ROUTE_FILE" ]; then
  if grep -q "MODEL_LIMITS.*Record<ModelTier" "$ROUTE_FILE"; then
    MISSING=""
    for tier in "gpt-4" "gpt-4-turbo" "gpt-4o-mini" "gpt-4o" "gpt-4.1" "gpt-5.1" "local-builder"; do
      if ! grep -A 10 "MODEL_LIMITS.*Record<ModelTier" "$ROUTE_FILE" | grep -q "'$tier'"; then
        MISSING="$MISSING $tier"
      fi
    done
    
    if [ -n "$MISSING" ]; then
      echo -e "   ${RED}❌ MODEL_LIMITS missing tiers:$MISSING${NC}"
      echo "   → Add missing tiers to MODEL_LIMITS in $ROUTE_FILE"
      VALIDATION_FAILED=1
    else
      echo -e "   ${GREEN}✅ ModelTier Records complete${NC}"
    fi
  fi
fi

# Check if comprehensive test file exists
if [ -f "tests/qa/type-completeness.test.ts" ]; then
  echo "   → Running: npx tsx tests/qa/type-completeness.test.ts"
  if npx tsx tests/qa/type-completeness.test.ts 2>&1; then
    echo -e "   ${GREEN}✅ Type completeness validated${NC}"
  else
    echo -e "   ${RED}❌ Type completeness validation failed${NC}"
    echo "   → Ensure all Record<UnionType, T> have all union values"
    VALIDATION_FAILED=1
  fi
else
  echo -e "   ${YELLOW}⚠️  Comprehensive type completeness test not found${NC}"
  echo "   → Will be created during full QIC-7 implementation"
fi
echo ""

# 3. Import/Export Consistency Check
echo "3️⃣  Import/Export Consistency Check"
echo "   → Checking imports reference exported members..."

# Check if the test file exists
if [ -f "tests/qa/import-export-consistency.test.ts" ]; then
  echo "   → Running: npx tsx tests/qa/import-export-consistency.test.ts"
  if npx tsx tests/qa/import-export-consistency.test.ts 2>&1; then
    echo -e "   ${GREEN}✅ Import/export consistency validated${NC}"
  else
    echo -e "   ${RED}❌ Import/export consistency validation failed${NC}"
    echo "   → Fix imports referencing non-existent exports"
    VALIDATION_FAILED=1
  fi
else
  echo -e "   ${YELLOW}⚠️  Import/export consistency test not found${NC}"
  echo "   → Will be created during full QIC-7 implementation"
fi
echo ""

# 4. Summary
echo "========================================="
if [ $VALIDATION_FAILED -eq 0 ]; then
  echo -e "${GREEN}✅ QIC-7 Interface Integrity Validation PASSED${NC}"
  echo ""
  echo "All interface integrity checks passed."
  echo "Build is cleared to proceed."
  exit 0
else
  echo -e "${RED}❌ QIC-7 Interface Integrity Validation FAILED${NC}"
  echo ""
  echo "One or more interface integrity checks failed."
  echo "Fix the issues above before deploying."
  echo ""
  echo "Common fixes:"
  echo "  - Fix TypeScript compilation errors"
  echo "  - Ensure Record<UnionType, T> objects have all union values"
  echo "  - Fix imports referencing non-existent exports"
  echo "  - Update function signatures to match usage"
  exit 1
fi
