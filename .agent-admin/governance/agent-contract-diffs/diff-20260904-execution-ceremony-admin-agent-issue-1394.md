# Agent Contract Diff Record - Issue #1394

## Authority

CS2 authorized Issue #1394, "CodexAdvisor: establish canonical ECAP bootstrap
capability for recovery assurance."

## Changed Contract and Integrity Paths

- `.github/agents/execution-ceremony-admin-agent.md`
- `governance/quality/agent-integrity/execution-ceremony-admin-agent.md`
- `governance/quality/agent-integrity/INTEGRITY_INDEX.md`

## Authorized Semantic Delta

Establishes the canonical `execution-ceremony-admin-agent` contract and its
Tier 2 operating bundle. ECAP may compile and validate administrative facts
only: required fields, scope freshness, PR-administration freshness, evidence
path resolution, and commit-state truth. Its terminal outputs are limited to
`ADMIN_VALIDATED`, `ADMIN_BLOCKED`, and `ADMIN_READY_FOR_FOREMAN_REVIEW`; they
do not make a substantive judgment.

The bootstrap identity list and regression test add static canonical ECAP
identity resolution only. They do not register a runtime or controller, add a
trigger, or alter a workflow.

## Preserved Boundaries

ECAP cannot decide substantive build, handover, merge, activation, or
readiness. It cannot substitute for Foreman Quality Professor review, invoke
IAA, issue or imitate an IAA result, waive a gate, or change product, MMM,
canon, workflow, agent-contract, consumer, deployment, or live-environment
content while acting as ECAP. Historical ECAP appointments, canon, checklists,
templates, and ISMS material remain unchanged. CS2 remains the sole merge
authority.

## Integrity

- Contract version: `1.0.0`
- SHA-256: `b4c770155684b3a3b0789fe796e6cfe395cc259ba30960714c90e94824a048f9`
- Reference copy: byte-identical to the canonical contract
- Character count: `10,453 / 30,000`
