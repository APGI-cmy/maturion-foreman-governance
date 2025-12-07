/**
 * Auto-generated regression test
 * Prevents recurrence of: LintError
 * Original error: Lint error detected: 88:5  Error: Do not assign to the variable `module`. See: https://nextjs.org/docs/messages/no-assign-module-variable  @next/next/no-assign-module-variable
 * Source: lint.log:7
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import * as fs from 'fs';
import * as path from 'path';

describe('Regression: LintError', () => {
  it('should-not-have-lint-in-lint-log-7', () => {
    // Check that lint log doesn't contain the error pattern
    const lintLogPath = path.join('/tmp', 'lint.log');
    
    if (!fs.existsSync(lintLogPath)) {
      // If no lint log, skip test
      return;
    }
    
    const lintLog = fs.readFileSync(lintLogPath, 'utf-8');
    
    // Pattern that should NOT appear in lint log
    const errorPattern = /Lint.*error.*detected.*88:5.*Error/i;
    
    assert.ok(
      !errorPattern.test(lintLog),
      'Lint log should not contain LintError: Lint error detected: 88:5  Error: Do not assign to the variable module. See: https://nextjs.org/docs/messages/no-assign-module-variable  @next/next/no-assign-module-variable'
    );
  });
});
