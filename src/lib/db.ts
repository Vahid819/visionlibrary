import { log } from "console";
import mongoose from "mongoose";


export const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        console.log("mongodb already connected");
    } else {
        try {
            await mongoose.connect(process.env.MONGO_URL!);
            console.log("mongodb connected");
            
        } catch (error: any) {
            console.log("mongodb connection error: ", error.message);

        }
    }
        
}