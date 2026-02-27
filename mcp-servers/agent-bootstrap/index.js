#!/usr/bin/env node
/**
 * agent-bootstrap MCP Server
 *
 * Provides two tools:
 *   - `agent_bootstrap`            — load an agent contract (REQUIRED FIRST CALL)
 *   - `agent_bootstrap_list_agents` — list all valid governed agent IDs
 *
 * ⚠️ CALL `agent_bootstrap` FIRST. Skipping is a GOV-BREACH-AIMC-W5-002 POLC violation.
 *
 * Every governed agent MUST call `agent_bootstrap` as their absolute first action in
 * every session, before any repo file read, issue body read, or other operation.
 * If you cannot determine your agent_id, call `agent_bootstrap_list_agents` first.
 */

"use strict";

const fs = require("fs");
const path = require("path");
const { z } = require("zod");
const { McpServer } = require("@modelcontextprotocol/sdk/server/mcp.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const { REQUIRED_AGENT_IDS } = require("./agent-ids.js");

// Resolve repo root: two levels up from mcp-servers/agent-bootstrap/
const REPO_ROOT = path.resolve(__dirname, "..", "..");

const AGENTS_DIR = path.join(REPO_ROOT, ".github", "agents");

// Dynamically discover all agent contracts at startup — no manual update needed when agents are added
// Safe fallback: if the directory is unreadable, server still starts (tool returns empty valid IDs list)
let AGENT_CONTRACT_PATHS = {};
try {
  AGENT_CONTRACT_PATHS = fs
    .readdirSync(AGENTS_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .reduce((map, filename) => {
      const agentId = filename.replace(/\.md$/, "");
      map[agentId] = `.github/agents/${filename}`;
      return map;
    }, {});
} catch (err) {
  process.stderr.write(
    `agent-bootstrap: WARNING — could not scan ${AGENTS_DIR}: ${err.message}\n`
  );
}

const VALID_AGENT_IDS = Object.keys(AGENT_CONTRACT_PATHS).join(", ");

// Warn at startup if any required agent contracts are missing from the discovered set.
const missingRequired = REQUIRED_AGENT_IDS.filter((id) => !AGENT_CONTRACT_PATHS[id]);
if (missingRequired.length > 0) {
  process.stderr.write(
    `agent-bootstrap: WARNING — required agent contract(s) not found: ${missingRequired.join(", ")}\n`
  );
}

const server = new McpServer({
  name: "agent-bootstrap",
  version: "1.0.0",
});

server.tool(
  "agent_bootstrap",
  "⚠️ CALL THIS FIRST. Skipping is a GOV-BREACH-AIMC-W5-002 POLC violation.\n\n" +
  "Every governed agent MUST call this tool as the absolute first action of every " +
  "session — before reading any repository file, issue body, or performing any other " +
  "operation. Provide your agent_id (from the issue assignee field, issue title, or " +
  "explicit task instruction). The tool returns your full contract file contents, which " +
  "you must read and execute Phase 1 of before proceeding.\n\n" +
  "Pass agent_id=\"list\" to return all valid agent IDs without loading a contract " +
  "(use this when you cannot determine your identity).\n\n" +
  "Valid agent IDs: " + VALID_AGENT_IDS,
  {
    agent_id: z
      .string()
      .describe(
        "Your agent identifier (e.g. 'foreman-v2.agent', 'CodexAdvisor-agent', " +
        "'governance-repo-administrator-v2.agent'). " +
        "Pass 'list' to enumerate all valid IDs."
      ),
  },
  async ({ agent_id }) => {
    if (agent_id === "list") {
      const ids = Object.keys(AGENT_CONTRACT_PATHS);
      return {
        content: [
          {
            type: "text",
            text:
              ids.length > 0
                ? `Valid agent IDs:\n${ids.map((id) => `  - ${id}`).join("\n")}`
                : "No agent contracts found in .github/agents/",
          },
        ],
      };
    }

    const relativePath = AGENT_CONTRACT_PATHS[agent_id];
    if (!relativePath) {
      const ids = Object.keys(AGENT_CONTRACT_PATHS);
      return {
        content: [
          {
            type: "text",
            text:
              `Unknown agent_id: "${agent_id}"\n\n` +
              (ids.length > 0
                ? `Valid agent IDs:\n${ids.map((id) => `  - ${id}`).join("\n")}`
                : "No agent contracts found in .github/agents/"),
          },
        ],
        isError: true,
      };
    }

    const absolutePath = path.join(REPO_ROOT, relativePath);
    let content;
    try {
      content = fs.readFileSync(absolutePath, "utf8");
    } catch (err) {
      return {
        content: [
          {
            type: "text",
            text: `Failed to read contract for "${agent_id}" at ${relativePath}: ${err.message}`,
          },
        ],
        isError: true,
      };
    }

    return {
      content: [
        {
          type: "text",
          text:
            `# Agent Contract: ${agent_id}\n` +
            `# Source: ${relativePath}\n\n` +
            content,
        },
      ],
    };
  }
);

server.tool(
  "agent_bootstrap_list_agents",
  "List all valid governed agent IDs in this repository. " +
  "Use this when you cannot determine your own agent_id before calling agent_bootstrap.",
  {},
  async () => {
    const ids = Object.keys(AGENT_CONTRACT_PATHS);
    return {
      content: [
        {
          type: "text",
          text:
            ids.length > 0
              ? `Valid agent IDs in this repository:\n${ids.map((id) => `  - ${id}`).join("\n")}`
              : "No agent contracts found in .github/agents/",
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  process.stderr.write("agent-bootstrap MCP server running\n");
}

main().catch((err) => {
  process.stderr.write(`agent-bootstrap: FATAL — ${err.message}\n`);
  process.exit(1);
});
