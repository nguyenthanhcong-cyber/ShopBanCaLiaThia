import React from 'react';
import { formatMoney } from '../utils/format';

function CartModal({ cart, updateQuantity, subtotal, customerName, setCustomerName, placeOrder, message, onClose }) {
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(10, 30, 40, 0.55)',
          backdropFilter: 'blur(6px)',
        }}
      />

      {/* Panel */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: 480,
        background: 'white',
        borderRadius: 24,
        boxShadow: '0 24px 80px rgba(0,0,0,0.22)',
        overflow: 'hidden',
        animation: 'slideUp 0.28s ease',
      }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '22px 28px',
          borderBottom: '1px solid #f1f5f9',
          background: 'linear-gradient(135deg, #145860 0%, #0e7490 100%)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2" style={{ width: 22 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 style={{ margin: 0, color: 'white', fontSize: '1.2rem', fontWeight: 700 }}>
              Giỏ hàng {cart.length > 0 && <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>({cart.length} loại)</span>}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 34, height: 34, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.1rem', transition: 'background 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          >✕</button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 28px', maxHeight: '55vh', overflowY: 'auto' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: 12 }}>🛒</div>
              <p style={{ margin: 0, fontSize: '1rem', fontWeight: 500 }}>Giỏ hàng đang trống</p>
              <p style={{ margin: '6px 0 0', fontSize: '0.85rem' }}>Hãy thêm cá vào giỏ nào!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {cart.map((item) => (
                <div key={item.id} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 16px',
                  background: '#f8fafc',
                  borderRadius: 14,
                  border: '1px solid #f1f5f9',
                }}>
                  <img src={item.image} alt={item.name} style={{ width: 52, height: 52, objectFit: 'contain', borderRadius: 10, background: '#e0f7fa', padding: 4 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: '0 0 2px', fontWeight: 700, fontSize: '0.95rem', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</p>
                    <p style={{ margin: 0, color: '#145860', fontWeight: 600, fontSize: '0.9rem' }}>{formatMoney(item.price)}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px solid #e2e8f0', background: 'white', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
                      onMouseOver={e => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
                      onMouseOut={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#475569'; }}
                    >−</button>
                    <span style={{ minWidth: 22, textAlign: 'center', fontWeight: 700, fontSize: '0.95rem', color: '#1e293b' }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px solid #e2e8f0', background: 'white', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
                      onMouseOver={e => { e.currentTarget.style.borderColor = '#145860'; e.currentTarget.style.color = '#145860'; }}
                      onMouseOut={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#475569'; }}
                    >+</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Checkout */}
        {cart.length > 0 && (
          <div style={{ padding: '20px 28px', borderTop: '1px solid #f1f5f9', background: '#fafbfc' }}>
            {/* Total */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ color: '#64748b', fontSize: '0.95rem' }}>Tổng cộng</span>
              <strong style={{ fontSize: '1.4rem', color: '#145860', fontWeight: 800 }}>{formatMoney(subtotal)}</strong>
            </div>

            {/* Customer name input */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#475569', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Tên khách hàng
              </label>
              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nhập tên của bạn để đặt hàng..."
                style={{
                  width: '100%', padding: '11px 14px',
                  borderRadius: 12, border: '1.5px solid #e2e8f0',
                  fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                  fontFamily: 'inherit',
                }}
                onFocus={e => e.target.style.borderColor = '#145860'}
                onBlur={e => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>

            {/* Place order */}
            <button
              onClick={placeOrder}
              style={{
                width: '100%', padding: '14px',
                background: 'linear-gradient(135deg, #145860 0%, #0e7490 100%)',
                color: 'white', border: 'none', borderRadius: 14,
                fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
                transition: 'opacity 0.2s, transform 0.15s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
              onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
              onMouseOut={e => e.currentTarget.style.opacity = '1'}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: 18 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Đặt hàng ngay
            </button>

            {message && (
              <div style={{
                marginTop: 12, padding: '10px 14px', borderRadius: 10,
                background: message.includes('thất bại') || message.includes('lỗi') || message.includes('trống') ? '#fef2f2' : '#f0fdf4',
                color: message.includes('thất bại') || message.includes('lỗi') || message.includes('trống') ? '#ef4444' : '#16a34a',
                fontSize: '0.88rem', fontWeight: 500, textAlign: 'center',
                border: `1px solid ${message.includes('thất bại') || message.includes('lỗi') || message.includes('trống') ? '#fecaca' : '#bbf7d0'}`,
              }}>
                {message}
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

export default CartModal;
