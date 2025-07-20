import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import DashBoard from './pages/DashBoard'
import SignIn from './pages/SignIn';
import {SignUp} from './pages/SignUp';
import NotFound from './pages/NotFound';
import SharedBrain from './pages/SharedBrain';
import ProtectedRoute from './ProtectedRoute';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />

        {/* Public Shared Brain Route */}
        <Route path="/brain/:shareHash" element={<SharedBrain />} />

        {/* Redirect to /dashboard if already logged in */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;




