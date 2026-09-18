#!/usr/bin/env bash
# validate-canon-hashes.sh — CANON-HASH-001 gate
# Asserts every entry in governance/CANON_INVENTORY.json has:
#   - file_hash exactly 64 lowercase hex characters
#   - file_hash == file_hash_sha256
#   - version == canonical_version (if canonical_version is present and non-null)
#   - canonical_commit is the path-specific commit that produced the declared bytes
# Accumulates all validation failures and exits non-zero after checking every entry.
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
import hashlib
from pathlib import Path, PurePosixPath
import re
import subprocess
import sys

inventory_path = sys.argv[1]

inventory_file = Path(inventory_path).resolve()
with open(inventory_file, "r", encoding="utf-8") as f:
    data = json.load(f)

entries = data.get("canons", [])
total = len(entries)
errors = []

# SHA256 output from governance tooling is lowercase hex; uppercase is rejected intentionally
HEX64 = re.compile(r'^[0-9a-f]{64}$')
HEX40 = re.compile(r'^[0-9a-f]{40}$')


def git(*args, text=True):
    return subprocess.run(
        ["git", "-C", str(repository_root), *args],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=text,
        check=False,
    )


root_result = subprocess.run(
    ["git", "-C", str(inventory_file.parent), "rev-parse", "--show-toplevel"],
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True,
    check=False,
)
if root_result.returncode != 0:
    print(
        "❌ [CANON-HASH-001] FAILED — inventory is not inside a Git repository: "
        f"{root_result.stderr.strip()}"
    )
    sys.exit(1)
repository_root = Path(root_result.stdout.strip()).resolve()


def blob_sha256(commit, entry_path):
    result = git("show", f"{commit}:{entry_path}", text=False)
    if result.returncode != 0:
        return None
    return hashlib.sha256(result.stdout).hexdigest()


def content_producing_commit(entry_path, expected_hash):
    history = git("log", "--format=%H", "--", entry_path)
    if history.returncode != 0:
        return None
    for commit in history.stdout.splitlines():
        if blob_sha256(commit, entry_path) == expected_hash:
            return commit
    return None

for i, entry in enumerate(entries):
    filename = entry.get("filename", f"<entry {i}>")
    file_hash = entry.get("file_hash", "")
    file_hash_sha256 = entry.get("file_hash_sha256", "")
    version = entry.get("version", "")
    canonical_version = entry.get("canonical_version")  # optional field, may be None
    canonical_commit = entry.get("canonical_commit", "")
    entry_path = entry.get("path", "")

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

    # Check 4: entry path is a safe repository-relative path whose current bytes
    # match the declared content hash.
    path_is_valid = isinstance(entry_path, str) and bool(entry_path)
    if path_is_valid:
        parsed_path = PurePosixPath(entry_path)
        path_is_valid = not parsed_path.is_absolute() and ".." not in parsed_path.parts
    if not path_is_valid:
        errors.append(f"  [{filename}] path is missing or not repository-relative: '{entry_path}'")
        continue

    current_path = repository_root / entry_path
    if not current_path.is_file():
        errors.append(f"  [{filename}] path does not exist in the repository: '{entry_path}'")
    elif HEX64.fullmatch(file_hash_sha256):
        current_hash = hashlib.sha256(current_path.read_bytes()).hexdigest()
        if current_hash != file_hash_sha256:
            errors.append(
                f"  [{filename}] current path bytes do not match file_hash_sha256:\n"
                f"    path:              {entry_path}\n"
                f"    declared SHA256:   {file_hash_sha256}\n"
                f"    current SHA256:    {current_hash}"
            )

    # Check 5: provenance is a full commit SHA, exists, contains the declared
    # path/bytes, and is the path-specific content-producing commit.
    if not isinstance(canonical_commit, str) or not HEX40.fullmatch(canonical_commit):
        errors.append(
            f"  [{filename}] canonical_commit is not 40 lowercase hex chars: "
            f"'{canonical_commit}'"
        )
        continue

    commit_result = git("cat-file", "-e", f"{canonical_commit}^{{commit}}")
    if commit_result.returncode != 0:
        errors.append(
            f"  [{filename}] canonical_commit does not resolve to a commit: "
            f"{canonical_commit}"
        )
        continue

    committed_hash = blob_sha256(canonical_commit, entry_path)
    if committed_hash is None:
        errors.append(
            f"  [{filename}] path '{entry_path}' does not exist at canonical_commit "
            f"{canonical_commit}"
        )
    elif committed_hash != file_hash_sha256:
        errors.append(
            f"  [{filename}] canonical_commit bytes do not match file_hash_sha256:\n"
            f"    canonical_commit:  {canonical_commit}\n"
            f"    committed SHA256:  {committed_hash}\n"
            f"    declared SHA256:   {file_hash_sha256}"
        )

    expected_commit = (
        content_producing_commit(entry_path, file_hash_sha256)
        if HEX64.fullmatch(file_hash_sha256)
        else None
    )
    if expected_commit is None:
        errors.append(
            f"  [{filename}] no canonical Git history commit produces '{entry_path}' "
            f"with SHA256 {file_hash_sha256}"
        )
    elif canonical_commit != expected_commit:
        errors.append(
            f"  [{filename}] canonical_commit is not the path-specific "
            f"content-producing commit:\n"
            f"    declared: {canonical_commit}\n"
            f"    expected: {expected_commit}"
        )

if errors:
    print(f"❌ [CANON-HASH-001] FAILED — {len(errors)} invalid entries out of {total}:")
    for err in errors:
        print(err)
    sys.exit(1)
else:
    print(
        f"✅ [CANON-HASH-001] PASSED — all {total} entries have valid hashes, "
        "current bytes, versions, and path-specific canonical commit provenance"
    )
PYEOF
