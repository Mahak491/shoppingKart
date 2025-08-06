import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const featured = products.slice(0, 5);

  return (
    <div className="home">
      {/* Banner */}
      <div className="home-banner">
        <h1>Welcome to ShoppingKart</h1>
        <p>Explore the latest styles & products now!</p>
        <Link to="/products">
          <button className="banner-btn">Shop Now</button>
        </Link>
      </div>

      {/* Featured Section */}
      <div className="featured-section">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featured.map(product => (
            <div className="product-card" key={product.id}>
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} />
                <p className="product-title">{product.title}</p>
              </Link>
            </div>
          ))}
        </div>

        <Link to="/products">
          <button className="see-all-btn">See All Products</button>
        </Link>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} ShoppingKart. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
