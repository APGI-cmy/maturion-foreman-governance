/**
 * Auto-generated regression test
 * Prevents recurrence of: BuildError
 * Original error: Build error detected: Overload 3 of 4, '(command: string, options?: ExecSyncOptions | undefined): string | NonSharedBuffer', gave the following error.
 * Source: build.log:6
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import * as fs from 'fs';
import * as path from 'path';

describe('Regression: BuildError', () => {
  it('should-not-have-build-in-build-log-6', () => {
    // Check that build log doesn't contain the error pattern
    const buildLogPath = path.join('/tmp', 'build.log');
    
    if (!fs.existsSync(buildLogPath)) {
      // If no build log, skip test
      return;
    }
    
    const buildLog = fs.readFileSync(buildLogPath, 'utf-8');
    
    // Pattern that should NOT appear in build log
    const errorPattern = /Build.*error.*detected.*Overload.*3/i;
    
    assert.ok(
      !errorPattern.test(buildLog),
      `Build log should not contain BuildError: Build error detected: Overload 3 of 4, '(command: string, options?: ExecSyncOptions | undefined): string | NonSharedBuffer', gave the following error.`
    );
  });
});
