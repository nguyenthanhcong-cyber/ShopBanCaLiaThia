import React from 'react';

const SIDEBAR_WIDTH = 180;

const menuItems = [
  {
    label: 'Thêm sản phẩm',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: 20, flexShrink: 0 }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
    href: null,
  },
  {
    label: 'Xem đơn hàng',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: 20, flexShrink: 0 }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    href: null,
  },
  {
    label: 'Giới thiệu',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: 20, flexShrink: 0 }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20A10 10 0 0112 2z" />
      </svg>
    ),
    href: '/about',
  },
  {
    label: 'Trang chủ',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: 20, flexShrink: 0 }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    href: '/',
  },
];

function Taskbar() {
  return (
    <aside style={{
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      width: SIDEBAR_WIDTH,
      background: 'linear-gradient(180deg, #0f3640 0%, #145860 60%, #0e7490 100%)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 900,
      boxShadow: '3px 0 16px rgba(0,0,0,0.18)',
    }}>
      {/* Logo / brand area */}
      <div style={{
        padding: '22px 20px 18px',
        borderBottom: '1px solid rgba(255,255,255,0.10)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: 'rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: '1rem', color: 'white', flexShrink: 0,
        }}>🐠</div>
        <span style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.2 }}>Cá Liền Thia</span>
      </div>

      {/* Menu label */}
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '18px 20px 8px' }}>
        Chức năng
      </p>

      {/* Nav items */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, padding: '0 10px' }}>
        {menuItems.map((item, i) => (
          <a
            key={i}
            href={item.href || '#'}
            onClick={item.href ? undefined : (e) => e.preventDefault()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '11px 12px',
              borderRadius: 12,
              color: 'rgba(255,255,255,0.82)',
              textDecoration: 'none',
              fontSize: '0.88rem',
              fontWeight: 500,
              transition: 'background 0.18s, color 0.18s',
              cursor: 'pointer',
            }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'white'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.82)'; }}
          >
            {item.icon}
            {item.label}
          </a>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem' }}>
        v1.0 · Fish Shop
      </div>
    </aside>
  );
}

export { SIDEBAR_WIDTH };
export default Taskbar;
