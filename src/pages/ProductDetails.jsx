import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ProductDetails.css';
import { useAuth } from '../context/AuthContext';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch product
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  // Check if liked
  useEffect(() => {
    const likedItems = JSON.parse(localStorage.getItem('likedProducts')) || [];
    const isLiked = likedItems.some(p => p.id === Number(id));
    setLiked(isLiked);
  }, [id]);

  // Check initial cart quantity
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find(item => item.id === Number(id));
    if (existingItem) {
      setCartCount(existingItem.quantity);
    }
  }, [id]);

  const toggleLike = () => {
    if (!user) {
      alert('Please log in to like products.');
      navigate('/login');
      return;
    }

    let likedItems = JSON.parse(localStorage.getItem('likedProducts')) || [];

    if (liked) {
      likedItems = likedItems.filter(p => p.id !== product.id);
    } else {
      likedItems.push(product);
    }

    localStorage.setItem('likedProducts', JSON.stringify(likedItems));
    setLiked(!liked);
  };

  const addToCart = () => {
    if (!user) {
      alert('Please log in to add items to the cart.');
      navigate('/login');
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setCartCount(prev => prev + 1);
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      alert('Please log in to proceed with purchase.');
      navigate('/login');
      return;
    }
    if (isGuestUser) {
      alert('Guest users cannot purchase. Please log in with a real account.');
      return;
    }
    navigate('/checkout', { state: { product } });
  };

  if (!product) return <div className="loading">Loading...</div>;

  const isGuestUser = user?.email === 'guest@guest.com';
  const isLoggedIn = !!user;

  return (
    <div className="product-details">
      <div className="image-section">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="info-section">
        <h2>{product.title}</h2>
        <p className="price">₹{(product.price * 83).toFixed(0)}</p>
        <p className="desc">{product.description}</p>
        <p className="category">Category: {product.category}</p>
        <p className="rating">
          Rating: {product.rating?.rate} ⭐ ({product.rating?.count} reviews)
        </p>

        <button
          className="add-to-cart-btn"
          onClick={handleBuyNow}
          title={
            !isLoggedIn
              ? 'Login to purchase'
              : isGuestUser
                ? 'Guest users cannot purchase'
                : ''
          }
        >
          Buy Now
        </button>
        <div
          className="action-buttons"
          style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <button className="add-to-cart-btn" onClick={addToCart}>
            Add to Cart
          </button>
          {cartCount > 0 && (
            <span style={{ fontSize: '14px', color: 'green' }}>
              Added: {cartCount}
            </span>
          )}

          <button className="like-btn" onClick={toggleLike}>
            {liked ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
