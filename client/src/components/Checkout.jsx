import React from "react";
import { useNavigate } from "react-router-dom";

const Checkout = ({ cart, removeFromCart }) => {
  const navigate = useNavigate();
  const total = cart.reduce((sum, shoe) => sum + shoe.price * shoe.quantity, 0);

  return (
    <div className="page-container">
      <h1 className="page-title">Checkout Page</h1>

      {/* Cart Items Section */}
        <div className="page-content">
          {cart.map((shoe, index) => (
            <div className="col-mb-4" key={index}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={shoe.image || "https://via.placeholder.com/150"}
                    alt={`${shoe.shoe_brand} - ${shoe.shoe_type}`}
                    className="img-fluid rounded-start"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">
                      {shoe.shoe_brand} - {shoe.shoe_type}
                    </h5>
                    <p className="card-text">Price: ${shoe.price}</p>
                    <p className="card-text">Quantity: {shoe.quantity}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeFromCart(shoe.shoeId)}
                    >
                      Remove from Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      {/* Total Price Section */}
      <div className="text-center mt-4">
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>

      {/* Navigation Buttons */}
      <div className="text-center mt-4">
        <button
          className="btn btn-secondary me-2"
          onClick={() => navigate("/")}
        >
          Go Back to Home
        </button>
        <button
          className="btn btn-success"
          onClick={() => navigate("/payment")}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Checkout;
