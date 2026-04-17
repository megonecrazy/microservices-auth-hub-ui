import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login({ username, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="auth-card glass">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <LogIn size={48} color="#6366f1" />
        </div>
        <h2>Welcome Back</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Log in to access your springpractice dashboard</p>
        
        {error && <div className="error-text">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            className="premium-input" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input 
            type="password" 
            className="premium-input" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="premium-btn" disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        <div style={{ marginTop: '16px', fontSize: '0.9rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Don't have an account? </span>
          <Link to="/register" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 'bold' }}>Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
