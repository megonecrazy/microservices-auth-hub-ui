import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { User } from 'lucide-react';

// Import Pages
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyOtp from './pages/VerifyOtp';
import Dashboard from './pages/Dashboard';

// Protect Routes that require authentication
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const { user } = useAuth();

  return (
    <div className="app-container">
      <header className="navbar glass">
        <div className="navbar-brand">
          <User size={24} color="#a855f7" />  ReactPractice API Client
        </div>
        <div>
          {user && <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Secure Session Active</span>}
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/verify" element={user ? <Navigate to="/dashboard" /> : <VerifyOtp />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
