import mongoose from "mongoose";

// Prefer env-provided URL, fall back to local dev DB.
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/visionlibrary";

type MongooseCache = {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

// Store the cache on the global object to survive module reloads in dev/serverless.
const globalWithMongoose = global as typeof globalThis & {
    mongooseCache?: MongooseCache;
};

// Reuse the existing cache if present, otherwise initialize it.
const mongooseCache: MongooseCache = globalWithMongoose.mongooseCache ?? {
    conn: null,
    promise: null,
};

// Persist cache globally for subsequent imports.
globalWithMongoose.mongooseCache = mongooseCache;

export const connectDB = async (): Promise<typeof mongoose> => {
    // Safety guard in case URL is intentionally unset.
    if (!MONGO_URL) {
        throw new Error("MONGO_URL is not defined.");
    }

    // If already connected, return the existing connection.
    if (mongooseCache.conn) {
        return mongooseCache.conn;
    }

    // If a connection attempt is in-flight, reuse its promise.
    if (!mongooseCache.promise) {
        mongooseCache.promise = mongoose.connect(MONGO_URL);
    }

    try {
        // Await the shared connection attempt and cache the connection.
        mongooseCache.conn = await mongooseCache.promise;
        console.log("Connected to MongoDB successfully.");
        return mongooseCache.conn;
    } catch (error) {
        // Reset the promise so future calls can retry.
        mongooseCache.promise = null;
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};
