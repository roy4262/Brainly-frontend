import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img
                width="40"
                height="40"
                src="https://img.icons8.com/ios/50/brain--v1.png"
                alt="brain--v1"
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Brainely
              </span>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {isLoggedIn ? (
                <Button
                  onClick={handleDashboard}
                  text="Dashboard"
                  variant="primary"
                  className="text-sm sm:text-base"
                />
              ) : (
                <>
                  <Button
                    onClick={handleSignIn}
                    text="Sign In"
                    variant="secondary"
                    className="text-sm sm:text-base"
                  />
                  <Button
                    onClick={() => navigate('/signup')}
                    text="Sign Up"
                    variant="primary"
                    className="text-sm sm:text-base"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="text-center">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Your Digital
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Second Brain
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Organize, store, and share your digital knowledge from YouTube, Twitter, documents, and web links in one beautiful, intelligent platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button
                onClick={handleGetStarted}
                text={isLoggedIn ? "Go to Dashboard" : "Get Started Free"}
                variant="primary"
                className="text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                fullWidth={false}
              />
              {!isLoggedIn && (
                <Button
                  onClick={handleSignIn}
                  text="Sign In"
                  variant="secondary"
                  className="text-lg px-8 py-4"
                  fullWidth={false}
                />
              )}
            </div>

            {/* Hero Image/Demo */}
            <div className="relative max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="ml-4 text-sm text-gray-500">brainely.app/dashboard</div>
                  </div>
                </div>
                <div className="p-8 bg-gradient-to-br from-purple-50 to-blue-50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Sample Cards */}
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <div className="flex items-center mb-2">
                        <div className="w-5 h-5 bg-red-500 rounded mr-2"></div>
                        <span className="text-sm font-medium">YouTube Video</span>
                      </div>
                      <div className="w-full h-20 bg-gray-200 rounded"></div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <div className="flex items-center mb-2">
                        <div className="w-5 h-5 bg-blue-500 rounded mr-2"></div>
                        <span className="text-sm font-medium">Twitter Post</span>
                      </div>
                      <div className="w-full h-20 bg-gray-200 rounded"></div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <div className="flex items-center mb-2">
                        <div className="w-5 h-5 bg-green-500 rounded mr-2"></div>
                        <span className="text-sm font-medium">Document</span>
                      </div>
                      <div className="w-full h-20 bg-gray-200 rounded"></div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <div className="flex items-center mb-2">
                        <div className="w-5 h-5 bg-purple-500 rounded mr-2"></div>
                        <span className="text-sm font-medium">Web Link</span>
                      </div>
                      <div className="w-full h-20 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Brainely?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your scattered digital content into an organized, searchable, and shareable knowledge base.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Organization</h3>
              <p className="text-gray-600">
                Automatically categorize and organize your content from multiple platforms in one unified dashboard.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Multi-Platform Support</h3>
              <p className="text-gray-600">
                Save content from YouTube, Twitter, upload documents, and bookmark web links all in one place.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Easy Sharing</h3>
              <p className="text-gray-600">
                Share your curated knowledge collections with others through secure, shareable links.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200">
              <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Responsive Design</h3>
              <p className="text-gray-600">
                Access your second brain from any device with our fully responsive, mobile-friendly interface.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 border border-red-200">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Secure & Private</h3>
              <p className="text-gray-600">
                Your data is protected with JWT authentication and secure cloud storage infrastructure.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600">
                Built with modern technologies for optimal performance and instant content loading.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Get started with your digital second brain in just three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sign Up</h3>
              <p className="text-gray-600 text-lg">
                Create your free account in seconds. No credit card required, no complex setup.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Add Content</h3>
              <p className="text-gray-600 text-lg">
                Start adding your favorite videos, tweets, documents, and links to build your knowledge base.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Organize & Share</h3>
              <p className="text-gray-600 text-lg">
                Filter, organize, and share your curated content collections with the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Build Your Second Brain?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of knowledge enthusiasts who are already organizing their digital lives with Brainely.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleGetStarted}
              text={isLoggedIn ? "Go to Dashboard" : "Start Building Now"}
              variant="secondary"
              className="text-lg px-8 py-4 bg-white text-purple-600 hover:bg-gray-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              fullWidth={false}
            />
            {!isLoggedIn && (
              <p className="text-purple-100 text-sm">
                Free forever • No credit card required
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img
                width="32"
                height="32"
                src="https://img.icons8.com/ios/50/brain--v1.png"
                alt="brain--v1"
                className="w-8 h-8 filter invert"
              />
              <span className="text-2xl font-bold">Brainely</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2025 Lakshman Virijala. Built with ❤️ for knowledge enthusiasts.</p>
              <p className="text-sm mt-1">Your personal second brain for the digital age.</p>
              <div className="flex items-center justify-center md:justify-end mt-3 space-x-4">
                <a 
                  href="https://github.com/roy4262" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="text-sm">GitHub</span>
                </a>
                <span className="text-gray-600">•</span>
                <span className="text-sm text-gray-500">Reach out for collaborations</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;