#!/usr/bin/env bash
#
# governance-gap-analyzer.sh
#
# Purpose: Automated governance gap detection and remediation script
# Authority: PRE_WORK_GOVERNANCE_SELF_TEST_PROTOCOL.md v1.0.0
# Version: 1.0.0
# Created: 2026-02-04
#
# Exit Codes:
#   0 - Pass: No gaps detected
#   1 - Warning: Recommended gaps only (non-blocking)
#   2 - Fail: Mandatory gaps detected (blocking in strict mode)
#   3 - Critical: Critical mandatory gaps (always blocking)
#   4 - Error: Script execution failure
#

set -euo pipefail

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script metadata
SCRIPT_VERSION="1.0.0"
TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)

# Default values
MODE="pre-work"
AGENT_ID=""
OUTPUT_FILE=""
AUTO_LAYER_DOWN=false
STRICT_MODE=false
VERBOSE=false

# Canonical governance repository
CANONICAL_REPO="APGI-cmy/maturion-foreman-governance"
CANONICAL_BRANCH="main"

# Usage information
usage() {
  cat <<EOF
Usage: $0 --agent-id AGENT_ID [OPTIONS]

Governance gap detection and remediation tool.

Required:
  --agent-id ID         Agent identifier (e.g., governance-liaison, foreman, builder)

Options:
  --mode MODE           Operation mode: pre-work, remediate, audit (default: pre-work)
  --output FILE         Output report file path (markdown format)
  --auto-layer-down     Automatically layer down missing governance files
  --strict              Treat mandatory gaps as blocking (exit code 2)
  --verbose             Enable verbose output
  --help                Show this help message

Exit Codes:
  0 - Pass: No gaps detected
  1 - Warning: Recommended gaps only
  2 - Fail: Mandatory gaps detected (in strict mode)
  3 - Critical: Critical mandatory gaps (always blocking)
  4 - Error: Script execution failure

Examples:
  # Pre-work gap check
  $0 --agent-id governance-liaison --mode pre-work

  # Gap remediation with auto-layer-down
  $0 --agent-id foreman --mode remediate --auto-layer-down

  # Full audit with report
  $0 --agent-id builder --mode audit --output gap-report.md

Authority: PRE_WORK_GOVERNANCE_SELF_TEST_PROTOCOL.md v1.0.0
EOF
  exit 0
}

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --agent-id)
      AGENT_ID="$2"
      shift 2
      ;;
    --mode)
      MODE="$2"
      shift 2
      ;;
    --output)
      OUTPUT_FILE="$2"
      shift 2
      ;;
    --auto-layer-down)
      AUTO_LAYER_DOWN=true
      shift
      ;;
    --strict)
      STRICT_MODE=true
      shift
      ;;
    --verbose)
      VERBOSE=true
      shift
      ;;
    --help)
      usage
      ;;
    *)
      echo -e "${RED}Error: Unknown option $1${NC}" >&2
      usage
      exit 4
      ;;
  esac
done

# Validate required arguments
if [ -z "$AGENT_ID" ]; then
  echo -e "${RED}Error: --agent-id is required${NC}" >&2
  usage
  exit 4
fi

# Logging functions
log_info() {
  echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
  echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
  echo -e "${RED}❌ $1${NC}" >&2
}

log_verbose() {
  if [ "$VERBOSE" = true ]; then
    echo -e "${BLUE}🔍 $1${NC}"
  fi
}

# Initialize counters
MANDATORY_GAPS=0
RECOMMENDED_GAPS=0
CRITICAL_GAPS=0
MISSING_BINDINGS=0
MISSING_LOCKED_SECTIONS=0

# Agent type validation
validate_agent_type() {
  local agent="$1"
  case "$agent" in
    foreman|builder|governance-liaison|governance-repo-administrator|CodexAdvisor|assurance)
      return 0
      ;;
    *)
      log_error "Invalid agent type: $agent"
      log_info "Valid types: foreman, builder, governance-liaison, governance-repo-administrator, CodexAdvisor, assurance"
      return 1
      ;;
  esac
}

# Check if agent contract exists
check_agent_contract() {
  local agent="$1"
  local contract_path=".github/agents/${agent}.agent.md"
  
  log_verbose "Checking for agent contract at $contract_path"
  
  if [ ! -f "$contract_path" ]; then
    log_error "Agent contract not found: $contract_path"
    return 1
  fi
  
  log_success "Agent contract found: $contract_path"
  return 0
}

# Get mandatory artifacts for agent type (based on GOVERNANCE_AGENT_REQUIREMENTS_MATRIX.md)
get_mandatory_artifacts() {
  local agent="$1"
  
  # This is a simplified mapping - in production, this would parse the matrix file
  # or use a machine-readable config
  
  # Output one artifact per line
  # Constitutional & Supreme Authority (all agents)
  echo "GOVERNANCE_PURPOSE_AND_SCOPE.md:governance/canon"
  echo "BUILD_PHILOSOPHY.md:."
  
  # Execution & Validation (all agents)
  echo "EXECUTION_BOOTSTRAP_PROTOCOL.md:governance/canon"
  echo "CI_CONFIRMATORY_NOT_DIAGNOSTIC.md:governance/canon"
  echo "STOP_AND_FIX_DOCTRINE.md:governance/canon"
  echo "SCOPE_TO_DIFF_RULE.md:governance/canon"
  echo "MERGE_GATE_PHILOSOPHY.md:governance/canon"
  
  # Agent Contract & Self-Governance (all agents)
  echo "AGENT_CONTRACT_PROTECTION_PROTOCOL.md:governance/canon"
  echo "AGENT_SELF_GOVERNANCE_PROTOCOL.md:governance/canon"
  echo "CS2_AGENT_FILE_AUTHORITY_MODEL.md:governance/canon"
  echo "PRE_WORK_GOVERNANCE_SELF_TEST_PROTOCOL.md:governance/canon"
  
  # Handover & Evidence (all agents)
  echo "PREHANDOVER_PROOF_TEMPLATE.md:governance/templates"
  echo "MANDATORY_ENHANCEMENT_CAPTURE_STANDARD.md:governance/canon"
  echo "OPOJD_DOCTRINE.md:governance/opojd"
  
  # Failure Handling (all agents)
  echo "FAILURE_PROMOTION_RULE.md:governance/canon"
  echo "BOOTSTRAP_EXECUTION_LEARNINGS.md:governance/canon"
  
  # Gate Enforcement (all agents)
  echo "GOVERNANCE_GATE_CANON.md:."
  echo "BRANCH_PROTECTION_ENFORCEMENT.md:governance/canon"
  
  # Inventory & Gap Detection (all agents)
  echo "GOVERNANCE_AGENT_REQUIREMENTS_MATRIX.md:governance/canon"
  
  # Agent-specific additions
  case "$agent" in
    foreman)
      echo "FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md:governance/canon"
      echo "FM_BUILDER_APPOINTMENT_PROTOCOL.md:governance/canon"
      echo "FM_GOVERNANCE_LOADING_PROTOCOL.md:governance/canon"
      echo "AGENT_TEST_EXECUTION_PROTOCOL.md:governance/runbooks"
      ;;
    builder)
      echo "BUILDER_FIRST_PR_MERGE_MODEL.md:governance/canon"
      echo "BUILDER_CONTRACT_BINDING_CHECKLIST.md:governance/canon"
      echo "AGENT_TEST_EXECUTION_PROTOCOL.md:governance/runbooks"
      ;;
    governance-liaison|governance-repo-administrator)
      echo "GOVERNANCE_RIPPLE_MODEL.md:governance/canon"
      echo "GOVERNANCE_RIPPLE_CHECKLIST_PROTOCOL.md:governance/canon"
      echo "GOVERNANCE_LAYERDOWN_CONTRACT.md:governance/canon"
      echo "GOVERNANCE_INVENTORY_SCHEMA.json:governance/schemas"
      ;;
    CodexAdvisor)
      echo "GOVERNANCE_RIPPLE_MODEL.md:governance/canon"
      echo "GOVERNANCE_RIPPLE_CHECKLIST_PROTOCOL.md:governance/canon"
      ;;
    assurance)
      echo "GOVERNANCE_RIPPLE_MODEL.md:governance/canon"
      echo "GOVERNANCE_INVENTORY_SCHEMA.json:governance/schemas"
      ;;
  esac
}

# Check if governance file exists locally
check_governance_file() {
  local file_path="$1"
  
  if [ -f "$file_path" ]; then
    return 0
  else
    return 1
  fi
}

# Perform gap analysis
perform_gap_analysis() {
  local agent="$1"
  
  log_info "Performing gap analysis for agent: $agent"
  
  # Get mandatory artifacts for this agent type
  local mandatory_artifacts
  mandatory_artifacts=$(get_mandatory_artifacts "$agent")
  
  local missing_mandatory=()
  local missing_recommended=()
  
  # Check each mandatory artifact
  while IFS= read -r artifact_entry; do
    if [ -z "$artifact_entry" ]; then
      continue
    fi
    
    # Parse artifact entry (format: "FILENAME:path/to/dir")
    local filename="${artifact_entry%%:*}"
    local dir_path="${artifact_entry#*:}"
    local full_path="${dir_path}/${filename}"
    
    log_verbose "Checking: $full_path"
    
    if check_governance_file "$full_path"; then
      log_verbose "  Found: $full_path"
    else
      log_warning "  Missing mandatory: $full_path"
      missing_mandatory+=("$full_path")
      MANDATORY_GAPS=$((MANDATORY_GAPS + 1))
      
      # Check if critical
      case "$filename" in
        EXECUTION_BOOTSTRAP_PROTOCOL.md|STOP_AND_FIX_DOCTRINE.md|AGENT_CONTRACT_PROTECTION_PROTOCOL.md)
          log_error "  CRITICAL: $filename is critical mandatory governance"
          CRITICAL_GAPS=$((CRITICAL_GAPS + 1))
          ;;
      esac
    fi
  done <<< "$mandatory_artifacts"
  
  # Summary
  echo ""
  log_info "Gap Analysis Summary:"
  log_info "  Agent Type: $agent"
  log_info "  Mandatory Gaps: $MANDATORY_GAPS"
  log_info "  Recommended Gaps: $RECOMMENDED_GAPS"
  log_info "  Critical Gaps: $CRITICAL_GAPS"
  echo ""
  
  # Report missing files
  if [ ${#missing_mandatory[@]} -gt 0 ]; then
    log_warning "Missing Mandatory Governance Files:"
    for file in "${missing_mandatory[@]}"; do
      echo "  - $file"
    done
    echo ""
  fi
  
  return 0
}

# Main execution
main() {
  log_info "Governance Gap Analyzer v${SCRIPT_VERSION}"
  log_info "Timestamp: ${TIMESTAMP}"
  log_info "Mode: ${MODE}"
  log_info "Agent ID: ${AGENT_ID}"
  echo ""
  
  # Validate agent type
  if ! validate_agent_type "$AGENT_ID"; then
    exit 4
  fi
  
  # Check agent contract exists
  if ! check_agent_contract "$AGENT_ID"; then
    log_error "Cannot proceed without agent contract"
    exit 4
  fi
  
  # Execute mode-specific logic
  case "$MODE" in
    pre-work|audit)
      perform_gap_analysis "$AGENT_ID"
      ;;
    remediate)
      perform_gap_analysis "$AGENT_ID"
      if [ $MANDATORY_GAPS -gt 0 ]; then
        if [ "$AUTO_LAYER_DOWN" = true ]; then
          log_info "Auto-remediation requested but not yet implemented"
          log_info "In production, this would layer down missing governance files from canonical"
          log_warning "Agent contract gaps still require CS2 manual fix (bootstrap phase)"
        else
          log_info "Use --auto-layer-down to attempt automatic remediation"
        fi
      fi
      ;;
    *)
      log_error "Invalid mode: $MODE"
      exit 4
      ;;
  esac
  
  # Determine exit code
  if [ $CRITICAL_GAPS -gt 0 ]; then
    log_error "CRITICAL gaps detected - work cannot proceed"
    exit 3
  elif [ $MANDATORY_GAPS -gt 0 ]; then
    if [ "$STRICT_MODE" = true ]; then
      log_error "Mandatory gaps detected - failing in strict mode"
      exit 2
    else
      log_warning "Mandatory gaps detected - flagging for CS2 fix (bootstrap phase)"
      exit 2
    fi
  elif [ $RECOMMENDED_GAPS -gt 0 ]; then
    log_warning "Recommended gaps detected"
    exit 1
  else
    log_success "No gaps detected - all required governance present"
    exit 0
  fi
}

# Run main
main
