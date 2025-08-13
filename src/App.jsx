import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import AllProducts from './pages/AllProducts';
import LikedProducts from './pages/LikedProducts';
import Checkout from './pages/Checkout';
import Signup from './pages/Signup';
import ProtectedRoute from './pages/ProtectedRoute';
import Category from './pages/Category';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/liked" element={<ProtectedRoute><LikedProducts /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
         <Route path="/category/:name" element={<Category />} />
      </Routes>
    </Router>
  );
}

export default App;
