// lib/db.js
import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL?.trim();

if (!MONGODB_URL) {
  throw new Error("❌ MONGODB_URL is not defined in environment variables");
}

// Global cache for Next.js hot reload / serverless
const cached = global.mongoose ?? { conn: null, promise: null };
global.mongoose = cached;

export async function connectDB() {
  // Return existing connection
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // Reset broken connection
  if (mongoose.connection.readyState === 0) {
    cached.conn = null;
    cached.promise = null;
  }

  // Create new connection
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, {
      bufferCommands: false,
      maxPoolSize: 10,          // handle multiple requests
      serverSelectionTimeoutMS: 5000,  // fail fast if Atlas unreachable
      socketTimeoutMS: 45000,   // close slow sockets
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log(`✅ MongoDB Connected: ${cached.conn.connection.host}`);
    return cached.conn;
  } catch (error) {
    cached.promise = null;  // reset on failure so next call retries
    console.error("❌ MongoDB connection failed:", error.message);
    throw new Error(`Database connection failed: ${error.message}`);
  }
}

export default connectDB;