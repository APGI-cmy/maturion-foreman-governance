/**
 * Architecture Alerts API Endpoint
 * 
 * GET /api/foreman/architecture/alerts - Get pending ACRs
 * POST /api/foreman/architecture/alerts - Create new ACR
 * 
 * Part of CS2 - Architecture Change Approval Workflow
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  getPendingACRs,
  createACR,
  CreateACROptions,
} from '@/lib/foreman/architecture';

/**
 * GET /api/foreman/architecture/alerts
 * Get all pending Architecture Change Requests
 */
export async function GET(request: NextRequest) {
  try {
    const pendingACRs = await getPendingACRs();
    
    return NextResponse.json({
      success: true,
      acrs: pendingACRs,
      count: pendingACRs.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Architecture Alerts API] Error fetching pending ACRs:', error);
    
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/foreman/architecture/alerts
 * Create a new Architecture Change Request
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    if (!body) {
      return NextResponse.json(
        { error: 'Request body is required' },
        { status: 400 }
      );
    }
    
    // Validate required fields
    const { summary, description, justification, affectedFiles } = body;
    
    if (!summary) {
      return NextResponse.json(
        { error: 'summary is required' },
        { status: 400 }
      );
    }
    
    if (!description) {
      return NextResponse.json(
        { error: 'description is required' },
        { status: 400 }
      );
    }
    
    if (!justification) {
      return NextResponse.json(
        { error: 'justification is required' },
        { status: 400 }
      );
    }
    
    if (!affectedFiles || !Array.isArray(affectedFiles) || affectedFiles.length === 0) {
      return NextResponse.json(
        { error: 'affectedFiles must be a non-empty array' },
        { status: 400 }
      );
    }
    
    // Create ACR
    const options: CreateACROptions = {
      summary,
      description,
      justification,
      affectedFiles,
      affectedComponents: body.affectedComponents,
      riskLevel: body.riskLevel,
      alternatives: body.alternatives,
      breakingChanges: body.breakingChanges,
      migrationRequired: body.migrationRequired,
      relatedIssues: body.relatedIssues,
      buildId: body.buildId,
      sequenceId: body.sequenceId,
      commitSha: body.commitSha,
      branch: body.branch,
    };
    
    const acr = await createACR(options);
    
    return NextResponse.json({
      success: true,
      acr,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Architecture Alerts API] Error creating ACR:', error);
    
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
