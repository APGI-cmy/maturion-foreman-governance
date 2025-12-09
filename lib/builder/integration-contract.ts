/**
 * Builder Integration Contract
 * Defines the interface between Foreman and Builder agents
 * Ensures consistent communication and error handling
 */

import type { BuilderType } from '@/types/builder';

/**
 * Standard builder request format
 */
export interface BuilderRequest {
  builderType: BuilderType;
  module: string;
  taskDescription: string;
  organisationId: string;
  context?: Record<string, any>;
  metadata?: Record<string, any>;
  specs?: Record<string, any>;
}

/**
 * Standard builder response format
 */
export interface BuilderResponse {
  success: boolean;
  artifacts?: BuilderArtifact[];
  qaResults?: QAResult[];
  error?: string;
  metadata?: Record<string, any>;
}

/**
 * Builder artifact (file changes, new files, etc.)
 */
export interface BuilderArtifact {
  type: 'file_create' | 'file_modify' | 'file_delete';
  path: string;
  content?: string;
  description?: string;
}

/**
 * QA validation result
 */
export interface QAResult {
  check: string;
  passed: boolean;
  message?: string;
  severity?: 'error' | 'warning' | 'info';
}

/**
 * Validate builder request format
 */
export function validateBuilderRequest(request: any): request is BuilderRequest {
  return (
    typeof request === 'object' &&
    request !== null &&
    typeof request.builderType === 'string' &&
    typeof request.module === 'string' &&
    typeof request.taskDescription === 'string' &&
    typeof request.organisationId === 'string'
  );
}

/**
 * Validate builder response format
 */
export function validateBuilderResponse(response: any): response is BuilderResponse {
  return (
    typeof response === 'object' &&
    response !== null &&
    typeof response.success === 'boolean'
  );
}

/**
 * Create standardized builder error response
 */
export function createBuilderErrorResponse(error: string | Error): BuilderResponse {
  return {
    success: false,
    error: error instanceof Error ? error.message : error,
    artifacts: [],
    qaResults: []
  };
}

/**
 * Create standardized builder success response
 */
export function createBuilderSuccessResponse(
  artifacts: BuilderArtifact[],
  qaResults: QAResult[] = []
): BuilderResponse {
  return {
    success: true,
    artifacts,
    qaResults
  };
}
