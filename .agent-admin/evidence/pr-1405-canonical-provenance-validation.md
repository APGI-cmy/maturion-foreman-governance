# Canonical Provenance and Validation Evidence — Issue #1405

**Base**: `ad9761c43efe2026e8a12849754a7d9fd260dfdd` (`origin/main`)  
**Reviewed implementation head**: `3a86a1cece23f49f3458dcda7811b072bfcab011`  
**Scope**: Only three `canonical_commit` fields in `governance/CANON_INVENTORY.json`

## Reproducible Provenance Method

For every repaired record, run these commands from the repository root:

```bash
git log --format='%H %ad %s' --date=short -- governance/canon/<file>
git cat-file -e ad9761c43efe2026e8a12849754a7d9fd260dfdd^{commit}
git diff-tree --no-commit-id --name-only -r ad9761c43efe2026e8a12849754a7d9fd260dfdd -- governance/canon/<file>
git rev-parse ad9761c43efe2026e8a12849754a7d9fd260dfdd:governance/canon/<file>
git rev-parse HEAD:governance/canon/<file>
```

`ad9761c43efe2026e8a12849754a7d9fd260dfdd` is selected because it is the first canonical-main path-history entry producing the declared current bytes, and `git diff-tree` confirms that it directly changes each path. It is not selected merely as a common or merge commit.

## GOVERNANCE_WATCHDOG_CANON.md

```text
git log --format='%H %ad %s' --date=short -- governance/canon/GOVERNANCE_WATCHDOG_CANON.md
ad9761c43efe2026e8a12849754a7d9fd260dfdd 2026-09-04 fix(iaa): align canonical pre-brief carrier to wave record
f827dc0c088ddfc8929e281ea8b121e67b23dfd8 2026-03-21 Address PR review comments: fix REQ-GWC-102/801/802, add missing metric row, add traceable references, update SHA256
40cd59176171b8bf3d65c7fef22844f47d1ab672 2026-03-04 Promote GOVERNANCE_WATCHDOG_DEPLOYMENT_STRATEGY to canon (GWDS-CANONISATION-2026-03-04)

git cat-file -e ad9761c43efe2026e8a12849754a7d9fd260dfdd^{commit}
exit 0
git diff-tree --no-commit-id --name-only -r ad9761c43efe2026e8a12849754a7d9fd260dfdd -- governance/canon/GOVERNANCE_WATCHDOG_CANON.md
governance/canon/GOVERNANCE_WATCHDOG_CANON.md
candidate blob: 09c14a2b4653a234118131207d3011c6d7ad3013
HEAD blob:      09c14a2b4653a234118131207d3011c6d7ad3013
declared SHA256: fdb3e83bb6e6e44b264e2af480e1dea478f05fb3172c71707612ecffff6b15a6
current SHA256:  fdb3e83bb6e6e44b264e2af480e1dea478f05fb3172c71707612ecffff6b15a6
version: 1.0.2
```

## IAA_PRE_BRIEF_PROTOCOL.md

```text
git log --format='%H %ad %s' --date=short -- governance/canon/IAA_PRE_BRIEF_PROTOCOL.md
ad9761c43efe2026e8a12849754a7d9fd260dfdd 2026-09-04 fix(iaa): align canonical pre-brief carrier to wave record
7b7a967c4de9f31b8db9e93407cb1f468cd3847b 2026-04-08 feat(governance): canonise Foreman-owned IAA re-invocation responsibility (v1.5.0/v1.3.0/v1.2.2/v2.4.0)
3db0610a6c40bbac4cfffa4a143b48f0b062bb27 2026-04-08 feat: create EXECUTION_CEREMONY_ADMINISTRATION_PROTOCOL canon (ECAP-001) and ripple to related canon
4cea2e3b1c2cbfd956c10e085be2c7a7ead74636 2026-04-05 feat: canonise pre-build stage model, amend IAA protocol v1.2.0, promote OVF-002 fail-once rule, update GA contract via CodexAdvisor
f3ae25c7ba16fc6e906c9b7f17244ac55258ba2c 2026-03-03 feat: add IAA Pre-Brief Protocol canon with wave checklist management and IAA invocation gate
f4f2b2fa9e98fdfb8aebccfa8eaecb344adf9f0f 2026-03-03 plan: add wave checklist requirements to IAA Pre-Brief Protocol scope

git cat-file -e ad9761c43efe2026e8a12849754a7d9fd260dfdd^{commit}
exit 0
git diff-tree --no-commit-id --name-only -r ad9761c43efe2026e8a12849754a7d9fd260dfdd -- governance/canon/IAA_PRE_BRIEF_PROTOCOL.md
governance/canon/IAA_PRE_BRIEF_PROTOCOL.md
candidate blob: d69ab7aae8919556f16f4ca8d6a483165453f29a
HEAD blob:      d69ab7aae8919556f16f4ca8d6a483165453f29a
declared SHA256: ea6ae4ed1cc28933ef90dea21a16e936af67844018492723b9e0915e2ca4b36f
current SHA256:  ea6ae4ed1cc28933ef90dea21a16e936af67844018492723b9e0915e2ca4b36f
version: 1.3.0 | **Authority**: CS2
```

## INDEPENDENT_ASSURANCE_AGENT_CANON.md

```text
git log --format='%H %ad %s' --date=short -- governance/canon/INDEPENDENT_ASSURANCE_AGENT_CANON.md
ad9761c43efe2026e8a12849754a7d9fd260dfdd 2026-09-04 fix(iaa): align canonical pre-brief carrier to wave record
fcc34abe2d99b62032444fb4e8eb6ac35d8f6532 2026-05-07 feat(canon): add delivery verdict taxonomy and IAA split verdict model (Phase 2 hardening)
4d80b51ef3fc45857217f15591fda917905cd2e9 2026-04-21 feat(ecap-parity): catch-up governance repo to ISMS ECAP/IAA hardening parity (ACR-15, ACR-16, Check L, AAP-23, AAP-24, template v1.2.0)
7252d17aa67f5dfd6f884b301dfd7720daab1ed8 2026-04-19 feat: governance-repo hardening wave — gate-inventory + post-token normalization hardening (v1.5.0/1.7.0/1.2.0/1.5.0)
17394f018b1b2717af5ede4f5fb8a0e432c0fdd6 2026-04-17 Canonize 3-layer admin ceremony compliance stack: A1-A4 canon amendments, B1-B4 checklists/templates, CANON_INVENTORY updates
... historical entries continue; all precede the direct current-byte producer above.

git cat-file -e ad9761c43efe2026e8a12849754a7d9fd260dfdd^{commit}
exit 0
git diff-tree --no-commit-id --name-only -r ad9761c43efe2026e8a12849754a7d9fd260dfdd -- governance/canon/INDEPENDENT_ASSURANCE_AGENT_CANON.md
governance/canon/INDEPENDENT_ASSURANCE_AGENT_CANON.md
candidate blob: 5d76c9a2ff0610fedaa3bab5e951b31826387c4c
HEAD blob:      5d76c9a2ff0610fedaa3bab5e951b31826387c4c
declared SHA256: a981e920d17c5a2c9cf5308fca149d92ddde952651d9c3a51fd86cd25f00e546
current SHA256:  a981e920d17c5a2c9cf5308fca149d92ddde952651d9c3a51fd86cd25f00e546
version: 1.10.0 | **Authority**: CS2
```

## Inventory Preservation and Validation

The repair changes exactly three values, all named `canonical_commit`; no canonical content or non-target inventory field changes. Final command outcomes are recorded in the bound gate record.
