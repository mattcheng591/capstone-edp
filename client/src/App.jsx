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
  const [totalPrice, setTotalPrice] = useState(0);

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

  const addToCart = (shoe) => {
    const existingShoeIndex = cart.findIndex(
      (item) => item.shoeId === shoe.shoeId
    );

    let updatedCart;
    if (existingShoeIndex !== -1) {
      // Shoe already exists in the cart, update its quantity
      updatedCart = [...cart];
      updatedCart[existingShoeIndex].quantity += 1;
    } else {
      // Shoe doesn't exist in the cart, add it with quantity 1
      updatedCart = [...cart, { ...shoe, quantity: 1 }];
    }

    setCart(updatedCart);
    updateTotalPrice(updatedCart); // Update total price
  };

  const removeFromCart = (shoeId) => {
    const shoeIndex = cart.findIndex((shoe) => shoe.shoeId === shoeId);
    if (shoeIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(shoeIndex, 1); // Remove only the first occurrence
      setCart(updatedCart);
      updateTotalPrice(updatedCart); // Update total price
    }
  };

  const updateTotalPrice = (cart) => {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
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
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                totalPrice={totalPrice}
                removeFromCart={removeFromCart}
              />
            }
          />
          <Route path="/recommended" element={<Recommended />} />
          <Route
            path="/payment"
            element={<Payment cart={cart} totalPrice={totalPrice} />}
          />
          <Route path="/addshoe" element={<RequireAuth></RequireAuth>} />
          {/* <Route path="/Login" element={<LoginForm />} /> */}
          {/* Add the PaymentPage route */}
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
