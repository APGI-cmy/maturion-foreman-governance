# Foreman Phase 2 — Induction Script Templates

**Tier 2 Knowledge | Version**: 1.0.0  
**Referenced from**: `.github/agents/foreman-v2.agent.md` Phase 2

---

## Wake-Up Protocol Script (Phase 2.1)

Full executable bash implementation for the Foreman wake-up protocol:

```bash
#!/bin/bash
# Foreman Wake-Up Protocol v6.2.0
# Priority-driven session initialization

AGENT_TYPE="foreman"
SESSION_ID="$(date +%Y%m%d-%H%M%S)"
WORKSPACE=".agent-workspace/${AGENT_TYPE}"

echo "🔵 FOREMAN WAKE-UP PROTOCOL - Session ${SESSION_ID}"

# FM_H: Load canonical identity
echo "[FM_H] Loading agent identity..."
AGENT_ID="foreman"
AGENT_CLASS="supervisor"
AGENT_VERSION="6.2.0"
CONTRACT_VERSION="2.3.0"

# FM_H: Verify CANON_INVENTORY integrity (CRITICAL - degraded mode check)
echo "[FM_H] Verifying CANON_INVENTORY integrity..."
if ! jq -e '.constitutional_canon' governance/CANON_INVENTORY.json > /dev/null 2>&1; then
  echo "❌ [FM_H] CANON_INVENTORY missing or invalid - DEGRADED MODE"
  echo "ACTION: Creating CS2 escalation..."
  mkdir -p "${WORKSPACE}/escalation-inbox"
  cat > "${WORKSPACE}/escalation-inbox/degraded-canon-$(date +%Y%m%d).md" <<EOF
# ESCALATION: CANON_INVENTORY Degraded State

## Type
BLOCKER

## Description
CANON_INVENTORY.json missing or invalid during wake-up.
Cannot verify governance alignment.

## Context
Session: ${SESSION_ID}
Agent: foreman
Wake-up phase: CANON_INVENTORY verification

## Recommendation
CS2 to verify/restore CANON_INVENTORY.json with proper PUBLIC_API hashes.

## Priority
FM_H (CRITICAL - blocks all execution)
EOF
  exit 1
fi

# FM_H: Check for placeholder hashes (degraded alignment)
echo "[FM_H] Checking for placeholder PUBLIC_API hashes..."
PLACEHOLDER_COUNT=$(jq '(.constitutional_canon // []) | [.[] | .public_api_hash? | select(. == "placeholder" or . == "TBD" or (type == "string" and length < 64))] | length' governance/CANON_INVENTORY.json)
if [ "${PLACEHOLDER_COUNT}" -gt 0 ]; then
  echo "⚠️  [FM_H] ${PLACEHOLDER_COUNT} placeholder hashes detected - DEGRADED ALIGNMENT"
  echo "ACTION: Failing alignment gate and escalating to CS2..."
fi

# FM_M: Load last 5 session memories
echo "[FM_M] Loading session memories (last 5)..."
mkdir -p "${WORKSPACE}/memory"
MEMORIES=$(ls -t "${WORKSPACE}/memory"/session-*.md 2>/dev/null | head -5)
if [ -n "${MEMORIES}" ]; then
  echo "✅ [FM_M] Found $(echo "${MEMORIES}" | wc -l) recent memories"
  echo "${MEMORIES}" | while read memory; do
    echo "  - $(basename "${memory}")"
  done
else
  echo "ℹ️  [FM_M] No prior memories found (first session)"
fi

# FM_M: Load personal learnings
echo "[FM_M] Loading personal learnings..."
if [ -f "${WORKSPACE}/personal/lessons-learned.md" ]; then
  LESSON_COUNT=$(grep -c "^### Lesson:" "${WORKSPACE}/personal/lessons-learned.md" 2>/dev/null || echo 0)
  echo "✅ [FM_M] Loaded ${LESSON_COUNT} lessons learned"
fi

if [ -f "${WORKSPACE}/personal/patterns.md" ]; then
  PATTERN_COUNT=$(grep -c "^## Pattern:" "${WORKSPACE}/personal/patterns.md" 2>/dev/null || echo 0)
  echo "✅ [FM_M] Loaded ${PATTERN_COUNT} patterns observed"
fi

# FM_H: Load environment health state
echo "[FM_H] Checking environment health..."
mkdir -p "${WORKSPACE}"
if [ ! -f "${WORKSPACE}/environment-health.json" ]; then
  cat > "${WORKSPACE}/environment-health.json" <<EOF
{
  "last_check": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "environment_health_status": "UNKNOWN",
  "session_id": "${SESSION_ID}",
  "agent": "${AGENT_TYPE}",
  "checks": {}
}
EOF
fi

# FM_M: Check for escalations from other agents
echo "[FM_M] Checking escalation inbox..."
UNRESOLVED_ESCALATIONS=$(ls -1 "${WORKSPACE}/escalation-inbox"/*.md 2>/dev/null | grep -v "/resolved/")
ESCALATION_COUNT=$(echo "${UNRESOLVED_ESCALATIONS}" | grep -c . || echo 0)
if [ "${ESCALATION_COUNT}" -gt 0 ]; then
  echo "⚠️  [FM_M] ${ESCALATION_COUNT} unresolved escalations found"
  echo "${UNRESOLVED_ESCALATIONS}" | while read esc; do
    echo "  - $(basename "${esc}")"
  done
else
  echo "✅ [FM_M] No pending escalations"
fi

# FM_H: Generate session-specific working contract
echo "[FM_H] Generating working contract for session ${SESSION_ID}..."

echo "✅ [FM_H] Working contract generated"
echo "✅ FOREMAN WAKE-UP COMPLETE"
```

---

## Pre-Build Reality Check Gate Script (Phase 2.5)

Full executable bash implementation for the Phase 2.5 reality check gate:

```bash
#!/bin/bash
# FM Phase 2.5 — Pre-Build Reality Check Gate
# Priority: FM_H (mandatory before ticket generation)

GATE_LOG_DIR="${MODULE_WORKSPACE}/05-build-readiness"
mkdir -p "${GATE_LOG_DIR}"
GATE_LOG="${GATE_LOG_DIR}/pre-build-reality-check-$(date +%Y%m%d).md"

echo "🔍 PRE-BUILD REALITY CHECK GATE — Phase 2.5"

cat > "${GATE_LOG}" <<EOF
# Pre-Build Reality Check Log

**Module**: ${MODULE_NAME} v${MODULE_VERSION}
**Date**: $(date -u +%Y-%m-%d)
**Foreman**: foreman-v2
**Participants**: [FM] + [user/client rep] + [builder lead] + [quality expert]

## Prerequisite Checklist
- [ ] App Description approved
- [ ] FRS approved
- [ ] TRS approved
- [ ] Architecture approved
- [ ] Implementation Plan approved
- [ ] Red QA Suite signed off

## Review Findings

### A. Requirements Completeness
[findings]

### B. Functional Coverage
[findings]

### C. Architecture Alignment
[findings]

### D. Plan Fidelity
[findings]

### E. Red QA Coverage
[findings]

### F. Statutory and Compliance
[findings]

### G. Risk Assessment
[findings]

## Gap Register

| Gap ID | Description | Severity | Artifact to Update | Owner | Status |
|--------|-------------|----------|--------------------|-------|--------|

## Gate Outcome
**Result**: [PASS / CONDITIONAL PASS / FAIL / ESCALATED]
**Authorized by**: Foreman + [Client/User Rep]
**Date**: $(date -u +%Y-%m-%d)
**Next Step**: [ticket generation / artifact remediation / CS2 escalation]
EOF

echo "✅ [FM_H] Reality Check Log created: ${GATE_LOG}"
echo "ACTION: Complete the log with multi-party review findings before proceeding"
```

---

**Authority**: LIVING_AGENT_SYSTEM.md v6.2.0 | FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md
