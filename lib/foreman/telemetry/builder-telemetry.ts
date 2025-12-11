/**
 * Builder Health Reporting and Telemetry
 * 
 * Implements health monitoring, heartbeat, and telemetry for builders
 * - Heartbeat mechanism
 * - Health status reporting
 * - Performance metrics
 * - Telemetry collection
 */

export interface BuilderHeartbeat {
  builder: string
  status: 'active' | 'idle' | 'unhealthy' | 'degraded'
  last_task_id: string | null
  timestamp: string
  health_indicators: {
    api_latency_ms: number
    error_rate: number
    success_rate: number
  }
}

export interface BuilderHealthStatus {
  builder: string
  status: 'healthy' | 'degraded' | 'unhealthy' | 'dead'
  timestamp: string
  checks: {
    api_reachable: boolean
    auth_valid: boolean
    recent_success: boolean
    error_rate: number
    avg_latency_ms: number
  }
  last_success: string | null
  last_error: string | null
}

export interface BuilderTelemetry {
  builder: string
  timestamp: string
  performance: {
    mean_completion_time_ms: number
    p50_ms: number
    p95_ms: number
    p99_ms: number
    avg_iterations: number
    avg_retry_count: number
    fallback_rate: number
  }
  errors: {
    total: number
    types: Record<string, number>
  }
  recent_tasks?: Array<{
    task_id: string
    received_at: string
    validation_started_at?: string
    validation_completed_at?: string
    building_started_at?: string
    completed_at?: string
    qa_runs?: Array<{
      iteration: number
      timestamp: string
      passing: number
      failing: number
    }>
  }>
}

/**
 * In-memory storage for builder metrics (in production, use proper database)
 */
const builderMetrics = new Map<string, {
  lastHeartbeat: Date
  lastTaskId: string | null
  taskHistory: Array<{
    taskId: string
    startTime: Date
    endTime?: Date
    success: boolean
    iterations: number
    retries: number
  }>
  errors: Array<{
    timestamp: Date
    type: string
    message: string
  }>
  latencies: number[]
}>()

/**
 * Get builder heartbeat
 */
export async function getBuilderHeartbeat(builder: string): Promise<BuilderHeartbeat> {
  const metrics = builderMetrics.get(builder) || {
    lastHeartbeat: new Date(),
    lastTaskId: null,
    taskHistory: [],
    errors: [],
    latencies: [],
  }

  // Calculate health indicators
  const recentTasks = metrics.taskHistory.slice(-10)
  const successCount = recentTasks.filter((t) => t.success).length
  const errorCount = metrics.errors.filter(
    (e) => Date.now() - e.timestamp.getTime() < 3600000
  ).length // Last hour
  const avgLatency =
    metrics.latencies.length > 0
      ? metrics.latencies.reduce((a, b) => a + b, 0) / metrics.latencies.length
      : 0

  const errorRate = recentTasks.length > 0 ? 1 - successCount / recentTasks.length : 0
  const successRate = recentTasks.length > 0 ? successCount / recentTasks.length : 1

  // Determine status
  let status: 'active' | 'idle' | 'unhealthy' | 'degraded' = 'idle'
  if (errorRate > 0.5) {
    status = 'unhealthy'
  } else if (errorRate > 0.2) {
    status = 'degraded'
  } else if (recentTasks.length > 0 && Date.now() - metrics.lastHeartbeat.getTime() < 60000) {
    status = 'active'
  }

  // Update heartbeat timestamp
  metrics.lastHeartbeat = new Date()
  builderMetrics.set(builder, metrics)

  return {
    builder,
    status,
    last_task_id: metrics.lastTaskId,
    timestamp: new Date().toISOString(),
    health_indicators: {
      api_latency_ms: avgLatency,
      error_rate: errorRate,
      success_rate: successRate,
    },
  }
}

/**
 * Get builder health status
 */
export async function getBuilderHealthStatus(builder: string): Promise<BuilderHealthStatus> {
  const metrics = builderMetrics.get(builder) || {
    lastHeartbeat: new Date(),
    lastTaskId: null,
    taskHistory: [],
    errors: [],
    latencies: [],
  }

  const recentTasks = metrics.taskHistory.slice(-10)
  const successCount = recentTasks.filter((t) => t.success).length
  const recentErrors = metrics.errors.filter(
    (e) => Date.now() - e.timestamp.getTime() < 3600000
  )
  const avgLatency =
    metrics.latencies.length > 0
      ? metrics.latencies.reduce((a, b) => a + b, 0) / metrics.latencies.length
      : 0

  const errorRate = recentTasks.length > 0 ? 1 - successCount / recentTasks.length : 0

  // Health checks
  const api_reachable = true // In production, check actual API
  const auth_valid = true // In production, validate auth
  const recent_success = recentTasks.length > 0 && recentTasks[recentTasks.length - 1].success
  const heartbeatAge = Date.now() - metrics.lastHeartbeat.getTime()

  // Determine status
  let status: 'healthy' | 'degraded' | 'unhealthy' | 'dead' = 'healthy'
  if (heartbeatAge > 300000) {
    // 5 minutes
    status = 'dead'
  } else if (errorRate > 0.5 || avgLatency > 10000) {
    status = 'unhealthy'
  } else if (errorRate > 0.2 || avgLatency > 5000) {
    status = 'degraded'
  }

  const lastSuccess = recentTasks.find((t) => t.success)
  const lastError = recentErrors.length > 0 ? recentErrors[recentErrors.length - 1] : null

  return {
    builder,
    status,
    timestamp: new Date().toISOString(),
    checks: {
      api_reachable,
      auth_valid,
      recent_success,
      error_rate: errorRate,
      avg_latency_ms: avgLatency,
    },
    last_success: lastSuccess ? lastSuccess.endTime?.toISOString() || null : null,
    last_error: lastError ? lastError.message : null,
  }
}

/**
 * Get builder telemetry
 */
export async function getBuilderTelemetry(builder: string): Promise<BuilderTelemetry> {
  const metrics = builderMetrics.get(builder) || {
    lastHeartbeat: new Date(),
    lastTaskId: null,
    taskHistory: [],
    errors: [],
    latencies: [],
  }

  // Calculate performance metrics
  const completedTasks = metrics.taskHistory.filter((t) => t.endTime)
  const completionTimes = completedTasks.map(
    (t) => t.endTime!.getTime() - t.startTime.getTime()
  )

  const mean_completion_time_ms =
    completionTimes.length > 0
      ? completionTimes.reduce((a, b) => a + b, 0) / completionTimes.length
      : 0

  // Calculate percentiles
  const sortedTimes = [...completionTimes].sort((a, b) => a - b)
  const p50_ms = sortedTimes[Math.floor(sortedTimes.length * 0.5)] || 0
  const p95_ms = sortedTimes[Math.floor(sortedTimes.length * 0.95)] || 0
  const p99_ms = sortedTimes[Math.floor(sortedTimes.length * 0.99)] || 0

  const avg_iterations =
    completedTasks.length > 0
      ? completedTasks.reduce((a, b) => a + b.iterations, 0) / completedTasks.length
      : 0

  const avg_retry_count =
    completedTasks.length > 0
      ? completedTasks.reduce((a, b) => a + b.retries, 0) / completedTasks.length
      : 0

  // Count fallbacks (in real implementation, track actual fallback events)
  const fallback_rate = 0 // Placeholder

  // Error type distribution
  const errorTypes: Record<string, number> = {}
  metrics.errors.forEach((error) => {
    errorTypes[error.type] = (errorTypes[error.type] || 0) + 1
  })

  return {
    builder,
    timestamp: new Date().toISOString(),
    performance: {
      mean_completion_time_ms,
      p50_ms,
      p95_ms,
      p99_ms,
      avg_iterations,
      avg_retry_count,
      fallback_rate,
    },
    errors: {
      total: metrics.errors.length,
      types: errorTypes,
    },
    recent_tasks: metrics.taskHistory.slice(-5).map((task) => ({
      task_id: task.taskId,
      received_at: task.startTime.toISOString(),
      completed_at: task.endTime?.toISOString(),
      qa_runs: [], // Placeholder
    })),
  }
}

/**
 * Detect stale heartbeat
 */
export async function detectStaleHeartbeat(
  builder: string,
  maxAgeSeconds: number
): Promise<{ isStale: boolean; age: number }> {
  const metrics = builderMetrics.get(builder)

  if (!metrics) {
    return {
      isStale: true,
      age: Infinity,
    }
  }

  const ageMs = Date.now() - metrics.lastHeartbeat.getTime()
  const ageSeconds = ageMs / 1000

  return {
    isStale: ageSeconds > maxAgeSeconds,
    age: ageSeconds,
  }
}

/**
 * Record builder task for telemetry
 */
export function recordBuilderTask(
  builder: string,
  taskId: string,
  success: boolean,
  iterations: number,
  retries: number,
  durationMs: number
) {
  const metrics = builderMetrics.get(builder) || {
    lastHeartbeat: new Date(),
    lastTaskId: null,
    taskHistory: [],
    errors: [],
    latencies: [],
  }

  metrics.lastTaskId = taskId
  metrics.taskHistory.push({
    taskId,
    startTime: new Date(Date.now() - durationMs),
    endTime: new Date(),
    success,
    iterations,
    retries,
  })

  metrics.latencies.push(durationMs)

  // Keep only last 100 tasks
  if (metrics.taskHistory.length > 100) {
    metrics.taskHistory.shift()
  }

  // Keep only last 100 latency measurements
  if (metrics.latencies.length > 100) {
    metrics.latencies.shift()
  }

  builderMetrics.set(builder, metrics)
}

/**
 * Record builder error for telemetry
 */
export function recordBuilderError(builder: string, type: string, message: string) {
  const metrics = builderMetrics.get(builder) || {
    lastHeartbeat: new Date(),
    lastTaskId: null,
    taskHistory: [],
    errors: [],
    latencies: [],
  }

  metrics.errors.push({
    timestamp: new Date(),
    type,
    message,
  })

  // Keep only last 100 errors
  if (metrics.errors.length > 100) {
    metrics.errors.shift()
  }

  builderMetrics.set(builder, metrics)
}
