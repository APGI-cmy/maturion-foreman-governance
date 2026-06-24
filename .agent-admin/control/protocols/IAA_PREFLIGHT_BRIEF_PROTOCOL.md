# IAA_PREFLIGHT_BRIEF Protocol

**Status**: Active control protocol  
**Authority**: CS2  
**Purpose**: Define the canonical pre-brief control used before Independent Assurance Agent review.

---

## 1. Purpose

The `IAA_PREFLIGHT_BRIEF` is the canonical assurance pre-brief structure for governed work that requires independent assurance.

The pre-brief must give IAA enough context to understand:

- repository and PR scope;
- affected governance or product surface;
- authority source;
- evidence provided;
- known limitations;
- specific assurance questions.

---

## 2. Canonical Placement

The preferred canonical placement for an IAA pre-brief is inside an IAA wave record under a `## PRE-BRIEF` section.

If a repository uses a separate control artifact for a transitional wave, the artifact must reference `IAA_PREFLIGHT_BRIEF` and must not claim final assurance. Final assurance belongs in an assurance token, wave record, or rejection package.

---

## 3. Required Content

A valid `IAA_PREFLIGHT_BRIEF` must identify:

1. brief id;
2. repository;
3. PR number or wave id;
4. scope summary;
5. authority;
6. review focus;
7. evidence artifacts;
8. known limitations;
9. current status.

---

## 4. Prohibited Behaviour

The pre-brief must not:

- act as final IAA assurance;
- waive CS2 authority;
- activate a specialist or runtime capability by implication;
- convert a strategy/canon wave into implementation work;
- bypass ripple, inventory, or gate requirements.

---

## 5. PR #1373 Application

For PR #1373, the `IAA_PREFLIGHT_BRIEF` control confirms that the assurance question is limited to governance-canon creation and ripple evidence for the Maturion agent-network organigram.

It does not activate APW-specialist, Maturion-as-CS2, public chat retrieval, or runtime registry changes.
