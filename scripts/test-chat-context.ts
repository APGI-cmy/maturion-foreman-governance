/**
 * Test Chat Context Compilation
 * 
 * This test verifies that compileForemanChatContext generates a system prompt
 * that includes all required governance elements.
 */

import { compileForemanChatContext } from '../lib/foreman/chat-profile'

async function testChatContext() {
  console.log('\n=== Testing Chat Context Compilation ===\n')
  
  try {
    // Compile the chat context
    console.log('Compiling Foreman chat context...')
    const systemPrompt = await compileForemanChatContext('MaturionISMS')
    
    console.log(`✓ System prompt compiled successfully (${systemPrompt.length} characters)\n`)
    
    // Test 1: Check for Autonomy Class A1
    console.log('Test 1: Checking for Autonomy Class A1...')
    const hasAutonomyA1 = systemPrompt.includes('Autonomy Class A1') || 
                          systemPrompt.includes('AUTONOMY CLASS: A1') ||
                          systemPrompt.includes('A1 – QA-Gated')
    
    if (hasAutonomyA1) {
      console.log('  ✓ Autonomy Class A1 is declared in the system prompt')
    } else {
      console.log('  ✗ ERROR: Autonomy Class A1 NOT found in system prompt')
      console.log('  → Foreman must explicitly declare its autonomy class')
    }
    
    // Test 2: Check for governance file listing
    console.log('\nTest 2: Checking for governance file listing...')
    const hasFileList = systemPrompt.includes('identity/foreman-identity.md') ||
                       systemPrompt.includes('governance/governance-model.md') ||
                       systemPrompt.includes('autonomy-rules.md')
    
    if (hasFileList) {
      console.log('  ✓ Governance files are listed with paths')
    } else {
      console.log('  ✗ ERROR: Governance file listing NOT found')
      console.log('  → System prompt should list all loaded governance files')
    }
    
    // Test 3: Check for key governance documents
    console.log('\nTest 3: Checking for key governance documents...')
    const requiredDocs = [
      { name: 'identity', pattern: /foreman-identity\.md|# Foreman Identity/i },
      { name: 'autonomy rules', pattern: /autonomy-rules\.md|# Foreman Autonomy Rules/i },
      { name: 'QA enforcement', pattern: /qa-enforcement\.md|# QA Enforcement/i },
      { name: 'governance model', pattern: /governance-model\.md|# Governance Model/i }
    ]
    
    let foundDocs = 0
    for (const doc of requiredDocs) {
      if (doc.pattern.test(systemPrompt)) {
        console.log(`  ✓ Found ${doc.name}`)
        foundDocs++
      } else {
        console.log(`  ✗ Missing ${doc.name}`)
      }
    }
    
    if (foundDocs === requiredDocs.length) {
      console.log(`  ✓ All ${requiredDocs.length} key governance documents present`)
    } else {
      console.log(`  ⚠ Only ${foundDocs}/${requiredDocs.length} governance documents found`)
    }
    
    // Test 4: Check for memory fabric references
    console.log('\nTest 4: Checking for Unified Memory Fabric references...')
    const hasMemoryFabric = systemPrompt.includes('Unified Memory Fabric') ||
                           systemPrompt.includes('Memory Before Action') ||
                           systemPrompt.includes('version-controlled')
    
    if (hasMemoryFabric) {
      console.log('  ✓ Unified Memory Fabric is referenced')
    } else {
      console.log('  ✗ ERROR: Unified Memory Fabric NOT mentioned')
      console.log('  → System prompt should describe memory as real, not simulated')
    }
    
    // Test 5: Check for orchestration responsibilities
    console.log('\nTest 5: Checking for orchestration responsibilities...')
    const responsibilities = [
      'orchestrat',
      'builder',
      'QA',
      'compliance',
      'architecture'
    ]
    
    let foundResponsibilities = 0
    for (const resp of responsibilities) {
      if (systemPrompt.toLowerCase().includes(resp.toLowerCase())) {
        foundResponsibilities++
      }
    }
    
    if (foundResponsibilities === responsibilities.length) {
      console.log(`  ✓ All ${responsibilities.length} key responsibilities mentioned`)
    } else {
      console.log(`  ⚠ Only ${foundResponsibilities}/${responsibilities.length} responsibilities found`)
    }
    
    // Test 6: Check that Foreman knows how to talk about governance
    console.log('\nTest 6: Checking for governance transparency instructions...')
    const hasTransparencyInstructions = 
      systemPrompt.includes('When asked about governance') ||
      systemPrompt.includes('reference these actual loaded files') ||
      systemPrompt.includes('list the actual governance files')
    
    if (hasTransparencyInstructions) {
      console.log('  ✓ Instructions for governance transparency present')
    } else {
      console.log('  ✗ ERROR: Missing instructions for governance transparency')
      console.log('  → Foreman should be instructed to list actual loaded files when asked')
    }
    
    // Test 7: Check for builder types
    console.log('\nTest 7: Checking for builder type references...')
    const builders = ['UI Builder', 'API Builder', 'Schema Builder', 'QA Builder', 'Integration Builder']
    let foundBuilders = 0
    
    for (const builder of builders) {
      if (systemPrompt.includes(builder)) {
        foundBuilders++
      }
    }
    
    if (foundBuilders >= 3) {
      console.log(`  ✓ Found ${foundBuilders}/${builders.length} builder types`)
    } else {
      console.log(`  ⚠ Only ${foundBuilders}/${builders.length} builder types found`)
    }
    
    // Summary
    console.log('\n=== Test Summary ===\n')
    
    const allTestsPassed = hasAutonomyA1 && 
                          hasFileList && 
                          foundDocs === requiredDocs.length &&
                          hasMemoryFabric &&
                          hasTransparencyInstructions
    
    if (allTestsPassed) {
      console.log('✅ All critical tests PASSED')
      console.log('\nForeman chat context is properly configured with:')
      console.log('  • Autonomy Class A1 declaration')
      console.log('  • Complete governance file listing')
      console.log('  • Key governance documents loaded')
      console.log('  • Unified Memory Fabric references')
      console.log('  • Governance transparency instructions')
      console.log('\nForeman should now correctly respond to queries about:')
      console.log('  - His autonomy class (A1)')
      console.log('  - Loaded governance files (with actual paths)')
      console.log('  - Memory model (Unified Memory Fabric, not simulated)')
      console.log('  - System prompt construction (built from governance files)')
    } else {
      console.log('⚠️  Some tests FAILED or have warnings')
      console.log('\nPlease review the test results above and ensure:')
      console.log('  1. Autonomy Class A1 is explicitly declared')
      console.log('  2. Governance files are listed with their actual paths')
      console.log('  3. All key governance documents are included')
      console.log('  4. Memory is described as real, version-controlled')
      console.log('  5. Foreman knows to be transparent about loaded files')
    }
    
    console.log('\n=== Test Complete ===\n')
    
  } catch (error) {
    console.error('✗ ERROR: Failed to compile chat context:', error)
    process.exit(1)
  }
}

// Run the test
testChatContext().catch(console.error)
