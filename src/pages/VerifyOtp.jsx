import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound } from 'lucide-react';
import { authService } from '../services/authService';

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await authService.verifyToken(otp);
      setSuccess('Verification successful! You can now log in.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err?.response?.data?.message || 'Verification failed. Please check your OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="auth-card glass">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <KeyRound size={48} color="#10b981" />
        </div>
        <h2>Verify Account</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Enter the OTP sent to your email to verify your identity.</p>
        
        {error && <div className="error-text">{error}</div>}
        {success && <div style={{ color: '#10b981', fontSize: '0.875rem', marginBottom: '16px', textAlign: 'left' }}>{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            className="premium-input" 
            placeholder="Enter OTP Code" 
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            style={{ textAlign: 'center', fontSize: '1.2rem', letterSpacing: '2px' }}
          />
          <button type="submit" className="premium-btn" disabled={loading} style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
