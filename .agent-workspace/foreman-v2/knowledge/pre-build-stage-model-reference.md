# 12-Stage Pre-Build Model — Quick Reference

**Version**: 1.0.0  
**Created**: 2026-04-09  
**Authority**: CS2 (Johan Ras)  
**Canonical Source**: `governance/canon/PRE_BUILD_STAGE_MODEL_CANON.md`

---

## Purpose

Quick reference for the canonical 12-stage pre-build derivation chain. Foreman uses this to verify stage completion before delegating to builders (HALT-008 applies if stages 1–10 are incomplete).

---

## The 12-Stage Sequence

| Stage | Artifact | Gate | Delegation Lock |
|-------|----------|------|----------------|
| **1** | App Description | Approved by CS2 / client | ✓ |
| **2** | UX Workflow & Wiring Spec | Approved (mandatory for user-facing; Wiring Spec Only variant for non-user-facing) | ✓ |
| **3** | Functional Requirements Specification (FRS) | Approved; covers all Stage 2 user journeys | ✓ |
| **4** | Technical Requirements Specification (TRS) | Approved; covers all functional + technical constraints | ✓ |
| **5** | Architecture Design | Approved; all integration boundaries defined | ✓ |
| **6** | QA-to-Red (Red test suite) | FM signed off; tests cover Stages 1–5 derivation | ✓ |
| **7** | Pre-Build Functionality Assessment Gate (PBFAG) | Hard gate — PASS required; not situational review | ✓ |
| **8** | Implementation Plan | Approved; builder assignments indicative (Stage 9 finalizes) | ✓ |
| **9** | Builder Checklist | FM created and signed; all builders confirmed | ✓ |
| **10** | IAA Pre-Brief | Published via `task(agent_type: "independent-assurance-agent", action: "PRE-BRIEF")` | ✓ |
| **11** | Builder Appointment | FM issues "Build to Green" order — **DELEGATION BEGINS HERE** | — |
| **12** | Build | Builder executes; FM supervises; QP evaluates | — |

**HALT-008 applies**: Stages 1–10 must ALL be complete and gate-passed before FM delegates stage 11 (Builder Appointment). Any incomplete stage = HALT.

---

## Stage Gate Quick Check (Before Delegation)

```
[ ] Stage 1 — App Description: approved? [YES/NO]
[ ] Stage 2 — UX Workflow & Wiring Spec: approved? [YES/NO]
[ ] Stage 3 — FRS: approved? [YES/NO]
[ ] Stage 4 — TRS: approved? [YES/NO]
[ ] Stage 5 — Architecture Design: approved? [YES/NO]
[ ] Stage 6 — QA-to-Red: FM signed off? [YES/NO]
[ ] Stage 7 — PBFAG: PASS? [YES/NO]
[ ] Stage 8 — Implementation Plan: approved? [YES/NO]
[ ] Stage 9 — Builder Checklist: FM signed? [YES/NO]
[ ] Stage 10 — IAA Pre-Brief: published at [path]? [YES/NO]

ALL 10 must be YES before delegating stage 11.
```

---

## Common Failure Patterns This Model Prevents

| Pattern | Prevented By |
|---------|-------------|
| User workflows not fully specified | Stage 2 mandatory |
| UI/API wiring gaps surface after build | Stage 2 Wiring Spec |
| Build starts before architecture frozen | Stage 5 gate |
| PBFAG treated as optional | Stage 7 hard gate |
| IAA Pre-Brief skipped | Stage 10 mandatory |
| Builder readiness checks too late | Stage 9 Builder Checklist |

---

**Tier 3 Canon Reference**: `governance/canon/PRE_BUILD_STAGE_MODEL_CANON.md`  
**Tier 3 Canon Reference**: `governance/canon/PRE_BUILD_REALITY_CHECK_CANON.md`
