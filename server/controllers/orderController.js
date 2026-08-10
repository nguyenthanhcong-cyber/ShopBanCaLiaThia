const db = require('../config/db');

async function createOrder(req, res) {
  const { items, customerName } = req.body || {};

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Invalid order data' });
  }

  const total = items.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);
  const orderCode = `FISH-${Date.now()}`;

  const pool = db.getPool();
  if (!pool) {
    return res.status(503).json({ message: 'Database is unavailable.' });
  }

  try {
    await pool.execute(
      'INSERT INTO orders (customer_name, order_code, total) VALUES (?, ?, ?)',
      [customerName || 'Khách hàng', orderCode, total]
    );
  } catch (error) {
    console.warn('Failed to save order to MySQL:', error.message);
    return res.status(500).json({ message: 'Failed to save order.' });
  }

  res.status(201).json({
    message: 'Order placed successfully',
    orderId: orderCode,
    customerName: customerName || 'Khách hàng',
    total
  });
}

module.exports = {
  createOrder
};
