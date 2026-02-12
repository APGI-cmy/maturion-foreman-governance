# MCP Service Contract Architecture

## Overview

Transform MCP from an internal library to a standalone runnable service with explicit REST API contract for independent operation, testing, and deployment.

## Design Principles

### 1. Independence
- Service runs standalone without Next.js app
- Can start from clean environment with documented command
- Self-contained with all dependencies
- Independently testable and deployable

### 2. Explicit Contract
- REST API with clear endpoints
- JSON request/response format
- Standard HTTP status codes
- Comprehensive error responses

### 3. Security First
- API key authentication required
- No operations without valid auth
- All actions audited
- Secrets never exposed in responses

### 4. Observability
- Health endpoint with dependency checks
- Audit logging to Governance Memory
- Request/response logging
- Error tracking

## Service Contract

### Base Configuration

```typescript
interface ServiceConfig {
  port: number               // Server port (default: 3100)
  host: string              // Server host (default: '0.0.0.0')
  apiKey: string            // Required API key for auth
  githubToken: string       // GitHub MCP token
  safetyChecks: SafetyConfig
  auditLogging: AuditConfig
}
```

### Endpoint 1: GET /health

**Purpose**: Report service health and readiness

**Response**:
```typescript
{
  status: 'ok' | 'degraded' | 'error'
  uptime: number                    // Seconds since start
  timestamp: string                 // ISO 8601
  dependencies: {
    github: {
      status: 'ok' | 'error'
      authenticated: boolean
      rateLimitRemaining?: number
    }
    governanceMemory: {
      status: 'ok' | 'error'
      writable: boolean
    }
  }
  version: string
  config: {
    safetyChecksEnabled: boolean
    auditLoggingEnabled: boolean
  }
}
```

**Status Codes**:
- `200`: Service healthy
- `503`: Service degraded or unavailable

**Dependency Checks**:
1. GitHub API connectivity (token validation)
2. Governance Memory writability
3. File system access (for logs)

**Health Logic**:
- `ok`: All dependencies healthy
- `degraded`: Some dependencies failing but core service operational
- `error`: Critical dependencies failing

### Endpoint 2: GET /tools

**Purpose**: Discover available MCP tools and their schemas

**Query Parameters**:
- `format`: 'summary' | 'detailed' (default: 'summary')

**Response (Summary)**:
```typescript
{
  tools: string[]                   // Tool names
  count: number
  timestamp: string
}
```

**Response (Detailed)**:
```typescript
{
  tools: [
    {
      name: string                  // e.g., 'mcp_github_merge_pr'
      description: string
      parameters: {
        [key: string]: {
          type: string              // 'string' | 'number' | 'boolean' | 'array'
          required: boolean
          description: string
        }
      }
      safetyChecks: string[]        // Which checks apply
    }
  ],
  count: number,
  timestamp: string
}
```

**Authentication**: Required (API key)

**Status Codes**:
- `200`: Success
- `401`: Missing or invalid API key

**Available Tools**:
- `mcp_github_merge_pr`
- `mcp_github_enable_auto_merge`
- `mcp_github_close_issue`
- `mcp_github_add_labels`
- `mcp_github_remove_labels`
- `mcp_github_comment`

### Endpoint 3: POST /execute

**Purpose**: Execute an MCP tool with parameters

**Request**:
```typescript
{
  tool: string                      // Tool name
  parameters: {                     // Tool-specific parameters
    owner: string
    repo: string
    prNumber?: number
    issueNumber?: number
    // ... other params
  }
}
```

**Response (Success)**:
```typescript
{
  success: true
  result: any                       // Tool-specific result
  audit: {
    operation: string
    actor: string
    target: {
      owner: string
      repo: string
      number: number
    }
    timestamp: string
    result: 'success'
    executionTimeMs: number
  }
}
```

**Response (Failure)**:
```typescript
{
  success: false
  error: string                     // Error code
  reason: string                    // Human-readable reason
  safetyChecksFailed?: string[]     // Which safety checks blocked
  audit: {
    operation: string
    actor: string
    target: { ... }
    timestamp: string
    result: 'failure'
    errorDetails: string
    executionTimeMs: number
  }
}
```

**Authentication**: Required (API key)

**Status Codes**:
- `200`: Execution completed (success or failure in response body)
- `400`: Invalid request (missing tool, invalid parameters)
- `401`: Missing or invalid API key
- `500`: Server error

**Validation Flow**:
1. Authenticate request (API key)
2. Validate tool exists
3. Validate parameters (required fields, types)
4. Run safety checks (if applicable)
5. Execute tool
6. Log to audit trail
7. Return response

**Error Codes**:
- `INVALID_TOOL`: Unknown tool name
- `INVALID_PARAMETERS`: Missing or malformed parameters
- `SAFETY_CHECK_FAILED`: Safety checks blocked operation
- `GITHUB_API_ERROR`: GitHub API error
- `SYSTEM_ERROR`: Internal server error

## Authentication

### API Key Authentication

**Header**: `Authorization: Bearer <api-key>`

**Validation**:
1. Check `Authorization` header present
2. Extract bearer token
3. Compare against `MCP_API_KEY` environment variable
4. Reject if missing or mismatched

**Response on Auth Failure**:
```typescript
{
  error: 'UNAUTHORIZED',
  message: 'Missing or invalid API key'
}
```

**Security**:
- API key stored in environment variable only
- Never logged or returned in responses
- Constant-time comparison to prevent timing attacks

## Audit Logging

### Audit Event Structure

```typescript
{
  eventType: 'mcp_execution'
  timestamp: string                 // ISO 8601
  operation: string                 // Tool name
  actor: string                     // 'mcp-service'
  request: {
    tool: string
    parameters: any
    authenticated: boolean
  }
  response: {
    success: boolean
    executionTimeMs: number
    error?: string
    safetyChecks?: SafetyCheckResult
  }
  target: {
    owner: string
    repo: string
    number?: number
  }
}
```

### Logging Destinations

1. **Governance Memory**: All tool executions
2. **Console/Stdout**: All requests (including health, tools)
3. **File System**: Optional persistent log file

### Log Levels

- `INFO`: Health checks, tool discovery
- `WARN`: Safety check failures, degraded health
- `ERROR`: Execution failures, auth failures

## Service Entrypoint

### Standalone Server

**File**: `lib/mcp/standalone-server.ts`

**Purpose**: Express/HTTP server for MCP service

**Startup**:
1. Load configuration from environment
2. Validate required config (API key, GitHub token)
3. Initialize MCP server
4. Start HTTP server
5. Log startup success

**Run Command**:
```bash
npm run mcp:serve
# or
node dist/mcp-server.js
# or
docker run -e MCP_API_KEY=... -e GITHUB_MCP_TOKEN=... -p 3100:3100 mcp-service
```

### Configuration Loading

**Required Environment Variables**:
- `MCP_API_KEY`: API key for authentication
- `GITHUB_MCP_TOKEN`: GitHub token for operations

**Optional Environment Variables**:
- `MCP_PORT`: Server port (default: 3100)
- `MCP_HOST`: Server host (default: '0.0.0.0')
- `MCP_REQUIRE_CI_GREEN`: Require CI green (default: true)
- `MCP_RESPECT_BRANCH_PROTECTION`: Respect branch protection (default: true)
- `MCP_REQUIRE_QA_APPROVAL`: Require QA approval (default: true)
- `MCP_REQUIRE_COMPLIANCE_APPROVAL`: Require compliance approval (default: true)
- `MCP_LOG_TO_GOVERNANCE_MEMORY`: Log to governance memory (default: true)

**Validation**:
- Fail startup if required vars missing
- Log configuration on startup (secrets masked)
- Validate GitHub token connectivity

### Graceful Shutdown

**Signals**: SIGTERM, SIGINT

**Shutdown Flow**:
1. Stop accepting new requests
2. Wait for active operations to complete (max 30s)
3. Flush audit logs
4. Close HTTP server
5. Exit with code 0

## Containerization

### Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy application code
COPY lib/ ./lib/
COPY dist/ ./dist/

# Expose service port
EXPOSE 3100

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget --quiet --tries=1 --spider http://localhost:3100/health || exit 1

# Run service
CMD ["node", "dist/mcp-server.js"]
```

**Build**:
```bash
docker build -t mcp-service:latest .
```

**Run**:
```bash
docker run -d \
  -e MCP_API_KEY=your-api-key \
  -e GITHUB_MCP_TOKEN=your-github-token \
  -p 3100:3100 \
  --name mcp-service \
  mcp-service:latest
```

## Error Handling

### Safe Failure Modes

1. **Missing Configuration**:
   - Fail startup immediately
   - Log clear error message
   - Exit with code 1

2. **GitHub API Unavailable**:
   - Health reports degraded
   - Execute returns error with reason
   - Service stays running

3. **Governance Memory Unavailable**:
   - Log to stdout as fallback
   - Continue execution
   - Health reports degraded

4. **Invalid Request**:
   - Return 400 with validation errors
   - Log request for debugging
   - Do not execute tool

5. **Safety Check Failure**:
   - Return 200 with success: false
   - Include which checks failed
   - Log audit event
   - Do not execute operation

## Testing Strategy

### Health Endpoint Tests

```typescript
describe('GET /health', () => {
  it('returns 200 with ok status when healthy')
  it('includes GitHub dependency status')
  it('includes governance memory status')
  it('returns 503 when GitHub unreachable')
  it('returns uptime in seconds')
  it('includes service version')
})
```

### Tools Endpoint Tests

```typescript
describe('GET /tools', () => {
  it('requires authentication')
  it('returns 401 without API key')
  it('returns list of tool names in summary mode')
  it('returns detailed schemas in detailed mode')
  it('includes parameter types and requirements')
  it('includes safety check information')
})
```

### Execute Endpoint Tests

```typescript
describe('POST /execute', () => {
  it('requires authentication')
  it('returns 401 without valid API key')
  it('returns 400 for unknown tool')
  it('returns 400 for missing required parameters')
  it('validates parameter types')
  it('executes tool when valid')
  it('logs audit event for all executions')
  it('returns safety check failures')
  it('measures and returns execution time')
})
```

### Service Startup Tests

```typescript
describe('Service Startup', () => {
  it('starts from clean environment')
  it('fails if MCP_API_KEY missing')
  it('fails if GITHUB_MCP_TOKEN missing')
  it('validates GitHub token on startup')
  it('listens on configured port')
  it('logs startup configuration')
})
```

### Integration Tests

```typescript
describe('Full Flow', () => {
  it('health check before execute')
  it('discover tools')
  it('execute tool with valid params')
  it('verify audit logged')
  it('handle graceful shutdown')
})
```

## Documentation

### User Guide Updates

**File**: `docs/mcp-service-guide.md`

**Sections**:
1. What is MCP Service
2. Running as Standalone Service
3. Environment Variables
4. API Reference (endpoints)
5. Authentication Setup
6. Docker Deployment
7. Monitoring and Health
8. Troubleshooting

### README Updates

Add section on MCP service mode:
- Quick start command
- Required environment variables
- Docker run example

## Success Criteria

1. ✅ Service starts from clean environment with documented command
2. ✅ `/health` returns 200 OK when ready
3. ✅ `/health` checks GitHub and Governance Memory dependencies
4. ✅ `/tools` lists all 6 GitHub tools
5. ✅ `/tools` returns schemas in detailed mode
6. ✅ `/tools` requires authentication
7. ✅ `/execute` validates inputs before execution
8. ✅ `/execute` logs audit events for all operations
9. ✅ `/execute` requires authentication
10. ✅ All endpoints enforce API key auth
11. ✅ Dockerfile builds successfully
12. ✅ Container runs with environment variables
13. ✅ Tests 100% GREEN
14. ✅ Documentation complete

## Compliance

### Build Philosophy Alignment

- **Architecture → Red QA → Build to Green**: This architecture defines complete contract before implementation
- **100% GREEN Requirement**: All tests must pass before merge
- **Zero Test Debt**: No skipped, incomplete, or stub tests

### Governance Supremacy

- **Security**: API key authentication enforced
- **Audit Trail**: All operations logged
- **Safety Checks**: Existing safety rules still apply
- **No Bypass**: No shortcuts around governance

### Quality Integrity Contract

- **Build Integrity**: Standalone service must build successfully
- **Runtime Integrity**: Service must start and respond correctly
- **Deployment Simulation**: Docker build must succeed

## Version History

- **v1.0** (2025-12-14): Initial service contract architecture
- **Status**: Ready for Red QA creation
