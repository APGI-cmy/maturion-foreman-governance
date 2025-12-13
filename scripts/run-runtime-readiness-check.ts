/**
 * Execute Runtime Readiness Check
 * 
 * This script executes the complete runtime readiness check
 * and generates a GO/NO-GO verdict for overnight autonomous execution.
 */

import { executeRuntimeReadinessCheck } from '../lib/runtime-readiness';

async function main() {
  try {
    console.log('Starting Runtime Readiness Check...');
    console.log('');
    
    const verdict = await executeRuntimeReadinessCheck({
      skipLongRunning: true, // Skip 30-minute stability probe for quick check
      persistState: true,
      logLevel: 'INFO',
    });
    
    // Exit with appropriate code based on verdict
    if (verdict.verdict === 'GO') {
      console.log('✅ Runtime readiness check completed with GO verdict');
      process.exit(0);
    } else {
      console.log('❌ Runtime readiness check completed with NO-GO verdict');
      process.exit(1);
    }
  } catch (error) {
    console.error('');
    console.error('Fatal error during runtime readiness check:');
    console.error(error instanceof Error ? error.message : String(error));
    console.error('');
    process.exit(2);
  }
}

main();
