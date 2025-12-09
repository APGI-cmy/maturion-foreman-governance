/**
 * Feature Deployment Validator
 * 
 * Validates that key features are properly deployed and functional.
 * This ensures features that were built are actually wired up and accessible.
 * 
 * Part of QIEL - Quality Integrity Enforcement Layer
 */

import * as fs from 'fs';
import * as path from 'path';

export interface FeatureDeploymentResult {
  passed: boolean;
  featuresValidated: number;
  featuresPassed: number;
  featuresFailed: number;
  checks: {
    parkingStationUI: boolean;
    parkingStationAPI: boolean;
    parkingStationSidebar: boolean;
    parkingStationTypes: boolean;
    parkingStationTests: boolean;
  };
  errors: string[];
  warnings: string[];
  summary: string;
}

/**
 * Validate Parking Station Feature Deployment
 */
function validateParkingStationDeployment(projectDir: string): {
  passed: boolean;
  checks: Record<string, boolean>;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  const checks: Record<string, boolean> = {
    parkingStationUI: false,
    parkingStationAPI: false,
    parkingStationSidebar: false,
    parkingStationTypes: false,
    parkingStationTests: false,
  };

  // Check 1: UI Page exists
  const uiPath = path.join(projectDir, 'app/foreman/parking-station/page.tsx');
  if (fs.existsSync(uiPath)) {
    checks.parkingStationUI = true;
    
    // Verify the page has proper content
    const content = fs.readFileSync(uiPath, 'utf-8');
    if (!content.includes('ParkingStationEntry')) {
      warnings.push('Parking Station UI exists but may not have proper type imports');
    }
    if (!content.includes('/api/foreman/parking-station')) {
      errors.push('Parking Station UI does not call the API endpoint');
      checks.parkingStationUI = false;
    }
  } else {
    errors.push('Parking Station UI page not found at app/foreman/parking-station/page.tsx');
  }

  // Check 2: API Routes exist
  const apiRoutes = [
    'app/api/foreman/parking-station/route.ts',
    'app/api/foreman/parking-station/scan/route.ts',
    'app/api/foreman/parking-station/update/route.ts',
  ];

  let apiRoutesValid = true;
  for (const route of apiRoutes) {
    const routePath = path.join(projectDir, route);
    if (!fs.existsSync(routePath)) {
      errors.push(`Parking Station API route not found: ${route}`);
      apiRoutesValid = false;
    }
  }
  checks.parkingStationAPI = apiRoutesValid;

  // Check 3: Sidebar integration
  const sidebarPath = path.join(projectDir, 'components/foreman/Sidebar.tsx');
  if (fs.existsSync(sidebarPath)) {
    const sidebarContent = fs.readFileSync(sidebarPath, 'utf-8');
    if (sidebarContent.includes('parking-station') && sidebarContent.includes('/foreman/parking-station')) {
      checks.parkingStationSidebar = true;
    } else {
      errors.push('Parking Station not integrated into Sidebar navigation');
    }
  } else {
    errors.push('Sidebar component not found');
  }

  // Check 4: Type definitions exist
  const typesPath = path.join(projectDir, 'types/parking-station.ts');
  if (fs.existsSync(typesPath)) {
    const typesContent = fs.readFileSync(typesPath, 'utf-8');
    if (typesContent.includes('ParkingStationEntry') && 
        typesContent.includes('ParkingStationStats')) {
      checks.parkingStationTypes = true;
    } else {
      errors.push('Parking Station types file exists but missing required type exports');
    }
  } else {
    errors.push('Parking Station types not found at types/parking-station.ts');
  }

  // Check 5: Tests exist
  const testsPath = path.join(projectDir, 'tests/parking-station/parking-station.test.ts');
  if (fs.existsSync(testsPath)) {
    const testsContent = fs.readFileSync(testsPath, 'utf-8');
    if (testsContent.includes('describe') && testsContent.includes('Parking Station')) {
      checks.parkingStationTests = true;
    } else {
      warnings.push('Parking Station tests file exists but may not have proper test structure');
    }
  } else {
    warnings.push('Parking Station tests not found - feature should have test coverage');
  }

  const allChecksPassed = Object.values(checks).every(check => check === true);
  
  return {
    passed: allChecksPassed && errors.length === 0,
    checks,
    errors,
    warnings,
  };
}

/**
 * Run feature deployment validation
 */
export function runFeatureDeploymentValidation(
  projectDir: string = process.cwd()
): FeatureDeploymentResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Validate Parking Station (main feature to check)
  const parkingStationResult = validateParkingStationDeployment(projectDir);
  
  errors.push(...parkingStationResult.errors);
  warnings.push(...parkingStationResult.warnings);

  const checks = {
    parkingStationUI: parkingStationResult.checks.parkingStationUI,
    parkingStationAPI: parkingStationResult.checks.parkingStationAPI,
    parkingStationSidebar: parkingStationResult.checks.parkingStationSidebar,
    parkingStationTypes: parkingStationResult.checks.parkingStationTypes,
    parkingStationTests: parkingStationResult.checks.parkingStationTests,
  };

  const featuresValidated = 1; // Currently only parking station
  const featuresPassed = parkingStationResult.passed ? 1 : 0;
  const featuresFailed = featuresValidated - featuresPassed;

  const passed = parkingStationResult.passed && errors.length === 0;

  let summary = `Feature Deployment Validation: ${passed ? 'PASSED' : 'FAILED'}\n`;
  summary += `Features Validated: ${featuresValidated}\n`;
  summary += `Features Passed: ${featuresPassed}\n`;
  summary += `Features Failed: ${featuresFailed}\n`;
  
  if (errors.length > 0) {
    summary += `\nERRORS (${errors.length}):\n`;
    errors.forEach((error, idx) => {
      summary += `  ${idx + 1}. ${error}\n`;
    });
  }
  
  if (warnings.length > 0) {
    summary += `\nWARNINGS (${warnings.length}):\n`;
    warnings.forEach((warning, idx) => {
      summary += `  ${idx + 1}. ${warning}\n`;
    });
  }

  summary += '\nParking Station Checks:\n';
  summary += `  - UI Page: ${checks.parkingStationUI ? '✅ PASS' : '❌ FAIL'}\n`;
  summary += `  - API Routes: ${checks.parkingStationAPI ? '✅ PASS' : '❌ FAIL'}\n`;
  summary += `  - Sidebar Integration: ${checks.parkingStationSidebar ? '✅ PASS' : '❌ FAIL'}\n`;
  summary += `  - Type Definitions: ${checks.parkingStationTypes ? '✅ PASS' : '❌ FAIL'}\n`;
  summary += `  - Test Coverage: ${checks.parkingStationTests ? '✅ PASS' : '⚠️  WARNING'}\n`;

  return {
    passed,
    featuresValidated,
    featuresPassed,
    featuresFailed,
    checks,
    errors,
    warnings,
    summary,
  };
}

/**
 * Generate feature deployment validation report
 */
export function generateFeatureDeploymentReport(
  result: FeatureDeploymentResult
): string {
  const report: string[] = [];

  report.push('# Feature Deployment Validation Report');
  report.push('');
  report.push(`**Status**: ${result.passed ? '✅ PASSED' : '❌ FAILED'}`);
  report.push(`**Features Validated**: ${result.featuresValidated}`);
  report.push(`**Features Passed**: ${result.featuresPassed}`);
  report.push(`**Features Failed**: ${result.featuresFailed}`);
  report.push('');

  report.push('## Parking Station Feature');
  report.push('');
  report.push('| Check | Status |');
  report.push('|-------|--------|');
  report.push(`| UI Page | ${result.checks.parkingStationUI ? '✅ PASS' : '❌ FAIL'} |`);
  report.push(`| API Routes | ${result.checks.parkingStationAPI ? '✅ PASS' : '❌ FAIL'} |`);
  report.push(`| Sidebar Integration | ${result.checks.parkingStationSidebar ? '✅ PASS' : '❌ FAIL'} |`);
  report.push(`| Type Definitions | ${result.checks.parkingStationTypes ? '✅ PASS' : '❌ FAIL'} |`);
  report.push(`| Test Coverage | ${result.checks.parkingStationTests ? '✅ PASS' : '⚠️  WARNING'} |`);
  report.push('');

  if (result.errors.length > 0) {
    report.push('## Errors');
    report.push('');
    result.errors.forEach((error, idx) => {
      report.push(`${idx + 1}. ❌ ${error}`);
    });
    report.push('');
  }

  if (result.warnings.length > 0) {
    report.push('## Warnings');
    report.push('');
    result.warnings.forEach((warning, idx) => {
      report.push(`${idx + 1}. ⚠️  ${warning}`);
    });
    report.push('');
  }

  report.push('## Summary');
  report.push('');
  report.push(result.summary);
  report.push('');

  report.push('---');
  report.push('*Feature Deployment Validator - Part of QIEL*');

  return report.join('\n');
}
