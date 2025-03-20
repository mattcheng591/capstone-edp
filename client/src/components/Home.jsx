// HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import Search from "./Search";
import Filter from "./Filter";
import { useState, useEffect } from "react";

const Home = ({ shoes, cart, addToCart, removeFromCart }) => {
  const navigate = useNavigate();
  const [filteredShoes, setFilteredShoes] = useState(shoes); // State for filtered shoes
  const [shoeCards, setShoes] = useState([]); // State for shoes data

  // Reset filteredShoes whenever the shoes prop changes
  useEffect(() => {
    setFilteredShoes(shoes);
  }, [shoes]);

  const handleFilter = (filterTerm, filterType) => {
    let filtered = shoes;

    // Filter by brand if filterTerm is provided
    if (filterTerm) {
      filtered = filtered.filter((shoe) =>
        shoe.shoe_brand.toLowerCase().includes(filterTerm.toLowerCase())
      );
    }

    // Filter by shoe type if filterType is selected
    if (filterType.boot || filterType.sneaker) {
      filtered = filtered.filter((shoe) => {
        if (filterType.boot && shoe.shoe_type.toLowerCase() === "boot") {
          return true;
        }
        if (filterType.sneaker && shoe.shoe_type.toLowerCase() === "sneaker") {
          return true;
        }
        return false;
      });
    }

    setFilteredShoes(filtered);
  };

  return (
    <div className="page-container">
      <Search setShoes={setFilteredShoes}></Search>
      <h1 className="page-title">Featured</h1>

      {/* Shoes Section */}
      <div className="row mt-4page">
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

      {/* Search Section */}
      <h1 className="page-title">Shoe Catalog</h1>
      <Filter onFilter={handleFilter} />
      <div className="row mt-4">
        {filteredShoes.map((shoe) => (
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
