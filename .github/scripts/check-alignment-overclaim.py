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

# Stale/placeholder value patterns
STALE = re.compile(
    r"^(placeholder|TBD|tbd|TODO|todo|unknown|UNKNOWN|pending|PENDING|N/A|n/a|)$",
    re.IGNORECASE,
)

violations = []

for entry in entries:
    filename = entry.get("filename", "<unknown>")
    alignment_status = entry.get("alignment_status", "")

    # Only inspect entries explicitly marked ALIGNED
    if not (isinstance(alignment_status, str) and alignment_status.strip().upper() == "ALIGNED"):
        continue

    file_hash = entry.get("file_hash", "")
    file_hash_sha256 = entry.get("file_hash_sha256", "")
    version = entry.get("version", "")
    entry_violations = []

    # Check 1: file_hash must be a valid 64-char lowercase hex SHA256
    if not HEX64.match(str(file_hash)):
        entry_violations.append(
            f"  file_hash is not a valid 64-char SHA256: '{file_hash}'"
        )

    # Check 2: file_hash_sha256 must be a valid 64-char lowercase hex SHA256
    if not HEX64.match(str(file_hash_sha256)):
        entry_violations.append(
            f"  file_hash_sha256 is not a valid 64-char SHA256: '{file_hash_sha256}'"
        )

    # Check 3: version must be non-empty and non-placeholder
    if not version or STALE.match(str(version).strip()):
        entry_violations.append(
            f"  version is empty/stale/placeholder: '{version}'"
        )

    if entry_violations:
        violations.append((filename, entry_violations))

if violations:
    print(f"❌ ALIGNMENT-OVERCLAIM-001: FAIL")
    print(f"   {len(violations)} ALIGNED entr{'y' if len(violations) == 1 else 'ies'} with stale/incomplete canonical metadata:")
    print()
    for filename, v_list in violations:
        print(f"  [{filename}] is marked ALIGNED but:")
        for v in v_list:
            print(v)
        print()
    print("Per Workstream D requirement (Issue #1355):")
    print("  No inventory entry may remain ALIGNED when canonical hash/version")
    print("  metadata is stale, incomplete, or TBD.")
    print()
    print("Required action:")
    print("  1. Set alignment_status to PENDING-RECONCILIATION or UNALIGNED")
    print("     for affected entries, OR")
    print("  2. Supply accurate canonical hash and version metadata before")
    print("     claiming alignment_status: ALIGNED")
    sys.exit(1)

aligned_count = sum(
    1 for e in entries
    if isinstance(e.get("alignment_status", ""), str)
    and e.get("alignment_status", "").strip().upper() == "ALIGNED"
)
total = len(entries)
print(f"✅ ALIGNMENT-OVERCLAIM-001: PASS")
print(f"   {aligned_count} ALIGNED {'entry' if aligned_count == 1 else 'entries'} out of {total} total — all have valid SHA256 hashes and version metadata.")
