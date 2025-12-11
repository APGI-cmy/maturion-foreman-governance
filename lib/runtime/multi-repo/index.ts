/**
 * Multi-Repository Autonomy Layer
 * 
 * Provides cross-repository coordination, governance enforcement,
 * and autonomous operation capabilities across the Maturion platform.
 * 
 * @module runtime/multi-repo
 */

// Workspace Management
export { WorkspaceManager, workspaceManager } from './workspace';
export type {
  Repository,
  Workspace,
  CrossRepoOperation,
  WorkspaceHealth,
  HealthStatus,
  Lock,
  GovernanceBoundary,
  AutonomyPermission,
  ModelScalingRule
} from './workspace';

// Architecture Management
export { CrossRepoArchitectureManager, architectureManager } from './architecture-manager';
export type {
  ArchitectureSignature,
  RepoDependency,
  ArchitectureChange,
  ConsistencyReport,
  ArchitectureMismatch
} from './architecture-manager';

/**
 * Initialize the multi-repo autonomy layer
 */
export async function initializeMultiRepoLayer(): Promise<void> {
  // Discover repositories
  await workspaceManager.discoverRepositories();
  
  // Perform initial health checks
  const repos = workspaceManager.getAllRepositories();
  for (const repo of repos) {
    await workspaceManager.healthCheck(repo.id);
  }
  
  // Fetch architecture signatures
  for (const repo of repos) {
    await architectureManager.fetchArchitecture(repo.id);
  }
}

/**
 * Get multi-repo layer status
 */
export function getMultiRepoStatus() {
  return {
    workspaceHealth: workspaceManager.getWorkspaceHealth(),
    repositories: workspaceManager.getAllRepositories(),
    initialized: true
  };
}
