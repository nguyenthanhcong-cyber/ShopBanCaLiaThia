const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require('../config/db');
const { JWT_SECRET, JWT_EXPIRES_IN, RESET_TOKEN_EXPIRES_MINUTES } = require('../config/auth');
const { sendResetPasswordEmail } = require('../config/mail');

// ─── Đăng ký ─────────────────────────────────────────────────────────────────
async function register(req, res) {
  const { name, email, password, role } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Vui lòng điền đầy đủ họ tên, email và mật khẩu.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Mật khẩu phải có ít nhất 6 ký tự.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Email không hợp lệ.' });
  }

  const pool = db.getPool();
  if (!pool) return res.status(503).json({ message: 'Database không khả dụng.' });

  try {
    const [existing] = await pool.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email đã được sử dụng.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userRole = role === 'admin' ? 'admin' : 'user'; // chỉ chấp nhận admin nếu explicit

    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [name.trim(), email.toLowerCase().trim(), passwordHash, userRole]
    );

    const token = jwt.sign(
      { userId: result.insertId, email: email.toLowerCase().trim(), role: userRole },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      message: 'Đăng ký thành công!',
      token,
      user: { id: result.insertId, name: name.trim(), email: email.toLowerCase().trim(), role: userRole }
    });
  } catch (err) {
    console.error('[Auth] Register error:', err.message);
    res.status(500).json({ message: 'Lỗi máy chủ.' });
  }
}

// ─── Đăng nhập ────────────────────────────────────────────────────────────────
async function login(req, res) {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu.' });
  }

  const pool = db.getPool();
  if (!pool) return res.status(503).json({ message: 'Database không khả dụng.' });

  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      message: 'Đăng nhập thành công!',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('[Auth] Login error:', err.message);
    res.status(500).json({ message: 'Lỗi máy chủ.' });
  }
}

// ─── Lấy thông tin profile ────────────────────────────────────────────────────
async function getProfile(req, res) {
  const pool = db.getPool();
  if (!pool) return res.status(503).json({ message: 'Database không khả dụng.' });

  try {
    const [rows] = await pool.execute(
      'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
      [req.user.userId]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'Người dùng không tồn tại.' });
    res.json(rows[0]);
  } catch (err) {
    console.error('[Auth] GetProfile error:', err.message);
    res.status(500).json({ message: 'Lỗi máy chủ.' });
  }
}

// ─── Yêu cầu đặt lại mật khẩu ────────────────────────────────────────────────
async function requestPasswordReset(req, res) {
  const { email } = req.body || {};

  if (!email) return res.status(400).json({ message: 'Vui lòng nhập email.' });

  const pool = db.getPool();
  if (!pool) return res.status(503).json({ message: 'Database không khả dụng.' });

  try {
    const [rows] = await pool.execute('SELECT id FROM users WHERE email = ?', [email.toLowerCase().trim()]);

    // Luôn trả về 200 để không lộ thông tin email tồn tại hay không
    if (rows.length === 0) {
      return res.json({ message: 'Nếu email tồn tại, chúng tôi đã gửi liên kết đặt lại mật khẩu.' });
    }

    const userId = rows[0].id;
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + RESET_TOKEN_EXPIRES_MINUTES * 60 * 1000);

    await pool.execute(
      'UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?',
      [resetToken, expiresAt, userId]
    );

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;

    await sendResetPasswordEmail(email.toLowerCase().trim(), resetUrl);

    res.json({ message: 'Nếu email tồn tại, chúng tôi đã gửi liên kết đặt lại mật khẩu.' });
  } catch (err) {
    console.error('[Auth] RequestPasswordReset error:', err.message);
    res.status(500).json({ message: 'Lỗi máy chủ.' });
  }
}

// ─── Đặt lại mật khẩu ─────────────────────────────────────────────────────────
async function resetPassword(req, res) {
  const { token, newPassword } = req.body || {};

  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Thiếu token hoặc mật khẩu mới.' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ message: 'Mật khẩu phải có ít nhất 6 ký tự.' });
  }

  const pool = db.getPool();
  if (!pool) return res.status(503).json({ message: 'Database không khả dụng.' });

  try {
    const [rows] = await pool.execute(
      'SELECT id FROM users WHERE reset_token = ? AND reset_token_expires > NOW()',
      [token]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
    }

    const userId = rows[0].id;
    const passwordHash = await bcrypt.hash(newPassword, 10);

    await pool.execute(
      'UPDATE users SET password_hash = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?',
      [passwordHash, userId]
    );

    res.json({ message: 'Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.' });
  } catch (err) {
    console.error('[Auth] ResetPassword error:', err.message);
    res.status(500).json({ message: 'Lỗi máy chủ.' });
  }
}

module.exports = { register, login, getProfile, requestPasswordReset, resetPassword };
