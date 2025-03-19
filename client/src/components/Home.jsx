// HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import Search from "./Search";

const Home = ({ shoes, cart, addToCart, removeFromCart }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Travis Scott's Astronomical Online Store</h1>
      <Search></Search>
      <div className="shoe-cards">
        {shoes.map((shoe) => (
          <div className="shoe-card" key={shoe.shoeId}>
            <h2>
              {shoe.shoe_brand} - {shoe.shoe_type}
            </h2>
            <p>Color: {shoe.shoe_color}</p>
            <p>Size: {shoe.shoe_size}</p>
            <p>Price: ${shoe.price}</p>
            <button onClick={() => addToCart(shoe)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div>
        <h2>Your Cart</h2>
        <ul>
          {cart.map((shoe, index) => (
            <li key={index}>
              {shoe.shoe_brand} - {shoe.shoe_type}: ${shoe.price} Quantity:{" "}
              {shoe.quantity}
              <button onClick={() => removeFromCart(shoe.shoeId)}>
                Remove from Cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={() => navigate("/checkout")}>Checkout</button>
      </div>
    </div>
  );
};

export default Home;
