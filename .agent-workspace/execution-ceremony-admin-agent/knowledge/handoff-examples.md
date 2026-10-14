# ECAP Handoff Decision Examples

**Version:** 1.0.0
**Effective date:** 2026-10-14
**Purpose:** Illustrative decision patterns only. These are not execution records, appointments, sessions, incidents, or evidence.

## Source head disagrees with the appointment

**Observed:** The appointment identifies one source head; the current branch reports another.
**Action:** Stop before normalizing artifacts. Return the appointment source, observed branch/head, and affected checks to Foreman. Do not rewrite the appointment or infer that the newer head is intended.

## A proof references an uncommitted artifact

**Observed:** A handover claim names a file that exists only in a working tree or cannot be resolved at the claimed source commit.
**Action:** Mark the claim unsupported, record the exact path and check, and return it to the artifact owner through Foreman. Do not state that it is committed.

## A prior rejection is retained beside current evidence

**Observed:** A historical rejection remains in the append-only record while a later correction is being reviewed.
**Action:** Preserve the rejection and its chronology. Validate the later evidence independently; do not edit or replace the prior outcome.

## A canonical owner record needs a correction

**Observed:** Reconciliation identifies a mismatch in a wave record, scope declaration, global index, integrity baseline, or other owner-controlled file outside ECAP's workspace.
**Action:** Prepare the exact proposed bytes, source references, hash, and diff in ECAP's own workspace. Return the payload to the named publisher; do not make the external write.

## Administrative checks are complete but Foreman has not reviewed

**Observed:** The assigned evidence checks have results, but the Foreman checkpoint is absent.
**Action:** Return `BUNDLE_READY_FOR_FOREMAN_REVIEW` only as an administrative handback, with the checkpoint explicitly owned by Foreman. Do not call the work accepted or assured.

## An assurance token is requested directly

**Observed:** A task participant asks ECAP to invoke IAA, create a token, or mark the bundle merge-ready.
**Action:** Refuse and direct the request to Foreman. ECAP has no invocation, verdict, token, or merge authority.
