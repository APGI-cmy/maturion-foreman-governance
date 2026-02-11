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
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional


def calculate_sha256(file_path: Path, truncate: int = 12) -> tuple[str, str]:
    """Calculate both truncated and full SHA256 hash of a file."""
    sha256_hash = hashlib.sha256()
    with open(file_path, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    full_hash = sha256_hash.hexdigest()
    return full_hash[:truncate], full_hash


def extract_metadata(file_path: Path) -> Dict:
    """Extract metadata from a canon file's header."""
    metadata = {
        "version": "unknown",
        "effective_date": "unknown",
        "description": "",
        "layer_down_status": "INTERNAL",
    }
    
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read(2000)  # Read first 2000 chars for metadata
            
        # Extract version
        version_match = re.search(r'\*\*Version\*\*:\s*([^\n]+)', content, re.IGNORECASE)
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
        purpose_match = re.search(r'##\s*1\.\s*Purpose\s*\n+(.*?)(?:\n\n|\n#)', content, re.DOTALL)
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


def scan_governance_directory(base_path: Path, existing_inventory: Optional[Dict] = None) -> List[Dict]:
    """Scan governance directory for canon files."""
    canons = []
    
    # Build lookup map from existing inventory
    existing_map = {}
    if existing_inventory:
        for canon in existing_inventory.get("canons", []):
            key = canon.get("path", "")
            existing_map[key] = canon
    
    # Scan governance/canon directory
    canon_dir = base_path / "governance" / "canon"
    if canon_dir.exists():
        for file_path in sorted(canon_dir.rglob("*.md")):
            if file_path.name.startswith("."):
                continue
                
            rel_path = file_path.relative_to(base_path)
            filename = file_path.name
            
            print(f"  Processing: {rel_path}")
            
            # Calculate hashes
            truncated_hash, full_hash = calculate_sha256(file_path)
            
            # Extract metadata
            metadata = extract_metadata(file_path)
            
            # Preserve layer_down_status from existing inventory if available
            existing_entry = existing_map.get(str(rel_path))
            if existing_entry:
                layer_down_status = existing_entry.get("layer_down_status", metadata["layer_down_status"])
            else:
                layer_down_status = metadata["layer_down_status"]
            
            canon_entry = {
                "filename": filename,
                "version": metadata["version"],
                "file_hash": truncated_hash,
                "effective_date": metadata["effective_date"],
                "description": metadata["description"] or f"Canonical governance document: {filename.replace('.md', '')}",
                "type": "canon",
                "path": str(rel_path),
                "layer_down_status": layer_down_status,
                "file_hash_sha256": full_hash,
            }
            
            canons.append(canon_entry)
    
    # Scan governance/policy directory  
    policy_dir = base_path / "governance" / "policy"
    if policy_dir.exists():
        for file_path in sorted(policy_dir.rglob("*.md")):
            if file_path.name.startswith("."):
                continue
                
            rel_path = file_path.relative_to(base_path)
            filename = file_path.name
            
            print(f"  Processing: {rel_path}")
            
            # Calculate hashes
            truncated_hash, full_hash = calculate_sha256(file_path)
            
            # Extract metadata
            metadata = extract_metadata(file_path)
            
            # Preserve layer_down_status from existing inventory if available
            existing_entry = existing_map.get(str(rel_path))
            if existing_entry:
                layer_down_status = existing_entry.get("layer_down_status", metadata["layer_down_status"])
            else:
                layer_down_status = metadata["layer_down_status"]
            
            canon_entry = {
                "filename": filename,
                "version": metadata["version"],
                "file_hash": truncated_hash,
                "effective_date": metadata["effective_date"],
                "description": metadata["description"] or f"Canonical governance document: {filename.replace('.md', '')}",
                "type": "policy",
                "path": str(rel_path),
                "layer_down_status": layer_down_status,
                "file_hash_sha256": full_hash,
            }
            
            canons.append(canon_entry)
    
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
    
    inventory = {
        "version": "1.0.0",
        "last_updated": datetime.now().strftime("%Y-%m-%d"),
        "total_canons": len(canons),
        "generation_timestamp": datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ"),
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
