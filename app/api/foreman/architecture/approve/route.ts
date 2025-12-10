/**
 * Architecture Approval API Endpoint
 * 
 * POST /api/foreman/architecture/approve - Approve/Reject/Discuss ACR
 * 
 * Part of CS2 - Architecture Change Approval Workflow
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  reviewACR,
  ReviewACROptions,
} from '@/lib/foreman/architecture';

/**
 * POST /api/foreman/architecture/approve
 * Review an Architecture Change Request (approve/reject/discuss)
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
    const { acrId, decision, reviewedBy } = body;
    
    if (!acrId) {
      return NextResponse.json(
        { error: 'acrId is required' },
        { status: 400 }
      );
    }
    
    if (!decision) {
      return NextResponse.json(
        { error: 'decision is required (approve, reject, or discuss)' },
        { status: 400 }
      );
    }
    
    if (!['approve', 'reject', 'discuss'].includes(decision)) {
      return NextResponse.json(
        { error: 'decision must be one of: approve, reject, discuss' },
        { status: 400 }
      );
    }
    
    if (!reviewedBy) {
      return NextResponse.json(
        { error: 'reviewedBy is required' },
        { status: 400 }
      );
    }
    
    // Review ACR
    const options: ReviewACROptions = {
      acrId,
      decision,
      comments: body.comments,
      reviewedBy,
    };
    
    const result = await reviewACR(options);
    
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      acr: result.acr,
      decision,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Architecture Approval API] Error reviewing ACR:', error);
    
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
