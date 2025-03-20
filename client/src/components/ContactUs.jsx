import React from "react";

const ContactUs = () => {
  return (
    <div className="page-container">
      <div className="container mt-4">
        <h1 className="text-center mb-4 text-white">Contact Us</h1>

        <div className="p-4 border customFooter bg-dark text-white">
          <p>
            We’d love to hear from you! Whether you have a question about our
            products, need assistance, or just want to share your feedback, feel
            free to reach out to us.
          </p>
          <p>
            <strong>Email:</strong> support@astronomicalstore.com
          </p>
          <p>
            <strong>Phone:</strong> +1 (800) 123-4567
          </p>
          <p>
            <strong>Address:</strong> 123 Astronomical Lane, Houston, TX, 77001
          </p>
          <p>
            Our customer support team is available Monday through Friday, 9 AM
            to 5 PM (CST). We aim to respond to all inquiries within 24 hours.
          </p>
          <p>
            Thank you for choosing{" "}
            <strong>Travis Scott's Astronomical Online Store</strong>. We look
            forward to assisting you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
