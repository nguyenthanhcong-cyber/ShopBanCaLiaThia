const db = require('../config/db');

async function getProducts(req, res) {
  const pool = db.getPool();
  if (!pool) {
    return res.status(503).json({ message: 'Database is unavailable.' });
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM products ORDER BY id ASC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error retrieving products.' });
  }
}

async function getProductById(req, res) {
  const pool = db.getPool();
  if (!pool) {
    return res.status(503).json({ message: 'Database is unavailable.' });
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [req.params.id]);
    const product = rows[0] || null;

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error retrieving product.' });
  }
}

module.exports = {
  getProducts,
  getProductById
};
