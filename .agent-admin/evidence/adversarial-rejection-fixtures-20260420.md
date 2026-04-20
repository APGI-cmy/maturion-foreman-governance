# Adversarial Rejection Fixtures — Zero-Tolerance Admin-Ceremony Closure Wave

**Document ID**: adversarial-rejection-fixtures-20260420
**Wave**: zero-tolerance-admin-ceremony-closure
**Issue**: APGI-cmy/maturion-foreman-governance#1355
**Date**: 2026-04-20
**Authority**: CS2 (APGI-cmy) — Issue #1355

---

## Purpose

This document defines the adversarial / seeded-bad artifact scenarios that demonstrate
the admin-ceremony defect detection infrastructure rejects ceremony-defective artifacts
at the correct layer before CS2 review.

Each fixture is a seeded example of a defective artifact. The expected rejection layer
and gate are specified for each fixture.

---

## Fixture A: Template Instruction Leakage

**Scenario**: A prehandover proof committed to `.agent-admin/prehandover/` contains
an `ASSEMBLY_TIME_ONLY` block that was not removed before committing.

**Seeded artifact** (example, NOT a real committed artifact):
```markdown
# PREHANDOVER PROOF — Wave Example

## Identity
agent: execution-ceremony-admin-agent
...
final_state: COMPLETE

<!-- ASSEMBLY_TIME_ONLY: Remove this comment block. Fill actual gate outcomes. -->
gate_inventory:
  merge-gate/verdict: PASS
```

**Expected rejection**:
- **Layer**: Admin-ceremony layer (workflow gate)
- **Gate**: `admin-ceremony/template-leakage`
- **Workflow**: `.github/workflows/admin-ceremony-defect-gate.yml` (Check A)
- **Trigger**: Line matching `ASSEMBLY_TIME_ONLY` pattern in active-bundle artifact
- **Result**: CI FAIL before CS2 review

**Proof of rejection**: Run the admin-ceremony-defect-gate Check A with this input:
```bash
echo '<!-- ASSEMBLY_TIME_ONLY: Remove this comment block. -->' > /tmp/test-proof.md
grep -niE "ASSEMBLY_TIME_ONLY|REMOVE BEFORE COMMIT|TEMPLATE INSTRUCTION" /tmp/test-proof.md
# Output: 1:<!-- ASSEMBLY_TIME_ONLY: Remove this comment block. -->
# → Detection PASS, CI FAIL
```

---

## Fixture B: Placeholder IAA Token in COMPLETE Artifact

**Scenario**: A prehandover proof declares `final_state: COMPLETE` but has
`iaa_audit_token: PENDING` (or `<token-file-path>`) with no corresponding PR-scoped
IAA token file in `.agent-admin/assurance/`.

**Seeded artifact** (example, NOT a real committed artifact):
```yaml
final_state:            COMPLETE
iaa_audit_token:        PENDING
iaa_session_reference:  PENDING
```

**Expected rejection**:
- **Layer**: Admin-ceremony layer (workflow gate)
- **Gate**: `admin-ceremony/placeholder-final-state`
- **Workflow**: `.github/workflows/admin-ceremony-defect-gate.yml` (Check B)
- **Trigger**: COMPLETE proof + placeholder iaa_audit_token + no PR-scoped token file
- **Result**: CI FAIL before CS2 review

**Proof of rejection**: The Check B logic:
1. Detects `final_state: COMPLETE` in proof
2. Detects `iaa_audit_token: PENDING` (matches placeholder pattern)
3. Searches for PR-scoped token file in `.agent-admin/assurance/` — none found
4. Exits with failure

---

## Fixture C: Alignment Inventory Overclaim

**Scenario**: `governance/CANON_INVENTORY.json` contains an entry with
`"alignment_status": "ALIGNED"` but `"file_hash": "TBD"` (or any non-64-hex value).

**Seeded artifact** (example, NOT a real CANON_INVENTORY.json fragment):
```json
{
  "filename": "governance/canon/EXAMPLE_CANON.md",
  "alignment_status": "ALIGNED",
  "file_hash": "TBD",
  "file_hash_sha256": "TBD",
  "version": "1.0.0"
}
```

**Expected rejection**:
- **Layer**: Merge gate / governance alignment layer
- **Gate**: `governance/alignment` (overclaim sub-check)
- **Workflow**: `.github/workflows/merge-gate-interface.yml` (governance-alignment job)
- **AND**: `admin-ceremony/alignment-overclaim`
- **Workflow**: `.github/workflows/admin-ceremony-defect-gate.yml` (Check C)
- **Trigger**: ALIGNED entry with file_hash not matching `^[0-9a-f]{64}$`
- **Result**: CI FAIL before CS2 review

**Proof of rejection**: The python3 check in both workflows:
1. Reads CANON_INVENTORY.json
2. Finds entries with `alignment_status == "ALIGNED"`
3. Validates `file_hash` against `/^[0-9a-f]{64}$/` regex
4. `"TBD"` fails regex → violation recorded → exit 1

---

## Fixture D: Carried-Forward Source Reference Failure

**Scenario**: An ECAP reconciliation summary contains a "carried forward from
`governance/canon/NONEXISTENT.md`" claim but the referenced file does not exist
on the branch.

**Seeded artifact** (example, NOT a real committed artifact):
```markdown
## Gate Results
Gate inventory carried forward from `governance/nonexistent-canon.md`.
```

**Expected rejection**:
- **Layer**: Admin-ceremony layer (workflow gate)
- **Gate**: `admin-ceremony/carried-forward-source`
- **Workflow**: `.github/workflows/admin-ceremony-defect-gate.yml` (Check D)
- **Trigger**: "carried forward from" claim where source path fails `git ls-files --error-unmatch`
- **Result**: CI FAIL before CS2 review

**Proof of rejection**: The Check D logic:
1. Scans active-bundle for "carried forward from" patterns
2. Extracts source path from the claim
3. Runs `git ls-files --error-unmatch governance/nonexistent-canon.md`
4. Command fails (file does not exist) → violation recorded → exit 1

---

## Fixture E: Unresolved Placeholder in Agent Contract

**Scenario**: An agent contract file in `.github/agents/` has an unresolved placeholder
in a substantive section: `Phase 3 — Build Script: TBD`.

**Seeded artifact** (example, NOT a real agent contract fragment):
```markdown
## Phase 3 — Build Orchestration

### 3.1 Build Model

Phase 3 — Build Script: TBD
```

**Expected rejection**:
- **Layer**: Foreman/agent-contract layer
- **Gate**: `PLACEHOLDER-CHECK-001` (canonical placeholder check)
- **Workflow**: `.github/workflows/agent-contract-audit.yml` (placeholder check step)
- **Script**: `.github/scripts/validate-placeholder-check.sh`
- **Trigger**: "TBD" in substantive content — does not match any EXC-001 through EXC-005 class
- **Result**: CI FAIL before CS2 review

**Proof of rejection**: The `validate-placeholder-check.sh` logic:
1. Line contains "TBD" → enters check loop
2. EXC-005: not a hash-validation term → no skip
3. EXC-001: "TBD" not followed by detection/condition keyword → no skip
4. EXC-002: not an echo/print statement → no skip
5. EXC-003: not a negative assertion → no skip
6. EXC-004: not a gate label → no skip
7. No exception class matched → violation recorded → exit 1

**Proof that governed meta-language is NOT flagged**:
```
"CANON_INVENTORY placeholder hashes detected → DEGRADED MODE"  → EXC-001 skipped
"No placeholder/stub/TODO content: ✅"                          → EXC-003 skipped
"Detect placeholder or TBD values in hash fields"               → EXC-005 skipped
"Gate: placeholder-check-enforcement"                           → EXC-004 skipped
```

---

## Summary Table

| Fixture | Seeded Failure | Rejected By | Gate | Layer |
|---------|---------------|-------------|------|-------|
| A | Template instruction leakage | admin-ceremony-defect-gate | `admin-ceremony/template-leakage` | Admin-ceremony |
| B | Placeholder IAA token in COMPLETE proof | admin-ceremony-defect-gate | `admin-ceremony/placeholder-final-state` | Admin-ceremony |
| C | ALIGNED inventory with stale metadata | merge-gate-interface + admin-ceremony-defect-gate | `governance/alignment` / `admin-ceremony/alignment-overclaim` | Merge gate + Admin-ceremony |
| D | Carried-forward source not found | admin-ceremony-defect-gate | `admin-ceremony/carried-forward-source` | Admin-ceremony |
| E | Unresolved TBD in agent contract | agent-contract-audit | `PLACEHOLDER-CHECK-001` | Foreman/contract layer |

All 5 fixture types are deterministically rejected before CS2 review.

---

*Adversarial Rejection Fixtures v1.0 | Wave: zero-tolerance-admin-ceremony-closure | Date: 2026-04-20*
*Authority: CS2 — Issue #1355*
