import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { formatMoney } from '../utils/format';

function ProductCard({ product, addToCart, onRequireLogin }) {
  const { isAuthenticated } = useAuth();

  function handleAdd(e) {
    e.preventDefault(); // prevent link navigation
    if (!isAuthenticated) {
      onRequireLogin();
      return;
    }
    addToCart(product);
  }

  return (
    <Link to={`/product/${product.id}`} className="product-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <img src={product.image} alt={product.name} />
      <div className="product-body">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <div className="rating">⭐ {product.rating}</div>
        <p>{product.description}</p>
        <div className="product-footer">
          <div>
            <strong>{formatMoney(product.price)}</strong>
            <span> / {product.unit}</span>
          </div>
          <button onClick={handleAdd}>Thêm</button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
