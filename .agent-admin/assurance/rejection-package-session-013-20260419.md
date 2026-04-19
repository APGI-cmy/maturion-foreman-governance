# REJECTION-PACKAGE

**PR**: branch `copilot/fix-foreman-v2-agent-metadata-config` — Fix foreman-v2 agent metadata config exceeding 10 entries  
**Date**: 2026-04-19  
**IAA Session**: IAA-20260419-session-013  
**Session Memory**: `.agent-workspace/independent-assurance-agent/memory/session-034-20260419.md`  
**Agent Integrity**: PASS — SHA256 `4fd1df10bbff116f456354556f159fe032a0c4829c13188c701a218d62c16b8c` matches INTEGRITY_INDEX; reference copy identical to main copy; no drift.  
**Independence**: CONFIRMED — CodexAdvisor domain (overseer class) vs independent-assurance-agent (assurance class).

---

## Phase Verdicts

| Phase | Result | Summary |
|-------|--------|---------|
| Phase 1 (Preflight) | **PASS** | Session memory preflight section complete; CS2 authorization confirmed; prior sessions reviewed; no open blockers; no open escalations. |
| Phase 2 (Governance) | **PASS** | QP 11/11 PASS; OPOJD PASS; INTEGRITY_INDEX SHA256 exact match (independently verified); reference copy identical to main copy. |
| Phase 3 (Working) | **FAIL** | `agent.contract_version` in YAML frontmatter not updated (still 3.0.0); PREHANDOVER contains false claim of 3.0.0→3.0.1 bump. |
| Phase 4 (Handover) | **FAIL** | OVL-AC-011 before-state character count absent; OVL-AC-012/A-023 ripple assessment section absent; A-026 SCOPE_DECLARATION.md stale from prior PR. |

---

## Verdict

**MERGE BLOCKED**

---

## Remediation Required

### Finding 1 — `agent.contract_version` Frontmatter Not Updated (Phase 3 / CORE-007)

**Severity**: Substantive  
**File**: `.github/agents/foreman-v2.agent.md` (and reference copy)  
**Location**: Line 10 (YAML frontmatter `agent:` block)  
**Current state**: `agent.contract_version: 3.0.0`  
**Required state**: `agent.contract_version: 3.0.1`  
**Evidence of gap**: The PREHANDOVER proof explicitly claims "contract_version bumped from 3.0.0 → 3.0.1" but only `metadata.contract_version` (line 230) was updated. The `agent.contract_version` field (line 10 of the YAML frontmatter) is the machine-readable canonical version used by governance tooling. It still reads 3.0.0. The INTEGRITY_INDEX note says "v3.0.1" which is inconsistent with the frontmatter.  
**Fix**: Update `agent.contract_version: 3.0.0` → `agent.contract_version: 3.0.1` in the YAML frontmatter block of `.github/agents/foreman-v2.agent.md` AND the reference copy at `governance/quality/agent-integrity/foreman-v2.agent.md`. After this fix, re-compute SHA256 and update `governance/quality/agent-integrity/INTEGRITY_INDEX.md` accordingly.

---

### Finding 2 — OVL-AC-011: Before-State Character Count Absent (Phase 4 / OVL-AC-011)

**Severity**: Process gap  
**File**: `.agent-workspace/CodexAdvisor-agent/memory/PREHANDOVER-session-013-20260419.md`  
**Current state**: PREHANDOVER states "28,595 chars" (after-state only) in S3 gate.  
**Required state**: Before AND after character counts must be stated.  
**Computed values** (IAA-verified from git):
  - Before (v3.0.0 on main): **28,959 chars**  
  - After (current branch): **28,595 chars**  
  - Delta: **−364 chars**  
**Fix**: Per §4.3b immutability (A-029), the PREHANDOVER proof is read-only post-commit. Use the A-030 Correction Addendum path. Create a Correction Addendum at `.agent-admin/assurance/correction-addendum-session-013-wave1-20260419.md` that documents the before/after drift evidence. Alternatively, if the PREHANDOVER has not yet been committed (rebase scenario), update the PREHANDOVER directly before re-commit.

---

### Finding 3 — OVL-AC-012 / A-023: Ripple Assessment Section Absent (Phase 4 / OVL-AC-012 / A-023)

**Severity**: Standing requirement — mandatory for all AGENT_CONTRACT PRs  
**File**: `.agent-workspace/CodexAdvisor-agent/memory/PREHANDOVER-session-013-20260419.md`  
**Current state**: No OVL-AC-012 section present. No "No ripple required" statement.  
**Required content** (expected answer for this PR):
```
## OVL-AC-012 — Ripple/Cross-Agent Assessment

The change is metadata-block-only: 5 redundant canon-reference keys removed from the `metadata` 
block. No phase body, contract logic, governance references, or Tier 2 knowledge references were 
modified. The metadata block is not consumed by any downstream agent or governance tooling. 
**No ripple required.** No other agent depends on foreman-v2's metadata block entries.
```
**Fix**: Per A-030 Correction Addendum path, add the OVL-AC-012 section in a Correction Addendum artifact.

---

### Finding 4 — A-026: SCOPE_DECLARATION.md Stale from Prior PR (Phase 4 / A-026)

**Severity**: Process gap  
**File**: `SCOPE_DECLARATION.md`  
**Current state**: SCOPE_DECLARATION.md contains content from `copilot/orchestrate-downstream-closure` (governance-repo-administrator-v2 session). Does not match `git diff --name-only origin/main...HEAD` for this branch.  
**Required state**: SCOPE_DECLARATION.md must list the 6 files in the current diff:
```
- .agent-workspace/CodexAdvisor-agent/memory/PREHANDOVER-session-013-20260419.md
- .agent-workspace/CodexAdvisor-agent/memory/session-013-20260419.md
- .agent-workspace/CodexAdvisor-agent/parking-station/suggestions-log.md
- .github/agents/foreman-v2.agent.md
- governance/quality/agent-integrity/INTEGRITY_INDEX.md
- governance/quality/agent-integrity/foreman-v2.agent.md
- SCOPE_DECLARATION.md
```
**Fix**: Update `SCOPE_DECLARATION.md` to reflect the current branch diff before re-invoking IAA. SCOPE_DECLARATION.md itself will then also appear in the diff.

---

## Re-Entry Instructions

**Re-entry point**: Phase 3 — Step 3.4 — Working Phase Proof review  
**Producing agent**: Copilot Coding Agent (CodexAdvisor domain)  
**Required acknowledgement**: Yes — before resubmission, acknowledge receipt of this REJECTION-PACKAGE and confirm all 4 findings have been addressed.

**Summary of corrections required before re-invocation**:
1. Update `agent.contract_version` frontmatter to `3.0.1` in both contract files
2. Re-compute SHA256 and update INTEGRITY_INDEX  
3. Provide before/after drift evidence (28,959 → 28,595 chars, −364) via Correction Addendum or updated PREHANDOVER
4. Add OVL-AC-012 ripple assessment ("No ripple required" with brief justification) via Correction Addendum
5. Update SCOPE_DECLARATION.md to match current diff
6. Re-invoke IAA

**Note on positive findings**: The core substantive work is correct. The metadata reduction (11→6 entries) is properly implemented; SHA256 integrity is verified; reference copy is in sync; CS2 authorization is documented; QP 11/11 PASS; OPOJD PASS. All four findings are addressable in a single re-commit cycle.

---

*Independent Assurance Agent v6.2.0 | Contract v2.0.0 | Session IAA-20260419-session-013 | 2026-04-19*  
*Authority: CS2 (Johan Ras / @APGI-cmy)*
