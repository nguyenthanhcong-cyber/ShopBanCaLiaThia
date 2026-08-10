import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './auth/AuthModal';

function Header({ cartCount, onCartOpen }) {
  const { isAuthenticated, user, isAdmin, logout } = useAuth();
  const [authModal, setAuthModal] = useState(null); // null | 'login' | 'register'

  return (
    <>
      <header className="topbar">
        <div className="brand-wrap">
          <div className="logo">CF</div>
          <div>
            <p className="brand-name">Cá Liền Thia</p>
            <span className="brand-tag">Cá cảnh đẹp - chất lượng cao</span>
          </div>
        </div>

        <nav className="nav-links">
          <a href="/#products">Sản phẩm</a>
          <a href="/#features">Ưu điểm</a>
          <a href="/#checkout">Thanh toán</a>
          <a href="/about">Giới thiệu</a>
          {isAdmin && <a href="/admin" className="admin-link">⚙️ Admin</a>}
        </nav>

        <div className="header-actions">
          {isAuthenticated ? (
            <div className="user-menu">
              <div className="user-avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : '?'}
              </div>
              <div className="user-dropdown">
                <div className="user-info">
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                  {isAdmin && <span className="role-badge admin">Admin</span>}
                  {!isAdmin && <span className="role-badge user">Thành viên</span>}
                </div>
                <button className="dropdown-item logout-btn" onClick={logout}>
                  🚪 Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-btns">
              <button className="auth-nav-btn outline" onClick={() => setAuthModal('login')}>
                Đăng nhập
              </button>
              <button className="auth-nav-btn filled" onClick={() => setAuthModal('register')}>
                Đăng ký
              </button>
            </div>
          )}

          <button
            className="cart-pill"
            onClick={onCartOpen}
          >
            Giỏ hàng ({cartCount})
          </button>
        </div>
      </header>

      {authModal && (
        <AuthModal
          initialView={authModal}
          onClose={() => setAuthModal(null)}
        />
      )}
    </>
  );
}

export default Header;
