/**
 * Import Validator
 * 
 * Validates that all TypeScript imports reference actual exports.
 * Part of QA-First Architecture to prevent import-related build failures.
 * 
 * Architecture: IMPORT_VALIDATION_ARCHITECTURE.md
 */

import * as fs from 'fs';
import * as path from 'path';

export interface MissingExport {
  file: string;
  line: number;
  importedName: string;
  sourceModule: string;
  availableExports: string[];
}

export interface ImportValidationResult {
  valid: boolean;
  missingExports: MissingExport[];
  totalImportsChecked: number;
  filesChecked: number;
}

/**
 * Extract imports from a TypeScript file
 */
function extractImports(content: string, filePath: string): Array<{name: string, from: string, line: number}> {
  const imports: Array<{name: string, from: string, line: number}> = [];
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    // Match: import { name } from 'module'
    const namedMatch = line.match(/import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]([^'"]+)['"]/);
    if (namedMatch) {
      const names = namedMatch[1].split(',').map(n => n.trim());
      const modulePath = namedMatch[2];
      names.forEach(name => {
        imports.push({ name, from: modulePath, line: index + 1 });
      });
    }
  });
  
  return imports;
}

/**
 * Extract exports from a TypeScript file
 */
function extractExports(content: string): string[] {
  const exports: string[] = [];
  const lines = content.split('\n');
  
  lines.forEach(line => {
    // Match: export function name
    const funcMatch = line.match(/export\s+(async\s+)?function\s+(\w+)/);
    if (funcMatch) {
      exports.push(funcMatch[2]);
    }
    
    // Match: export const name
    const constMatch = line.match(/export\s+const\s+(\w+)/);
    if (constMatch) {
      exports.push(constMatch[1]);
    }
    
    // Match: export class name
    const classMatch = line.match(/export\s+class\s+(\w+)/);
    if (classMatch) {
      exports.push(classMatch[1]);
    }
    
    // Match: export interface name
    const interfaceMatch = line.match(/export\s+interface\s+(\w+)/);
    if (interfaceMatch) {
      exports.push(interfaceMatch[1]);
    }
    
    // Match: export type name
    const typeMatch = line.match(/export\s+type\s+(\w+)/);
    if (typeMatch) {
      exports.push(typeMatch[1]);
    }
  });
  
  return exports;
}

/**
 * Resolve module path
 */
function resolveModulePath(importPath: string, fromFile: string, baseDir: string): string | null {
  // Handle @/ alias
  if (importPath.startsWith('@/')) {
    importPath = importPath.replace('@/', '');
  }
  
  // Handle relative imports
  if (importPath.startsWith('./') || importPath.startsWith('../')) {
    const dir = path.dirname(fromFile);
    importPath = path.join(dir, importPath);
  }
  
  // Add .ts extension if not present
  if (!importPath.endsWith('.ts') && !importPath.endsWith('.tsx')) {
    importPath += '.ts';
  }
  
  const fullPath = path.join(baseDir, importPath);
  
  if (fs.existsSync(fullPath)) {
    return fullPath;
  }
  
  return null;
}

/**
 * Validate imports in a single file
 */
function validateFileImports(filePath: string, baseDir: string): MissingExport[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const imports = extractImports(content, filePath);
  const missing: MissingExport[] = [];
  
  for (const imp of imports) {
    const modulePath = resolveModulePath(imp.from, filePath, baseDir);
    
    if (!modulePath) {
      // Module file not found - could be external package
      continue;
    }
    
    const moduleContent = fs.readFileSync(modulePath, 'utf-8');
    const exportedNames = extractExports(moduleContent);
    
    if (!exportedNames.includes(imp.name)) {
      missing.push({
        file: filePath.replace(baseDir + '/', ''),
        line: imp.line,
        importedName: imp.name,
        sourceModule: imp.from,
        availableExports: exports,
      });
    }
  }
  
  return missing;
}

/**
 * Validate all imports in specified files
 */
export async function validateAllImports(files: string[], baseDir: string = process.cwd()): Promise<ImportValidationResult> {
  let missingExports: MissingExport[] = [];
  let totalImportsChecked = 0;
  
  for (const file of files) {
    const fullPath = path.join(baseDir, file);
    if (fs.existsSync(fullPath)) {
      const missing = validateFileImports(fullPath, baseDir);
      missingExports = missingExports.concat(missing);
      
      const content = fs.readFileSync(fullPath, 'utf-8');
      const imports = extractImports(content, fullPath);
      totalImportsChecked += imports.length;
    }
  }
  
  return {
    valid: missingExports.length === 0,
    missingExports,
    totalImportsChecked,
    filesChecked: files.length,
  };
}

/**
 * Suggest correct import based on available exports
 */
export function suggestCorrectImport(missing: MissingExport): string[] {
  const suggestions: string[] = [];
  
  // Find similar names
  const importedLower = missing.importedName.toLowerCase();
  for (const exp of missing.availableExports) {
    const expLower = exp.toLowerCase();
    if (expLower.includes(importedLower) || importedLower.includes(expLower)) {
      suggestions.push(exp);
    }
  }
  
  return suggestions.length > 0 ? suggestions : missing.availableExports;
}
