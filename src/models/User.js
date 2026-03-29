import mongoose from "mongoose";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: [true,"please enter your name"],
            trim: true
        },
        email:{
            type: String,
            required: [true, "please enter you email id"],
            trim: true,
            unique: true,
            match: [emailRegex, "please enter valid email id"],
            lowercase: true, 
        },
        password:{
            type: String,
            required: [true, "please enter your password"],
            match: [passwordRegex, "Password must contain uppercase, lowercase, number and be at least 8 characters"]
        },
        role:{
            type: String,
            enum: ["admin", 'staff', "user"],
            default: ["user"],
        },
        isActive: {
            type: Boolean,
            default: true
        }
    }
)