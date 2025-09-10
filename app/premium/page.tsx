import { getUserSubscriptionTier, hasAccessToTier, SUBSCRIPTION_TIERS } from '@/lib/subscription';
import { UserButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import PortalButton from '@/components/PortalButton';

export default async function PremiumPage() {
  const userTier = await getUserSubscriptionTier();
  
  if (!hasAccessToTier(userTier, SUBSCRIPTION_TIERS.PREMIUM)) {
    if (userTier === SUBSCRIPTION_TIERS.FREE) {
      redirect('/free');
    } else {
      redirect('/pricing');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Master N8N</h1>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                Premium Access
              </span>
            </div>
            <div className="flex items-center gap-4">
              <PortalButton className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold">
                Manage Billing
              </PortalButton>
              <UserButton />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Premium N8N Mastery</h1>
          <p className="text-xl text-gray-600">Advanced automation workflows and professional techniques</p>
          
          {/* Access Notice */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🎯</span>
              <h3 className="text-lg font-semibold">Your Premium Access Includes:</h3>
            </div>
            <div className="flex gap-4">
              <Link 
                href="/basic" 
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
              >
                Basic Tutorials ✓
              </Link>
              <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg">
                Premium Content ✓
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Advanced Tutorial Cards */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🔄</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Advanced Workflow Patterns</h3>
            <p className="text-gray-600 mb-4">Master complex workflow patterns, loops, and conditional logic.</p>
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Start Advanced Course
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🔌</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">API Integration Mastery</h3>
            <p className="text-gray-600 mb-4">Connect with REST APIs, GraphQL, and webhooks like a pro.</p>
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Start Course
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Data Transformation</h3>
            <p className="text-gray-600 mb-4">Advanced data processing, mapping, and transformation techniques.</p>
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Start Course
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Error Handling & Monitoring</h3>
            <p className="text-gray-600 mb-4">Build robust workflows with proper error handling and monitoring.</p>
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Start Course
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🏗️</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Scalable Architectures</h3>
            <p className="text-gray-600 mb-4">Design workflows that scale with your business needs.</p>
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Start Course
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📈</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
            <p className="text-gray-600 mb-4">Track workflow performance and optimize your automations.</p>
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              View Analytics
            </button>
          </div>
        </div>

        {/* Premium-only sections */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Premium Resources</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-semibold mb-4">📚 Case Study Library</h3>
              <p className="text-gray-600 mb-6">Real-world automation scenarios from successful businesses.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>E-commerce automation</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>CRM integrations</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Marketing workflows</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Data synchronization</li>
              </ul>
              <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Browse Case Studies
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-semibold mb-4">🎯 Template Library</h3>
              <p className="text-gray-600 mb-6">Professional workflow templates ready to customize.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Lead management</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Invoice processing</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Social media automation</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Report generation</li>
              </ul>
              <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Access Templates
              </button>
            </div>
          </div>
        </div>

        {/* Upgrade CTA */}
        <div className="mt-12 flex justify-center">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-lg font-semibold mb-4">Want Expert-level access?</h3>
            <a 
              href="/pricing" 
              className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Upgrade to Expert
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}