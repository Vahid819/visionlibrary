import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
    const mongo_URL = process.env.MONGO_URL || "mongodb://localhost:27017/visionlibrary";
    if(mongoose.connection.readyState === 1) {
        console.log("MongoDB is already connected.");
        return;
    }else{
        try {
            await mongoose.connect(mongo_URL);
            console.log("Connected to MongoDB successfully.");
                    
        } catch (error) {
            console.log("Error connecting to MongoDB:", error);
            throw error;
        }
    }
}