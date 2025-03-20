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
            <div
              className="ag-courses_item"
              onClick={() => addToCart(shoe)} // Add onClick to the entire card
              style={{ cursor: "pointer" }} // Optional: Add pointer cursor for better UX
            >
              <div className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>

                <div className="ag-courses-item_title">
                  {shoe.shoe_brand} - {shoe.shoe_type}
                </div>

                <div className="ag-courses-item_date-box">
                  Color:{" "}
                  <span className="ag-courses-item_date">
                    {shoe.shoe_color}
                  </span>
                </div>

                <div className="ag-courses-item_date-box">
                  Size:{" "}
                  <span className="ag-courses-item_date">{shoe.shoe_size}</span>
                </div>

                <div className="ag-courses-item_date-box">
                  Price:{" "}
                  <span className="ag-courses-item_date">${shoe.price}</span>
                </div>
                <div className="ag-courses-item_date-box">
                  Click to add to cart
                </div>
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
          <div
            className="ag-courses_item"
            key={shoe.shoeId}
            onClick={() => addToCart(shoe)}
            style={{ cursor: "pointer" }}
          >
            <div className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>

              <div className="ag-courses-item_title">
                {shoe.shoe_brand} - {shoe.shoe_type}
              </div>

              <div className="ag-courses-item_date-box">
                Color:{" "}
                <span className="ag-courses-item_date">{shoe.shoe_color}</span>
              </div>

              <div className="ag-courses-item_date-box">
                Size:{" "}
                <span className="ag-courses-item_date">{shoe.shoe_size}</span>
              </div>

              <div className="ag-courses-item_date-box">
                Price:{" "}
                <span className="ag-courses-item_date">${shoe.price}</span>
              </div>
              <div className="ag-courses-item_date-box">
                Click to add to cart
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
