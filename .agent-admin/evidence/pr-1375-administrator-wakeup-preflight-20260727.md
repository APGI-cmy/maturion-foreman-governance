# PR #1375 — Administrator Wake-Up and Frozen-Contract Preflight

**Evidence ID**: PR1375-GA-WAKEUP-PREFLIGHT-20260727  
**Recorded**: 2026-07-27T13:15:06Z  
**Repository**: APGI-cmy/maturion-foreman-governance  
**Issue**: #1374  
**PR**: #1375  
**Branch**: `repair/canon-inventory-provenance-1374`  
**Frozen appointed head**: `ac399dbadc05c1b6de73f847c5ca78266337c6b4`  
**Frozen base**: `91ace34412e34836e3db5aa4373ea45409fff7c1`  
**Agent**: governance-repo-administrator-v2  
**Outcome**: CLEAR FOR QA-TO-RED ONLY  
**Implementation status**: NOT STARTED

## Contract-First Attestation

The administrator began its appointed execution session by reading
`.github/agents/governance-repo-administrator-v2.agent.md` in full before any appointed
task action.

- Agent ID: `governance-repo-administrator-v2`
- Agent class: `administrator`
- Agent version: `6.2.0`
- Contract version: `2.0.0`
- Frozen contract SHA-256:
  `55b87adf5794ceba832051caa3113fb01de0ea6ad8e21f8e4d12368ee585b961`
- Appointment contract SHA-256: exact match

Tier 1 and Tier 2 induction was completed, including the full FAIL-ONLY-ONCE registry,
session-memory template, required canonical bindings, five wake-up-selected session memories,
and administrator context files. All universal rules and all currently triggered conditional
rules were self-attested. No active rule violation was found.

## Wake-Up Evidence

The canonical command completed with exit code `0`:

```text
bash .github/scripts/wake-up-protocol.sh governance-repo-administrator
```

Observed results:

- identity resolved as `governance-repo-administrator-v2` / `administrator`;
- canonical repository and 203-document inventory were detected;
- working contract and environment-health record were generated locally;
- no pending escalation was reported;
- environment status was `REMEDIATED`.

Wake-up automatically rotated seven old local memory files. Those unrelated local moves are
excluded from PR #1375 and are not represented as task output.

## Independent Filename-Resolution Verification

Wake-up first tests the non-existent path
`.github/agents/governance-repo-administrator.agent.md`, then uses the explicit v2 fallback
`.github/agents/governance-repo-administrator-v2.agent.md`.

The fallback file exists at the frozen head, its YAML identity resolves to the appointed agent,
and its independently calculated SHA-256 exactly matches the appointment. The wake-up success
message is therefore corroborated and is not being used as sole resolution evidence.

The executable worktree was detached at the exact appointed commit, so wake-up printed branch
`HEAD`. Git and GitHub independently confirm that this commit is the head of
`repair/canon-inventory-provenance-1374`; the detached local label does not change branch
authority or ancestry.

## Frozen Authority and Ancestry

The required ceremony order is proven:

1. task set: `e45d0ba95d3052335dde5334b8afc79d25dd8339`;
2. independent IAA pre-brief: `c2ddd20234562bdb790cb767898777db6c81e41d`;
3. bounded administrator appointment:
   `ac399dbadc05c1b6de73f847c5ca78266337c6b4`.

Each commit is an ancestor of the next. Before this checkpoint, the PR diff contains exactly six
governance carriers and no generator, validator, inventory, or regression-test change.

## Defect Reproduction

Direct parsing and file checks produced:

| Check | Result |
|---|---:|
| Inventory entries | 203 |
| Missing canonical commit provenance | 203 |
| Malformed full SHA-256 values | 0 |
| Missing/empty paths | 0 |
| Declared paths absent from the repository | 0 |

The missing provenance remains an authorized repair target, not a waiver or aligned-state claim.

## Git-History Feasibility

Read-only reconstruction checks found verifiable canonical history for all 203 declared
path/hash pairs:

- 202 entries match the blob at their most recent content-changing commit;
- those 202 entries resolve across 141 distinct commits, proving that a synthetic shared `HEAD`
  value is unnecessary;
- `governance/canon/GOVERNANCE_CANON_MANIFEST.md` is the single stale-current-content case;
- its declared SHA-256
  `fc3ddf69229736aa8f9357524d27bc7ed3d4c032926defeb0cc73a1d496d2b05`
  matches the file at canonical commit
  `31ca6fb20d3edc65736dafe7f6368b12b81a79eb`;
- no semantic canon or policy byte must be changed to reconstruct provenance.

## Known Baseline Limitation

The inherited Admin-Ceremony historical-placeholder failure remains outside this repair. It must
remain disclosed and must not be hidden, waived, opportunistically repaired, or reported Green.

## Authorized Next Step

The administrator may now create and commit executable QA-to-Red fixtures within the exact
appointment boundary. The fixtures must fail against the current producer behavior and cover
reconstruction, valid preservation, missing/malformed/unknown/path-mismatched/content-stale
provenance, and synthetic common-HEAD rejection.

Generator, validator, inventory, consumer, runtime, deployment, and live-environment
implementation remain prohibited until that distinct RED commit is published and verified.

---

This is an immutable preflight checkpoint. It is not QP, ECAP, PREHANDOVER, final IAA,
merge-readiness, implementation completion, or consumer layer-down evidence.
