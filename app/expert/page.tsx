import { getUserSubscriptionTier, hasAccessToTier, SUBSCRIPTION_TIERS } from '@/lib/subscription';
import { UserButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import PortalButton from '@/components/PortalButton';

export default async function ExpertPage() {
  const userTier = await getUserSubscriptionTier();
  
  if (!hasAccessToTier(userTier, SUBSCRIPTION_TIERS.EXPERT)) {
    if (userTier === SUBSCRIPTION_TIERS.FREE) {
      redirect('/free');
    } else {
      redirect('/pricing');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Master N8N</h1>
              <span className="px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded-full">
                Expert Access
              </span>
            </div>
            <div className="flex items-center gap-4">
              <PortalButton className="px-4 py-2 bg-amber-600 text-white rounded-lg font-semibold">
                Manage Billing
              </PortalButton>
              <UserButton />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Expert N8N Mastery</h1>
          <p className="text-xl text-gray-600">Complete access to all N8N automation resources and expert guidance</p>
          
          {/* Access Notice */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">👑</span>
              <h3 className="text-lg font-semibold">Your Expert Access Includes:</h3>
            </div>
            <div className="flex gap-4 flex-wrap">
              <Link 
                href="/basic" 
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
              >
                Basic Tutorials ✓
              </Link>
              <Link 
                href="/premium" 
                className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors"
              >
                Premium Content ✓
              </Link>
              <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg">
                Expert Mastery ✓
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Expert-level Tutorial Cards */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🧠</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI & Machine Learning Integration</h3>
            <p className="text-gray-600 mb-4">Integrate AI models and ML workflows into your N8N automations.</p>
            <button className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
              Start Expert Course
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🏭</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Enterprise Architecture</h3>
            <p className="text-gray-600 mb-4">Design enterprise-grade automation solutions at scale.</p>
            <button className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
              Start Course
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🔐</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Advanced Security & Compliance</h3>
            <p className="text-gray-600 mb-4">Implement security best practices and compliance frameworks.</p>
            <button className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
              Start Course
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Performance Optimization</h3>
            <p className="text-gray-600 mb-4">Optimize workflows for maximum performance and efficiency.</p>
            <button className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
              Start Course
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🛠️</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Custom Node Development</h3>
            <p className="text-gray-600 mb-4">Build custom nodes and extend N8N functionality.</p>
            <button className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
              Start Course
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📞</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">1-on-1 Expert Consultation</h3>
            <p className="text-gray-600 mb-4">Schedule personal consultation calls with N8N experts.</p>
            <button className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
              Book Session
            </button>
          </div>
        </div>

        {/* Expert-only sections */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Expert Exclusive Resources</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-semibold mb-4">🎓 Masterclass Series</h3>
              <p className="text-gray-600 mb-6">Exclusive monthly masterclasses with industry experts.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Live Q&A sessions</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Advanced use cases</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Industry insights</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Networking opportunities</li>
              </ul>
              <button className="w-full px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                View Schedule
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-semibold mb-4">🏗️ Enterprise Templates</h3>
              <p className="text-gray-600 mb-6">Production-ready templates for enterprise environments.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Multi-tenant architectures</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>High-availability setups</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Compliance frameworks</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Disaster recovery</li>
              </ul>
              <button className="w-full px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                Access Templates
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-semibold mb-4">💬 Expert Community</h3>
              <p className="text-gray-600 mb-6">Private Slack community with N8N experts and power users.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Direct expert access</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Peer collaboration</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Beta feature previews</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Priority support</li>
              </ul>
              <button className="w-full px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                Join Community
              </button>
            </div>
          </div>
        </div>

        {/* Beta Features */}
        <div className="mt-12">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">🚀</span>
              <div>
                <h2 className="text-3xl font-bold">Beta Features Access</h2>
                <p className="text-amber-100 text-lg">Be first to try cutting-edge N8N features</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">🧪 AI Workflow Assistant</h3>
                <p className="text-amber-100 mb-4">AI-powered workflow optimization and suggestions.</p>
                <button className="px-4 py-2 bg-white text-amber-600 rounded-lg hover:bg-amber-50 font-semibold">
                  Try Beta
                </button>
              </div>
              
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">📊 Advanced Analytics</h3>
                <p className="text-amber-100 mb-4">Deep insights into workflow performance and optimization.</p>
                <button className="px-4 py-2 bg-white text-amber-600 rounded-lg hover:bg-amber-50 font-semibold">
                  Access Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}