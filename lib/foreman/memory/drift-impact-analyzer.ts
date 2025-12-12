/**
 * Drift Impact Analyzer
 * 
 * Analyzes the impact of retiring memory entries on drift metrics:
 * - Pre-retirement drift assessment
 * - Cross-embodiment impact calculation
 * - Contradiction resolution scoring
 * - Knowledge loss risk assessment
 * - Recommendation generation
 * 
 * Part of Knowledge Retirement System V1.0 (Wave 1B)
 */

import { MemoryEntry } from '@/types/memory'
import { RetirementCandidate } from '@/types/retirement'
import { DriftReport, DriftIssue } from '@/types/drift'

/**
 * Drift Impact Analysis Result
 */
export interface DriftImpactAnalysis {
  expectedImprovements: {
    contradictionsResolved: number
    stalenessReduced: number
    redundancyEliminated: number
  }
  risks: {
    knowledgeLoss: number // 0-100 score
    crossEmbodimentDesync: number // 0-100 score
    runtimeStateImpact: number // 0-100 score
  }
  recommendation: 'proceed' | 'review' | 'abort'
  explanation: string
}

/**
 * Sync Impact Score
 */
export interface SyncImpactScore {
  affectedEmbodiments: string[]
  syncRequired: boolean
  estimatedSyncTime: number // milliseconds
}

/**
 * Analyze drift impact of retiring specific entries
 */
export function analyzeDriftImpact(
  candidates: RetirementCandidate[],
  currentDrift: DriftReport | undefined,
  activeEntries: MemoryEntry[]
): DriftImpactAnalysis {
  // Calculate expected improvements
  const contradictionsResolved = calculateContradictionsResolved(candidates, currentDrift)
  const stalenessReduced = calculateStalenessReduced(candidates, activeEntries)
  const redundancyEliminated = calculateRedundancyEliminated(candidates)
  
  // Calculate risks
  const knowledgeLoss = calculateKnowledgeLossRisk(candidates)
  const crossEmbodimentDesync = calculateDesyncRisk(candidates)
  const runtimeStateImpact = calculateRuntimeImpactRisk(candidates)
  
  // Generate recommendation
  const recommendation = recommendAction({
    expectedImprovements: {
      contradictionsResolved,
      stalenessReduced,
      redundancyEliminated
    },
    risks: {
      knowledgeLoss,
      crossEmbodimentDesync,
      runtimeStateImpact
    },
    recommendation: 'proceed', // Will be overwritten
    explanation: ''
  })
  
  // Generate explanation
  const explanation = generateExplanation(
    { contradictionsResolved, stalenessReduced, redundancyEliminated },
    { knowledgeLoss, crossEmbodimentDesync, runtimeStateImpact },
    recommendation
  )
  
  return {
    expectedImprovements: {
      contradictionsResolved,
      stalenessReduced,
      redundancyEliminated
    },
    risks: {
      knowledgeLoss,
      crossEmbodimentDesync,
      runtimeStateImpact
    },
    recommendation,
    explanation
  }
}

/**
 * Calculate how many contradictions will be resolved
 */
function calculateContradictionsResolved(
  candidates: RetirementCandidate[],
  driftReport: DriftReport | undefined
): number {
  if (!driftReport) return 0
  
  const contradictionCandidates = candidates.filter(c => c.reason === 'contradiction')
  return contradictionCandidates.length
}

/**
 * Calculate percentage of staleness reduced
 */
function calculateStalenessReduced(
  candidates: RetirementCandidate[],
  activeEntries: MemoryEntry[]
): number {
  const staleCandidates = candidates.filter(c => c.reason === 'staleness')
  
  if (activeEntries.length === 0) return 0
  
  // Return percentage
  return Math.round((staleCandidates.length / activeEntries.length) * 100)
}

/**
 * Calculate redundancy eliminated
 */
function calculateRedundancyEliminated(
  candidates: RetirementCandidate[]
): number {
  const redundantCandidates = candidates.filter(c => 
    c.reason === 'supersession' || c.reason === 'consolidation'
  )
  
  return redundantCandidates.length
}

/**
 * Calculate knowledge loss risk score (0-100)
 */
function calculateKnowledgeLossRisk(
  candidates: RetirementCandidate[]
): number {
  let totalRisk = 0
  
  for (const candidate of candidates) {
    // Base risk from severity
    let risk = 0
    switch (candidate.severity) {
      case 'critical':
        risk = 80
        break
      case 'high':
        risk = 60
        break
      case 'medium':
        risk = 30
        break
      case 'low':
        risk = 10
        break
    }
    
    // Increase risk for important tags
    const entry = candidate.entry
    if (entry.tags?.includes('architecture_decision')) {
      risk += 20
    }
    if (entry.tags?.includes('critical')) {
      risk += 15
    }
    if (entry.tags?.includes('governance')) {
      risk += 25
    }
    
    // Decrease risk for superseded entries (knowledge preserved in consolidated form)
    if (candidate.reason === 'supersession' || candidate.reason === 'consolidation') {
      risk = Math.max(0, risk - 40)
    }
    
    totalRisk += risk
  }
  
  // Average risk, capped at 100
  return Math.min(100, candidates.length > 0 ? totalRisk / candidates.length : 0)
}

/**
 * Calculate cross-embodiment desync risk (0-100)
 */
function calculateDesyncRisk(
  candidates: RetirementCandidate[]
): number {
  let totalRisk = 0
  
  for (const candidate of candidates) {
    const entry = candidate.entry
    
    // Global scope entries have higher desync risk
    let risk = entry.scope === 'global' ? 30 : 10
    
    // Entries with embodiment tags increase risk
    const embodimentTags = ['foreman', 'builder', 'isms', 'shared']
    const hasEmbodimentTag = entry.tags?.some(tag => embodimentTags.includes(tag))
    if (hasEmbodimentTag) {
      risk += 20
    }
    
    // Multiple embodiment tags = higher risk
    const embodimentCount = entry.tags?.filter(tag => embodimentTags.includes(tag)).length || 0
    if (embodimentCount > 1) {
      risk += embodimentCount * 10
    }
    
    totalRisk += risk
  }
  
  return Math.min(100, candidates.length > 0 ? totalRisk / candidates.length : 0)
}

/**
 * Calculate runtime state impact risk (0-100)
 */
function calculateRuntimeImpactRisk(
  candidates: RetirementCandidate[]
): number {
  let totalRisk = 0
  
  for (const candidate of candidates) {
    const entry = candidate.entry
    
    // Check for runtime-active tags
    if (entry.tags?.includes('runtime')) {
      totalRisk += 50
    }
    if (entry.tags?.includes('active')) {
      totalRisk += 30
    }
    if (entry.tags?.includes('task')) {
      totalRisk += 20
    }
    
    // Builder config or architecture changes are risky
    if (entry.tags?.includes('builder') && entry.tags?.includes('config')) {
      totalRisk += 40
    }
    if (entry.tags?.includes('architecture') && entry.tags?.includes('active')) {
      totalRisk += 50
    }
  }
  
  return Math.min(100, candidates.length > 0 ? totalRisk / candidates.length : 0)
}

/**
 * Generate human-readable explanation
 */
function generateExplanation(
  improvements: { contradictionsResolved: number; stalenessReduced: number; redundancyEliminated: number },
  risks: { knowledgeLoss: number; crossEmbodimentDesync: number; runtimeStateImpact: number },
  recommendation: 'proceed' | 'review' | 'abort'
): string {
  const lines: string[] = []
  
  // Improvements
  if (improvements.contradictionsResolved > 0) {
    lines.push(`✓ Resolves ${improvements.contradictionsResolved} contradiction(s)`)
  }
  if (improvements.stalenessReduced > 0) {
    lines.push(`✓ Reduces staleness by ${improvements.stalenessReduced}%`)
  }
  if (improvements.redundancyEliminated > 0) {
    lines.push(`✓ Eliminates ${improvements.redundancyEliminated} redundant entr(ies)`)
  }
  
  // Risks
  if (risks.knowledgeLoss > 30) {
    lines.push(`⚠ Knowledge loss risk: ${risks.knowledgeLoss}/100`)
  }
  if (risks.crossEmbodimentDesync > 30) {
    lines.push(`⚠ Cross-embodiment desync risk: ${risks.crossEmbodimentDesync}/100`)
  }
  if (risks.runtimeStateImpact > 30) {
    lines.push(`⚠ Runtime state impact risk: ${risks.runtimeStateImpact}/100`)
  }
  
  // Recommendation
  switch (recommendation) {
    case 'proceed':
      lines.push('✓ Recommendation: PROCEED (low risk, high benefit)')
      break
    case 'review':
      lines.push('⚠ Recommendation: REVIEW (medium risk, manual review required)')
      break
    case 'abort':
      lines.push('✗ Recommendation: ABORT (high risk, do not retire)')
      break
  }
  
  return lines.join('\n')
}

/**
 * Recommend action based on impact analysis
 */
export function recommendAction(
  impact: DriftImpactAnalysis
): 'proceed' | 'review' | 'abort' {
  const { knowledgeLoss, crossEmbodimentDesync, runtimeStateImpact } = impact.risks
  
  // ABORT conditions (high risk)
  if (knowledgeLoss > 60 || crossEmbodimentDesync > 60 || runtimeStateImpact > 30) {
    return 'abort'
  }
  
  // REVIEW conditions (medium risk)
  if (knowledgeLoss > 30 || crossEmbodimentDesync > 30 || runtimeStateImpact > 10) {
    return 'review'
  }
  
  // PROCEED (low risk)
  return 'proceed'
}

/**
 * Calculate cross-embodiment sync requirements after retirement
 */
export function calculateSyncImpact(
  retiredEntries: MemoryEntry[]
): SyncImpactScore {
  const affectedEmbodiments = new Set<string>()
  
  for (const entry of retiredEntries) {
    // Global scope affects all embodiments
    if (entry.scope === 'global') {
      affectedEmbodiments.add('foreman')
      affectedEmbodiments.add('builder')
      affectedEmbodiments.add('isms')
    }
    
    // Foreman scope affects foreman
    if (entry.scope === 'foreman') {
      affectedEmbodiments.add('foreman')
    }
    
    // Check tags for embodiment references
    if (entry.tags) {
      for (const tag of entry.tags) {
        if (['foreman', 'builder', 'isms'].includes(tag)) {
          affectedEmbodiments.add(tag)
        }
      }
    }
  }
  
  // Sync required if multiple embodiments affected
  const syncRequired = affectedEmbodiments.size > 1
  
  // Estimate sync time: ~100ms per entry + baseline
  const baselineTime = 500 // ms
  const perEntryTime = 100 // ms
  const estimatedSyncTime = baselineTime + (retiredEntries.length * perEntryTime)
  
  return {
    affectedEmbodiments: Array.from(affectedEmbodiments),
    syncRequired,
    estimatedSyncTime
  }
}

/**
 * Score contradiction resolution effectiveness
 */
export function scoreContradictionResolution(
  contradictions: DriftIssue[],
  retiredEntries: MemoryEntry[]
): number {
  if (contradictions.length === 0) return 0
  if (retiredEntries.length === 0) return 0
  
  let totalScore = 0
  const retiredIds = new Set(retiredEntries.map(e => e.id))
  
  for (const contradiction of contradictions) {
    // Check if this contradiction is resolved by retired entries
    const affectedIds = contradiction.affectedEntries || []
    const resolvedCount = affectedIds.filter(id => retiredIds.has(id)).length
    
    if (resolvedCount > 0) {
      // Base score for resolving contradiction
      let score = 20
      
      // Bonus for severity
      switch (contradiction.severity) {
        case 'critical':
          score += 30
          break
        case 'high':
          score += 20
          break
        case 'medium':
          score += 10
          break
        case 'low':
          score += 5
          break
      }
      
      // Bonus for resolving all affected entries
      if (resolvedCount === affectedIds.length) {
        score += 10
      }
      
      totalScore += score
    }
  }
  
  // Average score, capped at 100
  return Math.min(100, contradictions.length > 0 ? totalScore / contradictions.length : 0)
}
