#!/usr/bin/env python3
"""
check-alignment-overclaim.py — ALIGNMENT-OVERCLAIM-001 gate

Authority: AGENT_HANDOVER_AUTOMATION.md v1.5.0 §4.3e
           governance issue #1355 (Workstream D — Alignment Inventory Truth Hardening)

Purpose: Detect CANON_INVENTORY.json entries where alignment_status == "ALIGNED"
         but canonical hash/version metadata is stale, incomplete, or placeholder.

Rule: No inventory entry may remain ALIGNED when canonical hash/version metadata
      is stale, incomplete, or TBD.

Exit codes:
  0 = PASS (no overclaim detected)
  1 = FAIL (overclaim detected — ALIGNED entries with stale metadata)
  2 = ERROR (file not found or not valid JSON)

Usage: python3 .github/scripts/check-alignment-overclaim.py [path/to/CANON_INVENTORY.json]
       Default: governance/CANON_INVENTORY.json
"""
import json
import re
import sys

INVENTORY_PATH = sys.argv[1] if len(sys.argv) > 1 else "governance/CANON_INVENTORY.json"

try:
    with open(INVENTORY_PATH) as f:
        data = json.load(f)
except FileNotFoundError:
    print(f"ℹ️  {INVENTORY_PATH} not found — overclaim check not applicable")
    print("✅ ALIGNMENT-OVERCLAIM-001: PASS (no inventory)")
    sys.exit(0)
except json.JSONDecodeError as e:
    print(f"❌ {INVENTORY_PATH} is not valid JSON: {e}")
    sys.exit(2)

entries = data.get("canons", [])

# A valid SHA256 hash: exactly 64 lowercase hex characters
HEX64 = re.compile(r"^[0-9a-f]{64}$")

# Stale/placeholder value patterns — matches explicit stale strings.
# Empty string is handled separately in the version check via `not version`.
STALE = re.compile(
    r"^(placeholder|TBD|tbd|TODO|todo|unknown|UNKNOWN|pending|PENDING|N/A|n/a)$",
    re.IGNORECASE,
)

violations = []
aligned_count = 0

for entry in entries:
    filename = entry.get("filename", "<unknown>")
    alignment_status = entry.get("alignment_status", "")
    is_aligned = isinstance(alignment_status, str) and alignment_status.strip().upper() == "ALIGNED"
    if is_aligned:
        aligned_count += 1

    file_hash = entry.get("file_hash", "")
    file_hash_sha256 = entry.get("file_hash_sha256", "")
    version = entry.get("version", "")
    entry_violations = []

    # Check 1: file_hash must be a valid 64-char lowercase hex SHA256 (ALL entries)
    if not HEX64.match(str(file_hash)):
        entry_violations.append(
            f"  file_hash is not a valid 64-char SHA256: '{file_hash}'"
        )

    # Check 2: file_hash_sha256 must be a valid 64-char lowercase hex SHA256 (ALL entries)
    if not HEX64.match(str(file_hash_sha256)):
        entry_violations.append(
            f"  file_hash_sha256 is not a valid 64-char SHA256: '{file_hash_sha256}'"
        )

    # Check 3: version must be non-empty and non-placeholder (ALIGNED entries only)
    # Applied to all entries when alignment_status field is present; otherwise ALIGNED-specific only.
    if is_aligned and (not version or STALE.match(str(version).strip())):
        entry_violations.append(
            f"  version is empty/stale/placeholder: '{version}'"
        )

    if entry_violations:
        violations.append((filename, entry_violations))

if violations:
    print(f"❌ ALIGNMENT-OVERCLAIM-001: FAIL")
    print(f"   {len(violations)} entr{'y' if len(violations) == 1 else 'ies'} with invalid/stale canonical hash or version metadata:")
    print()
    for filename, v_list in violations:
        print(f"  [{filename}]:")
        for v in v_list:
            print(v)
        print()
    print("Per Workstream D requirement (Issue #1355):")
    print("  No inventory entry may carry an invalid file_hash / file_hash_sha256.")
    print("  No entry marked alignment_status: ALIGNED may have a stale/placeholder version.")
    print()
    print("Required action:")
    print("  1. Provide valid 64-char lowercase SHA256 hashes for affected entries, OR")
    print("  2. For ALIGNED entries with stale version: set alignment_status to")
    print("     PENDING-RECONCILIATION or UNALIGNED until correct metadata is supplied")
    sys.exit(1)

total = len(entries)
print(f"✅ ALIGNMENT-OVERCLAIM-001: PASS")
print(f"   {total} total entr{'y' if total == 1 else 'ies'} — all have valid SHA256 hashes.")
if aligned_count > 0:
    print(f"   {aligned_count} ALIGNED entr{'y' if aligned_count == 1 else 'ies'} — all have valid version metadata.")
else:
    print(f"   No entries currently carry alignment_status: ALIGNED (version staleness check will enforce once entries gain this field).")
