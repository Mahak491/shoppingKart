import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';
// import AllProducts from '../pages/AllProducts';

const Navbar = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(searchInput);
  const [categories, setCategories] = useState([]);
  const { user, logout } = useAuth();

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
      .catch(err => console.error('Error fetching categories:', err));
  }, []);


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    if (debouncedSearch.trim()) {
      navigate(`/products?query=${debouncedSearch.trim()}`);
    }
  }, [debouncedSearch, navigate]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <input
          type="text"
          placeholder="Search products..."
          className="search-bar"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <div className="navbar-categories">
          {categories.map(cat => (
            <Link 
              key={cat} 
              to={`/category/${cat}`} 
              className="category-link"
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Link>
          ))}
        </div>
      </div>

      <div className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/liked">Liked</Link>
        <Link to="/products">Sale Products</Link>
        {user ? (
          <>
            <span>Hi, {user.email}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
