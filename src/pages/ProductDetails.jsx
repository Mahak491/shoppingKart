import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  useEffect(() => {
    const likedItems = JSON.parse(localStorage.getItem('likedProducts')) || [];
    const isLiked = likedItems.some(p => p.id === Number(id));
    setLiked(isLiked);
  }, [id]);

  const toggleLike = () => {
    let likedItems = JSON.parse(localStorage.getItem('likedProducts')) || [];

    if (liked) {
      likedItems = likedItems.filter(p => p.id !== product.id);
    } else {
      likedItems.push(product);
    }

    localStorage.setItem('likedProducts', JSON.stringify(likedItems));
    setLiked(!liked);
  };

  if (!product) return <div className="loading">Loading...</div>;

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
        <p className="rating">Rating: {product.rating?.rate} ⭐ ({product.rating?.count} reviews)</p>

        <div className="action-buttons">
          <button className="add-to-cart-btn">Add to Cart</button>
          <button className="like-btn" onClick={toggleLike}>
            {liked ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
