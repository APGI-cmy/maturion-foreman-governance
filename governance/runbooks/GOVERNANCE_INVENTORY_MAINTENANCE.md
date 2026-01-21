# Governance Inventory Maintenance Runbook

**Version**: 1.1.0  
**Effective Date**: 2026-01-19  
**Updated**: 2026-01-21  
**Authority**: PR APGI-cmy/maturion-foreman-governance#983

## Purpose

This runbook documents the complete maintenance workflow for repository-level governance alignment inventories. These inventories track which canonical governance documents have been layered down from the central governance repository and which are missing.

## Overview

Each consumer repository (e.g., `office-app`, `PartPulse`, `R_Roster`) maintains its own `GOVERNANCE_ALIGNMENT_INVENTORY.json` file that:

- Tracks which canons are present locally
- Identifies missing mandatory canons
- Calculates governance coverage percentage
- Detects version drift through SHA256 hashing
- Provides compliance status for audit readiness

## Prerequisites

- Python 3.6 or higher
- Access to the central governance repository (`APGI-cmy/maturion-foreman-governance`)
- Local clone of the consumer repository

## Workflow 1: Initialize Inventory in a New Repository

### Step 1: Clone Governance Repository

If the governance repository is not already available locally:

```bash
cd /path/to/workspace
git clone https://github.com/APGI-cmy/maturion-foreman-governance.git
```

### Step 2: Navigate to Consumer Repository

```bash
cd /path/to/consumer-repo
```

### Step 3: Run Sync Script for First Time

```bash
python /path/to/maturion-foreman-governance/scripts/sync_repo_inventory.py \
  --repo-root . \
  --governance-source /path/to/maturion-foreman-governance \
  --repo-name "APGI-cmy/office-app"
```

**Parameters**:
- `--repo-root`: Path to the consumer repository (use `.` if running from within it)
- `--governance-source`: Path to the local governance repository clone
- `--repo-name`: Repository identifier in `owner/repo` format

### Step 4: Review Generated Inventory

The script generates `GOVERNANCE_ALIGNMENT_INVENTORY.json` in the repository root and displays a compliance report:

```
============================================================
GOVERNANCE ALIGNMENT INVENTORY - COMPLIANCE REPORT
============================================================
Repository:        APGI-cmy/office-app
Last Sync:         2026-01-19
Governance Source: APGI-cmy/maturion-foreman-governance
Central Version:   1.0.0
------------------------------------------------------------
Total Required:    68
Canons Present:    45
Coverage:          66.18%
------------------------------------------------------------
Layered Down:      45 canons
Missing:           23 canons
```

### Step 5: Commit Inventory File

```bash
git add GOVERNANCE_ALIGNMENT_INVENTORY.json
git commit -m "Initialize governance alignment inventory"
git push
```

## Workflow 2: Update Inventory After Layer-Down

When new canons are layered down from the governance repository, update the inventory:

### Step 1: Layer Down New Canons

Follow the standard layer-down protocol to copy canons from governance repository to your local `governance/canon/` directory.

### Step 2: Run Sync Script

```bash
python /path/to/maturion-foreman-governance/scripts/sync_repo_inventory.py \
  --repo-root . \
  --governance-source /path/to/maturion-foreman-governance \
  --repo-name "APGI-cmy/office-app"
```

### Step 3: Review Changes

The script will:
- Detect newly layered down canons
- Update the `layered_down` array
- Remove items from the `missing` array
- Recalculate coverage percentage
- Update `last_sync` timestamp

### Step 4: Commit Updated Inventory

```bash
git add GOVERNANCE_ALIGNMENT_INVENTORY.json
git commit -m "Update governance inventory after layer-down"
git push
```

## Workflow 3: Validate Compliance

### Manual Validation

Review the inventory file to check:

1. **Coverage Percentage**: Target is 100% for production-ready repositories
2. **Missing Canons**: Prioritize by `priority` field (CRITICAL > HIGH > MEDIUM > LOW)
3. **Modified Canons**: Check `status` field - `MODIFIED` indicates local changes
4. **Version Drift**: Compare `source_version` in inventory with central versions

### Automated Validation

Run the sync script and check exit code:

```bash
python /path/to/maturion-foreman-governance/scripts/sync_repo_inventory.py \
  --repo-root . \
  --governance-source /path/to/maturion-foreman-governance \
  --repo-name "APGI-cmy/office-app"

echo "Exit code: $?"
```

**Exit Codes**:
- `0`: Success (warning if coverage < 100%)
- `1`: Error (e.g., central inventory not found)

## Workflow 4: CI Integration

### GitHub Actions Example

Create `.github/workflows/governance-compliance.yml`:

```yaml
name: Governance Compliance Check

on:
  pull_request:
    paths:
      - 'governance/**'
  workflow_dispatch:

jobs:
  check-governance-alignment:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      
      - name: Checkout governance repository
        uses: actions/checkout@v3
        with:
          repository: APGI-cmy/maturion-foreman-governance
          path: governance-repo
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.9'
      
      - name: Sync governance inventory
        run: |
          python governance-repo/scripts/sync_repo_inventory.py \
            --repo-root . \
            --governance-source governance-repo \
            --repo-name "${{ github.repository }}"
      
      - name: Check for inventory changes
        run: |
          if git diff --exit-code GOVERNANCE_ALIGNMENT_INVENTORY.json; then
            echo "✓ Inventory is up to date"
          else
            echo "⚠ Inventory has changed - please commit updates"
            git diff GOVERNANCE_ALIGNMENT_INVENTORY.json
            exit 1
          fi
      
      - name: Upload inventory artifact
        uses: actions/upload-artifact@v3
        with:
          name: governance-inventory
          path: GOVERNANCE_ALIGNMENT_INVENTORY.json
```

### Pre-commit Hook Example

Create `.git/hooks/pre-commit`:

```bash
#!/bin/bash
# Pre-commit hook: Validate governance alignment

# Check if governance files changed
if git diff --cached --name-only | grep -q "^governance/"; then
    echo "Governance files changed - validating alignment..."
    
    python /path/to/governance-repo/scripts/sync_repo_inventory.py \
        --repo-root . \
        --governance-source /path/to/governance-repo \
        --repo-name "APGI-cmy/$(basename $(pwd))"
    
    if [ $? -ne 0 ]; then
        echo "ERROR: Governance alignment validation failed"
        exit 1
    fi
    
    # Auto-stage inventory if it changed
    if git diff GOVERNANCE_ALIGNMENT_INVENTORY.json > /dev/null; then
        git add GOVERNANCE_ALIGNMENT_INVENTORY.json
        echo "✓ Updated governance inventory (auto-staged)"
    fi
fi

exit 0
```

Make it executable:

```bash
chmod +x .git/hooks/pre-commit
```

## Script Reference

### Command-Line Arguments

```
usage: sync_repo_inventory.py [-h] [--repo-root PATH] 
                                    [--governance-source PATH]
                                    [--repo-name REPO_NAME] 
                                    [--output PATH]

Synchronize governance alignment inventory

optional arguments:
  -h, --help            show this help message and exit
  --repo-root PATH      Root directory of the repository (default: current directory)
  --governance-source PATH
                        Path to governance repository (default: same as repo-root)
  --repo-name REPO_NAME
                        Repository name in owner/repo format (default: <owner>/<repo>)
  --output PATH         Output path for inventory file (default: <repo-root>/GOVERNANCE_ALIGNMENT_INVENTORY.json)
```

### Output Schema

The generated `GOVERNANCE_ALIGNMENT_INVENTORY.json` follows this schema:

```json
{
  "repository": "APGI-cmy/office-app",
  "last_sync": "2026-01-19",
  "governance_source": "APGI-cmy/maturion-foreman-governance",
  "canonical_inventory_version": "1.0.0",
  "total_canons_required": 68,
  "canons_present": 68,
  "coverage_percentage": 100.0,
  "layered_down": [
    {
      "id": "BUILD_PHILOSOPHY.md",
      "path": "governance/canon/BUILD_PHILOSOPHY.md",
      "source_version": "1.0.0",
      "layered_down_date": "2026-01-15",
      "sha256": "abc123def456",
      "status": "UP_TO_DATE"
    }
  ],
  "missing": [
    {
      "id": "SOME_CANON.md",
      "classification": "PUBLIC_API",
      "mandatory": true,
      "priority": "CRITICAL"
    }
  ]
}
```

### Status Values

- `UP_TO_DATE`: Local file matches central repository (SHA256 hash matches)
- `MODIFIED`: Local file has been modified (SHA256 hash differs)

### Classification Values

- `PUBLIC_API`: Canon is required for all application repositories
- `REPO_SPECIFIC`: Canon is specific to certain repository types
- `OPTIONAL`: Canon is optional for this repository type

### Priority Values

- `CRITICAL`: Must be addressed immediately (blocking for production)
- `HIGH`: Should be addressed in next sprint
- `MEDIUM`: Should be addressed when convenient
- `LOW`: Nice to have, address as time permits

## Troubleshooting

### Issue: Central CANON_INVENTORY.json Not Found

**Error**: `ERROR: Central CANON_INVENTORY.json not found at <path>`

**Solution**: 
1. Verify governance repository path is correct
2. Ensure governance repository is up to date: `git pull`
3. Check that `governance/CANON_INVENTORY.json` exists in governance repo

### Issue: Local Canon Directory Not Found

**Warning**: `WARNING: Local canon directory not found at <path>`

**Solution**:
1. Create the directory: `mkdir -p governance/canon`
2. This is expected for new repositories before first layer-down

### Issue: Coverage Below 100%

**Warning**: `⚠ WARNING: Governance alignment is incomplete`

**Solution**:
1. Review `missing` array in inventory file
2. Prioritize by `priority` field
3. Layer down missing canons from governance repository
4. Re-run sync script

### Issue: Modified Canon Detected

**Status**: `MODIFIED` in `status` field

**Solution**:
1. Determine if local modifications are intentional
2. If intentional: Document changes and create ripple signal
3. If unintentional: Re-layer down from governance repository
4. Re-run sync script to verify

## Best Practices

1. **Regular Syncs**: Run inventory sync at least monthly or after governance updates
2. **Pre-PR Validation**: Always sync before creating PRs that touch governance files
3. **Audit Trail**: Commit inventory changes with descriptive messages
4. **Coverage Goals**: Target 100% coverage for production repositories
5. **Version Tracking**: Monitor `canonical_inventory_version` for major governance updates
6. **CI Integration**: Automate inventory validation in CI pipeline
7. **Documentation**: Keep local copy of this runbook in each consumer repository

## Related Documents

- `governance/canon/GOVERNANCE_RIPPLE_MODEL.md` - Ripple propagation policy (mandates inventory maintenance)
- `governance/canon/CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md` - Layer-down process
- `governance/canon/GOVERNANCE_LAYERDOWN_CONTRACT.md` - Layer-down requirements
- `governance/templates/CANON_CREATION_AND_PROPAGATION_CHECKLIST.md` - Complete workflow with inventory enforcement
- `governance/CANON_INVENTORY.json` - Central inventory source
- `governance/templates/GOVERNANCE_ALIGNMENT_INVENTORY_TEMPLATE.json` - Inventory schema
- `.github/agents/governance-repo-administrator.agent.md` - Agent contract (inventory maintenance responsibilities)

## Change History

| Version | Date       | Changes                                    |
|---------|------------|--------------------------------------------|
| 1.0.0   | 2026-01-19 | Initial release - Complete workflow guide  |
| 1.1.0   | 2026-01-21 | Added policy integration references (GOVERNANCE_RIPPLE_MODEL, agent contract, workflow checklist) |

## Support

For issues or questions:
1. Review this runbook
2. Check related governance documents
3. Create issue in governance repository
4. Escalate to CS2 for policy questions

---

**Governance Authority**: APGI-cmy/maturion-foreman-governance  
**Document Type**: Operational Runbook  
**Maintenance**: Governance Repo Administrator
