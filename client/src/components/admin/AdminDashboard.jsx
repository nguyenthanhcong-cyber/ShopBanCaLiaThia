import React, { useState, useEffect } from 'react';
import { authFetch } from '../../utils/auth';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0
  });

  useEffect(() => {
    // In a real app, this would be a single /api/admin/stats endpoint
    // For now, we'll fetch everything to calculate stats
    const fetchStats = async () => {
      try {
        const [prodRes, orderRes, userRes] = await Promise.all([
          authFetch('/api/products'),
          authFetch('/api/admin/orders'),
          authFetch('/api/admin/users')
        ]);
        
        const products = await prodRes.json();
        const orders = await orderRes.json();
        const users = await userRes.json();
        
        const revenue = orders
          .filter(o => o.status !== 'cancelled')
          .reduce((sum, o) => sum + parseFloat(o.total), 0);

        setStats({
          products: products.length || 0,
          orders: orders.length || 0,
          users: users.length || 0,
          revenue
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Tổng sản phẩm', value: stats.products, color: '#3b82f6', link: '/admin/products' },
    { title: 'Tổng đơn hàng', value: stats.orders, color: '#10b981', link: '/admin/orders' },
    { title: 'Tổng người dùng', value: stats.users, color: '#8b5cf6', link: '/admin/users' },
    { title: 'Doanh thu (ước tính)', value: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stats.revenue), color: '#f59e0b', link: '/admin/orders' }
  ];

  return (
    <div>
      <h2 className="admin-card-title">Thống kê tổng quan</h2>
      
      <div className="admin-stats-grid">
        {statCards.map((stat, idx) => (
          <div key={idx} className="admin-stat-card" style={{ '--stat-color': stat.color, '--stat-bg': `${stat.color}15` }}>
            <div className="admin-stat-icon">
              {idx === 0 && <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: '24px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
              {idx === 1 && <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: '24px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
              {idx === 2 && <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: '24px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
              {idx === 3 && <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: '24px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            </div>
            <h3 className="admin-stat-title">{stat.title}</h3>
            <p className="admin-stat-value">{stat.value}</p>
            <Link to={stat.link} style={{ color: stat.color, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold', marginTop: '16px', display: 'inline-block' }}>
              Xem chi tiết &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
