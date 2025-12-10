/**
 * CS4 Alert Data Model
 * 
 * Defines core alert types and model functions for the governance alert system.
 * 
 * Constitutional Requirements:
 * - All alerts must be auditable
 * - Critical alerts must be unbypassable
 * - Alert state transitions must be tracked
 */

// ============================================================================
// Type Definitions
// ============================================================================

export type AlertSeverity = 1 | 2 | 3 | 4 | 5;

export type AlertCategory =
  | 'qiel'
  | 'drift'
  | 'guardrail'
  | 'pr'
  | 'qa'
  | 'builder'
  | 'deployment'
  | 'architecture'
  | 'suppression'
  | 'unauthorized';

export type AlertType = 'high' | 'medium' | 'low';

export type AlertState = 'active' | 'acknowledged' | 'dismissed' | 'escalated';

export interface Alert {
  id: string;                          // Unique identifier
  type: AlertType;                     // Priority level
  category: AlertCategory;             // Alert category
  message: string;                     // Human-readable message
  details: string;                     // Detailed diagnostic information
  timestamp: string;                   // ISO 8601 timestamp
  requires_ack: boolean;               // Must be acknowledged before dismissal
  acknowledged_by?: string;            // User ID who acknowledged
  acknowledged_at?: string;            // When acknowledged
  incident_id?: string;                // Linked incident ID (CS3)
  severity: AlertSeverity;             // 1-5 scale (5 = most critical)
  sound: boolean;                      // Play sound notification
  metadata?: Record<string, any>;      // Additional context
  state: AlertState;                   // Current state
  dismissed_at?: string;               // When dismissed
  dismissed_by?: string;               // Who dismissed
}

export interface AlertFilter {
  category?: AlertCategory;
  type?: AlertType;
  state?: AlertState;
  since?: Date;
  until?: Date;
  limit?: number;
}

// ============================================================================
// Model Functions
// ============================================================================

/**
 * Create a new alert with auto-generated ID and timestamp
 */
export function createAlert(params: {
  type: AlertType;
  category: AlertCategory;
  message: string;
  details: string;
  severity: AlertSeverity;
  requires_ack?: boolean;
  sound?: boolean;
  metadata?: Record<string, any>;
}): Alert {
  const now = new Date().toISOString();
  const id = `alert_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

  // Determine defaults based on severity
  const requiresAck = params.requires_ack !== undefined 
    ? params.requires_ack 
    : params.severity >= 3; // Medium and high severity require acknowledgment

  const sound = params.sound !== undefined
    ? params.sound
    : params.severity >= 4; // High severity (4-5) plays sound by default

  return {
    id,
    type: params.type,
    category: params.category,
    message: params.message,
    details: params.details,
    timestamp: now,
    requires_ack: requiresAck,
    severity: params.severity,
    sound,
    metadata: params.metadata,
    state: 'active',
  };
}

/**
 * Acknowledge an alert
 */
export function acknowledgeAlert(alert: Alert, userId: string): Alert {
  return {
    ...alert,
    state: 'acknowledged',
    acknowledged_by: userId,
    acknowledged_at: new Date().toISOString(),
  };
}

/**
 * Dismiss an alert (only if acknowledged or not requiring acknowledgment)
 */
export function dismissAlert(alert: Alert, userId: string): Alert {
  // Validate: Cannot dismiss if requires_ack and not acknowledged
  if (alert.requires_ack && alert.state !== 'acknowledged') {
    const error = new Error('Alert must be acknowledged before dismissal');
    (error as any).code = 'ALERT_REQUIRES_ACKNOWLEDGMENT';
    throw error;
  }

  return {
    ...alert,
    state: 'dismissed',
    dismissed_by: userId,
    dismissed_at: new Date().toISOString(),
  };
}

/**
 * Escalate alert to incident (CS3 integration)
 */
export function escalateToIncident(alert: Alert, incidentId: string): Alert {
  return {
    ...alert,
    state: 'escalated',
    incident_id: incidentId,
  };
}

/**
 * Validate alert severity
 */
export function isValidSeverity(severity: number): severity is AlertSeverity {
  return severity >= 1 && severity <= 5;
}

/**
 * Validate alert category
 */
export function isValidCategory(category: string): category is AlertCategory {
  const validCategories: AlertCategory[] = [
    'qiel',
    'drift',
    'guardrail',
    'pr',
    'qa',
    'builder',
    'deployment',
    'architecture',
    'suppression',
    'unauthorized',
  ];
  return validCategories.includes(category as AlertCategory);
}

/**
 * Validate alert type
 */
export function isValidType(type: string): type is AlertType {
  return type === 'high' || type === 'medium' || type === 'low';
}

/**
 * Get alert priority display text
 */
export function getAlertPriorityText(alert: Alert): string {
  const priorities = {
    5: 'CRITICAL',
    4: 'HIGH',
    3: 'MEDIUM',
    2: 'LOW',
    1: 'INFO',
  };
  return priorities[alert.severity] || 'UNKNOWN';
}

/**
 * Determine if alert should play sound
 */
export function shouldPlaySound(alert: Alert): boolean {
  return alert.sound && alert.state === 'active';
}

/**
 * Determine if alert can be dismissed
 */
export function canDismiss(alert: Alert): boolean {
  if (alert.state === 'dismissed') return false;
  if (!alert.requires_ack) return true;
  return alert.state === 'acknowledged';
}

/**
 * Determine if alert can be acknowledged
 */
export function canAcknowledge(alert: Alert): boolean {
  return alert.state === 'active';
}

/**
 * Get alert age in minutes
 */
export function getAlertAgeMinutes(alert: Alert): number {
  const now = new Date();
  const timestamp = new Date(alert.timestamp);
  return Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
}

/**
 * Format alert for display
 */
export function formatAlertSummary(alert: Alert): string {
  const priority = getAlertPriorityText(alert);
  const age = getAlertAgeMinutes(alert);
  const ageText = age < 60 ? `${age}m ago` : `${Math.floor(age / 60)}h ago`;
  return `[${priority}] ${alert.category.toUpperCase()}: ${alert.message} (${ageText})`;
}
