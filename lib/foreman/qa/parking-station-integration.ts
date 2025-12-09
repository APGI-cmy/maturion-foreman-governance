/**
 * Parking Station Integration for Deprecated Dependencies
 * 
 * Creates Parking Station tech-debt entries for allowed deprecated warnings.
 * 
 * This ensures all allowed warnings are tracked as technical debt with
 * proper governance and planning.
 */

import * as fs from 'fs';
import * as path from 'path';
import type { AllowedWarning } from './allowed-warnings-loader';
import type { ParkingStationEntry } from '@/types/parking-station';

/**
 * Create a Parking Station entry for a deprecated dependency warning
 */
export function createDeprecatedDependencyEntry(
  allowedWarning: AllowedWarning
): ParkingStationEntry {
  const now = new Date().toISOString();
  
  // Extract package name from metadata or pattern
  const packageName = allowedWarning.metadata?.package_name || 
    extractPackageNameFromPattern(allowedWarning.pattern);
  
  const entry: ParkingStationEntry = {
    id: allowedWarning.parking_station_id || `ps-deprecated-${Date.now()}`,
    name: `Deprecated Dependency: ${packageName}`,
    category: 'QA',
    source: 'QIEL Output',
    sourceLocation: 'foreman/qa/allowed-warnings.json',
    summary: `Deprecated package: ${packageName} - ${allowedWarning.reason}`,
    description: 
      `**Source**: ${allowedWarning.source}\n\n` +
      `**Reason for Allowance**: ${allowedWarning.reason}\n\n` +
      `**Package**: ${packageName}\n` +
      `**Version**: ${allowedWarning.metadata?.package_version || 'unknown'}\n\n` +
      `**Impact**: ${allowedWarning.metadata?.impact || 'unknown'}\n\n` +
      `**Upgrade Plan**: ${allowedWarning.metadata?.upgrade_plan || 'TBD'}\n\n` +
      `**Pattern**: \`${allowedWarning.pattern}\`\n\n` +
      `**Approved By**: ${allowedWarning.approved_by}\n` +
      `**Created**: ${allowedWarning.created_at}\n`,
    suggestedWave: mapTargetWaveToImplementationWave(allowedWarning.target_wave),
    dependencies: [],
    priority: calculatePriority(allowedWarning),
    status: 'Parked',
    tags: [
      'deprecated-dependency',
      'technical-debt',
      'zero-warning-exception',
      packageName,
    ],
    createdAt: allowedWarning.created_at,
    updatedAt: now,
    createdBy: 'Zero-Warning Policy',
    metadata: {
      complexity: 'Medium',
      estimatedEffort: estimateUpgradeEffort(allowedWarning),
      impact: mapImpactLevel(allowedWarning.metadata?.impact),
      foremanNotes: 
        `This entry was automatically created from an allowed warning in ` +
        `foreman/qa/allowed-warnings.json. The warning is governance-approved ` +
        `to be temporarily tolerated but must be eliminated by ${allowedWarning.target_wave}.`,
      extractedContext: JSON.stringify({
        allowedWarningId: allowedWarning.id,
        expiresAt: allowedWarning.expires_at,
      }),
    },
  };

  return entry;
}

/**
 * Extract package name from warning pattern
 */
function extractPackageNameFromPattern(pattern: string): string {
  // Try to extract package name from common patterns
  // Handles: npm packages, scoped packages (@types/node), packages with dots
  // e.g., "npm warn deprecated rimraf@" -> "rimraf"
  // e.g., "npm warn deprecated @types/node@" -> "@types/node"
  const match = pattern.match(/([a-zA-Z0-9._@/-]+)@/);
  if (match) {
    return match[1];
  }
  
  // Try to extract from word boundaries
  const wordMatch = pattern.match(/\b(@?[a-z][a-z0-9._-]*(?:\/[a-z][a-z0-9._-]*)?)\b/i);
  if (wordMatch) {
    return wordMatch[1];
  }
  
  return 'unknown-package';
}

/**
 * Map target wave to implementation wave format
 */
function mapTargetWaveToImplementationWave(
  targetWave: string
): ParkingStationEntry['suggestedWave'] {
  const lower = targetWave.toLowerCase();
  
  if (lower.includes('quick') || lower.includes('immediate')) {
    return 'Quick Win';
  }
  if (lower.includes('wave 1') || lower.includes('wave1')) {
    return 'Wave 1';
  }
  if (lower.includes('wave 2') || lower.includes('wave2')) {
    return 'Wave 2';
  }
  if (lower.includes('wave 3') || lower.includes('wave3')) {
    return 'Wave 3';
  }
  if (lower.includes('future') || lower.includes('later')) {
    return 'Future';
  }
  
  return 'Backlog';
}

/**
 * Calculate priority score based on warning metadata
 */
function calculatePriority(warning: AllowedWarning): number {
  let priority = 50; // Default medium priority
  
  // Adjust based on impact
  const impact = warning.metadata?.impact;
  if (impact === 'critical') {
    priority += 40;
  } else if (impact === 'high') {
    priority += 25;
  } else if (impact === 'medium') {
    priority += 10;
  } else if (impact === 'low') {
    priority -= 10;
  }
  
  // Adjust based on expiration
  if (warning.expires_at) {
    const daysUntilExpiry = Math.floor(
      (new Date(warning.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    if (daysUntilExpiry < 30) {
      priority += 20; // Expiring soon
    } else if (daysUntilExpiry < 90) {
      priority += 10;
    }
  }
  
  // Clamp to 0-100
  return Math.max(0, Math.min(100, priority));
}

/**
 * Estimate upgrade effort in hours
 */
function estimateUpgradeEffort(warning: AllowedWarning): number {
  const impact = warning.metadata?.impact;
  
  // Base estimates by impact level
  if (impact === 'critical') {
    return 40; // ~1 week
  } else if (impact === 'high') {
    return 16; // ~2 days
  } else if (impact === 'medium') {
    return 8; // ~1 day
  } else {
    return 4; // ~half day
  }
}

/**
 * Map impact level string to metadata impact type
 */
function mapImpactLevel(
  impact?: 'low' | 'medium' | 'high' | 'critical'
): 'Low' | 'Medium' | 'High' | 'Critical' {
  if (!impact) return 'Medium';
  
  const mapping: Record<string, 'Low' | 'Medium' | 'High' | 'Critical'> = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical',
  };
  
  return mapping[impact] || 'Medium';
}

/**
 * Sync allowed warnings to Parking Station
 * Creates or updates entries for all allowed warnings
 */
export async function syncAllowedWarningsToParkingStation(
  allowedWarnings: AllowedWarning[]
): Promise<{ created: number; updated: number; errors: string[] }> {
  const results = {
    created: 0,
    updated: 0,
    errors: [] as string[],
  };

  const parkingStationPath = path.join(
    process.cwd(),
    'memory',
    'foreman',
    'parking-station.json'
  );

  // Load existing parking station entries
  let existingEntries: ParkingStationEntry[] = [];
  if (fs.existsSync(parkingStationPath)) {
    try {
      const content = fs.readFileSync(parkingStationPath, 'utf-8');
      const storage = JSON.parse(content);
      existingEntries = storage.entries || [];
    } catch (error) {
      results.errors.push(`Failed to load parking station: ${error}`);
      return results;
    }
  }

  // Create entries for each allowed warning
  for (const warning of allowedWarnings) {
    try {
      const entry = createDeprecatedDependencyEntry(warning);
      
      // Check if entry already exists
      const existingIndex = existingEntries.findIndex(e => e.id === entry.id);
      
      if (existingIndex >= 0) {
        // Update existing entry
        existingEntries[existingIndex] = {
          ...existingEntries[existingIndex],
          ...entry,
          updatedAt: new Date().toISOString(),
        };
        results.updated++;
      } else {
        // Add new entry
        existingEntries.push(entry);
        results.created++;
      }
    } catch (error) {
      results.errors.push(
        `Failed to create parking station entry for warning ${warning.id}: ${error}`
      );
    }
  }

  // Save updated parking station
  try {
    const dir = path.dirname(parkingStationPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const storage = {
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
      totalEntries: existingEntries.length,
      entries: existingEntries,
    };
    
    fs.writeFileSync(
      parkingStationPath,
      JSON.stringify(storage, null, 2),
      'utf-8'
    );
  } catch (error) {
    results.errors.push(`Failed to save parking station: ${error}`);
  }

  return results;
}
