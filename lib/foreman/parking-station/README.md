# Parking Station Feature

## Quick Start

The Parking Station is now available in the Foreman App! Access it at:

🔗 **URL**: `/foreman/parking-station`  
🗺️ **Navigation**: Click "🅿️ Parking Station" in the Foreman sidebar

## What is the Parking Station?

The Parking Station is a centralized dashboard that automatically discovers, stores, and organizes ALL proposed improvements from across the Foreman ecosystem. Think of it as your roadmap planning station.

## Key Features

### 🔍 Automatic Discovery
- Scans 82+ files in the repository
- Finds improvement suggestions using smart patterns
- Discovers from: feedback files, implementation summaries, governance docs, PR reviews

### 📊 Smart Organization
- 14 Categories: UI, Governance, Memory, QA, Architecture, etc.
- Priority Scores: 0-100 (computed automatically)
- Implementation Waves: Quick Win → Wave 1 → Wave 2 → Wave 3 → Future → Backlog
- Status Tracking: Parked → Promoted → Implemented

### 🎯 Powerful Filtering
- Search across all fields
- Filter by category, status, wave
- Filter by priority range
- Filter by tags
- Sort by priority (default)

### 🔒 Secure & Governed
- Foreman-exclusive write access
- All operations logged to governance memory
- Drift detector monitors for unauthorized changes
- Zero security vulnerabilities

## How to Use

### 1. View All Upgrades
Navigate to the Parking Station to see all discovered improvement suggestions.

### 2. Run a Discovery Scan
Click the "🔍 Run Discovery Scan" button to scan the repository for new improvement suggestions.

### 3. Filter and Search
Use the filter dropdowns and search box to find specific types of improvements:
- **By Category**: Find all UI improvements, governance refinements, etc.
- **By Status**: See what's parked, promoted, or implemented
- **By Wave**: View Quick Wins or future enhancements
- **By Search**: Type keywords to find specific items

### 4. Manage Entries
Each entry has action buttons:
- **Promote**: Mark a parked item ready for implementation
- **Mark Implemented**: Mark a promoted item as complete
- **Reject**: Dismiss an item that won't be implemented

## Statistics Dashboard

The header shows key metrics:
- **Total Items**: All entries in the parking station
- **Parked**: Items awaiting review
- **Promoted**: Items approved for implementation
- **Implemented**: Completed items
- **Average Priority**: Overall priority score

## API Access

### Get All Entries
```bash
GET /api/foreman/parking-station
GET /api/foreman/parking-station?category=UI
GET /api/foreman/parking-station?status=Parked&minPriority=70
```

### Run Discovery Scan
```bash
POST /api/foreman/parking-station/scan
```

### Update Entry Status
```bash
PATCH /api/foreman/parking-station/update
Content-Type: application/json

{
  "id": "ps_1234567890_abc123",
  "updates": {
    "status": "Promoted",
    "priority": 85
  }
}
```

## Programmatic Usage

```typescript
import { getAllEntries, runFullScan, updateEntry } from '@/lib/foreman/parking-station'

// Get all UI improvements with priority >= 70
const uiImprovements = await getAllEntries({
  category: 'UI',
  minPriority: 70
})

// Run a full discovery scan
const scanResult = await runFullScan()
console.log(`Found ${scanResult.upgradesFound} new upgrades!`)

// Promote an entry
await updateEntry('ps_123', { status: 'Promoted' })
```

## Discovery Patterns

The scanner looks for these patterns in markdown files:

### Explicit Markers
- `FUTURE:` - Future enhancements
- `TODO:` - Tasks to be done
- `ENHANCEMENT:` - Proposed enhancements

### Natural Language
- "Proposed improvement"
- "Feature suggestion"
- "Consider adding"
- "Could be enhanced"
- "Should improve"

### Category-Specific
- "UI improvement"
- "Governance refinement"
- "Architectural upgrade"
- "Model suggestion"

## Priority Scoring

Priority scores (0-100) are computed based on:

1. **Category Weight** (0-20 points)
   - Security: +20
   - Governance: +18
   - Architecture: +15
   - QA: +12
   - UI/Performance: +10

2. **Source Weight** (0-15 points)
   - Drift Detector: +15
   - Governance: +12
   - QIEL/QIC: +10
   - Implementation: +8
   - Feedback: +7

3. **Pattern Boost** (0-10 points)
   - Enhancement: +8
   - Proposed: +7
   - Suggestion: +6

4. **Content Keywords**
   - Critical: +10
   - Security: +12
   - Urgent: +8
   - Bug: +9
   - Performance: +7

## Implementation Waves

Suggested waves are determined by priority:
- **Quick Win**: Contains "quick" or "easy" in content
- **Wave 1**: Priority >= 80
- **Wave 2**: Priority >= 65
- **Wave 3**: Priority >= 50
- **Future**: Priority >= 30
- **Backlog**: Priority < 30

## Categories

The parking station organizes entries into 14 categories:
1. **UI** - User interface improvements
2. **Governance** - Governance and compliance
3. **Mutation Layer** - GitHub mutation operations
4. **Builders** - Builder-related enhancements
5. **QA** - Quality assurance improvements
6. **Memory** - Memory system enhancements
7. **Architecture** - Architectural changes
8. **Performance** - Performance optimizations
9. **Security** - Security improvements
10. **Documentation** - Documentation updates
11. **Testing** - Testing enhancements
12. **Analytics** - Analytics and metrics
13. **Workflow** - Workflow improvements
14. **Other** - Miscellaneous items

## Current Status

As of December 9, 2024:
- ✅ **82 files** scanned
- ✅ **63 upgrades** discovered
- ✅ **Average priority**: 61.8
- ✅ **All items** currently in "Parked" status

## Testing

Run the parking station tests:
```bash
npx tsx --test tests/parking-station/parking-station.test.ts
```

Run a test scan:
```bash
npx tsx scripts/test-parking-station-scan.ts
```

## Architecture

For detailed architecture documentation, see:
📖 `docs/architecture/parking-station-architecture.md`

For complete implementation details, see:
📖 `PARKING_STATION_IMPLEMENTATION_COMPLETE.md`

## Future Enhancements

Planned for future waves:
- GitHub issue creation from promoted entries
- AI-powered priority scoring
- Trend analysis and forecasting
- Integration with project lifecycle
- Enhanced discovery from code comments and CI/CD logs

## Support

For questions or issues, refer to:
- Architecture docs: `docs/architecture/parking-station-architecture.md`
- Implementation summary: `PARKING_STATION_IMPLEMENTATION_COMPLETE.md`
- Type definitions: `types/parking-station.ts`

---

**Status**: ✅ Production Ready  
**Version**: 1.0.0  
**Last Updated**: December 9, 2024
