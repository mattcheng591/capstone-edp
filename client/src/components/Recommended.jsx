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
    <div className="page-container">
      <div className="container mt-4">
        <h1 className="text-center mb-4">Thank You for Your Purchase!</h1>
        <p className="text-center">
          Your order number is: <strong>{orderNumber}</strong>
        </p>
        <h2 className="text-center mb-4">Recommended for You</h2>
        <div className="row mt-4">
          {recommendedProducts.map((shoe) => (
            <div
              className="ag-courses_item col-lg-3 col-md-4 col-sm-6 mb-4"
              key={shoe.shoeId}
              style={{ cursor: "pointer" }}
            >
              <div className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>
                <div className="ag-courses-item_title">
                  {shoe.shoe_brand} - {shoe.shoe_type}
                </div>
                <div className="ag-courses-item_title">
                  <img
                    src="https://static.nike.com/a/images/w_1280,q_auto,f_auto/354d14df-3286-44e6-afbf-debaf283d320/air-jordan-1-low-x-travis-scott-sail-and-ridgerock-dm7866-162-release-date.jpg"
                    alt={`${shoe.shoe_brand} - ${shoe.shoe_type}`}
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
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
    </div>
  );
}

export default Recommended;
