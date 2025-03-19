import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  products: [
    {
      shoeId: {
        type: Number,
        required: true,
        trim: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  shippingInfo: {
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
    },
  },
  paymentInfo: {
    cardNumber: {
      type: String,
      required: true,
      trim: true,
    },
    expiryDate: {
      type: String,
      required: true,
      trim: true,
    },
  },
  status: {
    type: String,
    required: true,
    trim: true,
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"], // Example statuses
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
