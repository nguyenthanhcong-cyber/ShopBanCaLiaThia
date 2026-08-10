function authorizeAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Bạn không có quyền truy cập trang này.' });
  }
  next();
}

module.exports = authorizeAdmin;
