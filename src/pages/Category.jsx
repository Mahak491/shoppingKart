import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import male from "../assets/male.jpg";
import female from "../assets/female.jpg";
import electronicsImg from "../assets/electronics.jpg";
import jeweleryImg from "../assets/jewelary.jpg";
import "../styles/Category.css";

const categoryMap = {
  men: {
    apiName: "men's clothing",
    image: male
  },
  women: {
    apiName: "women's clothing",
    image: female
  },
  electronics: {
    apiName: "electronics",
    image: electronicsImg
  },
  jewelery: {
    apiName: "jewelery",
    image: jeweleryImg
  }
};

function Category() {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const categoryData = categoryMap[name];
    if (!categoryData) return;

    fetch(
      `https://fakestoreapi.com/products/category/${encodeURIComponent(
        categoryData.apiName
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching category products:", err);
        setLoading(false);
      });
  }, [name]);

  if (!categoryMap[name]) {
    return <h2>Category not found</h2>;
  }

  const { image } = categoryMap[name];

  return (
    <div className="category-page">
      <div className="category-banner">
        <img src={image} alt={name} />
        <h1>{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
      </div>

      {loading ? (
        <p className="loading">Loading products...</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                />
                <p className="product-title">{product.title}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Category;
