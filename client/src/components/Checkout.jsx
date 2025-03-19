// CheckoutPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"; // Ensure this import is present to apply styles

const Checkout = ({ cart, removeFromCart }) => {
  const total = cart.reduce((sum, shoe) => sum + shoe.price, 0);

  const navigate = useNavigate();
  return (
    <div>
      <h1>Checkout Page</h1>
      <div className="cart-cards">
        {cart.map((shoe, index) => (
          <div className="cart-card" key={index}>
            <h2>
              {shoe.shoe_brand} - {shoe.shoe_type}
            </h2>
            <p>Price: ${shoe.price}</p>
            <button onClick={() => removeFromCart(shoe.shoe_id)}>
              Remove from Cart
            </button>
          </div>
        ))}
      </div>
      <h3>Total: ${total}</h3>
      <button onClick={() => navigate("/")}>Go Back to Home</button>
      <button onClick={() => navigate("/payment")}>Proceed to Payment</button>
    </div>
  );
};

export default Checkout;
