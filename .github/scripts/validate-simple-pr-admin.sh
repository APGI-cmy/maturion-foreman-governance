#!/bin/bash
# validate-simple-pr-admin.sh
#
# Purpose: Validate the .admin/pr.json PR admin manifest
# Authority: governance/canon/MMM_SIMPLE_PR_ADMIN_MODEL.md
#            Issue #1519 — Simplify MMM governance
#
# Exit Codes:
#   0 = PASS — manifest is valid and all checks pass
#   1 = FAIL — one or more checks failed
#   2 = ERROR — usage error or missing dependency
#
# Usage:
#   ./validate-simple-pr-admin.sh [--manifest <path>] [--changed-files <file>] [--base-ref <ref>]
#
# Options:
#   --manifest <path>        Path to the PR admin manifest (default: .admin/pr.json)
#   --changed-files <file>   File containing newline-separated list of changed files.
#                            If omitted, changed files are derived from git diff.
#   --base-ref <ref>         Git base ref for diff (default: origin/main)
#   --skip-diff              Skip changed-files-in-scope validation (useful for template checks)
#
# Governance-control file patterns:
#   Files matching these patterns trigger requires_iaa/requires_ecap enforcement:
#     .github/workflows/
#     .github/scripts/
#     governance/canon/
#     governance/policies/
#     .agent.md files (agent contracts)

set -euo pipefail

# ── Color helpers ─────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

pass()  { echo -e "${GREEN}✅ $*${NC}"; }
fail()  { echo -e "${RED}❌ $*${NC}"; }
warn()  { echo -e "${YELLOW}⚠️  $*${NC}"; }
info()  { echo "   $*"; }

# ── Defaults ──────────────────────────────────────────────────────────────────
MANIFEST=".admin/pr.json"
CHANGED_FILES_INPUT=""
BASE_REF="origin/main"
SKIP_DIFF=false
FAILURES=0

# ── Argument parsing ──────────────────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
    case "$1" in
        --manifest)
            MANIFEST="$2"
            shift 2
            ;;
        --changed-files)
            CHANGED_FILES_INPUT="$2"
            shift 2
            ;;
        --base-ref)
            BASE_REF="$2"
            shift 2
            ;;
        --skip-diff)
            SKIP_DIFF=true
            shift
            ;;
        -h|--help)
            sed -n '/^# Usage:/,/^$/p' "$0"
            exit 0
            ;;
        *)
            echo "Unknown option: $1" >&2
            exit 2
            ;;
    esac
done

# ── Dependency check ──────────────────────────────────────────────────────────
if ! command -v jq &>/dev/null; then
    fail "jq is required but not installed"
    exit 2
fi

# ── Header ────────────────────────────────────────────────────────────────────
echo "======================================================="
echo "  PR Admin Manifest Validator"
echo "  Authority: governance/canon/MMM_SIMPLE_PR_ADMIN_MODEL.md"
echo "======================================================="
echo ""
echo "Manifest: ${MANIFEST}"
echo ""

# ── Check 1: Manifest exists ──────────────────────────────────────────────────
echo "--- Check 1: Manifest exists ---"
if [[ ! -f "${MANIFEST}" ]]; then
    fail "Manifest not found: ${MANIFEST}"
    info "Every governed MMM PR must have .admin/pr.json"
    info "Copy from .admin/pr.template.json and fill in the fields"
    echo ""
    exit 1
fi
pass "Manifest found: ${MANIFEST}"
echo ""

# ── Check 2: Valid JSON ───────────────────────────────────────────────────────
echo "--- Check 2: Valid JSON ---"
if ! jq empty "${MANIFEST}" 2>/dev/null; then
    fail "Manifest is not valid JSON: ${MANIFEST}"
    echo ""
    exit 1
fi
pass "Valid JSON"
echo ""

# ── Check 3: Required fields present ─────────────────────────────────────────
echo "--- Check 3: Required fields ---"
REQUIRED_FIELDS=("pr" "issue" "type" "owner" "scope" "risk" "requires_iaa" "requires_ecap" "evidence_required" "merge_authority")
MISSING_FIELDS=()

for field in "${REQUIRED_FIELDS[@]}"; do
    value=$(jq -r --arg f "$field" '.[$f]' "${MANIFEST}" 2>/dev/null)
    if [[ "$value" == "null" ]]; then
        MISSING_FIELDS+=("$field")
    fi
done

if [[ ${#MISSING_FIELDS[@]} -gt 0 ]]; then
    fail "Missing required fields:"
    for f in "${MISSING_FIELDS[@]}"; do
        info "  - $f"
    done
    FAILURES=$((FAILURES + 1))
else
    pass "All required fields present"
fi
echo ""

# ── If fields are missing, stop here since subsequent checks will be unreliable
if [[ $FAILURES -gt 0 ]]; then
    fail "Validation failed with ${FAILURES} error(s)"
    echo ""
    exit 1
fi

# ── Check 4: issue is a number ────────────────────────────────────────────────
echo "--- Check 4: issue is a number ---"
ISSUE=$(jq -r '.issue' "${MANIFEST}")
if ! [[ "$ISSUE" =~ ^[0-9]+$ ]]; then
    fail "issue must be a positive integer, got: ${ISSUE}"
    FAILURES=$((FAILURES + 1))
else
    pass "issue: ${ISSUE}"
fi
echo ""

# ── Check 5: pr is a number ───────────────────────────────────────────────────
echo "--- Check 5: pr is a number ---"
PR=$(jq -r '.pr' "${MANIFEST}")
if ! [[ "$PR" =~ ^[0-9]+$ ]]; then
    fail "pr must be a positive integer, got: ${PR}"
    FAILURES=$((FAILURES + 1))
else
    pass "pr: ${PR}"
fi
echo ""

# ── Check 6: scope is a non-empty array ───────────────────────────────────────
echo "--- Check 6: scope is a non-empty array ---"
SCOPE_COUNT=$(jq '.scope | length' "${MANIFEST}" 2>/dev/null || echo "0")
if [[ "$SCOPE_COUNT" -eq 0 ]]; then
    fail "scope must be a non-empty array of file paths"
    FAILURES=$((FAILURES + 1))
else
    pass "scope contains ${SCOPE_COUNT} file(s)"
fi
echo ""

# ── Check 7: type is accepted ─────────────────────────────────────────────────
echo "--- Check 7: type is accepted ---"
TYPE=$(jq -r '.type' "${MANIFEST}")
ACCEPTED_TYPES=("product-fix" "test-only" "deployment-change" "database-migration" "governance-change" "agent-contract-change")
TYPE_VALID=false
for t in "${ACCEPTED_TYPES[@]}"; do
    if [[ "$TYPE" == "$t" ]]; then
        TYPE_VALID=true
        break
    fi
done
if [[ "$TYPE_VALID" == "false" ]]; then
    fail "type '${TYPE}' is not accepted"
    info "Accepted values: ${ACCEPTED_TYPES[*]}"
    FAILURES=$((FAILURES + 1))
else
    pass "type: ${TYPE}"
fi
echo ""

# ── Check 8: risk is accepted ─────────────────────────────────────────────────
echo "--- Check 8: risk is accepted ---"
RISK=$(jq -r '.risk' "${MANIFEST}")
case "$RISK" in
    low|medium|high)
        pass "risk: ${RISK}"
        ;;
    *)
        fail "risk '${RISK}' is not accepted. Must be one of: low, medium, high"
        FAILURES=$((FAILURES + 1))
        ;;
esac
echo ""

# ── Check 9: merge_authority is CS2 ──────────────────────────────────────────
echo "--- Check 9: merge_authority ---"
MERGE_AUTHORITY=$(jq -r '.merge_authority' "${MANIFEST}")
if [[ "$MERGE_AUTHORITY" != "CS2" ]]; then
    fail "merge_authority must be 'CS2' for MMM governance/product recovery work, got: '${MERGE_AUTHORITY}'"
    FAILURES=$((FAILURES + 1))
else
    pass "merge_authority: CS2"
fi
echo ""

# ── Check 10: evidence_required is non-empty ─────────────────────────────────
echo "--- Check 10: evidence_required is non-empty ---"
EVIDENCE_COUNT=$(jq '.evidence_required | length' "${MANIFEST}" 2>/dev/null || echo "0")
if [[ "$EVIDENCE_COUNT" -eq 0 ]]; then
    fail "evidence_required must be a non-empty array"
    FAILURES=$((FAILURES + 1))
else
    pass "evidence_required contains ${EVIDENCE_COUNT} item(s)"
fi
echo ""

# ── Check 11: governance-control files require IAA and ECAP ──────────────────
# Governance-control file patterns — changes to these trigger IAA/ECAP enforcement
GOVERNANCE_CONTROL_PATTERNS=(
    "^\.github/workflows/"
    "^\.github/scripts/"
    "^governance/canon/"
    "^governance/policies/"
    "\.agent\.md$"
)

echo "--- Check 11: governance-control files require requires_iaa=true and requires_ecap=true ---"
REQUIRES_IAA=$(jq -r '.requires_iaa' "${MANIFEST}")
REQUIRES_ECAP=$(jq -r '.requires_ecap' "${MANIFEST}")

# Check scope entries against governance-control patterns
GOVERNANCE_CONTROL_FOUND=false
GOVERNANCE_CONTROL_FILE=""
while IFS= read -r scope_file; do
    for pattern in "${GOVERNANCE_CONTROL_PATTERNS[@]}"; do
        if [[ "$scope_file" =~ $pattern ]]; then
            GOVERNANCE_CONTROL_FOUND=true
            GOVERNANCE_CONTROL_FILE="$scope_file"
            break
        fi
    done
    [[ "$GOVERNANCE_CONTROL_FOUND" == "true" ]] && break
done < <(jq -r '.scope[]' "${MANIFEST}" 2>/dev/null || true)

if [[ "$GOVERNANCE_CONTROL_FOUND" == "true" ]]; then
    info "Governance-control file in scope: ${GOVERNANCE_CONTROL_FILE}"
    GOVERNANCE_FAIL=false
    if [[ "$REQUIRES_IAA" != "true" ]]; then
        fail "Governance-control file in scope but requires_iaa is not true"
        GOVERNANCE_FAIL=true
        FAILURES=$((FAILURES + 1))
    fi
    if [[ "$REQUIRES_ECAP" != "true" ]]; then
        fail "Governance-control file in scope but requires_ecap is not true"
        GOVERNANCE_FAIL=true
        FAILURES=$((FAILURES + 1))
    fi
    if [[ "$GOVERNANCE_FAIL" == "false" ]]; then
        pass "requires_iaa=true and requires_ecap=true (governance-control file in scope)"
    fi
else
    pass "No governance-control files in scope — requires_iaa/requires_ecap not enforced by this check"
    info "  requires_iaa: ${REQUIRES_IAA}, requires_ecap: ${REQUIRES_ECAP}"
fi
echo ""

# ── Check 12: changed files are within scope ─────────────────────────────────
if [[ "$SKIP_DIFF" == "true" ]]; then
    echo "--- Check 12: changed files within scope (SKIPPED — --skip-diff) ---"
    warn "Skipping changed-files-in-scope validation (--skip-diff flag)"
    echo ""
else
    echo "--- Check 12: changed files within scope ---"

    # Get changed files
    CHANGED_FILES=""
    if [[ -n "$CHANGED_FILES_INPUT" ]]; then
        if [[ ! -f "$CHANGED_FILES_INPUT" ]]; then
            fail "Changed files input file not found: ${CHANGED_FILES_INPUT}"
            FAILURES=$((FAILURES + 1))
        else
            CHANGED_FILES=$(cat "$CHANGED_FILES_INPUT")
        fi
    else
        # Derive from git diff
        if git rev-parse --git-dir &>/dev/null; then
            # Verify the base ref is reachable before diffing
            if ! git rev-parse "${BASE_REF}" &>/dev/null; then
                warn "Base ref '${BASE_REF}' not found — skipping changed-files-in-scope check"
                info "Fetch the base branch first, or pass --changed-files <file> or --skip-diff"
                CHANGED_FILES=""
            else
                CHANGED_FILES=$(git diff --name-only "${BASE_REF}...HEAD" 2>&1) || {
                    warn "git diff failed for base ref '${BASE_REF}' — skipping changed-files-in-scope check"
                    CHANGED_FILES=""
                }
                if [[ -z "$CHANGED_FILES" ]]; then
                    warn "No changed files found in git diff (base: ${BASE_REF})"
                    info "If this is expected, use --skip-diff"
                fi
            fi
        else
            warn "Not a git repository — skipping changed-files-in-scope check"
            CHANGED_FILES=""
        fi
    fi

    if [[ -n "$CHANGED_FILES" ]]; then
        # Get scope files from manifest
        SCOPE_FILES=$(jq -r '.scope[]' "${MANIFEST}" 2>/dev/null || true)

        OUT_OF_SCOPE=()
        while IFS= read -r changed_file; do
            [[ -z "$changed_file" ]] && continue
            IN_SCOPE=false
            while IFS= read -r scope_file; do
                [[ -z "$scope_file" ]] && continue
                if [[ "$changed_file" == "$scope_file" ]]; then
                    IN_SCOPE=true
                    break
                fi
            done <<< "$SCOPE_FILES"
            if [[ "$IN_SCOPE" == "false" ]]; then
                OUT_OF_SCOPE+=("$changed_file")
            fi
        done <<< "$CHANGED_FILES"

        if [[ ${#OUT_OF_SCOPE[@]} -gt 0 ]]; then
            fail "Changed files outside declared scope:"
            for f in "${OUT_OF_SCOPE[@]}"; do
                info "  - $f"
            done
            info ""
            info "Either add these files to .admin/pr.json scope[] or revert the changes"
            FAILURES=$((FAILURES + 1))
        else
            pass "All changed files are within declared scope"
        fi
    fi
    echo ""
fi

# ── Summary ───────────────────────────────────────────────────────────────────
echo "======================================================="
if [[ $FAILURES -eq 0 ]]; then
    pass "PR admin manifest validation PASSED"
    echo ""
    echo "Manifest: ${MANIFEST}"
    echo "PR type:  $(jq -r '.type' "${MANIFEST}")"
    echo "Risk:     $(jq -r '.risk' "${MANIFEST}")"
    echo "IAA:      $(jq -r '.requires_iaa' "${MANIFEST}")"
    echo "ECAP:     $(jq -r '.requires_ecap' "${MANIFEST}")"
    echo "Authority: CS2"
    echo "======================================================="
    exit 0
else
    fail "PR admin manifest validation FAILED with ${FAILURES} error(s)"
    echo ""
    echo "Reference: governance/canon/MMM_SIMPLE_PR_ADMIN_MODEL.md"
    echo "Template:  .admin/pr.template.json"
    echo "======================================================="
    exit 1
fi
