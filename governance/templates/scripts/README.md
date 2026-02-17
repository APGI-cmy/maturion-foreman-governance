# Governance Script Templates

This directory contains **reusable orchestration script templates** for the 4-phase agent contract architecture.

## Purpose

Enable agents to execute disciplined, tested, versioned automation during Build phase instead of ad-hoc manual changes.

## Templates

### Phase 1: Preflight Scripts
- `preflight-template.sh` - Preflight check pattern template
- `validate-agent-identity.sh` - Identity verification helper
- `check-governance-state.sh` - Governance state validation

### Phase 2: Induction Scripts
- `load-priority-context.sh` - Priority-based context loading
- `scan-memory.sh` - Memory scan automation
- `generate-working-contract.sh` - Working contract generation

### Phase 3: Build Scripts
- `build-orchestration-template.sh` - Generic build orchestration
- `foreman-red-qa-creation.sh` - Foreman Red QA creation
- `builder-implementation.sh` - Builder implementation workflow
- `admin-ripple-execution.sh` - Administrator ripple execution

### Phase 4: Handover Scripts
- `verify-compliance.sh` - Compliance verification
- `generate-prehandover-proof.sh` - PREHANDOVER_PROOF generation
- `capture-session-memory.sh` - Session memory capture
- `validate-safe-state.sh` - Safe state validation

## Usage

### 1. Copy Template
```bash
cp governance/templates/scripts/preflight-template.sh .github/scripts/preflight-foreman.sh
```

### 2. Customize for Agent
Edit script to add agent-specific logic:
```bash
# Agent-specific configuration
AGENT_TYPE="foreman"
AGENT_CLASS="supervisor"
```

### 3. Test Script
```bash
bash .github/scripts/preflight-foreman.sh
```

### 4. Integrate into Wake-Up/Handover
```bash
# In wake-up-protocol.sh
source .github/scripts/preflight-${AGENT_TYPE}.sh || exit 1
```

## Script Standards

All orchestration scripts MUST:
- ✅ Use bash with `set -euo pipefail`
- ✅ Include clear comments and section headers
- ✅ Have exit code 0 for success, non-zero for failure
- ✅ Log actions with timestamps
- ✅ Be idempotent (safe to run multiple times)
- ✅ Include dry-run mode (if applicable)
- ✅ Validate inputs before execution
- ✅ Create escalations on critical failures

## Testing

Scripts should have corresponding test files:
```
governance/templates/scripts/
├── preflight-template.sh
└── tests/
    └── test-preflight-template.sh
```

## Version Control

Scripts are versioned governance artifacts:
- Changes tracked in governance/CHANGELOG.md
- Breaking changes trigger governance ripple
- Version numbers in script headers

---

**Authority**: AGENT_CONTRACT_ARCHITECTURE.md v1.0.0  
**Canonical Home**: maturion-foreman-governance  
**Layer-Down**: PUBLIC_API
