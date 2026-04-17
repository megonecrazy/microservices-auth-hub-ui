import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, CheckCircle, ShieldAlert } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  
  return (
    <div className="main-content">
      <div className="auth-card glass" style={{ maxWidth: '600px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <CheckCircle size={48} color="#10b981" />
        </div>
        <h2>Dashboard Access Granted</h2>
        <p style={{ color: 'var(--text-muted)' }}>You are successfully connected to the protected application.</p>
        
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', margin: '24px 0', textAlign: 'left' }}>
          <p style={{ margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={18} /> <strong>Token Status:</strong> Active
          </p>
          <p style={{ margin: '0', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <ShieldAlert size={18} /> Validated interceptors securely sending standard headers.
          </p>
        </div>

        <button onClick={logout} style={{ background: 'transparent', border: '1px solid var(--danger)', color: 'var(--danger)' }} className="premium-btn">
          <LogOut size={18} /> Log Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
