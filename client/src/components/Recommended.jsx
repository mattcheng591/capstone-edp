// RecommendedPage.jsx
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"; // Reuse the CSS for card styling
import { orderData } from "./Payment";
let productDetails = [];
let recommendedShoes = [];
async function Recommended() {
  const orderId = orderData.orderId;

  useEffect(() => {
    async function fetchOrderAndProducts() {
      try {
        // Fetch the order record
        const orderResponse = await fetch(
          `http://localhost:5050/api/orders/${orderId}`
        );
        const orderRecord = await orderResponse.json();

        // Fetch product details
        const { products } = orderRecord[0];
        productDetails = [];
        await Promise.all(
          products.map(async (product) => {
            const { shoeId } = product;
            try {
              const response = await fetch(
                `http://localhost:5050/api/products/${shoeId}`
              );
              const productDetail = await response.json();
              productDetails.push(productDetail); // Append product to the array
            } catch (error) {
              console.error(
                `Error fetching product with shoeId ${shoeId}:`,
                error
              );
            }
          })
        );

        // Post to recommend route
        try {
          const recommendResponse = await fetch(
            "http://127.0.0.1:5000/recommend",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(productDetails),
            }
          );

          const recommendedData = await recommendResponse.json();
          recommendedShoes.push(...recommendedData); // Append the response to the array
          console.log(recommendedShoes);
        } catch (err) {
          console.error("Error fetching recommended shoes:", err);
        }
      } catch (error) {
        console.error("Error fetching order or products:", error);
      }
    }

    fetchOrderAndProducts();
  }, [orderId]);
  // const recommendedShoes = [
  //   {
  //     shoeId: 1,
  //     shoe_brand: "Nike",
  //     shoe_type: "Running",
  //     shoe_color: "Black",
  //     shoe_size: 10,
  //     price: 120,
  //   },
  //   {
  //     shoeId: 2,
  //     shoe_brand: "Adidas",
  //     shoe_type: "Sneakers",
  //     shoe_color: "White",
  //     shoe_size: 9,
  //     price: 100,
  //   },
  //   {
  //     shoeId: 3,
  //     shoe_brand: "Puma",
  //     shoe_type: "Casual",
  //     shoe_color: "Blue",
  //     shoe_size: 8,
  //     price: 90,
  //   },
  //   {
  //     shoeId: 4,
  //     shoe_brand: "Reebok",
  //     shoe_type: "Training",
  //     shoe_color: "Red",
  //     shoe_size: 11,
  //     price: 110,
  //   },
  //   {
  //     shoeId: 5,
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
          <div className="shoe-card" key={shoe.shoeId}>
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
}

export default Recommended;
