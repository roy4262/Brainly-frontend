// Backend URL configuration
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api/v1";

// App configuration
export const APP_NAME = import.meta.env.VITE_APP_NAME || "Brainely";
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || "1.0.0";
export const DEV_MODE = import.meta.env.VITE_DEV_MODE === "true";

// Debug logging for production troubleshooting
console.log('🔧 Environment Configuration:');
console.log('📡 Backend URL:', BACKEND_URL);
console.log('🏷️ App Name:', APP_NAME);
console.log('🔢 App Version:', APP_VERSION);
console.log('🛠️ Dev Mode:', DEV_MODE);
console.log('🌍 Environment:', import.meta.env.MODE);