import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';

function ProductGrid({ products, addToCart, onRequireLogin }) {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const categories = useMemo(() => {
    return ['Tất cả', ...new Set(products.map((item) => item.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'Tất cả') return products;
    return products.filter((item) => item.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <section className="catalog" id="products">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Bộ sưu tập</span>
          <h2>Các loại cá cảnh nổi bật</h2>
        </div>
        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} onRequireLogin={onRequireLogin} />
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;
