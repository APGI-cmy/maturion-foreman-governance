# REJECTION-PACKAGE — IAA Session IAA-20260330-PR1315-R4

```
REJECTION-PACKAGE
PR: #1315 (Post-CS2-merge re-invocation R4)
Date: 2026-03-30
IAA Session: IAA-20260330-PR1315-R4
Phases:
  Phase 1 (Preflight): PASS
  Phase 2 (Governance): PASS — CS2 authorized (Issue #1314, APGI-cmy); CANON_INVENTORY 192
                         canons all hashes non-null; independence confirmed; Wave Checklist
                         gate N/A (no .agent-admin/waves/ directory; carve-out consistent
                         with sessions 016–019)
  Phase 3 (Working): FAIL — A-026 (2 phantom files in SCOPE_DECLARATION.md not in diff) +
                     A-028 (grouping headers within FILES_CHANGED list — prohibited per A-028
                     "no groupings")
  Phase 4 (Handover): PASS — PREHANDOVER proof substantive and complete (immutable A-029);
                      gate parity PASS (OPOJD: PASS); correction addendum present; session
                      memory present; iaa_audit_token: PENDING (correct per A-025/A-029);
                      ripple assessment substantive; INV-405 satisfied
Agent Integrity: PASS — all 4 agent contract SHA256 hashes verified live (sha256sum) against
                 INTEGRITY_INDEX; exact match on all four; reference copies confirmed
Independence: CONFIRMED — CodexAdvisor-agent/copilot-swe-agent[bot] (class: overseer) vs
              independent-assurance-agent (class: assurance) — no conflict
Verdict: MERGE BLOCKED
```

---

## Context

This is the R4 (post-CS2-merge) re-invocation for PR #1315. CS2 (@APGI-cmy) merged
`main` into `copilot/apply-foreman-iaa-upgrades` on 2026-03-30 (commit 68ca515). Prior
sessions: R1 (IAA-20260321-PR1315 — REJECTION), R2 (IAA-20260321-PR1315-R2 — REJECTION),
R3 (timed out — no verdict issued). HALT-005 NOT triggered (only 2 prior rejection-packages;
R3 produced no verdict).

---

## What Is Verified (PASS)

All prior R1 and R2 rejection findings — except A-026/A-028 which are partially resolved —
have been addressed:

- ✅ F1 (R2): Correction Addendum present (`correction-addendum-session-018-R2-20260321.md`)
- ✅ F2 (R2): Session memory present (`session-011-20260321.md`; CORE-015 satisfied)
- ✅ F5 (R2): checklist-registry.md v1.1.0 — confirmed
- ✅ F6 (R2): Version history tables present in all 4 modified Tier 2 files — confirmed
- ✅ F7 (R2): session-memory-template.md iaa_audit_token uses `PHASE_A_ADVISORY-IAA-session-NNN-YYYYMMDD` format with A-006 prohibition note — confirmed
- ✅ Agent integrity: all 4 SHA256 hashes EXACT MATCH (CodexAdvisor `f928b2a...`, GA `ebeb821...`, Foreman `50cf9dd...` unchanged, IAA `0d414fd...` unchanged)
- ✅ Substantive changes: CodexAdvisor Step 3.2 cleanup correct; GA Phase 4.5 well-placed; IAA_PRE_BRIEF_PROTOCOL.md references correct
- ✅ PREHANDOVER proof: complete, substantive, immutable; `iaa_audit_token: PENDING` appropriate
- ✅ INV-405 (gate parity): PASS
- ✅ Cross-agent ripple: substantive and valid assessment

---

## Remediation Required

### R4-F1 — A-026 FAIL: Scope declaration over-declares 2 phantom files (BLOCKING)

**Rule**: FAIL-ONLY-ONCE A-026 — `SCOPE_DECLARATION.md` must exactly match
`git diff --name-only origin/main...HEAD`.

**Evidence**: `git diff origin/main...HEAD --name-only` → 25 files.
`governance/scope-declaration.md` FILES_CHANGED section → 27 file entries.
Two entries in scope declaration are NOT in the diff and do NOT exist anywhere
in the branch or on main:

1. `.agent-admin/assurance/rejection-package-1315-r3.md`
2. `.agent-workspace/independent-assurance-agent/memory/session-020-20260321.md`

Root cause: These were pre-declared in the scope declaration in anticipation of R3
artifacts (rejection package and session memory for the R3 invocation). R3 timed out
before those files were created. The scope declaration was never updated to remove them.

**Severity**: BLOCKING — A-026 "exactly match" is unambiguous.

**Remediation**: Delete these two lines from the FILES_CHANGED section of
`governance/scope-declaration.md`. After fix, scope will declare 25 files matching
the diff exactly.

---

### R4-F2 — A-028 FAIL: Grouping headers present in FILES_CHANGED section (BLOCKING)

**Rule**: FAIL-ONLY-ONCE A-028 — `SCOPE_DECLARATION.md` must use plain markdown list
format ONLY: "No tables, no groupings, no commentary, no headers per file."

**Evidence**: The FILES_CHANGED section contains two grouping sub-headers that are NOT
`- path/to/file` entries:

- `Primary deliverables (substantive governance changes):` (plain text grouping label)
- `Ceremony artifacts (assurance process artifacts):` (plain text grouping label)

These are prohibited groupings. The prior R2 finding F4 was resolved by converting from
a code-block to a plain list format, but the grouping header lines were not removed.
A-028 prohibits all groupings, not just code blocks.

**Severity**: BLOCKING — A-028 applies at every invocation.

**Remediation**: Remove the two grouping header lines and any blank separator lines
between file groups. The FILES_CHANGED section must be a continuous flat list of
`- path/to/file` entries (one per line, no labels, no blank-line separators between
groups). All other structural sections (## Metadata, ## Executive Summary, ## Scope
Boundaries, ## Constitutional Alignment, etc.) may remain as-is — A-028 targets the
file list format only.

---

## Combined Fix

Both R4-F1 and R4-F2 are in `governance/scope-declaration.md` only. Single targeted
commit required:

1. Remove lines: `- .agent-admin/assurance/rejection-package-1315-r3.md`
2. Remove lines: `- .agent-workspace/independent-assurance-agent/memory/session-020-20260321.md`
3. Remove line: `Primary deliverables (substantive governance changes):`
4. Remove line: `Ceremony artifacts (assurance process artifacts):`
5. Remove blank separator lines between the two former groups

No PREHANDOVER proof changes needed (immutable per A-029). No new correction addendum
required (fix is to scope declaration, not PREHANDOVER proof). After commit, re-invoke IAA.

---

## Advisory (Non-Blocking — For CS2 Scheduling)

`governance-repo-administrator-v2.agent.md` contains `secret: MATURION_BOT_TOKEN` at
line 33 (`execution_identity.secret` field). A-024 prohibits `secret:` in agent
contract files. This field was NOT introduced by this PR (pre-existing). This PR does
not modify that section. IAA's own contract contains `secret: "[REDACTED]"` as the
same pattern. Recommend CS2 schedule a targeted fix PR to rename to `secret_env_var:`
across all agent contracts containing this pattern.

---

## Re-Entry Instructions

**Re-entry Point**: Phase 3 — Step 3.4 — Working Phase Proof Review

The submitting agent (CodexAdvisor-agent / copilot-swe-agent[bot]) must:
1. Acknowledge receipt of this REJECTION-PACKAGE
2. Apply R4-F1 and R4-F2 fixes to `governance/scope-declaration.md` in a new commit
3. Verify `git diff origin/main...HEAD --name-only` matches scope declaration exactly
4. Verify no grouping headers remain in FILES_CHANGED section
5. Re-invoke IAA

**Routed To**: CodexAdvisor-agent (copilot-swe-agent[bot]) — acknowledgement required
before resubmission.

---

**IAA Session**: IAA-20260330-PR1315-R4  
**Authority**: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.3.0 | CS2 (Johan Ras / @APGI-cmy)  
**Created**: 2026-03-30
