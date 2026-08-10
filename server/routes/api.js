const express = require('express');
const router = express.Router();
const db = require('../config/db');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');
const authorizeAdmin = require('../middleware/authorizeAdmin');

// ─── Health ───────────────────────────────────────────────────────────────────
router.get('/health', (req, res) => {
  const pool = db.getPool();
  res.json({
    status: 'ok',
    message: 'Fish aquarium shop API is running',
    timestamp: new Date().toISOString(),
    database: pool ? 'mysql' : 'demo'
  });
});

// ─── Auth Routes ──────────────────────────────────────────────────────────────
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/me', verifyToken, authController.getProfile);
router.post('/auth/forgot-password', authController.requestPasswordReset);
router.post('/auth/reset-password', authController.resetPassword);

// ─── Products (public) ────────────────────────────────────────────────────────
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);

// ─── Orders (public - bạn có thể thêm verifyToken nếu muốn bảo vệ) ────────────
router.post('/orders', orderController.createOrder);

const adminRoutes = require('./admin');

// ─── Admin Routes (cần đăng nhập + role admin) ───────────────────────────────
router.use('/admin', verifyToken, authorizeAdmin, adminRoutes);

module.exports = router;
