#!/usr/bin/env python3
"""Validate continuous improvement capture entry."""

import argparse
import json
from pathlib import Path


def require(condition: bool, message: str) -> None:
    if not condition:
        raise ValueError(message)


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate improvement entry JSON.")
    parser.add_argument("--entry", required=True, help="Path to improvement entry JSON")
    args = parser.parse_args()

    entry_path = Path(args.entry)
    if not entry_path.exists():
        print(f"ERROR: Missing improvement entry: {entry_path}")
        return 2

    try:
        data = json.loads(entry_path.read_text())
    except json.JSONDecodeError as exc:
        print(f"ERROR: Improvement entry JSON invalid: {exc}")
        return 2

    try:
        require(data.get("schema_version") == "1.0.0", "Invalid or missing schema_version")
        require("captured_at" in data, "Missing captured_at")
        require(data.get("category") in {"PROCESS", "TOOLING", "GOVERNANCE", "QUALITY", "OTHER"}, "Invalid category")
        require(isinstance(data.get("description"), str) and len(data.get("description", "")) >= 10, "Description too short")
        require(data.get("status") in {"IN_SCOPE", "PARKED"}, "Invalid status")
    except ValueError as exc:
        print(f"ERROR: Improvement entry invalid: {exc}")
        return 2

    print("PASS: Improvement entry validated.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
