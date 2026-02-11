# Execution Halt Directory

This directory contains active execution halt reports per the STOP-AND-FIX doctrine.

## Current Status
✅ **NO ACTIVE HALTS** - Directory empty (all historical reports archived)

## Historical Reports
See `.archive/` for historical halt reports:
- `ANNEX_1_EXECUTION_HALT_REPORT.md` (2025-12-13) - Zero test debt violation (RESOLVED)
- `ANNEX_1_INFRASTRUCTURE_GAP_REPORT.md` (2025-12-14) - MCP infrastructure gap (RESOLVED)

## Purpose
When Foreman or other agents encounter constitutional boundary conditions that prevent execution, they create halt reports here. The presence of files in this directory (excluding README.md and .archive/) blocks PR merges until conditions are resolved.

## Resolution Process
1. Review halt report
2. Resolve underlying condition
3. Archive report to `.archive/`
4. Verify execution-halt/ is empty (except README.md)
5. Gates will pass

**Authority**: STOP_AND_FIX_DOCTRINE.md, CS6_EXECUTION_BOUNDARY.md
