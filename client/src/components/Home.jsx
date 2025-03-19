// HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import Search from "./Search";
import { useState } from "react";

const Home = ({ shoes, cart, addToCart, removeFromCart }) => {
  const navigate = useNavigate();
  const [shoeCards, setShoes] = useState([]); // State for shoes data

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">
        Travis Scott's Astronomical Online Store
      </h1>
      <Search setShoes={setShoes}></Search>

      {/* Shoes Section */}
      <div className="row mt-4">
        {shoes.map((shoe) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={shoe.shoeId}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">
                  {shoe.shoe_brand} - {shoe.shoe_type}
                </h5>
                <p className="card-text">Color: {shoe.shoe_color}</p>
                <p className="card-text">Size: {shoe.shoe_size}</p>
                <p className="card-text">Price: ${shoe.price}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(shoe)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="mt-5">
        <h2>Your Cart</h2>
        <ul className="list-group">
          {cart.map((shoe, index) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={index}
            >
              <span>
                {shoe.shoe_brand} - {shoe.shoe_type}: ${shoe.price} Quantity:{" "}
                {shoe.quantity}
              </span>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeFromCart(shoe.shoeId)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Checkout Button */}
      <div className="text-center mt-4">
        <button
          className="btn btn-success"
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Home;
