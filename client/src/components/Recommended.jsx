// RecommendedPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"; // Reuse the CSS for card styling

const Recommended = () => {
  // Simulate recommended shoes
  const navigate = useNavigate();
  const recommendedShoes = [
    {
      shoe_id: 1,
      shoe_brand: "Nike",
      shoe_type: "Running",
      shoe_color: "Black",
      shoe_size: 10,
      price: 120,
    },
    {
      shoe_id: 2,
      shoe_brand: "Adidas",
      shoe_type: "Sneakers",
      shoe_color: "White",
      shoe_size: 9,
      price: 100,
    },
    {
      shoe_id: 3,
      shoe_brand: "Puma",
      shoe_type: "Casual",
      shoe_color: "Blue",
      shoe_size: 8,
      price: 90,
    },
    {
      shoe_id: 4,
      shoe_brand: "Reebok",
      shoe_type: "Training",
      shoe_color: "Red",
      shoe_size: 11,
      price: 110,
    },
    {
      shoe_id: 5,
      shoe_brand: "Under Armour",
      shoe_type: "Basketball",
      shoe_color: "Green",
      shoe_size: 12,
      price: 130,
    },
  ];

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
