/**
 * CS4 Alert Storage
 * 
 * Handles persistence and retrieval of alerts to/from JSON files.
 * 
 * Storage Structure:
 * - memory/alerts/{alert_id}.json - Individual alert files
 * - memory/alerts/index.json - Alert index for quick queries
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { Alert, AlertFilter, AlertCategory } from './alert-model';

// ============================================================================
// Storage Configuration
// ============================================================================

const ALERTS_DIR = path.join(process.cwd(), 'memory', 'alerts');
const INDEX_FILE = path.join(ALERTS_DIR, 'index.json');

interface AlertIndex {
  alerts: {
    id: string;
    category: AlertCategory;
    type: string;
    severity: number;
    state: string;
    timestamp: string;
  }[];
  lastUpdated: string;
}

// ============================================================================
// Storage Functions
// ============================================================================

/**
 * Ensure alerts directory exists
 */
async function ensureAlertsDir(): Promise<void> {
  try {
    await fs.mkdir(ALERTS_DIR, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
}

/**
 * Load alert index
 */
async function loadIndex(): Promise<AlertIndex> {
  try {
    const content = await fs.readFile(INDEX_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    // Index doesn't exist yet, return empty
    return {
      alerts: [],
      lastUpdated: new Date().toISOString(),
    };
  }
}

/**
 * Save alert index
 */
async function saveIndex(index: AlertIndex): Promise<void> {
  await ensureAlertsDir();
  index.lastUpdated = new Date().toISOString();
  await fs.writeFile(INDEX_FILE, JSON.stringify(index, null, 2), 'utf-8');
}

/**
 * Update index with alert
 */
async function updateIndex(alert: Alert): Promise<void> {
  const index = await loadIndex();
  
  // Remove existing entry if present
  index.alerts = index.alerts.filter(a => a.id !== alert.id);
  
  // Add updated entry
  index.alerts.push({
    id: alert.id,
    category: alert.category,
    type: alert.type,
    severity: alert.severity,
    state: alert.state,
    timestamp: alert.timestamp,
  });
  
  await saveIndex(index);
}

/**
 * Remove alert from index
 */
async function removeFromIndex(alertId: string): Promise<void> {
  const index = await loadIndex();
  index.alerts = index.alerts.filter(a => a.id !== alertId);
  await saveIndex(index);
}

/**
 * Save alert to persistent storage
 */
export async function saveAlert(alert: Alert): Promise<void> {
  await ensureAlertsDir();
  
  const filePath = path.join(ALERTS_DIR, `${alert.id}.json`);
  await fs.writeFile(filePath, JSON.stringify(alert, null, 2), 'utf-8');
  
  // Update index
  await updateIndex(alert);
}

/**
 * Load alert by ID
 */
export async function loadAlert(alertId: string): Promise<Alert | null> {
  try {
    const filePath = path.join(ALERTS_DIR, `${alertId}.json`);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    // Alert doesn't exist
    return null;
  }
}

/**
 * List all alerts with optional filtering
 */
export async function listAlerts(filter?: AlertFilter): Promise<Alert[]> {
  const index = await loadIndex();
  let alertIds = index.alerts.map(a => a.id);
  
  // Apply filters using index for efficiency
  if (filter?.category) {
    alertIds = index.alerts
      .filter(a => a.category === filter.category)
      .map(a => a.id);
  }
  
  if (filter?.type) {
    alertIds = index.alerts
      .filter(a => a.type === filter.type)
      .map(a => a.id);
  }
  
  if (filter?.state) {
    alertIds = index.alerts
      .filter(a => a.state === filter.state)
      .map(a => a.id);
  }
  
  // Load full alerts
  const alerts: Alert[] = [];
  for (const id of alertIds) {
    const alert = await loadAlert(id);
    if (alert) {
      // Apply time-based filters
      if (filter?.since && new Date(alert.timestamp) < filter.since) continue;
      if (filter?.until && new Date(alert.timestamp) > filter.until) continue;
      
      alerts.push(alert);
    }
  }
  
  // Sort by timestamp descending (newest first)
  alerts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  // Apply limit
  if (filter?.limit) {
    return alerts.slice(0, filter.limit);
  }
  
  return alerts;
}

/**
 * Get active alerts (not dismissed)
 */
export async function getActiveAlerts(): Promise<Alert[]> {
  const index = await loadIndex();
  const activeIds = index.alerts
    .filter(a => a.state !== 'dismissed')
    .map(a => a.id);
  
  const alerts: Alert[] = [];
  for (const id of activeIds) {
    const alert = await loadAlert(id);
    if (alert) {
      alerts.push(alert);
    }
  }
  
  // Sort by timestamp descending
  alerts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  return alerts;
}

/**
 * Get acknowledged alerts
 */
export async function getAcknowledgedAlerts(): Promise<Alert[]> {
  return listAlerts({ state: 'acknowledged' });
}

/**
 * Get dismissed alerts
 */
export async function getDismissedAlerts(): Promise<Alert[]> {
  return listAlerts({ state: 'dismissed' });
}

/**
 * Get alerts by category
 */
export async function getAlertsByCategory(category: AlertCategory): Promise<Alert[]> {
  return listAlerts({ category });
}

/**
 * Get high-severity alerts (severity >= 4)
 */
export async function getCriticalAlerts(): Promise<Alert[]> {
  const allAlerts = await listAlerts();
  return allAlerts.filter(a => a.severity >= 4);
}

/**
 * Update alert in storage
 */
export async function updateAlert(alert: Alert): Promise<void> {
  await saveAlert(alert);
}

/**
 * Delete alert from storage
 */
export async function deleteAlert(alertId: string): Promise<void> {
  const filePath = path.join(ALERTS_DIR, `${alertId}.json`);
  
  try {
    await fs.unlink(filePath);
    await removeFromIndex(alertId);
  } catch (error) {
    // Alert might not exist
  }
}

/**
 * Get alert count by state
 */
export async function getAlertCounts(): Promise<Record<string, number>> {
  const index = await loadIndex();
  
  const counts: Record<string, number> = {
    active: 0,
    acknowledged: 0,
    dismissed: 0,
    escalated: 0,
  };
  
  for (const alert of index.alerts) {
    counts[alert.state] = (counts[alert.state] || 0) + 1;
  }
  
  return counts;
}

/**
 * Archive old alerts (move to monthly directory)
 */
export async function archiveOldAlerts(retentionDays: number = 90): Promise<number> {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
  
  const allAlerts = await listAlerts();
  let archivedCount = 0;
  
  for (const alert of allAlerts) {
    if (new Date(alert.timestamp) < cutoffDate && alert.state === 'dismissed') {
      // Move to archive (for now, just delete)
      await deleteAlert(alert.id);
      archivedCount++;
    }
  }
  
  return archivedCount;
}
