/**
 * Constraint Registry
 * 
 * Central catalog of architectural constraints (Read-only in Wave 3A).
 * Provides operations to list, query, and validate constraints.
 */

import fs from 'fs/promises';
import path from 'path';
import {
  ConstraintDeclaration,
  ConstraintType,
  ConstraintSeverity,
  ConstraintQueryResult,
} from '../../../types/constraints';

/**
 * Registry storage path
 */
const REGISTRY_PATH = path.join(process.cwd(), 'foreman', 'constraints', 'registry.json');

/**
 * In-memory cache for registry
 */
let registryCache: ConstraintDeclaration[] | null = null;

/**
 * Load registry from file
 */
async function loadRegistry(): Promise<ConstraintDeclaration[]> {
  if (registryCache) {
    return registryCache;
  }

  try {
    const content = await fs.readFile(REGISTRY_PATH, 'utf-8');
    const constraints = JSON.parse(content);
    
    if (!Array.isArray(constraints)) {
      console.error('[Registry] Registry file is not an array');
      return [];
    }

    registryCache = constraints;
    return constraints;
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      // Registry file doesn't exist yet - return empty array
      registryCache = [];
      return [];
    }
    
    console.error('[Registry] Error loading registry:', error);
    return [];
  }
}

/**
 * Get all registered constraints
 */
export async function getAllConstraints(): Promise<ConstraintDeclaration[]> {
  return await loadRegistry();
}

/**
 * Get constraint by ID
 */
export async function getConstraintById(id: string): Promise<ConstraintDeclaration | null> {
  const constraints = await loadRegistry();
  return constraints.find(c => c.id === id) || null;
}

/**
 * Query constraints with filters
 */
export async function queryConstraints(filters: {
  type?: ConstraintType;
  severity?: ConstraintSeverity;
  scope?: string;
  owner?: string;
}): Promise<ConstraintQueryResult> {
  const allConstraints = await loadRegistry();
  
  let filtered = allConstraints;

  // Apply filters
  if (filters.type) {
    filtered = filtered.filter(c => c.type === filters.type);
  }

  if (filters.severity) {
    filtered = filtered.filter(c => c.severity === filters.severity);
  }

  if (filters.scope) {
    filtered = filtered.filter(c => c.scope === filters.scope);
  }

  if (filters.owner) {
    filtered = filtered.filter(c => c.owner === filters.owner);
  }

  return {
    constraints: filtered,
    total: allConstraints.length,
    filtered: filtered.length,
  };
}

/**
 * Clear registry cache (for testing)
 */
export function clearRegistryCache(): void {
  registryCache = null;
}
