// routes/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = !!localStorage.getItem('token');
  return isAuth ? children : <Navigate to="/" replace />;
};
export default ProtectedRoute;