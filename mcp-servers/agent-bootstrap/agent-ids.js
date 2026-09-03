"use strict";

/**
 * Required governed agent IDs and canonical aliases — single source of truth.
 *
 * Imported by both index.js (startup validation warning) and
 * test-bootstrap.js (test assertion). Add a canonical alias here when its
 * runtime identity differs from the contract filename identity.
 */
const REQUIRED_AGENT_IDS = [
  "CodexAdvisor-agent",
  "foreman-v2.agent",
  "governance-repo-administrator-v2",
  "governance-repo-administrator-v2.agent",
  "independent-assurance-agent",
];

const CANONICAL_AGENT_ID_ALIASES = Object.freeze({
  "governance-repo-administrator-v2": "governance-repo-administrator-v2.agent",
});

function registerCanonicalAgentIds(contractPaths) {
  const registeredPaths = { ...contractPaths };

  for (const [canonicalId, contractId] of Object.entries(CANONICAL_AGENT_ID_ALIASES)) {
    if (contractPaths[contractId]) {
      registeredPaths[canonicalId] = contractPaths[contractId];
    }
  }

  return registeredPaths;
}

module.exports = {
  CANONICAL_AGENT_ID_ALIASES,
  REQUIRED_AGENT_IDS,
  registerCanonicalAgentIds,
};
