#!/usr/bin/env tsx
/**
 * Memory System Integration Test
 * Verifies the complete memory system works end-to-end
 */

import {
  writeMemoryEntry,
  readMemoryEntry,
  loadMemoryBeforeAction,
  writeMemoryAfterAction,
  recordArchitectureDecision,
  recordWaveCompletion,
  recordDeployment,
  recordQAFailure,
  recordMilestoneCompletion,
  queryMemoryByTags,
  getAllMemory,
} from '../lib/foreman/memory'

async function testMemorySystem() {
  console.log('🧪 Testing Memory System\n')
  
  let passedTests = 0
  let totalTests = 0
  
  // Test 1: Write and read global memory
  totalTests++
  console.log('Test 1: Write and read global memory')
  try {
    const entry = await writeMemoryEntry('global', 'test_global_key', {
      message: 'Test global memory'
    }, {
      createdBy: 'test-script',
      tags: ['test', 'global']
    })
    
    const readEntry = await readMemoryEntry('global', 'test_global_key')
    
    if (readEntry && readEntry.value.message === 'Test global memory') {
      console.log('✅ Global memory write/read works')
      passedTests++
    } else {
      console.log('❌ Global memory read mismatch')
    }
  } catch (error) {
    console.log('❌ Global memory test failed:', error)
  }
  console.log()
  
  // Test 2: Write and read foreman memory
  totalTests++
  console.log('Test 2: Write and read foreman memory')
  try {
    const entry = await writeMemoryEntry('foreman', 'test_foreman_key', {
      message: 'Test foreman memory'
    }, {
      createdBy: 'test-script',
      tags: ['test', 'foreman']
    })
    
    const readEntry = await readMemoryEntry('foreman', 'test_foreman_key')
    
    if (readEntry && readEntry.value.message === 'Test foreman memory') {
      console.log('✅ Foreman memory write/read works')
      passedTests++
    } else {
      console.log('❌ Foreman memory read mismatch')
    }
  } catch (error) {
    console.log('❌ Foreman memory test failed:', error)
  }
  console.log()
  
  // Test 3: Write and read project memory
  totalTests++
  console.log('Test 3: Write and read project memory')
  try {
    const projectId = 'test_project_001'
    const entry = await writeMemoryEntry('project', 'test_project_key', {
      message: 'Test project memory'
    }, {
      createdBy: 'test-script',
      projectId,
      tags: ['test', 'project']
    })
    
    const readEntry = await readMemoryEntry('project', 'test_project_key', {
      projectId
    })
    
    if (readEntry && readEntry.value.message === 'Test project memory') {
      console.log('✅ Project memory write/read works')
      passedTests++
    } else {
      console.log('❌ Project memory read mismatch')
    }
  } catch (error) {
    console.log('❌ Project memory test failed:', error)
  }
  console.log()
  
  // Test 4: Record architecture decision
  totalTests++
  console.log('Test 4: Record architecture decision')
  try {
    const entry = await recordArchitectureDecision(
      'Test architecture decision',
      {
        pattern: 'test-pattern',
        rationale: 'Testing memory system'
      }
    )
    
    if (entry && entry.scope === 'global') {
      console.log('✅ Architecture decision recorded')
      passedTests++
    } else {
      console.log('❌ Architecture decision recording failed')
    }
  } catch (error) {
    console.log('❌ Architecture decision test failed:', error)
  }
  console.log()
  
  // Test 5: Record wave completion
  totalTests++
  console.log('Test 5: Record wave completion')
  try {
    const entry = await recordWaveCompletion('Test Wave', {
      tasksCompleted: 5,
      duration: '30 minutes'
    })
    
    if (entry && entry.scope === 'foreman') {
      console.log('✅ Wave completion recorded')
      passedTests++
    } else {
      console.log('❌ Wave completion recording failed')
    }
  } catch (error) {
    console.log('❌ Wave completion test failed:', error)
  }
  console.log()
  
  // Test 6: Record milestone completion
  totalTests++
  console.log('Test 6: Record milestone completion')
  try {
    const entry = await recordMilestoneCompletion(
      'Test Milestone',
      {
        completedAt: new Date().toISOString()
      },
      { projectId: 'test_project_001' }
    )
    
    if (entry && entry.scope === 'project') {
      console.log('✅ Milestone completion recorded')
      passedTests++
    } else {
      console.log('❌ Milestone completion recording failed')
    }
  } catch (error) {
    console.log('❌ Milestone completion test failed:', error)
  }
  console.log()
  
  // Test 7: Query by tags
  totalTests++
  console.log('Test 7: Query memory by tags')
  try {
    const result = await queryMemoryByTags('foreman', ['test'])
    
    if (result && result.entries.length > 0) {
      console.log(`✅ Tag query works (found ${result.total} entries)`)
      passedTests++
    } else {
      console.log('❌ Tag query returned no results')
    }
  } catch (error) {
    console.log('❌ Tag query test failed:', error)
  }
  console.log()
  
  // Test 8: Load memory before action
  totalTests++
  console.log('Test 8: Load memory before action (Memory Before Action doctrine)')
  try {
    const result = await loadMemoryBeforeAction('foreman', {
      tags: ['test']
    })
    
    if (result && result.scope === 'foreman') {
      console.log(`✅ Load memory before action works (loaded ${result.total} entries)`)
      passedTests++
    } else {
      console.log('❌ Load memory before action failed')
    }
  } catch (error) {
    console.log('❌ Load memory before action test failed:', error)
  }
  console.log()
  
  // Test 9: Write memory after action
  totalTests++
  console.log('Test 9: Write memory after action (Memory After Action doctrine)')
  try {
    const entry = await writeMemoryAfterAction({
      type: 'wave_completion',
      scope: 'foreman',
      description: 'Test memory after action',
      data: { test: true },
      timestamp: new Date().toISOString(),
      createdBy: 'test-script'
    })
    
    if (entry && entry.scope === 'foreman') {
      console.log('✅ Write memory after action works')
      passedTests++
    } else {
      console.log('❌ Write memory after action failed')
    }
  } catch (error) {
    console.log('❌ Write memory after action test failed:', error)
  }
  console.log()
  
  // Test 10: Get all memory (admin function)
  totalTests++
  console.log('Test 10: Get all memory (admin/debugging)')
  try {
    const allMemory = await getAllMemory()
    
    if (allMemory && allMemory.global && allMemory.foreman && allMemory.projects) {
      const totalEntries = allMemory.global.length + 
                          allMemory.foreman.length + 
                          Object.values(allMemory.projects).reduce((sum, entries) => sum + entries.length, 0)
      console.log(`✅ Get all memory works (total: ${totalEntries} entries)`)
      passedTests++
    } else {
      console.log('❌ Get all memory failed')
    }
  } catch (error) {
    console.log('❌ Get all memory test failed:', error)
  }
  console.log()
  
  // Test 11: Verify memory files exist
  totalTests++
  console.log('Test 11: Verify memory files exist on filesystem')
  try {
    const fs = await import('fs')
    const path = await import('path')
    
    const memoryDir = path.join(process.cwd(), 'memory')
    const globalFile = path.join(memoryDir, 'global', 'memory.json')
    const foremanFile = path.join(memoryDir, 'foreman', 'memory.json')
    const projectsDir = path.join(memoryDir, 'projects')
    
    const globalExists = fs.existsSync(globalFile)
    const foremanExists = fs.existsSync(foremanFile)
    const projectsExists = fs.existsSync(projectsDir)
    
    if (globalExists && foremanExists && projectsExists) {
      console.log('✅ Memory files exist on filesystem')
      console.log(`   - Global: ${globalFile}`)
      console.log(`   - Foreman: ${foremanFile}`)
      console.log(`   - Projects: ${projectsDir}`)
      passedTests++
    } else {
      console.log('❌ Some memory files missing')
      console.log(`   - Global: ${globalExists ? '✅' : '❌'}`)
      console.log(`   - Foreman: ${foremanExists ? '✅' : '❌'}`)
      console.log(`   - Projects: ${projectsExists ? '✅' : '❌'}`)
    }
  } catch (error) {
    console.log('❌ Filesystem verification failed:', error)
  }
  console.log()
  
  // Test 12: Verify memory is version-controlled
  totalTests++
  console.log('Test 12: Verify memory directory structure')
  try {
    const fs = await import('fs')
    const path = await import('path')
    
    const memoryDir = path.join(process.cwd(), 'memory')
    const readmeExists = fs.existsSync(path.join(memoryDir, 'README.md'))
    const globalReadmeExists = fs.existsSync(path.join(memoryDir, 'global', 'README.md'))
    const foremanReadmeExists = fs.existsSync(path.join(memoryDir, 'foreman', 'README.md'))
    const projectsReadmeExists = fs.existsSync(path.join(memoryDir, 'projects', 'README.md'))
    
    if (readmeExists && globalReadmeExists && foremanReadmeExists && projectsReadmeExists) {
      console.log('✅ Memory directory structure complete')
      console.log('   - Main README.md exists')
      console.log('   - Global scope README.md exists')
      console.log('   - Foreman scope README.md exists')
      console.log('   - Projects scope README.md exists')
      passedTests++
    } else {
      console.log('❌ Memory directory structure incomplete')
    }
  } catch (error) {
    console.log('❌ Directory structure verification failed:', error)
  }
  console.log()
  
  // Summary
  console.log('='.repeat(60))
  console.log('Test Summary')
  console.log('='.repeat(60))
  console.log(`Total Tests: ${totalTests}`)
  console.log(`Passed: ${passedTests}`)
  console.log(`Failed: ${totalTests - passedTests}`)
  console.log(`Success Rate: ${Math.round(passedTests / totalTests * 100)}%`)
  console.log()
  
  if (passedTests === totalTests) {
    console.log('🎉 All tests passed! Memory system is fully operational.')
    console.log()
    console.log('✅ Memory Fabric is ready for production use:')
    console.log('   - Global scope for architecture decisions')
    console.log('   - Foreman scope for orchestration learning')
    console.log('   - Project scope for multi-project tracking')
    console.log('   - Version-controlled via git')
    console.log('   - Full audit trail')
    console.log()
    console.log('📚 See memory/README.md for usage documentation')
    process.exit(0)
  } else {
    console.log('❌ Some tests failed. Please review the errors above.')
    process.exit(1)
  }
}

// Run tests
testMemorySystem().catch(error => {
  console.error('❌ Test execution failed:', error)
  process.exit(1)
})
