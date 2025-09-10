'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [customerEmail, setCustomerEmail] = useState('');
  const [subscriptionTier, setSubscriptionTier] = useState('');
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/checkout-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setCustomerEmail(data.customer_email);
          setSubscriptionTier(data.subscription_tier || 'basic');
        });
    }
  }, [sessionId]);

  const getTierDisplayName = (tier: string) => {
    switch (tier) {
      case 'basic': return 'Basic N8N Access';
      case 'premium': return 'Premium N8N Mastery';
      case 'expert': return 'Expert N8N Mastery';
      default: return 'N8N Access';
    }
  };

  const getTierPath = (tier: string) => {
    switch (tier) {
      case 'basic': return '/basic';
      case 'premium': return '/premium';
      case 'expert': return '/expert';
      default: return '/basic';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'basic': return 'from-blue-500 to-blue-600';
      case 'premium': return 'from-purple-500 to-purple-600';
      case 'expert': return 'from-amber-500 to-amber-600';
      default: return 'from-blue-500 to-blue-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-xl p-8 text-center">
        <div className="text-green-500 text-7xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Welcome to Master N8N!</h1>
        <p className="text-gray-600 mb-2 text-lg">
          Your subscription is now active
        </p>
        
        {subscriptionTier && (
          <div className="mb-6">
            <div className={`inline-block px-4 py-2 rounded-full text-white font-semibold text-sm bg-gradient-to-r ${getTierColor(subscriptionTier)}`}>
              {getTierDisplayName(subscriptionTier)}
            </div>
          </div>
        )}

        {customerEmail && (
          <p className="text-sm text-gray-500 mb-8">
            Confirmation sent to: <strong>{customerEmail}</strong>
          </p>
        )}

        <div className="space-y-4">
          <a
            href={getTierPath(subscriptionTier)}
            className={`w-full inline-block bg-gradient-to-r ${getTierColor(subscriptionTier)} hover:opacity-90 text-white font-bold py-4 px-6 rounded-lg transition-opacity shadow-lg`}
          >
            Start Learning N8N Now
          </a>

          <div className="text-sm text-gray-500">
            <p>Access to your tier includes:</p>
            <div className="flex justify-center gap-2 mt-2 flex-wrap">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Basic ✓</span>
              {(subscriptionTier === 'premium' || subscriptionTier === 'expert') && (
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">Premium ✓</span>
              )}
              {subscriptionTier === 'expert' && (
                <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs">Expert ✓</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Success() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}