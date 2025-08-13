import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AllProducts.css'; 

const LikedProducts = () => {
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('likedProducts')) || [];
    setLikedProducts(stored);
  }, []);

  return (
    <div className="all-products-page">
      <h2>Liked Products ({likedProducts.length})</h2>
      <div className="product-grid">
        {likedProducts.length > 0 ? (
          likedProducts.map(product => (
            <div className="product-card" key={product.id}>
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} />
                <p className="product-title">{product.title}</p>
                <p className="product-price">₹{(product.price * 83).toFixed(0)}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>No liked products yet.</p>
        )}
      </div>
    </div>
  );
};

export default LikedProducts;
