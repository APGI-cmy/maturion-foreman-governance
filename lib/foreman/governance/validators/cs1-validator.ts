/**
 * CS1 Validator
 * 
 * Control 2: Constitutional Integrity
 * Ensures constitutional files and protected paths remain immutable.
 * 
 * Per GOVERNANCE_GATE_CANON.md Control 2.
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import * as crypto from 'crypto';

export interface ValidationContext {
  prNumber: number;
  commitSha: string;
  workspaceRoot: string;
  changedFiles: string[];
}

export interface EvidenceReference {
  type: 'log' | 'report' | 'result';
  path: string;
  hash?: string;
}

export interface Violation {
  code: string;
  message: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  evidence?: EvidenceReference[];
}

export interface ControlResult {
  controlName: string;
  status: 'PASS' | 'FAIL';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  evidence: EvidenceReference[];
  violations?: Violation[];
  message: string;
  timestamp: string;
}

// Protected paths per GOVERNANCE_GATE_CANON.md
const PROTECTED_PATHS = [
  '.github/workflows/',
  'BUILD_PHILOSOPHY.md',
  'GOVERNANCE_GATE_CANON.md',
  '.github/foreman/agent-contract.md',
  'foreman/constitution/',
  'foreman/architecture-design-checklist.md',
  'docs/governance/'
];

// Suppression patterns to detect
const SUPPRESSION_PATTERNS = [
  'eslint-disable',
  '@ts-ignore',
  '@ts-expect-error',
  '@ts-nocheck',
  'prettier-ignore'
];

/**
 * Validate CS1 control
 */
export async function validateCS1(context: ValidationContext): Promise<ControlResult> {
  const timestamp = new Date().toISOString();
  const evidence: EvidenceReference[] = [];
  const violations: Violation[] = [];
  
  // Check for protected file modifications
  const protectedFileViolations = checkProtectedFiles(context.changedFiles);
  violations.push(...protectedFileViolations);
  
  // Check for suppression comments in changed files
  const suppressionViolations = await checkSuppressions(
    context.workspaceRoot,
    context.changedFiles
  );
  violations.push(...suppressionViolations);
  
  // Load baseline hashes if available
  const baselineHashesPath = path.join(
    context.workspaceRoot,
    'foreman/constitution/baseline-hashes.json'
  );
  
  try {
    await fs.access(baselineHashesPath);
    evidence.push({
      type: 'result',
      path: baselineHashesPath
    });
    
    // Validate hashes
    const hashViolations = await validateHashes(
      context.workspaceRoot,
      baselineHashesPath,
      context.changedFiles
    );
    violations.push(...hashViolations);
  } catch (error) {
    // Baseline hashes don't exist - this is okay for initial setup
  }
  
  // Determine status
  const status = violations.length === 0 ? 'PASS' : 'FAIL';
  const message = status === 'PASS'
    ? 'CS1 validation passed: Constitutional integrity maintained'
    : `CS1 validation failed: ${violations.length} violation(s) detected`;
  
  return {
    controlName: 'CS1',
    status,
    severity: 'CRITICAL',
    evidence,
    violations: violations.length > 0 ? violations : undefined,
    message,
    timestamp
  };
}

// Helper functions

function checkProtectedFiles(changedFiles: string[]): Violation[] {
  const violations: Violation[] = [];
  
  for (const file of changedFiles) {
    for (const protectedPath of PROTECTED_PATHS) {
      if (file.includes(protectedPath)) {
        violations.push({
          code: 'CS1_PROTECTED_FILE_MODIFIED',
          message: `Protected file modified: ${file}`,
          severity: 'CRITICAL',
          evidence: [{
            type: 'result',
            path: file
          }]
        });
      }
    }
  }
  
  return violations;
}

async function checkSuppressions(
  workspaceRoot: string,
  changedFiles: string[]
): Promise<Violation[]> {
  const violations: Violation[] = [];
  
  for (const file of changedFiles) {
    // Only check source files
    if (!file.match(/\.(ts|tsx|js|jsx)$/)) {
      continue;
    }
    
    const fullPath = path.join(workspaceRoot, file);
    
    try {
      const content = await fs.readFile(fullPath, 'utf-8');
      
      for (const pattern of SUPPRESSION_PATTERNS) {
        if (content.includes(pattern)) {
          violations.push({
            code: 'CS1_SUPPRESSION_DETECTED',
            message: `Suppression comment detected in ${file}: ${pattern}`,
            severity: 'HIGH',
            evidence: [{
              type: 'result',
              path: file
            }]
          });
        }
      }
    } catch (error) {
      // File might not exist - skip
    }
  }
  
  return violations;
}

async function validateHashes(
  workspaceRoot: string,
  baselineHashesPath: string,
  changedFiles: string[]
): Promise<Violation[]> {
  const violations: Violation[] = [];
  
  try {
    const baselineContent = await fs.readFile(baselineHashesPath, 'utf-8');
    const baselineHashes = JSON.parse(baselineContent) as Record<string, string>;
    
    for (const file of changedFiles) {
      // Check if this is a protected file with a baseline hash
      const isProtected = PROTECTED_PATHS.some(p => file.includes(p));
      
      if (isProtected && baselineHashes[file]) {
        const fullPath = path.join(workspaceRoot, file);
        
        try {
          const content = await fs.readFile(fullPath);
          const actualHash = crypto.createHash('sha256').update(content).digest('hex');
          const expectedHash = baselineHashes[file];
          
          if (actualHash !== expectedHash) {
            violations.push({
              code: 'CS1_HASH_MISMATCH',
              message: `Protected file hash mismatch: ${file}`,
              severity: 'CRITICAL',
              evidence: [{
                type: 'result',
                path: file,
                hash: actualHash
              }]
            });
          }
        } catch (error) {
          // File doesn't exist - this is a violation
          violations.push({
            code: 'CS1_PROTECTED_FILE_MISSING',
            message: `Protected file missing: ${file}`,
            severity: 'CRITICAL',
            evidence: []
          });
        }
      }
    }
  } catch (error) {
    // Can't load baseline hashes - skip validation
  }
  
  return violations;
}
