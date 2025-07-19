import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import DashBoard from './pages/DashBoard'
import SignIn from './pages/SignIn';
import {SignUp} from './pages/SignUp';
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

        {/* Redirect to /dashboard if already logged in */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;




