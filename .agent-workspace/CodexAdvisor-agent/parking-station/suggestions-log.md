# CodexAdvisor Parking Station — Suggestions Log

**Authority**: CS2  
**Maintained by**: CodexAdvisor-agent  
**Purpose**: Out-of-scope improvement suggestions recorded during sessions. Not blocking. Requires CS2 prioritization before action.
**Convention**: Per-agent parking station — see `governance/canon/PARKING_STATION_PATH_STANDARD.md`.

---

## Historical Table Entries (migrated from `.agent-workspace/parking-station/suggestions-log-codex-advisor.md`)

| Date | Agent | Session | Phase | Suggestion | Evidence |
|------|-------|---------|-------|------------|----------|
| 2026-02-27 | CodexAdvisor-agent | session-007 | SESSION-END | IAA-INTEGRITY-INDEX-GAP: governance/quality/agent-integrity/INTEGRITY_INDEX.md does not include an entry for independent-assurance-agent.md. Once this PR is merged and CS2 approves, CS2 should add the baseline SHA256 hash for independent-assurance-agent.md to INTEGRITY_INDEX.md and commit a reference copy to governance/quality/agent-integrity/. | session-007-20260227.md |
| 2026-03-03 | CodexAdvisor-agent | session-008 | DRAFT-PHASE | JOB-ENV-TEMPLATE-GAP: The job_environment (can_invoke/cannot_invoke) pattern propagated in this session should be added to agent-creation-template.md as a mandatory capability sub-block. Future agent contracts will omit it if it is not in the template. | session-008-20260303.md |
| 2026-03-03 | CodexAdvisor-agent | session-009 | SESSION-END | PHASE4-ENFORCEMENT: Phase 4 execution is currently optional in practice — agents may skip it by going directly to report_progress. CodexAdvisor contract Step 3.7 (bundle assembly) should add explicit reminder: "If IAA_REQUIRED: YES, do NOT call report_progress until IAA invocation result is visible." This is a contract body improvement suggestion for CS2's consideration; does not require self-mod. | rca-session-008-20260303.md |
| 2026-03-03 | CodexAdvisor-agent | session-009 | SESSION-END | FAIL-ONLY-ONCE-B06: B-06 rule added to FAIL-ONLY-ONCE registry as learning loop output from BREACH-001 RCA. Rule codifies that IAA invocation is mandatory before final handover commit on any PR touching .github/agents/ or governance/quality/agent-integrity/. | rca-session-008-20260303.md |

---

## Session 012 — 2026-04-09

### Suggestion: governance-repo-administrator-v2 contract hardening follow-up

**Session**: session-012-20260409  
**Triggering Issue**: [Governance] CodexAdvisor review and repair of foreman-v2-agent contract  
**Status**: OUT OF SCOPE (this session) — follow-up issue recommended  
**Priority**: MEDIUM  

#### Observed Weaknesses

While reviewing and repairing the `foreman-v2.agent.md` contract, the following weaknesses were observed in `governance-repo-administrator-v2.agent.md` that merit a dedicated follow-up repair:

1. **Legacy `secret:` field** — Uses `secret: MATURION_BOT_TOKEN` instead of the strengthened `secret_env_var: MATURION_BOT_TOKEN`. Should be updated to match the current canonical pattern used in CodexAdvisor and the repaired Foreman contract.

2. **Nested `can_invoke`/`cannot_invoke`/`own_contract`** — These are currently nested under `capabilities.job_environment` instead of being top-level YAML sections as required by the strengthened pattern (CodexAdvisor contract v4.0.2, Foreman contract v3.0.0). This should be refactored to top-level sections.

3. **Thin Tier 2 requirement declaration** — The `tier2_knowledge.required_files` list is minimal. Given the GA agent's scope (ripple enforcement, canon inventory integrity, gate stewardship), Tier 2 should include at minimum: FAIL-ONLY-ONCE.md, ripple-execution-guide.md, and session-memory-template.md.

4. **Older body composition style** — The contract body composition style predates the strengthened four-phase pattern. Some phase directives lack `> Output:` blockquotes and explicit `⛔` advance-block guards (S2-05). A review and alignment to current composition style is recommended.

5. **Missing `iaa_oversight.artifact_immutability`** — Like the pre-repair Foreman contract, GA does not have the `artifact_immutability` block specifying token ceremony and PREHANDOVER immutability. Should be added.

#### Recommended Action

Create a follow-up GitHub issue titled:  
`[Governance] CodexAdvisor review and repair of governance-repo-administrator-v2 contract — align with strengthened pattern`

Scope: Same as foreman repair:
- Review against strengthened pattern
- Fix YAML structural issues (secret_env_var, top-level sections)
- Add artifact_immutability
- Update Tier 2 stub
- Full QP scorecard + IAA ceremony

#### Not in Scope for Session 012

Per the triggering issue scope boundary: CodexAdvisor was explicitly authorized for foreman-v2 repair only. GA observations are D4 "related-contract weakness note" only.

---

*Recorded by CodexAdvisor-agent | session-012-20260409 | CS2 authorization required before action*
