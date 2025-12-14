/**
 * MCP Control Plane - HTTP Service Wrapper
 *
 * Purpose:
 * - Runs MCP as an always-on, independently deployable control plane service
 * - Exposes endpoints for Foreman (or other clients) to use MCP tools at runtime
 *
 * Endpoints:
 * - GET  /health  -> basic service + MCP config status
 * - GET  /tools   -> list available MCP tools
 * - POST /execute -> execute a tool by name with parameters
 *
 * Governance note:
 * - This wrapper does NOT weaken safety checks. Safety is enforced by MCP internals.
 */

import http from 'node:http'
import { URL } from 'node:url'

import {
  initializeMCPServer,
  listTools,
  executeTool,
  getMCPStatus
} from '@/lib/mcp/server'

import { getMCPConfig } from '@/lib/mcp/config'

const PORT = Number(process.env.PORT || 3333)
const HOST = '0.0.0.0'

function json(res: http.ServerResponse, status: number, body: any) {
  const payload = JSON.stringify(body)
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  })
  res.end(payload)
}

function readJson(req: http.IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', chunk => (data += chunk))
    req.on('end', () => {
      if (!data) return resolve({})
      try {
        resolve(JSON.parse(data))
      } catch (e) {
        reject(new Error('Invalid JSON body'))
      }
    })
    req.on('error', reject)
  })
}

async function bootstrap() {
  // Initialize MCP using repository config (expects env vars like GITHUB_MCP_TOKEN)
  const config = getMCPConfig()
  await initializeMCPServer(config)
  console.log(`[MCP Control Plane] Initialized. Listening on http://${HOST}:${PORT}`)
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)
    const path = url.pathname
    const method = (req.method || 'GET').toUpperCase()

    // Basic health
    if (method === 'GET' && path === '/health') {
      const status = await getMCPStatus()
      return json(res, 200, {
        ok: true,
        service: 'maturion-mcp-control-plane',
        timestamp: new Date().toISOString(),
        mcp: status
      })
    }

    // Tool list
    if (method === 'GET' && path === '/tools') {
      return json(res, 200, {
        tools: listTools(),
        timestamp: new Date().toISOString()
      })
    }

    // Execute tool
    if (method === 'POST' && path === '/execute') {
      const body = await readJson(req)
      const toolName = body?.toolName
      const parameters = body?.parameters ?? {}

      if (!toolName || typeof toolName !== 'string') {
        return json(res, 400, { error: 'toolName is required (string)' })
      }

      const result = await executeTool(toolName, parameters)
      return json(res, 200, result)
    }

    // Not found
    return json(res, 404, { error: 'Not found', path, method })
  } catch (err: any) {
    return json(res, 500, { error: 'Internal error', reason: err?.message || String(err) })
  }
})

process.on('SIGTERM', () => server.close(() => process.exit(0)))
process.on('SIGINT', () => server.close(() => process.exit(0)))

bootstrap()
  .then(() => server.listen(PORT, HOST))
  .catch(err => {
    console.error('[MCP Control Plane] Failed to start:', err?.message || err)
    process.exit(1)
  })
