# agent-bootstrap MCP Server

Enforces constitutional preflight for all governed agents in this repository.

## What it does

Every governed agent must call `agent_bootstrap` as the absolute first action of every session — before reading any repository file, issue body, or performing any other operation. Skipping this call is a GOV-BREACH-AIMC-W5-002 POLC violation.

## Tools provided

- `agent_bootstrap` — Load an agent contract by agent ID (REQUIRED FIRST CALL)
- `agent_bootstrap_list_agents` — List all valid governed agent IDs

## Setup

Run once before first use (from repo root):

```bash
cd mcp-servers/agent-bootstrap
npm install
```

## Governed agents in this repository

- CodexAdvisor-agent
- foreman-v2.agent
- governance-repo-administrator-v2.agent
- independent-assurance-agent

## MCP configuration

Configured in `.mcp.json` at the repo root. The server is started automatically by MCP-compatible clients (e.g. Claude in Copilot agent sessions).
