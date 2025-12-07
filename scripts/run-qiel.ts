#!/usr/bin/env tsx
/**
 * QIEL CLI Runner
 * 
 * Command-line interface for running the Quality Integrity Enforcement Layer
 * 
 * Usage:
 *   npx tsx scripts/run-qiel.ts [options]
 * 
 * Options:
 *   --logs-dir <path>    Path to logs directory (default: /tmp)
 *   --quick              Run quick QIEL (skip deployment simulation and engine validation)
 *   --full               Run full QIEL (all validations)
 *   --report <path>      Save report to file
 *   --build-id <id>      Build ID for tracking
 *   --sequence-id <id>   Sequence ID for tracking
 *   --commit-sha <sha>   Commit SHA for tracking
 *   --branch <name>      Branch name for tracking
 */

import { runQIEL, runQuickQIEL, runFullQIEL, saveQIELReport } from '../lib/foreman/qa/qiel-runner';

// Parse command-line arguments
const args = process.argv.slice(2);
const options: any = {
  logsDir: '/tmp',
  skipDeploymentSimulation: false,
  skipEngineValidation: false,
};

let reportPath: string | undefined;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  
  if (arg === '--logs-dir' && i + 1 < args.length) {
    options.logsDir = args[++i];
  } else if (arg === '--quick') {
    options.skipDeploymentSimulation = true;
    options.skipEngineValidation = true;
  } else if (arg === '--full') {
    options.skipDeploymentSimulation = false;
    options.skipEngineValidation = false;
  } else if (arg === '--report' && i + 1 < args.length) {
    reportPath = args[++i];
  } else if (arg === '--build-id' && i + 1 < args.length) {
    options.buildId = args[++i];
  } else if (arg === '--sequence-id' && i + 1 < args.length) {
    options.sequenceId = args[++i];
  } else if (arg === '--commit-sha' && i + 1 < args.length) {
    options.commitSha = args[++i];
  } else if (arg === '--branch' && i + 1 < args.length) {
    options.branch = args[++i];
  } else if (arg === '--help' || arg === '-h') {
    console.log(`
QIEL CLI Runner - Quality Integrity Enforcement Layer

Usage:
  npx tsx scripts/run-qiel.ts [options]

Options:
  --logs-dir <path>    Path to logs directory (default: /tmp)
  --quick              Run quick QIEL (skip deployment simulation and engine validation)
  --full               Run full QIEL (all validations)
  --report <path>      Save report to file
  --build-id <id>      Build ID for tracking
  --sequence-id <id>   Sequence ID for tracking
  --commit-sha <sha>   Commit SHA for tracking
  --branch <name>      Branch name for tracking
  --help, -h           Show this help message

Examples:
  # Run quick QIEL check
  npx tsx scripts/run-qiel.ts --quick

  # Run full QIEL with report
  npx tsx scripts/run-qiel.ts --full --report ./qiel-report.md

  # Run QIEL with custom logs directory
  npx tsx scripts/run-qiel.ts --logs-dir ./build-logs

  # Run QIEL with tracking metadata
  npx tsx scripts/run-qiel.ts --build-id build-123 --commit-sha abc123
`);
    process.exit(0);
  }
}

// Run QIEL
async function main() {
  try {
    console.log('Starting QIEL (Quality Integrity Enforcement Layer)...\n');
    
    const result = await runQIEL(options);
    
    // Save report if requested
    if (reportPath) {
      saveQIELReport(result, reportPath);
    }
    
    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('QIEL Summary');
    console.log('='.repeat(60));
    console.log(`Status: ${result.passed ? '✅ PASSED' : '❌ FAILED'}`);
    console.log(`Timestamp: ${result.timestamp}`);
    console.log(`Blockers: ${result.blockersFound.length}`);
    console.log(`QI Incidents: ${result.qiIncidents.length}`);
    console.log(`Regression Tests Generated: ${result.regressionTestsGenerated}`);
    console.log(`Total Regression Tests: ${result.totalRegressionTests}`);
    console.log('='.repeat(60) + '\n');
    
    if (!result.passed) {
      console.error('QIEL FAILED - Quality Integrity violations detected\n');
      
      if (result.blockersFound.length > 0) {
        console.error('Blockers:');
        result.blockersFound.forEach((blocker, idx) => {
          console.error(`  ${idx + 1}. ${blocker}`);
        });
        console.error('');
      }
      
      process.exit(1);
    } else {
      console.log('QIEL PASSED - System ready for deployment\n');
      process.exit(0);
    }
  } catch (error) {
    console.error('Fatal error running QIEL:', error);
    process.exit(1);
  }
}

main();
