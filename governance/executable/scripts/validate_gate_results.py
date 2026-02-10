#!/usr/bin/env python3
"""Validate gate results summary for merge gate enforcement."""

import argparse
import json
import re
from pathlib import Path
import sys


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
    matches = []
    for pattern in MINIMIZING_PATTERNS:
        if re.search(pattern, text, flags=re.IGNORECASE):
            matches.append(pattern)
    return matches


def load_json(path: Path) -> dict:
    with path.open() as handle:
        return json.load(handle)


def require(condition: bool, message: str) -> None:
    if not condition:
        raise ValueError(message)


def validate_structure(data: dict) -> None:
    require(data.get("schema_version") == "1.0.0", "Invalid or missing schema_version")
    require("generated_at" in data, "Missing generated_at")
    require(isinstance(data.get("pr"), dict), "Missing pr metadata")
    require("overall_status" in data, "Missing overall_status")
    require(isinstance(data.get("gates"), list) and data.get("gates"), "Missing gate list")
    require(isinstance(data.get("stop_and_fix"), dict), "Missing stop_and_fix")

    for gate in data["gates"]:
        require(isinstance(gate, dict), "Gate entry must be object")
        require("name" in gate, "Gate entry missing name")
        require("status" in gate, f"Gate {gate.get('name', '<unknown>')} missing status")
        require("evidence_paths" in gate, f"Gate {gate.get('name', '<unknown>')} missing evidence_paths")


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate merge gate results JSON.")
    parser.add_argument("--results", required=True, help="Path to gate_results.json")
    parser.add_argument("--mode", default="verdict", choices=["verdict", "stop-and-fix"], help="Validation mode")
    parser.add_argument("--pr-title", default="", help="PR title for minimizing-language scan")
    parser.add_argument("--pr-body", default="", help="PR body for minimizing-language scan")
    args = parser.parse_args()

    results_path = Path(args.results)
    if not results_path.exists():
        print(f"ERROR: Missing gate results summary: {results_path}")
        return 2

    try:
        data = load_json(results_path)
        validate_structure(data)
    except (json.JSONDecodeError, ValueError) as exc:
        print(f"ERROR: Gate results invalid: {exc}")
        return 2

    combined_text = f"{args.pr_title}\n{args.pr_body}".strip()
    if combined_text:
        matches = detect_minimizing_language(combined_text)
        if matches:
            print("ERROR: Minimizing language detected in PR title/body.")
            return 1

    if args.mode == "verdict":
        if data.get("overall_status") != "PASS":
            print("ERROR: Merge verdict failed. Gate results indicate non-pass status.")
            return 1
        if any(gate.get("status") != "PASS" for gate in data.get("gates", [])):
            print("ERROR: One or more gates failed. See gate_results.json for evidence.")
            return 1
        print("PASS: Merge gate verdict satisfied.")
        return 0

    stop_and_fix = data.get("stop_and_fix", {})
    if stop_and_fix.get("required") and not stop_and_fix.get("resolved"):
        print("ERROR: Stop-and-fix unresolved. RCA required before merge.")
        return 1

    print("PASS: Stop-and-fix enforcement satisfied.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
