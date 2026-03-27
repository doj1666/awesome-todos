require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

let client;

const connectToMongoDB = async () => {
  if (!client) {
    try {
      client = await MongoClient.connect(uri);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("MongoDB connection failed:", error);
      throw error;  // Fail server startup if no DB
    }
  }
  return client;
};

const getConnectedClient = () => client;

module.exports = { connectToMongoDB, getConnectedClient };