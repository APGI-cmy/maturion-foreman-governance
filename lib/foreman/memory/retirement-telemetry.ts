/**
 * Retirement Telemetry Layer
 * 
 * Provides observability and analytics for knowledge retirement:
 * - Retirement history tracking
 * - Storage metrics calculation
 * - Trend analysis
 * - Dashboard integration hooks
 * 
 * Part of Knowledge Retirement System V1.0 (Wave 1B)
 */

import fs from 'fs'
import path from 'path'
import { MemoryScope } from '@/types/memory'
import { RetirementEvent, RetirementReason } from '@/types/retirement'

/**
 * Storage Metrics
 */
export interface StorageMetrics {
  totalStorageBytes: number
  activeMemoryBytes: number
  archivedMemoryBytes: number
  reductionPercentage: number
  projectedGrowth: number // bytes per month
}

/**
 * Retirement Trends
 */
export interface RetirementTrends {
  dailyRetirements: { date: string; count: number }[]
  reasonDistribution: Record<RetirementReason, number>
  averageAgeAtRetirement: number
}

/**
 * Get retirement history from governance events
 */
export async function getRetirementHistory(
  scope?: MemoryScope,
  startDate?: string,
  endDate?: string
): Promise<RetirementEvent[]> {
  const eventLogPath = path.join(process.cwd(), 'memory', 'governance-events.json')
  
  if (!fs.existsSync(eventLogPath)) {
    return []
  }
  
  try {
    const content = fs.readFileSync(eventLogPath, 'utf-8')
    if (!content.trim()) {
      return []
    }
    
    const allEvents = JSON.parse(content)
    
    // Filter to retirement events only
    let retirementEvents = allEvents.filter((e: any) => 
      e.type === 'memory_retirement' && e.action === 'retirement'
    )
    
    // Filter by scope if provided
    if (scope) {
      retirementEvents = retirementEvents.filter((e: any) => e.scope === scope)
    }
    
    // Filter by date range if provided
    if (startDate) {
      const start = new Date(startDate).getTime()
      retirementEvents = retirementEvents.filter((e: any) => 
        new Date(e.timestamp).getTime() >= start
      )
    }
    
    if (endDate) {
      const end = new Date(endDate).getTime()
      retirementEvents = retirementEvents.filter((e: any) => 
        new Date(e.timestamp).getTime() <= end
      )
    }
    
    // Map to RetirementEvent format
    return retirementEvents.map((e: any) => ({
      type: e.action,
      entryId: e.details.entryId,
      scope: e.scope,
      reason: e.details.reason,
      lifecycle: e.details.lifecycle,
      timestamp: e.timestamp,
      actor: e.actor,
      metadata: {
        previousState: e.details.previousState || 'active',
        newState: e.details.newState || e.details.lifecycle,
        archiveLocation: e.details.archiveLocation,
        supersededBy: e.details.supersededBy,
        reviewRequired: e.details.reviewRequired || false
      }
    }))
  } catch (error) {
    console.error('[Telemetry] Error loading retirement history:', error)
    return []
  }
}

/**
 * Calculate storage metrics
 */
export async function calculateStorageMetrics(): Promise<StorageMetrics> {
  const memoryBasePath = path.join(process.cwd(), 'memory')
  const archiveBasePath = path.join(memoryBasePath, 'archive')
  
  // Calculate active memory size
  let activeMemoryBytes = 0
  try {
    activeMemoryBytes = calculateDirectorySize(memoryBasePath, [archiveBasePath])
  } catch (error) {
    console.error('[Telemetry] Error calculating active memory size:', error)
  }
  
  // Calculate archived memory size
  let archivedMemoryBytes = 0
  if (fs.existsSync(archiveBasePath)) {
    try {
      archivedMemoryBytes = calculateDirectorySize(archiveBasePath)
    } catch (error) {
      console.error('[Telemetry] Error calculating archived memory size:', error)
    }
  }
  
  const totalStorageBytes = activeMemoryBytes + archivedMemoryBytes
  const reductionPercentage = totalStorageBytes > 0 
    ? (archivedMemoryBytes / totalStorageBytes) * 100 
    : 0
  
  // Estimate projected growth (simplified)
  const projectedGrowth = await estimateMonthlyGrowth()
  
  return {
    totalStorageBytes,
    activeMemoryBytes,
    archivedMemoryBytes,
    reductionPercentage,
    projectedGrowth
  }
}

/**
 * Helper: Calculate directory size in bytes
 */
function calculateDirectorySize(dirPath: string, excludePaths: string[] = []): number {
  if (!fs.existsSync(dirPath)) {
    return 0
  }
  
  let totalSize = 0
  
  const items = fs.readdirSync(dirPath)
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item)
    
    // Skip excluded paths
    if (excludePaths.some(exclude => itemPath.startsWith(exclude))) {
      continue
    }
    
    const stats = fs.statSync(itemPath)
    
    if (stats.isDirectory()) {
      totalSize += calculateDirectorySize(itemPath, excludePaths)
    } else {
      totalSize += stats.size
    }
  }
  
  return totalSize
}

/**
 * Helper: Estimate monthly growth rate
 */
async function estimateMonthlyGrowth(): Promise<number> {
  // Get retirement history for last 30 days
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  const history = await getRetirementHistory(undefined, thirtyDaysAgo)
  
  if (history.length === 0) {
    return 0 // No data to estimate
  }
  
  // Calculate average bytes per retirement (rough estimate)
  const avgBytesPerEntry = 1024 // 1KB per entry (rough estimate)
  const totalRetired = history.length
  
  // Projected monthly growth (assuming constant rate)
  return totalRetired * avgBytesPerEntry
}

/**
 * Get retirement trends
 */
export async function getRetirementTrends(
  days: number
): Promise<RetirementTrends> {
  // Get history for specified days
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()
  const history = await getRetirementHistory(undefined, startDate)
  
  // Calculate daily retirements
  const dailyMap = new Map<string, number>()
  
  for (const event of history) {
    const date = event.timestamp.split('T')[0] // Get YYYY-MM-DD
    dailyMap.set(date, (dailyMap.get(date) || 0) + 1)
  }
  
  const dailyRetirements = Array.from(dailyMap.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date))
  
  // Calculate reason distribution
  const reasonDistribution: Record<RetirementReason, number> = {
    staleness: 0,
    supersession: 0,
    obsolescence: 0,
    contradiction: 0,
    consolidation: 0,
    manual_review: 0
  }
  
  for (const event of history) {
    const reason = event.reason as RetirementReason
    if (reason in reasonDistribution) {
      reasonDistribution[reason]++
    }
  }
  
  // Calculate average age at retirement
  let totalAge = 0
  let countWithAge = 0
  
  for (const event of history) {
    // Try to extract age from event metadata (if available)
    // This is a simplified version; real implementation would need more data
    // For now, assume average based on reason
    const estimatedAge = estimateAgeByReason(event.reason)
    totalAge += estimatedAge
    countWithAge++
  }
  
  const averageAgeAtRetirement = countWithAge > 0 ? Math.floor(totalAge / countWithAge) : 0
  
  return {
    dailyRetirements,
    reasonDistribution,
    averageAgeAtRetirement
  }
}

/**
 * Helper: Estimate age by reason (fallback when actual age not available)
 */
function estimateAgeByReason(reason: RetirementReason): number {
  switch (reason) {
    case 'staleness':
      return 200 // Typical stale entry age
    case 'supersession':
      return 180 // Typical age when consolidated
    case 'obsolescence':
      return 150 // Typical age for obsolete entries
    case 'contradiction':
      return 120 // Typical age when contradicted
    case 'consolidation':
      return 180
    case 'manual_review':
      return 100
    default:
      return 150 // Default estimate
  }
}

/**
 * Export retirement metrics for dashboard integration
 */
export async function getRetirementDashboardMetrics() {
  const history = await getRetirementHistory()
  const metrics = await calculateStorageMetrics()
  const trends = await getRetirementTrends(30) // Last 30 days
  
  return {
    totalRetirements: history.length,
    storageMetrics: metrics,
    trends,
    lastRetirement: history.length > 0 
      ? history[history.length - 1].timestamp 
      : null
  }
}
