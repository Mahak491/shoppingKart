import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <h2>All Products</h2>
      <div className="products" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map(product => (
          <div key={product.id} style={{ width: '200px', border: '1px solid #ccc', padding: '10px' }}>
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.title} width="100" />
              <p>{product.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
