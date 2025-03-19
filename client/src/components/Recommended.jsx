// RecommendedPage.jsx
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"; // Reuse the CSS for card styling
import { orderData } from "./Payment";

function Recommended() {
  const navigate = useNavigate();
  const orderId = orderData.orderId;
  // const [productDetail, setProductDetail] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

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
        const productDetails = await Promise.all(
          products.map(async (product) => {
            const { shoeId } = product;
            try {
              const response = await fetch(
                `http://localhost:5050/api/products/${shoeId}`
              );
              const productDetail = await response.json();
              console.log("product detail: ", productDetail);

              // Return the product detail for further processing
              return productDetail;
            } catch (error) {
              console.error(
                `Error fetching product with shoeId ${shoeId}:`,
                error
              );
              return null; // Return null if there's an error
            }
          })
        );

        // Filter out null values and preprocess the data
        const sanitizedProductDetails = productDetails
          .filter((detail) => detail !== null) // Remove null entries
          .map((detail) => {
            // Remove unwanted fields like _id and timestamp
            const { _id, timestamp, ...rest } = detail;
            return rest;
          });

        // Post to recommend route
        try {
          const recommendResponse = await fetch(
            "http://127.0.0.1:5000/recommend",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(sanitizedProductDetails), // Send sanitized data
            //   mode: 'no-cors'
            }
          );

          const recommendedData = await recommendResponse.json();
          console.log("Recommended shoes: ", recommendedData);
          setRecommendedProducts(recommendedData); // Update state with recommended shoes
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
  if (recommendedProducts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Thank You for Your Purchase!</h1>
      <p className="text-center">
        Your order number is: <strong>{orderNumber}</strong>
      </p>
      <h2 className="text-center mb-4">Recommended for You</h2>
      <div className="row">
        {recommendedProducts.map((shoe) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={shoe.shoeId}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">
                  {shoe.shoe_brand} - {shoe.shoe_type}
                </h5>
                <p className="card-text">Color: {shoe.shoe_color}</p>
                <p className="card-text">Size: {shoe.shoe_size}</p>
                <p className="card-text">Price: ${shoe.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    </div>
  );
}

export default Recommended;
