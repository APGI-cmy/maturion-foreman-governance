# Agent Canonical Context Synchronisation Protocol

## 1. Purpose
Ensure all agents operate with current canonical governance context through governed, auditable synchronisation — without learning, inference, or autonomy.

## 2. Core Principle
Agent correctness depends on canonical context currency, not adaptive learning.

## 3. Definitions
- Agent Canonical Context: The set of governance principles, authority boundaries, prohibitions, and operational doctrines encoded in an agent’s .agent file.
- Synchronisation: A controlled update of agent context files to reflect current canon.

## 4. Trigger Events (Ripple Sources)

### 4.1 Mandatory Triggers
Synchronisation evaluation MUST be triggered when:
- Any canonical governance document is added or modified
- Authority, memory, watchdog, commissioning, or activation models change
- Foreman or agent role definitions are clarified or updated

### 4.2 Conditional Triggers
Synchronisation SHOULD be evaluated when:
- An app enters a new activation state
- A build execution readiness gate is evaluated
- A new agent is introduced into a repository

## 5. Authority Model

### 5.1 Foreman (FM)
- Responsible for synchronising all agent files
- MUST NOT update its own .agent file

### 5.2 Admin / Repository Liaison Agent
- May update the FM .agent file
- Acts only when triggered by governance ripple
- Performs non-creative, structural updates only

### 5.3 Other Agents
- MUST NOT update their own agent files
- MUST NOT self-assess canonical context currency

## 6. Prohibited Behaviors
Agents MUST NOT:
- Learn or infer governance changes
- Modify their own governance understanding
- Adapt behavior outside updated canonical context
- Persist governance knowledge via memory mechanisms

## 7. Synchronisation Workflow
1. Trigger event detected
2. FM evaluates affected agent scope
3. Permitted agent files updated
4. Audit record created
5. Execution resumes or readiness reevaluated

## 8. Audit Requirements
Every synchronisation event MUST record:
- Trigger source
- Canon version
- Agent files updated
- Authority executing update
- Timestamp and outcome

## 9. Relationship to Other Canon
This protocol integrates with:
- GOVERNANCE_LOADING_PROTOCOL
- MEMORY_WRITE_POLICY
- WATCHDOG_AUTHORITY_AND_SCOPE
- COMMISSIONING_EVIDENCE_MODEL

## 10. Non-Goals
This protocol does NOT:
- Grant agents learning capability
- Authorize autonomous adaptation
- Replace human authority
