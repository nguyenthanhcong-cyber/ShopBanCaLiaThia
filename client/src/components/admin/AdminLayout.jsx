import React from 'react';
import { Link, Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function AdminLayout() {
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-icon">CF</div>
          <span className="admin-brand-text">Admin</span>
        </div>
        
        <nav className="admin-nav">
          <Link to="/admin" className={`admin-nav-item ${location.pathname === '/admin' ? 'active' : ''}`}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            Thống kê
          </Link>
          <Link to="/admin/products" className={`admin-nav-item ${location.pathname.includes('/admin/products') ? 'active' : ''}`}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Quản lý Sản phẩm
          </Link>
          <Link to="/admin/orders" className={`admin-nav-item ${location.pathname.includes('/admin/orders') ? 'active' : ''}`}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Quản lý Đơn hàng
          </Link>
          <Link to="/admin/users" className={`admin-nav-item ${location.pathname.includes('/admin/users') ? 'active' : ''}`}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Quản lý Người dùng
          </Link>
          <Link to="/" className="admin-nav-item logout">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Về cửa hàng
          </Link>
        </nav>
      </aside>
      
      <main className="admin-main">
        <header className="admin-header">
          <h1>Dashboard</h1>
          <div className="admin-user-chip">
            <div className="admin-user-avatar">
              {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
            </div>
            <span style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.9rem' }}>{user?.name}</span>
            <span className="admin-badge" style={{ background: '#fef08a', color: '#854d0e', marginLeft: '6px' }}>Admin</span>
          </div>
        </header>
        
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
