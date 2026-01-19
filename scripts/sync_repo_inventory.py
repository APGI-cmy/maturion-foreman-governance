#!/usr/bin/env python3
"""
Governance Alignment Inventory Sync Script

This script synchronizes a repository's governance alignment inventory by:
1. Reading the central CANON_INVENTORY.json from the governance repository
2. Scanning the local governance/canon/ directory
3. Comparing to identify present/missing canons
4. Generating or updating GOVERNANCE_ALIGNMENT_INVENTORY.json
5. Reporting compliance status

Usage:
    python sync_repo_inventory.py [--repo-root PATH] [--governance-source PATH]
"""

import argparse
import hashlib
import json
import os
import sys
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional

# Constants
SHA256_TRUNCATE_LENGTH = 12  # Consistent with CANON_INVENTORY.json format


def calculate_sha256(file_path: Path) -> str:
    """Calculate SHA256 hash of a file."""
    sha256_hash = hashlib.sha256()
    with open(file_path, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()[:SHA256_TRUNCATE_LENGTH]


def load_central_inventory(governance_source_path: Path) -> Dict:
    """Load the central CANON_INVENTORY.json from governance repository."""
    inventory_path = governance_source_path / "governance" / "CANON_INVENTORY.json"
    
    if not inventory_path.exists():
        print(f"ERROR: Central CANON_INVENTORY.json not found at {inventory_path}")
        sys.exit(1)
    
    with open(inventory_path, 'r') as f:
        return json.load(f)


def scan_local_canons(repo_root: Path) -> Dict[str, Dict]:
    """Scan local governance/canon/ directory for present canons."""
    local_canon_dir = repo_root / "governance" / "canon"
    local_canons = {}
    
    if not local_canon_dir.exists():
        print(f"WARNING: Local canon directory not found at {local_canon_dir}")
        return local_canons
    
    for canon_file in local_canon_dir.glob("*.md"):
        filename = canon_file.name
        sha256 = calculate_sha256(canon_file)
        
        # Get file modification time for layered_down_date
        mtime = datetime.fromtimestamp(canon_file.stat().st_mtime)
        layered_down_date = mtime.strftime("%Y-%m-%d")
        
        local_canons[filename] = {
            "path": str(canon_file.relative_to(repo_root)),
            "sha256": sha256,
            "layered_down_date": layered_down_date
        }
    
    return local_canons


def determine_status(local_hash: str, central_hash: str) -> str:
    """Determine the status of a canon file."""
    if local_hash == central_hash:
        return "UP_TO_DATE"
    else:
        return "MODIFIED"


def determine_classification(layer_down_status: str) -> str:
    """Map layer_down_status to classification."""
    if layer_down_status == "PUBLIC_API":
        return "PUBLIC_API"
    elif layer_down_status == "INTERNAL":
        return "REPO_SPECIFIC"
    elif layer_down_status == "OPTIONAL":
        return "OPTIONAL"
    else:
        return "OPTIONAL"


def is_mandatory_for_repo(layer_down_status: str, repo_type: str = "application") -> bool:
    """
    Determine if a canon is mandatory for a specific repository type.
    
    Args:
        layer_down_status: The layer_down_status from central inventory
        repo_type: Type of repository ("application", "governance", "infrastructure")
    
    Returns:
        True if mandatory for this repository type
    """
    # PUBLIC_API canons are mandatory for all application repositories
    if layer_down_status == "PUBLIC_API":
        return True
    
    # Repository-specific rules can be added here
    # For now, only PUBLIC_API is mandatory
    return False


def determine_priority(layer_down_status: str, mandatory: bool) -> str:
    """Determine priority based on layer_down_status and mandatory flag."""
    if layer_down_status == "PUBLIC_API" and mandatory:
        return "CRITICAL"
    elif layer_down_status == "PUBLIC_API":
        return "HIGH"
    elif mandatory:
        return "HIGH"
    else:
        return "MEDIUM"


def detect_repo_name(repo_root: Path) -> Optional[str]:
    """Attempt to auto-detect repository name from git remote."""
    try:
        import subprocess
        result = subprocess.run(
            ["git", "remote", "get-url", "origin"],
            cwd=repo_root,
            capture_output=True,
            text=True,
            timeout=5
        )
        if result.returncode == 0:
            url = result.stdout.strip()
            # Extract owner/repo from GitHub URL
            if "github.com" in url:
                parts = url.rstrip("/").split("/")
                if len(parts) >= 2:
                    repo = parts[-1].replace(".git", "")
                    owner = parts[-2].split(":")[-1]  # Handle git@ format
                    return f"{owner}/{repo}"
    except Exception:
        pass
    return None


def generate_inventory(
    repo_root: Path,
    governance_source_path: Path,
    repo_name: Optional[str] = None
) -> Dict:
    """Generate the governance alignment inventory."""
    
    # Load central inventory
    central_inventory = load_central_inventory(governance_source_path)
    
    # Scan local canons
    local_canons = scan_local_canons(repo_root)
    
    # Determine repository name
    if repo_name is None:
        repo_name = detect_repo_name(repo_root)
        if repo_name is None:
            repo_name = "<owner>/<repo>"
    
    # Initialize inventory structure
    inventory = {
        "repository": repo_name,
        "last_sync": datetime.now().strftime("%Y-%m-%d"),
        "governance_source": "APGI-cmy/maturion-foreman-governance",
        "canonical_inventory_version": central_inventory.get("version", "1.0.0"),
        "total_canons_required": 0,
        "canons_present": 0,
        "coverage_percentage": 0.0,
        "layered_down": [],
        "missing": []
    }
    
    # Process each canon from central inventory
    for canon in central_inventory.get("canons", []):
        filename = canon.get("filename", "")
        
        # Skip non-canon entries (policy, etc.) or determine if they should be tracked
        # For now, only track canon type
        if canon.get("type") != "canon":
            continue
        
        layer_down_status = canon.get("layer_down_status", "OPTIONAL")
        
        # Determine if this canon is mandatory for this repository
        # Uses configurable logic based on repository type
        mandatory = is_mandatory_for_repo(layer_down_status)
        
        if mandatory:
            inventory["total_canons_required"] += 1
        
        if filename in local_canons:
            # Canon is present locally
            local_info = local_canons[filename]
            
            inventory["layered_down"].append({
                "id": filename,
                "path": local_info["path"],
                "source_version": canon.get("version", "unknown"),
                "layered_down_date": local_info["layered_down_date"],
                "sha256": local_info["sha256"],
                "status": determine_status(local_info["sha256"], canon.get("file_hash", ""))
            })
            
            if mandatory:
                inventory["canons_present"] += 1
        else:
            # Canon is missing
            if mandatory or layer_down_status == "PUBLIC_API":
                inventory["missing"].append({
                    "id": filename,
                    "classification": determine_classification(layer_down_status),
                    "mandatory": mandatory,
                    "priority": determine_priority(layer_down_status, mandatory)
                })
    
    # Calculate coverage percentage
    if inventory["total_canons_required"] > 0:
        inventory["coverage_percentage"] = round(
            (inventory["canons_present"] / inventory["total_canons_required"]) * 100,
            2
        )
    
    return inventory


def save_inventory(inventory: Dict, output_path: Path):
    """Save the inventory to a JSON file."""
    with open(output_path, 'w') as f:
        json.dump(inventory, f, indent=2)
    print(f"✓ Inventory saved to {output_path}")


def print_compliance_report(inventory: Dict):
    """Print a compliance status report."""
    print("\n" + "="*60)
    print("GOVERNANCE ALIGNMENT INVENTORY - COMPLIANCE REPORT")
    print("="*60)
    print(f"Repository:        {inventory['repository']}")
    print(f"Last Sync:         {inventory['last_sync']}")
    print(f"Governance Source: {inventory['governance_source']}")
    print(f"Central Version:   {inventory['canonical_inventory_version']}")
    print("-"*60)
    print(f"Total Required:    {inventory['total_canons_required']}")
    print(f"Canons Present:    {inventory['canons_present']}")
    print(f"Coverage:          {inventory['coverage_percentage']}%")
    print("-"*60)
    print(f"Layered Down:      {len(inventory['layered_down'])} canons")
    print(f"Missing:           {len(inventory['missing'])} canons")
    
    if inventory['missing']:
        print("\nMISSING CANONS:")
        for missing in inventory['missing']:
            print(f"  - {missing['id']} ({missing['priority']}, mandatory={missing['mandatory']})")
    
    # Count status breakdown
    up_to_date = sum(1 for c in inventory['layered_down'] if c['status'] == 'UP_TO_DATE')
    modified = sum(1 for c in inventory['layered_down'] if c['status'] == 'MODIFIED')
    
    if inventory['layered_down']:
        print(f"\nSTATUS BREAKDOWN:")
        print(f"  - UP_TO_DATE: {up_to_date}")
        print(f"  - MODIFIED:   {modified}")
    
    print("="*60 + "\n")


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description="Synchronize governance alignment inventory"
    )
    parser.add_argument(
        "--repo-root",
        type=Path,
        default=Path.cwd(),
        help="Root directory of the repository (default: current directory)"
    )
    parser.add_argument(
        "--governance-source",
        type=Path,
        help="Path to governance repository (default: same as repo-root for governance repo itself)"
    )
    parser.add_argument(
        "--repo-name",
        type=str,
        help="Repository name in owner/repo format (default: auto-detect or use placeholder)"
    )
    parser.add_argument(
        "--output",
        type=Path,
        help="Output path for inventory file (default: <repo-root>/GOVERNANCE_ALIGNMENT_INVENTORY.json)"
    )
    parser.add_argument(
        "--strict",
        action="store_true",
        help="Fail with exit code 1 if coverage is below 100% (useful for CI enforcement)"
    )
    
    args = parser.parse_args()
    
    # Set governance source path
    if args.governance_source is None:
        # Assume we're in the governance repo itself or it's the same as repo-root
        args.governance_source = args.repo_root
    
    # Set output path
    if args.output is None:
        args.output = args.repo_root / "GOVERNANCE_ALIGNMENT_INVENTORY.json"
    
    print(f"Repo Root:         {args.repo_root}")
    print(f"Governance Source: {args.governance_source}")
    print(f"Output File:       {args.output}")
    print()
    
    # Generate inventory
    inventory = generate_inventory(
        repo_root=args.repo_root,
        governance_source_path=args.governance_source,
        repo_name=args.repo_name
    )
    
    # Save inventory
    save_inventory(inventory, args.output)
    
    # Print compliance report
    print_compliance_report(inventory)
    
    # Exit with appropriate code
    if inventory['coverage_percentage'] < 100:
        print("⚠ WARNING: Governance alignment is incomplete")
        if args.strict:
            print("ERROR: --strict mode enabled, failing due to incomplete coverage")
            sys.exit(1)
        else:
            sys.exit(0)  # Don't fail, just warn
    else:
        print("✓ SUCCESS: Full governance alignment achieved")
        sys.exit(0)


if __name__ == "__main__":
    main()
