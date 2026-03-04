# REJECTION-PACKAGE — PR #1294

```
REJECTION-PACKAGE
PR: #1294
Date: 2026-03-03
IAA Session: IAA-20260303-PR1294
Phases Verified:
  Phase 1 (Preflight): NOT ASSESSED — assurance halted at HALT-004
  Phase 2 (Governance): NOT ASSESSED — assurance halted at HALT-004
  Phase 3 (Working): NOT ASSESSED — assurance halted at HALT-004
  Phase 4 (Handover): NOT ASSESSED — assurance halted at HALT-004
Agent Integrity: NOT ASSESSED — assurance halted at HALT-004
  (Observation: CodexAdvisor-agent.md live hash mismatch detected —
   see CS2 NOTE section below)
Independence: VIOLATION — subject-matter based
  — PR #1294 modifies .github/agents/independent-assurance-agent.md (IAA's own contract file)
  — SELF-ASSURANCE-001: ACTIVE (BLOCKING) — self_assurance: PROHIBITED
  — IAA Canon §Independence Requirements Rule 4: ACTIVE (BLOCKING)
  — iaa_oversight.required: false in IAA contract YAML — CS2-only authority
  — IAA trigger table (AGENT_CONTRACT): "Assurance class: IAA cannot self-review — escalate to CS2"
  — Precedent: session-005-20260302 (HALT-004 for PR #1261 — same violation type)
Verdict: MERGE BLOCKED (HALT-004 / Structural Independence Prohibition)
```

---

## Remediation Required

**This is NOT a resubmission-loop rejection.** The IAA cannot provide an ASSURANCE-TOKEN
for this PR regardless of evidence artifact quality. The structural independence prohibition
is permanent and by-design.

**Required path**:
1. **CS2 (@APGI-cmy) must review PR #1294 directly** — as the sole assurance authority for
   modifications to the IAA's own contract file.
2. CS2 must verify:
   - All evidence artifacts are substantive and delivery-specific
   - The IAA contract amendments (Step 2.4 + Step 3.5) correctly implement the Pre-Brief protocol
   - The INTEGRITY_INDEX.md SHA256 values match the live files at merge time
   - The canon changes are consistent with governance requirements
3. CS2 approves the PR directly (the REJECTION-PACKAGE + CS2 merge authorization are
   complementary, as established in session-005 for PR #1261).

**Re-entry Point**: N/A — No submitting-agent resubmission path. CS2 direct review is
the only path to merge.

**Routed To**: CS2 (Johan Ras / @APGI-cmy) — direct review and merge authorization required.
No acknowledgement from governance-repo-administrator-v2 required for this path.

---

## CS2 NOTE — CodexAdvisor Hash Mismatch (Observed During Phase 1)

During SHA256 integrity verification in IAA Step 1.3 (Phase 1 preflight), a hash mismatch
was detected for CodexAdvisor-agent.md that CS2 should be aware of when reviewing:

| Agent File | Live Hash (on branch) | INTEGRITY_INDEX Baseline | Match |
|---|---|---|---|
| `.github/agents/CodexAdvisor-agent.md` | `4259292c8ef4feee22d47a21a04cfad5faf3a780f6241c32b591d0ded39e99fb` (802 lines) | `6dff0aa9b0d4f84a658c343b1e3317585d70f99046756a40389304a0c8590780` (792 lines in ref copy) | ❌ MISMATCH |
| `.github/agents/foreman-v2.agent.md` | `50cf9dd930d32db503112c1a0ea96d7d055d79675c6fef171ab97207f3a4c920` | `50cf9dd930d32db503112c1a0ea96d7d055d79675c6fef171ab97207f3a4c920` | ✅ |
| `.github/agents/governance-repo-administrator-v2.agent.md` | `80579a0ca49164a027ff99408d428c54105a6ba5b847f2514a261dc7189bac12` | `80579a0ca49164a027ff99408d428c54105a6ba5b847f2514a261dc7189bac12` | ✅ |
| `.github/agents/independent-assurance-agent.md` | `0d414fd2d059fbda8ed8a2bab42fc4698674d893d45ea954d92d0f940165b8ac` | `0d414fd2d059fbda8ed8a2bab42fc4698674d893d45ea954d92d0f940165b8ac` | ✅ |

**Assessment**: This appears to be a branch-state issue — the `copilot/create-iaa-pre-brief-protocol`
branch was created before PR #1289 (harmonize) was merged. The branch inherited an older
CodexAdvisor-agent.md (802 lines), but the INTEGRITY_INDEX was updated to reference the
PR #1289 baseline hash (792-line version). At merge time, git will resolve this via the
main-branch CodexAdvisor version (which should be the PR #1289 version). CS2 must verify
this at merge that the final merged CodexAdvisor hash matches `6dff0aa9...`.

The PREHANDOVER proof's self-reported agent integrity table incorrectly claimed a ✅ match
for CodexAdvisor. This is a secondary finding noted for CS2 awareness; it does not change
the primary HALT-004 verdict.

---

## Precedent Reference

This outcome follows the established precedent from:
- **session-005-20260302** — PR #1261 (GOV-IAA v2.0.0 upgrade) — same HALT-004 for same
  reason. CS2 reviewed and merged PR #1261 directly.
- Note from session-005: *"HALT-004 for IAA's own contract file is a permanently recurring
  scenario for every IAA contract upgrade. The outcome is always REJECTION-PACKAGE + CS2
  direct review. This is by design, not a failure mode."*

---

*IAA Session: IAA-20260303-PR1294*
*Authority: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.1.0 | LIVING_AGENT_SYSTEM.md v6.2.0*
*IAA Agent: independent-assurance-agent v6.2.0 | Contract v2.0.0*
