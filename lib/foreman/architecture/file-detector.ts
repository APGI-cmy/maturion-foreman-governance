/**
 * Architecture File Detector
 * 
 * Detects when changes touch protected architecture files.
 * Part of CS2 - Architecture Change Approval Workflow.
 */

/**
 * Protected architecture paths that require ACR approval
 */
export const PROTECTED_ARCHITECTURE_PATHS = [
  'docs/architecture/',
  'docs/governance/',
  'foreman/constitution/',
  'foreman/governance/',
  '.github/foreman/agent-contract.md',
  'foreman/true-north-architecture.md',
] as const;

/**
 * Protected architecture file patterns
 */
export const PROTECTED_FILE_PATTERNS = [
  /^docs\/architecture\/.*/,
  /^docs\/governance\/.*/,
  /^foreman\/constitution\/.*/,
  /^foreman\/governance\/.*/,
  /^\.github\/foreman\/agent-contract\.md$/,
  /^foreman\/true-north-architecture\.md$/,
  /builder[_-]protocol\.md$/i,
] as const;

/**
 * Check if a file path is a protected architecture file
 */
export function isProtectedArchitectureFile(filePath: string): boolean {
  // Normalize path (remove leading ./ or /)
  const normalizedPath = filePath.replace(/^\.?\//, '');
  
  // Check against patterns
  return PROTECTED_FILE_PATTERNS.some(pattern => pattern.test(normalizedPath));
}

/**
 * Check if a list of files contains any protected architecture files
 */
export function containsProtectedFiles(filePaths: string[]): boolean {
  return filePaths.some(path => isProtectedArchitectureFile(path));
}

/**
 * Filter a list of files to only protected architecture files
 */
export function filterProtectedFiles(filePaths: string[]): string[] {
  return filePaths.filter(path => isProtectedArchitectureFile(path));
}

/**
 * Get the protection category for a file
 */
export function getProtectionCategory(filePath: string): string | null {
  const normalizedPath = filePath.replace(/^\.?\//, '');
  
  if (/^docs\/architecture\//.test(normalizedPath)) {
    return 'Architecture Documentation';
  }
  if (/^docs\/governance\//.test(normalizedPath)) {
    return 'Governance Documentation';
  }
  if (/^foreman\/constitution\//.test(normalizedPath)) {
    return 'Constitutional Files';
  }
  if (/^foreman\/governance\//.test(normalizedPath)) {
    return 'Governance Rules';
  }
  if (/^\.github\/foreman\/agent-contract\.md$/.test(normalizedPath)) {
    return 'Agent Contract';
  }
  if (/^foreman\/true-north-architecture\.md$/.test(normalizedPath)) {
    return 'True North Architecture';
  }
  if (/builder[_-]protocol\.md$/i.test(normalizedPath)) {
    return 'Builder Protocol';
  }
  
  return null;
}

/**
 * Analyze a set of changed files for architecture impact
 */
export interface ArchitectureImpactAnalysis {
  hasProtectedFiles: boolean;
  protectedFiles: string[];
  categories: Set<string>;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export function analyzeArchitectureImpact(filePaths: string[]): ArchitectureImpactAnalysis {
  const protectedFiles = filterProtectedFiles(filePaths);
  const categories = new Set<string>();
  
  protectedFiles.forEach(file => {
    const category = getProtectionCategory(file);
    if (category) {
      categories.add(category);
    }
  });
  
  // Determine risk level based on what's being changed
  let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
  
  if (categories.has('Constitutional Files') || categories.has('Agent Contract')) {
    riskLevel = 'critical';
  } else if (categories.has('Governance Rules') || categories.has('True North Architecture')) {
    riskLevel = 'high';
  } else if (categories.has('Builder Protocol')) {
    riskLevel = 'high';
  } else if (categories.has('Architecture Documentation') || categories.has('Governance Documentation')) {
    riskLevel = protectedFiles.length > 3 ? 'high' : 'medium';
  }
  
  return {
    hasProtectedFiles: protectedFiles.length > 0,
    protectedFiles,
    categories,
    riskLevel,
  };
}
