import { useEffect, useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Taskbar, { SIDEBAR_WIDTH } from './components/Taskbar';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ProductGrid from './components/ProductGrid';
import CartModal from './components/CartModal';
import AuthModal from './components/auth/AuthModal';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminProducts from './components/admin/AdminProducts';
import AdminOrders from './components/admin/AdminOrders';
import AdminUsers from './components/admin/AdminUsers';
import About from './components/About';
import ProductDetail from './components/ProductDetail';
function getResetToken() {
  const params = new URLSearchParams(window.location.search);
  return params.get('token');
}

function AppContent() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [message, setMessage] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  // Xử lý reset password từ URL
  const [resetToken] = useState(() => getResetToken());
  const [showResetModal, setShowResetModal] = useState(() => Boolean(getResetToken()));

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setMessage('Không thể tải sản phẩm.'));
  }, []);

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
    setMessage(`${product.name} đã được thêm vào giỏ hàng.`);
  };

  const updateQuantity = (id, delta) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const placeOrder = async () => {
    if (!customerName.trim()) {
      setMessage('Vui lòng nhập tên khách hàng.');
      return;
    }

    if (cart.length === 0) {
      setMessage('Giỏ hàng đang trống.');
      return;
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          items: cart.map((item) => ({ ...item, quantity: item.quantity }))
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Đặt hàng thất bại');

      setMessage(`${data.message} - Mã đơn: ${data.orderId}`);
      setCart([]);
      setCustomerName('');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="page-shell" style={{ display: 'flex' }}>
      <Taskbar />
      <div style={{ marginLeft: SIDEBAR_WIDTH, flex: 1, minWidth: 0 }}>
        <Header cartCount={cartCount} onCartOpen={() => setShowCartModal(true)} />
        <main>
          <Hero />
          <Features />
          <ProductGrid products={products} addToCart={addToCart} onRequireLogin={() => setShowLoginModal(true)} />
        </main>

      {showCartModal && (
        <CartModal
          cart={cart}
          updateQuantity={updateQuantity}
          subtotal={subtotal}
          customerName={customerName}
          setCustomerName={setCustomerName}
          placeOrder={placeOrder}
          message={message}
          onClose={() => setShowCartModal(false)}
        />
      )}

      {/* Modal đăng nhập khi chưa đăng nhập mà bấm Thêm vào giỏ */}
      {showLoginModal && (
        <AuthModal
          initialView="login"
          onClose={() => setShowLoginModal(false)}
        />
      )}

      {/* Modal reset password nếu có token trong URL */}
      {showResetModal && resetToken && (
        <AuthModal
          initialView="reset"
          resetToken={resetToken}
          onClose={() => {
            setShowResetModal(false);
            window.history.replaceState({}, document.title, '/');
          }}
        />
      )}
      </div>
    </div>
  );
}

// Wrapper cho trang chi tiết sản phẩm — có giỏ hàng riêng (đơn giản, chỉ để thêm rồi navigate về /)
function ProductDetailWrapper() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
    setMessage(`${product.name} đã được thêm vào giỏ hàng.`);
  };

  return (
    <>
      <ProductDetail addToCart={addToCart} onRequireLogin={() => setShowLoginModal(true)} />
      {showLoginModal && (
        <AuthModal initialView="login" onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<ProductDetailWrapper />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
