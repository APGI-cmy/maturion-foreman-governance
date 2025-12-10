/**
 * Autonomy Pilot Issue Selection API Endpoint
 * 
 * POST /api/autonomy/select-pilot
 * 
 * Evaluates and selects an issue for autonomous pilot execution.
 * Applies labels and posts safety summary to the issue.
 * 
 * Body:
 * {
 *   "owner": "MaturionISMS",
 *   "repo": "maturion-foreman-app",
 *   "issueNumber": 123
 * }
 */

import { NextRequest, NextResponse } from 'next/server'
import { selectPilotIssue, PilotIssue } from '@/lib/foreman/autonomy/pilot-selection'
import { Octokit } from 'octokit'

async function getGitHubClient(): Promise<Octokit> {
  const token = process.env.GITHUB_MCP_TOKEN || process.env.GITHUB_TOKEN
  
  if (!token) {
    throw new Error('GitHub authentication token not configured')
  }
  
  return new Octokit({ auth: token })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { owner, repo, issueNumber } = body
    
    if (!owner || !repo || !issueNumber) {
      return NextResponse.json(
        { error: 'Missing required fields: owner, repo, issueNumber' },
        { status: 400 }
      )
    }
    
    // Fetch issue from GitHub
    const octokit = await getGitHubClient()
    const { data: issueData } = await octokit.rest.issues.get({
      owner,
      repo,
      issue_number: issueNumber
    })
    
    // Convert to PilotIssue format
    const issue: PilotIssue = {
      number: issueData.number,
      title: issueData.title,
      labels: issueData.labels.map((label: any) => 
        typeof label === 'string' ? label : label.name || ''
      ),
      body: issueData.body || '',
      state: issueData.state
    }
    
    // Select pilot issue
    const result = await selectPilotIssue(owner, repo, issue)
    
    return NextResponse.json(result, {
      status: result.success ? 200 : 400
    })
  } catch (error: any) {
    console.error('[Pilot Selection API] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to select pilot issue' },
      { status: 500 }
    )
  }
}
