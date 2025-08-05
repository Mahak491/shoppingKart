import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('query')?.toLowerCase() || '';

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);

        // If no search query, show all products
        if (!query) {
          setFiltered(data);
        } else {
          const matched = data.filter(item =>
            item.title.toLowerCase().includes(query)
          );
          setFiltered(matched);
        }
      });
  }, [query]);

  return (
    <div>
      <h2>All Products</h2>
      <div className="products" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filtered.length > 0 ? (
          filtered.map(product => (
            <div key={product.id} style={{ width: '200px', border: '1px solid #ccc', padding: '10px' }}>
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} width="100" />
                <p>{product.title}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>No matching products found.</p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
