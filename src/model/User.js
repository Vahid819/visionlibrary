import mongoose, { mongo } from "mongoose";



const userSchema = new mongoose.Schema({
    fristname:{
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model.User || mongoose.model("User", userSchema)

module.exports = User;