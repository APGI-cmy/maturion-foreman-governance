# GSR-QA-STRICT-001: Strict Zero-Tolerance QA Governance Rule

**Rule ID**: GSR-QA-STRICT-001  
**Category**: Quality Assurance  
**Severity**: CRITICAL  
**Enforcement**: MANDATORY  
**Effective Date**: 2025-12-08  
**Supersedes**: All previous QA whitelisting policies  

## Summary

This Governance Supremacy Rule (GSR) establishes **STRICT ZERO-TOLERANCE** Quality Assurance enforcement across the entire Maturion Foreman ecosystem. NO whitelisting, NO exceptions, NO "acceptable" warnings.

## Mandate

### Core Principle

**ALL** errors, warnings, and anomalies detected by QIEL (Quality Integrity Enforcement Layer) are **BLOCKERS**. There are NO acceptable warnings.

### Strict Enforcement Rules

1. **NO WHITELISTING**
   - The `allowed-warnings.json` file is FORBIDDEN
   - No code may check against a whitelist of "acceptable" warnings
   - No patterns may be excluded from detection
   
2. **IMMEDIATE FAILURE**
   - QIEL MUST fail the moment ANY error is detected
   - QIEL MUST fail the moment ANY warning is detected
   - QIEL MUST fail the moment ANY drift warning appears
   - QIEL MUST fail the moment ANY QIW anomaly exists

3. **BLOCKING BEHAVIOR**
   - `blockOnCritical: true` (mandatory)
   - `blockOnErrors: true` (mandatory)
   - `blockOnWarnings: true` (mandatory - THIS IS NEW)
   - `errorThreshold: 1` (block on first error, not third)

4. **PR CREATION GATES**
   - Foreman MUST abort PR creation if QIEL fails
   - No PR may be created with failing tests
   - No PR may be created with build warnings
   - No PR may be created with lint errors
   - No PR may be created with QIW anomalies

5. **PIPELINE ALIGNMENT**
   - GitHub Merge Queue QIEL MUST use same configuration as Foreman QIEL
   - Zero drift between local and CI/CD environments
   - Configuration MUST be sourced from `lib/foreman/qiel-config.ts`

## Violations

### What Constitutes a Violation

1. **Whitelisting**: Any attempt to whitelist, skip, or ignore errors/warnings
2. **Soft Failures**: Allowing QIEL to "pass with warnings"
3. **Configuration Drift**: Different QIEL configs between environments
4. **PR Handoff**: Creating PRs when QIEL has failed
5. **Skip Behavior**: Using `--skip` flags to bypass checks

### Consequences

Violations of GSR-QA-STRICT-001 result in:

1. **Immediate Build Failure**: All builds fail until fixed
2. **PR Rejection**: PRs are auto-closed by merge queue
3. **QII Generation**: Quality Integrity Incidents are created
4. **Overnight Execution Block**: Automated execution halts
5. **Governance Escalation**: Issue escalated to governance review

## Implementation Requirements

### Code Changes Required

1. Remove `foreman/qa/allowed-warnings.json`
2. Remove whitelist loading from `lib/foreman/qa/log-parsing-qa.ts`
3. Remove whitelist parameters from `lib/foreman/qa/zero-warning-policy.ts`
4. Update `lib/foreman/qiel-config.ts`:
   - Set `blockOnWarnings: true`
   - Set `errorThreshold: 1`
5. Update `lib/foreman/watchdog/quality-integrity-watchdog.ts`:
   - Remove whitelisting recommendations
   - Enforce strict blocking
6. Update PR creation logic to abort on QIEL failure

### Documentation Requirements

1. Create this governance rule file
2. Create `docs/qa/STRICT_MODE.md` documentation
3. Update all references to "acceptable warnings"
4. Update QA philosophy documents

### Testing Requirements

1. ALL tests MUST pass under strict mode
2. NO whitelisted test outputs
3. NO "expected" errors in test logs
4. Update test assertions to expect strict enforcement

## Rationale

### Problem Statement

The previous QIEL implementation allowed whitelisting of test errors, meaning:

- QIEL could pass even when tests failed
- Foreman believed QA had passed locally
- GitHub blocked the merge in CI/CD
- QIW raised anomalies post-facto
- Dozens of Quality Integrity Incidents were created
- Overnight execution was blocked
- True North and One Build philosophies were violated

### Solution

Strict zero-tolerance eliminates this disconnect:

- If ANYTHING fails, QIEL fails
- If QIEL fails, PR is not created
- If PR is not created, no CI/CD misalignment occurs
- If no misalignment, no QIIs are generated
- If no QIIs, overnight execution proceeds smoothly

### Alignment with True North

This rule enforces:

1. **One Build**: Same result locally and in CI/CD
2. **Quality First**: No compromise on quality
3. **Fail Fast**: Detect issues immediately
4. **Zero Ambiguity**: Pass/fail is binary, no gray area
5. **Governance Supremacy**: GSR overrides all local preferences

## Monitoring & Compliance

### Automated Enforcement

- QIEL config validation on every build
- Drift detection between environments
- QIW monitoring of all pipelines
- Governance memory tracking of violations

### Compliance Reporting

- Weekly QIEL strict mode compliance report
- QII count must trend to zero
- Build success rate tracking
- PR rejection rate monitoring

## References

- **Related Rules**: 
  - GSR-001: Governance Supremacy
  - QIC: Quality Integrity Contract
- **Related Systems**:
  - QIEL: Quality Integrity Enforcement Layer
  - QIW: Quality Integrity Watchdog
  - QII: Quality Integrity Incidents
- **Documentation**:
  - `docs/qa/STRICT_MODE.md`
  - `foreman/qa/qa-philosophy.md`
  - `foreman/qa/quality-integrity-contract.md`

## Revision History

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2025-12-08 | 1.0.0 | Initial rule creation | Foreman Team |

---

**This is a Governance Supremacy Rule (GSR). It cannot be overridden by project preferences, developer convenience, or legacy practices. Compliance is MANDATORY.**
