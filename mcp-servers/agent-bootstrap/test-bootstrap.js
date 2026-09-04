#!/usr/bin/env node
/**
 * agent-bootstrap validation script.
 *
 * Validates that the MCP server can start and that basic tool invocation
 * behavior is correct. Exits 0 on success, 1 on any failure.
 *
 * Usage:
 *   node mcp-servers/agent-bootstrap/test-bootstrap.js
 *   npm test  (from inside mcp-servers/agent-bootstrap/)
 */

"use strict";

const fs   = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const {
  CANONICAL_AGENT_ID_ALIASES,
  REQUIRED_AGENT_IDS,
  registerCanonicalAgentIds,
} = require("./agent-ids.js");

let failures = 0;

function ok(label)      { console.log(`  PASS: ${label}`); }
function fail(label, e) {
  console.error(`  FAIL: ${label}${e ? ` — ${e.message || String(e)}` : ""}`);
  failures++;
}

async function main() {
  console.log("agent-bootstrap validation\n");

  // ── 1. npm dependencies resolvable ─────────────────────────────────────────
  console.log("1. Dependency resolution");
  for (const dep of [
    "@modelcontextprotocol/sdk/server/mcp.js",
    "@modelcontextprotocol/sdk/server/stdio.js",
    "zod",
  ]) {
    try   { require(dep); ok(`${dep} resolvable`); }
    catch (e) { fail(`${dep} resolvable`, e); }
  }

  // ── 2. index.js passes Node syntax check ───────────────────────────────────
  console.log("\n2. Syntax check");
  try {
    execSync("node --check index.js", { cwd: __dirname, stdio: "pipe", timeout: 5000 });
    ok("index.js passes --check");
  } catch (e) {
    fail("index.js passes --check", new Error(e.stderr ? e.stderr.toString().trim() : e.message));
  }

  // ── 3. Agent contracts directory has at least one .md file ─────────────────
  console.log("\n3. Agent contracts directory");
  const REPO_ROOT  = path.resolve(__dirname, "..", "..");
  const AGENTS_DIR = path.join(REPO_ROOT, ".github", "agents");
  let agentIds = [];

  try {
    agentIds = fs
      .readdirSync(AGENTS_DIR)
      .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
      .map((f) => f.replace(/\.md$/, ""));
    if (agentIds.length === 0) throw new Error("no .md agent files found");
    ok(`${agentIds.length} contract file(s) found`);
  } catch (e) {
    fail("agent contracts directory readable", e);
  }

  // ── 4. Tool logic: contract lookup ─────────────────────────────────────────
  console.log("\n4. Tool invocation logic");

  const discoveredContractPaths = agentIds.reduce((map, id) => {
    map[id] = `.github/agents/${id}.md`;
    return map;
  }, {});
  const AGENT_CONTRACT_PATHS = registerCanonicalAgentIds(discoveredContractPaths);

  // 4a. Valid agent_id returns readable contract
  if (agentIds.length > 0) {
    const sampleId = agentIds[0];
    try {
      const contractPath = path.join(REPO_ROOT, AGENT_CONTRACT_PATHS[sampleId]);
      const content = fs.readFileSync(contractPath, "utf8");
      if (!content || content.length < 10) throw new Error("contract file is empty or too short");
      ok(`contract readable for "${sampleId}" (${content.length} bytes)`);
    } catch (e) {
      fail(`contract readable for "${sampleId}"`, e);
    }
  }

  // 4b. Unknown agent_id returns error indicator
  try {
    const unknownId = "__nonexistent_agent__";
    const isUnknown = !AGENT_CONTRACT_PATHS[unknownId];
    if (!isUnknown) throw new Error("unexpected: unknown agent found in map");
    ok(`unknown agent_id correctly not found`);
  } catch (e) {
    fail("unknown agent_id handling", e);
  }

  // 4c. agent_id="list" path — all discovered IDs are non-empty strings
  try {
    const ids = Object.keys(AGENT_CONTRACT_PATHS);
    if (ids.some((id) => typeof id !== "string" || id.length === 0)) {
      throw new Error("one or more agent IDs are empty or non-string");
    }
    ok(`agent_id="list" returns ${ids.length} valid IDs`);
  } catch (e) {
    fail(`agent_id="list" path`, e);
  }

  // 4d. Canonical administrator identity resolves the existing filename contract.
  try {
    const canonicalId = "governance-repo-administrator-v2";
    const filenameId = CANONICAL_AGENT_ID_ALIASES[canonicalId];
    const expectedPath = `.github/agents/${filenameId}.md`;
    if (
      AGENT_CONTRACT_PATHS[canonicalId] !== expectedPath ||
      AGENT_CONTRACT_PATHS[filenameId] !== expectedPath
    ) {
      throw new Error(
        `expected both administrator identities to resolve ${expectedPath}`
      );
    }
    const content = fs.readFileSync(path.join(REPO_ROOT, expectedPath), "utf8");
    if (!content.includes("id: governance-repo-administrator-v2")) {
      throw new Error(`resolved contract has an unexpected YAML identity: ${expectedPath}`);
    }
    ok(`administrator aliases resolve ${expectedPath}`);
  } catch (e) {
    fail("canonical governance administrator identity resolution", e);
  }

  // 4e. ECAP's canonical identity resolves its exact contract.
  try {
    const canonicalId = "execution-ceremony-admin-agent";
    const expectedPath = `.github/agents/${canonicalId}.md`;
    if (AGENT_CONTRACT_PATHS[canonicalId] !== expectedPath) {
      throw new Error(`expected ${canonicalId} to resolve ${expectedPath}`);
    }
    const content = fs.readFileSync(path.join(REPO_ROOT, expectedPath), "utf8");
    if (!content.includes(`id: ${canonicalId}`)) {
      throw new Error(`resolved contract has an unexpected YAML identity: ${expectedPath}`);
    }
    ok(`ECAP identity resolves ${expectedPath}`);
  } catch (e) {
    fail("ECAP canonical identity resolution", e);
  }

  // ── 5. Required agent IDs present ──────────────────────────────────────────
  console.log("\n5. Required agent IDs");
  const missing = REQUIRED_AGENT_IDS.filter((id) => !AGENT_CONTRACT_PATHS[id]);
  if (missing.length === 0) {
    ok(`all ${REQUIRED_AGENT_IDS.length} required agent(s) present`);
  } else {
    fail(
      `required agents present`,
      new Error(`Missing: ${missing.join(", ")}`)
    );
  }

  // ── Final result ────────────────────────────────────────────────────────────
  console.log(`\n${"─".repeat(50)}`);
  if (failures === 0) {
    console.log("✅  All checks passed");
    process.exit(0);
  } else {
    console.error(`❌  ${failures} check(s) failed`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(`FATAL: ${err.message}`);
  process.exit(1);
});
