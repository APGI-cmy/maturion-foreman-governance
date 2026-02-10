#!/usr/bin/env python3
"""Validate governance sync_state.json alignment status."""

import argparse
import json
from pathlib import Path


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate sync_state.json alignment status.")
    parser.add_argument("--sync-state", required=True, help="Path to sync_state.json")
    parser.add_argument("--required-status", default="ALIGNED", help="Expected alignment status")
    args = parser.parse_args()

    sync_path = Path(args.sync_state)
    if not sync_path.exists():
        print(f"ERROR: Missing sync_state.json at {sync_path}")
        return 1

    try:
        data = json.loads(sync_path.read_text())
    except json.JSONDecodeError as exc:
        print(f"ERROR: sync_state.json invalid: {exc}")
        return 1

    status = data.get("alignment_status")
    if status != args.required_status:
        print(f"ERROR: Alignment status is {status}, expected {args.required_status}.")
        return 1

    print("PASS: Alignment state verified.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
