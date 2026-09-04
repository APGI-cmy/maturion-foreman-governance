# Pre-IAA Administrative Re-entry Proof - Issue #1394

## Re-entry Trigger

Independent IAA session `IAA-20260904-PR1395` reviewed committed PR #1395 at
`9f97cfeede5778bdac3b4195018ad6aa990ca45c` and returned a
REJECTION-PACKAGE. This record addresses only its four listed findings.

## Remediation

- `CORE-022 / A-024`: uses `secret_env_var: MATURION_BOT_TOKEN`.
- `OVL-AC-001`: declares AGCFPP-001 with its name and canonical path under
  `governance.policy_refs`.
- `CORE-008 / CORE-012 / OVL-AC-004`: makes
  `SELF-MOD-ECAP-001` enforcement `CONSTITUTIONAL`.
- Administrative commit-state evidence now identifies the rejected audit head
  above. The new current head is intentionally resolved only from visible Git
  state immediately before the re-entry audit, avoiding a stale embedded hash.

## Re-entry Checks

- YAML, required contract fields, and constitutional prohibition: PASS
- Tier 2 load set, integrity mirror, and integrity-index SHA-256: PASS
- Contract character count: `10,678 / 30,000`
- Placeholder, canonical hash, bootstrap test, manifest schema, and
  scope-to-diff checks: rerun after this re-entry bundle is committed

## IAA Boundary

This is a pre-IAA re-entry record, not an IAA result. CodexAdvisor creates no
token or rejection package. A fresh independent IAA review follows only after
the re-entry bundle is committed, its head is visible, and the working tree is
clean. No substantive judgment or merge action is made by this record.
