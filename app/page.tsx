'use client';

import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';

export default function Home() {
  const { isSignedIn, user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Master N8N</h1>
            </div>
            <div className="flex items-center gap-4">
              {isSignedIn ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress}
                  </span>
                  <UserButton />
                </div>
              ) : (
                <div className="flex gap-2">
                  <SignInButton>
                    <button className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                      Get Started
                    </button>
                  </SignUpButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-20">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Master N8N
            <span className="block text-blue-600">Automation</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Learn to build powerful automation workflows with N8N. From beginner tutorials to advanced techniques, 
            master the art of no-code automation and transform your business processes.
          </p>
          
          {!isSignedIn ? (
            <SignUpButton>
              <button className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 shadow-lg">
                Start Learning Today
              </button>
            </SignUpButton>
          ) : (
            <a href="/free" className="inline-block px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 shadow-lg">
              Access Your Content
            </a>
          )}
        </div>

        {/* Features Section */}
        <div className="py-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-blue-600 text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Comprehensive Tutorials</h3>
              <p className="text-gray-600">Step-by-step guides covering everything from basic workflows to complex integrations.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-green-600 text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Real-World Examples</h3>
              <p className="text-gray-600">Practical automation scenarios you can implement immediately in your projects.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-purple-600 text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Support</h3>
              <p className="text-gray-600">Get help from experienced N8N automation experts when you need it.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}