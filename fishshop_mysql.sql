CREATE DATABASE IF NOT EXISTS fishshop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE fishshop;

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS users;

CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  category VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  unit VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  rating DECIMAL(3,2) DEFAULT 0,
  description TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  image TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  order_code VARCHAR(50) NOT NULL,
  total DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  email VARCHAR(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin','user') NOT NULL DEFAULT 'user',
  reset_token VARCHAR(255) NULL,
  reset_token_expires DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO users (name, email, password_hash, role) VALUES
('Quản trị viên', 'admin@fishshop.com', '$2b$10$N90v9EAuvwjMiiDwmJqAiOO8Z.GVnuzcv//gjPkEWW6GpDko21jWG', 'admin'),
('Thành viên', 'user@fishshop.com', '$2b$10$4gDmGJvZJ0TWj/ORaNGm2ekKVklG71cY/HstJUrKMMBi8hE6J1F0m', 'user');

INSERT INTO products (name, category, price, unit, rating, description, image) VALUES
('Cá Koi Sư Tử', 'Cá cảnh', 4200000, 'con', 4.90, 'Cá Koi màu sắc rực rỡ, thân khỏe, phù hợp làm điểm nhấn trong hồ cảnh.', '/images/fish-1.svg'),
('Cá Betta Halfmoon', 'Cá cảnh', 680000, 'con', 4.80, 'Vây dài và màu sắc đẹp, rất phù hợp để nuôi trong bể decor.', '/images/fish-2.svg'),
('Cá Rồng Nhật Bản', 'Cá độc đáo', 12500000, 'con', 5.00, 'Giống cá cảnh cao cấp với vây dài và hình dáng thu hút.', '/images/fish-3.svg'),
('Cá Guppy Fancy', 'Cá mini', 320000, 'bộ 3', 4.70, 'Nhỏ gọn, dễ chăm sóc, màu sắc sặc sỡ cho bể mini.', '/images/fish-4.svg'),
('Cá Gold Fish', 'Cá cảnh', 760000, 'con', 4.60, 'Cá vàng khỏe mạnh, bền đẹp, thích hợp cho hồ mini và phòng khách.', '/images/fish-5.svg'),
('Cá Tê Giác', 'Cá đặc biệt', 1500000, 'con', 4.90, 'Một loại cá cảnh nổi bật với hình dáng độc lạ và dễ thu hút ánh nhìn.', '/images/fish-6.svg'),
('Cá Hớn Hởng', 'Cá cảnh', 550000, 'con', 4.50, 'Cá bơi mạnh, bề ngoài bắt mắt, thích hợp cho bể thủy sinh.', '/images/fish-1.svg'),
('Cá Neon', 'Cá mini', 290000, 'bộ 3', 4.60, 'Màu sắc sáng và dễ nuôi, phù hợp bể nhỏ hoặc bàn làm việc.', '/images/fish-2.svg'),
('Cá Dĩa Vàng', 'Cá cảnh', 890000, 'con', 4.70, 'Cá có thân dẹt, vây đẹp, tạo cảm giác hiện đại cho không gian.', '/images/fish-3.svg'),
('Cá Tử Tế', 'Cá cảnh', 930000, 'con', 4.80, 'Màu sắc rõ nét, thân mềm và bơi nhanh, rất thu hút.', '/images/fish-4.svg'),
('Cá Bảy Màu', 'Cá cảnh', 1100000, 'con', 4.90, 'Sắc màu rực rỡ, nổi bật, thích hợp trang trí đồ án cá cảnh.', '/images/fish-5.svg'),
('Cá Bạch Tuyết', 'Cá đặc biệt', 1450000, 'con', 4.85, 'Cá có sắc trắng tinh, mang vẻ đẹp sang trọng cho căn phòng.', '/images/fish-6.svg');
