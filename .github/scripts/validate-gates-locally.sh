#!/bin/bash
# Local Gate Validator - Duplicates CI gate checks
# Run this before handover to guarantee gates will pass

set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$REPO_ROOT"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║          LOCAL GATE VALIDATION - PRE-HANDOVER CHECK         ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

GATE_FAILURES=0

# ============================================================================
# JOB 1: merge-gate/verdict
# ============================================================================
echo "=== Job 1: merge-gate/verdict ==="
echo ""

# Classify PR type (simulate)
echo "→ Classifying PR type..."
CHANGED_FILES=$(git diff --name-only origin/main...HEAD 2>/dev/null || git diff --name-only HEAD^ HEAD 2>/dev/null || echo "")

PR_TYPE="unknown"
if echo "$CHANGED_FILES" | grep -qE '^(governance/|\.agent$|\.agent-admin/)'; then
  PR_TYPE="governance"
  echo "  ✅ PR classified as: governance"
elif echo "$CHANGED_FILES" | grep -qvE '\.(md|txt|rst)$'; then
  PR_TYPE="code"
  echo "  ✅ PR classified as: code"
else
  PR_TYPE="docs"
  echo "  ✅ PR classified as: docs"
fi
echo ""

# Validate evidence artifacts
echo "→ Validating evidence artifacts..."
MISSING_ARTIFACTS=()

# 1. Check for prehandover proof
if [ ! -f ".agent-admin/prehandover/prehandover_proof.md" ]; then
  if ls .agent-admin/prehandover/prehandover_proof_*.md 1> /dev/null 2>&1; then
    echo "  ✅ Prehandover proof found (PR-specific)"
  else
    MISSING_ARTIFACTS+=("prehandover_proof")
    echo "  ❌ Missing: .agent-admin/prehandover/prehandover_proof*.md"
  fi
else
  echo "  ✅ Prehandover proof found"
fi

# 2. Check for gate results (if code changes)
if [ "$PR_TYPE" = "code" ]; then
  if [ ! -f ".agent-admin/gates/gate_results.json" ]; then
    if ls .agent-admin/gates/gate_results_*.json 1> /dev/null 2>&1; then
      echo "  ✅ Gate results found (PR-specific)"
    else
      MISSING_ARTIFACTS+=("gate_results")
      echo "  ❌ Missing: .agent-admin/gates/gate_results*.json"
    fi
  else
    echo "  ✅ Gate results found"
  fi
fi

# Report missing artifacts
if [ ${#MISSING_ARTIFACTS[@]} -gt 0 ]; then
  echo ""
  echo "  ❌ EVIDENCE VALIDATION FAILED"
  echo ""
  echo "  Missing required artifacts:"
  for artifact in "${MISSING_ARTIFACTS[@]}"; do
    echo "    - $artifact"
  done
  echo ""
  GATE_FAILURES=$((GATE_FAILURES + 1))
else
  echo ""
  echo "  ✅ All required evidence artifacts present"
fi

echo ""

# ============================================================================
# JOB 2: governance/alignment
# ============================================================================
echo "=== Job 2: governance/alignment ==="
echo ""

echo "→ Checking governance alignment..."
if [ -f ".agent-admin/governance/sync_state.json" ]; then
  echo "  ✅ Governance sync state found"
  
  # Validate it's valid JSON
  if ! jq empty .agent-admin/governance/sync_state.json 2>/dev/null; then
    echo "  ❌ sync_state.json is not valid JSON"
    GATE_FAILURES=$((GATE_FAILURES + 1))
  else
    # Check for required fields
    VERSION=$(jq -r '.governance_version // "missing"' .agent-admin/governance/sync_state.json)
    if [ "$VERSION" = "missing" ]; then
      echo "  ⚠️  Warning: governance_version not specified in sync_state.json"
    else
      echo "  ℹ️  Governance version: $VERSION"
    fi
    
    echo "  ✅ Governance alignment validated"
  fi
else
  echo "  ⚠️  No sync_state.json found - acceptable for governance-only PRs"
  echo "  ℹ️  Governance repos maintain alignment via CANON_INVENTORY.json"
fi

echo ""

# ============================================================================
# JOB 3: stop-and-fix/enforcement
# ============================================================================
echo "=== Job 3: stop-and-fix/enforcement ==="
echo ""

echo "→ Checking for stop-and-fix conditions..."

# Check for stop-and-fix markers in code (exclude documentation and governance)
# Match CI behavior: scan all files except docs, governance, .github, workspace
STOP_AND_FIX_FOUND=false
STOP_MATCHES=$(grep -r "STOP-AND-FIX" . \
     --exclude-dir=".agent-workspace" \
     --exclude-dir=".git" \
     --exclude-dir=".github" \
     --exclude-dir="docs" \
     --exclude-dir="governance" \
     --exclude="*.md" \
     2>/dev/null || echo "")

if [ -n "$STOP_MATCHES" ]; then
  echo "  ❌ STOP-AND-FIX condition detected in repository"
  echo ""
  echo "  Found unresolved STOP-AND-FIX markers:"
  echo "$STOP_MATCHES" | head -5
  echo ""
  GATE_FAILURES=$((GATE_FAILURES + 1))
  STOP_AND_FIX_FOUND=true
fi

# Check for execution halt files (excluding README.md and .archive)
if [ -d "execution-halt" ]; then
  HALT_FILES=$(find execution-halt -maxdepth 1 -type f ! -name "README.md" ! -name ".gitkeep" 2>/dev/null)
  if [ -n "$HALT_FILES" ]; then
    echo "  ❌ Execution halt files detected"
    echo ""
    echo "  Active halt files:"
    echo "$HALT_FILES" | while read f; do echo "    - $f"; done
    echo ""
    echo "  Required action: Resolve halt condition and archive files to .archive/"
    GATE_FAILURES=$((GATE_FAILURES + 1))
  else
    if [ "$STOP_AND_FIX_FOUND" = false ]; then
      echo "  ✅ No stop-and-fix conditions detected"
    fi
  fi
else
  if [ "$STOP_AND_FIX_FOUND" = false ]; then
    echo "  ✅ No stop-and-fix conditions detected"
  fi
fi

echo ""

# ============================================================================
# FINAL VERDICT
# ============================================================================
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                    FINAL GATE PREDICTION                     ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

if [ $GATE_FAILURES -eq 0 ]; then
  echo "✅ merge-gate/verdict: WILL PASS"
  echo "✅ governance/alignment: WILL PASS"
  echo "✅ stop-and-fix/enforcement: WILL PASS"
  echo ""
  echo "╔══════════════════════════════════════════════════════════════╗"
  echo "║   🎉 ALL GATES VALIDATED - SAFE TO PUSH                     ║"
  echo "╚══════════════════════════════════════════════════════════════╝"
  exit 0
else
  echo "❌ $GATE_FAILURES gate(s) will FAIL"
  echo ""
  echo "╔══════════════════════════════════════════════════════════════╗"
  echo "║   ⚠️  DO NOT PUSH - FIX FAILURES FIRST                      ║"
  echo "╚══════════════════════════════════════════════════════════════╝"
  echo ""
  echo "Required action:"
  echo "1. Review failures above"
  echo "2. Fix all issues"
  echo "3. Run this script again"
  echo "4. Only push when ALL gates pass"
  exit 1
fi
