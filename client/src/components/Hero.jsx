import React from 'react';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">Aquatic beauty</span>
        <h1>Cá cảnh đẹp, bể đẹp, không gian sống đầy sắc màu.</h1>
        <p>
          Nơi bạn tìm thấy các dòng cá cảnh nhập khẩu, cá Koi, cá Betta, và những mẫu cá
          độc đáo để làm điểm nhấn cho căn nhà, văn phòng hoặc sân vườn của bạn.
        </p>
        <div className="hero-actions">
          <a href="#products" className="primary-btn">Mua ngay</a>
          <button className="secondary-btn">Khuyến mãi mới</button>
        </div>
        <div className="hero-stats">
          <div>
            <strong>1.8k+</strong>
            <span>Khách hàng</span>
          </div>
          <div>
            <strong>4.9/5</strong>
            <span>Đánh giá</span>
          </div>
          <div>
            <strong>24h</strong>
            <span>Chăm sóc</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="visual-card large">
          <img src="/images/fish-hero-1.svg" alt="Cá cảnh" />
        </div>
        <div className="visual-card small">
          <img src="/images/fish-hero-2.svg" alt="Cá Betta" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
