#!/bin/bash
# validate-platform-ai-features.sh
#
# Purpose: Validate that applications implement mandatory platform AI features
# Authority: LL-031 Platform AI Requirements Omission canonical lesson
#           governance/canon/PLATFORM_AI_REQUIREMENTS.md
# Exit Codes:
#   0 = PASS (all AI features present or CS2 exemption documented)
#   1 = FAIL (missing AI features without CS2 exemption)
#   2 = FAIL (invalid usage or missing dependencies)
#
# Usage:
#   ./validate-platform-ai-features.sh [--repo-path <path>]
#   ./validate-platform-ai-features.sh --repo-path /path/to/app/repo
#
# Requirements:
#   - Agent file exists at repository root (.agent)
#   - APP_STARTUP_REQUIREMENTS.md exists (or CS2 exemption documented)
#   - Red tests for AI features exist
#
# What This Script Validates:
#   1. Agent file exists and contains ai_capabilities section
#   2. AI assistant component exists in codebase (UI files)
#   3. Red tests for AI features exist
#   4. APP_STARTUP_REQUIREMENTS.md includes AI compliance section (or exemption)
#   5. CS2 exemption documented (if AI features omitted)

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default repository path
REPO_PATH="${1:-.}"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --repo-path)
            REPO_PATH="$2"
            shift 2
            ;;
        -h|--help)
            echo "Usage: $0 [--repo-path <path>]"
            echo ""
            echo "Validates platform AI features per LL-031 requirements."
            echo ""
            echo "Options:"
            echo "  --repo-path <path>   Path to repository root (default: current directory)"
            echo "  -h, --help           Show this help message"
            echo ""
            exit 0
            ;;
        *)
            echo -e "${RED}❌ Unknown option: $1${NC}"
            echo "Use --help for usage information"
            exit 2
            ;;
    esac
done

# Validate repo path exists
if [ ! -d "$REPO_PATH" ]; then
    echo -e "${RED}❌ FAIL: Repository path does not exist: $REPO_PATH${NC}"
    exit 2
fi

cd "$REPO_PATH"

echo "════════════════════════════════════════════════════════════════"
echo "  Platform AI Features Validation (LL-031)"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "Repository: $REPO_PATH"
echo "Authority: governance/canon/PLATFORM_AI_REQUIREMENTS.md"
echo ""

VALIDATION_FAILED=0
WARNINGS=()
ERRORS=()
CHECKS_PASSED=0
TOTAL_CHECKS=5

# ============================================================================
# CHECK 1: Agent File Exists
# ============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Check 1/5: Agent File Exists"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

AGENT_FILE_EXISTS=false
if [ -f ".agent" ]; then
    echo -e "${GREEN}✅ PASS: Agent file exists at .agent${NC}"
    AGENT_FILE_EXISTS=true
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
elif [ -f ".agent.md" ]; then
    echo -e "${YELLOW}⚠️  WARNING: Agent file found at .agent.md (expected .agent)${NC}"
    WARNINGS+=("Agent file should be named '.agent' not '.agent.md'")
    AGENT_FILE_EXISTS=true
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
else
    echo -e "${RED}❌ FAIL: Agent file not found${NC}"
    ERRORS+=("Agent file (.agent) not found at repository root")
    VALIDATION_FAILED=1
fi
echo ""

# ============================================================================
# CHECK 2: Agent File Contains AI Capabilities Section
# ============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Check 2/5: Agent File AI Capabilities Section"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

AI_CAPABILITIES_EXISTS=false
if [ "$AGENT_FILE_EXISTS" = true ]; then
    AGENT_FILE_NAME=".agent"
    [ -f ".agent.md" ] && AGENT_FILE_NAME=".agent.md"
    
    if grep -q "ai_capabilities" "$AGENT_FILE_NAME"; then
        echo -e "${GREEN}✅ PASS: ai_capabilities section found in agent file${NC}"
        AI_CAPABILITIES_EXISTS=true
        CHECKS_PASSED=$((CHECKS_PASSED + 1))
        
        # Validate required fields
        MISSING_FIELDS=()
        grep -q "primary_model" "$AGENT_FILE_NAME" || MISSING_FIELDS+=("primary_model")
        grep -q "task_routing" "$AGENT_FILE_NAME" || MISSING_FIELDS+=("task_routing")
        
        if [ ${#MISSING_FIELDS[@]} -gt 0 ]; then
            echo -e "${YELLOW}⚠️  WARNING: ai_capabilities section missing fields: ${MISSING_FIELDS[*]}${NC}"
            WARNINGS+=("ai_capabilities section incomplete - missing: ${MISSING_FIELDS[*]}")
        fi
    else
        echo -e "${RED}❌ FAIL: ai_capabilities section not found in agent file${NC}"
        ERRORS+=("Agent file missing ai_capabilities section")
        VALIDATION_FAILED=1
    fi
else
    echo -e "${YELLOW}⚠️  SKIP: Agent file does not exist (cannot validate ai_capabilities)${NC}"
fi
echo ""

# ============================================================================
# CHECK 3: AI Assistant Component Exists
# ============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Check 3/5: AI Assistant Component Exists"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

AI_COMPONENT_PATTERNS=(
    "chat"
    "assistant"
    "ai-chat"
    "ai_chat"
    "ChatAssistant"
    "AIAssistant"
)

AI_COMPONENT_FOUND=false
COMPONENT_FILES=()

for pattern in "${AI_COMPONENT_PATTERNS[@]}"; do
    # Search for files matching AI component patterns
    FOUND_FILES=$(find . -type f \( -name "*${pattern}*" \) \
        -not -path "./node_modules/*" \
        -not -path "./.git/*" \
        -not -path "./dist/*" \
        -not -path "./build/*" \
        -not -path "./.next/*" \
        2>/dev/null || true)
    
    if [ -n "$FOUND_FILES" ]; then
        while IFS= read -r file; do
            # Check if file is a UI component (React, Vue, Angular, etc.)
            if [[ "$file" =~ \.(tsx|jsx|vue|component\.ts|component\.js)$ ]]; then
                COMPONENT_FILES+=("$file")
                AI_COMPONENT_FOUND=true
            fi
        done <<< "$FOUND_FILES"
    fi
done

if [ "$AI_COMPONENT_FOUND" = true ]; then
    echo -e "${GREEN}✅ PASS: AI assistant component(s) found:${NC}"
    for comp in "${COMPONENT_FILES[@]}"; do
        echo "  - $comp"
    done
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
else
    echo -e "${YELLOW}⚠️  WARNING: No AI assistant component found${NC}"
    echo "  Searched for files matching: ${AI_COMPONENT_PATTERNS[*]}"
    echo "  This may be acceptable if:"
    echo "    - Component naming doesn't match expected patterns"
    echo "    - CS2 exemption granted"
    WARNINGS+=("No AI assistant component detected in codebase")
fi
echo ""

# ============================================================================
# CHECK 4: Red Tests for AI Features Exist
# ============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Check 4/5: Red Tests for AI Features"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

AI_TEST_PATTERNS=(
    "ai.*test"
    "chat.*test"
    "assistant.*test"
)

AI_TEST_FOUND=false
TEST_FILES=()

for pattern in "${AI_TEST_PATTERNS[@]}"; do
    FOUND_TESTS=$(find . -type f -regex ".*${pattern}.*" \
        -not -path "./node_modules/*" \
        -not -path "./.git/*" \
        -not -path "./dist/*" \
        -not -path "./build/*" \
        2>/dev/null || true)
    
    if [ -n "$FOUND_TESTS" ]; then
        while IFS= read -r file; do
            if [[ "$file" =~ \.(test|spec)\.(ts|js|tsx|jsx)$ ]]; then
                TEST_FILES+=("$file")
                AI_TEST_FOUND=true
            fi
        done <<< "$FOUND_TESTS"
    fi
done

if [ "$AI_TEST_FOUND" = true ]; then
    echo -e "${GREEN}✅ PASS: AI feature test(s) found:${NC}"
    for test in "${TEST_FILES[@]}"; do
        echo "  - $test"
    done
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
else
    echo -e "${YELLOW}⚠️  WARNING: No AI feature tests found${NC}"
    echo "  Searched for tests matching: ${AI_TEST_PATTERNS[*]}"
    WARNINGS+=("No red tests for AI features detected")
fi
echo ""

# ============================================================================
# CHECK 5: APP_STARTUP_REQUIREMENTS.md Contains AI Section or CS2 Exemption
# ============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Check 5/5: APP_STARTUP_REQUIREMENTS.md AI Compliance"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

APP_STARTUP_FILE=""
if [ -f "APP_STARTUP_REQUIREMENTS.md" ]; then
    APP_STARTUP_FILE="APP_STARTUP_REQUIREMENTS.md"
elif [ -f "docs/APP_STARTUP_REQUIREMENTS.md" ]; then
    APP_STARTUP_FILE="docs/APP_STARTUP_REQUIREMENTS.md"
fi

if [ -n "$APP_STARTUP_FILE" ]; then
    HAS_AI_SECTION=false
    HAS_CS2_EXEMPTION=false
    
    # Check for AI compliance section
    if grep -qi "platform.*ai" "$APP_STARTUP_FILE" || \
       grep -qi "ai.*features" "$APP_STARTUP_FILE" || \
       grep -qi "ai.*compliance" "$APP_STARTUP_FILE"; then
        HAS_AI_SECTION=true
    fi
    
    # Check for CS2 exemption
    if grep -qi "cs2.*exemption" "$APP_STARTUP_FILE" || \
       grep -qi "exemption.*cs2" "$APP_STARTUP_FILE" || \
       grep -qi "cs2.*approval" "$APP_STARTUP_FILE"; then
        HAS_CS2_EXEMPTION=true
    fi
    
    if [ "$HAS_AI_SECTION" = true ]; then
        echo -e "${GREEN}✅ PASS: AI compliance section found in $APP_STARTUP_FILE${NC}"
        CHECKS_PASSED=$((CHECKS_PASSED + 1))
    elif [ "$HAS_CS2_EXEMPTION" = true ]; then
        echo -e "${BLUE}ℹ️  INFO: CS2 exemption documented in $APP_STARTUP_FILE${NC}"
        echo "  Exemption allows omission of AI features."
        CHECKS_PASSED=$((CHECKS_PASSED + 1))
    else
        echo -e "${YELLOW}⚠️  WARNING: No AI compliance section or CS2 exemption found in $APP_STARTUP_FILE${NC}"
        WARNINGS+=("APP_STARTUP_REQUIREMENTS.md missing AI compliance section")
    fi
else
    echo -e "${YELLOW}⚠️  WARNING: APP_STARTUP_REQUIREMENTS.md not found${NC}"
    echo "  This file is expected to document AI feature compliance or CS2 exemption."
    WARNINGS+=("APP_STARTUP_REQUIREMENTS.md not found")
fi
echo ""

# ============================================================================
# SUMMARY
# ============================================================================
echo "════════════════════════════════════════════════════════════════"
echo "  Validation Summary"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "Checks Passed: $CHECKS_PASSED / $TOTAL_CHECKS"
echo ""

if [ ${#WARNINGS[@]} -gt 0 ]; then
    echo -e "${YELLOW}Warnings:${NC}"
    for warning in "${WARNINGS[@]}"; do
        echo -e "  ${YELLOW}⚠️  $warning${NC}"
    done
    echo ""
fi

if [ ${#ERRORS[@]} -gt 0 ]; then
    echo -e "${RED}Errors:${NC}"
    for error in "${ERRORS[@]}"; do
        echo -e "  ${RED}❌ $error${NC}"
    done
    echo ""
fi

# ============================================================================
# EXIT STATUS
# ============================================================================
if [ $VALIDATION_FAILED -eq 1 ]; then
    echo -e "${RED}════════════════════════════════════════════════════════════════${NC}"
    echo -e "${RED}  ❌ VALIDATION FAILED${NC}"
    echo -e "${RED}════════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo "Platform AI features validation failed. This application does not meet"
    echo "mandatory platform AI requirements per LL-031."
    echo ""
    echo "Required Actions:"
    echo "  1. Implement missing AI features per governance/canon/PLATFORM_AI_REQUIREMENTS.md"
    echo "  2. Use checklist: governance/checklists/PLATFORM_AI_REQUIREMENTS_CHECKLIST.md"
    echo "  3. OR obtain CS2 exemption with documented justification"
    echo ""
    echo "For exemption process, see:"
    echo "  governance/canon/PLATFORM_AI_REQUIREMENTS.md Section 7"
    echo ""
    exit 1
elif [ ${#WARNINGS[@]} -gt 0 ]; then
    echo -e "${YELLOW}════════════════════════════════════════════════════════════════${NC}"
    echo -e "${YELLOW}  ⚠️  VALIDATION PASSED WITH WARNINGS${NC}"
    echo -e "${YELLOW}════════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo "Platform AI features validation passed, but warnings were raised."
    echo "Review warnings above and consider addressing them."
    echo ""
    exit 0
else
    echo -e "${GREEN}════════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}  ✅ VALIDATION PASSED${NC}"
    echo -e "${GREEN}════════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo "All platform AI features checks passed."
    echo ""
    exit 0
fi
