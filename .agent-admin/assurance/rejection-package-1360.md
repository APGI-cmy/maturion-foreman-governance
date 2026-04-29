# IAA REJECTION-PACKAGE

**Token ID**: rejection-package-1360
**PR**: APGI-cmy/maturion-foreman-governance#1360
**Branch**: copilot/replace-global-scope-declaration
**Session**: IAA-20260429-PR1360
**Issued**: 2026-04-29
**Authority**: governance/canon/INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.8.0

---

## REJECTION-PACKAGE

```
REJECTION-PACKAGE
PR: #1360
Date: 2026-04-29
IAA Session: IAA-20260429-PR1360
Phases:
  Phase 1 (Preflight): FAIL — No preflight-proof-1360.md artifact on branch. CS2
    authorization via issue #1359 is confirmed, but no formal Phase 1 evidence artifact
    exists. INV-101 fails.
  Phase 2 (Governance): FAIL — CANON_INVENTORY.json not updated. All three modified canon
    files have stale SHA256 hashes (independently verified by IAA via sha256sum). No
    version bumps applied to modified canon files. No governance-proof-1360.md artifact.
    OVL-CG-001, OVL-CG-003, OVL-CG-004, OVL-CG-005, OVL-CG-006 all FAIL.
  Phase 3 (Working): FAIL — No working-proof-1360.md artifact. Substantive implementation
    is sound (correct merge-base diff, correct grep -qxF exact matching, complete per-PR
    scope declaration) but CORE-018 hard gate and OVL-CG-006 independently block. No formal
    Phase 3 evidence artifact.
  Phase 4 (Handover): FAIL — CORE-018 hard gate: PREHANDOVER proof absent from branch;
    session memory absent; iaa_audit_token PENDING state cannot be recorded without a
    PREHANDOVER proof present. INV-401, INV-402, INV-403, INV-405 all FAIL.
Agent Integrity: PASS — No .github/agents/ files modified. IAA own contract SHA256 intact
  (verified: 0d414fd2d059fbda8ed8a2bab42fc4698674d893d45ea954d92d0f940165b8ac matches
  INTEGRITY_INDEX baseline).
Independence: CONFIRMED — IAA (independent-assurance-agent, assurance class) and PR author
  (GitHub Copilot coding agent, builder/tool class) are distinct identities.
Verdict: MERGE BLOCKED
```

---

## CANON_INVENTORY Hash Verification (IAA-Independent)

| Canon File | Live SHA256 (sha256sum) | CANON_INVENTORY.json SHA256 | Match |
|------------|------------------------|----------------------------|-------|
| `governance/canon/AGENT_HANDOVER_AUTOMATION.md` | `8074b50cb4a1e72343fba36899f189678838c93e06cd4b0552db1417e9a50b17` | `20141677d074e9090eeb869af43f5a581dd7f53d9a4401bbbef535a3d9128789` | ❌ MISMATCH |
| `governance/canon/SCOPE_DECLARATION_SCHEMA.md` | `34604eeab04266916da1c51b25809e19bf286163a1ac9712fcbb7028c08816c4` | `96c0374ac4ee8d0cfc65617c05f8549ac192ff15101708d45640af8a0d17774b` | ❌ MISMATCH |
| `governance/canon/scope-declaration.template.md` | `f4b561ac658c71b326c2165d35b978809b28251382ac136cb068d2c1ff8e502d` | `06e4173ff8485b6a1af86a91d12484856c5c7f4d193f38ae88e79573e646c5ee` | ❌ MISMATCH |

All three canon files modified in this PR have stale hashes in CANON_INVENTORY.json.
This is a hard OVL-CG-006 failure: the governance inventory is now inconsistent with
the actual file content on this branch.

---

## Remediation Required

### [R-01] CRITICAL — Update CANON_INVENTORY.json for all three modified canon files

Each of the three canon files modified in this PR must have its CANON_INVENTORY.json entry
updated atomically in the same PR commit:

For each file, update these fields in `governance/CANON_INVENTORY.json`:
- `file_hash` → new SHA256 (see Live SHA256 column above; note: recompute after R-02 version
  bumps are applied, as file content changes will change the SHA256 again)
- `file_hash_sha256` → same as `file_hash` (kept in sync)
- `version` → updated version string per R-02
- `canonical_version` → same as new `version`
- `amended_date` → "2026-04-29"
- `last_updated` → "2026-04-29"
- `change_note` → brief description of what changed in this PR

> ⚠️ IMPORTANT: Apply R-02 version bumps BEFORE computing final SHA256 hashes for
> CANON_INVENTORY. The version bump text changes the file content, changing the SHA256.

### [R-02] IMPORTANT — Add version bumps to all three modified canon files

Canon files have been substantively amended in this PR but carry no version increment.
Versioning is the mechanism by which consuming agents and systems know whether they hold
current knowledge.

- **`governance/canon/AGENT_HANDOVER_AUTOMATION.md`**: currently v1.6.0. §4.3d (per-PR scope
  model, Check 4b numeric field validation) and §4.3e (Check B updated to per-PR path with
  fallback discovery, numeric FILES_CHANGED validation, AAP-04 updated) were both substantively
  changed. Bump to **v1.7.0** and add amendment line to the header:
  ```
  **Amended**: 2026-04-29 — v1.7.0: §4.3d and §4.3e updated for per-PR scope declaration
  model — per-PR file path .agent-admin/scope-declarations/pr-<PR_NUMBER>.md replaces global
  governance/scope-declaration.md; Check 4b added (FILES_CHANGED numeric field validation);
  Check B updated with fallback discovery and numeric field validation; AAP-04 updated.
  ```

- **`governance/canon/SCOPE_DECLARATION_SCHEMA.md`**: currently "v1". Artifact location,
  required sections (section 7 added), header fields (v2: PR_NUMBER, ISSUE, BRANCH), FILES_CHANGED
  subsection (§5.7), and validity rules (§6 numeric checks) were all updated. Bump to **v2.0.0**
  and update the version field in the Status block.

- **`governance/canon/scope-declaration.template.md`**: currently no explicit file-level version
  header (only SCOPE_SCHEMA_VERSION: v2 in the template content). Add a file-level Status/version
  header consistent with other canon files and set version to **v2.0.0**.

### [R-03] IMPORTANT — Create a PREHANDOVER-equivalent evidence artifact on the branch

CORE-018 requires a PREHANDOVER proof for all IAA-reviewed PRs. OVL-CG-004 (ripple assessment),
OVL-CG-005 (drift/hash evidence), OVL-CI-005 (CI check run reference), and OVL-CI-006
(environment parity) all require PREHANDOVER-hosted content.

Create a lightweight PREHANDOVER proof at:
`.agent-admin/prehandover/prehandover_proof_1360_20260429.md`

Minimum required content:

```yaml
## Identity
agent:                  Copilot (GitHub Copilot Coding Agent)
date:                   2026-04-29
branch:                 copilot/replace-global-scope-declaration
issue:                  1359
pr:                     1360

## Scope
scope_declaration:      .agent-admin/scope-declarations/pr-1360.md
files_changed:          10

## Gate Results
merge_gate_verdict:     [PASS/FAIL — from CI]
scope_declaration_parity: PASS (pr-1360.md verified against git diff --name-only origin/main...HEAD)

## CANON_INVENTORY Evidence (OVL-CG-005/006)
# For each modified canon file, before/after SHA256:
agent_handover_automation_before: 20141677d074e9090eeb869af43f5a581dd7f53d9a4401bbbef535a3d9128789
agent_handover_automation_after:  [SHA256 after R-01/R-02 applied]
scope_declaration_schema_before:  96c0374ac4ee8d0cfc65617c05f8549ac192ff15101708d45640af8a0d17774b
scope_declaration_schema_after:   [SHA256 after R-01/R-02 applied]
scope_declaration_template_before: 06e4173ff8485b6a1af86a91d12484856c5c7f4d193f38ae88e79573e646c5ee
scope_declaration_template_after:  [SHA256 after R-01/R-02 applied]
canon_inventory_updated:          YES

## Ripple Assessment (OVL-CG-004)
# AGENT_HANDOVER_AUTOMATION.md is PUBLIC_API per CANON_INVENTORY ripple_log entry
ripple_files_changed: AGENT_HANDOVER_AUTOMATION.md (PUBLIC_API), SCOPE_DECLARATION_SCHEMA.md
  (INTERNAL), scope-declaration.template.md (INTERNAL)
ripple_assessment: The AGENT_HANDOVER_AUTOMATION.md changes update §4.3d and §4.3e to reference
  per-PR scope files. Consumer agents (foreman-v2, governance-repo-administrator-v2) that follow
  §4.3d/§4.3e for PREHANDOVER ceremony will need to update their per-PR scope declarations
  accordingly. Ripple: FLAG — foreman-v2 and governance-repo-administrator-v2 agents should be
  notified. Scope: limited to PREHANDOVER procedure (no breaking change to existing PRs on main).

## CI Evidence (OVL-CI-005)
ci_check_run_url:     [URL of governance-scope-to-diff-gate workflow run for final commit]
scope_to_diff_result: PASS (pr-1360.md FILES_CHANGED list matches git diff --name-only origin/main...HEAD)

## Environment Parity (OVL-CI-006)
environment_parity:   NO ENVIRONMENT IMPACT — governance-only gate change (CI workflow +
  scripts); no dev/staging/production environment impact; parity maintained.

## IAA Assurance
iaa_audit_token:      PENDING
iaa_session_reference: IAA-20260429-PR1360
iaa_reinvocation_round: 1 (after R-01/R-02/R-03 applied)
```

---

## Re-entry Protocol

After all three remediation items are resolved:

1. **Apply R-02 first** (version bumps to canon files)
2. **Compute new SHA256** for each updated canon file:
   ```bash
   sha256sum governance/canon/AGENT_HANDOVER_AUTOMATION.md
   sha256sum governance/canon/SCOPE_DECLARATION_SCHEMA.md
   sha256sum governance/canon/scope-declaration.template.md
   ```
3. **Apply R-01** (update CANON_INVENTORY.json with new hashes and version info)
4. **Create R-03** (PREHANDOVER proof with evidence)
5. **Commit all changes** in a single commit to the PR branch
6. **Re-invoke IAA**: `task(agent_type: "independent-assurance-agent")` from Foreman or CS2

**Re-entry Point**: Phase 2 — Step 3.3 — Governance Proof Review
The IAA will re-verify CANON_INVENTORY hashes, version bumps, and PREHANDOVER proof completeness
before proceeding to Phase 3 and Phase 4.

---

## Submitting Agent Notification

**Routed To**: Copilot (GitHub Copilot Coding Agent / app/copilot-swe-agent)
**PR Branch**: copilot/replace-global-scope-declaration
**Required Action**: Address R-01, R-02, and R-03 as specified above. Acknowledge receipt of
this REJECTION-PACKAGE before resubmission by posting a PR comment confirming each item
will be addressed.

**CS2 Notified**: @APGI-cmy — REJECTION-PACKAGE issued for PR #1360. Three remediation items
required before ASSURANCE-TOKEN can be issued. Substantive implementation quality is sound;
failures are governance inventory and ceremony artifacts only.

---

## Substantive Assessment Note

The IAA notes that the technical implementation in this PR is substantively correct:
- The per-PR immutable scope model correctly solves the merge-conflict problem with shared
  SCOPE_DECLARATION.md
- The three-dot merge-base diff (`origin/$BASE_REF...HEAD`) is the correct comparison basis
- The `grep -qxF` exact-line matching correctly prevents substring false positives
- The `FILES_CHANGED: N` numeric field validation (Check 4b) is a useful integrity addition
- The `.agent-admin/scope-declarations/pr-1360.md` correctly and completely lists all 10
  changed files and matches the actual PR diff

The REJECTION-PACKAGE is issued solely for governance ceremony gaps (CANON_INVENTORY staleness,
missing version bumps, absent PREHANDOVER proof) — not for implementation quality concerns.

---

*IAA Session: IAA-20260429-PR1360 | Authority: CS2 | Governed by: INDEPENDENT_ASSURANCE_AGENT_CANON.md v1.8.0*
