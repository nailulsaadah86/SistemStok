import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/logo.png';

interface LoginProps {
  onLogin: (userData: any) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });
      onLogin(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center" style={{ minHeight: '100vh', padding: '24px', background: 'var(--bg-darker)' }}>
      {/* Background Decorative Blobs */}
      <div style={{
        position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)', 
        borderRadius: '50%', filter: 'blur(100px)', top: '-20%', left: '-10%', zIndex: 0
      }}></div>
      <div style={{
        position: 'absolute', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(217, 70, 239, 0.15) 0%, transparent 70%)', 
        borderRadius: '50%', filter: 'blur(100px)', bottom: '-15%', right: '-5%', zIndex: 0
      }}></div>

      <div className="glass-panel animate-fade-in gradient-border" style={{ width: '100%', maxWidth: '420px', zIndex: 1, padding: '40px' }}>
        <div className="flex flex-col items-center mb-10">
          <div style={{
            padding: '2px', borderRadius: '24px', 
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            marginBottom: '24px', boxShadow: '0 0 30px var(--primary-glow)'
          }}>
            <img 
              src={logo} 
              alt="Nady Fashion" 
              style={{ width: '100px', height: '100px', borderRadius: '22px', objectFit: 'cover' }} 
            />
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>nady.fashion</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Selamat Datang di Portal Inventaris</p>
        </div>

        {error && (
          <div style={{
            padding: '12px', background: 'rgba(244, 63, 94, 0.1)', color: 'var(--danger)', 
            border: '1px solid rgba(244, 63, 94, 0.2)',
            borderRadius: '12px', marginBottom: '24px', fontSize: '0.9rem', textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Username anda"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '12px', height: '52px' }} disabled={loading}>
            {loading ? 'Sedang Memproses...' : 'Masuk ke Sistem'}
          </button>
        </form>
        
        <div style={{
          marginTop: '32px', padding: '16px', background: 'rgba(255,255,255,0.03)', 
          borderRadius: '12px', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center'
        }}>
          Gunakan akun <b style={{color: 'var(--text-color)'}}>admin</b> atau <b style={{color: 'var(--text-color)'}}>gudang</b>
        </div>
      </div>
    </div>
  );
}
