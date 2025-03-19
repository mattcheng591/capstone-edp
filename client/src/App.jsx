import "./App.css";

// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Recommended from "./components/Recommended";
import Payment from "./components/Payment";

const App = () => {
  const [cart, setCart] = useState([]);
  const shoes = [
    {
      shoe_id: 1,
      shoe_type: "sneakers",
      shoe_size: 7,
      shoe_color: "red",
      shoe_brand: "reebok",
      price: 70,
    },
    {
      shoe_id: 2,
      shoe_type: "sneakers",
      shoe_size: 9,
      shoe_color: "blue",
      shoe_brand: "adidas",
      price: 100,
    },
    {
      shoe_id: 1,
      shoe_type: "sneakers",
      shoe_size: 7,
      shoe_color: "green",
      shoe_brand: "reebok",
      price: 70,
    },
    {
      shoe_id: 2,
      shoe_type: "sneakers",
      shoe_size: 9,
      shoe_color: "black",
      shoe_brand: "adidas",
      price: 100,
    },
    {
      shoe_id: 1,
      shoe_type: "sneakers",
      shoe_size: 7,
      shoe_color: "white",
      shoe_brand: "reebok",
      price: 70,
    },
    // Add more shoes as needed
  ];

  const addToCart = (shoe) => {
    setCart([...cart, shoe]);
  };

  const removeFromCart = (shoeId) => {
    setCart(cart.filter((shoe) => shoe.shoe_id !== shoeId));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              shoes={shoes}
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route path="/checkout" element={<Checkout cart={cart} />} />
        <Route path="/recommended" element={<Recommended />} />
        <Route path="/payment" element={<Payment />} />{" "}
        {/* Add the PaymentPage route */}
      </Routes>
    </Router>
  );
};

export default App;
