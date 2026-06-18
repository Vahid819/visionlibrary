import mongoose from "mongoose";

const userPaymentSchema = new mongoose.Schema({
    userid:{
        type:String,
        required: true
    },
    upiid:{
        type:String,
    },
});

export default mongoose.model.UserPayment || mongoose.model("UserPayment", userPaymentSchema);