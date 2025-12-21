# VERSIONING AND EVOLUTION GOVERNANCE

## Status
Canonical Governance Policy  
Version: v1  
Authority: Johan Ras  
Applies To: All Builds, All Applications, Foreman, Builders, Governance Administrator

---

## 1. Purpose

This policy defines versioning as a **governed, auditable lifecycle** that ensures:
- Build correctness is isolated per version
- QA evidence is version-specific and non-contaminating
- Learning carry-forward occurs without regression
- Evolution is intentional, traceable, and compliant

Versioning exists to uphold the **One-Time Build Law** across the entire lifecycle
of an application, from initial delivery through continuous evolution.

---

## 2. Canonical Authority

This policy implements requirements from:

**GOVERNANCE_PURPOSE_AND_SCOPE.md:**
- Section 10: "Versioning and Evolution" — mandates independent builds per version, QA evidence isolation, and intentional evolution
- Section 5.1-5.4: "The Build Model (End-to-End)" — requires independent build environments and delivery verification per version
- Section 3: "Build Philosophy (Foundational)" — requires One-Time Build correctness per version
- Section 7: "Learning and Continuous Improvement" — requires learning carry-forward without contaminating prior versions

**COMPLIANCE_AND_STANDARDS_GOVERNANCE.md:**
- Section 2: "Compliance Model" — requires evidence to be auditable and traceable per version
- Section 6: "Evidence Requirements" — requires timestamped, attributable, reproducible evidence per version
- Section 3.1: "ISO 27001" — requires version-specific security control evidence
- Section 3.2: "ISO 31000" — requires version-specific risk treatment records

---

## 3. What is a Version?

A **version** is a **discrete, immutable, independently verifiable state** of an application.

### Core Properties

1. **Immutability**  
   Once delivered and verified, a version's correctness assessment does not change retroactively.

2. **Independence**  
   Each version has its own:
   - Build environment
   - QA evidence
   - Effectiveness score
   - Architecture artifacts
   - Compliance evidence
   - Risk assessment

3. **Auditability**  
   Each version must be reproducibly verifiable through preserved evidence.

4. **Non-Contamination**  
   Failures, learning, or changes in one version do not retroactively affect prior versions' correctness status.

---

## 4. Version Lifecycle States

Every version MUST be in exactly one lifecycle state.

### 4.1 DRAFT
- Architecture is being compiled
- QA is being designed
- Not yet submitted for build

### 4.2 BUILDING
- Builder is actively implementing
- QA is being executed
- Pre-delivery validation in progress

### 4.3 VALIDATED
- All QA is green
- All governance gates passed
- Ready for Johan's UI verification

### 4.4 DELIVERED
- Johan has verified correctness via UI
- Version is in production or staged for production
- Evidence is complete and preserved

### 4.5 DEPRECATED
- Version is no longer actively maintained
- Superseded by a newer version
- Evidence remains available for audit
- Runtime use discouraged but not blocked

### 4.6 RETIRED
- Version is no longer supported
- Runtime deployment forbidden
- Evidence preserved for compliance audit only

---

## 5. Version Identification

Each version MUST have a unique, stable identifier.

### Required Format

Versions MUST follow semantic versioning (SemVer) principles:

```
<MAJOR>.<MINOR>.<PATCH>
```

- **MAJOR**: Breaking changes, incompatible API changes, or complete rewrites
- **MINOR**: New functionality added in a backward-compatible manner
- **PATCH**: Backward-compatible bug fixes or corrections to meet original requirements

### Build Identifier

Each version build MUST have a unique build identifier:

```
<APP_NAME>-v<VERSION>-build-<BUILD_ID>
```

Example: `foreman-office-v1.2.0-build-20231215-001`

---

## 6. Independent Build Per Version

**Core Invariant:** Each version MUST be built in a fully isolated environment.

### Isolation Requirements

1. **Environment Isolation**  
   - Separate Git branch or workspace
   - Separate deployment environment (pre-production)
   - Separate test data
   - No shared mutable state with other versions

2. **Architecture Isolation**  
   - Architecture artifacts stored per version
   - No retroactive architecture changes
   - Learning applied forward only

3. **QA Isolation**  
   - QA suites specific to version requirements
   - QA evidence stored per version
   - QA results do not affect prior versions

4. **Evidence Isolation**  
   - All compliance evidence timestamped and versioned
   - Evidence immutable once version is delivered
   - Audit trails preserved per version

---

## 7. QA and Evidence Per Version

### 7.1 QA Evidence Requirements

For each version, the following MUST be preserved:

- Architecture validation report
- QA test suite and results
- CI/CD gate logs
- Governance gate validation results
- Build effectiveness calculation
- Failure records (if any)
- Learning artifacts (if any)

### 7.2 Evidence Location

All version-specific evidence MUST be stored at:

```
architecture/builds/<build-id>/
```

Where `<build-id>` uniquely identifies the version build.

### 7.3 Evidence Immutability

Once a version reaches `DELIVERED` state:
- Evidence MUST NOT be modified
- Additional evidence MAY be added for audit purposes
- Failure records MUST NOT be deleted

---

## 8. Learning Carry-Forward Without Contamination

### 8.1 Forward-Only Learning

Learning from version N MUST be:
- Promoted to governance or architecture artifacts
- Available to version N+1 during architecture compilation
- Applied prospectively, never retroactively

### 8.2 Non-Contamination Rule

Learning from version N MUST NOT:
- Retroactively change version N-1's effectiveness score
- Retroactively invalidate version N-1's QA evidence
- Create obligations for already-delivered versions

### 8.3 Governance Promotion

If learning indicates:
- Missing governance rules → Update governance canon
- Missing architecture patterns → Update architecture templates
- Missing CI gates → Update gate definitions
- Missing agent instructions → Update agent contracts

All such updates apply to **future versions only**.

---

## 9. Deprecation and Retirement

### 9.1 Deprecation Criteria

A version MAY be deprecated when:
- A newer version supersedes its functionality
- Security or compliance requirements mandate upgrade
- Business requirements change

### 9.2 Deprecation Process

To deprecate a version:
1. Update version lifecycle state to `DEPRECATED`
2. Document superseding version
3. Preserve all evidence
4. Notify stakeholders
5. Set deprecation date

### 9.3 Retirement Criteria

A version MUST be retired when:
- No active runtime deployments exist, OR
- Compliance obligations require formal decommissioning

### 9.4 Retirement Process

To retire a version:
1. Confirm no active deployments
2. Update version lifecycle state to `RETIRED`
3. Archive all evidence for compliance retention period
4. Block future deployments

---

## 10. Version Effectiveness and Metrics

### 10.1 Per-Version Effectiveness

Each version has its own **Build Effectiveness Score**:

```
Effectiveness = 100 - (Total Penalty Points)
```

Calculated at delivery based on failures recorded during build.

### 10.2 Cross-Version Learning Metrics

Foreman MUST track:
- First-pass success rate (% of versions delivered at 100% effectiveness)
- Learning promotion rate (% of failures that resulted in governance updates)
- Regression rate (% of failures recurring across versions)

### 10.3 Compliance Metrics

For audit purposes, track per version:
- Time from architecture to delivery
- Number of QA cycles required
- Number of governance gate failures
- Number of CI gate failures

---

## 11. One-Time Build Law Per Version

**Core Invariant:** Each version MUST be correct on first delivery.

### Version-Specific Requirements

1. Version N is correct if:
   - All QA is green
   - All governance gates pass
   - Johan verifies UI correctness
   - No failures recorded post-delivery

2. If version N has post-delivery failures:
   - Build effectiveness is reduced
   - Learning MUST be recorded
   - Failures MUST be attributed
   - Prevention changes MUST be rolled forward to version N+1 architecture

3. Version N+1 MUST NOT repeat version N's failures.

---

## 12. Compliance and Audit Requirements

### 12.1 ISO 27001 Alignment

Each version MUST have:
- Security control implementation evidence
- Change management records
- Incident response records (if applicable)
- Access control audit trails

### 12.2 ISO 31000 Alignment

Each version MUST have:
- Risk assessment (pre-architecture)
- Risk treatment decisions
- Risk outcome evaluation (post-delivery)

### 12.3 Audit Trail Requirements

For each version, preserve:
- Who requested the version (Johan)
- When architecture was approved
- When building commenced
- When QA passed
- When Johan verified
- When version was deployed
- All governance gate results
- All CI gate results
- All failures and learning

---

## 13. Enforcement

### 13.1 Foreman Responsibilities

Foreman MUST:
- Assign unique version identifiers
- Track version lifecycle states
- Ensure environment isolation
- Preserve evidence per version
- Calculate effectiveness per version
- Promote learning forward-only

### 13.2 Builder Responsibilities

Builders MUST:
- Work in isolated version environments
- Never contaminate prior versions
- Never skip version-specific QA
- Report all failures version-specifically

### 13.3 Governance Administrator Responsibilities

Governance Administrator MUST:
- Audit version evidence completeness
- Verify lifecycle state transitions are valid
- Ensure governance promotion occurs from learning
- Detect and report version isolation violations

---

## 14. Halt Conditions

Foreman MUST halt if:
- Version isolation is compromised
- Evidence is missing for a delivered version
- Learning indicates a governance gap but no promotion occurred
- A version is deployed without passing all gates

---

## 15. Precedence

This policy is canonical.

If any agent behavior, process, or artifact conflicts with this policy,
this policy prevails.

---

End of VERSIONING AND EVOLUTION GOVERNANCE
