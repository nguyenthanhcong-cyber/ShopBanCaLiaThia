import React, { useState, useEffect } from 'react';
import { authFetch } from '../../utils/auth';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await authFetch('/api/admin/orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setError('Lỗi tải danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await authFetch(`/api/admin/orders/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
      } else {
        alert('Cập nhật trạng thái thất bại');
      }
    } catch (err) {
      alert('Lỗi mạng');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này? Hành động này không thể hoàn tác.')) return;
    
    try {
      const res = await authFetch(`/api/admin/orders/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setOrders(orders.filter(o => o.id !== id));
      } else {
        alert('Xóa thất bại');
      }
    } catch (err) {
      alert('Lỗi mạng');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return { bg: '#dcfce7', text: '#166534' };
      case 'cancelled': return { bg: '#fee2e2', text: '#991b1b' };
      case 'processing': return { bg: '#fef3c7', text: '#92400e' };
      default: return { bg: '#e2e8f0', text: '#475569' };
    }
  };

  return (
    <div>
      <h2 className="admin-card-title">Quản lý Đơn hàng</h2>
      
      <div className="admin-card" style={{ padding: '24px' }}>
        <div className="admin-table-wrap">
          {loading ? <p style={{ color: '#64748b', textAlign: 'center', padding: '20px' }}>Đang tải...</p> : error ? <p style={{ color: '#ef4444' }}>{error}</p> : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Mã ĐH</th>
                  <th>Khách hàng</th>
                  <th>Tổng tiền</th>
                  <th>Ngày đặt</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td style={{ fontWeight: 'bold' }}>{o.order_code}</td>
                    <td>{o.customer_name}</td>
                    <td style={{ color: '#0ea5e9', fontWeight: 'bold' }}>
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(o.total)}
                    </td>
                    <td>{new Date(o.created_at).toLocaleString('vi-VN')}</td>
                    <td>
                      <select 
                        value={o.status || 'pending'} 
                        onChange={(e) => handleStatusChange(o.id, e.target.value)}
                        className="admin-select"
                        style={{ 
                          backgroundColor: getStatusColor(o.status || 'pending').bg,
                          color: getStatusColor(o.status || 'pending').text,
                        }}
                      >
                        <option value="pending">Chờ xử lý</option>
                        <option value="processing">Đang giao</option>
                        <option value="completed">Hoàn thành</option>
                        <option value="cancelled">Đã hủy</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(o.id)} className="admin-action-btn delete" title="Xóa">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: '16px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>Chưa có đơn hàng nào.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
