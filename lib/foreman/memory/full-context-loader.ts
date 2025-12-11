/**
 * CS9 - Full Memory Context Loader
 * 
 * Foreman must ingest:
 * - The 60+ queued issues
 * - All governance files
 * - All architecture documents
 * - Entire build philosophy (canonical)
 * - All builder-network protocols
 * - All constitutional checks
 * 
 * Deliverable: Deterministic, versioned memory substrate
 * Replaces ad-hoc context with complete system knowledge
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs'
import { join } from 'path'
import { logAutonomousAction } from '../autonomy/pilot-log'

/**
 * Context categories
 */
export enum ContextCategory {
  CONSTITUTIONAL = 'constitutional',
  GOVERNANCE = 'governance',
  ARCHITECTURE = 'architecture',
  BUILD_PHILOSOPHY = 'build_philosophy',
  BUILDER_NETWORK = 'builder_network',
  QA_STANDARDS = 'qa_standards',
  ISSUES = 'issues',
  MEMORY = 'memory'
}

/**
 * Context document
 */
export interface ContextDocument {
  category: ContextCategory
  path: string
  name: string
  content: string
  size: number
  lastModified: Date
}

/**
 * Full context data
 */
export interface FullContext {
  version: string
  timestamp: Date
  documents: ContextDocument[]
  statistics: {
    totalDocuments: number
    totalSize: number
    byCategory: Record<ContextCategory, number>
  }
  buildPhilosophy: {
    loaded: boolean
    version: string
    process: string
  }
  constitutionalSystems: {
    cs1: boolean
    cs2: boolean
    cs3: boolean
    cs4: boolean
    cs5: boolean
    cs6: boolean
    cs7: boolean
    cs8: boolean
  }
}

/**
 * Context loading result
 */
export interface ContextLoadResult {
  success: boolean
  context?: FullContext
  errors: string[]
  warnings: string[]
  loadTimeMs: number
}

/**
 * Full Memory Context Loader
 */
export class FullContextLoader {
  private documents: ContextDocument[] = []
  private errors: string[] = []
  private warnings: string[] = []
  
  /**
   * Load complete system context
   */
  async load(): Promise<ContextLoadResult> {
    const startTime = Date.now()
    
    console.log('🧠 Loading Full Memory Context...')
    
    // Reset state
    this.documents = []
    this.errors = []
    this.warnings = []
    
    try {
      // Load constitutional documents
      await this.loadConstitutionalDocuments()
      
      // Load governance files
      await this.loadGovernanceDocuments()
      
      // Load architecture documents
      await this.loadArchitectureDocuments()
      
      // Load Build Philosophy
      await this.loadBuildPhilosophy()
      
      // Load builder network protocols
      await this.loadBuilderNetworkDocuments()
      
      // Load QA standards
      await this.loadQAStandards()
      
      // Load memory system documents
      await this.loadMemoryDocuments()
      
      // Calculate statistics
      const statistics = this.calculateStatistics()
      
      // Check constitutional systems
      const constitutionalSystems = this.checkConstitutionalSystems()
      
      // Build context object
      const context: FullContext = {
        version: '1.0',
        timestamp: new Date(),
        documents: this.documents,
        statistics,
        buildPhilosophy: {
          loaded: this.documents.some(d => d.name === 'BUILD_PHILOSOPHY.md'),
          version: '1.0',
          process: 'Architecture → Red QA → Build to Green'
        },
        constitutionalSystems
      }
      
      const loadTimeMs = Date.now() - startTime
      
      console.log(`✅ Context loaded: ${this.documents.length} documents in ${loadTimeMs}ms`)
      console.log(`   By category:`)
      for (const [category, count] of Object.entries(statistics.byCategory)) {
        console.log(`   - ${category}: ${count}`)
      }
      
      // Log to autonomy pilot log
      logAutonomousAction({
        timestamp: new Date().toISOString(),
        actionType: 'Full Context Load',
        decision: 'allowed',
        constitutionalLayer: 'CS9 - Full Memory Context',
        details: `Loaded ${this.documents.length} documents (${Math.round(statistics.totalSize / 1024)}KB) in ${loadTimeMs}ms`,
        outcome: this.errors.length === 0 ? 'Context loaded successfully' : `Loaded with ${this.errors.length} errors`
      })
      
      return {
        success: this.errors.length === 0,
        context,
        errors: this.errors,
        warnings: this.warnings,
        loadTimeMs
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      this.errors.push(errorMsg)
      
      return {
        success: false,
        errors: this.errors,
        warnings: this.warnings,
        loadTimeMs: Date.now() - startTime
      }
    }
  }
  
  /**
   * Load constitutional documents
   */
  private async loadConstitutionalDocuments(): Promise<void> {
    console.log('   Loading constitutional documents...')
    
    const paths = [
      '.github/foreman/agent-contract.md',
      'foreman/constitution/README.md',
      'foreman/constitution/guardrails.json'
    ]
    
    for (const path of paths) {
      this.loadDocument(path, ContextCategory.CONSTITUTIONAL)
    }
  }
  
  /**
   * Load governance documents
   */
  private async loadGovernanceDocuments(): Promise<void> {
    console.log('   Loading governance documents...')
    
    const governanceDir = join(process.cwd(), 'foreman', 'governance')
    if (existsSync(governanceDir)) {
      this.loadDirectory(governanceDir, ContextCategory.GOVERNANCE)
    } else {
      this.warnings.push('Governance directory not found')
    }
  }
  
  /**
   * Load architecture documents
   */
  private async loadArchitectureDocuments(): Promise<void> {
    console.log('   Loading architecture documents...')
    
    const paths = [
      'foreman/architecture-design-checklist.md',
      'foreman/true-north-architecture.md'
    ]
    
    for (const path of paths) {
      this.loadDocument(path, ContextCategory.ARCHITECTURE)
    }
    
    // Load architecture directory
    const archDir = join(process.cwd(), 'docs', 'architecture')
    if (existsSync(archDir)) {
      this.loadDirectory(archDir, ContextCategory.ARCHITECTURE)
    }
  }
  
  /**
   * Load Build Philosophy
   */
  private async loadBuildPhilosophy(): Promise<void> {
    console.log('   Loading Build Philosophy...')
    
    this.loadDocument('BUILD_PHILOSOPHY.md', ContextCategory.BUILD_PHILOSOPHY)
  }
  
  /**
   * Load builder network documents
   */
  private async loadBuilderNetworkDocuments(): Promise<void> {
    console.log('   Loading builder network documents...')
    
    const paths = [
      'docs/builder_protocol.md',
      'docs/BUILDER_NETWORK.md',
      'foreman/builder-specs'
    ]
    
    for (const path of paths) {
      if (path.includes('builder-specs')) {
        const fullPath = join(process.cwd(), path)
        if (existsSync(fullPath)) {
          this.loadDirectory(fullPath, ContextCategory.BUILDER_NETWORK)
        }
      } else {
        this.loadDocument(path, ContextCategory.BUILDER_NETWORK)
      }
    }
  }
  
  /**
   * Load QA standards
   */
  private async loadQAStandards(): Promise<void> {
    console.log('   Loading QA standards...')
    
    const qaDir = join(process.cwd(), 'foreman', 'qa')
    if (existsSync(qaDir)) {
      this.loadDirectory(qaDir, ContextCategory.QA_STANDARDS)
    } else {
      this.warnings.push('QA directory not found')
    }
  }
  
  /**
   * Load memory system documents
   */
  private async loadMemoryDocuments(): Promise<void> {
    console.log('   Loading memory system documents...')
    
    const memoryDir = join(process.cwd(), 'lib', 'foreman', 'memory')
    if (existsSync(memoryDir)) {
      // Load README only (not full source code)
      const readmePath = join(memoryDir, 'DRIFT_MONITOR_README.md')
      if (existsSync(readmePath)) {
        this.loadDocument('lib/foreman/memory/DRIFT_MONITOR_README.md', ContextCategory.MEMORY)
      }
    }
  }
  
  /**
   * Load a single document
   */
  private loadDocument(relativePath: string, category: ContextCategory): void {
    const fullPath = join(process.cwd(), relativePath)
    
    if (!existsSync(fullPath)) {
      this.warnings.push(`Document not found: ${relativePath}`)
      return
    }
    
    try {
      const stats = statSync(fullPath)
      
      // Skip if not a file
      if (!stats.isFile()) {
        return
      }
      
      const content = readFileSync(fullPath, 'utf-8')
      
      this.documents.push({
        category,
        path: relativePath,
        name: relativePath.split('/').pop() || relativePath,
        content,
        size: stats.size,
        lastModified: stats.mtime
      })
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      this.errors.push(`Failed to load ${relativePath}: ${errorMsg}`)
    }
  }
  
  /**
   * Load all documents from a directory
   */
  private loadDirectory(dirPath: string, category: ContextCategory, recursive: boolean = true): void {
    if (!existsSync(dirPath)) {
      return
    }
    
    try {
      const entries = readdirSync(dirPath)
      
      for (const entry of entries) {
        const fullPath = join(dirPath, entry)
        const stats = statSync(fullPath)
        
        if (stats.isDirectory() && recursive) {
          this.loadDirectory(fullPath, category, recursive)
        } else if (stats.isFile() && entry.endsWith('.md')) {
          const relativePath = fullPath.replace(process.cwd() + '/', '')
          this.loadDocument(relativePath, category)
        }
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      this.errors.push(`Failed to load directory ${dirPath}: ${errorMsg}`)
    }
  }
  
  /**
   * Calculate statistics
   */
  private calculateStatistics(): FullContext['statistics'] {
    const byCategory: Record<ContextCategory, number> = {
      [ContextCategory.CONSTITUTIONAL]: 0,
      [ContextCategory.GOVERNANCE]: 0,
      [ContextCategory.ARCHITECTURE]: 0,
      [ContextCategory.BUILD_PHILOSOPHY]: 0,
      [ContextCategory.BUILDER_NETWORK]: 0,
      [ContextCategory.QA_STANDARDS]: 0,
      [ContextCategory.ISSUES]: 0,
      [ContextCategory.MEMORY]: 0
    }
    
    for (const doc of this.documents) {
      byCategory[doc.category]++
    }
    
    return {
      totalDocuments: this.documents.length,
      totalSize: this.documents.reduce((sum, doc) => sum + doc.size, 0),
      byCategory
    }
  }
  
  /**
   * Check constitutional systems
   */
  private checkConstitutionalSystems(): FullContext['constitutionalSystems'] {
    return {
      cs1: existsSync(join(process.cwd(), 'lib/foreman/guardrails/runtime.ts')),
      cs2: existsSync(join(process.cwd(), 'lib/foreman/architecture/approval-workflow.ts')),
      cs3: existsSync(join(process.cwd(), 'lib/foreman/incidents')),
      cs4: existsSync(join(process.cwd(), 'lib/foreman/alerts/alert-engine.ts')),
      cs5: existsSync(join(process.cwd(), 'lib/foreman/qa/qiel-runner.ts')),
      cs6: existsSync(join(process.cwd(), 'lib/foreman/constitution/external-builder-protection.ts')),
      cs7: existsSync(join(process.cwd(), 'lib/foreman/autonomy/pilot-log.ts')),
      cs8: existsSync(join(process.cwd(), 'lib/foreman/autonomy/supervision-graph.ts'))
    }
  }
  
  /**
   * Get documents by category
   */
  getDocumentsByCategory(context: FullContext, category: ContextCategory): ContextDocument[] {
    return context.documents.filter(doc => doc.category === category)
  }
  
  /**
   * Search documents
   */
  searchDocuments(context: FullContext, query: string): ContextDocument[] {
    const lowerQuery = query.toLowerCase()
    return context.documents.filter(doc =>
      doc.name.toLowerCase().includes(lowerQuery) ||
      doc.content.toLowerCase().includes(lowerQuery)
    )
  }
}

/**
 * Singleton instance
 */
let loaderInstance: FullContextLoader | null = null

/**
 * Get the context loader instance
 */
export function getFullContextLoader(): FullContextLoader {
  if (!loaderInstance) {
    loaderInstance = new FullContextLoader()
  }
  return loaderInstance
}

/**
 * Load full context (convenience function)
 */
export async function loadFullContext(): Promise<ContextLoadResult> {
  const loader = getFullContextLoader()
  return loader.load()
}

/**
 * Save context to file (for persistence)
 */
export function saveContext(context: FullContext, outputPath: string): void {
  const fs = require('fs')
  const data = JSON.stringify(context, null, 2)
  fs.writeFileSync(outputPath, data, 'utf-8')
}
