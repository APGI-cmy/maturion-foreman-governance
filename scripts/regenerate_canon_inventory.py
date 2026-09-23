#!/usr/bin/env python3
"""
Regenerate CANON_INVENTORY.json

This script scans the governance/ directory for canon files and regenerates
the CANON_INVENTORY.json with current SHA256 checksums and metadata.

Usage:
    python scripts/regenerate_canon_inventory.py
"""

import hashlib
import json
import re
import subprocess
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, List, Optional


HEX40 = re.compile(r"^[0-9a-f]{40}$")


def calculate_sha256(file_path: Path, truncate: int = 12) -> tuple[str, str]:
    """Calculate both truncated and full SHA256 hash of a file."""
    sha256_hash = hashlib.sha256()
    with open(file_path, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    full_hash = sha256_hash.hexdigest()
    return full_hash[:truncate], full_hash


def git_output(base_path: Path, *args: str) -> str:
    """Run a read-only Git command and return stripped text output."""
    try:
        return subprocess.check_output(
            ["git", "-C", str(base_path), *args],
            text=True,
            stderr=subprocess.PIPE,
        ).strip()
    except subprocess.CalledProcessError as exc:
        detail = exc.stderr.strip() if exc.stderr else str(exc)
        raise RuntimeError(f"git {' '.join(args)} failed: {detail}") from exc


def blob_sha256_at_commit(base_path: Path, commit: str, rel_path: Path) -> Optional[str]:
    """Return the SHA256 of a path's bytes at a commit, or None when absent."""
    result = subprocess.run(
        ["git", "-C", str(base_path), "show", f"{commit}:{rel_path.as_posix()}"],
        stdout=subprocess.PIPE,
        stderr=subprocess.DEVNULL,
        check=False,
    )
    if result.returncode != 0:
        return None
    return hashlib.sha256(result.stdout).hexdigest()


def find_content_commit(base_path: Path, rel_path: Path, full_hash: str) -> str:
    """Find the latest commit that changed rel_path to the declared bytes."""
    history = git_output(
        base_path,
        "log",
        "--format=%H",
        "--",
        rel_path.as_posix(),
    ).splitlines()
    for commit in history:
        if blob_sha256_at_commit(base_path, commit, rel_path) == full_hash:
            return commit
    raise RuntimeError(
        f"No canonical Git commit contains {rel_path.as_posix()} with SHA256 {full_hash}"
    )


def path_history(base_path: Path, rel_path: Path) -> List[str]:
    """Return commits that changed rel_path, newest first."""
    history = git_output(
        base_path,
        "log",
        "--format=%H",
        "--",
        rel_path.as_posix(),
    )
    return history.splitlines() if history else []


def resolve_canonical_commit(
    base_path: Path,
    rel_path: Path,
    full_hash: str,
    existing_entry: Optional[Dict],
) -> str:
    """Preserve verified provenance or reconstruct it from path-specific history."""
    existing = (existing_entry or {}).get("canonical_commit", "")
    history = path_history(base_path, rel_path)
    if (
        isinstance(existing, str)
        and HEX40.fullmatch(existing)
        and existing in history
        and blob_sha256_at_commit(base_path, existing, rel_path) == full_hash
    ):
        return existing
    for commit in history:
        if blob_sha256_at_commit(base_path, commit, rel_path) == full_hash:
            return commit
    raise RuntimeError(
        f"No canonical Git commit contains {rel_path.as_posix()} with SHA256 {full_hash}"
    )


def deterministic_generation_time(base_path: Path, canons: List[Dict]) -> datetime:
    """Derive a stable timestamp from the newest content-producing commit."""
    commit_times = [
        int(git_output(base_path, "show", "-s", "--format=%ct", entry["canonical_commit"]))
        for entry in canons
    ]
    timestamp = max(commit_times, default=0)
    return datetime.fromtimestamp(timestamp, tz=timezone.utc)


def extract_metadata(file_path: Path) -> Dict:
    """Extract metadata from a canon file's header.
    
    Note: Reads first 3000 characters assuming all metadata appears in the header.
    This assumption is safe for standard canon files which have metadata at the top.
    """
    metadata = {
        "version": "unknown",
        "effective_date": "unknown",
        "description": "",
        "layer_down_status": "INTERNAL",
    }
    
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read(3000)  # Read first 3000 chars for metadata (expanded for safety)
            
        # Extract version
        version_match = re.search(
            r"\*\*Version\*\*:\s*(.+?)(?=\s+\|\s+\*\*|$)",
            content,
            re.IGNORECASE | re.MULTILINE,
        )
        if version_match:
            metadata["version"] = version_match.group(1).strip()
        else:
            # Try alternate format
            version_match = re.search(r'Version:\s*v?([^\n]+)', content, re.IGNORECASE)
            if version_match:
                metadata["version"] = version_match.group(1).strip()
        
        # Extract effective date
        date_match = re.search(r'\*\*Effective Date\*\*:\s*([^\n]+)', content, re.IGNORECASE)
        if date_match:
            date_str = date_match.group(1).strip()
            # Try to parse and normalize date format
            try:
                # Try YYYY-MM-DD format
                parsed_date = datetime.strptime(date_str, "%Y-%m-%d")
                metadata["effective_date"] = parsed_date.strftime("%Y-%m-%d")
            except ValueError:
                metadata["effective_date"] = date_str
        
        # Extract layer_down_status
        layer_match = re.search(r'\*\*Layer-Down Status\*\*:\s*([^\n]+)', content, re.IGNORECASE)
        if layer_match:
            status = layer_match.group(1).strip().upper()
            if status in ["PUBLIC_API", "INTERNAL", "OPTIONAL"]:
                metadata["layer_down_status"] = status
        
        # Extract description - use the first sentence of Purpose section
        purpose_match = re.search(
            r"##\s*1\.\s*Purpose[^\n]*\n+(.*?)(?:\n\n|\n#|$)",
            content,
            re.DOTALL,
        )
        if purpose_match:
            desc = purpose_match.group(1).strip()
            # Get first sentence or first 200 chars
            first_sentence = re.split(r'[.!?]\s+', desc)[0]
            if len(first_sentence) > 200:
                first_sentence = first_sentence[:197] + "..."
            metadata["description"] = first_sentence
        
    except Exception as e:
        print(f"  Warning: Could not extract metadata from {file_path}: {e}")
    
    return metadata


def build_inventory_entry(
    base_path: Path,
    rel_path: Path,
    existing_entry: Optional[Dict],
    *,
    metadata: Optional[Dict] = None,
    default_type: Optional[str] = None,
) -> Dict:
    """Build a regenerated inventory entry for any registered governance artifact."""
    file_path = base_path / rel_path
    full_hash = calculate_sha256(file_path)[1]
    layer_down_status = (
        (existing_entry or {}).get("layer_down_status")
        or (metadata or {}).get("layer_down_status")
        or "INTERNAL"
    )
    canonical_commit = resolve_canonical_commit(
        base_path,
        rel_path,
        full_hash,
        existing_entry,
    )

    if existing_entry:
        entry = dict(existing_entry)
        if metadata is not None:
            if metadata.get("version") not in (None, "", "unknown"):
                entry["version"] = metadata["version"]
            entry["effective_date"] = metadata.get(
                "effective_date",
                entry.get("effective_date", "unknown"),
            )
            if metadata.get("description"):
                entry["description"] = metadata["description"]
    else:
        entry = {
            "filename": file_path.name,
            "version": (metadata or {}).get("version", "unknown"),
            "effective_date": (metadata or {}).get("effective_date", "unknown"),
            "description": (metadata or {}).get("description")
            or f"Canonical governance document: {file_path.stem}",
            "type": default_type or "canon",
            "path": str(rel_path),
            "layer_down_status": layer_down_status,
        }

    entry.update(
        {
            "filename": file_path.name,
            "file_hash": full_hash,
            "type": entry.get("type", default_type or "canon"),
            "path": str(rel_path),
            "canonical_commit": canonical_commit,
            "layer_down_status": layer_down_status,
            "file_hash_sha256": full_hash,
        }
    )
    return entry


def scan_governance_directory(base_path: Path, existing_inventory: Optional[Dict] = None) -> List[Dict]:
    """Scan governance directory for canon files."""
    canons = []
    existing_entries = existing_inventory.get("canons", []) if existing_inventory else []
    existing_map = {canon.get("path", ""): canon for canon in existing_entries}
    registered_paths = set(existing_map)
    discovered_paths = set()

    if existing_inventory is not None:
        for existing_entry in existing_entries:
            rel_path = Path(existing_entry["path"])
            file_path = base_path / rel_path
            if not file_path.is_file():
                continue
            print(f"  Processing: {rel_path}")
            metadata = None
            if (
                rel_path.suffix == ".md"
                and (
                    rel_path.is_relative_to(Path("governance/canon"))
                    or rel_path.is_relative_to(Path("governance/policy"))
                )
            ):
                metadata = extract_metadata(file_path)
            canons.append(
                build_inventory_entry(
                    base_path,
                    rel_path,
                    existing_entry,
                    metadata=metadata,
                )
            )
            discovered_paths.add(existing_entry["path"])
    
    # Scan governance/canon directory
    canon_dir = base_path / "governance" / "canon"
    if canon_dir.exists():
        for file_path in sorted(canon_dir.rglob("*.md")):
            if file_path.name.startswith("."):
                continue
                
            rel_path = file_path.relative_to(base_path)
            if str(rel_path) in discovered_paths:
                continue
            
            print(f"  Processing: {rel_path}")
            metadata = extract_metadata(file_path)
            existing_entry = existing_map.get(str(rel_path))
            canons.append(
                build_inventory_entry(
                    base_path,
                    rel_path,
                    existing_entry,
                    metadata=metadata,
                    default_type="canon",
                )
            )
            discovered_paths.add(str(rel_path))
    
    # Scan governance/policy directory  
    policy_dir = base_path / "governance" / "policy"
    if policy_dir.exists():
        for file_path in sorted(policy_dir.rglob("*.md")):
            if file_path.name.startswith("."):
                continue
                
            rel_path = file_path.relative_to(base_path)
            if str(rel_path) in discovered_paths:
                continue
            
            print(f"  Processing: {rel_path}")
            metadata = extract_metadata(file_path)
            existing_entry = existing_map.get(str(rel_path))
            canons.append(
                build_inventory_entry(
                    base_path,
                    rel_path,
                    existing_entry,
                    metadata=metadata,
                    default_type="policy",
                )
            )
            discovered_paths.add(str(rel_path))

    if existing_inventory is not None:
        missing_paths = sorted(registered_paths - discovered_paths)
        if missing_paths:
            raise RuntimeError(
                "Registered inventory paths are missing from the repository: "
                f"{', '.join(missing_paths)}"
            )
    
    return canons


def load_existing_inventory(base_path: Path) -> Optional[Dict]:
    """Load existing CANON_INVENTORY.json if it exists."""
    inventory_path = base_path / "governance" / "CANON_INVENTORY.json"
    if inventory_path.exists():
        try:
            with open(inventory_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"  Warning: Could not load existing inventory: {e}")
    return None


def generate_inventory(base_path: Path) -> Dict:
    """Generate the complete CANON_INVENTORY.json structure."""
    # Load existing inventory to preserve layer_down_status
    print("Loading existing inventory...")
    existing_inventory = load_existing_inventory(base_path)
    if existing_inventory:
        print(f"  Found existing inventory with {existing_inventory.get('total_canons', 0)} canons")
    
    print("\nScanning governance directory for canon files...")
    canons = scan_governance_directory(base_path, existing_inventory)
    
    # Derive timestamps from canonical content history so fixed repository state
    # always produces byte-identical output.
    generated_at = deterministic_generation_time(base_path, canons)
    inventory = {
        "version": "1.0.0",
        "last_updated": generated_at.strftime("%Y-%m-%d"),
        "total_canons": len(canons),
        "generation_timestamp": generated_at.strftime("%Y-%m-%dT%H:%M:%SZ"),
        "canons": canons,
    }
    
    return inventory


def save_inventory(inventory: Dict, output_path: Path):
    """Save inventory to JSON file."""
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(inventory, f, indent=2, ensure_ascii=False)
    print(f"\n✓ Inventory saved to {output_path}")


def main():
    """Main entry point."""
    base_path = Path(__file__).parent.parent
    output_path = base_path / "governance" / "CANON_INVENTORY.json"
    
    print("="*70)
    print("CANON_INVENTORY.json Regeneration")
    print("="*70)
    print(f"Base path: {base_path}")
    print(f"Output: {output_path}")
    print()
    
    # Generate inventory
    inventory = generate_inventory(base_path)
    
    # Save to file
    save_inventory(inventory, output_path)
    
    # Print summary
    print("\n" + "="*70)
    print("SUMMARY")
    print("="*70)
    print(f"Total canons: {inventory['total_canons']}")
    print(f"Last updated: {inventory['last_updated']}")
    print(f"Generation timestamp: {inventory['generation_timestamp']}")
    
    # Count by layer_down_status
    public_api = sum(1 for c in inventory['canons'] if c.get('layer_down_status') == 'PUBLIC_API')
    internal = sum(1 for c in inventory['canons'] if c.get('layer_down_status') == 'INTERNAL')
    optional = sum(1 for c in inventory['canons'] if c.get('layer_down_status') == 'OPTIONAL')
    
    print(f"\nBy layer_down_status:")
    print(f"  PUBLIC_API: {public_api}")
    print(f"  INTERNAL:   {internal}")
    print(f"  OPTIONAL:   {optional}")
    print("="*70)


if __name__ == "__main__":
    main()
