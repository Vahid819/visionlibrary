import mongoose from "mongoose";

const dbConnect = async () => {
  // Check the current Mongoose connection state
  if (mongoose.connection.readyState === 1) {
    console.log("Database is already connected.");
    return mongoose.connection; // Return the existing connection
  }

  try {
    console.log("Connecting to the database...");
    // Establish a new connection
    const connection = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully.");
    return connection;
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    throw new Error(error.message);
  }
};

export default dbConnect;
