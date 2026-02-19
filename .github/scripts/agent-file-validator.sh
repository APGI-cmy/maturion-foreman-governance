#!/bin/bash
# agent-file-validator.sh
#
# Purpose: Validate agent file structure and AI capabilities section
# Authority: governance/canon/PLATFORM_AI_REQUIREMENTS.md
#           .agent.schema.md (agent file schema specification)
# Exit Codes:
#   0 = PASS (agent file valid with required ai_capabilities)
#   1 = FAIL (agent file invalid or missing required sections)
#   2 = FAIL (invalid usage or file not found)
#
# Usage:
#   ./agent-file-validator.sh [agent-file-path]
#   ./agent-file-validator.sh .agent
#   ./agent-file-validator.sh /path/to/.agent
#
# Requirements:
#   - Agent file must exist
#   - Agent file must contain ai_capabilities section (for application agents)
#   - ai_capabilities must include: primary_model, task_routing
#
# Validation Checks:
#   1. File exists and is readable
#   2. File has YAML frontmatter (optional but recommended)
#   3. ai_capabilities section exists
#   4. primary_model field exists
#   5. task_routing array exists
#   6. task_routing entries have required fields (task_type, model)

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default agent file path
AGENT_FILE="${1:-.agent}"

# Parse command line arguments
if [[ "${AGENT_FILE}" == "-h" ]] || [[ "${AGENT_FILE}" == "--help" ]]; then
    echo "Usage: $0 [agent-file-path]"
    echo ""
    echo "Validates agent file structure and AI capabilities section."
    echo ""
    echo "Arguments:"
    echo "  agent-file-path    Path to agent file (default: .agent)"
    echo ""
    echo "Examples:"
    echo "  $0                  # Validates .agent in current directory"
    echo "  $0 .agent.md        # Validates .agent.md"
    echo "  $0 /path/to/.agent  # Validates agent file at specific path"
    echo ""
    exit 0
fi

echo "════════════════════════════════════════════════════════════════"
echo "  Agent File Validation"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "Agent File: $AGENT_FILE"
echo "Authority: governance/canon/PLATFORM_AI_REQUIREMENTS.md"
echo ""

VALIDATION_FAILED=0
WARNINGS=()
ERRORS=()
CHECKS_PASSED=0
TOTAL_CHECKS=6

# ============================================================================
# CHECK 1: Agent File Exists
# ============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Check 1/6: Agent File Exists"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ ! -f "$AGENT_FILE" ]; then
    echo -e "${RED}❌ FAIL: Agent file not found: $AGENT_FILE${NC}"
    echo ""
    echo "Agent file is required at repository root."
    echo "Expected location: .agent (or .agent.md)"
    echo ""
    exit 2
fi

if [ ! -r "$AGENT_FILE" ]; then
    echo -e "${RED}❌ FAIL: Agent file not readable: $AGENT_FILE${NC}"
    exit 2
fi

echo -e "${GREEN}✅ PASS: Agent file exists and is readable${NC}"
CHECKS_PASSED=$((CHECKS_PASSED + 1))
echo ""

# ============================================================================
# CHECK 2: YAML Frontmatter (Optional)
# ============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Check 2/6: YAML Frontmatter (Optional)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

HAS_FRONTMATTER=false
if head -1 "$AGENT_FILE" | grep -q "^---$"; then
    echo -e "${GREEN}✅ PASS: YAML frontmatter detected${NC}"
    HAS_FRONTMATTER=true
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
else
    echo -e "${BLUE}ℹ️  INFO: No YAML frontmatter detected (optional)${NC}"
    echo "  Agent file may use freeform structure or inline YAML."
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
fi
echo ""

# ============================================================================
# CHECK 3: ai_capabilities Section Exists
# ============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Check 3/6: ai_capabilities Section Exists"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

AI_CAPABILITIES_FOUND=false
if grep -q "ai_capabilities" "$AGENT_FILE"; then
    echo -e "${GREEN}✅ PASS: ai_capabilities section found${NC}"
    AI_CAPABILITIES_FOUND=true
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
    
    # Show the section (first 15 lines after ai_capabilities)
    echo ""
    echo "Preview:"
    grep -A 15 "ai_capabilities" "$AGENT_FILE" | head -16 | sed 's/^/  /'
else
    echo -e "${RED}❌ FAIL: ai_capabilities section not found${NC}"
    echo ""
    echo "Agent file MUST include ai_capabilities section for application agents."
    echo ""
    echo "Required structure:"
    echo "  ai_capabilities:"
    echo "    primary_model: \"model-name\""
    echo "    task_routing:"
    echo "      - task_type: \"task-name\""
    echo "        model: \"model-name\""
    echo ""
    ERRORS+=("ai_capabilities section not found")
    VALIDATION_FAILED=1
fi
echo ""

# ============================================================================
# CHECK 4: primary_model Field Exists
# ============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Check 4/6: primary_model Field Exists"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ "$AI_CAPABILITIES_FOUND" = true ]; then
    PRIMARY_MODEL_FOUND=false
    
    if grep -q "primary_model" "$AGENT_FILE"; then
        echo -e "${GREEN}✅ PASS: primary_model field found${NC}"
        PRIMARY_MODEL_FOUND=true
        CHECKS_PASSED=$((CHECKS_PASSED + 1))
        
        # Extract and show the primary model
        PRIMARY_MODEL=$(grep "primary_model" "$AGENT_FILE" | head -1)
        echo "  $PRIMARY_MODEL"
    else
        echo -e "${RED}❌ FAIL: primary_model field not found${NC}"
        echo ""
        echo "ai_capabilities MUST include primary_model field."
        echo "Example: primary_model: \"claude-3-5-sonnet-20241022\""
        echo ""
        ERRORS+=("primary_model field missing in ai_capabilities")
        VALIDATION_FAILED=1
    fi
else
    echo -e "${YELLOW}⚠️  SKIP: Cannot validate primary_model (ai_capabilities not found)${NC}"
fi
echo ""

# ============================================================================
# CHECK 5: task_routing Array Exists
# ============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Check 5/6: task_routing Array Exists"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ "$AI_CAPABILITIES_FOUND" = true ]; then
    TASK_ROUTING_FOUND=false
    
    if grep -q "task_routing" "$AGENT_FILE"; then
        echo -e "${GREEN}✅ PASS: task_routing array found${NC}"
        TASK_ROUTING_FOUND=true
        CHECKS_PASSED=$((CHECKS_PASSED + 1))
        
        # Count task routing entries
        TASK_COUNT=$(grep -c "task_type:" "$AGENT_FILE" || echo "0")
        echo "  Number of task routing entries: $TASK_COUNT"
    else
        echo -e "${RED}❌ FAIL: task_routing array not found${NC}"
        echo ""
        echo "ai_capabilities MUST include task_routing array."
        echo "Example:"
        echo "  task_routing:"
        echo "    - task_type: \"chat_assistance\""
        echo "      model: \"claude-3-5-sonnet-20241022\""
        echo ""
        ERRORS+=("task_routing array missing in ai_capabilities")
        VALIDATION_FAILED=1
    fi
else
    echo -e "${YELLOW}⚠️  SKIP: Cannot validate task_routing (ai_capabilities not found)${NC}"
fi
echo ""

# ============================================================================
# CHECK 6: task_routing Entries Have Required Fields
# ============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Check 6/6: task_routing Entries Valid"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ "$AI_CAPABILITIES_FOUND" = true ] && [ "$TASK_ROUTING_FOUND" = true ]; then
    TASK_TYPE_COUNT=$(grep -c "task_type:" "$AGENT_FILE" || echo "0")
    MODEL_IN_ROUTING_COUNT=$(grep "task_routing" "$AGENT_FILE" -A 50 | grep -c "model:" || echo "0")
    
    if [ "$TASK_TYPE_COUNT" -gt 0 ]; then
        if [ "$MODEL_IN_ROUTING_COUNT" -ge "$TASK_TYPE_COUNT" ]; then
            echo -e "${GREEN}✅ PASS: task_routing entries have required fields${NC}"
            echo "  task_type entries: $TASK_TYPE_COUNT"
            echo "  model assignments: $MODEL_IN_ROUTING_COUNT"
            CHECKS_PASSED=$((CHECKS_PASSED + 1))
        else
            echo -e "${RED}❌ FAIL: Some task_routing entries missing model field${NC}"
            echo "  task_type entries: $TASK_TYPE_COUNT"
            echo "  model assignments: $MODEL_IN_ROUTING_COUNT"
            echo ""
            echo "Each task_routing entry MUST have both task_type and model fields."
            echo ""
            ERRORS+=("Some task_routing entries incomplete")
            VALIDATION_FAILED=1
        fi
    else
        echo -e "${YELLOW}⚠️  WARNING: task_routing array is empty${NC}"
        echo "  At least one task routing entry is recommended."
        WARNINGS+=("task_routing array has no entries")
        CHECKS_PASSED=$((CHECKS_PASSED + 1))
    fi
else
    echo -e "${YELLOW}⚠️  SKIP: Cannot validate task_routing entries (task_routing not found)${NC}"
fi
echo ""

# ============================================================================
# ADDITIONAL RECOMMENDATIONS (INFO ONLY)
# ============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Additional Recommendations (Optional)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

RECOMMENDATIONS=()

# Check for embedding_model
if ! grep -q "embedding_model" "$AGENT_FILE"; then
    RECOMMENDATIONS+=("Consider adding embedding_model for semantic search capabilities")
fi

# Check for context_limits
if ! grep -q "context_limits" "$AGENT_FILE"; then
    RECOMMENDATIONS+=("Consider adding context_limits for token budget management")
fi

# Check for cost_optimization
if ! grep -q "cost_optimization" "$AGENT_FILE"; then
    RECOMMENDATIONS+=("Consider adding cost_optimization with fallback models")
fi

if [ ${#RECOMMENDATIONS[@]} -gt 0 ]; then
    echo "Recommended (but not required) fields:"
    for rec in "${RECOMMENDATIONS[@]}"; do
        echo -e "  ${BLUE}ℹ️  $rec${NC}"
    done
else
    echo -e "${GREEN}✅ All recommended fields present${NC}"
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
    echo "Agent file validation failed. The agent file does not meet"
    echo "platform AI requirements."
    echo ""
    echo "Required Actions:"
    echo "  1. Add ai_capabilities section to agent file"
    echo "  2. Include primary_model field"
    echo "  3. Include task_routing array with at least one entry"
    echo "  4. Ensure each task routing entry has task_type and model"
    echo ""
    echo "See governance/canon/PLATFORM_AI_REQUIREMENTS.md for specification."
    echo ""
    exit 1
elif [ ${#WARNINGS[@]} -gt 0 ]; then
    echo -e "${YELLOW}════════════════════════════════════════════════════════════════${NC}"
    echo -e "${YELLOW}  ⚠️  VALIDATION PASSED WITH WARNINGS${NC}"
    echo -e "${YELLOW}════════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo "Agent file validation passed, but warnings were raised."
    echo "Review warnings above and consider addressing them."
    echo ""
    exit 0
else
    echo -e "${GREEN}════════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}  ✅ VALIDATION PASSED${NC}"
    echo -e "${GREEN}════════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo "Agent file is valid with all required AI capabilities."
    echo ""
    exit 0
fi
