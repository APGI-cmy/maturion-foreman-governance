/**
 * Governance Memory Service
 * 
 * Logs all governance events, escalations, and compliance actions to an in-memory store.
 * In production, this would persist to a database or external logging service.
 */

export interface GovernanceEvent {
  id?: string;
  timestamp?: string;
  type: string;
  severity: 'info' | 'low' | 'medium' | 'high' | 'critical';
  description: string;
  metadata?: any;
}

/**
 * In-memory governance event store
 * In production, this would be replaced with database persistence
 */
const governanceEvents: GovernanceEvent[] = [];

/**
 * Log an event to governance memory
 */
export async function logGovernanceEvent(event: GovernanceEvent): Promise<void> {
  const fullEvent: GovernanceEvent = {
    id: event.id || `gov_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
    timestamp: event.timestamp || new Date().toISOString(),
    ...event,
  };

  governanceEvents.push(fullEvent);

  // Also log to console for visibility
  const severity = fullEvent.severity.toUpperCase();
  console.log(`[GOVERNANCE ${severity}] ${fullEvent.type}: ${fullEvent.description}`);
  
  if (fullEvent.metadata) {
    console.log('  Metadata:', JSON.stringify(fullEvent.metadata, null, 2));
  }

  // In production, persist to database
  // await persistToDatabase(fullEvent);
}

/**
 * Query governance events
 */
export function queryGovernanceEvents(filters?: {
  type?: string;
  severity?: string;
  since?: Date;
  until?: Date;
  limit?: number;
}): GovernanceEvent[] {
  let results = [...governanceEvents];

  if (filters?.type) {
    results = results.filter(e => e.type === filters.type);
  }

  if (filters?.severity) {
    results = results.filter(e => e.severity === filters.severity);
  }

  if (filters?.since) {
    results = results.filter(e => new Date(e.timestamp!) >= filters.since!);
  }

  if (filters?.until) {
    results = results.filter(e => new Date(e.timestamp!) <= filters.until!);
  }

  // Sort by timestamp descending (newest first)
  results.sort((a, b) => new Date(b.timestamp!).getTime() - new Date(a.timestamp!).getTime());

  if (filters?.limit) {
    results = results.slice(0, filters.limit);
  }

  return results;
}

/**
 * Get recent governance events
 */
export function getRecentGovernanceEvents(limit: number = 50): GovernanceEvent[] {
  return governanceEvents
    .slice(-limit)
    .reverse(); // newest first
}

/**
 * Clear governance events (for testing)
 */
export function clearGovernanceEvents(): void {
  governanceEvents.length = 0;
}

/**
 * Get governance event statistics
 */
export function getGovernanceStats(): {
  total: number;
  bySeverity: Record<string, number>;
  byType: Record<string, number>;
} {
  const bySeverity: Record<string, number> = {};
  const byType: Record<string, number> = {};

  for (const event of governanceEvents) {
    bySeverity[event.severity] = (bySeverity[event.severity] || 0) + 1;
    byType[event.type] = (byType[event.type] || 0) + 1;
  }

  return {
    total: governanceEvents.length,
    bySeverity,
    byType,
  };
}
