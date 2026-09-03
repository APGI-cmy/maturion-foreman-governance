# PR #1383 Canonical Hash Recovery Validation

**Date**: 2026-09-03  
**Issue**: #1380  
**PR**: #1383  
**Implementation commit**: `69255f592ef7bea553cf597734a908298b9a200f`

## Provenance Evidence

The current bytes of
`governance/canon/INTERIM_CS2_AMC_AUTOMATION_GOVERNANCE.md` have SHA-256
`52327b7356e6497c3e437b79f20a5e1adebba35fa70f84cfd836911d94dadfc2`.

Both `fcbb9f01582d1959c0ae89abc58ac238f5289c05` and
`5a38f26bdd706829b0bfcaba0790c1b866cfcd14` contain the same blob and bytes.
`5a38f26bdd706829b0bfcaba0790c1b866cfcd14` created the path; `fcbb9f01582d1959c0ae89abc58ac238f5289c05`
is its descendant but did not modify the path. The inventory therefore records
the former as the path-specific content-producing commit.

## Executed Validation

| Check | Result |
|---|---|
| `bash -n .github/scripts/validate-canon-hashes.sh` | PASS |
| UTF-8 JSON parse and corrected target field | PASS |
| `PYTHONIOENCODING=utf-8 bash .github/scripts/validate-canon-hashes.sh` | PASS — 204/204 |
| `PYTHONIOENCODING=utf-8 bash .github/scripts/tests/test-canon-inventory-provenance.sh` | PASS — valid fixture and six fail-closed cases |
| `git diff --check` | PASS |

The explicit UTF-8 source change corrects JSON decoding. This host also needs
UTF-8 Python output when rendering the validator's pre-existing Unicode status
markers; that console-output constraint is documented here and no out-of-scope
output behavior was changed.

## Status

The implementation is ready for independent ECAP reconciliation. IAA remains
pending. This is not a PREHANDOVER, assurance, or merge-readiness claim.
