// HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import Search from "./Search";
import Filter from "./Filter";
import { useState, useEffect } from "react";

const Home = ({ shoes, cart, addToCart, removeFromCart }) => {
  const navigate = useNavigate();
  const [searchedShoes, setSearchedShoes] = useState(shoes); // State for searched shoes
  const [filteredShoes, setFilteredShoes] = useState([]); // Filtered shoe data

  // Reset searchedShoes whenever the shoes prop changes
  useEffect(() => {
    setSearchedShoes(shoes);
  }, [shoes]);

  const handleFilter = (filterCriteria) => {
    const filtered = shoes.filter((shoe) => {
      // Apply your filtering logic here
      return shoe.shoe_type === filterCriteria;
    });
    setSearchedShoes(filtered);
  };

  return (
    <div className="page-container">
      <Search setShoes={setSearchedShoes}></Search>
      <h1 className="page-title">Featured</h1>

      {/* Featured Section */}
      <div className="row mt-4page">
        {shoes.slice(0, 4).map((shoe) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={shoe.shoeId}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">
                  {shoe.shoe_brand} - {shoe.shoe_type}
                </h5>
                <img
                  src="https://static.nike.com/a/images/w_1280,q_auto,f_auto/354d14df-3286-44e6-afbf-debaf283d320/air-jordan-1-low-x-travis-scott-sail-and-ridgerock-dm7866-162-release-date.jpg" // Assuming 'image' contains the URL of the shoe image
                  alt={`${shoe.shoe_brand} - ${shoe.shoe_type}`}
                  className="img-fluid mb-3" // Bootstrap class for responsive images
                />
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
      <Filter onFilter={handleFilter} setShoes={setSearchedShoes} />
      <div className="row mt-4">
        {searchedShoes.map((shoe) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={shoe.shoeId}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">
                  {shoe.shoe_brand} - {shoe.shoe_type}
                </h5>
                <img
                  src="https://static.nike.com/a/images/w_1280,q_auto,f_auto/354d14df-3286-44e6-afbf-debaf283d320/air-jordan-1-low-x-travis-scott-sail-and-ridgerock-dm7866-162-release-date.jpg" // Assuming 'image' contains the URL of the shoe image
                  alt={`${shoe.shoe_brand} - ${shoe.shoe_type}`}
                  className="img-fluid mb-3" // Bootstrap class for responsive images
                />
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
