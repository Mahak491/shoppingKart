import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import salee from '../assets/sale.jpg';

const categoryImages = {
  men: "https://source.unsplash.com/800x600/?men-fashion",
  women: "https://source.unsplash.com/800x600/?women-fashion",
  electronics: "https://source.unsplash.com/800x600/?electronics",
  jewelery: "https://source.unsplash.com/800x600/?jewelry"
};

const Home = () => {
  const [products, setProducts] = useState([]); // ✅ added state for products
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  // Fetch categories
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => {
        const cleanedCategories = data.map(cat => {
          if (cat.toLowerCase() === "men's clothing") return 'men';
          if (cat.toLowerCase() === "women's clothing") return 'women';
          return cat;
        });
        setCategories(cleanedCategories);
      })
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  const featured = products.slice(0, 5); // ✅ moved after products state exists

  return (
    <div className="home">
      <div className="home-banner">
        <h1>Welcome to ShoppingKart</h1>
        <p>Explore the latest styles & products now!</p>
        <Link to="/products">
          <button className="banner-btn">Shop Now</button>
        </Link>
      </div>

      <div className="sale-section">
  <Link to="/sale" className="sale-link">
    <div className="sale-banner-wrapper">
      <img 
        src={salee}
        alt="Big Sale Banner"
        className="sale-banner"
      />
      <div className="sale-text">
        <h2 className="sale-title">Mega Sale!</h2>
        <p className="sale-subtitle">Up to 70% Off on All Products</p>
      </div>
    </div>
  </Link>
</div>


      <div className="featured-section">
        <h2>Sale Products</h2>
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
      </div>

      <div className="category-section">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          {categories.map(cat => (
            <Link to={`/category/${cat}`} key={cat} className="category-card">
              <img src={categoryImages[cat]} alt={cat} />
              <div className="category-overlay">
                <p>{cat.charAt(0).toUpperCase() + cat.slice(1)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

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
