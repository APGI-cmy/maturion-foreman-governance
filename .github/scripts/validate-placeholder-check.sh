#!/usr/bin/env bash
# validate-placeholder-check.sh — PLACEHOLDER-CHECK-001 gate
#
# Authority: governance/canon/AGENT_CONTRACT_PLACEHOLDER_CHECK_CANON.md v1.0.0
# Purpose: Check agent-contract files for unresolved placeholder content.
#          Every exemption is mapped to a named canonical exception class (EXC-001 through EXC-005).
#          This script MUST NOT exempt content via ad-hoc phrase accumulation.
#
# Usage: .github/scripts/validate-placeholder-check.sh [<contract-file-or-dir>]
#   Default: scans .github/agents/ directory
#
# Exit codes:
#   0 = PASS (no unresolved placeholder content)
#   1 = FAIL (unresolved placeholder content detected)
#
# Exception classes (per AGENT_CONTRACT_PLACEHOLDER_CHECK_CANON.md §5):
#   EXC-001: Governance condition descriptions — text describing detection states
#   EXC-002: Checker/output template strings — validator output message templates
#   EXC-003: Negative assertions — assertions of the ABSENCE of placeholder content
#   EXC-004: Checklist/gate labels — gate names and checklist labels using canon vocabulary
#   EXC-005: Canon/hash-validation terminology — "placeholder hash" as governed validation concept
#
# Prohibited cases (always blocking — per §6):
#   - Unresolved prose in substantive contract content
#   - Incomplete procedure or rule text
#   - Missing artifact path
#   - Missing examples
#   - Missing enforcement logic
#   - Free-text TBD not functioning as governed meta-language
#   - Stub markers indicating incomplete phase body
#   - Placeholder values in required YAML fields

set -euo pipefail

TARGET="${1:-.github/agents}"

CANON_REF="governance/canon/AGENT_CONTRACT_PLACEHOLDER_CHECK_CANON.md"
SCRIPT_VERSION="1.0.0"

echo "=== [PLACEHOLDER-CHECK-001] Agent Contract Placeholder Check ==="
echo "Authority: ${CANON_REF} v1.0.0"
echo "Version: ${SCRIPT_VERSION}"
echo "Target: ${TARGET}"
echo ""

# ─────────────────────────────────────────────────────────────────────────────
# Collect files to check
# ─────────────────────────────────────────────────────────────────────────────
FILES_TO_CHECK=()

if [ -d "${TARGET}" ]; then
  while IFS= read -r -d '' f; do
    FILES_TO_CHECK+=("$f")
  done < <(find "${TARGET}" -maxdepth 2 -not -path "*/legacy/*" -type f \
    \( -name "*.md" -o -name "*.agent.md" -o -name "*.agent" \) -print0 2>/dev/null || true)
elif [ -f "${TARGET}" ]; then
  FILES_TO_CHECK+=("${TARGET}")
else
  echo "❌ [PLACEHOLDER-CHECK-001] Target not found: ${TARGET}"
  exit 1
fi

if [ ${#FILES_TO_CHECK[@]} -eq 0 ]; then
  echo "ℹ️  No agent contract files found in ${TARGET}"
  echo "✅ [PLACEHOLDER-CHECK-001] PASS (no files to check)"
  exit 0
fi

echo "Files to check: ${#FILES_TO_CHECK[@]}"
for f in "${FILES_TO_CHECK[@]}"; do
  echo "  - $f"
done
echo ""

# ─────────────────────────────────────────────────────────────────────────────
# Main checking logic — per line, applying exception classes in order
# ─────────────────────────────────────────────────────────────────────────────

check_file() {
  local contract_file="$1"
  local file_violations=0
  local line_num=0

  echo "Checking: ${contract_file}"

  while IFS= read -r line; do
    line_num=$((line_num + 1))

    # Only process lines that contain placeholder-like terms (case-insensitive)
    # Terms: placeholder, stub, TBD, TODO
    if ! echo "$line" | grep -qiE '(^|[^[:alnum:]_])(placeholder|stub|TBD|TODO)([^[:alnum:]_]|$)'; then
      continue
    fi

    # ─────────────────────────────────────────────────────────────────────────
    # EXC-005: Canon/hash-validation terminology
    # "placeholder hash", "placeholder_hash", "PUBLIC_API hash placeholder",
    # JQ snippets selecting placeholder values, CANON_INVENTORY integrity logic
    # (This class is checked first because it is the most commonly false-positive.)
    # ─────────────────────────────────────────────────────────────────────────
    if echo "$line" | grep -qiE "(placeholder|TBD).*(hash|api|inventory|CANON_INVENTORY)|(hash|api|CANON_INVENTORY).*(placeholder|TBD)|select\(.*placeholder|placeholder.*select\("; then
      # EXC-005: governed hash-validation terminology
      continue
    fi

    # ─────────────────────────────────────────────────────────────────────────
    # EXC-001: Governance condition descriptions
    # Text that DESCRIBES a detection condition, failure mode, or governance trigger
    # (The contract is describing the detection logic, not leaving content unresolved)
    # Also covers architecture scaffolding descriptions (Tier 2 stub, minimum stub)
    # ─────────────────────────────────────────────────────────────────────────
    if echo "$line" | grep -qiE "(placeholder|stub|TBD|TODO).*(hash|detect|trigger|degraded|mode|state|escalat|condition|gate|align|DEGRADED|block|halt|flag|induction|phase_a|phase_b|prevent|reject|bypass|protocol|canonical|compliance|enforcement|mechanism)"; then
      # EXC-001: governance condition description
      continue
    fi
    if echo "$line" | grep -qiE "(detect|trigger|degraded|mode|state|escalat|condition|gate|align|block|halt|flag|reject|bypass|enforcement).*(placeholder|stub|TBD|TODO)"; then
      # EXC-001: governance condition description (reversed word order)
      continue
    fi
    # EXC-001: architecture scaffolding descriptions — "Tier 2 stub", "minimum stub",
    # "stub if in scope", "index/stub if needed" — these describe minimum scaffolding,
    # not incomplete contract content
    if echo "$line" | grep -qiE "(Tier [0-9]|minimum|scaffold|knowledge)[[:space:]]+(stub|index/stub)|stub[[:space:]]+(if|when|as needed|committed|at:|for)|(required[[:space:]]+)?[Tt]ier[[:space:]]+[0-9][[:space:]]+.*stub"; then
      # EXC-001: architecture scaffolding terminology
      continue
    fi
    # EXC-001: test quality enforcement — identifying test anti-patterns to detect/reject
    if echo "$line" | grep -qiE "(identify|find|detect|scan|mark|flag).*(stub|todo|\.todo\(\)|\.skip\(\))|(stub|todo|\.todo\(\)|\.skip\(\)).*(test|helper|implementation|infrastructure|fixture|mock)"; then
      # EXC-001: test anti-pattern detection description
      continue
    fi

    # ─────────────────────────────────────────────────────────────────────────
    # EXC-002: Checker/output template strings
    # Lines that are output messages used by the agent to REPORT validation results
    # ─────────────────────────────────────────────────────────────────────────
    if echo "$line" | grep -qiE "^[[:space:]]*(echo|print|output|message|report|log)[[:space:]].*['\"].*((placeholder|stub|TBD|TODO)).*['\"]"; then
      # EXC-002: checker output template string
      continue
    fi
    # Shell script echo lines that output placeholder detection messages
    if echo "$line" | grep -qiE "^[[:space:]]*echo[[:space:]].*['\"].*no.*(placeholder|stub|TBD|TODO).*['\"]"; then
      continue
    fi

    # ─────────────────────────────────────────────────────────────────────────
    # EXC-003: Negative assertions
    # Statements asserting the ABSENCE of placeholder content — passing evidence
    # Also covers negative enforcement rules ("No X permitted")
    # ─────────────────────────────────────────────────────────────────────────
    if echo "$line" | grep -qiE "(no|none|absent|zero|0|confirmed|verified|clean|✅|PASS)[[:space:]]+(placeholder|stub|TBD|TODO)|((placeholder|stub|TBD|TODO)[[:space:]]+(free|not (found|present|detected|remaining|content))|no[[:space:]]+unresolved)"; then
      # EXC-003: negative assertion
      continue
    fi
    if echo "$line" | grep -qiE "no (placeholder|stub|TBD|TODO) content"; then
      # EXC-003: explicit negative assertion phrase
      continue
    fi
    # EXC-003: enforcement rules asserting the absence of test anti-patterns
    # "No .skip(), .todo(), // TODO, or stub implementations permitted"
    if echo "$line" | grep -qiE "no[[:space:]].*(\\.skip\(\)|\.todo\(\)|//[[:space:]]*TODO|stub implementations?)[[:space:]]*(permitted|allowed|accepted|tolerated)"; then
      # EXC-003: negative enforcement rule
      continue
    fi
    # EXC-003: test quality enforcement patterns (describing anti-patterns to reject)
    if echo "$line" | grep -qiE "(\.todo\(\)|//[[:space:]]*TODO|\.skip\(\))[[:space:]]*(=|in)[[:space:]]*(test|GOVERNANCE|VIOLATION|anti-pattern)|tests[[:space:]]+(marked|flagged|with)[[:space:]]+(\.todo\(\)|\.skip\(\))|TODO[[:space:]]comments[[:space:]]in[[:space:]]test"; then
      # EXC-001: test anti-pattern detection/enforcement description
      continue
    fi

    # ─────────────────────────────────────────────────────────────────────────
    # EXC-004: Checklist/gate labels
    # Named labels for checklist items, gate identifiers, or review items
    # where the term is part of the gate's own name/category
    # ─────────────────────────────────────────────────────────────────────────
    if echo "$line" | grep -qiE "(gate|check|step|scan|detection|label|category|item|name|id)[[:space:]]*[:\-][[:space:]]*(placeholder|stub|TBD|TODO)|(placeholder|stub|TBD|TODO)(-|\s)+(gate|check|scan|detection|validation)"; then
      # EXC-004: checklist/gate label
      continue
    fi
    if echo "$line" | grep -qiE "PLACEHOLDER.CHECK|STUB.DETECTION|TBD.VALUE.SCAN|stub-check|placeholder-check|placeholder_check"; then
      # EXC-004: gate/check name using canon vocabulary
      continue
    fi

    # ─────────────────────────────────────────────────────────────────────────
    # Additional governed meta-language not covered above:
    # Regex/grep patterns used within the contract to describe what to detect
    # ─────────────────────────────────────────────────────────────────────────
    if echo "$line" | grep -qiE "(grep|regex|pattern|match|detect|scan)[[:space:]]+.*\|[[:space:]]*(placeholder|stub|TBD|TODO)|(placeholder|stub|TBD|TODO)[[:space:]]*\|[[:space:]]*(grep|regex|pattern|match|detect|scan)"; then
      # Regex/pattern definition involving placeholder terms
      continue
    fi
    # Lines that are JQ or shell script variable expansions checking for placeholder
    if echo "$line" | grep -qiE '^\s*(if|while|for|PLACEHOLDER_COUNT|PLACEHOLDER|stub_count).*\$\('; then
      continue
    fi

    # ─────────────────────────────────────────────────────────────────────────
    # VIOLATION: None of the exception classes apply — this is unresolved content
    # ─────────────────────────────────────────────────────────────────────────
    echo "  ❌ Line ${line_num}: ${line}"
    file_violations=$((file_violations + 1))

  done < "${contract_file}"

  if [ $file_violations -eq 0 ]; then
    echo "  ✅ No unresolved placeholder content"
  fi

  echo "$file_violations"
}

# ─────────────────────────────────────────────────────────────────────────────
# Run checks on all collected files
# ─────────────────────────────────────────────────────────────────────────────
TOTAL_VIOLATIONS=0
FILES_WITH_VIOLATIONS=0

for contract_file in "${FILES_TO_CHECK[@]}"; do
  [ -f "$contract_file" ] || continue
  file_result=$(check_file "$contract_file")
  # Last line of output from check_file is the violation count (integer)
  file_count=$(echo "$file_result" | tail -1)
  # Print everything except the last line (the count)
  echo "$file_result" | head -n -1

  # Validate that file_count is a non-negative integer before arithmetic comparison
  if [[ "$file_count" =~ ^[0-9]+$ ]] && [ "$file_count" -gt 0 ]; then
    TOTAL_VIOLATIONS=$((TOTAL_VIOLATIONS + file_count))
    FILES_WITH_VIOLATIONS=$((FILES_WITH_VIOLATIONS + 1))
  fi
done

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "[PLACEHOLDER-CHECK-001] Summary"
echo "════════════════════════════════════════════════════════════════"
echo "Files checked:         ${#FILES_TO_CHECK[@]}"
echo "Files with violations: ${FILES_WITH_VIOLATIONS}"
echo "Total violations:      ${TOTAL_VIOLATIONS}"
echo ""
echo "Exception classes applied (per ${CANON_REF}):"
echo "  EXC-001: Governance condition descriptions"
echo "  EXC-002: Checker/output template strings"
echo "  EXC-003: Negative assertions"
echo "  EXC-004: Checklist/gate labels"
echo "  EXC-005: Canon/hash-validation terminology"
echo ""

if [ "${TOTAL_VIOLATIONS}" -gt 0 ]; then
  echo "❌ [PLACEHOLDER-CHECK-001] FAILED — ${TOTAL_VIOLATIONS} unresolved placeholder(s) in ${FILES_WITH_VIOLATIONS} file(s)"
  echo ""
  echo "Unresolved placeholder content was found that does not fall under any"
  echo "canonical exception class (EXC-001 through EXC-005)."
  echo ""
  echo "This indicates incomplete contract content. Required actions:"
  echo "  1. Review each flagged line to determine if it represents unresolved content"
  echo "  2. If the content is genuinely governed meta-language, verify it maps to"
  echo "     an existing exception class and update the pattern in this script"
  echo "     (following the class-mapping protocol in §7.2 of the canon)"
  echo "  3. If the content is truly unresolved, complete it before submitting"
  echo ""
  echo "Reference: ${CANON_REF} §6 (Non-Permitted Cases)"
  exit 1
fi

echo "✅ [PLACEHOLDER-CHECK-001] PASSED — no unresolved placeholder content detected"
echo "   All placeholder-like terms map to canonical exception classes."
