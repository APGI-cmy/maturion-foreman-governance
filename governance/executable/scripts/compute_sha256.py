#!/usr/bin/env python3
"""Compute SHA256 for a file with optional truncation."""

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
    parser = argparse.ArgumentParser(description="Compute SHA256 for a file.")
    parser.add_argument("path", help="Path to file to hash")
    parser.add_argument("--truncate", type=int, default=0, help="Truncate to N characters")
    args = parser.parse_args()

    target = Path(args.path)
    if not target.exists():
        print(f"ERROR: File not found: {target}")
        return 2

    digest = compute_sha256(target)
    if args.truncate and args.truncate > 0:
        digest = digest[: args.truncate]

    print(digest)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
