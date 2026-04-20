# Execution Ceremony Admin Anti-Patterns

## Status
**Type**: Tier 2 Governance Reference  
**Authority**: CS2 — EXECUTION_CEREMONY_ADMINISTRATION_PROTOCOL.md v1.2.0  
**Version**: 1.1.0  
**Effective Date**: 2026-04-19  
**Owner**: execution-ceremony-admin-agent / Foreman QP / IAA  
**Purpose**: Canonized list of admin-ceremony defects that are auto-fail at the §4.3e Admin Ceremony Compliance Gate and/or trigger an IAA REJECTION-PACKAGE. Every entry is a known recurring failure mode derived from operational evidence.

---

## How to Use This Document

Each entry in this list is:

1. **Auto-fail** for the `§4.3e Admin Ceremony Compliance Gate` (Layer 1/2) when the ECAP bundle is reviewed before IAA invocation.
2. **IAA REJECTION-PACKAGE trigger** (Layer 3) when the defect is present at assurance time.

The `execution-ceremony-admin-agent` MUST scan for every anti-pattern before returning the bundle. The Foreman MUST scan for every anti-pattern at the QP checkpoint. The IAA MUST reject if any anti-pattern is present.

---

## Anti-Pattern Table

| ID | Anti-Pattern Name | Description | Detection | Auto-Fail Trigger | IAA ACR |
|----|------------------|-------------|-----------|-------------------|---------|
| **AAP-01** | **Issued token but pending/in-progress wording remains** | A valid IAA `ASSURANCE-TOKEN` was issued (or recorded as expected), but the PREHANDOVER proof or session memory still contains words like `PENDING`, `in progress`, `in-progress`, or equivalent provisional wording in fields that should declare COMPLETE/PASS/ISSUED. The bundle tells two conflicting stories simultaneously. | `grep -niE "\bPENDING\b|\bin[ _-]?progress\b" .agent-admin/prehandover/proof-*.md` | §4.3e Check C1 | ACR-02 |
| **AAP-02** | **Mixed internal version labels in same document** | A single document declares multiple different version strings as the "current" version of the same artifact — e.g., the header says v1.3.0 but a section says "updated in v1.2.0" in a way that implies v1.2.0 is the current version, or two sections give contradictory version numbers for the same canon file. | Manual review of headers, footers, and cross-references in the document | §4.3e Check D (manual) | ACR-02 |
| **AAP-03** | **Stale artifact path references** | A path declared in the PREHANDOVER proof, session memory, or any ceremony artifact does not exist as a committed file on the branch. This includes paths that were renamed, moved, or deleted after being recorded, or paths that were never committed. | `git ls-files --error-unmatch <declared-path>` | §4.3e Check E1 | ACR-08 |
| **AAP-04** | **Stale scope declaration after file changes** | The `FILES_CHANGED` count or listed files in `governance/scope-declaration.md` do not match the actual diff (`git diff --name-only origin/main...HEAD`). Typically caused by adding or deleting files after the scope declaration was written without regenerating it. | `git diff --name-only origin/main...HEAD \| wc -l` vs `FILES_CHANGED` field | §4.3e Check B1 | ACR-04 |
| **AAP-05** | **Stale hash after file finalization** | A SHA256 hash declared in the PREHANDOVER proof, CANON_INVENTORY, or any evidence artifact for a specific file does not match the actual SHA256 of that file in the committed branch state. Typically caused by editing a file after recording its hash without recomputing. | `sha256sum <file>` vs declared hash | §4.3e Check F1 | ACR-05 |
| **AAP-06** | **Requested vs completed assurance session mismatch** | The PREHANDOVER proof references an IAA session ID (in `iaa_audit_token` or `iaa_session_reference`) that does not match the session ID in the actual token file on the branch. Caused by copy-paste errors or generating a new IAA token without updating the PREHANDOVER proof reference. | Compare `iaa_audit_token` in PREHANDOVER with session ID in token file | §4.3e Check E1 | ACR-07 |
| **AAP-07** | **Declared file/artifact count mismatch** | A count of files, artifacts, or changed items declared in any ceremony document (e.g., "3 canon files amended", "5 artifacts committed", `FILES_CHANGED: 12`) does not match the actual count of those items in the committed branch state. | Count actual items and compare with declared count | §4.3e Check B1 | ACR-07 |
| **AAP-08** | **PUBLIC_API ripple obligations omitted or silently skipped** | One or more files with `layer_down_status: PUBLIC_API` in CANON_INVENTORY were changed in this PR but have no ripple assessment entry in the ECAP reconciliation summary. No mention of the layer-down obligation — not even a "DEFERRED" status. The obligation simply does not appear anywhere. | `jq '.canons[] \| select(.layer_down_status == "PUBLIC_API") \| .filename' governance/CANON_INVENTORY.json` compared against changed files | §4.3e Check G1 | ACR-06 |
| **AAP-09** | **Committed truth not matching proof/session memory claims** | The branch's actual committed file state contradicts a declared artifact path, hash, or status in a ceremony document. Examples: PREHANDOVER proof says `proof-001.md` exists but `proof-002.md` is what was actually committed; session memory says hash is `abc123` but actual hash is `def456`; PREHANDOVER says `final_state: COMPLETE` but the latest commit message says "WIP". | Cross-check declared artifacts and hashes against `git ls-files` and `sha256sum` | §4.3e Checks A1–A3, F1 | ACR-08, ACR-05 |
| **AAP-15** | **Gate parity claimed without explicit gate inventory** | A ceremony artifact claims "all gates PASS", "gate parity: PASS", or equivalent gate-summary wording, but no explicit gate inventory is recorded in the PREHANDOVER proof or ECAP reconciliation summary listing which gates were individually checked and their individual outcomes. A summary claim without per-gate evidence is insufficient. | `grep -niE "all gates.*PASS|gate parity.*PASS|merge.gate.*PASS" .agent-admin/prehandover/proof-*.md` then verify individual gate entries exist | §4.3e Check H (gate inventory) | ACR-09 |
| **AAP-16** | **Stale gate-pass provisional wording in final-state artifacts** | A final-state ceremony artifact contains provisional gate-pass language that implies gates have not yet been confirmed — e.g., "gate expected to pass", "parity to be confirmed", "pending gate verification", "gate check deferred", or similar wording in gate-status fields that should declare a definitive PASS or FAIL. | `grep -niE "expected to pass|parity to be confirmed|pending.*verification|gate.*deferred|to be confirmed" .agent-admin/prehandover/proof-*.md` | §4.3e Check H | ACR-10 |
| **AAP-17** | **Pre-final instruction wording / template instruction leakage** | A committed final-state artifact contains template assembly-time instructions that should have been removed before commit — e.g., text inside `<!-- ASSEMBLY_TIME_ONLY ... -->` markers, `[fill in]`, `[instruction]`, `replace this with`, `EXAMPLE TEXT`, `[PLACEHOLDER]`, `[YOUR TEXT HERE]`, `<!-- instructions -->`, or similar directive text that is clearly a template instruction rather than a completed value. | `grep -niE "\[fill in\]|\[instruction\]|replace this with|EXAMPLE TEXT|\[PLACEHOLDER\]|\[YOUR TEXT HERE\]|ASSEMBLY_TIME_ONLY" .agent-admin/prehandover/ .agent-workspace/*/memory/session-*.md` | §4.3e Check I | ACR-11 |
| **AAP-18** | **Verbatim IAA-response section blank or instruction-only** | The `iaa_audit_token` or `iaa_session_reference` field in a final-state PREHANDOVER proof is still set to a template placeholder value (e.g., `<token-file-path>`, `<IAA session ID>`, `[pending]`, `TBD`, `none`) rather than an actual issued token reference, while the PREHANDOVER proof claims `final_state: COMPLETE`. A COMPLETE proof must have a real token reference, not a placeholder. | `grep -E "iaa_audit_token.*<|iaa_session_reference.*<|iaa_audit_token.*\[|iaa_session_reference.*\[" .agent-admin/prehandover/proof-*.md` | §4.3e Check I | ACR-13 |
| **AAP-19** | **Cross-artifact contradiction — PASS in one, non-final in another** | One ceremony artifact (e.g., PREHANDOVER proof) declares `final_state: COMPLETE` or `administrative_readiness: ACCEPTED` while another artifact for the same job (e.g., ECAP reconciliation summary, session memory) still contains `PENDING`, `Phase 4`, `in progress`, or equivalent non-final status for the same dimension. The bundle tells two conflicting stories about the same fact. | Cross-check `final_state` in PREHANDOVER against `Final State` in ECAP reconciliation summary and final-status fields in session memory | §4.3e Check J | ACR-12 |
| **AAP-20** | **Carried-forward claim silently changes ownership or gate authority** | A final-state ceremony artifact states that a governance claim was "carried forward from" or is "verbatim from" a prior session/artifact, but the referenced source does not contain the stated claim, or the carried-forward text has been silently modified to change the gate authority, gate owner, or approval basis — creating a false impression that the claim was already validated in the prior session. | Manual cross-check of carried-forward claims against the named source artifact | §4.3e Check K (manual) | ACR-14 |
| **AAP-21** | **ASSEMBLY_TIME_ONLY block not removed before commit** | A committed artifact contains a block explicitly marked `ASSEMBLY_TIME_ONLY` (or equivalent directive markers such as `<!-- REMOVE BEFORE COMMIT -->`, `<!-- TEMPLATE INSTRUCTION -->`, `[REMOVE THIS]`) that was not removed before the file was committed. These blocks are valid in template source files but must not appear in any committed instance/output artifact. | `grep -niE "ASSEMBLY_TIME_ONLY|REMOVE BEFORE COMMIT|TEMPLATE INSTRUCTION" .agent-admin/ .agent-workspace/*/memory/session-*.md` | §4.3e Check I | ACR-11 |

---

## Supplementary Anti-Patterns (Foreman QP Awareness)

The following are not machine-detectable by §4.3e but must be caught by the Foreman QP checkpoint:

| ID | Anti-Pattern Name | Description | Detection Method |
|----|------------------|-------------|------------------|
| **AAP-10** | **Bundle returned without final-state normalization declaration** | The ECAP bundle is returned to the Foreman without the final acceptance block in the checklist completed (Section 9 of `execution-ceremony-admin-checklist.md`), or the block is present but not all sections are marked COMPLETE or N/A. | Review checklist Section 9 |
| **AAP-11** | **Reconciliation matrix not worked through** | The `execution-ceremony-admin-reconciliation-matrix.md` declaration was not completed — either missing entirely or all rows are empty. | Review reconciliation declaration block |
| **AAP-12** | **Exception declared without reason** | An item in the checklist or reconciliation matrix is marked `[N/A]` or `[Exception]` without a stated reason. Exceptions without justification cannot be assessed by the Foreman QP checkpoint. | Review exception fields |
| **AAP-13** | **Foreman QP checkpoint bypassed** | IAA was invoked without the Foreman explicitly completing and recording the QP admin-compliance checkpoint (`FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md §14.6`), leaving no `administrative_readiness: ACCEPTED` declaration. | Verify checkpoint artifact exists and is committed |
| **AAP-14** | **ECAP bundle forwarded with unresolved Foreman-identified defects** | The Foreman identified specific defects at the QP checkpoint (`administrative_readiness: REJECTED`) but invoked IAA anyway without returning the bundle to ECAP for remediation. | Review checkpoint verdict and IAA invocation timestamp |
| **AAP-22** | **Active-bundle scope not declared for cross-artifact scan** | When the ECAP agent or Foreman QP performs a cross-artifact final-state consistency scan, the scan covers the entire append-only historical archive (all committed session memories, all pre-token proofs) rather than scoping to only the active final-state bundle for the current job. This creates false positives by flagging historical artifacts that legitimately contain provisional wording from earlier sessions. | Verify that cross-artifact scans are scoped to: (a) the latest session memory per agent workspace, (b) the current (non-superseded) PREHANDOVER proof, (c) the current ECAP reconciliation summary, and (d) the current wave record — not all historical files. |

---

## Severity Classification

| Severity | Definition | Examples |
|----------|-----------|---------|
| **S1 — Auto-Fail** | Immediately fails §4.3e gate and triggers IAA rejection. No discretion. | AAP-01 through AAP-21 |
| **S2 — Foreman QP Blocker** | Must be resolved at Foreman QP checkpoint before IAA invocation. Discretion allowed only if explicitly documented. | AAP-22 |

---

## Remediation Patterns

| Anti-Pattern | ECAP Remediation Action |
|-------------|------------------------|
| AAP-01 | Find all `PENDING`/`in progress` wording in ceremony artifacts; replace with definitive status. Recommit. |
| AAP-02 | Audit every version reference in the document. Align all internal version labels to the single correct current version. |
| AAP-03 | Find the actual committed path of the artifact; update all references to use the correct path. If artifact was not committed, commit it. |
| AAP-04 | Run `git diff --name-only origin/main...HEAD > /tmp/actual-files.txt`; regenerate `governance/scope-declaration.md`; commit the regenerated file as the last change. |
| AAP-05 | Run `sha256sum <file>`; update the hash in every artifact that declared the old hash. Commit. |
| AAP-06 | Open the actual token file; copy the exact session ID; update PREHANDOVER `iaa_audit_token` and `iaa_session_reference` to match. Create a new PREHANDOVER proof (do not edit a committed one). |
| AAP-07 | Recount the actual items; update all declared counts to match. Regenerate scope declaration if FILES_CHANGED was wrong. |
| AAP-08 | Identify all PUBLIC_API-scoped changed files; add a ripple assessment block to the ECAP reconciliation summary with COMPLETED / DEFERRED / NOT-APPLICABLE status for each. |
| AAP-09 | For each mismatch: correct the ceremony artifact to reflect actual committed state. Recommit. Do not edit committed PREHANDOVER proofs — create a new proof. |
| AAP-15 | Enumerate every gate check performed and its individual outcome in the gate inventory section of the PREHANDOVER proof or ECAP reconciliation summary. Then re-affirm gate parity based on the explicit inventory. |
| AAP-16 | Replace all provisional gate-pass wording with definitive PASS or FAIL (with evidence). If the gate has not yet been run, run it before declaring status. |
| AAP-17 | Remove all template instruction text, [fill in] placeholders, and ASSEMBLY_TIME_ONLY blocks from the artifact. Ensure every field has a real value. Recommit. |
| AAP-18 | Record the actual issued IAA token reference in `iaa_audit_token` and the actual IAA session ID in `iaa_session_reference`. These must match the token file on the branch. |
| AAP-19 | Identify the authoritative final-state value; update all ceremony artifacts to declare that same value consistently. Do not edit committed PREHANDOVER proofs — create new ones for subsequent rounds. |
| AAP-20 | For each carried-forward claim: verify the named source artifact contains the stated claim without modification. If the claim differs, restate it explicitly as a new claim (not carried forward). |
| AAP-21 | Remove the ASSEMBLY_TIME_ONLY block from the output artifact. These blocks must only appear in template source files, never in committed instance/output artifacts. |

---

## References

- `governance/canon/EXECUTION_CEREMONY_ADMINISTRATION_PROTOCOL.md` v1.2.0 — §3.5–§3.9
- `governance/canon/AGENT_HANDOVER_AUTOMATION.md` v1.5.0 — §4.3e + Auto-Fail Rules
- `governance/canon/INDEPENDENT_ASSURANCE_AGENT_CANON.md` v1.7.0 — §Admin-Ceremony Rejection Triggers
- `governance/canon/FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md` v1.5.0 — §14.6
- `governance/checklists/execution-ceremony-admin-checklist.md` — verification checklist
- `governance/checklists/execution-ceremony-admin-reconciliation-matrix.md` — dependency matrix

---

*Version: 1.1.0 | Effective: 2026-04-19 | Authority: CS2 (Johan Ras)*
