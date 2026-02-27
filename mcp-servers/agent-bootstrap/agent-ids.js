"use strict";

/**
 * Required governed agent IDs — single source of truth.
 *
 * Imported by both index.js (startup validation warning) and
 * test-bootstrap.js (test assertion).  Update this list here when
 * a new agent contract becomes mandatory.
 */
const REQUIRED_AGENT_IDS = [
  "CodexAdvisor-agent",
  "foreman-v2.agent",
  "governance-repo-administrator-v2.agent",
  "independent-assurance-agent",
];

module.exports = { REQUIRED_AGENT_IDS };
