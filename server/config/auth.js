const JWT_SECRET = process.env.JWT_SECRET || 'fishshop_secret_key_change_in_production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const RESET_TOKEN_EXPIRES_MINUTES = 30;

module.exports = { JWT_SECRET, JWT_EXPIRES_IN, RESET_TOKEN_EXPIRES_MINUTES };
