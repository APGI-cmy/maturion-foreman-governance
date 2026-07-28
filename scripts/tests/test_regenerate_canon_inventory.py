#!/usr/bin/env python3
"""QA-to-Red contract tests for canonical commit provenance generation."""

from __future__ import annotations

import hashlib
import importlib.util
import json
import subprocess
import tempfile
import time
import unittest
from pathlib import Path


REPOSITORY_ROOT = Path(__file__).resolve().parents[2]
GENERATOR_PATH = REPOSITORY_ROOT / "scripts" / "regenerate_canon_inventory.py"
SPEC = importlib.util.spec_from_file_location("canon_inventory_generator", GENERATOR_PATH)
assert SPEC and SPEC.loader
GENERATOR = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(GENERATOR)


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


class CanonInventoryProvenanceGenerationTests(unittest.TestCase):
    def setUp(self) -> None:
        self.tempdir = tempfile.TemporaryDirectory()
        self.repo = Path(self.tempdir.name)
        subprocess.run(["git", "init", "-q"], cwd=self.repo, check=True)
        subprocess.run(
            ["git", "config", "user.email", "qa-to-red@example.invalid"],
            cwd=self.repo,
            check=True,
        )
        subprocess.run(
            ["git", "config", "user.name", "QA to Red"],
            cwd=self.repo,
            check=True,
        )
        (self.repo / "governance" / "canon").mkdir(parents=True)

    def tearDown(self) -> None:
        self.tempdir.cleanup()

    def write_canon(self, name: str, body: str) -> Path:
        path = self.repo / "governance" / "canon" / name
        path.write_text(
            f"# {name}\n\n**Version**: 1.0.0\n\n## 1. Purpose\n\n{body}\n",
            encoding="utf-8",
        )
        return path

    def commit(self, message: str) -> str:
        subprocess.run(["git", "add", "governance"], cwd=self.repo, check=True)
        subprocess.run(["git", "commit", "-q", "-m", message], cwd=self.repo, check=True)
        return subprocess.check_output(
            ["git", "rev-parse", "HEAD"], cwd=self.repo, text=True
        ).strip()

    def entries(self, existing_inventory: dict | None = None) -> dict[str, dict]:
        generated = GENERATOR.scan_governance_directory(self.repo, existing_inventory)
        return {entry["path"]: entry for entry in generated}

    def test_reconstructs_each_entry_from_its_content_commit(self) -> None:
        alpha = self.write_canon("ALPHA.md", "Alpha bytes.")
        alpha_commit = self.commit("add alpha")
        beta = self.write_canon("BETA.md", "Beta bytes.")
        beta_commit = self.commit("add beta")

        entries = self.entries()

        self.assertEqual(
            entries["governance/canon/ALPHA.md"]["canonical_commit"],
            alpha_commit,
        )
        self.assertEqual(
            entries["governance/canon/BETA.md"]["canonical_commit"],
            beta_commit,
        )
        self.assertNotEqual(alpha_commit, beta_commit)
        self.assertEqual(entries["governance/canon/ALPHA.md"]["file_hash_sha256"], sha256(alpha))
        self.assertEqual(entries["governance/canon/BETA.md"]["file_hash_sha256"], sha256(beta))

    def test_preserves_an_independently_verifiable_existing_commit(self) -> None:
        alpha = self.write_canon("ALPHA.md", "Stable alpha bytes.")
        alpha_commit = self.commit("add alpha")
        self.write_canon("BETA.md", "Unrelated beta bytes.")
        self.commit("add beta")
        existing = {
            "canons": [
                {
                    "path": "governance/canon/ALPHA.md",
                    "layer_down_status": "INTERNAL",
                    "file_hash_sha256": sha256(alpha),
                    "canonical_commit": alpha_commit,
                }
            ]
        }

        entry = self.entries(existing)["governance/canon/ALPHA.md"]

        self.assertEqual(entry["canonical_commit"], alpha_commit)

    def test_replaces_a_synthetic_head_with_the_content_commit(self) -> None:
        self.write_canon("ALPHA.md", "Stable alpha bytes.")
        alpha_commit = self.commit("add alpha")
        alpha_hash = sha256(self.repo / "governance" / "canon" / "ALPHA.md")
        self.write_canon("BETA.md", "Later beta bytes.")
        synthetic_head = self.commit("add beta")
        existing = {
            "canons": [
                {
                    "path": "governance/canon/ALPHA.md",
                    "layer_down_status": "INTERNAL",
                    "file_hash_sha256": alpha_hash,
                    "canonical_commit": synthetic_head,
                }
            ]
        }

        entry = self.entries(existing)["governance/canon/ALPHA.md"]

        self.assertEqual(entry["canonical_commit"], alpha_commit)
        self.assertNotEqual(entry["canonical_commit"], synthetic_head)

    def test_generation_is_byte_identical_for_a_fixed_repository_state(self) -> None:
        self.write_canon("ALPHA.md", "Deterministic alpha bytes.")
        self.commit("add alpha")

        first = json.dumps(
            GENERATOR.generate_inventory(self.repo),
            indent=2,
            ensure_ascii=False,
        ).encode()
        time.sleep(1.1)
        second = json.dumps(
            GENERATOR.generate_inventory(self.repo),
            indent=2,
            ensure_ascii=False,
        ).encode()

        self.assertEqual(first, second)


if __name__ == "__main__":
    unittest.main(verbosity=2)
