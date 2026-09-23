#!/usr/bin/env python3
"""Validate ACTIVE_CS2 job/wave records and evaluator invariants."""

from __future__ import annotations

import json
import sys
from pathlib import Path

from jsonschema import Draft202012Validator


REPOSITORY_ROOT = Path(__file__).resolve().parents[1]
SCHEMA_PATH = REPOSITORY_ROOT / "governance" / "schemas" / "ACTIVE_CS2_JOB_WAVE.schema.json"


class ActiveCs2JobWaveValidationError(ValueError):
    """Raised when a job/wave record violates evaluator invariants."""


def load_json(path: Path) -> object:
    with path.open(encoding="utf-8") as handle:
        return json.load(handle)


def validate_unique_waves(waves: list[object]) -> None:
    seen_wave_ids: set[str] = set()
    seen_ordinals: set[int] = set()

    for wave in waves:
        if not isinstance(wave, dict):
            continue

        wave_id = wave.get("wave_id")
        if isinstance(wave_id, str):
            if wave_id in seen_wave_ids:
                raise ActiveCs2JobWaveValidationError("AMBIGUOUS_WAVE_ID")
            seen_wave_ids.add(wave_id)

        ordinal = wave.get("ordinal")
        if isinstance(ordinal, int) and not isinstance(ordinal, bool):
            if ordinal in seen_ordinals:
                raise ActiveCs2JobWaveValidationError("AMBIGUOUS_WAVE_ORDER")
            seen_ordinals.add(ordinal)


def validate_record(record: object, schema: object) -> None:
    Draft202012Validator(schema).validate(record)
    if isinstance(record, dict):
        waves = record.get("waves")
        if isinstance(waves, list):
            validate_unique_waves(waves)


def main(argv: list[str]) -> int:
    if len(argv) != 2:
        print("Usage: validate_active_cs2_job_wave.py <record-path>", file=sys.stderr)
        return 2

    schema = load_json(SCHEMA_PATH)
    record = load_json(Path(argv[1]))
    try:
        validate_record(record, schema)
    except Exception as exc:  # pragma: no cover - CLI wrapper
        print(str(exc), file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
