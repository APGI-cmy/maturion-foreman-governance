/**
 * Architecture Change Approval Workflow
 * 
 * Manages the approval workflow for Architecture Change Requests.
 * Part of CS2 - Architecture Change Approval Workflow.
 * 
 * This workflow enforces:
 * - Only the Owner may approve or reject ACRs
 * - Foreman must not continue unless approval is received
 * - All approvals are permanently logged
 */

import { writeMemory } from '../memory/storage';
import { logGovernanceEvent } from '../memory/governance-memory';
import {
  ArchitectureChangeRequest,
  ReviewACROptions,
  ACRStatus,
} from './types';
import { getACR } from './acr-engine';

/**
 * ACR Storage Scope
 * Using 'global' scope as ACRs are system-wide governance artifacts
 */
const ACR_STORAGE_SCOPE = 'global' as const;

/**
 * Approve an Architecture Change Request
 * 
 * Only the Owner (you) may approve ACRs.
 * This function updates the ACR status, logs the approval,
 * and returns the updated ACR.
 */
export async function approveACR(options: ReviewACROptions): Promise<{
  success: boolean;
  acr?: ArchitectureChangeRequest;
  error?: string;
}> {
  const { acrId, comments, reviewedBy } = options;
  
  // Retrieve the ACR
  const acr = await getACR(acrId);
  
  if (!acr) {
    return {
      success: false,
      error: `ACR ${acrId} not found`,
    };
  }
  
  if (acr.status === 'approved') {
    return {
      success: false,
      error: `ACR ${acrId} is already approved`,
      acr,
    };
  }
  
  // Update ACR status
  const updatedACR: ArchitectureChangeRequest = {
    ...acr,
    status: 'approved',
    reviewedBy,
    reviewedAt: new Date().toISOString(),
    reviewComments: comments,
  };
  
  // Store updated ACR
  await writeMemory({
    scope: ACR_STORAGE_SCOPE,
    key: acrId,
    value: updatedACR,
    tags: [
      'acr',
      'architecture_change',
      'status:approved',
      `risk:${updatedACR.riskLevel}`,
      `scope:${updatedACR.impact.scope}`,
      ...updatedACR.impact.affectedComponents.map(c => `component:${c}`),
    ],
    createdBy: 'approval_workflow',
  });
  
  // Log to governance memory
  await logGovernanceEvent({
    type: 'architecture_change_request_approved',
    severity: 'info',
    description: `Architecture Change Request approved: ${acr.summary}`,
    metadata: {
      acrId,
      summary: acr.summary,
      riskLevel: acr.riskLevel,
      reviewedBy,
      reviewComments: comments,
      affectedFiles: acr.impact.affectedFiles,
      affectedComponents: acr.impact.affectedComponents,
    },
  });
  
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ ARCHITECTURE CHANGE REQUEST APPROVED`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`ACR ID: ${acrId}`);
  console.log(`Summary: ${acr.summary}`);
  console.log(`Reviewed By: ${reviewedBy}`);
  if (comments) {
    console.log(`Comments: ${comments}`);
  }
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  
  return {
    success: true,
    acr: updatedACR,
  };
}

/**
 * Reject an Architecture Change Request
 * 
 * Only the Owner (you) may reject ACRs.
 * This function updates the ACR status, logs the rejection,
 * and returns the updated ACR.
 */
export async function rejectACR(options: ReviewACROptions): Promise<{
  success: boolean;
  acr?: ArchitectureChangeRequest;
  error?: string;
}> {
  const { acrId, comments, reviewedBy } = options;
  
  // Retrieve the ACR
  const acr = await getACR(acrId);
  
  if (!acr) {
    return {
      success: false,
      error: `ACR ${acrId} not found`,
    };
  }
  
  if (acr.status === 'rejected') {
    return {
      success: false,
      error: `ACR ${acrId} is already rejected`,
      acr,
    };
  }
  
  // Update ACR status
  const updatedACR: ArchitectureChangeRequest = {
    ...acr,
    status: 'rejected',
    reviewedBy,
    reviewedAt: new Date().toISOString(),
    reviewComments: comments,
  };
  
  // Store updated ACR
  await writeMemory({
    scope: ACR_STORAGE_SCOPE,
    key: acrId,
    value: updatedACR,
    tags: [
      'acr',
      'architecture_change',
      'status:rejected',
      `risk:${updatedACR.riskLevel}`,
      `scope:${updatedACR.impact.scope}`,
      ...updatedACR.impact.affectedComponents.map(c => `component:${c}`),
    ],
    createdBy: 'approval_workflow',
  });
  
  // Log to governance memory
  await logGovernanceEvent({
    type: 'architecture_change_request_rejected',
    severity: 'high',
    description: `Architecture Change Request rejected: ${acr.summary}`,
    metadata: {
      acrId,
      summary: acr.summary,
      riskLevel: acr.riskLevel,
      reviewedBy,
      reviewComments: comments,
      affectedFiles: acr.impact.affectedFiles,
      affectedComponents: acr.impact.affectedComponents,
    },
  });
  
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`❌ ARCHITECTURE CHANGE REQUEST REJECTED`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`ACR ID: ${acrId}`);
  console.log(`Summary: ${acr.summary}`);
  console.log(`Reviewed By: ${reviewedBy}`);
  if (comments) {
    console.log(`Rejection Reason: ${comments}`);
  }
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  
  return {
    success: true,
    acr: updatedACR,
  };
}

/**
 * Mark an ACR for discussion
 * 
 * Sets the ACR status to 'discussing' and triggers
 * a notification to route context to chat interface.
 */
export async function discussACR(options: ReviewACROptions): Promise<{
  success: boolean;
  acr?: ArchitectureChangeRequest;
  error?: string;
}> {
  const { acrId, comments, reviewedBy } = options;
  
  // Retrieve the ACR
  const acr = await getACR(acrId);
  
  if (!acr) {
    return {
      success: false,
      error: `ACR ${acrId} not found`,
    };
  }
  
  // Update ACR status
  const updatedACR: ArchitectureChangeRequest = {
    ...acr,
    status: 'discussing',
    reviewedBy,
    reviewedAt: new Date().toISOString(),
    reviewComments: comments,
  };
  
  // Store updated ACR
  await writeMemory({
    scope: ACR_STORAGE_SCOPE,
    key: acrId,
    value: updatedACR,
    tags: [
      'acr',
      'architecture_change',
      'status:discussing',
      `risk:${updatedACR.riskLevel}`,
      `scope:${updatedACR.impact.scope}`,
      ...updatedACR.impact.affectedComponents.map(c => `component:${c}`),
    ],
    createdBy: 'approval_workflow',
  });
  
  // Log to governance memory
  await logGovernanceEvent({
    type: 'architecture_change_request_discussed',
    severity: 'medium',
    description: `Architecture Change Request marked for discussion: ${acr.summary}`,
    metadata: {
      acrId,
      summary: acr.summary,
      riskLevel: acr.riskLevel,
      reviewedBy,
      reviewComments: comments,
      affectedFiles: acr.impact.affectedFiles,
      affectedComponents: acr.impact.affectedComponents,
    },
  });
  
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`💬 ARCHITECTURE CHANGE REQUEST - DISCUSSION REQUESTED`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`ACR ID: ${acrId}`);
  console.log(`Summary: ${acr.summary}`);
  console.log(`Reviewed By: ${reviewedBy}`);
  if (comments) {
    console.log(`Discussion Request: ${comments}`);
  }
  console.log(`Please navigate to /foreman to discuss this ACR with Foreman`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  
  return {
    success: true,
    acr: updatedACR,
  };
}

/**
 * Process an ACR review decision
 * 
 * Unified function that handles approve/reject/discuss based on decision.
 */
export async function reviewACR(options: ReviewACROptions): Promise<{
  success: boolean;
  acr?: ArchitectureChangeRequest;
  error?: string;
}> {
  switch (options.decision) {
    case 'approve':
      return approveACR(options);
    case 'reject':
      return rejectACR(options);
    case 'discuss':
      return discussACR(options);
    default:
      return {
        success: false,
        error: `Invalid decision: ${options.decision}`,
      };
  }
}

/**
 * Send notification for pending ACR
 * 
 * In a full implementation, this would:
 * - Send email/slack notification
 * - Create UI alert
 * - Update dashboard
 * 
 * For now, this logs to console and governance memory.
 */
export async function notifyPendingACR(acr: ArchitectureChangeRequest): Promise<void> {
  await logGovernanceEvent({
    type: 'architecture_change_notification_sent',
    severity: acr.riskLevel === 'critical' ? 'critical' : acr.riskLevel === 'high' ? 'high' : 'medium',
    description: `Notification sent for pending ACR: ${acr.summary}`,
    metadata: {
      acrId: acr.id,
      summary: acr.summary,
      riskLevel: acr.riskLevel,
      affectedFiles: acr.impact.affectedFiles,
    },
  });
  
  console.log(`\n⚠️  NOTIFICATION: Architecture Change Request Pending Approval`);
  console.log(`ACR ID: ${acr.id}`);
  console.log(`Summary: ${acr.summary}`);
  console.log(`Risk Level: ${acr.riskLevel}`);
  console.log(`Please review at: /foreman/architecture/alerts\n`);
}

/**
 * Block execution until ACR is approved
 * 
 * This function is used to halt Foreman execution until
 * an ACR receives approval.
 * 
 * WARNING: This is a blocking operation!
 * In production, this would be replaced with an event-driven approach.
 */
export async function waitForACRApproval(
  acrId: string,
  options?: {
    timeoutMs?: number;
    pollIntervalMs?: number;
  }
): Promise<{
  approved: boolean;
  status: ACRStatus;
  acr?: ArchitectureChangeRequest;
}> {
  const timeoutMs = options?.timeoutMs || 3600000; // 1 hour default
  const pollIntervalMs = options?.pollIntervalMs || 5000; // 5 seconds default
  
  const startTime = Date.now();
  
  console.log(`[Approval Workflow] Waiting for ACR ${acrId} approval...`);
  
  while (Date.now() - startTime < timeoutMs) {
    const acr = await getACR(acrId);
    
    if (!acr) {
      return {
        approved: false,
        status: 'pending',
      };
    }
    
    if (acr.status === 'approved') {
      console.log(`[Approval Workflow] ACR ${acrId} approved!`);
      return {
        approved: true,
        status: 'approved',
        acr,
      };
    }
    
    if (acr.status === 'rejected') {
      console.log(`[Approval Workflow] ACR ${acrId} rejected.`);
      return {
        approved: false,
        status: 'rejected',
        acr,
      };
    }
    
    // Wait before polling again
    await new Promise(resolve => setTimeout(resolve, pollIntervalMs));
  }
  
  console.log(`[Approval Workflow] Timeout waiting for ACR ${acrId} approval`);
  
  // Timeout reached
  return {
    approved: false,
    status: 'pending',
  };
}
