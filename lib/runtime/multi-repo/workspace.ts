/**
 * Multi-Repository Workspace Manager
 * 
 * Manages connections and state for all repositories in the Maturion ecosystem.
 * Provides unified interface for cross-repo operations.
 */

export interface Repository {
  id: string;
  name: string;
  owner: string;
  url: string;
  branch: string;
  status: 'healthy' | 'degraded' | 'unreachable';
  lastHealthCheck: Date;
  governanceBoundaries: GovernanceBoundary[];
  autonomyPermissions: AutonomyPermission[];
  modelScalingRules: ModelScalingRule[];
}

export interface GovernanceBoundary {
  type: 'CS1' | 'CS2' | 'CS3' | 'CS4' | 'CS5' | 'CS6';
  enforced: boolean;
  overrideAllowed: boolean;
}

export interface AutonomyPermission {
  operation: string;
  allowed: boolean;
  requiresApproval: boolean;
}

export interface ModelScalingRule {
  context: string;
  minTier: string;
  maxTier: string;
}

export interface Workspace {
  repositories: Repository[];
  activeOperations: CrossRepoOperation[];
  healthStatus: WorkspaceHealth;
  lastSync: Date;
}

export interface CrossRepoOperation {
  id: string;
  type: string;
  repositories: string[];
  status: 'pending' | 'running' | 'completed' | 'failed';
  startedAt: Date;
  completedAt?: Date;
}

export interface WorkspaceHealth {
  overall: 'healthy' | 'degraded' | 'critical';
  repoStatuses: Map<string, string>;
  lastCheck: Date;
}

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unreachable';
  message?: string;
  lastCheck: Date;
}

export interface Lock {
  id: string;
  repoId: string;
  acquiredAt: Date;
  expiresAt: Date;
}

/**
 * Workspace Manager Implementation
 */
export class WorkspaceManager {
  private workspace: Workspace;
  private locks: Map<string, Lock>;

  constructor() {
    this.workspace = {
      repositories: [],
      activeOperations: [],
      healthStatus: {
        overall: 'healthy',
        repoStatuses: new Map(),
        lastCheck: new Date()
      },
      lastSync: new Date()
    };
    this.locks = new Map();
  }

  /**
   * Discover and register repositories from configuration
   */
  async discoverRepositories(): Promise<Repository[]> {
    // Load from configuration file or environment
    const repos = await this.loadRepositoryConfiguration();
    
    for (const repo of repos) {
      await this.validateRepository(repo);
      this.workspace.repositories.push(repo);
    }

    return this.workspace.repositories;
  }

  /**
   * Get repository by ID
   */
  getRepository(id: string): Repository | null {
    return this.workspace.repositories.find(r => r.id === id) || null;
  }

  /**
   * Add a new repository to the workspace
   */
  async addRepository(repo: Repository): Promise<void> {
    await this.validateRepository(repo);
    this.workspace.repositories.push(repo);
    await this.persistWorkspace();
  }

  /**
   * Remove repository from workspace
   */
  async removeRepository(id: string): Promise<void> {
    const index = this.workspace.repositories.findIndex(r => r.id === id);
    if (index !== -1) {
      this.workspace.repositories.splice(index, 1);
      await this.persistWorkspace();
    }
  }

  /**
   * Perform health check on repository
   */
  async healthCheck(repoId: string): Promise<HealthStatus> {
    const repo = this.getRepository(repoId);
    if (!repo) {
      return {
        status: 'unreachable',
        message: 'Repository not found',
        lastCheck: new Date()
      };
    }

    try {
      // Perform actual health check (API call, etc.)
      const isHealthy = await this.checkRepositoryHealth(repo);
      
      const status: HealthStatus = {
        status: isHealthy ? 'healthy' : 'degraded',
        lastCheck: new Date()
      };

      repo.status = status.status;
      repo.lastHealthCheck = status.lastCheck;

      return status;
    } catch (error) {
      repo.status = 'unreachable';
      return {
        status: 'unreachable',
        message: error instanceof Error ? error.message : 'Unknown error',
        lastCheck: new Date()
      };
    }
  }

  /**
   * Acquire lock on repository for exclusive operation
   */
  async lockRepository(repoId: string): Promise<Lock> {
    if (this.locks.has(repoId)) {
      throw new Error(`Repository ${repoId} is already locked`);
    }

    const lock: Lock = {
      id: `lock-${repoId}-${Date.now()}`,
      repoId,
      acquiredAt: new Date(),
      expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
    };

    this.locks.set(repoId, lock);
    return lock;
  }

  /**
   * Release lock on repository
   */
  async unlockRepository(lock: Lock): Promise<void> {
    const existingLock = this.locks.get(lock.repoId);
    if (existingLock && existingLock.id === lock.id) {
      this.locks.delete(lock.repoId);
    }
  }

  /**
   * Get all repositories
   */
  getAllRepositories(): Repository[] {
    return [...this.workspace.repositories];
  }

  /**
   * Get workspace health status
   */
  getWorkspaceHealth(): WorkspaceHealth {
    return { ...this.workspace.healthStatus };
  }

  /**
   * Track active cross-repo operation
   */
  trackOperation(operation: CrossRepoOperation): void {
    this.workspace.activeOperations.push(operation);
  }

  /**
   * Update operation status
   */
  updateOperation(operationId: string, status: CrossRepoOperation['status']): void {
    const operation = this.workspace.activeOperations.find(op => op.id === operationId);
    if (operation) {
      operation.status = status;
      if (status === 'completed' || status === 'failed') {
        operation.completedAt = new Date();
      }
    }
  }

  /**
   * Private helper methods
   */
  private async loadRepositoryConfiguration(): Promise<Repository[]> {
    // Load from configuration - placeholder
    return [
      {
        id: 'maturion-foreman-app',
        name: 'maturion-foreman-app',
        owner: 'MaturionISMS',
        url: 'https://github.com/MaturionISMS/maturion-foreman-app',
        branch: 'main',
        status: 'healthy',
        lastHealthCheck: new Date(),
        governanceBoundaries: [
          { type: 'CS1', enforced: true, overrideAllowed: false },
          { type: 'CS2', enforced: true, overrideAllowed: false },
          { type: 'CS3', enforced: true, overrideAllowed: false },
          { type: 'CS4', enforced: true, overrideAllowed: false },
          { type: 'CS5', enforced: true, overrideAllowed: false },
          { type: 'CS6', enforced: true, overrideAllowed: false }
        ],
        autonomyPermissions: [
          { operation: 'create_pr', allowed: true, requiresApproval: false },
          { operation: 'merge_pr', allowed: true, requiresApproval: true },
          { operation: 'modify_architecture', allowed: true, requiresApproval: true }
        ],
        modelScalingRules: []
      }
    ];
  }

  private async validateRepository(repo: Repository): Promise<void> {
    if (!repo.id || !repo.name || !repo.owner || !repo.url) {
      throw new Error('Invalid repository configuration');
    }
  }

  private async checkRepositoryHealth(repo: Repository): Promise<boolean> {
    // Placeholder - would perform actual API health check
    return repo.status !== 'unreachable';
  }

  private async persistWorkspace(): Promise<void> {
    // Persist workspace state to storage
    this.workspace.lastSync = new Date();
  }
}

// Singleton instance
export const workspaceManager = new WorkspaceManager();
