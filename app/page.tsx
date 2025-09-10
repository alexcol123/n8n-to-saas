'use client';

import { getStripe } from '@/lib/stripe-client';

export default function Home() {
  const products = [
    {
      id: 1,
      priceId: 'price_1S5S5IAikXlKuqX0JIzgYK2y',
      name: 'Site Access',
      price: 10,
      rateTime: 'per month',
      description: 'Monthly subscription for premium site access',
      features: [
        'Unlimited access to all content',
        'Premium features',
        'Cancel anytime',
      ],
    },
    {
      id: 2,
      priceId: 'price_1S5VuPAikXlKuqX0k4FeASwU',
      name: 'Premium Site Access',
      price: 20,
      rateTime: 'per month',
      description: 'Monthly subscription for premium site access',
      features: [
        'Unlimited access to all content + Portfolio features',
        'Premium features',
        'Cancel anytime',
        'Access to exclusive resources',
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
    <div className="min-h-screen bg-gray-200 flex items-center justify-center text-black p-8">
      <div className="flex gap-8 flex-wrap justify-center">
        {products.map((product) => (
          <div key={product.id} className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold text-center mb-6">
              {product.name}
            </h1>

            <div className="text-center mb-8">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                ${product.price}
              </div>
              <div className="text-gray-600">{product.rateTime}</div>
            </div>

            <ul className="mb-8 space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(product.priceId)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Subscribe Now
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Secure payment powered by Stripe
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}