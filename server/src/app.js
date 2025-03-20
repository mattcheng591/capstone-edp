import express, { json } from "express";
import cors from "cors";

// Routes
import orderRoutes from "../routes/orderRoutes.js";
import productRoutes from "../routes/productRoutes.js";

const app = express();

// Middleware
app.use(json());
app.use(cors());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

export default app;
