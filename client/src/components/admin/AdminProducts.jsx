import React, { useState, useEffect } from 'react';
import { authFetch } from '../../utils/auth';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    unit: '',
    rating: '5.0',
    description: '',
    image: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError('Lỗi tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = (product) => {
    setFormData(product);
    setCurrentId(product.id);
    setIsEditing(true);
    window.scrollTo(0, 0);
  };

  const handleCancel = () => {
    setFormData({ name: '', category: '', price: '', unit: '', rating: '5.0', description: '', image: '' });
    setCurrentId(null);
    setIsEditing(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
    
    try {
      const res = await authFetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        const data = await res.json();
        alert(data.message || 'Xóa thất bại');
      }
    } catch (err) {
      alert('Lỗi mạng');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = isEditing ? `/api/admin/products/${currentId}` : '/api/admin/products';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await authFetch(url, {
        method,
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        alert(isEditing ? 'Cập nhật thành công!' : 'Thêm sản phẩm thành công!');
        fetchProducts();
        handleCancel();
      } else {
        const data = await res.json();
        alert(data.message || 'Có lỗi xảy ra');
      }
    } catch (err) {
      alert('Lỗi mạng');
    }
  };

  return (
    <div>
      <h2 className="admin-card-title">Quản lý Sản phẩm</h2>
      
      {/* Form thêm/sửa sản phẩm */}
      <div className="admin-card">
        <h3 style={{ marginTop: 0, marginBottom: '24px', color: '#0ea5e9', fontSize: '1.1rem' }}>{isEditing ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>Tên sản phẩm (*)</label>
            <input name="name" value={formData.name} onChange={handleInputChange} required className="admin-input" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>Danh mục (*)</label>
            <input name="category" value={formData.category} onChange={handleInputChange} required className="admin-input" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>Giá (*)</label>
            <input type="number" name="price" value={formData.price} onChange={handleInputChange} required className="admin-input" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>Đơn vị tính (*)</label>
            <input name="unit" value={formData.unit} onChange={handleInputChange} placeholder="VD: Con, Bầy, Cặp..." required className="admin-input" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>Đánh giá (1-5)</label>
            <input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleInputChange} className="admin-input" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>Link Ảnh (URL)</label>
            <input name="image" value={formData.image} onChange={handleInputChange} placeholder="https://..." className="admin-input" />
          </div>
          <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>Mô tả</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="admin-input" style={{ resize: 'vertical' }}></textarea>
          </div>
          <div style={{ gridColumn: 'span 2', display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button type="submit" className="admin-btn primary">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: '18px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              {isEditing ? 'Lưu thay đổi' : 'Thêm sản phẩm'}
            </button>
            {isEditing && (
              <button type="button" onClick={handleCancel} className="admin-btn secondary">
                Hủy
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="admin-card" style={{ padding: '24px' }}>
        <div className="admin-table-wrap">
          {loading ? <p style={{ color: '#64748b', textAlign: 'center', padding: '20px' }}>Đang tải...</p> : error ? <p style={{ color: '#ef4444' }}>{error}</p> : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Ảnh</th>
                  <th>Tên cá</th>
                  <th>Danh mục</th>
                  <th>Giá</th>
                  <th>Đơn vị</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td>#{p.id}</td>
                    <td>
                      {p.image ? <img src={p.image} alt={p.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0' }} /> : <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Trống</span>}
                    </td>
                    <td>{p.name}</td>
                    <td><span className="admin-badge" style={{ background: '#f1f5f9', color: '#475569' }}>{p.category}</span></td>
                    <td style={{ color: '#0ea5e9', fontWeight: '700' }}>
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price)}
                    </td>
                    <td>{p.unit}</td>
                    <td>
                      <button onClick={() => handleEdit(p)} className="admin-action-btn edit" title="Sửa">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: '16px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="admin-action-btn delete" title="Xóa">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: '16px' }}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>Chưa có sản phẩm nào.</td>
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

export default AdminProducts;
