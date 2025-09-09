'use client';

import { getStripe } from '@/lib/stripe-client';

export default function Home() {
  const handleSubscribe = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: 'price_1S5S5IAikXlKuqX0JIzgYK2y',
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await getStripe();
      
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-black">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          Premium Site Access
        </h1>
        
        <div className="text-center mb-8">
          <div className="text-4xl font-bold text-blue-600 mb-2">$10</div>
          <div className="text-gray-600">per month</div>
        </div>

        <ul className="mb-8 space-y-2">
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Unlimited access to all content
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Premium features
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Cancel anytime
          </li>
        </ul>

        <button
          onClick={handleSubscribe}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          Subscribe Now
        </button>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          Secure payment powered by Stripe
        </p>
      </div>
    </div>
  );
}