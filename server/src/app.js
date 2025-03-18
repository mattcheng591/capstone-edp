import express, { json } from "express";
import cors from "cors";

// Routes
import ordersRoutes from "../routes/ordersRoutes.js";
import productsRoutes from "../routes/productsRoutes.js";

const app = express();

// Middleware
app.use(json());
app.use(cors());

// Routes
app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);

export default app;
