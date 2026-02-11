#!/bin/bash
###############################################################################
# LIVING_AGENT_SYSTEM: Wake-Up Protocol
# Version: 1.0.0
# Authority: governance/canon/LIVING_AGENT_SYSTEM.md
# Purpose: Mandatory session start protocol for all agents
###############################################################################

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
WORKSPACE_ROOT="${REPO_ROOT}/.agent-workspace"
GOVERNANCE_CANON="${REPO_ROOT}/governance/canon"
CANON_INVENTORY_MANIFEST="${REPO_ROOT}/governance/CANON_INVENTORY.json"
GOVERNANCE_INVENTORY="${REPO_ROOT}/GOVERNANCE_ARTIFACT_INVENTORY.md"

###############################################################################
# Helper Functions
###############################################################################

log_info() {
    echo -e "${BLUE}[INFO]${NC} $*"
}

log_success() {
    echo -e "${GREEN}[✓]${NC} $*"
}

log_warning() {
    echo -e "${YELLOW}[⚠]${NC} $*"
}

log_error() {
    echo -e "${RED}[✗]${NC} $*"
}

###############################################################################
# Step 1: Self-Identification
###############################################################################

identify_agent() {
    local agent_type="$1"
    
    log_info "Step 1: Self-Identification"
    
    # Check if agent contract exists
    local agent_contract="${REPO_ROOT}/.github/agents/${agent_type}.agent.md"
    if [ ! -f "$agent_contract" ]; then
        # Fallback for v2 contract naming (governance-repo-administrator)
        if [ -f "${REPO_ROOT}/.github/agents/${agent_type}-v2.agent.md" ]; then
            agent_contract="${REPO_ROOT}/.github/agents/${agent_type}-v2.agent.md"
        else
            log_error "Agent contract not found: $agent_contract"
            return 1
        fi
    fi
    
    # Extract identity from YAML frontmatter
    AGENT_ID=$(grep "^  id:" "$agent_contract" | head -1 | sed 's/^  id: //' | tr -d ' ')
    AGENT_CLASS=$(grep "^  class:" "$agent_contract" | head -1 | sed 's/^  class: //' | tr -d ' ')
    AGENT_DESCRIPTION=$(grep "^description:" "$agent_contract" | head -1 | sed 's/^description: //')
    
    log_success "Agent identified: $AGENT_ID (class: $AGENT_CLASS)"
    log_info "Description: $AGENT_DESCRIPTION"
    
    export AGENT_TYPE="$agent_type"
    export AGENT_ID
    export AGENT_CLASS
    export AGENT_DESCRIPTION
}

###############################################################################
# Step 2: Memory Scan
###############################################################################

scan_memory() {
    log_info "Step 2: Memory Scan"
    
    local agent_workspace="${WORKSPACE_ROOT}/${AGENT_TYPE}"
    local memory_dir="${agent_workspace}/memory"
    
    # Create workspace if it doesn't exist
    if [ ! -d "$agent_workspace" ]; then
        log_warning "Workspace not found. Initializing new workspace..."
        initialize_workspace
        log_success "Workspace initialized at $agent_workspace"
        return 0
    fi
    
    # Scan last 5 sessions
    if [ -d "$memory_dir" ]; then
        local session_count=$(find "$memory_dir" -maxdepth 1 -name "session-*.md" 2>/dev/null | wc -l)
        log_success "Found $session_count previous session(s) in memory"
        
        if [ "$session_count" -gt 0 ]; then
            log_info "Last 5 sessions:"
            find "$memory_dir" -maxdepth 1 -name "session-*.md" | sort -r | head -5 | while read -r session; do
                local session_name=$(basename "$session")
                echo "  - $session_name"
            done
        fi
    else
        log_warning "Memory directory not found. First session for this agent."
    fi
}

###############################################################################
# Step 3: Context Load
###############################################################################

load_context() {
    log_info "Step 3: Context Load"
    
    local agent_workspace="${WORKSPACE_ROOT}/${AGENT_TYPE}"
    local context_dir="${agent_workspace}/context"
    
    if [ -d "$context_dir" ]; then
        log_success "Context directory found"
        
        # List available context files
        if [ "$(ls -A "$context_dir" 2>/dev/null)" ]; then
            log_info "Available context files:"
            for context_file in "$context_dir"/*.md; do
                if [ -f "$context_file" ]; then
                    echo "  - $(basename "$context_file")"
                fi
            done
        fi
    else
        log_warning "Context directory not initialized. Will create during workspace setup."
    fi
}

###############################################################################
# Step 4: Environment Check
###############################################################################

check_environment() {
    log_info "Step 4: Environment Check"
    
    # Check git state
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        log_error "Not in a git repository"
        return 1
    fi
    
    local current_branch=$(git rev-parse --abbrev-ref HEAD)
    log_success "Current branch: $current_branch"
    
    # Check for uncommitted changes
    if ! git diff-index --quiet HEAD -- 2>/dev/null; then
        log_warning "Uncommitted changes detected"
    else
        log_success "Working tree clean"
    fi
    
    # Check governance canon exists
    if [ -d "$GOVERNANCE_CANON" ]; then
        log_success "Governance canon found at $GOVERNANCE_CANON"
    else
        log_warning "Governance canon directory not found"
    fi
    
    # Export environment info
    export CURRENT_BRANCH="$current_branch"
    export SESSION_TIMESTAMP=$(date -u +"%Y%m%d-%H%M%S")
}

###############################################################################
# Step 5: Gap Analysis
###############################################################################

analyze_gaps() {
    log_info "Step 5: Gap Analysis"
    
    # Check if governance inventory exists
    if [ -f "$GOVERNANCE_INVENTORY" ]; then
        log_success "Governance inventory found"
        # Count governance artifacts
        local artifact_count=$(grep -c "^###" "$GOVERNANCE_INVENTORY" 2>/dev/null || echo "0")
        log_info "Governance artifacts tracked: $artifact_count"
    else
        log_warning "GOVERNANCE_ARTIFACT_INVENTORY.md not found"
    fi
    
    # Check canon inventory manifest
    if [ -f "$CANON_INVENTORY_MANIFEST" ]; then
        log_success "Canon inventory manifest found"
        local tier0_count=$(grep -c '"path"' "$CANON_INVENTORY_MANIFEST" 2>/dev/null || echo "0")
        log_info "Canon inventory documents: $tier0_count"
    else
        log_warning "CANON_INVENTORY.json not found"
    fi
    
    # Note: Full gap analysis would involve checking each canon file
    # For now, we just verify the tracking mechanisms exist
}

###############################################################################
# Step 6: Working Contract Generation
###############################################################################

generate_working_contract() {
    log_info "Step 6: Working Contract Generation"
    
    local agent_workspace="${WORKSPACE_ROOT}/${AGENT_TYPE}"
    local working_contract="${agent_workspace}/working-contract.md"
    
    # Ensure workspace exists
    mkdir -p "$agent_workspace"
    
    # Generate working contract
    cat > "$working_contract" <<EOF
# Working Contract: ${AGENT_ID} - Session ${SESSION_TIMESTAMP}

**Generated**: $(date -u +"%Y-%m-%d %H:%M:%S UTC")  
**Agent Type**: ${AGENT_TYPE}  
**Agent Class**: ${AGENT_CLASS}  
**Branch**: ${CURRENT_BRANCH}

---

## Identity & Mission

${AGENT_DESCRIPTION}

**Agent ID**: ${AGENT_ID}  
**Class**: ${AGENT_CLASS}

---

## Session Context

- **Timestamp**: ${SESSION_TIMESTAMP}
- **Branch**: ${CURRENT_BRANCH}
- **Working Directory**: ${REPO_ROOT}
- **Workspace**: ${agent_workspace}

---

## Active Mandates

### Constitutional Principles (BUILD_PHILOSOPHY.md)
1. Architecture → QA → Build → Validation
2. Zero Test Debt: 100% passage, no suppression
3. 100% Handovers: Complete or escalate
4. Warnings = Errors
5. CI Confirmatory: Local validation first
6. Gate Alignment: Verify script/CI match before handover
7. Ripple Discipline: Canon changes MUST ripple to consumers
8. Canonical Supremacy: This repo is source of truth

### Session-Specific Mandates
- Read LIVING_AGENT_SYSTEM.md for lifecycle guidance
- Execute all work per canonical governance
- Capture learnings for next session
- Run session-closure.sh before handover
- Zero direct writes to agent contract files

---

## Session Boundaries

### In Scope
- Task assigned via issue or user request
- Governance canon maintenance (if applicable)
- Local validation and gate verification
- Memory and learning capture

### Out of Scope
- Direct modification of agent contract files
- Cross-repository changes without approval
- Bypassing merge gates or validation
- Skipping session closure protocol

### Escalate If
- Cannot complete task within session scope
- Governance gap requiring CS2 interpretation
- Agent contract modification needed
- Blocker preventing progress
- Environment health critical issue

---

## Recent Learnings

EOF

    # Append recent session summaries if they exist
    local memory_dir="${agent_workspace}/memory"
    if [ -d "$memory_dir" ]; then
        local recent_sessions=$(find "$memory_dir" -maxdepth 1 -name "session-*.md" | sort -r | head -3)
        if [ -n "$recent_sessions" ]; then
            echo "### Last 3 Sessions Summary" >> "$working_contract"
            echo "" >> "$working_contract"
            echo "$recent_sessions" | while read -r session; do
                local session_name=$(basename "$session" .md)
                echo "#### $session_name" >> "$working_contract"
                # Extract key learnings if section exists
                if grep -q "## Lessons Learned" "$session"; then
                    sed -n '/## Lessons Learned/,/^##/p' "$session" | grep "^-" | head -3 >> "$working_contract" || true
                fi
                echo "" >> "$working_contract"
            done
        else
            echo "*(No recent sessions found - this may be first session)*" >> "$working_contract"
            echo "" >> "$working_contract"
        fi
    else
        echo "*(No memory directory - this is first session)*" >> "$working_contract"
        echo "" >> "$working_contract"
    fi
    
    # Add personal reminders section
    cat >> "$working_contract" <<EOF

---

## Personal Reminders

EOF

    local personal_dir="${agent_workspace}/personal"
    if [ -f "${personal_dir}/lessons-learned.md" ]; then
        echo "### Lessons Learned" >> "$working_contract"
        head -10 "${personal_dir}/lessons-learned.md" >> "$working_contract" || true
        echo "" >> "$working_contract"
    fi
    
    if [ -f "${personal_dir}/patterns.md" ]; then
        echo "### Known Patterns" >> "$working_contract"
        head -10 "${personal_dir}/patterns.md" >> "$working_contract" || true
        echo "" >> "$working_contract"
    fi
    
    # Add success criteria
    cat >> "$working_contract" <<EOF

---

## Success Criteria

- [ ] Task completed per issue requirements
- [ ] All merge gates pass (local validation)
- [ ] Zero test debt introduced
- [ ] Zero warnings in validation output
- [ ] PREHANDOVER_PROOF created with evidence
- [ ] Session memory captured
- [ ] Environment left in safe state
- [ ] session-closure.sh executed successfully

---

*This working contract is dynamically generated per LIVING_AGENT_SYSTEM.md protocol.  
Do not modify agent contract files directly. Escalate contract changes to CS2.*
EOF
    
    log_success "Working contract generated: $working_contract"
}

###############################################################################
# Step 7: Escalation Check
###############################################################################

check_escalations() {
    log_info "Step 7: Escalation Check"
    
    local agent_workspace="${WORKSPACE_ROOT}/${AGENT_TYPE}"
    local escalation_inbox="${agent_workspace}/escalation-inbox"
    
    if [ -d "$escalation_inbox" ]; then
        local pending_count=$(find "$escalation_inbox" -maxdepth 1 -name "from-*.md" 2>/dev/null | wc -l)
        
        if [ "$pending_count" -gt 0 ]; then
            log_warning "Found $pending_count pending escalation(s)"
            find "$escalation_inbox" -maxdepth 1 -name "from-*.md" | while read -r escalation; do
                echo "  - $(basename "$escalation")"
            done
        else
            log_success "No pending escalations"
        fi
    else
        log_success "No escalation inbox (will create if needed)"
    fi
}

###############################################################################
# Step 8: Health Assessment
###############################################################################

assess_health() {
    log_info "Step 8: Health Assessment"
    
    local agent_workspace="${WORKSPACE_ROOT}/${AGENT_TYPE}"
    local health_file="${agent_workspace}/environment-health.json"
    
    # Ensure workspace exists
    mkdir -p "$agent_workspace"
    
    # Generate health assessment
    cat > "$health_file" <<EOF
{
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "session_id": "${SESSION_TIMESTAMP}",
  "agent": {
    "type": "${AGENT_TYPE}",
    "id": "${AGENT_ID}",
    "class": "${AGENT_CLASS}"
  },
  "environment": {
    "branch": "${CURRENT_BRANCH}",
    "working_tree_clean": $(git diff-index --quiet HEAD -- 2>/dev/null && echo "true" || echo "false"),
    "governance_canon_exists": $([ -d "$GOVERNANCE_CANON" ] && echo "true" || echo "false"),
    "canon_inventory_exists": $([ -f "$CANON_INVENTORY_MANIFEST" ] && echo "true" || echo "false"),
    "governance_inventory_exists": $([ -f "$GOVERNANCE_INVENTORY" ] && echo "true" || echo "false")
  },
  "status": "wake_up_complete",
  "next_action": "begin_work_phase"
}
EOF
    
    log_success "Health assessment recorded: $health_file"
}

###############################################################################
# Workspace Initialization
###############################################################################

initialize_workspace() {
    local agent_workspace="${WORKSPACE_ROOT}/${AGENT_TYPE}"
    
    log_info "Initializing workspace structure..."
    
    # Create directory structure
    mkdir -p "${agent_workspace}/memory/.archive"
    mkdir -p "${agent_workspace}/personal"
    mkdir -p "${agent_workspace}/context"
    mkdir -p "${agent_workspace}/escalation-inbox/resolved"
    
    # Create initial context files
    cat > "${agent_workspace}/context/system-purpose.md" <<EOF
# System Purpose

*This file should contain the overall purpose and goals of the system this agent operates within.*

## Maturion Governance System

The Maturion governance system provides constitutional discipline for software development across multiple repositories. It ensures:

- Build discipline (Architecture → QA → Build → Validation)
- Zero test debt
- Gate-based merge protection
- Ripple propagation of governance changes
- Agent-based autonomous governance enforcement

## Repository Context

This is the canonical governance repository. All governance canon originates here and ripples to consumer repositories (office-app, PartPulse, R_Roster).
EOF
    
    cat > "${agent_workspace}/context/architecture.md" <<EOF
# System Architecture

*This file should contain high-level architecture understanding.*

## Repository Structure

- \`governance/canon/\` - Canonical governance documents (source of truth)
- \`governance/templates/\` - Templates for governance processes
- \`governance/CANON_INVENTORY.json\` - Constitutional document registry
- \`.github/agents/\` - Agent contract files
- \`.github/workflows/\` - CI/CD and merge gate workflows
- \`.github/scripts/\` - Executable governance protocols

## Agent Architecture

- **Overseer Agents**: Cross-repository coordination (CodexAdvisor)
- **Administrator Agents**: Repository-specific governance (governance-repo-administrator)
- **Builder Agents**: Application development (future: FM agents)
- **Liaison Agents**: Cross-repository governance synchronization (future: governance-liaison)
EOF
    
    cat > "${agent_workspace}/context/agent-role.md" <<EOF
# Agent Role: ${AGENT_TYPE}

${AGENT_DESCRIPTION}

## Primary Responsibilities

*To be populated based on agent contract and experience*

## Integration Points

*To be populated as integrations are discovered*

## Success Patterns

*To be populated as successful patterns emerge*
EOF
    
    cat > "${agent_workspace}/personal/lessons-learned.md" <<EOF
# Lessons Learned

*Mistakes to avoid in future sessions*

---

*(No lessons yet - first session)*
EOF
    
    cat > "${agent_workspace}/personal/patterns.md" <<EOF
# Recurring Patterns

*Patterns observed across sessions*

---

*(No patterns yet - first session)*
EOF
    
    cat > "${agent_workspace}/personal/efficiency-log.md" <<EOF
# Efficiency Log

*Process improvements and optimization opportunities*

---

*(No efficiency notes yet - first session)*
EOF
    
    cat > "${agent_workspace}/personal/anti-patterns.md" <<EOF
# Anti-Patterns

*Things that don't work - avoid these*

---

*(No anti-patterns documented yet - first session)*
EOF
    
    log_success "Workspace structure initialized"
}

###############################################################################
# Main Execution
###############################################################################

main() {
    if [ $# -lt 1 ]; then
        log_error "Usage: $0 <agent-type>"
        log_info "Example: $0 governance-repo-administrator"
        exit 1
    fi
    
    local agent_type="$1"
    
    echo ""
    echo "═══════════════════════════════════════════════════════════════"
    echo "  LIVING_AGENT_SYSTEM: Wake-Up Protocol v1.0.0"
    echo "═══════════════════════════════════════════════════════════════"
    echo ""
    
    # Execute wake-up sequence
    identify_agent "$agent_type" || exit 1
    scan_memory
    load_context
    check_environment || exit 1
    analyze_gaps
    generate_working_contract
    check_escalations
    assess_health
    
    echo ""
    echo "═══════════════════════════════════════════════════════════════"
    log_success "Wake-up protocol complete!"
    echo "═══════════════════════════════════════════════════════════════"
    echo ""
    log_info "Working contract: ${WORKSPACE_ROOT}/${agent_type}/working-contract.md"
    log_info "Next steps:"
    echo "  1. Read working contract for session context"
    echo "  2. Perform assigned task per governance"
    echo "  3. Execute session-closure.sh before handover"
    echo ""
}

# Execute main function
main "$@"
