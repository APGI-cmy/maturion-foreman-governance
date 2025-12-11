/**
 * Import Validation QA Test
 * 
 * RED QA: This test validates that all imports reference actual exports.
 * 
 * Build Philosophy:
 * 1. This test should FAIL (RED) if there are invalid imports
 * 2. Fix the imports to make it PASS (GREEN)
 * 3. Document the evidence trail
 * 
 * Architecture: IMPORT_VALIDATION_ARCHITECTURE.md
 */

import { validateAllImports, suggestCorrectImport, type MissingExport } from '../../lib/foreman/governance/import-validator';

/**
 * Files to validate
 */
const CRITICAL_FILES = [
  'lib/foreman/constitution/supervision-runtime.ts',
  'lib/foreman/constitution/supervision-graph.ts',
  'lib/foreman/cognition/model-escalation-governor.ts',
  'app/api/foreman/chat/route.ts',
];

async function runImportValidation() {
  console.log('🔍 Import Validation QA Test\n');
  console.log('Testing Build Philosophy: Architecture → RED QA → Build to GREEN\n');
  
  const baseDir = process.cwd();
  const result = await validateAllImports(CRITICAL_FILES, baseDir);
  
  console.log(`📊 Results:`);
  console.log(`  Files checked: ${result.filesChecked}`);
  console.log(`  Imports checked: ${result.totalImportsChecked}`);
  console.log(`  Missing exports: ${result.missingExports.length}\n`);
  
  if (result.missingExports.length > 0) {
    console.log('❌ FAILED: Missing exports detected\n');
    
    result.missingExports.forEach((missing: MissingExport, index: number) => {
      console.log(`${index + 1}. ${missing.file}:${missing.line}`);
      console.log(`   Trying to import: '${missing.importedName}'`);
      console.log(`   From module: '${missing.sourceModule}'`);
      console.log(`   Available exports: [${missing.availableExports.join(', ')}]`);
      
      const suggestions = suggestCorrectImport(missing);
      if (suggestions.length > 0) {
        console.log(`   💡 Suggestions: ${suggestions.join(', ')}`);
      }
      console.log('');
    });
    
    console.log('🔧 Action Required:');
    console.log('   1. Fix the imports listed above');
    console.log('   2. Use the suggested export names');
    console.log('   3. Re-run this test (should turn GREEN)');
    console.log('   4. Document: RED → GREEN evidence\n');
    
    process.exit(1);
  }
  
  console.log('✅ PASSED: All imports are valid\n');
  console.log('🎯 Build Philosophy Compliance:');
  console.log('   ✓ Architecture defined');
  console.log('   ✓ QA test validated imports');
  console.log('   ✓ All imports reference actual exports');
  console.log('   ✓ Ready for build\n');
  
  process.exit(0);
}

// Run if executed directly
if (require.main === module) {
  runImportValidation().catch(error => {
    console.error('❌ Test execution error:', error);
    process.exit(1);
  });
}

export { runImportValidation };
