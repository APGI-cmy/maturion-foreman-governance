# WATCHDOG COGNITIVE OBSERVATION PROTOCOL

## Status
**Type**: Canonical Governance Definition  
**Authority**: Supreme - Canonical  
**Version**: 1.0.0  
**Effective Date**: 2025-12-24  
**Owner**: Maturion Engineering Leadership (Johan Ras)  
**Precedence**: Subordinate to GOVERNANCE_PURPOSE_AND_SCOPE.md and WATCHDOG_AUTHORITY_AND_SCOPE.md  
**Applies To**: All Watchdog Implementations, All Cognitive Hygiene Protocol (CHP) Invocations, All Repositories

---

## 1. Purpose

This document formally defines how the **Independent Watchdog** observes the **Cognitive Hygiene Protocol (CHP)** to ensure governance compliance and cognitive stability without compromising Watchdog independence or creating recursive oversight loops.

The Cognitive Hygiene Protocol introduces a meta-cognitive layer for maintaining cognitive stability, drift normalization, and memory hygiene. Without proper observation governance, CHP could:
- Silently drift from governance constraints
- Mutate memory in violation of write policies
- Self-authorize beyond defined scope
- Create recursive hygiene-observation loops

**The Watchdog must observe CHP cleanly and safely.**

This document establishes:
- **What the Watchdog Observes**: CHP invocations, capability selection, escalation frequency, drift signals
- **What the Watchdog Must Not Observe**: Internal reasoning, raw prompts, sensitive model internals
- **Escalation Rules**: When Watchdog escalates CHP behavior
- **Difference Between**: Cognitive drift vs. Governance violation
- **Non-Interference Rule**: Watchdog must not modify CHP, suppress cognition, or authorize action

**Problem Context**:
- CHP operates at meta-cognitive level (observing and maintaining cognition)
- Without observation, CHP risks silent drift from governance
- With over-observation, recursive governance collapse is possible
- Watchdog independence requires clean observation boundaries
- Self-inspection paradox must be avoided (Watchdog does not inspect itself; Watchdog does not enable CHP to inspect itself)

---

## 2. Constitutional Mandate

This policy derives authority from and implements:
- **GOVERNANCE_PURPOSE_AND_SCOPE.md** - Governance as canonical memory and control system
- **WATCHDOG_AUTHORITY_AND_SCOPE.md** - Independent Watchdog authority, observation scope, and escalation
- **COGNITIVE_HYGIENE_AUTHORITY_MODEL.md** - CHP authority boundaries, decision rights, and prohibitions
- **COGNITIVE_HYGIENE_MEMORY_INTEGRATION_MODEL.md** - CHP memory interaction rules and write prohibitions
- **VISION_ALIGNMENT_AND_DRIFT_MODEL.md** - Vision drift detection requirements and escalation visibility
- **MEMORY_INTEGRITY_AND_CORRUPTION_MODEL.md** - Memory integrity and corruption detection
- **FOREMAN_AUTHORITY_AND_SUPERVISION_MODEL.md** - Foreman supervisory authority and POLC model

---

## 3. Core Principles

### 3.1 Watchdog Independence Preservation

**Principle**: Watchdog independence is absolute and must not be compromised by CHP observation requirements.

**Requirements**:
- Watchdog observes CHP independently (no CHP influence on observation)
- Watchdog determines what to observe based on governance canon (not CHP recommendations)
- Watchdog escalates based on governance rules (not CHP advisories)
- Watchdog authority cannot be modified by CHP
- Watchdog hard stop authority applies to CHP violations

**Boundaries**:
- CHP cannot instruct Watchdog on what to observe
- CHP cannot request Watchdog to suppress observations
- CHP cannot bypass Watchdog observation
- CHP cannot modify Watchdog escalation thresholds
- CHP transparency to Watchdog is mandatory, not optional

**Rationale**:
- Watchdog must remain independent to preserve governance integrity
- CHP is subject to observation like any other system
- No system may control or influence its own oversight
- Independence prevents recursive oversight collapse

**Enforcement**:
- Watchdog authority defined in WATCHDOG_AUTHORITY_AND_SCOPE.md (immutable by CHP)
- Human Authority is sole authority for Watchdog scope changes
- Attempts to influence Watchdog observation are governance violations
- Hard stop for CHP attempts to bypass or influence Watchdog

---

### 3.2 Observation-Only Discipline

**Principle**: Watchdog observes CHP but does not control, modify, or interfere with CHP operations.

**Requirements**:
- Watchdog reads CHP outputs, logs, proposals, escalations (read-only)
- Watchdog does not modify CHP hygiene operations
- Watchdog does not suppress CHP cognition or findings
- Watchdog does not authorize or approve CHP actions
- Watchdog escalates violations but does not correct them

**Boundaries**:
- Watchdog MAY read CHP artifacts, logs, and outputs
- Watchdog MAY NOT modify CHP operations
- Watchdog MAY NOT suppress CHP escalations
- Watchdog MAY NOT authorize CHP actions
- Watchdog MAY escalate CHP violations to Human Authority

**Rationale**:
- Observation must not interfere with observed system
- Watchdog role is visibility and escalation, not execution
- CHP operations remain under CHP authority (within governance constraints)
- Human Authority resolves escalations, not Watchdog

**Enforcement**:
- Watchdog has read-only access to CHP systems
- Watchdog cannot execute CHP operations
- Watchdog escalations are informational, not commands
- Human Authority decides CHP corrective actions

---

### 3.3 No Recursive Oversight

**Principle**: Watchdog observation of CHP must not create recursive oversight loops.

**Requirements**:
- Watchdog observes CHP (first-order observation)
- Watchdog does NOT observe itself observing CHP (no second-order observation)
- CHP does NOT observe Watchdog (no reverse observation)
- No system observes the Watchdog-CHP observation relationship

**Prohibited Recursive Patterns**:
- ❌ Watchdog observing Watchdog observation of CHP
- ❌ CHP observing Watchdog observation of CHP
- ❌ CHP performing "hygiene" on Watchdog observations
- ❌ Meta-observation layers beyond first-order Watchdog → CHP

**Boundaries**:
- First-order observation: Watchdog → CHP (✅ Authorized)
- Reverse observation: CHP → Watchdog (❌ Prohibited)
- Second-order observation: Watchdog → (Watchdog → CHP) (❌ Prohibited)
- Meta-observation: Any system → (Watchdog → CHP) (❌ Prohibited)

**Rationale**:
- Recursive oversight creates infinite regress
- Self-observation is philosophically unsound
- Observation loops fragment accountability
- Human Authority provides external oversight of Watchdog (not Watchdog itself)

**Enforcement**:
- Watchdog does not observe its own observation processes
- CHP has no access to Watchdog internal state
- Human Authority reviews Watchdog effectiveness (external oversight)
- Hard stop for recursive observation attempts

---

### 3.4 Non-Self-Inspection Guarantee

**Principle**: CHP must not self-inspect through Watchdog observation.

**Requirements**:
- CHP does not receive Watchdog observations about CHP
- CHP does not use Watchdog findings for self-improvement
- CHP does not request Watchdog observations
- CHP does not adjust operations based on Watchdog escalations

**Prohibited Self-Inspection Patterns**:
- ❌ CHP reads Watchdog logs about CHP (self-observation via proxy)
- ❌ CHP requests Watchdog assessment of CHP operations
- ❌ CHP modifies operations based on Watchdog escalations about CHP
- ❌ CHP uses Watchdog as "external validation" of CHP decisions

**Boundaries**:
- Watchdog findings about CHP go to Human Authority (not back to CHP)
- CHP improvements come from governance decisions (not Watchdog findings)
- CHP does not consume Watchdog observations as input
- No feedback loop: Watchdog → CHP → [self-adjustment]

**Rationale**:
- Self-inspection via proxy violates non-self-governance principle
- CHP improvement requires governance decision (Human Authority)
- Watchdog observations inform Human decisions, not CHP operations
- Self-inspection creates authority leakage

**Enforcement**:
- CHP has no read access to Watchdog observation logs about CHP
- Watchdog escalations about CHP route to Human Authority only
- Human Authority decides CHP improvements (explicit governance process)
- Hard stop for self-inspection attempts

---

## 4. What the Watchdog Observes (CHP Scope)

### 4.1 CHP Invocations

**Watchdog Observes**:
- **Invocation Frequency**: How often CHP hygiene cycles are triggered
- **Invocation Context**: Scheduled vs. manual vs. emergency invocations
- **Invocation Authorization**: Whether invocations follow authorized patterns
- **Invocation Scope**: What memory categories and operations are invoked

**Observation Indicators**:
- CHP invoked more frequently than daily schedule (potential over-invocation)
- CHP invoked outside authorized contexts (unauthorized trigger)
- CHP invoked without proper authorization (self-invocation violation)
- CHP scope expansion beyond authorized memory categories

**Detection Purpose**:
- Ensure CHP operates within authorized invocation patterns
- Detect unauthorized or excessive CHP invocations
- Validate invocation authorization follows governance

**Escalation Trigger**:
- Soft stop: CHP invoked more frequently than expected (pattern review)
- Hard stop: CHP self-invokes beyond scheduled cycles (authority violation)

---

### 4.2 Capability Selection

**Watchdog Observes**:
- **Capability Types Used**: Which cognitive capabilities CHP invokes during hygiene operations
- **Capability Invocation Patterns**: Frequency and context of capability usage
- **Capability Authorization**: Whether capabilities are invoked per governance rules
- **Capability Scope**: Whether capabilities are used within CHP scope

**Observation Indicators**:
- CHP invokes capabilities outside authorized scope (e.g., code generation capabilities)
- CHP invokes capabilities without proper authorization
- CHP invokes capabilities for purposes unrelated to cognitive hygiene
- CHP capability selection patterns suggest scope drift

**Detection Purpose**:
- Ensure CHP uses capabilities within hygiene scope
- Detect capability misuse or scope expansion
- Validate capability invocation follows governance

**Escalation Trigger**:
- Soft stop: CHP capability selection pattern deviates from expected (review needed)
- Hard stop: CHP invokes prohibited capabilities (authority violation)

**Note**: Capability selection observation is governance-focused, not technical. Watchdog observes whether CHP follows governance rules for capability use, not technical details of capability implementation.

---

### 4.3 Escalation Frequency

**Watchdog Observes**:
- **Escalation Volume**: How many escalations CHP generates (to Foreman, Watchdog, Human)
- **Escalation Targets**: Who receives CHP escalations
- **Escalation Content**: What types of findings CHP escalates
- **Escalation Patterns**: Trends in CHP escalation behavior

**Observation Indicators**:
- CHP escalation volume significantly increases or decreases (pattern change)
- CHP escalates to bypass designated authority (backdoor escalation)
- CHP escalation content suggests scope drift or authority expansion
- CHP escalation patterns suggest self-authorization attempts

**Detection Purpose**:
- Ensure CHP escalation patterns align with governance
- Detect escalation bypass patterns
- Validate escalation content follows authorized CHP scope
- Identify escalation effectiveness or ineffectiveness trends

**Escalation Trigger**:
- Soft stop: CHP escalation patterns deviate significantly (pattern review)
- Hard stop: CHP escalates to bypass authority hierarchy (authority violation)

---

### 4.4 Drift Signals

**Watchdog Observes**:
- **Cognitive Drift Detection**: CHP findings about cognitive drift
- **Drift Normalization Actions**: What CHP does to normalize detected drift
- **Drift Trends**: Patterns in cognitive drift over time
- **Drift Source Identification**: What CHP identifies as drift sources

**Observation Indicators**:
- Cognitive drift detection frequency increases significantly (stability concern)
- Drift normalization actions expand beyond ephemeral memory (scope violation)
- Drift trends suggest systemic issues requiring governance intervention
- Drift source identification reveals architectural or governance gaps

**Detection Purpose**:
- Monitor cognitive stability trends (informational)
- Detect CHP scope violations during drift normalization
- Validate drift handling follows governance boundaries
- Identify systemic issues requiring governance escalation

**Escalation Trigger**:
- Alert-only: Cognitive drift trends (informational to Human Authority)
- Soft stop: Drift normalization expands beyond ephemeral memory (scope review)
- Hard stop: Drift normalization modifies canonical memory (memory violation)

**Note**: Watchdog observes CHP's detection and handling of cognitive drift. Watchdog does NOT detect cognitive drift directly (CHP does). Watchdog does NOT detect vision drift (Watchdog does independently per VISION_ALIGNMENT_AND_DRIFT_MODEL.md).

---

### 4.5 Memory Interaction Patterns

**Watchdog Observes**:
- **Memory Read Operations**: Which memory categories CHP reads
- **Memory Proposal Submissions**: What memory proposals CHP submits
- **Memory Hygiene Operations**: What ephemeral memory CHP cleans
- **Memory Write Attempts**: Any attempts to write canonical memory (violations)

**Observation Indicators**:
- CHP reads memory outside authorized categories (access violation)
- CHP memory proposals lack required content or approvals
- CHP hygiene operations target canonical memory (scope violation)
- CHP attempts to write canonical memory (hard stop violation)

**Detection Purpose**:
- Ensure CHP memory interactions follow COGNITIVE_HYGIENE_MEMORY_INTEGRATION_MODEL.md
- Detect memory write violations
- Validate memory proposal workflow compliance
- Identify memory integrity threats

**Escalation Trigger**:
- Soft stop: CHP memory read patterns deviate (review access)
- Hard stop: CHP writes canonical memory (S1 corruption - immediate halt)

---

### 4.6 Governance Compliance Patterns

**Watchdog Observes**:
- **Authority Boundaries**: Whether CHP operates within defined authority
- **Decision Rights**: Whether CHP decisions follow authorized scope
- **Escalation Boundaries**: Whether CHP escalations follow governance paths
- **Self-Governance Attempts**: Any attempts to modify CHP authority

**Observation Indicators**:
- CHP makes decisions outside authorized scope (authority expansion)
- CHP escalates to bypass designated authorities (authority circumvention)
- CHP attempts to modify its own authority or scope (self-governance)
- CHP patterns suggest implicit authority leakage

**Detection Purpose**:
- Ensure CHP operates within COGNITIVE_HYGIENE_AUTHORITY_MODEL.md constraints
- Detect authority violations
- Validate escalation boundary compliance
- Identify self-governance attempts

**Escalation Trigger**:
- Soft stop: Authority boundary ambiguity (clarification needed)
- Hard stop: Self-governance attempt or authority circumvention (catastrophic violation)

---

## 5. What the Watchdog Must Not Observe (Prohibited Scope)

### 5.1 Internal Reasoning Processes

**Prohibition**: Watchdog MUST NOT observe CHP's internal reasoning processes.

**Prohibited Observations**:
- ❌ CHP's reasoning chains or thought processes
- ❌ CHP's decision-making logic or heuristics
- ❌ CHP's internal cognitive state or model activations
- ❌ CHP's pattern recognition algorithms or weights

**Rationale**:
- Internal reasoning is implementation detail, not governance concern
- Reasoning observation creates recursive meta-cognition
- Governance observes outcomes, not cognitive processes
- Implementation independence must be preserved

**Boundary**:
- Watchdog observes CHP **outputs** (actions, escalations, proposals)
- Watchdog does NOT observe CHP **reasoning** (how CHP arrives at outputs)

**Enforcement**:
- Watchdog observation limited to CHP artifacts and outputs
- Watchdog has no access to CHP model internals
- Governance defines required outputs; implementation is free

---

### 5.2 Raw Prompts and Model Inputs

**Prohibition**: Watchdog MUST NOT observe CHP's raw prompts, prompt engineering, or model inputs.

**Prohibited Observations**:
- ❌ Prompts sent to CHP's underlying cognitive models
- ❌ Prompt templates or prompt engineering strategies
- ❌ Model input formatting or tokenization
- ❌ Capability invocation parameters or configs

**Rationale**:
- Prompts are implementation details
- Prompt observation is technical, not governance-level
- Model input observation creates technical coupling
- Governance observes behavior, not implementation

**Boundary**:
- Watchdog observes **what capabilities CHP invokes** (governance concern)
- Watchdog does NOT observe **how CHP invokes them** (implementation detail)

**Enforcement**:
- Watchdog observation interface provides governance-level visibility only
- Technical implementation details not exposed to Watchdog
- Separation of governance observation from technical monitoring

---

### 5.3 Sensitive Model Internals

**Prohibition**: Watchdog MUST NOT observe sensitive model internals, proprietary algorithms, or vendor-specific details.

**Prohibited Observations**:
- ❌ Model weights, parameters, or training data
- ❌ Proprietary algorithms or vendor-specific logic
- ❌ Model performance metrics or technical benchmarks
- ❌ Vendor API keys, credentials, or technical integrations

**Rationale**:
- Model internals are proprietary and security-sensitive
- Model observation creates vendor lock-in
- Governance must be model-agnostic
- Security and privacy require internal protection

**Boundary**:
- Watchdog observes **governance compliance** (behavior, outputs, authority)
- Watchdog does NOT observe **technical implementation** (models, algorithms, internals)

**Enforcement**:
- Watchdog has no access to model internals or vendor systems
- Governance observation is abstract, not technical
- Model changes do not affect Watchdog observation

---

### 5.4 Ephemeral Memory Content

**Prohibition**: Watchdog MUST NOT observe the content of ephemeral memory being cleaned.

**Prohibited Observations**:
- ❌ Content of session caches CHP cleans
- ❌ Content of working memory CHP normalizes
- ❌ Content of embodiment-specific memory CHP resets
- ❌ Specific patterns CHP removes during hygiene

**Rationale**:
- Ephemeral memory content is transient and not governance-relevant
- Content observation creates privacy and security risks
- Governance observes hygiene **operations**, not **content**
- Content observation is unnecessary for governance compliance

**Boundary**:
- Watchdog observes **that CHP performs hygiene on ephemeral memory** (operation)
- Watchdog does NOT observe **what content CHP cleans** (content)

**Enforcement**:
- Watchdog observation limited to operation metadata (category, scope, outcome)
- Content visibility restricted to authorized roles only (not Watchdog)
- Privacy and security preserved through content abstraction

**Exception**: If ephemeral memory content reveals governance violations (e.g., secrets, prohibited data), Watchdog escalates the presence of violation, not the content itself.

---

### 5.5 Human-Directed CHP Operations

**Prohibition**: Watchdog MUST NOT interfere with or observe the content of Human-directed CHP operations.

**Prohibited Observations**:
- ❌ Content of manual hygiene cycles directed by Human Authority
- ❌ Specific instructions Human provides to CHP
- ❌ Strategic decisions Human makes regarding CHP
- ❌ Human-CHP private interactions

**Rationale**:
- Human Authority is supreme and requires no Watchdog oversight
- Human-CHP interactions are strategic, not governance-compliance concerns
- Watchdog observes governance compliance, not Human decisions
- Human Authority may direct CHP outside normal patterns (authorized)

**Boundary**:
- Watchdog observes **routine CHP operations** (scheduled, emergency)
- Watchdog does NOT observe **Human-directed CHP operations** (strategic)

**Enforcement**:
- Human-directed operations flagged as "human-authorized" (exempt from routine observation)
- Watchdog respects Human Authority supremacy
- Human Authority decides whether to share Human-CHP interactions

**Exception**: Watchdog may observe outcomes of Human-directed operations if they affect governance compliance (e.g., if Human authorizes CHP to modify canonical memory, Watchdog observes the write operation per MEMORY_INTEGRITY_AND_CORRUPTION_MODEL.md).

---

## 6. Escalation Rules

### 6.1 When Watchdog Escalates CHP Behavior

**Escalation Triggers** (from WATCHDOG_AUTHORITY_AND_SCOPE.md applied to CHP):

#### 6.1.1 Soft Stop Conditions (Escalate but Do Not Block)

**Watchdog escalates to Human Authority with advisory report**:

1. **CHP Invocation Pattern Deviations**
   - CHP invoked more frequently than daily schedule (potential over-invocation)
   - CHP invocation context outside expected patterns
   - CHP escalation volume significantly changes (trend analysis)

2. **CHP Scope Ambiguity**
   - CHP capability selection patterns suggest scope drift
   - CHP memory read patterns expand beyond expected categories
   - CHP authority boundaries appear ambiguous

3. **CHP Effectiveness Concerns**
   - Cognitive drift detection frequency increases significantly
   - Drift normalization effectiveness declining
   - CHP memory proposals consistently rejected (quality concern)

4. **CHP Governance Alignment Drift**
   - CHP operations deviate from governance best practices (minor)
   - CHP escalation patterns suggest misunderstanding of authority
   - CHP proposal content quality declining

**Process**:
- Watchdog generates detailed report with observations, evidence, and recommendations
- Escalation to Human Authority (Johan Ras) via dashboard or notification
- Human Authority reviews and decides (approve continuation, request changes, escalate to governance amendment)
- CHP operations continue unless Human Authority directs otherwise

**No Blocking**: Soft stop conditions do NOT halt CHP operations. Watchdog provides visibility; Human decides action.

---

#### 6.1.2 Hard Stop Conditions (Immediate Halt and Escalate)

**Watchdog immediately halts CHP operations and escalates to Human Authority**:

1. **Memory Integrity Violations**
   - CHP writes to canonical memory (S1 corruption - hard stop)
   - CHP deletes accountability evidence or audit trails
   - CHP modifies governance canon or learning records
   - CHP memory operations create silent mutations

2. **Authority Violations**
   - CHP self-governance attempts (modifying own authority or scope)
   - CHP authority expansion without governance approval
   - CHP escalates to bypass designated authority hierarchy
   - CHP invokes prohibited capabilities

3. **Self-Inspection Attempts**
   - CHP attempts to observe Watchdog observations about CHP
   - CHP attempts to modify operations based on Watchdog findings
   - CHP creates recursive observation loops
   - CHP uses Watchdog as proxy for self-validation

4. **Governance Canon Violations**
   - CHP operations contradict COGNITIVE_HYGIENE_AUTHORITY_MODEL.md
   - CHP memory interactions violate COGNITIVE_HYGIENE_MEMORY_INTEGRATION_MODEL.md
   - CHP operations weaken governance enforcement
   - CHP attempts to modify governance rules

**Process**:
1. Watchdog immediately halts affected CHP operation
2. Watchdog generates emergency report with violation details, evidence, and recommended corrective action
3. Immediate escalation to Human Authority with highest priority
4. CHP operations remain halted until Human Authority authorizes resumption
5. Post-incident review required

**Blocking**: Hard stop conditions HALT CHP operations. Human Authority required to resolve and authorize resumption.

---

#### 6.1.3 Alert-Only Conditions (Informational, No Action)

**Watchdog logs observations for visibility but does NOT escalate or block**:

1. **Cognitive Drift Trends** (Informational)
   - Cognitive drift detection frequency trends over time
   - Drift normalization effectiveness trends
   - Embodiment-specific drift patterns

2. **CHP Effectiveness Metrics** (Informational)
   - CHP hygiene cycle completion rates
   - CHP memory proposal approval rates
   - CHP escalation resolution rates

3. **CHP Operational Patterns** (Informational)
   - CHP invocation frequency within expected range
   - CHP capability selection within authorized scope
   - CHP memory read patterns within authorized categories

**Process**:
- Watchdog logs observations in dashboard
- Observations available for Human Authority review
- No escalation or blocking
- Informational only

**No Action**: Alert-only conditions provide visibility but require no Human decision.

---

### 6.2 Cognitive Drift vs. Governance Violation (Critical Distinction)

**Problem**: Confusion between cognitive drift (CHP scope) and governance violation (Watchdog scope) risks misapplied escalations.

**Clear Distinction**:

#### 6.2.1 Cognitive Drift (CHP Detects and Handles)

**Definition**: Cognitive drift is divergence from expected cognitive baselines affecting reasoning, memory health, or behavioral stability.

**Characteristics**:
- Ephemeral and session-specific
- Reversible through CHP hygiene operations
- Affects cognitive performance, not governance compliance
- Observed by CHP, handled by CHP (within authorized scope)

**Examples**:
- Reasoning instability in embodiment sessions
- Working memory overload or noise accumulation
- Embodiment-specific pattern amplification
- Cross-tenant knowledge residues

**Watchdog Role**:
- ✅ Watchdog observes **that CHP detects and handles cognitive drift** (governance compliance)
- ✅ Watchdog observes **whether CHP drift handling follows governance boundaries** (e.g., ephemeral memory only)
- ❌ Watchdog does NOT detect cognitive drift itself (CHP does)
- ❌ Watchdog does NOT evaluate CHP's cognitive drift detection accuracy (effectiveness is CHP scope)

**Escalation**:
- Alert-only: Cognitive drift trends (informational to Human Authority)
- Soft stop: CHP drift handling expands beyond authorized scope (pattern review)
- Hard stop: CHP drift normalization violates governance boundaries (e.g., modifies canonical memory)

---

#### 6.2.2 Governance Violation (Watchdog Detects and Escalates)

**Definition**: Governance violation is CHP behavior that contradicts governance canon, authority boundaries, or memory integrity rules.

**Characteristics**:
- Violates governance rules, not cognitive baselines
- Requires Human Authority decision to resolve
- Affects governance compliance, not cognitive performance
- Detected by Watchdog, escalated to Human

**Examples**:
- CHP writes to canonical memory (write prohibition violation)
- CHP self-governance attempt (authority expansion)
- CHP escalates to bypass authority hierarchy (escalation boundary violation)
- CHP invokes prohibited capabilities (scope violation)

**Watchdog Role**:
- ✅ Watchdog detects governance violations by CHP (observation authority)
- ✅ Watchdog escalates governance violations to Human Authority (escalation authority)
- ✅ Watchdog issues hard stops for catastrophic violations (hard stop authority)
- ❌ Watchdog does NOT correct governance violations (Human Authority decides)

**Escalation**:
- Soft stop: Minor governance alignment drift (advisory review)
- Hard stop: Catastrophic governance violation (immediate halt and escalate)

---

#### 6.2.3 Vision Drift (Watchdog Detects Independently)

**Definition**: Vision drift is philosophical misalignment with Maturion doctrine (Build-to-Green, QA-as-Proof, One-Time Build, etc.).

**Characteristics**:
- Philosophical, not operational
- Informational signal, not blocking condition
- Detected by Watchdog per VISION_ALIGNMENT_AND_DRIFT_MODEL.md
- Escalated for visibility, not enforcement

**Examples** (Applied to CHP):
- CHP operations favor speed over correctness
- CHP hygiene operations weaken governance enforcement patterns
- CHP escalation patterns suggest "fix later" mentality
- CHP proposals lack philosophical alignment with Maturion doctrine

**Watchdog Role**:
- ✅ Watchdog detects vision drift in CHP operations (independent detection)
- ✅ Watchdog escalates vision drift for visibility (informational)
- ❌ Watchdog does NOT block CHP operations due to vision drift (non-enforcement per VISION_ALIGNMENT_AND_DRIFT_MODEL.md)
- ❌ Watchdog does NOT conflate vision drift with governance violations (separate concerns)

**Escalation**:
- Alert-only: All vision drift instances (informational, non-blocking)
- Human review: Significant or repeated vision drift patterns requiring architectural discussion

---

#### 6.2.4 Escalation Decision Matrix

| Condition Type | Detected By | Handled By | Watchdog Action | Blocking |
|---------------|-------------|------------|-----------------|----------|
| **Cognitive Drift** | CHP | CHP (hygiene operations) | Observes CHP handling compliance | ❌ No (alert-only trends) |
| **Governance Violation** | Watchdog | Human Authority | Escalates (soft or hard stop) | ✅ Yes (hard stop) |
| **Vision Drift** | Watchdog | Human Authority | Escalates (informational) | ❌ No (informational only) |

**Critical Principle**: Watchdog observes CHP's handling of cognitive drift for governance compliance, but does NOT treat cognitive drift itself as a governance violation unless CHP violates boundaries during drift handling.

---

### 6.3 Escalation Paths

**All CHP-related escalations follow standard Watchdog escalation paths** (per WATCHDOG_AUTHORITY_AND_SCOPE.md):

#### 6.3.1 Human Decision Escalations

**Scope**: CHP issues requiring human judgment or strategic decision.

**Examples**:
- CHP authority or scope changes
- CHP governance alignment pattern reviews
- CHP effectiveness concerns requiring architectural review
- Soft stop conditions requiring Human decision

**Process**:
1. Watchdog generates detailed report with observations, evidence, and recommendations
2. Escalation to Johan Ras via FM App or notification
3. Human Authority reviews and decides
4. Watchdog logs outcome

**Authority**: Human Authority has final decision

---

#### 6.3.2 Emergency Stop Escalations

**Scope**: Catastrophic CHP violations requiring immediate halt and human intervention.

**Examples**:
- Hard stop conditions (Section 6.1.2)
- Memory integrity violations
- Self-governance attempts
- Governance canon corruption

**Process**:
1. Watchdog immediately halts CHP operation
2. Watchdog generates emergency report with violation details, evidence, remediation steps
3. Immediate escalation to Johan Ras with highest priority
4. CHP remains halted until Human authorizes resumption
5. Post-incident review required

**Authority**: Watchdog has hard stop authority; Human Authority required for resolution

---

#### 6.3.3 Dashboard Visibility (No Escalation)

**Scope**: Informational observations providing visibility without escalation.

**Examples**:
- Alert-only conditions (Section 6.1.3)
- Cognitive drift trends (informational)
- CHP effectiveness metrics (informational)
- Vision drift (informational)

**Process**:
- Watchdog displays in dashboard/reporting
- Logged for pattern analysis
- Available for Human Authority review
- No blocking or escalation

**Authority**: Informational only; Human Authority may review proactively

---

## 7. Non-Interference Rule

### 7.1 Watchdog Must Not Modify CHP

**Principle**: Watchdog observes CHP but does not control, modify, or execute CHP operations.

**Requirements**:
- ❌ Watchdog MUST NOT modify CHP authority or scope
- ❌ Watchdog MUST NOT modify CHP hygiene operations
- ❌ Watchdog MUST NOT execute CHP operations
- ❌ Watchdog MUST NOT configure CHP parameters or thresholds
- ❌ Watchdog MUST NOT approve or authorize CHP operations

**Boundaries**:
- ✅ Watchdog MAY observe CHP operations (read-only)
- ✅ Watchdog MAY escalate CHP violations (informational or hard stop)
- ✅ Watchdog MAY recommend CHP changes (advisory to Human)
- ❌ Watchdog MAY NOT implement CHP changes (Human Authority decides)

**Rationale**:
- Watchdog role is observation and escalation, not execution
- Modification creates operational authority outside governance scope
- CHP operations remain under CHP authority (within governance constraints)
- Human Authority resolves escalations and directs changes

**Enforcement**:
- Watchdog has read-only access to CHP systems (infrastructure-level)
- Watchdog cannot execute CHP operations (no execution API access)
- Watchdog escalations are reports, not commands
- Human Authority implements CHP changes through governance process

---

### 7.2 Watchdog Must Not Suppress Cognition

**Principle**: Watchdog must not suppress, censor, or filter CHP cognition or findings.

**Requirements**:
- ❌ Watchdog MUST NOT suppress CHP escalations (even if Watchdog disagrees)
- ❌ Watchdog MUST NOT filter CHP findings (even if redundant or low-priority)
- ❌ Watchdog MUST NOT prevent CHP from observing cognitive state
- ❌ Watchdog MUST NOT interfere with CHP reasoning or analysis

**Boundaries**:
- ✅ Watchdog MAY observe CHP escalations and findings (oversight)
- ✅ Watchdog MAY escalate if CHP findings reveal governance violations
- ✅ Watchdog MAY recommend alternative CHP approaches (advisory to Human)
- ❌ Watchdog MAY NOT prevent CHP from generating findings

**Rationale**:
- Cognitive suppression is antithetical to Watchdog observation role
- Suppression creates hidden information and accountability gaps
- CHP findings must reach designated authorities (Foreman, Human)
- Watchdog observes transparency; suppression violates transparency

**Enforcement**:
- Watchdog has no authority to block CHP outputs
- CHP escalations route independently of Watchdog observation
- Human Authority receives both CHP and Watchdog findings independently
- Suppression attempts are governance violations (Watchdog hard stop)

**Exception**: Watchdog MAY issue hard stop if CHP finding itself constitutes governance violation (e.g., CHP escalates secrets in clear text). Hard stop prevents harm, not suppression of cognition.

---

### 7.3 Watchdog Must Not Authorize Action

**Principle**: Watchdog does not authorize or approve CHP operations.

**Requirements**:
- ❌ Watchdog MUST NOT authorize CHP hygiene cycles
- ❌ Watchdog MUST NOT approve CHP memory proposals
- ❌ Watchdog MUST NOT authorize CHP escalations
- ❌ Watchdog MUST NOT approve CHP operational changes

**Boundaries**:
- ✅ Human Authority authorizes CHP operations (manual trigger, governance changes)
- ✅ Scheduled system authorizes CHP daily hygiene cycles (pre-authorized by Human)
- ✅ Emergency trigger authorizes CHP interventions (pre-authorized thresholds)
- ❌ Watchdog does NOT authorize CHP (observation role, not authorization role)

**Rationale**:
- Authorization creates operational authority outside Watchdog scope
- Watchdog role is observation and escalation, not approval
- CHP authorization follows governance-defined paths (Human, scheduled, emergency)
- Authorization would compromise Watchdog independence

**Enforcement**:
- Watchdog has no authorization API or approval workflow
- CHP operations do not require Watchdog approval
- Watchdog observations are informational, not approvals
- Human Authority is sole authorization authority for CHP changes

**Exception**: Watchdog hard stop is NOT authorization; it is violation response. Hard stop prevents harm; resumption requires Human authorization.

---

## 8. Audit and Traceability

### 8.1 Watchdog Observation Audit

**Requirement**: All Watchdog observations of CHP must be auditable.

**Audit Trail Content**:
- Timestamp of observation
- Observation type (invocation, capability, escalation, drift, memory, governance)
- Observation findings (what Watchdog observed)
- Observation context (CHP operation observed, scope, evidence)
- Escalation outcome (if applicable: soft stop, hard stop, alert-only, no action)

**Audit Trail Location**: `governance/memory/watchdog-observations/chp-observations/`

**Audit Trail Retention**: Permanent (governance record)

**Audit Trail Accessibility**:
- Human Authority: Full read access
- Governance Administrator: Full read access
- Watchdog: Write access (generate observations)
- CHP: No access (no self-inspection)

---

### 8.2 CHP-Watchdog Interaction Traceability

**Requirement**: Watchdog observations must be traceable to CHP operations.

**Traceability Requirements**:
- Given Watchdog observation, trace back to originating CHP operation
- Given CHP operation, trace forward to Watchdog observations (if any)
- Given escalation, trace back to Watchdog observation and CHP operation
- End-to-end visibility: CHP operation → Watchdog observation → Escalation → Human decision

**Traceability Mechanisms**:
- CHP operation ID links to Watchdog observation ID
- Watchdog observation ID links to escalation ID (if escalated)
- Escalation ID links to Human decision record
- Full chain auditable and queryable

---

### 8.3 Escalation Outcome Tracking

**Requirement**: All Watchdog escalations about CHP must track outcome.

**Outcome Tracking Content**:
- Escalation ID (unique identifier)
- Escalation timestamp
- Escalation type (soft stop, hard stop, alert-only)
- Escalation destination (Human Authority)
- Human decision (approve continuation, direct changes, escalate to governance amendment)
- Human decision timestamp
- Corrective action taken (if any)
- CHP resumption timestamp (if halted)

**Outcome Tracking Location**: `governance/memory/escalations/chp-escalation-outcomes/`

**Outcome Tracking Retention**: Permanent (governance record)

---

### 8.4 Compliance Verification

**Quarterly Compliance Review**:
- Governance Administrator reviews Watchdog-CHP audit trails
- Verify: All Watchdog observations logged
- Verify: All escalations tracked to outcome
- Verify: No recursive observation patterns
- Verify: No self-inspection attempts
- Verify: Non-interference rule compliance

**Metrics**:
- Watchdog observations of CHP per quarter (count by type)
- Soft stop escalations (count and outcomes)
- Hard stop escalations (count and outcomes)
- Alert-only observations (count by category)
- Escalation resolution time (average time from escalation to Human decision)
- Compliance violations detected (target: 0)

**Escalation**:
- If recursive observation detected: Escalate to Human Authority (governance incident)
- If self-inspection detected: Escalate to Human Authority (governance incident)
- If non-interference violations detected: Escalate to Human Authority
- If audit trail gaps detected: Escalate to Governance Administrator

---

## 9. Integration with Existing Governance

### 9.1 WATCHDOG_AUTHORITY_AND_SCOPE.md

**Alignment**:
- This protocol implements Watchdog observation authority for CHP (Section 4)
- Watchdog escalation paths apply to CHP observations (Section 6.3)
- Hard stop authority applies to CHP violations (Section 6.1.2)
- Watchdog independence preserved for CHP observation (Section 3.1)

**Extensions**:
- This protocol specifies CHP-specific observation scope
- This protocol defines CHP-specific escalation triggers
- This protocol clarifies cognitive drift vs. governance violation distinction

---

### 9.2 VISION_ALIGNMENT_AND_DRIFT_MODEL.md

**Alignment**:
- Vision drift detection applies to CHP operations (Section 6.2.3)
- Vision drift is informational, not blocking (Section 6.1.3)
- Vision drift escalated for visibility, not enforcement (Section 6.3.3)
- Vision drift distinguished from governance violations (Section 6.2)

**Extensions**:
- This protocol applies vision drift detection to CHP specifically
- This protocol clarifies vision drift does not block CHP operations

---

### 9.3 COGNITIVE_HYGIENE_AUTHORITY_MODEL.md

**Alignment**:
- CHP is subject to Watchdog observation (Section 10.3)
- CHP must comply with Watchdog hard stops (Section 12.3)
- CHP has no authority over Watchdog (Section 10.3)
- Watchdog observes CHP for governance compliance (Section 10.3)

**Extensions**:
- This protocol specifies exactly what Watchdog observes about CHP
- This protocol defines CHP-specific escalation rules
- This protocol ensures non-self-inspection guarantee

---

### 9.4 COGNITIVE_HYGIENE_MEMORY_INTEGRATION_MODEL.md

**Alignment**:
- Watchdog observes CHP memory interactions (Section 4.5)
- Watchdog hard stops CHP canonical memory writes (Section 6.1.2)
- Watchdog validates CHP memory proposal compliance (Section 4.5)
- Watchdog ensures memory integrity preservation (Section 6.1.2)

**Extensions**:
- This protocol specifies Watchdog observation of CHP memory patterns
- This protocol defines memory violation escalation triggers for CHP

---

## 10. Implementation Boundaries

### 10.1 What This Document Defines

- ✅ What Watchdog observes about CHP (invocations, capability selection, escalation frequency, drift signals, memory patterns, governance compliance)
- ✅ What Watchdog must not observe (internal reasoning, raw prompts, sensitive model internals, ephemeral memory content)
- ✅ Escalation rules for CHP behavior (soft stop, hard stop, alert-only)
- ✅ Distinction between cognitive drift, governance violation, and vision drift
- ✅ Non-interference rule (no modification, no suppression, no authorization)
- ✅ Audit and traceability requirements
- ✅ Integration with existing governance canon

### 10.2 What This Document Does NOT Define

- ❌ Watchdog implementation architecture (how Watchdog is built)
- ❌ Watchdog technical integration (APIs, webhooks, polling)
- ❌ Watchdog observation algorithms (how observations are performed)
- ❌ Watchdog dashboard design or UI presentation
- ❌ CHP implementation details (how CHP performs hygiene)
- ❌ Metrics pipelines or data collection infrastructure
- ❌ Enforcement logic or runtime execution

**Separation**: This is governance definition, not implementation specification.

---

## 11. Non-Negotiable Invariants

The following invariants are **absolute and non-negotiable**:

1. **Watchdog Independence is Preserved**
   - CHP cannot influence, control, or bypass Watchdog observation
   - Watchdog observes CHP independently per governance rules
   - Watchdog authority over CHP is immutable by CHP

2. **No Recursive Oversight**
   - Watchdog observes CHP (first-order observation)
   - No second-order observation (Watchdog observing itself)
   - No reverse observation (CHP observing Watchdog)
   - No meta-observation layers

3. **No Self-Inspection**
   - CHP does not receive Watchdog observations about CHP
   - CHP does not self-improve based on Watchdog findings
   - CHP improvement requires Human Authority decision
   - No feedback loop: Watchdog → CHP → [self-adjustment]

4. **Non-Interference**
   - Watchdog observes but does not modify CHP operations
   - Watchdog does not suppress CHP cognition or findings
   - Watchdog does not authorize or approve CHP operations
   - Watchdog escalates violations; Human resolves

5. **Cognitive Drift ≠ Governance Violation**
   - Cognitive drift is CHP scope (CHP detects and handles)
   - Governance violation is Watchdog scope (Watchdog detects and escalates)
   - Watchdog observes CHP's handling of cognitive drift for governance compliance
   - Watchdog does not detect cognitive drift itself

6. **Vision Drift is Informational**
   - Vision drift in CHP operations is informational, not blocking
   - Watchdog escalates vision drift for visibility
   - Vision drift does not halt CHP operations
   - Human Authority decides response to vision drift

7. **Hard Stop Authority for Violations**
   - Watchdog has hard stop authority for catastrophic CHP violations
   - Memory integrity violations trigger immediate hard stop
   - Self-governance attempts trigger immediate hard stop
   - Human Authority required to resolve and authorize resumption

---

## 12. Success Criteria

This protocol is successful when:
- Watchdog observes CHP effectively without compromising independence
- CHP governance violations are detected and escalated appropriately
- No recursive oversight or self-inspection patterns emerge
- Cognitive drift, governance violation, and vision drift are clearly distinguished
- Non-interference rule is consistently maintained
- All Watchdog observations of CHP are auditable and traceable
- Human Authority has full visibility into CHP operations and Watchdog findings
- CHP operates within governance constraints under Watchdog observation

---

## 13. Precedence and Final Authority

This document has canonical authority over Watchdog observation of CHP.

If any Watchdog implementation or CHP operation conflicts with this document, this document prevails.

This protocol is subordinate to:
1. Johan Ras (human final authority)
2. GOVERNANCE_PURPOSE_AND_SCOPE.md (supreme governance authority)
3. WATCHDOG_AUTHORITY_AND_SCOPE.md (Watchdog authority)

This protocol is superior to:
- All CHP implementations (for observation scope)
- All Watchdog implementations (for CHP-specific observation)
- All dashboard/reporting systems (for CHP observation requirements)

---

**End of WATCHDOG_COGNITIVE_OBSERVATION_PROTOCOL.md**

---

**Document Metadata**:
- Protocol ID: WATCHDOG_CHP_OBSERVATION_V1
- Authority: Canonical Governance Definition
- Required By: G-COG-A3 (Define Watchdog Observation Protocol for Cognitive Hygiene)
- Integrates With: WATCHDOG_AUTHORITY_AND_SCOPE.md, VISION_ALIGNMENT_AND_DRIFT_MODEL.md, COGNITIVE_HYGIENE_AUTHORITY_MODEL.md, COGNITIVE_HYGIENE_MEMORY_INTEGRATION_MODEL.md
- Resolves: Watchdog-CHP observation boundaries, non-recursive oversight, non-self-inspection guarantee
- Enforcement: Watchdog (observation and escalation) + Human Authority (escalation resolution) + Governance Administrator (audit review)
