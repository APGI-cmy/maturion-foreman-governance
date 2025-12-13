/**
 * Architecture Constraint Foundations - Public API
 * Wave 3A: Constraint Model & Signatures
 * 
 * This module provides the public API for the Architecture Constraint Engine (ACE).
 * It exposes operations for constraint management and architecture signature generation.
 * 
 * Version: 1.0.0
 * Status: Foundation (Read-Only in Wave 3A)
 */

// Export Constraint Registry operations
export {
  getAllConstraints,
  getConstraintById,
  queryConstraints,
  clearRegistryCache,
} from './registry';

// Export Architecture Signature operations
export {
  generateArchitectureSignature,
  hashSignature,
  compareSignatures,
  loadSignatureFromFile,
  saveSignatureToFile,
} from './signature-engine';

// Export validation utilities
export { validateConstraint } from './utils/validation';

// Export types
export type { ValidationResult } from './utils/validation';
