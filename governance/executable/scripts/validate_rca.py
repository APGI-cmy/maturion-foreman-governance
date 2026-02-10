#!/usr/bin/env python3
"""Validate structured RCA evidence."""

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


def load_json(path: Path) -> dict:
    return json.loads(path.read_text())


def rca_required(gate_results: dict | None) -> bool:
    if not gate_results:
        return False
    stop_and_fix = gate_results.get("stop_and_fix", {}).get("required")
    any_failed = any(gate.get("status") == "FAIL" for gate in gate_results.get("gates", []))
    return bool(stop_and_fix or any_failed)


def validate_rca_structure(data: dict) -> None:
    require(data.get("schema_version") == "1.0.0", "Invalid or missing schema_version")
    require("reported_at" in data, "Missing reported_at")
    require(isinstance(data.get("incident_summary"), str) and len(data.get("incident_summary", "")) >= 10, "Missing incident_summary")
    require(isinstance(data.get("root_causes"), list) and data.get("root_causes"), "Missing root_causes")
    require(isinstance(data.get("corrective_actions"), list) and data.get("corrective_actions"), "Missing corrective_actions")
    require(isinstance(data.get("preventative_actions"), list) and data.get("preventative_actions"), "Missing preventative_actions")


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate RCA JSON.")
    parser.add_argument("--rca", required=True, help="Path to RCA JSON")
    parser.add_argument("--gate-results", help="Optional gate_results.json to determine requirement")
    args = parser.parse_args()

    gate_data = None
    if args.gate_results:
        gate_path = Path(args.gate_results)
        if gate_path.exists():
            try:
                gate_data = load_json(gate_path)
            except json.JSONDecodeError:
                print("ERROR: Gate results JSON invalid; cannot determine RCA requirement.")
                return 2

    needs_rca = rca_required(gate_data)
    rca_path = Path(args.rca)

    if not rca_path.exists():
        if needs_rca:
            print(f"ERROR: RCA required but missing: {rca_path}")
            return 1
        print("PASS: RCA not required and file missing.")
        return 0

    try:
        data = load_json(rca_path)
        validate_rca_structure(data)
    except (json.JSONDecodeError, ValueError) as exc:
        print(f"ERROR: RCA invalid: {exc}")
        return 2

    text_blob = "\n".join(
        [
            str(data.get("incident_summary", "")),
            " ".join(data.get("root_causes", [])),
            " ".join(data.get("corrective_actions", [])),
            " ".join(data.get("preventative_actions", []))
        ]
    )
    if detect_minimizing_language(text_blob):
        print("ERROR: Minimizing language detected in RCA.")
        return 1

    print("PASS: RCA validated.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
