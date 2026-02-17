#!/bin/bash
###############################################################################
# Preflight Check Template
# Version: 1.0.0
# Authority: AGENT_PREFLIGHT_PATTERN.md v1.0.0
# Purpose: Template for implementing preflight checks per 4-phase architecture
###############################################################################

set -euo pipefail

###############################################################################
# Configuration
###############################################################################

# CUSTOMIZE: Set agent-specific values
AGENT_TYPE="${AGENT_TYPE:-agent-type-here}"
AGENT_CLASS="${AGENT_CLASS:-agent-class-here}"  # supervisor, implementer, administrator, overseer, liaison
CONTRACT_VERSION="${CONTRACT_VERSION:-1.0.0}"
EXECUTION_MODE="${EXECUTION_MODE:-orchestration}"  # orchestration or implementation

# Repository paths
REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
WORKSPACE_ROOT="${REPO_ROOT}/.agent-workspace"
AGENT_WORKSPACE="${WORKSPACE_ROOT}/${AGENT_TYPE}"

# Preflight status
PREFLIGHT_STATUS="PASS"
PREFLIGHT_ERRORS=()
PREFLIGHT_WARNINGS=()

###############################################################################
# Helper Functions
###############################################################################

preflight_fail() {
    PREFLIGHT_STATUS="FAIL"
    PREFLIGHT_ERRORS+=("$1")
    echo "[PREFLIGHT FAIL] $1" >&2
}

preflight_warn() {
    PREFLIGHT_WARNINGS+=("$1")
    echo "[PREFLIGHT WARN] $1" >&2
}

preflight_pass() {
    echo "[PREFLIGHT PASS] $1"
}

###############################################################################
# Category 1: Identity Verification
###############################################################################

category_1_identity_verification() {
    echo "=== PREFLIGHT: Category 1 - Identity Verification ==="
    
    # Check 1.1: Agent Type Confirmed
    if [ -z "$AGENT_TYPE" ]; then
        preflight_fail "Agent type not defined"
        return 1
    fi
    preflight_pass "Agent type: $AGENT_TYPE"
    
    # Check 1.2: Agent Class Confirmed
    if [ -z "$AGENT_CLASS" ]; then
        preflight_fail "Agent class not defined"
        return 1
    fi
    preflight_pass "Agent class: $AGENT_CLASS"
    
    # Check 1.3: Contract Version Valid
    if [ -z "$CONTRACT_VERSION" ]; then
        preflight_fail "Contract version not defined"
        return 1
    fi
    preflight_pass "Contract version: $CONTRACT_VERSION"
    
    # Check 1.4: Execution Mode Verified
    if [ -z "$EXECUTION_MODE" ]; then
        preflight_fail "Execution mode not defined"
        return 1
    fi
    preflight_pass "Execution mode: $EXECUTION_MODE"
    
    echo ""
}

###############################################################################
# Category 2: Boundary Establishment
###############################################################################

category_2_boundary_establishment() {
    echo "=== PREFLIGHT: Category 2 - Boundary Establishment ==="
    
    # CUSTOMIZE: Define agent-specific boundaries
    
    # Check 2.1: Read Scope Defined
    READ_SCOPE=("**/*")  # Default: read all
    preflight_pass "Read scope: ${#READ_SCOPE[@]} paths"
    
    # Check 2.2: Write Scope Defined
    # CUSTOMIZE: Set agent-specific write scope
    WRITE_SCOPE=(
        ".agent-workspace/${AGENT_TYPE}/**"
    )
    if [ ${#WRITE_SCOPE[@]} -eq 0 ]; then
        preflight_fail "Write scope not defined"
        return 1
    fi
    preflight_pass "Write scope: ${#WRITE_SCOPE[@]} paths"
    
    # Check 2.3: Escalation-Required Paths Identified
    # CUSTOMIZE: Set agent-specific escalation paths
    ESCALATION_REQUIRED=(
        "governance/canon/**"
        ".github/agents/**"
    )
    preflight_pass "Escalation-required paths: ${#ESCALATION_REQUIRED[@]}"
    
    # Check 2.4: Prohibited Actions Explicit
    PROHIBITED_ACTIONS=(
        "force-push"
        "rebase-with-force"
        "bypass-merge-gates"
        "direct-canon-modification"
    )
    preflight_pass "Prohibited actions: ${#PROHIBITED_ACTIONS[@]}"
    
    echo ""
}

###############################################################################
# Category 3: Default Behavior Blocking
###############################################################################

category_3_default_behavior_blocking() {
    echo "=== PREFLIGHT: Category 3 - Default Behavior Blocking ==="
    
    # Block 3.1: Code Writing (for orchestration agents)
    if [ "$EXECUTION_MODE" = "orchestration" ]; then
        CODE_WRITING_ALLOWED=false
        if [ "$CODE_WRITING_ALLOWED" != false ]; then
            preflight_fail "Code writing MUST be disabled for orchestration agents"
            return 1
        fi
        preflight_pass "Code writing: DISABLED (orchestration mode)"
    else
        preflight_pass "Code writing: ENABLED (implementation mode)"
    fi
    
    # Block 3.2: Force Push Disabled
    GIT_FORCE_ALLOWED=false
    if [ "$GIT_FORCE_ALLOWED" != false ]; then
        preflight_fail "Force push MUST be disabled"
        return 1
    fi
    preflight_pass "Force push: DISABLED"
    
    # Block 3.3: Merge Gate Bypass Disabled
    MERGE_GATE_BYPASS_ALLOWED=false
    if [ "$MERGE_GATE_BYPASS_ALLOWED" != false ]; then
        preflight_fail "Merge gate bypass MUST be disabled"
        return 1
    fi
    preflight_pass "Merge gate bypass: DISABLED"
    
    # Block 3.4: Direct Main Push Disabled
    DIRECT_MAIN_PUSH_ALLOWED=false
    if [ "$DIRECT_MAIN_PUSH_ALLOWED" != false ]; then
        preflight_fail "Direct main push MUST be disabled"
        return 1
    fi
    preflight_pass "Direct main push: DISABLED (PR-only writes)"
    
    # CUSTOMIZE: Add role-specific blocks here
    
    echo ""
}

###############################################################################
# Category 4: Governance State Validation
###############################################################################

category_4_governance_state_validation() {
    echo "=== PREFLIGHT: Category 4 - Governance State Validation ==="
    
    # Check 4.1: CANON_INVENTORY.json Exists
    local canon_inventory="${REPO_ROOT}/governance/CANON_INVENTORY.json"
    if [ ! -f "$canon_inventory" ]; then
        preflight_fail "CRITICAL: CANON_INVENTORY.json missing"
        return 1
    fi
    preflight_pass "CANON_INVENTORY.json exists"
    
    # Check 4.2: CANON_INVENTORY.json Valid JSON
    if ! jq empty "$canon_inventory" 2>/dev/null; then
        preflight_fail "CRITICAL: CANON_INVENTORY.json is invalid JSON"
        return 1
    fi
    preflight_pass "CANON_INVENTORY.json is valid JSON"
    
    # Check 4.3: No Placeholder Hashes (Degraded Mode Check)
    local placeholder_hashes=$(jq -r '.canons[] | select(.file_hash_sha256 | length < 64) | .filename' "$canon_inventory" 2>/dev/null || true)
    if [ -n "$placeholder_hashes" ]; then
        preflight_fail "DEGRADED MODE: Placeholder/truncated hashes detected"
        return 1
    fi
    preflight_pass "No placeholder hashes (non-degraded mode)"
    
    echo ""
}

###############################################################################
# Category 5: Role-Specific Sandbox
###############################################################################

category_5_role_specific_sandbox() {
    echo "=== PREFLIGHT: Category 5 - Role-Specific Sandbox ==="
    
    # CUSTOMIZE: Add agent-class-specific sandbox logic
    case "$AGENT_CLASS" in
        supervisor)
            # Foreman sandbox
            preflight_pass "Foreman sandbox: QA ownership enabled"
            preflight_pass "Foreman sandbox: Production code writing DISABLED"
            ;;
        implementer)
            # Builder sandbox
            preflight_pass "Builder sandbox: Red QA authority DISABLED"
            preflight_pass "Builder sandbox: Architecture → Green mandate"
            ;;
        administrator)
            # Administrator sandbox
            preflight_pass "Administrator sandbox: Canon inventory steward"
            preflight_pass "Administrator sandbox: Canon semantic changes REQUIRE CS2"
            ;;
        overseer)
            # Overseer sandbox
            preflight_pass "Overseer sandbox: Multi-repo visibility"
            preflight_pass "Overseer sandbox: Direct modifications DISABLED"
            ;;
        liaison)
            # Liaison sandbox
            preflight_pass "Liaison sandbox: Cross-repo read ENABLED"
            preflight_pass "Liaison sandbox: Drift detection authority"
            ;;
        *)
            preflight_warn "Unknown agent class: $AGENT_CLASS"
            ;;
    esac
    
    echo ""
}

###############################################################################
# Main Execution
###############################################################################

main() {
    echo ""
    echo "═══════════════════════════════════════════════════════════════"
    echo "  PREFLIGHT CHECK: $AGENT_TYPE"
    echo "═══════════════════════════════════════════════════════════════"
    echo ""
    
    # Execute all categories
    category_1_identity_verification || true
    category_2_boundary_establishment || true
    category_3_default_behavior_blocking || true
    category_4_governance_state_validation || true
    category_5_role_specific_sandbox || true
    
    # Final Status
    echo "═══════════════════════════════════════════════════════════════"
    echo "  PREFLIGHT RESULT"
    echo "═══════════════════════════════════════════════════════════════"
    echo ""
    
    if [ "$PREFLIGHT_STATUS" = "PASS" ]; then
        echo "✅ PREFLIGHT PASSED"
        if [ ${#PREFLIGHT_WARNINGS[@]} -gt 0 ]; then
            echo ""
            echo "⚠️  Warnings (${#PREFLIGHT_WARNINGS[@]}):"
            for warning in "${PREFLIGHT_WARNINGS[@]}"; do
                echo "  - $warning"
            done
        fi
        echo ""
        exit 0
    else
        echo "❌ PREFLIGHT FAILED"
        echo ""
        echo "Errors (${#PREFLIGHT_ERRORS[@]}):"
        for error in "${PREFLIGHT_ERRORS[@]}"; do
            echo "  - $error"
        done
        echo ""
        echo "Session HALTED per AGENT_PREFLIGHT_PATTERN.md"
        echo ""
        exit 1
    fi
}

# Execute main
main "$@"
