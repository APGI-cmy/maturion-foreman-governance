# LIVING CANON ALIGNMENT — EXECUTION PLAN (PR + AUTO-MERGE)
**Plan ID**: LCAP-001  
**Status**: Strategy (intended for promotion to canon once proven)  
**Owner Authority**: CS2  
**Applies To**: All consumer repositories in the APGI-cmy ecosystem  
**Canonical Source Repo**: APGI-cmy/maturion-foreman-governance  
**Automation Model**: Distributed execution (each repo aligns itself), central policy (governance repo)

---

## 0) Objective (Non-Negotiable)

Establish a fully automated, deterministic, auditable governance alignment system where:

1. Canonical governance artifacts are defined in a single canonical inventory in the governance repo.
2. Every consumer repo independently detects governance drift against the canonical inventory.
3. On drift, the consumer repo automatically layers down required artifacts, opens a PR, runs gates, and auto-merges when green.
4. If blocked, the consumer repo triggers stop-and-fix behavior, generates evidence and RCA artifacts, and escalates via issues (without changing governance or agent contracts unless CS2 authorizes).
5. Agents do not require manual updates because alignment is continuous and event-driven.

---

## 1) Definitions

### 1.1 Canonical Inventory (Machine Contract)
**Canonical File**: `governance/CANON_INVENTORY.json` in `APGI-cmy/maturion-foreman-governance`

Purpose:
- Defines the canonical set of governance artifacts, their paths, type, version, and integrity hash.
- Acts as the single authoritative drift detection source.

### 1.2 Human Inventory (Audit Ledger)
**Consumer File**: `GOVERNANCE_ARTIFACT_INVENTORY.md` in each consumer repo

Purpose:
- Human-readable ledger of what was layered down, when, from what canonical commit, and under which PR.
- Append-only operational history + escalation record.

### 1.3 Local Sync State (Machine State)
**Consumer File**: `.agent-admin/governance/sync_state.json`

Purpose:
- Records last canonical commit SHA used, last successful alignment PR, last check timestamp, and last drift results.
- This is *not canon*; it is runtime state.

---

## 2) Required Standardization (Ecosystem-Wide)

### 2.1 Canonical Inventory Requirements (Governance Repo)
The governance repo MUST ensure:

1. `governance/CANON_INVENTORY.json` exists and is maintained.
2. Every canon/policy entry with `layer_down_status: "PUBLIC_API"` MUST have a real, non-placeholder hash.
3. Hash MUST be deterministic and strong:
   - Preferred: `sha256` (full length)
   - Optional additional: `git_blob_sha`
4. Canon inventory MUST be reproducible:
   - `generation_timestamp` is informational, but hashes must match content exactly.
5. Inventory MUST include enough data for consumers to decide what to layer down:
   - `path`, `type`, `layer_down_status`, `description`, `effective_date`, `version`, `hash`

**Stop-and-fix rule**: If any PUBLIC_API item has `file_hash: "placeholder"` the inventory is considered **incomplete** and consumer repos MUST:
- open a Governance Change Request issue (template below)
- proceed only with entries that have valid hashes
- record partial alignment as “DEGRADED” in sync_state

### 2.2 Consumer Repository Minimum Files
Each consumer repo MUST have:

1. `GOVERNANCE_ARTIFACT_INVENTORY.md` (human ledger)
2. `.agent-admin/governance/sync_state.json` (machine state)
3. `governance/` directory (layer-down target root)

Consumer repos MAY keep a local copy of `CANON_INVENTORY.json` for reference, but it is not authoritative and must not be treated as the source of truth (Option 1 model).

---

## 3) Alignment Loop (Distributed, Fully Automated)

### 3.1 Triggers
Each consumer repo MUST run alignment via GitHub Actions on:

1. **Schedule** (pull model): recommended every 1 hour (or 1 day minimum)
2. **Manual dispatch**: workflow_dispatch
3. **Dispatch ripple** (push model): repository_dispatch event from governance repo (optional but recommended)

### 3.2 Drift Detection Steps (Consumer)
On every run:

1. Fetch canonical inventory from governance repo `main` (raw URL).
2. Resolve canonical `main` → commit SHA (record this SHA).
3. For each `PUBLIC_API` item in canonical inventory:
   - fetch canonical content (raw at the resolved commit SHA)
   - compute sha256
   - compute local sha256 if local file exists
   - classify:
     - MISSING (file not present locally)
     - DRIFT (hash mismatch)
     - ALIGNED (hash match)
4. Record results in:
   - `.agent-admin/governance/sync_state.json`
   - append summary into `GOVERNANCE_ARTIFACT_INVENTORY.md` (Alignment section)

### 3.3 Self-Alignment Steps (Consumer)
If drift detected:

1. Create a new branch: `governance/alignment/<date>-<canonicalShaShort>`
2. For each MISSING/DRIFT artifact:
   - download canonical artifact from canonical commit SHA
   - write to the same `path` in the consumer repo
3. Update:
   - `GOVERNANCE_ARTIFACT_INVENTORY.md` (tables + layer-down history)
   - `.agent-admin/governance/sync_state.json`
   - `.agent-admin/sessions/governance-liaison/<session-id>.md` (session contract)
   - `.agent-admin/governance/evidence/<session-id>_evidence.log`
4. Run validation gates (see §4).
5. Open PR: “Governance alignment: <canonicalShaShort>”
6. Enable auto-merge when checks pass (if repository settings permit).

**Stop-and-fix rule**: If validation fails, the workflow MUST:
- keep PR open
- attach logs
- create a local issue “Stop-and-Fix: governance alignment failed” with RCA template
- do not retry blindly; require root-cause capture first

---

## 4) Validation Requirements (Consumer)

### 4.1 Minimum validations (always)
1. JSON validity for any JSON modified/added
2. No missing files referenced by agent contracts (basic path existence checks)
3. Hash verification of layered-down artifacts (post-write recompute)

### 4.2 Optional validations (if scripts exist)
If present, run:
- `scripts/validate_baseline.sh governance-liaison`
- `python scripts/validate_agent_contracts.py` (or equivalent)

### 4.3 Failure handling
If any validation fails:
- classify failure category
- record in RCA artifacts
- do not “retry PR” without executing PR failure analysis protocol (if present)

---

## 5) Governance Change Request Loop (CS2-only governance edits)

Consumer repos MUST NOT modify canonical governance.

When a consumer detects a canonical problem (e.g., placeholder hash, missing artifact referenced by inventory, broken canon link), it MUST open an issue in governance repo:

### 5.1 Governance Change Request Issue Template
Title:
- `GOVERNANCE CHANGE REQUEST: <short summary>`

Body must include:
- Canonical commit SHA observed
- File(s) involved
- Evidence: hashes, URLs, logs
- Proposed remediation (proposal only)
- Impact/ripple analysis

**Authority**:
- Issue is a request; merge requires CS2 authorization.

---

## 6) Inventory Consistency Standard (Human Ledger)

To standardize display across repos while remaining “fit for purpose”, every `GOVERNANCE_ARTIFACT_INVENTORY.md` MUST include these headings verbatim:

1. `## Governance Alignment Status`
2. `## Layered-Down Governance Files`
3. `## Layer-Down History`
4. `## Escalations`
5. `## Pending Canon Files`

All other sections are optional.

---

## 7) Token / Permission Setup (Human Step-by-Step)

### 7.1 Goal
Enable GitHub Actions in each consumer repo to:
- create branches
- commit changes
- open PRs
- enable auto-merge

### 7.2 Minimal recommended approach
Use a dedicated GitHub identity:
- `maturion-bot` (recommended)
- add as collaborator with least privileges needed

Create a fine-grained PAT for that identity with:
- Repository permissions: Contents (Read/Write), Pull requests (Read/Write), Issues (Read/Write)
- Limit to your repositories/org

Store PAT in each consumer repo as:
- `MATURION_BOT_TOKEN` (Actions secret)

### 7.3 Optional: dispatch ripple across repos
If governance repo will send repository_dispatch:
- the token used by governance repo workflow needs permission to send dispatch events to target repos
- store as `RIPPLE_DISPATCH_TOKEN` secret in governance repo

**If tokens are not configured**, the system must still function via scheduled pull alignment.

---

## 8) Implementation Phases (Do in this order)

### Phase 1 — Canon inventory quality (governance repo)
- Eliminate placeholder hashes for PUBLIC_API artifacts
- Upgrade hash format to full SHA-256 (or add `sha256` field)
- Add canonical provenance rule: inventory generation records commit SHA

### Phase 2 — Consumer alignment workflow template
- Create a standard workflow file to run drift detection + PR alignment
- Add standard artifact outputs (.agent-admin paths)

### Phase 3 — Rollout to Foreman app repo first
- It is the operational center; use it as reference implementation

### Phase 4 — Rollout to all consumer repos
- PartPulse, R_Roster, others
- Enforce minimum headings in human ledger

### Phase 5 — Add ripple push dispatch (optional but recommended)
- governance repo triggers alignment runs downstream on canon merge

---

## 9) Success Criteria (Definition of Done)
System is considered “living + automated” when:

1. Governance repo canonical inventory has no placeholder hashes for PUBLIC_API.
2. Every consumer repo opens and auto-merges a governance alignment PR within SLA after canon changes.
3. Drift detection produces deterministic results (content hash based).
4. Failed alignments produce RCAs and do not repeat without analysis.
5. Human inventory remains consistent and auto-updated.
6. No manual agent file edits are needed to stay aligned.

---
