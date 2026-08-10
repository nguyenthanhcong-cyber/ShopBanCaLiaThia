import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

function RegisterForm({ onSwitchToLogin, onClose }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      return setError('Mật khẩu xác nhận không khớp.');
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password })
      });
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Không thể kết nối đến API backend. Vui lòng đảm bảo Server Node.js (cổng 5000) đang chạy!');
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Đăng ký thất bại.');
      login(data.token, data.user);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-form-wrap">
      <h2 className="auth-title">Đăng ký tài khoản</h2>
      <p className="auth-sub">Tham gia cộng đồng cá cảnh 🐟</p>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-field">
          <label>Họ và tên</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nguyễn Văn A"
            required
            autoFocus
          />
        </div>
        <div className="auth-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="example@email.com"
            required
          />
        </div>
        <div className="auth-field">
          <label>Mật khẩu</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Ít nhất 6 ký tự"
            required
          />
        </div>
        <div className="auth-field">
          <label>Xác nhận mật khẩu</label>
          <input
            type="password"
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
            placeholder="Nhập lại mật khẩu"
            required
          />
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="auth-btn primary" disabled={loading}>
          {loading ? 'Đang đăng ký...' : 'Đăng ký ngay'}
        </button>
      </form>

      <p className="auth-switch">
        Đã có tài khoản?{' '}
        <button className="auth-link-btn inline" onClick={onSwitchToLogin}>
          Đăng nhập
        </button>
      </p>
    </div>
  );
}

export default RegisterForm;
