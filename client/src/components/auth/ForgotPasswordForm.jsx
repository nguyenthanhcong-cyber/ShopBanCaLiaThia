import React, { useState } from 'react';

function ForgotPasswordForm({ onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Không thể kết nối đến API backend. Vui lòng đảm bảo Server Node.js (cổng 5000) đang chạy!');
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Có lỗi xảy ra.');
      setMessage(data.message);
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-form-wrap">
      <h2 className="auth-title">Quên mật khẩu</h2>
      <p className="auth-sub">Nhập email để nhận liên kết đặt lại mật khẩu.</p>

      {!sent ? (
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>Email đăng ký</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
              autoFocus
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-btn primary" disabled={loading}>
            {loading ? 'Đang gửi...' : 'Gửi liên kết đặt lại'}
          </button>
        </form>
      ) : (
        <div className="auth-success-box">
          <div className="auth-success-icon">📧</div>
          <p>{message}</p>
          <p className="auth-sub">Vui lòng kiểm tra hộp thư (bao gồm cả thư mục spam).</p>
        </div>
      )}

      <p className="auth-switch">
        Nhớ mật khẩu rồi?{' '}
        <button className="auth-link-btn inline" onClick={onSwitchToLogin}>
          Đăng nhập
        </button>
      </p>
    </div>
  );
}

export default ForgotPasswordForm;
