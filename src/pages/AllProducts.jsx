import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AllProducts.css';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('query')?.toLowerCase() || '';

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        if (!query) {
          setFiltered(data);
        } else {
          const matched = data.filter(item =>
            item.title.toLowerCase().includes(query)
          );
          setFiltered(matched);
        }
      });
  }, [query]);

  return (
    <div className="all-products-page">
      <h2>All Products ({filtered.length})</h2>
      <div className="product-grid">
        {filtered.length > 0 ? (
          filtered.map(product => (
            <div className="product-card" key={product.id}>
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} />
                <p className="product-title">{product.title}</p>
                <p className="product-price">₹{(product.price * 83).toFixed(0)}</p>
                {/* <p className="product-stock">In stock: {product.rating.count}</p> */}
              </Link>
            </div>
          ))
        ) : (
          <p>No matching products found.</p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
