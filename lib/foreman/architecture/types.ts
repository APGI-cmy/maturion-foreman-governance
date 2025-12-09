/**
 * Architecture Change Request (ACR) Types
 * 
 * Type definitions for the Architecture Change Approval Workflow (CS2)
 */

/**
 * Architecture Change Request Status
 */
export type ACRStatus = 'pending' | 'approved' | 'rejected' | 'discussing';

/**
 * Risk Level for Architecture Changes
 */
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

/**
 * Architecture Change Request
 */
export interface ArchitectureChangeRequest {
  /** Unique ACR identifier (format: ACR-YYYYMMDD-XXXXX) */
  id: string;
  
  /** Current status of the ACR */
  status: ACRStatus;
  
  /** Summary of the proposed change */
  summary: string;
  
  /** Detailed description of the change */
  description: string;
  
  /** Why this change is necessary */
  justification: string;
  
  /** Risk level of the change */
  riskLevel: RiskLevel;
  
  /** Impact analysis */
  impact: {
    /** Affected components/modules */
    affectedComponents: string[];
    
    /** Files that will be changed */
    affectedFiles: string[];
    
    /** Estimated scope of change */
    scope: 'minor' | 'moderate' | 'major';
    
    /** Breaking changes expected */
    breakingChanges: boolean;
    
    /** Migration required */
    migrationRequired: boolean;
  };
  
  /** Alternative approaches considered */
  alternatives: string[];
  
  /** Dependencies and related changes */
  dependencies: {
    /** Other ACRs this depends on */
    dependsOn: string[];
    
    /** Issues this addresses */
    relatedIssues: string[];
    
    /** PRs this will create */
    relatedPRs: string[];
  };
  
  /** Who created this ACR */
  createdBy: string;
  
  /** When this ACR was created */
  createdAt: string;
  
  /** Who approved/rejected this ACR */
  reviewedBy?: string;
  
  /** When this ACR was reviewed */
  reviewedAt?: string;
  
  /** Review comments */
  reviewComments?: string;
  
  /** Build/sequence context */
  context?: {
    buildId?: string;
    sequenceId?: string;
    commitSha?: string;
    branch?: string;
  };
}

/**
 * ACR Creation Options
 */
export interface CreateACROptions {
  /** Summary of the proposed change */
  summary: string;
  
  /** Detailed description */
  description: string;
  
  /** Justification for the change */
  justification: string;
  
  /** Affected files */
  affectedFiles: string[];
  
  /** Affected components */
  affectedComponents?: string[];
  
  /** Risk level */
  riskLevel?: RiskLevel;
  
  /** Alternatives considered */
  alternatives?: string[];
  
  /** Breaking changes? */
  breakingChanges?: boolean;
  
  /** Migration required? */
  migrationRequired?: boolean;
  
  /** Related issues */
  relatedIssues?: string[];
  
  /** Build context */
  buildId?: string;
  sequenceId?: string;
  commitSha?: string;
  branch?: string;
}

/**
 * ACR Approval/Rejection Options
 */
export interface ReviewACROptions {
  /** ACR ID to review */
  acrId: string;
  
  /** Approve or reject */
  decision: 'approve' | 'reject' | 'discuss';
  
  /** Review comments */
  comments?: string;
  
  /** Reviewer identifier */
  reviewedBy: string;
}

/**
 * ACR Query Filters
 */
export interface ACRQueryFilters {
  /** Filter by status */
  status?: ACRStatus | ACRStatus[];
  
  /** Filter by risk level */
  riskLevel?: RiskLevel | RiskLevel[];
  
  /** Filter by affected file pattern */
  filePattern?: string;
  
  /** Filter by component */
  component?: string;
  
  /** Filter by date range */
  createdAfter?: Date;
  createdBefore?: Date;
  
  /** Limit results */
  limit?: number;
}
