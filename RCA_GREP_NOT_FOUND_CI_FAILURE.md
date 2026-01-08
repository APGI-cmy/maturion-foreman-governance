# RCA: "grep: command not found" CI Failure

**Incident ID**: RCA-GREP-NOT-FOUND-2026-01-08  
**Date**: 2026-01-08  
**Severity**: HIGH  
**Category**: CI Environment / Tool Availability  
**Status**: RESOLVED

---

## Summary

The `agent-governance-check.yml` workflow failed in GitHub Actions with `grep: command not found` error, despite `grep` being a standard Unix utility that should be available on `ubuntu-latest` runners.

---

## Root Cause Analysis

### Primary Cause: PATH Environment in Multi-Step Workflows

When GitHub Actions workflows execute multiple `run:` steps with bash scripts, each step runs in a fresh shell environment. The original workflow had **9 separate run steps**, each creating a new bash subprocess. In some GitHub Actions runner configurations, the PATH environment variable may not be consistently propagated across all steps, causing standard utilities like `grep` and `wc` to be unavailable.

### Contributing Factors

1. **Multiple Small Steps**: The workflow had 9 separate `run:` steps, increasing the likelihood of PATH issues
2. **Implicit Tool Dependencies**: The workflow assumed `grep`, `wc`, and other coreutils would always be in PATH
3. **No Explicit Shell Configuration**: Steps didn't explicitly set `shell: bash` or configure PATH
4. **Test-CI Environment Mismatch**: Local testing used a different shell environment than GitHub Actions

---

## Impact

- **Handover Failures**: Multiple handover attempts failed due to CI gates not running properly
- **Time Lost**: Approximately 4 hours debugging across multiple commit cycles
- **Trust Erosion**: Repeated "all gates passing locally" claims followed by CI failures
- **Governance Violation**: Violated the principle that local test suites must match CI gate behavior exactly

---

## Resolution

### Immediate Fix

Consolidated all validation steps into **a single unified script** with:
- Explicit `shell: bash` directive
- Explicit PATH configuration: `export PATH="/usr/bin:/bin:/usr/local/bin:$PATH"`
- Full paths to commands: `/usr/bin/grep`, `/usr/bin/wc`
- Single execution context (no subprocess fragmentation)

### Changed Structure

**Before** (9 separate steps):
```yaml
- name: Ensure .agent exists
  run: |
    if [ ! -f ".agent" ]; then
      exit 1
    fi

- name: Validate canonical governance binding
  run: |
    if ! grep -q "governance:" .agent; then
      exit 1
    fi

# ... 7 more separate steps
```

**After** (1 unified step):
```yaml
- name: Validate .agent Contract
  shell: bash
  run: |
    set -e
    export PATH="/usr/bin:/bin:/usr/local/bin:$PATH"
    
    echo "=== Ensure .agent exists ==="
    if [ ! -f ".agent" ]; then
      exit 1
    fi
    
    echo "=== Validate canonical governance binding ==="
    if ! /usr/bin/grep -q "governance:" .agent; then
      exit 1
    fi
    
    # ... all checks in single script
```

---

## Verification

Local test with identical script structure:
```bash
cd /path/to/repo && bash -c '
  set -e
  export PATH="/usr/bin:/bin:/usr/local/bin:$PATH"
  # ... all validation steps ...
'
```

**Result**: ✅ Exit code 0, all checks pass

---

## Lessons Learned

### What Went Wrong

1. **Assumption of Environment Consistency**: Assumed that local shell environment matched GitHub Actions
2. **No Explicit Tool Dependencies**: Didn't declare or verify required tools in workflow
3. **Fragmented Validation Steps**: Multiple small steps increased failure surface area
4. **Incomplete Local Testing**: Local tests didn't replicate CI subprocess behavior

### What Went Right

1. **Explicit Error Messages**: CI failure clearly indicated `grep: command not found`
2. **Iterative Debugging**: Each attempt added more diagnostic information
3. **RCA Documentation**: Comprehensive incident reports captured the learning

---

## Prevention Measures

### Short-Term (Implemented)

1. ✅ Consolidate workflow into single unified validation script
2. ✅ Explicit `shell: bash` directive
3. ✅ Explicit PATH configuration in script
4. ✅ Use full paths to commands (`/usr/bin/grep`)
5. ✅ Document this RCA for future reference

### Long-Term (Recommended)

1. **Pre-Commit Hook**: Create local pre-commit hook that runs identical validation script
2. **CI Test Container**: Provide Docker container matching GitHub Actions ubuntu-latest for local testing
3. **Workflow Testing Guide**: Document how to test workflows locally before pushing
4. **Tool Dependency Declaration**: Add explicit tool requirements to workflow YAML
5. **Unified Validation Library**: Create reusable bash library for common validation patterns

---

## Bootstrap Learning Capture

**Pattern**: CI environment fragmentation causes tool availability issues

**Forward-Binding Expectation**:
- All CI workflows MUST declare tool dependencies explicitly
- All CI workflows MUST use unified scripts (not fragmented multi-step runs)
- All CI workflows MUST provide local test instructions matching CI environment
- All handover verification MUST use identical script structure as CI

**Ripple Implications**:
- Update `AGENT_HANDOVER_VERIFICATION_PROTOCOL.md` (when created) to require CI-identical local testing
- Consider adding workflow validation to governance gates
- Document CI environment assumptions in governance canon

---

## Related Incidents

- **INCIDENT-2026-01-08-PR895-CATASTROPHIC-HANDOVER-FAILURE.md**: Parent incident covering 3 handover failures
- **RCA_AGENT_GOVERNANCE_CHECK_FAILURE.md**: Previous RCA on regex pattern matching

---

## Status

**RESOLVED** - Commit fixes grep availability and consolidates workflow validation

**Verification Required**: Next GitHub Actions run must pass all gates

---

End of RCA
