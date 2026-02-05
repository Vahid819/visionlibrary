import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    fname: string;
    lname: string;
    email: string;
    otp: number;
    otp_expiry: Date;
    isverified: boolean;
    password: string;


}

const userSchema = new Schema<IUser>({
    fname: {
        type: String,
        required: true,

    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "email already exists"],
        regex: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
        trim: true,
    },
    otp: {
        type: Number,
        required: true,
    },
    otp_expiry: {
        type: Date,
        required: true,
    },
    isverified: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: true,
    },
}
    , { timestamps: true }
)

export const User = mongoose.model<IUser>("User", userSchema) || mongoose.models.User;