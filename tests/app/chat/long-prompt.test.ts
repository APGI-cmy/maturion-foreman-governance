/**
 * Long Prompt Integration Tests
 * 
 * Tests the full chat pipeline with large prompts, including:
 * - Context compression
 * - Model escalation
 * - Token budgeting
 * - Error handling
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { buildOptimizedContext } from '@/lib/foreman/context-manager';
import { compressPrompt } from '@/lib/foreman/context/prompt-compressor';
import type { ChatMessage } from '@/types/foreman';

describe('Long Prompt Integration Tests', () => {
  describe('buildOptimizedContext with large prompts', () => {
    it('should handle 5k token prompts', async () => {
      const largePrompt = generateTestPrompt(20000); // ~5k tokens
      const messages: ChatMessage[] = [];

      const context = await buildOptimizedContext(
        messages,
        largePrompt,
        'test-org',
        { enableLargePrompts: true }
      );

      assert.ok(context.metadata.totalTokens > 0, 'Should have total tokens');
      assert.ok(
        context.metadata.promptCompressed === true,
        'Should compress large prompt'
      );
      assert.ok(
        context.metadata.promptCompressionRatio && context.metadata.promptCompressionRatio < 1,
        'Should have compression ratio < 1'
      );
    });

    it('should handle 10k token prompts', async () => {
      const veryLargePrompt = generateTestPrompt(40000); // ~10k tokens
      const messages: ChatMessage[] = [];

      const context = await buildOptimizedContext(
        messages,
        veryLargePrompt,
        'test-org',
        { enableLargePrompts: true }
      );

      assert.ok(context.metadata.promptCompressed, 'Should compress very large prompt');
      assert.ok(
        context.metadata.totalTokens <= 8000,
        'Should stay within total token limit after compression'
      );
    });

    it('should handle 20k token prompts', async () => {
      const extremelyLargePrompt = generateTestPrompt(80000); // ~20k tokens
      const messages: ChatMessage[] = [];

      const context = await buildOptimizedContext(
        messages,
        extremelyLargePrompt,
        'test-org',
        { enableLargePrompts: true }
      );

      assert.ok(context.metadata.promptCompressed, 'Should compress extremely large prompt');
      assert.ok(
        context.metadata.totalTokens <= 8000,
        'Should aggressively compress to stay within limits'
      );
      assert.ok(
        context.metadata.promptCompressionRatio && context.metadata.promptCompressionRatio < 0.3,
        'Should have high compression ratio for 20k prompts'
      );
    });

    it('should preserve critical content in large prompts', async () => {
      const largePromptWithGovernance = `
# System Architecture Specification

GOVERNANCE: All changes must be approved by security team.
COMPLIANCE: GDPR requirements must be followed.
SECURITY: All data must be encrypted at rest and in transit.

ARCHITECTURE: The system uses a microservices architecture with:
- API Gateway
- Authentication Service
- Data Service
- Analytics Service

${'Additional implementation details follow. '.repeat(2000)}

CRITICAL: The deployment process must include automated security scans.
REQUIRED: All APIs must have rate limiting enabled.
      `.trim();

      const messages: ChatMessage[] = [];
      const context = await buildOptimizedContext(
        messages,
        largePromptWithGovernance,
        'test-org',
        { enableLargePrompts: true }
      );

      // Verify governance and architecture keywords are preserved
      const compressedContent = context.userMessage.toLowerCase();
      assert.ok(
        compressedContent.includes('governance') || compressedContent.includes('security'),
        'Should preserve governance content'
      );
      assert.ok(
        compressedContent.includes('architecture') || compressedContent.includes('service'),
        'Should preserve architecture content'
      );
    });

    it('should handle conversation history with large prompts', async () => {
      const largePrompt = generateTestPrompt(30000); // ~7.5k tokens
      const messages: ChatMessage[] = Array.from({ length: 5 }, (_, i) => ({
        id: `msg_${i}`,
        role: i % 2 === 0 ? 'user' : 'assistant',
        content: 'This is a previous message in the conversation.',
        timestamp: new Date(),
        organisationId: 'test-org',
        conversationId: 'test-conv',
      }));

      const context = await buildOptimizedContext(
        messages,
        largePrompt,
        'test-org',
        { enableLargePrompts: true }
      );

      assert.ok(context.metadata.totalTokens <= 8000, 'Should compress to fit within limits');
      assert.ok(context.metadata.compressed, 'Should indicate compression occurred');
      assert.ok(context.conversationHistory.length > 0, 'Should include conversation history');
    });

    it('should disable large prompts when flag is false', async () => {
      const largePrompt = generateTestPrompt(20000);
      const messages: ChatMessage[] = [];

      const context = await buildOptimizedContext(
        messages,
        largePrompt,
        'test-org',
        { enableLargePrompts: false }
      );

      // Should truncate instead of compress
      assert.ok(!context.metadata.promptCompressed, 'Should not compress when disabled');
      assert.ok(context.userMessage.length < largePrompt.length, 'Should truncate instead');
    });
  });

  describe('compression with different content types', () => {
    it('should handle governance directives', async () => {
      const governancePrompt = `
Please analyze this governance framework:

GOVERNANCE RULES:
1. All code changes must be reviewed
2. Security scans are mandatory
3. Compliance checks must pass
4. Documentation is required

POLICIES:
- Zero-tolerance for security vulnerabilities
- All data must be encrypted
- Access controls must be role-based
- Audit logs must be maintained

${'Additional governance details. '.repeat(1000)}
      `.trim();

      const result = await compressPrompt(governancePrompt, {
        targetMaxTokens: 2000,
        preserveGovernance: true,
      });

      assert.ok(result.metadata.compressed, 'Should compress governance prompt');
      assert.ok(result.compressedTokens <= 2000, 'Should stay within target');
      
      // Check preservation
      const compressed = result.compressedPrompt.toLowerCase();
      assert.ok(
        compressed.includes('governance') || compressed.includes('policy'),
        'Should preserve governance keywords'
      );
    });

    it('should handle architectural specifications', async () => {
      const architecturePrompt = `
Please review this system architecture:

ARCHITECTURE OVERVIEW:
The system uses a layered architecture:
- Presentation Layer (React/Next.js)
- API Layer (Node.js/Express)
- Service Layer (Business Logic)
- Data Layer (PostgreSQL)

DESIGN PATTERNS:
- Repository Pattern for data access
- Factory Pattern for object creation
- Observer Pattern for event handling

${'More architectural details about components and interfaces. '.repeat(1000)}
      `.trim();

      const result = await compressPrompt(architecturePrompt, {
        targetMaxTokens: 2000,
        preserveArchitecture: true,
      });

      assert.ok(result.metadata.compressed, 'Should compress architecture prompt');
      
      // Check preservation
      const compressed = result.compressedPrompt.toLowerCase();
      assert.ok(
        compressed.includes('architecture') || compressed.includes('layer') || compressed.includes('pattern'),
        'Should preserve architecture keywords'
      );
    });

    it('should handle mixed content types', async () => {
      const mixedPrompt = `
# Project Requirements

GOVERNANCE: Follow ISO 27001 standards
ARCHITECTURE: Microservices with event-driven design

## Functional Requirements
${'Requirement detail. '.repeat(500)}

## Technical Constraints
CRITICAL: Must support 10,000 concurrent users
REQUIRED: 99.9% uptime SLA

## Implementation Details
${'Implementation notes. '.repeat(500)}
      `.trim();

      const result = await compressPrompt(mixedPrompt, {
        targetMaxTokens: 2000,
        preserveGovernance: true,
        preserveArchitecture: true,
        preserveCriticalInstructions: true,
      });

      assert.ok(result.metadata.compressed, 'Should compress mixed content');
      assert.ok(result.compressedTokens <= 2200, 'Should approximate target');
      
      // Verify critical sections preserved
      const compressed = result.compressedPrompt.toLowerCase();
      assert.ok(compressed.includes('governance') || compressed.includes('iso'), 'Should preserve governance');
      assert.ok(compressed.includes('architecture') || compressed.includes('microservices'), 'Should preserve architecture');
    });
  });

  describe('error scenarios', () => {
    it('should handle empty prompts gracefully', async () => {
      const context = await buildOptimizedContext(
        [],
        '',
        'test-org',
        { enableLargePrompts: true }
      );

      assert.ok(context.metadata.totalTokens >= 0, 'Should handle empty prompt');
      assert.strictEqual(context.metadata.promptCompressed, false, 'Should not compress empty prompt');
    });

    it('should handle prompts with only whitespace', async () => {
      const context = await buildOptimizedContext(
        [],
        '   \n\n   \t\t   ',
        'test-org',
        { enableLargePrompts: true }
      );

      assert.ok(context.metadata.totalTokens >= 0, 'Should handle whitespace prompt');
    });

    it('should handle prompts with special characters', async () => {
      const specialPrompt = `
Special characters test: !@#$%^&*()_+-={}[]|\\:";'<>?,./
Emojis: 🚀 👷 ✅ ⚠️ 💡
Unicode: αβγδε 中文字符 العربية

${'Mixed content with special chars. '.repeat(1000)}
      `.trim();

      const result = await compressPrompt(specialPrompt, { targetMaxTokens: 2000 });

      assert.ok(result.compressedTokens > 0, 'Should handle special characters');
      assert.ok(result.compressedPrompt.length > 0, 'Should produce valid output');
    });
  });

  describe('performance considerations', () => {
    it('should compress large prompts efficiently', async () => {
      const largePrompt = generateTestPrompt(80000); // ~20k tokens
      
      const startTime = Date.now();
      const result = await compressPrompt(largePrompt, { targetMaxTokens: 4000 });
      const endTime = Date.now();
      
      const compressionTime = endTime - startTime;
      
      assert.ok(compressionTime < 5000, 'Should compress within 5 seconds');
      assert.ok(result.compressedTokens <= 4000, 'Should achieve target compression');
    });

    it('should handle multiple compressions in sequence', async () => {
      const prompts = [
        generateTestPrompt(20000),
        generateTestPrompt(30000),
        generateTestPrompt(40000),
      ];

      for (const prompt of prompts) {
        const result = await compressPrompt(prompt, { targetMaxTokens: 3000 });
        assert.ok(result.compressedTokens <= 3000, 'Each compression should succeed');
      }
    });
  });

  describe('token budgeting accuracy', () => {
    it('should accurately estimate tokens before and after compression', async () => {
      const testCases = [
        { chars: 20000, targetTokens: 3000 },
        { chars: 40000, targetTokens: 4000 },
        { chars: 80000, targetTokens: 4000 },
      ];

      for (const testCase of testCases) {
        const prompt = generateTestPrompt(testCase.chars);
        const result = await compressPrompt(prompt, { targetMaxTokens: testCase.targetTokens });

        // Allow 15% tolerance for token estimation
        const tolerance = testCase.targetTokens * 0.15;
        assert.ok(
          Math.abs(result.compressedTokens - testCase.targetTokens) <= tolerance,
          `Token count should be within ${tolerance} of target for ${testCase.chars} chars`
        );
      }
    });
  });
});

/**
 * Helper: Generate a test prompt of specified size
 */
function generateTestPrompt(chars: number): string {
  const paragraphs: string[] = [];
  const baseContent = `
This is a test paragraph with regular content that can be compressed.
It contains various details about the system implementation.
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  `.trim();

  const paragraphSize = baseContent.length;
  const numParagraphs = Math.ceil(chars / paragraphSize);

  for (let i = 0; i < numParagraphs; i++) {
    paragraphs.push(`${baseContent} (Paragraph ${i + 1})`);
  }

  return paragraphs.join('\n\n');
}
