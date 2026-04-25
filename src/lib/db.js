
import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("Please define the MONGODB_URL environment variable.");
}

const globalWithMongoose = globalThis;

const cached = globalWithMongoose.mongoose || {
  conn: null,
  promise: null,
};

globalWithMongoose.mongoose = cached;

export async function connectDB() {
    //TODO after complete all code remove console.log
  if (cached.conn) {
    // console.log(cached.conn);
    return cached.conn;
  } 

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("MongoDB Connected:", cached.conn.connection.host);
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;

