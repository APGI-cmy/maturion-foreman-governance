# Issue #1396 Current-Head Eligibility Evidence

**Governing issue:** #1396
**Pre-brief:** `.agent-admin/assurance/iaa-prebrief-wave1396.md`
**Checklist:** `.agent-admin/waves/wave-1396-current-tasks.md`
**Reviewed head:** `13e87218e2054ed8ed568fbcdda8c58552724652`
**Merge base:** `8b8d8fc9f05c21244bf854f817ed40780cf20545`

This record reports the committed implementation head reviewed before this evidence record was added. It is replacement-specific and does not use closed PR #1395 material.

## Changed Paths

`git diff --name-only 8b8d8fc9f05c21244bf854f817ed40780cf20545...13e87218e2054ed8ed568fbcdda8c58552724652`

```text
.admin/pr.json
.agent-workspace/execution-ceremony-admin-agent/knowledge/FAIL-ONLY-ONCE.md
.agent-workspace/execution-ceremony-admin-agent/knowledge/administrative-evidence-protocol.md
.agent-workspace/execution-ceremony-admin-agent/knowledge/administrative-output-contract.md
.agent-workspace/execution-ceremony-admin-agent/knowledge/index.md
.github/agents/execution-ceremony-admin-agent.md
governance/quality/agent-integrity/INTEGRITY_INDEX.md
governance/quality/agent-integrity/execution-ceremony-admin-agent.md
mcp-servers/agent-bootstrap/agent-ids.js
mcp-servers/agent-bootstrap/test-bootstrap.js
```

## Manifest Scope

`.admin/pr.json` declares these same ten fixed capability paths:

```text
.github/agents/execution-ceremony-admin-agent.md
.agent-workspace/execution-ceremony-admin-agent/knowledge/index.md
.agent-workspace/execution-ceremony-admin-agent/knowledge/FAIL-ONLY-ONCE.md
.agent-workspace/execution-ceremony-admin-agent/knowledge/administrative-evidence-protocol.md
.agent-workspace/execution-ceremony-admin-agent/knowledge/administrative-output-contract.md
mcp-servers/agent-bootstrap/agent-ids.js
mcp-servers/agent-bootstrap/test-bootstrap.js
governance/quality/agent-integrity/execution-ceremony-admin-agent.md
governance/quality/agent-integrity/INTEGRITY_INDEX.md
.admin/pr.json
```

**Equality result:** PASS after path-set normalization; missing paths: none; extra paths: none.

## Contract and Bootstrap Evidence

| Check | Command or source | Result |
|---|---|---|
| Contract character count | `Get-Content -Raw .github/agents/execution-ceremony-admin-agent.md` | `6164` |
| Contract SHA256 | `Get-FileHash -Algorithm SHA256 .github/agents/execution-ceremony-admin-agent.md` | `d6614f8adadc8ab20bce88d719d48e92b0982d16d322815ad6341f7797445383` |
| Integrity copy SHA256 | `Get-FileHash -Algorithm SHA256 governance/quality/agent-integrity/execution-ceremony-admin-agent.md` | `d6614f8adadc8ab20bce88d719d48e92b0982d16d322815ad6341f7797445383` |
| Contract/copy equality | SHA256 comparison | PASS |
| Tier 2 index SHA256 | `Get-FileHash -Algorithm SHA256 .agent-workspace/execution-ceremony-admin-agent/knowledge/index.md` | `ec780cf5ae427ca0e0b6f827f914dc7407cd412266599ef8bb93bd0b9af96b3f` |
| Bootstrap regression | `node mcp-servers/agent-bootstrap/test-bootstrap.js` | Exit `0` |

## Exclusion Checks

Each result below is a zero-match result against the reviewed changed-path list.

| Excluded category | Result |
|---|---|
| Reusable Foreman appointment path or template | 0 |
| Runtime or controller change | 0 |
| Consumer change | 0 |
| Workflow change | 0 |
| Canon change | 0 |
| ISMS change | 0 |
| Product change | 0 |
| MMM change | 0 |
| #1389 work | 0 |
| Prohibited ECAP availability/readiness/assurance/activation claim signature in foundation artifacts | 0 |

**IAA state:** PENDING. This evidence is sufficient for a later independent review only and makes no substantive conclusion.
