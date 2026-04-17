import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { authService } from '../services/authService';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await authService.register({ username, email, password });
      navigate('/verify');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="auth-card glass">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <UserPlus size={48} color="#a855f7" />
        </div>
        <h2>Create Account</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Join the springpractice platform</p>
        
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
            type="email" 
            className="premium-input" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit" className="premium-btn" disabled={loading} style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)' }}>
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>
        <div style={{ marginTop: '16px', fontSize: '0.9rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Already have an account? </span>
          <Link to="/login" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 'bold' }}>Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
