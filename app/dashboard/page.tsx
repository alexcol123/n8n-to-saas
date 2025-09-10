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
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [customerEmail, setCustomerEmail] = useState<string | null>(null);

  useEffect(() => {
    fetchMemberStats();
    fetchCustomerInfo();
    // Refresh stats every 5 seconds to show real-time updates
    const interval = setInterval(fetchMemberStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchCustomerInfo = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    
    if (sessionId) {
      try {
        const response = await fetch(`/api/checkout-session?session_id=${sessionId}`);
        const data = await response.json();
        setCustomerId(data.customer_id);
        setCustomerEmail(data.customer_email);
      } catch (error) {
        console.error('Failed to fetch customer info:', error);
      }
    }
  };

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

  const handleCustomerPortal = async () => {
    if (!customerId) {
      alert('Customer ID not available. Please contact support.');
      return;
    }

    try {
      const response = await fetch('/api/customer-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerId }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else if (data.error === 'Customer portal not configured') {
        alert(`${data.message}\n\nPlease visit: ${data.configUrl}`);
      } else {
        alert('Failed to create customer portal session');
      }
    } catch (error) {
      console.error('Error creating customer portal session:', error);
      alert('Failed to create customer portal session');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-black">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Premium Dashboard</h1>
          {customerId && (
            <button
              onClick={handleCustomerPortal}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              Manage Subscription
            </button>
          )}
        </div>

        {/* Customer Info Card */}
        {customerEmail && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">🔗 Subscription Details</h2>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">Account: <span className="font-medium">{customerEmail}</span></p>
                <p className="text-gray-600 mt-1">Status: <span className="text-green-600 font-medium">Active</span></p>
              </div>
              <button
                onClick={handleCustomerPortal}
                className="text-purple-600 hover:text-purple-800 font-medium"
              >
                View Details →
              </button>
            </div>
          </div>
        )}
        
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