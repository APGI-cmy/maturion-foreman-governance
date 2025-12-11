/**
 * CS7 - Autonomy Pilot Log Engine
 * 
 * Records every autonomous action attempted by Foreman:
 * - Whether action was allowed, denied, or escalated
 * - Which constitutional layer intervened
 * - Required approvals
 * - Associated incidents
 * - Builder routing decisions
 * - Model escalation decisions
 * - Execution wave status
 */

import { appendFileSync, existsSync, readFileSync, mkdirSync } from 'fs'
import { join } from 'path'

export interface AutonomyLogEntry {
  timestamp: string
  actionType: string
  decision: 'allowed' | 'denied' | 'escalated'
  constitutionalLayer?: string
  requiredApprovals?: string[]
  associatedIncidents?: string[]
  builderRouting?: {
    builderType: string
    reason: string
  }
  modelEscalation?: {
    from: string
    to: string
    reason: string
  }
  waveStatus?: string
  details: string
  outcome: string
}

export interface AutonomyLogStats {
  totalActions: number
  allowed: number
  denied: number
  escalated: number
  denialRate: number
  escalationRate: number
  recentActions: AutonomyLogEntry[]
}

const LOG_PATH = join(process.cwd(), 'docs', 'autonomy', 'AUTONOMY_PILOT_LOG.md')
const ARCHIVE_DIR = join(process.cwd(), 'docs', 'autonomy', 'archives')

/**
 * Initialize the log file if it doesn't exist
 */
function ensureLogExists(): void {
  const logDir = join(process.cwd(), 'docs', 'autonomy')
  
  if (!existsSync(logDir)) {
    mkdirSync(logDir, { recursive: true })
  }
  
  if (!existsSync(LOG_PATH)) {
    // Create initial log file with header
    const initialContent = `# Autonomy Pilot Log

**Purpose**: Persistent log recording every autonomous action attempted by Foreman.

**Status**: Active  
**Created**: ${new Date().toISOString().split('T')[0]}  
**Last Updated**: ${new Date().toISOString().split('T')[0]}

---

## Log Entries

`
    appendFileSync(LOG_PATH, initialContent, 'utf-8')
  }
}

/**
 * Log an autonomous action
 */
export function logAutonomousAction(entry: AutonomyLogEntry): void {
  ensureLogExists()
  
  const timestamp = entry.timestamp || new Date().toISOString()
  
  // Format the log entry
  const logEntry = `
### ${timestamp} - ${entry.actionType}

**Action**: ${entry.actionType}  
**Decision**: ${entry.decision.toUpperCase()}  
${entry.constitutionalLayer ? `**Constitutional Layer**: ${entry.constitutionalLayer}  \n` : ''}${entry.requiredApprovals && entry.requiredApprovals.length > 0 ? `**Required Approvals**: ${entry.requiredApprovals.join(', ')}  \n` : ''}${entry.associatedIncidents && entry.associatedIncidents.length > 0 ? `**Associated Incidents**: ${entry.associatedIncidents.join(', ')}  \n` : ''}${entry.builderRouting ? `**Builder Routing**: ${entry.builderRouting.builderType} (${entry.builderRouting.reason})  \n` : ''}${entry.modelEscalation ? `**Model Escalation**: ${entry.modelEscalation.from} → ${entry.modelEscalation.to} (${entry.modelEscalation.reason})  \n` : ''}${entry.waveStatus ? `**Wave Status**: ${entry.waveStatus}  \n` : ''}
**Details**: ${entry.details}

**Outcome**: ${entry.outcome}

---
`
  
  // Append to log file
  try {
    appendFileSync(LOG_PATH, logEntry, 'utf-8')
  } catch (error) {
    console.error('Failed to write to autonomy log:', error)
    // Don't throw - logging failures should not break the system
  }
}

/**
 * Get recent log entries
 */
export function getRecentLogEntries(count: number = 10): AutonomyLogEntry[] {
  if (!existsSync(LOG_PATH)) {
    return []
  }
  
  try {
    const content = readFileSync(LOG_PATH, 'utf-8')
    const entries: AutonomyLogEntry[] = []
    
    // Parse log entries (simplified parsing)
    const sections = content.split('### ').slice(1) // Skip header
    
    for (const section of sections.slice(-count)) {
      const lines = section.split('\n')
      if (lines.length < 2) continue
      
      const timestampLine = lines[0]
      const timestamp = timestampLine.split(' - ')[0]
      
      // Extract action type
      const actionType = timestampLine.split(' - ')[1] || 'Unknown'
      
      // Extract decision
      let decision: 'allowed' | 'denied' | 'escalated' = 'allowed'
      const decisionLine = lines.find(l => l.startsWith('**Decision**:'))
      if (decisionLine) {
        const decisionText = decisionLine.toLowerCase()
        if (decisionText.includes('denied')) decision = 'denied'
        else if (decisionText.includes('escalated')) decision = 'escalated'
      }
      
      // Extract details
      const detailsLine = lines.find(l => l.startsWith('**Details**:'))
      const details = detailsLine ? detailsLine.replace('**Details**:', '').trim() : ''
      
      // Extract outcome
      const outcomeLine = lines.find(l => l.startsWith('**Outcome**:'))
      const outcome = outcomeLine ? outcomeLine.replace('**Outcome**:', '').trim() : ''
      
      entries.push({
        timestamp,
        actionType,
        decision,
        details,
        outcome
      })
    }
    
    return entries
  } catch (error) {
    console.error('Failed to read autonomy log:', error)
    return []
  }
}

/**
 * Get log statistics
 */
export function getLogStats(): AutonomyLogStats {
  const recentEntries = getRecentLogEntries(50) // Analyze last 50 entries
  
  const totalActions = recentEntries.length
  const allowed = recentEntries.filter(e => e.decision === 'allowed').length
  const denied = recentEntries.filter(e => e.decision === 'denied').length
  const escalated = recentEntries.filter(e => e.decision === 'escalated').length
  
  return {
    totalActions,
    allowed,
    denied,
    escalated,
    denialRate: totalActions > 0 ? (denied / totalActions) * 100 : 0,
    escalationRate: totalActions > 0 ? (escalated / totalActions) * 100 : 0,
    recentActions: recentEntries.slice(-10) // Last 10 actions
  }
}

/**
 * Check if alerts should be triggered based on log patterns
 */
export function checkLogAlerts(): {
  alerts: string[]
  severity: 'normal' | 'warning' | 'critical'
} {
  const stats = getLogStats()
  const alerts: string[] = []
  let severity: 'normal' | 'warning' | 'critical' = 'normal'
  
  // Alert: High denial rate (> 30%)
  if (stats.denialRate > 30) {
    alerts.push(`High denial rate: ${stats.denialRate.toFixed(1)}% of actions denied`)
    severity = 'warning'
  }
  
  // Alert: Very high denial rate (> 50%)
  if (stats.denialRate > 50) {
    alerts.push(`CRITICAL: Very high denial rate: ${stats.denialRate.toFixed(1)}%`)
    severity = 'critical'
  }
  
  // Alert: High escalation rate (> 20%)
  if (stats.escalationRate > 20) {
    alerts.push(`High escalation rate: ${stats.escalationRate.toFixed(1)}% of actions escalated`)
    if (severity === 'normal') severity = 'warning'
  }
  
  // Alert: Check for repeated escalations of same action
  const recentActions = stats.recentActions
  const actionTypes = recentActions.map(a => a.actionType)
  const escalatedActions = recentActions.filter(a => a.decision === 'escalated')
  
  for (const action of escalatedActions) {
    const count = escalatedActions.filter(a => a.actionType === action.actionType).length
    if (count >= 3) {
      alerts.push(`Action "${action.actionType}" escalated ${count} times - possible systemic issue`)
      severity = 'critical'
    }
  }
  
  return { alerts, severity }
}

/**
 * Rotate log file (monthly rotation)
 */
export function rotateLog(): boolean {
  if (!existsSync(LOG_PATH)) {
    return false
  }
  
  try {
    const now = new Date()
    const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    const archiveDir = join(ARCHIVE_DIR, yearMonth)
    
    // Create archive directory
    if (!existsSync(archiveDir)) {
      mkdirSync(archiveDir, { recursive: true })
    }
    
    // Read current log
    const content = readFileSync(LOG_PATH, 'utf-8')
    
    // Write to archive
    const archivePath = join(archiveDir, `AUTONOMY_PILOT_LOG_${yearMonth}.md`)
    appendFileSync(archivePath, content, 'utf-8')
    
    // Clear current log (keep header only)
    const header = content.split('## Log Entries')[0] + '## Log Entries\n\n'
    appendFileSync(LOG_PATH, header, 'utf-8')
    
    return true
  } catch (error) {
    console.error('Failed to rotate autonomy log:', error)
    return false
  }
}
