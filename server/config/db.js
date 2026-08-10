const mysql = require('mysql2/promise');
const seedProducts = require('./seedData');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'fishshop',
  charset: 'utf8mb4'
};

let mysqlPool = null;

async function initializeDatabase() {
  try {
    const adminConnection = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      multipleStatements: true
    });

    const safeDatabaseName = String(dbConfig.database).replace(/`/g, '');
    await adminConnection.execute(`CREATE DATABASE IF NOT EXISTS \`${safeDatabaseName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    await adminConnection.end();

    mysqlPool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    await mysqlPool.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
        category VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
        price DECIMAL(12,2) NOT NULL,
        unit VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
        rating DECIMAL(3,2) DEFAULT 0,
        description TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
        image TEXT
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await mysqlPool.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT PRIMARY KEY AUTO_INCREMENT,
        customer_name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
        order_code VARCHAR(50) NOT NULL,
        total DECIMAL(12,2) NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    try {
      await mysqlPool.execute("ALTER TABLE orders ADD COLUMN status VARCHAR(20) DEFAULT 'pending'");
    } catch (err) {
      // Ignore if column already exists
    }

    await mysqlPool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
        email VARCHAR(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role ENUM('admin','user') NOT NULL DEFAULT 'user',
        reset_token VARCHAR(255) NULL,
        reset_token_expires DATETIME NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    const [rows] = await mysqlPool.execute('SELECT COUNT(*) AS total FROM products');
    if (rows[0].total === 0) {
      const values = seedProducts.map((product) => [
        product.name,
        product.category,
        product.price,
        product.unit,
        product.rating,
        product.description,
        product.image
      ]);

      await mysqlPool.query(
        'INSERT INTO products (name, category, price, unit, rating, description, image) VALUES ?',
        [values]
      );
    }

    console.log('MySQL connection established successfully.');
  } catch (error) {
    console.warn('MySQL not available, app will use demo data for local testing:', error.message);
    mysqlPool = null;
  }
}

function getPool() {
  return mysqlPool;
}

module.exports = {
  initializeDatabase,
  getPool
};
