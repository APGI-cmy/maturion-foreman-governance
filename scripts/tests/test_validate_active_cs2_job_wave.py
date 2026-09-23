#!/usr/bin/env python3
"""Targeted tests for ACTIVE_CS2 job/wave validation invariants."""

from __future__ import annotations

import importlib.util
import json
import unittest
from pathlib import Path


REPOSITORY_ROOT = Path(__file__).resolve().parents[2]
VALIDATOR_PATH = REPOSITORY_ROOT / "scripts" / "validate_active_cs2_job_wave.py"
SCHEMA_PATH = REPOSITORY_ROOT / "governance" / "schemas" / "ACTIVE_CS2_JOB_WAVE.schema.json"
FIXTURE_DIR = REPOSITORY_ROOT / "governance" / "schemas" / "fixtures" / "active-cs2-job-wave"

SPEC = importlib.util.spec_from_file_location("active_cs2_job_wave_validator", VALIDATOR_PATH)
assert SPEC and SPEC.loader
VALIDATOR = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(VALIDATOR)


def load_json(path: Path) -> object:
    with path.open(encoding="utf-8") as handle:
        return json.load(handle)


class ActiveCs2JobWaveValidatorTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.schema = load_json(SCHEMA_PATH)
        cls.rejection_cases = {
            case["case"]: case for case in load_json(FIXTURE_DIR / "evaluator-rejection-cases.json")
        }

    def test_accepts_valid_two_wave_pilot_fixture(self) -> None:
        VALIDATOR.validate_record(load_json(FIXTURE_DIR / "valid-two-wave-pilot.json"), self.schema)

    def test_accepts_valid_three_wave_plan_fixture(self) -> None:
        VALIDATOR.validate_record(load_json(FIXTURE_DIR / "valid-three-wave-plan.json"), self.schema)

    def test_rejects_duplicate_wave_id_case(self) -> None:
        with self.assertRaisesRegex(VALIDATOR.ActiveCs2JobWaveValidationError, "AMBIGUOUS_WAVE_ID"):
            VALIDATOR.validate_unique_waves(self.rejection_cases["duplicate-wave-id"]["input"]["waves"])

    def test_rejects_duplicate_wave_ordinal_case(self) -> None:
        with self.assertRaisesRegex(VALIDATOR.ActiveCs2JobWaveValidationError, "AMBIGUOUS_WAVE_ORDER"):
            VALIDATOR.validate_unique_waves(self.rejection_cases["duplicate-wave-ordinal"]["input"]["waves"])


if __name__ == "__main__":
    unittest.main()
