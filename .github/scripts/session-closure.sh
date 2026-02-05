#!/bin/bash
###############################################################################
# LIVING_AGENT_SYSTEM: Session Closure Protocol
# Version: 1.0.0
# Authority: governance/canon/LIVING_AGENT_SYSTEM.md
# Purpose: Mandatory session end protocol for all agents
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
MAX_SESSIONS=5

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

prompt_user() {
    local prompt="$1"
    local default="${2:-}"
    local response
    
    if [ -n "$default" ]; then
        read -p "$prompt [$default]: " response
        echo "${response:-$default}"
    else
        read -p "$prompt: " response
        echo "$response"
    fi
}

###############################################################################
# Step 1: Load Agent Context
###############################################################################

load_agent_context() {
    local agent_type="$1"
    
    log_info "Step 1: Loading Agent Context"
    
    local agent_workspace="${WORKSPACE_ROOT}/${agent_type}"
    local health_file="${agent_workspace}/environment-health.json"
    
    if [ ! -f "$health_file" ]; then
        log_error "Environment health file not found. Did you run wake-up-protocol.sh?"
        return 1
    fi
    
    # Extract session info from health file
    AGENT_TYPE="$agent_type"
    SESSION_TIMESTAMP=$(grep '"session_id"' "$health_file" | sed 's/.*"session_id": "\([^"]*\)".*/\1/')
    CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
    
    log_success "Agent: $AGENT_TYPE"
    log_success "Session: $SESSION_TIMESTAMP"
    log_success "Branch: $CURRENT_BRANCH"
    
    export AGENT_TYPE SESSION_TIMESTAMP CURRENT_BRANCH
}

###############################################################################
# Step 2: Create Session Memory
###############################################################################

create_session_memory() {
    log_info "Step 2: Creating Session Memory"
    
    local agent_workspace="${WORKSPACE_ROOT}/${AGENT_TYPE}"
    local memory_dir="${agent_workspace}/memory"
    local session_file="${memory_dir}/session-${SESSION_TIMESTAMP}.md"
    
    mkdir -p "$memory_dir"
    
    # Interactive memory capture
    echo ""
    echo "═══════════════════════════════════════════════════════════════"
    echo "  Session Memory Capture"
    echo "═══════════════════════════════════════════════════════════════"
    echo ""
    
    local issue_number=$(prompt_user "Issue number (if applicable)" "N/A")
    local purpose=$(prompt_user "Session purpose (one line summary)" "")
    
    # Create memory file
    cat > "$session_file" <<EOF
# Session Memory: $(date -u +"%Y-%m-%d %H:%M:%S UTC")

## Agent
- Type: ${AGENT_TYPE}
- Session ID: ${SESSION_TIMESTAMP}
- Branch: ${CURRENT_BRANCH}

## Context
- Issue: ${issue_number}
- Purpose: ${purpose}

## Actions Taken

EOF
    
    echo ""
    log_info "Describe actions taken (one per line, empty line to finish):"
    local line_num=1
    while true; do
        read -p "  Action $line_num: " action
        [ -z "$action" ] && break
        echo "- $action" >> "$session_file"
        ((line_num++))
    done
    
    cat >> "$session_file" <<EOF

## Decisions Made

EOF
    
    echo ""
    log_info "Key decisions made (format: 'Decision and rationale', empty line to finish):"
    line_num=1
    while true; do
        read -p "  Decision $line_num: " decision
        [ -z "$decision" ] && break
        echo "- $decision" >> "$session_file"
        ((line_num++))
    done
    
    cat >> "$session_file" <<EOF

## Lessons Learned

EOF
    
    echo ""
    log_info "Lessons learned (observations, mistakes avoided, empty line to finish):"
    line_num=1
    while true; do
        read -p "  Lesson $line_num: " lesson
        [ -z "$lesson" ] && break
        echo "- $lesson" >> "$session_file"
        ((line_num++))
    done
    
    cat >> "$session_file" <<EOF

## Patterns Observed

EOF
    
    echo ""
    log_info "Patterns observed (recurring themes, empty line to finish):"
    line_num=1
    while true; do
        read -p "  Pattern $line_num: " pattern
        [ -z "$pattern" ] && break
        echo "- $pattern" >> "$session_file"
        ((line_num++))
    done
    
    cat >> "$session_file" <<EOF

## Blockers Encountered

*(None recorded in this session)*

## Governance Gaps Identified

*(None recorded in this session)*

## Files Modified

EOF
    
    # List modified files from git
    if ! git diff-index --quiet HEAD -- 2>/dev/null; then
        git diff --name-only HEAD >> "$session_file"
    else
        echo "*(No files modified)*" >> "$session_file"
    fi
    
    cat >> "$session_file" <<EOF

## Next Session Recommendations

EOF
    
    echo ""
    log_info "Recommendations for next session (empty line to finish):"
    line_num=1
    while true; do
        read -p "  Recommendation $line_num: " rec
        [ -z "$rec" ] && break
        echo "- $rec" >> "$session_file"
        ((line_num++))
    done
    
    cat >> "$session_file" <<EOF

## Handover State
- Status: COMPLETE
- Environment: CLEAN
- Notes: Session closure completed successfully
EOF
    
    log_success "Session memory created: $session_file"
}

###############################################################################
# Step 3: Rotate Memory
###############################################################################

rotate_memory() {
    log_info "Step 3: Rotating Memory (keeping last $MAX_SESSIONS sessions)"
    
    local agent_workspace="${WORKSPACE_ROOT}/${AGENT_TYPE}"
    local memory_dir="${agent_workspace}/memory"
    local archive_dir="${memory_dir}/.archive"
    
    mkdir -p "$archive_dir"
    
    # Count sessions
    local session_files=$(find "$memory_dir" -maxdepth 1 -name "session-*.md" | sort -r)
    local session_count=$(echo "$session_files" | wc -l)
    
    if [ "$session_count" -gt "$MAX_SESSIONS" ]; then
        log_info "Found $session_count sessions, archiving old ones..."
        
        # Archive sessions beyond MAX_SESSIONS
        echo "$session_files" | tail -n +$((MAX_SESSIONS + 1)) | while read -r old_session; do
            local session_name=$(basename "$old_session")
            mv "$old_session" "$archive_dir/"
            log_info "Archived: $session_name"
        done
        
        local archived_count=$((session_count - MAX_SESSIONS))
        log_success "Archived $archived_count old session(s)"
    else
        log_success "Session count ($session_count) within limit ($MAX_SESSIONS)"
    fi
    
    # Create monthly summary if we have archived sessions
    if [ -n "$(ls -A "$archive_dir" 2>/dev/null)" ]; then
        local current_month=$(date -u +"%Y-%m")
        local summary_file="${archive_dir}/summary-${current_month}.md"
        
        if [ ! -f "$summary_file" ]; then
            log_info "Creating monthly summary for $current_month..."
            cat > "$summary_file" <<EOF
# Monthly Memory Summary: $current_month

## Agent: ${AGENT_TYPE}

## Sessions This Month

EOF
            find "$archive_dir" -maxdepth 1 -name "session-${current_month}*.md" | sort | while read -r session; do
                local session_name=$(basename "$session" .md)
                echo "- $session_name" >> "$summary_file"
            done
            
            log_success "Monthly summary created: $summary_file"
        fi
    fi
}

###############################################################################
# Step 4: Update Personal Learnings
###############################################################################

update_personal_learnings() {
    log_info "Step 4: Updating Personal Learnings"
    
    local agent_workspace="${WORKSPACE_ROOT}/${AGENT_TYPE}"
    local personal_dir="${agent_workspace}/personal"
    local lessons_file="${personal_dir}/lessons-learned.md"
    
    echo ""
    read -p "Add to lessons learned? (y/N): " add_lesson
    
    if [[ "$add_lesson" =~ ^[Yy]$ ]]; then
        echo ""
        log_info "Enter lesson learned (what to avoid/remember):"
        read -p "Lesson: " lesson_text
        
        if [ -n "$lesson_text" ]; then
            echo "- [$(date -u +"%Y-%m-%d")] $lesson_text" >> "$lessons_file"
            log_success "Lesson added to personal learnings"
        fi
    else
        log_info "No lessons added"
    fi
}

###############################################################################
# Step 5: Check for Escalations
###############################################################################

check_escalations() {
    log_info "Step 5: Checking for Escalations"
    
    echo ""
    read -p "Create escalation for another agent or CS2? (y/N): " create_escalation
    
    if [[ "$create_escalation" =~ ^[Yy]$ ]]; then
        echo ""
        read -p "Escalate to (agent-type or CS2): " escalation_target
        read -p "Escalation subject: " escalation_subject
        read -p "Escalation description: " escalation_desc
        
        local agent_workspace="${WORKSPACE_ROOT}/${AGENT_TYPE}"
        local escalation_dir="${agent_workspace}/escalation-inbox"
        
        # Determine target directory
        if [ "$escalation_target" == "CS2" ]; then
            escalation_dir="${REPO_ROOT}/.agent-admin/escalations"
            mkdir -p "$escalation_dir"
        else
            escalation_dir="${WORKSPACE_ROOT}/${escalation_target}/escalation-inbox"
            mkdir -p "$escalation_dir"
        fi
        
        local escalation_file="${escalation_dir}/from-${AGENT_TYPE}-${SESSION_TIMESTAMP}.md"
        
        cat > "$escalation_file" <<EOF
# Escalation from ${AGENT_TYPE}

**Date**: $(date -u +"%Y-%m-%d %H:%M:%S UTC")  
**Session**: ${SESSION_TIMESTAMP}  
**From**: ${AGENT_TYPE}  
**To**: ${escalation_target}  
**Branch**: ${CURRENT_BRANCH}

## Subject

${escalation_subject}

## Description

${escalation_desc}

## Context

- Issue: See session memory session-${SESSION_TIMESTAMP}.md
- Files involved: (see git diff)
- Blocker: (describe what prevented completion)

## Requested Action

(What needs to happen to unblock or resolve this?)

## Priority

- [ ] CRITICAL - Blocks all progress
- [ ] HIGH - Blocks significant work
- [ ] MEDIUM - Can work around temporarily
- [ ] LOW - Enhancement or optimization

---

*Created by session-closure.sh per LIVING_AGENT_SYSTEM.md*
EOF
        
        log_success "Escalation created: $escalation_file"
    else
        log_info "No escalations created"
    fi
}

###############################################################################
# Step 6: Update Environment Health
###############################################################################

update_environment_health() {
    log_info "Step 6: Updating Environment Health"
    
    local agent_workspace="${WORKSPACE_ROOT}/${AGENT_TYPE}"
    local health_file="${agent_workspace}/environment-health.json"
    
    # Update health file with session closure
    cat > "$health_file" <<EOF
{
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "session_id": "${SESSION_TIMESTAMP}",
  "agent": {
    "type": "${AGENT_TYPE}"
  },
  "environment": {
    "branch": "${CURRENT_BRANCH}",
    "working_tree_clean": $(git diff-index --quiet HEAD -- 2>/dev/null && echo "true" || echo "false")
  },
  "status": "session_closed",
  "last_session": "session-${SESSION_TIMESTAMP}.md",
  "next_action": "ready_for_next_session"
}
EOF
    
    log_success "Environment health updated"
}

###############################################################################
# Step 7: Archive Working Contract
###############################################################################

archive_working_contract() {
    log_info "Step 7: Archiving Working Contract"
    
    local agent_workspace="${WORKSPACE_ROOT}/${AGENT_TYPE}"
    local working_contract="${agent_workspace}/working-contract.md"
    local memory_dir="${agent_workspace}/memory"
    local archive_dir="${memory_dir}/.archive"
    
    if [ -f "$working_contract" ]; then
        cp "$working_contract" "${archive_dir}/working-contract-${SESSION_TIMESTAMP}.md"
        log_success "Working contract archived"
    else
        log_warning "No working contract found to archive"
    fi
}

###############################################################################
# Step 8: Verify Safe State
###############################################################################

verify_safe_state() {
    log_info "Step 8: Verifying Safe State"
    
    local issues=0
    
    # Check git state
    if ! git diff-index --quiet HEAD -- 2>/dev/null; then
        log_warning "Uncommitted changes detected"
        ((issues++))
    else
        log_success "No uncommitted changes"
    fi
    
    # Check if all scripts are executable
    if [ ! -x ".github/scripts/wake-up-protocol.sh" ]; then
        log_warning "wake-up-protocol.sh not executable"
        ((issues++))
    else
        log_success "wake-up-protocol.sh is executable"
    fi
    
    if [ ! -x ".github/scripts/session-closure.sh" ]; then
        log_warning "session-closure.sh not executable"
        ((issues++))
    else
        log_success "session-closure.sh is executable"
    fi
    
    # Summary
    if [ $issues -eq 0 ]; then
        log_success "Environment in safe state for handover"
        return 0
    else
        log_warning "Found $issues issue(s) - review before handover"
        return 1
    fi
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
    echo "  LIVING_AGENT_SYSTEM: Session Closure Protocol v1.0.0"
    echo "═══════════════════════════════════════════════════════════════"
    echo ""
    
    # Execute closure sequence
    load_agent_context "$agent_type" || exit 1
    create_session_memory
    rotate_memory
    update_personal_learnings
    check_escalations
    update_environment_health
    archive_working_contract
    verify_safe_state
    
    echo ""
    echo "═══════════════════════════════════════════════════════════════"
    log_success "Session closure protocol complete!"
    echo "═══════════════════════════════════════════════════════════════"
    echo ""
    log_info "Session memory: ${WORKSPACE_ROOT}/${agent_type}/memory/session-${SESSION_TIMESTAMP}.md"
    log_info "Next session: Run wake-up-protocol.sh to load this session's memory"
    echo ""
}

# Execute main function
main "$@"
