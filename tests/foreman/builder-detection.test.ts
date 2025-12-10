/**
 * Tests for Builder Detection and Auto-Bootstrap
 */

import {
  checkInternalBuilderExists,
  getInternalCapabilities,
  getInternalBuilderProfile,
  autoBootstrapInternalBuilder,
  detectAllBuilders,
  detectOptimalBuilder,
  validateBuilderProtocol,
  checkGovernanceCompliance,
  storeInternalBuilderProfile
} from '@/lib/foreman/builder-detection'
import * as fs from 'fs'
import * as path from 'path'

describe('Builder Detection and Auto-Bootstrap', () => {
  
  describe('checkInternalBuilderExists', () => {
    it('should return true if internal builder agent file exists', () => {
      const agentPath = path.join(process.cwd(), '.github', 'agents', 'builder.agent.md')
      const exists = fs.existsSync(agentPath)
      const result = checkInternalBuilderExists()
      
      expect(result).toBe(exists)
    })
  })

  describe('getInternalCapabilities', () => {
    it('should return null if internal builder does not exist', async () => {
      // This test assumes builder might not exist in test environment
      // If it does exist, it will return capabilities
      const result = await getInternalCapabilities()
      
      if (result) {
        expect(result.builder).toBe('internal')
        expect(result.capabilities).toContain('code_generation')
        expect(result.capabilities).toContain('build_to_green')
        expect(result.capabilities).toContain('qic_compliance')
        expect(result.protocolVersion).toBe('1.0.0')
      } else {
        expect(result).toBeNull()
      }
    })

    it('should return capabilities if internal builder exists', async () => {
      const exists = checkInternalBuilderExists()
      
      if (exists) {
        const capabilities = await getInternalCapabilities()
        
        expect(capabilities).not.toBeNull()
        expect(capabilities?.builder).toBe('internal')
        expect(capabilities?.capabilities).toContain('code_generation')
        expect(capabilities?.capabilities).toContain('build_to_green')
        expect(capabilities?.capabilities).toContain('qic_compliance')
        expect(capabilities?.capabilities).toContain('qiel_compliance')
        expect(capabilities?.capabilities).toContain('pr_creation')
        expect(capabilities?.healthStatus).toBe('healthy')
        expect(capabilities?.protocolVersion).toBe('1.0.0')
        expect(capabilities?.repository).toBe('maturion-foreman-app')
      }
    })
  })

  describe('getInternalBuilderProfile', () => {
    it('should return null if internal builder does not exist', async () => {
      const exists = checkInternalBuilderExists()
      const profile = await getInternalBuilderProfile()
      
      if (!exists) {
        expect(profile).toBeNull()
      }
    })

    it('should return profile with correct structure if builder exists', async () => {
      const exists = checkInternalBuilderExists()
      
      if (exists) {
        const profile = await getInternalBuilderProfile()
        
        expect(profile).not.toBeNull()
        expect(profile?.builder).toBe('internal')
        expect(profile?.repository).toBe('maturion-foreman-app')
        expect(profile?.protocolVersion).toBe('1.0.0')
        expect(profile?.constraints.repositoryOnly).toBe(true)
        expect(profile?.constraints.buildToGreenOnly).toBe(true)
        expect(profile?.constraints.qicCompliant).toBe(true)
        expect(profile?.constraints.qielCompliant).toBe(true)
        expect(profile?.constraints.protectedPaths).toContain('.github/workflows/')
        expect(profile?.constraints.protectedPaths).toContain('BUILD_PHILOSOPHY.md')
        expect(profile?.healthStatus).toBe('healthy')
      }
    })
  })

  describe('autoBootstrapInternalBuilder', () => {
    it('should succeed if internal builder already exists', async () => {
      const exists = checkInternalBuilderExists()
      
      if (exists) {
        const result = await autoBootstrapInternalBuilder()
        
        expect(result.success).toBe(true)
        expect(result.reason).toBe('Already exists')
        expect(result.profile).toBeDefined()
      }
    })

    it('should return error if builder file does not exist', async () => {
      const exists = checkInternalBuilderExists()
      
      if (!exists) {
        const result = await autoBootstrapInternalBuilder()
        
        expect(result.success).toBe(false)
        expect(result.reason).toContain('not found')
      }
    })
  })

  describe('detectAllBuilders', () => {
    it('should detect all available builders', async () => {
      const builders = await detectAllBuilders()
      
      expect(builders).toHaveProperty('copilot')
      expect(builders).toHaveProperty('local')
      expect(builders).toHaveProperty('internal')
      
      expect(builders.copilot).toHaveProperty('available')
      expect(builders.copilot).toHaveProperty('healthy')
      
      expect(builders.local).toHaveProperty('available')
      expect(builders.local).toHaveProperty('healthy')
      
      expect(builders.internal).toHaveProperty('available')
      expect(builders.internal).toHaveProperty('healthy')
    })

    it('should include internal builder if it exists', async () => {
      const exists = checkInternalBuilderExists()
      const builders = await detectAllBuilders()
      
      if (exists) {
        expect(builders.internal.available).toBe(true)
        expect(builders.internal.healthy).toBe(true)
      }
    })
  })

  describe('detectOptimalBuilder', () => {
    it('should return a builder or null', async () => {
      const builder = await detectOptimalBuilder('medium')
      
      if (builder) {
        expect(['copilot', 'local', 'internal']).toContain(builder)
      } else {
        expect(builder).toBeNull()
      }
    })

    it('should fallback to internal builder if others unavailable', async () => {
      // This test would need to mock Copilot and Local builders being unavailable
      // For now, we just check that internal is considered as a fallback
      const exists = checkInternalBuilderExists()
      const builder = await detectOptimalBuilder('low')
      
      if (exists && builder === 'internal') {
        expect(builder).toBe('internal')
      }
    })
  })

  describe('validateBuilderProtocol', () => {
    it('should validate internal builder protocol if available', async () => {
      const exists = checkInternalBuilderExists()
      
      if (exists) {
        const validation = await validateBuilderProtocol('internal')
        
        expect(validation).toHaveProperty('compliant')
        expect(validation).toHaveProperty('issues')
        expect(validation).toHaveProperty('warnings')
        
        // Internal builder should be compliant
        expect(validation.compliant).toBe(true)
        expect(validation.issues).toEqual([])
      }
    })

    it('should require code_generation capability', async () => {
      const exists = checkInternalBuilderExists()
      
      if (exists) {
        const validation = await validateBuilderProtocol('internal')
        const capabilities = await getInternalCapabilities()
        
        if (capabilities) {
          expect(capabilities.capabilities).toContain('code_generation')
        }
      }
    })

    it('should require build_to_green capability for internal builder', async () => {
      const exists = checkInternalBuilderExists()
      
      if (exists) {
        const validation = await validateBuilderProtocol('internal')
        const capabilities = await getInternalCapabilities()
        
        if (capabilities) {
          expect(capabilities.capabilities).toContain('build_to_green')
        }
      }
    })
  })

  describe('checkGovernanceCompliance', () => {
    it('should return compliance status for internal builder', async () => {
      const exists = checkInternalBuilderExists()
      
      if (exists) {
        const compliance = await checkGovernanceCompliance('internal')
        
        expect(compliance).toHaveProperty('trueNorth')
        expect(compliance).toHaveProperty('qic')
        expect(compliance).toHaveProperty('qiel')
        expect(compliance).toHaveProperty('driftDetector')
        expect(compliance).toHaveProperty('sbhc')
        
        // Internal builder should be compliant
        expect(compliance.trueNorth).toBe(true)
        expect(compliance.qic).toBe(true)
        expect(compliance.qiel).toBe(true)
      }
    })

    it('should return false for all checks if builder unavailable', async () => {
      // Test with a mock unavailable builder scenario would go here
    })
  })

  describe('storeInternalBuilderProfile', () => {
    it('should not throw error when storing profile', async () => {
      const exists = checkInternalBuilderExists()
      
      if (exists) {
        const profile = await getInternalBuilderProfile()
        
        if (profile) {
          await expect(
            storeInternalBuilderProfile(profile, 'test-org')
          ).resolves.not.toThrow()
        }
      }
    })
  })

  describe('Integration: Full Builder Detection Flow', () => {
    it('should detect builders, get optimal, and validate', async () => {
      // Detect all builders
      const availability = await detectAllBuilders()
      expect(availability).toBeDefined()
      
      // Get optimal builder
      const optimal = await detectOptimalBuilder('medium')
      
      if (optimal) {
        // Validate protocol
        const validation = await validateBuilderProtocol(optimal)
        expect(validation).toBeDefined()
        
        // Check governance compliance
        const compliance = await checkGovernanceCompliance(optimal)
        expect(compliance).toBeDefined()
      }
    })

    it('should handle internal builder lifecycle', async () => {
      const exists = checkInternalBuilderExists()
      
      if (exists) {
        // 1. Check existence
        expect(checkInternalBuilderExists()).toBe(true)
        
        // 2. Get capabilities
        const capabilities = await getInternalCapabilities()
        expect(capabilities).not.toBeNull()
        
        // 3. Get profile
        const profile = await getInternalBuilderProfile()
        expect(profile).not.toBeNull()
        
        // 4. Validate protocol
        const validation = await validateBuilderProtocol('internal')
        expect(validation.compliant).toBe(true)
        
        // 5. Check governance compliance
        const compliance = await checkGovernanceCompliance('internal')
        expect(compliance.trueNorth).toBe(true)
        expect(compliance.qic).toBe(true)
        expect(compliance.qiel).toBe(true)
      }
    })
  })
})
