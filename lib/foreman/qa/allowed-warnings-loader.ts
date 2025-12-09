/**
 * Allowed Warnings Loader
 * 
 * Loads and validates the governance-approved warning allowlist.
 * 
 * CRITICAL GOVERNANCE RULES:
 * - Foreman may NOT add new allowed warnings autonomously
 * - All allowed warnings must be approved by Johan (not Foreman)
 * - Each allowed warning must have a Parking Station entry
 * - Warnings not in the allowlist MUST cause QA to fail
 */

import * as fs from 'fs';
import * as path from 'path';

export interface AllowedWarning {
  id: string;
  pattern: string;
  source: string;
  reason: string;
  target_wave: string;
  approved_by: string;
  created_at: string;
  parking_station_id?: string;
  expires_at?: string;
  metadata?: {
    package_name?: string;
    package_version?: string;
    impact?: 'low' | 'medium' | 'high' | 'critical';
    upgrade_plan?: string;
  };
}

export interface AllowedWarningsConfig {
  $schema?: string;
  version: string;
  lastUpdated: string;
  warnings: AllowedWarning[];
}

/**
 * Load allowed warnings from the governance file
 */
export function loadAllowedWarnings(): AllowedWarningsConfig {
  const allowedWarningsPath = path.join(
    process.cwd(),
    'foreman',
    'qa',
    'allowed-warnings.json'
  );

  if (!fs.existsSync(allowedWarningsPath)) {
    // If file doesn't exist, return empty configuration
    // This means ZERO warnings are allowed (strict mode)
    console.log('[Allowed Warnings] No allowlist found - STRICT ZERO-WARNING MODE');
    return {
      version: '1.0.0',
      lastUpdated: new Date().toISOString().split('T')[0],
      warnings: [],
    };
  }

  try {
    const content = fs.readFileSync(allowedWarningsPath, 'utf-8');
    const config: AllowedWarningsConfig = JSON.parse(content);

    // Validate that no warnings are approved by Foreman
    const foremanApproved = config.warnings.filter(w => 
      w.approved_by.toLowerCase().includes('foreman')
    );

    if (foremanApproved.length > 0) {
      throw new Error(
        `GOVERNANCE VIOLATION: Foreman is not allowed to approve warnings. ` +
        `Found ${foremanApproved.length} warnings approved by Foreman. ` +
        `Only Johan may approve warning exceptions.`
      );
    }

    // Validate that all warnings have required fields
    for (const warning of config.warnings) {
      if (!warning.id || !warning.pattern || !warning.source || 
          !warning.reason || !warning.target_wave || !warning.approved_by) {
        throw new Error(
          `GOVERNANCE VIOLATION: Warning entry missing required fields: ${JSON.stringify(warning)}`
        );
      }
    }

    console.log(`[Allowed Warnings] Loaded ${config.warnings.length} governance-approved warnings`);
    return config;
  } catch (error) {
    if (error instanceof Error && error.message.includes('GOVERNANCE VIOLATION')) {
      throw error;
    }
    throw new Error(`Failed to load allowed-warnings.json: ${error}`);
  }
}

/**
 * Check if a warning line is allowed by the governance allowlist
 */
export function isWarningAllowed(
  warningLine: string,
  allowedWarnings: AllowedWarningsConfig
): { allowed: boolean; matchedEntry?: AllowedWarning } {
  for (const entry of allowedWarnings.warnings) {
    try {
      const pattern = new RegExp(entry.pattern, 'i');
      if (pattern.test(warningLine)) {
        return { allowed: true, matchedEntry: entry };
      }
    } catch (error) {
      console.error(`[Allowed Warnings] Invalid regex pattern: ${entry.pattern}`, error);
      // If pattern is invalid, treat warning as NOT allowed (fail-safe)
      continue;
    }
  }

  return { allowed: false };
}

/**
 * Get list of expired allowed warnings
 */
export function getExpiredWarnings(
  allowedWarnings: AllowedWarningsConfig
): AllowedWarning[] {
  const now = new Date();
  return allowedWarnings.warnings.filter(w => {
    if (!w.expires_at) return false;
    const expiryDate = new Date(w.expires_at);
    return expiryDate < now;
  });
}

/**
 * Validate allowed warnings configuration integrity
 */
export function validateAllowedWarnings(
  allowedWarnings: AllowedWarningsConfig
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check version format
  if (!/^\d+\.\d+\.\d+$/.test(allowedWarnings.version)) {
    errors.push(`Invalid version format: ${allowedWarnings.version}`);
  }

  // Check each warning entry
  for (const warning of allowedWarnings.warnings) {
    // Verify approved_by is not Foreman
    if (warning.approved_by.toLowerCase().includes('foreman')) {
      errors.push(
        `Warning ${warning.id} approved by Foreman - GOVERNANCE VIOLATION. ` +
        `Only Johan may approve warnings.`
      );
    }

    // Verify pattern is valid regex
    try {
      new RegExp(warning.pattern);
    } catch (error) {
      errors.push(`Warning ${warning.id} has invalid regex pattern: ${warning.pattern}`);
    }

    // Check if expired
    if (warning.expires_at) {
      const expiryDate = new Date(warning.expires_at);
      if (expiryDate < new Date()) {
        errors.push(
          `Warning ${warning.id} has expired (${warning.expires_at}). ` +
          `It should be removed from the allowlist.`
        );
      }
    }

    // Warn if no parking station ID
    if (!warning.parking_station_id) {
      errors.push(
        `Warning ${warning.id} missing parking_station_id. ` +
        `All allowed warnings must have a Parking Station entry for tech debt tracking.`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
