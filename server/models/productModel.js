import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  shoe_type: {
    type: String,
    required: true,
    trim: true,
  },
  shoe_size: {
    type: Number,
    required: true,
  },
  shoe_color: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  shoe_brand: {
    type: String,
    required: true,
    trim: true,
  },
  popularity: {
    type: Number,
    required: true,
  },
  durability: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
