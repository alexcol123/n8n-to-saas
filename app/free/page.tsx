import { getUserSubscriptionTier, SUBSCRIPTION_TIERS } from '@/lib/subscription';
import { UserButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import PortalButton from '@/components/PortalButton';

export default async function FreePage() {
  const userTier = await getUserSubscriptionTier();
  
  // If user has a paid subscription, redirect them to their appropriate tier page
  if (userTier !== SUBSCRIPTION_TIERS.FREE) {
    if (userTier === SUBSCRIPTION_TIERS.BASIC) redirect('/basic');
    if (userTier === SUBSCRIPTION_TIERS.PREMIUM) redirect('/premium'); 
    if (userTier === SUBSCRIPTION_TIERS.EXPERT) redirect('/expert');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Master N8N</h1>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                Free Access
              </span>
            </div>
            <div className="flex items-center gap-4">
              <PortalButton className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">
                Manage Billing
              </PortalButton>
              <UserButton />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Master N8N</h1>
          <p className="text-xl text-gray-600 mb-8">Get started with your N8N automation journey</p>
          
          {/* Free tier limitations notice */}
          <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🎯</span>
              <h3 className="text-lg font-semibold">You're on the Free Plan</h3>
            </div>
            <p className="text-gray-600 mb-4">
              You have access to this introductory content. Upgrade to unlock comprehensive N8N tutorials and advanced automation techniques.
            </p>
            <a 
              href="/pricing" 
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              View Pricing Plans
            </a>
          </div>
        </div>

        {/* Free Content */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📖</span>
            </div>
            <h3 className="text-2xl font-semibold mb-4">What is N8N?</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              N8N is a powerful workflow automation tool that lets you connect different services and automate tasks without writing code. 
              It's perfect for businesses looking to streamline processes and increase productivity.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Visual workflow builder
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                300+ pre-built integrations
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Self-hosted or cloud options
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Getting Started</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Ready to dive into N8N automation? Here are the essential first steps to begin your journey into workflow automation.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-blue-500 mr-2">1.</span>
                Sign up for N8N account
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-blue-500 mr-2">2.</span>
                Explore the workflow editor
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-blue-500 mr-2">3.</span>
                Create your first automation
              </div>
            </div>
          </div>
        </div>

        {/* Upgrade CTA */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-xl p-8 text-white text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Master N8N?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Unlock comprehensive tutorials, advanced workflows, and expert guidance with our paid plans.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="font-semibold mb-2">Basic - $10/month</h3>
                <p className="text-blue-100 text-sm">Essential N8N tutorials and fundamental workflows</p>
              </div>
              <div className="bg-white/20 rounded-lg p-6 border-2 border-white/30">
                <h3 className="font-semibold mb-2">Premium - $20/month</h3>
                <p className="text-blue-100 text-sm">Advanced automation + Basic content + Analytics</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="font-semibold mb-2">Expert - $30/month</h3>
                <p className="text-blue-100 text-sm">Complete access + 1-on-1 consultations + Beta features</p>
              </div>
            </div>

            <a 
              href="/pricing" 
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-bold text-lg shadow-lg"
            >
              Choose Your Plan
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}