# CI Gate Scripts

This directory contains validation scripts used by CI workflows and agents for pre-gate validation.

## Purpose

These scripts implement governance requirements defined in:
- `governance/canon/BOOTSTRAP_EXECUTION_LEARNINGS.md` (BL-027, BL-028)
- `governance/canon/AGENT_CONTRACT_PROTECTION_PROTOCOL.md`
- `governance/canon/SCOPE_TO_DIFF_RULE.md`

## Available Scripts

### `validate-scope-to-diff.sh`

**Purpose**: Validate that `SCOPE_DECLARATION.md` accurately reflects actual git diff changes.

**Authority**: BL-027 (Scope Declaration Mandatory Before PR Handover)

**Usage**:
```bash
./.github/scripts/validate-scope-to-diff.sh [base-ref]

# Examples
./.github/scripts/validate-scope-to-diff.sh main
./.github/scripts/validate-scope-to-diff.sh origin/main
```

**Exit Codes**:
- `0` = PASS (scope declaration matches diff)
- `1` = FAIL (scope declaration missing or doesn't match diff)
- `2` = FAIL (invalid usage)

**Requirements**:
- `governance/scope-declaration.md` must exist
- All files in git diff must be declared in scope
- All declared files must be in git diff

---

### `validate-yaml-frontmatter.sh`

**Purpose**: Extract and validate YAML frontmatter from markdown files using yamllint.

**Authority**: BL-028 (Yamllint Warnings Are Errors - Zero Test Debt)

**Usage**:
```bash
./.github/scripts/validate-yaml-frontmatter.sh <file1.md> [file2.md] [...]

# Examples
./.github/scripts/validate-yaml-frontmatter.sh .github/agents/*.md
./.github/scripts/validate-yaml-frontmatter.sh .github/agents/governance-repo-administrator.agent.md
```

**Exit Codes**:
- `0` = PASS (all YAML frontmatter valid, no warnings, no errors)
- `1` = FAIL (yamllint errors or warnings found)
- `2` = FAIL (invalid usage or yamllint not installed)

**BL-028 Compliance**:
- **Warnings ARE errors**
- Exit code non-zero = HALT
- All violations must be fixed
- No rationalization permitted

**Requirements**:
- yamllint must be installed: `pip install yamllint`
- Files must contain YAML frontmatter between `---` markers

---

### `check_locked_sections.py`

**Purpose**: Validate locked section integrity in agent contracts.

**Authority**: `governance/canon/AGENT_CONTRACT_PROTECTION_PROTOCOL.md`

**Usage**: See script header for detailed usage instructions.

---

## Two Validation Paths

Per BL-027/028, there are **two equally compliant validation paths**:

### Path 1: Script Execution (Preferred)

**When to use**: 
- Local development environment with bash/python available
- CI/CD environment
- Pre-commit validation
- When scripts can execute successfully

**Process**:
1. Run applicable gate scripts locally
2. Achieve exit code 0 for all gates
3. Document execution in PREHANDOVER_PROOF with commands, exit codes, outputs
4. Create PR

**Example**:
```bash
# Run scope-to-diff validation
./.github/scripts/validate-scope-to-diff.sh main
# Exit code: 0 ✅

# Run YAML frontmatter validation
./.github/scripts/validate-yaml-frontmatter.sh .github/agents/*.md
# Exit code: 0 ✅

# Document in PREHANDOVER_PROOF
```

---

### Path 2: Evidence-Based Validation (Agent Environments)

**When to use**:
- Agent environments where bash/python cannot execute before PR (e.g., GitHub Copilot)
- Environments with script execution limitations
- Pre-PR sandboxed environments
- When scripts are not available or cannot run

**Process**:
1. Perform manual validation equivalent to script logic
2. Gather evidence (commands, outputs, comparisons, attestations)
3. Document comprehensive evidence in PREHANDOVER_PROOF
4. Sign attestation confirming compliance
5. Create PR

**Requirements for Evidence-Based Validation**:

#### For Scope-to-Diff (BL-027):
- Create `governance/scope-declaration.md` listing all changed files
- Manually compare declared files against `git diff` output
- Document comparison in PREHANDOVER_PROOF
- Attest that all files match

**Example PREHANDOVER_PROOF entry**:
```markdown
#### Scope-to-Diff Validation (BL-027)
**Method**: Evidence-Based (script execution not available in agent environment)

**Scope Declaration Created**: ✅ `governance/scope-declaration.md`

**Git Diff Files**:
- M .github/workflows/governance-gate.yml
- M governance/canon/BOOTSTRAP_EXECUTION_LEARNINGS.md
- A .github/scripts/validate-scope-to-diff.sh

**Declared Files in scope-declaration.md**:
- M .github/workflows/governance-gate.yml
- M governance/canon/BOOTSTRAP_EXECUTION_LEARNINGS.md
- A .github/scripts/validate-scope-to-diff.sh

**Comparison Result**: ✅ MATCH (all files in diff are declared, all declared files are in diff)

**Attestation**: I manually verified that the scope declaration accurately reflects the git diff. All changed files are declared, and no extra files are declared. This validation is equivalent to running `.github/scripts/validate-scope-to-diff.sh` with exit code 0.

**Signature**: [Agent Name] - [Date/Time UTC]
```

#### For YAML Frontmatter (BL-028):
- Extract YAML frontmatter manually (e.g., with awk command)
- Validate with yamllint or equivalent
- Fix ALL warnings/errors (no rationalization)
- Document validation in PREHANDOVER_PROOF with exit code 0
- Attest that no warnings/errors remain

**Example PREHANDOVER_PROOF entry**:
```markdown
#### YAML Frontmatter Validation (BL-028)
**Method**: Evidence-Based (yamllint execution not available in agent environment)

**YAML Extraction Command**:
```bash
awk '/^---$/{if(++n==2) exit} n>=1' .github/agents/governance-repo-administrator.agent.md | yamllint -
```

**Initial Result**: Exit code 1 (errors found)
- Line 3: Description line too long (194 > 80)
- Line 15: Trailing spaces

**Fixes Applied**:
1. Line 3: Converted to YAML multi-line `>` syntax
2. Line 15: Removed trailing spaces

**Final Validation**: Exit code 0 ✅

**Attestation**: I manually extracted YAML frontmatter, validated with yamllint, fixed ALL warnings/errors until exit code 0 was achieved. No warnings were rationalized. This validation is equivalent to running `.github/scripts/validate-yaml-frontmatter.sh` with exit code 0.

**Signature**: [Agent Name] - [Date/Time UTC]
```

---

## CI Workflow Integration

CI workflows check for validation using **either path**:

1. **Script execution evidence**: Look for script exit codes in CI logs or PREHANDOVER_PROOF
2. **Manual validation evidence**: Look for evidence-based validation in PREHANDOVER_PROOF with:
   - Manual verification tables
   - Comparison results
   - Attestations
   - Signatures

If **neither** path is provided, CI workflows will:
- Block PR merge
- Display clear error message explaining both paths
- Provide examples of acceptable evidence

---

## For Agent Developers

When building agents that create PRs:

1. **Prefer script execution** if your environment supports it
2. **Use evidence-based validation** if scripts cannot execute
3. **Always document** which path you used in PREHANDOVER_PROOF
4. **Never skip validation** - one path or the other is mandatory
5. **No partial compliance** - complete validation or escalate

Both paths are equally compliant with governance. The key is **comprehensive documentation** and **honest attestation**.

---

## Authority

- `governance/canon/BOOTSTRAP_EXECUTION_LEARNINGS.md` (BL-027, BL-028)
- `governance/canon/AGENT_CONTRACT_PROTECTION_PROTOCOL.md` (Section 4.2)
- `governance/canon/SCOPE_TO_DIFF_RULE.md`
- Constitutional Principle #2: Zero Test Debt
- Constitutional Principle #4: No Warning Escalations

---

**Last Updated**: 2026-01-19  
**Maintained By**: Governance Repository Administrator
