'use client';

import { getStripe } from '@/lib/stripe-client';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Pricing() {
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      redirect('/');
    }
  }, [isSignedIn, isLoaded]);

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isSignedIn) {
    return null;
  }

  const products = [
    {
      id: 1,
      priceId: 'price_1S5pDrAikXlKuqX04GErTuad',
      name: 'Basic N8N Access',
      price: 10,
      rateTime: 'per month',
      description: 'Basic N8N tutorials and automation guides',
      features: [
        'Basic N8N tutorials',
        'Standard workflow library',
        'Email support',
        'Mobile-responsive access',
        'Community forums',
      ],
    },
    {
      id: 2,
      priceId: 'price_1S5pDwAikXlKuqX0UHaXpVyh',
      name: 'Premium N8N Mastery',
      price: 20,
      rateTime: 'per month',
      description: 'Advanced N8N automation with exclusive content',
      features: [
        'Advanced automation workflows',
        'Professional templates library',
        'Analytics dashboard access',
        'Real-world case studies',
        'Priority support',
        'Advanced integration guides',
      ],
    },
    {
      id: 3,
      priceId: 'price_1S5pE3AikXlKuqX0chJ63sqr',
      name: 'N8N Expert',
      price: 30,
      rateTime: 'per month',
      description: 'Complete N8N mastery with full expert access',
      features: [
        'Full access to all content',
        'Expert-level tutorials',
        'Exclusive masterclasses',
        '1-on-1 consultation calls',
        'Beta features access',
        'Custom automation consulting',
        'Dedicated support channel',
      ],
    },
  ];

  const handleSubscribe = async (priceId: string) => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: priceId,
          userId: user?.id,
          userEmail: user?.emailAddresses[0]?.emailAddress,
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
    <div className="min-h-screen min-w-full bg-gray-200 text-black">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Master N8N - Choose Your Plan</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress}
              </span>
              <UserButton />
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex items-center justify-center p-8">
        <div className="flex gap-8 flex-wrap justify-center">
          {products.map((product) => (
            <div key={product.id} className={`max-w-sm bg-white rounded-lg shadow-md p-8 flex flex-col relative ${
              product.id === 2 ? 'ring-2 ring-blue-500 scale-105 shadow-xl' : ''
            }`}>
              
              {/* Add "Most Popular" badge for middle card */}
              {product.id === 2 && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <h1 className="text-2xl font-bold text-center mb-6">
                {product.name}
              </h1>

              <div className="text-center mb-8">
                <div className={`text-4xl font-bold mb-2 ${
                  product.id === 2 ? 'text-blue-500' : 'text-blue-600'
                }`}>
                  ${product.price}
                </div>
                <div className="text-gray-600">{product.rateTime}</div>
              </div>

              <ul className="mb-8 space-y-2 flex-grow">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <button
                  onClick={() => handleSubscribe(product.priceId)}
                  className={`w-full font-bold py-3 px-4 rounded-lg transition-colors ${
                    product.id === 2 
                      ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  Subscribe Now
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Secure payment powered by Stripe
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}