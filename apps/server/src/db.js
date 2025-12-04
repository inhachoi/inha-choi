import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not set. Check your .env file.");
}

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("[DB] Connected to MongoDB");
  } catch (error) {
    console.error("[DB] MongoDB connection error:", error);
    throw error;
  }
}
