/**
 * Architecture Change Request (ACR) Engine
 * 
 * Core engine for creating, storing, and managing Architecture Change Requests.
 * Part of CS2 - Architecture Change Approval Workflow.
 * 
 * This engine enforces the constitutional requirement that:
 * "Foreman may NOT modify architecture without your explicit approval."
 */

import { writeMemory, readMemory } from '../memory/storage';
import { logGovernanceEvent } from '../memory/governance-memory';
import {
  ArchitectureChangeRequest,
  CreateACROptions,
  ACRQueryFilters,
  RiskLevel,
  ACRStatus,
} from './types';
import { analyzeArchitectureImpact } from './file-detector';

// Re-export types for test files
export type { CreateACROptions } from './types';

/**
 * ACR Storage Scope
 * Using 'global' scope as ACRs are system-wide governance artifacts
 */
const ACR_STORAGE_SCOPE = 'global' as const;

/**
 * Generate a unique ACR ID
 */
function generateACRId(): string {
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ACR-${dateStr}-${random}`;
}

/**
 * Determine risk level based on impact analysis
 */
function determineRiskLevel(options: CreateACROptions): RiskLevel {
  // Use provided risk level if available
  if (options.riskLevel) {
    return options.riskLevel;
  }
  
  // Otherwise, analyze based on files and changes
  const impact = analyzeArchitectureImpact(options.affectedFiles);
  return impact.riskLevel;
}

/**
 * Determine scope based on affected files and components
 */
function determineScope(options: CreateACROptions): 'minor' | 'moderate' | 'major' {
  const fileCount = options.affectedFiles.length;
  const componentCount = options.affectedComponents?.length || 0;
  
  if (options.breakingChanges || options.migrationRequired) {
    return 'major';
  }
  
  if (fileCount > 10 || componentCount > 5) {
    return 'major';
  }
  
  if (fileCount > 3 || componentCount > 2) {
    return 'moderate';
  }
  
  return 'minor';
}

/**
 * Create a new Architecture Change Request
 * 
 * This function MUST be called before any architecture modification.
 * It creates an ACR, logs it to governance memory, and returns the ACR
 * for approval workflow.
 */
export async function createACR(options: CreateACROptions): Promise<ArchitectureChangeRequest> {
  const acrId = generateACRId();
  const timestamp = new Date().toISOString();
  
  const riskLevel = determineRiskLevel(options);
  const scope = determineScope(options);
  
  const acr: ArchitectureChangeRequest = {
    id: acrId,
    status: 'pending',
    summary: options.summary,
    description: options.description,
    justification: options.justification,
    riskLevel,
    impact: {
      affectedComponents: options.affectedComponents || [],
      affectedFiles: options.affectedFiles,
      scope,
      breakingChanges: options.breakingChanges || false,
      migrationRequired: options.migrationRequired || false,
    },
    alternatives: options.alternatives || [],
    dependencies: {
      dependsOn: [],
      relatedIssues: options.relatedIssues || [],
      relatedPRs: [],
    },
    createdBy: 'foreman',
    createdAt: timestamp,
    context: {
      buildId: options.buildId,
      sequenceId: options.sequenceId,
      commitSha: options.commitSha,
      branch: options.branch,
    },
  };
  
  // Store ACR in memory fabric
  await writeMemory({
    scope: ACR_STORAGE_SCOPE,
    key: acrId,
    value: acr,
    tags: [
      'acr',
      'architecture_change',
      `status:${acr.status}`,
      `risk:${acr.riskLevel}`,
      `scope:${acr.impact.scope}`,
      ...acr.impact.affectedComponents.map(c => `component:${c}`),
    ],
    createdBy: 'acr_engine',
  });
  
  // Log to governance memory
  await logGovernanceEvent({
    type: 'architecture_change_request_created',
    severity: riskLevel === 'critical' ? 'critical' : riskLevel === 'high' ? 'high' : 'medium',
    description: `Architecture Change Request created: ${acr.summary}`,
    metadata: {
      acrId,
      summary: acr.summary,
      riskLevel: acr.riskLevel,
      affectedFiles: acr.impact.affectedFiles,
      affectedComponents: acr.impact.affectedComponents,
      scope: acr.impact.scope,
      buildId: options.buildId,
      sequenceId: options.sequenceId,
    },
  });
  
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`🏗️  ARCHITECTURE CHANGE REQUEST CREATED`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`ACR ID: ${acrId}`);
  console.log(`Summary: ${acr.summary}`);
  console.log(`Risk Level: ${acr.riskLevel.toUpperCase()}`);
  console.log(`Scope: ${acr.impact.scope}`);
  console.log(`Affected Files: ${acr.impact.affectedFiles.length}`);
  console.log(`Status: PENDING APPROVAL`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  
  return acr;
}

/**
 * Get an ACR by ID
 */
export async function getACR(acrId: string): Promise<ArchitectureChangeRequest | null> {
  const result = await readMemory({
    scope: ACR_STORAGE_SCOPE,
    key: acrId,
  });
  
  if (result.entries.length === 0) {
    return null;
  }
  
  return result.entries[0].value as ArchitectureChangeRequest;
}

/**
 * Query ACRs based on filters
 */
export async function queryACRs(filters?: ACRQueryFilters): Promise<ArchitectureChangeRequest[]> {
  // Query all ACRs from global scope with 'acr' tag
  const result = await readMemory({
    scope: ACR_STORAGE_SCOPE,
    tags: ['acr'],
  });
  
  let acrs: ArchitectureChangeRequest[] = result.entries.map(e => e.value as ArchitectureChangeRequest);
  
  // Apply filters if provided
  if (filters) {
    // Filter by status
    if (filters.status) {
      const statuses = Array.isArray(filters.status) ? filters.status : [filters.status];
      acrs = acrs.filter(acr => statuses.includes(acr.status));
    }
    
    // Filter by risk level
    if (filters.riskLevel) {
      const riskLevels = Array.isArray(filters.riskLevel) ? filters.riskLevel : [filters.riskLevel];
      acrs = acrs.filter(acr => riskLevels.includes(acr.riskLevel));
    }
    
    // Filter by file pattern
    if (filters.filePattern) {
      const pattern = new RegExp(filters.filePattern);
      acrs = acrs.filter(acr => 
        acr.impact.affectedFiles.some(file => pattern.test(file))
      );
    }
    
    // Filter by component
    if (filters.component) {
      acrs = acrs.filter(acr =>
        acr.impact.affectedComponents.includes(filters.component!)
      );
    }
    
    // Filter by date range
    if (filters.createdAfter) {
      acrs = acrs.filter(acr => new Date(acr.createdAt) >= filters.createdAfter!);
    }
    
    if (filters.createdBefore) {
      acrs = acrs.filter(acr => new Date(acr.createdAt) <= filters.createdBefore!);
    }
    
    // Apply limit
    if (filters.limit) {
      acrs = acrs.slice(0, filters.limit);
    }
  }
  
  return acrs;
}

/**
 * Get all pending ACRs
 */
export async function getPendingACRs(): Promise<ArchitectureChangeRequest[]> {
  return queryACRs({ status: 'pending' });
}

/**
 * Check if an ACR is approved
 */
export async function isACRApproved(acrId: string): Promise<boolean> {
  const acr = await getACR(acrId);
  return acr?.status === 'approved';
}

/**
 * Check if there are any pending ACRs for specific files
 */
export async function hasPendingACRForFiles(files: string[]): Promise<{
  hasPending: boolean;
  pendingACRs: ArchitectureChangeRequest[];
}> {
  const pending = await getPendingACRs();
  
  // Check if any pending ACR affects these files
  const matchingACRs = pending.filter(acr => {
    return acr.impact.affectedFiles.some(file => files.includes(file));
  });
  
  return {
    hasPending: matchingACRs.length > 0,
    pendingACRs: matchingACRs,
  };
}

/**
 * Validate that architecture changes have approved ACR
 * 
 * This is the key enforcement function that MUST be called before
 * any architecture modification or PR creation.
 */
export async function validateArchitectureChangeApproval(
  files: string[],
  acrId?: string
): Promise<{
  approved: boolean;
  reason: string;
  requiredACR?: string;
  existingACR?: ArchitectureChangeRequest;
}> {
  // If ACR ID is provided, verify it's approved
  if (acrId) {
    const acr = await getACR(acrId);
    
    if (!acr) {
      return {
        approved: false,
        reason: `ACR ${acrId} not found`,
      };
    }
    
    if (acr.status !== 'approved') {
      return {
        approved: false,
        reason: `ACR ${acrId} is not approved (status: ${acr.status})`,
        existingACR: acr,
      };
    }
    
    // Verify the ACR covers these files
    const acrCoversFiles = files.every(file =>
      acr.impact.affectedFiles.includes(file)
    );
    
    if (!acrCoversFiles) {
      return {
        approved: false,
        reason: `ACR ${acrId} does not cover all affected files`,
        existingACR: acr,
      };
    }
    
    return {
      approved: true,
      reason: `ACR ${acrId} is approved and covers all affected files`,
      existingACR: acr,
    };
  }
  
  // No ACR provided - check if there are pending ACRs for these files
  const { hasPending, pendingACRs } = await hasPendingACRForFiles(files);
  
  if (hasPending && pendingACRs.length > 0) {
    return {
      approved: false,
      reason: `Pending ACR exists for these files: ${pendingACRs.map(a => a.id).join(', ')}`,
      requiredACR: pendingACRs[0].id,
      existingACR: pendingACRs[0],
    };
  }
  
  // No ACR exists - one must be created
  return {
    approved: false,
    reason: 'No approved ACR found for these architecture files. ACR must be created and approved.',
  };
}
