import React, { useState } from 'react';

function ResetPasswordForm({ token, onDone }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (newPassword !== confirm) return setError('Mật khẩu xác nhận không khớp.');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword })
      });
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Không thể kết nối đến API backend. Vui lòng đảm bảo Server Node.js (cổng 5000) đang chạy!');
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Đặt lại mật khẩu thất bại.');
      setSuccess(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="auth-form-wrap">
        <div className="auth-success-box">
          <div className="auth-success-icon">✅</div>
          <h2 className="auth-title">Thành công!</h2>
          <p>{success}</p>
          <button className="auth-btn primary" onClick={onDone}>
            Đăng nhập ngay
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-form-wrap">
      <h2 className="auth-title">Đặt lại mật khẩu</h2>
      <p className="auth-sub">Nhập mật khẩu mới của bạn.</p>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-field">
          <label>Mật khẩu mới</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Ít nhất 6 ký tự"
            required
            autoFocus
          />
        </div>
        <div className="auth-field">
          <label>Xác nhận mật khẩu</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Nhập lại mật khẩu mới"
            required
          />
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="auth-btn primary" disabled={loading}>
          {loading ? 'Đang xử lý...' : 'Cập nhật mật khẩu'}
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
