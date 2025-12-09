/**
 * Architecture Alerts Page
 * 
 * Displays pending Architecture Change Requests for approval.
 * Part of CS2 - Architecture Change Approval Workflow.
 */

'use client';

import { useState, useEffect } from 'react';
import { ArchitectureChangeRequest } from '@/lib/foreman/architecture/types';

export default function ArchitectureAlertsPage() {
  const [acrs, setAcrs] = useState<ArchitectureChangeRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedACR, setSelectedACR] = useState<ArchitectureChangeRequest | null>(null);
  const [reviewComments, setReviewComments] = useState('');
  const [reviewing, setReviewing] = useState(false);

  // Fetch pending ACRs
  useEffect(() => {
    fetchPendingACRs();
  }, []);

  const fetchPendingACRs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/foreman/architecture/alerts');
      
      if (!response.ok) {
        throw new Error('Failed to fetch pending ACRs');
      }
      
      const data = await response.json();
      setAcrs(data.acrs || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (acrId: string, decision: 'approve' | 'reject' | 'discuss') => {
    try {
      setReviewing(true);
      
      const response = await fetch('/api/foreman/architecture/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          acrId,
          decision,
          comments: reviewComments,
          reviewedBy: 'owner', // In production, this would be the authenticated user
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to review ACR');
      }
      
      // Refresh ACR list
      await fetchPendingACRs();
      
      // Clear selection and comments
      setSelectedACR(null);
      setReviewComments('');
      
      alert(`ACR ${decision === 'approve' ? 'approved' : decision === 'reject' ? 'rejected' : 'marked for discussion'} successfully`);
    } catch (err) {
      alert(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setReviewing(false);
    }
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Architecture Change Requests</h1>
        <div className="flex items-center justify-center p-12">
          <div className="text-gray-600">Loading pending ACRs...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Architecture Change Requests</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-red-800 font-semibold mb-2">Error Loading ACRs</h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchPendingACRs}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Architecture Change Requests</h1>
        <p className="text-gray-600">
          Review and approve architecture changes before they can be implemented.
        </p>
      </div>

      {acrs.length === 0 ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <div className="text-green-800 font-semibold mb-2">✅ No Pending ACRs</div>
          <p className="text-green-600">There are no architecture changes awaiting approval.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {acrs.map((acr) => (
            <div
              key={acr.id}
              className={`border rounded-lg p-6 ${
                selectedACR?.id === acr.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-semibold">{acr.summary}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskLevelColor(acr.riskLevel)}`}>
                      {acr.riskLevel.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">ACR ID:</span> {acr.id}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Created:</span> {new Date(acr.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Description</h3>
                  <p className="text-gray-600">{acr.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Justification</h3>
                  <p className="text-gray-600">{acr.justification}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Impact</h3>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Scope:</span> {acr.impact.scope}
                      </div>
                      <div>
                        <span className="font-medium">Breaking Changes:</span>{' '}
                        {acr.impact.breakingChanges ? 'Yes' : 'No'}
                      </div>
                      <div>
                        <span className="font-medium">Migration Required:</span>{' '}
                        {acr.impact.migrationRequired ? 'Yes' : 'No'}
                      </div>
                      <div>
                        <span className="font-medium">Affected Files:</span>{' '}
                        {acr.impact.affectedFiles.length}
                      </div>
                    </div>
                  </div>
                </div>

                {acr.impact.affectedFiles.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Affected Files</h3>
                    <div className="bg-gray-50 p-3 rounded border border-gray-200 max-h-40 overflow-y-auto">
                      <ul className="text-sm space-y-1">
                        {acr.impact.affectedFiles.map((file, idx) => (
                          <li key={idx} className="font-mono text-xs">
                            {file}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {acr.alternatives && acr.alternatives.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Alternatives Considered</h3>
                    <ul className="list-disc list-inside text-gray-600 text-sm">
                      {acr.alternatives.map((alt, idx) => (
                        <li key={idx}>{alt}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {selectedACR?.id === acr.id && (
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <h3 className="font-semibold text-gray-700 mb-2">Review Comments (Optional)</h3>
                  <textarea
                    value={reviewComments}
                    onChange={(e) => setReviewComments(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded mb-3"
                    rows={3}
                    placeholder="Add any comments about this decision..."
                  />
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedACR(acr);
                    handleReview(acr.id, 'approve');
                  }}
                  disabled={reviewing}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                  ✅ Approve
                </button>
                <button
                  onClick={() => {
                    setSelectedACR(acr);
                    handleReview(acr.id, 'reject');
                  }}
                  disabled={reviewing}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                >
                  ❌ Reject
                </button>
                <button
                  onClick={() => {
                    setSelectedACR(selectedACR?.id === acr.id ? null : acr);
                    setReviewComments('');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  💬 {selectedACR?.id === acr.id ? 'Cancel Discussion' : 'Discuss'}
                </button>
                {selectedACR?.id === acr.id && (
                  <button
                    onClick={() => handleReview(acr.id, 'discuss')}
                    disabled={reviewing}
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
                  >
                    📝 Submit for Discussion
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
