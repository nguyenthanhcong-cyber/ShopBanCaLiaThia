const db = require('../config/db');

// --- Products ---

async function createProduct(req, res) {
  const { name, category, price, unit, rating, description, image } = req.body || {};
  if (!name || !price || !category || !unit) {
    return res.status(400).json({ message: 'Thiếu thông tin bắt buộc (name, category, price, unit).' });
  }

  const pool = db.getPool();
  if (!pool) return res.status(503).json({ message: 'Database không khả dụng.' });

  try {
    const [result] = await pool.execute(
      'INSERT INTO products (name, category, price, unit, rating, description, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, category, price, unit, rating || 0, description || '', image || '']
    );
    res.status(201).json({ message: 'Thêm sản phẩm thành công', id: result.insertId });
  } catch (err) {
    console.error('[Admin] Create product error:', err.message);
    res.status(500).json({ message: 'Lỗi máy chủ.' });
  }
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const { name, category, price, unit, rating, description, image } = req.body || {};
  if (!name || !price || !category || !unit) {
    return res.status(400).json({ message: 'Thiếu thông tin bắt buộc (name, category, price, unit).' });
  }

  const pool = db.getPool();
  if (!pool) return res.status(503).json({ message: 'Database không khả dụng.' });

  try {
    await pool.execute(
      'UPDATE products SET name = ?, category = ?, price = ?, unit = ?, rating = ?, description = ?, image = ? WHERE id = ?',
      [name, category, price, unit, rating || 0, description || '', image || '', id]
    );
    res.json({ message: 'Cập nhật sản phẩm thành công' });
  } catch (err) {
    console.error('[Admin] Update product error:', err.message);
    res.status(500).json({ message: 'Lỗi máy chủ.' });
  }
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  const pool = db.getPool();
  if (!pool) return res.status(503).json({ message: 'Database không khả dụng.' });

  try {
    await pool.execute('DELETE FROM products WHERE id = ?', [id]);
    res.json({ message: 'Xóa sản phẩm thành công' });
  } catch (err) {
    console.error('[Admin] Delete product error:', err.message);
    res.status(500).json({ message: 'Lỗi máy chủ.' });
  }
}

// --- Orders ---

async function getOrders(req, res) {
  const pool = db.getPool();
  if (!pool) return res.status(503).json({ message: 'Database không khả dụng.' });

  try {
    const [rows] = await pool.execute('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('[Admin] Get orders error:', err.message);
    res.status(500).json({ message: 'Lỗi máy chủ.' });
  }
}

async function updateOrderStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) return res.status(400).json({ message: 'Thiếu trạng thái (status).' });

  const pool = db.getPool();
  if (!pool) return res.status(503).json({ message: 'Database không khả dụng.' });

  try {
    await pool.execute('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    res.json({ message: 'Cập nhật trạng thái thành công' });
  } catch (err) {
    console.error('[Admin] Update order status error:', err.message);
    res.status(500).json({ message: 'Lỗi máy chủ.' });
  }
}

async function deleteOrder(req, res) {
  const { id } = req.params;
  const pool = db.getPool();
  if (!pool) return res.status(503).json({ message: 'Database không khả dụng.' });

  try {
    await pool.execute('DELETE FROM orders WHERE id = ?', [id]);
    res.json({ message: 'Xóa đơn hàng thành công' });
  } catch (err) {
    console.error('[Admin] Delete order error:', err.message);
    res.status(500).json({ message: 'Lỗi máy chủ.' });
  }
}

// --- Users ---

async function getUsers(req, res) {
  const pool = db.getPool();
  if (!pool) return res.status(503).json({ message: 'Database không khả dụng.' });

  try {
    const [rows] = await pool.execute('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('[Admin] Get users error:', err.message);
    res.status(500).json({ message: 'Lỗi máy chủ.' });
  }
}

async function updateUserRole(req, res) {
  const { id } = req.params;
  const { role } = req.body;
  
  if (!role || (role !== 'admin' && role !== 'user')) {
    return res.status(400).json({ message: 'Role không hợp lệ.' });
  }

  if (parseInt(id) === req.user.userId) {
    return res.status(400).json({ message: 'Không thể tự thay đổi quyền của chính mình.' });
  }

  const pool = db.getPool();
  if (!pool) return res.status(503).json({ message: 'Database không khả dụng.' });

  try {
    await pool.execute('UPDATE users SET role = ? WHERE id = ?', [role, id]);
    res.json({ message: 'Cập nhật quyền thành công' });
  } catch (err) {
    console.error('[Admin] Update user role error:', err.message);
    res.status(500).json({ message: 'Lỗi máy chủ.' });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;

  if (parseInt(id) === req.user.userId) {
    return res.status(400).json({ message: 'Không thể tự xóa tài khoản của chính mình.' });
  }

  const pool = db.getPool();
  if (!pool) return res.status(503).json({ message: 'Database không khả dụng.' });

  try {
    await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'Xóa người dùng thành công' });
  } catch (err) {
    console.error('[Admin] Delete user error:', err.message);
    res.status(500).json({ message: 'Lỗi máy chủ.' });
  }
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getOrders,
  updateOrderStatus,
  deleteOrder,
  getUsers,
  updateUserRole,
  deleteUser
};
