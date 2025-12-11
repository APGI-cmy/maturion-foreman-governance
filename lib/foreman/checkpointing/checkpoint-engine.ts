/**
 * Builder Checkpointing Engine - Phase 3 v1.1
 */

import { BuilderCheckpoint } from '@/types/builder-protocol-v1.1'
import * as fs from 'fs'
import * as path from 'path'
import * as crypto from 'crypto'

const checkpointStore = new Map<string, BuilderCheckpoint[]>()
const CHECKPOINT_DIR = path.join(process.cwd(), 'memory', 'checkpoints')

if (!fs.existsSync(CHECKPOINT_DIR)) {
  fs.mkdirSync(CHECKPOINT_DIR, { recursive: true })
}

export async function createCheckpoint(
  taskId: string,
  builder: string,
  iteration: number,
  qaStatus: { total: number; passing: number; failing: number },
  architectureAssumptions: string[],
  qaAssumptions: string[],
  nextAction: string
): Promise<BuilderCheckpoint> {
  const checkpointId = crypto.createHash('sha256')
    .update(`${taskId}-${iteration}-${Date.now()}`)
    .digest('hex').substring(0, 16)
  
  const checkpoint: BuilderCheckpoint = {
    checkpoint_id: checkpointId,
    task_id: taskId,
    builder,
    iteration,
    qa_status: qaStatus,
    architecture_assumptions: architectureAssumptions,
    qa_assumptions: qaAssumptions,
    next_action: nextAction,
    timestamp: new Date().toISOString()
  }
  
  if (!checkpointStore.has(taskId)) {
    checkpointStore.set(taskId, [])
  }
  checkpointStore.get(taskId)!.push(checkpoint)
  
  const filePath = path.join(CHECKPOINT_DIR, `${checkpointId}.json`)
  fs.writeFileSync(filePath, JSON.stringify(checkpoint, null, 2))
  
  return checkpoint
}

export function getCheckpointsByTaskId(taskId: string): BuilderCheckpoint[] {
  return checkpointStore.get(taskId) || []
}

export function getCheckpointById(checkpointId: string): BuilderCheckpoint | null {
  for (const checkpoints of checkpointStore.values()) {
    const checkpoint = checkpoints.find(cp => cp.checkpoint_id === checkpointId)
    if (checkpoint) return checkpoint
  }
  
  const filePath = path.join(CHECKPOINT_DIR, `${checkpointId}.json`)
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  }
  
  return null
}

export function getLastCheckpoint(taskId: string): BuilderCheckpoint | null {
  const checkpoints = getCheckpointsByTaskId(taskId)
  return checkpoints.length > 0 ? checkpoints[checkpoints.length - 1] : null
}

export function validateCheckpoint(checkpoint: any): boolean {
  const required = ['checkpoint_id', 'task_id', 'builder', 'iteration', 'qa_status', 
                   'architecture_assumptions', 'qa_assumptions', 'next_action', 'timestamp']
  return required.every(field => field in checkpoint) &&
         typeof checkpoint.qa_status.total === 'number' &&
         Array.isArray(checkpoint.architecture_assumptions) &&
         Array.isArray(checkpoint.qa_assumptions)
}

export function validateCheckpointIntegrity(checkpoint: BuilderCheckpoint): boolean {
  if (!validateCheckpoint(checkpoint)) return false
  
  const { total, passing, failing } = checkpoint.qa_status
  if (passing + failing !== total || passing < 0 || failing < 0) return false
  
  return !isNaN(new Date(checkpoint.timestamp).getTime())
}

export function detectCorruptedCheckpoint(checkpointId: string): boolean {
  const checkpoint = getCheckpointById(checkpointId)
  return !checkpoint || !validateCheckpointIntegrity(checkpoint)
}

export function resumeFromCheckpoint(taskId: string) {
  const checkpoint = getLastCheckpoint(taskId)
  if (!checkpoint || !validateCheckpointIntegrity(checkpoint)) return null
  
  return {
    taskId: checkpoint.task_id,
    builder: checkpoint.builder,
    iteration: checkpoint.iteration,
    qaStatus: checkpoint.qa_status,
    architectureAssumptions: checkpoint.architecture_assumptions,
    qaAssumptions: checkpoint.qa_assumptions,
    nextAction: checkpoint.next_action,
    timestamp: checkpoint.timestamp
  }
}

export async function checkpointBeforeIteration(
  taskId: string, builder: string, iteration: number,
  qaStatus: { total: number; passing: number; failing: number },
  context: { architectureAssumptions: string[]; qaAssumptions: string[] }
): Promise<BuilderCheckpoint> {
  return createCheckpoint(taskId, builder, iteration, qaStatus, 
    context.architectureAssumptions, context.qaAssumptions, `Iteration ${iteration + 1}`)
}

export async function checkpointAfterQA(
  taskId: string, builder: string, iteration: number,
  qaStatus: { total: number; passing: number; failing: number },
  context: { architectureAssumptions: string[]; qaAssumptions: string[] }
): Promise<BuilderCheckpoint> {
  return createCheckpoint(taskId, builder, iteration, qaStatus,
    context.architectureAssumptions, context.qaAssumptions,
    qaStatus.failing === 0 ? 'Build complete' : `Fix ${qaStatus.failing} failing tests`)
}

export async function checkpointBeforeEscalation(
  taskId: string, builder: string, iteration: number,
  qaStatus: { total: number; passing: number; failing: number },
  context: { architectureAssumptions: string[]; qaAssumptions: string[] },
  escalationReason: string
): Promise<BuilderCheckpoint> {
  return createCheckpoint(taskId, builder, iteration, qaStatus,
    context.architectureAssumptions, context.qaAssumptions, `Escalating: ${escalationReason}`)
}

export async function checkpointOnCompletion(
  taskId: string, builder: string, iteration: number,
  qaStatus: { total: number; passing: number; failing: number },
  context: { architectureAssumptions: string[]; qaAssumptions: string[] }
): Promise<BuilderCheckpoint> {
  return createCheckpoint(taskId, builder, iteration, qaStatus,
    context.architectureAssumptions, context.qaAssumptions, 'Build completed successfully')
}

export async function checkpointOnFailure(
  taskId: string, builder: string, iteration: number,
  qaStatus: { total: number; passing: number; failing: number },
  context: { architectureAssumptions: string[]; qaAssumptions: string[] },
  failureReason: string
): Promise<BuilderCheckpoint> {
  return createCheckpoint(taskId, builder, iteration, qaStatus,
    context.architectureAssumptions, context.qaAssumptions, `Build failed: ${failureReason}`)
}

export function clearCheckpoints(taskId: string): void {
  const checkpoints = getCheckpointsByTaskId(taskId)
  checkpoints.forEach(cp => {
    const filePath = path.join(CHECKPOINT_DIR, `${cp.checkpoint_id}.json`)
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
  })
  checkpointStore.delete(taskId)
}
