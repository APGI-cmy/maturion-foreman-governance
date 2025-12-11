/**
 * React & ESLint Validation QA Test
 * 
 * RED QA Test - Part of Build Philosophy workflow
 * 
 * This test validates:
 * 1. React Hook exhaustive-deps compliance
 * 2. ESLint reserved variable usage
 * 
 * Expected: RED before fixes, GREEN after fixes
 */

import { validateFiles } from '@/lib/foreman/governance/react-eslint-validator';
import * as path from 'path';

console.log('🔍 React & ESLint Validation QA Test');
console.log('Testing Build Philosophy: Architecture → RED QA → Build to GREEN\n');

// Files to validate (known issues)
const filesToCheck = [
  'app/foreman/governance-alerts/page.tsx',
  'lib/foreman/governance/import-validator.ts'
];

const fullPaths = filesToCheck.map(f => path.join(process.cwd(), f));

const result = validateFiles(fullPaths);

console.log('📊 Results:');
console.log(`  Files checked: ${result.filesChecked}`);
console.log(`  Issues found: ${result.issues.length}`);
console.log(`  Errors: ${result.issues.filter(i => i.severity === 'error').length}`);
console.log(`  Warnings: ${result.issues.filter(i => i.severity === 'warning').length}\n`);

if (result.issues.length > 0) {
  console.log('❌ FAILED: Issues detected\n');
  
  result.issues.forEach((issue, i) => {
    const icon = issue.severity === 'error' ? '🔴' : '⚠️';
    console.log(`${icon} Issue #${i + 1}:`);
    console.log(`   File: ${issue.file}`);
    console.log(`   Line: ${issue.line}`);
    console.log(`   Rule: ${issue.rule}`);
    console.log(`   Issue: ${issue.issue}\n`);
  });
  
  console.log('📋 Build Philosophy Status: RED ❌');
  console.log('Next step: Fix issues → Run test again → Should be GREEN ✅\n');
  process.exit(1);
} else {
  console.log('✅ PASSED: All validations passed\n');
  console.log('📋 Build Philosophy Status: GREEN ✅');
  console.log('Evidence: All React Hooks and ESLint rules comply\n');
  process.exit(0);
}
