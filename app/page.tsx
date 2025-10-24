import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    // If user is signed in, redirect to dashboard
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-semibold mb-4">Welcome back!</h1>
        <p className="text-gray-600 mb-6">You are already signed in.</p>
        <Link 
          href="/dashboard" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-16">
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              🍳 ZotFood
            </h1>
            <p className="text-2xl text-gray-700 mb-8">
              Duolingo for Cooking
            </p>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Master cooking skills with interactive lessons, discover recipes based on your pantry, 
              and build confidence in the kitchen. Designed specifically for UCI students.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/api/auth/signin"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Started - Sign In
              </Link>
              <Link 
                href="/learn"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Explore Lessons
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
              <p className="text-gray-600">
                Master cooking fundamentals with structured, progressive lessons and hands-on practice.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold mb-2">Smart Recipes</h3>
              <p className="text-gray-600">
                Discover recipes based on your pantry ingredients with cost and time optimization.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-2">Personal Pantry</h3>
              <p className="text-gray-600">
                Track your ingredients and get personalized recipe recommendations.
              </p>
            </div>
          </div>

          {/* Demo Account Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Try the Demo</h3>
            <p className="text-blue-800 mb-4">
              Use our demo account to explore all features without signing up:
            </p>
            <div className="bg-white rounded-md p-4 text-left max-w-md mx-auto">
              <p><strong>Email:</strong> demo@uci.edu</p>
              <p><strong>Password:</strong> password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
