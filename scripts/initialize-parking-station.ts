#!/usr/bin/env tsx
/**
 * Initialize Parking Station
 * 
 * Runs a discovery scan to populate the parking station with initial entries
 */

import { runFullScan } from '../lib/foreman/parking-station/discovery-engine';

async function main() {
  console.log('🅿️  Initializing Parking Station...\n');
  
  try {
    const result = await runFullScan();
    
    console.log('✅ Scan complete!');
    console.log(`📁 Files scanned: ${result.filesScanned}`);
    console.log(`🎯 Upgrades found: ${result.upgradesFound}`);
    console.log(`⏱️  Duration: ${result.durationMs}ms`);
    console.log(`\n📋 Upgrades by category:`);
    
    if (result.byCategory) {
      Object.entries(result.byCategory).forEach(([category, count]) => {
        if (count > 0) {
          console.log(`   - ${category}: ${count}`);
        }
      });
    }
    
    console.log(`\n🎉 Parking Station initialized successfully!`);
  } catch (error) {
    console.error('❌ Failed to initialize Parking Station:', error);
    process.exit(1);
  }
}

main();
