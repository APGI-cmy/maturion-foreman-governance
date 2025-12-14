/**
 * State Persistence
 * 
 * Architecture: /architecture/autonomy-reauthorization-architecture.md
 * 
 * Handles persistence of autonomy state to disk for recovery and audit trail.
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import type { AutonomyState, StateTransition } from './state-model';

// Allow override for testing
let baseDir = path.join(process.cwd(), 'memory', 'governance', 'autonomy');

export function setBaseDirectory(dir: string): void {
  baseDir = dir;
}

function getStateDir() {
  return baseDir;
}

function getStateFile() {
  return path.join(baseDir, 'state.json');
}

function getTransitionsDir() {
  return path.join(baseDir, 'transitions');
}

function getRequestsDir() {
  return path.join(baseDir, 'reauthorization-requests');
}

/**
 * Ensure directory structure exists
 */
async function ensureDirectories(): Promise<void> {
  await fs.mkdir(getStateDir(), { recursive: true });
  await fs.mkdir(getTransitionsDir(), { recursive: true });
  await fs.mkdir(getRequestsDir(), { recursive: true });
}

/**
 * Save current state to disk
 */
export async function saveState(state: AutonomyState): Promise<void> {
  try {
    await ensureDirectories();
    
    // Convert dates to ISO strings for JSON serialization
    const serializable = {
      ...state,
      lastTransition: state.lastTransition.toISOString(),
      transitionHistory: state.transitionHistory.map(t => ({
        ...t,
        timestamp: t.timestamp.toISOString(),
      })),
      ownerApproval: state.ownerApproval ? {
        ...state.ownerApproval,
        timestamp: state.ownerApproval.timestamp.toISOString(),
        systemState: {
          ...state.ownerApproval.systemState,
          timestamp: state.ownerApproval.systemState.timestamp.toISOString(),
        },
      } : undefined,
    };
    
    await fs.writeFile(getStateFile(), JSON.stringify(serializable, null, 2), 'utf-8');
  } catch (error) {
    console.error('[State Persistence] Failed to save state:', error);
    throw error;
  }
}

/**
 * Load state from disk
 */
export async function loadState(): Promise<AutonomyState | null> {
  try {
    const content = await fs.readFile(getStateFile(), 'utf-8');
    const parsed = JSON.parse(content);
    
    // Convert ISO strings back to Date objects
    return {
      ...parsed,
      lastTransition: new Date(parsed.lastTransition),
      transitionHistory: parsed.transitionHistory.map((t: any) => ({
        ...t,
        timestamp: new Date(t.timestamp),
      })),
      ownerApproval: parsed.ownerApproval ? {
        ...parsed.ownerApproval,
        timestamp: new Date(parsed.ownerApproval.timestamp),
        systemState: {
          ...parsed.ownerApproval.systemState,
          timestamp: new Date(parsed.ownerApproval.systemState.timestamp),
        },
      } : undefined,
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null; // File doesn't exist yet
    }
    console.error('[State Persistence] Failed to load state:', error);
    throw error;
  }
}

/**
 * Save a state transition to log
 */
export async function saveTransition(transition: StateTransition): Promise<void> {
  try {
    await ensureDirectories();
    
    const serializable = {
      ...transition,
      timestamp: transition.timestamp.toISOString(),
    };
    
    const transitionFile = path.join(getTransitionsDir(), `${transition.id}.json`);
    await fs.writeFile(transitionFile, JSON.stringify(serializable, null, 2), 'utf-8');
  } catch (error) {
    console.error('[State Persistence] Failed to save transition:', error);
    throw error;
  }
}

/**
 * Load full transition history
 */
export async function loadTransitionHistory(): Promise<StateTransition[]> {
  try {
    await ensureDirectories();
    
    const files = await fs.readdir(getTransitionsDir());
    const transitions: StateTransition[] = [];
    
    for (const file of files) {
      if (!file.endsWith('.json')) continue;
      
      const content = await fs.readFile(path.join(getTransitionsDir(), file), 'utf-8');
      const parsed = JSON.parse(content);
      
      transitions.push({
        ...parsed,
        timestamp: new Date(parsed.timestamp),
      });
    }
    
    // Sort by timestamp
    return transitions.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  } catch (error) {
    console.error('[State Persistence] Failed to load transition history:', error);
    return [];
  }
}

/**
 * Save a reauthorization request
 */
export async function saveReauthorizationRequest(request: any): Promise<void> {
  try {
    await ensureDirectories();
    
    const serializable = {
      ...request,
      timestamp: request.timestamp ? request.timestamp.toISOString() : new Date().toISOString(),
    };
    
    const requestFile = path.join(getRequestsDir(), `${request.id}.json`);
    await fs.writeFile(requestFile, JSON.stringify(serializable, null, 2), 'utf-8');
  } catch (error) {
    console.error('[State Persistence] Failed to save reauthorization request:', error);
    throw error;
  }
}

/**
 * Load all reauthorization requests
 */
export async function loadReauthorizationRequests(): Promise<any[]> {
  try {
    await ensureDirectories();
    
    const files = await fs.readdir(getRequestsDir());
    const requests: any[] = [];
    
    for (const file of files) {
      if (!file.endsWith('.json')) continue;
      
      const content = await fs.readFile(path.join(getRequestsDir(), file), 'utf-8');
      const parsed = JSON.parse(content);
      
      requests.push({
        ...parsed,
        timestamp: new Date(parsed.timestamp),
      });
    }
    
    // Sort by timestamp (newest first)
    return requests.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  } catch (error) {
    console.error('[State Persistence] Failed to load reauthorization requests:', error);
    return [];
  }
}

// Export singleton
export const statePersistence = {
  setBaseDirectory,
  saveState,
  loadState,
  saveTransition,
  loadTransitionHistory,
  saveReauthorizationRequest,
  loadReauthorizationRequests,
};
