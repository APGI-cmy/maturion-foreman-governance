#!/usr/bin/env python3
"""Validate structured prehandover proof."""

import argparse
from functools import lru_cache
import json
import os
import re
from pathlib import Path


def resolve_minimizing_language_path() -> Path:
    env_path = os.environ.get("MINIMIZING_LANGUAGE_PATTERNS_PATH")
    if env_path:
        return Path(env_path)

    for parent in Path(__file__).resolve().parents:
        candidate = parent / "policy" / "minimizing_language_patterns.json"
        if candidate.exists():
            return candidate

    raise ValueError(
        "Missing minimizing language patterns file. "
        "Set MINIMIZING_LANGUAGE_PATTERNS_PATH to override."
    )


@lru_cache(maxsize=1)
def load_minimizing_language_patterns() -> list[str]:
    patterns_path = resolve_minimizing_language_path()
    try:
        data = json.loads(patterns_path.read_text())
    except FileNotFoundError as exc:
        raise ValueError(f"Missing minimizing language patterns file: {patterns_path}") from exc
    except json.JSONDecodeError as exc:
        raise ValueError(f"Invalid minimizing language patterns JSON: {exc}") from exc

    patterns = data.get("patterns")
    if not isinstance(patterns, list) or not patterns:
        raise ValueError("Minimizing language patterns list missing or empty.")

    resolved = []
    for entry in patterns:
        if isinstance(entry, str):
            resolved.append(entry)
            continue
        if isinstance(entry, dict) and isinstance(entry.get("pattern"), str):
            resolved.append(entry["pattern"])
            continue
        raise ValueError("Invalid minimizing language pattern entry; expected string or object with 'pattern'.")
    return resolved


def detect_minimizing_language(text: str) -> list[str]:
    return [
        pattern
        for pattern in load_minimizing_language_patterns()
        if re.search(pattern, text, flags=re.IGNORECASE)
    ]


def require(condition: bool, message: str) -> None:
    if not condition:
        raise ValueError(message)


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate prehandover proof JSON.")
    parser.add_argument("--proof", required=True, help="Path to prehandover proof JSON")
    args = parser.parse_args()

    proof_path = Path(args.proof)
    if not proof_path.exists():
        print(f"ERROR: Missing prehandover proof: {proof_path}")
        return 2

    try:
        data = json.loads(proof_path.read_text())
    except json.JSONDecodeError as exc:
        print(f"ERROR: Prehandover proof JSON invalid: {exc}")
        return 2

    try:
        require(data.get("schema_version") == "1.0.0", "Invalid or missing schema_version")
        require("generated_at" in data, "Missing generated_at")
        require(isinstance(data.get("pr"), dict), "Missing pr metadata")
        require(isinstance(data.get("summary"), str) and data.get("summary"), "Missing summary")
        require(isinstance(data.get("scope"), str) and data.get("scope"), "Missing scope")
        require(data.get("test_status") in {"PASS", "FAIL", "NOT_RUN"}, "Invalid test_status")
        require(isinstance(data.get("evidence_paths"), list) and data.get("evidence_paths"), "Missing evidence_paths")
    except ValueError as exc:
        print(f"ERROR: Prehandover proof invalid: {exc}")
        return 2

    text_blob = "\n".join(
        [str(data.get("summary", "")), str(data.get("scope", "")), str(data.get("notes", ""))]
    )
    try:
        matches = detect_minimizing_language(text_blob)
    except ValueError as exc:
        print(f"ERROR: {exc}")
        return 2
    if matches:
        print("ERROR: Minimizing language detected in prehandover proof.")
        return 1

    print("PASS: Prehandover proof validated.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
