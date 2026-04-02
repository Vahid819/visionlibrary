import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userid:{
        type:String,
        required: true
    },
    paymentid: {
        type: String,
    },
    paymenttype: {
        type: String,
        enum: ["cash", "online"],
        required: true
    },
    paymentdate:{
        type: Date,
        default: Date.now(),
    },
})