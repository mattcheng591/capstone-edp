// HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Home = ({ shoes, cart, addToCart, removeFromCart }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Online Store</h1>
      <div className="shoe-cards">
        {shoes.map((shoe) => (
          <div className="shoe-card" key={shoe.shoe_id}>
            <h2>
              {shoe.shoe_brand} - {shoe.shoe_type}
            </h2>
            <p>Color: {shoe.shoe_color}</p>
            <p>Size: {shoe.shoe_size}</p>
            <p>Price: ${shoe.price}</p>
            <button onClick={() => addToCart(shoe)}>Add to Cart</button>
            <button onClick={() => removeFromCart(shoe.shoe_id)}>
              Remove from Cart
            </button>
          </div>
        ))}
      </div>
      <div>
        <h2>Your Cart</h2>
        <ul>
          {cart.map((shoe, index) => (
            <li key={index}>
              {shoe.shoe_brand} - {shoe.shoe_type}: ${shoe.price}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={() => navigate("/checkout")}>Go to Checkout</button>
      </div>
    </div>
  );
};

export default Home;
