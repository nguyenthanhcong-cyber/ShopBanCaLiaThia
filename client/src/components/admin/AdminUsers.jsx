import React, { useState, useEffect } from 'react';
import { authFetch } from '../../utils/auth';
import { useAuth } from '../../context/AuthContext';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user: currentUser } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await authFetch('/api/admin/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError('Lỗi tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    if (id === currentUser.userId) {
      alert('Bạn không thể tự thay đổi quyền của chính mình!');
      return;
    }

    try {
      const res = await authFetch(`/api/admin/users/${id}/role`, {
        method: 'PUT',
        body: JSON.stringify({ role: newRole })
      });
      if (res.ok) {
        setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
      } else {
        const data = await res.json();
        alert(data.message || 'Cập nhật quyền thất bại');
      }
    } catch (err) {
      alert('Lỗi mạng');
    }
  };

  const handleDelete = async (id) => {
    if (id === currentUser.userId) {
      alert('Bạn không thể tự xóa tài khoản của chính mình!');
      return;
    }

    if (!window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) return;
    
    try {
      const res = await authFetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setUsers(users.filter(u => u.id !== id));
      } else {
        const data = await res.json();
        alert(data.message || 'Xóa thất bại');
      }
    } catch (err) {
      alert('Lỗi mạng');
    }
  };

  return (
    <div>
      <h2 className="admin-card-title">Quản lý Người dùng</h2>
      
      <div className="admin-card" style={{ padding: '24px' }}>
        <div className="admin-table-wrap">
          {loading ? <p style={{ color: '#64748b', textAlign: 'center', padding: '20px' }}>Đang tải...</p> : error ? <p style={{ color: '#ef4444' }}>{error}</p> : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên</th>
                  <th>Email</th>
                  <th>Ngày tham gia</th>
                  <th>Quyền</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>#{u.id}</td>
                    <td style={{ fontWeight: 'bold' }}>{u.name} {u.id === currentUser.userId && <span style={{ color: '#0ea5e9', fontWeight: 'normal' }}>(Bạn)</span>}</td>
                    <td>{u.email}</td>
                    <td>{new Date(u.created_at).toLocaleDateString('vi-VN')}</td>
                    <td>
                      <select 
                        value={u.role} 
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        disabled={u.id === currentUser.userId}
                        className="admin-select"
                        style={{ 
                          backgroundColor: u.role === 'admin' ? '#fef08a' : '#f1f5f9',
                          color: u.role === 'admin' ? '#854d0e' : '#475569',
                          opacity: u.id === currentUser.userId ? 0.6 : 1,
                          cursor: u.id === currentUser.userId ? 'not-allowed' : 'pointer'
                        }}
                      >
                        <option value="user">Thành viên</option>
                        <option value="admin">Quản trị viên</option>
                      </select>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleDelete(u.id)} 
                        disabled={u.id === currentUser.userId}
                        className={`admin-action-btn delete ${u.id === currentUser.userId ? 'disabled' : ''}`}
                        title="Xóa"
                        style={{ 
                          opacity: u.id === currentUser.userId ? 0.5 : 1,
                          cursor: u.id === currentUser.userId ? 'not-allowed' : 'pointer' 
                        }}>
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: '16px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
