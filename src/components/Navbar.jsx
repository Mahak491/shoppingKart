import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(searchInput);

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500); 

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  // Trigger search when debounced input changes
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
      </div>
      <div className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
