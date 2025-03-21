import pkg from "mongoose";
import express from "express";
const { connect } = pkg;
import dotenv from "dotenv";
import app from "./app.js";
import { MongoClient } from "mongodb";

const PORT = process.env.PORT || 5000;

dotenv.config();
const url = process.env.MONGODB_URI;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

app.use(express.json());
// Connect to MongoDB
connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.post("/search", async (req, res) => {
  try {
    const { searchTerm } = req.body;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const searchTermLower = searchTerm.toLowerCase();
    let shoes;

    if (searchTermLower === "") {
      // If searchTermLower is empty, retrieve all records
      shoes = await collection.find({}).toArray();
    } else {
      // Otherwise, search for an exact match on shoe_brand (case-insensitive)
      shoes = await collection
        .find({
          $expr: {
            $eq: [{ $toLower: "$shoe_brand" }, searchTermLower],
          },
        })
        .toArray();
    }
    console.log(shoes);
    res.json(shoes);
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .send("Hmm, something doesn't smell right... Error searching for socks");
  }
});

app.post("/filter", async (req, res) => {
  try {
    const { filterTerm } = req.body;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const filterTermLower = filterTerm.toLowerCase();
    let shoes;

    if (filterTermLower === "") {
      // If filterTermLower is empty, retrieve all records
      shoes = await collection.find({}).toArray();
    } else {
      // Otherwise, filter by shoe_type
      shoes = await collection
        .find({
          $expr: {
            $eq: [{ $toLower: "$shoe_type" }, filterTermLower],
          },
        })
        .toArray();
    }
    console.log(shoes);
    res.json(shoes);
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .send("Hmm, something doesn't smell right... Error searching for socks");
  }
});
