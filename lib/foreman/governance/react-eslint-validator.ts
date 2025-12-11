/**
 * React & ESLint Validation Governance Component
 * 
 * Validates React Hook compliance and ESLint rule adherence.
 * Part of Build Philosophy: Architecture → RED QA → Build to GREEN
 */

import * as fs from 'fs';
import * as path from 'path';

export interface ValidationIssue {
  file: string;
  line: number;
  issue: string;
  rule: string;
  severity: 'error' | 'warning';
}

export interface ValidationResult {
  passed: boolean;
  issues: ValidationIssue[];
  filesChecked: number;
}

/**
 * Validate React Hook exhaustive-deps compliance
 */
export function validateReactHooks(filePath: string, content: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Detect useEffect without proper dependencies
    if (line.includes('useEffect(')) {
      const nextLines = lines.slice(index, index + 10).join('\n');
      
      // Check if dependency array exists
      const depsMatch = nextLines.match(/\},\s*\[([^\]]*)\]/);
      if (!depsMatch) return;

      const deps = depsMatch[1].split(',').map(d => d.trim()).filter(d => d);
      
      // Look for function calls in effect body
      const effectBody = nextLines.match(/useEffect\(\(\) => \{([^}]+)\}/);
      if (effectBody) {
        const body = effectBody[1];
        // Find function calls (simplified pattern)
        const functionCalls = body.match(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g);
        
        if (functionCalls) {
          functionCalls.forEach(call => {
            const funcName = call.replace(/\s*\($/, '');
            // Check if it's a custom function (not built-in)
            if (!['console', 'fetch', 'setTimeout', 'setInterval'].includes(funcName)) {
              if (!deps.includes(funcName)) {
                issues.push({
                  file: filePath,
                  line: index + 1,
                  issue: `React Hook useEffect has a missing dependency: '${funcName}'`,
                  rule: 'react-hooks/exhaustive-deps',
                  severity: 'warning'
                });
              }
            }
          });
        }
      }
    }
  });

  return issues;
}

/**
 * Validate ESLint reserved variable usage
 */
export function validateReservedVariables(filePath: string, content: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const lines = content.split('\n');
  const reservedNames = ['module', 'exports', 'require', '__dirname', '__filename'];

  lines.forEach((line, index) => {
    reservedNames.forEach(reserved => {
      // Match variable declarations: const module =, let module =, var module =
      const declPattern = new RegExp(`\\b(const|let|var)\\s+${reserved}\\s*=`, 'g');
      if (declPattern.test(line)) {
        issues.push({
          file: filePath,
          line: index + 1,
          issue: `Do not assign to the variable '${reserved}'`,
          rule: '@next/next/no-assign-module-variable',
          severity: 'error'
        });
      }
    });
  });

  return issues;
}

/**
 * Validate all React and ESLint rules in a directory
 */
export function validateDirectory(dirPath: string): ValidationResult {
  const issues: ValidationIssue[] = [];
  let filesChecked = 0;

  function scanDirectory(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // Skip node_modules, .next, etc.
        if (!['node_modules', '.next', '.git', 'dist', 'build'].includes(entry.name)) {
          scanDirectory(fullPath);
        }
      } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
        filesChecked++;
        const content = fs.readFileSync(fullPath, 'utf-8');
        
        if (entry.name.endsWith('.tsx')) {
          issues.push(...validateReactHooks(fullPath, content));
        }
        
        issues.push(...validateReservedVariables(fullPath, content));
      }
    }
  }

  scanDirectory(dirPath);

  return {
    passed: issues.filter(i => i.severity === 'error').length === 0,
    issues,
    filesChecked
  };
}

/**
 * Get specific validation for files
 */
export function validateFiles(filePaths: string[]): ValidationResult {
  const issues: ValidationIssue[] = [];
  let filesChecked = 0;

  filePaths.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      filesChecked++;
      const content = fs.readFileSync(filePath, 'utf-8');
      
      if (filePath.endsWith('.tsx')) {
        issues.push(...validateReactHooks(filePath, content));
      }
      
      issues.push(...validateReservedVariables(filePath, content));
    }
  });

  return {
    passed: issues.filter(i => i.severity === 'error').length === 0,
    issues,
    filesChecked
  };
}
