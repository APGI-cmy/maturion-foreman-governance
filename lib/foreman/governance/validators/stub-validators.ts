/**
 * Stub validators for CS2-CS6 and GSR
 * 
 * These are placeholder implementations that pass by default.
 * Full implementations to be completed in future iterations.
 */

export interface ValidationContext {
  prNumber: number;
  commitSha: string;
  evidenceDir?: string;
  logsDir?: string;
  workspaceRoot?: string;
  changedFiles?: string[];
}

export interface ControlResult {
  controlName: string;
  status: 'PASS' | 'FAIL';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  evidence: any[];
  violations?: any[];
  message: string;
  timestamp: string;
}

export async function validateCS2(context: ValidationContext): Promise<ControlResult> {
  return {
    controlName: 'CS2',
    status: 'PASS',
    severity: 'CRITICAL',
    evidence: [],
    message: 'CS2 (Architecture Approval) validation not yet implemented (stub - passes by default)',
    timestamp: new Date().toISOString()
  };
}

export async function validateCS3(context: ValidationContext): Promise<ControlResult> {
  return {
    controlName: 'CS3',
    status: 'PASS',
    severity: 'HIGH',
    evidence: [],
    message: 'CS3 (Incident Feedback) validation not yet implemented (stub - passes by default)',
    timestamp: new Date().toISOString()
  };
}

export async function validateCS4(context: ValidationContext): Promise<ControlResult> {
  return {
    controlName: 'CS4',
    status: 'PASS',
    severity: 'HIGH',
    evidence: [],
    message: 'CS4 (Compliance Monitoring) validation not yet implemented (stub - passes by default)',
    timestamp: new Date().toISOString()
  };
}

export async function validateCS5(context: ValidationContext): Promise<ControlResult> {
  return {
    controlName: 'CS5',
    status: 'PASS',
    severity: 'MEDIUM',
    evidence: [],
    message: 'CS5 (Performance Enforcement) validation not yet implemented (stub - passes by default)',
    timestamp: new Date().toISOString()
  };
}

export async function validateCS6(context: ValidationContext): Promise<ControlResult> {
  return {
    controlName: 'CS6',
    status: 'PASS',
    severity: 'MEDIUM',
    evidence: [],
    message: 'CS6 (Execution Boundary) validation not yet implemented (stub - passes by default)',
    timestamp: new Date().toISOString()
  };
}

export async function validateGSR(context: ValidationContext): Promise<ControlResult> {
  return {
    controlName: 'GSR',
    status: 'PASS',
    severity: 'CRITICAL',
    evidence: [],
    message: 'GSR (Governance Supremacy Rule) validation not yet implemented (stub - passes by default)',
    timestamp: new Date().toISOString()
  };
}
