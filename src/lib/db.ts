import mongoose from "mongoose";


export const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        console.log("mongodb already connected");
        return;
    } else {
        try {
            await mongoose.connect(process.env.MONGO_URL!);
            const connection = mongoose.connection

            mongoose.connection.on("connected", ()=>{
                console.log("mongodb connection successfully", mongoose.connection.readyState);
            })

            mongoose.connection.on("error", (error)=>{
                console.log("mongodb connection error please make sure database connection", mongoose.connection.readyState, error.message);

                process.exit();
                
            })
            
        } catch (error: any) {
            console.log("mongodb connection error: ", error.message);

        }
    }
        
}