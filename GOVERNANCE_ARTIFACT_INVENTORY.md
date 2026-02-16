# Governance Artifact Inventory

**Purpose**: Complete inventory of all governance artifacts in the maturion-foreman-governance repository
**Created**: 2025-12-31
**Last Updated**: 2026-02-15 (Post-mortem protocol addition)
**Authority**: Phase 1.1 — Platform Readiness Reset & Build Initiation Plan
**Scope**: Inventory only — no interpretation, correction, or gap analysis

---

## Classification Categories

Artifacts are classified into four categories:

1. **Readiness** — Defines or validates platform/build/execution readiness
2. **PR-gates** — Defines or implements PR merge gate enforcement
3. **Feedback/learning** — Governs learning intake, promotion, or feedback loops
4. **Layer-down** — Governs propagation of governance to downstream repositories

---

## Root-Level Governance Files

| File | Purpose | Categories |
|------|---------|------------|
| `BUILD_PHILOSOPHY.md` | Defines Build-to-Green, One-Time Build Law, and core build governance philosophy | Readiness, PR-gates |
| `GOVERNANCE_GATE_CANON.md` | Canonical definition of PR gate evaluation, enforcement semantics, and gate applicability | PR-gates, Readiness |
| `GOVERNANCE_INVENTORY.json.template` | **NEW v1.0.0 (2026-02-04)** - Template for GOVERNANCE_INVENTORY.json to be copied and customized for consumer repositories. Defines structure for tracking governance artifacts, agent types, gap summary, validation history, and remediation plans per GOVERNANCE_INVENTORY_SCHEMA.json | Layer-down, Readiness |
| `IMPLEMENTATION_COMPLETE.md` | Records completion status of governance implementation phases | Readiness |
| `README.md` | Repository entry point and orientation | (documentation) |
| `START_HERE.md` | Human orientation guide for repository structure | (documentation) |
| `WAVE_A_HUMAN_REVIEW_GUIDE.md` | Guide for human review of Wave A execution | Readiness |
| `WAVE_A_STATUS.md` | Status tracking for Wave A execution | Readiness |
| `maturion-philosophy-tree.md` | Philosophical foundation and vision alignment | (philosophy) |

---

## Agent Memory Bootstrap (.agent-memory/)

Agent memory bootstrap files for CodexAdvisor and governance-repo-administrator to ensure critical governance processes are not missed.

| File | Purpose | Categories |
|------|---------|------------|
| `RIPPLE_LOG_UPDATE_CHECKLIST.md` | **NEW v1.0.0 (2026-02-09)** - Bootstrap backup checklist ensuring CodexAdvisor never misses a ripple log update during governance ripple operations. Defines mandatory checklist for ripple log maintenance including pre-ripple validation, ripple execution, log update requirements, evidence collection, and follow-up tracking. Provides ripple log format reference, failure mode prevention, and authority references. Purpose: Bootstrap backup for human oversight during governance ripple execution | Layer-down, Readiness |

---

## Governance Canon (governance/canon/)

Canon files define constitutional governance rules, models, and protocols.

| File | Purpose | Categories |
|------|---------|------------|
| `agent-contracts-guidance/` | **NEW (2026-02-04)** - Centralized canonical folder for ALL agent contract policies, schemas, templates, and guidance. Consolidates scattered agent contract documentation into single authoritative source | PR-gates, Layer-down, Readiness |
| `agent-contracts-guidance/.agent.schema.md` | **MOVED (2026-02-04)** - Schema definition for agent contracts with new Section 13 defining LOCKED sections requirements, protection protocol integration, and reference to AGENT_FILE_LOCKED_SECTIONS_TEMPLATE.md | PR-gates |
| `agent-contracts-guidance/AGENT_FILE_CREATION_POLICY.md` | **MOVED (2026-02-04)** - Policy governing creation of new agent contracts | PR-gates, Readiness |
| `agent-contracts-guidance/AGENT_FILE_BINDING_REQUIREMENTS.md` | **MOVED (2026-02-04)** - Requirements for governance binding and context loading in agent contracts | PR-gates, Layer-down, Readiness |
| `agent-contracts-guidance/AGENT_CONTRACT_MIGRATION_GUIDE.md` | **MOVED (2026-02-04)** - Guide for migrating agent contracts to current standards | PR-gates, Readiness |
| `agent-contracts-guidance/AGENT_ONBOARDING_QUICKSTART.md` | **MOVED (2026-02-04)** - Quick start guide for new agent onboarding | Layer-down, Readiness |
| `agent-contracts-guidance/templates/AGENT_CONTRACT.template.md` | **MOVED (2026-02-04)** - Template for agent contracts with LOCKED sections guidance | PR-gates, Layer-down, Readiness |
| `agent-contracts-guidance/templates/AGENT_FILE_LOCKED_SECTIONS_TEMPLATE.md` | **MOVED (2026-02-04)** - Canonical template with copy-paste LOCKED sections for agent contracts | PR-gates, Layer-down, Readiness |
| `agent-contracts-guidance/runbooks/AGENT_FILE_VALIDATION.md` | **MOVED (2026-02-04)** - Validation procedures for agent contracts | PR-gates, Readiness |
| `agent-contracts-guidance/runbooks/AGENT_FILE_MAINTENANCE.md` | **MOVED (2026-02-04)** - Maintenance procedures for agent contracts | PR-gates, Readiness |
| `ACTIVATION_STATE_MODEL.md` | Defines agent/system activation lifecycle states | Readiness |
| `AGENT_CANONICAL_CONTEXT_SYNCHRONISATION_PROTOCOL.md` | Protocol for keeping agent context synchronized with canon | Layer-down |
| `AGENT_BASELINE_MANAGEMENT_PROTOCOL.md` | **NEW v1.0.0 (2026-02-08) PUBLIC_API** - Canonical protocol for agent baseline management. Defines what baselines are, CS2-only update authority, baseline validation protocol, drift reconciliation, and Living Agent System v5.0.0 integration. Critical foundation for agent self-governance, FM/builder functioning, and governance-liaison baseline enforcement | Readiness, Layer-down, PR-gates |
| `AGENT_CLASS_SPECIFIC_GATE_PROTOCOLS.md` | **NEW v1.0.0 (2026-02-08) PUBLIC_API** - Canonical gate protocols for each agent class (Overseer, Liaison, Builder, Foreman). Defines merge gate requirements, self-alignment authority, escalation triggers, validation methods, and CI/CD integration per agent class. Addresses GAP-001 from Living Agent System v5.0.0 rollout | PR-gates, Readiness, Layer-down |
| `AGENT_CONTRACT_MANAGEMENT_PROTOCOL.md` | **UPDATED v3.1.0 (2026-01-26)** - Granular authority hierarchy for agent contracts with atomic layer-down compliance requirements for consumer repos | PR-gates, Layer-down, Readiness |
| `AGENT_CONTRACT_PROTECTION_PROTOCOL.md` | **UPDATED v1.1.0 (2026-01-26)** - Protocol for agent contract protection with locked sections and atomic layer-down requirements | PR-gates, Layer-down, Readiness |
| `AGENT_ENVIRONMENTAL_RESPONSIBILITY_DOCTRINE.md` | **UPDATED v1.1.0 (2026-02-14) PUBLIC_API CONSTITUTIONAL** - Tier-0 constitutional canon establishing mandatory pre-task environmental health scanning, autonomous remediation, escalation, and full auditability requirements for all agents. Defines Scan → Remediate → Escalate → Work workflow, sandbox boundaries, LOCKED Environmental Responsibility section requirement for all agent contracts, and integration with wake-up protocol Step 4.5. **v1.1.0 adds learning file staleness enforcement** to prevent placeholder learning files from bypassing true insight capture (Section 15). Critical foundation for truly autonomous and responsible Living Agent System | Readiness, Layer-down, PR-gates, Feedback/learning |
| `AGENT_RECRUITMENT.md` | Defines rules for recruiting and activating agents | Readiness |
| `AGENT_ROLE_GATE_APPLICABILITY.md` | Maps which PR gates apply to which agent roles | PR-gates |
| `AGENT_SELF_GOVERNANCE_PROTOCOL.md` | **NEW (2026-01-21)** - Defines universal agent self-governance check before every job, agent-specific alignment rules, and mandatory attestation requirements | Layer-down, Readiness, PR-gates |
| `APP_STARTUP_REQUIREMENTS_DECLARATION.md` | Defines application commissioning and startup requirements | Readiness, Layer-down |
| `ARCHITECTURE_COMPLETENESS_REQUIREMENTS.md` | Defines architecture artifact completeness criteria | Readiness, PR-gates |
| `AUDIT_READINESS_MODEL.md` | Defines audit trail and evidence requirements | Readiness |
| `BOOTSTRAP_EXECUTION_LEARNINGS.md` | **UPDATED (2026-02-08)** - Records structural learnings from bootstrap execution with BL-029 documenting excuse-based test dodging patterns and ban enforcement, BL-030 documenting FL/CI Loop false attestation pattern (PR #1023 incident), and **NEW Appendix A** providing categorization matrix for failure/improvement/learning classification, promotion priority, and governance target selection | Feedback/learning |
| `BRANCH_PROTECTION_ENFORCEMENT.md` | Defines branch protection requirements | PR-gates |
| `BUILDER_FIRST_PR_MERGE_MODEL.md` | Defines rules for first builder PR merge | PR-gates, Readiness |
| `BUILD_EFFECTIVENESS_STANDARD.md` | Defines build effectiveness measurement criteria | Readiness |
| `BUILD_INTERVENTION_AND_ALERT_MODEL.md` | Defines when/how to intervene in builds | Feedback/learning |
| `BUILD_NODE_INSPECTION_MODEL.md` | Defines build node health and inspection protocol | Readiness |
| `BUILD_TREE_EXECUTION_MODEL.md` | Defines build dependency tree execution rules | Readiness |
| `CASCADING_FAILURE_CIRCUIT_BREAKER.md` | Defines circuit breaker rules for cascading failures | Feedback/learning |
| `CI_CONFIRMATORY_NOT_DIAGNOSTIC.md` | Establishes CI as enforcement, not discovery | PR-gates |
| `COGNITIVE_CAPABILITY_ORCHESTRATION_MODEL.md` | Defines model tier selection and cognitive load management | Readiness |
| `COGNITIVE_HYGIENE_AUTHORITY_MODEL.md` | Defines cognitive hygiene boundaries and authority | Readiness |
| `COGNITIVE_HYGIENE_MEMORY_INTEGRATION_MODEL.md` | Defines memory access and hygiene integration | Readiness |
| `LIVING_AGENT_SYSTEM.md` | **NEW v1.0.0 (2026-02-04)** - Canonical protocol for Living Agent System. Defines agent lifecycle (wake-up, work, closure), workspace structure, memory management, working contract generation, and zero-direct-write policy for agent contracts | Readiness, PR-gates, Layer-down, Feedback/learning |
| `COMMISSIONING_EVIDENCE_MODEL.md` | Defines commissioning evidence requirements | Readiness |
| `COMPLIANCE_AND_STANDARDS_GOVERNANCE.md` | Defines compliance framework (ISO/NIST) alignment | Readiness |
| `DELEGATION_INSTRUCTION_AND_AUDIT_MODEL.md` | Defines delegation instruction format and audit requirements | Readiness |
| `DOMAIN_EVOLUTION_RULES.md` | Defines how responsibility domains evolve | Readiness |
| `DOMAIN_OWNERSHIP_ACCOUNTABILITY.md` | Defines domain ownership and accountability rules | Readiness |
| `DOMAIN_STATE_ENFORCEMENT_RULE.md` | Defines enforcement of domain state requirements | Readiness |
| `ENVIRONMENT_PROVISIONING_PROCESS.md` | Defines environment setup and provisioning | Readiness |
| `EXECUTION_BOOTSTRAP_PROTOCOL.md` | **UPDATED v1.1.0 (2026-01-26)** - Mandatory execution verification protocol with zero-warning enforcement, agent contract propagation wait, and STOP-AND-FIX integration | PR-gates, Readiness |
| `FAILURE_PROMOTION_RULE.md` | Defines when failures must be escalated/promoted | Feedback/learning |
| `FULLY_FUNCTIONAL_DELIVERY_STANDARD.md` | **NEW v1.0.0 (2026-02-16) PUBLIC_API** - Canonical standard defining "fully functional" delivery across design, implementation, and deployment phases. Establishes Fully Functional Design, Fully Functional App, and Fully Functional Delivery definitions with wave gate strengthening, pre-authorization and pre-closure requirements, certification criteria, and enforcement mechanisms. Addresses critical governance gap where deliverables were specified but never physically delivered despite passing tests | Readiness, Layer-down, PR-gates, Feedback/learning |
| `FM_GOVERNANCE_LOADING_PROTOCOL.md` | Protocol for loading governance into FM context | Layer-down, Readiness |
| `FM_MERGE_GATE_MANAGEMENT_PROTOCOL.md` | **NEW v1.0.0 (2026-02-09) PUBLIC_API** - Canonical protocol for FM authority to manage merge gates. Defines FM autonomous fix authority for gate misalignments, detection and classification of gate issues, fix vs. escalation decision matrix, governance compliance checklist, and operational workflows. Enables FM to correct gates that misapply agent-class requirements without bypassing governance | PR-gates, Layer-down, Readiness |
| `FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md` | Defines FM authority boundaries and supervision rules | Readiness |
| `FOREMAN_MEMORY_PROTOCOL.md` | **NEW v1.0.0 (2026-02-08) PUBLIC_API** - Canonical protocol for FM memory management. Defines four-level memory hierarchy (Constitutional, Wave, Session, Learning), memory lifecycle, learning loop integration, and Living Agent System v5.0.0 compliance. Enables autonomous orchestration through continuous learning and context-aware supervision | Readiness, Layer-down, Feedback/learning |
| `FOREMAN_WAVE_PLANNING_AND_ISSUE_ARTIFACT_GENERATION_PROTOCOL.md` | **NEW v1.0.0 (2026-02-08) PUBLIC_API** - Canonical protocol for FM wave planning and issue artifact generation. Defines wave decomposition strategy, subwave identification, issue artifact types (wave init, builder task, correction/RCA, governance gap), wave progress artifact requirements, and POLC framework integration | Readiness, Layer-down, PR-gates |
| `GATE_PREDICTIVE_COMPLIANCE_ANALYSIS.md` | Defines predictive compliance analysis for PR gates | PR-gates, Feedback/learning |
| `GOVERNANCE_ARTIFACT_TAXONOMY.md` | **NEW v1.0.0 (2026-02-08) PUBLIC_API** - Canonical taxonomy of governance artifacts. Defines 7 artifact types (Constitutional Canon, Documentation, Scripts, Templates, Evidence, App Code, App Tests), ripple trigger matrix, testing obligation matrix, and file path pattern recognition. Addresses GAP-002 from Living Agent System v5.0.0 rollout | Readiness, Layer-down, PR-gates |
| `GOVERNANCE_COMPLETENESS_MODEL.md` | Defines what constitutes complete governance | Readiness |
| `GOVERNANCE_ENFORCEMENT_TRANSITION.md` | Defines transition from advisory to enforcement mode | PR-gates, Readiness |
| `GOVERNANCE_LAYERDOWN_CONTRACT.md` | Authoritative definition of governance layer-down requirements | Layer-down |
| `GOVERNANCE_PURPOSE_AND_SCOPE.md` | Constitutional definition of governance purpose and authority | Readiness |
| `GOVERNANCE_RIPPLE_MODEL.md` | **UPDATED (2026-02-09)** - Defines governance change ripple effects and impact analysis. Bidirectional governance evolution framework. **NEW: Section 8.3 now includes mandatory ripple log tracking with automatic updates. Section 10.1 clarifies Governance Administrator duty to update ripple log atomically with issue creation.** | Layer-down |
| `GOVERNANCE_RIPPLE_CHECKLIST_PROTOCOL.md` | **UPDATED v1.0.1 (2026-02-09)** - Mandatory systematic ripple checklist protocol for all governance changes. Defines 10-step execution process ensuring complete propagation across files, references, templates, agents, and consumer repos. **NEW: STEP 7 now mandates automatic ripple log updates (atomic with issue creation/closure) to eliminate manual tracking and ensure complete audit trail.** Prevents drift, broken references, and incomplete ripple. Implements GOVERNANCE_RIPPLE_MODEL.md, AGENT_CONTRACT_PROTECTION_PROTOCOL.md, and EXECUTION_BOOTSTRAP_PROTOCOL.md zero-warning enforcement. Acceptance criteria tag: `governance-ripple-log-autoupdate` | Layer-down, PR-gates, Readiness |
| `GOVERNANCE_RIPPLE_DETECTION_PROTOCOL.md` | **NEW v1.0.0 (2026-02-08) PUBLIC_API** - Canonical protocol for governance ripple signaling, detection, and response. Defines ripple signaling mechanisms (PR label, description, file), detection methods (agent, CI, human), response SLA matrix, status tracking, and audit trail. Addresses GAP-005 from Living Agent System v5.0.0 rollout | Layer-down, PR-gates, Readiness |
| `LAYER_UP_PROTOCOL.md` | **NEW v1.0.0 (2026-02-09) PUBLIC_API** - Explicit, controlled protocol for propagating learnings, improvements, and governance feedback from application repositories back to canonical governance. Defines layer-up triggers (drift, gaps, failures, enhancements), systematic intake/validation/integration process, governance-repo-administrator responsibilities, mandatory pre-canon-change layer-up scan, drift detection/escalation, and bidirectional ripple tracking. Complements CROSS_REPOSITORY_LAYER_DOWN_PROTOCOL.md to close the bidirectional governance loop. Implements GOVERNANCE_RIPPLE_MODEL.md Section 3.1 (Upward) | Layer-down, Readiness, Feedback/learning |
| `GOVERNANCE_ALIGNMENT_MONITORING_PROTOCOL.md` | **NEW v1.0.0 (2026-02-09) PUBLIC_API** - Systematic monitoring protocol for detecting, tracking, and remediating governance alignment issues across all repositories. Defines multi-layer alignment verification (version, SHA256, LOCKED sections, cross-references, ripple status), drift detection mechanisms, escalation workflows, and zero-drift target enforcement. Integrates with agent wake-up protocols and scheduled scans. Implements LAYER_UP_PROTOCOL.md Section 8 for drift detection and GOVERNANCE_RIPPLE_MODEL.md alignment requirements | Layer-down, Readiness, PR-gates |
| `GOVERNANCE_VALIDATION_PROTOCOL.md` | **NEW v1.0.0 (2026-02-08) PUBLIC_API** - Canonical validation protocol for governance artifacts. Defines validation success criteria per agent class (BtG vs non-BtG), explicit validation checklists for liaison/foreman/overseer, validation methods by artifact type, and validation evidence requirements. Addresses GAP-006 from Living Agent System v5.0.0 rollout | PR-gates, Readiness, Layer-down |
| `GOVERNANCE_AGENT_REQUIREMENTS_MATRIX.md` | **NEW v1.0.0 (2026-02-04) PUBLIC_API** - Canonical matrix defining mandatory/recommended governance artifacts for each agent type (FM, Builder, Governance-Liaison, Governance-Repo-Administrator, CodexAdvisor, Assurance). Single source of truth for agent contract creation, gap detection, ripple validation, and compliance auditing. Includes machine-readable YAML metadata for automated tooling | PR-gates, Layer-down, Readiness |
| `PRE_WORK_GOVERNANCE_SELF_TEST_PROTOCOL.md` | **NEW v1.0.0 (2026-02-04)** - Mandatory pre-work governance self-test and gap detection protocol for ALL agents before starting any job. Defines 9-step checklist including gap analysis, auto-remediation, agent contract binding verification, LOCKED section validation, and attestation requirements. Integrates with governance-gap-analyzer.sh for automated detection. Extends AGENT_SELF_GOVERNANCE_PROTOCOL.md | PR-gates, Layer-down, Readiness |
| `GOVERNANCE_VERSIONING_AND_SYNC_PROTOCOL.md` | Defines governance versioning and synchronization | Layer-down |
| `AGENT_RIPPLE_AWARENESS_OBLIGATION.md` | Defines agent obligation to recognize and surface ripple effects (Wave 1.2) | Layer-down, Feedback/learning |
| `ASSISTED_RIPPLE_SCAN_SCOPE.md` | Defines scope of assisted ripple scanning within single repository (Wave 2.1) | Layer-down, Feedback/learning |
| `ASSISTED_RIPPLE_SCAN_HUMAN_REVIEW_SEMANTICS.md` | Defines human review semantics for ripple scan reports (Wave 2.1) | Layer-down, Feedback/learning |
| `CROSS_REPOSITORY_RIPPLE_AWARENESS_MODEL.md` | Defines passive cross-repository ripple signaling (Wave 2.2) | Layer-down, Feedback/learning |
| `RIPPLE_INTELLIGENCE_LAYER.md` | Defines Ripple Intelligence concept and three ripple planes | Layer-down, Readiness, Feedback/learning |
| `INITIALIZATION_COMPLETENESS_GATE.md` | Defines repository initialization validation gate | PR-gates, Readiness, Layer-down |
| `LEARNING_INTAKE_AND_PROMOTION_MODEL.md` | Defines learning capture and promotion to canon | Feedback/learning |
| `LEARNING_PROMOTION_RULE.md` | Defines rules for promoting learnings to governance | Feedback/learning |
| `LIVING_AGENT_GOVERNANCE_HEALTH_CHECKS.md` | **NEW v1.0.0 (2026-02-08) PUBLIC_API** - Canonical protocol for dynamic, agent-driven governance discovery and health checking at wake-up. Defines 7-phase wake-up workflow (self-identification, memory scan, governance discovery, environment health, drift detection, auto-remediation, working contract generation). Addresses GAP-004 from Living Agent System v5.0.0 rollout | Readiness, Layer-down, PR-gates |
| `MANDATORY_CROSS_APP_COMPONENTS.md` | **NEW v1.0.0 (2026-02-13) PUBLIC_API** - Single authoritative specification listing ALL mandatory components and patterns required in every Maturion app/repository. Comprehensive coverage of agent system, watchdog, performance measurement (AI/app/service), observability & telemetry, feedback mechanisms, compliance baseline, startup/commissioning, architecture completeness, AI chat dual pattern (back office/front office), and layer-down propagation rules. Acts as master checklist for new app initialization, audits, and completeness verification with crosswalk appendix linking to constitutional/canonical sources. Eliminates component gaps, rework, and governance drift | Readiness, Layer-down, PR-gates |
| `MATURION_CONCEPTUAL_DOCTRINE.md` | Defines Maturion philosophical foundations | (philosophy) |
| `MATURION_RUNTIME_EXECUTION_MONITOR_SPEC.md` | Specification for runtime execution monitoring | Readiness |
| `MEMORY_INTEGRITY_AND_CORRUPTION_MODEL.md` | Defines memory integrity requirements | Readiness |
| `MEMORY_LIFECYCLE_STATE_MACHINE_CONTRACT.md` | Defines memory lifecycle state transitions | Readiness |
| `MEMORY_OBSERVABILITY_QUERY_CONTRACT.md` | Defines memory query interface contract | Readiness |
| `MERGE_GATE_APPLICABILITY_MATRIX.md` | **NEW v1.0.0 (2026-02-09) PUBLIC_API** - Authoritative matrix mapping agent roles to applicable merge gates. Defines gate applicability by agent class (Builder, Liaison, Foreman, Overseer), role detection patterns, gate implementation patterns, and role-specific gate profiles. Companion to FM_MERGE_GATE_MANAGEMENT_PROTOCOL.md for precise gate enforcement | PR-gates, Layer-down, Readiness |
| `MERGE_GATE_PHILOSOPHY.md` | **UPDATED v1.1.0 (2026-02-09)** - Defines merge gate philosophy (CI confirmatory not diagnostic), evidence-based validation pattern, two-mode validation (evidence vs. script), and gate types. **NEW: Comprehensive governance compliance checklist** for gate implementation, evidence-based validation, role detection, failure messages, FM gate management, and escalation procedures | PR-gates, Layer-down, Readiness |
| `PENDING_CANON_REFERENCES_INTERIM_GUIDANCE.md` | **NEW v1.0.0 (2026-02-08) PUBLIC_API** - Interim guidance for handling references to canonical governance documents. Clarifies published status of FM_ROLE_CANON.md, WAVE_MODEL.md, LIVING_AGENT_SYSTEM.md, and newly published canon (2026-02-08). Provides workaround guidance for pending canon references. Addresses GAP-007 from Living Agent System v5.0.0 rollout | Readiness, Layer-down |
| `PLATFORM_AUTHORITY_BOUNDARY_AND_DELEGATION_MODEL.md` | Defines platform authority boundaries | Readiness |
| `POST_MORTEM_PROTOCOL.md` | **NEW v1.0.0 (2026-02-15) PUBLIC_API** - Canonical protocol establishing universal post-mortem process for completed builds. Defines mandatory agent query set, self-report requirements, foreman reconciliation process, governance up-layer/down-layer mechanisms, gap analysis methodology for continuous improvement, standards compliance tracking, and integration with agent memory systems. Requires all agents to deliver domain-specific lessons learned upon build closure, formalizes organizational learning loop, prevents repeat mistakes through systematic analysis, and enables version 2 planning based on version 1 learnings | Feedback/learning, Layer-down, Readiness |
| `PLATFORM_READINESS_FOR_GOVERNED_BUILD_EXECUTION.md` | Canonical definition of platform readiness | Readiness |
| `PR_GATE_EVALUATION_AND_ROLE_PROTOCOL.md` | Defines PR gate evaluation process | PR-gates |
| `PR_GATE_PRECONDITION_RULE.md` | Defines preconditions for PR gate applicability | PR-gates |
| `PR_SCOPE_CONTROL_POLICY.md` | Defines PR scope boundaries and enforcement | PR-gates |
| `REPOSITORY_INITIALIZATION_AND_GOVERNANCE_SEEDING_PROTOCOL.md` | Defines repository initialization process | Layer-down, Readiness |
| `REPOSITORY_SEEDING_AND_ENFORCEMENT_ROLE_SEPARATION.md` | Defines separation between seeding and enforcement agents | Layer-down |
| `SELF_ALIGNMENT_AUTHORITY_MODEL.md` | **NEW v1.0.0 (2026-02-08) PUBLIC_API** - Canonical self-alignment authority model for all agents. Defines precisely what each agent class may align autonomously vs escalate to CS2, authority boundaries per agent class and artifact type, escalation decision framework, and self-alignment best practices. Addresses GAP-003 from Living Agent System v5.0.0 rollout | Readiness, Layer-down, PR-gates |
| `REQUIREMENT_SPECIFICATION_GOVERNANCE.md` | Defines requirement specification standards | Readiness |
| `RESPONSIBILITY_DOMAIN_ENTRY.template.md` | Template for defining responsibility domains | (template) |
| `RESPONSIBILITY_DOMAIN_REGISTRY.md` | Registry of all responsibility domains | Readiness |
| `SCOPE_DECLARATION_SCHEMA.md` | Schema for scope declarations | PR-gates |
| `SCOPE_TO_DIFF_RULE.md` | Defines scope-to-diff validation rule | PR-gates |
| `STOP_AND_FIX_DOCTRINE.md` | **UPDATED v2.1.0 (2026-02-08)** - Tier-0 constitutional doctrine with enhanced ban on excuse-based test dodging. **NEW Section 8** defines Learning Loop Integration and Improvement Escalation, establishing Stop-and-Fix learning capture, categorization (AL/QL/BSL/GGL), promotion triggers (frequency/severity thresholds), and governance gap issue creation workflow. Integrates with FOREMAN_MEMORY_PROTOCOL.md and LEARNING_LOOP_CATEGORIES_AND_LIFECYCLE.md for systematic improvement | PR-gates, Readiness, Feedback/learning |
| `SYSTEM_COMMISSIONING_AND_PROGRESSIVE_ACTIVATION_PROTOCOL.md` | Defines system commissioning phases | Readiness |
| `VERSIONING_AND_EVOLUTION_GOVERNANCE.md` | Defines governance versioning rules | Layer-down |
| `VISION_ALIGNMENT_AND_DRIFT_MODEL.md` | Defines vision drift detection and correction | Feedback/learning |
| `WATCHDOG_AUTHORITY_AND_SCOPE.md` | Defines Watchdog agent authority and scope | Readiness |
| `WATCHDOG_COGNITIVE_OBSERVATION_PROTOCOL.md` | Defines Watchdog cognitive observation protocol | Readiness |
| `effectiveness.template.md` | Template for effectiveness reporting | (template) |
| `failure.template.md` | Template for failure reporting | Feedback/learning |
| `scope-declaration.template.md` | Template for scope declarations | (template) |

---

## Governance Policy (governance/policy/)

Policy files define operational governance requirements and protocols.

| File | Purpose | Categories |
|------|---------|------------|
| `APP_DESCRIPTION_REQUIREMENT_POLICY.md` | **UPDATED v1.0 (2026-02-13)** - Defines application description requirements with TRS stage added to canonical flow: App Description → FRS → TRS → Architecture → Build Authorization → Implementation. Updated ordering rule to include TRS as mandatory stage. Layer-up from maturion-isms#98 | Readiness, Layer-down |
| `BUILDER_QA_HANDOVER_POLICY.md` | Defines builder QA requirements before handover | PR-gates, Readiness |
| `FM_MATURION_DELEGATED_ACTION_POLICY.md` | Defines FM delegated action authority and requirements | Readiness |
| `minimizing_language_examples.json` | Fixture examples for minimizing-language enforcement | PR-gates, Readiness |
| `minimizing_language_patterns.json` | Canonical minimizing-language pattern list for automated validation | PR-gates, Readiness |
| `POLICY-NO-ONLY-LANGUAGE.md` | Zero-tolerance policy banning minimizing language in status reporting | PR-gates, Readiness |
| `PR_GATE_FAILURE_HANDLING_PROTOCOL.md` | Defines protocol for handling PR gate failures | PR-gates, Feedback/learning |
| `QA_POLICY_MASTER.md` | Master QA policy document | PR-gates, Readiness |

---

## Governance Strategy (governance/strategy/)

Strategy files define high-level governance strategies and architectural approaches.

| File | Purpose | Categories |
|------|---------|------------|
| `MODULE_LIFECYCLE_AND_REPO_STRUCTURE_STRATEGY.md` | **NEW v1.0 (2026-02-13)** - Strategy for module lifecycle and repository structure with TRS (Technical Requirements Specification) as Stage 1.5. Defines 7-stage canonical module lifecycle: App Description → FRS → TRS → Architecture → Implementation Plan → Builder Appointment → Execute Build. Comprehensive TRS stage definition including purpose, ownership, scope (technical constraints, performance requirements, integration requirements, traceability matrices, tool validation rules), deliverables, and relationships to FRS and Architecture. Layer-up from maturion-isms#98 | Readiness, Layer-down |

---

## Governance Schemas (governance/schemas/)

Schema files define data structures for governance artifacts.

| File | Purpose | Categories |
|------|---------|------------|
| `BRANCH_PROTECTION_EVIDENCE.schema.md` | Schema for branch protection evidence | PR-gates |
| `BUILDER_QA_REPORT.schema.md` | Schema for builder QA reports | PR-gates, Readiness |
| `BUILDER_QA_SUMMARY.structure.md` | Structure for builder QA summaries | PR-gates, Readiness |
| `BUILD_QA_REPORT.schema.json` | JSON schema for build QA reports | PR-gates, Readiness |
| `CONTROL_MAPPING.schema.md` | Schema for control mapping | Readiness |
| `DELEGATED_ACTION_AUDIT.schema.md` | Schema for delegated action audit records | Readiness |
| `DELEGATED_ACTION_INSTRUCTION.schema.md` | Schema for delegated action instructions | Readiness |
| `DELEGATION_INSTRUCTION.schema.md` | Schema for delegation instructions | Readiness |
| `DELEGATION_RESPONSE.schema.md` | Schema for delegation responses | Readiness |
| `EVIDENCE_CATALOG.schema.md` | Schema for evidence catalog | Readiness |
| `FAILURE_SCHEMA.schema.md` | Schema for failure records | Feedback/learning |
| `GOVERNANCE_CHANGE_PROPOSAL.schema.md` | Schema for governance change proposals | Feedback/learning |
| `GOVERNANCE_COMPLIANCE_REPORT.schema.json` | JSON schema for compliance reports | Readiness |
| `GOVERNANCE_INVENTORY_SCHEMA.json` | **NEW v1.0.0 (2026-02-04) PUBLIC_API** - JSON Schema for per-repository governance inventory tracking. Validates GOVERNANCE_INVENTORY.json structure including repository metadata, agent types, governance artifacts status, gap summary, missing artifacts, agent contract gaps, validation history, and remediation plans. Used by governance-gap-analyzer.sh for inventory generation and validation | Layer-down, Readiness |
| `GPCA_PREDICTION_REPORT.schema.md` | Schema for Gate Predictive Compliance Analysis reports | PR-gates, Feedback/learning |
| `LEARNING_SCHEMA.schema.md` | Schema for learning records | Feedback/learning |
| `PLATFORM_ACTION_AUDIT_ENTRY.schema.md` | Schema for platform action audit entries | Readiness |
| `PLATFORM_READINESS_EVIDENCE.schema.md` | Schema for platform readiness evidence | Readiness |
| `post_mortem_agent_report.schema.json` | **NEW v1.0.0 (2026-02-15) PUBLIC_API** - JSON Schema for agent self-report in post-mortem process. Validates structured data format for build participation, experience, lessons learned, performance improvements, quality assessment, standards compliance, process gaps, knowledge transfer, recommendations, and evidence references. Enables automation of post-mortem collection and analysis per POST_MORTEM_PROTOCOL.md | Feedback/learning, Layer-down |
| `REPOSITORY_INITIALIZATION_EVIDENCE.schema.md` | Schema for repository initialization evidence | Layer-down, Readiness |
| `REQUIREMENT_SPECIFICATION.schema.md` | Schema for requirement specifications | Readiness |
| `RIPPLE_SCAN_REPORT.schema.md` | Schema for ripple scan reports (Wave 2.1) | Feedback/learning, Layer-down |
| `RIPPLE_SIGNAL.schema.md` | Schema for cross-repository ripple signals (Wave 2.2) | Feedback/learning, Layer-down |

---

## Governance Templates (governance/templates/)

Template files provide reusable structures for governance artifacts.

| File | Purpose | Categories |
|------|---------|------------|
| `BUILD_PROGRESS_TRACKER_TEMPLATE.md` | **NEW v1.0.0 (2026-02-13)** - Template for tracking module lifecycle progress through all 7 stages including TRS (Stage 1.5). Provides standardized checklists for artifacts, approvals, completion dates, governance compliance tracking, and module status summary. Layer-up from maturion-isms#98 | Readiness, Layer-down |
| `BUILDER_TASK_TEMPLATE.md` | Template for builder task definitions | Readiness |
| `CANON_CREATION_AND_PROPAGATION_CHECKLIST.md` | Comprehensive workflow checklist for canon creation and propagation with mandatory inventory maintenance | Layer-down, Feedback/learning |
| `PREHANDOVER_PROOF_TEMPLATE.md` | **UPDATED v2.2.0 (2026-01-27)** - Template for execution verification documentation with Zero-Warning Validation section and **NEW** validation evidence requirements per BL-030. Prohibits attestation without verification. Requires command output, exit codes, timestamps for all validations. Adds scope declaration freshness verification checklist | PR-gates, Readiness |
| `PLATFORM_READINESS_CHECKLIST.template.md` | Template for platform readiness checklists | Readiness |
| `PR_GATE_RELEASE_CHECKLISTS_README.md` | Documentation for PR gate release checklists | PR-gates |
| `PR_GATE_RELEASE_CHECKLIST_BUILDER.md` | Builder-specific PR gate release checklist | PR-gates |
| `PR_GATE_RELEASE_CHECKLIST_FM.md` | FM-specific PR gate release checklist | PR-gates |
| `PR_GATE_RELEASE_CHECKLIST_GOVERNANCE_ADMIN.md` | Governance Admin-specific PR gate release checklist | PR-gates |
| `POST_MORTEM_AGENT_REPORT.template.md` | **NEW v1.0.0 (2026-02-15)** - Template for agent self-report in post-mortem process. Structured format for capturing build experience, lessons learned, mistakes, performance improvements, build quality assessment, standards compliance gaps, process assessment, knowledge transfer, and recommendations. Integrates with agent session memory per POST_MORTEM_PROTOCOL.md | Feedback/learning, Layer-down |
| `POST_MORTEM_GAP_ANALYSIS.template.md` | **NEW v1.0.0 (2026-02-15)** - Template for post-mortem gap analysis comparing current vs previous builds. Structures comparison across improvements verified, regressions detected, new patterns, standards compliance trajectory, build metrics, and recommendations for next build. Enables continuous improvement tracking per POST_MORTEM_PROTOCOL.md | Feedback/learning, Readiness |
| `POST_MORTEM_RECONCILIATION_REPORT.template.md` | **NEW v1.0.0 (2026-02-15)** - Template for foreman reconciliation report synthesizing all agent post-mortem inputs. Structures reconciliation across lessons by category, standards compliance, cross-cutting themes, version 2 recommendations, learnings for promotion, and governance up-layer plan per POST_MORTEM_PROTOCOL.md | Feedback/learning, Layer-down |
| `RIPPLE_SCAN_REPORT.template.md` | Template for ripple scan reports (Wave 2.1) | Feedback/learning, Layer-down |
| `RIPPLE_SIGNAL.template.md` | Template for cross-repository ripple signals (Wave 2.2) | Feedback/learning, Layer-down |
| `minimum-architecture-template.md` | Template for minimum architecture artifacts | Readiness, Layer-down |
| `workflows/README.md` | Documentation for workflow templates | (documentation) |

---

## Governance Contracts (governance/contracts/)

Contract files define formal agreements and authorization gates.

| File | Purpose | Categories |
|------|---------|------------|
| `ARCHITECTURE_COMPILATION_CONTRACT.md` | Defines architecture compilation requirements | Readiness |
| `BUILD_AUTHORIZATION_GATE.md` | Defines build authorization gate requirements | PR-gates, Readiness |
| `app-description-frs-alignment-checklist.md` | Checklist for app description and FRS alignment | Readiness |

---

## Governance Agents (governance/agents/ and .github/agents/)

Agent contract files define agent roles, authority, and responsibilities.

| File | Purpose | Categories |
|------|---------|------------|
| `governance/agents/governance-administrator.agent.md` | Governance Administrator agent contract | Readiness |
| `.github/agents/governance-repo-administrator.agent.md` | **UPDATED v5.0.0 (2026-02-04)** - Minimal agent identity contract for Living Agent System, references LIVING_AGENT_SYSTEM.md for lifecycle protocol | Readiness, Layer-down |
| `.github/agents/CodexAdvisor-agent.md` | **UPDATED v5.0.0 (2026-02-04)** - Minimal agent identity contract for Living Agent System with approval-gated execution | Readiness, Layer-down |
| `.github/agents/legacy/` | **NEW (2026-02-04)** - Archive of pre-LAS agent contracts (v4.x) for historical reference only | (historical) |
| `.github/scripts/wake-up-protocol.sh` | **NEW (2026-02-04)** - Executable wake-up protocol for Living Agent System. Loads memory, generates working contract, checks environment health | Readiness, Layer-down |
| `.github/scripts/session-closure.sh` | **NEW (2026-02-04)** - Executable session closure protocol for Living Agent System. Creates session memory, rotates old sessions, verifies safe handover | Readiness, Layer-down |

---

## Governance Agent Policies (governance/agent/)

Agent behavior and prohibition policies.

| File | Purpose | Categories |
|------|---------|------------|
| `AGENT_IGNORANCE_PROHIBITION_DOCTRINE.md` | **NEW v1.0 (2026-02-11)** - Agent Ignorance Prohibition Doctrine. Zero tolerance for ignorance-based failures. Defines 8 ignorance categories (authority, capability, requirement, governance, coordination, context, process, tool), bans ignorance as excuse, requires proactive elimination through research/coordination/escalation. Includes merge gate integration and enforcement model (education, escalation, suspension). | Readiness, PR-gates, Feedback/learning |

---

## Governance Philosophy (governance/philosophy/)

Philosophy files define foundational principles and doctrines.

| File | Purpose | Categories |
|------|---------|------------|
| `BYG_DOCTRINE.md` | Build-Your-Governance doctrine | Readiness |
| `GOVERNANCE_INCIDENT_RESPONSE_DOCTRINE.md` | Incident response doctrine for governance failures | Feedback/learning |
| `GOVERNANCE_SOURCE.md` | Defines authoritative source of governance | Readiness |

---

## Governance OPOJD (governance/opojd/)

OPOJD (One Point of Job Definition) governance files.

| File | Purpose | Categories |
|------|---------|------------|
| `CS2_OPOJD_EXTENSION.md` | CS2 OPOJD extension | Readiness |
| `CS5_ANTI_INTERRUPTION_RULE.md` | Anti-interruption rule for execution | Readiness |
| `CS6_EXECUTION_MANDATE.md` | CS6 execution mandate | Readiness |
| `OPOJD_ARCHITECTURE.md` | OPOJD architecture definition | Readiness |
| `OPOJD_COMPLETE_JOB_HANDOVER_DOCTRINE.md` | **NEW v2.0 (2026-02-11)** - OPOJD v2.0: Complete Job Handover Doctrine. Mandates agents deliver 100% complete jobs on handover with zero tolerance for partial work, failed gates, or excuse-based handovers. Includes pre-handover self-validation, Stop-and-Fix integration, mandatory improvement capture, and no-excuse policy. Constitutional upgrade to OPOJD v1.0. | Readiness, PR-gates, Feedback/learning |
| `OPOJD_COMPLETION_REPORT.md` | OPOJD completion report | Readiness |
| `OPOJD_COMPLETION_REPORT_TEMPLATE.md` | Template for OPOJD completion reports | (template) |
| `OPOJD_DOCTRINE.md` | OPOJD doctrine and principles | Readiness |

---

## Governance Coordination (governance/coordination/)

Cross-agent coordination governance files.

| File | Purpose | Categories |
|------|---------|------------|
| `CROSS_AGENT_COORDINATION_PROTOCOL.md` | **NEW v1.0 (2026-02-11)** - Cross-Agent Coordination Protocol. Canonical process for cross-agent coordination when agents encounter authority or capability boundaries. Defines boundary detection, coordination workflow, decision trees, sandbox clarity requirements, and integration with OPOJD for complete handover. Distinguishes coordination from delegation. | Readiness, PR-gates, Feedback/learning |

---

## Governance Execution (governance/execution/)

Execution-related governance files.

| File | Purpose | Categories |
|------|---------|------------|
| `BUILDER_CONSTITUTIONAL_SYSTEMS.md` | Builder constitutional requirements | Readiness |
| `CANONICAL_BACKLOG_SEQUENCE.md` | Canonical sequencing of backlog work | Readiness |
| `EXECUTION_INVARIANTS.md` | Execution invariants and rules | Readiness |
| `WAVE_MODEL.md` | Wave-based execution model | Readiness |

---

## Governance Maturion (governance/maturion/)

Maturion-specific governance definitions.

| File | Purpose | Categories |
|------|---------|------------|
| `EXECUTION_PHILOSOPHY.md` | Maturion execution philosophy | (philosophy) |
| `FM_ROLE_CANON.md` | **UPDATED (2026-02-08)** - Canonical definition of FM role with **NEW Section 12** (Operational Sandbox: execution environment, resource constraints, security boundaries, degraded mode operation) and **NEW Section 13** (Issue Artifact Generation and Governance: wave initialization, builder task, correction/RCA, governance gap, and subwave scope issues) | Readiness |
| `HISTORY.md` | Historical context for governance evolution | (documentation) |
| `PRINCIPLES.md` | Core Maturion principles | (philosophy) |
| `VISION.md` | Maturion vision statement | (philosophy) |

---

## Governance Memory (governance/memory/)

Memory and learning governance files.

| File | Purpose | Categories |
|------|---------|------------|
| `canonical-lessons/gate_misalignment_lessons.md` | Lessons learned from gate misalignment | Feedback/learning |
| `canonical-lessons/mcp_failure_postmortem.md` | MCP failure postmortem analysis | Feedback/learning |
| `canonical-lessons/regression_prevention_lessons.md` | Lessons for regression prevention | Feedback/learning |
| `governance_evolution_log.md` | Log of governance evolution changes | Feedback/learning |

---

## Governance Reports (governance/reports/)

Governance analysis and assessment reports.

| File | Purpose | Categories |
|------|---------|------------|
| `PHASE_2_CANONIZATION_SUMMARY.md` | Phase 2 canonization summary | Readiness |
| `POST_TRANSITION_GOVERNANCE_SCAN.md` | Post-transition governance scan report | Readiness |
| `POST_TRANSITION_GOVERNANCE_SCAN_IMPLEMENTATION_SUMMARY.md` | Implementation summary from post-transition scan | Readiness |

---

## Governance Runbooks (governance/runbooks/)

Operational runbooks for governance processes.

| File | Purpose | Categories |
|------|---------|------------|
| `FOREMAN_GOVERNANCE_RUNBOOK.md` | Operational runbook for FM governance processes | Readiness |
| `IMPLEMENTATION_ENTRYPOINT.md` | Step-by-step entrypoint for governance rollout order | Readiness, Layer-down |

---

## Governance Escalation (governance/escalation/)

Escalation policies and protocols.

| File | Purpose | Categories |
|------|---------|------------|
| `ESCALATION_POLICY.md` | Escalation policy for governance issues | Feedback/learning |

---

## Governance Incidents (governance/incidents/)

Formal incident reports for governance violations, test dodging, and catastrophic governance failures.

| File | Purpose | Categories |
|------|---------|------------|
| `README.md` | Incident directory documentation and structure | Feedback/learning |
| `INCIDENT-2026-01-08-TEST-DODGING-WARNING-SUPPRESSION.md` | Test dodging incident via pytest warning suppression | Feedback/learning |

---

## Governance Evidence (governance/evidence/)

Evidence files documenting governance compliance and readiness.

| File | Purpose | Categories |
|------|---------|------------|
| `PLATFORM_READINESS_EVIDENCE_2025-12-30.md` | Platform readiness evidence snapshot | Readiness |

---

## Governance Status Documents (governance/)

Status and completion tracking documents in governance root.

| File | Purpose | Categories |
|------|---------|------------|
| `CHANGELOG.md` | Changelog for governance repository | (documentation) |
| `COMPLETE_BUILD_PHILOSOPHY_COMPLIANCE.md` | Build philosophy compliance completion report | Readiness |
| `CONSTITUTION.md` | Governance constitution | Readiness |
| `CRITICAL_BUG_PROMPT_COMPRESSION.md` | Critical bug documentation | Feedback/learning |
| `CS1_IMPLEMENTATION_COMPLETE.md` | CS1 implementation completion report | Readiness |
| `CS2_IMPLEMENTATION_SUMMARY.md` | CS2 implementation summary | Readiness |
| `CS4_COMPLETE.md` | CS4 completion report | Readiness |
| `CS5_IMPLEMENTATION_COMPLETE.md` | CS5 implementation completion report | Readiness |
| `CS6_IMPLEMENTATION_COMPLETE.md` | CS6 implementation completion report | Readiness |
| `GITHUB_MODEL_SCALING_SECURITY.md` | GitHub model scaling security documentation | Readiness |
| `GOVERNANCE_TRANSITION_LEGACY_GATES_DECOMMISSIONING.md` | Legacy gate decommissioning documentation | PR-gates |
| `QA_PLATFORM_ENHANCEMENT.md` | QA platform enhancement documentation | Readiness |
| `QIEL_ENV_ALIGNMENT.md` | QIEL environment alignment documentation | Readiness |
| `QIW_THRESHOLD_UNIFICATION.md` | QIW threshold unification documentation | Readiness |
| `SECURITY_SUMMARY_CS5.md` | CS5 security summary | Readiness |
| `SECURITY_SUMMARY_CS6.md` | CS6 security summary | Readiness |
| `SECURITY_SUMMARY_PHASE_11_14.md` | Phase 11-14 security summary | Readiness |
| `SECURITY_SUMMARY_PHASE_2.md` | Phase 2 security summary | Readiness |
| `SECURITY_SUMMARY_WAVE_ZERO.md` | Wave Zero security summary | Readiness |
| `STRICT_MODE_COMPLIANCE_PROJECT.md` | Strict mode compliance project documentation | Readiness |
| `TRUE_NORTH_ALIGNMENT_CS3.md` | CS3 True North alignment documentation | Readiness |

---

## Governance Autonomy (governance/autonomy/)

Autonomy-related governance completion reports.

| File | Purpose | Categories |
|------|---------|------------|
| `AUTO_01_COMPLETION_REPORT.md` | AUTO_01 completion report | Readiness |
| `AUTO_02_COMPLETION_REPORT.md` | AUTO_02 completion report | Readiness |
| `AUTO_03_COMPLETION_REPORT.md` | AUTO_03 completion report | Readiness |
| `AUTO_04_COMPLETION_REPORT.md` | AUTO_04 completion report | Readiness |
| `AUTO_05_COMPLETION_REPORT.md` | AUTO_05 completion report | Readiness |
| `COMPLETE_IMPLEMENTATION_REPORT.md` | Complete autonomy implementation report | Readiness |
| `EXECUTION_STATUS.md` | Autonomy execution status | Readiness |
| `OVERNIGHT_EXECUTION_FINAL_REPORT.md` | Overnight execution final report | Readiness |

---

## Governance Parking Station (governance/parking-station/)

Parking station governance files.

| File | Purpose | Categories |
|------|---------|------------|
| `GPCA_AND_GOVERNANCE_RIPPLE_MODEL.md` | GPCA and governance ripple model integration | PR-gates, Feedback/learning |
| `README.md` | Parking station documentation | (documentation) |

---

## Governance Proposals (governance/proposals/)

Governance change proposal tracking.

| File | Purpose | Categories |
|------|---------|------------|
| `README.md` | Governance proposals documentation | (documentation) |

---

## Governance Profiles (governance/profiles/)

Agent and role profiles.

| File | Purpose | Categories |
|------|---------|------------|
| `builder.v1.md` | Builder profile version 1 | Readiness |

---

## Governance Tech Surveys (governance/tech-surveys/)

Technical surveys for governance technology decisions.

| File | Purpose | Categories |
|------|---------|------------|
| `TSP_01_INITIAL_SURVEY.md` | Initial technical survey | (documentation) |

---

## Governance Diagrams (governance/diagrams/)

**NEW (2026-01-21)** - Workflow and process diagrams for governance protocols.

| File | Purpose | Categories |
|------|---------|------------|
| `agent-self-governance-check-workflow.md` | **NEW (2026-01-21)** - Visual workflow for universal agent self-governance check (before every job) | Layer-down, Readiness |
| `inventory-ripple-process-workflow.md` | **NEW (2026-01-21)** - Visual workflow for inventory ripple and reference process when canonical governance changes | Layer-down, Readiness |
| `error-drift-handling-workflow.md` | **NEW (2026-01-21)** - Visual workflow for error and drift handling when agent alignment checks fail | Layer-down, Readiness |
| `agent-authority-hierarchy-diagram.md` | **NEW (2026-01-21)** - Visual diagram of agent self-align authority matrix and escalation paths | Layer-down, Readiness |

**Last Updated**: 2026-01-21  
**Ripple Required**: YES - These diagrams MUST ripple to all consumer repos (office-app, PartPulse, R_Roster)  
**Authority**: AGENT_SELF_GOVERNANCE_PROTOCOL.md v1.0.0

---

## Governance Waves (governance/waves/)

Wave execution governance.

| File | Purpose | Categories |
|------|---------|------------|
| `MODERNIZATION_WAVE_ALPHA.md` | Wave Alpha modernization documentation | Readiness |

---

## GitHub Scripts (.github/scripts/)

Automation scripts for governance enforcement and validation.

| File | Purpose | Categories |
|------|---------|------------|
| `check_locked_sections.py` | Python script for validating LOCKED sections in agent contracts | PR-gates |
| `governance-gap-analyzer.sh` | **NEW v1.0.0 (2026-02-04) PUBLIC_API** - Automated governance gap detection and remediation script. Compares local governance to canonical GOVERNANCE_AGENT_REQUIREMENTS_MATRIX.md, detects missing mandatory/recommended artifacts, executes auto-layer-down for governance files, generates reports, and updates GOVERNANCE_INVENTORY.json. Used by PRE_WORK_GOVERNANCE_SELF_TEST_PROTOCOL.md for pre-work validation | PR-gates, Layer-down, Readiness |
| `validate-scope-to-diff.sh` | Bash script for validating scope declaration matches git diff | PR-gates |
| `validate-yaml-frontmatter.sh` | Bash script for validating YAML frontmatter in agent contracts | PR-gates |

---

## GitHub Workflows (.github/workflows/)

PR gate enforcement workflows.

| File | Purpose | Categories |
|------|---------|------------|
| `README.md` | Workflow documentation | (documentation) |
| `agent-governance-check.yml` | Agent governance check workflow | PR-gates |
| `fm-effectiveness-validation-gate.yml` | FM effectiveness validation gate | PR-gates, Feedback/learning |
| `fm-failure-enforcement-gate.yml` | FM failure enforcement gate | PR-gates, Feedback/learning |
| `fm-failure-promotion-gate.yml` | FM failure promotion gate | PR-gates, Feedback/learning |
| `fm-learning-promotion-gate.yml` | FM learning promotion gate | PR-gates, Feedback/learning |
| `foreman-governance.yml` | Foreman governance workflow | PR-gates |
| `governance-gate.yml` | Primary governance gate workflow | PR-gates |
| `governance-scope-to-diff-gate.yml` | Governance scope-to-diff validation gate | PR-gates |

---

## Docs/Governance (docs/governance/)

Documentation and guidance for governance processes.

| File | Purpose | Categories |
|------|---------|------------|
| `ALIGNMENT_SUMMARY_2025-12-16.md` | Alignment summary report | Readiness |
| `ALIGNMENT_VERIFICATION_2025-12-16.md` | Alignment verification report | Readiness |
| `ARCHITECTURE_APPROVAL_HISTORY.md` | History of architecture approvals | (documentation) |
| `ARCHITECTURE_CHANGE_APPROVAL.md` | Architecture change approval process | Readiness |
| `AUTONOMY_PIPELINE.md` | Autonomy pipeline documentation | Readiness |
| `BRANCH_PROTECTION_SETUP.md` | Branch protection setup guide | PR-gates |
| `CONSTITUTIONAL_QA.md` | Constitutional QA documentation | PR-gates, Readiness |
| `DRIFT_DETECTION_GUIDE.md` | Drift detection guide | Feedback/learning |
| `GUARDRAILS.md` | Guardrails documentation | PR-gates, Readiness |
| `GUARDRAIL_RUNTIME_ENGINE.md` | Guardrail runtime engine specification | PR-gates, Readiness |
| `GUARDRAIL_SANDBOX.md` | Guardrail sandbox documentation | Readiness |
| `ONE_TIME_BUILD_LAW.md` | One-Time Build Law documentation | Readiness, PR-gates |
| `PRE_HANDOVER_QA_CHECKLIST.md` | Pre-handover QA checklist | PR-gates, Readiness |
| `QIC_RULES.md` | QIC (Quality Integrity Continuity) rules | PR-gates, Readiness |
| `agent-md-alignment-sweep-2025-12-16.md` | Agent markdown alignment sweep report | Readiness |
| `github-model-scaling-policy.md` | GitHub model scaling policy | Readiness |
| `model-tier-matrix.md` | Model tier selection matrix | Readiness |

---

## Architecture (architecture/)

Architecture governance files.

| File | Purpose | Categories |
|------|---------|------------|
| `learning.template.md` | Learning template for architecture | Feedback/learning |
| `runtime-readiness-check-architecture.md` | Runtime readiness check architecture | Readiness |
| `runtime-readiness-check-checklist-validation.md` | Runtime readiness check validation | Readiness |

---

## Docs/Architecture (docs/architecture/)

Architecture documentation with governance implications.

| File | Purpose | Categories |
|------|---------|------------|
| `cs4-governance-alerts-architecture.md` | CS4 governance alerts architecture | Feedback/learning |

---

## Docs/QA (docs/)

QA templates and documentation.

| File | Purpose | Categories |
|------|---------|------------|
| `qa-template-for-new-projects.md` | QA template for new projects | Readiness, Layer-down |

---

## Maturion Canon (maturion/canon/)

Maturion canonical specifications.

| File | Purpose | Categories |
|------|---------|------------|
| `BOOTSTRAP_CANON.md` | Bootstrap canonical requirements | Readiness |

---

## Maturion Governance Specifications (maturion/)

Maturion platform governance specifications.

| File | Purpose | Categories |
|------|---------|------------|
| `audit-compliance-framework-spec.md` | Audit and compliance framework specification | Readiness |
| `autonomous-expansion-protocol-spec.md` | Autonomous expansion protocol specification | Readiness |
| `cognitive-hygiene-protocol-spec.md` | Cognitive hygiene protocol specification | Readiness |
| `constitutional-integrity-verification-spec.md` | Constitutional integrity verification specification | Readiness |
| `control-effectiveness-engine-spec.md` | Control effectiveness engine specification | Readiness |
| `crisis-management-executive-decision-protocol-spec.md` | Crisis management protocol specification | Feedback/learning |
| `cross-embodiment-interaction-protocol-spec.md` | Cross-embodiment interaction protocol | Readiness |
| `cross-tenant-intelligence-safety-layer-spec.md` | Cross-tenant intelligence safety specification | Readiness |
| `embodiment-calibration-engine-spec.md` | Embodiment calibration engine specification | Readiness |
| `governance-evidence-engine-spec.md` | Governance evidence engine specification | Readiness |
| `guardrails-and-safety-charter.md` | Guardrails and safety charter | PR-gates, Readiness |
| `knowledge-boundary-reinforcement-spec.md` | Knowledge boundary reinforcement specification | Readiness |
| `maturion-cost-optimization-policy.md` | Cost optimization policy | Readiness |
| `maturion-governance-api-spec.md` | Governance API specification | Readiness |
| `maturion-identity.md` | Maturion identity specification | (philosophy) |
| `maturion-incident-taxonomy.md` | Incident taxonomy | Feedback/learning |
| `maturion-marketing-charter.md` | Marketing charter | (documentation) |
| `maturion-memory-architecture.md` | Memory architecture specification | Readiness |
| `maturion-role-behaviour-matrix.md` | Role behavior matrix | Readiness |
| `maturion-runtime-spec.md` | Runtime specification | Readiness |
| `maturion-self-learning-governance.md` | Self-learning governance specification | Feedback/learning |
| `maturion-tenant-isolation-standard.md` | Tenant isolation standard | Readiness |
| `maturion-threat-intelligence-framework.md` | Threat intelligence framework | Readiness |
| `maturion-true-north.md` | True North alignment specification | (philosophy) |
| `maturion-world-model.md` | World model specification | (philosophy) |
| `module-architecture-governance-template.md` | Module architecture governance template | Readiness, Layer-down |
| `multi-embodiment-deployment-charter.md` | Multi-embodiment deployment charter | Readiness |
| `multi-level-threat-containment-protocol-spec.md` | Multi-level threat containment specification | Readiness |
| `operational-resilience-engine-spec.md` | Operational resilience engine specification | Readiness |
| `oversight-system.md` | Oversight system specification | Readiness |
| `platform-change-management-protocol-spec.md` | Platform change management protocol | Feedback/learning |
| `platform-tree-api-spec.md` | Platform Tree API specification | Readiness |
| `platform-tree-architecture.md` | Platform Tree architecture specification | Readiness |
| `platform-tree-autonomy-integration-spec.md` | Platform Tree autonomy integration specification | Readiness |
| `platform-tree-global-risk-overlay-spec.md` | Platform Tree global risk overlay specification | Readiness |
| `platform-tree-governance.md` | Platform Tree governance specification | Readiness |
| `platform-tree-incident-overlay-spec.md` | Platform Tree incident overlay specification | Feedback/learning |
| `platform-tree-metrics-engine-spec.md` | Platform Tree metrics engine specification | Readiness |
| `platform-tree-phase-1-implementation-blueprint.md` | Platform Tree Phase 1 blueprint | Readiness |
| `platform-tree-phase-2-implementation-blueprint.md` | Platform Tree Phase 2 blueprint | Readiness |
| `platform-tree-phase-3-implementation-blueprint.md` | Platform Tree Phase 3 blueprint | Readiness |
| `platform-tree-phase-4-implementation-blueprint.md` | Platform Tree Phase 4 blueprint | Readiness |
| `platform-tree-predictive-health-engine-spec.md` | Platform Tree predictive health engine specification | Readiness |
| `platform-tree-security-isolation-overlay-spec.md` | Platform Tree security isolation overlay specification | Readiness |
| `platform-tree-visualization-spec.md` | Platform Tree visualization specification | Readiness |
| `platform-tree-watchdog-visualisation-spec.md` | Platform Tree watchdog visualization specification | Readiness |
| `proactive-governance-engine-spec.md` | Proactive governance engine specification | PR-gates, Feedback/learning |
| `sandbox-observability-telemetry-spec.md` | Sandbox observability telemetry specification | Readiness |
| `TECHNOLOGY_EVOLUTION_DOCTRINE.md` | Technology evolution doctrine | (philosophy) |
| `true-north-compliance-dashboard-spec.md` | True North compliance dashboard specification | Readiness |

---

## Maturion Philosophy (maturion/philosophy/)

Maturion philosophical foundations.

| File | Purpose | Categories |
|------|---------|------------|
| `maturion-governance-constitution.md` | Maturion governance constitution | Readiness |
| `technology-evolution-doctrine.md` | Technology evolution doctrine | (philosophy) |

---

## Maturion Process (maturion/process/)

Maturion process governance.

| File | Purpose | Categories |
|------|---------|------------|
| `LESSONS_TO_CANON_WORKFLOW.md` | Workflow for promoting lessons to canon | Feedback/learning |
| `VALIDATOR_CONVERGENCE_CHECKLIST.md` | Validator convergence checklist | PR-gates, Readiness |
| `communication/GOVERNANCE_GATE_STANDARD_RESPONSE.md` | Standard response template for governance gate failures | PR-gates, Feedback/learning |

---

## Memory Authority (memory/AUTHORITY/)

Memory governance authority files.

| File | Purpose | Categories |
|------|---------|------------|
| `MEMORY_FORGET_POLICY.md` | Memory forget/deletion policy | Readiness |
| `MEMORY_READ_POLICY.md` | Memory read access policy | Readiness |
| `MEMORY_WRITE_POLICY.md` | Memory write access policy | Readiness |

---

## Memory Audit (memory/AUDIT/)

Memory audit logs.

| File | Purpose | Categories |
|------|---------|------------|
| `memory-access-log.md` | Memory access audit log | Readiness |
| `memory-write-log.md` | Memory write audit log | Readiness |

---

## Memory Tenant Schema (memory/TENANT/_SCHEMA/)

Memory tenant schemas.

| File | Purpose | Categories |
|------|---------|------------|
| `tenant-memory.schema.json` | Tenant memory JSON schema | Readiness |

---

## Reports (reports/)

Governance analysis and audit reports.

| File | Purpose | Categories |
|------|---------|------------|
| `ARCHITECTURE_READINESS_ALIGNMENT_REPORT.md` | Architecture readiness alignment report | Readiness |
| `COGNITIVE_ORCHESTRATION_GOVERNANCE_IMPACT.md` | Cognitive orchestration governance impact analysis | Readiness |
| `FOREMAN_GOVERNANCE_DIAGNOSTIC_REPORT.md` | Foreman governance diagnostic report | Readiness |
| `FOREMAN_MEMORY_RESPONSIBILITY_GAP_ANALYSIS.md` | Foreman memory responsibility gap analysis | Readiness |
| `GOVERNANCE_DEPENDENCY_AND_ACTIVATION_SCAN.md` | Governance dependency and activation scan | Readiness |
| `MEMORY_AUTHORITY_BOUNDARY_AUDIT.md` | Memory authority boundary audit | Readiness |
| `MEMORY_EXISTENCE_GOVERNANCE_AUDIT.md` | Memory existence governance audit | Readiness |
| `MEMORY_GOVERNANCE_TRIAGE_REPORT.md` | Memory governance triage report | Readiness |
| `PR_SUBMISSION_INVARIANT_VERIFICATION_REPORT.md` | PR submission invariant verification report | PR-gates |
| `README_WAVE_A.md` | Wave A reports documentation | (documentation) |
| `WATCHDOG_OBSERVABILITY_READINESS_REPORT.md` | Watchdog observability readiness report | Readiness |
| `WAVE_A_COMPLETION_REPORT.md` | Wave A completion report | Readiness |
| `WAVE_A_EXECUTION_PLAN.md` | Wave A execution plan | Readiness |
| `WAVE_A_FEEDBACK_REPORT.md` | Wave A feedback report | Feedback/learning |
| `WAVE_A_SUMMARY_REPORT.md` | Wave A summary report | Readiness |

---

## Evidence (evidence-new/)

Execution evidence and summaries.

| File | Purpose | Categories |
|------|---------|------------|
| `FINAL_COMPLIANCE_REPORT.md` | Final compliance report | Readiness |
| `GOVERNANCE_HARDENING_SUMMARY.md` | Governance hardening summary | Readiness |
| `README.md` | Evidence documentation | (documentation) |
| `STRUCTURAL_CLEANUP_REPORT.md` | Structural cleanup report | Readiness |
| `autonomy-reauthorization-implementation-evidence.md` | Autonomy reauthorization evidence | Readiness |
| `cs1-validator-fix-summary.md` | CS1 validator fix summary | Readiness |
| `e2e-autonomous-mcp-validation-final-summary.md` | E2E autonomous MCP validation summary | Readiness |
| `governance-gate-dry-run-execution.md` | Governance gate dry run execution evidence | PR-gates |
| `red-qa-report-e2e-autonomous-mcp-validation.md` | Red QA report for E2E validation | PR-gates, Readiness |
| `surveys/PR_MERGE_GATE_FAILURE_SURVEY_2024-12-16.md` | PR merge gate failure survey | PR-gates, Feedback/learning |
| `wave-execution/WAVE_2_IMPLEMENTATION_SUMMARY.md` | Wave 2 implementation summary | Readiness |
| `wave-execution/WAVE_3.2_SUMMARY.md` | Wave 3.2 summary | Readiness |
| `wave-execution/WAVE_3.3_SUMMARY.md` | Wave 3.3 summary | Readiness |
| `wave-execution/WAVE_3C_FINAL_DELIVERY.md` | Wave 3C final delivery | Readiness |
| `wave-execution/WAVE_4_SUMMARY.md` | Wave 4 summary | Readiness |
| `wave-execution/WAVE_5.1_SUMMARY.md` | Wave 5.1 summary | Readiness |
| `wave-execution/WAVE_5_SUMMARY.md` | Wave 5 summary | Readiness |
| `wave-execution/WAVE_ZERO_INTEGRATION_COMPLETE.md` | Wave Zero integration complete | Readiness |

---

## Execution Halt (execution-halt/)

Execution halt documentation.

| File | Purpose | Categories |
|------|---------|------------|
| `ANNEX_1_EXECUTION_HALT_REPORT.md` | Execution halt report | Feedback/learning |
| `ANNEX_1_INFRASTRUCTURE_GAP_REPORT.md` | Infrastructure gap report | Readiness |

---

## Execution Progress (execution-progress/)

Execution progress tracking.

| File | Purpose | Categories |
|------|---------|------------|
| `wave0-issue240-build-to-green-status.md` | Wave 0 issue 240 build-to-green status | Readiness |

---

## Classification (classification/)

Content classification reports.

| File | Purpose | Categories |
|------|---------|------------|
| `PHASE_1_MATURION_CONTENT_CLASSIFICATION_REPORT.md` | Phase 1 content classification report | (documentation) |

---

## Implementation (implementation/)

Implementation completion reports (not canonical governance, but records implementation status).

| File | Purpose | Categories |
|------|---------|------------|
| Multiple implementation completion reports | Various implementation completion documentation | (implementation status) |

---

## Ripple Requirements (PR #1020 - Issue #1020)

**Date**: 2026-01-26  
**Source**: PR #1015 and PR #1018 ripple actions  
**Protocol Authority**: `governance/canon/GOVERNANCE_RIPPLE_CHECKLIST_PROTOCOL.md` v1.0.0

### Completed in This Update

✅ **Canonical Governance**:
- Created `GOVERNANCE_RIPPLE_CHECKLIST_PROTOCOL.md` v1.0.0 in governance/canon/
- Updated `EXECUTION_BOOTSTRAP_PROTOCOL.md` reference (already at v1.1.0 with Section 5.1)
- Updated `.agent.schema.md` with Section 13 (LOCKED sections requirements)

✅ **Templates**:
- Updated `PREHANDOVER_PROOF_TEMPLATE.md` to v2.1.0 with Zero-Warning Validation section
- Updated `AGENT_CONTRACT.template.md` with LOCKED sections guidance
- `AGENT_FILE_LOCKED_SECTIONS_TEMPLATE.md` already exists (created in PR #1018)

✅ **Agent Contracts (Governance Repo)**:
- governance-repo-administrator.agent.md: Already has Zero-Warning LOCKED section (v4.2.0)
- CodexAdvisor-agent.md: Already has Zero-Warning LOCKED section (v4.2.0)

### Required Downstream Ripple (Consumer Repos)

🔴 **Consumer Repositories Requiring Updates**:
1. **office-app** (APGI-cmy/maturion-office-app)
2. **PartPulse** (APGI-cmy/PartPulse)
3. **R_Roster** (APGI-cmy/R_Roster)

**Agent Contracts Requiring Zero-Warning LOCKED Section**:
- [ ] governance-liaison.agent.md (all consumer repos)
- [ ] FM agent contracts (all consumer repos)
- [ ] Builder agent contracts (all consumer repos)

**Files Requiring Layer-Down**:
- [ ] governance/canon/GOVERNANCE_RIPPLE_CHECKLIST_PROTOCOL.md (copy to each consumer repo)
- [ ] governance/templates/PREHANDOVER_PROOF_TEMPLATE.md v2.1.0 (layer down to each consumer repo)
- [ ] governance/canon/agent-contracts-guidance/ (entire folder - layer down to each consumer repo)
  - [ ] agent-contracts-guidance/.agent.schema.md
  - [ ] agent-contracts-guidance/AGENT_FILE_BINDING_REQUIREMENTS.md
  - [ ] agent-contracts-guidance/AGENT_FILE_CREATION_POLICY.md
  - [ ] agent-contracts-guidance/AGENT_CONTRACT_MIGRATION_GUIDE.md
  - [ ] agent-contracts-guidance/AGENT_ONBOARDING_QUICKSTART.md
  - [ ] agent-contracts-guidance/templates/AGENT_CONTRACT.template.md
  - [ ] agent-contracts-guidance/templates/AGENT_FILE_LOCKED_SECTIONS_TEMPLATE.md
  - [ ] agent-contracts-guidance/runbooks/AGENT_FILE_VALIDATION.md
  - [ ] agent-contracts-guidance/runbooks/AGENT_FILE_MAINTENANCE.md

**Tracking Issues**:
- [ ] Create issue in office-app: "Governance Ripple: Zero-Warning Enforcement + LOCKED Sections"
- [ ] Create issue in PartPulse: "Governance Ripple: Zero-Warning Enforcement + LOCKED Sections"
- [ ] Create issue in R_Roster: "Governance Ripple: Zero-Warning Enforcement + LOCKED Sections"
- [ ] Assign all issues to: @governance-liaison role

**Target Completion**: Within 1 week of PR #1020 merge

**Coordination**: CS2 approval required for agent contract modifications per AGENT_CONTRACT_PROTECTION_PROTOCOL.md

---

## Summary

**Total Governance Artifacts Inventoried**: 286+
**Total Canon Inventory Entries (CANON_INVENTORY.json)**: 156

**Category Distribution**:
- **Readiness**: Primary category for platform, build, and execution readiness governance
- **PR-gates**: PR gate enforcement, validation, and evaluation governance
- **Feedback/learning**: Learning intake, promotion, failure handling, incident tracking, and improvement governance
- **Layer-down**: Governance propagation to downstream repositories

**Notes**:
- Some artifacts are uncategorized (marked as documentation, philosophy, templates, or implementation status)
- Many artifacts serve multiple categories simultaneously
- This inventory was last updated 2026-02-14 with comprehensive survey findings

**PUBLIC_API Artifacts** (external tooling may depend on these):
- `GOVERNANCE_AGENT_REQUIREMENTS_MATRIX.md` - Agent requirements matrix
- `GOVERNANCE_INVENTORY_SCHEMA.json` - Inventory validation schema
- `governance-gap-analyzer.sh` - Gap detection script

---

## Survey Findings (2026-02-14)

### Survey Scope
Comprehensive survey of the entire governance repository per issue request. Covers canon inventory integrity, duplicate detection, conflict identification, provenance completeness, and structural recommendations.

### CANON_INVENTORY.json Integrity Fixes Applied

| Issue | File | Before | After |
|-------|------|--------|-------|
| Stale SHA256 hash | `LIVING_AGENT_SYSTEM.md` | `43e751bd6dc6...` | `ce26928e1492...` (matches disk) |
| Stale short hash | `AGENT_ENVIRONMENTAL_RESPONSIBILITY_DOCTRINE.md` | `e638c94a4815` | `9ee48f13d99e` (matches sha256 prefix) |
| Missing entry | `agent-contracts-guidance/.agent.schema.md` | Not in inventory | Added with correct sha256 |
| Incorrect count | `total_canons` | 155 | 156 |

### Files Outside `governance/canon/` Listed in Canon Inventory

11 files in CANON_INVENTORY.json are located outside `governance/canon/`:

| File | Location | Type |
|------|----------|------|
| `APP_DESCRIPTION_REQUIREMENT_POLICY.md` | `governance/policy/` | policy |
| `ARCHITECTURE_TEST_TRACEABILITY_METHODOLOGY.md` | `governance/policy/` | policy |
| `AUTOMATED_DEPRECATION_DETECTION_GATE.md` | `governance/policy/` | policy |
| `BUILDER_QA_HANDOVER_POLICY.md` | `governance/policy/` | policy |
| `FM_MATURION_DELEGATED_ACTION_POLICY.md` | `governance/policy/` | policy |
| `POLICY-NO-ONLY-LANGUAGE.md` | `governance/policy/` | policy |
| `PR_GATE_FAILURE_HANDLING_PROTOCOL.md` | `governance/policy/` | policy |
| `QA_POLICY_MASTER.md` | `governance/policy/` | policy |
| `TEST_REMOVAL_GOVERNANCE_GATE.md` | `governance/policy/` | policy |
| `MODULE_LIFECYCLE_AND_REPO_STRUCTURE_STRATEGY.md` | `governance/strategy/` | strategy |
| `BUILD_PROGRESS_TRACKER_TEMPLATE.md` | `governance/templates/` | template |

**Assessment**: These files are correctly typed as policy/strategy/template and their current locations match their types. They are legitimately tracked in the canon inventory even though they are not in the `governance/canon/` subdirectory. No action required — the inventory correctly reflects their actual locations.

### Duplicate Filenames Across Repository

Files with the same name appearing in multiple locations:

| Filename | Locations | Assessment |
|----------|-----------|------------|
| `scope-declaration.md` | `./scope-declaration.md`, `./governance/scope-declaration.md` | Potential conflict — recommend consolidating |
| `WAVE_MODEL.md` | `governance/canon/WAVE_MODEL.md`, `governance/execution/WAVE_MODEL.md` | Potential conflict — canon version is authoritative |
| `IMPLEMENTATION_COMPLETE.md` | `./IMPLEMENTATION_COMPLETE.md`, `./implementation/IMPLEMENTATION_COMPLETE.md` | Different scopes — root is repo-level, implementation/ is phase-specific |
| `IMPLEMENTATION_SUMMARY.md` | `./IMPLEMENTATION_SUMMARY.md`, `./implementation/IMPLEMENTATION_SUMMARY.md` | Different scopes — similar to above |
| Other duplicates | `lessons-learned.md`, `patterns.md`, `README.md`, etc. | Agent workspace files — expected per-agent duplication |

### Provenance Gaps

69 out of 156 canon entries have incomplete provenance:
- **Missing `effective_date`**: 69 entries have `"effective_date": "unknown"`
- **Missing `version`**: 2 entries have `"version": "unknown"`

This is documented but not automatically remediable — provenance data requires manual review of each canon file's header to extract accurate dates and versions.

### Root-Level File Accumulation

67 markdown files exist at the repository root level. Many are:
- **Archive/historical files**: 17 `PREHANDOVER_PROOF_archive_*` files
- **RCA/analysis documents**: 4 `RCA_*.md` files
- **Implementation status documents**: Multiple `*_IMPLEMENTATION_*.md`, `*_SUMMARY.md` files
- **One-time reports**: `GAP_ANALYSIS.md`, `GOVERNANCE_GAP_ANALYSIS_FINDINGS.md`, etc.

**Recommendation**: These files contribute to root-level clutter. Consider archiving completed/historical documents to a dedicated `archive/` directory. This is a CS2-level structural decision.

### Structural Recommendations (Require CS2 Approval)

1. **Archive root-level historical files**: Move `PREHANDOVER_PROOF_archive_*` and completed RCA/analysis files to an `archive/` directory
2. **Resolve `WAVE_MODEL.md` duplication**: Determine if `governance/execution/WAVE_MODEL.md` should be removed or redirected to canon version
3. **Resolve `scope-declaration.md` duplication**: Consolidate the two root-level and governance-level copies
4. **Fill provenance gaps**: Schedule systematic review to populate `effective_date` and `version` for the 69 canon entries with `"unknown"` values
5. **Automate inventory validation**: Add CI check to verify CANON_INVENTORY.json hashes match actual files on disk

---

## Active Session Context (Interim Memory)

**Purpose**: Preserve context across Copilot sessions until FM memory system is activated.   
**Authority**: Interim solution per memory governance canons.  
**Maintenance**: Updated at end of significant sessions. 

### Current Session Focus

**Date**: 2026-01-21  
**Session Topic**: PR #992 Gate Failure - Root Cause Analysis and Remediation  

**Primary Objective**: Fix catastrophic failure where agent handed over PR with failing gates.

**Key Decisions Made**:
1. Agent contract updated (main branch) with "Pre-Handover Gate Validation (MANDATORY)" section
2. Identified root cause: PR branch didn't have updated contract (created before contract update)
3. Decided to create `AGENT_LOCAL_GATE_VALIDATION_PROTOCOL. md` as new canon
4. Decided to create failure record `FAILURE-001-PR992-SCOPE-GATE-FAILURE.md`

**Context for Next Session**:
- PR #992 merged successfully after scope declaration fix
- Agent contract on main now includes gate validation requirements
- **Pending**: Create 2 governance canons (protocol + failure record)
- **Pending**:  Rollout gate validation mandate to all agent contracts (phased, 3 weeks)
- **Learning captured**: Agents must run merge gates locally using IDENTICAL logic to CI

**Related Artifacts**:
- Issue #991: Integrate Governance Inventory Maintenance into Ripple Workflow (✅ CLOSED)
- PR #992: Enforce inventory maintenance in ripple propagation workflow (✅ MERGED)
- PR #990: Remove agent-contract-administrator intermediary (✅ MERGED)

**Technical Debt**:
- AGENT_LOCAL_GATE_VALIDATION_PROTOCOL.md not yet created
- FAILURE-001-PR992-SCOPE-GATE-FAILURE.md not yet created
- Gate validation not yet rolled out to builder/FM agents

---

### Session History (Recent)

**2026-01-21**:  PR #992 gate failure RCA - Root cause:  agent ran old contract without gate validation mandate.  Fixed by updating scope declaration and merging latest main into PR branch.

**2026-01-20**:  Merged PR #990 - Removed agent-contract-administrator, implemented CS2 direct authority model.

---

### Important Decisions Index

1. **CS2 Direct Authority Model** (2026-01-20): Eliminated agent-contract-administrator intermediary.  CS2 creates/modifies all agent files directly.

2. **Mandatory Gate Validation** (2026-01-21): All agents must run merge gates locally before handover. CI is confirmatory only.

3. **Evidence-Based Validation** (2026-01-19): Merge gates skip re-validation when PREHANDOVER_PROOF documents gate execution.

---

**Maintenance Protocol**:
- Update "Current Session Focus" at end of each significant session
- Move completed sessions to "Session History"
- Add major decisions to "Important Decisions Index"
- Commit changes with message: `[MEMORY] Update active session context - [topic]`

---

**Completion Status**: CURRENT  
**Last Updated**: 2026-01-21
**Next Phase**: Gap analysis (Phase 1.2 - requires separate authorization)
