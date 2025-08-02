import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-600 mb-4 transition-colors duration-300">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-3">
          <Link
            to="/dashboard"
            className="block w-full bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/signin"
            className="block w-full bg-gray-500 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;