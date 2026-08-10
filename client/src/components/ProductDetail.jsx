import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { formatMoney } from '../utils/format';
import Header from './Header';

function ProductDetail({ addToCart, onRequireLogin }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        const found = data.find(p => String(p.id) === String(id));
        setProduct(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  function handleAddToCart() {
    if (!isAuthenticated) {
      onRequireLogin();
      return;
    }
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (loading) return (
    <div className="page-shell">
      <Header cartCount={0} />
      <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', color: 'var(--muted)' }}>
          <div className="spinner" style={{ width: 48, height: 48, border: '4px solid var(--line)', borderTop: '4px solid var(--primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          Đang tải...
        </div>
      </main>
    </div>
  );

  if (!product) return (
    <div className="page-shell">
      <Header cartCount={0} />
      <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: '4rem' }}>🐟</div>
        <h2 style={{ color: 'var(--text)' }}>Không tìm thấy sản phẩm</h2>
        <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>← Quay lại cửa hàng</Link>
      </main>
    </div>
  );

  const features = [
    { icon: '🌊', label: 'Môi trường sống', value: product.category === 'Betta' ? 'Hồ nhỏ, ít cây thủy sinh' : 'Hồ có bộ lọc, nhiều không gian' },
    { icon: '🌡️', label: 'Nhiệt độ', value: '24°C – 28°C' },
    { icon: '🍽️', label: 'Thức ăn', value: 'Thức ăn viên, trùng chỉ, ấu trùng muỗi' },
    { icon: '📏', label: 'Kích thước', value: product.category === 'Betta' ? '5 – 7 cm' : '3 – 10 cm' },
    { icon: '⭐', label: 'Đánh giá', value: `${product.rating} / 5.0` },
    { icon: '📦', label: 'Đơn vị', value: product.unit },
  ];

  return (
    <div className="page-shell">
      <Header cartCount={0} />

      <main style={{ maxWidth: 1100, margin: '40px auto', padding: '0 24px' }}>
        {/* Breadcrumb */}
        <nav style={{ marginBottom: 24, fontSize: '0.9rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Trang chủ</Link>
          <span>›</span>
          <Link to="/#products" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Sản phẩm</Link>
          <span>›</span>
          <span>{product.name}</span>
        </nav>

        {/* Main Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
          {/* Image */}
          <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', boxShadow: 'var(--shadow)', background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '85%', height: '85%', objectFit: 'contain', transition: 'transform 0.4s ease' }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.06)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', borderRadius: 999, padding: '6px 14px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', border: '1px solid rgba(20,88,96,0.15)' }}>
              {product.category}
            </div>
          </div>

          {/* Info */}
          <div>
            <span className="eyebrow" style={{ fontSize: '0.85rem' }}>{product.category}</span>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text)', margin: '8px 0 4px 0', lineHeight: 1.15 }}>{product.name}</h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: '1.2rem' }}>{'⭐'.repeat(Math.round(product.rating))}</span>
              <span style={{ fontWeight: 600, color: 'var(--text)' }}>{product.rating}</span>
              <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>(Đánh giá từ khách hàng)</span>
            </div>

            <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '1rem', marginBottom: 24 }}>{product.description}</p>

            {/* Price Box */}
            <div style={{ background: 'linear-gradient(135deg, rgba(20,88,96,0.06) 0%, rgba(14,165,233,0.06) 100%)', borderRadius: 16, padding: '20px 24px', marginBottom: 24, border: '1px solid rgba(20,88,96,0.1)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: 4 }}>Giá bán</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary)' }}>{formatMoney(product.price)}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>/ {product.unit}</div>
            </div>

            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              className="primary-btn"
              style={{ width: '100%', padding: '16px', fontSize: '1.05rem', fontWeight: 700, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'all 0.2s', background: added ? '#10b981' : undefined }}
            >
              {added ? (
                <>✅ Đã thêm vào giỏ hàng!</>
              ) : (
                <>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: 22 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Thêm vào giỏ hàng
                </>
              )}
            </button>

            {!isAuthenticated && (
              <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--muted)', marginTop: 10 }}>
                🔒 Bạn cần <strong style={{ color: 'var(--primary)' }}>đăng nhập</strong> để thêm sản phẩm vào giỏ hàng.
              </p>
            )}

            <button onClick={() => navigate(-1)} style={{ width: '100%', marginTop: 12, padding: '12px', background: 'transparent', border: '1.5px solid var(--line)', borderRadius: 14, color: 'var(--muted)', cursor: 'pointer', fontSize: '0.95rem', transition: 'all 0.2s' }}
              onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--muted)'; }}
            >
              ← Quay lại
            </button>
          </div>
        </div>

        {/* Features / Specs */}
        <div style={{ marginTop: 60 }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text)', marginBottom: 24, textAlign: 'center' }}>Thông tin chi tiết</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {features.map((f, i) => (
              <div key={i} style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 16, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 6, transition: 'box-shadow 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
                onMouseOver={e => e.currentTarget.style.boxShadow = 'var(--shadow)'}
                onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'}
              >
                <span style={{ fontSize: '1.6rem' }}>{f.icon}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.label}</span>
                <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.95rem' }}>{f.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Care note */}
        <div style={{ marginTop: 40, background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', borderRadius: 20, padding: '28px 32px', border: '1px solid #bbf7d0' }}>
          <h3 style={{ margin: '0 0 12px 0', color: '#166534', fontWeight: 700, fontSize: '1.1rem' }}>💚 Lưu ý chăm sóc</h3>
          <p style={{ margin: 0, color: '#166534', lineHeight: 1.8, fontSize: '0.95rem' }}>
            Cá được vận chuyển trong túi oxy chuyên dụng, đảm bảo an toàn trong 24-48 giờ. Khi nhận hàng, hãy thả túi vào hồ 15–20 phút trước khi mở để cân bằng nhiệt độ. Cung cấp môi trường nước sạch, pH 6.5–7.5, và thay 20–30% nước mỗi tuần.
          </p>
        </div>
      </main>
    </div>
  );
}

export default ProductDetail;
