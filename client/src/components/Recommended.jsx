// RecommendedPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"; // Reuse the CSS for card styling

const Recommended = async () => {
  // Simulate recommended shoes
  const navigate = useNavigate();
  /*
  Await fetch http://127.0.0.1:5000/recommend POST the recommendedShoes
  recommendedShoes requires mongo find from orders collection. loop through the products array and find by shoeId in the products collection
  populate an array of shoe objects from the products collection 
  */

  

  try {
    await fetch("http://127.0.0.1:5000/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recommendedShoes),
    })
  } catch (err) {
    console.error("Error fetching recommended shoes:", error);
  };
  // const recommendedShoes = [
  //   {
  //     shoe_id: 1,
  //     shoe_brand: "Nike",
  //     shoe_type: "Running",
  //     shoe_color: "Black",
  //     shoe_size: 10,
  //     price: 120,
  //   },
  //   {
  //     shoe_id: 2,
  //     shoe_brand: "Adidas",
  //     shoe_type: "Sneakers",
  //     shoe_color: "White",
  //     shoe_size: 9,
  //     price: 100,
  //   },
  //   {
  //     shoe_id: 3,
  //     shoe_brand: "Puma",
  //     shoe_type: "Casual",
  //     shoe_color: "Blue",
  //     shoe_size: 8,
  //     price: 90,
  //   },
  //   {
  //     shoe_id: 4,
  //     shoe_brand: "Reebok",
  //     shoe_type: "Training",
  //     shoe_color: "Red",
  //     shoe_size: 11,
  //     price: 110,
  //   },
  //   {
  //     shoe_id: 5,
  //     shoe_brand: "Under Armour",
  //     shoe_type: "Basketball",
  //     shoe_color: "Green",
  //     shoe_size: 12,
  //     price: 130,
  //   },
  // ];

  // Simulate an order number
  const orderNumber = "ORD123456";

  return (
    <div>
      <h1>Thank You for Your Purchase!</h1>
      <p>Your order number is: {orderNumber}</p>
      <h2>Recommended for You</h2>
      <div className="shoe-cards">
        {recommendedShoes.map((shoe) => (
          <div className="shoe-card" key={shoe.shoe_id}>
            <h2>
              {shoe.shoe_brand} - {shoe.shoe_type}
            </h2>
            <p>Color: {shoe.shoe_color}</p>
            <p>Size: {shoe.shoe_size}</p>
            <p>Price: ${shoe.price}</p>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
};

export default Recommended;
