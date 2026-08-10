import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onSwitchToRegister, onSwitchToForgot, onClose }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Không thể kết nối đến API backend. Vui lòng đảm bảo Server Node.js (cổng 5000) đang chạy!');
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Đăng nhập thất bại.');
      login(data.token, data.user);
      onClose();
      if (data.user?.role === 'admin') {
        navigate('/admin');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-form-wrap">
      <h2 className="auth-title">Đăng nhập</h2>
      <p className="auth-sub">Chào mừng trở lại 🐠</p>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
            autoFocus
          />
        </div>
        <div className="auth-field">
          <label>Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
            required
          />
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="auth-btn primary" disabled={loading}>
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>

      <button className="auth-link-btn" onClick={onSwitchToForgot}>
        Quên mật khẩu?
      </button>

      <p className="auth-switch">
        Chưa có tài khoản?{' '}
        <button className="auth-link-btn inline" onClick={onSwitchToRegister}>
          Đăng ký ngay
        </button>
      </p>
    </div>
  );
}

export default LoginForm;
