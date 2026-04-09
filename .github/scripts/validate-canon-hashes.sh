#!/usr/bin/env bash
# validate-canon-hashes.sh — CANON-HASH-001 gate
# Asserts every entry in governance/CANON_INVENTORY.json has:
#   - file_hash exactly 64 lowercase hex characters
#   - file_hash == file_hash_sha256
#   - version == canonical_version (if canonical_version is present and non-null)
# Exits non-zero on first failure (fast-fail).
#
# Usage: .github/scripts/validate-canon-hashes.sh [path/to/CANON_INVENTORY.json]
# Default: governance/CANON_INVENTORY.json

set -euo pipefail

INVENTORY="${1:-governance/CANON_INVENTORY.json}"

if [ ! -f "${INVENTORY}" ]; then
  echo "❌ [CANON-HASH-001] File not found: ${INVENTORY}"
  exit 1
fi

echo "[CANON-HASH-001] Validating file_hash integrity in ${INVENTORY}..."

python3 - "${INVENTORY}" <<'PYEOF'
import json
import sys
import re

inventory_path = sys.argv[1]

with open(inventory_path, "r") as f:
    data = json.load(f)

entries = data.get("canons", [])
total = len(entries)
errors = []

# SHA256 output from governance tooling is lowercase hex; uppercase is rejected intentionally
HEX64 = re.compile(r'^[0-9a-f]{64}$')

for i, entry in enumerate(entries):
    filename = entry.get("filename", f"<entry {i}>")
    file_hash = entry.get("file_hash", "")
    file_hash_sha256 = entry.get("file_hash_sha256", "")
    version = entry.get("version", "")
    canonical_version = entry.get("canonical_version")  # optional field, may be None

    # Check 1: file_hash is a valid 64-char lowercase hex SHA256
    if not HEX64.match(file_hash):
        errors.append(
            f"  [{filename}] file_hash is not 64 lowercase hex chars: '{file_hash}' (len={len(file_hash)})"
        )
    elif file_hash != file_hash_sha256:
        # Check 2: file_hash must equal file_hash_sha256
        errors.append(
            f"  [{filename}] file_hash != file_hash_sha256:\n"
            f"    file_hash:        {file_hash}\n"
            f"    file_hash_sha256: {file_hash_sha256}"
        )

    # Check 3: version must equal canonical_version (ECAP-QC-003)
    # Only enforced when canonical_version is present and non-null
    if canonical_version is not None and canonical_version != version:
        errors.append(
            f"  [{filename}] version != canonical_version (ECAP-QC-003):\n"
            f"    version:           {version}\n"
            f"    canonical_version: {canonical_version}\n"
            f"    Fix: align canonical_version to match version field."
        )

if errors:
    print(f"❌ [CANON-HASH-001] FAILED — {len(errors)} invalid entries out of {total}:")
    for err in errors:
        print(err)
    sys.exit(1)
else:
    print(f"✅ [CANON-HASH-001] PASSED — all {total} entries have valid 64-char file_hash == file_hash_sha256 and consistent version/canonical_version")
PYEOF
