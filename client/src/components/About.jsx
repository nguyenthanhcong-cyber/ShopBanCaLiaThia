import React from 'react';
import Header from './Header';

function About() {
  return (
    <div className="page-shell">
      <Header cartCount={0} showNavLinks={false} />
      
      <main style={{ marginTop: '40px' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderRadius: '32px',
          padding: '40px',
          boxShadow: 'var(--shadow)',
          border: '1px solid rgba(20, 88, 96, 0.08)',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <span className="eyebrow" style={{ fontSize: '0.9rem' }}>Về Chúng Tôi</span>
          <h1 style={{ fontSize: '3rem', margin: '10px 0 20px 0', color: 'var(--text)', fontWeight: '800' }}>Cá Liền Thia</h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '30px' }}>
            Nơi khơi nguồn đam mê cá cảnh thủy sinh. Chúng tôi chuyên cung cấp các giống cá cảnh tuyệt đẹp, chất lượng cao, đặc biệt là các dòng Betta (cá lia thia), cá bảy màu thuần chủng, và các phụ kiện thủy sinh cao cấp.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '40px 0', textAlign: 'left' }}>
            <div style={{ background: '#f4fbff', padding: '24px', borderRadius: '20px', border: '1px solid var(--line)' }}>
              <h3 style={{ margin: '0 0 10px 0', color: 'var(--primary)', fontWeight: '700' }}>🐠 Sứ mệnh</h3>
              <p style={{ margin: 0, color: 'var(--text)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Mang thiên nhiên sống động vào không gian sống của bạn. Hỗ trợ người nuôi cá từ những bước cơ bản nhất với kiến thức và sản phẩm tối ưu.
              </p>
            </div>
            <div style={{ background: '#f4fbff', padding: '24px', borderRadius: '20px', border: '1px solid var(--line)' }}>
              <h3 style={{ margin: '0 0 10px 0', color: 'var(--primary)', fontWeight: '700' }}>🌟 Cam kết</h3>
              <p style={{ margin: 0, color: 'var(--text)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Cá luôn khỏe mạnh, được chọn lọc kỹ càng, nguồn gốc rõ ràng. Dịch vụ tư vấn trọn đời và giao hàng an toàn, nhanh chóng 24h.
              </p>
            </div>
          </div>

          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '20px', color: 'var(--text)' }}>Hành trình của chúng tôi</h3>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: '1.8', textAlign: 'justify', textJustify: 'inter-word' }}>
            Bắt đầu từ một cửa hàng nhỏ đam mê cá Betta nghệ thuật, Cá Liền Thia đã không ngừng phát triển và mở rộng quy mô. Hiện tại, chúng tôi tự hào là một trong những địa chỉ tin cậy của cộng đồng yêu thủy sinh trên cả nước, nơi cung cấp những mẫu cá cảnh đột biến độc đáo, khỏe đẹp nhất để làm điểm nhấn sinh động cho bàn làm việc, phòng khách hay sân vườn của bạn.
          </p>

          <a href="/" className="primary-btn" style={{ display: 'inline-block', marginTop: '40px', padding: '14px 30px', textDecoration: 'none' }}>
            Quay lại Cửa hàng
          </a>
        </div>
      </main>
    </div>
  );
}

export default About;
