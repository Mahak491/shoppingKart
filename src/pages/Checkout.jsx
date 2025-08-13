import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import '../styles/Checkout.css';

const Checkout = () => {
  const { state } = useLocation();
  const product = state?.product;

  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState({
    fullName: '',
    addressLine: '',
    city: '',
    zip: '',
  });

  const handlePayment = () => {
    alert("Redirecting to payment gateway");
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-header">Checkout</h2>

      {product ? (
        <>
          <div className="product-summary">
            <img src={product.image} alt={product.title} />
            <div className="product-details">
              <h5>{product.title}</h5>
              <p>Price per item: ₹{(product.price * 83).toFixed(0)}</p>
              <label>Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <p className="mt-2">
                <strong>Total: ₹{(product.price * 83 * quantity).toFixed(0)}</strong>
              </p>
            </div>
          </div>

          <div className="address-form">
            <h3 style={{textAlign:"center"}}>Shipping Address</h3>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={address.fullName}
                onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Address Line</label>
              <input
                type="text"
                value={address.addressLine}
                onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>ZIP Code</label>
              <input
                type="text"
                value={address.zip}
                onChange={(e) => setAddress({ ...address, zip: e.target.value })}
              />
            </div>
          </div>

          <div className="payment-section">
            <button className="btn btn-success" onClick={handlePayment}>
              Proceed to Payment
            </button>
          </div>
        </>
      ) : (
        <p>No product selected for checkout.</p>
      )}
    </div>
  );
};

export default Checkout;
