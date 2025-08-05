import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-left">
      <input type="text" placeholder="Search products..." className="search-bar" />
    </div>
    <div className="navbar-right">
      <Link to="/">Home</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/login">Login</Link>
    </div>
  </nav>
);

export default Navbar;
