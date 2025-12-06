/**
 * Project Lifecycle Orchestration - Public API
 * Export all project lifecycle functionality
 */

// Registry
export { projectRegistry } from './registry'
export {
  createProject,
  getProject,
  updateProject,
  archiveProject,
  listProjects,
  findProjectByName,
  getActiveProjects,
  getProjectsByPhase,
  completeMilestone,
  getDashboardData,
  getProjectDetail,
  initializeRegistry,
  clearCache,
  getCacheSize
} from './registry'

// Lifecycle
export * from './lifecycle'

// Milestones (excluding addCustomMilestone to avoid conflict)
export {
  getDefaultMilestones,
  calculateProgress,
  calculateWeightedProgress,
  markMilestoneComplete,
  getNextMilestone,
  getMilestonesByPhase,
  getCompletedMilestones,
  getIncompleteMilestones,
  validateMilestone
} from './milestones'

// Storage
export * from './storage'
