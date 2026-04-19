# Layer-Down Guide — AGENT_CONTRACT_PLACEHOLDER_CHECK_CANON.md v1.0.0

**Canon**: `governance/canon/AGENT_CONTRACT_PLACEHOLDER_CHECK_CANON.md`
**Canon Version**: 1.0.0
**Layer-Down Authority**: CS2 (Johan Ras) — Issue #1349
**Date**: 2026-04-19
**Primary Target**: `APGI-cmy/maturion-isms`

---

## Purpose

This guide instructs consumer repos on how to apply the canonical placeholder-check exception
class model from `AGENT_CONTRACT_PLACEHOLDER_CHECK_CANON.md`. The primary implementation target
is `maturion-isms`, but the pattern applies to all repos in `CONSUMER_REPO_REGISTRY.json`.

---

## Stage 2 Deliverables for maturion-isms

Consumer repos must complete the following to satisfy the layer-down obligation for Issue #1349:

### Deliverable 1 — Reference the Canonical Class Model

Add or update the governance inventory (typically `governance/GOVERNANCE_INVENTORY.json`) to include
a reference to `AGENT_CONTRACT_PLACEHOLDER_CHECK_CANON.md` as a canonical governance binding.

Minimum required entry:
```json
{
  "filename": "AGENT_CONTRACT_PLACEHOLDER_CHECK_CANON.md",
  "source_repo": "APGI-cmy/maturion-foreman-governance",
  "canonical_version": "1.0.0",
  "layer_down_date": "2026-04-19",
  "binding": "placeholder-check-exception-classes",
  "authority_issue": "#1349"
}
```

### Deliverable 2 — Update Placeholder-Check Workflow Logic

If the consumer repo has an agent-contract placeholder-check workflow (typically in
`.github/workflows/`), update it to:

1. Map every exempted match to a named canonical exception class (EXC-001 through EXC-005)
2. Remove ad hoc phrase exemptions that are not mapped to a named class
3. Add inline comments citing the class ID for each exemption pattern

**Before (ad hoc phrase accretion — prohibited)**:
```bash
# Skip lines that look okay
if echo "$line" | grep -qiE "no placeholder|hash|detect"; then
  continue
fi
```

**After (canonical class binding — required)**:
```bash
# EXC-001: governance condition descriptions (AGENT_CONTRACT_PLACEHOLDER_CHECK_CANON.md §5)
if echo "$line" | grep -qiE "(placeholder|stub|TBD).*(hash|detect|trigger|mode|state|escalat|condition|gate)"; then
  continue
fi
# EXC-004: checklist / gate labels — placeholder-like term follows gate/condition keyword
# (AGENT_CONTRACT_PLACEHOLDER_CHECK_CANON.md §5)
if echo "$line" | grep -qiE "(gate|condition|mode|state|trigger|escalat|detect).*(placeholder|stub|TBD)"; then
  continue
fi
# EXC-003: negative assertions (AGENT_CONTRACT_PLACEHOLDER_CHECK_CANON.md §5)
if echo "$line" | grep -qiE "no (placeholder|stub|TBD|TODO) content"; then
  continue
fi
# EXC-005: canon hash-validation terminology — only exempts lines where placeholder is the
# detection subject (e.g. "placeholder hashes trigger gate"), not hash fields containing
# placeholder values (AGENT_CONTRACT_PLACEHOLDER_CHECK_CANON.md §5)
if echo "$line" | grep -qiE "placeholder.*(hash|api)|(hash|api).*placeholder.*(detect|check|valid|verif|trigger|gate|count|select|alignment)"; then
  continue
fi
```

### Deliverable 3 — Verify True-Positive Preservation

After updating the workflow:
1. Confirm that genuine incomplete content still fails (test with examples from Canon §8.1)
2. Confirm that governed meta-language no longer produces false positives (test with Canon §8.2)
3. Document this verification in the consumer PR's prehandover proof

### Deliverable 4 — Audit Any Existing Exemptions

Review all existing exemption phrases in the consumer workflow:
- For each phrase: does it map to EXC-001 through EXC-005?
- If yes: add the class citation comment, keep the phrase
- If no: either remove the phrase (if it's covering real content that should fail), or raise a
  canon-update issue in `maturion-foreman-governance` to add a new class

---

## Consumer-Local Extensions

If a consumer repo requires a phrase exemption that is genuinely repo-specific and cannot be
canonized (e.g., a consumer-specific tool name that contains "stub"):

1. The extension must be documented in a comment citing: "LOCAL-EXT: not covered by canonical class
   because [reason]; candidate for canon promotion if pattern repeats in other repos"
2. The extension must be bounded to a specific, named pattern — not a broad regex that could
   suppress real defects
3. The extension must be raised as a layer-up issue to `maturion-foreman-governance` for
   potential canon promotion

---

## Verification Checklist for Consumer PR

When raising the consumer-side PR for this layer-down, include the following checklist:

```markdown
## Layer-Down Verification: AGENT_CONTRACT_PLACEHOLDER_CHECK_CANON.md v1.0.0

- [ ] Canon referenced in GOVERNANCE_INVENTORY.json
- [ ] All exemptions mapped to named canonical exception class (EXC-001 to EXC-005)
- [ ] All ad hoc phrases without class mapping removed or justified as LOCAL-EXT
- [ ] True-positive preservation verified (genuine incomplete content still fails)
- [ ] False-positive reduction verified (governed meta-language no longer flagged)
- [ ] Canon hash recorded: `f5c9d72ebf2584e10ff09f29fdbc90c6f8251b2ebfbce58983c7db0e45dbac1d`
- [ ] Layer-down authority issue referenced: APGI-cmy/maturion-foreman-governance#1349
```

---

## Canon Hash Reference

```
File: governance/canon/AGENT_CONTRACT_PLACEHOLDER_CHECK_CANON.md
Version: 1.0.0
SHA256: f5c9d72ebf2584e10ff09f29fdbc90c6f8251b2ebfbce58983c7db0e45dbac1d
Source PR: PR copilot/canonize-placeholder-check-exceptions
```

---

*Authority: CS2 (Johan Ras) — Issue #1349 | Layer-Down Guide v1.0.0 — 2026-04-19*
