/**
 * Sort Utilities for Deterministic Operations
 * 
 * Provides consistent sorting for architecture signature generation.
 */

/**
 * Sort array of strings alphabetically
 */
export function sortStrings(arr: string[]): string[] {
  return [...arr].sort((a, b) => a.localeCompare(b));
}

/**
 * Sort array of objects by a specific key
 */
export function sortByKey<T>(arr: T[], key: keyof T): T[] {
  return [...arr].sort((a, b) => {
    const aVal = String(a[key]);
    const bVal = String(b[key]);
    return aVal.localeCompare(bVal);
  });
}

/**
 * Sort object keys recursively
 */
export function sortObjectKeys(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys);
  }

  if (typeof obj === 'object') {
    const sorted: any = {};
    const keys = Object.keys(obj).sort();
    
    for (const key of keys) {
      sorted[key] = sortObjectKeys(obj[key]);
    }
    
    return sorted;
  }

  return obj;
}
