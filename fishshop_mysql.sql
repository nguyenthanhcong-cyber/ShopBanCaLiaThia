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
('Halfmoon Red Dragon', 'Halfmoon', 780000, 'con', 4.90, 'Rồng Đỏ 180° đẹp mắt, vây rộng và màu sắc nổi bật.', '/images/fish-1.svg'),
('Halfmoon Super Yellow', 'Halfmoon', 760000, 'con', 4.80, 'Vàng tuyền rực rỡ, thân mập khỏe và vây kéo dài.', '/images/fish-2.svg'),
('Halfmoon Blue Rim', 'Halfmoon', 820000, 'con', 4.80, 'Thân trắng viền xanh, vây nở tròn 180° rất đẹp.', '/images/fish-3.svg'),
('Halfmoon Black Orchid', 'Halfmoon', 840000, 'con', 4.90, 'Phong Lan Đen sang trọng, vây dày và bóng.', '/images/fish-4.svg'),
('Halfmoon White Opaque', 'Halfmoon', 720000, 'con', 4.70, 'Trắng sữa mềm mại, rất phù hợp cho hồ trưng bày.', '/images/fish-5.svg'),
('Halfmoon Mustard Gas', 'Halfmoon', 790000, 'con', 4.80, 'Thân mù tạt với viền vàng nổi bật, dáng vây uyển chuyển.', '/images/fish-6.svg'),
('Halfmoon Copper', 'Halfmoon', 860000, 'con', 4.90, 'Màu đồng ánh kim, dải vây rộng và phản quang đẹp.', '/images/fish-1.svg'),
('Halfmoon Super Red', 'Halfmoon', 810000, 'con', 4.90, 'Đỏ tuyền rực rỡ, vây nở đầy, cân đối và khỏe mạnh.', '/images/fish-2.svg'),
('Halfmoon Marble', 'Halfmoon', 830000, 'con', 4.80, 'Đốm loang độc đáo, mỗi con có hoa văn riêng biệt.', '/images/fish-3.svg'),
('Halfmoon Lavender', 'Halfmoon', 795000, 'con', 4.80, 'Thân xám vây tím hồng, phong cách nhẹ nhàng.', '/images/fish-4.svg'),
('Nemo Galaxy Classic', 'Nemo Galaxy', 650000, 'con', 4.70, 'Cam - đỏ - đen với vảy ánh kim, kiểu dáng mạnh mẽ.', '/images/fish-5.svg'),
('Nemo Galaxy Candy', 'Nemo Galaxy', 690000, 'con', 4.80, 'Màu ngọt ngào, đa sắc và bắt mắt cho hồ nhỏ.', '/images/fish-6.svg'),
('Nemo Galaxy Copper', 'Nemo Galaxy', 720000, 'con', 4.80, 'Nemo ánh đồng sang trọng, vảy kim lấp lánh.', '/images/fish-1.svg'),
('Nemo Galaxy Yellow Base', 'Nemo Galaxy', 700000, 'con', 4.70, 'Nền vàng với vảy kim, tươi sáng và rực rỡ.', '/images/fish-2.svg'),
('Nemo Galaxy Tiger', 'Nemo Galaxy', 730000, 'con', 4.80, 'Sọc hổ rõ nét, màu sắc đối lập, rất cá tính.', '/images/fish-3.svg'),
('Nemo Galaxy Multi-Color', 'Nemo Galaxy', 760000, 'con', 4.90, 'Phối phức hợp nhiều tông màu, độc đáo và lạ mắt.', '/images/fish-4.svg'),
('Nemo Galaxy Red Base', 'Nemo Galaxy', 740000, 'con', 4.80, 'Nền đỏ rực, vảy kim nổi bật và sang trọng.', '/images/fish-5.svg'),
('Nemo Galaxy Leopard', 'Nemo Galaxy', 770000, 'con', 4.80, 'Đốm báo hoang dại, kiểu dáng đậm chất thủy sinh.', '/images/fish-6.svg'),
('Nemo Galaxy Koi Star', 'Nemo Galaxy', 780000, 'con', 4.90, 'Vảy ánh kim ngôi sao, lấp lánh dưới ánh đèn.', '/images/fish-1.svg'),
('Nemo Galaxy Blue Star', 'Nemo Galaxy', 790000, 'con', 4.90, 'Mảng xanh dạ quang, rất đẹp trong hồ sáng nhẹ.', '/images/fish-2.svg'),
('Dumbo Halfmoon Super Red', 'Dumbo', 850000, 'con', 4.90, 'Tai vơi đỏ tuyền, vây ngực lớn, dáng cá mạnh mẽ.', '/images/fish-3.svg'),
('Dumbo Halfmoon Lavender', 'Dumbo', 830000, 'con', 4.80, 'Tai vơi tím hồng mềm mại, rất hợp hồ trang trí.', '/images/fish-4.svg'),
('Dumbo Plakat Red Dragon', 'Dumbo', 860000, 'con', 4.90, 'Tai vơi đuôi ngắn Rồng Đỏ, khỏe mạnh và nổi bật.', '/images/fish-5.svg'),
('Dumbo Halfmoon White', 'Dumbo', 820000, 'con', 4.70, 'Tai vơi trắng tinh khiết, hiền hậu và dễ nuôi.', '/images/fish-6.svg'),
('Dumbo Plakat Mustard Gas', 'Dumbo', 840000, 'con', 4.80, 'Đuôi ngắn Mustard Gas, tai vơi lớn và cá tính.', '/images/fish-1.svg'),
('Dumbo Plakat Blue Rim', 'Dumbo', 810000, 'con', 4.80, 'Tai vơi Blue Rim, màu sắc tinh tế và vây gọn.', '/images/fish-2.svg'),
('Dumbo Halfmoon Copper', 'Dumbo', 870000, 'con', 4.90, 'Tai vơi ánh đồng, lấp lánh và khỏe khoắn.', '/images/fish-3.svg'),
('Dumbo Plakat Multi-Color', 'Dumbo', 830000, 'con', 4.80, 'Đa sắc rực rỡ, tai vơi lớn và thân ngắn gọn.', '/images/fish-4.svg'),
('Dumbo Halfmoon Super Black', 'Dumbo', 860000, 'con', 4.90, 'Đen tuyền, tai vơi rộng, tạo dáng thanh lịch.', '/images/fish-5.svg'),
('Dumbo Plakat Fancy', 'Dumbo', 880000, 'con', 4.90, 'Fancy đặc biệt, tai vơi lớn và màu sắc phong phú.', '/images/fish-6.svg');
