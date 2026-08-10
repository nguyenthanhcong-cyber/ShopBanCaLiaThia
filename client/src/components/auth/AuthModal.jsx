import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';

// view: 'login' | 'register' | 'forgot' | 'reset'
function AuthModal({ initialView = 'login', resetToken = null, onClose }) {
  const [view, setView] = useState(initialView);

  useEffect(() => {
    setView(initialView);
  }, [initialView]);

  // Đóng khi click backdrop
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="auth-modal-overlay" onClick={handleBackdropClick}>
      <div className="auth-modal">
        <button className="auth-modal-close" onClick={onClose} aria-label="Đóng">✕</button>

        <div className="auth-modal-fish">🐠</div>

        {view === 'login' && (
          <LoginForm
            onSwitchToRegister={() => setView('register')}
            onSwitchToForgot={() => setView('forgot')}
            onClose={onClose}
          />
        )}
        {view === 'register' && (
          <RegisterForm onSwitchToLogin={() => setView('login')} onClose={onClose} />
        )}
        {view === 'forgot' && (
          <ForgotPasswordForm onSwitchToLogin={() => setView('login')} />
        )}
        {view === 'reset' && resetToken && (
          <ResetPasswordForm token={resetToken} onDone={() => { setView('login'); }} />
        )}
      </div>
    </div>
  );
}

export default AuthModal;
