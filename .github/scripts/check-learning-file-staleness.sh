#!/bin/bash
###############################################################################
# Learning File Staleness Detection
# Authority: AGENT_ENVIRONMENTAL_RESPONSIBILITY_DOCTRINE.md v1.1.0
# Purpose: Detect and flag placeholder-only learning files across sessions
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
STALENESS_THRESHOLD=3  # Sessions before flagging as stale
EXIT_CODE=0

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
# Placeholder Detection
###############################################################################

is_placeholder_content() {
    local file="$1"
    
    # Check if file contains only placeholder text patterns
    # Placeholder indicators:
    # - "No lessons yet - first session"
    # - "No patterns yet - first session"
    # - "No efficiency notes yet - first session"
    # - "No anti-patterns documented yet - first session"
    # - File is nearly empty (< 200 bytes, excluding headers)
    
    if [ ! -f "$file" ]; then
        return 1  # File doesn't exist, not a placeholder
    fi
    
    local content=$(cat "$file")
    
    # Check for explicit placeholder markers
    if echo "$content" | grep -qi "No lessons yet - first session"; then
        return 0  # Is placeholder
    fi
    
    if echo "$content" | grep -qi "No patterns yet - first session"; then
        return 0  # Is placeholder
    fi
    
    if echo "$content" | grep -qi "No efficiency notes yet - first session"; then
        return 0  # Is placeholder
    fi
    
    if echo "$content" | grep -qi "No anti-patterns documented yet - first session"; then
        return 0  # Is placeholder
    fi
    
    # Check for files with only headers and minimal content
    # Strip markdown headers, empty lines, and formatting
    local content_lines=$(echo "$content" | grep -v "^#" | grep -v "^-" | grep -v "^\*" | grep -v "^$" | grep -v "^\s*$" | wc -l)
    
    if [ "$content_lines" -lt 3 ]; then
        return 0  # Too little content, likely placeholder
    fi
    
    return 1  # Not a placeholder
}

###############################################################################
# Session Count Tracking
###############################################################################

count_agent_sessions() {
    local agent_type="$1"
    local memory_dir="${WORKSPACE_ROOT}/${agent_type}/memory"
    
    if [ ! -d "$memory_dir" ]; then
        echo "0"
        return
    fi
    
    # Count session files in memory and archive
    local active_sessions=$(find "$memory_dir" -maxdepth 1 -name "session-*.md" 2>/dev/null | wc -l)
    local archived_sessions=0
    
    if [ -d "$memory_dir/.archive" ]; then
        archived_sessions=$(find "$memory_dir/.archive" -name "session-*.md" 2>/dev/null | wc -l)
    fi
    
    local total_sessions=$((active_sessions + archived_sessions))
    echo "$total_sessions"
}

###############################################################################
# Learning File Analysis
###############################################################################

analyze_learning_files() {
    local agent_type="$1"
    local agent_workspace="${WORKSPACE_ROOT}/${agent_type}"
    local personal_dir="${agent_workspace}/personal"
    
    if [ ! -d "$personal_dir" ]; then
        log_info "No personal directory for agent: $agent_type (may be first session)"
        return 0
    fi
    
    log_info "Analyzing learning files for agent: $agent_type"
    
    local session_count=$(count_agent_sessions "$agent_type")
    log_info "Total sessions for $agent_type: $session_count"
    
    # Required learning files
    local learning_files=(
        "lessons-learned.md"
        "patterns.md"
        "anti-patterns.md"
        "efficiency-log.md"
    )
    
    local stale_files=()
    local warning_files=()
    
    for file in "${learning_files[@]}"; do
        local filepath="${personal_dir}/${file}"
        
        if [ ! -f "$filepath" ]; then
            log_warning "Missing learning file: $file (agent: $agent_type)"
            continue
        fi
        
        if is_placeholder_content "$filepath"; then
            log_warning "Placeholder content detected: $file"
            
            # Check if stale (sessions exceed threshold)
            if [ "$session_count" -ge "$STALENESS_THRESHOLD" ]; then
                log_error "STALE: $file has placeholder content after $session_count sessions (threshold: $STALENESS_THRESHOLD)"
                stale_files+=("$file")
                EXIT_CODE=1
            elif [ "$session_count" -gt 0 ]; then
                log_warning "WARNING: $file has placeholder content ($session_count sessions, threshold: $STALENESS_THRESHOLD)"
                warning_files+=("$file")
            else
                log_info "OK: $file is placeholder (first session, acceptable)"
            fi
        else
            log_success "OK: $file has meaningful content"
        fi
    done
    
    # Report summary for this agent
    if [ ${#stale_files[@]} -gt 0 ]; then
        echo ""
        log_error "Agent $agent_type has ${#stale_files[@]} STALE learning file(s):"
        for file in "${stale_files[@]}"; do
            echo "  - $file (${session_count} sessions without updates)"
        done
        echo ""
        echo "Required Action:"
        echo "  1. Review the agent's last $session_count sessions"
        echo "  2. Add meaningful learnings, patterns, or anti-patterns"
        echo "  3. If no learnings exist, document WHY (e.g., 'No failures encountered')"
        echo "  4. Update the files to remove placeholder content"
        echo ""
        echo "Authority: AGENT_ENVIRONMENTAL_RESPONSIBILITY_DOCTRINE.md v1.1.0"
        echo ""
    fi
    
    if [ ${#warning_files[@]} -gt 0 ]; then
        echo ""
        log_warning "Agent $agent_type has ${#warning_files[@]} learning file(s) approaching staleness:"
        for file in "${warning_files[@]}"; do
            echo "  - $file (${session_count} sessions, will be stale at ${STALENESS_THRESHOLD})"
        done
        echo ""
        echo "Recommendation: Update these files in the next session to avoid staleness enforcement."
        echo ""
    fi
}

###############################################################################
# Main Execution
###############################################################################

main() {
    echo ""
    echo "═══════════════════════════════════════════════════════════════"
    echo "  Learning File Staleness Detection v1.0.0"
    echo "  Authority: AGENT_ENVIRONMENTAL_RESPONSIBILITY_DOCTRINE.md v1.1.0"
    echo "═══════════════════════════════════════════════════════════════"
    echo ""
    
    log_info "Staleness threshold: $STALENESS_THRESHOLD sessions"
    log_info "Workspace root: $WORKSPACE_ROOT"
    echo ""
    
    # Find all agent workspaces
    if [ ! -d "$WORKSPACE_ROOT" ]; then
        log_error "No agent workspace found at $WORKSPACE_ROOT"
        log_info "This check applies to repositories with agent workspaces"
        exit 0  # Not an error if no workspace exists
    fi
    
    # Get list of agent types from workspace directories
    local agent_types=()
    for dir in "$WORKSPACE_ROOT"/*; do
        if [ -d "$dir" ] && [ "$(basename "$dir")" != ".archive" ]; then
            agent_types+=("$(basename "$dir")")
        fi
    done
    
    if [ ${#agent_types[@]} -eq 0 ]; then
        log_info "No agent workspaces found"
        exit 0
    fi
    
    log_info "Found ${#agent_types[@]} agent workspace(s)"
    echo ""
    
    # Analyze each agent
    for agent_type in "${agent_types[@]}"; do
        analyze_learning_files "$agent_type"
    done
    
    # Final summary
    echo ""
    echo "═══════════════════════════════════════════════════════════════"
    if [ $EXIT_CODE -eq 0 ]; then
        log_success "Learning file staleness check PASSED"
        echo "✅ All learning files are either fresh or have meaningful content"
    else
        log_error "Learning file staleness check FAILED"
        echo "❌ One or more learning files have stale placeholder content"
        echo ""
        echo "This violates learning capture requirements in:"
        echo "  - AGENT_ENVIRONMENTAL_RESPONSIBILITY_DOCTRINE.md v1.1.0"
        echo "  - MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md"
        echo ""
        echo "Agents MUST capture real learnings, patterns, and anti-patterns."
        echo "Placeholder files beyond $STALENESS_THRESHOLD sessions are not acceptable."
    fi
    echo "═══════════════════════════════════════════════════════════════"
    echo ""
    
    exit $EXIT_CODE
}

# Execute main function
main "$@"
