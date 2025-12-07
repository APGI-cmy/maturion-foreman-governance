/**
 * Quality Assurance (QA) Module Exports
 * 
 * Exports all QA and QIEL components
 */

// Log Parsing QA (QIEL-1, QIEL-2, QIEL-3)
export {
  parseLogFile,
  parseAllLogs,
  validateLogsExist,
  generateLogParsingReport,
  loadAllowedWarnings,
  type LogParsingResult,
  type ErrorEntry,
  type WarningEntry,
  type AllowedWarnings,
} from './log-parsing-qa';

// Zero-Warning Policy (QIEL-2)
export {
  runZeroWarningPolicy,
  generateZeroWarningReport,
  type ZeroWarningPolicyResult,
} from './zero-warning-policy';

// Vercel Simulation QA (QIEL-4)
export {
  runVercelSimulation,
  generateVercelSimulationReport,
  type VercelSimulationResult,
} from './vercel-simulation-qa';

// Schema Cohesion Validator (QIEL-5)
export {
  runSchemaCohesionValidation,
  generateSchemaCohesionReport,
  type SchemaCohesionResult,
  type SchemaValidationResult,
  type SchemaMismatch,
} from './schema-cohesion-validator';

// Engine Load Validator (QIEL-6)
export {
  runEngineLoadValidation,
  generateEngineLoadReport,
  type EngineLoadValidationResult,
  type EngineLoadResult,
} from './engine-load-validator';

// QI Incident Writer (QIEL-7)
export {
  recordQIIncident,
  recordQIIncidents,
  recordBuildErrorIncident,
  recordLintErrorIncident,
  recordRuntimeErrorIncident,
  recordSchemaMismatchIncident,
  recordDeploymentFailureIncident,
  type QIIncidentContext,
  type QIIncidentWriteResult,
} from './qi-incident-writer';

// Regression Test Generator (QIEL-8)
export {
  generateRegressionTest,
  generateRegressionTests,
  listRegressionTests,
  countRegressionTests,
  type RegressionTestContext,
  type RegressionTestGenerationResult,
} from './regression-test-generator';

// QIEL Runner (Comprehensive Integration)
export {
  runQIEL,
  runQuickQIEL,
  runFullQIEL,
  saveQIELReport,
  type QIELResult,
} from './qiel-runner';

// Enhanced QA Runner (Legacy - still supported)
export {
  runEnhancedQA,
  runQuickQA,
  runFullQA,
  saveQAReport,
  type EnhancedQAResult,
} from './enhanced-qa-runner';
