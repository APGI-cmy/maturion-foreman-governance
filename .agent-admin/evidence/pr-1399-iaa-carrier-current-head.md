# PR 1399 Current-Head Carrier Evidence

**Issue:** #1399
**Wave:** 1399
**Producer:** CodexAdvisor-agent
**Base:** `41a7eeafa58317c76d33499ef2f2d0c438ca3072` (`origin/main`)

## Direct-Source Inventory

Before alignment, active standalone carrier instructions appeared in the IAA contract,
`INDEPENDENT_ASSURANCE_AGENT_CANON.md`, `IAA_PRE_BRIEF_PROTOCOL.md`, and the two direct carrier
clauses in `GOVERNANCE_WATCHDOG_CANON.md`. No IAA Tier 2 carrier instruction conflicted, so Tier 2
was unchanged.

After alignment, the direct-source search for `iaa-prebrief` returns no matches in the IAA
contract or the two IAA canons. The Watchdog still names its unchanged injector workflow but its
two artifact-carrier clauses use `.agent-admin/assurance/iaa-wave-record-<wave>-<date>.md`.

The required carrier is the same in every changed direct source: a wave record at
`.agent-admin/assurance/iaa-wave-record-<wave>-<date>.md` containing a non-empty `## PRE-BRIEF`.
Amendments append to that record; no standalone carrier is created.

## Current-Head Checks

- Contract YAML parsed successfully with `agent.contract_version: 2.1.0`.
- The contract and integrity reference copy have SHA-256
  `ed4b301bcdcafc015bd2e61be25920ed7e4eb64d516cadd537e29337bb710642`.
- Canon hashes are recorded in the gate-results artifact and match their current files.
- The scope declaration and manifest declare the same finite path set checked against the current
  head.
