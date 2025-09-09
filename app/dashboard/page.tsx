'use client';

import { useState, useEffect } from 'react';

interface MemberStats {
  totalMembers: number;
  activeMembers: number;
  timestamp: string;
}

export default function Dashboard() {
  const [memberStats, setMemberStats] = useState<MemberStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMemberStats();
    // Refresh stats every 5 seconds to show real-time updates
    const interval = setInterval(fetchMemberStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchMemberStats = async () => {
    try {
      const response = await fetch('/api/members');
      const stats = await response.json();
      setMemberStats(stats);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch member stats:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Premium Dashboard</h1>
        
        {/* Member Stats Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">📊 Member Statistics</h2>
          {loading ? (
            <p className="text-gray-500">Loading member stats...</p>
          ) : memberStats ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{memberStats.totalMembers}</div>
                <div className="text-gray-600">Total Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{memberStats.activeMembers}</div>
                <div className="text-gray-600">Active Members</div>
              </div>
            </div>
          ) : (
            <p className="text-red-500">Failed to load member stats</p>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">🎉 Welcome, Premium Member!</h2>
          <p className="text-gray-600">
            You now have access to all premium features. Your subscription is active!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-3">Premium Content</h3>
            <p className="text-gray-600">
              Access exclusive articles, tutorials, and resources.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-3">Advanced Features</h3>
            <p className="text-gray-600">
              Use advanced tools and analytics available only to subscribers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}