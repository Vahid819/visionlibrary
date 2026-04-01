import mongoose from "mongoose";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

const userSchema = new mongoose.Schema(
    {
        firstname:{
            type:String,
            required: [true,"please enter your firstname"],
            trim: true
        },
        lastname:{
            type: String,
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
        otp:{
            type: Number,
        },
        otpCreatedAt:{
            type: Date,
            default: Date.now,
        },
        otpExpiryDate:{
            type: Date,
        },
        userverified:{
            type: Boolean,
            default: false,
        },
        role:{
            type: String,
            enum: ["owner", 'user'],
            default: "user",
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps:true,   
    }
)

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;