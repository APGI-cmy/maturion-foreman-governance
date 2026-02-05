# Scope Declaration

**PR_ID**: copilot/implement-living-agent-system  
**DATE_UTC**: 2026-02-04  
**RESPONSIBILITY_DOMAIN**: Governance Canon + Agent Lifecycle  
**AGENT**: governance-repo-administrator

---

## FILES_CHANGED

### New Files Created
- `governance/canon/LIVING_AGENT_SYSTEM.md` - Canonical Living Agent System protocol
- `.github/scripts/wake-up-protocol.sh` - Executable wake-up protocol
- `.github/scripts/session-closure.sh` - Executable session closure protocol
- `.github/agents/legacy/README.md` - Legacy agent contracts documentation
- `.github/agents/legacy/governance-repo-administrator.agent.md` - Archived contract (v4.3.0)
- `.github/agents/legacy/CodexAdvisor-agent.md` - Archived contract (v4.2.0)
- `docs/LIVING_AGENT_SYSTEM_QUICKSTART.md` - Quick start guide for LAS
- `governance/ripple/LAS_CONSUMER_RIPPLE_PLAN.md` - Consumer repo ripple tracking
- `scope-declaration.md` - Scope declaration for this PR

### Files Modified
- `.gitignore` - Added `.agent-workspace/` exclusion
- `GOVERNANCE_ARTIFACT_INVENTORY.md` - Added LAS canon, scripts, updated agent contracts
- `.github/agents/governance-repo-administrator.agent.md` - Migrated to v5.0.0 minimal LAS format
- `.github/agents/CodexAdvisor-agent.md` - Migrated to v5.0.0 minimal LAS format

---

## SCOPE_JUSTIFICATION

**Primary Goal**: Implement Living Agent System to replace static agent contracts with dynamic, memory-enabled agent lifecycle.

**Changes Made**:
1. Created canonical LAS protocol defining agent lifecycle (wake-up, work, closure)
2. Implemented executable protocols for session start and end
3. Migrated agent contracts from static (600+ lines) to minimal (200-300 lines) with LAS references
4. Archived legacy contracts for historical reference
5. Updated governance inventory and created ripple plan
6. Created quick start guide for agent onboarding

**Scope Boundaries**:
- IN SCOPE: Governance canon, agent contracts, lifecycle scripts, documentation
- OUT OF SCOPE: Consumer repo ripple execution (tracked in ripple plan), agent workspace content (.gitignored)

---

## VALIDATION

All files in this PR fall within the declared scope of implementing the Living Agent System per Issue [TBD].

---

## AUTHORITY

- **Canon Authority**: LIVING_AGENT_SYSTEM.md
- **Protocol Authority**: GOVERNANCE_RIPPLE_MODEL.md
- **Agent**: governance-repo-administrator
- **Approval**: CS2 (Johan Ras/Maturion)
