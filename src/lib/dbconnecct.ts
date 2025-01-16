import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}


export default async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("Already connected to database")
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URL || '')
        
        connection.isConnected = db.connections[0].readyState
        console.log("database Connected Successfully")
    } catch (error) {
        
        console.log("Database Connection failed", error)
        process.exit(1)
    }
}