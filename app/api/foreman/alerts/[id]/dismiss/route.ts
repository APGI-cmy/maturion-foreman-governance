/**
 * CS4 Alerts API - Dismiss Alert
 * POST /api/foreman/alerts/:id/dismiss
 */

import { NextRequest, NextResponse } from 'next/server';
import { dismissAlertById } from '../../../../../../lib/foreman/alerts/alert-engine';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const userId = body.userId || 'system';
    
    const alert = await dismissAlertById(params.id, userId);
    
    return NextResponse.json({
      success: true,
      alert,
      message: 'Alert dismissed successfully',
    });
  } catch (error) {
    console.error('Error dismissing alert:', error);
    
    // Check for specific error codes
    const isValidationError = error instanceof Error && (error as any).code === 'ALERT_REQUIRES_ACKNOWLEDGMENT';
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to dismiss alert'
      },
      { status: isValidationError ? 400 : 500 }
    );
  }
}
