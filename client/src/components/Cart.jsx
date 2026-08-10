import React from 'react';
import { formatMoney } from '../utils/format';

function Cart({
  cart,
  updateQuantity,
  subtotal,
  customerName,
  setCustomerName,
  placeOrder,
  message
}) {
  return (
    <section className="checkout" id="checkout">
      <div className="checkout-panel">
        <h2>Giỏ hàng của bạn</h2>
        {cart.length === 0 ? (
          <p className="empty-cart">Giỏ hàng đang trống.</p>
        ) : (
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div>
                  <strong>{item.name}</strong>
                  <span>{formatMoney(item.price)}</span>
                </div>
                <div className="quantity-box">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="order-summary">
          <div>
            <span>Tổng tiền</span>
            <strong>{formatMoney(subtotal)}</strong>
          </div>
        </div>

        <label className="input-label">
          Tên khách hàng
          <input
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Nhập tên của bạn"
          />
        </label>

        <button className="checkout-btn" onClick={placeOrder}>Đặt hàng</button>
        {message && <p className="message">{message}</p>}
      </div>
    </section>
  );
}

export default Cart;
