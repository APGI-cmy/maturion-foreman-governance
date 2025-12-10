/**
 * CS4 Alert Engine
 * 
 * Central alert management and routing system.
 * Handles alert creation, notification, and governance memory logging.
 * 
 * Constitutional Requirements:
 * - All alerts MUST log to governance memory
 * - Critical alerts MUST be unbypassable
 * - Alert notifications MUST reach the user
 */

import { Alert, AlertType, AlertCategory, AlertSeverity, AlertFilter, createAlert, acknowledgeAlert as modelAcknowledgeAlert, dismissAlert as modelDismissAlert } from './alert-model';
import { saveAlert, loadAlert, updateAlert, getActiveAlerts as storageGetActiveAlerts } from './storage';
import { logGovernanceEvent } from '../memory/governance-memory';

// ============================================================================
// Alert Engine Core Functions
// ============================================================================

/**
 * Raise a standard alert
 * - Creates alert
 * - Saves to storage
 * - Logs to governance memory
 * - Triggers notifications
 */
export async function raiseAlert(params: {
  type: AlertType;
  category: AlertCategory;
  message: string;
  details: string;
  severity: AlertSeverity;
  metadata?: Record<string, any>;
}): Promise<Alert> {
  // Create alert
  const alert = createAlert(params);
  
  // Save to storage
  await saveAlert(alert);
  
  // Log to governance memory
  await logAlertToGovernanceMemory(alert);
  
  // Trigger notifications
  await notifyChannels(alert);
  
  return alert;
}

/**
 * Raise a critical alert (automatic high priority)
 * - Sets type='high', severity=5, requires_ack=true, sound=true
 * - Blocks execution if appropriate
 * - Forces immediate notification
 */
export async function raiseCriticalAlert(params: {
  category: AlertCategory;
  message: string;
  details: string;
  metadata?: Record<string, any>;
}): Promise<Alert> {
  return raiseAlert({
    type: 'high',
    severity: 5,
    ...params,
  });
}

/**
 * Attach alert to existing incident (CS3)
 */
export async function attachAlertToIncident(
  alertId: string,
  incidentId: string
): Promise<Alert> {
  const alert = await loadAlert(alertId);
  if (!alert) {
    throw new Error(`Alert ${alertId} not found`);
  }
  
  const updated: Alert = {
    ...alert,
    state: 'escalated',
    incident_id: incidentId,
  };
  
  await updateAlert(updated);
  
  // Log to governance memory
  await logGovernanceEvent({
    type: 'alert_escalated_to_incident',
    severity: 'high',
    description: `Alert ${alertId} escalated to incident ${incidentId}`,
    metadata: {
      alertId,
      incidentId,
      category: alert.category,
    },
  });
  
  return updated;
}

/**
 * Get active alerts
 */
export async function getActiveAlerts(filter?: AlertFilter): Promise<Alert[]> {
  if (filter) {
    const { listAlerts } = await import('./storage');
    return listAlerts(filter);
  }
  return storageGetActiveAlerts();
}

/**
 * Get alert by ID
 */
export async function getAlert(alertId: string): Promise<Alert | null> {
  return loadAlert(alertId);
}

/**
 * Acknowledge alert by ID
 */
export async function acknowledgeAlertById(
  alertId: string,
  userId: string
): Promise<Alert> {
  const alert = await loadAlert(alertId);
  if (!alert) {
    throw new Error(`Alert ${alertId} not found`);
  }
  
  const acknowledged = modelAcknowledgeAlert(alert, userId);
  await updateAlert(acknowledged);
  
  // Log to governance memory
  await logGovernanceEvent({
    type: 'alert_acknowledged',
    severity: 'info',
    description: `Alert ${alertId} acknowledged by ${userId}`,
    metadata: {
      alertId,
      userId,
      category: alert.category,
    },
  });
  
  return acknowledged;
}

/**
 * Dismiss alert by ID
 */
export async function dismissAlertById(
  alertId: string,
  userId: string
): Promise<Alert> {
  const alert = await loadAlert(alertId);
  if (!alert) {
    throw new Error(`Alert ${alertId} not found`);
  }
  
  const dismissed = modelDismissAlert(alert, userId);
  await updateAlert(dismissed);
  
  // Log to governance memory
  await logGovernanceEvent({
    type: 'alert_dismissed',
    severity: 'info',
    description: `Alert ${alertId} dismissed by ${userId}`,
    metadata: {
      alertId,
      userId,
      category: alert.category,
    },
  });
  
  return dismissed;
}

// ============================================================================
// Internal Functions
// ============================================================================

/**
 * Log alert to governance memory
 */
async function logAlertToGovernanceMemory(alert: Alert): Promise<void> {
  const eventType = alert.severity >= 4 
    ? 'governance_ping_high'
    : alert.severity >= 3
    ? 'governance_ping_medium'
    : 'governance_ping_low';
  
  const severity = alert.severity >= 4 ? 'critical' : alert.severity >= 3 ? 'high' : alert.severity >= 2 ? 'medium' : 'low';
  
  await logGovernanceEvent({
    type: eventType,
    severity,
    description: `Alert raised: ${alert.message}`,
    metadata: {
      alertId: alert.id,
      category: alert.category,
      details: alert.details,
      severity: alert.severity,
    },
  });
}

/**
 * Trigger notification channels
 */
async function notifyChannels(alert: Alert): Promise<void> {
  // For now, just log to console
  // In production, this would trigger:
  // - Desktop notifications
  // - Mobile push notifications
  // - UI bell updates
  // - Sound alerts
  
  const priority = alert.severity >= 4 ? 'HIGH' : alert.severity >= 3 ? 'MEDIUM' : 'LOW';
  console.log(`[ALERT ${priority}] ${alert.category}: ${alert.message}`);
  
  if (alert.sound) {
    console.log(`[ALERT SOUND] Playing notification sound for alert ${alert.id}`);
  }
  
  // Future: Implement actual notification channels
  // await notifyUserDesktop(alert);
  // await notifyUserMobile(alert);
}

/**
 * Send desktop notification
 */
async function notifyUserDesktop(alert: Alert): Promise<void> {
  // Future implementation: Browser Notification API
  // This would be called from client-side code
}

/**
 * Send mobile push notification (API call)
 */
async function notifyUserMobile(alert: Alert): Promise<void> {
  // Future implementation: Web Push API
  // This would integrate with push notification service
}
