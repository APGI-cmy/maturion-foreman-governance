/**
 * Zero-Warning Build Policy (GSR-QA-STRICT-001)
 * 
 * Enforces the STRICT zero-warning policy across build, lint, and TypeScript compilation.
 * 
 * Philosophy: Warnings are errors waiting to happen. A clean build means ZERO warnings.
 * 
 * Per GSR-QA-STRICT-001: ALL warnings are treated as blockers.
 * 
 * Governance-Approved Exceptions:
 * - Warnings may ONLY be suppressed if listed in foreman/qa/allowed-warnings.json
 * - Each allowed warning must be approved by Johan (NOT Foreman)
 * - Each allowed warning must have a Parking Station tech-debt entry
 * - Foreman may NOT add warnings to the allowlist autonomously
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  loadAllowedWarnings,
  isWarningAllowed,
  validateAllowedWarnings,
  type AllowedWarning,
} from './allowed-warnings-loader';

export interface ZeroWarningPolicyResult {
  passed: boolean;
  buildWarnings: string[];
  lintWarnings: string[];
  typescriptWarnings: string[];
  unusedVariables: string[];
  deprecatedAPIs: string[];
  allowedWarnings: string[];
  blockedWarnings: string[];
  totalIssues: number;
  summary: string;
  governanceViolations: string[];
}

/**
 * Patterns for detecting specific warning types
 */
const BUILD_WARNING_PATTERNS = [
  /^.*webpack compiled with \d+ warning/i,
  /\d+ warning\(s\)\s*$/i,
  /^Warning: /,
];

const LINT_WARNING_PATTERNS = [
  /warning\s+/i,
  /⚠/,
];

const TYPESCRIPT_WARNING_PATTERNS = [
  /TS\d{4}:.*warning/i,
  /\(TS\d{4}\)/,
];

const UNUSED_VARIABLE_PATTERNS = [
  /'[^']+' is declared but (its value is )?never (read|used)/,
  /'[^']+' is assigned a value but never used/,
  /no-unused-vars/,
];

const DEPRECATED_API_PATTERNS = [
  /deprecated/i,
  /marked as deprecated/i,
  /@deprecated/i,
];

/**
 * Check build warnings in build log
 * STRICT MODE: No whitelisting - all warnings are blockers
 */
function checkBuildWarnings(buildLog: string): string[] {
  const warnings: string[] = [];
  const lines = buildLog.split('\n');

  lines.forEach(line => {
    for (const pattern of BUILD_WARNING_PATTERNS) {
      if (pattern.test(line)) {
        warnings.push(line.trim());
        break;
      }
    }
  });

  return warnings;
}

/**
 * Check lint warnings in lint log
 * STRICT MODE: No whitelisting - all warnings are blockers
 */
function checkLintWarnings(lintLog: string): string[] {
  const warnings: string[] = [];
  const lines = lintLog.split('\n');

  lines.forEach(line => {
    for (const pattern of LINT_WARNING_PATTERNS) {
      if (pattern.test(line)) {
        warnings.push(line.trim());
        break;
      }
    }
  });

  return warnings;
}

/**
 * Check TypeScript warnings in build/lint logs
 * STRICT MODE: No whitelisting - all warnings are blockers
 */
function checkTypescriptWarnings(
  buildLog: string,
  lintLog: string
): string[] {
  const warnings: string[] = [];
  const combinedLog = `${buildLog}\n${lintLog}`;
  const lines = combinedLog.split('\n');

  lines.forEach(line => {
    for (const pattern of TYPESCRIPT_WARNING_PATTERNS) {
      if (pattern.test(line)) {
        warnings.push(line.trim());
        break;
      }
    }
  });

  return warnings;
}

/**
 * Check for unused variables in lint log
 */
function checkUnusedVariables(lintLog: string): string[] {
  const unused: string[] = [];
  const lines = lintLog.split('\n');

  lines.forEach(line => {
    for (const pattern of UNUSED_VARIABLE_PATTERNS) {
      if (pattern.test(line)) {
        unused.push(line.trim());
        break;
      }
    }
  });

  return unused;
}

/**
 * Check for deprecated API usage in all logs
 * 
 * TRUE NORTH PRINCIPLE: NO WHITELISTING
 * This function detects ALL deprecated usage - no exceptions.
 * If npm packages show deprecated warnings, the proper fix is:
 * - Upgrade the packages to non-deprecated versions
 * - NOT to filter/whitelist the warnings
 * 
 * Constitutional Rule: No unilateral softening of quality requirements.
 */
function checkDeprecatedAPIs(
  buildLog: string,
  lintLog: string,
  testLog: string
): string[] {
  const deprecated: string[] = [];
  const combinedLog = `${buildLog}\n${lintLog}\n${testLog}`;
  const lines = combinedLog.split('\n');

  lines.forEach(line => {
    // Skip test output lines that start with #
    if (line.trim().startsWith('#')) {
      return;
    }
    
    for (const pattern of DEPRECATED_API_PATTERNS) {
      if (pattern.test(line)) {
        deprecated.push(line.trim());
        break;
      }
    }
  });

  return deprecated;
}

/**
 * Run STRICT zero-warning policy checks on all logs
 * GSR-QA-STRICT-001: Warnings must be in governance-approved allowlist or QA fails
 */
export function runZeroWarningPolicy(
  logsDir: string = '/tmp'
): ZeroWarningPolicyResult {
  const buildLogPath = path.join(logsDir, 'build.log');
  const lintLogPath = path.join(logsDir, 'lint.log');
  const testLogPath = path.join(logsDir, 'test.log');

  // Read logs
  const buildLog = fs.existsSync(buildLogPath)
    ? fs.readFileSync(buildLogPath, 'utf-8')
    : '';
  const lintLog = fs.existsSync(lintLogPath)
    ? fs.readFileSync(lintLogPath, 'utf-8')
    : '';
  const testLog = fs.existsSync(testLogPath)
    ? fs.readFileSync(testLogPath, 'utf-8')
    : '';

  // Load governance-approved allowed warnings
  const allowedWarningsConfig = loadAllowedWarnings();
  const governanceViolations: string[] = [];

  // Validate allowlist integrity
  const validation = validateAllowedWarnings(allowedWarningsConfig);
  if (!validation.valid) {
    governanceViolations.push(...validation.errors);
  }

  // Check all warning types - STRICT MODE: No automatic whitelisting
  const buildWarnings = checkBuildWarnings(buildLog);
  const lintWarnings = checkLintWarnings(lintLog);
  const typescriptWarnings = checkTypescriptWarnings(buildLog, lintLog);
  const unusedVariables = checkUnusedVariables(lintLog);
  const deprecatedAPIs = checkDeprecatedAPIs(buildLog, lintLog, testLog);

  // Collect all warnings
  const allWarnings = [
    ...buildWarnings,
    ...lintWarnings,
    ...typescriptWarnings,
    ...unusedVariables,
    ...deprecatedAPIs,
  ];

  // Separate allowed vs blocked warnings
  const allowedWarnings: string[] = [];
  const blockedWarnings: string[] = [];

  for (const warning of allWarnings) {
    const { allowed, matchedEntry } = isWarningAllowed(warning, allowedWarningsConfig);
    if (allowed) {
      allowedWarnings.push(warning);
      console.log(
        `[Zero-Warning] ALLOWED (governance): ${warning.substring(0, 100)}... ` +
        `(approved by ${matchedEntry?.approved_by}, target: ${matchedEntry?.target_wave})`
      );
    } else {
      blockedWarnings.push(warning);
      console.error(
        `[Zero-Warning] BLOCKED: ${warning.substring(0, 100)}...`
      );
    }
  }

  // QA passes ONLY if no blocked warnings AND no governance violations
  const totalIssues = blockedWarnings.length + governanceViolations.length;
  const passed = totalIssues === 0;

  let summary: string;
  if (passed && allWarnings.length === 0) {
    summary = 'Zero-warning policy (STRICT): PASSED - No warnings found';
  } else if (passed && allowedWarnings.length > 0) {
    summary = 
      `Zero-warning policy (STRICT): PASSED - ${allowedWarnings.length} warnings allowed by governance, ` +
      `${blockedWarnings.length} blocked, ${governanceViolations.length} violations`;
  } else {
    summary = 
      `Zero-warning policy (STRICT): FAILED - ${totalIssues} issues found ` +
      `(${blockedWarnings.length} blocked warnings, ${governanceViolations.length} governance violations)`;
  }

  // Log technical debt for allowed warnings
  if (allowedWarnings.length > 0) {
    console.warn(
      `[Zero-Warning] TECHNICAL DEBT: ${allowedWarnings.length} warnings allowed by governance. ` +
      `These must be eliminated in their target waves.`
    );
  }

  return {
    passed,
    buildWarnings,
    lintWarnings,
    typescriptWarnings,
    unusedVariables,
    deprecatedAPIs,
    allowedWarnings,
    blockedWarnings,
    totalIssues,
    summary,
    governanceViolations,
  };
}

/**
 * Generate detailed report for zero-warning policy results
 */
export function generateZeroWarningReport(
  result: ZeroWarningPolicyResult
): string {
  const sections: string[] = [];

  sections.push('# Zero-Warning Policy Report\n');
  sections.push(
    `**Overall Status**: ${result.passed ? '✅ PASSED' : '❌ FAILED'}\n`
  );
  sections.push(`**Total Issues**: ${result.totalIssues}\n`);
  sections.push(`**Summary**: ${result.summary}\n`);

  // Governance violations (highest priority)
  if (result.governanceViolations.length > 0) {
    sections.push('## ⚠️ GOVERNANCE VIOLATIONS\n');
    sections.push('**CRITICAL**: These violations must be fixed immediately.\n');
    result.governanceViolations.forEach((violation, idx) => {
      sections.push(`${idx + 1}. ${violation}`);
    });
    sections.push('');
  }

  // Blocked warnings (must be fixed or added to allowlist with approval)
  if (result.blockedWarnings.length > 0) {
    sections.push('## ❌ Blocked Warnings (Not in Allowlist)\n');
    sections.push(
      '**These warnings are NOT governance-approved and MUST be fixed.**\n'
    );
    sections.push(
      'To suppress a warning, it must be added to `foreman/qa/allowed-warnings.json` ' +
      'with Johan\'s approval and a Parking Station tech-debt entry.\n'
    );
    result.blockedWarnings.forEach((warning, idx) => {
      sections.push(`${idx + 1}. ${warning}`);
    });
    sections.push('');
  }

  // Allowed warnings (technical debt)
  if (result.allowedWarnings.length > 0) {
    sections.push('## ⚠️ Allowed Warnings (Technical Debt)\n');
    sections.push(
      '**These warnings are governance-approved but represent TECHNICAL DEBT.**\n'
    );
    sections.push('They must be eliminated in their target waves.\n');
    result.allowedWarnings.forEach((warning, idx) => {
      sections.push(`${idx + 1}. ${warning}`);
    });
    sections.push('');
  }

  // Detailed breakdown by category
  if (result.buildWarnings.length > 0) {
    sections.push('## Build Warnings\n');
    result.buildWarnings.forEach((warning, idx) => {
      sections.push(`${idx + 1}. ${warning}`);
    });
    sections.push('');
  }

  if (result.lintWarnings.length > 0) {
    sections.push('## Lint Warnings\n');
    result.lintWarnings.forEach((warning, idx) => {
      sections.push(`${idx + 1}. ${warning}`);
    });
    sections.push('');
  }

  if (result.typescriptWarnings.length > 0) {
    sections.push('## TypeScript Warnings\n');
    result.typescriptWarnings.forEach((warning, idx) => {
      sections.push(`${idx + 1}. ${warning}`);
    });
    sections.push('');
  }

  if (result.unusedVariables.length > 0) {
    sections.push('## Unused Variables\n');
    result.unusedVariables.forEach((warning, idx) => {
      sections.push(`${idx + 1}. ${warning}`);
    });
    sections.push('');
  }

  if (result.deprecatedAPIs.length > 0) {
    sections.push('## Deprecated API Usage\n');
    result.deprecatedAPIs.forEach((warning, idx) => {
      sections.push(`${idx + 1}. ${warning}`);
    });
    sections.push('');
  }

  if (result.passed) {
    sections.push(
      '✅ **All checks passed (STRICT MODE)** - Zero non-allowed warnings detected\n'
    );
  } else {
    sections.push(
      '❌ **STRICT MODE VIOLATION** - ALL non-allowed warnings must be fixed before proceeding\n'
    );
    sections.push(
      '**GSR-QA-STRICT-001**: Zero-tolerance QA policy enforced\n'
    );
    sections.push(
      '**To suppress a warning**: Add it to foreman/qa/allowed-warnings.json with:\n' +
      '  - Johan\'s approval (NOT Foreman)\n' +
      '  - A Parking Station tech-debt entry\n' +
      '  - A target wave for elimination\n'
    );
  }

  return sections.join('\n');
}
