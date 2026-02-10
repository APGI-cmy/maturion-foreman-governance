#!/usr/bin/env python3
"""Compare SHA256 of two files to detect drift."""

import argparse
import hashlib
from pathlib import Path
import sys


def compute_sha256(path: Path) -> str:
    sha256_hash = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(4096), b""):
            sha256_hash.update(block)
    return sha256_hash.hexdigest()


def main() -> int:
    parser = argparse.ArgumentParser(description="Compare two files by SHA256.")
    parser.add_argument("--expected-file", required=True, help="Canonical file")
    parser.add_argument("--actual-file", required=True, help="Local file")
    parser.add_argument("--truncate", type=int, default=0, help="Truncate hashes to N characters")
    args = parser.parse_args()

    expected_path = Path(args.expected_file)
    actual_path = Path(args.actual_file)

    if not expected_path.exists():
        print(f"ERROR: Expected file missing: {expected_path}")
        return 2
    if not actual_path.exists():
        print(f"ERROR: Actual file missing: {actual_path}")
        return 2

    expected_hash = compute_sha256(expected_path)
    actual_hash = compute_sha256(actual_path)

    if args.truncate and args.truncate > 0:
        expected_hash = expected_hash[: args.truncate]
        actual_hash = actual_hash[: args.truncate]

    if expected_hash == actual_hash:
        print(f"ALIGNED: {expected_hash}")
        return 0

    print(f"DRIFT: expected {expected_hash} but found {actual_hash}")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
