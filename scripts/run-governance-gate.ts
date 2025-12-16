#!/usr/bin/env node
/**
 * Governance Gate CLI Script
 * 
 * Executes the Governance Gate validation process.
 * Exit code 0 = PASS, Exit code 1 = FAIL
 */

import { executeGateAndExit, executeGate, GateContext } from '../lib/foreman/governance/gate-executor';
import * as path from 'path';

async function main() {
  // Parse command line arguments
  const args = process.argv.slice(2);
  
  const prNumber = parseInt(args[0] || '0', 10);
  const commitSha = args[1] || 'unknown';
  const branch = args[2] || 'unknown';
  const baseBranch = args[3] || 'main';
  
  // Get workspace root
  const workspaceRoot = process.cwd();
  
  // Setup paths
  const evidenceDir = path.join(workspaceRoot, 'evidence');
  const logsDir = path.join(workspaceRoot, 'logs');
  
  // Get changed files (would come from git diff in real scenario)
  const changedFiles: string[] = [];
  
  const context: GateContext = {
    prNumber,
    commitSha,
    branch,
    baseBranch,
    changedFiles,
    evidenceDir,
    logsDir,
    workspaceRoot
  };
  
  console.log('='.repeat(80));
  console.log('GOVERNANCE GATE EXECUTION');
  console.log('='.repeat(80));
  console.log(`PR: #${prNumber}`);
  console.log(`Commit: ${commitSha}`);
  console.log(`Branch: ${branch} -> ${baseBranch}`);
  console.log(`Workspace: ${workspaceRoot}`);
  console.log('='.repeat(80));
  console.log('');
  
  // Execute gate
  const result = await executeGate(context);
  
  // Display report
  console.log(result.reportMarkdown);
  console.log('');
  console.log('='.repeat(80));
  console.log(`Final Status: ${result.passed ? '✅ PASS' : '❌ FAIL'}`);
  console.log('='.repeat(80));
  
  // Exit with appropriate code
  process.exit(result.passed ? 0 : 1);
}

main().catch(error => {
  console.error('Governance Gate Error:', error);
  process.exit(1);
});
