# LIVING CANON ALIGNMENT — STRATEGY (CANON → EXECUTABLE → LIVING)
**Strategy ID**: LCAS-001  
**Status**: Strategy (to be compiled into canon + executable enforcement)  
**Authority**: CS2 (non-delegable for governance and agent contract changes)  
**Scope**: Entire APGI-cmy ecosystem (governance repo + all consumer repos)  
**Operating Philosophy**: Proactive compliance, stop-and-fix, zero test debt, zero test dodging, no “later”, evidence-first

---

## 0) Strategic Objective

Build a **fully automated, self-aligning, self-improving governance ecosystem** where:

1. Canonical governance is authored in a single canonical repository.
2. All consumer repositories automatically detect governance drift and self-align via PRs.
3. All PR merges are **governance-verified**, not reactive, and never depend on manual log archaeology.
4. Agents operate proactively: they run prehandover checks, stop-and-fix before handover, and only submit work that will pass merge gates.
5. Every job produces improvement capture (“how could this have been done better”) without scope drift, via a governed parking mechanism.
6. Governance evolves through controlled promotion (CS2 authorization), and ripples down deterministically.

---

## 1) Why This Strategy Exists (Problem Statement)

### 1.1 The ecosystem is currently inconsistent
- Different repositories expose different numbers and names of PR checks (1, 3, 15, 30+).
- Some checks run only `on: push`, making them unreliable as PR merge requirements.
- Branch protection becomes difficult to configure safely; auto-merge can deadlock or allow unintended merges.

### 1.2 Canon drift detection is not yet deterministic enough
- Canon inventory contains placeholder hashes and/or truncated hashes.
- Placeholder hashes prevent strict drift validation.
- Truncated hashes reduce integrity assurance and auditability.

### 1.3 The system must remain proactive and resilient
- CI failures are costly because agents/humans cannot reliably interpret logs.
- A resilient system must prevent predictable failures by enforcing prehandover evidence and deterministic merge-gate verification.

---

## 2) The 3-Layer Model (Strategy → Canon → Executable)

This strategy MUST be “compiled” into two downstream layers:

### Layer A — Strategy (this file)
Defines intent, principles, target architecture, and rollout approach.

### Layer B — Canon (governance/canon/)
Defines the **normative requirements** (MUST/SHALL) for:
- canonical inventory integrity
- consumer alignment behavior
- evidence artifacts
- merge gate interface
- stop-and-fix + RCA + improvement capture obligations
- ripple propagation expectations
Canon changes require CS2 authorization.

### Layer C — Executable Enforcement (workflows/scripts/schemas)
Implements canon via:
- GitHub Actions workflows
- deterministic scripts
- schemas for evidence artifacts
- validators
Executable enforcement is the mechanism that makes governance “alive”.

---

## 3) Canonical Inventory as the Machine Source-of-Truth

### 3.1 Canonical Inventory Contract
Canonical repository MUST publish:
- `governance/CANON_INVENTORY.json`

Consumer repos MUST treat it as the authoritative machine contract.

### 3.2 Integrity Requirements (Missing Nuances to Fix)
To be deterministic and auditable:

1. **No placeholders** for any artifact classified as `PUBLIC_API` (or otherwise required by consumer repos).
2. Hashes MUST be strong and unambiguous:
   - Preferred: full `sha256`
   - Optional: also store full `git_blob_sha`
3. Canon inventory must be tied to provenance:
   - record the canonical commit SHA used when generating the inventory
4. The inventory must be reproducible:
   - same content → same hash
   - generation_timestamp is informational only

### 3.3 Consumer repos do NOT store canon inventory as truth (Option 1)
Consumers fetch canonical inventory at runtime.
Consumers store only local sync state:
- `.agent-admin/governance/sync_state.json` (machine state; not canon)

---

## 4) Alignment Loop (Distributed Execution, Central Policy)

### 4.1 Alignment Triggers
Each consumer repo runs governance alignment:
- scheduled (pull model)
- workflow_dispatch
- optional repository_dispatch (push ripple)

### 4.2 Drift Detection (Deterministic)
Consumers must:
- resolve canonical `main` → commit SHA
- compare local file hashes to canonical hashes
- classify each artifact: ALIGNED / MISSING / DRIFT

### 4.3 Self-Alignment (Automated via PR)
If drift exists:
- create a branch
- layer down missing/drift artifacts
- update inventory + evidence
- open PR
- enable auto-merge (subject to required checks passing)

**Stop-and-fix rule**: if alignment PR fails gates, the workflow must produce RCA artifacts and must not “retry blindly”.

---

## 5) Merge Gate Standardization (The Key to Auto-Merge + Reliability)

### 5.1 Standardize the Interface, Not the Internals
Repos may run many internal checks, but every repo MUST expose a stable, standard PR merge interface so branch protection is consistent.

### 5.2 Required PR Check Interface (Canonical)
Every repo MUST produce these PR checks (exact names standardized by canon):

1. `merge-gate/verdict`
2. `governance/alignment`
3. `stop-and-fix/enforcement`

Branch protection MUST require only these 3 checks (and no repo-specific checks).

### 5.3 Verdict Gate is Evidence-First (Not Reactive)
The system enforces proactive behavior by requiring committed evidence artifacts, not log archaeology.

The verdict gate MUST validate:
- required evidence artifacts exist in the PR diff
- evidence artifacts conform to schema and contain mandatory sections
- forbidden test-dodging language is absent
- required governance alignment has been satisfied
- PR classification rules are satisfied (OPOJD / wave model / IBWR / CST / VWT obligations when applicable)

### 5.4 Dynamic Compliance (Governance “Compilation”)
Governance changes must automatically update what the verdict gate expects.

Therefore:
- canon must define a machine-readable requirements index (or metadata) that verdict gate loads at runtime
- verdict gate computes “what is required for this PR type” deterministically

This avoids constant editing of workflows and avoids branch protection churn.

---

## 6) Mandatory Evidence Artifacts (Make Proactivity Enforceable)

To prevent “clever phrases” and ensure systematic improvement capture, canon must mandate standard artifacts.

At minimum, every PR must include:

1. **Prehandover Proof** (human readable)
2. **Gate Results Summary** (machine readable)
3. **Continuous Improvement Capture** (mandatory, parked if not in scope)
4. **RCA** when stop-and-fix occurred or when gates fail

These artifacts MUST be validated by `merge-gate/verdict`.

(Exact file paths and schemas are defined in canon; executable validators enforce them.)

---

## 7) CS2 Authority Boundaries (Non-Delegable Domains)

This strategy explicitly preserves CS2 boundaries:

- Canonical governance changes: CS2-only authorization.
- Agent contract changes: CS2-only authorization.
- Consumer repos may self-align canon artifacts (layer down) automatically.
- Consumer repos may create governance change requests upstream (issues/PR drafts) but may not merge canon.

---

## 8) Implementation Roadmap (No “Later”)

**Day 0 (2026-02-10)**  
- Freeze the 3-check standard interface.
- Create canon drafts for:
  - inventory integrity requirements (no placeholder hashes, sha256, provenance)
  - merge gate interface requirement
  - evidence artifact schemas + mandatory sections

**Day 1 (2026-02-11) — Pilot Repo**  
- Implement the 3-check interface in `maturion-foreman-office-app`.
- Switch branch protection to require only those checks.
- Confirm auto-merge merges a trivial PR successfully.

**Day 2 (2026-02-12) — Governance Repo**  
- Implement the same 3-check interface in governance repo.
- Ensure CS2-only governance change workflow remains enforced.

**Day 3 (2026-02-13) — Rollout**  
- Apply to PartPulse and R_Roster, then all consumer repos.

**Day 4 (2026-02-14) — Stabilization**  
- Run a controlled failing PR test to prove stop-and-fix + RCA + escalation behavior is automatic and reliable.

---

## 9) Definition of Done (Strategy Success Criteria)

The strategy is successfully executed when:

1. Canon inventory contains no placeholder hashes for required artifacts.
2. All repos expose the same 3 PR checks.
3. Branch protection across all repos requires only those 3 checks.
4. Auto-merge is enabled and works without deadlocks.
5. PR failures are evidence-first, fast to diagnose, and produce automatic RCA artifacts.
6. Every merged job includes continuous improvement capture without scope drift.

---
