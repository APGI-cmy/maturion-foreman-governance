# PR #1375 — Build-to-Green Evidence

**Evidence ID**: PR1375-BUILD-TO-GREEN-20260727  
**Date**: 2026-07-27  
**Repository**: `APGI-cmy/maturion-foreman-governance`  
**Issue**: #1374  
**PR**: #1375  
**Branch**: `repair/canon-inventory-provenance-1374`  
**Published implementation head**: `5e8896f782870e492f779d8fad0a194ef1c11fea`  
**Builder**: governance-repo-administrator-v2  
**Verdict**: GREEN — READY FOR FOREMAN QUALITY PROFESSOR REVIEW

## Authorized Production Surface

The implementation commit changed exactly the three appointed producer paths:

- `scripts/regenerate_canon_inventory.py`
- `.github/scripts/validate-canon-hashes.sh`
- `governance/CANON_INVENTORY.json`

The published GitHub blobs were compared with the locally executed implementation:

| Path | Published/local Git blob |
|---|---|
| `scripts/regenerate_canon_inventory.py` | `1b3677ec91358f86d49f4200ece4ed299861ae20` |
| `.github/scripts/validate-canon-hashes.sh` | `567859ee91718e354e9f4258c0f2a39e7d0ab79b` |
| `governance/CANON_INVENTORY.json` | `5cdbe8cca2ea2fa68b6291c39b0afc83a2a5fd18` |

## Executed Verification

| Check | Command / method | Result |
|---|---|---|
| Generator regression suite | `python3 scripts/tests/test_regenerate_canon_inventory.py` | PASS — 4/4 |
| Provenance boundary suite | `bash .github/scripts/tests/test-canon-inventory-provenance.sh` | PASS — valid control plus 6/6 fail-closed boundaries |
| Canon inventory validator | `bash .github/scripts/validate-canon-hashes.sh` | PASS — 203/203 |
| Deterministic regeneration | two consecutive generator runs and SHA-256 comparison | PASS — byte-identical `57ff481ed0526a074f72fbbc5980698f105c2be021f950779ce05485e7de12fc` |
| Historical provenance audit | each current path/hash checked against its declared Git commit | PASS — 203/203 |
| Genuine history distribution | distinct declared content-producing commits | PASS — 141 commits |
| Test-debt/stub scan | fixture and producer scan for always-pass, skip, todo, and stub patterns | PASS — none found |
| Semantic canon/policy diff | changed-path inspection | PASS — zero canon or policy documents changed |

## Fail-Closed Boundaries

The validator accepts the valid fixture and rejects all prohibited provenance states:

1. missing canonical commit;
2. malformed commit;
3. unknown/non-resolving commit;
4. commit/path mismatch;
5. stale content;
6. synthetic common-HEAD reuse.

## Scope and Gate Disclosure

- PR diff at the implementation head: 14 paths.
- This evidence and its accompanying scope normalization bring the checkpoint to 15 declared and changed paths.
- Five hosted workflows passed at implementation head `5e8896f7…`.
- `Preflight Evidence Gate` failed only because the 11-path scope declaration predated the three implementation paths; this checkpoint corrects that defect.
- `Admin-Ceremony Defect Gate` remains red because it scans unresolved historical placeholders from PRs #1360, #1368, and #1356 already present on `main`. That inherited defect is outside Issue #1374 and is not represented as Green, waived, or repaired here.

## Non-Goals Preserved

No semantic canon/policy, agent contract, workflow, consumer, MMM, Supabase, runtime, deployment, or live-environment mutation occurred.

## Builder Handback

The bounded implementation satisfies the committed RED fixtures and the 203-entry acceptance criteria. Foreman QP must independently evaluate this evidence and the exact implementation head before any ECAP or final-assurance claim.
