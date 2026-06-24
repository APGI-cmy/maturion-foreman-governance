# Ripple Record: Maturion Agent Network Organigram Canon

**Ripple ID**: RIPPLE-MATURION-AGENT-NETWORK-ORGANIGRAM-20260624  
**Canon**: `governance/canon/MATURION_AGENT_NETWORK_ORGANIGRAM.md`  
**Canon Version**: 1.0.0  
**Authority**: CS2 - Johan Ras  
**Date**: 2026-06-24  
**Source Strategy**: `APGI-cmy/maturion-isms/Maturion/strategy/Maturion_agent_network_organigram_strategy.md` merged via maturion-isms PR #1849  
**Governance Agent Role**: governance-repo-administrator / VUPR pattern

---

## 1. Ripple Trigger

A new `PUBLIC_API` canon has been created to formalise the Maturion agent-network organigram.

The canon establishes the mandatory distinction between:

1. builder/governance agents; and
2. runtime/onboard application agents.

It also canonises Maturion's position as the single user-facing AI interface, the staged Maturion-as-CS2 authority model, specialist lifecycle states, public APW specialist boundaries, runtime context envelope expectations, and public-safe retrieval preconditions.

---

## 2. Touched Canonical Concepts

| Concept | Ripple Impact |
|---|---|
| Build/governance agent contracts | Must not be treated as production runtime specialists without governed runtime registration. |
| Runtime Maturion | Must remain the single coherent user-facing interface. |
| App specialists | APW/ISMS/MMM/MAT/PIT/XDETECT specialists must be defined and activated through lifecycle states. |
| Maturion-as-CS2 | Authority remains staged and must not be inferred from strategy, prompt, or local implementation alone. |
| Public APW chat | Public retrieval must remain public-safe, approved, non-tenant, and metadata-filtered. |
| Runtime registry | Must be designed before runtime specialists are considered active. |
| Knowledge planes | Subject Knowledge, Framework/Context, App Context and Memory must stay separated. |

---

## 3. Ripple Targets

### 3.1 Required Consumer Repositories

| Repository | Reason | Required Action |
|---|---|---|
| `APGI-cmy/maturion-isms` | Contains source strategy, Maturion runtime strategy, AIMC, `.github/agents`, specialist registry and public chat gateway. | Layer down canon after governance merge; align strategy references; do not activate APW specialist until governed specialist wave. |
| `APGI-cmy/app_management_centre` | Future home for Maturion-as-CS2 and build-project orchestration. | Add awareness that Maturion-as-CS2 authority is staged and not automatically granted. |
| `APGI-cmy/apgi-public-website` | Public APW embodiment and Maturion chat widget. | Add awareness that APW-specialist is required before knowledge-grounded public APW guidance is treated as governed. |

### 3.2 Conditional / Future Targets

| Repository / Area | Condition |
|---|---|
| AIMC runtime registry | When runtime registry exists, register this canon as authority for runtime specialist lifecycle and activation states. |
| Supabase/AIMC knowledge ingestion | When public retrieval is implemented, enforce `approved`, `public_safe`, `visibility=public`, non-tenant filters. |
| App Management Centre authority flows | When Maturion-as-CS2 is implemented, bind actions to the authority maturity model. |

---

## 4. Conflict Scan

### 4.1 Existing Orchestrator/Specialist Canon

`ORCHESTRATOR_SPECIALIST_ARCHITECTURE.md` establishes that orchestrators coordinate and specialists execute. The new canon does not replace that rule. It refines it for runtime Maturion:

```text
Runtime Maturion orchestrates, retrieves, frames, validates, and synthesises.
Specialists execute deep-domain or app-specific reasoning within declared boundaries.
```

No direct conflict identified. The new canon is a specialisation layer for runtime Maturion and agent-network structure.

### 4.2 Agent Registry Canon

`AGENT_REGISTRY_ARCHITECTURE.md` governs build/governance agent registration. The new canon requires a future runtime registry but does not modify the existing build/governance registry.

No direct conflict identified. Future work must avoid overloading the existing build registry unless a separate canon authorises that design.

### 4.3 Three-Tier Knowledge Architecture

`THREE_TIER_AGENT_KNOWLEDGE_ARCHITECTURE.md` governs Tier 1, Tier 2 and Tier 3 knowledge. The new canon extends this into runtime knowledge-plane separation: Subject Knowledge, Framework/Context, App Context and Memory.

No direct conflict identified. Future runtime retrieval implementation must map these planes back to Tier 1/Tier 2/Tier 3 controls.

### 4.4 AIMC Strategy / Specialist Operating Model

AIMC canon remains the owning platform model for AI capability and specialist operation. The new canon provides network structure and activation prohibitions, not provider or implementation design.

No conflict identified. Future AIMC runtime registry work should cite this canon.

### 4.5 APW Public Chat

The new canon explicitly blocks tenant/private retrieval in public APW mode and requires public-safe metadata before knowledge-grounded public retrieval.

No conflict identified. This adds a safety boundary before APW public chat v0.3 retrieval work.

---

## 5. Immediate Ripple Disposition

| Item | Status | Note |
|---|---|---|
| Governance canon created | Complete in branch | `governance/canon/MATURION_AGENT_NETWORK_ORGANIGRAM.md` |
| Ripple record created | Complete in branch | This file |
| Consumer repo layer-down | Pending after governance PR merge | Requires final hash / merged canonical state |
| CANON_INVENTORY hash alignment | Pending / requires inventory update | New canon SHA256 pre-merge content hash recorded below |
| Runtime specialist activation | Not authorised | Separate governed waves required |
| APW-specialist creation | Not authorised by this PR | Separate governed wave recommended |
| Maturion-as-CS2 activation | Not authorised by this PR | Requires authority maturity canon and App Management Centre implementation wave |

---

## 6. Pre-Merge Canon Hash Evidence

The new canon content SHA256, computed before inventory alignment, is:

```text
702a6dc272c02b6741ada74e28ccfa05924c78b19465b6ac3dc9e42b13a83b92
```

This hash must be rechecked after any review edits. Consumer repo inventories should not be updated until the governance PR is merged and the final canon content is fixed.

---

## 7. Required Follow-Up Waves

1. **Governance inventory alignment**  
   Add `MATURION_AGENT_NETWORK_ORGANIGRAM.md` to `governance/CANON_INVENTORY.json` and `GOVERNANCE_ARTIFACT_INVENTORY.md` with final hash.

2. **Layer-down to `maturion-isms`**  
   Ripple the canon into the consumer repo and align strategy references.

3. **Layer-down to `app_management_centre`**  
   Add awareness that Maturion-as-CS2 authority is staged and canon-gated.

4. **Layer-down to `apgi-public-website`**  
   Add awareness that APW-specialist is required for governed public APW guidance and that public retrieval must be public-safe.

5. **Runtime registry strategy/canon**  
   Define runtime specialist registry before activating app specialists.

6. **APW specialist definition wave**  
   Create APW-specialist only after registry and lifecycle rules are accepted.

---

## 8. Governance Administrator Note

This ripple record intentionally separates immediate canon creation from downstream consumer updates. The consumer layer-down should occur after governance PR merge so all consumers receive the final canonical hash and not a draft branch hash.
