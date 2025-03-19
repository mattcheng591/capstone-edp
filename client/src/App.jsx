import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Recommended from "./components/Recommended";
import Payment from "./components/Payment";
import LoginForm from "./components/LoginForm";
import RequireAuth from "./components/RequireAuth";
import { AuthProvider } from "./components/AuthContext";

const App = () => {
  const [cart, setCart] = useState([]);
  const [shoes, setShoes] = useState([]); // State for shoes data
  const [loading, setLoading] = useState(true); // State for loading

  // Fetch shoes data from the backend
  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/products"); // Replace with your API endpoint
        const data = await response.json();
        setShoes(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching shoes:", error);
        setLoading(false);
      }
    };

    fetchShoes();
  }, []);

  // const shoes = [
  //   {
  //     shoe_id: 1,
  //     shoe_type: "sneakers",
  //     shoe_size: 7,
  //     shoe_color: "red",
  //     shoe_brand: "reebok",
  //     price: 70,
  //   },
  //   {
  //     shoe_id: 2,
  //     shoe_type: "sneakers",
  //     shoe_size: 9,
  //     shoe_color: "blue",
  //     shoe_brand: "adidas",
  //     price: 100,
  //   },
  //   {
  //     shoe_id: 1,
  //     shoe_type: "sneakers",
  //     shoe_size: 7,
  //     shoe_color: "green",
  //     shoe_brand: "reebok",
  //     price: 70,
  //   },
  //   {
  //     shoe_id: 2,
  //     shoe_type: "sneakers",
  //     shoe_size: 9,
  //     shoe_color: "black",
  //     shoe_brand: "adidas",
  //     price: 100,
  //   },
  //   {
  //     shoe_id: 1,
  //     shoe_type: "sneakers",
  //     shoe_size: 7,
  //     shoe_color: "white",
  //     shoe_brand: "reebok",
  //     price: 70,
  //   },
  //   // Add more shoes as needed
  // ];

  const addToCart = (shoe) => {
    setCart([...cart, shoe]);
  };

  const removeFromCart = (shoeId) => {
    setCart(cart.filter((shoe) => shoe.shoe_id !== shoeId));
  };

  return (
    <Router>
      <AuthProvider>
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
          <Route path="/addshoe" element={<RequireAuth></RequireAuth>} />
          {/* <Route path="/Login" element={<LoginForm />} /> */}
          {/* Add the PaymentPage route */}
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
