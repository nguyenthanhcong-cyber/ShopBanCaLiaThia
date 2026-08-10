// Lưu/đọc/xóa JWT token trong localStorage
export const setToken = (token) => localStorage.setItem('fishshop_token', token);
export const getToken = () => localStorage.getItem('fishshop_token');
export const clearToken = () => localStorage.removeItem('fishshop_token');

export const setUser = (user) => localStorage.setItem('fishshop_user', JSON.stringify(user));
export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem('fishshop_user') || 'null');
  } catch {
    return null;
  }
};
export const clearUser = () => localStorage.removeItem('fishshop_user');

// Fetch có tự động đính kèm Authorization header
export async function authFetch(url, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
  return fetch(url, { ...options, headers });
}
