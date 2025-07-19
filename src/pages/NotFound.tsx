import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-3">
          <Link
            to="/dashboard"
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/signin"
            className="block w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;