'use client';

import { getStripe } from '@/lib/stripe-client';

export default function Home() {
const products = [
  {
    id: 1,
    priceId: 'price_1S5pDrAikXlKuqX04GErTuad',
    name: 'Basic Site Access',
    price: 10,
    rateTime: 'per month',
    description: 'Basic membership with site access, no portfolio',
    features: [
      'Basic site access',
      'Standard content library',
      'Email support',
      'Mobile-responsive design',
      'Community forums',
    ],
  },
  {
    id: 2,
    priceId: 'price_1S5pDwAikXlKuqX0UHaXpVyh',
    name: 'Premium Site Access',
    price: 20,
    rateTime: 'per month',
    description: 'Premium membership with exclusive portfolio access',
    features: [
      'Premium portfolio access',
      'Professional portfolio templates',
      'Analytics dashboard',
      'Case studies library',
      'Priority support',
      'Advanced customization',
    ],
  },
  {
    id: 3,
    priceId: 'price_1S5pE3AikXlKuqX0chJ63sqr',
    name: 'Diamond Site Access',
    price: 30,
    rateTime: 'per month',
    description: 'Diamond membership with full access to all features',
    features: [
      'Full access to all features',
      'Premium portfolio & analytics',
      'Exclusive content library',
      'Priority support',
      'Beta features access',
      'Custom integrations',
      'Dedicated account manager',
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
<div className="min-h-screen min-w-full bg-gray-200 flex items-center justify-center text-black p-8">
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
  );
}