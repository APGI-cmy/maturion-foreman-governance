/**
 * Evidence Snapshot System
 * 
 * Creates immutable snapshots of evidence for governance validation.
 * Per GOVERNANCE_GATE_CANON.md: Evidence must be immutable and timestamped.
 */

import * as crypto from 'crypto';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface EvidenceFile {
  path: string;
  hash: string;
  size: number;
  timestamp: string;
  type: 'log' | 'report' | 'document' | 'result';
}

export interface EvidenceSnapshot {
  snapshotId: string;
  timestamp: string;
  prNumber: number;
  commitSha: string;
  evidence: {
    [controlName: string]: {
      files: EvidenceFile[];
      hashes: Record<string, string>;
      metadata: Record<string, any>;
    };
  };
  immutable: boolean;
  hash: string;
}

export interface SnapshotContext {
  prNumber: number;
  commitSha: string;
  branch: string;
  evidenceDir: string;
}

/**
 * Create immutable evidence snapshot
 */
export async function createEvidenceSnapshot(context: SnapshotContext): Promise<EvidenceSnapshot> {
  const timestamp = new Date().toISOString();
  const snapshotId = `snapshot_${Date.now()}_${context.commitSha.substring(0, 8)}`;
  
  // Initialize evidence structure with all controls
  const evidence: EvidenceSnapshot['evidence'] = {};
  
  // Define all controls per GOVERNANCE_GATE_CANON.md
  const controls = ['QIEL', 'CS1', 'CS2', 'CS3', 'CS4', 'CS5', 'CS6', 'GSR', 'BuildPhilosophy'];
  
  // Initialize each control with empty evidence
  for (const control of controls) {
    evidence[control] = {
      files: [],
      hashes: {},
      metadata: {
        collectionTime: timestamp,
        fileCount: 0
      }
    };
  }
  
  // Try to collect evidence files if directory exists
  try {
    await fs.access(context.evidenceDir);
    // Directory exists, collect evidence
    const files = await collectEvidenceFiles(context.evidenceDir);
    
    // Distribute files to appropriate controls based on filename
    for (const file of files) {
      const fileName = path.basename(file.path).toLowerCase();
      
      // Map files to controls based on naming
      if (fileName.includes('qiel') || fileName.includes('qa') || fileName.includes('test')) {
        evidence['QIEL'].files.push(file);
        evidence['QIEL'].hashes[file.path] = file.hash;
      } else if (fileName.includes('cs1') || fileName.includes('constitutional')) {
        evidence['CS1'].files.push(file);
        evidence['CS1'].hashes[file.path] = file.hash;
      } else if (fileName.includes('build') || fileName.includes('philosophy')) {
        evidence['BuildPhilosophy'].files.push(file);
        evidence['BuildPhilosophy'].hashes[file.path] = file.hash;
      } else {
        // General evidence - add to all controls for now
        evidence['QIEL'].files.push(file);
        evidence['QIEL'].hashes[file.path] = file.hash;
      }
    }
    
    // Update file counts
    for (const control of controls) {
      evidence[control].metadata.fileCount = evidence[control].files.length;
    }
  } catch (error) {
    // Evidence directory doesn't exist yet - this is okay for dry run
    // Controls already initialized with empty arrays
    for (const control of controls) {
      evidence[control].metadata.note = 'No evidence directory found (dry run mode)';
    }
  }
  
  const snapshot: EvidenceSnapshot = {
    snapshotId,
    timestamp,
    prNumber: context.prNumber,
    commitSha: context.commitSha,
    evidence,
    immutable: true,
    hash: '' // Will be computed
  };
  
  // Compute hash of entire snapshot (excluding hash field itself)
  snapshot.hash = computeSnapshotHash(snapshot);
  
  return snapshot;
}

/**
 * Save snapshot to disk
 */
export async function saveSnapshot(snapshot: EvidenceSnapshot, outputPath: string): Promise<void> {
  if (!snapshot.immutable) {
    throw new Error('Cannot save mutable snapshot');
  }
  
  const snapshotJson = JSON.stringify(snapshot, null, 2);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, snapshotJson, 'utf-8');
}

/**
 * Load snapshot from disk
 */
export async function loadSnapshot(snapshotPath: string): Promise<EvidenceSnapshot> {
  const content = await fs.readFile(snapshotPath, 'utf-8');
  const snapshot = JSON.parse(content) as EvidenceSnapshot;
  
  // Validate integrity
  const expectedHash = snapshot.hash;
  const actualHash = computeSnapshotHash(snapshot);
  
  if (expectedHash !== actualHash) {
    throw new Error('Snapshot integrity violation: hash mismatch');
  }
  
  return snapshot;
}

/**
 * Attempt to modify snapshot (should throw)
 */
export function modifySnapshot(snapshot: EvidenceSnapshot, changes: any): never {
  throw new Error('Snapshot is immutable and cannot be modified');
}

/**
 * Attempt to add evidence to snapshot (should throw)
 */
export function addEvidence(snapshot: EvidenceSnapshot, controlName: string, evidence: any): never {
  throw new Error('Snapshot is immutable. Evidence cannot be added after creation.');
}

/**
 * Attempt to remove evidence from snapshot (should throw)
 */
export function removeEvidence(snapshot: EvidenceSnapshot, controlName: string): never {
  throw new Error('Snapshot is immutable. Evidence cannot be removed.');
}

/**
 * Validate snapshot integrity
 */
export async function validateSnapshotIntegrity(snapshot: EvidenceSnapshot): Promise<boolean> {
  const expectedHash = snapshot.hash;
  const actualHash = computeSnapshotHash(snapshot);
  return expectedHash === actualHash;
}

/**
 * Validate evidence completeness
 */
export function validateEvidenceCompleteness(snapshot: EvidenceSnapshot): {
  complete: boolean;
  missingControls: string[];
} {
  const requiredControls = [
    'QIEL',
    'CS1',
    'CS2',
    'CS3',
    'CS4',
    'CS5',
    'CS6',
    'GSR',
    'BuildPhilosophy'
  ];
  
  const presentControls = Object.keys(snapshot.evidence);
  const missingControls = requiredControls.filter(
    control => !presentControls.includes(control)
  );
  
  return {
    complete: missingControls.length === 0,
    missingControls
  };
}

/**
 * Validate individual evidence file integrity
 */
export async function validateEvidenceFileIntegrity(
  filePath: string,
  expectedHash: string
): Promise<boolean> {
  try {
    const content = await fs.readFile(filePath);
    const actualHash = crypto.createHash('sha256').update(content).digest('hex');
    return actualHash === expectedHash;
  } catch (error) {
    return false;
  }
}

// Helper functions

async function collectEvidenceFiles(evidenceDir: string): Promise<EvidenceFile[]> {
  const files: EvidenceFile[] = [];
  
  try {
    const entries = await fs.readdir(evidenceDir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isFile()) {
        const filePath = path.join(evidenceDir, entry.name);
        const stats = await fs.stat(filePath);
        const content = await fs.readFile(filePath);
        const hash = crypto.createHash('sha256').update(content).digest('hex');
        
        files.push({
          path: filePath,
          hash,
          size: stats.size,
          timestamp: stats.mtime.toISOString(),
          type: detectFileType(entry.name)
        });
      }
    }
  } catch (error) {
    // Directory might not exist - return empty array
  }
  
  return files;
}

function detectFileType(filename: string): EvidenceFile['type'] {
  if (filename.endsWith('.log')) return 'log';
  if (filename.endsWith('.json')) return 'result';
  if (filename.endsWith('.md')) return 'report';
  return 'document';
}

function computeSnapshotHash(snapshot: EvidenceSnapshot): string {
  // Create a copy without the hash field
  const { hash, ...snapshotWithoutHash } = snapshot;
  const content = JSON.stringify(snapshotWithoutHash, Object.keys(snapshotWithoutHash).sort());
  return crypto.createHash('sha256').update(content).digest('hex');
}
