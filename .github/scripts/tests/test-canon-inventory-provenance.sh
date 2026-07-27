#!/usr/bin/env bash
# QA-to-Red boundary tests for CANON inventory canonical-commit validation.

set -euo pipefail

REPOSITORY_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
VALIDATOR="${REPOSITORY_ROOT}/.github/scripts/validate-canon-hashes.sh"
FIXTURE_REPO="$(mktemp -d)"
trap 'rm -rf "${FIXTURE_REPO}"' EXIT

git -C "${FIXTURE_REPO}" init -q
git -C "${FIXTURE_REPO}" config user.email "qa-to-red@example.invalid"
git -C "${FIXTURE_REPO}" config user.name "QA to Red"
mkdir -p "${FIXTURE_REPO}/governance/canon"

printf 'alpha-v1\n' > "${FIXTURE_REPO}/governance/canon/ALPHA.md"
git -C "${FIXTURE_REPO}" add governance
git -C "${FIXTURE_REPO}" commit -q -m "add alpha"
ALPHA_V1_COMMIT="$(git -C "${FIXTURE_REPO}" rev-parse HEAD)"

printf 'beta-v1\n' > "${FIXTURE_REPO}/governance/canon/BETA.md"
git -C "${FIXTURE_REPO}" add governance
git -C "${FIXTURE_REPO}" commit -q -m "add beta"
BETA_COMMIT="$(git -C "${FIXTURE_REPO}" rev-parse HEAD)"

printf 'alpha-v2\n' > "${FIXTURE_REPO}/governance/canon/ALPHA.md"
git -C "${FIXTURE_REPO}" add governance
git -C "${FIXTURE_REPO}" commit -q -m "update alpha"
HEAD_COMMIT="$(git -C "${FIXTURE_REPO}" rev-parse HEAD)"

ALPHA_HASH="$(sha256sum "${FIXTURE_REPO}/governance/canon/ALPHA.md" | cut -d' ' -f1)"
BETA_HASH="$(sha256sum "${FIXTURE_REPO}/governance/canon/BETA.md" | cut -d' ' -f1)"
INVENTORY="${FIXTURE_REPO}/governance/CANON_INVENTORY.json"

write_inventory() {
  local scenario="$1"
  python3 - "${INVENTORY}" "${scenario}" "${ALPHA_HASH}" "${BETA_HASH}" \
    "${ALPHA_V1_COMMIT}" "${BETA_COMMIT}" "${HEAD_COMMIT}" <<'PY'
import json
import sys

path, scenario, alpha_hash, beta_hash, alpha_v1, beta_commit, head = sys.argv[1:]

def entry(filename, digest, commit_marker):
    result = {
        "filename": filename,
        "version": "1.0.0",
        "file_hash": digest,
        "file_hash_sha256": digest,
        "path": f"governance/canon/{filename}",
    }
    if commit_marker is not None:
        result["canonical_commit"] = commit_marker
    return result

if scenario == "valid":
    entries = [
        entry("ALPHA.md", alpha_hash, head),
        entry("BETA.md", beta_hash, beta_commit),
    ]
elif scenario == "missing":
    entries = [entry("ALPHA.md", alpha_hash, None)]
elif scenario == "malformed":
    entries = [entry("ALPHA.md", alpha_hash, "not-a-40-hex-sha")]
elif scenario == "unknown":
    entries = [entry("ALPHA.md", alpha_hash, "f" * 40)]
elif scenario == "path-mismatch":
    entries = [entry("BETA.md", beta_hash, alpha_v1)]
elif scenario == "content-stale":
    entries = [entry("ALPHA.md", alpha_hash, alpha_v1)]
elif scenario == "synthetic-common-head":
    entries = [
        entry("ALPHA.md", alpha_hash, head),
        entry("BETA.md", beta_hash, head),
    ]
else:
    raise SystemExit(f"unknown scenario: {scenario}")

with open(path, "w", encoding="utf-8") as handle:
    json.dump({"version": "1.0.0", "total_canons": len(entries), "canons": entries}, handle)
PY
}

failures=0

expect_pass() {
  local scenario="$1"
  write_inventory "${scenario}"
  if ! (cd "${FIXTURE_REPO}" && bash "${VALIDATOR}" "${INVENTORY}") >/dev/null 2>&1; then
    printf 'FAIL: expected PASS for %s\n' "${scenario}"
    failures=$((failures + 1))
  else
    printf 'PASS: valid fixture accepted (%s)\n' "${scenario}"
  fi
}

expect_fail() {
  local scenario="$1"
  write_inventory "${scenario}"
  if (cd "${FIXTURE_REPO}" && bash "${VALIDATOR}" "${INVENTORY}") >/dev/null 2>&1; then
    printf 'RED: validator unexpectedly accepted %s provenance\n' "${scenario}"
    failures=$((failures + 1))
  else
    printf 'PASS: invalid fixture rejected (%s)\n' "${scenario}"
  fi
}

expect_pass valid
expect_fail missing
expect_fail malformed
expect_fail unknown
expect_fail path-mismatch
expect_fail content-stale
expect_fail synthetic-common-head

if [ "${failures}" -ne 0 ]; then
  printf 'QA_TO_RED: %s provenance boundary fixture(s) are not enforced\n' "${failures}"
  exit 1
fi

printf 'QA_TO_GREEN: all provenance boundary fixtures are enforced\n'
