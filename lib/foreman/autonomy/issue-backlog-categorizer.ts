/**
 * CS10 - Global Issue Backlog Cleanup & Categorization
 * 
 * Foreman must:
 * - Scan all existing issues (open + backlog)
 * - Categorize into defined categories
 * - Close duplicates
 * - Link related issues
 * - Produce reconciliation report
 */

import { logAutonomousAction } from '../autonomy/pilot-log'

/**
 * Issue categories
 */
export enum IssueCategory {
  BUILD_PHILOSOPHY = 'Build Philosophy Extensions',
  ARCHITECTURE = 'Architecture Work',
  GOVERNANCE = 'Governance Work',
  BUG = 'Bug Fixes',
  BUILDER_TRAINING = 'Builder Training',
  PERFORMANCE = 'Performance Issues',
  DEPRECATION = 'Deprecations',
  CONSTITUTIONAL = 'Constitutional Systems',
  AUTONOMY = 'Autonomy Implementation',
  QA_ENHANCEMENT = 'QA Enhancement',
  DOCUMENTATION = 'Documentation',
  UNKNOWN = 'Uncategorized'
}

/**
 * Issue metadata
 */
export interface IssueMetadata {
  number: number
  title: string
  state: 'open' | 'closed'
  labels: string[]
  created: Date
  updated: Date
  body: string
  category?: IssueCategory
  duplicate?: number
  relatedIssues?: number[]
  priority?: 'critical' | 'high' | 'medium' | 'low'
}

/**
 * Issue analysis result
 */
export interface IssueAnalysis {
  category: IssueCategory
  confidence: number // 0-1
  keywords: string[]
  relatedIssues: number[]
  isDuplicate: boolean
  duplicateOf?: number
  recommendedAction: 'keep' | 'close' | 'merge' | 'split'
  reason: string
}

/**
 * Backlog reconciliation report
 */
export interface BacklogReconciliationReport {
  timestamp: Date
  totalIssues: number
  openIssues: number
  closedIssues: number
  categorized: Record<IssueCategory, number>
  duplicatesFound: number
  duplicatePairs: Array<{ issue: number; duplicateOf: number }>
  relatedGroups: Array<{ issues: number[]; category: IssueCategory }>
  recommendations: {
    toClose: number[]
    toMerge: Array<{ issues: number[]; into: number }>
    toSplit: number[]
  }
  summary: string
}

/**
 * Category keywords for classification
 */
const CATEGORY_KEYWORDS: Record<IssueCategory, string[]> = {
  [IssueCategory.BUILD_PHILOSOPHY]: [
    'build philosophy',
    'qa-first',
    'architecture-driven',
    'red qa',
    'build to green',
    'one-time build'
  ],
  [IssueCategory.ARCHITECTURE]: [
    'architecture',
    'design',
    'system design',
    'architectural',
    'true north',
    'checklist'
  ],
  [IssueCategory.GOVERNANCE]: [
    'governance',
    'policy',
    'compliance',
    'rule',
    'constitutional',
    'guardrail'
  ],
  [IssueCategory.BUG]: [
    'bug',
    'error',
    'fix',
    'broken',
    'failing',
    'crash'
  ],
  [IssueCategory.BUILDER_TRAINING]: [
    'builder',
    'training',
    'agent',
    'copilot',
    'network'
  ],
  [IssueCategory.PERFORMANCE]: [
    'performance',
    'slow',
    'optimization',
    'speed',
    'latency',
    'qiel'
  ],
  [IssueCategory.DEPRECATION]: [
    'deprecate',
    'remove',
    'obsolete',
    'legacy',
    'retire'
  ],
  [IssueCategory.CONSTITUTIONAL]: [
    'cs1',
    'cs2',
    'cs3',
    'cs4',
    'cs5',
    'cs6',
    'cs7',
    'cs8',
    'cs9',
    'cs10',
    'constitutional system'
  ],
  [IssueCategory.AUTONOMY]: [
    'autonomy',
    'autonomous',
    'pilot wave',
    'execution',
    'orchestration'
  ],
  [IssueCategory.QA_ENHANCEMENT]: [
    'qa',
    'test',
    'qic',
    'quality',
    'validation'
  ],
  [IssueCategory.DOCUMENTATION]: [
    'documentation',
    'docs',
    'readme',
    'guide',
    'manual'
  ],
  [IssueCategory.UNKNOWN]: []
}

/**
 * Issue Backlog Categorizer
 */
export class IssueBacklogCategorizer {
  /**
   * Analyze a single issue
   */
  analyzeIssue(issue: IssueMetadata, allIssues: IssueMetadata[]): IssueAnalysis {
    // Categorize
    const category = this.categorizeIssue(issue)
    
    // Find related issues
    const relatedIssues = this.findRelatedIssues(issue, allIssues)
    
    // Check for duplicates
    const duplicateCheck = this.checkForDuplicate(issue, allIssues)
    
    // Recommend action
    const recommendedAction = this.recommendAction(issue, duplicateCheck.isDuplicate)
    
    return {
      category: category.category,
      confidence: category.confidence,
      keywords: category.keywords,
      relatedIssues,
      isDuplicate: duplicateCheck.isDuplicate,
      duplicateOf: duplicateCheck.duplicateOf,
      recommendedAction,
      reason: duplicateCheck.isDuplicate
        ? `Duplicate of #${duplicateCheck.duplicateOf}`
        : category.reason
    }
  }
  
  /**
   * Categorize an issue
   */
  private categorizeIssue(issue: IssueMetadata): {
    category: IssueCategory
    confidence: number
    keywords: string[]
    reason: string
  } {
    const text = `${issue.title} ${issue.body}`.toLowerCase()
    const scores: Record<IssueCategory, number> = {} as any
    const matchedKeywords: Record<IssueCategory, string[]> = {} as any
    
    // Calculate scores for each category
    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
      scores[category as IssueCategory] = 0
      matchedKeywords[category as IssueCategory] = []
      
      for (const keyword of keywords) {
        if (text.includes(keyword.toLowerCase())) {
          scores[category as IssueCategory]++
          matchedKeywords[category as IssueCategory].push(keyword)
        }
      }
    }
    
    // Find highest scoring category
    let bestCategory = IssueCategory.UNKNOWN
    let bestScore = 0
    
    for (const [category, score] of Object.entries(scores)) {
      if (score > bestScore) {
        bestScore = score
        bestCategory = category as IssueCategory
      }
    }
    
    // Calculate confidence (0-1)
    const confidence = bestScore > 0 ? Math.min(bestScore / 5, 1) : 0
    
    return {
      category: bestCategory,
      confidence,
      keywords: matchedKeywords[bestCategory] || [],
      reason: bestScore > 0
        ? `Matched ${bestScore} keywords: ${matchedKeywords[bestCategory].join(', ')}`
        : 'No matching keywords found'
    }
  }
  
  /**
   * Find related issues
   */
  private findRelatedIssues(issue: IssueMetadata, allIssues: IssueMetadata[]): number[] {
    const related: number[] = []
    const issueWords = this.extractWords(issue.title + ' ' + issue.body)
    
    for (const other of allIssues) {
      if (other.number === issue.number) continue
      
      const otherWords = this.extractWords(other.title + ' ' + other.body)
      const commonWords = issueWords.filter(w => otherWords.includes(w))
      
      // If 30%+ words in common, consider related
      const similarity = commonWords.length / Math.min(issueWords.length, otherWords.length)
      if (similarity > 0.3) {
        related.push(other.number)
      }
    }
    
    return related
  }
  
  /**
   * Check if issue is a duplicate
   */
  private checkForDuplicate(
    issue: IssueMetadata,
    allIssues: IssueMetadata[]
  ): { isDuplicate: boolean; duplicateOf?: number } {
    const issueWords = this.extractWords(issue.title)
    
    for (const other of allIssues) {
      if (other.number === issue.number) continue
      if (other.number >= issue.number) continue // Only check older issues
      
      const otherWords = this.extractWords(other.title)
      const commonWords = issueWords.filter(w => otherWords.includes(w))
      
      // If 70%+ title words match, it's likely a duplicate
      const similarity = commonWords.length / Math.min(issueWords.length, otherWords.length)
      if (similarity > 0.7) {
        return { isDuplicate: true, duplicateOf: other.number }
      }
    }
    
    return { isDuplicate: false }
  }
  
  /**
   * Extract meaningful words from text
   */
  private extractWords(text: string): string[] {
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']
    
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2 && !stopWords.includes(w))
  }
  
  /**
   * Recommend action for issue
   */
  private recommendAction(
    issue: IssueMetadata,
    isDuplicate: boolean
  ): 'keep' | 'close' | 'merge' | 'split' {
    if (isDuplicate) {
      return 'close'
    }
    
    // If issue is very old and hasn't been updated, consider closing
    const monthsSinceUpdate = (Date.now() - issue.updated.getTime()) / (1000 * 60 * 60 * 24 * 30)
    if (monthsSinceUpdate > 6 && issue.state === 'open') {
      return 'close'
    }
    
    return 'keep'
  }
  
  /**
   * Generate backlog reconciliation report
   */
  async generateReport(issues: IssueMetadata[]): Promise<BacklogReconciliationReport> {
    console.log(`\n📊 Generating Backlog Reconciliation Report...`)
    console.log(`   Analyzing ${issues.length} issues...`)
    
    const categorized: Record<IssueCategory, number> = {} as any
    const duplicatePairs: Array<{ issue: number; duplicateOf: number }> = []
    const relatedGroups: Array<{ issues: number[]; category: IssueCategory }> = []
    const toClose: number[] = []
    const toMerge: Array<{ issues: number[]; into: number }> = []
    const toSplit: number[] = []
    
    // Initialize category counts
    for (const category of Object.values(IssueCategory)) {
      categorized[category] = 0
    }
    
    // Analyze each issue
    for (const issue of issues) {
      const analysis = this.analyzeIssue(issue, issues)
      
      categorized[analysis.category]++
      
      if (analysis.isDuplicate && analysis.duplicateOf) {
        duplicatePairs.push({ issue: issue.number, duplicateOf: analysis.duplicateOf })
      }
      
      if (analysis.recommendedAction === 'close') {
        toClose.push(issue.number)
      }
    }
    
    // Group related issues
    const processed = new Set<number>()
    for (const issue of issues) {
      if (processed.has(issue.number)) continue
      
      const analysis = this.analyzeIssue(issue, issues)
      if (analysis.relatedIssues.length > 0) {
        const group = [issue.number, ...analysis.relatedIssues]
        relatedGroups.push({ issues: group, category: analysis.category })
        
        for (const num of group) {
          processed.add(num)
        }
      }
    }
    
    const openIssues = issues.filter(i => i.state === 'open').length
    const closedIssues = issues.filter(i => i.state === 'closed').length
    
    const report: BacklogReconciliationReport = {
      timestamp: new Date(),
      totalIssues: issues.length,
      openIssues,
      closedIssues,
      categorized,
      duplicatesFound: duplicatePairs.length,
      duplicatePairs,
      relatedGroups,
      recommendations: {
        toClose,
        toMerge,
        toSplit
      },
      summary: this.generateSummary(issues.length, openIssues, categorized, duplicatePairs.length)
    }
    
    console.log(`\n✅ Report generated`)
    console.log(`   Total: ${issues.length} | Open: ${openIssues} | Closed: ${closedIssues}`)
    console.log(`   Duplicates: ${duplicatePairs.length} | Related groups: ${relatedGroups.length}`)
    
    // Log to autonomy pilot log
    logAutonomousAction({
      timestamp: new Date().toISOString(),
      actionType: 'Issue Backlog Categorization',
      decision: 'allowed',
      constitutionalLayer: 'CS10 - Issue Backlog Cleanup',
      details: `Analyzed ${issues.length} issues, categorized into ${Object.keys(IssueCategory).length} categories`,
      outcome: `Found ${duplicatePairs.length} duplicates, ${relatedGroups.length} related groups`
    })
    
    return report
  }
  
  /**
   * Generate summary text
   */
  private generateSummary(
    total: number,
    open: number,
    categorized: Record<IssueCategory, number>,
    duplicates: number
  ): string {
    const topCategories = Object.entries(categorized)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([cat, count]) => `${cat}: ${count}`)
      .join(', ')
    
    return `Analyzed ${total} issues (${open} open). Top categories: ${topCategories}. Found ${duplicates} duplicates.`
  }
}

/**
 * Singleton instance
 */
let categorizerInstance: IssueBacklogCategorizer | null = null

/**
 * Get the issue backlog categorizer instance
 */
export function getIssueBacklogCategorizer(): IssueBacklogCategorizer {
  if (!categorizerInstance) {
    categorizerInstance = new IssueBacklogCategorizer()
  }
  return categorizerInstance
}

/**
 * Save report to file
 */
export function saveBacklogReport(report: BacklogReconciliationReport, outputPath: string): void {
  const fs = require('fs')
  
  const markdown = `# Issue Backlog Reconciliation Report

**Generated**: ${report.timestamp.toISOString()}  
**Total Issues**: ${report.totalIssues}  
**Open Issues**: ${report.openIssues}  
**Closed Issues**: ${report.closedIssues}

## Summary

${report.summary}

## Categorization

${Object.entries(report.categorized)
  .filter(([, count]) => count > 0)
  .sort(([, a], [, b]) => b - a)
  .map(([category, count]) => `- **${category}**: ${count}`)
  .join('\n')}

## Duplicates Found

Total duplicates: ${report.duplicatesFound}

${report.duplicatePairs.map(p => `- Issue #${p.issue} is a duplicate of #${p.duplicateOf}`).join('\n')}

## Related Issue Groups

${report.relatedGroups.map(g => `- **${g.category}**: Issues ${g.issues.map(n => `#${n}`).join(', ')}`).join('\n')}

## Recommendations

### To Close (${report.recommendations.toClose.length})
${report.recommendations.toClose.map(n => `- #${n}`).join('\n') || 'None'}

### To Merge (${report.recommendations.toMerge.length})
${report.recommendations.toMerge.map(m => `- Merge ${m.issues.map(n => `#${n}`).join(', ')} into #${m.into}`).join('\n') || 'None'}

### To Split (${report.recommendations.toSplit.length})
${report.recommendations.toSplit.map(n => `- #${n}`).join('\n') || 'None'}

---

*This report was generated autonomously by Foreman under CS10 Issue Backlog Cleanup.*
`
  
  fs.writeFileSync(outputPath, markdown, 'utf-8')
}
