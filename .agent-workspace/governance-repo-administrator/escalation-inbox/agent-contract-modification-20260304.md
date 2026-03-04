# Escalation: Agent Contract Modification Required

## Type
AGENT_CONTRACT_MODIFICATION_REQUEST

## Files Requiring Modification
- `.github/agents/foreman-v2.agent.md`: Add Step 4.3b Token Update Ceremony to the Foreman handover phase, rewriting the IAA token update procedure to write to a dedicated token file instead of editing the PREHANDOVER proof post-commit. Update per-session append-only log references.

## Originating Ripple / Issue
CS2 authorized governance amendment:
**APGI-cmy/maturion-foreman-governance** — "[Governance Amendment] Artifact Immutability & Append-Only Proof Protocols — Canon & Agent Contract Updates"

CS2 Approval: @APGI-cmy (Johan Ras) — 2026-03-04

Ripple source: `governance/canon/AGENT_HANDOVER_AUTOMATION.md` v1.1.3 §4.3b Token Update Ceremony

## Proposed Diff Specification

### Change 1 — Add Step 4.3b after the existing §4.3 Pre-Handover Merge Gate Parity Check

After line:
```
**Commentary**: This check is **BLOCKING**. If any gate fails the agent **stops, fixes the issue, and re-runs from step 1**. Opening a PR on a local gate failure is PROHIBITED — same class as pushing directly to main.
```

Insert:

```markdown
### 4.3b Token Update Ceremony (FM_H — MANDATORY after IAA verdict)

**Reference**: `governance/canon/AGENT_HANDOVER_AUTOMATION.md` §4.3b | `governance/canon/INDEPENDENT_ASSURANCE_AGENT_CANON.md` §Token Ceremony

**Rule**: The PREHANDOVER proof is **read-only** after initial commit. The IAA token is written
to a dedicated file — NEVER into the committed PREHANDOVER proof.

**Protocol**:

1. After IAA issues its verdict, the IAA writes to:
   `.agent-admin/assurance/iaa-token-session-NNN-waveY-YYYYMMDD.md`
2. The Foreman commits this new token file as a **new file only** — no amendments to the PREHANDOVER proof.
3. The PREHANDOVER proof `iaa_audit_token` field already records the token reference ID (set at initial commit time).
4. If the IAA issues a REJECTION-PACKAGE: open STOP-AND-FIX, fix all gaps, re-initiate with a fresh PREHANDOVER proof.

**Per-session append-only rule**: All parking station suggestions, session logs, and incident notes
created during this wave are per-session or per-agent files (new file per session). No shared
mutable cross-agent log file is used on the same wave branch.
```

### Change 2 — FAIL-ONLY-ONCE registry (already done in Tier 2 knowledge)
The `.agent-workspace/foreman-v2/knowledge/FAIL-ONLY-ONCE.md` Tier 2 file has been updated with
rules A-19, A-20, A-21, B-12 by the governance-repo-administrator. The foreman agent contract
file's static FAIL-ONLY-ONCE reference does not need a version bump for this — the Tier 2 file
change is self-authoritative.

## Authority
Per AGENT_CONTRACT_FILE_PROTECTION_POLICY.md §1:
Only CodexAdvisor with CS2 permission may modify .github/agents/ files.
This escalation requests CS2 review and CodexAdvisor invocation.

CS2 has pre-authorized the change via the issue cited above (§Authority & Process Requirements:
"Foreman contract (4): Draft + PR via CodexAdvisor — CS2 + CodexAdvisor + IAA audit (AGCFPP-001)").

## Required Process
1. CodexAdvisor reviews proposed diff specification above
2. CodexAdvisor applies the changes to `.github/agents/foreman-v2.agent.md`
3. IAA audits before merge (AGCFPP-001 + SELF-MOD-FM-001)
4. CS2 signs off on the final PR

---
Created: 2026-03-04T07:09:46Z
Agent: governance-repo-administrator-v2
Originating session: CS2-authorized governance amendment (Artifact Immutability & Append-Only Proof Protocols)
