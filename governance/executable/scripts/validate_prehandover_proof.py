#!/usr/bin/env python3
"""Validate structured prehandover proof."""

import argparse
import json
import re
from pathlib import Path

MINIMIZING_PATTERNS = [
    r"\bonly\b",
    r"\bjust\b",
    r"\bminor\b",
    r"\bnon[- ]?blocking\b",
    r"\bnon[- ]?critical\b",
    r"\bmostly\b",
    r"good enough",
    r"\btrivial\b",
    r"\bsmall\b",
    r"\beasy\b"
]


def detect_minimizing_language(text: str) -> list[str]:
    return [pattern for pattern in MINIMIZING_PATTERNS if re.search(pattern, text, flags=re.IGNORECASE)]


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
    matches = detect_minimizing_language(text_blob)
    if matches:
        print("ERROR: Minimizing language detected in prehandover proof.")
        return 1

    print("PASS: Prehandover proof validated.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
