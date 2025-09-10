import { getUserSubscriptionTier, hasAccessToTier, SUBSCRIPTION_TIERS } from '@/lib/subscription';
import { UserButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import PortalButton from '@/components/PortalButton';

export default async function BasicPage() {
  const userTier = await getUserSubscriptionTier();
  
  if (!hasAccessToTier(userTier, SUBSCRIPTION_TIERS.BASIC)) {
    if (userTier === SUBSCRIPTION_TIERS.FREE) {
      redirect('/free');
    } else {
      redirect('/pricing');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Master N8N</h1>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                Basic Access
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Basic N8N Tutorials</h1>
          <p className="text-xl text-gray-600">Learn the fundamentals of N8N automation</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tutorial Cards */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Getting Started with N8N</h3>
            <p className="text-gray-600 mb-4">Learn how to set up your first N8N workflow and understand the basics.</p>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Start Tutorial
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🔗</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Basic Node Connections</h3>
            <p className="text-gray-600 mb-4">Understand how to connect nodes and create simple workflows.</p>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Start Tutorial
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📧</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Email Automation</h3>
            <p className="text-gray-600 mb-4">Create your first email automation workflow with N8N.</p>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Start Tutorial
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">⏰</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Scheduling Workflows</h3>
            <p className="text-gray-600 mb-4">Learn to schedule your workflows to run automatically.</p>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Start Tutorial
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🗃️</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">File Processing</h3>
            <p className="text-gray-600 mb-4">Handle file uploads, downloads, and processing in N8N.</p>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Start Tutorial
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Basic Debugging</h3>
            <p className="text-gray-600 mb-4">Debug your workflows and understand common issues.</p>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Start Tutorial
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex justify-center">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-lg font-semibold mb-4">Want access to more content?</h3>
            <a 
              href="/pricing" 
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Upgrade to Premium or Expert
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}