# LEGACY KNOWLEDGE INTEGRATION AND ARCHITECTURE CONSOLIDATION STRATEGY

**Type**: Platform Strategy  
**Strategy ID**: LKIAC-001  
**Authority**: Johan Ras (CS2)  
**Status**: Agreed Strategy  
**Version**: 1.0.0  
**Created**: 2026-03-01  
**Applies To**: `maturion-isms` monorepo, `maturion-maturity-legacy` app, `maturion-foreman-office-app`, `packages/ai-centre/` (AIMC)  
**Purpose**: Define the phased consolidation strategy for migrating legacy knowledge assets and AI persona into the AIMC, deprecating overlapping legacy components, and establishing the correct architectural boundary between the Foreman Office App and the ISMS module suite.  
**Related**:
- `maturion/strategy/MATURION_AI_MANAGEMENT_CENTRE_STRATEGY.md` (AIMC-001)
- `maturion/strategy/Maturion_AI_Scaling_Strategy.md` (AI model tiering)
- `governance/canon/AIMC_STRATEGY.md` (canonical runtime AI architecture)
- `maturion/strategy/CROSS_REPO_ORCHESTRATION_STRATEGY.md` (cross-repo event contracts)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Current State Assessment](#2-current-state-assessment)
3. [Strategic Decisions](#3-strategic-decisions)
4. [Architecture Boundary: Foreman Office App vs ISMS](#4-architecture-boundary-foreman-office-app-vs-isms)
5. [Phased Execution Plan](#5-phased-execution-plan)
6. [Deprecation Register](#6-deprecation-register)
7. [Knowledge Re-ingestion Plan](#7-knowledge-re-ingestion-plan)
8. [Governance Principles](#8-governance-principles)
9. [Success Criteria](#9-success-criteria)

---

## 1. Executive Summary

### 1.1 Context

The `maturion-maturity-legacy` application (`apps/maturion-maturity-legacy/` within `maturion-isms`) was the original attempt at building the Maturion Roadmap module before the current ISMS monorepo architecture was established. During this early phase, valuable assets were created:

- **Hundreds of knowledge files** — chunked, labelled, and embedded into a Supabase project (`dmhlxhatogrrrvuruayv`) using pgvector. These represent the first practical instantiation of domain knowledge embeddings for the Maturion AI system.
- **The `Maturion` agent persona** (`src/agents/maturion/prompts/system.md`) — a well-structured, standards-anchored AI system prompt covering all six ISMS domains (ISO 27001, NIST, PCI DSS, SOC 2, etc.). This is a genuine intellectual asset.
- **UI component patterns**, auth infrastructure, and functional module blueprints (assessments, QA, watchdogs, data sources management).

### 1.2 The Problem

The legacy app:
- Is deployed against a separate Supabase project, outside the AIMC's governed memory architecture.
- Contains overlapping components (dashboards, watchdogs, admin config) that are being superseded by the Foreman Office App.
- Has no integration path to the AIMC's `packages/ai-centre/` layer.
- Keeps valuable knowledge assets locked in an architecture that is not the canonical knowledge store.

### 1.3 Strategic Decision Summary

| Decision | Resolution |
|---|---|
| Where does the knowledge belong? | `packages/ai-centre/` — specifically the `ai_knowledge` table in the AIMC's Supabase project |
| Where does the Maturion persona belong? | `packages/ai-centre/agents/` — as a governed runtime advisor persona |
| What happens to overlapping dashboards/watchdogs? | Parallel-run until Foreman Office App equivalents are live; then deprecate |
| Does the Foreman Office App merge into ISMS? | **No.** It remains a separate, independent control plane above ISMS |
| How do Foreman App and ISMS connect? | Via defined API/event contracts, not code co-location |

---

## 2. Current State Assessment

### 2.1 What `maturion-maturity-legacy` Contains

| Layer | Asset | Value Assessment |
|---|---|---|
| `src/agents/maturion/prompts/system.md` | Maturion AI consultant persona | **HIGH** — standards-anchored, multi-domain, production-quality system prompt |
| Supabase `dmhlxhatogrrrvuruayv` | Hundreds of labelled, embedded knowledge chunks | **HIGH** — significant knowledge investment; must be migrated, not discarded |
| `src/pages/MaturionKnowledgeBase.tsx` | Knowledge base browse UI | **MEDIUM** — useful pattern; can inform AIMC knowledge browsing module |
| `src/pages/MaturionUploads.tsx` | Knowledge upload UI | **MEDIUM** — useful pattern; may be adopted or superseded by Foreman App |
| `src/pages/WatchdogDashboard.tsx` | Watchdog monitoring UI | **LOW** — being superseded by Foreman Office App |
| `src/pages/AdminHealthChecker.tsx` | Admin health checker | **LOW** — being superseded by Foreman Office App |
| `src/pages/AdminWorkflowDashboard.tsx` | Workflow dashboard | **LOW** — being superseded by Foreman Office App |
| `src/pages/AdminConfig.tsx` | Admin config | **LOW** — being superseded by Foreman Office App |
| `src/pages/QADashboard.tsx`, `UnifiedQADashboard.tsx`, `QATestDashboard.tsx` | QA dashboards | **MEDIUM** — review against Foreman App parity before deprecating |
| `src/pages/DataSourcesManagement.tsx` | Data sources management | **MEDIUM** — review against AIMC data source registry |
| Auth, routing, subscription, team management pages | Core module features | **HIGH** — these are part of the MAT module, not legacy-specific |

### 2.2 What the AIMC Already Has (Target Architecture)

Per `governance/canon/AIMC_STRATEGY.md` v1.0.0 and `packages/ai-centre/supabase/migrations/003_ai_knowledge.sql`:

```sql
CREATE TABLE IF NOT EXISTS ai_knowledge (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id TEXT        NOT NULL,
  content         TEXT        NOT NULL,
  source          TEXT,
  embedding       vector(1536),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

This schema already defines the correct home for all knowledge content. The AIMC is ready to receive migrated knowledge.

### 2.3 What the Foreman Office App Is

The `maturion-foreman-office-app` is the **governance control plane** for the entire ISMS ecosystem. It:
- Governs builder agents via contracts
- Manages gate approvals and merge authorisation
- Provides the admin interface for overseeing all ISMS modules
- Is a **first-class consumer** of the AIMC

It is architecturally **above** ISMS, not a part of it. It must not be merged into the ISMS monorepo.

---

## 3. Strategic Decisions

### 3.1 Knowledge Assets → AIMC `ai_knowledge` Table

The knowledge embeddings currently in Supabase project `dmhlxhatogrrrvuruayv` must be migrated to the AIMC's Supabase project, into the `ai_knowledge` table with:
- `organisation_id` scoping (RLS enforced per AIMC architecture)
- Domain tagging via the `source` field (to enable domain-specialist routing)
- Re-embedding using the same vector model as the AIMC (1536-dimension, OpenAI-compatible)

**The legacy Supabase project `dmhlxhatogrrrvuruayv` must be decommissioned** after verified migration. It occupies a Supabase free-tier slot.

### 3.2 Maturion Agent Persona → `packages/ai-centre/agents/`

The Maturion system prompt (`src/agents/maturion/prompts/system.md`) must be migrated to `packages/ai-centre/agents/maturion-advisor.md` (or equivalent path per AIMC agent persona convention). It becomes the governed runtime advisor persona for the AIMC, surfaced via domain specialist routing.

### 3.3 Domain Specialist Knowledge Routing

Once knowledge is in `ai_knowledge`, domain specialists must be configured to query the relevant knowledge subset by tagging rows with a `domain` or `source` label. The label taxonomy must align with the AIMC domain specialist definitions.

### 3.4 Overlapping Legacy Components → Parallel-Run Then Deprecate

Legacy components that overlap with Foreman Office App must NOT be cut until:
1. The Foreman App equivalent is live and tested.
2. A formal deprecation entry is recorded in the Deprecation Register (Section 6).
3. CS2 has authorised the decommission.

### 3.5 Foreman Office App → Separate Control Plane, Connected via Contracts

The Foreman Office App must remain a separate repository. Integration with ISMS modules is achieved through:
- **AIMC API surface** — Foreman App calls the AIMC as a governed consumer
- **Governance event bridge** — layer-down/layer-up automation (PR #698 established this)
- **Shared Supabase RLS** — access controlled at the database layer, not at the code layer

The Foreman App is the **command console**. It reads from ISMS modules and pushes governance decisions back via issues/PRs, all through defined contracts.

---

## 4. Architecture Boundary: Foreman Office App vs ISMS

```
┌─────────────────────────────────────────────────────────────────┐
│              maturion-foreman-office-app                        │
│              (Governance Control Plane)                         │
│                                                                 │
│  - Build agent governance          - Gate approval UI           │
│  - Merge authorisation console     - ISMS module oversight      │
│  - Governance event viewer         - Knowledge upload interface │
│                                                                 │
│  ↕ API contracts + governance events (layer-down/layer-up)      │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                    maturion-isms (monorepo)                     │
│                                                                 │
│  ┌─────────────────────────────────┐                           │
│  │  packages/ai-centre/ (AIMC)     │                           │
│  │  - ai_knowledge (pgvector RAG)  │                           │
│  │  - Domain specialists           │                           │
│  │  - Maturion advisor persona     │                           │
│  │  - Memory Centre                │                           │
│  └────────────────┬────────────────┘                           │
│                   │ @maturion/ai-centre API                     │
│  ┌────────────────┼────────────────────────────────────────┐   │
│  │  ISMS Modules  │                                        │   │
│  │  MAT  PIT  XDETECT  R_Roster  PartPulse  ...           │   │
│  └────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

**Rule**: No ISMS module may call an AI provider directly. No Foreman App feature may embed itself inside the ISMS monorepo. All AI capability flows through the AIMC. All governance decisions flow through contracts and events.

---

## 5. Phased Execution Plan

### Wave 1 — Persona Migration (Priority: HIGH, Dependency: None)

**Objective**: Extract and migrate the Maturion agent persona from legacy into the AIMC.

**Tasks**:
1. Read `apps/maturion-maturity-legacy/src/agents/maturion/prompts/system.md`
2. Review and update the persona to align with current AIMC domain taxonomy and agent architecture
3. Create `packages/ai-centre/agents/maturion-advisor.md` (or path per AIMC convention)
4. Register the persona in the AIMC agent registry
5. Update AIMC domain specialist routing to reference the persona

**Gate**: CS2 review and sign-off on persona content before it is activated.

---

### Wave 2 — Knowledge Inventory and Domain Tagging Plan (Priority: HIGH, Dependency: None)

**Objective**: Audit and catalogue all knowledge chunks in the legacy Supabase project.

**Tasks**:
1. Query legacy Supabase project (`dmhlxhatogrrrvuruayv`) to enumerate all knowledge chunks and their labels
2. Map legacy labels to AIMC domain taxonomy
3. Produce a domain-tagging mapping document
4. Define the `source` field taxonomy for `ai_knowledge` rows (aligning with AIMC domain specialists)

**Gate**: CS2 review of domain mapping before migration begins.

---

### Wave 3 — Knowledge Re-ingestion (Priority: HIGH, Dependency: Wave 2)

**Objective**: Migrate all knowledge embeddings into the AIMC `ai_knowledge` table.

**Tasks**:
1. Write a migration script (TypeScript, aligning with AIMC tooling) that:
   - Reads from legacy Supabase project
   - Re-embeds content using the AIMC vector model (1536-dim)
   - Inserts rows into `ai_knowledge` with correct `organisation_id` and `source` tags
2. Run migration in a non-destructive mode (verify counts match before decommissioning legacy)
3. Validate semantic search returns correct results post-migration
4. Decommission legacy Supabase project `dmhlxhatogrrrvuruayv`

**Gate**: Validated migration report. CS2 sign-off before decommission.

---

### Wave 4 — Domain Specialist Knowledge Routing (Priority: MEDIUM, Dependency: Wave 3)

**Objective**: Configure AIMC domain specialists to query the correct knowledge subset.

**Tasks**:
1. Update each domain specialist agent contract to include knowledge retrieval instructions
2. Implement `source`-filtered semantic search queries per specialist
3. Integration test: domain-specific queries return domain-relevant knowledge

**Gate**: Integration tests pass. IAA review.

---

### Wave 5 — Deprecation Register Activation and Legacy Component Audit (Priority: MEDIUM, Dependency: None)

**Objective**: Formally document which legacy components are to be deprecated and under what conditions.

**Tasks**:
1. Complete the Deprecation Register (Section 6) with current status for each component
2. Map each legacy component to its Foreman App or AIMC equivalent
3. Identify any legacy components with NO current equivalent (flag as gaps)
4. Create issues in `maturion-isms` for any gaps that require new Foreman App features

**Gate**: CS2 review and sign-off on deprecation register.

---

### Wave 6 — Foreman Office App API Contract Definition (Priority: MEDIUM, Dependency: Wave 4)

**Objective**: Define the formal API and event contract between the Foreman Office App and the AIMC.

**Tasks**:
1. Define the AIMC API surface that Foreman App will consume
2. Define the governance event schema for layer-down/layer-up communication
3. Document the Supabase RLS rules governing Foreman App data access
4. Create `governance/canon/FOREMAN_ISMS_INTEGRATION_CONTRACT.md`

**Gate**: CS2 review and canonisation.

---

### Wave 7 — Legacy Component Decommission (Priority: LOW, Dependency: Waves 5 + 6 + Foreman App parity confirmed)

**Objective**: Decommission legacy components that have been superseded.

**Tasks**:
1. For each component in the Deprecation Register with status `SUPERSEDED`:
   - Remove routes from `apps/maturion-maturity-legacy/src/App.tsx`
   - Archive or delete component files
   - Update BUILD_PROGRESS_TRACKER
2. Evaluate whether the legacy app itself can be retired entirely (if all core routes are superseded)

**Gate**: IAA audit. CS2 sign-off. Zero-tolerance check: no active user-facing routes removed without verified Foreman App equivalent.

---

## 6. Deprecation Register

> Status values: `ACTIVE` | `PARALLEL-RUN` | `SUPERSEDED` | `DECOMMISSIONED`

| Component | Legacy Path | Foreman App Equivalent | Status | Gate |
|---|---|---|---|---|
| Watchdog Dashboard | `pages/WatchdogDashboard.tsx` | Foreman Office App — monitoring module | `ACTIVE` | Foreman parity required |
| Admin Health Checker | `pages/AdminHealthChecker.tsx` | Foreman Office App — health module | `ACTIVE` | Foreman parity required |
| Admin Workflow Dashboard | `pages/AdminWorkflowDashboard.tsx` | Foreman Office App — workflow module | `ACTIVE` | Foreman parity required |
| Admin Config | `pages/AdminConfig.tsx` | Foreman Office App — config module | `ACTIVE` | Foreman parity required |
| QA Dashboard (legacy) | `pages/QADashboard.tsx` | TBD | `ACTIVE` | Gap assessment required |
| Unified QA Dashboard | `pages/UnifiedQADashboard.tsx` | TBD | `ACTIVE` | Gap assessment required |
| QA Test Dashboard | `pages/QATestDashboard.tsx` | TBD | `ACTIVE` | Gap assessment required |
| Data Sources Management | `pages/DataSourcesManagement.tsx` | AIMC data source registry | `ACTIVE` | AIMC integration required |
| Knowledge Base UI | `pages/MaturionKnowledgeBase.tsx` | Foreman App or AIMC admin | `ACTIVE` | Migration assessment required |
| Knowledge Upload UI | `pages/MaturionUploads.tsx` | Foreman App or AIMC admin | `ACTIVE` | Migration assessment required |
| Maturion Agent Persona | `src/agents/maturion/prompts/system.md` | `packages/ai-centre/agents/` | `ACTIVE` | Wave 1 migration |
| Legacy Supabase project `dmhlxhatogrrrvuruayv` | External Supabase project | AIMC Supabase project | `ACTIVE` | Wave 3 migration + verification |

---

## 7. Knowledge Re-ingestion Plan

### 7.1 Source

- **Supabase project**: `dmhlxhatogrrrvuruayv` (legacy)
- **Schema**: Legacy knowledge chunks table (to be enumerated in Wave 2 audit)
- **Volume**: Hundreds of labelled, embedded knowledge files

### 7.2 Target

- **Supabase project**: AIMC project (governed, RLS-enforced)
- **Table**: `ai_knowledge`
- **Schema**:
  ```sql
  id              UUID        — auto-generated
  organisation_id TEXT        — scope to Maturion organisation
  content         TEXT        — raw chunk content
  source          TEXT        — domain tag (e.g. "iso27001", "nist", "pci-dss", "soc2", "general")
  embedding       vector(1536) — re-embedded using AIMC vector model
  created_at      TIMESTAMPTZ — auto-generated
  ```

### 7.3 Domain Tagging Convention

| Source Tag | Coverage |
|---|---|
| `iso27001` | ISO/IEC 27001 and related standards |
| `nist` | NIST CSF, SP 800 series |
| `pci-dss` | PCI DSS requirements |
| `soc2` | SOC 2 Trust Services Criteria |
| `risk-management` | General risk management frameworks |
| `general` | Cross-domain, foundational knowledge |

> Note: This taxonomy must be validated and extended in Wave 2 based on actual legacy label audit.

### 7.4 Validation Criteria

Before decommissioning the legacy Supabase project:
- Total row count in `ai_knowledge` ≥ total rows in legacy knowledge table
- Semantic search test set (minimum 10 queries per domain) returns relevant results
- IAA audit of migration output

---

## 8. Governance Principles

1. **No knowledge is discarded.** All legacy knowledge assets must be migrated and validated before the legacy source is decommissioned.
2. **No module may bypass the AIMC.** All AI capability — including knowledge retrieval — flows through `packages/ai-centre/`.
3. **No legacy component is removed without a verified equivalent.** The Deprecation Register governs all decommissions. CS2 must authorise each decommission.
4. **The Foreman Office App is a consumer, not a component.** It calls ISMS services via contracts. It is never embedded in the ISMS monorepo.
5. **All waves are gated.** No wave may begin until the previous wave's gate criteria are met and CS2 has signed off.
6. **Domain specialists are the knowledge routing layer.** They must be updated before knowledge retrieval goes live in any module.

---

## 9. Success Criteria

| Criterion | Measurement |
|---|---|
| Maturion persona live in AIMC | `packages/ai-centre/agents/maturion-advisor.md` exists, is registered, and is surfaced in at least one domain specialist |
| All legacy knowledge migrated | `ai_knowledge` row count ≥ legacy count; semantic test suite passes |
| Legacy Supabase project decommissioned | Project `dmhlxhatogrrrvuruayv` deleted; Supabase free-tier slot recovered |
| Domain specialists routing to knowledge | Integration tests pass for all six domain areas |
| Deprecation Register complete | All legacy components have a recorded status and gate condition |
| Foreman App integration contract defined | `governance/canon/FOREMAN_ISMS_INTEGRATION_CONTRACT.md` exists and is canonised |
| No direct AI provider calls in any module | Code audit confirms all AI calls route through `@maturion/ai-centre` |

---

*Authority: Johan Ras (CS2)*  
*Strategy ID: LKIAC-001*  
*Version: 1.0.0 — 2026-03-01*  
*Next Review: After Wave 3 completion or on CS2 request*
