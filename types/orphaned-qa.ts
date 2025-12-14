/**
 * Orphaned QA Types
 * 
 * Type definitions for the Orphaned QA Parking and Watcher system
 */

/**
 * Parked QA Entry
 */
export interface ParkedQAEntry {
  /** Unique identifier */
  id: string;
  
  /** Test suite name */
  name: string;
  
  /** Path to the parked test file */
  filePath: string;
  
  /** Origin subsystem or module */
  originSubsystem: string;
  
  /** Intended implementation wave */
  intendedWave: string;
  
  /** Trigger condition for reactivation */
  triggerCondition: string;
  
  /** Reason for parking */
  reasonForParking: string;
  
  /** ISO timestamp when parked */
  dateParked: string;
  
  /** Owner (always "Foreman") */
  owner: string;
  
  /** Link to related architecture documentation */
  relatedArchitecture?: string;
  
  /** Number of tests in the suite */
  testCount?: number;
  
  /** Coverage description */
  coverage?: string;
}

/**
 * Parked QA storage structure
 */
export interface ParkedQAStorage {
  /** Schema version */
  version: string;
  
  /** Last update timestamp */
  lastUpdated: string;
  
  /** Total number of parked QA entries */
  totalParked: number;
  
  /** Array of parked QA entries */
  parkedQA: ParkedQAEntry[];
}

/**
 * Trigger match types
 */
export type TriggerMatchType = 
  | 'module_exists'
  | 'export_appears'
  | 'capability_marker'
  | 'architecture_signature';

/**
 * Confidence levels for trigger matches
 */
export type TriggerConfidence = 'high' | 'medium' | 'low';

/**
 * Trigger match result
 */
export interface TriggerMatch {
  /** Entry ID that triggered */
  entryId: string;
  
  /** Entry name */
  entryName: string;
  
  /** Original trigger condition */
  triggerCondition: string;
  
  /** Type of match detected */
  matchType: TriggerMatchType;
  
  /** Details about what matched */
  matchDetails: string;
  
  /** Confidence level of the match */
  confidence: TriggerConfidence;
}

/**
 * Reactivation incident status
 */
export type ReactivationStatus = 'pending' | 'acknowledged' | 'resolved';

/**
 * Reactivation resolution types
 */
export type ReactivationResolutionType = 'reactivated' | 'false_positive' | 'deferred';

/**
 * Reactivation resolution details
 */
export interface ReactivationResolution {
  /** Type of resolution */
  type: ReactivationResolutionType;
  
  /** ISO timestamp of resolution */
  timestamp: string;
  
  /** Resolution notes */
  notes: string;
}

/**
 * Test Reactivation Incident
 */
export interface ReactivationIncident {
  /** Unique incident ID */
  incidentId: string;
  
  /** ISO timestamp when incident was created */
  timestamp: string;
  
  /** Parked QA entry ID */
  entryId: string;
  
  /** Entry name */
  entryName: string;
  
  /** Trigger match details */
  triggerMatch: TriggerMatch;
  
  /** Current status */
  status: ReactivationStatus;
  
  /** Resolution details (if resolved) */
  resolution?: ReactivationResolution;
}

/**
 * Watcher scan result
 */
export interface WatcherScanResult {
  /** Number of entries scanned */
  scanned: number;
  
  /** Trigger matches found */
  matches: TriggerMatch[];
  
  /** Number of incidents registered */
  incidentsRegistered: number;
  
  /** Scan timestamp */
  timestamp?: string;
  
  /** Scan duration in ms */
  duration?: number;
}

/**
 * Parsed trigger condition
 */
export interface ParsedTriggerCondition {
  /** Module path (e.g., @/lib/memory/governance-memory) */
  modulePath?: string;
  
  /** Expected export names */
  exportNames: string[];
  
  /** Capability markers (e.g., feature flags) */
  capabilityMarkers?: string[];
}

/**
 * Export check result
 */
export interface ExportCheckResult {
  /** Whether any exports exist */
  exists: boolean;
  
  /** Exports that were found */
  foundExports: string[];
  
  /** Exports that are missing */
  missingExports: string[];
}
